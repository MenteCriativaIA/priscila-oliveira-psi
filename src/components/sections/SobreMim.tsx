"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import siteContent from "@/data/site-content.json";

export function SobreMim() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [loadVideo, setLoadVideo] = useState(false);
    const isInView = useInView(sectionRef, { amount: 0.2, once: true });

    const data = siteContent.sobreMim;
    const nome = siteContent.nomeCompleto || "[Nome da Psicóloga]";
    const crp = siteContent.crp || "[CRP XXXXX/XX]";
    const videoId = data.youtubeVideoId || "eJEWocsBrbo";

    useEffect(() => {
        if (isInView) {
            // Small delay to ensure hero animation has settled
            const timer = setTimeout(() => setLoadVideo(true), 500);
            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section
            ref={sectionRef}
            id="sobre"
            className="relative min-h-screen overflow-hidden"
        >
            {/* YouTube Video Background */}
            <div className="absolute inset-0 z-0">
                {loadVideo ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playlist=${videoId}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0`}
                        title="Background video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen={false}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                            width: "177.78vh",
                            height: "100vh",
                            minWidth: "100%",
                            minHeight: "100%",
                        }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-petroleo" />
                )}
            </div>

            {/* Overlay - Blindagem */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(27,79,92,0.7) 0%, rgba(27,79,92,0.5) 50%, rgba(27,79,92,0.65) 100%)",
                }}
            />

            {/* Content */}
            <div className="relative z-20 flex min-h-screen items-center">
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
