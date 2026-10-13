import { TLink } from "@/components/TLink";

export default function NotFound() {
  return (
    <section className="section not-found" data-theme="dia">
      <div className="wrap">
        <h1 className="h1">Fin del camino</h1>
        <p className="lead">Esta página no existe o cambió de dirección.</p>
        <p>
          <TLink href="/modelos/" label="Modelos" className="btn btn--line">
            Ver los modelos
          </TLink>
        </p>
      </div>
    </section>
  );
}
