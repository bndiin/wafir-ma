import { getTranslations } from "next-intl/server";
import { RachatCreditClient } from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });

  return {
    title: `${t("debtConsolidation")} | Wafir.ma`,
    description: t("debtConsolidationDesc"),
    alternates: {
      canonical: `https://wafir.ma/${locale}/outils/simulateur-rachat-credit`,
      languages: {
        fr: "/fr/outils/simulateur-rachat-credit",
        ar: "/ar/outils/simulateur-rachat-credit",
        en: "/en/outils/simulateur-rachat-credit",
      },
    },
  };
}

export default function SimulateurRachatCreditPage() {
  return <RachatCreditClient />;
}
