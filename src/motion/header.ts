"use client";

/**
 * El encabezado es transparente y toma el tema de la sección que tiene debajo (día, noche, tierra o pintura).
 * La portada, que cambia de día a noche mientras está fijada, actualiza su data-theme y el encabezado lo sigue.
 */
export function setHeaderTheme(theme: string | undefined) {
  const header = document.getElementById("site-header");
  if (header && theme && header.dataset.theme !== theme) header.dataset.theme = theme;
}

/** El tema de lo que está debajo del encabezado ahora (la región con tema más interna, por ejemplo una franja). */
function themeUnderHeader() {
  for (const el of document.elementsFromPoint(window.innerWidth / 2, 36)) {
    if (el.closest("#site-header")) continue;
    const region = el.closest<HTMLElement>("main [data-theme], footer[data-theme]");
    if (region) return region.dataset.theme;
  }
}

/**
 * Mira qué hay debajo del encabezado en cada scroll (un cuadro por vez) y toma su tema. No depende de posiciones
 * calculadas de antemano, así sigue andando aunque la página cambie de alto (fotos que cargan, pestañas, la
 * portada fija o quieta con «reducir movimiento»).
 */
export function watchSections() {
  let raf = 0;
  const update = () => {
    raf = 0;
    const theme = themeUnderHeader();
    if (theme) setHeaderTheme(theme);
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(raf);
  };
}

/** Vuelve a mirar el tema debajo del encabezado sin esperar un scroll (por ejemplo, si una sección cambió de tema). */
export function refreshHeaderTheme() {
  const theme = themeUnderHeader();
  if (theme) setHeaderTheme(theme);
}

/**
 * Qué bloque de la portada se está leyendo: el último cuyo borde de arriba ya pasó el 40 % de la pantalla.
 * Antes del primero (la portada) no hay ninguno. Avisa solo cuando cambia.
 */
export function watchBlocks(ids: readonly string[], onChange: (id: string | null) => void) {
  let raf = 0;
  let last: string | null | undefined;
  const update = () => {
    raf = 0;
    const line = window.innerHeight * 0.4;
    let current: string | null = null;
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= line) current = id;
    }
    if (current !== last) {
      last = current;
      onChange(current);
    }
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(raf);
  };
}
