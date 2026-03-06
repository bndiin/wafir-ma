import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/mon-compte/",
          "/espace-pro/",
          "/admin/",
        ],
      },
    ],
    sitemap: "https://wafir.ma/sitemap.xml",
  };
}
