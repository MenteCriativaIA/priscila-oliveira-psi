"use client";

import { MessageCircle } from "lucide-react";
import siteContent from "@/data/site-content.json";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function FloatingWhatsApp() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const phone = siteContent.telefoneWhatsApp || "5511999999999";
    const message = encodeURIComponent(
        "Olá! Gostaria de agendar uma consulta."
    );
    const url = `https://wa.me/${phone.replace(/\D/g, "")}?text=${message}`;

    if (pathname?.startsWith("/admin")) return null;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:bottom-8 md:right-8 md:h-16 md:w-16"
        >
            <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
        </a>
    );
}
