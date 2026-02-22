import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { QuickExitButton } from "@/components/QuickExitButton";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    `https://${process.env.VERCEL_URL ?? "localhost:3000"}`
  ),
  title: "Priscila Oliveira | Psicóloga Clínica",
  description:
    "Psicóloga clínica especializada em ansiedade, stress, depressão e burnout. Acolhimento humanizado e abordagem baseada em evidências. Agende sua consulta.",
  keywords: [
    "psicóloga",
    "ansiedade",
    "depressão",
    "burnout",
    "terapia",
    "psicologia clínica",
    "stress",
    "saúde mental",
    "Priscila Oliveira",
  ],
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
    locale: "pt_BR",
    siteName: "Priscila Oliveira | Psicóloga Clínica",
    title: "Priscila Oliveira | Psicóloga Clínica",
    description:
      "Psicóloga clínica especializada em ansiedade, stress, depressão e burnout. Acolhimento humanizado e abordagem baseada em evidências.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Priscila Oliveira – Psicóloga Clínica",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Priscila Oliveira | Psicóloga Clínica",
    description:
      "Psicóloga clínica especializada em ansiedade, stress, depressão e burnout. Acolhimento humanizado e abordagem baseada em evidências.",
    images: ["/android-chrome-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${lora.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <FloatingWhatsApp />
        <QuickExitButton />
      </body>
    </html>
  );
}
