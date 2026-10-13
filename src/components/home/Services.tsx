import { services } from "@/content/home";
import { waLink } from "@/content/dealer";

const actions: Record<string, { label: string; text: string } | undefined> = {
  prueba: { label: "Agendar prueba", text: "Hola, quiero agendar una prueba de manejo." },
  financiacion: { label: "Consultar planes", text: "Hola, quiero consultar los planes de financiación." },
  service: { label: "Pedir turno", text: "Hola, quiero pedir un turno para service." },
};

export function Services() {
  return (
    <section className="section services" id="servicio" data-theme="dia" aria-labelledby="servicio-title">
      <div className="wrap">
        <h2 id="servicio-title" className="h2 services-title">
          Comprá con respaldo
        </h2>
        <ul className="services-list">
          {services.map((s) => {
            const a = actions[s.id];
            return (
              <li key={s.id}>
                <h3 className="h3">{s.title}</h3>
                <p>{s.body}</p>
                {a && (
                  <a className="btn btn--ghost" href={waLink(a.text)} target="_blank" rel="noopener noreferrer">
                    {a.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
