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
};
