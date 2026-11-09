import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Áreas que não devem aparecer na busca. O robots.txt sozinho não retira um endereço já conhecido do Google.
    const semIndexar = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      { source: "/admin", headers: semIndexar },
      { source: "/admin/:path*", headers: semIndexar },
      { source: "/api/:path*", headers: semIndexar },
    ];
  },
};

export default nextConfig;
