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
  title: "Psicóloga Clínica | Ansiedade, Stress, Depressão e Burnout",
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
  ],
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
