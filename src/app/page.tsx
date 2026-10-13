import { Band } from "@/components/Band";
import { ContactBlock } from "@/components/ContactBlock";
import { Hero } from "@/components/home/Hero";
import { Lineup } from "@/components/home/Lineup";
import { Services } from "@/components/home/Services";
import { Why } from "@/components/home/Why";
import { bandPhrases } from "@/content/home";

/**
 * La portada en cuatro bloques, los mismos del menú y en el mismo orden (content/sections.ts):
 * 01 Modelos (elegir la moto) · 02 Por qué Zontes (la marca) · 03 Servicio y 04 Contacto (comprar), juntos.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Lineup />
      <Band items={bandPhrases} />
      <Why />
      <Services />
      <ContactBlock theme="dia" label="contacto" />
    </>
  );
}
