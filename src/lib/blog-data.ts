// ==========================================
// Blog articles data — hardcoded for now
// Will be replaced by CMS/DB later
// ==========================================

export type BlogCategory =
  | "CREDIT"
  | "ASSURANCE"
  | "FINANCE_PARTICIPATIVE"
  | "GUIDES"
  | "ACTUALITES";

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string; // initials for placeholder
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string; // ISO date
  updatedAt: string;
  readTime: number; // minutes
  author: BlogAuthor;
  imagePlaceholderColor: string;
  imageAlt: string;
  tags: string[];
  featured: boolean;
}

export const BLOG_CATEGORIES: {
  value: BlogCategory | "ALL";
  label: string;
  color: string;
}[] = [
  { value: "ALL", label: "Tous", color: "bg-foreground text-background" },
  { value: "CREDIT", label: "Crédit", color: "bg-emerald-100 text-emerald-700" },
  { value: "ASSURANCE", label: "Assurance", color: "bg-blue-100 text-blue-700" },
  {
    value: "FINANCE_PARTICIPATIVE",
    label: "Finance Participative",
    color: "bg-purple-100 text-purple-700",
  },
  { value: "GUIDES", label: "Guides", color: "bg-amber-100 text-amber-700" },
  { value: "ACTUALITES", label: "Actualités", color: "bg-rose-100 text-rose-700" },
];

export function getCategoryLabel(category: BlogCategory): string {
  return (
    BLOG_CATEGORIES.find((c) => c.value === category)?.label ?? category
  );
}

export function getCategoryColor(category: BlogCategory): string {
  return (
    BLOG_CATEGORIES.find((c) => c.value === category)?.color ??
    "bg-muted text-muted-foreground"
  );
}

export const AUTHORS: Record<string, BlogAuthor> = {
  yasmine: {
    name: "Yasmine El Amrani",
    role: "Experte Crédit",
    avatar: "YA",
  },
  karim: {
    name: "Karim Bennani",
    role: "Conseiller Assurance",
    avatar: "KB",
  },
  fatima: {
    name: "Fatima Zahra Idrissi",
    role: "Rédactrice Finance",
    avatar: "FI",
  },
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "guide-credit-immobilier-maroc-2025",
    title: "Guide complet du crédit immobilier au Maroc en 2025",
    excerpt:
      "Taux, conditions, démarches et pièges à éviter : tout ce qu'il faut savoir avant de souscrire un crédit immobilier au Maroc. Comparatif des offres des principales banques marocaines.",
    category: "CREDIT",
    publishedAt: "2025-01-15",
    updatedAt: "2025-02-20",
    readTime: 12,
    author: AUTHORS.yasmine,
    imagePlaceholderColor: "from-emerald-400 to-teal-600",
    imageAlt: "Guide crédit immobilier Maroc 2025",
    tags: ["crédit immobilier", "taux", "banques", "maroc"],
    featured: true,
  },
  {
    slug: "mourabaha-vs-credit-classique",
    title: "Mourabaha vs crédit classique : quelle option choisir ?",
    excerpt:
      "Finance participative ou crédit conventionnel ? Analyse détaillée des avantages, inconvénients et coûts réels de chaque formule pour votre projet immobilier au Maroc.",
    category: "FINANCE_PARTICIPATIVE",
    publishedAt: "2025-01-08",
    updatedAt: "2025-01-08",
    readTime: 9,
    author: AUTHORS.fatima,
    imagePlaceholderColor: "from-purple-400 to-violet-600",
    imageAlt: "Mourabaha vs crédit classique au Maroc",
    tags: ["mourabaha", "finance participative", "crédit immobilier"],
    featured: true,
  },
  {
    slug: "reduire-cout-assurance-auto-maroc",
    title: "Comment réduire le coût de votre assurance auto au Maroc",
    excerpt:
      "Découvrez 8 astuces concrètes pour payer moins cher votre assurance automobile tout en gardant une couverture optimale. Bonus : tableau comparatif des tarifs 2025.",
    category: "ASSURANCE",
    publishedAt: "2024-12-20",
    updatedAt: "2025-01-10",
    readTime: 7,
    author: AUTHORS.karim,
    imagePlaceholderColor: "from-blue-400 to-cyan-600",
    imageAlt: "Réduire le coût assurance auto Maroc",
    tags: ["assurance auto", "économies", "comparatif"],
    featured: false,
  },
  {
    slug: "erreurs-rachat-credit",
    title: "Les 5 erreurs à éviter lors d'un rachat de crédit",
    excerpt:
      "Le rachat de crédit peut vous faire économiser des milliers de dirhams, mais attention aux pièges. Voici les erreurs les plus courantes et comment les éviter.",
    category: "CREDIT",
    publishedAt: "2024-12-10",
    updatedAt: "2024-12-10",
    readTime: 6,
    author: AUTHORS.yasmine,
    imagePlaceholderColor: "from-orange-400 to-red-500",
    imageAlt: "Erreurs rachat de crédit",
    tags: ["rachat de crédit", "erreurs", "conseils"],
    featured: false,
  },
  {
    slug: "mutuelle-sante-maroc-guide",
    title: "Tout savoir sur la mutuelle santé au Maroc",
    excerpt:
      "AMO, mutuelle complémentaire, assurance maladie privée : comprendre le système de santé marocain et choisir la couverture adaptée à votre situation et votre budget.",
    category: "ASSURANCE",
    publishedAt: "2024-11-25",
    updatedAt: "2025-01-05",
    readTime: 10,
    author: AUTHORS.karim,
    imagePlaceholderColor: "from-pink-400 to-rose-600",
    imageAlt: "Guide mutuelle santé Maroc",
    tags: ["mutuelle santé", "AMO", "couverture médicale"],
    featured: false,
  },
  {
    slug: "calculer-capacite-emprunt-guide",
    title: "Calculer sa capacité d'emprunt : le guide pratique",
    excerpt:
      "Salaire, charges, taux d'endettement, apport personnel : apprenez à calculer précisément combien vous pouvez emprunter auprès d'une banque marocaine.",
    category: "GUIDES",
    publishedAt: "2024-11-15",
    updatedAt: "2024-12-01",
    readTime: 8,
    author: AUTHORS.fatima,
    imagePlaceholderColor: "from-amber-400 to-yellow-600",
    imageAlt: "Calculer capacité d'emprunt au Maroc",
    tags: ["capacité d'emprunt", "simulation", "calculatrice"],
    featured: false,
  },
  {
    slug: "taux-directeur-bank-al-maghrib-2025",
    title: "Bank Al-Maghrib maintient le taux directeur à 2,75% : impact sur vos crédits",
    excerpt:
      "Décryptage de la dernière décision de Bank Al-Maghrib et ses conséquences concrètes sur les taux des crédits immobiliers et à la consommation au Maroc.",
    category: "ACTUALITES",
    publishedAt: "2025-01-20",
    updatedAt: "2025-01-20",
    readTime: 5,
    author: AUTHORS.fatima,
    imagePlaceholderColor: "from-slate-400 to-gray-600",
    imageAlt: "Taux directeur Bank Al-Maghrib 2025",
    tags: ["taux directeur", "Bank Al-Maghrib", "politique monétaire"],
    featured: false,
  },
  {
    slug: "assurance-habitation-obligatoire-maroc",
    title: "L'assurance habitation est-elle obligatoire au Maroc ?",
    excerpt:
      "Locataire ou propriétaire, découvrez vos obligations légales en matière d'assurance habitation et les garanties essentielles à souscrire pour protéger votre logement.",
    category: "ASSURANCE",
    publishedAt: "2024-11-01",
    updatedAt: "2024-11-01",
    readTime: 6,
    author: AUTHORS.karim,
    imagePlaceholderColor: "from-teal-400 to-green-600",
    imageAlt: "Assurance habitation obligatoire Maroc",
    tags: ["assurance habitation", "obligation", "locataire", "propriétaire"],
    featured: false,
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(
  currentSlug: string,
  limit = 3,
): BlogArticle[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return BLOG_ARTICLES.slice(0, limit);

  // Prioritize same category, then recent
  const sameCategory = BLOG_ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.category === current.category,
  );
  const others = BLOG_ARTICLES.filter(
    (a) => a.slug !== currentSlug && a.category !== current.category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ==========================================
// Full article content — for the detail pages
// ==========================================

export const ARTICLE_CONTENTS: Record<string, { toc: { id: string; title: string }[]; html: string }> = {
  "guide-credit-immobilier-maroc-2025": {
    toc: [
      { id: "marche-immobilier", title: "Le marché immobilier marocain en 2025" },
      { id: "taux-actuels", title: "Les taux actuels des banques" },
      { id: "conditions-eligibilite", title: "Conditions d'éligibilité" },
      { id: "documents-necessaires", title: "Documents nécessaires" },
      { id: "etapes-demande", title: "Les étapes de la demande" },
      { id: "negocier-taux", title: "Comment négocier son taux" },
      { id: "assurance-emprunteur", title: "L'assurance emprunteur" },
      { id: "conseils-wafir", title: "Les conseils Wafir.ma" },
    ],
    html: `
<p class="text-lg text-muted-foreground leading-relaxed mb-6">
  Le crédit immobilier reste le levier principal pour accéder à la propriété au Maroc. En 2025, les conditions ont évolué avec le maintien du taux directeur de Bank Al-Maghrib à 2,75% et l'intensification de la concurrence entre banques. Ce guide vous accompagne étape par étape.
</p>

<h2 id="marche-immobilier" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Le marché immobilier marocain en 2025</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  Le secteur immobilier marocain connaît une phase de stabilisation après les ajustements post-pandémie. Les prix se sont consolidés dans les grandes villes comme Casablanca, Rabat et Marrakech, tandis que les villes secondaires comme Tanger et Agadir offrent encore des opportunités intéressantes.
</p>
<p class="text-muted-foreground leading-relaxed mb-4">
  La demande reste soutenue, portée par une classe moyenne en croissance et les programmes d'aide à l'accession à la propriété lancés par le gouvernement. Le programme <strong>« Daam Sakane »</strong> apporte un soutien direct de 100 000 MAD pour les primo-accédants, rendant l'achat plus accessible.
</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
  <p class="font-semibold text-foreground mb-2">Bon à savoir</p>
  <p class="text-sm text-muted-foreground">
    Le programme Daam Sakane est accessible aux Marocains dont le revenu mensuel net ne dépasse pas 20 000 MAD, pour un bien dont le prix ne dépasse pas 700 000 MAD (TTC).
  </p>
</div>

<h2 id="taux-actuels" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Les taux actuels des banques</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  En janvier 2025, les taux des crédits immobiliers au Maroc oscillent entre <strong>3,5% et 5,5%</strong> selon les banques, la durée du prêt et le profil de l'emprunteur. Voici un aperçu des fourchettes pratiquées :
</p>

<div class="overflow-x-auto mb-6">
  <table class="w-full border-collapse text-sm">
    <thead>
      <tr class="border-b border-border">
        <th class="text-start py-3 px-4 font-semibold text-foreground">Banque</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Taux fixe</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Taux variable</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Durée max</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-border/50">
        <td class="py-3 px-4 text-foreground">Attijariwafa Bank</td>
        <td class="py-3 px-4 text-muted-foreground">4,10% — 5,20%</td>
        <td class="py-3 px-4 text-muted-foreground">3,60% — 4,50%</td>
        <td class="py-3 px-4 text-muted-foreground">25 ans</td>
      </tr>
      <tr class="border-b border-border/50">
        <td class="py-3 px-4 text-foreground">BMCE Bank of Africa</td>
        <td class="py-3 px-4 text-muted-foreground">4,00% — 5,00%</td>
        <td class="py-3 px-4 text-muted-foreground">3,50% — 4,30%</td>
        <td class="py-3 px-4 text-muted-foreground">25 ans</td>
      </tr>
      <tr class="border-b border-border/50">
        <td class="py-3 px-4 text-foreground">Banque Populaire</td>
        <td class="py-3 px-4 text-muted-foreground">3,90% — 4,80%</td>
        <td class="py-3 px-4 text-muted-foreground">3,50% — 4,20%</td>
        <td class="py-3 px-4 text-muted-foreground">25 ans</td>
      </tr>
      <tr class="border-b border-border/50">
        <td class="py-3 px-4 text-foreground">CIH Bank</td>
        <td class="py-3 px-4 text-muted-foreground">3,80% — 4,70%</td>
        <td class="py-3 px-4 text-muted-foreground">3,40% — 4,10%</td>
        <td class="py-3 px-4 text-muted-foreground">30 ans</td>
      </tr>
      <tr>
        <td class="py-3 px-4 text-foreground">Crédit du Maroc</td>
        <td class="py-3 px-4 text-muted-foreground">4,20% — 5,30%</td>
        <td class="py-3 px-4 text-muted-foreground">3,70% — 4,60%</td>
        <td class="py-3 px-4 text-muted-foreground">25 ans</td>
      </tr>
    </tbody>
  </table>
</div>

<p class="text-sm text-muted-foreground italic mb-6">
  * Les taux indiqués sont à titre indicatif et peuvent varier selon le profil de l'emprunteur. Utilisez notre <a href="/fr/outils/simulateur-credit-immobilier" class="text-primary hover:underline">simulateur de crédit immobilier</a> pour obtenir une estimation personnalisée.
</p>

<h2 id="conditions-eligibilite" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Conditions d'éligibilité</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  Pour obtenir un crédit immobilier au Maroc, vous devez généralement remplir les conditions suivantes :
</p>
<ul class="space-y-2 mb-6 ms-4">
  <li class="flex items-start gap-2 text-muted-foreground">
    <span class="text-primary mt-1.5 shrink-0">&#x2713;</span>
    <span>Être résident marocain ou MRE (Marocain Résident à l'Étranger)</span>
  </li>
  <li class="flex items-start gap-2 text-muted-foreground">
    <span class="text-primary mt-1.5 shrink-0">&#x2713;</span>
    <span>Avoir un taux d'endettement inférieur à <strong class="text-foreground">45%</strong> (certaines banques acceptent jusqu'à 50%)</span>
  </li>
  <li class="flex items-start gap-2 text-muted-foreground">
    <span class="text-primary mt-1.5 shrink-0">&#x2713;</span>
    <span>Disposer d'un apport personnel minimum de <strong class="text-foreground">10% à 20%</strong> du prix du bien</span>
  </li>
  <li class="flex items-start gap-2 text-muted-foreground">
    <span class="text-primary mt-1.5 shrink-0">&#x2713;</span>
    <span>Avoir une ancienneté professionnelle d'au moins <strong class="text-foreground">6 mois à 1 an</strong></span>
  </li>
  <li class="flex items-start gap-2 text-muted-foreground">
    <span class="text-primary mt-1.5 shrink-0">&#x2713;</span>
    <span>Ne pas être fiché à la Centrale des risques de Bank Al-Maghrib</span>
  </li>
</ul>

<h2 id="documents-necessaires" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Documents nécessaires</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  Préparez votre dossier en amont pour accélérer le traitement de votre demande. Les banques demandent généralement :
</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div class="bg-[var(--surface)] rounded-lg p-4">
    <p class="font-semibold text-foreground mb-2">Justificatifs d'identité</p>
    <ul class="text-sm text-muted-foreground space-y-1">
      <li>- CIN ou passeport</li>
      <li>- Certificat de résidence</li>
      <li>- Acte de mariage (si applicable)</li>
    </ul>
  </div>
  <div class="bg-[var(--surface)] rounded-lg p-4">
    <p class="font-semibold text-foreground mb-2">Justificatifs de revenus</p>
    <ul class="text-sm text-muted-foreground space-y-1">
      <li>- 3 derniers bulletins de salaire</li>
      <li>- Attestation de travail</li>
      <li>- Relevés bancaires (6 derniers mois)</li>
    </ul>
  </div>
  <div class="bg-[var(--surface)] rounded-lg p-4">
    <p class="font-semibold text-foreground mb-2">Documents du bien</p>
    <ul class="text-sm text-muted-foreground space-y-1">
      <li>- Compromis de vente</li>
      <li>- Titre foncier ou certificat de propriété</li>
      <li>- Plan du bien</li>
    </ul>
  </div>
  <div class="bg-[var(--surface)] rounded-lg p-4">
    <p class="font-semibold text-foreground mb-2">Autres documents</p>
    <ul class="text-sm text-muted-foreground space-y-1">
      <li>- Dernière déclaration IR (si applicable)</li>
      <li>- Tableau d'amortissement (crédits en cours)</li>
      <li>- Devis des travaux (si achat + rénovation)</li>
    </ul>
  </div>
</div>

<h2 id="etapes-demande" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Les étapes de la demande</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  Voici les grandes étapes pour obtenir votre crédit immobilier :
</p>
<ol class="space-y-4 mb-6">
  <li class="flex gap-4">
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
    <div>
      <p class="font-semibold text-foreground">Évaluer votre capacité d'emprunt</p>
      <p class="text-sm text-muted-foreground">Utilisez notre <a href="/fr/outils/calculateur-capacite-emprunt" class="text-primary hover:underline">calculateur de capacité d'emprunt</a> pour connaître votre budget maximum.</p>
    </div>
  </li>
  <li class="flex gap-4">
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
    <div>
      <p class="font-semibold text-foreground">Comparer les offres</p>
      <p class="text-sm text-muted-foreground">Ne vous contentez pas de votre banque habituelle. Comparez au moins 3 à 4 établissements pour trouver le meilleur taux.</p>
    </div>
  </li>
  <li class="flex gap-4">
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
    <div>
      <p class="font-semibold text-foreground">Constituer votre dossier</p>
      <p class="text-sm text-muted-foreground">Rassemblez tous les documents nécessaires listés ci-dessus. Un dossier complet accélère considérablement le traitement.</p>
    </div>
  </li>
  <li class="flex gap-4">
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
    <div>
      <p class="font-semibold text-foreground">Obtenir l'accord de principe</p>
      <p class="text-sm text-muted-foreground">La banque étudie votre dossier et vous délivre un accord de principe sous 48h à 2 semaines.</p>
    </div>
  </li>
  <li class="flex gap-4">
    <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">5</span>
    <div>
      <p class="font-semibold text-foreground">Signer l'offre de prêt</p>
      <p class="text-sm text-muted-foreground">Après accord définitif, vous signez l'offre de prêt puis passez chez le notaire pour l'acte de vente.</p>
    </div>
  </li>
</ol>

<h2 id="negocier-taux" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Comment négocier son taux</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  La négociation du taux est une étape cruciale qui peut vous faire économiser des dizaines de milliers de dirhams sur la durée de votre crédit. Voici nos conseils :
</p>
<ul class="space-y-3 mb-6">
  <li class="flex items-start gap-2 text-muted-foreground">
    <span class="text-primary mt-1 shrink-0 font-bold">1.</span>
    <span><strong class="text-foreground">Faites jouer la concurrence</strong> — Obtenez des offres écrites de plusieurs banques et montrez-les à celle que vous préférez. C'est le levier le plus efficace.</span>
  </li>
  <li class="flex items-start gap-2 text-muted-foreground">
    <span class="text-primary mt-1 shrink-0 font-bold">2.</span>
    <span><strong class="text-foreground">Domiciliez vos revenus</strong> — Les banques offrent de meilleures conditions si vous transférez votre salaire chez elles.</span>
  </li>
  <li class="flex items-start gap-2 text-muted-foreground">
    <span class="text-primary mt-1 shrink-0 font-bold">3.</span>
    <span><strong class="text-foreground">Augmentez votre apport</strong> — Un apport de 20% ou plus vous donne un pouvoir de négociation significatif.</span>
  </li>
  <li class="flex items-start gap-2 text-muted-foreground">
    <span class="text-primary mt-1 shrink-0 font-bold">4.</span>
    <span><strong class="text-foreground">Négociez les frais de dossier</strong> — Souvent fixés entre 0,5% et 1% du montant, ils sont négociables et parfois supprimés.</span>
  </li>
</ul>

<h2 id="assurance-emprunteur" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">L'assurance emprunteur</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  L'assurance emprunteur est obligatoire pour tout crédit immobilier au Maroc. Elle couvre le décès et l'invalidité, garantissant à la banque le remboursement du prêt. Son coût représente généralement entre <strong>0,3% et 0,5%</strong> du capital emprunté par an.
</p>
<p class="text-muted-foreground leading-relaxed mb-6">
  Depuis 2022, vous avez la possibilité de souscrire une assurance externe (délégation d'assurance) plutôt que celle proposée par la banque, ce qui peut vous faire économiser jusqu'à 30% sur le coût total de l'assurance.
</p>

<h2 id="conseils-wafir" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Les conseils Wafir.ma</h2>
<div class="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
  <ul class="space-y-3">
    <li class="flex items-start gap-2 text-muted-foreground">
      <span class="text-primary mt-0.5 shrink-0">&#x2714;</span>
      <span><strong class="text-foreground">Simulez avant tout</strong> — Utilisez nos outils gratuits pour connaître votre capacité d'emprunt et vos mensualités.</span>
    </li>
    <li class="flex items-start gap-2 text-muted-foreground">
      <span class="text-primary mt-0.5 shrink-0">&#x2714;</span>
      <span><strong class="text-foreground">Ne vous précipitez pas</strong> — Prenez le temps de comparer au moins 3 banques. La différence de 0,5% sur le taux peut représenter 50 000 MAD d'économies sur 20 ans.</span>
    </li>
    <li class="flex items-start gap-2 text-muted-foreground">
      <span class="text-primary mt-0.5 shrink-0">&#x2714;</span>
      <span><strong class="text-foreground">Pensez aux frais annexes</strong> — Frais de notaire (environ 6% du prix), frais de dossier, assurance emprunteur : intégrez-les dans votre budget total.</span>
    </li>
    <li class="flex items-start gap-2 text-muted-foreground">
      <span class="text-primary mt-0.5 shrink-0">&#x2714;</span>
      <span><strong class="text-foreground">Vérifiez l'aide Daam Sakane</strong> — Si vous êtes primo-accédant, vérifiez votre éligibilité à l'aide de 100 000 MAD.</span>
    </li>
  </ul>
</div>
`,
  },
  "mourabaha-vs-credit-classique": {
    toc: [
      { id: "definition", title: "Qu'est-ce que la Mourabaha ?" },
      { id: "differences", title: "Différences fondamentales" },
      { id: "comparatif-couts", title: "Comparatif des coûts" },
      { id: "avantages-inconvenients", title: "Avantages et inconvénients" },
      { id: "cas-pratique", title: "Cas pratique : appartement à 800 000 MAD" },
      { id: "pour-qui", title: "Pour qui est faite chaque formule ?" },
    ],
    html: `
<p class="text-lg text-muted-foreground leading-relaxed mb-6">
  Depuis l'arrivée des banques participatives au Maroc en 2017, les Marocains ont désormais le choix entre le crédit immobilier classique et la Mourabaha. Mais quelle option est réellement la plus avantageuse ? Analyse complète.
</p>

<h2 id="definition" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Qu'est-ce que la Mourabaha ?</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  La <strong>Mourabaha</strong> est un contrat de vente conforme à la charia. La banque achète le bien immobilier puis le revend au client avec une <strong>marge bénéficiaire</strong> connue et acceptée à l'avance. Contrairement au crédit classique, il n'y a pas d'intérêts (riba) : le surcoût est la marge commerciale de la banque.
</p>
<p class="text-muted-foreground leading-relaxed mb-6">
  Au Maroc, les banques participatives agréées par Bank Al-Maghrib sont : <strong>Bank Assafa</strong>, <strong>Umnia Bank</strong>, <strong>Al Akhdar Bank</strong>, <strong>Bank Al Yousr</strong> et <strong>Arreda</strong>.
</p>

<h2 id="differences" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Différences fondamentales</h2>
<div class="overflow-x-auto mb-6">
  <table class="w-full border-collapse text-sm">
    <thead>
      <tr class="border-b border-border">
        <th class="text-start py-3 px-4 font-semibold text-foreground">Critère</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Crédit classique</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Mourabaha</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Nature</td><td class="py-3 px-4 text-muted-foreground">Prêt d'argent avec intérêts</td><td class="py-3 px-4 text-muted-foreground">Vente avec marge bénéficiaire</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Propriété du bien</td><td class="py-3 px-4 text-muted-foreground">Client dès l'achat</td><td class="py-3 px-4 text-muted-foreground">Banque puis transfert au client</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Coût additionnel</td><td class="py-3 px-4 text-muted-foreground">Intérêts (taux fixe ou variable)</td><td class="py-3 px-4 text-muted-foreground">Marge fixe + TVA 10%</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Conformité charia</td><td class="py-3 px-4 text-muted-foreground">Non</td><td class="py-3 px-4 text-muted-foreground">Oui (validé par le CSO)</td></tr>
      <tr><td class="py-3 px-4 text-foreground">Remboursement anticipé</td><td class="py-3 px-4 text-muted-foreground">Possible (pénalité ~2%)</td><td class="py-3 px-4 text-muted-foreground">Possible (pas de pénalité sur marge restante)</td></tr>
    </tbody>
  </table>
</div>

<h2 id="comparatif-couts" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Comparatif des coûts</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  Pour un bien de <strong>800 000 MAD</strong> avec un apport de 20% (160 000 MAD), voici la comparaison sur 20 ans :
</p>
<div class="overflow-x-auto mb-6">
  <table class="w-full border-collapse text-sm">
    <thead>
      <tr class="border-b border-border">
        <th class="text-start py-3 px-4 font-semibold text-foreground">Élément</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Crédit classique (4.2%)</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Mourabaha (4.8% + TVA)</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Montant financé</td><td class="py-3 px-4 text-muted-foreground">640 000 MAD</td><td class="py-3 px-4 text-muted-foreground">640 000 MAD</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Mensualité</td><td class="py-3 px-4 text-muted-foreground">3 960 MAD</td><td class="py-3 px-4 text-muted-foreground">4 320 MAD</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Coût total du crédit</td><td class="py-3 px-4 text-muted-foreground">310 400 MAD</td><td class="py-3 px-4 text-muted-foreground">396 800 MAD</td></tr>
      <tr><td class="py-3 px-4 text-foreground font-semibold">Total à rembourser</td><td class="py-3 px-4 text-primary font-semibold">950 400 MAD</td><td class="py-3 px-4 text-primary font-semibold">1 036 800 MAD</td></tr>
    </tbody>
  </table>
</div>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
  <p class="font-semibold text-foreground mb-2">Important</p>
  <p class="text-sm text-muted-foreground">
    La Mourabaha est soumise à une TVA de 10% sur la marge, ce qui augmente son coût total. Cependant, la marge est fixe et connue dès le départ, éliminant le risque de hausse des taux.
  </p>
</div>

<h2 id="avantages-inconvenients" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Avantages et inconvénients</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div class="bg-emerald-50 rounded-lg p-5">
    <p class="font-semibold text-foreground mb-3">Crédit classique</p>
    <p class="text-sm text-emerald-700 mb-1">✓ Coût total généralement inférieur</p>
    <p class="text-sm text-emerald-700 mb-1">✓ Plus de banques, plus de concurrence</p>
    <p class="text-sm text-emerald-700 mb-1">✓ Taux variable possible (si baisse attendue)</p>
    <p class="text-sm text-red-600 mt-3 mb-1">✗ Non conforme à la charia</p>
    <p class="text-sm text-red-600">✗ Risque de taux variable</p>
  </div>
  <div class="bg-purple-50 rounded-lg p-5">
    <p class="font-semibold text-foreground mb-3">Mourabaha</p>
    <p class="text-sm text-purple-700 mb-1">✓ Conforme aux principes islamiques</p>
    <p class="text-sm text-purple-700 mb-1">✓ Marge fixe, pas de surprise</p>
    <p class="text-sm text-purple-700 mb-1">✓ Pas de pénalité de remboursement anticipé</p>
    <p class="text-sm text-red-600 mt-3 mb-1">✗ Coût total plus élevé (TVA 10%)</p>
    <p class="text-sm text-red-600">✗ Moins de banques disponibles</p>
  </div>
</div>

<h2 id="cas-pratique" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Cas pratique : appartement à 800 000 MAD</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  <strong>Profil :</strong> Karim, 32 ans, cadre à Casablanca, salaire net de 15 000 MAD/mois, souhaite acheter un appartement à 800 000 MAD avec un apport de 200 000 MAD.
</p>
<p class="text-muted-foreground leading-relaxed mb-4">
  Avec le crédit classique à 4.2% sur 20 ans, sa mensualité serait de <strong>3 720 MAD</strong> (24.8% d'endettement). Avec la Mourabaha à 4.8% + TVA sur 20 ans, sa mensualité serait de <strong>4 050 MAD</strong> (27% d'endettement). La différence mensuelle de 330 MAD représente <strong>79 200 MAD</strong> sur 20 ans.
</p>

<h2 id="pour-qui" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Pour qui est faite chaque formule ?</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  <strong>Choisissez le crédit classique</strong> si vous cherchez à minimiser le coût total de votre financement et que la conformité religieuse n'est pas un critère déterminant.
</p>
<p class="text-muted-foreground leading-relaxed mb-6">
  <strong>Choisissez la Mourabaha</strong> si la conformité aux principes islamiques est importante pour vous, si vous préférez une visibilité totale sur le coût (marge fixe), ou si vous envisagez un remboursement anticipé.
</p>

<div class="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
  <p class="font-semibold text-foreground mb-2">Simulez les deux options</p>
  <p class="text-sm text-muted-foreground">
    Utilisez notre <a href="/fr/outils/simulateur-credit-immobilier" class="text-primary hover:underline">simulateur de crédit immobilier</a> et notre <a href="/fr/outils/simulateur-mourabaha" class="text-primary hover:underline">simulateur Mourabaha</a> pour comparer les mensualités et le coût total selon votre situation.
  </p>
</div>
`,
  },
  "reduire-cout-assurance-auto-maroc": {
    toc: [
      { id: "cout-moyen", title: "Coût moyen de l'assurance auto au Maroc" },
      { id: "astuce-1", title: "1. Comparez chaque année" },
      { id: "astuce-2", title: "2. Adaptez votre couverture" },
      { id: "astuce-3", title: "3. Augmentez votre franchise" },
      { id: "astuce-4", title: "4. Profitez du bonus-malus" },
      { id: "astuce-5", title: "5. Regroupez vos contrats" },
      { id: "astuce-6", title: "6. Installez un traceur GPS" },
      { id: "astuce-7", title: "7. Payez à l'année" },
      { id: "astuce-8", title: "8. Entretenez votre véhicule" },
      { id: "comparatif", title: "Comparatif des assureurs" },
    ],
    html: `
<p class="text-lg text-muted-foreground leading-relaxed mb-6">
  L'assurance auto est obligatoire au Maroc, mais son coût peut varier considérablement d'un assureur à l'autre. Voici 8 astuces concrètes pour réduire votre prime tout en maintenant une couverture optimale.
</p>

<h2 id="cout-moyen" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Coût moyen de l'assurance auto au Maroc</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  En 2025, le coût moyen de l'assurance auto au Maroc se situe entre <strong>1 800 MAD/an</strong> pour une couverture tiers et <strong>5 000 MAD/an</strong> pour une tous risques. Ce coût dépend de nombreux facteurs : âge du conducteur, puissance du véhicule, zone géographique, historique de sinistres et niveau de couverture.
</p>

<h2 id="astuce-1" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">1. Comparez chaque année</h2>
<p class="text-muted-foreground leading-relaxed mb-6">
  Ne renouvelez jamais automatiquement votre contrat. Chaque année, les assureurs ajustent leurs tarifs et lancent des promotions. En comparant, vous pouvez économiser <strong>20 à 40%</strong> sur votre prime. Utilisez notre <a href="/fr/outils/comparateur-assurance-auto" class="text-primary hover:underline">comparateur d'assurance auto</a> pour obtenir des devis en 2 minutes.
</p>

<h2 id="astuce-2" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">2. Adaptez votre couverture</h2>
<p class="text-muted-foreground leading-relaxed mb-6">
  Si votre véhicule a plus de 5 ans, passez à une formule <strong>tiers étendu</strong> plutôt que tous risques. Les garanties vol et dommages tous accidents deviennent moins pertinentes quand la valeur du véhicule diminue. Vous pouvez économiser jusqu'à <strong>1 500 MAD/an</strong>.
</p>

<h2 id="astuce-3" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">3. Augmentez votre franchise</h2>
<p class="text-muted-foreground leading-relaxed mb-6">
  En acceptant une franchise plus élevée (la part que vous payez en cas de sinistre), votre prime annuelle diminue. Passer d'une franchise de 1 000 MAD à 3 000 MAD peut réduire votre prime de <strong>10 à 15%</strong>.
</p>

<h2 id="astuce-4" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">4. Profitez du bonus-malus</h2>
<p class="text-muted-foreground leading-relaxed mb-6">
  Au Maroc, le système bonus-malus récompense les bons conducteurs. Chaque année sans sinistre vous accorde un <strong>bonus de 5%</strong>, cumulable jusqu'à <strong>50% de réduction</strong>. À l'inverse, un sinistre responsable entraîne un malus de 25%. Conduisez prudemment et vous serez récompensé !
</p>

<h2 id="astuce-5" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">5. Regroupez vos contrats</h2>
<p class="text-muted-foreground leading-relaxed mb-6">
  Assurer votre voiture et votre habitation chez le même assureur vous donne un pouvoir de négociation. La plupart des compagnies offrent une <strong>réduction de 5 à 15%</strong> pour les clients multi-contrats.
</p>

<h2 id="astuce-6" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">6. Installez un traceur GPS</h2>
<p class="text-muted-foreground leading-relaxed mb-6">
  Certains assureurs comme <strong>AXA</strong> et <strong>Wafa Assurance</strong> offrent des réductions pour les véhicules équipés d'un système de géolocalisation. Cela réduit le risque de vol et peut diminuer votre prime de <strong>5 à 10%</strong>.
</p>

<h2 id="astuce-7" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">7. Payez à l'année</h2>
<p class="text-muted-foreground leading-relaxed mb-6">
  Le paiement annuel est toujours moins cher que le paiement fractionné (semestriel ou trimestriel). Les assureurs appliquent des frais de fractionnement de <strong>3 à 8%</strong>. Si votre budget le permet, payez en une fois.
</p>

<h2 id="astuce-8" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">8. Entretenez votre véhicule</h2>
<p class="text-muted-foreground leading-relaxed mb-6">
  Un véhicule bien entretenu présente moins de risques. Lors du renouvellement, certains assureurs prennent en compte l'état du véhicule. De plus, un véhicule en bon état réduit votre risque réel d'accident.
</p>

<h2 id="comparatif" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Comparatif des assureurs 2025</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  Voici un comparatif indicatif des tarifs pour un véhicule essence 6 CV, conducteur de 30 ans, 0 sinistre :
</p>
<div class="overflow-x-auto mb-6">
  <table class="w-full border-collapse text-sm">
    <thead>
      <tr class="border-b border-border">
        <th class="text-start py-3 px-4 font-semibold text-foreground">Assureur</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Tiers</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Tiers étendu</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Tous risques</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Wafa Assurance</td><td class="py-3 px-4 text-muted-foreground">1 700 MAD</td><td class="py-3 px-4 text-muted-foreground">2 800 MAD</td><td class="py-3 px-4 text-muted-foreground">4 200 MAD</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">AXA Maroc</td><td class="py-3 px-4 text-muted-foreground">1 900 MAD</td><td class="py-3 px-4 text-muted-foreground">3 100 MAD</td><td class="py-3 px-4 text-muted-foreground">4 600 MAD</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">RMA</td><td class="py-3 px-4 text-muted-foreground">1 800 MAD</td><td class="py-3 px-4 text-muted-foreground">2 900 MAD</td><td class="py-3 px-4 text-muted-foreground">4 400 MAD</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Saham</td><td class="py-3 px-4 text-muted-foreground">1 650 MAD</td><td class="py-3 px-4 text-muted-foreground">2 700 MAD</td><td class="py-3 px-4 text-muted-foreground">4 100 MAD</td></tr>
      <tr><td class="py-3 px-4 text-foreground">Atlanta</td><td class="py-3 px-4 text-muted-foreground">1 600 MAD</td><td class="py-3 px-4 text-muted-foreground">2 600 MAD</td><td class="py-3 px-4 text-muted-foreground">3 900 MAD</td></tr>
    </tbody>
  </table>
</div>
<p class="text-sm text-muted-foreground italic mb-6">
  * Tarifs indicatifs 2025, susceptibles de varier selon votre profil. <a href="/fr/outils/comparateur-assurance-auto" class="text-primary hover:underline">Comparez les offres personnalisées ici</a>.
</p>
`,
  },
  "mutuelle-sante-maroc-guide": {
    toc: [
      { id: "systeme-sante", title: "Le système de santé au Maroc" },
      { id: "amo", title: "L'AMO : Assurance Maladie Obligatoire" },
      { id: "mutuelle-complementaire", title: "Pourquoi une mutuelle complémentaire ?" },
      { id: "types-mutuelles", title: "Types de mutuelles disponibles" },
      { id: "comparatif-formules", title: "Comparatif des formules" },
      { id: "criteres-choix", title: "Critères de choix" },
      { id: "conseils", title: "Nos conseils" },
    ],
    html: `
<p class="text-lg text-muted-foreground leading-relaxed mb-6">
  Comprendre le système de couverture santé au Maroc peut être complexe. AMO, CNSS, CNOPS, mutuelle privée... Ce guide vous aide à y voir clair et à choisir la couverture adaptée à votre situation.
</p>

<h2 id="systeme-sante" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Le système de santé au Maroc</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  Le Maroc a généralisé la couverture santé avec l'<strong>AMO (Assurance Maladie Obligatoire)</strong> gérée par la <strong>CNSS</strong> pour le secteur privé et la <strong>CNOPS</strong> pour le secteur public. En 2025, plus de <strong>35 millions de Marocains</strong> bénéficient d'une couverture de base.
</p>
<p class="text-muted-foreground leading-relaxed mb-6">
  Cependant, l'AMO ne couvre qu'une partie des frais de santé (environ 70% du tarif de référence). C'est là qu'intervient la mutuelle complémentaire.
</p>

<h2 id="amo" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">L'AMO : Assurance Maladie Obligatoire</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <div class="bg-[var(--surface)] rounded-lg p-5">
    <p class="font-semibold text-foreground mb-3">CNSS (Secteur privé)</p>
    <p class="text-sm text-muted-foreground mb-1">• Cotisation : 6,37% du salaire</p>
    <p class="text-sm text-muted-foreground mb-1">• Remboursement : 70% du tarif national</p>
    <p class="text-sm text-muted-foreground mb-1">• Plafond : variable selon les soins</p>
    <p class="text-sm text-muted-foreground">• Tiers payant : dans les cliniques conventionnées</p>
  </div>
  <div class="bg-[var(--surface)] rounded-lg p-5">
    <p class="font-semibold text-foreground mb-3">CNOPS (Secteur public)</p>
    <p class="text-sm text-muted-foreground mb-1">• Cotisation : 5% du salaire</p>
    <p class="text-sm text-muted-foreground mb-1">• Remboursement : 80% du tarif national</p>
    <p class="text-sm text-muted-foreground mb-1">• Meilleure couverture médicaments</p>
    <p class="text-sm text-muted-foreground">• Réseau hospitalier public étendu</p>
  </div>
</div>

<h2 id="mutuelle-complementaire" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Pourquoi une mutuelle complémentaire ?</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  L'AMO laisse un <strong>reste à charge</strong> qui peut être important, surtout pour les soins dentaires, l'optique et l'hospitalisation en clinique privée. Une mutuelle complémentaire permet de :
</p>
<ul class="space-y-2 mb-6 ms-4">
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1.5 shrink-0">&#x2713;</span><span>Couvrir le reste à charge après remboursement AMO</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1.5 shrink-0">&#x2713;</span><span>Accéder aux cliniques et médecins du secteur privé</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1.5 shrink-0">&#x2713;</span><span>Bénéficier de remboursements pour l'optique et le dentaire</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1.5 shrink-0">&#x2713;</span><span>Avoir une couverture internationale (voyages, urgences)</span></li>
</ul>

<h2 id="types-mutuelles" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Types de mutuelles disponibles</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  Au Maroc, vous avez le choix entre plusieurs types de couverture complémentaire :
</p>
<div class="space-y-4 mb-6">
  <div class="border rounded-lg p-4"><p class="font-semibold text-foreground">Mutuelle d'entreprise</p><p class="text-sm text-muted-foreground">Proposée par l'employeur, souvent la plus avantageuse car l'entreprise prend en charge 50% ou plus de la cotisation.</p></div>
  <div class="border rounded-lg p-4"><p class="font-semibold text-foreground">Assurance santé individuelle</p><p class="text-sm text-muted-foreground">Proposée par les compagnies d'assurance (AXA, RMA, Wafa, Saham...). Plus flexible mais plus coûteuse qu'une mutuelle d'entreprise.</p></div>
  <div class="border rounded-lg p-4"><p class="font-semibold text-foreground">Mutuelle associative</p><p class="text-sm text-muted-foreground">Proposée par des mutuelles de prévoyance sociale pour certaines professions ou associations.</p></div>
</div>

<h2 id="comparatif-formules" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Comparatif des formules</h2>
<div class="overflow-x-auto mb-6">
  <table class="w-full border-collapse text-sm">
    <thead>
      <tr class="border-b border-border">
        <th class="text-start py-3 px-4 font-semibold text-foreground">Formule</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Cotisation/mois</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Hospitalisation</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Optique/Dentaire</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Essentielle</td><td class="py-3 px-4 text-muted-foreground">200 – 350 MAD</td><td class="py-3 px-4 text-muted-foreground">80% complément AMO</td><td class="py-3 px-4 text-muted-foreground">1 000 MAD/an</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Confort</td><td class="py-3 px-4 text-muted-foreground">350 – 600 MAD</td><td class="py-3 px-4 text-muted-foreground">100% complément AMO</td><td class="py-3 px-4 text-muted-foreground">3 000 MAD/an</td></tr>
      <tr><td class="py-3 px-4 text-foreground">Premium</td><td class="py-3 px-4 text-muted-foreground">600 – 1 200 MAD</td><td class="py-3 px-4 text-muted-foreground">100% + chambre individuelle</td><td class="py-3 px-4 text-muted-foreground">5 000 MAD/an + implants</td></tr>
    </tbody>
  </table>
</div>

<h2 id="criteres-choix" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Critères de choix</h2>
<ul class="space-y-3 mb-6">
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1 shrink-0 font-bold">1.</span><span><strong class="text-foreground">Votre situation familiale</strong> — Un célibataire n'a pas les mêmes besoins qu'une famille de 4 personnes.</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1 shrink-0 font-bold">2.</span><span><strong class="text-foreground">Votre état de santé</strong> — Si vous avez des soins réguliers (lunettes, dentiste), une formule Confort est recommandée.</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1 shrink-0 font-bold">3.</span><span><strong class="text-foreground">Le réseau de soins</strong> — Vérifiez que vos médecins et cliniques préférés sont dans le réseau de l'assureur.</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1 shrink-0 font-bold">4.</span><span><strong class="text-foreground">Le délai de carence</strong> — Certaines mutuelles imposent un délai avant de couvrir les soins importants (3 à 12 mois).</span></li>
</ul>

<h2 id="conseils" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Nos conseils</h2>
<div class="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
  <ul class="space-y-3">
    <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-0.5 shrink-0">&#x2714;</span><span>Comparez au moins 3 offres avant de souscrire</span></li>
    <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-0.5 shrink-0">&#x2714;</span><span>Privilégiez une mutuelle avec tiers payant pour éviter les avances de frais</span></li>
    <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-0.5 shrink-0">&#x2714;</span><span>Lisez attentivement les exclusions et les plafonds de remboursement</span></li>
    <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-0.5 shrink-0">&#x2714;</span><span>Négociez avec votre employeur pour une mutuelle d'entreprise si elle n'est pas déjà proposée</span></li>
  </ul>
</div>
`,
  },
  "calculer-capacite-emprunt-guide": {
    toc: [
      { id: "definition", title: "Qu'est-ce que la capacité d'emprunt ?" },
      { id: "formule", title: "La formule de calcul" },
      { id: "taux-endettement", title: "Le taux d'endettement au Maroc" },
      { id: "exemples", title: "Exemples chiffrés" },
      { id: "augmenter-capacite", title: "Comment augmenter votre capacité" },
      { id: "simulateur", title: "Utilisez notre simulateur" },
    ],
    html: `
<p class="text-lg text-muted-foreground leading-relaxed mb-6">
  Avant de chercher un bien immobilier, il est essentiel de connaître votre capacité d'emprunt. Ce guide vous explique la méthode de calcul utilisée par les banques marocaines, avec des exemples concrets.
</p>

<h2 id="definition" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Qu'est-ce que la capacité d'emprunt ?</h2>
<p class="text-muted-foreground leading-relaxed mb-6">
  La capacité d'emprunt est le <strong>montant maximum</strong> qu'une banque accepte de vous prêter, compte tenu de vos revenus, vos charges existantes et la durée du prêt. Elle est déterminée par votre <strong>taux d'endettement</strong> et votre <strong>reste à vivre</strong>.
</p>

<h2 id="formule" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">La formule de calcul</h2>
<div class="bg-[var(--surface)] rounded-xl p-6 mb-6">
  <p class="font-mono text-foreground text-center text-lg mb-4">
    Mensualité max = (Revenus nets × Taux d'endettement) – Charges existantes
  </p>
  <p class="text-sm text-muted-foreground text-center">
    Puis : Capacité d'emprunt = Mensualité max × Nombre de mois / (1 + Coût du crédit)
  </p>
</div>
<p class="text-muted-foreground leading-relaxed mb-6">
  En pratique, les banques utilisent des simulateurs qui prennent en compte le taux d'intérêt, la durée et l'assurance emprunteur pour calculer votre capacité exacte.
</p>

<h2 id="taux-endettement" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Le taux d'endettement au Maroc</h2>
<p class="text-muted-foreground leading-relaxed mb-4">
  Au Maroc, les banques appliquent un taux d'endettement maximal qui varie selon les profils :
</p>
<div class="overflow-x-auto mb-6">
  <table class="w-full border-collapse text-sm">
    <thead>
      <tr class="border-b border-border">
        <th class="text-start py-3 px-4 font-semibold text-foreground">Profil</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Taux d'endettement max</th>
        <th class="text-start py-3 px-4 font-semibold text-foreground">Reste à vivre minimum</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Salarié standard</td><td class="py-3 px-4 text-muted-foreground">40 – 45%</td><td class="py-3 px-4 text-muted-foreground">3 000 MAD/personne</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Cadre supérieur (+20 000 MAD)</td><td class="py-3 px-4 text-muted-foreground">45 – 50%</td><td class="py-3 px-4 text-muted-foreground">5 000 MAD/personne</td></tr>
      <tr class="border-b border-border/50"><td class="py-3 px-4 text-foreground">Professionnel libéral</td><td class="py-3 px-4 text-muted-foreground">35 – 40%</td><td class="py-3 px-4 text-muted-foreground">4 000 MAD/personne</td></tr>
      <tr><td class="py-3 px-4 text-foreground">MRE</td><td class="py-3 px-4 text-muted-foreground">40 – 45%</td><td class="py-3 px-4 text-muted-foreground">Variable</td></tr>
    </tbody>
  </table>
</div>

<h2 id="exemples" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Exemples chiffrés</h2>
<div class="space-y-6 mb-6">
  <div class="bg-emerald-50 rounded-lg p-5">
    <p class="font-semibold text-foreground mb-2">Exemple 1 : Couple, revenus de 20 000 MAD</p>
    <p class="text-sm text-muted-foreground mb-1">Revenus nets mensuels : 20 000 MAD (combinés)</p>
    <p class="text-sm text-muted-foreground mb-1">Charges existantes : 0 MAD</p>
    <p class="text-sm text-muted-foreground mb-1">Taux d'endettement : 45% → Mensualité max = 9 000 MAD</p>
    <p class="text-sm text-muted-foreground mb-1">Taux : 4.2%, durée : 25 ans</p>
    <p class="text-sm font-semibold text-primary mt-2">Capacité d'emprunt ≈ 1 400 000 MAD</p>
  </div>
  <div class="bg-blue-50 rounded-lg p-5">
    <p class="font-semibold text-foreground mb-2">Exemple 2 : Célibataire, 10 000 MAD/mois</p>
    <p class="text-sm text-muted-foreground mb-1">Revenus nets mensuels : 10 000 MAD</p>
    <p class="text-sm text-muted-foreground mb-1">Charges existantes : 1 500 MAD (crédit auto)</p>
    <p class="text-sm text-muted-foreground mb-1">Taux d'endettement : 45% → Mensualité max = 4 500 – 1 500 = 3 000 MAD</p>
    <p class="text-sm text-muted-foreground mb-1">Taux : 4.2%, durée : 20 ans</p>
    <p class="text-sm font-semibold text-primary mt-2">Capacité d'emprunt ≈ 480 000 MAD</p>
  </div>
  <div class="bg-purple-50 rounded-lg p-5">
    <p class="font-semibold text-foreground mb-2">Exemple 3 : MRE, revenus 3 000 EUR</p>
    <p class="text-sm text-muted-foreground mb-1">Revenus nets mensuels : 33 000 MAD (équivalent)</p>
    <p class="text-sm text-muted-foreground mb-1">Charges existantes : 5 000 MAD (loyer + crédit en France)</p>
    <p class="text-sm text-muted-foreground mb-1">Taux d'endettement : 40% → Mensualité max = 13 200 – 5 000 = 8 200 MAD</p>
    <p class="text-sm text-muted-foreground mb-1">Taux : 4.5%, durée : 20 ans</p>
    <p class="text-sm font-semibold text-primary mt-2">Capacité d'emprunt ≈ 1 250 000 MAD</p>
  </div>
</div>

<h2 id="augmenter-capacite" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Comment augmenter votre capacité</h2>
<ul class="space-y-3 mb-6">
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1 shrink-0 font-bold">1.</span><span><strong class="text-foreground">Remboursez vos crédits en cours</strong> — Chaque crédit soldé augmente directement votre capacité d'emprunt.</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1 shrink-0 font-bold">2.</span><span><strong class="text-foreground">Augmentez votre apport</strong> — Plus votre apport est élevé, moins vous empruntez et plus la banque sera flexible.</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1 shrink-0 font-bold">3.</span><span><strong class="text-foreground">Allongez la durée</strong> — Passer de 20 à 25 ans augmente votre capacité de 15 à 20% (mais coûte plus cher).</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1 shrink-0 font-bold">4.</span><span><strong class="text-foreground">Empruntez à deux</strong> — Les revenus du co-emprunteur sont pris en compte, doublant potentiellement votre capacité.</span></li>
  <li class="flex items-start gap-2 text-muted-foreground"><span class="text-primary mt-1 shrink-0 font-bold">5.</span><span><strong class="text-foreground">Négociez le taux</strong> — Un taux inférieur de 0,5% augmente votre capacité de 5 à 8%.</span></li>
</ul>

<h2 id="simulateur" class="text-2xl font-bold text-foreground mt-10 mb-4 scroll-mt-24">Utilisez notre simulateur</h2>
<div class="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
  <p class="font-semibold text-foreground mb-2">Calculez votre capacité d'emprunt en 30 secondes</p>
  <p class="text-sm text-muted-foreground mb-4">
    Notre <a href="/fr/outils/calculateur-capacite-emprunt" class="text-primary hover:underline">calculateur de capacité d'emprunt</a> vous donne une estimation précise basée sur les critères réels des banques marocaines. Renseignez vos revenus, charges et la durée souhaitée pour connaître votre budget maximum.
  </p>
  <p class="text-sm text-muted-foreground">
    Vous pouvez ensuite utiliser notre <a href="/fr/comparer" class="text-primary hover:underline">comparateur</a> pour trouver les meilleures offres correspondant à votre capacité.
  </p>
</div>
`,
  },
};
