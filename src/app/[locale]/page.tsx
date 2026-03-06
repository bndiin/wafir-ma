import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  Search,
  Calculator,
  Shield,
  CreditCard,
  Car,
  Home,
  Heart,
  Plane,
  Building2,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: t("heroTitle"),
    description: t("heroSubtitle"),
    alternates: {
      canonical: `https://wafir.ma/${locale}`,
      languages: {
        fr: "/fr",
        ar: "/ar",
        en: "/en",
      },
    },
  };
}

const CATEGORY_CARDS = [
  { slug: "credit-immobilier", icon: Home, color: "bg-emerald-100 text-emerald-700" },
  { slug: "credit-consommation", icon: CreditCard, color: "bg-blue-100 text-blue-700" },
  { slug: "assurance-auto", icon: Car, color: "bg-orange-100 text-orange-700" },
  { slug: "mourabaha", icon: Building2, color: "bg-purple-100 text-purple-700" },
  { slug: "mutuelle-sante", icon: Heart, color: "bg-pink-100 text-pink-700" },
  { slug: "assurance-voyage", icon: Plane, color: "bg-sky-100 text-sky-700" },
];

const TOOLS = [
  { slug: "simulateur-credit-immobilier", icon: "🏠", key: "mortgageSimulator", descKey: "mortgageDesc" },
  { slug: "simulateur-mourabaha", icon: "☪️", key: "mourabaha", descKey: "mourabahaDesc" },
  { slug: "comparateur-assurance-auto", icon: "🚗", key: "autoInsurance", descKey: "autoInsuranceDesc" },
  { slug: "calculateur-capacite-emprunt", icon: "📊", key: "borrowingCapacity", descKey: "borrowingCapacityDesc" },
];

export default function HomePage() {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");
  const tTools = useTranslations("tools");
  const tCta = useTranslations("cta");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary border-primary/20"
            >
              {t("trustTitle")}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              {t("heroSubtitle")}
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-xl relative">
              <div className="flex items-center gap-2 rounded-xl border bg-card p-2 shadow-lg">
                <Search className="ms-2 h-5 w-5 text-muted-foreground shrink-0" />
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="border-0 bg-transparent focus-visible:ring-0 text-base"
                />
                <Button className="bg-primary hover:bg-primary/90 shrink-0">
                  <Search className="h-4 w-4 md:hidden" />
                  <span className="hidden md:inline">{tCta("compareNow")}</span>
                </Button>
              </div>
            </div>

            {/* Trust Stats */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Building2, label: t("stats.banks") },
                { icon: Calculator, label: t("stats.tools") },
                { icon: BarChart3, label: t("stats.cities") },
                { icon: Users, label: t("stats.users") },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 justify-center text-sm text-muted-foreground"
                >
                  <stat.icon className="h-4 w-4 text-primary" />
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t("categoriesTitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORY_CARDS.map((cat) => (
            <Link key={cat.slug} href={`/${cat.slug}`}>
              <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/30 cursor-pointer">
                <CardContent className="flex items-center gap-4 p-5">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.color}`}
                  >
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tNav(
                        cat.slug === "credit-immobilier" ? "creditImmobilier" :
                        cat.slug === "credit-consommation" ? "creditConsommation" :
                        cat.slug === "assurance-auto" ? "assuranceAuto" :
                        cat.slug === "mourabaha" ? "mourabaha" :
                        cat.slug === "mutuelle-sante" ? "mutuelleSante" : "assuranceVoyage"
                      )}
                    </h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Free Tools Section */}
      <section className="bg-[var(--surface)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t("toolsTitle")}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {t("toolsSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOOLS.map((tool) => (
              <Link key={tool.slug} href={`/outils/${tool.slug}`}>
                <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/30 h-full cursor-pointer">
                  <CardContent className="p-5 flex flex-col h-full">
                    <span className="text-3xl mb-3">{tool.icon}</span>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {tTools(tool.key)}
                    </h3>
                    <p className="text-sm text-muted-foreground flex-1">
                      {tTools(tool.descKey)}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-sm text-primary font-medium">
                      {tCta("freeSimulation")}
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/outils">
                {tTools("title")}
                <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Wafir Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Pourquoi choisir Wafir.ma ?
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "100% gratuit, sans engagement",
                  desc: "Comparez les offres de crédit et d'assurance sans frais ni obligation.",
                },
                {
                  title: "Résultats personnalisés en 2 min",
                  desc: "Notre algorithme compare +40 banques et assureurs pour trouver la meilleure offre.",
                },
                {
                  title: "Professionnels vérifiés",
                  desc: "Tous nos partenaires sont vérifiés et notés par les clients.",
                },
                {
                  title: "Outils de simulation avancés",
                  desc: "Calculez vos mensualités, capacité d'emprunt et frais de notaire.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 text-center">
            <div className="space-y-6">
              <div>
                <p className="text-5xl font-bold text-primary">4.2%</p>
                <p className="text-sm text-muted-foreground mt-1">Taux moyen crédit immobilier</p>
              </div>
              <div className="flex justify-center gap-8">
                <div>
                  <p className="text-2xl font-bold text-foreground">+40</p>
                  <p className="text-xs text-muted-foreground">Banques & Assureurs</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Villes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">7</p>
                  <p className="text-xs text-muted-foreground">Simulateurs</p>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/comparer">
                  <TrendingDown className="me-2 h-5 w-5" />
                  {tCta("compareNow")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pro CTA Section */}
      <section className="bg-[#1a1a2e] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Espace Professionnel
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("proCta")}</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">{t("proCtaDesc")}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/inscription-pro">{t("proCtaButton")}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800" asChild>
              <Link href="/partenaires/acheter-leads">
                Acheter des leads
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Widget */}
      <a
        href="https://wa.me/212600000000?text=Bonjour%2C%20je%20souhaite%20comparer%20les%20offres%20de%20cr%C3%A9dit%20%2F%20assurance"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 end-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Contacter par WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 fill-current"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
