"use client";
import { useEffect, useRef } from "react";
import { story, type Scene } from "@/content/home";
import { parallax } from "@/motion/parallax";
import { ModelPhoto } from "../models/ModelPhoto";
import { ColorPick } from "./ColorPick";

/** Palabra o número grande, casi del color del fondo, que va atrás de cada escena y se mueve más lento. */
const backWord: Record<string, string> = { origen: "2003", motor: "699 cc", luces: "LED", tablero: "TFT" };
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * El recorrido de la portada en cinco escenas con fotos. Cada escena tiene capas a distinta velocidad (parallax):
 * la palabra del fondo se queda atrás, las fotos se deslizan dentro de su cuadro y los textos se adelantan.
 */
export function Story() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => parallax(root.current!), []);

  return (
    <div ref={root} id="historia" className="story">
      {story.map((s, i) => (
        <SceneView key={s.id} scene={s} index={i} />
      ))}
      <ColorPick num={pad(story.length + 1)} />
    </div>
  );
}

function SceneView({ scene: s, index }: { scene: Scene; index: number }) {
  const num = pad(index + 1);
  const head = (
    <div className="scene-copy" data-speed="-0.08">
      <p className="scene-num num">
        {num} <span>/ {pad(story.length + 1)}</span>
      </p>
      <h2 className="h2" id={`escena-${s.id}`}>
        {s.title}
      </h2>
      <p className="lead">{s.body}</p>
      {s.layout === "collage" && (
        <ul className="scene-points">
          {s.points.map((p) => (
            <li key={p}>
              <svg viewBox="0 0 10 10" aria-hidden="true">
                <path d="M5 0 10 5 5 10 0 5Z" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <section className={`scene scene--${s.layout}${index % 2 ? " is-flipped" : ""}`} data-theme={s.theme} data-parallax aria-labelledby={`escena-${s.id}`}>
      <p className="scene-word" aria-hidden="true" data-speed="0.22">
        {backWord[s.id] ?? ""}
      </p>
      <div className="wrap scene-grid">
        {head}

        {s.layout === "split" && (
          <figure className="scene-figure" data-speed="0.05">
            <div className="scene-frame" style={{ aspectRatio: s.photo.w > s.photo.h ? "5 / 4" : "4 / 5" }}>
              <ModelPhoto photo={s.photo} sizes="(min-width: 1024px) 46vw, 100vw" />
            </div>
            {s.caption && <figcaption>{s.caption}</figcaption>}
          </figure>
        )}

        {s.layout === "trio" && (
          <ul className="scene-trio">
            {s.bikes.map((b, k) => (
              <li key={b.name} data-speed={[0.04, -0.06, 0.12][k]}>
                <span className="trio-panel">
                  <span className="trio-cc num" aria-hidden="true">
                    {b.cc}
                  </span>
                  <span className="trio-bike" data-speed={[-0.05, 0.04, -0.08][k]}>
                    <ModelPhoto photo={b.photo} sizes="(min-width: 1024px) 30vw, 100vw" />
                  </span>
                </span>
                <span className="trio-name">
                  Zontes {b.name} <span className="num">· {b.cc} cc</span>
                </span>
              </li>
            ))}
          </ul>
        )}

        {s.layout === "collage" && (
          <figure className="scene-collage">
            <div className="scene-frame collage-a" data-speed="0.06">
              <ModelPhoto photo={s.photos[0]} sizes="(min-width: 1024px) 34vw, 70vw" />
            </div>
            <div className="scene-frame collage-b" data-speed="-0.14">
              <ModelPhoto photo={s.photos[1]} sizes="(min-width: 1024px) 22vw, 45vw" />
            </div>
            {s.caption && <figcaption>{s.caption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
