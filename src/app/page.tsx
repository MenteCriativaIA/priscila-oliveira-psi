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

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PsychologicalTreatment",
    name: "Priscila Oliveira Psicóloga Clínica",
    description:
      "Psicoterapia com Terapia Cognitivo-Comportamental (TCC), atendimento presencial no Méier, Rio de Janeiro, e online.",
    url: "https://www.priolivepsi.com.br/",
    provider: {
      "@type": "Person",
      name: siteContent.nomeCompleto,
      jobTitle: "Psicóloga Clínica",
      email: siteContent.emailProfissional,
      telephone: siteContent.telefoneWhatsApp,
      sameAs: [siteContent.instagram, siteContent.linkedin].filter(Boolean),
    },
    areaServed: [
      {
        "@type": "City",
        name: "Rio de Janeiro",
      },
      {
        "@type": "Country",
        name: "Brasil",
      },
    ],
    availableService: [
      "Psicoterapia presencial",
      "Psicoterapia online",
      "Terapia Cognitivo-Comportamental (TCC)",
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
