import type { Metadata } from "next";
import { PoliticaConteudo } from "./PoliticaConteudo";
import { listaAtiva, POLITICA_LISTA } from "@/lib/lista";

// Sem isto a página herdava título, descrição e canonical da home (o canonical apontava para a página inicial).
export const metadata: Metadata = {
    title: "Política de Privacidade",
    description:
        "Como o site de Priscila Oliveira de Freitas (CRP 05/84054) trata os dados de quem entra em contato, e como pedir a exclusão dos seus dados.",
    alternates: { canonical: "https://www.priolivepsi.com.br/politica-de-privacidade" },
};

export default function PoliticaPrivacidadePage() {
    return <PoliticaConteudo lista={listaAtiva() ? POLITICA_LISTA : null} />;
}
