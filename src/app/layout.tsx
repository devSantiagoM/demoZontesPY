import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo/standard.css"; // ejes de peso y ancho
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Loader } from "@/components/Loader";
import { loaderBootScript } from "@/components/loaderBoot";
import { Motion } from "@/components/Motion";
import { ScrollBar } from "@/components/ScrollBar";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Zontes Paraguay · Motos y scooters", template: "%s · Zontes Paraguay" },
  description: "Motos y scooters Zontes en Paraguay: de 198 a 699 cc, con pantalla TFT, ABS y ópticas LED. Conocé la gama y agendá una prueba de manejo.",
  openGraph: { type: "website", locale: "es_PY", siteName: "Zontes Paraguay" },
};

export const viewport: Viewport = {
  themeColor: "#D9DBD8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PY" data-theme="dia" suppressHydrationWarning>
      <head>
        {/* Antes de pintar: ¿hay pantalla de carga? (una vez por sesión, nunca con «reducir movimiento») */}
        <script dangerouslySetInnerHTML={{ __html: loaderBootScript }} />
      </head>
      <body>
        <a className="skip" href="#contenido">
          Ir al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <div className="curtain" id="curtain" aria-hidden="true">
          <p className="curtain-label" />
        </div>
        <Loader />
        <Motion />
        <ScrollBar />
      </body>
    </html>
  );
}
