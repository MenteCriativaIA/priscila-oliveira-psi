import { HeroSequence } from "@/components/sections/HeroSequence";
import { SobreMim } from "@/components/sections/SobreMim";
import { Servicos } from "@/components/sections/Servicos";
import { Investimento } from "@/components/sections/Investimento";
import { FAQ } from "@/components/sections/FAQ";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSequence />
      <SobreMim />
      <Servicos />
      <Investimento />
      <FAQ />
      <Depoimentos />
      <BlogPreview />
      <EmergencyBanner />
      <Footer />
    </main>
  );
}
