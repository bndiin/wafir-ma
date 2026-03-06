import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Star,
  Clock,
  ChevronRight,
  Globe,
  Calendar,
  BadgeCheck,
  ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QuoteForm } from "@/components/annuaire/quote-form";
import { StarRating, TierBadge } from "@/components/annuaire/pro-card";
import type { ProTier } from "@/components/annuaire/pro-card";

// ─── Sample Pro Data ───────────────────────────────────────────────────────────

interface ProProfile {
  slug: string;
  name: string;
  type: string;
  specialties: string[];
  city: string;
  address: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  tier: ProTier;
  avatarInitials: string;
  phone: string;
  whatsapp: string;
  website: string;
  yearFounded: number;
  description: string;
  services: { name: string; price: string }[];
  gallery: string[];
  reviews: {
    name: string;
    rating: number;
    date: string;
    comment: string;
    initials: string;
  }[];
  lat: number;
  lng: number;
}

const PROS_DATA: Record<string, ProProfile> = {
  "attijariwafa-bank-casablanca-centre": {
    slug: "attijariwafa-bank-casablanca-centre",
    name: "Attijariwafa Bank - Agence Casablanca Centre",
    type: "Banque",
    specialties: ["Credit Immobilier", "Credit Consommation", "Credit Auto", "Mourabaha"],
    city: "Casablanca",
    address: "120, Boulevard Zerktouni, Casablanca 20000",
    rating: 4.5,
    reviewCount: 127,
    responseTime: "Repond en 2h",
    tier: "PREMIUM",
    avatarInitials: "AW",
    phone: "+212522000001",
    whatsapp: "212522000001",
    website: "https://www.attijariwafabank.com",
    yearFounded: 1904,
    description:
      "Attijariwafa Bank est le premier groupe bancaire et financier du Maghreb et de la zone UEMOA. Avec plus de 120 ans d'experience, notre agence du centre de Casablanca vous accompagne dans tous vos projets de credit immobilier, credit consommation et credit auto. Nos conseillers specialises vous proposent les meilleures solutions de financement adaptees a votre profil et a vos besoins.",
    services: [
      { name: "Credit Immobilier", price: "A partir de 3.99%" },
      { name: "Credit Consommation", price: "A partir de 6.5%" },
      { name: "Credit Auto", price: "A partir de 5.5%" },
      { name: "Mourabaha Immobiliere", price: "A partir de 4.5%" },
      { name: "Assurance Emprunteur", price: "Incluse" },
      { name: "Conseil Financier", price: "Gratuit" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Mohammed B.",
        rating: 5,
        date: "il y a 2 semaines",
        comment:
          "Excellente experience pour mon credit immobilier. Le conseiller a ete tres professionnel et le taux obtenu est tres competitif. Je recommande vivement cette agence.",
        initials: "MB",
      },
      {
        name: "Fatima Z.",
        rating: 4,
        date: "il y a 1 mois",
        comment:
          "Bonne agence, personnel accueillant. Le processus de demande de credit etait clair et bien explique. Seul point negatif : le delai de traitement un peu long.",
        initials: "FZ",
      },
      {
        name: "Ahmed K.",
        rating: 5,
        date: "il y a 2 mois",
        comment:
          "J'ai obtenu mon credit auto en moins de 10 jours. Le taux est le meilleur que j'ai trouve sur le marche. Tres satisfait du service.",
        initials: "AK",
      },
      {
        name: "Soumia L.",
        rating: 4,
        date: "il y a 3 mois",
        comment:
          "Bon accompagnement pour la Mourabaha immobiliere. L'equipe est a l'ecoute et les conditions sont transparentes.",
        initials: "SL",
      },
    ],
    lat: 33.5892,
    lng: -7.6034,
  },
  "cabinet-assurance-el-amrani": {
    slug: "cabinet-assurance-el-amrani",
    name: "Cabinet Assurance El Amrani",
    type: "Courtier",
    specialties: ["Assurance Auto", "Assurance Habitation", "Mutuelle Sante"],
    city: "Rabat",
    address: "45, Avenue Mohammed V, Rabat 10000",
    rating: 4.8,
    reviewCount: 89,
    responseTime: "Repond en 1h",
    tier: "PRO",
    avatarInitials: "EA",
    phone: "+212537000001",
    whatsapp: "212537000001",
    website: "",
    yearFounded: 2010,
    description:
      "Le Cabinet Assurance El Amrani est un courtier independant specialise dans les assurances auto, habitation et sante. Nous comparons les offres de tous les assureurs du marche pour vous proposer les meilleurs tarifs et garanties. Notre equipe de courtiers certifies vous accompagne dans le choix de votre contrat d'assurance et dans la gestion de vos sinistres.",
    services: [
      { name: "Assurance Auto Tous Risques", price: "A partir de 3 500 MAD/an" },
      { name: "Assurance Auto Tiers", price: "A partir de 1 800 MAD/an" },
      { name: "Assurance Habitation", price: "A partir de 1 200 MAD/an" },
      { name: "Mutuelle Sante", price: "A partir de 250 MAD/mois" },
      { name: "Gestion de Sinistres", price: "Gratuit" },
      { name: "Conseil en Assurance", price: "Gratuit" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Youssef M.",
        rating: 5,
        date: "il y a 1 semaine",
        comment:
          "Meilleur courtier de Rabat ! M. El Amrani m'a fait economiser plus de 2 000 MAD sur mon assurance auto. Service rapide et professionnel.",
        initials: "YM",
      },
      {
        name: "Nadia H.",
        rating: 5,
        date: "il y a 3 semaines",
        comment:
          "Tres bon accompagnement pour ma mutuelle sante. Ils comparent vraiment toutes les offres du marche pour trouver la meilleure.",
        initials: "NH",
      },
      {
        name: "Rachid T.",
        rating: 4,
        date: "il y a 1 mois",
        comment:
          "Service de qualite pour mon assurance habitation. Le suivi apres souscription est egalement tres bien fait.",
        initials: "RT",
      },
    ],
    lat: 34.0209,
    lng: -6.8416,
  },
};

// ─── Generate Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; proSlug: string }>;
}): Promise<Metadata> {
  const { locale, proSlug } = await params;
  const pro = PROS_DATA[proSlug];

  if (!pro) {
    return { title: "Professionnel introuvable — Wafir.ma" };
  }

  return {
    title: `${pro.name} — Avis, Services & Devis | Wafir.ma`,
    description: `${pro.name} a ${pro.city}. ${pro.type} specialise en ${pro.specialties.slice(0, 3).join(", ")}. Note : ${pro.rating}/5 (${pro.reviewCount} avis). Demandez un devis gratuit.`,
    alternates: {
      canonical: `https://wafir.ma/${locale}/annuaire/${pro.slug}`,
      languages: {
        fr: `/fr/annuaire/${pro.slug}`,
        ar: `/ar/annuaire/${pro.slug}`,
        en: `/en/annuaire/${pro.slug}`,
      },
    },
    openGraph: {
      title: `${pro.name} — Wafir.ma`,
      description: `${pro.type} a ${pro.city}. Note ${pro.rating}/5. Demandez un devis gratuit.`,
      type: "website",
      siteName: "Wafir.ma",
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: pro.name,
        description: pro.description,
        address: {
          "@type": "PostalAddress",
          streetAddress: pro.address,
          addressLocality: pro.city,
          addressCountry: "MA",
        },
        telephone: pro.phone,
        url: pro.website || `https://wafir.ma/annuaire/${pro.slug}`,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: pro.rating,
          reviewCount: pro.reviewCount,
          bestRating: 5,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: pro.lat,
          longitude: pro.lng,
        },
      }),
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────────

export default async function ProProfilePage({
  params,
}: {
  params: Promise<{ locale: string; proSlug: string }>;
}) {
  const { proSlug } = await params;
  const pro = PROS_DATA[proSlug];

  if (!pro) {
    notFound();
  }

  const isPremium = pro.tier === "PREMIUM";

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[var(--surface)] border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Accueil
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/annuaire"
              className="hover:text-primary transition-colors"
            >
              Annuaire
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium truncate">
              {pro.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <Card
              className={
                isPremium
                  ? "border-amber-500/40 shadow-amber-500/10"
                  : undefined
              }
            >
              {isPremium && (
                <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-t-xl" />
              )}
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  {/* Avatar */}
                  <div
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold ${
                      isPremium
                        ? "bg-amber-500/10 text-amber-600"
                        : pro.tier === "PRO"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-primary/10 text-primary"
                    }`}
                  >
                    {pro.avatarInitials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-foreground">
                        {pro.name}
                      </h1>
                      {(pro.tier === "PRO" || pro.tier === "PREMIUM") && (
                        <BadgeCheck className="h-5 w-5 text-blue-500 shrink-0" />
                      )}
                    </div>

                    {/* Type & Tier */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="secondary">{pro.type}</Badge>
                      <TierBadge tier={pro.tier} />
                    </div>

                    {/* Rating */}
                    <div className="flex flex-wrap items-center gap-4 mb-3">
                      <StarRating rating={pro.rating} size="md" />
                      <span className="text-sm text-muted-foreground">
                        ({pro.reviewCount} avis)
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4" />
                        {pro.address}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {pro.responseTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        Depuis {pro.yearFounded}
                      </span>
                      {pro.website && (
                        <a
                          href={pro.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-primary hover:underline"
                        >
                          <Globe className="h-4 w-4" />
                          Site web
                        </a>
                      )}
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {pro.specialties.map((spec) => (
                        <Badge
                          key={spec}
                          variant="outline"
                          className="font-normal"
                        >
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Galerie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] rounded-lg bg-muted flex items-center justify-center"
                    >
                      <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">A propos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {pro.description}
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Services & Tarifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {pro.services.map((service, index) => (
                    <div key={service.name}>
                      <div className="flex items-center justify-between py-3">
                        <span className="text-foreground font-medium">
                          {service.name}
                        </span>
                        <span className="text-sm text-primary font-semibold">
                          {service.price}
                        </span>
                      </div>
                      {index < pro.services.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Avis clients ({pro.reviewCount})
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <StarRating rating={pro.rating} size="sm" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pro.reviews.map((review, index) => (
                    <div key={index}>
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                          {review.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground text-sm">
                              {review.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                          <div className="mb-2">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3.5 w-3.5 ${
                                    star <= review.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-muted text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                      {index < pro.reviews.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" size="sm">
                    Voir tous les avis
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Localisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[16/9] rounded-lg bg-muted flex items-center justify-center border border-dashed border-border">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground font-medium">
                      Carte
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {pro.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <QuoteForm
              proName={pro.name}
              proPhone={pro.phone}
              proWhatsApp={pro.whatsapp}
            />
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: pro.name,
            description: pro.description,
            address: {
              "@type": "PostalAddress",
              streetAddress: pro.address,
              addressLocality: pro.city,
              addressCountry: "MA",
            },
            telephone: pro.phone,
            url:
              pro.website ||
              `https://wafir.ma/annuaire/${pro.slug}`,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: pro.rating,
              reviewCount: pro.reviewCount,
              bestRating: 5,
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: pro.lat,
              longitude: pro.lng,
            },
          }),
        }}
      />
    </>
  );
}
