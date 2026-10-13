/**
 * Fotos de la gama. Los archivos van en `public/fotos/<modelo>/` (WebP).
 *
 * - Fotos de estudio: recortadas con fondo transparente, la moto mirando a la derecha si se puede.
 *   Se muestran sobre el aluminio del estudio, delante del nombre gigante del modelo.
 * - Fotos de uso: la moto en la calle o en la ruta; se recortan para llenar su cuadro (`pos` = qué parte
 *   queda a la vista, como en `object-position`).
 *
 * `w` y `h` son los píxeles reales del archivo: reservan el lugar antes de que la foto cargue.
 */
export interface Photo {
  src: string;
  w: number;
  h: number;
  alt: string;
  /** Solo fotos de uso: qué parte de la foto queda a la vista al recortarla. */
  pos?: string;
  /** Nombre corto de la vista, para la galería de la ficha («Perfil»). */
  label?: string;
}

const p = (src: string, w: number, h: number, alt: string, pos?: string, label?: string): Photo => ({ src: `/fotos/${src}`, w, h, alt, pos, label });

export const photos = {
  f703: {
    plata: p("703f/plata.webp", 800, 529, "Zontes 703F plata con gráficos azules, de perfil"),
    luces: p("703f/uso-luces.webp", 500, 750, "Zontes 703F negra de noche, con el faro LED encendido y las luces de la ciudad detrás", "50% 42%"),
    ruta: p("703f/uso-ruta.webp", 500, 750, "Zontes 703F estacionada en una calle en subida, de noche, con el faro encendido", "50% 88%"),
    ciudad: p("703f/uso-ciudad.webp", 500, 750, "Zontes 703F de noche sobre una vereda, con las luces de la ciudad detrás", "50% 84%"),
    tierra: p("703f/uso-tierra.webp", 1125, 750, "Zontes 703F negra con defensas, estacionada frente a un barranco de tierra colorada", "42% 70%"),
  },
  rr703: {
    blancoRojo: p("703rr/blanco-rojo.webp", 613, 504, "Zontes 703RR blanca, roja y negra, vista de tres cuartos"),
  },
  x350: {
    champagne: p("350x/champagne.webp", 650, 571, "Zontes 350X champagne, vista de tres cuartos"),
    negro: p("350x/negro.webp", 650, 578, "Zontes 350X negra, vista de tres cuartos"),
  },
  gk350: {
    negro: p("350gk/negro.webp", 635, 518, "Zontes 350GK negra con detalles dorados, vista de tres cuartos"),
  },
  t350: {
    negro: p("350t/negro.webp", 600, 592, "Zontes 350T negra con defensas, vista de tres cuartos desde adelante"),
    perfil: p("350t/negro-perfil.webp", 858, 565, "Zontes 350T negra con defensas, de perfil", undefined, "Negro · perfil"),
    frenteIzq: p("350t/negro-frente-izq.webp", 626, 564, "Zontes 350T negra, vista de tres cuartos desde el lado izquierdo", undefined, "Negro · lado izquierdo"),
  },
  g368: {
    negro: p("368g-etc/negro.webp", 681, 578, "Scooter Zontes 368G ETC negro con defensas, vista de tres cuartos"),
  },
};
