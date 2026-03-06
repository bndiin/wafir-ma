import { getTranslations } from "next-intl/server";
import { ConsumerCreditSimulator } from "./consumer-credit-simulator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });

  return {
    title: `${t("consumerCredit")} | Wafir.ma`,
    description: t("consumerCreditDesc"),
    openGraph: {
      title: `${t("consumerCredit")} | Wafir.ma`,
      description: t("consumerCreditDesc"),
      type: "website",
      siteName: "Wafir.ma",
    },
    alternates: {
      canonical: `/${locale}/outils/simulateur-credit-consommation`,
      languages: {
        fr: "/fr/outils/simulateur-credit-consommation",
        ar: "/ar/outils/simulateur-credit-consommation",
        en: "/en/outils/simulateur-credit-consommation",
      },
    },
  };
}

export default async function SimulateurCreditConsommationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
          100% {t("calculate").charAt(0).toUpperCase() + t("calculate").slice(1)} Gratuit
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {t("consumerCredit")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Simulez votre cr&eacute;dit &agrave; la consommation, calculez vos mensualit&eacute;s et comparez
          les offres des soci&eacute;t&eacute;s de financement au Maroc.
        </p>
      </div>

      {/* Client Simulator */}
      <ConsumerCreditSimulator locale={locale} />
    </div>
  );
}
