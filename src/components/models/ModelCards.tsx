import { missingPhotoNote, paintOf, type Model } from "@/content/models";
import { TLink } from "../TLink";
import { giantInk, ModelPhoto, PaintPlate } from "./ModelPhoto";

const dec = (n: number) => String(n).replace(".", ",");

/** Tarjetas de modelos: la foto delante del nombre gigante (o la placa pintada si todavía no hay foto). */
export function ModelCards({ items }: { items: Model[] }) {
  return (
    <ul className="cards">
      {items.map((m) => {
        const paint = m.paints.find((p) => p.photo) ?? m.paints[0];
        const hex = paint?.hex ?? paintOf(m);
        return (
          <li key={m.slug}>
            <TLink href={`/modelos/${m.slug}/`} label={m.name} className="card" style={{ "--paint": hex, "--ink": giantInk(hex), "--len": m.name.length } as React.CSSProperties}>
              <span className="card-panel" aria-hidden="true">
                {paint?.photo ? (
                  <>
                    <span className="card-giant">{m.name}</span>
                    <ModelPhoto photo={paint.photo} decorative sizes="(min-width: 1024px) 30vw, 100vw" />
                  </>
                ) : (
                  <PaintPlate name={m.name} note={missingPhotoNote(m)} hex={hex} />
                )}
              </span>
              <span className="card-row">
                <span className="card-name">{m.name}</span>
                <span className="card-meta num">
                  {m.cc} cc · {dec(m.hp)} hp
                </span>
              </span>
              <span className="card-cat">{m.category}</span>
            </TLink>
          </li>
        );
      })}
    </ul>
  );
}
