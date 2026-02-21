"use client";

import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import siteContent from "@/data/site-content.json";

interface FaqItem {
    pergunta: string;
    resposta: string;
}

export function FAQ() {
    const faqItems = siteContent.faq as FaqItem[];

    if (faqItems.length === 0) return null;

    return (
        <section id="faq" className="bg-bege-light py-24 md:py-32">
            <div className="mx-auto max-w-3xl px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-3xl font-bold text-petroleo sm:text-4xl lg:text-5xl">
                        Perguntas Frequentes
                    </h2>
                    <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-dourado" />
                </motion.div>

                {/* Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqItems.map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="rounded-2xl border border-bege-dark/20 bg-white/80 backdrop-blur-sm px-6 shadow-sm transition-shadow duration-300 hover:shadow-md overflow-hidden"
                            >
                                <AccordionTrigger className="py-5 text-left font-serif text-lg font-semibold text-petroleo hover:text-petroleo-light hover:no-underline [&[data-state=open]]:text-dourado-dark">
                                    {item.pergunta}
                                </AccordionTrigger>
                                <AccordionContent className="pb-5 text-petroleo/75 leading-relaxed text-base">
                                    {item.resposta}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    );
}
