"use client";
import { useState } from "react";
import { bandPhrases } from "@/content/home";
import { byPower, motos, scooters } from "@/content/models";
import { Band } from "../Band";
import { ModelRows } from "../models/ModelRows";
import { onTabKeys } from "../tabKeys";
import { TLink } from "../TLink";

const tabs = [
  { id: "motos", label: "Motos", items: byPower(motos) },
  { id: "scooters", label: "Scooters", items: byPower(scooters) },
] as const;
type TabId = (typeof tabs)[number]["id"];
const ids = tabs.map((t) => t.id);

export function Lineup() {
  const [tab, setTab] = useState<TabId>("motos");
  const current = tabs.find((t) => t.id === tab)!;
  return (
    <section className="section gama" id="gama" data-theme="dia" aria-labelledby="gama-title">
      <div className="wrap">
        <div className="gama-head">
          <h2 id="gama-title" className="h2">
            La gama
          </h2>
          <p className="lead">
            {motos.length} motos y {scooters.length} scooters, de 198 a 699 cc. Pasá por cada modelo para verlo.
          </p>
          <div className="tabs" role="tablist" aria-label="Tipo de vehículo">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="gama-panel"
                tabIndex={tab === t.id ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onTabKeys(e, ids, tab, setTab, (id) => `tab-${id}`)}
              >
                {t.label} <span className="num">{t.items.length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Band items={bandPhrases} />
      <div className="wrap">
        <div id="gama-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="gama-panel">
          <ModelRows items={[...current.items]} />
        </div>
        <p className="small gama-note">Fotos ilustrativas. Especificaciones de referencia publicadas por Zontes Argentina.</p>
        <TLink href="/modelos/" label="Modelos" className="btn btn--ghost gama-all">
          Ver todos los modelos con filtros
        </TLink>
      </div>
    </section>
  );
}
