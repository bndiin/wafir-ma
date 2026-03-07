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
  "bmce-bank-of-africa-marrakech": {
    slug: "bmce-bank-of-africa-marrakech",
    name: "BMCE Bank of Africa - Agence Marrakech",
    type: "Banque",
    specialties: ["Credit Immobilier", "Mourabaha", "Credit Consommation"],
    city: "Marrakech",
    address: "Avenue Mohammed V, Gueliz, Marrakech 40000",
    rating: 4.2,
    reviewCount: 64,
    responseTime: "Repond en 4h",
    tier: "GRATUIT",
    avatarInitials: "BO",
    phone: "+212524000001",
    whatsapp: "212524000001",
    website: "https://www.bankofafrica.ma",
    yearFounded: 1959,
    description:
      "Bank of Africa (ex BMCE) est un groupe bancaire panafricain present dans plus de 30 pays. Notre agence de Marrakech Gueliz propose des solutions de financement immobilier et participatif adaptees aux besoins des particuliers et professionnels de la region.",
    services: [
      { name: "Credit Immobilier", price: "A partir de 4.25%" },
      { name: "Mourabaha Immobiliere", price: "A partir de 4.8%" },
      { name: "Credit Consommation", price: "A partir de 7%" },
      { name: "Compte Cheque", price: "Gratuit" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Hassan R.",
        rating: 4,
        date: "il y a 2 semaines",
        comment: "Bon accueil et processus clair pour mon credit immobilier. Le taux est correct pour la region.",
        initials: "HR",
      },
      {
        name: "Amina K.",
        rating: 5,
        date: "il y a 1 mois",
        comment: "Equipe tres professionnelle. La Mourabaha a ete bien expliquee et les conditions sont transparentes.",
        initials: "AK",
      },
      {
        name: "Omar B.",
        rating: 4,
        date: "il y a 2 mois",
        comment: "Service correct, delai un peu long mais le resultat final est satisfaisant.",
        initials: "OB",
      },
    ],
    lat: 31.6295,
    lng: -7.9811,
  },
  "wafa-assurance-tanger": {
    slug: "wafa-assurance-tanger",
    name: "Wafa Assurance - Direction Regionale Tanger",
    type: "Assurance",
    specialties: ["Assurance Auto", "Assurance Vie", "Assurance Voyage", "Assurance Habitation"],
    city: "Tanger",
    address: "12, Boulevard Pasteur, Tanger 90000",
    rating: 4.6,
    reviewCount: 103,
    responseTime: "Repond en 2h",
    tier: "PRO",
    avatarInitials: "WA",
    phone: "+212539000001",
    whatsapp: "212539000001",
    website: "https://www.wafaassurance.ma",
    yearFounded: 1972,
    description:
      "Wafa Assurance, filiale du groupe Attijariwafa Bank, est le leader de l'assurance au Maroc. Notre direction regionale de Tanger couvre le nord du royaume avec une gamme complete de produits d'assurance auto, vie, voyage et habitation.",
    services: [
      { name: "Assurance Auto Tous Risques", price: "A partir de 3 200 MAD/an" },
      { name: "Assurance Auto Tiers", price: "A partir de 1 600 MAD/an" },
      { name: "Assurance Vie", price: "A partir de 200 MAD/mois" },
      { name: "Assurance Voyage", price: "A partir de 250 MAD/voyage" },
      { name: "Assurance Habitation", price: "A partir de 1 000 MAD/an" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Samir D.",
        rating: 5,
        date: "il y a 1 semaine",
        comment: "Gestion de sinistre tres rapide. Mon dossier a ete traite en 48h. Excellent service client.",
        initials: "SD",
      },
      {
        name: "Kenza M.",
        rating: 4,
        date: "il y a 3 semaines",
        comment: "Bonne assurance auto avec un tarif competitif. Le conseiller a ete patient et a bien explique les garanties.",
        initials: "KM",
      },
      {
        name: "Mehdi L.",
        rating: 5,
        date: "il y a 1 mois",
        comment: "Je recommande l'assurance voyage. Couverture complete et prix raisonnable pour mes deplacements en Europe.",
        initials: "ML",
      },
    ],
    lat: 35.7595,
    lng: -5.8340,
  },
  "banque-populaire-fes": {
    slug: "banque-populaire-fes",
    name: "Banque Populaire - Agence Fes Medina",
    type: "Banque",
    specialties: ["Credit Immobilier", "Credit Consommation", "Mourabaha", "Credit Auto"],
    city: "Fes",
    address: "Place de la Resistance, Ville Nouvelle, Fes 30000",
    rating: 4.3,
    reviewCount: 78,
    responseTime: "Repond en 3h",
    tier: "PREMIUM",
    avatarInitials: "BP",
    phone: "+212535000001",
    whatsapp: "212535000001",
    website: "https://www.gbp.ma",
    yearFounded: 1961,
    description:
      "Le Groupe Banque Populaire est le premier reseau bancaire du Maroc avec plus de 1 600 agences. Notre agence de Fes Medina accompagne les particuliers et professionnels de la region dans leurs projets de financement immobilier, consommation et participatif.",
    services: [
      { name: "Credit Immobilier Classique", price: "A partir de 4.10%" },
      { name: "Mourabaha Immobiliere", price: "A partir de 4.6%" },
      { name: "Credit Consommation", price: "A partir de 6.8%" },
      { name: "Credit Auto", price: "A partir de 5.8%" },
      { name: "Epargne Logement", price: "Taux preferentiel" },
      { name: "Conseil en Investissement", price: "Gratuit" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Khalid N.",
        rating: 5,
        date: "il y a 1 semaine",
        comment: "Excellent service ! J'ai obtenu mon credit immobilier avec un taux tres competitif. L'equipe est reactive et professionnelle.",
        initials: "KN",
      },
      {
        name: "Laila E.",
        rating: 4,
        date: "il y a 2 semaines",
        comment: "Bonne experience pour la Mourabaha. Les conditions sont claires et conformes a la charia.",
        initials: "LE",
      },
      {
        name: "Driss A.",
        rating: 4,
        date: "il y a 1 mois",
        comment: "Agence bien situee et personnel competent. Le credit consommation a ete traite rapidement.",
        initials: "DA",
      },
    ],
    lat: 34.0331,
    lng: -5.0003,
  },
  "rma-assurance-casablanca": {
    slug: "rma-assurance-casablanca",
    name: "RMA Assurance - Casablanca",
    type: "Assurance",
    specialties: ["Assurance Auto", "Mutuelle Sante", "Assurance Habitation", "Assurance Vie"],
    city: "Casablanca",
    address: "83, Avenue de l'Armee Royale, Casablanca 20000",
    rating: 4.4,
    reviewCount: 95,
    responseTime: "Repond en 2h",
    tier: "PRO",
    avatarInitials: "RM",
    phone: "+212522000002",
    whatsapp: "212522000002",
    website: "https://www.rmaassurance.com",
    yearFounded: 1949,
    description:
      "RMA est l'un des leaders de l'assurance au Maroc, filiale du groupe FinanceCom. Nous proposons des solutions completes en assurance auto, sante, habitation et vie. Notre equipe d'experts vous accompagne pour trouver la couverture ideale a un tarif competitif.",
    services: [
      { name: "Assurance Auto Tous Risques", price: "A partir de 3 400 MAD/an" },
      { name: "Mutuelle Sante Individuelle", price: "A partir de 280 MAD/mois" },
      { name: "Mutuelle Sante Famille", price: "A partir de 500 MAD/mois" },
      { name: "Assurance Habitation", price: "A partir de 1 100 MAD/an" },
      { name: "Assurance Vie Epargne", price: "A partir de 300 MAD/mois" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Nawal S.",
        rating: 5,
        date: "il y a 1 semaine",
        comment: "Tres satisfaite de ma mutuelle sante RMA. Les remboursements sont rapides et les couvertures completes.",
        initials: "NS",
      },
      {
        name: "Amine R.",
        rating: 4,
        date: "il y a 3 semaines",
        comment: "Bonne assurance auto, tarif competitif. Le service sinistres est efficace.",
        initials: "AR",
      },
      {
        name: "Salma H.",
        rating: 4,
        date: "il y a 2 mois",
        comment: "L'assurance habitation est correcte. Bon rapport qualite-prix pour la couverture proposee.",
        initials: "SH",
      },
    ],
    lat: 33.5950,
    lng: -7.6187,
  },
  "courtier-finance-plus-agadir": {
    slug: "courtier-finance-plus-agadir",
    name: "Courtier Finance Plus",
    type: "Courtier",
    specialties: ["Rachat de Credit", "Credit Immobilier", "Credit Auto", "Credit Consommation"],
    city: "Agadir",
    address: "25, Avenue Hassan II, Agadir 80000",
    rating: 4.7,
    reviewCount: 56,
    responseTime: "Repond en 30min",
    tier: "PRO",
    avatarInitials: "FP",
    phone: "+212528000001",
    whatsapp: "212528000001",
    website: "",
    yearFounded: 2015,
    description:
      "Finance Plus est un cabinet de courtage independant specialise dans la negociation de credits et le rachat de credits au Maroc. Bases a Agadir, nous comparons les offres de toutes les banques pour obtenir les meilleurs taux pour nos clients. Specialistes du rachat de credit, nous aidons les menages a reduire leurs mensualites.",
    services: [
      { name: "Rachat de Credit", price: "Honoraires 1% du montant" },
      { name: "Courtage Credit Immobilier", price: "Gratuit (commission banque)" },
      { name: "Courtage Credit Auto", price: "Gratuit (commission banque)" },
      { name: "Etude de Dossier", price: "Gratuit" },
      { name: "Negociation de Taux", price: "Gratuit" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Yassine B.",
        rating: 5,
        date: "il y a 1 semaine",
        comment: "Grace a Finance Plus, j'ai obtenu un taux de 4.1% pour mon credit immo au lieu de 4.8% propose par ma banque. Excellent travail !",
        initials: "YB",
      },
      {
        name: "Mounia T.",
        rating: 5,
        date: "il y a 2 semaines",
        comment: "Le rachat de credit m'a permis de passer de 4 500 MAD a 2 800 MAD de mensualites. Je recommande vivement !",
        initials: "MT",
      },
      {
        name: "Abdel K.",
        rating: 4,
        date: "il y a 1 mois",
        comment: "Tres bon courtier, reactif et transparent. Il m'a bien explique toutes les options disponibles.",
        initials: "AK",
      },
    ],
    lat: 30.4278,
    lng: -9.5981,
  },
  "societe-generale-meknes": {
    slug: "societe-generale-meknes",
    name: "Societe Generale Maroc - Agence Meknes",
    type: "Banque",
    specialties: ["Credit Consommation", "Credit Auto", "Credit Immobilier"],
    city: "Meknes",
    address: "Avenue des FAR, Meknes 50000",
    rating: 4.1,
    reviewCount: 42,
    responseTime: "Repond en 4h",
    tier: "GRATUIT",
    avatarInitials: "SG",
    phone: "+212535000002",
    whatsapp: "212535000002",
    website: "https://www.sgmaroc.com",
    yearFounded: 1962,
    description:
      "Societe Generale Maroc est une banque universelle adossee au groupe Societe Generale. Notre agence de Meknes offre des solutions de financement pour les particuliers et les professionnels, avec des taux competitifs et un accompagnement personnalise.",
    services: [
      { name: "Credit Consommation", price: "A partir de 6.5%" },
      { name: "Credit Auto", price: "A partir de 5.5%" },
      { name: "Credit Immobilier", price: "A partir de 4.15%" },
      { name: "Carte Bancaire Internationale", price: "A partir de 150 MAD/an" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Hamid F.",
        rating: 4,
        date: "il y a 2 semaines",
        comment: "Service correct pour mon credit auto. Le delai etait raisonnable et le taux acceptable.",
        initials: "HF",
      },
      {
        name: "Sanae O.",
        rating: 4,
        date: "il y a 1 mois",
        comment: "Agence propre et bien organisee. Le conseiller etait competent et a l'ecoute.",
        initials: "SO",
      },
      {
        name: "Reda M.",
        rating: 5,
        date: "il y a 2 mois",
        comment: "Tres satisfait de mon credit consommation. Processus simple et rapide.",
        initials: "RM",
      },
    ],
    lat: 33.8935,
    lng: -5.5473,
  },
  "axa-assurance-rabat": {
    slug: "axa-assurance-rabat",
    name: "AXA Assurance Maroc - Rabat",
    type: "Assurance",
    specialties: ["Assurance Auto", "Assurance Vie", "Mutuelle Sante", "Assurance Habitation"],
    city: "Rabat",
    address: "120, Avenue Allal Ben Abdellah, Rabat 10000",
    rating: 4.5,
    reviewCount: 112,
    responseTime: "Repond en 1h",
    tier: "PREMIUM",
    avatarInitials: "AX",
    phone: "+212537000002",
    whatsapp: "212537000002",
    website: "https://www.axa.ma",
    yearFounded: 1990,
    description:
      "AXA Assurance Maroc fait partie du groupe AXA, leader mondial de l'assurance. Notre agence de Rabat propose une gamme complete d'assurances pour les particuliers et les entreprises. Assurance auto, vie, sante et habitation avec des garanties etendues et un service client premium.",
    services: [
      { name: "Assurance Auto Tous Risques Premium", price: "A partir de 3 800 MAD/an" },
      { name: "Assurance Auto Tiers Etendu", price: "A partir de 2 200 MAD/an" },
      { name: "AXA Sante+", price: "A partir de 350 MAD/mois" },
      { name: "Assurance Vie Epargne", price: "A partir de 500 MAD/mois" },
      { name: "Assurance Habitation Premium", price: "A partir de 1 500 MAD/an" },
      { name: "Assistance 24/7", price: "Incluse" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Zineb A.",
        rating: 5,
        date: "il y a 1 semaine",
        comment: "Meilleure assurance sante que j'ai eue. Remboursements rapides et couverture tres complete. Le service client est au top.",
        initials: "ZA",
      },
      {
        name: "Karim S.",
        rating: 5,
        date: "il y a 2 semaines",
        comment: "L'assurance auto premium vaut le coup. Apres un accident, tout a ete gere en 3 jours. Impressionnant !",
        initials: "KS",
      },
      {
        name: "Imane B.",
        rating: 4,
        date: "il y a 1 mois",
        comment: "Bonne assurance habitation. Le tarif est un peu eleve mais les garanties sont excellentes.",
        initials: "IB",
      },
      {
        name: "Taha N.",
        rating: 4,
        date: "il y a 2 mois",
        comment: "Service professionnel et equipe reactive. Je recommande AXA pour l'assurance vie.",
        initials: "TN",
      },
    ],
    lat: 34.0132,
    lng: -6.8326,
  },
  "cih-bank-kenitra": {
    slug: "cih-bank-kenitra",
    name: "CIH Bank - Agence Kenitra",
    type: "Banque",
    specialties: ["Credit Immobilier", "Mourabaha", "Credit Consommation"],
    city: "Kenitra",
    address: "Avenue Mohammed V, Kenitra 14000",
    rating: 4.0,
    reviewCount: 38,
    responseTime: "Repond en 3h",
    tier: "GRATUIT",
    avatarInitials: "CH",
    phone: "+212537000003",
    whatsapp: "212537000003",
    website: "https://www.cihbank.ma",
    yearFounded: 1920,
    description:
      "CIH Bank, historiquement specialisee dans le financement immobilier, est devenue une banque universelle au service des particuliers et des professionnels. Notre agence de Kenitra propose des solutions de credit immobilier et participatif avec des conditions avantageuses.",
    services: [
      { name: "Credit Immobilier", price: "A partir de 4.05%" },
      { name: "Mourabaha Immobiliere", price: "A partir de 4.7%" },
      { name: "Credit Consommation", price: "A partir de 7.2%" },
      { name: "Ouverture de Compte", price: "Gratuit" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Mostafa G.",
        rating: 4,
        date: "il y a 2 semaines",
        comment: "Specialiste du credit immobilier. Les conditions sont claires et le taux est correct.",
        initials: "MG",
      },
      {
        name: "Houda Z.",
        rating: 4,
        date: "il y a 1 mois",
        comment: "Bonne agence pour la Mourabaha. L'equipe est competente et les conditions transparentes.",
        initials: "HZ",
      },
      {
        name: "Adil R.",
        rating: 5,
        date: "il y a 2 mois",
        comment: "Tres content de mon credit immobilier CIH. Le processus etait fluide et le conseiller tres helpful.",
        initials: "AR",
      },
    ],
    lat: 34.2610,
    lng: -6.5802,
  },
  "bank-assafa-casablanca": {
    slug: "bank-assafa-casablanca",
    name: "Bank Assafa - Finance Participative",
    type: "Banque Participative",
    specialties: ["Mourabaha", "Credit Immobilier", "Ijara", "Moucharaka"],
    city: "Casablanca",
    address: "Angle Bd Zerktouni et Rue Karatchi, Casablanca 20000",
    rating: 4.4,
    reviewCount: 67,
    responseTime: "Repond en 2h",
    tier: "PRO",
    avatarInitials: "BA",
    phone: "+212522000003",
    whatsapp: "212522000003",
    website: "https://www.bankassafa.ma",
    yearFounded: 2017,
    description:
      "Bank Assafa est la premiere banque participative au Maroc, filiale du groupe Attijariwafa Bank. Nous proposons des solutions de financement conformes a la charia : Mourabaha immobiliere, Ijara, Moucharaka. Notre equipe de conseillers specialises vous accompagne dans vos projets de financement participatif.",
    services: [
      { name: "Mourabaha Immobiliere", price: "A partir de 4.5%" },
      { name: "Mourabaha Auto", price: "A partir de 5.2%" },
      { name: "Ijara Mountahia Bittamlik", price: "Sur devis" },
      { name: "Moucharaka Moutanakissa", price: "Sur devis" },
      { name: "Compte Courant Participatif", price: "Gratuit" },
      { name: "Conseil Finance Participative", price: "Gratuit" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Anas M.",
        rating: 5,
        date: "il y a 1 semaine",
        comment: "Enfin une banque qui propose du vrai financement participatif ! La Mourabaha est bien structuree et conforme.",
        initials: "AM",
      },
      {
        name: "Sara B.",
        rating: 4,
        date: "il y a 2 semaines",
        comment: "Bonne experience pour mon financement immobilier participatif. L'equipe est competente en finance islamique.",
        initials: "SB",
      },
      {
        name: "Rachid K.",
        rating: 5,
        date: "il y a 1 mois",
        comment: "Service excellent et conforme aux principes de la charia. Les conseillers maitrisent parfaitement les produits participatifs.",
        initials: "RK",
      },
    ],
    lat: 33.5912,
    lng: -7.6186,
  },
  "cabinet-conseil-assurance-oujda": {
    slug: "cabinet-conseil-assurance-oujda",
    name: "Cabinet Conseil Assurance Oujda",
    type: "Courtier",
    specialties: ["Assurance Auto", "Assurance Habitation", "Mutuelle Sante", "Assurance Voyage"],
    city: "Oujda",
    address: "15, Rue de Marrakech, Oujda 60000",
    rating: 4.6,
    reviewCount: 34,
    responseTime: "Repond en 1h",
    tier: "PRO",
    avatarInitials: "CO",
    phone: "+212536000001",
    whatsapp: "212536000001",
    website: "",
    yearFounded: 2012,
    description:
      "Le Cabinet Conseil Assurance Oujda est un courtier independant couvrant la region de l'Oriental. Nous comparons les offres de tous les assureurs du marche marocain pour proposer a nos clients les meilleures garanties au meilleur prix. Specialises en assurance auto et habitation.",
    services: [
      { name: "Assurance Auto Tous Risques", price: "A partir de 3 000 MAD/an" },
      { name: "Assurance Auto Tiers", price: "A partir de 1 500 MAD/an" },
      { name: "Assurance Habitation", price: "A partir de 900 MAD/an" },
      { name: "Mutuelle Sante", price: "A partir de 220 MAD/mois" },
      { name: "Assurance Voyage", price: "A partir de 200 MAD/voyage" },
    ],
    gallery: [],
    reviews: [
      {
        name: "Zakaria H.",
        rating: 5,
        date: "il y a 1 semaine",
        comment: "Meilleur courtier d'Oujda ! Il m'a trouve une assurance auto 25% moins chere que mon ancien contrat.",
        initials: "ZH",
      },
      {
        name: "Nora T.",
        rating: 5,
        date: "il y a 3 semaines",
        comment: "Service rapide et professionnel. L'assurance habitation proposee est tres complete a un bon prix.",
        initials: "NT",
      },
      {
        name: "Youssef E.",
        rating: 4,
        date: "il y a 1 mois",
        comment: "Bon suivi et accompagnement. Le courtier compare vraiment toutes les offres du marche.",
        initials: "YE",
      },
    ],
    lat: 34.6814,
    lng: -1.9086,
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
