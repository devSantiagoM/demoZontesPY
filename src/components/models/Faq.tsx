import { ChatIcon } from "@/components/Icons";
import { waLink } from "@/content/dealer";
import { faqs } from "@/content/home";

/** Preguntas frecuentes de la ficha. Con `<details>`: se abren con teclado y lector de pantalla sin JavaScript. */
export function Faq({ model }: { model: string }) {
  const items = faqs(model);
  return (
    <section className="section faq" data-theme="dia" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="faq-head">
          <h2 id="faq-title" className="h2">
            Preguntas frecuentes
          </h2>
          <p className="lead">¿Otra duda sobre la {model}? Te respondemos por WhatsApp.</p>
          <a className="btn btn--signal" href={waLink(`Hola, tengo una consulta sobre la Zontes ${model}.`)} target="_blank" rel="noopener noreferrer">
            <ChatIcon />
            Escribinos
          </a>
        </div>
        <div className="faq-list">
          {items.map((f, i) => (
            <details key={f.q} name="faq" open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M12 5v14" />
                  </svg>
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
