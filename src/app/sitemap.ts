import type { MetadataRoute } from "next";
import { CITIES, CATEGORIES } from "@/lib/constants";

const BASE_URL = "https://wafir.ma";
const locales = ["fr", "ar", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    "",
    "/outils",
    "/outils/simulateur-credit-immobilier",
    "/outils/simulateur-credit-consommation",
    "/outils/simulateur-mourabaha",
    "/outils/comparateur-assurance-auto",
    "/outils/calculateur-capacite-emprunt",
    "/outils/calculateur-frais-notaire",
    "/outils/simulateur-rachat-credit",
    "/comparer",
    "/annuaire",
    "/blog",
    "/connexion",
    "/inscription",
    "/mentions-legales",
    "/politique-confidentialite",
    "/conditions-utilisation",
  ];

  for (const page of staticPages) {
    for (const locale of locales) {
      routes.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : page.includes("outils") ? 0.9 : 0.8,
      });
    }
  }

  // Category pages
  for (const category of CATEGORIES) {
    for (const locale of locales) {
      routes.push({
        url: `${BASE_URL}/${locale}/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  // City × Category pages (360 URLs)
  for (const category of CATEGORIES) {
    for (const city of CITIES) {
      for (const locale of locales) {
        routes.push({
          url: `${BASE_URL}/${locale}/${category.slug}/${city.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  }

  // Insurance sub-pages
  const insuranceSlugs = [
    "assurance-auto",
    "assurance-habitation",
    "mutuelle-sante",
    "assurance-vie",
    "assurance-voyage",
  ];
  for (const slug of insuranceSlugs) {
    for (const locale of locales) {
      routes.push({
        url: `${BASE_URL}/${locale}/assurance/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  return routes;
}
