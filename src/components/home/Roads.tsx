"use client";
import { useState } from "react";
import { roads } from "@/content/home";
import { waLink } from "@/content/dealer";
import { getModel, paintOf, photoOf } from "@/content/models";
import { ChatIcon } from "../Icons";
import { ModelPhoto, PaintPlate } from "../models/ModelPhoto";
import { onTabKeys } from "../tabKeys";
import { TLink } from "../TLink";

const ids = roads.map((r) => r.id);

/**
 * «Para nuestros caminos»: la foto de cada camino es el fondo de la sección, desenfocada lo justo para que la moto
 * se reconozca y los textos se lean. Al cambiar de camino, el fondo funde de una foto a otra.
 */
export function Roads() {
  const [id, setId] = useState(roads[0].id);
  const road = roads.find((r) => r.id === id)!;
  return (
    <section className="section roads" id="caminos" data-theme="noche" aria-labelledby="caminos-title">
      <div className="roads-bg" aria-hidden="true">
        {roads.map((r) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={r.id}
            className={`roads-bg-img${r.id === id ? " is-on" : ""}`}
            src={r.photo.src}
            width={r.photo.w}
            height={r.photo.h}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ objectPosition: r.bgPos }}
          />
        ))}
        <span className="roads-scrim" />
      </div>

      <div className="wrap roads-inner">
        <div className="roads-head">
          <div className="roads-intro">
            <p className="eyebrow">Elegí por dónde andás</p>
            <h2 id="caminos-title" className="h2">
              Para nuestros caminos
            </h2>
          </div>
          <div className="tabs tabs--glass" role="tablist" aria-label="Tipo de camino">
            {roads.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                id={`road-${r.id}`}
                aria-selected={id === r.id}
                aria-controls="road-panel"
                tabIndex={id === r.id ? 0 : -1}
                onClick={() => setId(r.id)}
                onKeyDown={(e) => onTabKeys(e, ids, id, setId, (x) => `road-${x}`)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="road-panel" id="road-panel" role="tabpanel" aria-labelledby={`road-${road.id}`} key={road.id}>
          <div className="road-copy">
            <span className="road-tag" aria-hidden="true">
              {road.label}
            </span>
            <h3 className="road-title">{road.title}</h3>
            <p className="road-body">{road.body}</p>
          </div>

          <p className="picks-title">Nuestras recomendadas</p>
          <ul className="road-cards">
            {road.picks.map((p) => {
              const m = getModel(p.slug)!;
              const photo = photoOf(m);
              return (
                <li key={p.slug}>
                  <TLink href={`/modelos/${m.slug}/`} label={m.name} className="road-card">
                    <span className="road-card-tile" aria-hidden="true">
                      {photo ? <ModelPhoto photo={photo} decorative sizes="(min-width: 1024px) 30vw, 100vw" /> : <PaintPlate name={m.name} note="Foto oficial: próximamente" hex={paintOf(m)} />}
                    </span>
                    <span className="road-card-row">
                      <span className="road-card-text">
                        <span className="road-card-name">Zontes {m.name}</span>
                        <span className="road-card-why">{p.why}</span>
                      </span>
                      <svg className="road-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </TLink>
                </li>
              );
            })}
          </ul>

          <div className="road-foot">
            <a className="btn btn--signal" href={waLink(`Hola, quiero consultar por una moto para ${road.label.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">
              <ChatIcon />
              {road.cta}
            </a>
            <p className="road-caption">{road.caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
