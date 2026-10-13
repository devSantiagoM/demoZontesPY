"use client";
import { useState, type FormEvent } from "react";
import { dealer, mapsLink, waLink } from "@/content/dealer";
import { reasons } from "@/content/home";
import { byPower, motos, scooters } from "@/content/models";
import type { SectionId } from "@/content/sections";
import { BlockLabel } from "./BlockLabel";
import { ChatIcon, PinIcon } from "./Icons";

/**
 * Contacto por WhatsApp: el formulario arma el mensaje y abre WhatsApp con el texto listo para enviar.
 * No hay servidor ni datos guardados: el sitio es estático.
 * En la portada va en día, con su rótulo («04 — Contacto»), pegado a Servicio; en su página y en las fichas, de noche.
 */
export function ContactBlock({ model, titleAs = "h2", theme = "noche", label }: { model?: string; titleAs?: "h1" | "h2"; theme?: "dia" | "noche"; label?: SectionId }) {
  const [error, setError] = useState("");
  const T = titleAs;

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("nombre") ?? "").trim();
    if (!name) {
      setError("Escribí tu nombre para que sepamos a quién responder.");
      (e.currentTarget.elements.namedItem("nombre") as HTMLInputElement).focus();
      return;
    }
    setError("");
    const lines = [
      `Hola, soy ${name}.`,
      `Motivo: ${f.get("motivo")}.`,
      f.get("modelo") ? `Modelo: Zontes ${f.get("modelo")}.` : "",
      String(f.get("mensaje") ?? "").trim(),
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <section className={`section contact${label ? " contact--block" : ""}`} id="contacto" data-theme={theme} aria-labelledby="contacto-title">
      <div className="wrap contact-grid">
        <div>
          {label && <BlockLabel id={label} />}
          <T id="contacto-title" className="h2">
            Escribinos
          </T>
          <p className="lead">Te respondemos por WhatsApp en el horario del showroom.</p>
          <form className="form" onSubmit={submit} noValidate>
            <label className="field">
              <span>Nombre</span>
              <input name="nombre" autoComplete="name" required aria-invalid={error ? true : undefined} aria-describedby={error ? "form-error" : undefined} />
            </label>
            <div className="field-row">
              <label className="field">
                <span>Motivo</span>
                <select name="motivo" defaultValue={reasons[0]}>
                  {reasons.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Modelo</span>
                <select name="modelo" defaultValue={model ?? ""}>
                  <option value="">Todavía no sé</option>
                  <optgroup label="Motos">
                    {byPower(motos).map((m) => (
                      <option key={m.slug}>{m.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Scooters">
                    {scooters.map((m) => (
                      <option key={m.slug}>{m.name}</option>
                    ))}
                  </optgroup>
                </select>
              </label>
            </div>
            <label className="field">
              <span>Mensaje (opcional)</span>
              <textarea name="mensaje" rows={3} />
            </label>
            {error && (
              <p className="form-error" id="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="btn btn--signal" type="submit">
              <ChatIcon />
              Enviar por WhatsApp
            </button>
            {dealer.demo && <p className="small demo-note">Propuesta de diseño: el número de WhatsApp es de ejemplo.</p>}
          </form>
        </div>
        <aside className="showroom" aria-label="Showroom">
          <h3 className="h3">Showroom en {dealer.city}</h3>
          <p>{dealer.address}</p>
          <dl className="hours">
            {dealer.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd className="num">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p>
            <a href={`tel:${dealer.phone.replace(/\s/g, "")}`}>{dealer.phone}</a>
            <br />
            <a href={`mailto:${dealer.email}`}>{dealer.email}</a>
          </p>
          <a className="btn btn--line" href={mapsLink()} target="_blank" rel="noopener noreferrer">
            <PinIcon />
            Cómo llegar
          </a>
        </aside>
      </div>
    </section>
  );
}
