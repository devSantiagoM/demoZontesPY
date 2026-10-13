import type { KeyboardEvent } from "react";

/**
 * Flechas, Inicio y Fin para moverse entre pestañas (patrón de pestañas de ARIA): la pestaña elegida es la
 * única con tabIndex 0, así Tab entra al grupo una vez y las flechas recorren las opciones.
 */
export function onTabKeys<T extends string>(e: KeyboardEvent, ids: readonly T[], current: T, select: (id: T) => void, domId: (id: T) => string) {
  const i = ids.indexOf(current);
  let next = -1;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % ids.length;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + ids.length) % ids.length;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = ids.length - 1;
  if (next < 0) return;
  e.preventDefault();
  select(ids[next]);
  document.getElementById(domId(ids[next]))?.focus();
}
