import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  Cormorant_Garamond,
  EB_Garamond,
  Inter,
  Lora,
  Merriweather,
  Nunito,
  Open_Sans,
  Playfair_Display,
  Poppins,
  Roboto,
} from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { QuickExitButton } from "@/components/QuickExitButton";
import siteContent from "@/data/site-content.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "700"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

type CssVars = CSSProperties & Record<`--${string}`, string>;

const titleFontMap: Record<string, string> = {
  Lora: "var(--font-lora), ui-serif, Georgia, serif",
  "Playfair Display": "var(--font-playfair), ui-serif, Georgia, serif",
  Merriweather: "var(--font-merriweather), ui-serif, Georgia, serif",
  "Cormorant Garamond": "var(--font-cormorant), ui-serif, Georgia, serif",
  "EB Garamond": "var(--font-eb-garamond), ui-serif, Georgia, serif",
};

const bodyFontMap: Record<string, string> = {
  Inter: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  Roboto: "var(--font-roboto), ui-sans-serif, system-ui, sans-serif",
  "Open Sans": "var(--font-open-sans), ui-sans-serif, system-ui, sans-serif",
  Poppins: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif",
  Nunito: "var(--font-nunito), ui-sans-serif, system-ui, sans-serif",
};

const cornerRadiusMap: Record<string, string> = {
  reto: "0.125rem",
  suave: "0.625rem",
  arredondado: "1rem",
};

const designSystem = siteContent.designSystem;
const siteStyle: CssVars = {
  "--site-primary": designSystem.corPrincipal || "#1B4F5C",
  "--site-accent": designSystem.corDestaque || "#C89B5E",
  "--site-background": designSystem.corFundo || "#EDE7DC",
  "--site-title-font":
    titleFontMap[designSystem.fonteTitulos] ?? titleFontMap.Lora,
  "--site-body-font":
    bodyFontMap[designSystem.fonteCorpo] ?? bodyFontMap.Inter,
  "--radius":
    cornerRadiusMap[designSystem.formatoCantos] ?? cornerRadiusMap.suave,
};

const siteUrl = "https://www.priolivepsi.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Priscila Oliveira | Psicóloga no Méier e Online",
    template: "%s | Priscila Oliveira Psicóloga",
  },
  description:
    "Psicóloga clínica no Méier, Rio de Janeiro, com atendimento online e presencial. Psicoterapia com Terapia Cognitivo-Comportamental (TCC) para ansiedade, autoestima, relacionamentos e depressão.",
  keywords: [
    "psicóloga Méier",
    "psicóloga no Méier",
    "psicóloga Rio de Janeiro",
    "psicóloga TCC RJ",
    "terapia TCC Rio de Janeiro",
    "terapia para ansiedade",
    "psicoterapia online",
    "psicoterapia presencial Méier",
    "Terapia Cognitivo-Comportamental",
    "psicóloga para autoestima",
    "psicóloga relacionamento",
    "psicóloga depressão",
    "Priscila Oliveira",
  ],
  alternates: {
    canonical: siteUrl,
  },
  category: "healthcare",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "pt_BR",
    siteName: "Priscila Oliveira Psicóloga",
    title: "Priscila Oliveira | Psicóloga no Méier e Online",
    description:
      "Psicoterapia com Terapia Cognitivo-Comportamental (TCC), atendimento presencial no Méier, Rio de Janeiro, e online.",
    images: [
      {
        url: `${siteUrl}/android-chrome-512x512.png`,
        width: 512,
        height: 512,
        alt: "Priscila Oliveira – Psicóloga Clínica",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Priscila Oliveira | Psicóloga no Méier e Online",
    description:
      "Psicoterapia com TCC para ansiedade, autoestima, relacionamentos e depressão. Atendimento no Méier e online.",
    images: [`${siteUrl}/android-chrome-512x512.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${lora.variable} ${playfair.variable} ${merriweather.variable} ${cormorant.variable} ${ebGaramond.variable} ${roboto.variable} ${openSans.variable} ${poppins.variable} ${nunito.variable}`}
    >
      <body className="antialiased" style={siteStyle} suppressHydrationWarning>
        {children}
        <FloatingWhatsApp />
        <QuickExitButton />
      </body>
    </html>
  );
}
