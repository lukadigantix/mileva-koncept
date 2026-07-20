"use client";

import { useEffect, useRef, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./SmoothScroll";

/**
 * Branded page transition that doubles as a loader - a dark `--overlay` panel
 * rises to cover the screen with the Mileva logo centred, the route changes
 * behind it, then the panel lifts away to reveal the NEW page.
 *
 * It only uncovers when BOTH:
 *   1. a minimum hold has elapsed (so fast loads still show a real moment), and
 *   2. the new route has actually finished loading.
 * The load signal is `useTransition().isPending`: we push the route inside
 * `startTransition`, and `isPending` stays true while the new route is fetching
 * / rendering - so a slow page keeps the panel up until it's ready instead of
 * revealing a blank screen. A hard cap guarantees we never get stuck.
 *
 * App Router has no exit-animation hook, so we intercept internal-link clicks
 * in the capture phase (`preventDefault` → cover → push → reveal). `<Link>`
 * skips its own navigation because the event is already defaultPrevented, while
 * any user onClick (e.g. closing the menu) still runs.
 */

const MIN_HOLD = 650; // ms the panel stays fully covering, at minimum
const MAX_WAIT = 6000; // ms hard cap so a stalled navigation still reveals

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const lenisRef = useLenis();
  const [isPending, startTransition] = useTransition();

  const panelRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  const busyRef = useRef(false); // a transition is mid-flight
  const armedRef = useRef(false); // covered, waiting to reveal
  const minHoldDoneRef = useRef(false);
  const pageReadyRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  // REVEAL: mark fades out, panel lifts off the top, new page is shown.
  const reveal = () => {
    if (!armedRef.current) return;
    armedRef.current = false;
    clearTimers();

    const panel = panelRef.current;
    const mark = markRef.current;
    if (!panel || !mark) return;

    // New page is committed - recompute scroll-driven positions first.
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(panel, { display: "none" });
        lenisRef?.current?.start();
        busyRef.current = false;
      },
    });
    tl.to(mark, { opacity: 0, y: -14, duration: 0.5, ease: "power2.in" });
    tl.to(panel, { yPercent: -100, duration: 1.05, ease: "power2.inOut" }, "-=0.2");
  };

  // Reveal only once the minimum hold AND the page-ready signal are both in.
  const tryReveal = () => {
    if (armedRef.current && minHoldDoneRef.current && pageReadyRef.current) {
      reveal();
    }
  };

  // COVER: panel rises from below to fill the screen, logo fades up; on
  // complete, reset scroll, arm the reveal gate, and navigate.
  const cover = (href: string) => {
    const panel = panelRef.current;
    const mark = markRef.current;
    if (!panel || !mark) return;

    busyRef.current = true;
    lenisRef?.current?.stop();

    const tl = gsap.timeline({
      onComplete: () => {
        // `force` resets even though Lenis is stopped under the panel.
        lenisRef?.current?.scrollTo(0, { immediate: true, force: true });
        window.scrollTo(0, 0);

        armedRef.current = true;
        minHoldDoneRef.current = false;
        pageReadyRef.current = false;

        // Minimum brand-moment hold.
        timersRef.current.push(
          window.setTimeout(() => {
            minHoldDoneRef.current = true;
            tryReveal();
          }, MIN_HOLD)
        );
        // Hard cap - if the load never settles, reveal anyway.
        timersRef.current.push(
          window.setTimeout(() => {
            minHoldDoneRef.current = true;
            pageReadyRef.current = true;
            tryReveal();
          }, MAX_WAIT)
        );

        // Drive navigation through a transition so `isPending` tracks the load.
        startTransition(() => router.push(href));
      },
    });
    tl.set(panel, { display: "flex", yPercent: 100 });
    tl.set(mark, { opacity: 0, scale: 0.98, y: 14 });
    tl.to(panel, { yPercent: 0, duration: 0.95, ease: "power2.inOut" });
    tl.to(
      mark,
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.55"
    );
  };

  // Intercept internal-link clicks before <Link> handles them.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        !href.startsWith("/") ||
        href.startsWith("//")
      )
        return;

      const dest = href.split(/[?#]/)[0];
      e.preventDefault(); // stop native nav + tell <Link> to stand down
      if (busyRef.current || dest === pathname) return;
      cover(href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // The new page is "ready" when the navigation transition settles.
  useEffect(() => {
    if (!armedRef.current || isPending) return;
    pageReadyRef.current = true;
    tryReveal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, pathname]);

  useEffect(() => () => clearTimers(), []);

  return (
    <div
      ref={panelRef}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--overlay)] will-change-transform"
      style={{ display: "none" }}
    >
      <div ref={markRef} className="will-change-transform">
        <Image
          src="/mileva-logo.png"
          alt=""
          width={4000}
          height={3080}
          priority
          className="h-auto w-[clamp(280px,36vw,540px)] [filter:brightness(0)_invert(1)]"
        />
      </div>
    </div>
  );
}
