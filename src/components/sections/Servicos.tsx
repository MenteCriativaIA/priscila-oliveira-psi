"use client";

import { motion } from "framer-motion";
import { Heart, Flame, Wind, Brain } from "lucide-react";
import siteContent from "@/data/site-content.json";

const iconList = [Heart, Flame, Wind, Brain];

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.2,
            ease: "easeOut" as const,
        },
    }),
};

export function Servicos() {
    const s = siteContent.servicos;
    const abordagem = siteContent.abordagemClinica;

    // Build cards from the new object structure
    const cards = [
        { titulo: s.area1, descricao: s.frase1 },
        { titulo: s.area2, descricao: s.frase2 },
        { titulo: s.area3, descricao: s.frase3 },
        { titulo: s.area4, descricao: s.frase4 },
    ].filter((c) => c.titulo?.trim()); // Only show cards that have a title

    return (
        <section id="servicos" className="bg-bege-light py-24 md:py-32">
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
                        Serviços
                    </h2>
                    <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-dourado" />
                    <p className="mt-6 text-petroleo/70 text-lg max-w-2xl mx-auto">
                        Cada pessoa é única, e o processo terapêutico deve refletir isso.
                        Conheça as modalidades de atendimento.
                    </p>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {cards.map((servico, index) => {
                        const Icon = iconList[index] || Heart;
                        return (
                            <motion.div
                                key={index}
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                variants={cardVariants}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-bege-dark/20"
                            >
                                {/* Decorative corner */}
                                <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-[80px] bg-gradient-to-br from-dourado/10 to-transparent transition-all duration-500 group-hover:h-32 group-hover:w-32" />

                                <div className="relative z-10">
                                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-petroleo/10 text-petroleo transition-colors duration-300 group-hover:bg-dourado/20 group-hover:text-dourado-dark">
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-petroleo mb-4">
                                        {servico.titulo}
                                    </h3>
                                    <p className="text-petroleo/70 leading-relaxed">
                                        {servico.descricao}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Clinical Approach */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mt-20 rounded-3xl bg-petroleo/5 border border-petroleo/10 p-8 md:p-12"
                >
                    <h3 className="font-serif text-2xl font-bold text-petroleo sm:text-3xl">
                        {abordagem.titulo || "Minha Abordagem"}
                    </h3>
                    <div className="mt-3 h-1 w-16 rounded-full bg-dourado" />
                    <p className="mt-6 text-lg text-petroleo/80 leading-relaxed max-w-3xl">
                        {abordagem.texto || "[Explicação da abordagem clínica]"}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
