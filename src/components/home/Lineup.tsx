"use client";
import { useEffect, useMemo, useState } from "react";
import { waLink } from "@/content/dealer";
import { roads } from "@/content/home";
import { byPower, models, motos, scooters, type Kind, type Model } from "@/content/models";
import { ScrollTrigger } from "@/motion/core";
import { refreshHeaderTheme } from "@/motion/header";
import { BlockLabel } from "../BlockLabel";
import { ChatIcon } from "../Icons";
import { ModelRows } from "../models/ModelRows";
import { TLink } from "../TLink";

type RoadId = (typeof roads)[number]["id"];
type UseF = "todo" | RoadId;

const kinds: { id: Kind; label: string; total: number }[] = [
  { id: "moto", label: "Motos", total: motos.length },
  { id: "scooter", label: "Scooters", total: scooters.length },
];

const fits = (m: Model, kind: Kind, use: UseF) => m.kind === kind && (use === "todo" || m.uses.includes(use));

/**
 * Bloque 01 · Modelos: el único lugar de la portada donde se elige una moto.
 * Junta lo que antes estaba repartido en cuatro partes (la gama, «Para nuestros caminos», «Elegí el color» y las
 * motos de la historia): la lista con su vitrina (y los colores de cada modelo), filtrada por tipo y por camino.
 * Al elegir un camino, el fondo pasa a la foto de ese camino, desenfocada, y las recomendadas van primero.
 */
export function Lineup() {
  const [kind, setKind] = useState<Kind>("moto");
  const [use, setUse] = useState<UseF>("todo");
  const road = use === "todo" ? null : roads.find((r) => r.id === use)!;

  const items = useMemo(() => {
    const list = models.filter((m) => fits(m, kind, use));
    const r = use === "todo" ? null : roads.find((x) => x.id === use)!;
    if (!r) return byPower(list);
    const picks = r.picks.map((p) => list.find((m) => m.slug === p.slug)).filter((m): m is Model => !!m);
    return [...picks, ...byPower(list.filter((m) => !picks.includes(m)))];
  }, [kind, use]);
  const notes = road ? Object.fromEntries(road.picks.map((p) => [p.slug, p.why])) : undefined;
  const count = (u: UseF) => models.filter((m) => fits(m, kind, u)).length;

  // La sección cambia de alto y de tema: se recalculan las posiciones del scroll y el color del encabezado.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      refreshHeaderTheme();
    });
    return () => cancelAnimationFrame(id);
  }, [kind, use]);

  const noun = kind === "moto" ? (items.length === 1 ? "moto" : "motos") : items.length === 1 ? "scooter" : "scooters";

  return (
    <section className={`section gama${road ? " has-road" : ""}`} id="modelos" data-theme={road ? "noche" : "dia"} aria-labelledby="modelos-title">
      <div className="gama-bg" aria-hidden="true">
        {roads.map((r) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={r.id}
            className={`gama-bg-img${r.id === use ? " is-on" : ""}`}
            src={r.photo.src}
            width={r.photo.w}
            height={r.photo.h}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ objectPosition: r.bgPos }}
          />
        ))}
        <span className="gama-scrim" />
      </div>

      <div className="wrap gama-inner">
        <div className="gama-head">
          <BlockLabel id="modelos" />
          <h2 id="modelos-title" className="h2">
            Elegí tu Zontes
          </h2>
          <p className="lead">
            {motos.length} motos y {scooters.length} scooters, de 198 a 699 cc. Filtrá por dónde vas a andar y pasá por cada modelo para verlo.
          </p>
        </div>

        <div className="gama-filters">
          <div className="seg-field">
            <span className="seg-legend" id="f-tipo">
              Tipo
            </span>
            <div className="tabs" role="group" aria-labelledby="f-tipo">
              {kinds.map((k) => (
                <button key={k.id} type="button" aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>
                  {k.label} <span className="num">{k.total}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="seg-field">
            <span className="seg-legend" id="f-uso">
              Para
            </span>
            <div className="tabs" role="group" aria-labelledby="f-uso">
              {(["todo", ...roads.map((r) => r.id)] as UseF[]).map((u) => (
                <button key={u} type="button" aria-pressed={use === u} onClick={() => setUse(u)}>
                  {u === "todo" ? "Todo" : roads.find((r) => r.id === u)!.label} <span className="num">{count(u)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="gama-status" aria-live="polite">
          {road ? (
            <p className="gama-road" key={road.id}>
              <strong>{road.title}.</strong> {road.body}
            </p>
          ) : null}
          <p className="count small">
            {items.length} {noun}
            {road ? ` para ${road.label.toLowerCase()}` : ""}
            {notes && items.some((m) => notes[m.slug]) ? " · primero, nuestras recomendadas" : ""}
          </p>
        </div>

        <div className="gama-panel">
          {items.length ? (
            // key: al cambiar un filtro, la vitrina arranca en el primero de la lista (la primera recomendada)
            <ModelRows key={`${kind}-${use}`} items={items} notes={notes} noteLabel={road ? `Recomendada para ${road.label.toLowerCase()}` : undefined} />
          ) : (
            <div className="empty">
              <p className="lead">No hay {kind === "moto" ? "motos" : "scooters"} para ese camino.</p>
              <button type="button" className="btn btn--line" onClick={() => setUse("todo")}>
                Ver todos
              </button>
            </div>
          )}
        </div>

        <div className="gama-foot">
          <p className="small gama-note">{road ? `${road.caption} ` : ""}Fotos ilustrativas. Especificaciones de referencia publicadas por Zontes Argentina.</p>
          <div className="gama-actions">
            {road && (
              <a className="btn btn--signal" href={waLink(`Hola, quiero consultar por una moto para ${road.label.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">
                <ChatIcon />
                {road.cta}
              </a>
            )}
            <TLink href="/modelos/" label="Modelos" className="btn btn--ghost">
              Comparar con más filtros
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}
