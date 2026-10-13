"use client";
import { gsap, reducedMotion } from "./core";

/**
 * Transición entre páginas: una cortina de asfalto sube con el nombre del destino, la página cambia
 * detrás y la cortina sigue de largo hacia arriba. Con «reducir movimiento» el cambio es directo.
 */
let covering = false;

const el = () => document.getElementById("curtain");

export function cover(label: string) {
  const curtain = el();
  if (!curtain || reducedMotion()) return Promise.resolve();
  covering = true;
  const text = curtain.querySelector(".curtain-label");
  if (text) text.textContent = label;
  return new Promise<void>((resolve) => {
    gsap.killTweensOf(curtain);
    gsap.set(curtain, { visibility: "visible" });
    gsap.fromTo(curtain, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "expo.inOut", onComplete: resolve });
    if (text) gsap.fromTo(text, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, delay: 0.15, ease: "expo.out" });
  });
}

export function reveal() {
  const curtain = el();
  if (!curtain || !covering) return;
  covering = false;
  gsap.killTweensOf(curtain);
  gsap.to(curtain, {
    clipPath: "inset(0% 0% 100% 0%)",
    duration: 0.8,
    delay: 0.1,
    ease: "expo.inOut",
    onComplete: () => void gsap.set(curtain, { visibility: "hidden", clipPath: "inset(100% 0% 0% 0%)" }),
  });
}

export const isCovering = () => covering;
