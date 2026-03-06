import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { INSURANCE_COMPANIES, CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
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
  Shield,
  Car,
  Home,
  Heart,
  Plane,
  Sprout,
  Check,
  ArrowRight,
  Phone,
  Star,
  BadgeCheck,
  CircleDollarSign,
  FileText,
  Users,
  Clock,
  Stethoscope,
  Umbrella,
  Scale,
  Zap,
  Building2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type InsuranceSlug =
  | "assurance-auto"
  | "assurance-habitation"
  | "mutuelle-sante"
  | "assurance-vie"
  | "assurance-voyage";

interface CoverageLevel {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface InsurancePageData {
  slug: InsuranceSlug;
  icon: React.ElementType;
  emoji: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  features: Feature[];
  coverageLevels: CoverageLevel[];
  faqs: FAQ[];
  relevantInsurers: string[];
  seoContent: string[];
}

// ---------------------------------------------------------------------------
// Static data for all 5 insurance categories
// ---------------------------------------------------------------------------

const INSURANCE_DATA: Record<InsuranceSlug, InsurancePageData> = {
  "assurance-auto": {
    slug: "assurance-auto",
    icon: Car,
    emoji: "🛡️",
    heroTitle: "Assurance Auto au Maroc",
    heroSubtitle:
      "Comparez les meilleures offres d'assurance automobile et economisez jusqu'a 40% sur votre prime annuelle.",
    heroDescription:
      "Plus de 8 assureurs compares en 2 minutes. Trouvez la couverture ideale pour votre vehicule.",
    metaTitle: "Assurance Auto Maroc — Comparateur Gratuit | Wafir.ma",
    metaDescription:
      "Comparez gratuitement les assurances auto au Maroc. Tiers, tous risques, assistance : trouvez la meilleure couverture parmi Wafa Assurance, RMA, AXA, Sanlam et plus.",
    features: [
      {
        icon: Shield,
        title: "Responsabilite civile obligatoire",
        description:
          "Couverture minimale exigee par la loi marocaine pour tout vehicule en circulation. Protege les tiers en cas d'accident.",
      },
      {
        icon: Car,
        title: "Protection tous risques",
        description:
          "Couverture complete incluant vol, incendie, bris de glace et dommages a votre propre vehicule.",
      },
      {
        icon: Users,
        title: "Garantie conducteur",
        description:
          "Protection du conducteur et des passagers en cas de dommages corporels, meme en cas de responsabilite.",
      },
      {
        icon: Phone,
        title: "Assistance 24h/24",
        description:
          "Depannage, remorquage et vehicule de remplacement partout au Maroc, 7 jours sur 7.",
      },
      {
        icon: Scale,
        title: "Protection juridique",
        description:
          "Prise en charge des frais de defense et de recours en cas de litige lie a un accident.",
      },
      {
        icon: CircleDollarSign,
        title: "Bonus-malus avantageux",
        description:
          "Systeme de bonus progressif qui recompense les bons conducteurs avec des reductions allant jusqu'a 50%.",
      },
    ],
    coverageLevels: [
      {
        name: "Tiers simple",
        price: "A partir de 1 200 MAD/an",
        description:
          "Couverture minimale obligatoire pour circuler au Maroc.",
        features: [
          "Responsabilite civile",
          "Defense et recours",
          "Certificat d'assurance",
        ],
      },
      {
        name: "Tiers etendu",
        price: "A partir de 2 500 MAD/an",
        description:
          "Protection intermediaire avec garanties complementaires.",
        features: [
          "Responsabilite civile",
          "Vol et incendie",
          "Bris de glace",
          "Assistance depannage",
          "Protection juridique",
        ],
        popular: true,
      },
      {
        name: "Tous risques",
        price: "A partir de 4 500 MAD/an",
        description:
          "Couverture maximale pour une tranquillite d'esprit totale.",
        features: [
          "Toutes garanties tiers etendu",
          "Dommages tous accidents",
          "Garantie conducteur",
          "Vehicule de remplacement",
          "Valeur a neuf (2 ans)",
          "Catastrophes naturelles",
        ],
      },
    ],
    faqs: [
      {
        question: "L'assurance auto est-elle obligatoire au Maroc ?",
        answer:
          "Oui, l'assurance responsabilite civile automobile est obligatoire au Maroc depuis 1969 (Dahir du 20 octobre 1969). Tout vehicule terrestre a moteur doit etre assure au minimum en responsabilite civile avant de circuler sur la voie publique. Le defaut d'assurance est passible d'une amende de 400 a 4 000 MAD et d'une suspension du permis.",
      },
      {
        question: "Comment fonctionne le systeme de bonus-malus au Maroc ?",
        answer:
          "Le coefficient bonus-malus demarre a 1.00 pour un nouveau conducteur. Chaque annee sans sinistre responsable, vous gagnez un bonus de 5% (coefficient reduit de 0.05), jusqu'a un bonus maximum de 50% (coefficient 0.50). En revanche, chaque sinistre responsable entraine un malus de 25% (coefficient augmente de 0.25), avec un plafond a 3.50.",
      },
      {
        question:
          "Quels documents faut-il pour souscrire une assurance auto ?",
        answer:
          "Pour souscrire une assurance auto au Maroc, vous avez besoin de : la carte grise du vehicule, une copie de votre CIN ou passeport, le permis de conduire, le releve d'information de votre ancien assureur (si applicable), et le controle technique valide pour les vehicules de plus de 5 ans.",
      },
      {
        question: "Que faire en cas d'accident de la route ?",
        answer:
          "En cas d'accident : 1) Securisez les lieux et appelez les secours si necessaire (15 pour le SAMU, 19 pour la police). 2) Remplissez le constat amiable avec l'autre conducteur. 3) Declarez le sinistre a votre assureur dans les 5 jours ouvrables (2 jours en cas de vol). 4) Ne faites aucune reparation avant le passage de l'expert.",
      },
      {
        question:
          "Peut-on assurer un vehicule importe avec Wafir.ma ?",
        answer:
          "Oui, vous pouvez comparer les offres pour un vehicule importe. Cependant, le vehicule doit etre en regle avec la douane marocaine et dispose d'une carte grise marocaine (ou un recepisse de dedouanement). Les assureurs peuvent appliquer une prime differente selon le pays d'origine et le type de vehicule.",
      },
    ],
    relevantInsurers: [
      "wafa-assurance",
      "rma-assurance",
      "saham-assurance",
      "axa-assurance-maroc",
      "atlanta-assurance",
      "zurich-assurance",
      "allianz-maroc",
    ],
    seoContent: [
      "L'assurance automobile est le premier poste de depense en assurance pour les menages marocains. Avec plus de 4,5 millions de vehicules assures au Maroc, le marche est domine par des acteurs majeurs tels que Wafa Assurance, RMA, AXA Maroc et Sanlam. Les primes varient considerablement selon le profil du conducteur, la ville de residence, le type de vehicule et le niveau de couverture choisi. A Casablanca, les primes sont en moyenne 15% plus elevees qu'a Marrakech en raison du trafic plus dense et du taux de sinistralite superieur.",
      "Le marche marocain de l'assurance auto est supervise par l'Autorite de Controle des Assurances et de la Prevoyance Sociale (ACAPS). Cette autorite de regulation veille au respect des droits des assures et fixe les regles tarifaires minimales. Depuis la liberalisation partielle des tarifs en 2006, les assureurs disposent d'une marge de manoeuvre pour proposer des offres competitives, ce qui rend la comparaison d'autant plus importante pour les consommateurs.",
      "Wafir.ma vous permet de comparer en quelques minutes les offres d'assurance auto des principaux assureurs marocains. Notre comparateur prend en compte votre profil conducteur, les caracteristiques de votre vehicule et le niveau de couverture souhaite pour vous proposer les meilleures offres. Que vous cherchiez une assurance au tiers economique ou une couverture tous risques premium, notre outil gratuit vous aide a trouver le meilleur rapport qualite-prix.",
    ],
  },

  "assurance-habitation": {
    slug: "assurance-habitation",
    icon: Home,
    emoji: "🏡",
    heroTitle: "Assurance Habitation au Maroc",
    heroSubtitle:
      "Protegez votre logement et vos biens avec la meilleure assurance habitation. Comparaison gratuite et instantanee.",
    heroDescription:
      "Appartement ou villa, locataire ou proprietaire : trouvez la couverture adaptee a votre situation.",
    metaTitle:
      "Assurance Habitation Maroc — Comparez les Offres | Wafir.ma",
    metaDescription:
      "Comparez les assurances habitation au Maroc. Multirisque, vol, degats des eaux, incendie : obtenez le meilleur tarif pour proteger votre logement.",
    features: [
      {
        icon: Home,
        title: "Multirisque habitation",
        description:
          "Couverture globale contre incendie, degats des eaux, vol, bris de glace et catastrophes naturelles.",
      },
      {
        icon: Shield,
        title: "Responsabilite civile locative",
        description:
          "Protection obligatoire pour les locataires couvrant les dommages causes au logement du proprietaire.",
      },
      {
        icon: CircleDollarSign,
        title: "Protection du contenu",
        description:
          "Indemnisation de vos meubles, appareils electroniques et objets de valeur en cas de sinistre.",
      },
      {
        icon: Zap,
        title: "Dommages electriques",
        description:
          "Couverture des appareils electriques et electroniques contre les surtensions et courts-circuits.",
      },
      {
        icon: Users,
        title: "Responsabilite civile familiale",
        description:
          "Protection de toute la famille contre les dommages causes aux tiers dans la vie quotidienne.",
      },
      {
        icon: Phone,
        title: "Assistance domicile",
        description:
          "Intervention d'urgence pour plomberie, serrurerie et electricite, 24h/24 et 7j/7.",
      },
    ],
    coverageLevels: [
      {
        name: "Basique",
        price: "A partir de 600 MAD/an",
        description:
          "Protection essentielle pour les locataires d'appartements.",
        features: [
          "Responsabilite civile locative",
          "Incendie et explosion",
          "Degats des eaux",
          "Assistance depannage domicile",
        ],
      },
      {
        name: "Confort",
        price: "A partir de 1 200 MAD/an",
        description:
          "Couverture equilibree pour proprietaires et locataires.",
        features: [
          "Toutes garanties Basique",
          "Vol et vandalisme",
          "Bris de glace",
          "Dommages electriques",
          "RC familiale",
          "Contenu jusqu'a 200 000 MAD",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: "A partir de 2 400 MAD/an",
        description:
          "Protection maximale pour les biens de valeur et grandes surfaces.",
        features: [
          "Toutes garanties Confort",
          "Objets de valeur",
          "Catastrophes naturelles",
          "Contenu jusqu'a 500 000 MAD",
          "Relogement temporaire",
          "Jardin et dependances",
          "Piscine et annexes",
        ],
      },
    ],
    faqs: [
      {
        question:
          "L'assurance habitation est-elle obligatoire au Maroc ?",
        answer:
          "L'assurance habitation n'est pas legalement obligatoire pour les proprietaires au Maroc. Cependant, elle est vivement recommandee pour proteger votre patrimoine. Pour les locataires, la responsabilite civile locative est souvent exigee dans le contrat de bail. De plus, les banques exigent systematiquement une assurance multirisque habitation dans le cadre d'un credit immobilier.",
      },
      {
        question:
          "Que couvre une assurance multirisque habitation ?",
        answer:
          "Une assurance multirisque habitation (MRH) couvre generalement : l'incendie et l'explosion, les degats des eaux, le vol et le vandalisme, le bris de glace, les catastrophes naturelles, la responsabilite civile et les dommages electriques. Le niveau de couverture depend de la formule choisie et des options souscrites.",
      },
      {
        question:
          "Comment est calculee la prime d'assurance habitation ?",
        answer:
          "La prime depend de plusieurs criteres : la surface du logement, sa localisation (ville, quartier), le type de logement (appartement ou villa), le statut (proprietaire ou locataire), la valeur du contenu a assurer, le niveau de securite (alarme, porte blindee) et les garanties choisies.",
      },
      {
        question:
          "Que faire en cas de cambriolage ou de degat des eaux ?",
        answer:
          "En cas de cambriolage : deposez plainte aupres de la police dans les 24h et declarez le sinistre a votre assureur dans les 2 jours ouvrables. En cas de degat des eaux : coupez l'arrivee d'eau, prevenez votre voisin si necessaire, et declarez dans les 5 jours ouvrables. Dans les deux cas, rassemblez les preuves (photos, factures) et ne jetez rien avant le passage de l'expert.",
      },
      {
        question:
          "Puis-je assurer mon riad ou ma maison traditionnelle ?",
        answer:
          "Oui, les assureurs marocains proposent des couvertures adaptees aux riads et maisons traditionnelles. Certains assureurs comme Wafa Assurance et AXA Maroc offrent des formules specifiques tenant compte des particularites architecturales (zellige, bois sculpte, fontaines). La prime peut etre legerement superieure en raison de la valeur patrimoniale du bien.",
      },
    ],
    relevantInsurers: [
      "wafa-assurance",
      "rma-assurance",
      "axa-assurance-maroc",
      "atlanta-assurance",
      "saham-assurance",
      "allianz-maroc",
    ],
    seoContent: [
      "L'assurance habitation au Maroc connait une croissance reguliere, portee par le developpement du marche immobilier et la prise de conscience des risques lies au logement. Que vous soyez proprietaire d'une villa a Marrakech, locataire d'un appartement a Casablanca ou proprietaire d'un riad a Fes, une bonne assurance habitation protege votre patrimoine contre les aleas de la vie quotidienne : degats des eaux, incendie, vol ou catastrophes naturelles.",
      "Au Maroc, les principaux assureurs proposent des formules multirisque habitation allant de la couverture basique (responsabilite civile locative) a la protection premium incluant le contenu de valeur et les dependances. Les primes varient selon la localisation geographique, la surface habitable et le profil de l'assure. Dans les grandes villes comme Casablanca et Rabat, les tarifs sont generalement plus eleves en raison des risques de vol plus importants.",
      "Avec Wafir.ma, comparez facilement les offres d'assurance habitation des principaux assureurs marocains. Notre comparateur gratuit analyse votre profil et votre logement pour vous recommander les meilleures couvertures au meilleur prix. Remplissez le formulaire en 2 minutes et recevez des devis personnalises de Wafa Assurance, RMA, AXA, Sanlam et d'autres acteurs du marche.",
    ],
  },

  "mutuelle-sante": {
    slug: "mutuelle-sante",
    icon: Heart,
    emoji: "❤️",
    heroTitle: "Mutuelle Sante au Maroc",
    heroSubtitle:
      "Trouvez la meilleure complementaire sante pour vous et votre famille. Jusqu'a 80% de remboursement sur vos soins.",
    heroDescription:
      "Comparez les mutuelles sante et beneficiez d'une couverture medicale adaptee a vos besoins.",
    metaTitle:
      "Mutuelle Sante Maroc — Comparateur Complementaire | Wafir.ma",
    metaDescription:
      "Comparez les mutuelles sante au Maroc. Hospitalisation, optique, dentaire, maternite : trouvez la meilleure complementaire sante pour votre famille.",
    features: [
      {
        icon: Stethoscope,
        title: "Hospitalisation et chirurgie",
        description:
          "Prise en charge des frais d'hospitalisation, interventions chirurgicales et sejours en clinique privee.",
      },
      {
        icon: Heart,
        title: "Soins courants",
        description:
          "Remboursement des consultations medicales, analyses biologiques et imagerie medicale.",
      },
      {
        icon: CircleDollarSign,
        title: "Optique et dentaire",
        description:
          "Prise en charge des lunettes, lentilles, soins dentaires, protheses et orthodontie.",
      },
      {
        icon: Users,
        title: "Maternite et pediatrie",
        description:
          "Couverture complete de la grossesse, de l'accouchement et des soins pediatriques pour vos enfants.",
      },
      {
        icon: Umbrella,
        title: "Maladies graves",
        description:
          "Prise en charge renforcee en cas de maladie grave : cancer, maladies cardiovasculaires, AVC.",
      },
      {
        icon: Zap,
        title: "Medecine douce",
        description:
          "Remboursement des seances d'osteopathie, acupuncture, kinesitherapie et autres medecines alternatives.",
      },
    ],
    coverageLevels: [
      {
        name: "Basique",
        price: "A partir de 200 MAD/mois",
        description:
          "Couverture essentielle en complement de l'AMO/CNSS.",
        features: [
          "Hospitalisation (plafond 100 000 MAD)",
          "Consultations generalistes",
          "Analyses et radio",
          "Pharmacie (70%)",
        ],
      },
      {
        name: "Confort",
        price: "A partir de 450 MAD/mois",
        description:
          "Couverture equilibree pour les familles avec enfants.",
        features: [
          "Hospitalisation (plafond 300 000 MAD)",
          "Consultations specialistes",
          "Optique et dentaire",
          "Maternite",
          "Pharmacie (80%)",
          "Medecine douce",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: "A partir de 800 MAD/mois",
        description:
          "Couverture haut de gamme avec acces aux meilleures cliniques.",
        features: [
          "Hospitalisation illimitee",
          "Chambre individuelle",
          "Soins a l'etranger",
          "Optique et dentaire renforces",
          "Maternite premium",
          "Medecines alternatives",
          "Check-up annuel offert",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Quelle est la difference entre l'AMO et une mutuelle sante ?",
        answer:
          "L'Assurance Maladie Obligatoire (AMO) est le regime de base gere par la CNSS (secteur prive) ou la CNOPS (secteur public). Elle rembourse environ 70% des frais pour les medicaments et 90% pour l'hospitalisation, dans la limite de tarifs de reference souvent inferieurs aux tarifs reels. La mutuelle complementaire sante prend en charge le reste a payer (ticket moderateur) et offre des garanties supplementaires non couvertes par l'AMO.",
      },
      {
        question:
          "Les travailleurs independants peuvent-ils souscrire une mutuelle ?",
        answer:
          "Oui, depuis l'extension de l'AMO aux travailleurs independants et professions liberales, de nombreux assureurs proposent des complementaires sante adaptees a ce profil. Les artisans, commercants, professions liberales et auto-entrepreneurs peuvent souscrire une mutuelle individuelle pour completer leur couverture AMO-CNSS.",
      },
      {
        question: "Y a-t-il un delai de carence ?",
        answer:
          "La plupart des mutuelles sante au Maroc appliquent un delai de carence variant de 3 a 6 mois selon les garanties. L'hospitalisation est generalement couverte des le 1er mois, tandis que l'optique, le dentaire et la maternite peuvent avoir un delai de 6 a 9 mois. Certaines formules premium suppriment ces delais moyennant une surprime.",
      },
      {
        question:
          "Comment choisir entre une mutuelle individuelle et collective ?",
        answer:
          "La mutuelle collective (souscrite par l'employeur) offre generalement des tarifs plus avantageux grace a la mutualisation des risques et une couverture sans questionnaire medical. La mutuelle individuelle est plus flexible dans le choix des garanties mais peut etre plus couteuse. Si votre employeur propose une mutuelle collective, elle constitue souvent la base ideale a completer eventuellement par une surcomplementaire.",
      },
      {
        question:
          "Les soins a l'etranger sont-ils couverts ?",
        answer:
          "Cela depend de votre formule. Les mutuelles Premium incluent generalement une prise en charge des soins a l'etranger, notamment en Europe et dans les pays du Golfe. Les formules Basique et Confort se limitent aux soins au Maroc. Pour les soins programmes a l'etranger, un accord prealable de l'assureur est generalement necessaire.",
      },
    ],
    relevantInsurers: [
      "wafa-assurance",
      "rma-assurance",
      "saham-assurance",
      "axa-assurance-maroc",
      "atlanta-assurance",
      "allianz-maroc",
    ],
    seoContent: [
      "Le systeme de sante marocain repose sur deux piliers : l'Assurance Maladie Obligatoire (AMO) et les complementaires sante privees. Malgre les progres significatifs de la couverture medicale universelle, les remboursements de base ne couvrent pas toujours l'integralite des frais medicaux, notamment dans le secteur prive. C'est la que la mutuelle sante complementaire intervient, en prenant en charge le ticket moderateur et les depassements d'honoraires.",
      "Au Maroc, les depenses de sante des menages representent en moyenne 50% du cout total des soins, un chiffre qui souligne l'importance d'une bonne couverture complementaire. Les cliniques privees de Casablanca, Rabat et Marrakech pratiquent des tarifs souvent superieurs aux tarifs de reference de l'AMO, rendant indispensable la souscription d'une mutuelle pour eviter des restes a charge importants, surtout en cas d'hospitalisation.",
      "Wafir.ma vous aide a comparer les mutuelles sante des principaux assureurs marocains. Notre comparateur gratuit analyse votre profil familial, vos besoins en soins courants, hospitalisation, optique et dentaire pour vous recommander les offres les plus adaptees. Comparez Wafa Assurance, RMA, AXA, Sanlam et Allianz en quelques clics et obtenez des devis personnalises.",
    ],
  },

  "assurance-vie": {
    slug: "assurance-vie",
    icon: Sprout,
    emoji: "🌱",
    heroTitle: "Assurance Vie au Maroc",
    heroSubtitle:
      "Protegez vos proches et constituez une epargne pour l'avenir. Des solutions sur mesure pour chaque etape de votre vie.",
    heroDescription:
      "Comparez les contrats d'assurance vie et trouvez le meilleur rendement pour votre epargne.",
    metaTitle:
      "Assurance Vie Maroc — Comparez les Contrats | Wafir.ma",
    metaDescription:
      "Comparez les assurances vie au Maroc. Epargne, retraite, deces, education : trouvez le contrat adapte a vos objectifs patrimoniaux.",
    features: [
      {
        icon: Sprout,
        title: "Epargne et capitalisation",
        description:
          "Constituez un capital grace a des versements reguliers ou libres, avec un rendement garanti et une participation aux benefices.",
      },
      {
        icon: Shield,
        title: "Protection deces",
        description:
          "Versement d'un capital ou d'une rente a vos beneficiaires en cas de deces, garantissant la securite financiere de votre famille.",
      },
      {
        icon: Clock,
        title: "Complement retraite",
        description:
          "Preparez votre retraite avec des solutions d'epargne a long terme offrant des avantages fiscaux significatifs.",
      },
      {
        icon: FileText,
        title: "Avantages fiscaux",
        description:
          "Deductibilite des primes de votre revenu imposable dans la limite de 50% du salaire net et avantages a la sortie.",
      },
      {
        icon: CircleDollarSign,
        title: "Fonds en dirhams garanti",
        description:
          "Placement securise sur le fonds en dirhams avec un taux de rendement minimum garanti chaque annee.",
      },
      {
        icon: Zap,
        title: "Unites de compte",
        description:
          "Investissez dans des fonds diversifies (actions, obligations, OPCVM) pour viser un rendement superieur a long terme.",
      },
    ],
    coverageLevels: [
      {
        name: "Basique",
        price: "A partir de 300 MAD/mois",
        description:
          "Contrat d'epargne simple avec garantie en capital.",
        features: [
          "Capital garanti a 100%",
          "Taux garanti 2,5%/an",
          "Participation aux benefices",
          "Rachat partiel apres 2 ans",
        ],
      },
      {
        name: "Confort",
        price: "A partir de 600 MAD/mois",
        description:
          "Contrat mixte epargne et prevoyance pour les familles.",
        features: [
          "Capital garanti + participation benefices",
          "Garantie deces (200% du capital)",
          "Garantie invalidite",
          "Exoneration des primes en cas d'arret",
          "Avantages fiscaux optimises",
          "Versements libres possibles",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: "A partir de 1 500 MAD/mois",
        description:
          "Solution patrimoniale complete avec gestion dediee.",
        features: [
          "Multi-supports (dirhams + UC)",
          "Gestion pilotee ou libre",
          "Garantie deces majoree",
          "Options de rente viagere",
          "Conseiller dedie",
          "Avance sur contrat",
          "Clause beneficiaire sur mesure",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Quels sont les avantages fiscaux de l'assurance vie au Maroc ?",
        answer:
          "Au Maroc, les primes d'assurance vie sont deductibles du revenu imposable dans la limite de 50% du salaire net imposable pour les contrats d'au moins 8 ans. A la sortie, si le contrat est denoue apres 8 ans, le capital rachete beneficie d'un abattement de 40% sur les produits imposables. Les contrats retraite complementaire beneficient d'avantages fiscaux encore plus importants.",
      },
      {
        question:
          "Quelle est la difference entre assurance vie et assurance deces ?",
        answer:
          "L'assurance vie est un produit d'epargne a long terme : vous constituez un capital que vous pouvez recuperer de votre vivant (rachat) ou transmettre a vos beneficiaires. L'assurance deces est un contrat de prevoyance pure : les primes sont a fonds perdus mais garantissent le versement d'un capital a vos proches en cas de deces pendant la duree du contrat.",
      },
      {
        question:
          "Peut-on effectuer des rachats partiels sur un contrat ?",
        answer:
          "Oui, la plupart des contrats d'assurance vie au Maroc autorisent les rachats partiels apres une periode minimale (generalement 2 ans). Le montant rachetable depend de la valeur de rachat du contrat. Attention : un rachat avant 8 ans peut entrainer la perte des avantages fiscaux. Certains contrats proposent egalement l'avance sur police comme alternative au rachat.",
      },
      {
        question:
          "Comment sont designes les beneficiaires ?",
        answer:
          "La designation des beneficiaires se fait dans la clause beneficiaire du contrat. Vous pouvez designer nommement une ou plusieurs personnes, ou utiliser une formule generique (conjoint, enfants, heritiers). La clause peut etre modifiee a tout moment. En droit marocain, les regles successorales islamiques (al-irth) s'appliquent par defaut si aucun beneficiaire n'est designe.",
      },
      {
        question:
          "Quel rendement attendre d'une assurance vie au Maroc ?",
        answer:
          "Le rendement depend du type de contrat. Les fonds en dirhams (securises) offrent generalement entre 2,5% et 4% par an, selon l'assureur et les conditions de marche. Les unites de compte (investies en actions et obligations) peuvent offrir des rendements superieurs a long terme (6-8% en moyenne historique) mais avec un risque de perte en capital. Le rendement passe ne garantit pas les performances futures.",
      },
    ],
    relevantInsurers: [
      "wafa-assurance",
      "rma-assurance",
      "saham-assurance",
      "axa-assurance-maroc",
      "allianz-maroc",
      "atlanta-assurance",
    ],
    seoContent: [
      "L'assurance vie est le deuxieme segment le plus important du marche marocain de l'assurance, representant environ 40% des primes collectees. Ce produit polyvalent repond a plusieurs objectifs patrimoniaux : constituer une epargne, preparer sa retraite, proteger ses proches et optimiser sa fiscalite. Avec la reforme du systeme de retraite marocain et la prise de conscience de la necessite de completer ses revenus futurs, l'assurance vie connait une croissance soutenue.",
      "Les principaux acteurs du marche — Wafa Assurance, RMA, AXA Maroc et Sanlam — proposent des gammes variees de contrats d'assurance vie, allant des contrats en dirhams securises aux contrats multisupports plus dynamiques. Les taux de rendement des fonds en dirhams se situent generalement entre 2,5% et 4% par an, ce qui reste competitif par rapport aux autres placements disponibles au Maroc. L'avantage fiscal represente un atout majeur pour les salaries imposables.",
      "Wafir.ma simplifie la comparaison des contrats d'assurance vie au Maroc. Notre outil gratuit analyse vos objectifs (epargne, retraite, prevoyance), votre horizon de placement et votre profil de risque pour vous recommander les contrats les plus adaptes. Comparez les rendements, frais et garanties des principaux assureurs en toute transparence.",
    ],
  },

  "assurance-voyage": {
    slug: "assurance-voyage",
    icon: Plane,
    emoji: "✈️",
    heroTitle: "Assurance Voyage au Maroc",
    heroSubtitle:
      "Voyagez l'esprit tranquille avec une assurance voyage complete. Couverture medicale, annulation et bagages.",
    heroDescription:
      "Indispensable pour les visas Schengen et les voyages internationaux. Comparez les offres en 2 minutes.",
    metaTitle:
      "Assurance Voyage Maroc — Comparateur en Ligne | Wafir.ma",
    metaDescription:
      "Comparez les assurances voyage au Maroc. Visa Schengen, frais medicaux, annulation, bagages : trouvez la couverture ideale pour vos deplacements a l'etranger.",
    features: [
      {
        icon: Stethoscope,
        title: "Frais medicaux a l'etranger",
        description:
          "Prise en charge des frais d'hospitalisation, de consultation et de medicaments jusqu'a 150 000 EUR.",
      },
      {
        icon: Plane,
        title: "Rapatriement sanitaire",
        description:
          "Organisation et prise en charge du rapatriement medical vers le Maroc en cas d'accident ou de maladie grave.",
      },
      {
        icon: FileText,
        title: "Annulation de voyage",
        description:
          "Remboursement des frais d'annulation en cas de maladie, accident, deces d'un proche ou evenement imprevu.",
      },
      {
        icon: Shield,
        title: "Perte de bagages",
        description:
          "Indemnisation en cas de perte, vol ou deterioration de vos bagages pendant le voyage.",
      },
      {
        icon: Scale,
        title: "Responsabilite civile a l'etranger",
        description:
          "Couverture des dommages causes aux tiers lors de votre sejour a l'etranger.",
      },
      {
        icon: Phone,
        title: "Assistance 24h/24",
        description:
          "Plateforme d'assistance joignable en permanence pour toute urgence pendant votre voyage.",
      },
    ],
    coverageLevels: [
      {
        name: "Basique",
        price: "A partir de 150 MAD/voyage",
        description:
          "Couverture minimale pour les visas Schengen et courts sejours.",
        features: [
          "Frais medicaux (30 000 EUR)",
          "Rapatriement sanitaire",
          "Assistance 24h/24",
          "Responsabilite civile",
        ],
      },
      {
        name: "Confort",
        price: "A partir de 350 MAD/voyage",
        description:
          "Couverture complete pour des voyages sereinement planifies.",
        features: [
          "Frais medicaux (100 000 EUR)",
          "Rapatriement et retour anticipe",
          "Annulation voyage (5 000 EUR)",
          "Bagages (1 500 EUR)",
          "Retard d'avion",
          "Assistance juridique",
        ],
        popular: true,
      },
      {
        name: "Premium",
        price: "A partir de 600 MAD/voyage",
        description:
          "Protection maximale pour les voyageurs frequents et longs sejours.",
        features: [
          "Frais medicaux (150 000 EUR)",
          "Annulation toutes causes",
          "Bagages (3 000 EUR)",
          "Sports et activites a risque",
          "Multi-voyages annuel",
          "Interruption de voyage",
          "Protection electronique",
        ],
      },
    ],
    faqs: [
      {
        question:
          "L'assurance voyage est-elle obligatoire pour un visa Schengen ?",
        answer:
          "Oui, une assurance voyage est exigee pour obtenir un visa Schengen. Elle doit couvrir les frais medicaux a hauteur d'au moins 30 000 EUR, inclure le rapatriement sanitaire et etre valable pour l'ensemble des pays de l'espace Schengen pendant toute la duree du sejour. L'attestation d'assurance doit etre jointe au dossier de demande de visa.",
      },
      {
        question:
          "Quels sont les pays couverts par l'assurance voyage ?",
        answer:
          "La couverture depend du contrat souscrit. La plupart des formules couvrent le monde entier, mais certaines excluent les pays en conflit ou sous sanctions. Pour les visas Schengen, la couverture doit inclure les 27 pays membres. Verifiez toujours la zone geographique couverte avant de souscrire, surtout si vous voyagez aux Etats-Unis ou au Canada (primes plus elevees).",
      },
      {
        question:
          "Que faire en cas de probleme medical a l'etranger ?",
        answer:
          "Contactez immediatement la plateforme d'assistance mentionnee sur votre carte d'assurance (numero disponible 24h/24). L'assureur organisera votre prise en charge : orientation vers un medecin ou hopital agree, paiement direct des frais si possible, et rapatriement si necessaire. Conservez tous les justificatifs (ordonnances, factures, rapports medicaux) pour le remboursement.",
      },
      {
        question:
          "L'annulation de voyage est-elle automatiquement couverte ?",
        answer:
          "Non, l'assurance annulation est une garantie optionnelle dans la formule Basique. Elle est incluse dans les formules Confort et Premium. Les motifs d'annulation couverts varient : maladie grave, accident, deces d'un proche, licenciement, et parfois refus de visa. La formule Premium peut inclure l'annulation 'toutes causes' pour une flexibilite maximale.",
      },
      {
        question:
          "Peut-on souscrire une assurance voyage pour la famille ?",
        answer:
          "Oui, la plupart des assureurs proposent des formules familiales avec un tarif avantageux. Elles couvrent generalement le souscripteur, son conjoint et ses enfants de moins de 18 ans (ou 25 ans s'ils sont etudiants). Certains contrats proposent un tarif forfaitaire famille quel que soit le nombre d'enfants. C'est souvent plus economique que des contrats individuels separes.",
      },
    ],
    relevantInsurers: [
      "wafa-assurance",
      "axa-assurance-maroc",
      "saham-assurance",
      "rma-assurance",
      "allianz-maroc",
      "zurich-assurance",
    ],
    seoContent: [
      "L'assurance voyage est devenue incontournable pour les Marocains voyageant a l'etranger. Que ce soit pour un visa Schengen (qui exige une couverture medicale minimale de 30 000 EUR), un voyage d'affaires ou des vacances, une bonne assurance voyage vous protege contre les imprevus : frais medicaux, annulation, perte de bagages ou rapatriement sanitaire. Chaque annee, des milliers de Marocains font face a des situations d'urgence a l'etranger sans couverture adequate.",
      "Le marche marocain propose plusieurs types d'assurances voyage : les contrats individuels par voyage, les formules multi-voyages annuelles pour les voyageurs frequents, et les assurances specifiques pour les etudiants a l'etranger ou les travailleurs expatries. Les tarifs varient significativement selon la destination, la duree du sejour, l'age du voyageur et le niveau de couverture. Les Etats-Unis et le Canada sont les destinations les plus couteuses a assurer en raison des frais medicaux tres eleves.",
      "Wafir.ma compare pour vous les offres d'assurance voyage des principaux assureurs marocains. Que vous ayez besoin d'une attestation pour votre demande de visa Schengen ou d'une couverture complete pour un tour du monde, notre comparateur gratuit vous aide a trouver la meilleure offre en quelques clics. Renseignez votre destination, vos dates et le nombre de voyageurs pour obtenir des devis instantanes.",
    ],
  },
};

// ---------------------------------------------------------------------------
// Valid slugs
// ---------------------------------------------------------------------------

const VALID_SLUGS: InsuranceSlug[] = [
  "assurance-auto",
  "assurance-habitation",
  "mutuelle-sante",
  "assurance-vie",
  "assurance-voyage",
];

// ---------------------------------------------------------------------------
// generateStaticParams
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    VALID_SLUGS.map((slug) => ({ locale, slug }))
  );
}

// ---------------------------------------------------------------------------
// generateMetadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const data = INSURANCE_DATA[slug as InsuranceSlug];

  if (!data) {
    return { title: "Page non trouvee" };
  }

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://wafir.ma/${locale}/assurance/${slug}`,
      languages: {
        fr: `/fr/assurance/${slug}`,
        ar: `/ar/assurance/${slug}`,
        en: `/en/assurance/${slug}`,
      },
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://wafir.ma/${locale}/assurance/${slug}`,
      siteName: "Wafir.ma",
      locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_FR",
      type: "website",
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function InsuranceCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const data = INSURANCE_DATA[slug as InsuranceSlug];

  if (!data) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === slug);
  const relevantCompanies = INSURANCE_COMPANIES.filter((company) =>
    data.relevantInsurers.includes(company.slug)
  );

  const HeroIcon = data.icon;

  return (
    <>
      {/* ================================================================= */}
      {/* Hero Section                                                       */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0984e3]/10 via-background to-[#0984e3]/5">
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#0984e3]/5 blur-3xl" />
          <div className="absolute bottom-0 -left-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-[#0984e3]/10 text-[#0984e3] border border-[#0984e3]/20"
            >
              <HeroIcon className="mr-1 h-3.5 w-3.5" />
              {category?.nameFr ?? data.heroTitle}
            </Badge>

            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl mb-4 leading-tight">
              {data.heroTitle}
            </h1>

            <p className="text-lg text-muted-foreground md:text-xl mb-4 leading-relaxed">
              {data.heroSubtitle}
            </p>

            <p className="text-sm text-muted-foreground mb-8">
              {data.heroDescription}
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-[#0984e3] hover:bg-[#0984e3]/90 text-white"
                asChild
              >
                <Link href={`/${locale}/outils/comparateur-assurance-auto`}>
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Comparer les offres
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/${locale}/outils`}>
                  Voir tous les outils
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-primary" />
                100% gratuit
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                Resultat en 2 min
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-primary" />
                {relevantCompanies.length} assureurs compares
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Key Features Section                                               */}
      {/* ================================================================= */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-3">
            Garanties et couvertures
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Decouvrez les principales garanties incluses dans une{" "}
            {category?.nameFr.toLowerCase() ?? "assurance"} au Maroc.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-md transition-all duration-200 hover:border-[#0984e3]/30">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0984e3]/10 text-[#0984e3] group-hover:bg-[#0984e3] group-hover:text-white transition-colors">
                    <FeatureIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ================================================================= */}
      {/* Coverage Levels Section                                            */}
      {/* ================================================================= */}
      <section className="bg-[var(--surface)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-3">
              Niveaux de couverture
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choisissez le niveau de protection adapte a vos besoins et a votre
              budget.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {data.coverageLevels.map((level, index) => (
              <Card
                key={index}
                className={`relative flex flex-col transition-all duration-200 hover:shadow-lg ${
                  level.popular
                    ? "border-[#0984e3] shadow-md ring-1 ring-[#0984e3]/20"
                    : "hover:border-[#0984e3]/30"
                }`}
              >
                {level.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#0984e3] text-white">
                      <Star className="mr-1 h-3 w-3" />
                      Le plus populaire
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{level.name}</CardTitle>
                  <CardDescription>{level.description}</CardDescription>
                  <p className="mt-2 text-2xl font-bold text-[#0984e3]">
                    {level.price}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {level.features.map((feat, featIndex) => (
                      <li key={featIndex} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button
                    className={`w-full ${
                      level.popular
                        ? "bg-[#0984e3] hover:bg-[#0984e3]/90 text-white"
                        : ""
                    }`}
                    variant={level.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href={`/${locale}/outils/comparateur-assurance-auto`}>
                      Obtenir un devis
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Insurance Companies Comparison                                      */}
      {/* ================================================================= */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-3">
            Assureurs partenaires
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Comparez les offres de {category?.nameFr.toLowerCase() ?? "assurance"}{" "}
            des principaux assureurs marocains.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[var(--surface)]">
                    <TableHead className="ps-6">Assureur</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Site web</TableHead>
                    <TableHead className="text-end pe-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {relevantCompanies.map((company) => (
                    <TableRow key={company.slug}>
                      <TableCell className="ps-6 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0984e3]/10 text-[#0984e3]">
                            <Shield className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              {company.nameFr}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {company.nameAr}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {company.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {company.website ? (
                          <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#0984e3] hover:underline"
                          >
                            {new URL(company.website).hostname}
                          </a>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-end pe-6">
                        <Button size="sm" variant="outline" asChild>
                          <Link
                            href={`/${locale}/outils/comparateur-assurance-auto`}
                          >
                            Comparer
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Mobile cards */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {relevantCompanies.map((company) => (
            <Card key={company.slug} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0984e3]/10 text-[#0984e3]">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {company.nameFr}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {company.nameAr}
                    </p>
                  </div>
                  <Badge variant="secondary" className="capitalize text-xs">
                    {company.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  {company.website ? (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#0984e3] hover:underline"
                    >
                      {new URL(company.website).hostname}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                  <Button size="sm" variant="outline" asChild>
                    <Link
                      href={`/${locale}/outils/comparateur-assurance-auto`}
                    >
                      Comparer
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* FAQ Section                                                        */}
      {/* ================================================================= */}
      <section className="bg-[var(--surface)] py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-3">
                Questions frequentes
              </h2>
              <p className="text-muted-foreground">
                Les reponses aux questions les plus posees sur{" "}
                {category?.nameFr
                  ? `l'${category.nameFr.toLowerCase()}`
                  : "cette assurance"}{" "}
                au Maroc.
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {data.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
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

      {/* ================================================================= */}
      {/* SEO Content Section                                                */}
      {/* ================================================================= */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-6">
            Tout savoir sur {category?.nameFr ? `l'${category.nameFr.toLowerCase()}` : "cette assurance"} au Maroc
          </h2>
          <div className="space-y-4">
            {data.seoContent.map((paragraph, index) => (
              <p
                key={index}
                className="text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* CTA Section                                                        */}
      {/* ================================================================= */}
      <section className="container mx-auto px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="bg-gradient-to-br from-[#0984e3] to-[#0984e3]/80 p-8 md:p-12 text-center text-white">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <HeroIcon className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold md:text-3xl mb-3">
                Comparez les offres d&apos;{category?.nameFr.toLowerCase() ?? "assurance"} maintenant
              </h2>
              <p className="mb-6 text-white/90 max-w-lg mx-auto">
                Trouvez la meilleure couverture au meilleur prix en comparant
                gratuitement les offres de {relevantCompanies.length} assureurs
                marocains. Resultat en 2 minutes.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="bg-white text-[#0984e3] hover:bg-white/90 font-semibold"
                  asChild
                >
                  <Link href={`/${locale}/outils/comparateur-assurance-auto`}>
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Comparer les offres
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href={`https://wa.me/212600000000?text=Bonjour, je souhaite comparer les offres d'${category?.nameFr.toLowerCase() ?? "assurance"}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    Nous contacter
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-white/70">
                Service 100% gratuit et sans engagement — Aucune carte bancaire
                requise
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* ================================================================= */}
      {/* Other Insurance Categories                                         */}
      {/* ================================================================= */}
      <section className="bg-[var(--surface)] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl mb-3">
              Autres types d&apos;assurance
            </h2>
            <p className="text-muted-foreground">
              Decouvrez toutes nos categories d&apos;assurance a comparer.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALID_SLUGS.filter((s) => s !== slug).map((otherSlug) => {
              const otherData = INSURANCE_DATA[otherSlug];
              const otherCategory = CATEGORIES.find(
                (c) => c.slug === otherSlug
              );
              const OtherIcon = otherData.icon;
              return (
                <Link
                  key={otherSlug}
                  href={`/${locale}/assurance/${otherSlug}`}
                >
                  <Card className="group h-full cursor-pointer hover:shadow-md transition-all duration-200 hover:border-[#0984e3]/30">
                    <CardContent className="flex items-center gap-4 p-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0984e3]/10 text-[#0984e3] group-hover:bg-[#0984e3] group-hover:text-white transition-colors">
                        <OtherIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-[#0984e3] transition-colors truncate">
                          {otherCategory?.nameFr ?? otherSlug}
                        </h3>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-[#0984e3] transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
