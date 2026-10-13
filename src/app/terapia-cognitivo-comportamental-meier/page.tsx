import { PaginaServico, metadadosServico } from "@/components/PaginaServico";
import { tccMeier } from "@/data/servicos";

export const metadata = metadadosServico(tccMeier);

export default function TccMeierPage() {
    return <PaginaServico s={tccMeier} />;
}
