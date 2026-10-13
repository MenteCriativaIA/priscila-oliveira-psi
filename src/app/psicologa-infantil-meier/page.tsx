import { PaginaServico, metadadosServico } from "@/components/PaginaServico";
import { psicologaInfantilMeier } from "@/data/servicos";

export const metadata = metadadosServico(psicologaInfantilMeier);

export default function PsicologaInfantilMeierPage() {
    return <PaginaServico s={psicologaInfantilMeier} />;
}
