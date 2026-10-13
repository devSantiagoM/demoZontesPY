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
