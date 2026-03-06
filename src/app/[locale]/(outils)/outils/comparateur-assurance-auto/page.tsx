import { getTranslations } from "next-intl/server";
import { AutoInsuranceComparator } from "./client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });
  return {
    title: t("autoInsurance"),
    description: t("autoInsuranceDesc"),
  };
}

export default function Page() {
  return <AutoInsuranceComparator />;
}
