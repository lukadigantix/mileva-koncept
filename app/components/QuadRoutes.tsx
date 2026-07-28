"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SplitText from "./SplitText";
import Reveal from "./Reveal";
import { useLang } from "../i18n/LanguageProvider";
import type { PublicQuadRoute } from "../lib/api";
import type { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/** Isti bazni stil kao u admin panelu (Carto Positron, bez API ključa). */
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const LINE = "#ca5d39"; // var(--main)
const LINE_ACTIVE = "#a94e30";

const layerId = (id: string) => `route-${id}`;

/**
 * Quad routes - the marked trails drawn in the backend admin, rendered on an
 * interactive MapLibre map (loaded lazily on the client; the module never runs
 * during SSR). The list and the map stay in sync: picking a route from the list
 * or clicking its line highlights it and fits the view to it. Closes with the
 * contact CTA, since bookings go through the contact page for now.
 */
export default function QuadRoutes({ routes }: { routes: PublicQuadRoute[] }) {
  const { t } = useLang();
  const c = t.quads.routes;

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  // Modul se čuva radi LngLatBounds u efektu selekcije.
  const mglRef = useRef<typeof import("maplibre-gl") | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const fitTo = (coordSets: [number, number][][]) => {
    const mgl = mglRef.current;
    const map = mapRef.current;
    const all = coordSets.flat();
    if (!mgl || !map || !all.length) return;
    const bounds = all.reduce(
      (b, coord) => b.extend(coord),
      new mgl.LngLatBounds(all[0], all[0])
    );
    map.fitBounds(bounds, { padding: 56, duration: 900 });
  };

  // Inicijalizacija mape + iscrtavanje svih ruta.
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !routes.length) return;

    let disposed = false;
    (async () => {
      const mgl = await import("maplibre-gl");
      if (disposed || !containerRef.current) return;
      mglRef.current = mgl;

      const map = new mgl.Map({
        container,
        style: MAP_STYLE,
        center: routes[0].coordinates[0] ?? [20.9, 44.0],
        zoom: 11,
        // Kompaktna atribucija (samo ⓘ, tekst na klik) umesto podrazumevane
        // stalno raširene trake; OSM/Carto licenca traži da postoji.
        attributionControl: false,
      });
      map.addControl(new mgl.AttributionControl({ compact: true }));
      // Kompaktnu atribuciju maplibre sam raširi kad stil stigne (doda `open` +
      // compact-show) — sklopi je posle učitavanja, da ostane samo ⓘ dugme.
      const collapseAttrib = () => {
        const attrib = container.querySelector("details.maplibregl-ctrl-attrib");
        attrib?.classList.remove("maplibregl-compact-show");
        attrib?.removeAttribute("open");
      };
      map.on("load", collapseAttrib);
      map.once("idle", collapseAttrib);
      mapRef.current = map;

      map.on("load", () => {
        for (const route of routes) {
          map.addSource(layerId(route.id), {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "LineString", coordinates: route.coordinates },
            },
          });
          map.addLayer({
            id: layerId(route.id),
            type: "line",
            source: layerId(route.id),
            layout: { "line-cap": "round", "line-join": "round" },
            paint: { "line-color": LINE, "line-width": 4, "line-opacity": 0.85 },
          });
          map.on("click", layerId(route.id), () => setActiveId(route.id));
          map.on("mouseenter", layerId(route.id), () => {
            map.getCanvas().style.cursor = "pointer";
          });
          map.on("mouseleave", layerId(route.id), () => {
            map.getCanvas().style.cursor = "";
          });
        }
        setMapReady(true);
        fitTo(routes.map((r) => r.coordinates));
      });
    })();

    return () => {
      disposed = true;
      setMapReady(false);
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [routes]);

  // Selekcija: istakni izabranu liniju i uklopi pogled na nju.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    for (const route of routes) {
      const active = route.id === activeId;
      map.setPaintProperty(layerId(route.id), "line-color", active ? LINE_ACTIVE : LINE);
      map.setPaintProperty(layerId(route.id), "line-width", active ? 6 : 4);
    }
    const selected = routes.find((r) => r.id === activeId);
    fitTo(selected ? [selected.coordinates] : routes.map((r) => r.coordinates));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, mapReady]);

  const meta = (route: PublicQuadRoute) =>
    [
      `${route.distanceKm} km`,
      route.difficulty ? c.difficulty[route.difficulty] : null,
    ]
      .filter(Boolean)
      .join("  ·  ");

  return (
    <section className="bg-[var(--bg)] py-[clamp(5rem,11vw,11rem)]">
      <div className="mx-[var(--gutter)]">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo/mileva-logo-icon.png"
            alt=""
            width={1306}
            height={1453}
            className="mb-[clamp(1rem,2vw,1.5rem)] block h-[38px] w-auto"
          />
          <span className="text-[12px] uppercase tracking-[0.3em] text-[var(--main)]">
            {c.eyebrow}
          </span>
          <SplitText
            as="h2"
            text={c.heading}
            className="mt-[clamp(0.75rem,1.5vw,1.25rem)] text-center text-[clamp(1.35rem,4.4vw,1.7rem)] leading-[1.3] tracking-[-0.01em] text-[var(--dark)]"
          />
          <p className="mt-[clamp(1rem,2vw,1.5rem)] max-w-[46ch] text-[clamp(13px,3.4vw,15px)] leading-relaxed text-[var(--hint)]">
            {c.body}
          </p>
        </div>

        {/* Route list - a centred column of hairline rows (same idiom as the
            landmarks list); the active one is terracotta. */}
        <Reveal from={24} className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] w-full max-w-2xl">
          <ul>
              {routes.map((route) => {
                const active = route.id === activeId;
                return (
                  <li key={route.id} className="border-b border-[var(--border)]">
                    <button
                      type="button"
                      onClick={() => setActiveId(active ? null : route.id)}
                      className="block w-full cursor-pointer py-[clamp(1rem,2.2vw,1.5rem)] text-left"
                    >
                      <span className="flex items-baseline justify-between gap-6">
                        <span
                          className={`text-[clamp(16px,4vw,18px)] transition-colors duration-300 ${
                            active ? "text-[var(--main)]" : "text-[var(--dark)]"
                          }`}
                        >
                          {route.name}
                        </span>
                        <span className="shrink-0 text-[13px] uppercase tracking-[0.18em] text-[var(--main)]">
                          {meta(route)}
                        </span>
                      </span>
                      {route.description && (
                        <span className="mt-1 block max-w-[52ch] text-[14px] leading-relaxed text-[var(--hint)]">
                          {route.description}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
          </ul>
        </Reveal>

        {/* Map - full width below the list; lenis-prevent so wheel zoom works
            inside the canvas. */}
        <Reveal from={24} delay={0.05} className="mt-[clamp(2.5rem,5vw,4rem)]">
          {/* NAPOMENA: bez position utility-ja ovde - maplibre svojom
              `maplibregl-map` klasom postavlja position:relative, pa bi
              npr. sticky + top samo pomerio mapu preko sadržaja ispod. */}
          <div
            ref={containerRef}
            data-lenis-prevent
            className="h-[clamp(360px,55vh,560px)] w-full overflow-hidden rounded-[var(--radius2)] bg-[var(--light)]"
          />
        </Reveal>

        {/* Contact CTA - bookings go through the contact page. */}
        <div className="mt-[clamp(3rem,6vw,5rem)] flex flex-col items-center text-center">
          <p className="max-w-[48ch] text-[17.78px] leading-relaxed text-[var(--dark)]">
            {t.quads.cta.body}
          </p>
          <Link
            href="/kontakt"
            className="link-underline mt-[clamp(1.25rem,2.5vw,1.75rem)] text-[clamp(1rem,1.3vw,1.15rem)] text-[var(--main)]"
          >
            {t.quads.cta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
