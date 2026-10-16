import { PoliticaConteudo } from "./PoliticaConteudo";
import { listaAtiva, POLITICA_LISTA } from "@/lib/lista";

export default function PoliticaPrivacidadePage() {
    return <PoliticaConteudo lista={listaAtiva() ? POLITICA_LISTA : null} />;
}
