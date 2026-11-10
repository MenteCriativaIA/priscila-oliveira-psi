import type { MetadataRoute } from "next";
import { artigos } from "@/data/artigos";
import { datasPaginas } from "@/data/datas-paginas";

const siteUrl = "https://www.priolivepsi.com.br";

// Só endereço e data real da última mudança: o Google ignora changefreq e priority.
// Cada endereço tem de ser igual ao canonical da própria página.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: datasPaginas.inicio },
    { url: `${siteUrl}/terapia-de-casal-meier`, lastModified: datasPaginas.terapiaDeCasal },
    { url: `${siteUrl}/psicologa-infantil-meier`, lastModified: datasPaginas.servicos },
    { url: `${siteUrl}/terapia-cognitivo-comportamental-meier`, lastModified: datasPaginas.servicos },
    { url: `${siteUrl}/terapia-para-ansiedade`, lastModified: datasPaginas.servicos },
    { url: `${siteUrl}/terapia-para-depressao`, lastModified: datasPaginas.servicos },
    { url: `${siteUrl}/fatos`, lastModified: datasPaginas.fatos },
    { url: `${siteUrl}/politica-de-privacidade`, lastModified: datasPaginas.privacidade },
    ...artigos.map((a) => ({
      url: `${siteUrl}/blog/${a.slug}`,
      lastModified: a.atualizado ?? a.data,
    })),
  ];
}
