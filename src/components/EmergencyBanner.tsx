"use client";

import { Phone, AlertTriangle } from "lucide-react";

export function EmergencyBanner() {
    return (
        <div className="bg-petroleo-dark py-6 px-6">
            <div className="mx-auto max-w-4xl flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4">
                <AlertTriangle className="h-5 w-5 text-dourado shrink-0" />
                <p className="text-bege/90 text-sm sm:text-base">
                    <strong>Em caso de crise grave,</strong> ligue{" "}
                    <a
                        href="tel:188"
                        className="inline-flex items-center gap-1 font-bold text-dourado-light underline underline-offset-2 hover:text-dourado"
                    >
                        <Phone className="h-3.5 w-3.5" />
                        188 (CVV)
                    </a>{" "}
                    ou procure a emergência mais próxima.
                </p>
            </div>
        </div>
    );
}
