import { dealer } from "@/content/dealer";
import { byPower, motos, scooters } from "@/content/models";
import { TLink } from "./TLink";

export function Footer() {
  return (
    <footer className="site-footer" data-theme="noche">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h2 className="footer-title">Motos</h2>
            <ul>
              {byPower(motos).map((m) => (
                <li key={m.slug}>
                  <TLink href={`/modelos/${m.slug}/`} label={m.name}>
                    {m.name}
                  </TLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Scooters</h2>
            <ul>
              {scooters.map((m) => (
                <li key={m.slug}>
                  <TLink href={`/modelos/${m.slug}/`} label={m.name}>
                    {m.name}
                  </TLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Concesionaria</h2>
            <ul>
              <li>
                <TLink href="/#caminos" label="Caminos">Qué moto para cada camino</TLink>
              </li>
              <li>
                <TLink href="/#servicio" label="Servicio">Prueba, financiación y service</TLink>
              </li>
              <li>
                <TLink href="/contacto/" label="Contacto">Contacto y showroom</TLink>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Showroom</h2>
            <p>{dealer.address}</p>
            {dealer.hours.map((h) => (
              <p key={h.days} className="small">
                {h.days}: {h.time}
              </p>
            ))}
            <p className="footer-social">
              <a href={dealer.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href={dealer.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            </p>
          </div>
        </div>
        <p className="footer-word" aria-hidden="true">
          Zontes Paraguay
        </p>
        <div className="footer-legal small">
          <p>© {new Date().getFullYear()} {dealer.name}. Zontes es una marca de Guangdong Tayo Motorcycle Technology Co., Ltd.</p>
          <p>Especificaciones de referencia publicadas por Zontes Argentina; pueden variar en Paraguay y cambiar sin aviso. Las imágenes son ilustrativas.</p>
          {dealer.demo && <p className="demo-note">Propuesta de diseño: dirección, teléfonos y redes son datos de ejemplo.</p>}
        </div>
      </div>
    </footer>
  );
}
