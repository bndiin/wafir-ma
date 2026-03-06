import { getTranslations } from "next-intl/server";
import { LoginForm } from "./login-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: "Connexion | Wafir.ma",
    description: "Connectez-vous à votre espace Wafir.ma pour gérer vos simulations, devis et alertes.",
    alternates: {
      canonical: `https://wafir.ma/${locale}/connexion`,
      languages: {
        fr: "/fr/connexion",
        ar: "/ar/connexion",
        en: "/en/connexion",
      },
    },
  };
}

export default function ConnexionPage() {
  return <LoginForm />;
}
