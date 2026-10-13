"use client";
import { gsap, reducedMotion } from "./core";

/**
 * Capas parallax con GSAP ScrollTrigger (scrub): cada elemento con `data-speed` se desplaza en vertical mientras su
 * escena (`[data-parallax]`) cruza la pantalla.
 *
 * - `data-speed` positivo: la capa se queda atrás (va más lenta que el scroll, como algo lejano).
 *   Negativo: se adelanta (más rápida, como algo cercano). El valor es la fracción del alto de la ventana que
 *   recorre de punta a punta: 0,1 = 10 % de la pantalla.
 * - `data-frame-img` (o una foto dentro de `.scene-frame`): una foto en un cuadro con `overflow: hidden`; se agranda un poco y se desliza adentro
 *   del cuadro, así la foto parece estar más lejos que el cuadro.
 *
 * Con «reducir movimiento» no se mueve nada.
 */
export function parallax(root: HTMLElement) {
  if (reducedMotion()) return () => {};
  const ctx = gsap.context(() => {
    root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0");
      if (!speed) return;
      const trigger = el.closest<HTMLElement>("[data-parallax]") ?? el;
      gsap.fromTo(
        el,
        { y: () => (-speed * window.innerHeight) / 2 },
        {
          y: () => (speed * window.innerHeight) / 2,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        },
      );
    });
    root.querySelectorAll<HTMLElement>("[data-frame-img], .scene-frame > img").forEach((img) => {
      const frame = img.parentElement!;
      gsap.fromTo(
        img,
        { yPercent: -6, scale: 1.15 },
        { yPercent: 6, scale: 1.15, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
  }, root);
  return () => ctx.revert();
}
