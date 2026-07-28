import Image from "next/image";

/**
 * Leisure gallery - the dark four-column band. Same signature treatment as the
 * home Restaurants section (grayscale image that brightens on hover, the Mileva
 * mark centred over each). Alternates pools / celebrations.
 *
 * IMAGES are the real filenames the client will provide, in the intended order
 * (bazeni1, proslave1, bazeni2, proslave2). Placeholder copies live in /public
 * for now - dropping the final shots in with the same names needs no code change.
 */
const IMAGES = ["/smestaj/bazeni1.webp", "/smestaj/proslave1.webp", "/smestaj/bazeni2.webp", "/smestaj/proslave2.webp"];

export default function LeisureGallery() {
  return (
    <section data-dark-section className="bg-[var(--overlay)] text-[var(--bg)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:min-h-screen">
        {IMAGES.map((image, i) => (
          <div
            key={image}
            className="group relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden border-[var(--border2)] px-[var(--space)] py-[var(--space)] text-center lg:min-h-0 lg:border-r lg:last:border-r-0"
          >
            {/* Background image - dark, brightens on hover. */}
            <div className="absolute inset-0">
              <div className="relative h-full w-full scale-105 opacity-60 grayscale transition-all duration-700 ease-[var(--ease-expo-out)] group-hover:scale-100 group-hover:opacity-90 group-hover:grayscale-0">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:opacity-20" />
            </div>

            {/* Centred Mileva mark - no label. */}
            <div className="relative z-10 flex flex-col items-center">
              <Image
                src="/logo/mileva-logo-text.png"
                alt={i === 0 ? "Mileva" : ""}
                width={3266}
                height={701}
                className="h-[clamp(28px,3.2vw,40px)] w-auto [filter:brightness(0)_invert(1)]"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
