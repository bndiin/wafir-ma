import { Building2, Users, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProCard } from "@/components/annuaire/pro-card";
import { ProFilters } from "@/components/annuaire/pro-filters";
import type { ProCardData } from "@/components/annuaire/pro-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title: "Annuaire des Professionnels du Credit et Assurance au Maroc — Wafir.ma",
    description:
      "Trouvez et comparez les meilleurs banques, courtiers et agents d'assurance au Maroc. Avis clients, devis gratuits, comparaison des offres.",
    alternates: {
      canonical: `https://wafir.ma/${locale}/annuaire`,
      languages: {
        fr: "/fr/annuaire",
        ar: "/ar/annuaire",
        en: "/en/annuaire",
      },
    },
    openGraph: {
      title: "Annuaire des Professionnels — Wafir.ma",
      description:
        "Trouvez les meilleurs professionnels du credit et de l'assurance au Maroc.",
      type: "website",
      siteName: "Wafir.ma",
    },
  };
}

// Sample pro data
const SAMPLE_PROS: ProCardData[] = [
  {
    slug: "attijariwafa-bank-casablanca-centre",
    name: "Attijariwafa Bank - Agence Casablanca Centre",
    type: "Banque",
    specialties: ["Credit Immobilier", "Credit Consommation", "Credit Auto"],
    city: "Casablanca",
    rating: 4.5,
    reviewCount: 127,
    responseTime: "Repond en 2h",
    tier: "PREMIUM",
    avatarInitials: "AW",
    phone: "+212522000001",
  },
  {
    slug: "cabinet-assurance-el-amrani",
    name: "Cabinet Assurance El Amrani",
    type: "Courtier",
    specialties: ["Assurance Auto", "Assurance Habitation", "Mutuelle Sante"],
    city: "Rabat",
    rating: 4.8,
    reviewCount: 89,
    responseTime: "Repond en 1h",
    tier: "PRO",
    avatarInitials: "EA",
    phone: "+212537000001",
  },
  {
    slug: "bmce-bank-of-africa-marrakech",
    name: "BMCE Bank of Africa - Agence Marrakech",
    type: "Banque",
    specialties: ["Credit Immobilier", "Mourabaha"],
    city: "Marrakech",
    rating: 4.2,
    reviewCount: 64,
    responseTime: "Repond en 4h",
    tier: "GRATUIT",
    avatarInitials: "BO",
    phone: "+212524000001",
  },
  {
    slug: "wafa-assurance-tanger",
    name: "Wafa Assurance - Direction Regionale Tanger",
    type: "Assurance",
    specialties: ["Assurance Auto", "Assurance Vie", "Assurance Voyage"],
    city: "Tanger",
    rating: 4.6,
    reviewCount: 103,
    responseTime: "Repond en 2h",
    tier: "PRO",
    avatarInitials: "WA",
    phone: "+212539000001",
  },
  {
    slug: "banque-populaire-fes",
    name: "Banque Populaire - Agence Fes Medina",
    type: "Banque",
    specialties: ["Credit Immobilier", "Credit Consommation", "Mourabaha"],
    city: "Fes",
    rating: 4.3,
    reviewCount: 78,
    responseTime: "Repond en 3h",
    tier: "PREMIUM",
    avatarInitials: "BP",
    phone: "+212535000001",
  },
  {
    slug: "rma-assurance-casablanca",
    name: "RMA Assurance - Casablanca",
    type: "Assurance",
    specialties: ["Assurance Auto", "Mutuelle Sante", "Assurance Habitation"],
    city: "Casablanca",
    rating: 4.4,
    reviewCount: 95,
    responseTime: "Repond en 2h",
    tier: "PRO",
    avatarInitials: "RM",
    phone: "+212522000002",
  },
  {
    slug: "courtier-finance-plus-agadir",
    name: "Courtier Finance Plus",
    type: "Courtier",
    specialties: ["Rachat de Credit", "Credit Immobilier", "Credit Auto"],
    city: "Agadir",
    rating: 4.7,
    reviewCount: 56,
    responseTime: "Repond en 30min",
    tier: "PRO",
    avatarInitials: "FP",
    phone: "+212528000001",
  },
  {
    slug: "societe-generale-meknes",
    name: "Societe Generale Maroc - Agence Meknes",
    type: "Banque",
    specialties: ["Credit Consommation", "Credit Auto"],
    city: "Meknes",
    rating: 4.1,
    reviewCount: 42,
    responseTime: "Repond en 4h",
    tier: "GRATUIT",
    avatarInitials: "SG",
    phone: "+212535000002",
  },
  {
    slug: "axa-assurance-rabat",
    name: "AXA Assurance Maroc - Rabat",
    type: "Assurance",
    specialties: ["Assurance Auto", "Assurance Vie", "Mutuelle Sante"],
    city: "Rabat",
    rating: 4.5,
    reviewCount: 112,
    responseTime: "Repond en 1h",
    tier: "PREMIUM",
    avatarInitials: "AX",
    phone: "+212537000002",
  },
  {
    slug: "cih-bank-kenitra",
    name: "CIH Bank - Agence Kenitra",
    type: "Banque",
    specialties: ["Credit Immobilier", "Mourabaha", "Credit Consommation"],
    city: "Kenitra",
    rating: 4.0,
    reviewCount: 38,
    responseTime: "Repond en 3h",
    tier: "GRATUIT",
    avatarInitials: "CH",
    phone: "+212537000003",
  },
  {
    slug: "cabinet-conseil-assurance-oujda",
    name: "Cabinet Conseil Assurance Oujda",
    type: "Courtier",
    specialties: ["Assurance Auto", "Assurance Habitation"],
    city: "Oujda",
    rating: 4.6,
    reviewCount: 34,
    responseTime: "Repond en 1h",
    tier: "PRO",
    avatarInitials: "CO",
    phone: "+212536000001",
  },
  {
    slug: "bank-assafa-casablanca",
    name: "Bank Assafa - Finance Participative",
    type: "Banque Participative",
    specialties: ["Mourabaha", "Credit Immobilier"],
    city: "Casablanca",
    rating: 4.4,
    reviewCount: 67,
    responseTime: "Repond en 2h",
    tier: "PRO",
    avatarInitials: "BA",
    phone: "+212522000003",
  },
];

export default function AnnuairePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary border-primary/20"
            >
              +40 etablissements verifies
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              Annuaire des Professionnels
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Trouvez et comparez les meilleurs banques, courtiers et agents
              d&apos;assurance au Maroc. Consultez les avis clients et demandez
              un devis gratuit.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-primary" />
                +40 banques & assureurs
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary" />
                +500 avis clients
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                12 villes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Listing */}
      <section className="container mx-auto px-4 py-10">
        {/* Filters */}
        <div className="mb-8">
          <ProFilters />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{SAMPLE_PROS.length}</span>{" "}
            professionnels trouves
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAMPLE_PROS.map((pro) => (
            <ProCard key={pro.slug} pro={pro} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-10 text-center">
          <button className="inline-flex items-center justify-center gap-2 rounded-md border bg-background px-8 py-3 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
            Voir plus de professionnels
          </button>
        </div>
      </section>

      {/* SEO Content */}
      <section className="bg-[var(--surface)] py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl prose prose-sm text-muted-foreground">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Trouvez le meilleur professionnel pour votre credit ou assurance
            </h2>
            <p>
              L&apos;annuaire Wafir.ma regroupe les meilleurs professionnels du
              credit et de l&apos;assurance au Maroc. Banques, courtiers, agents
              d&apos;assurance : comparez les offres, consultez les avis
              clients et demandez un devis gratuit en quelques clics.
            </p>
            <p>
              Que vous cherchiez un credit immobilier, un credit consommation,
              une assurance auto ou une mutuelle sante, notre annuaire vous
              permet de trouver le professionnel adapte a vos besoins dans
              votre ville : Casablanca, Rabat, Marrakech, Tanger, Fes, Agadir
              et plus encore.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
