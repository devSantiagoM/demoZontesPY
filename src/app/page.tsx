import { ContactBlock } from "@/components/ContactBlock";
import { Hero } from "@/components/home/Hero";
import { Lineup } from "@/components/home/Lineup";
import { Roads } from "@/components/home/Roads";
import { Services } from "@/components/home/Services";
import { Story } from "@/components/home/Story";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Lineup />
      <Roads />
      <Services />
      <ContactBlock />
    </>
  );
}
