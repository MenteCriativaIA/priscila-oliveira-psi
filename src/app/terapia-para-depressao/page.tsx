import { PaginaServico, metadadosServico } from "@/components/PaginaServico";
import { terapiaDepressao } from "@/data/servicos";

export const metadata = metadadosServico(terapiaDepressao);

export default function TerapiaDepressaoPage() {
    return <PaginaServico s={terapiaDepressao} />;
}
