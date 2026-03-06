import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    const insuranceSlugs = [
      "assurance-auto",
      "assurance-habitation",
      "mutuelle-sante",
      "assurance-vie",
      "assurance-voyage",
    ];
    return [
      {
        source: "/",
        destination: "/fr",
        permanent: false,
      },
      // /fr/assurance-auto → /fr/assurance/assurance-auto (etc.)
      ...insuranceSlugs.map((slug) => ({
        source: `/:locale(fr|ar|en)/${slug}`,
        destination: `/:locale/assurance/${slug}`,
        permanent: true,
      })),
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "oaidalleapiprodscus.blob.core.windows.net" },
    ],
  },
};

export default withNextIntl(nextConfig);
