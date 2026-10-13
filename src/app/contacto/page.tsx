import type { Metadata } from "next";
import { ContactBlock } from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos por WhatsApp o visitá el showroom: consultas, pruebas de manejo, financiación y service.",
};

export default function ContactoPage() {
  return (
    <div className="contact-page">
      <ContactBlock titleAs="h1" theme="dia" />
    </div>
  );
}
