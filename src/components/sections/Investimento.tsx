"use client";

import { motion } from "framer-motion";
import { Clock, Monitor, CreditCard } from "lucide-react";
import siteContent from "@/data/site-content.json";

export function Investimento() {
    const inv = siteContent.investimento;
    const phone = siteContent.telefoneWhatsApp || "5511999999999";
    const waUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os valores das consultas.")}`;

    return (
        <section id="investimento" className="bg-bege py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl lg:text-5xl">
                        {inv.titulo || "Investimento em sua Saúde"}
                    </h2>
                    <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-dourado" />
                    <p className="mt-6 text-petroleo/70 text-lg max-w-2xl mx-auto">
                        {inv.descricao || "[Descrição sobre o investimento]"}
                    </p>
                </motion.div>

                {/* Investment Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-lg"
                >
                    <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-bege-dark/20 shadow-lg">
                        {/* Card Header */}
                        <div className="bg-petroleo p-8 text-center">
                            <h3 className="font-serif text-2xl font-bold text-bege-light">
                                Sessão de Psicoterapia
                            </h3>
                            <div className="mt-4">
                                {inv.valorSessao ? (
                                    <span className="text-4xl font-bold text-dourado-light">
                                        R$ {inv.valorSessao}
                                    </span>
                                ) : (
                                    <span className="text-lg text-bege/80">
                                        Consulte valores via WhatsApp
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                    <Clock className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-petroleo/60">Duração</p>
                                    <p className="font-medium text-petroleo">
                                        {inv.duracaoSessao || "50 minutos"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                    <Monitor className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-petroleo/60">Modalidades</p>
                                    <p className="font-medium text-petroleo">
                                        {inv.modalidades || "Presencial e Online"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-petroleo/10 text-petroleo">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm text-petroleo/60">Pagamento</p>
                                    <p className="font-medium text-petroleo">
                                        PIX, Cartão ou Transferência
                                    </p>
                                </div>
                            </div>

                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 block w-full rounded-full bg-dourado py-4 text-center text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-dourado-dark hover:shadow-lg hover:scale-[1.02]"
                            >
                                Agendar Consulta
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
