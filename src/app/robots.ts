import type { MetadataRoute } from "next";

const siteUrl = "https://www.priolivepsi.com.br";

// Cada robô lê só o próprio bloco: se há bloco para Googlebot ou Bingbot, os bloqueios precisam estar em todos.
// Twitterbot e facebookexternalhit ficam livres para a prévia de link funcionar. Robôs de IA seguem o bloco geral.
// /admin e /api também levam noindex (cabeçalho X-Robots-Tag em next.config.ts): o robots.txt só impede a leitura,
// não retira do Google um endereço que outro site linkou.
const bloqueios = ["/admin", "/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/", disallow: bloqueios },
      { userAgent: "Bingbot", allow: "/", disallow: bloqueios },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "*", allow: "/", disallow: bloqueios },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
