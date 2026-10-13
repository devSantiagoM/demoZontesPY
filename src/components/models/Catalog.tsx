"use client";
import { useMemo, useState } from "react";
import { byPower, models, useLabel, type Kind, type Use } from "@/content/models";
import { ModelRows } from "./ModelRows";

type KindF = "todos" | Kind;
type UseF = "todos" | Use;
type FamF = "todas" | "200" | "350" | "368" | "703";

const kinds: { id: KindF; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "moto", label: "Motos" },
  { id: "scooter", label: "Scooters" },
];
const uses: UseF[] = ["todos", "ciudad", "ruta", "tierra", "pista"];
const fams: FamF[] = ["todas", "200", "350", "368", "703"];

/** Catálogo con filtros: tipo, uso y familia de motor. */
export function Catalog() {
  const [kind, setKind] = useState<KindF>("todos");
  const [use, setUse] = useState<UseF>("todos");
  const [fam, setFam] = useState<FamF>("todas");

  const items = useMemo(
    () => byPower(models.filter((m) => (kind === "todos" || m.kind === kind) && (use === "todos" || m.uses.includes(use)) && (fam === "todas" || m.family === fam))),
    [kind, use, fam],
  );
  const reset = () => {
    setKind("todos");
    setUse("todos");
    setFam("todas");
  };

  return (
    <>
      <div className="filters" role="group" aria-label="Filtrar modelos">
        <fieldset>
          <legend>Tipo</legend>
          {kinds.map((k) => (
            <button key={k.id} type="button" aria-pressed={kind === k.id} onClick={() => setKind(k.id)}>
              {k.label}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>Para</legend>
          {uses.map((u) => (
            <button key={u} type="button" aria-pressed={use === u} onClick={() => setUse(u)}>
              {u === "todos" ? "Todo" : useLabel[u]}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>Motor</legend>
          {fams.map((f) => (
            <button key={f} type="button" aria-pressed={fam === f} onClick={() => setFam(f)}>
              {f === "todas" ? "Todos" : `${f === "200" ? 198 : f === "350" ? 348 : f === "368" ? 368 : 699} cc`}
            </button>
          ))}
        </fieldset>
      </div>
      <p className="count small" aria-live="polite">
        {items.length === 1 ? "1 modelo" : `${items.length} modelos`}
      </p>
      {items.length ? (
        <ModelRows items={items} headingLevel={2} />
      ) : (
        <div className="empty">
          <p className="lead">Ningún modelo combina esos filtros.</p>
          <button type="button" className="btn btn--line" onClick={reset}>
            Quitar filtros
          </button>
        </div>
      )}
    </>
  );
}
