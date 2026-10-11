"use client";

import { MessageCircle } from "lucide-react";
import siteContent from "@/data/site-content.json";
import { linkWhatsApp } from "@/lib/whatsapp";

export function BotaoWhatsApp({ texto }: { texto: string }) {
    const url = linkWhatsApp(
        siteContent.telefoneWhatsApp,
        "Olá! Gostaria de saber sobre a terapia de casal no Méier."
    );

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-dourado px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-dourado-dark hover:shadow-xl hover:scale-105"
        >
            <MessageCircle className="h-5 w-5" />
            {texto}
        </a>
    );
}
