import { getTranslations } from "next-intl/server";
import { CapaciteEmpruntClient } from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });

  return {
    title: `${t("borrowingCapacity")} | Wafir.ma`,
    description: t("borrowingCapacityDesc"),
    alternates: {
      canonical: `https://wafir.ma/${locale}/outils/calculateur-capacite-emprunt`,
      languages: {
        fr: "/fr/outils/calculateur-capacite-emprunt",
        ar: "/ar/outils/calculateur-capacite-emprunt",
        en: "/en/outils/calculateur-capacite-emprunt",
      },
    },
  };
}

export default function CalculateurCapaciteEmpruntPage() {
  return <CapaciteEmpruntClient />;
}
