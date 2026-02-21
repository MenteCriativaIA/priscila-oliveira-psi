"use client";

import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function QuickExitButton() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleExit = () => {
        // Replace current history entry so back button won't return
        window.location.replace("https://www.google.com");
    };

    if (!mounted) return null;
    if (pathname?.startsWith("/admin")) return null;

    return (
        <button
            onClick={handleExit}
            aria-label="Sair do site agora"
            className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full bg-dourado px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-dourado-dark hover:shadow-xl md:hidden"
        >
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
        </button>
    );
}
