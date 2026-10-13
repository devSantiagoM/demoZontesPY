"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, getLenis, ScrollTrigger } from "@/motion/core";

/**
 * Indicador de scroll propio, en lugar de la barra del navegador (que se oculta en base.css).
 *
 * Con GSAP: un ScrollTrigger de toda la página (start 0, end "max") y su onUpdate, que da `self.progress` (0 a 1).
 * El scroll sigue siendo el nativo (Lenis y ScrollTrigger leen la misma posición), así que nada cambia para las
 * animaciones. Aparece al scrollear y se apaga quieto; con mouse se puede arrastrar o tocar para saltar.
 * Usa mezcla «difference» para verse igual sobre el aluminio, la noche y las fotos.
 */
export function ScrollBar() {
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const tr = track.current!;
    const th = thumb.current!;
    const setY = gsap.quickSetter(th, "y", "px");
    let thumbH = 40;
    let progress = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const layout = () => {
      const max = ScrollTrigger.maxScroll(window);
      const trackH = tr.clientHeight;
      tr.classList.toggle("is-empty", max < 4);
      // Como una barra de verdad: el largo del indicador es la parte de la página que entra en pantalla.
      thumbH = Math.max(32, Math.round((trackH * window.innerHeight) / (max + window.innerHeight)));
      th.style.height = `${thumbH}px`;
      setY(progress * (trackH - thumbH));
    };

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        progress = self.progress;
        setY(progress * (tr.clientHeight - thumbH));
        tr.classList.add("is-scrolling");
        clearTimeout(idle);
        idle = setTimeout(() => tr.classList.remove("is-scrolling"), 900);
      },
      onRefresh: (self) => {
        progress = self.progress;
        layout();
      },
    });
    layout();

    // Si la página cambia de alto (fotos que cargan, pestañas, filtros), se recalcula solo este ScrollTrigger.
    const ro = new ResizeObserver(() => {
      st.refresh();
      layout();
    });
    ro.observe(document.body);

    // Arrastrar o tocar la pista lleva a esa parte de la página.
    const scrollToPointer = (e: PointerEvent) => {
      const r = tr.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (e.clientY - r.top - thumbH / 2) / (r.height - thumbH)));
      const y = p * ScrollTrigger.maxScroll(window);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      e.preventDefault();
      tr.setPointerCapture(e.pointerId);
      tr.classList.add("is-dragging");
      scrollToPointer(e);
      const onMove = (ev: PointerEvent) => scrollToPointer(ev);
      const onUp = () => {
        tr.classList.remove("is-dragging");
        tr.removeEventListener("pointermove", onMove);
        tr.removeEventListener("pointerup", onUp);
        tr.removeEventListener("pointercancel", onUp);
      };
      tr.addEventListener("pointermove", onMove);
      tr.addEventListener("pointerup", onUp);
      tr.addEventListener("pointercancel", onUp);
    };
    tr.addEventListener("pointerdown", onDown);

    return () => {
      st.kill();
      ro.disconnect();
      clearTimeout(idle);
      tr.removeEventListener("pointerdown", onDown);
    };
  }, [pathname]);

  return (
    <div className="scrollbar" ref={track} aria-hidden="true">
      <span className="scrollbar-thumb" ref={thumb} />
    </div>
  );
}
