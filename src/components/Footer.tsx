"use client";

import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import siteContent from "@/data/site-content.json";

export function Footer() {
    const nome = siteContent.nomeCompleto || "[Nome da Psicóloga]";
    const crp = siteContent.crp || "[CRP XXXXX/XX]";
    const email = siteContent.emailProfissional || "[email@exemplo.com]";
    const endereco = siteContent.endereco || "[Endereço do consultório]";
    const instagram = siteContent.instagram;
    const linkedin = siteContent.linkedin;
    const politica = siteContent.politicaPrivacidade || "/politica-de-privacidade";

    return (
        <footer className="bg-petroleo py-16 px-6">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    {/* Col 1 - Professional Info */}
                    <div>
                        <h3 className="font-serif text-xl font-bold text-bege-light">
                            {nome}
                        </h3>
                        <p className="mt-2 text-bege/70 text-sm">Psicóloga Clínica</p>
                        <p className="mt-1 text-dourado-light text-sm font-medium">
                            {crp}
                        </p>
                        <div className="mt-4 h-[1px] w-16 bg-dourado/30" />
                    </div>

                    {/* Col 2 - Contact */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-bege-light mb-4">
                            Contato
                        </h4>
                        <div className="space-y-3">
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center gap-2 text-bege/70 text-sm hover:text-bege transition-colors duration-200"
                            >
                                <Mail className="h-4 w-4 text-dourado/60" />
                                {email}
                            </a>
                            {endereco && (
                                <div className="flex items-start gap-2 text-bege/70 text-sm">
                                    <MapPin className="h-4 w-4 text-dourado/60 mt-0.5 shrink-0" />
                                    <span>{endereco}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Col 3 - Social & Legal */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold text-bege-light mb-4">
                            Redes Sociais
                        </h4>
                        <div className="flex gap-3 mb-6">
                            {instagram && (
                                <a
                                    href={instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-bege/10 text-bege/70 transition-all duration-300 hover:bg-dourado/20 hover:text-dourado-light"
                                >
                                    <Instagram className="h-5 w-5" />
                                </a>
                            )}
                            {linkedin && (
                                <a
                                    href={linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-bege/10 text-bege/70 transition-all duration-300 hover:bg-dourado/20 hover:text-dourado-light"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                        <a
                            href={politica}
                            className="text-sm text-bege/50 underline underline-offset-2 hover:text-bege/80 transition-colors duration-200"
                        >
                            Política de Privacidade (LGPD)
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 border-t border-bege/10 pt-8 text-center">
                    <p className="text-sm text-bege/40">
                        © {new Date().getFullYear()} {nome} — Todos os direitos
                        reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
