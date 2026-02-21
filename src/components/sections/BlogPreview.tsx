"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import siteContent from "@/data/site-content.json";

export function BlogPreview() {
    const posts = siteContent.blogPosts;

    return (
        <section id="blog" className="bg-bege-light py-24 md:py-32">
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
                        Blog & Conteúdos
                    </h2>
                    <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-dourado" />
                    <p className="mt-6 text-petroleo/70 text-lg max-w-2xl mx-auto">
                        Artigos e reflexões sobre saúde mental, bem-estar e
                        autoconhecimento.
                    </p>
                </motion.div>

                {/* Post Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {posts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm border border-bege-dark/20 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                        >
                            {/* Category color bar */}
                            <div className="h-2 bg-gradient-to-r from-petroleo to-petroleo-light" />

                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="inline-block rounded-full bg-dourado/10 px-3 py-1 text-xs font-medium text-dourado-dark">
                                        {post.categoria}
                                    </span>
                                    <div className="flex items-center gap-1 text-petroleo/40 text-xs">
                                        <Calendar className="h-3 w-3" />
                                        <span>
                                            {new Date(post.data).toLocaleDateString("pt-BR", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="font-serif text-lg font-bold text-petroleo mb-3 group-hover:text-petroleo-light transition-colors duration-300">
                                    {post.titulo}
                                </h3>

                                <p className="text-petroleo/65 text-sm leading-relaxed mb-4">
                                    {post.resumo}
                                </p>

                                <span className="inline-flex items-center gap-1 text-sm font-medium text-dourado group-hover:text-dourado-dark transition-colors duration-300">
                                    Ler mais
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
