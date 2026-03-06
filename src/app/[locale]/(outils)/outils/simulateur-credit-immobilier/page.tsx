import { getTranslations } from "next-intl/server";
import { MortgageSimulator } from "@/components/simulators/mortgage-simulator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });

  return {
    title: `${t("mortgageSimulator")} — Wafir.ma`,
    description: t("mortgageDesc"),
    alternates: {
      canonical: `https://wafir.ma/${locale}/outils/simulateur-credit-immobilier`,
      languages: {
        fr: "/fr/outils/simulateur-credit-immobilier",
        ar: "/ar/outils/simulateur-credit-immobilier",
        en: "/en/outils/simulateur-credit-immobilier",
      },
    },
    openGraph: {
      title: `${t("mortgageSimulator")} — Wafir.ma`,
      description: t("mortgageDesc"),
      type: "website",
      siteName: "Wafir.ma",
    },
  };
}

export default function SimulateurCreditImmobilierPage() {
  return <MortgageSimulator />;
}
