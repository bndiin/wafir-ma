import { getTranslations } from "next-intl/server";
import { MourabahaClient } from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });

  return {
    title: `${t("mourabaha")} | Wafir.ma`,
    description: t("mourabahaDesc"),
    alternates: {
      canonical: `https://wafir.ma/${locale}/outils/simulateur-mourabaha`,
      languages: {
        fr: "/fr/outils/simulateur-mourabaha",
        ar: "/ar/outils/simulateur-mourabaha",
        en: "/en/outils/simulateur-mourabaha",
      },
    },
  };
}

export default function SimulateurMourabahaPage() {
  return <MourabahaClient />;
}
