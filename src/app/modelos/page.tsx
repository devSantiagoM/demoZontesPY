import type { Metadata } from "next";
import { Catalog } from "@/components/models/Catalog";
import { models } from "@/content/models";

export const metadata: Metadata = {
  title: "Modelos",
  description: `Las ${models.length} motos y scooters Zontes: filtrá por tipo, uso y motor, y mirá la ficha de cada una.`,
};

export default function ModelosPage() {
  return (
    <section className="section catalog" data-theme="dia" aria-labelledby="catalog-title">
      <div className="wrap">
        <h1 id="catalog-title" className="h1">
          Modelos
        </h1>
        <p className="lead catalog-lead">Motos y scooters de 198 a 699 cc. Filtrá por tipo, por dónde vas a andar o por motor.</p>
        <Catalog />
      </div>
    </section>
  );
}
