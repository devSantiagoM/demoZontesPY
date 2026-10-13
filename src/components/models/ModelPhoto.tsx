import type { Photo } from "@/content/photos";

/**
 * Una foto de la gama con su tamaño real (reserva el lugar antes de cargar). Las de uso se recortan
 * según `photo.pos`. Sitio estático: las fotos ya están en WebP y no pasan por el optimizador de Next.
 */
export function ModelPhoto({
  photo,
  className,
  eager = false,
  decorative = false,
  sizes,
}: {
  photo: Photo;
  className?: string;
  eager?: boolean;
  /** Cuando el nombre del modelo ya está al lado (miniaturas, tarjetas), la foto no repite el texto. */
  decorative?: boolean;
  sizes?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={photo.src}
      width={photo.w}
      height={photo.h}
      alt={decorative ? "" : photo.alt}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      style={photo.pos ? { objectPosition: photo.pos } : undefined}
    />
  );
}

/** El lugar de una foto que todavía no está: una placa pintada con el color del modelo. */
export function PaintPlate({ name, note, hex, className = "" }: { name: string; note?: string; hex: string; className?: string }) {
  return (
    <span className={`paint-plate ${className}`} data-light={isLightHex(hex) || undefined} style={{ "--plate": hex } as React.CSSProperties}>
      <span className="paint-plate-name">{name}</span>
      {note && <span className="paint-plate-note">{note}</span>}
    </span>
  );
}

/**
 * Tinta del nombre gigante que va detrás de la foto: la pintura del modelo, salvo las muy oscuras (negro,
 * gris oscuro), que se aclaran para que la moto —casi siempre oscura en esas versiones— no se pierda.
 */
export function giantInk(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lin = (c: number) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return L < 0.06 ? `color-mix(in srgb, ${hex} 30%, transparent)` : hex;
}

export function isLightHex(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return (0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255 > 0.6;
}
