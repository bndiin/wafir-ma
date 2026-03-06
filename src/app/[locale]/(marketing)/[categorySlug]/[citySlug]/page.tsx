import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MapPin,
  Building2,
  TrendingDown,
  ArrowRight,
  Globe,
  ChevronRight,
  Users,
  Landmark,
  Shield,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CITIES,
  CATEGORIES,
  CONVENTIONAL_BANKS,
  PARTICIPATIVE_BANKS,
  INSURANCE_COMPANIES,
  SOCIETES_FINANCEMENT,
  INDICATIVE_RATES,
} from "@/lib/constants";
import { routing } from "@/i18n/routing";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type CityEntry = (typeof CITIES)[number];
type CategoryEntry = (typeof CATEGORIES)[number];

function findCity(slug: string): CityEntry | undefined {
  return CITIES.find((c) => c.slug === slug);
}

function findCategory(slug: string): CategoryEntry | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/** Map category slug to the matching INDICATIVE_RATES key (if any). */
function getRateKey(
  slug: string
): keyof typeof INDICATIVE_RATES | null {
  const map: Record<string, keyof typeof INDICATIVE_RATES> = {
    "credit-immobilier": "creditImmobilier",
    "credit-consommation": "creditConsommation",
    "credit-auto": "creditAuto",
    mourabaha: "mourabaha",
  };
  return map[slug] ?? null;
}

/** Return the relevant institutions for a given category. */
function getInstitutions(category: CategoryEntry) {
  if (category.group === "ASSURANCE") {
    return {
      label: "Compagnies d'assurance",
      items: [...INSURANCE_COMPANIES],
    };
  }
  if (category.slug === "mourabaha" || (category.group as string) === "FINANCE_PARTICIPATIVE") {
    return {
      label: "Banques participatives",
      items: [...PARTICIPATIVE_BANKS],
    };
  }
  // CREDIT group: conventional banks + societes de financement
  return {
    label: "Banques & Organismes de financement",
    items: [
      ...CONVENTIONAL_BANKS,
      ...SOCIETES_FINANCEMENT,
    ],
  };
}

/** Approximate number of professionals per city (purely indicative, for display). */
function getProfessionalCount(city: CityEntry): number {
  const base: Record<string, number> = {
    casablanca: 85,
    rabat: 62,
    marrakech: 48,
    tanger: 44,
    fes: 38,
    agadir: 35,
    meknes: 28,
    oujda: 22,
    kenitra: 24,
    tetouan: 20,
    settat: 16,
    "beni-mellal": 18,
  };
  return base[city.slug] ?? 20;
}

/** City-specific contextual subtitle. */
function getCitySubtitle(city: CityEntry, category: CategoryEntry): string {
  const subtitles: Record<string, string> = {
    casablanca: `Comparez les meilleures offres de ${category.nameFr.toLowerCase()} dans la capitale economique du Maroc.`,
    rabat: `Trouvez le meilleur ${category.nameFr.toLowerCase()} a Rabat, capitale administrative du Royaume.`,
    marrakech: `Les offres de ${category.nameFr.toLowerCase()} les plus competitives a Marrakech et sa region.`,
    tanger: `Comparez les taux de ${category.nameFr.toLowerCase()} a Tanger, porte de l'Afrique vers l'Europe.`,
    fes: `Decouvrez les meilleures offres de ${category.nameFr.toLowerCase()} a Fes, capitale spirituelle du Maroc.`,
    agadir: `${category.nameFr} a Agadir : comparez et economisez dans la perle du Souss.`,
    meknes: `Trouvez le ${category.nameFr.toLowerCase()} ideal a Meknes et dans la region Fes-Meknes.`,
    oujda: `Comparez les offres de ${category.nameFr.toLowerCase()} a Oujda, capitale de l'Oriental.`,
    kenitra: `Les meilleures offres de ${category.nameFr.toLowerCase()} a Kenitra et sa region.`,
    tetouan: `${category.nameFr} a Tetouan : comparez les offres dans le nord du Maroc.`,
    settat: `Comparez les offres de ${category.nameFr.toLowerCase()} a Settat, au coeur de la Chaouia.`,
    "beni-mellal": `Trouvez le meilleur ${category.nameFr.toLowerCase()} a Beni Mellal et dans le Tadla.`,
  };
  return subtitles[city.slug] ?? `Comparez les offres de ${category.nameFr.toLowerCase()} a ${city.nameFr}.`;
}

/** Build structured FAQ items. */
function buildFaqItems(city: CityEntry, category: CategoryEntry) {
  const rateKey = getRateKey(category.slug);
  const rate = rateKey ? INDICATIVE_RATES[rateKey] : null;

  const isCredit = category.group === "CREDIT" || category.group === "FINANCE_PARTICIPATIVE";

  const items = [
    {
      question: `Quel est le meilleur taux de ${category.nameFr.toLowerCase()} a ${city.nameFr} ?`,
      answer: rate
        ? `Les taux de ${category.nameFr.toLowerCase()} a ${city.nameFr} varient entre ${rate.min}% et ${rate.max}%, avec une moyenne indicative de ${rate.avg}%. Le taux qui vous sera propose depend de votre profil, vos revenus et la duree de remboursement. Utilisez notre comparateur pour obtenir des offres personnalisees.`
        : `Les taux de ${category.nameFr.toLowerCase()} a ${city.nameFr} varient selon les etablissements et votre profil. Utilisez notre comparateur pour obtenir les meilleures offres du marche.`,
    },
    {
      question: `Comment obtenir un ${isCredit ? "" : "contrat d'"}${category.nameFr.toLowerCase()} a ${city.nameFr} ?`,
      answer: `Pour obtenir ${isCredit ? "un" : "une"} ${category.nameFr.toLowerCase()} a ${city.nameFr}, commencez par comparer les offres sur Wafir.ma. Remplissez notre formulaire en 2 minutes, recevez des propositions personnalisees, puis choisissez l'offre la plus avantageuse. Nos partenaires dans la region ${city.region} vous accompagnent dans toutes les demarches.`,
    },
    {
      question: `Quels documents sont necessaires pour un ${isCredit ? "" : "contrat d'"}${category.nameFr.toLowerCase()} ?`,
      answer: isCredit
        ? `Les documents generalement demandes sont : carte d'identite nationale (CIN), bulletins de salaire des 3 derniers mois, releves bancaires, attestation de travail, et un justificatif de domicile a ${city.nameFr}. Des pieces supplementaires peuvent etre exigees selon l'organisme.`
        : `Pour souscrire une ${category.nameFr.toLowerCase()}, vous aurez generalement besoin de : votre CIN, un justificatif de domicile a ${city.nameFr}, et les documents specifiques au type de couverture (carte grise pour l'auto, titre de propriete pour l'habitation, etc.).`,
    },
    {
      question: `Pourquoi comparer les offres de ${category.nameFr.toLowerCase()} a ${city.nameFr} ?`,
      answer: `Avec plus de ${getProfessionalCount(city)} agences et courtiers a ${city.nameFr}, les offres et tarifs varient significativement d'un etablissement a l'autre. Comparer vous permet d'economiser en moyenne 20 a 35% sur le cout total de votre ${category.nameFr.toLowerCase()}. Wafir.ma est 100% gratuit et sans engagement.`,
    },
  ];

  return items;
}

// ---------------------------------------------------------------------------
// Static Params (120 combos x 3 locales = 360 pages)
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  const params: { locale: string; categorySlug: string; citySlug: string }[] = [];

  for (const locale of routing.locales) {
    for (const category of CATEGORIES) {
      for (const city of CITIES) {
        params.push({
          locale,
          categorySlug: category.slug,
          citySlug: city.slug,
        });
      }
    }
  }

  return params;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageParams = { locale: string; categorySlug: string; citySlug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, categorySlug, citySlug } = await params;

  const city = findCity(citySlug);
  const category = findCategory(categorySlug);

  if (!city || !category) {
    return { title: "Page introuvable | Wafir.ma" };
  }

  const title = `${category.nameFr} a ${city.nameFr} - Comparer les offres | Wafir.ma`;
  const description = `Comparez les meilleures offres de ${category.nameFr.toLowerCase()} a ${city.nameFr}. Taux competitifs, simulation gratuite et accompagnement personnalise avec Wafir.ma.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://wafir.ma/${locale}/${categorySlug}/${citySlug}`,
      languages: {
        fr: `/fr/${categorySlug}/${citySlug}`,
        ar: `/ar/${categorySlug}/${citySlug}`,
        en: `/en/${categorySlug}/${citySlug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Wafir.ma",
      url: `https://wafir.ma/${locale}/${categorySlug}/${citySlug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function CategoryCityPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { categorySlug, citySlug } = await params;

  const city = findCity(citySlug);
  const category = findCategory(categorySlug);

  if (!city || !category) {
    notFound();
  }

  const rateKey = getRateKey(category.slug);
  const rate = rateKey ? INDICATIVE_RATES[rateKey] : null;
  const institutions = getInstitutions(category);
  const faqItems = buildFaqItems(city, category);
  const otherCities = CITIES.filter((c) => c.slug !== city.slug);
  const profCount = getProfessionalCount(city);

  const isCredit =
    category.group === "CREDIT" || category.group === "FINANCE_PARTICIPATIVE";

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Breadcrumbs                                                        */}
      {/* ------------------------------------------------------------------ */}
      <nav
        aria-label="Fil d'Ariane"
        className="container mx-auto px-4 pt-4 pb-0"
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li>
            <Link
              href={`/${category.slug}`}
              className="hover:text-primary transition-colors"
            >
              {category.nameFr}
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3.5 w-3.5" />
          </li>
          <li className="text-foreground font-medium">{city.nameFr}</li>
        </ol>
      </nav>

      {/* ------------------------------------------------------------------ */}
      {/* Hero Section                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary border-primary/20"
            >
              <MapPin className="me-1 h-3.5 w-3.5" />
              {city.nameFr} - {city.region}
            </Badge>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-5 leading-tight">
              {category.nameFr} a {city.nameFr}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              {getCitySubtitle(city, category)}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href={`/${category.slug}`}>
                  <TrendingDown className="me-2 h-5 w-5" />
                  Comparer les offres
                </Link>
              </Button>
              {isCredit && (
                <Button size="lg" variant="outline" asChild>
                  <Link
                    href={
                      category.slug === "credit-immobilier"
                        ? "/outils/simulateur-credit-immobilier"
                        : category.slug === "credit-consommation"
                          ? "/outils/simulateur-credit-consommation"
                          : category.slug === "mourabaha"
                            ? "/outils/simulateur-mourabaha"
                            : category.slug === "rachat-credit"
                              ? "/outils/simulateur-rachat-credit"
                              : "/outils"
                    }
                  >
                    Simuler
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* City Stats Section                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="container mx-auto px-4 -mt-6 relative z-10 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {/* Region */}
          <Card className="border-primary/10 shadow-sm">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Region</p>
                <p className="font-semibold text-foreground text-sm">
                  {city.region}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Taux moyen */}
          <Card className="border-primary/10 shadow-sm">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                <TrendingDown className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {rate ? "Taux moyen" : "Type"}
                </p>
                <p className="font-semibold text-foreground text-sm">
                  {rate ? `${rate.avg}%` : category.group === "ASSURANCE" ? "Assurance" : "Credit"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Professionnels */}
          <Card className="border-primary/10 shadow-sm">
            <CardContent className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Professionnels disponibles
                </p>
                <p className="font-semibold text-foreground text-sm">
                  {profCount}+
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Available Institutions                                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-3">
            <Landmark className="me-1 h-3.5 w-3.5" />
            {institutions.label}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {isCredit
              ? `Banques proposant le ${category.nameFr.toLowerCase()} a ${city.nameFr}`
              : `Assureurs proposant l'${category.nameFr.toLowerCase()} a ${city.nameFr}`}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Decouvrez les etablissements agrees proposant{" "}
            {isCredit ? "des offres de" : "des contrats d'"}{" "}
            {category.nameFr.toLowerCase()} dans la region {city.region}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {institutions.items.map((inst) => (
            <Card
              key={inst.slug}
              className="group hover:shadow-md transition-all duration-200 hover:border-primary/30"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  {/* Logo placeholder */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground shrink-0">
                    {category.group === "ASSURANCE" ? (
                      <Shield className="h-6 w-6" />
                    ) : (
                      <Building2 className="h-6 w-6" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                      {inst.nameFr}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize">
                      {inst.type === "banque"
                        ? "Banque conventionnelle"
                        : inst.type === "banque_participative"
                          ? "Banque participative"
                          : inst.type === "financement"
                            ? "Societe de financement"
                            : "Compagnie d'assurance"}
                    </p>
                  </div>
                </div>
                {inst.website && (
                  <a
                    href={inst.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Visiter le site
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ Section                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-muted/30 py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-3">
                <FileText className="me-1 h-3.5 w-3.5" />
                Questions frequentes
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {category.nameFr} a {city.nameFr} : FAQ
              </h2>
            </div>

            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((faq, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`faq-${idx}`}
                    >
                      <AccordionTrigger className="text-left text-base font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Other Cities Section                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="container mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {category.nameFr} dans d&apos;autres villes
          </h2>
          <p className="text-muted-foreground">
            Comparez egalement les offres de {category.nameFr.toLowerCase()} dans
            ces villes du Maroc.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {otherCities.map((otherCity) => (
            <Link
              key={otherCity.slug}
              href={`/${category.slug}/${otherCity.slug}`}
            >
              <Card className="group hover:shadow-md transition-all duration-200 hover:border-primary/30 cursor-pointer">
                <CardContent className="p-4 text-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mx-auto mb-1 group-hover:text-primary transition-colors" />
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {otherCity.nameFr}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA Section                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 border-primary/20 overflow-hidden">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pret a comparer les offres de {category.nameFr.toLowerCase()} a{" "}
              {city.nameFr} ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Remplissez notre formulaire en 2 minutes et recevez les meilleures
              offres personnalisees. 100% gratuit, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href={`/${category.slug}`}>
                  <TrendingDown className="me-2 h-5 w-5" />
                  Comparer maintenant
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/outils">
                  Decouvrir nos outils
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* JSON-LD Structured Data                                            */}
      {/* ------------------------------------------------------------------ */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: "https://wafir.ma",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: category.nameFr,
                item: `https://wafir.ma/${category.slug}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: `${category.nameFr} a ${city.nameFr}`,
                item: `https://wafir.ma/${category.slug}/${city.slug}`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
