"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { dealer, waLink } from "@/content/dealer";
import { getLenis, gsap, reducedMotion } from "@/motion/core";
import { ChatIcon } from "./Icons";
import { TLink } from "./TLink";

const nav = [
  { href: "/modelos/", label: "Modelos" },
  { href: "/#caminos", label: "Caminos" },
  { href: "/#servicio", label: "Servicio" },
  { href: "/contacto/", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  // El panel sigue a la vista mientras se cierra: el encabezado mantiene los colores claros hasta que termina.
  const [shown, setShown] = useState(false);
  const pathname = usePathname();
  const menu = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  /**
   * Apertura del menú en capas (parallax): el panel baja como una cortina desde el encabezado; atrás, la palabra
   * ZONTES sube despacio y se ensancha; adelante, los enlaces suben rápido uno tras otro; al final, el contacto.
   * Cada capa se mueve a otra velocidad y eso da la profundidad. Al cerrar, la misma secuencia al revés y más rápida.
   */
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "expo.out" },
          onReverseComplete: () => {
            el.setAttribute("hidden", "");
            setShown(false);
          },
        })
        .fromTo(el, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75, ease: "expo.inOut" }, 0)
        .fromTo(".mm-word", { yPercent: 45, fontStretch: "62%" }, { yPercent: 0, fontStretch: "125%", duration: 1.3 }, 0.12)
        .fromTo(".mm-link", { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.07 }, 0.28)
        .fromTo(".mm-num", { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.07 }, 0.45)
        .fromTo(".mm-foot > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 0.55);
    }, el);
    return () => ctx.revert();
  }, []);

  // Abrir y cerrar: el estado de ARIA cambia enseguida; el panel se oculta del todo cuando termina de cerrarse.
  useEffect(() => {
    const el = menu.current;
    const t = tl.current;
    if (!el) return;
    const html = document.documentElement;
    if (open) {
      el.removeAttribute("hidden");
      setShown(true);
      html.classList.add("menu-abierto");
      getLenis()?.stop();
      if (reducedMotion() || !t) t?.progress(1);
      else t.timeScale(1).play();
      el.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    } else {
      html.classList.remove("menu-abierto");
      if (!html.classList.contains("con-carga")) getLenis()?.start();
      if (!t || el.hasAttribute("hidden")) return;
      if (reducedMotion()) {
        t.progress(0);
        el.setAttribute("hidden", "");
        setShown(false);
      } else t.timeScale(1.7).reverse();
    }
  }, [open]);

  // Al cambiar de página se cierra sin animación (la cortina de transición ya tapa todo).
  useEffect(() => {
    setOpen(false);
    setShown(false);
    tl.current?.progress(0);
    menu.current?.setAttribute("hidden", "");
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (href: string) => (href === "/modelos/" ? pathname.startsWith("/modelos") : pathname === href);

  return (
    <header className={`site-header${open ? " is-open" : ""}${shown ? " menu-visible" : ""}`} id="site-header" data-theme="dia">
      <div className="wrap header-row">
        <TLink href="/" label="Zontes Paraguay" className="brand" aria-label="Zontes Paraguay, inicio">
          <span className="brand-mark">Zontes</span>
          <span className="brand-sub">Paraguay</span>
        </TLink>
        <nav className="nav" aria-label="Principal">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <TLink href={n.href} label={n.label} aria-current={current(n.href) ? "page" : undefined}>
                  {n.label}
                </TLink>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn btn--signal header-cta" href={waLink("Hola, quiero consultar por una Zontes.")} target="_blank" rel="noopener noreferrer">
          <ChatIcon />
          <span>Escribinos</span>
        </a>
        <button ref={button} type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <span className="menu-lines" aria-hidden="true" />
        </button>
      </div>
      <div id="mobile-menu" className="mobile-menu" ref={menu} hidden>
        <p className="mm-word" aria-hidden="true">
          Zontes
        </p>
        <nav className="wrap mm-inner" aria-label="Menú">
          <ul className="mm-list">
            {nav.map((n, i) => (
              <li key={n.href}>
                <TLink href={n.href} label={n.label} className="mm-item" aria-current={current(n.href) ? "page" : undefined} onClick={() => setOpen(false)}>
                  <span className="mm-link">{n.label}</span>
                  <span className="mm-num num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </TLink>
              </li>
            ))}
          </ul>
          <div className="mm-foot">
            <a className="btn btn--signal" href={waLink("Hola, quiero consultar por una Zontes.")} target="_blank" rel="noopener noreferrer">
              <ChatIcon />
              Escribinos por WhatsApp
            </a>
            <p className="small">
              Showroom en {dealer.city}
              <br />
              {dealer.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
