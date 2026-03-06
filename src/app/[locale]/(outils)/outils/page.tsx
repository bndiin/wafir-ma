import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Calculator,
  Home,
  Car,
  BarChart3,
  FileText,
  RefreshCw,
  Building2,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

const TOOLS = [
  {
    slug: "simulateur-credit-immobilier",
    icon: Home,
    color: "bg-emerald-100 text-emerald-700",
    key: "mortgageSimulator",
    descKey: "mortgageDesc",
    badge: "Populaire",
  },
  {
    slug: "simulateur-mourabaha",
    icon: Building2,
    color: "bg-purple-100 text-purple-700",
    key: "mourabaha",
    descKey: "mourabahaDesc",
    badge: "Finance islamique",
  },
  {
    slug: "comparateur-assurance-auto",
    icon: Car,
    color: "bg-orange-100 text-orange-700",
    key: "autoInsurance",
    descKey: "autoInsuranceDesc",
    badge: null,
  },
  {
    slug: "calculateur-capacite-emprunt",
    icon: BarChart3,
    color: "bg-blue-100 text-blue-700",
    key: "borrowingCapacity",
    descKey: "borrowingCapacityDesc",
    badge: null,
  },
  {
    slug: "simulateur-credit-consommation",
    icon: CreditCard,
    color: "bg-teal-100 text-teal-700",
    key: "consumerCredit",
    descKey: "consumerCreditDesc",
    badge: null,
  },
  {
    slug: "calculateur-frais-notaire",
    icon: FileText,
    color: "bg-amber-100 text-amber-700",
    key: "notaryFees",
    descKey: "notaryFeesDesc",
    badge: null,
  },
  {
    slug: "simulateur-rachat-credit",
    icon: RefreshCw,
    color: "bg-rose-100 text-rose-700",
    key: "debtConsolidation",
    descKey: "debtConsolidationDesc",
    badge: null,
  },
];

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tools" });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
          <Calculator className="h-4 w-4" />
          100% Gratuit
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {t("title")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {TOOLS.map((tool) => (
          <Link key={tool.slug} href={`/${locale}/outils/${tool.slug}`}>
            <Card className="group h-full hover:shadow-lg transition-all duration-200 hover:border-primary/30 cursor-pointer">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${tool.color}`}
                  >
                    <tool.icon className="h-6 w-6" />
                  </div>
                  {tool.badge && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary"
                    >
                      {tool.badge}
                    </Badge>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(tool.key)}
                </h2>
                <p className="text-sm text-muted-foreground flex-1 mb-4">
                  {t(tool.descKey)}
                </p>
                <div className="flex items-center gap-1 text-sm text-primary font-medium">
                  Utiliser l&apos;outil
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
