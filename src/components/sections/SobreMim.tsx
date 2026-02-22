"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import siteContent from "@/data/site-content.json";

export function SobreMim() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const data = siteContent.sobreMim;
    const nome = siteContent.nomeCompleto || "[Nome da Psicóloga]";
    const crp = siteContent.crp || "[CRP XXXXX/XX]";

    return (
        <section
            ref={sectionRef}
            id="sobre"
            className="relative h-screen overflow-hidden"
        >
            {/* Video Background */}
            <video
                className="absolute inset-0 h-full w-full object-cover object-center"
                style={{ zIndex: -1 }}
                src="/video-sobre-mim.mp4"
                poster="/capa-video.png"
                muted
                autoPlay
                loop
                playsInline
            />

            {/* Overlay - Radial Gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    zIndex: 0,
                    background:
                        "radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 80%)",
                }}
            />

            {/* Content */}
            <div
                className="relative flex h-full items-center"
                style={{ zIndex: 1 }}
            >
                <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 items-center">
                        {/* Left - Title & CRP */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block rounded-full bg-dourado/20 px-4 py-2 text-sm font-medium text-dourado-light tracking-wide mb-6">
                                {crp}
                            </span>
                            <h2 className="font-serif text-3xl font-bold text-bege-light sm:text-4xl lg:text-5xl leading-tight">
                                {data.titulo || "Sobre Mim"}
                            </h2>
                            <div className="mt-6 h-1 w-20 rounded-full bg-dourado" />
                            <p className="mt-4 text-bege/80 text-sm">
                                {data.formacao || "[Formação Acadêmica]"}
                            </p>
                            <p className="mt-2 text-bege/80 text-sm">
                                Abordagem: {data.abordagem || "[Abordagem Clínica]"}
                            </p>
                        </motion.div>

                        {/* Right - Bio Text */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-lg leading-relaxed text-bege/95 md:text-xl">
                                {data.texto ||
                                    "[Texto sobre a trajetória profissional da psicóloga]"}
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-dourado/30 flex items-center justify-center">
                                    <span className="font-serif text-2xl font-bold text-dourado-light">
                                        {nome.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-bege-light font-serif">
                                        {nome}
                                    </p>
                                    <p className="text-sm text-bege/70">Psicóloga Clínica</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
