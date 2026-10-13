"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger, scrollToTarget, startLenis, stopLenis } from "@/motion/core";
import { reveal } from "@/motion/curtain";
import { setHeaderTheme, watchSections } from "@/motion/header";

/**
 * Montado una vez en el layout: scroll suave, cambio de página (arriba de todo o al ancla, y la cortina
 * se retira) y el tema del encabezado según la sección.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    startLenis();
    return () => stopLenis();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    scrollToTarget(0, true);
    const first = document.querySelector<HTMLElement>("main [data-theme]");
    setHeaderTheme(first?.dataset.theme ?? "dia");
    let unwatch = () => {};
    // Un cuadro después: la página nueva ya está en el DOM y medida.
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      unwatch = watchSections();
      if (hash && hash.length > 1) setTimeout(() => scrollToTarget(hash), 350);
      reveal();
    });
    return () => {
      cancelAnimationFrame(id);
      unwatch();
    };
  }, [pathname]);

  return null;
}
