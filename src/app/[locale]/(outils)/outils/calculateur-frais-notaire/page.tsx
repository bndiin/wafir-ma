import { getTranslations } from "next-intl/server";
import { FraisNotaireClient } from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });

  return {
    title: `${t("notaryFees")} | Wafir.ma`,
    description: t("notaryFeesDesc"),
    alternates: {
      canonical: `https://wafir.ma/${locale}/outils/calculateur-frais-notaire`,
      languages: {
        fr: "/fr/outils/calculateur-frais-notaire",
        ar: "/ar/outils/calculateur-frais-notaire",
        en: "/en/outils/calculateur-frais-notaire",
      },
    },
  };
}

export default function CalculateurFraisNotairePage() {
  return <FraisNotaireClient />;
}
