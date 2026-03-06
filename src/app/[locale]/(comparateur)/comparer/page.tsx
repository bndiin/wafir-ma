import { getTranslations } from "next-intl/server";
import { ComparatorFlow } from "@/components/comparator/comparator-flow";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "comparator" });

  return {
    title: `${t("metaTitle")} | Wafir.ma`,
    description: t("metaDescription"),
    alternates: {
      canonical: `https://wafir.ma/${locale}/comparer`,
      languages: {
        fr: "/fr/comparer",
        ar: "/ar/comparer",
        en: "/en/comparer",
      },
    },
    openGraph: {
      title: `${t("metaTitle")} | Wafir.ma`,
      description: t("metaDescription"),
      url: `https://wafir.ma/${locale}/comparer`,
      siteName: "Wafir.ma",
      type: "website",
    },
  };
}

export default function ComparerPage() {
  return (
    <section className="min-h-[calc(100vh-4rem)]">
      {/* Hero section */}
      <div className="border-b bg-gradient-to-b from-primary/5 to-background py-8 md:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Comparez les crédits et assurances{" "}
            <span className="text-primary">au Maroc</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Trouvez la meilleure offre en 2 minutes. Gratuit et sans engagement.
          </p>
        </div>
      </div>

      {/* Comparator flow */}
      <ComparatorFlow />
    </section>
  );
}
