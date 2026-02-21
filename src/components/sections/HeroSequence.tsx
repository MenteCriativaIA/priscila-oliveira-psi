"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import siteContent from "@/data/site-content.json";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 34;
const IMAGE_PATH = "/images/hero-sequence/";

function getFrameSrc(index: number): string {
    return `${IMAGE_PATH}${String(index + 1).padStart(3, "0")}.webp.png`;
}

export function HeroSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [hasImages, setHasImages] = useState(true);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameRef = useRef(0);

    const renderFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const img = imagesRef.current[index];
        if (!img || !img.complete) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scale = Math.max(
            canvas.width / img.width,
            canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    }, []);

    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;
        let errorCount = 0;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFrameSrc(i);
            img.onload = () => {
                loadedCount++;
                if (loadedCount + errorCount === TOTAL_FRAMES) {
                    if (errorCount === TOTAL_FRAMES) {
                        setHasImages(false);
                    } else {
                        setImagesLoaded(true);
                        renderFrame(0);
                    }
                }
            };
            img.onerror = () => {
                errorCount++;
                if (loadedCount + errorCount === TOTAL_FRAMES) {
                    if (errorCount === TOTAL_FRAMES) {
                        setHasImages(false);
                    } else {
                        setImagesLoaded(true);
                        renderFrame(0);
                    }
                }
            };
            images.push(img);
        }
        imagesRef.current = images;
    }, [renderFrame]);

    useEffect(() => {
        if (!imagesLoaded || !containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                onUpdate: (self) => {
                    const frame = Math.min(
                        TOTAL_FRAMES - 1,
                        Math.floor(self.progress * TOTAL_FRAMES)
                    );
                    if (frame !== frameRef.current) {
                        frameRef.current = frame;
                        renderFrame(frame);
                    }
                },
            },
        });

        const handleResize = () => renderFrame(frameRef.current);
        window.addEventListener("resize", handleResize);

        return () => {
            tl.kill();
            window.removeEventListener("resize", handleResize);
        };
    }, [imagesLoaded, renderFrame]);

    const headline = siteContent.heroHeadline || "Psicóloga especializada em ansiedade, stress e depressão";
    const subheadline = siteContent.heroSubheadline || "Construir junto com você estratégias para clarear sua direção";
    const phone = siteContent.telefoneWhatsApp || "5511999999999";
    const waUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de agendar uma consulta.")}`;

    return (
        <section ref={containerRef} className="relative h-[300vh]" id="hero">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Canvas or gradient fallback */}
                {hasImages ? (
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-petroleo via-petroleo-dark to-petroleo" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-petroleo/40" />

                {/* Content */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="px-6 text-center max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="font-serif text-3xl font-bold leading-tight text-bege-light sm:text-4xl md:text-5xl lg:text-6xl"
                        >
                            {headline}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="mt-6 text-lg text-bege/90 sm:text-xl md:text-2xl font-light"
                        >
                            {subheadline}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                        >
                            <a
                                href={waUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-dourado px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-dourado-dark hover:shadow-xl hover:scale-105"
                            >
                                Falar no WhatsApp
                            </a>
                            <a
                                href="#servicos"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-bege/50 px-8 py-4 text-base font-semibold text-bege-light transition-all duration-300 hover:border-bege hover:bg-bege/10 hover:scale-105"
                            >
                                Conhecer Serviços
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                >
                    <div className="flex flex-col items-center gap-2 text-bege/60">
                        <span className="text-xs tracking-widest uppercase">Scroll</span>
                        <div className="h-12 w-[1px] bg-gradient-to-b from-bege/60 to-transparent animate-pulse" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
