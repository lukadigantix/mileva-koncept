import Image from "next/image";
import MediaReveal from "./MediaReveal";

/**
 * Dynamic #2 - full-width media block (analysis §4). A centered dark 16:9 media
 * panel with gutters, scroll-scrubbed for continuous parallax depth.
 */
export default function MediaBlock() {
  return (
    <section className="bg-[var(--bg)] pb-[clamp(6rem,12vw,12rem)]">
      <div className="mx-[var(--gutter)]">
        <MediaReveal
          className="aspect-video w-full rounded-[var(--radius2)]"
          parallax
          duration={1.4}
        >
          <Image
            src="/midhero.webp"
            alt="Odmaralište Mileva"
            fill
            sizes="90vw"
            className="object-cover"
          />
        </MediaReveal>
      </div>
    </section>
  );
}
