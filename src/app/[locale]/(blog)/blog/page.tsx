import { getTranslations } from "next-intl/server";
import { BookOpen, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ArticleCard } from "@/components/blog/article-card";
import { BlogCategoryFilter } from "./blog-category-filter";
import {
  BLOG_ARTICLES,
  BLOG_CATEGORIES,
} from "@/lib/blog-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: "Blog — Conseils Crédit, Assurance & Finance au Maroc",
    description:
      "Guides pratiques, conseils d'experts et actualités sur le crédit immobilier, l'assurance auto, la finance participative et plus encore. Tout pour mieux gérer vos finances au Maroc.",
    alternates: {
      canonical: `https://wafir.ma/${locale}/blog`,
      languages: {
        fr: "/fr/blog",
        ar: "/ar/blog",
        en: "/en/blog",
      },
    },
    openGraph: {
      title: "Le Blog Wafir.ma — Conseils Finance au Maroc",
      description:
        "Guides pratiques et conseils d'experts pour mieux gérer vos crédits, assurances et finances au Maroc.",
      type: "website",
      url: `https://wafir.ma/${locale}/blog`,
      siteName: "Wafir.ma",
    },
  };
}

// Separate featured articles from the rest
const featuredArticles = BLOG_ARTICLES.filter((a) => a.featured);
const regularArticles = BLOG_ARTICLES.filter((a) => !a.featured);

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
              <BookOpen className="h-4 w-4" />
              Le Blog Wafir.ma
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              Conseils &amp; guides pour vos{" "}
              <span className="text-primary">finances au Maroc</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Retrouvez nos guides pratiques, analyses d&apos;experts et
              actualités pour prendre les meilleures décisions en matière de
              crédit, assurance et finance participative.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="container mx-auto px-4 -mt-2 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Articles vedettes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                locale={locale}
                featured
              />
            ))}
          </div>
        </section>
      )}

      {/* Category Filter + Articles Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-xl font-bold text-foreground">
            Tous les articles
          </h2>
        </div>

        <BlogCategoryFilter
          articles={BLOG_ARTICLES}
          categories={BLOG_CATEGORIES}
          locale={locale}
        />
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[var(--surface)] py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            <Badge className="bg-primary/10 text-primary border-0 mb-4">
              Newsletter
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Restez informé
            </h2>
            <p className="text-muted-foreground mb-6">
              Recevez nos meilleurs conseils et les dernières actualités
              financières directement dans votre boîte mail. Pas de spam,
              promis.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                S&apos;inscrire
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              En vous inscrivant, vous acceptez notre politique de
              confidentialité. Désinscription en un clic.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
