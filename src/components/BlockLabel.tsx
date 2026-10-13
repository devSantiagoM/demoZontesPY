import { sectionLabel, sectionNum, type SectionId } from "@/content/sections";

/** Rótulo de cada bloque de la portada («01 — Modelos»): el mismo nombre y número que en el menú. */
export function BlockLabel({ id }: { id: SectionId }) {
  return (
    <p className="block-label">
      <span className="num">{sectionNum(id)}</span>
      {sectionLabel(id)}
    </p>
  );
}
