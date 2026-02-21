"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import siteContent from "@/data/site-content.json";

export function Depoimentos() {
    const depoimentos = siteContent.depoimentos;

    return (
        <section id="depoimentos" className="bg-bege py-24 md:py-32">
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
                        Experiências de Acolhimento
                    </h2>
                    <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-dourado" />
                    <p className="mt-6 text-petroleo/70 text-lg max-w-2xl mx-auto">
                        Relatos sobre a experiência terapêutica, respeitando o Código de
                        Ética do CFP.
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {depoimentos.map((dep, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-sm border border-bege-dark/20"
                        >
                            <Quote className="h-8 w-8 text-dourado/30 mb-4" />
                            <p className="text-petroleo/80 leading-relaxed italic text-base">
                                &ldquo;{dep.texto}&rdquo;
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-petroleo/10 flex items-center justify-center">
                                    <span className="text-sm font-bold text-petroleo">
                                        {dep.autor}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-sm text-petroleo/60">{dep.contexto}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Ethics notice */}
                <p className="mt-12 text-center text-sm text-petroleo/50 max-w-lg mx-auto">
                    * Depoimentos focados na experiência de acolhimento, em conformidade
                    com o Código de Ética Profissional do Psicólogo (CFP). Não
                    constituem promessa de resultado ou cura.
                </p>
            </div>
        </section>
    );
}
