import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  Home,
  CreditCard,
  Car,
  RefreshCw,
  Moon,
  Calculator,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Users,
  Building2,
  Percent,
  BadgeCheck,
  FileText,
  Banknote,
  Scale,
  Landmark,
  HeartHandshake,
  Zap,
  Search,
  Phone,
  BarChart3,
  CalendarDays,
  Wallet,
  PiggyBank,
  HandCoins,
  CircleDollarSign,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CATEGORIES,
  CONVENTIONAL_BANKS,
  PARTICIPATIVE_BANKS,
  SOCIETES_FINANCEMENT,
  INDICATIVE_RATES,
} from "@/lib/constants";

// ---------------------------------------------------------------------------
// Credit category slugs handled by this page
// ---------------------------------------------------------------------------
const CREDIT_SLUGS = [
  "credit-immobilier",
  "credit-consommation",
  "credit-auto",
  "rachat-credit",
  "mourabaha",
] as const;

type CreditSlug = (typeof CREDIT_SLUGS)[number];

function isCreditSlug(slug: string): slug is CreditSlug {
  return (CREDIT_SLUGS as readonly string[]).includes(slug);
}

// ---------------------------------------------------------------------------
// Per-category static content
// ---------------------------------------------------------------------------

interface CategoryLandingData {
  heroGradient: string;
  heroIcon: typeof Home;
  heroTitle: string;
  heroDescription: string;
  badgeLabel: string;
  stats: { value: string; label: string; icon: typeof Percent }[];
  steps: { icon: typeof Search; title: string; description: string }[];
  features: {
    icon: typeof Shield;
    title: string;
    description: string;
    color: string;
  }[];
  banks: {
    name: string;
    rateRange: string;
    maxDuration: string;
    maxAmount: string;
    type: string;
  }[];
  bankTableTitle: string;
  faq: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
  seoContent: string[];
  simulatorSlug: string;
  simulatorLabel: string;
}

const CATEGORY_DATA: Record<CreditSlug, CategoryLandingData> = {
  // =========================================================================
  // 1. CREDIT IMMOBILIER
  // =========================================================================
  "credit-immobilier": {
    heroGradient: "from-emerald-600 via-emerald-500 to-teal-400",
    heroIcon: Home,
    heroTitle: "Comparez les Credits Immobiliers au Maroc",
    heroDescription:
      "Trouvez le meilleur taux pour votre projet immobilier. Comparez gratuitement les offres de +10 banques marocaines et economisez des milliers de dirhams sur votre pret.",
    badgeLabel: "Taux a partir de 3.5%",
    stats: [
      {
        value: `${INDICATIVE_RATES.creditImmobilier.avg}%`,
        label: "Taux moyen",
        icon: Percent,
      },
      { value: "25 ans", label: "Duree max", icon: CalendarDays },
      {
        value: `${INDICATIVE_RATES.creditImmobilier.min}%`,
        label: "Meilleur taux",
        icon: TrendingDown,
      },
      { value: "10+ banques", label: "Comparees", icon: Building2 },
    ],
    steps: [
      {
        icon: Calculator,
        title: "Simulez votre credit",
        description:
          "Renseignez le montant, la duree et votre apport personnel pour obtenir une estimation precise de vos mensualites.",
      },
      {
        icon: BarChart3,
        title: "Comparez les offres",
        description:
          "Notre algorithme compare en temps reel les taux de +10 banques marocaines pour vous trouver la meilleure offre.",
      },
      {
        icon: FileText,
        title: "Obtenez votre credit",
        description:
          "Soumettez votre dossier en ligne et recevez une reponse de principe sous 48h. Accompagnement gratuit.",
      },
    ],
    features: [
      {
        icon: TrendingDown,
        title: "Meilleur taux garanti",
        description:
          "Nous negocions pour vous les meilleurs taux aupres de toutes les banques du marche marocain.",
        color: "bg-emerald-100 text-emerald-700",
      },
      {
        icon: Calculator,
        title: "Simulateur avance",
        description:
          "Calculez vos mensualites, votre capacite d'emprunt et les frais de notaire en quelques clics.",
        color: "bg-blue-100 text-blue-700",
      },
      {
        icon: Clock,
        title: "Reponse en 48h",
        description:
          "Recevez un accord de principe rapidement grace a notre reseau de partenaires bancaires.",
        color: "bg-amber-100 text-amber-700",
      },
      {
        icon: Shield,
        title: "100% gratuit et sans engagement",
        description:
          "Notre service de comparaison est entierement gratuit. Aucun frais cache, aucune obligation.",
        color: "bg-purple-100 text-purple-700",
      },
      {
        icon: HeartHandshake,
        title: "Accompagnement personnalise",
        description:
          "Un conseiller dedie vous accompagne de la simulation jusqu'a la signature chez le notaire.",
        color: "bg-pink-100 text-pink-700",
      },
      {
        icon: Banknote,
        title: "Frais de dossier negocies",
        description:
          "Beneficiez de frais de dossier reduits grace a nos accords privilegies avec les banques.",
        color: "bg-orange-100 text-orange-700",
      },
    ],
    banks: [
      ...CONVENTIONAL_BANKS.slice(0, 8).map((bank) => ({
        name: bank.nameFr,
        rateRange: `${INDICATIVE_RATES.creditImmobilier.min}% - ${INDICATIVE_RATES.creditImmobilier.max}%`,
        maxDuration: "25 ans",
        maxAmount: "5 000 000 MAD",
        type: "Conventionnel",
      })),
    ],
    bankTableTitle: "Taux de credit immobilier par banque au Maroc",
    faq: [
      {
        question:
          "Quel est le taux actuel du credit immobilier au Maroc ?",
        answer: `Le taux moyen du credit immobilier au Maroc se situe autour de ${INDICATIVE_RATES.creditImmobilier.avg}% en 2024. Les taux varient de ${INDICATIVE_RATES.creditImmobilier.min}% a ${INDICATIVE_RATES.creditImmobilier.max}% selon la banque, le profil de l'emprunteur, le montant et la duree du pret. Les fonctionnaires et les salaries du secteur prive avec un bon profil peuvent obtenir des taux plus avantageux.`,
      },
      {
        question:
          "Quelle est la duree maximale d'un credit immobilier au Maroc ?",
        answer:
          "La duree maximale d'un credit immobilier au Maroc est generalement de 25 ans (300 mois). Certaines banques peuvent proposer jusqu'a 30 ans pour les jeunes emprunteurs de moins de 35 ans. La duree minimale est generalement de 5 ans. Plus la duree est longue, plus les mensualites sont faibles mais le cout total du credit augmente.",
      },
      {
        question:
          "Quel apport personnel faut-il pour un credit immobilier au Maroc ?",
        answer:
          "L'apport personnel minimum demande par les banques marocaines est generalement de 10% a 20% du prix du bien. Certaines banques peuvent financer jusqu'a 100% du bien pour les fonctionnaires ou les clients avec un excellent profil. Un apport plus important permet d'obtenir un meilleur taux d'interet et de reduire le cout total du credit.",
      },
      {
        question: "Quels sont les frais lies a un credit immobilier ?",
        answer:
          "Les frais d'un credit immobilier au Maroc incluent : les frais de dossier (0.5% a 1.5% du montant), les frais de notaire (environ 6% du prix du bien pour l'ancien, 4% pour le neuf), l'assurance deces-invalidite (0.3% a 0.5% du capital restant du), et les frais d'hypotheque. Utilisez notre calculateur de frais de notaire pour estimer le cout total.",
      },
      {
        question:
          "Comment obtenir le meilleur taux pour mon credit immobilier ?",
        answer:
          "Pour obtenir le meilleur taux : 1) Comparez les offres de plusieurs banques sur Wafir.ma, 2) Presentez un bon profil (revenus stables, faible endettement, apport consequent), 3) Negociez avec votre banque actuelle, 4) Optez pour un taux fixe si vous souhaitez de la stabilite, 5) Faites jouer la concurrence en presentant les offres des autres banques.",
      },
      {
        question:
          "Puis-je faire un rachat de credit immobilier au Maroc ?",
        answer:
          "Oui, le rachat de credit immobilier est possible au Maroc. Si les taux ont baisse depuis la souscription de votre credit, vous pouvez le renegocier aupres de votre banque ou le transporter vers une autre banque offrant un meilleur taux. Les penalites de remboursement anticipe sont generalement de 2% du capital restant du, plafonnees a 2 mois d'interets.",
      },
    ],
    seoTitle: "Credit Immobilier au Maroc : Guide Complet 2024",
    seoDescription:
      "Tout savoir sur le credit immobilier au Maroc. Comparez les taux, simulez vos mensualites et trouvez la meilleure offre parmi +10 banques.",
    seoContent: [
      "Le credit immobilier au Maroc represente un engagement financier important qui merite une analyse approfondie. Avec un marche immobilier dynamique et des taux d'interet historiquement attractifs, l'achat d'un bien immobilier au Maroc reste un investissement judicieux. Que vous souhaitiez acquerir votre residence principale a Casablanca, un appartement a Rabat ou une villa a Marrakech, le choix du credit immobilier adapte a votre profil est crucial pour optimiser votre investissement.",
      "Les banques marocaines proposent aujourd'hui des offres variees et competitives. Du taux fixe qui offre la securite de mensualites constantes au taux variable potentiellement plus avantageux, chaque formule presente ses avantages. Le programme FOGARIM facilite l'acces a la propriete pour les revenus modestes, tandis que le programme FOGALOGE s'adresse aux classes moyennes. Il est essential de comparer les offres, car l'ecart entre le meilleur et le moins bon taux peut representer des dizaines de milliers de dirhams sur la duree totale du pret.",
      "Sur Wafir.ma, nous simplifions votre recherche en comparant automatiquement les offres de toutes les banques marocaines. Notre simulateur de credit immobilier vous permet de calculer vos mensualites en fonction du montant souhaite, de la duree et de votre apport personnel. Nos outils complementaires (calculateur de capacite d'emprunt, simulateur de frais de notaire) vous aident a preparer votre projet immobilier en toute serenite. Le service est 100% gratuit et sans engagement.",
    ],
    simulatorSlug: "simulateur-credit-immobilier",
    simulatorLabel: "Simuler mon credit immobilier",
  },

  // =========================================================================
  // 2. CREDIT CONSOMMATION
  // =========================================================================
  "credit-consommation": {
    heroGradient: "from-blue-600 via-blue-500 to-cyan-400",
    heroIcon: CreditCard,
    heroTitle: "Comparez les Credits a la Consommation au Maroc",
    heroDescription:
      "Financez vos projets personnels au meilleur taux. Comparez les offres de banques et societes de financement marocaines en quelques clics.",
    badgeLabel: "Reponse en 24h",
    stats: [
      {
        value: `${INDICATIVE_RATES.creditConsommation.avg}%`,
        label: "Taux moyen",
        icon: Percent,
      },
      { value: "84 mois", label: "Duree max", icon: CalendarDays },
      { value: "500 000 MAD", label: "Montant max", icon: Wallet },
      { value: "15+ organismes", label: "Compares", icon: Building2 },
    ],
    steps: [
      {
        icon: Calculator,
        title: "Definissez votre besoin",
        description:
          "Indiquez le montant souhaite, la duree de remboursement et l'objet de votre financement.",
      },
      {
        icon: Search,
        title: "Comparez instantanement",
        description:
          "Recevez en quelques secondes les meilleures offres de credit conso de +15 organismes financiers.",
      },
      {
        icon: CheckCircle2,
        title: "Finalisez en ligne",
        description:
          "Choisissez l'offre qui vous convient et finalisez votre demande directement en ligne ou par WhatsApp.",
      },
    ],
    features: [
      {
        icon: Zap,
        title: "Reponse rapide en 24h",
        description:
          "Les societes de financement vous repondent sous 24h pour un accord de principe rapide.",
        color: "bg-blue-100 text-blue-700",
      },
      {
        icon: Shield,
        title: "Sans justificatif d'utilisation",
        description:
          "Le credit consommation ne necessite pas de justificatif d'utilisation des fonds dans la plupart des cas.",
        color: "bg-green-100 text-green-700",
      },
      {
        icon: TrendingDown,
        title: "Taux competitifs",
        description:
          "Beneficiez de taux negocies grace a notre volume de demandes aupres des partenaires.",
        color: "bg-amber-100 text-amber-700",
      },
      {
        icon: CalendarDays,
        title: "Durees flexibles",
        description:
          "Choisissez une duree de 6 a 84 mois pour adapter vos mensualites a votre budget.",
        color: "bg-purple-100 text-purple-700",
      },
      {
        icon: PiggyBank,
        title: "Report d'echeance possible",
        description:
          "Certaines offres permettent de differer la premiere echeance de 1 a 3 mois.",
        color: "bg-pink-100 text-pink-700",
      },
      {
        icon: FileText,
        title: "Dossier simplifie",
        description:
          "Constituez votre dossier en ligne en quelques minutes. Pieces justificatives minimales requises.",
        color: "bg-orange-100 text-orange-700",
      },
    ],
    banks: [
      ...SOCIETES_FINANCEMENT.map((sf) => ({
        name: sf.nameFr,
        rateRange: `${INDICATIVE_RATES.creditConsommation.min}% - ${INDICATIVE_RATES.creditConsommation.max}%`,
        maxDuration: "84 mois",
        maxAmount: "500 000 MAD",
        type: "Societe de financement",
      })),
      ...CONVENTIONAL_BANKS.slice(0, 5).map((bank) => ({
        name: bank.nameFr,
        rateRange: `${INDICATIVE_RATES.creditConsommation.min}% - ${INDICATIVE_RATES.creditConsommation.max}%`,
        maxDuration: "60 mois",
        maxAmount: "300 000 MAD",
        type: "Banque",
      })),
    ],
    bankTableTitle:
      "Taux de credit consommation par organisme au Maroc",
    faq: [
      {
        question:
          "Quelles sont les conditions pour obtenir un credit consommation au Maroc ?",
        answer:
          "Pour obtenir un credit consommation au Maroc, il faut generalement : etre age de 21 a 65 ans, etre salarie avec au moins 6 mois d'anciennete (ou fonctionnaire), avoir un revenu mensuel net minimum de 3 000 MAD, et un taux d'endettement inferieur a 45%. Les pieces requises incluent la CIN, les 3 derniers bulletins de salaire, une attestation de travail et les releves bancaires des 3 derniers mois.",
      },
      {
        question:
          "Quelle est la difference entre un credit consommation en banque et en societe de financement ?",
        answer:
          "Les societes de financement (Wafasalaf, Cetelem, Sofac...) offrent generalement une plus grande flexibilite et des reponses plus rapides que les banques. En revanche, les banques peuvent proposer des taux legerement plus bas, surtout pour leurs clients existants. Les societes de financement acceptent aussi des profils plus varies et proposent des facilites comme le report d'echeance.",
      },
      {
        question:
          "Peut-on rembourser un credit consommation par anticipation ?",
        answer:
          "Oui, le remboursement anticipe total ou partiel est possible au Maroc. Des penalites de remboursement anticipe peuvent s'appliquer, generalement entre 1% et 2% du capital restant du. Certains organismes n'appliquent pas de penalites apres un certain nombre de mensualites. Verifiez les conditions dans votre contrat de credit.",
      },
      {
        question: "Quel montant puis-je emprunter en credit consommation ?",
        answer:
          "Le montant d'un credit consommation au Maroc varie de 5 000 MAD a 500 000 MAD selon l'organisme preteur et votre profil. Le montant maximum depend principalement de votre revenu mensuel et de votre taux d'endettement. En regle generale, la mensualite ne doit pas depasser 45% de votre revenu net mensuel.",
      },
      {
        question:
          "Combien de temps faut-il pour obtenir un credit consommation ?",
        answer:
          "Le delai d'obtention d'un credit consommation au Maroc est generalement de 24h a 72h pour un accord de principe. Le deblocage des fonds intervient sous 5 a 10 jours ouvrables apres reception du dossier complet. Certaines societes de financement proposent un deblocage express en 48h pour les dossiers complets.",
      },
    ],
    seoTitle:
      "Credit Consommation au Maroc : Comparateur de Taux 2024",
    seoDescription:
      "Comparez les credits a la consommation au Maroc. Meilleurs taux, simulation en ligne, reponse rapide de +15 organismes financiers.",
    seoContent: [
      "Le credit a la consommation au Maroc est un outil de financement flexible qui permet de realiser tous vos projets personnels : equipement de la maison, mariage, voyages, etudes des enfants, ou tout simplement pour faire face a un besoin de tresorerie. Avec un marche en pleine expansion, les banques et societes de financement marocaines rivalisent d'offres competitives pour attirer les consommateurs.",
      "Les societes de financement comme Wafasalaf, Cetelem, Sofac et Salafin dominent le marche du credit consommation au Maroc grace a leur rapidite de traitement et leur flexibilite. Elles proposent des formules adaptees a tous les budgets avec des durees de remboursement allant de 6 a 84 mois. Les taux d'interet varient considerablement d'un organisme a l'autre, ce qui rend la comparaison indispensable pour economiser sur le cout total de votre credit.",
      "Wafir.ma vous permet de comparer en quelques secondes les offres de +15 banques et societes de financement. Notre simulateur de credit consommation calcule instantanement vos mensualites et le cout total de votre emprunt. Vous pouvez ensuite soumettre votre demande en ligne ou nous contacter par WhatsApp pour un accompagnement personnalise. Toutes nos comparaisons sont gratuites et sans engagement.",
    ],
    simulatorSlug: "simulateur-credit-consommation",
    simulatorLabel: "Simuler mon credit consommation",
  },

  // =========================================================================
  // 3. CREDIT AUTO
  // =========================================================================
  "credit-auto": {
    heroGradient: "from-orange-500 via-orange-400 to-amber-300",
    heroIcon: Car,
    heroTitle: "Comparez les Credits Auto au Maroc",
    heroDescription:
      "Financez votre vehicule neuf ou d'occasion au meilleur taux. Comparez les offres de banques et societes de financement pour trouver le credit auto ideal.",
    badgeLabel: "Taux a partir de 5.5%",
    stats: [
      {
        value: `${INDICATIVE_RATES.creditAuto.avg}%`,
        label: "Taux moyen",
        icon: Percent,
      },
      { value: "84 mois", label: "Duree max", icon: CalendarDays },
      {
        value: `${INDICATIVE_RATES.creditAuto.min}%`,
        label: "Meilleur taux",
        icon: TrendingDown,
      },
      { value: "15+ organismes", label: "Compares", icon: Building2 },
    ],
    steps: [
      {
        icon: Car,
        title: "Choisissez votre vehicule",
        description:
          "Indiquez le type de vehicule (neuf ou occasion), la marque, le modele et le prix d'achat.",
      },
      {
        icon: Calculator,
        title: "Simulez votre financement",
        description:
          "Renseignez le montant de l'apport, la duree souhaitee et comparez les offres disponibles.",
      },
      {
        icon: CheckCircle2,
        title: "Roulez en toute serenite",
        description:
          "Finalisez votre dossier en ligne et recevez votre accord de financement rapidement.",
      },
    ],
    features: [
      {
        icon: Car,
        title: "Neuf et occasion",
        description:
          "Financez l'achat d'un vehicule neuf ou d'occasion avec des conditions adaptees a chaque cas.",
        color: "bg-orange-100 text-orange-700",
      },
      {
        icon: TrendingDown,
        title: "Taux negocies",
        description:
          "Profitez de taux preferentiels negocies avec les principaux concessionnaires et banques.",
        color: "bg-green-100 text-green-700",
      },
      {
        icon: Shield,
        title: "Assurance auto incluse",
        description:
          "Certaines offres incluent une assurance tous risques la premiere annee pour votre tranquillite.",
        color: "bg-blue-100 text-blue-700",
      },
      {
        icon: Zap,
        title: "Accord rapide",
        description:
          "Obtenez un accord de principe en 24h et le deblocage des fonds sous 5 jours ouvrables.",
        color: "bg-purple-100 text-purple-700",
      },
      {
        icon: Wallet,
        title: "Apport flexible",
        description:
          "Apport initial de 0% a 30% selon les offres. Possibilite de financement a 100%.",
        color: "bg-amber-100 text-amber-700",
      },
      {
        icon: CalendarDays,
        title: "Mensualites adaptees",
        description:
          "Duree de remboursement de 12 a 84 mois pour des mensualites qui s'adaptent a votre budget.",
        color: "bg-pink-100 text-pink-700",
      },
    ],
    banks: [
      ...SOCIETES_FINANCEMENT.map((sf) => ({
        name: sf.nameFr,
        rateRange: `${INDICATIVE_RATES.creditAuto.min}% - ${INDICATIVE_RATES.creditAuto.max}%`,
        maxDuration: "84 mois",
        maxAmount: "1 000 000 MAD",
        type: "Societe de financement",
      })),
      ...CONVENTIONAL_BANKS.slice(0, 5).map((bank) => ({
        name: bank.nameFr,
        rateRange: `${INDICATIVE_RATES.creditAuto.min}% - ${INDICATIVE_RATES.creditAuto.max}%`,
        maxDuration: "72 mois",
        maxAmount: "800 000 MAD",
        type: "Banque",
      })),
    ],
    bankTableTitle: "Taux de credit auto par organisme au Maroc",
    faq: [
      {
        question:
          "Quelle est la difference entre un credit auto neuf et occasion ?",
        answer:
          "Le credit auto neuf beneficie generalement de taux plus avantageux (a partir de 5.5%) et de durees plus longues (jusqu'a 84 mois). Le credit auto occasion a des taux legerement plus eleves (a partir de 6.5%) et des durees maximales plus courtes (60 a 72 mois). L'apport personnel est aussi souvent plus eleve pour un vehicule d'occasion (20% a 30%).",
      },
      {
        question:
          "Quel apport faut-il pour un credit auto au Maroc ?",
        answer:
          "L'apport personnel pour un credit auto au Maroc varie de 0% a 30% selon l'organisme preteur et le type de vehicule. Pour un vehicule neuf, certaines offres proposent un financement a 100% sans apport. Pour un vehicule d'occasion, un apport de 10% a 20% est generalement demande. Un apport plus important permet d'obtenir un meilleur taux.",
      },
      {
        question:
          "Credit auto en banque ou societe de financement : que choisir ?",
        answer:
          "Les societes de financement (Wafasalaf, Cetelem, Sofac) offrent souvent des offres promotionnelles en partenariat avec les concessionnaires, avec des taux prefentiels et des facilites comme le report de la premiere echeance. Les banques proposent des taux parfois plus bas pour leurs clients existants. Comparez les deux sur Wafir.ma pour trouver la meilleure offre.",
      },
      {
        question:
          "L'assurance est-elle obligatoire avec un credit auto ?",
        answer:
          "Oui, l'assurance auto est obligatoire au Maroc (responsabilite civile minimum). Les organismes de credit exigent generalement une assurance tous risques pendant toute la duree du financement. Certaines offres incluent l'assurance la premiere annee. Comparez aussi les assurances auto sur Wafir.ma pour economiser.",
      },
      {
        question:
          "Peut-on acheter un vehicule d'un particulier avec un credit auto ?",
        answer:
          "Oui, il est possible de financer l'achat d'un vehicule d'occasion aupres d'un particulier avec un credit auto. Cependant, les conditions sont generalement plus strictes : apport personnel plus eleve, taux plus haut, et le vehicule doit avoir moins de 5 a 7 ans. Certaines societes de financement ne financent que les achats chez des concessionnaires agrees.",
      },
    ],
    seoTitle: "Credit Auto au Maroc : Comparez les Taux 2024",
    seoDescription:
      "Financez votre voiture neuve ou d'occasion au meilleur taux. Comparez les offres de credit auto de +15 banques et societes de financement marocaines.",
    seoContent: [
      "Le marche automobile marocain est en pleine croissance, et les offres de credit auto se multiplient pour accompagner les acheteurs. Que vous souhaitiez acquerir une citadine economique, un SUV familial ou un vehicule utilitaire, le credit auto au Maroc offre des solutions de financement adaptees a tous les budgets et tous les profils.",
      "Les societes de financement comme Wafasalaf, Cetelem et Sofac proposent regulierement des offres promotionnelles en partenariat avec les grandes marques automobiles (Dacia, Renault, Hyundai, Toyota, Volkswagen). Ces offres incluent souvent des taux preferentiels, des reports d'echeance et parfois meme une assurance tous risques offerte la premiere annee. Les banques conventionnelles proposent egalement des credits auto competitifs, surtout pour leurs clients existants.",
      "Sur Wafir.ma, nous comparons pour vous toutes les offres de credit auto disponibles au Maroc. Notre simulateur vous permet de calculer vos mensualites en quelques secondes et de visualiser le cout total de votre financement. Que ce soit pour un vehicule neuf ou d'occasion, trouvez l'offre qui correspond le mieux a votre budget et a vos besoins. Notre service est 100% gratuit et notre equipe est disponible par WhatsApp pour vous accompagner.",
    ],
    simulatorSlug: "simulateur-credit-consommation",
    simulatorLabel: "Simuler mon credit auto",
  },

  // =========================================================================
  // 4. RACHAT DE CREDIT
  // =========================================================================
  "rachat-credit": {
    heroGradient: "from-violet-600 via-violet-500 to-purple-400",
    heroIcon: RefreshCw,
    heroTitle: "Rachat de Credit au Maroc : Reduisez vos Mensualites",
    heroDescription:
      "Regroupez vos credits en un seul pret et reduisez vos mensualites jusqu'a 60%. Comparez les offres de rachat de credit au Maroc gratuitement.",
    badgeLabel: "Jusqu'a -60% sur vos mensualites",
    stats: [
      { value: "-60%", label: "Reduction mensualites", icon: TrendingDown },
      { value: "1 seul credit", label: "Au lieu de plusieurs", icon: RefreshCw },
      { value: "25 ans", label: "Duree max", icon: CalendarDays },
      { value: "10+ banques", label: "Comparees", icon: Building2 },
    ],
    steps: [
      {
        icon: FileText,
        title: "Listez vos credits en cours",
        description:
          "Renseignez le detail de vos credits actuels : montants, mensualites, durees restantes et taux.",
      },
      {
        icon: Calculator,
        title: "Estimez vos economies",
        description:
          "Notre simulateur calcule instantanement la reduction de vos mensualites et le cout total du rachat.",
      },
      {
        icon: CheckCircle2,
        title: "Finalisez votre rachat",
        description:
          "Soumettez votre dossier en ligne. Un conseiller vous accompagne jusqu'au deblocage des fonds.",
      },
    ],
    features: [
      {
        icon: TrendingDown,
        title: "Mensualites reduites",
        description:
          "Regroupez tous vos credits en un seul et reduisez significativement vos mensualites mensuelles.",
        color: "bg-violet-100 text-violet-700",
      },
      {
        icon: Scale,
        title: "Tresorerie supplementaire",
        description:
          "Integrez une enveloppe de tresorerie supplementaire a votre rachat pour financer de nouveaux projets.",
        color: "bg-blue-100 text-blue-700",
      },
      {
        icon: RefreshCw,
        title: "Un seul interlocuteur",
        description:
          "Simplifiez la gestion de vos credits avec un seul prelevement mensuel et un seul organisme.",
        color: "bg-green-100 text-green-700",
      },
      {
        icon: Shield,
        title: "Restructuration de dette",
        description:
          "Evitez le surendettement en restructurant vos dettes de maniere optimale.",
        color: "bg-amber-100 text-amber-700",
      },
      {
        icon: BadgeCheck,
        title: "Etude gratuite du dossier",
        description:
          "L'etude de faisabilite de votre rachat de credit est 100% gratuite et sans engagement.",
        color: "bg-pink-100 text-pink-700",
      },
      {
        icon: Landmark,
        title: "Tous types de credits",
        description:
          "Regroupez credits immobilier, consommation, auto, et meme les decouvertes bancaires.",
        color: "bg-orange-100 text-orange-700",
      },
    ],
    banks: [
      ...CONVENTIONAL_BANKS.slice(0, 6).map((bank) => ({
        name: bank.nameFr,
        rateRange: "4.5% - 8%",
        maxDuration: "25 ans",
        maxAmount: "3 000 000 MAD",
        type: "Banque",
      })),
      ...SOCIETES_FINANCEMENT.slice(0, 3).map((sf) => ({
        name: sf.nameFr,
        rateRange: "6% - 10%",
        maxDuration: "10 ans",
        maxAmount: "500 000 MAD",
        type: "Societe de financement",
      })),
    ],
    bankTableTitle:
      "Organismes proposant le rachat de credit au Maroc",
    faq: [
      {
        question: "Qu'est-ce que le rachat de credit ?",
        answer:
          "Le rachat de credit (ou regroupement de credits) consiste a regrouper plusieurs credits en cours en un seul pret, generalement avec une duree plus longue et un taux unique. Cela permet de reduire significativement les mensualites (jusqu'a 60%) et de simplifier la gestion financiere avec un seul prelevement mensuel.",
      },
      {
        question:
          "Quels types de credits peuvent etre rachetes au Maroc ?",
        answer:
          "Au Maroc, il est possible de racheter presque tous les types de credits : credit immobilier, credit consommation, credit auto, decouvert bancaire, et meme certaines dettes personnelles. Le rachat peut concerner un seul credit (pour renegocier le taux) ou plusieurs credits de nature differente.",
      },
      {
        question:
          "Le rachat de credit coute-t-il plus cher au final ?",
        answer:
          "Le rachat de credit reduit les mensualites en allongeant la duree du pret, ce qui peut augmenter le cout total du credit. Cependant, si le nouveau taux est significativement plus bas, le cout total peut aussi diminuer. L'interet principal est de retrouver un budget equilibre et d'eviter le surendettement. Notre simulateur vous montre le cout total avant et apres rachat.",
      },
      {
        question:
          "Quelles sont les conditions pour un rachat de credit au Maroc ?",
        answer:
          "Les conditions varient selon les organismes mais incluent generalement : etre age de 21 a 65 ans, avoir des revenus reguliers, un taux d'endettement actuel superieur a 40%, et des credits en cours sans incidents de paiement majeurs. Un bon historique bancaire facilite l'acceptation du dossier.",
      },
      {
        question:
          "Combien de temps prend un rachat de credit ?",
        answer:
          "Un rachat de credit au Maroc prend generalement entre 2 et 6 semaines, du depot du dossier au deblocage des fonds. L'accord de principe est donne sous 48h a 72h. Le delai depend de la complexite du dossier (nombre de credits a racheter, montants, garanties demandees) et de la rapidite de constitution du dossier.",
      },
    ],
    seoTitle:
      "Rachat de Credit au Maroc : Regroupez vos Credits et Economisez",
    seoDescription:
      "Regroupez vos credits au Maroc et reduisez vos mensualites jusqu'a 60%. Simulation gratuite, comparaison des offres de rachat de credit.",
    seoContent: [
      "Le rachat de credit au Maroc est une solution financiere de plus en plus populaire pour les menages souhaitant alleger leur charge mensuelle. Avec la multiplication des offres de credit (immobilier, consommation, auto), de nombreux Marocains se retrouvent avec plusieurs prets a rembourser simultanement, ce qui peut representer une charge importante. Le regroupement de credits permet de fusionner tous ces prets en un seul, avec une mensualite unique et souvent reduite.",
      "Le principe est simple : une banque ou un organisme financier rembourse l'ensemble de vos credits en cours et vous propose un nouveau pret unique, avec un taux et une duree negocies. La mensualite est generalement plus faible car la duree de remboursement est allongee. Cette operation permet de retrouver un equilibre budgetaire, d'eviter les incidents de paiement et parfois meme d'inclure une enveloppe de tresorerie supplementaire pour financer de nouveaux projets.",
      "Wafir.ma vous accompagne dans votre projet de rachat de credit en comparant les offres de toutes les banques et societes de financement du marche marocain. Notre simulateur de rachat de credit calcule instantanement vos nouvelles mensualites et le cout total de l'operation. Un conseiller dedie est disponible par WhatsApp pour etudier votre dossier gratuitement et vous orienter vers la meilleure offre. N'attendez plus pour reprendre le controle de votre budget.",
    ],
    simulatorSlug: "simulateur-rachat-credit",
    simulatorLabel: "Simuler mon rachat de credit",
  },

  // =========================================================================
  // 5. MOURABAHA
  // =========================================================================
  mourabaha: {
    heroGradient: "from-teal-600 via-teal-500 to-emerald-400",
    heroIcon: Moon,
    heroTitle: "Mourabaha au Maroc : Financement Participatif Halal",
    heroDescription:
      "Financez votre bien immobilier ou vehicule selon les principes de la finance islamique. Comparez les offres Mourabaha des banques participatives marocaines.",
    badgeLabel: "Finance participative certifiee",
    stats: [
      {
        value: `${INDICATIVE_RATES.mourabaha.avg}%`,
        label: "Marge moyenne",
        icon: Percent,
      },
      { value: "25 ans", label: "Duree max", icon: CalendarDays },
      { value: "5 banques", label: "Participatives", icon: Building2 },
      {
        value: "Conforme Charia",
        label: "Certifie CSO",
        icon: ShieldCheck,
      },
    ],
    steps: [
      {
        icon: Search,
        title: "Definissez votre projet",
        description:
          "Indiquez le type de bien (immobilier ou vehicule), le montant et vos preferences de financement.",
      },
      {
        icon: Calculator,
        title: "Comparez les offres Mourabaha",
        description:
          "Recevez et comparez les offres des 5 banques participatives agreees au Maroc.",
      },
      {
        icon: CheckCircle2,
        title: "Finalisez votre financement",
        description:
          "Signez votre contrat Mourabaha en toute conformite avec les principes de la Charia.",
      },
    ],
    features: [
      {
        icon: ShieldCheck,
        title: "Conforme a la Charia",
        description:
          "Tous les produits sont certifies conformes par le Comite Charia de chaque banque et valides par le CSO de Bank Al-Maghrib.",
        color: "bg-teal-100 text-teal-700",
      },
      {
        icon: Landmark,
        title: "Pas d'interet (Riba)",
        description:
          "Le financement Mourabaha repose sur un contrat de vente avec marge beneficiaire, sans interet bancaire.",
        color: "bg-green-100 text-green-700",
      },
      {
        icon: Home,
        title: "Immobilier et automobile",
        description:
          "La Mourabaha est disponible pour le financement immobilier et l'acquisition de vehicules neufs.",
        color: "bg-blue-100 text-blue-700",
      },
      {
        icon: HandCoins,
        title: "Marge de profit transparente",
        description:
          "La marge beneficiaire de la banque est fixee et communiquee des le depart. Aucun frais cache.",
        color: "bg-amber-100 text-amber-700",
      },
      {
        icon: FileText,
        title: "Contrat d'achat-revente",
        description:
          "La banque achete le bien puis vous le revend avec une marge. Vous devenez proprietaire des la signature.",
        color: "bg-purple-100 text-purple-700",
      },
      {
        icon: Star,
        title: "Exoneration de TVA",
        description:
          "Les operations Mourabaha immobiliere beneficient d'un regime fiscal specifique au Maroc.",
        color: "bg-pink-100 text-pink-700",
      },
    ],
    banks: [
      ...PARTICIPATIVE_BANKS.map((bank) => ({
        name: bank.nameFr,
        rateRange: `${INDICATIVE_RATES.mourabaha.min}% - ${INDICATIVE_RATES.mourabaha.max}%`,
        maxDuration: "25 ans",
        maxAmount: "5 000 000 MAD",
        type: "Banque participative",
      })),
    ],
    bankTableTitle: "Banques participatives au Maroc : offres Mourabaha",
    faq: [
      {
        question: "Qu'est-ce que la Mourabaha ?",
        answer:
          "La Mourabaha est un mode de financement conforme a la Charia islamique. La banque achete le bien (immobilier ou vehicule) puis le revend au client avec une marge beneficiaire fixee a l'avance. Le client rembourse par echeances mensuelles sur une duree convenue. Contrairement au credit classique, il n'y a pas d'interet (Riba) : la banque realise un profit sur la vente et non sur un pret d'argent.",
      },
      {
        question:
          "Quelles sont les banques participatives au Maroc ?",
        answer:
          "Le Maroc compte 5 banques participatives agreees par Bank Al-Maghrib : Bank Assafa (filiale d'Attijariwafa Bank), Umnia Bank (filiale de CIH Bank et Qatar International Islamic Bank), Dar Al Amane (filiale de Societe Generale), Al Yousr (filiale de BMCE Bank of Africa), et Arreda (filiale de Credit Agricole du Maroc). Chacune propose des produits Mourabaha immobiliere et automobile.",
      },
      {
        question:
          "La Mourabaha est-elle plus chere qu'un credit classique ?",
        answer:
          "La marge de profit Mourabaha est generalement comparable aux taux des credits classiques, voire legerement plus elevee (en moyenne 5.2% contre 4.2% pour un credit immobilier classique). Cependant, la Mourabaha immobiliere beneficie d'exonerations fiscales (TVA, droits d'enregistrement) qui peuvent compenser la difference. Comparez les deux options sur Wafir.ma pour determiner la plus avantageuse dans votre cas.",
      },
      {
        question:
          "Quels documents sont necessaires pour une Mourabaha ?",
        answer:
          "Les documents requis sont similaires a un credit classique : CIN, bulletins de salaire (3 derniers mois), attestation de travail, releves bancaires (6 derniers mois), promesse de vente du bien, et certificat de propriete. Les banques participatives verifient egalement la conformite Charia du bien et de l'operation.",
      },
      {
        question:
          "Peut-on rembourser une Mourabaha par anticipation ?",
        answer:
          "Oui, le remboursement anticipe d'une Mourabaha est possible au Maroc. La banque peut consentir une remise (rabais) sur la marge beneficiaire restante, mais ce n'est pas une obligation legale contrairement au credit classique. Les conditions de remboursement anticipe varient selon les banques et sont generalement plus avantageuses que pour un credit conventionnel.",
      },
      {
        question:
          "La Mourabaha est-elle disponible pour les MRE ?",
        answer:
          "Oui, les Marocains Residant a l'Etranger (MRE) peuvent beneficier de la Mourabaha immobiliere au Maroc. Les banques participatives proposent des offres specifiques pour les MRE avec des conditions adaptees (justificatifs de revenus du pays de residence, apport personnel plus important). Contactez-nous par WhatsApp pour un accompagnement dedie aux MRE.",
      },
    ],
    seoTitle: "Mourabaha au Maroc : Guide du Financement Islamique 2024",
    seoDescription:
      "Comparez les offres Mourabaha des banques participatives au Maroc. Financement immobilier et auto conforme a la Charia, simulation gratuite.",
    seoContent: [
      "La Mourabaha est le produit phare de la finance participative au Maroc, lancee officiellement en 2017 avec l'agrement des 5 banques participatives par Bank Al-Maghrib. Ce mode de financement halal connait un succes grandissant aupres des Marocains souhaitant acquerir un bien immobilier ou un vehicule en conformite avec les principes de la Charia islamique. Contrairement au credit conventionnel base sur l'interet (Riba), la Mourabaha repose sur un contrat d'achat-revente ou la banque achete le bien puis le revend au client avec une marge beneficiaire transparente et fixee a l'avance.",
      "Les 5 banques participatives au Maroc - Bank Assafa, Umnia Bank, Dar Al Amane, Al Yousr et Arreda - proposent des offres Mourabaha immobiliere et automobile competitives. La marge de profit se situe en moyenne autour de 5.2%, avec des durees de financement pouvant aller jusqu'a 25 ans pour l'immobilier. Tous les produits sont certifies conformes par le Comite Charia pour la Finance du Conseil Superieur des Oulemas (CSO), garantissant leur conformite aux principes de l'Islam. Le cadre fiscal marocain a ete adapte pour assurer la neutralite fiscale entre la Mourabaha et le credit conventionnel.",
      "Wafir.ma est le premier comparateur au Maroc a integrer les offres Mourabaha des 5 banques participatives. Notre simulateur Mourabaha calcule vos echeances mensuelles et le cout total de votre financement en tenant compte de la marge beneficiaire et des frais annexes. Comparez facilement les offres participatives et conventionnelles pour prendre la meilleure decision financiere. Notre equipe est disponible par WhatsApp pour vous accompagner dans votre projet de financement halal.",
    ],
    simulatorSlug: "simulateur-mourabaha",
    simulatorLabel: "Simuler ma Mourabaha",
  },
};

// ---------------------------------------------------------------------------
// generateStaticParams — pre-generate all 5 credit category pages
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return CREDIT_SLUGS.flatMap((categorySlug) =>
    ["fr", "ar", "en"].map((locale) => ({ locale, categorySlug }))
  );
}

// ---------------------------------------------------------------------------
// generateMetadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}) {
  const { locale, categorySlug } = await params;

  if (!isCreditSlug(categorySlug)) return {};

  const category = CATEGORIES.find((c) => c.slug === categorySlug)!;
  const data = CATEGORY_DATA[categorySlug];

  return {
    title: `${category.nameFr} au Maroc | Comparer et Simuler | Wafir.ma`,
    description: data.seoDescription,
    keywords: [
      category.nameFr,
      `${category.nameFr} Maroc`,
      `taux ${category.nameFr.toLowerCase()}`,
      `simulateur ${category.nameFr.toLowerCase()}`,
      `comparateur ${category.nameFr.toLowerCase()}`,
      "wafir.ma",
    ],
    openGraph: {
      title: `${category.nameFr} au Maroc | Wafir.ma`,
      description: data.seoDescription,
      type: "website",
      siteName: "Wafir.ma",
      url: `https://wafir.ma/${locale}/${categorySlug}`,
    },
    alternates: {
      canonical: `https://wafir.ma/${locale}/${categorySlug}`,
      languages: {
        fr: `/fr/${categorySlug}`,
        ar: `/ar/${categorySlug}`,
        en: `/en/${categorySlug}`,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default async function CategoryLandingPage({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}) {
  const { locale, categorySlug } = await params;

  if (!isCreditSlug(categorySlug)) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === categorySlug)!;
  const data = CATEGORY_DATA[categorySlug];

  // Build JSON-LD structured data for FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // Build JSON-LD for BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `https://wafir.ma/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.nameFr,
        item: `https://wafir.ma/${locale}/${categorySlug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ================================================================= */}
      {/* HERO SECTION                                                       */}
      {/* ================================================================= */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br ${data.heroGradient} text-white`}
      >
        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -end-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -start-32 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-5 bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm px-4 py-1.5">
              {category.icon} {data.badgeLabel}
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
              {data.heroTitle}
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              {data.heroDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 font-semibold shadow-lg"
                asChild
              >
                <Link href={`/${locale}/outils/${data.simulatorSlug}`}>
                  <Calculator className="me-2 h-5 w-5" />
                  {data.simulatorLabel}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold backdrop-blur-sm"
                asChild
              >
                <Link href={`/${locale}/${categorySlug}#comparatif`}>
                  <BarChart3 className="me-2 h-5 w-5" />
                  Comparer les offres
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* STATS BAR                                                          */}
      {/* ================================================================= */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {data.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-5 w-5 text-primary me-1.5" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* HOW IT WORKS (3 steps)                                             */}
      {/* ================================================================= */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 text-primary border-primary/30"
          >
            Simple et rapide
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Comment ca marche ?
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Obtenez la meilleure offre de {category.nameFr.toLowerCase()} en 3
            etapes simples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {data.steps.map((step, i) => (
            <div key={step.title} className="relative text-center group">
              {/* Connector line */}
              {i < data.steps.length - 1 && (
                <div className="hidden md:block absolute top-10 start-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-0.5 bg-gradient-to-r from-primary/30 to-primary/10" />
              )}
              {/* Step number circle */}
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <step.icon className="h-8 w-8" />
              </div>
              <div className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold w-6 h-6 mb-3">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* FEATURES / BENEFITS                                                */}
      {/* ================================================================= */}
      <section className="bg-[var(--surface)] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              Avantages
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Pourquoi comparer avec Wafir.ma ?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Des outils puissants et un accompagnement gratuit pour trouver le
              meilleur {category.nameFr.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {data.features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-md transition-all duration-200 hover:border-primary/30"
              >
                <CardContent className="p-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} mb-4`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* BANK COMPARISON TABLE                                              */}
      {/* ================================================================= */}
      <section id="comparatif" className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 text-primary border-primary/30"
          >
            Comparatif {new Date().getFullYear()}
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {data.bankTableTitle}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Taux indicatifs mis a jour regulierement. Les taux reels dependent de
            votre profil et du montant emprunte.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Organisme</TableHead>
                    <TableHead className="font-semibold">
                      {categorySlug === "mourabaha"
                        ? "Marge de profit"
                        : "Taux indicatif"}
                    </TableHead>
                    <TableHead className="font-semibold hidden sm:table-cell">
                      Duree max
                    </TableHead>
                    <TableHead className="font-semibold hidden md:table-cell">
                      Montant max
                    </TableHead>
                    <TableHead className="font-semibold hidden lg:table-cell">
                      Type
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.banks.map((bank) => (
                    <TableRow key={bank.name}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground hidden sm:block" />
                          {bank.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-primary/30 text-primary font-semibold"
                        >
                          {bank.rateRange}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {bank.maxDuration}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {bank.maxAmount}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <Badge variant="secondary" className="text-xs">
                          {bank.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground text-center mt-4">
            * Les taux affiches sont indicatifs et susceptibles de varier. Ils
            dependent du profil de l&apos;emprunteur, du montant, de la duree et des
            garanties. Derniere mise a jour : {new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}.
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FAQ SECTION (accordion)                                            */}
      {/* ================================================================= */}
      <section className="bg-[var(--surface)] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/30"
            >
              Questions frequentes
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Tout savoir sur {category.nameFr === "Mourabaha" ? "la" : "le"}{" "}
              {category.nameFr}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {data.faq.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA SECTION                                                        */}
      {/* ================================================================= */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${data.heroGradient} text-white p-8 md:p-12 lg:p-16`}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 end-0 h-64 w-64 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 start-0 h-48 w-48 rounded-full bg-white/5 blur-2xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Pret a trouver le meilleur{" "}
              {category.nameFr === "Mourabaha"
                ? "financement Mourabaha"
                : category.nameFr.toLowerCase()}{" "}
              ?
            </h2>
            <p className="text-white/90 mb-8 text-lg leading-relaxed">
              Comparez gratuitement les offres de{" "}
              {categorySlug === "mourabaha"
                ? "toutes les banques participatives"
                : "toutes les banques et organismes financiers"}{" "}
              au Maroc et economisez sur votre financement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-white/90 font-semibold shadow-lg"
                asChild
              >
                <Link href={`/${locale}/outils/${data.simulatorSlug}`}>
                  <Calculator className="me-2 h-5 w-5" />
                  {data.simulatorLabel}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-semibold"
                asChild
              >
                <Link href={`/${locale}/${categorySlug}#comparatif`}>
                  <BarChart3 className="me-2 h-5 w-5" />
                  Comparer les offres
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                100% gratuit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Sans engagement
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Resultat en 2 min
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SEO CONTENT SECTION                                                */}
      {/* ================================================================= */}
      <section className="border-t bg-[var(--surface)] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              {data.seoTitle}
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              {data.seoContent.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Internal links */}
            <div className="mt-10 pt-8 border-t">
              <h3 className="font-semibold text-foreground mb-4">
                Explorez nos autres produits
              </h3>
              <div className="flex flex-wrap gap-2">
                {CREDIT_SLUGS.filter((s) => s !== categorySlug).map((slug) => {
                  const cat = CATEGORIES.find((c) => c.slug === slug)!;
                  return (
                    <Button key={slug} variant="outline" size="sm" asChild>
                      <Link href={`/${locale}/${slug}`}>
                        <span className="me-1.5">{cat.icon}</span>
                        {cat.nameFr}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Related tools */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-foreground mb-4">
                Outils gratuits
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/${locale}/outils/simulateur-credit-immobilier`}
                  >
                    Simulateur Credit Immo
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/${locale}/outils/calculateur-capacite-emprunt`}
                  >
                    Capacite d&apos;Emprunt
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/${locale}/outils/calculateur-frais-notaire`}
                  >
                    Frais de Notaire
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/${locale}/outils/simulateur-mourabaha`}
                  >
                    Simulateur Mourabaha
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={`/${locale}/outils/simulateur-rachat-credit`}
                  >
                    Rachat de Credit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
