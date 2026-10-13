/**
 * La gama Zontes. Datos de referencia tomados de zontes.com.ar (Zontes Argentina, Betamotor S.A.).
 *
 * Reglas para editar:
 * - Solo se cargan datos publicados. Lo que no figura, no se completa: la ficha muestra lo que hay.
 * - El par se publica sin unidad en el sitio de Argentina; en la R350 aclara «Nm», así que se usa Nm.
 * - Los colores llevan el código que publica cada ficha; el nombre sale de las fotos («negra», «naranja»…).
 * - Fotos (ver `photos.ts`): cada color puede llevar su foto de estudio (`paints[].photo`). Un color sin foto
 *   se muestra como una placa en ese color con «Foto en <color>: próximamente». `photos` = vistas extra de
 *   estudio para la galería de la ficha; `moments` = fotos de uso con lo que la moto trae para cada situación.
 */
import { photos as F, type Photo } from "./photos";

export type { Photo };

export type Kind = "moto" | "scooter";
export type Use = "ciudad" | "ruta" | "tierra" | "pista";

export interface Paint {
  name: string;
  hex: string;
  /** Foto de estudio en este color (fondo transparente). */
  photo?: Photo;
}

/** Una situación de uso con su foto y el equipamiento que entra en juego (pestañas de la ficha). */
export interface Moment {
  id: string;
  label: string;
  photo: Photo;
  title: string;
  body: string;
  points: string[];
}

export interface Model {
  slug: string;
  name: string;
  kind: Kind;
  family: "200" | "350" | "368" | "703";
  category: string;
  /** Las tres palabras con las que Zontes presenta cada modelo. */
  tagline?: string;
  intro?: string;
  engine: string;
  cc: number;
  hp: number;
  rpm?: number;
  torqueNm?: number;
  bore?: string;
  transmission?: string;
  clutch?: string;
  fuel?: string;
  cooling?: string;
  front?: string;
  rear?: string;
  brakes?: string;
  tires?: string;
  length?: number;
  width?: number;
  height?: number;
  seat: number;
  weight?: number;
  tank?: number;
  features: string[];
  paints: Paint[];
  uses: Use[];
  /** Vistas extra de estudio (además de la foto de cada color). */
  photos: Photo[];
  moments?: Moment[];
}

const ENGINE_703 = { engine: "Tricilíndrico DOHC, 4 válvulas", cc: 699, hp: 95, bore: "70 × 60,6 mm", fuel: "Inyección electrónica", cooling: "Líquida", clutch: "Multidisco antirrebote", transmission: "6 velocidades" };
const ENGINE_350 = { engine: "Monocilíndrico DOHC, 4 válvulas", cc: 348, hp: 39 };
const ENGINE_350_FULL = { ...ENGINE_350, rpm: 9500, torqueNm: 32.8, bore: "84,5 × 62 mm", fuel: "Inyección electrónica", cooling: "Líquida", clutch: "Multidisco antirrebote", transmission: "6 velocidades" };
const ENGINE_368 = { engine: "Monocilíndrico SOHC, 4 válvulas", cc: 368, hp: 39, transmission: "CVT automática" };
const ENGINE_368_FULL = { ...ENGINE_368, rpm: 7500, torqueNm: 40, bore: "79 × 75 mm", fuel: "Inyección electrónica", cooling: "Líquida" };
const ENGINE_200 = { engine: "Monocilíndrico SOHC, 4 válvulas", cc: 198, hp: 21.5 };

export const models: Model[] = [
  /* ————— Motos ————— */
  {
    slug: "703f",
    name: "703F",
    kind: "moto",
    family: "703",
    category: "Trail touring",
    tagline: "Potencia, aventura y tecnología",
    intro: "Una trail touring para quienes buscan aventura, tecnología y rendimiento en cada recorrido.",
    ...ENGINE_703,
    torqueNm: 75,
    front: "Horquilla invertida Marzocchi, regulable en precarga e hidráulica",
    rear: "Monoamortiguador Marzocchi presurizado, regulable",
    brakes: "Discos con ABS, desconectable atrás",
    tires: "90/90-21 · 150/70-18",
    length: 2355,
    width: 940,
    height: 1395,
    seat: 845,
    weight: 228,
    tank: 22,
    features: [
      "Pantalla TFT a color de 6,75\" con mirroring",
      "Arranque keyless",
      "Control de tracción",
      "Modos Eco y Sport",
      "Quickshifter",
      "Parabrisas eléctrico",
      "Ópticas full LED",
      "Puños calefaccionados de 3 niveles",
      "Apertura electrónica de asiento y tanque",
      "Sensor de presión de neumáticos",
      "Cámaras delantera y trasera con 128 GB",
    ],
    paints: [
      { name: "Plata", hex: "#C0C0C0", photo: F.f703.plata },
      { name: "Blanco", hex: "#F4F4F2" },
    ],
    uses: ["ruta", "tierra"],
    photos: [],
    moments: [
      {
        id: "luces",
        label: "Luces",
        photo: F.f703.luces,
        title: "Se ve y la ven",
        body: "Ópticas full LED y una pantalla TFT a color de 6,75\" que espeja el celular: mapa y música a la vista.",
        points: ["Ópticas full LED", "Pantalla TFT a color de 6,75\" con mirroring", "Cámaras delantera y trasera con 128 GB"],
      },
      {
        id: "ruta",
        label: "Ruta",
        photo: F.f703.ruta,
        title: "Para los kilómetros largos",
        body: "Parabrisas eléctrico, puños calefaccionados y 22 litros de tanque para que el viaje sea el plan.",
        points: ["Parabrisas eléctrico", "Puños calefaccionados de 3 niveles", "Quickshifter y modos Eco y Sport"],
      },
      {
        id: "ciudad",
        label: "Ciudad",
        photo: F.f703.ciudad,
        title: "Sin llave y sin vueltas",
        body: "Arrancás sin sacar la llave del bolsillo y abrís el asiento o el tanque con un botón.",
        points: ["Arranque keyless", "Apertura electrónica de asiento y tanque", "Sensor de presión de neumáticos"],
      },
      {
        id: "tierra",
        label: "Tierra",
        photo: F.f703.tierra,
        title: "Cuando se termina el asfalto",
        body: "Rueda delantera de 21\" y suspensiones Marzocchi regulables para la tierra colorada.",
        points: ["Rueda delantera 90/90-21", "Suspensión Marzocchi regulable", "Control de tracción y ABS desconectable atrás"],
      },
    ],
  },
  {
    slug: "703rr",
    name: "703RR",
    kind: "moto",
    family: "703",
    category: "Supersport",
    tagline: "Deportiva, precisa y agresiva",
    intro: "Una supersport de diseño agresivo que combina tecnología, adrenalina y rendimiento.",
    ...ENGINE_703,
    rpm: 11200,
    torqueNm: 74.5,
    front: "Horquilla invertida Marzocchi, regulable",
    rear: "Monoamortiguador Marzocchi presurizado, regulable",
    brakes: "Brembo, ABS de doble canal",
    tires: "120/70 ZR17 · 180/55 ZR17",
    length: 2065,
    width: 745,
    height: 1145,
    seat: 795,
    weight: 196,
    tank: 16,
    features: [
      "Pantalla TFT a color de 6,75\" con mirroring",
      "Control de tracción",
      "Arranque keyless",
      "Quickshifter",
      "Modos Eco y Sport",
      "Admisión Ram Air",
      "Ópticas full LED",
      "Sensor de presión de neumáticos",
      "Puños calefaccionados",
      "Apertura electrónica de asiento y tanque",
    ],
    paints: [{ name: "Blanco y rojo", hex: "#E40A1D", photo: F.rr703.blancoRojo }],
    uses: ["pista", "ruta"],
    photos: [],
  },
  {
    slug: "703t",
    name: "703T",
    kind: "moto",
    family: "703",
    category: "Touring",
    tagline: "Touring, tecnología y confort",
    intro: "Un perfil touring marcado, con equipamiento pensado para los viajes largos.",
    ...ENGINE_703,
    torqueNm: 74.5,
    front: "Horquilla invertida Marzocchi, regulable",
    rear: "Monoamortiguador Marzocchi, precarga remota",
    brakes: "Discos con ABS de doble canal",
    tires: "120/70 ZR17 · 180/55 ZR17",
    length: 2130,
    width: 880,
    height: 1460,
    seat: 805,
    weight: 198,
    tank: 20,
    features: [
      "Pantalla TFT a color de 8\" con mirroring",
      "Control crucero",
      "Acelerador electrónico",
      "IMU de 6 ejes y control de tracción",
      "Quickshifter de subida y bajada",
      "4 modos: Road, Sport, Rain y personalizable",
      "Puños y asiento calefaccionados",
      "Admisión Ram Air",
      "Arranque keyless",
      "Ópticas full LED",
      "Sensor de presión y temperatura de neumáticos",
    ],
    paints: [
      { name: "Negro", hex: "#141414" },
      { name: "Gris", hex: "#E9EAE8" },
    ],
    uses: ["ruta"],
    photos: [],
  },
  {
    slug: "350t",
    name: "350T",
    kind: "moto",
    family: "350",
    category: "Trail touring",
    tagline: "Aventurera, versátil y equipada",
    intro: "Agilidad, confort y tecnología para escapadas cortas y viajes de media y larga distancia.",
    ...ENGINE_350_FULL,
    front: "Horquilla invertida",
    rear: "Monoamortiguador",
    brakes: "ABS J.Juan desconectable",
    tires: "110/80-19 · 160/60-17",
    length: 2135,
    width: 850,
    height: 1360,
    seat: 830,
    weight: 188,
    tank: 19,
    features: [
      "Arranque keyless",
      "Pantalla TFT a color con mirroring",
      "Parabrisas eléctrico",
      "Modos Eco y Sport",
      "Ópticas y guiños full LED",
      "Sensor de presión de neumáticos",
      "Llantas de rayos tubeless",
      "Defensas y guantera de serie",
      "Puerto USB",
    ],
    paints: [
      { name: "Negro", hex: "#141414", photo: F.t350.negro },
      { name: "Naranja", hex: "#FE4B04" },
    ],
    uses: ["ruta", "tierra"],
    photos: [F.t350.perfil, F.t350.frenteIzq],
  },
  {
    slug: "350x",
    name: "350X",
    kind: "moto",
    family: "350",
    category: "Sport touring",
    tagline: "Confortable, potente y equipada",
    intro: "Una sport touring pensada para la ruta: equilibrio entre confort, estabilidad y carácter deportivo.",
    ...ENGINE_350_FULL,
    front: "Horquilla invertida",
    rear: "Monoamortiguador",
    brakes: "Doble disco con ABS de doble canal",
    tires: "120/70-17 · 160/60-17",
    length: 2055,
    height: 1330,
    seat: 795,
    weight: 185,
    tank: 19,
    features: [
      "Pantalla TFT a color",
      "Modos Eco y Sport",
      "Arranque keyless",
      "Ópticas full LED",
      "Sensor de presión de neumáticos",
      "Mandos retroiluminados",
      "Llantas de aluminio",
      "Puerto USB",
    ],
    paints: [
      { name: "Champagne", hex: "#EDE0BC", photo: F.x350.champagne },
      { name: "Negro", hex: "#141414", photo: F.x350.negro },
    ],
    uses: ["ruta", "ciudad"],
    photos: [],
  },
  {
    slug: "350gk",
    name: "350GK",
    kind: "moto",
    family: "350",
    category: "Neo retro",
    tagline: "Ágil, moderna y emocionante",
    intro: "Una neo retro urbana que equilibra estilo y practicidad para todos los días.",
    ...ENGINE_350_FULL,
    front: "Horquilla invertida",
    rear: "Monoamortiguador",
    brakes: "Discos con ABS de doble canal",
    tires: "120/70-17 · 160/60-17",
    length: 2070,
    width: 845,
    height: 1120,
    seat: 795,
    weight: 188,
    tank: 17,
    features: [
      "Pantalla TFT a color",
      "Ópticas full LED",
      "Arranque keyless",
      "Modos Eco y Sport",
      "Sensor de presión y temperatura de neumáticos",
      "Mandos retroiluminados",
      "Puerto USB",
    ],
    paints: [
      { name: "Negro", hex: "#141414", photo: F.gk350.negro },
      { name: "Gris", hex: "#CCCCCC" },
    ],
    uses: ["ciudad"],
    photos: [],
  },
  {
    slug: "350r",
    name: "350R",
    kind: "moto",
    family: "350",
    category: "Sport naked",
    tagline: "Deportiva, urbana y moderna",
    intro: "Diseño sport naked, configuración compacta y un motor de 348 cc: ágil y fácil de maniobrar.",
    ...ENGINE_350_FULL,
    front: "Horquilla invertida",
    rear: "Monoamortiguador, basculante monobrazo",
    brakes: "Discos con ABS de doble canal",
    tires: "120/70-17 · 160/60-17",
    length: 2030,
    height: 1120,
    seat: 795,
    weight: 185,
    tank: 15,
    features: [
      "Pantalla TFT a color con mirroring",
      "Ópticas full LED",
      "Arranque keyless",
      "Modos Eco y Sport",
      "Sensor de presión y temperatura de neumáticos",
      "Basculante monobrazo",
      "Llantas de aluminio tubeless",
      "Puerto USB",
    ],
    paints: [
      { name: "Azul", hex: "#3591D1" },
      { name: "Gris", hex: "#CED2D3" },
      { name: "Negro", hex: "#141414" },
    ],
    uses: ["ciudad", "ruta"],
    photos: [],
  },
  {
    slug: "350v",
    name: "350V",
    kind: "moto",
    family: "350",
    category: "Cruiser",
    ...ENGINE_350,
    seat: 765,
    weight: 188,
    features: [],
    paints: [],
    uses: ["ruta", "ciudad"],
    photos: [],
  },
  {
    slug: "200g1",
    name: "200G1",
    kind: "moto",
    family: "200",
    category: "Neo retro",
    tagline: "Clásica, ágil y urbana",
    intro: "Líneas clásicas con tecnología actual, pensada para la ciudad y el uso diario.",
    ...ENGINE_200,
    rpm: 9000,
    torqueNm: 19,
    bore: "63,5 × 62,5 mm",
    fuel: "Inyección Bosch",
    cooling: "Líquida",
    clutch: "Multidisco antirrebote",
    transmission: "6 velocidades",
    front: "Horquilla invertida",
    rear: "Monoamortiguador",
    brakes: "Discos con ABS de doble canal",
    tires: "110/70-17 · 130/70-17",
    length: 1970,
    width: 870,
    height: 1105,
    seat: 770,
    weight: 152,
    tank: 20,
    features: ["Tablero LCD digital", "Ópticas y guiños full LED", "ABS de doble canal", "Suspensión invertida", "Neumáticos mixtos", "Puerto USB"],
    paints: [{ name: "Gris oscuro", hex: "#3A3C3F" }],
    uses: ["ciudad"],
    photos: [],
  },
  { slug: "200u3", name: "200U3", kind: "moto", family: "200", category: "Sport naked", ...ENGINE_200, seat: 770, weight: 152, features: [], paints: [], uses: ["ciudad"], photos: [] },
  { slug: "200z", name: "200Z", kind: "moto", family: "200", category: "Naked", ...ENGINE_200, seat: 770, weight: 152, features: [], paints: [], uses: ["ciudad"], photos: [] },
  { slug: "200c", name: "200C", kind: "moto", family: "200", category: "Custom", ...ENGINE_200, seat: 700, weight: 148, features: [], paints: [], uses: ["ciudad"], photos: [] },

  /* ————— Scooters ————— */
  {
    slug: "368g-etc",
    name: "368G ETC",
    kind: "scooter",
    family: "368",
    category: "Maxiscooter",
    tagline: "Potente, preciso y moderno",
    intro: "Para ir más allá del asfalto sin resignar confort en el uso diario, con más de 400 km de autonomía.",
    ...ENGINE_368_FULL,
    front: "Horquilla hidráulica",
    rear: "Doble amortiguador",
    brakes: "ABS J.Juan desconectable",
    tires: "110/70-17 · 150/70-14",
    length: 2230,
    width: 925,
    height: 1370,
    seat: 795,
    weight: 192,
    tank: 17.5,
    features: [
      "Arranque keyless",
      "Pantalla TFT a color con mirroring",
      "Acelerador electrónico y control crucero",
      "Control de tracción desconectable",
      "Modos Touring y Sport",
      "Cámaras delantera y trasera",
      "Puños y asiento calefaccionados",
      "Baulera para dos cascos integrales",
      "Ópticas full LED y faros auxiliares",
      "Sensor de presión y temperatura de neumáticos",
      "Tres puertos USB",
    ],
    paints: [
      { name: "Negro", hex: "#141414", photo: F.g368.negro },
      { name: "Verde", hex: "#548260" },
    ],
    uses: ["ciudad", "ruta", "tierra"],
    photos: [],
  },
  { slug: "368e-etc", name: "368E ETC", kind: "scooter", family: "368", category: "Maxiscooter", ...ENGINE_368, seat: 770, weight: 186, features: [], paints: [], uses: ["ciudad", "ruta"], photos: [] },
  {
    slug: "368d",
    name: "368D",
    kind: "scooter",
    family: "368",
    category: "Scooter",
    tagline: "Práctico, cómodo y urbano",
    intro: "Equilibrio, tecnología y practicidad para moverse por la ciudad con comodidad y confianza.",
    ...ENGINE_368_FULL,
    front: "Horquilla hidráulica",
    rear: "Doble amortiguador",
    brakes: "ABS J.Juan de doble canal",
    tires: "120/70-15 · 140/70-14",
    length: 2025,
    width: 790,
    height: 1190,
    seat: 760,
    weight: 168,
    tank: 12,
    features: [
      "Pantalla TFT a color de 6,75\" con mirroring",
      "Control de tracción",
      "Arranque keyless",
      "Modos Eco y Sport",
      "Sensor de presión y temperatura de neumáticos",
      "Ópticas full LED",
      "Baulera bajo el asiento",
      "Puerto USB",
    ],
    paints: [{ name: "Gris claro", hex: "#DCDCDC" }],
    uses: ["ciudad"],
    photos: [],
  },
  { slug: "368d-etc", name: "368D ETC", kind: "scooter", family: "368", category: "Scooter sport", ...ENGINE_368, seat: 760, weight: 165, features: [], paints: [], uses: ["ciudad"], photos: [] },
  {
    slug: "368m",
    name: "368M",
    kind: "scooter",
    family: "368",
    category: "Scooter sport",
    tagline: "Tecnología, confort y diseño",
    intro: "Diseño moderno, mecánica eficiente y equipamiento pensado para el uso diario.",
    ...ENGINE_368_FULL,
    front: "Horquilla hidráulica",
    rear: "Doble amortiguador",
    brakes: "ABS J.Juan de doble canal",
    tires: "120/70-15 · 140/70-14",
    length: 2025,
    width: 790,
    height: 1185,
    seat: 760,
    weight: 168,
    tank: 12,
    features: [
      "Pantalla TFT a color de 6,75\" con mirroring",
      "Modos Eco y Sport",
      "Control de tracción",
      "Arranque keyless",
      "Sensor de presión y temperatura de neumáticos",
      "Ópticas full LED",
      "Baulera bajo el asiento",
      "Puerto USB",
    ],
    paints: [{ name: "Blanco", hex: "#F4F4F2" }],
    uses: ["ciudad"],
    photos: [],
  },
  { slug: "368m-etc", name: "368M ETC", kind: "scooter", family: "368", category: "Scooter sport", ...ENGINE_368, seat: 760, weight: 165, features: [], paints: [], uses: ["ciudad"], photos: [] },
];

export const motos = models.filter((m) => m.kind === "moto");
export const scooters = models.filter((m) => m.kind === "scooter");
export const getModel = (slug: string) => models.find((m) => m.slug === slug);

/** Color para la placa del modelo: su primera pintura, o grafito si la ficha no publica colores. */
export const paintOf = (m: Model) => m.paints[0]?.hex ?? "#5A5E62";

/** La foto principal del modelo: la del primer color que tenga foto. */
export const photoOf = (m: Model) => m.paints.find((p) => p.photo)?.photo;

/** Texto de la placa cuando el color elegido todavía no tiene foto. */
export const missingPhotoNote = (m: Model, paint?: Paint) =>
  paint && m.paints.some((p) => p.photo) ? `Foto en ${paint.name.toLowerCase()}: próximamente` : "Foto oficial: próximamente";

/**
 * «También en la gama»: tres modelos del mismo tipo, primero los de la misma familia de motor, después los
 * que sirven para lo mismo; a igualdad, los que ya tienen foto.
 */
export function related(m: Model, count = 3) {
  const score = (x: Model) => (x.family === m.family ? 3 : 0) + x.uses.filter((u) => m.uses.includes(u)).length + (photoOf(x) ? 1 : 0);
  return models
    .filter((x) => x.slug !== m.slug && x.kind === m.kind)
    .map((x) => ({ x, s: score(x) }))
    .sort((a, b) => b.s - a.s || b.x.cc - a.x.cc)
    .slice(0, count)
    .map((r) => r.x);
}

/** Una pintura clara necesita texto oscuro encima. */
export function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6;
}

export const useLabel: Record<Use, string> = { ciudad: "Ciudad", ruta: "Ruta", tierra: "Tierra", pista: "Pista" };

/** Los mismos modelos, ordenados de mayor a menor cilindrada dentro de su tipo. */
export const byPower = (list: Model[]) => [...list].sort((a, b) => b.cc - a.cc || a.name.localeCompare(b.name));
