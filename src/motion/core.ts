"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lo compartido por toda la animación del sitio: GSAP con ScrollTrigger y un único Lenis (scroll suave).
 * Lenis avanza con el reloj de GSAP, así el scroll y las animaciones van en el mismo cuadro.
 * Con «reducir movimiento» no hay Lenis: el scroll es el nativo.
 */
let lenis: Lenis | null = null;
let raf: ((time: number) => void) | null = null;

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function startLenis() {
  if (lenis || reducedMotion()) return lenis;
  lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: false });
  lenis.on("scroll", ScrollTrigger.update);
  raf = (time) => lenis?.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function stopLenis() {
  if (raf) gsap.ticker.remove(raf);
  lenis?.destroy();
  lenis = null;
  raf = null;
}

export const getLenis = () => lenis;

/** Lleva el scroll a un elemento o posición, con Lenis si está activo. */
export function scrollToTarget(target: string | number | HTMLElement, immediate = false) {
  const offset = typeof target === "number" ? 0 : -8;
  if (lenis) lenis.scrollTo(target, { immediate, offset, duration: 1.2 });
  else if (typeof target === "number") window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: immediate || reducedMotion() ? "auto" : "smooth", block: "start" });
  }
}

export { gsap, ScrollTrigger };
