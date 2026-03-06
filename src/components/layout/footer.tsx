"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { NAV_LINKS, CITIES } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tTools = useTranslations("tools");
  const locale = useLocale();

  const topCities = CITIES.slice(0, 6);

  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold text-lg">
                W
              </div>
              <span className="text-xl font-bold">
                Wafir<span className="text-primary">.ma</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Crédit */}
          <div>
            <h3 className="font-semibold mb-3 text-primary">{t("credit")}</h3>
            <ul className="space-y-2">
              {NAV_LINKS.credit.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/${locale}/${link.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Assurance */}
          <div>
            <h3 className="font-semibold mb-3 text-primary">{t("assurance")}</h3>
            <ul className="space-y-2">
              {NAV_LINKS.assurance.map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/${locale}/assurance/${link.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Outils */}
          <div>
            <h3 className="font-semibold mb-3 text-primary">{t("tools")}</h3>
            <ul className="space-y-2">
              {NAV_LINKS.outils.slice(0, 5).map((link) => (
                <li key={link.slug}>
                  <Link
                    href={`/${locale}/outils/${link.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {tTools(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Villes */}
          <div>
            <h3 className="font-semibold mb-3 text-primary">{t("cities")}</h3>
            <ul className="space-y-2">
              {topCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/${locale}/annuaire?ville=${city.slug}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {locale === "ar" ? city.nameAr : locale === "en" ? city.nameEn : city.nameFr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} Wafir.ma — {t("rights")}
          </p>
          <div className="flex gap-4">
            <Link
              href={`/${locale}/mentions-legales`}
              className="hover:text-white transition-colors"
            >
              {t("legal")}
            </Link>
            <Link
              href={`/${locale}/politique-confidentialite`}
              className="hover:text-white transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href={`/${locale}/conditions-utilisation`}
              className="hover:text-white transition-colors"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
