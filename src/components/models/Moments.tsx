"use client";
import { useState } from "react";
import type { Moment } from "@/content/models";
import { onTabKeys } from "../tabKeys";
import { ModelPhoto } from "./ModelPhoto";

const words = ["", "un", "dos", "tres", "cuatro", "cinco", "seis"];
const pad = (n: number) => String(n).padStart(2, "0");

/** «Una moto, cuatro momentos»: pestañas con fotos de uso y el equipamiento que entra en juego en cada una. */
export function Moments({ model, items }: { model: string; items: Moment[] }) {
  const [id, setId] = useState(items[0].id);
  const i = Math.max(0, items.findIndex((x) => x.id === id));
  const m = items[i];
  const ids = items.map((x) => x.id);
  const count = words[items.length] ?? String(items.length);

  return (
    <section className="section moments" data-theme="noche" aria-labelledby="momentos-title">
      <div className="wrap moments-grid">
        <div className="moments-intro">
          <p className="eyebrow">La {model} en uso</p>
          <h2 id="momentos-title" className="h2">
            Una moto, {count} momentos
          </h2>
          <p className="lead">Elegí un momento para ver el equipamiento que entra en juego.</p>
          <div className="moment-tabs" role="tablist" aria-label="Momentos">
            {items.map((x, k) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                id={`momento-${x.id}`}
                aria-selected={x.id === m.id}
                aria-controls="momento-panel"
                tabIndex={x.id === m.id ? 0 : -1}
                onClick={() => setId(x.id)}
                onKeyDown={(e) => onTabKeys(e, ids, m.id, setId, (y) => `momento-${y}`)}
              >
                <span className="moment-num num">{pad(k + 1)}</span>
                <span className="moment-label">{x.label}</span>
                <svg className="moment-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="moment-panel" id="momento-panel" role="tabpanel" aria-labelledby={`momento-${m.id}`}>
          <figure className="moment-frame" key={m.id}>
            <ModelPhoto photo={m.photo} sizes="(min-width: 1024px) 600px, 100vw" />
            <span className="moment-count num" aria-hidden="true">
              {pad(i + 1)} / {pad(items.length)}
            </span>
            <figcaption className="moment-credit">Foto ilustrativa</figcaption>
          </figure>
          <h3 className="h3 moment-title">{m.title}</h3>
          <p className="moment-body">{m.body}</p>
          <ul className="moment-points">
            {m.points.map((p) => (
              <li key={p}>
                <svg viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M5 0 10 5 5 10 0 5Z" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
