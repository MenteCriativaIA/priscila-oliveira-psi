"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import siteContent from "@/data/site-content.json";

export default function PoliticaPrivacidadePage() {
    const nome = siteContent.nomeCompleto || "[Nome da Psicóloga]";
    const email = siteContent.emailProfissional || "[email@exemplo.com]";

    return (
        <div className="min-h-screen bg-bege">
            {/* Header */}
            <div className="bg-petroleo py-12 px-6">
                <div className="mx-auto max-w-4xl">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-bege/70 hover:text-bege-light transition-colors duration-200 mb-6 text-sm"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao site
                    </Link>
                    <h1 className="font-serif text-3xl font-bold text-bege-light sm:text-4xl">
                        Política de Privacidade
                    </h1>
                    <p className="mt-3 text-bege/60 text-sm">
                        Em conformidade com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)
                    </p>
                </div>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mx-auto max-w-4xl px-6 py-12"
            >
                <div className="prose prose-lg max-w-none space-y-8">
                    <section>
                        <h2 className="font-serif text-2xl font-bold text-petroleo">
                            1. Responsável pelo Tratamento de Dados
                        </h2>
                        <p className="text-petroleo/80 leading-relaxed mt-3">
                            O presente site é de responsabilidade de <strong>{nome}</strong>,
                            psicóloga clínica, que atua como controladora dos dados pessoais
                            coletados por meio deste site.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl font-bold text-petroleo">
                            2. Dados Coletados
                        </h2>
                        <p className="text-petroleo/80 leading-relaxed mt-3">
                            Podemos coletar os seguintes dados pessoais quando você interage com nosso site:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2 text-petroleo/80">
                            <li>Nome completo (quando fornecido voluntariamente via formulário de contato)</li>
                            <li>Endereço de e-mail (quando fornecido voluntariamente)</li>
                            <li>Número de telefone/WhatsApp (quando fornecido voluntariamente)</li>
                            <li>Dados de navegação (cookies, endereço IP, tipo de navegador)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl font-bold text-petroleo">
                            3. Finalidade do Tratamento
                        </h2>
                        <p className="text-petroleo/80 leading-relaxed mt-3">
                            Os dados pessoais coletados são utilizados exclusivamente para:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2 text-petroleo/80">
                            <li>Responder a solicitações de contato e agendamento de consultas</li>
                            <li>Enviar informações relevantes sobre os serviços oferecidos</li>
                            <li>Melhorar a experiência de navegação no site</li>
                            <li>Cumprir obrigações legais e regulatórias</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl font-bold text-petroleo">
                            4. Compartilhamento de Dados
                        </h2>
                        <p className="text-petroleo/80 leading-relaxed mt-3">
                            Seus dados pessoais <strong>não serão compartilhados, vendidos ou
                                divulgados a terceiros</strong>, exceto quando necessário para:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2 text-petroleo/80">
                            <li>Cumprimento de obrigação legal ou regulatória</li>
                            <li>Proteção dos direitos da profissional responsável</li>
                            <li>Execução de serviços contratados (ex: plataformas de agendamento)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl font-bold text-petroleo">
                            5. Segurança dos Dados
                        </h2>
                        <p className="text-petroleo/80 leading-relaxed mt-3">
                            Adotamos medidas técnicas e organizacionais adequadas para proteger
                            seus dados pessoais contra acessos não autorizados, destruição,
                            perda, alteração ou qualquer forma de tratamento inadequado.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl font-bold text-petroleo">
                            6. Seus Direitos (LGPD)
                        </h2>
                        <p className="text-petroleo/80 leading-relaxed mt-3">
                            De acordo com a LGPD, você tem os seguintes direitos:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2 text-petroleo/80">
                            <li>Confirmar a existência de tratamento de seus dados</li>
                            <li>Acessar, corrigir ou atualizar seus dados pessoais</li>
                            <li>Solicitar a exclusão de seus dados pessoais</li>
                            <li>Revogar seu consentimento a qualquer momento</li>
                            <li>Solicitar a portabilidade de seus dados</li>
                        </ul>
                        <p className="text-petroleo/80 leading-relaxed mt-3">
                            Para exercer qualquer um desses direitos, entre em contato pelo
                            e-mail: <a href={`mailto:${email}`} className="text-dourado hover:text-dourado-dark underline">{email}</a>
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl font-bold text-petroleo">
                            7. Sigilo Profissional
                        </h2>
                        <p className="text-petroleo/80 leading-relaxed mt-3">
                            Além da proteção prevista pela LGPD, todos os dados e informações
                            compartilhados no contexto clínico são protegidos pelo <strong>sigilo
                                profissional</strong>, conforme estabelecido pelo Código de Ética
                            Profissional do Psicólogo (Resolução CFP nº 010/2005).
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-2xl font-bold text-petroleo">
                            8. Alterações nesta Política
                        </h2>
                        <p className="text-petroleo/80 leading-relaxed mt-3">
                            Esta política pode ser atualizada periodicamente. Recomendamos
                            que você consulte esta página regularmente para se manter
                            informado(a) sobre como protegemos seus dados.
                        </p>
                    </section>

                    <section className="border-t border-bege-dark/20 pt-8 mt-12">
                        <p className="text-petroleo/60 text-sm">
                            Última atualização: Março de 2026
                        </p>
                        <p className="text-petroleo/60 text-sm mt-1">
                            Dúvidas? Entre em contato: <a href={`mailto:${email}`} className="text-dourado hover:text-dourado-dark underline">{email}</a>
                        </p>
                    </section>
                </div>
            </motion.div>
        </div>
    );
}
