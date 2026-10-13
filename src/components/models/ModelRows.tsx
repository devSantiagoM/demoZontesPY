"use client";
import { useEffect, useState } from "react";
import { ChatIcon } from "@/components/Icons";
import { waLink } from "@/content/dealer";
import { missingPhotoNote, paintOf, photoOf, type Model } from "@/content/models";
import { TLink } from "../TLink";
import { giantInk, ModelPhoto, PaintPlate } from "./ModelPhoto";

const fmt = (n: number) => n.toLocaleString("es-PY");
const dec = (n: number) => String(n).replace(".", ",");

/**
 * La gama como lista: el nombre de cada modelo, grande, y sus números en columnas.
 * En pantallas anchas, al pasar el cursor (o el foco) por una fila, la vitrina de al lado muestra la foto del
 * modelo delante de su nombre gigante, sus datos y sus colores. En tablet y teléfono cada fila lleva su miniatura.
 */
export function ModelRows({ items, headingLevel = 3 }: { items: Model[]; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug);
  const [paintIdx, setPaintIdx] = useState(0);
  const active = items.find((m) => m.slug === activeSlug) ?? items[0];

  // Si cambian los filtros o la pestaña y el modelo elegido ya no está, la vitrina vuelve al primero.
  useEffect(() => {
    if (!items.some((m) => m.slug === activeSlug)) {
      setActiveSlug(items[0]?.slug);
      setPaintIdx(0);
    }
  }, [items, activeSlug]);

  const pick = (slug: string) => {
    if (slug === active?.slug) return;
    setActiveSlug(slug);
    setPaintIdx(0);
  };

  if (!active) return null;
  // El nombre más largo de la lista: con él se calcula un tamaño de letra que entra aunque se ensanche.
  const maxLen = Math.max(...items.map((m) => m.name.length));

  return (
    <div className="gama-split">
      <ul className="rows" style={{ "--maxlen": maxLen } as React.CSSProperties}>
        {items.map((m) => {
          const photo = photoOf(m);
          return (
            <li key={m.slug}>
              <TLink
                href={`/modelos/${m.slug}/`}
                label={m.name}
                className={`row${m.slug === active.slug ? " is-active" : ""}`}
                onPointerEnter={() => pick(m.slug)}
                onFocus={() => pick(m.slug)}
                style={{ "--paint": paintOf(m) } as React.CSSProperties}
              >
                <span className="row-thumb" aria-hidden="true">
                  {photo ? <ModelPhoto photo={photo} decorative sizes="140px" /> : <PaintPlate name={m.name} hex={paintOf(m)} />}
                </span>
                <H className="row-name">
                  <span className="row-name-text">{m.name}</span>
                </H>
                <span className="row-cat">{m.category}</span>
                <span className="row-num num">
                  {m.cc} <small>cc</small>
                </span>
                <span className="row-num num">
                  {dec(m.hp)} <small>hp</small>
                </span>
              </TLink>
            </li>
          );
        })}
      </ul>
      <Showcase model={active} paintIdx={Math.min(paintIdx, Math.max(0, active.paints.length - 1))} onPaint={setPaintIdx} />
    </div>
  );
}

function Showcase({ model: m, paintIdx, onPaint }: { model: Model; paintIdx: number; onPaint: (i: number) => void }) {
  const paint = m.paints[paintIdx];
  const hex = paint?.hex ?? paintOf(m);
  const photo = paint?.photo;
  const specs = [
    { label: "Cilindrada", value: fmt(m.cc), unit: "cc" },
    { label: "Potencia", value: dec(m.hp), unit: "hp" },
    { label: "Asiento", value: fmt(m.seat), unit: "mm" },
    m.weight ? { label: "Peso", value: fmt(m.weight), unit: "kg" } : null,
  ].filter(Boolean) as { label: string; value: string; unit: string }[];

  return (
    <aside className="showcase" aria-label={`Zontes ${m.name}`} style={{ "--paint": hex, "--ink": giantInk(hex), "--len": m.name.length } as React.CSSProperties}>
      <div className="showcase-panel">
        {photo ? (
          <>
            <p className="showcase-giant" aria-hidden="true" key={m.slug}>
              {m.name}
            </p>
            <ModelPhoto key={photo.src} photo={photo} className="showcase-photo" sizes="(min-width: 1440px) 600px, 44vw" />
          </>
        ) : (
          <PaintPlate key={`${m.slug}-${paintIdx}`} className="showcase-plate" name={m.name} note={missingPhotoNote(m, paint)} hex={hex} />
        )}
      </div>
      <div className="showcase-title">
        <p className="showcase-name">Zontes {m.name}</p>
        <p className="showcase-cat">{m.category}</p>
      </div>
      <dl className="showcase-specs">
        {specs.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd className="num">
              {s.value} <span>{s.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
      <div className="showcase-foot">
        {m.paints.length > 0 && (
          <div className="color-chips" role="group" aria-label="Colores">
            {m.paints.map((p, i) => (
              <button key={p.hex + p.name} type="button" aria-pressed={i === paintIdx} onClick={() => onPaint(i)} style={{ "--paint": p.hex } as React.CSSProperties}>
                <span className="dot" aria-hidden="true" />
                {p.name}
              </button>
            ))}
          </div>
        )}
        <div className="showcase-actions">
          <TLink href={`/modelos/${m.slug}/`} label={m.name} className="btn btn--line">
            Ver la ficha
          </TLink>
          <a className="btn btn--signal" href={waLink(`Hola, quiero consultar por la Zontes ${m.name}.`)} target="_blank" rel="noopener noreferrer">
            <ChatIcon />
            Consultar
          </a>
        </div>
      </div>
    </aside>
  );
}
