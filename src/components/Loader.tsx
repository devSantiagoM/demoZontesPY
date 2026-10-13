"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, getLenis, ScrollTrigger } from "@/motion/core";
import { loaderActive, releaseLoaded } from "@/motion/loader";
import { LOADER_SESSION_KEY as SESSION_KEY } from "./loaderBoot";

const MIN = 2000; // la carga dura al menos esto, para que se lea
const MAX = 5000; // y nunca más que esto, aunque algo no termine de cargar

/**
 * Pantalla de carga «Acelera»: la palabra ZONTES se ensancha mientras carga el sitio (fuentes y fotos de la
 * página), con un contador de 000 a 100 km/h. Al llegar a 100 el ámbar hace el guiño dos veces y la
 * cortina de asfalto sube. Se muestra una vez por sesión y nunca con «reducir movimiento» (lo decide el script
 * del <head>, antes de pintar, así no hay parpadeo).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLParagraphElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el || !loaderActive()) {
      setGone(true);
      return;
    }
    (window as unknown as { __zontesCarga?: boolean }).__zontesCarga = true;

    // Lo que la carga espera de verdad.
    const tasks: Promise<unknown>[] = [
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ];
    let done = 0;
    tasks.forEach((t) => t.then(() => done++, () => done++));

    const t0 = performance.now();
    let shown = 0;
    let raf = 0;
    let finished = false;
    const easeOut = (u: number) => 1 - Math.pow(1 - u, 3);

    const render = (p: number) => {
      if (word.current) word.current.style.fontStretch = `${(62 + 63 * p).toFixed(1)}%`;
      if (num.current) num.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
    };

    const finish = () => {
      finished = true;
      el.classList.add("is-done");
      if (label.current) label.current.textContent = "Listo";
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {}
      // El guiño (dos parpadeos, en CSS) y después sube la cortina.
      gsap.delayedCall(0.66, () => {
        const html = document.documentElement;
        html.classList.remove("con-carga");
        html.classList.add("carga-lista");
        getLenis()?.start();
        releaseLoaded();
        gsap.to(el, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.95,
          ease: "expo.inOut",
          onComplete: () => {
            setGone(true);
            ScrollTrigger.refresh();
          },
        });
      });
    };

    const tick = (now: number) => {
      const lenis = getLenis();
      if (lenis && !lenis.isStopped) lenis.stop();
      const t = Math.max(0, now - t0); // el primer cuadro puede traer una hora anterior a t0
      const all = done >= tasks.length;
      const timeP = easeOut(Math.min(1, t / MIN));
      // Mientras falte algo, el contador no pasa de 90; si se demora demasiado, termina igual.
      const cap = all || t > MAX ? 1 : Math.min(0.9, 0.2 + (0.7 * done) / tasks.length);
      const target = Math.min(timeP, cap);
      shown += (target - shown) * 0.12;
      if (target === 1 && shown > 0.995) shown = 1;
      render(shown);
      if (shown === 1 && !finished) finish();
      if (!finished) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;
  return (
    <div className="loader" id="loader" ref={root} aria-hidden="true">
      <p className="loader-word" ref={word}>
        Zontes
      </p>
      <div className="loader-top">
        <span>Motos y scooters · 198 a 699 cc</span>
        <span>Dreams never stop</span>
      </div>
      <div className="loader-bottom">
        <div className="loader-count">
          <span className="loader-label" ref={label}>
            Cargando
          </span>
          <span className="loader-speed">
            <span className="loader-num num" ref={num}>
              000
            </span>
            <small>km/h</small>
          </span>
        </div>
        <svg className="loader-blink" viewBox="0 0 56 40" aria-hidden="true">
          <path d="M20 4 4 20l16 16v-9h32V13H20Z" />
        </svg>
      </div>
      <span className="loader-track">
        <span className="loader-bar" ref={bar} />
      </span>
    </div>
  );
}

