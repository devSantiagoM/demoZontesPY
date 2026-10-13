/**
 * Los cuatro bloques de la portada, en orden. El menú, el rótulo de cada bloque («01 Modelos») y el nombre que
 * muestra el encabezado del teléfono salen de acá, así siempre dicen lo mismo y la gente sabe dónde está.
 * `page` es adónde lleva el menú desde las otras páginas del sitio.
 */
export const sections = [
  { id: "modelos", label: "Modelos", page: "/modelos/" },
  { id: "por-que", label: "Por qué Zontes", page: "/#por-que" },
  { id: "servicio", label: "Servicio", page: "/#servicio" },
  { id: "contacto", label: "Contacto", page: "/contacto/" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
export const sectionIds = sections.map((s) => s.id);
export const sectionNum = (id: SectionId) => String(sectionIds.indexOf(id) + 1).padStart(2, "0");
export const sectionLabel = (id: SectionId) => sections.find((s) => s.id === id)!.label;
