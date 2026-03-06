import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArticleCard } from "@/components/blog/article-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import {
  BLOG_ARTICLES,
  ARTICLE_CONTENTS,
  getArticleBySlug,
  getRelatedArticles,
  getCategoryLabel,
  getCategoryColor,
  formatDate,
} from "@/lib/blog-data";
import { TableOfContents } from "./table-of-contents";

// Generate static params for all known articles
export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  const url = `https://wafir.ma/${locale}/blog/${slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: url,
      languages: {
        fr: `/fr/blog/${slug}`,
        ar: `/ar/blog/${slug}`,
        en: `/en/blog/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      url,
      siteName: "Wafir.ma",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    other: {
      "article:published_time": article.publishedAt,
      "article:modified_time": article.updatedAt,
      "article:author": article.author.name,
      "article:section": getCategoryLabel(article.category),
      "article:tag": article.tags.join(", "),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const content = ARTICLE_CONTENTS[slug];
  const relatedArticles = getRelatedArticles(slug, 3);
  const categoryLabel = getCategoryLabel(article.category);
  const categoryColor = getCategoryColor(article.category);
  const articleUrl = `https://wafir.ma/${locale}/blog/${slug}`;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Wafir.ma",
      url: "https://wafir.ma",
      logo: {
        "@type": "ImageObject",
        url: "https://wafir.ma/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    articleSection: categoryLabel,
    keywords: article.tags.join(", "),
    wordCount: article.readTime * 200,
    timeRequired: `PT${article.readTime}M`,
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav
        className="container mx-auto px-4 py-4"
        aria-label="Fil d'Ariane"
      >
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link
              href={`/${locale}`}
              className="hover:text-primary transition-colors"
            >
              Accueil
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link
              href={`/${locale}/blog`}
              className="hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
            {article.title}
          </li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="container mx-auto px-4 pb-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <Badge className={`${categoryColor} border-0 text-xs font-medium`}>
              {categoryLabel}
            </Badge>
            {article.updatedAt !== article.publishedAt && (
              <span className="text-xs text-muted-foreground">
                Mis à jour le {formatDate(article.updatedAt)}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {article.excerpt}
          </p>

          {/* Author + Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                {article.author.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {article.author.name}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min de lecture
                  </span>
                </div>
              </div>
            </div>

            <ShareButtons url={articleUrl} title={article.title} />
          </div>

          <Separator className="mt-6" />
        </div>
      </header>

      {/* Article Body + Sidebar */}
      <div className="container mx-auto px-4 pb-16">
        <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-[1fr_250px] lg:gap-10">
          {/* Main Content */}
          <article className="mx-auto max-w-3xl lg:max-w-none">
            {/* Image placeholder */}
            <div
              className={`bg-gradient-to-br ${article.imagePlaceholderColor} rounded-xl mb-8 aspect-video flex items-center justify-center`}
            >
              <div className="text-center text-white/80">
                <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-70" />
                <p className="text-sm font-medium">{article.imageAlt}</p>
              </div>
            </div>

            {content ? (
              <div
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: content.html }}
              />
            ) : (
              /* Fallback content for articles without full HTML */
              <div className="prose-custom">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {article.excerpt}
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-6">
                  <p className="font-semibold text-foreground mb-2">
                    Article en cours de rédaction
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Cet article sera bientôt disponible dans son intégralité.
                    En attendant, utilisez nos outils gratuits pour comparer
                    les offres.
                  </p>
                </div>
              </div>
            )}

            {/* CTA Card */}
            <Card className="mt-10 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6 md:p-8 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <Calculator className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Comparez les offres gratuitement
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Utilisez nos simulateurs et comparateurs pour trouver le
                  meilleur taux de crédit ou d&apos;assurance au Maroc. 100%
                  gratuit, sans engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    size="lg"
                    asChild
                  >
                    <Link href={`/${locale}/outils/simulateur-credit-immobilier`}>
                      Simuler mon crédit
                      <ArrowRight className="ms-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href={`/${locale}/outils`}>
                      Tous les outils
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Share again */}
            <div className="mt-6 flex items-center justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${locale}/blog`}>
                  <ArrowLeft className="me-2 h-4 w-4" />
                  Retour au blog
                </Link>
              </Button>
              <ShareButtons url={articleUrl} title={article.title} />
            </div>
          </article>

          {/* Sidebar — Table of Contents (sticky on desktop, hidden on mobile) */}
          {content?.toc && content.toc.length > 0 && (
            <aside className="hidden lg:block">
              <TableOfContents items={content.toc} />
            </aside>
          )}
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-[var(--surface)] py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-foreground">
                Articles similaires
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${locale}/blog`}>
                  Voir tout
                  <ArrowRight className="ms-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <ArticleCard
                  key={related.slug}
                  article={related}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
