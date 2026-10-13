"use client";
import { useEffect, useRef } from "react";
import { why } from "@/content/home";
import { parallax } from "@/motion/parallax";
import { BlockLabel } from "../BlockLabel";
import { ModelPhoto } from "../models/ModelPhoto";

/**
 * Bloque 02 · Por qué Zontes: la historia de la marca en un solo bloque, en lugar de cinco pantallas.
 * Cuatro tarjetas en dos columnas que van a distinta velocidad (parallax); adentro, cada foto se desliza en su
 * cuadro y el dato grande se adelanta. Con «reducir movimiento» queda quieto (motion/parallax.ts).
 */
export function Why() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => parallax(root.current!), []);
  const { origen, motor, luces, tablero } = why;

  return (
    <section ref={root} className="section why" id="por-que" data-theme="noche" data-parallax aria-labelledby="por-que-title">
      <div className="wrap">
        <div className="block-head">
          <BlockLabel id="por-que" />
          <h2 id="por-que-title" className="h2">
            {why.title}
          </h2>
          <p className="lead">{why.lede}</p>
        </div>

        <div className="why-grid">
          <article className="why-card why-card--origen" data-speed="0.06" aria-labelledby="why-origen">
            <div className="why-media scene-frame">
              <ModelPhoto photo={origen.photo} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <Text id="origen" stat={origen.stat} title={origen.title} body={origen.body} />
          </article>

          <article className="why-card why-card--motor" data-speed="-0.06" aria-labelledby="why-motor">
            <ul className="why-media why-bikes">
              {motor.bikes.map((b, i) => (
                <li key={b.name} data-speed={[0.03, -0.03, 0.05][i]}>
                  <span className="why-bike">
                    <ModelPhoto photo={b.photo} sizes="(min-width: 1024px) 15vw, 30vw" />
                  </span>
                  <span className="why-bike-name">
                    {b.name} <span className="num">{b.cc} cc</span>
                  </span>
                </li>
              ))}
            </ul>
            <Text id="motor" stat={motor.stat} unit={motor.unit} title={motor.title} body={motor.body} />
          </article>

          <article className="why-card why-card--side why-card--tablero" data-speed="0.06" aria-labelledby="why-tablero">
            <div className="why-media scene-frame">
              <ModelPhoto photo={tablero.photo} sizes="(min-width: 1024px) 22vw, 100vw" />
            </div>
            <Text id="tablero" stat={tablero.stat} title={tablero.title} body={tablero.body} points={tablero.points} />
          </article>

          <article className="why-card why-card--side why-card--luces" data-speed="-0.06" aria-labelledby="why-luces">
            <div className="why-media scene-frame">
              <ModelPhoto photo={luces.photo} sizes="(min-width: 1024px) 22vw, 100vw" />
            </div>
            <Text id="luces" stat={luces.stat} title={luces.title} body={luces.body} />
          </article>
        </div>

        <p className="small why-note">{why.caption}</p>
      </div>
    </section>
  );
}

function Text({ id, stat, unit, title, body, points }: { id: string; stat: string; unit?: string; title: string; body: string; points?: string[] }) {
  return (
    <div className="why-text">
      <p className="why-stat num" aria-hidden="true" data-speed="-0.05">
        {stat}
        {unit && <small>{unit}</small>}
      </p>
      <h3 id={`why-${id}`} className="why-title">
        {title}
      </h3>
      <p className="why-body">{body}</p>
      {points && (
        <ul className="scene-points">
          {points.map((p) => (
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
}
