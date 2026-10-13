import { HeroSequence } from "@/components/sections/HeroSequence";
import { SobreMim } from "@/components/sections/SobreMim";
import { Servicos } from "@/components/sections/Servicos";
import { Investimento } from "@/components/sections/Investimento";
import { FAQ } from "@/components/sections/FAQ";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { Footer } from "@/components/Footer";
import siteContent from "@/data/site-content.json";
import { consultorio, jsonLd, perguntasFrequentes, pessoa, site } from "@/lib/dados-estruturados";

export default function Home() {
  const faq = siteContent.faq as { pergunta: string; resposta: string }[];
  const dados = jsonLd([
    site(),
    consultorio(),
    pessoa(),
    ...(faq.length ? [perguntasFrequentes(faq)] : []),
  ]);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: dados }}
      />
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
