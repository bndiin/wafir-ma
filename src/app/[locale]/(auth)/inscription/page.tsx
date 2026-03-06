import { getTranslations } from "next-intl/server";
import { RegisterForm } from "./register-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title: "Inscription | Wafir.ma",
    description:
      "Créez votre compte Wafir.ma pour comparer les offres de crédit et d'assurance au Maroc.",
    alternates: {
      canonical: `https://wafir.ma/${locale}/inscription`,
      languages: {
        fr: "/fr/inscription",
        ar: "/ar/inscription",
        en: "/en/inscription",
      },
    },
  };
}

export default function InscriptionPage() {
  return <RegisterForm />;
}
