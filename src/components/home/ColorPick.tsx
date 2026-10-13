"use client";
import { useState } from "react";
import { colorPicks } from "@/content/home";
import { ModelPhoto, giantInk } from "../models/ModelPhoto";
import { TLink } from "../TLink";

/**
 * «Elegí el color»: los colores de la gama que ya tienen foto. Cada pastilla cambia la foto y el nombre gigante
 * de atrás, que toma la pintura de la moto. El nombre y la moto se mueven a distinta velocidad al bajar.
 */
export function ColorPick({ num }: { num: string }) {
  const [i, setI] = useState(0);
  const c = colorPicks[i];
  return (
    <section className="scene scene--color" data-theme="dia" data-parallax aria-labelledby="escena-colores">
      <div className="wrap scene-grid">
        <div className="scene-copy" data-speed="-0.06">
          <p className="scene-num num">
            {num} <span>/ {num}</span>
          </p>
          <h2 className="h2" id="escena-colores">
            Elegí el color
          </h2>
          <p className="lead">Colores reales de la gama actual. Tocá uno para ver la moto.</p>
          <div className="color-chips" role="group" aria-label="Colores">
            {colorPicks.map((p, k) => (
              <button key={p.model + p.name} type="button" aria-pressed={k === i} onClick={() => setI(k)} style={{ "--paint": p.hex } as React.CSSProperties}>
                <span className="dot" aria-hidden="true" />
                {p.name} <span className="chip-model">{p.model}</span>
              </button>
            ))}
          </div>
          <TLink href={`/modelos/${c.slug}/`} label={c.model} className="btn btn--line">
            Ver la Zontes {c.model}
          </TLink>
        </div>

        <div className="color-stage" style={{ "--paint": c.hex, "--ink": giantInk(c.hex), "--len": c.model.length } as React.CSSProperties}>
          <div className="color-giant-layer" aria-hidden="true" data-speed="0.16">
            <p className="color-giant" key={`n-${i}`}>
              {c.model}
            </p>
          </div>
          <div className="color-bike" data-speed="-0.05">
            <ModelPhoto key={c.photo.src} photo={c.photo} className="color-photo" sizes="(min-width: 1024px) 46vw, 100vw" />
          </div>
          <p className="sr-only" aria-live="polite">
            Zontes {c.model}, {c.name.toLowerCase()}
          </p>
        </div>
      </div>
    </section>
  );
}
