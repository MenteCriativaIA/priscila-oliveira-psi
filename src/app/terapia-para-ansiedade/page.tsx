import { PaginaServico, metadadosServico } from "@/components/PaginaServico";
import { terapiaAnsiedade } from "@/data/servicos";

export const metadata = metadadosServico(terapiaAnsiedade);

export default function TerapiaAnsiedadePage() {
    return <PaginaServico s={terapiaAnsiedade} />;
}
