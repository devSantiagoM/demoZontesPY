"use client";
import { useEffect, useRef } from "react";
import { hero } from "@/content/home";
import { waLink } from "@/content/dealer";
import { photos } from "@/content/photos";
import { gsap, reducedMotion } from "@/motion/core";
import { whenLoaded } from "@/motion/loader";
import { ChatIcon } from "../Icons";
import { TLink } from "../TLink";

const bike = photos.f703.plata;

/**
 * Portada con foto, en capas: atrás la palabra gigante ZONTES (en el mismo lugar que la de la pantalla de carga),
 * adelante la 703F de estudio y el texto. Al bajar, cada capa va a otra velocidad: la palabra se queda atrás, la
 * moto sube y se acerca, el texto se va primero. Con mouse, la moto y la palabra siguen al puntero en sentidos
 * opuestos, apenas. Con «reducir movimiento» queda quieta.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current!;
    const RM = reducedMotion();
    let disposed = false;
    const ctx = gsap.context(() => {}, section);

    // Entrada. Si hubo pantalla de carga, la palabra ya se ensanchó ahí: solo entran la moto y el texto.
    whenLoaded().then(({ fromLoader }) => {
      if (disposed || RM) return;
      ctx.add(() => {
        if (!fromLoader) {
          gsap.fromTo(".hero-word span", { fontStretch: "62%", opacity: 0 }, { fontStretch: "125%", opacity: 1, duration: 1.6, ease: "expo.out", stagger: 0.06, delay: 0.1 });
        }
        gsap.from(".hero-bike-in", { xPercent: 14, opacity: 0, duration: 1.5, ease: "expo.out", delay: fromLoader ? 0.1 : 0.35 });
        gsap.from(".hero-copy > *", { y: 28, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, delay: fromLoader ? 0.2 : 0.45 });
      });
    });

    if (!RM) {
      // Parallax al bajar: tres capas, tres velocidades.
      ctx.add(() => {
        const st = { trigger: section, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero-word", { yPercent: 70, ease: "none", scrollTrigger: st });
        gsap.to(".hero-bike-scroll", { yPercent: -22, scale: 1.06, ease: "none", scrollTrigger: st });
        gsap.to(".hero-copy", { y: -90, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "65% top" } });
        gsap.to(".hero-cue", { opacity: 0, ease: "none", scrollTrigger: { ...st, end: "15% top" } });
      });

      // Parallax con el puntero (solo mouse).
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const bx = gsap.quickTo(section.querySelector(".hero-bike-pointer"), "x", { duration: 1, ease: "power3" });
        const by = gsap.quickTo(section.querySelector(".hero-bike-pointer"), "y", { duration: 1, ease: "power3" });
        const wx = gsap.quickTo(section.querySelector(".hero-word-pointer"), "x", { duration: 1.4, ease: "power3" });
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          bx(nx * 28);
          by(ny * 14);
          wx(nx * -16);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        ctx.add(() => () => window.removeEventListener("pointermove", onMove));
      }
    }

    return () => {
      disposed = true;
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="hero" data-theme="dia" aria-labelledby="hero-title">
      <div className="hero-word-layer" aria-hidden="true">
        <div className="hero-word-pointer">
          <p className="hero-word">
            {"Zontes".split("").map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </p>
        </div>
      </div>

      <div className="hero-bike">
        <div className="hero-bike-scroll">
          <div className="hero-bike-pointer">
            <div className="hero-bike-in">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bike.src} width={bike.w} height={bike.h} alt={bike.alt} fetchPriority="high" decoding="async" />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap hero-ui">
        <div className="hero-copy">
          <h1 id="hero-title" className="h1">
            {hero.title}
          </h1>
          <p className="lead">{hero.lede}</p>
          <div className="hero-actions">
            <TLink href="/modelos/" label="Modelos" className="btn btn--line">
              {hero.primary}
            </TLink>
            <a className="btn btn--signal" href={waLink("Hola, quiero agendar una prueba de manejo.")} target="_blank" rel="noopener noreferrer">
              <ChatIcon />
              {hero.secondary}
            </a>
          </div>
        </div>
        <TLink href="/#historia" className="hero-cue" aria-label="Bajar a la historia de Zontes">
          <span>Bajá</span>
          <span className="hero-cue-line" aria-hidden="true" />
        </TLink>
      </div>
    </section>
  );
}
