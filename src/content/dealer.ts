/**
 * Datos de la concesionaria. ESTA PROPUESTA USA DATOS DE EJEMPLO: dirección, teléfonos, correo y redes
 * hay que reemplazarlos por los reales antes de publicar, y después poner `demo: false`
 * (eso quita el aviso «Propuesta con datos de ejemplo» del pie y del formulario).
 */
export const dealer = {
  demo: true,
  name: "Zontes Paraguay",
  city: "Asunción",
  address: "Av. Ejemplo 1234, Asunción",
  hours: [
    { days: "Lunes a viernes", time: "8:00 a 18:00" },
    { days: "Sábados", time: "8:00 a 12:00" },
  ],
  /** Solo dígitos, con código de país (595), para los enlaces de WhatsApp. */
  whatsapp: "595981000000",
  phone: "+595 981 000 000",
  email: "ventas@ejemplo.com.py",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  /** Lo que se busca en Google Maps con «Cómo llegar». */
  mapsQuery: "Av. Ejemplo 1234, Asunción, Paraguay",
};

/** Enlace de WhatsApp con el mensaje ya escrito. */
export const waLink = (text: string) => `https://wa.me/${dealer.whatsapp}?text=${encodeURIComponent(text)}`;

export const mapsLink = () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.mapsQuery)}`;
