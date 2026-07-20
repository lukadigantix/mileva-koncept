"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "./SmoothScroll";

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
  /** id of the element that labels the dialog (for aria-labelledby). */
  labelledBy?: string;
  /** Accessible label for the close button. */
  closeLabel: string;
};

/**
 * Shared modal shell - a centred panel over a dark, blurred backdrop, rendered
 * through a portal on <body> so it escapes any transformed/overflow-clipped
 * ancestor. Handles its own enter/exit transition, Escape-to-close, backdrop-
 * click-to-close and body scroll-lock. The panel is size-capped and scrolls
 * internally, so any content stays usable on phones and desktops alike.
 *
 * Motion is deliberately soft and coordinated (analysis: "suptilno, lagano"):
 *  - enter: the backdrop fades in first, then the panel gently rises + settles
 *    a beat later (slow decelerate curve) so nothing pops.
 *  - exit: the panel eases away first, the backdrop lingers and fades last, so
 *    the two never fight. Durations are matched to the unmount delay so the
 *    close never gets clipped.
 *
 * Mount it only while it should be visible (`{open && <Modal .../>}`); it plays
 * the exit transition itself before calling `onClose`, so unmount after that.
 */

// Gentle decelerate on the way in, gentle accelerate on the way out.
const EASE_ENTER = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_EXIT = "cubic-bezier(0.4, 0, 0.6, 1)";
// Total exit time (backdrop delay + duration) - the unmount waits exactly this.
const EXIT_TOTAL_MS = 620;

export default function Modal({ onClose, children, labelledBy, closeLabel }: ModalProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const lenis = useLenis();
  // Guard against a double close (Escape fired during the exit timeout, etc.).
  const closingRef = useRef(false);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    setVisible(false);
    window.setTimeout(onClose, EXIT_TOTAL_MS);
  }, [onClose]);

  // Enter: flip to visible on the next frame after mount so the transition runs
  // (setState deferred inside rAF, so this doesn't trip set-state-in-effect).
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Escape closes; lock the page behind the modal. The site scrolls via Lenis
  // (a virtual, transform-based scroll), so `overflow: hidden` alone won't stop
  // it - we pause the Lenis instance too and resume it on close. The modal's own
  // subtree carries `data-lenis-prevent` so its internal scroll still works.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Capture the instance so cleanup resumes the exact one we paused.
    const lenisInstance = lenis?.current;
    lenisInstance?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenisInstance?.start();
    };
  }, [handleClose, lenis]);

  if (typeof document === "undefined") return null;

  const ease = closing ? EASE_EXIT : EASE_ENTER;

  const backdropStyle: CSSProperties = {
    opacity: visible ? 1 : 0,
    transitionProperty: "opacity",
    // Fades in first (no delay) on enter; lingers and fades last on exit.
    transitionDuration: closing ? "500ms" : "540ms",
    transitionDelay: closing ? "120ms" : "0ms",
    transitionTimingFunction: ease,
    willChange: "opacity",
  };

  const panelStyle: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.985)",
    transitionProperty: "opacity, transform",
    // Settles a beat after the backdrop on enter; leaves first on exit.
    transitionDuration: closing ? "440ms" : "620ms",
    transitionDelay: closing ? "0ms" : "100ms",
    transitionTimingFunction: ease,
    willChange: "opacity, transform",
  };

  return createPortal(
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(1rem,4vw,2.5rem)]"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={closeLabel}
        onClick={handleClose}
        style={backdropStyle}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-md"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        style={panelStyle}
        className="relative z-10 flex max-h-[88vh] w-full max-w-[min(64rem,100%)] flex-col overflow-hidden rounded-[var(--radius2)] bg-[var(--bg)] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.55)]"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label={closeLabel}
          className="absolute right-[clamp(0.75rem,1.5vw,1.25rem)] top-[clamp(0.75rem,1.5vw,1.25rem)] z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)]/70 text-[var(--dark)] backdrop-blur-sm transition-colors duration-300 hover:bg-[var(--dark)] hover:text-[var(--bg)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
