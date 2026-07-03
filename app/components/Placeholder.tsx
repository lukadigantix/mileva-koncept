import Image from "next/image";

type PlaceholderProps = {
  /** Stable seed so a given slot always yields the same placeholder image. */
  seed: string;
  alt: string;
  /** Grayscale + dark tint to match the site's charcoal media treatment. */
  dark?: boolean;
  priority?: boolean;
  className?: string;
};

/**
 * Placeholder media. Uses deterministic picsum.photos images (fill layout) so
 * every media slot has stable, realistic-looking imagery until real assets are
 * dropped in. Swap the `src` here when wiring up the real CMS.
 */
export default function Placeholder({
  seed,
  alt,
  dark = false,
  priority = false,
  className,
}: PlaceholderProps) {
  const src = `https://picsum.photos/seed/${encodeURIComponent(
    seed
  )}/1600/1200${dark ? "?grayscale" : ""}`;

  return (
    <div className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        unoptimized
      />
      {dark && (
        <div
          aria-hidden
          className="absolute inset-0 bg-[var(--overlay)]/45 mix-blend-multiply"
        />
      )}
    </div>
  );
}
