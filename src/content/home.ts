/**
 * Textos de la portada. Los datos de marca salen de zontes.com.ar («Sobre Zontes»):
 * Zontes es la marca de Guangdong Tayo Motorcycle Technology, fundada en 2003 en Jiangmen, China.
 */
import { photos, type Photo } from "./photos";
import type { Use } from "./models";

export const hero = {
  title: "Zontes, ahora en Paraguay",
  lede: "Motos y scooters de 198 a 699 cc, con pantalla TFT, ABS y ópticas LED. Elegí la tuya y probala en el showroom.",
  primary: "Ver modelos",
  secondary: "Agendar una prueba",
};

/**
 * «Por qué Zontes»: lo que antes eran cinco escenas, en un solo bloque de cuatro tarjetas con fotos en capas.
 * `stat` es el dato grande de cada tarjeta (decorativo: el mismo dato está en el texto).
 */
export const why = {
  title: "Lo que hay detrás de cada Zontes",
  lede: "Fábrica propia, motores con inyección y refrigeración líquida, y tecnología que se usa todos los días.",
  origen: {
    stat: "2003",
    title: "Diseñada en Jiangmen",
    body: "Zontes es la marca de Tayo Motorcycle Technology, que diseña y fabrica motos en Jiangmen, China, desde 2003. Cientos de patentes y millones de motores por año.",
    photo: photos.f703.tierra,
  },
  motor: {
    stat: "198–699",
    unit: "cc",
    title: "Un motor para cada uso",
    body: "Monocilíndricos para la ciudad y un tricilíndrico de 95 hp para la ruta. Todos con inyección electrónica y refrigeración líquida.",
    bikes: [
      { photo: photos.gk350.negro, cc: 348, name: "350GK" },
      { photo: photos.g368.negro, cc: 368, name: "368G ETC" },
      { photo: photos.rr703.blancoRojo, cc: 699, name: "703RR" },
    ],
  },
  luces: {
    stat: "LED",
    title: "Para ver y que te vean",
    body: "Ópticas full LED adelante y atrás, para el tránsito de la noche.",
    photo: photos.f703.luces,
  },
  tablero: {
    stat: "TFT",
    title: "Todo a la vista",
    body: "Según el modelo:",
    points: ["Pantalla TFT a color con mirroring del celular", "Arranque keyless", "Sensor de presión de neumáticos"],
    photo: photos.f703.ciudad,
  },
  caption: "Fotos ilustrativas: Zontes 703F en la tierra, de noche y en la ciudad.",
};

export const roads: {
  id: Use;
  label: string;
  title: string;
  body: string;
  photo: Photo;
  bgPos: string;
  caption: string;
  cta: string;
  picks: { slug: string; why: string }[];
}[] = [
  {
    id: "ciudad",
    label: "Ciudad",
    title: "Para el día a día en Asunción",
    photo: photos.f703.ciudad,
    bgPos: "50% 82%",
    caption: "Foto ilustrativa: Zontes 703F de noche en la ciudad.",
    cta: "Consultar por un scooter",
    body: "Transmisión automática, baulera para el casco y arranque sin llave para moverte rápido entre semáforos.",
    picks: [
      { slug: "368d", why: "CVT, baulera bajo el asiento y keyless" },
      { slug: "368m", why: "TFT de 6,75\" y control de tracción" },
      { slug: "200g1", why: "152 kg y 20 L de tanque" },
    ],
  },
  {
    id: "ruta",
    label: "Ruta",
    title: "Para los kilómetros largos",
    photo: photos.f703.ruta,
    bgPos: "50% 84%",
    caption: "Foto ilustrativa: Zontes 703F en ruta, de noche.",
    cta: "Consultar por una de ruta",
    body: "Control crucero, parabrisas y tanques grandes para que el viaje sea el plan.",
    picks: [
      { slug: "703t", why: "Control crucero, 20 L y puños calefaccionados" },
      { slug: "350x", why: "Sport touring de 19 L" },
      { slug: "368g-etc", why: "Más de 400 km de autonomía" },
    ],
  },
  {
    id: "tierra",
    label: "Tierra",
    title: "Para cuando se termina el asfalto",
    photo: photos.f703.tierra,
    bgPos: "30% 62%",
    caption: "Foto ilustrativa: Zontes 703F frente a la tierra colorada.",
    cta: "Consultar por una trail",
    body: "Ruedas delanteras grandes, rayos tubeless y suspensiones regulables para los caminos de tierra.",
    picks: [
      { slug: "703f", why: "Rueda de 21\" y suspensión Marzocchi" },
      { slug: "350t", why: "Rueda de 19\", rayos tubeless y defensas" },
      { slug: "368g-etc", why: "Scooter apto para caminos mixtos" },
    ],
  },
];

export const services = [
  { id: "prueba", title: "Prueba de manejo", body: "Elegí el modelo y el horario. Traé tu registro de conducir." },
  { id: "financiacion", title: "Financiación", body: "Planes en cuotas para la moto que elijas. Consultá las condiciones vigentes." },
  { id: "service", title: "Service oficial", body: "Mantenimiento con técnicos capacitados y repuestos originales." },
  { id: "garantia", title: "Garantía de fábrica", body: "Cada unidad nueva sale con garantía oficial. Te contamos los detalles en el showroom." },
];

export const reasons = ["Comprar una moto", "Prueba de manejo", "Financiación", "Service", "Repuestos", "Otra consulta"];

/** Frases de la franja que corre debajo de «La gama». */
export const bandPhrases = ["Dreams never stop", "Tecnología, diseño y pasión sobre dos ruedas", "Service oficial y repuestos originales", "Probala en el showroom"];

/** Preguntas frecuentes de cada ficha (las respuestas salen de los servicios de la concesionaria). */
export const faqs = (model: string) => [
  { q: `¿Puedo probar la ${model} antes de comprarla?`, a: "Sí. Escribinos por WhatsApp, elegí el día y el horario, y traé tu registro de conducir." },
  { q: "¿Hay financiación?", a: "Hay planes en cuotas para la moto que elijas. Te pasamos las condiciones vigentes por WhatsApp o en el showroom." },
  { q: "¿Dónde le hago el service?", a: "En el taller oficial, con técnicos capacitados y repuestos originales." },
  { q: "¿Tiene garantía oficial?", a: "Cada unidad nueva sale con garantía oficial de fábrica. Te contamos los detalles en el showroom." },
];
