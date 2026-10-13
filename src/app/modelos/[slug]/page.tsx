import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Band } from "@/components/Band";
import { ContactBlock } from "@/components/ContactBlock";
import { ChatIcon } from "@/components/Icons";
import { Faq } from "@/components/models/Faq";
import { ModelCards } from "@/components/models/ModelCards";
import { giantInk, ModelPhoto, PaintPlate } from "@/components/models/ModelPhoto";
import { Moments } from "@/components/models/Moments";
import { TLink } from "@/components/TLink";
import { waLink } from "@/content/dealer";
import { getModel, isLight, missingPhotoNote, models, paintOf, photoOf, related, type Model } from "@/content/models";

export const dynamicParams = false;
export const generateStaticParams = () => models.map((m) => ({ slug: m.slug }));

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const m = getModel((await params).slug);
  if (!m) return {};
  const photo = photoOf(m);
  return {
    title: `Zontes ${m.name}`,
    description: `${m.category} Zontes ${m.name}: ${m.cc} cc, ${String(m.hp).replace(".", ",")} hp. ${m.intro ?? "Ficha técnica, colores y consultas."}`,
    openGraph: photo ? { images: [{ url: photo.src, width: photo.w, height: photo.h, alt: photo.alt }] } : undefined,
  };
}

const n = (v: number) => v.toLocaleString("es-PY");
const dec = (v: number) => String(v).replace(".", ",");

function rows(m: Model): { group: string; items: [string, string | undefined][] }[] {
  return [
    {
      group: "Motor",
      items: [
        ["Tipo", m.engine],
        ["Cilindrada", `${n(m.cc)} cc`],
        ["Diámetro × carrera", m.bore],
        ["Potencia máxima", `${dec(m.hp)} hp${m.rpm ? ` a ${n(m.rpm)} rpm` : ""}`],
        ["Par máximo", m.torqueNm ? `${dec(m.torqueNm)} Nm` : undefined],
        ["Alimentación", m.fuel],
        ["Refrigeración", m.cooling],
        ["Embrague", m.clutch],
        ["Transmisión", m.transmission],
      ],
    },
    {
      group: "Chasis",
      items: [
        ["Suspensión delantera", m.front],
        ["Suspensión trasera", m.rear],
        ["Frenos", m.brakes],
        ["Neumáticos", m.tires],
      ],
    },
    {
      group: "Medidas",
      items: [
        ["Largo", m.length ? `${n(m.length)} mm` : undefined],
        ["Ancho", m.width ? `${n(m.width)} mm` : undefined],
        ["Alto", m.height ? `${n(m.height)} mm` : undefined],
        ["Altura de asiento", `${n(m.seat)} mm`],
        ["Peso", m.weight ? `${n(m.weight)} kg` : undefined],
        ["Tanque", m.tank ? `${dec(m.tank)} L` : undefined],
      ],
    },
  ];
}

export default async function ModelPage({ params }: Params) {
  const m = getModel((await params).slug);
  if (!m) notFound();
  const paint = paintOf(m);
  const light = m.paints.length > 0 && isLight(paint);
  const heroPaint = m.paints.find((p) => p.photo);
  const others = related(m);
  const i = models.indexOf(m);
  const prev = models[(i - 1 + models.length) % models.length];
  const next = models[(i + 1) % models.length];
  const cluster = [
    { label: "Cilindrada", value: n(m.cc), unit: "cc" },
    { label: "Potencia", value: dec(m.hp), unit: "hp" },
    m.torqueNm ? { label: "Par", value: dec(m.torqueNm), unit: "Nm" } : null,
    { label: "Asiento", value: n(m.seat), unit: "mm" },
    m.weight ? { label: "Peso", value: n(m.weight), unit: "kg" } : null,
    m.tank ? { label: "Tanque", value: dec(m.tank), unit: "L" } : null,
  ].filter(Boolean) as { label: string; value: string; unit: string }[];

  const intro = (
    <>
      {m.tagline && <p className="sheet-tagline">{m.tagline}</p>}
      {m.intro && <p className="lead">{m.intro}</p>}
    </>
  );
  const actions = (
    <div className="hero-actions">
      <a className="btn btn--signal" href={waLink(`Hola, quiero consultar por la Zontes ${m.name}.`)} target="_blank" rel="noopener noreferrer">
        <ChatIcon />
        Consultar por la {m.name}
      </a>
      <a className="btn btn--line" href={waLink(`Hola, quiero agendar una prueba de manejo de la Zontes ${m.name}.`)} target="_blank" rel="noopener noreferrer">
        Agendar una prueba
      </a>
    </div>
  );
  const crumbs = (
    <p className="crumbs small">
      <TLink href="/modelos/" label="Modelos">
        Modelos
      </TLink>{" "}
      / {m.kind === "moto" ? "Motos" : "Scooters"} / {m.category}
    </p>
  );

  return (
    <article className="sheet" style={{ "--paint": paint } as React.CSSProperties}>
      {heroPaint?.photo ? (
        /* Con foto: la moto en el estudio de aluminio, delante de su nombre gigante en su pintura. */
        <header className="sheet-hero sheet-hero--studio" data-theme="dia" style={{ "--paint": heroPaint.hex, "--ink": giantInk(heroPaint.hex), "--len": m.name.length } as React.CSSProperties}>
          <div className="wrap">
            {crumbs}
            <div className="sheet-stage" style={{ "--pw": `${heroPaint.photo.w}px` } as React.CSSProperties}>
              <p className="sheet-giant" aria-hidden="true">
                {m.name}
              </p>
              <ModelPhoto photo={heroPaint.photo} className="sheet-photo" eager sizes="(min-width: 1280px) 760px, 92vw" />
            </div>
            <div className="sheet-foot">
              <div className="sheet-intro">
                <h1 className="sheet-title">Zontes {m.name}</h1>
                {intro}
              </div>
              {actions}
            </div>
          </div>
        </header>
      ) : (
        /* Sin foto todavía: la portada se pinta con el color del modelo. */
        <header className={`sheet-hero${light ? " is-light" : ""}`} data-theme={light ? "pintura-clara" : "pintura"}>
          <div className="wrap">
            {crumbs}
            <h1 className="sheet-name" style={{ "--len": m.name.length } as React.CSSProperties}>
              <span className="sr-only">Zontes </span>
              {m.name}
            </h1>
            <div className="sheet-intro">
              {intro}
              {actions}
            </div>
          </div>
        </header>
      )}

      <section className="cluster" data-theme="noche" aria-label="Datos principales">
        <dl className="wrap cluster-grid">
          {cluster.map((c) => (
            <div key={c.label}>
              <dt>{c.label}</dt>
              <dd className="num">
                {c.value} <span>{c.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {m.features.length >= 4 && <Band items={m.features} />}

      {m.moments && m.moments.length > 0 && <Moments model={m.name} items={m.moments} />}

      <section className="section sheet-body" data-theme="dia" aria-label="Ficha técnica">
        <div className="wrap sheet-grid">
          <div className="specs">
            <h2 className="h3">Ficha técnica</h2>
            {rows(m).map((g) => {
              const items = g.items.filter(([, v]) => v);
              if (!items.length) return null;
              return (
                <div key={g.group} className="spec-group">
                  <h3 className="spec-title">{g.group}</h3>
                  <dl>
                    {items.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
            {m.features.length === 0 && (
              <p className="small spec-missing">La ficha completa de este modelo todavía no está publicada. Consultanos y te la enviamos.</p>
            )}
          </div>
          <div className="aside">
            {m.features.length > 0 && (
              <div>
                <h2 className="h3">Equipamiento</h2>
                <ul className="features">
                  {m.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {m.paints.length > 0 && !heroPaint && (
              <div>
                <h2 className="h3">Colores</h2>
                <ul className="paints">
                  {m.paints.map((p) => (
                    <li key={p.hex} style={{ "--paint": p.hex } as React.CSSProperties}>
                      <span className="chip" aria-hidden="true" />
                      {p.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="small disclaimer">Datos de referencia publicados por Zontes Argentina. Pueden variar para Paraguay: confirmalos en el showroom.</p>
          </div>
        </div>
      </section>

      {heroPaint && (
        <section className="section views" data-theme="dia" aria-labelledby="views-title">
          <div className="wrap">
            <h2 id="views-title" className="h3">
              {m.paints.length > 1 ? "Colores y vistas" : "Vistas"}
            </h2>
            <ul className="views-grid">
              {m.paints.map((p) => (
                <li key={p.name} className="view" style={{ "--paint": p.hex, "--ink": giantInk(p.hex), "--len": m.name.length } as React.CSSProperties}>
                  <span className="view-panel">
                    {p.photo ? (
                      <>
                        <span className="view-giant" aria-hidden="true">
                          {m.name}
                        </span>
                        <ModelPhoto photo={p.photo} sizes="(min-width: 1024px) 30vw, 100vw" />
                      </>
                    ) : (
                      <PaintPlate name={m.name} note={missingPhotoNote(m, p)} hex={p.hex} />
                    )}
                  </span>
                  <span className="view-caption">
                    <span className="dot" aria-hidden="true" />
                    {p.name}
                  </span>
                </li>
              ))}
              {m.photos.map((ph) => (
                <li key={ph.src} className="view" style={{ "--paint": heroPaint.hex, "--ink": giantInk(heroPaint.hex), "--len": m.name.length } as React.CSSProperties}>
                  <span className="view-panel">
                    <ModelPhoto photo={ph} sizes="(min-width: 1024px) 30vw, 100vw" />
                  </span>
                  <span className="view-caption">{ph.label ?? "Vista"}</span>
                </li>
              ))}
            </ul>
            <p className="small views-note">Fotos ilustrativas.</p>
          </div>
        </section>
      )}

      <Faq model={m.name} />

      <section className="section related" data-theme="dia" aria-labelledby="related-title">
        <div className="wrap">
          <div className="related-head">
            <h2 id="related-title" className="h2">
              También en la gama
            </h2>
            <TLink href="/modelos/" label="Modelos" className="btn btn--ghost">
              Ver los {models.length} modelos
            </TLink>
          </div>
          <ModelCards items={others} />
        </div>
      </section>

      <nav className="pager" data-theme="dia" aria-label="Otros modelos">
        <div className="wrap pager-row">
          <TLink href={`/modelos/${prev.slug}/`} label={prev.name} className="pager-link">
            <span className="small">Anterior</span>
            <span className="pager-name">{prev.name}</span>
          </TLink>
          <TLink href={`/modelos/${next.slug}/`} label={next.name} className="pager-link pager-link--next">
            <span className="small">Siguiente</span>
            <span className="pager-name">{next.name}</span>
          </TLink>
        </div>
      </nav>

      <ContactBlock model={m.name} />
    </article>
  );
}
