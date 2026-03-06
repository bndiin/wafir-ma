import Link from "next/link";
import { Calendar, Clock, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  type BlogArticle,
  getCategoryLabel,
  getCategoryColor,
  formatDate,
} from "@/lib/blog-data";

interface ArticleCardProps {
  article: BlogArticle;
  locale: string;
  featured?: boolean;
}

export function ArticleCard({
  article,
  locale,
  featured = false,
}: ArticleCardProps) {
  const categoryLabel = getCategoryLabel(article.category);
  const categoryColor = getCategoryColor(article.category);

  return (
    <Link href={`/${locale}/blog/${article.slug}`} className="group block h-full">
      <Card
        className={`h-full overflow-hidden border transition-all duration-300 hover:shadow-lg hover:border-primary/30 ${
          featured ? "md:grid md:grid-cols-2" : "flex flex-col"
        }`}
      >
        {/* Image placeholder */}
        <div
          className={`relative bg-gradient-to-br ${article.imagePlaceholderColor} ${
            featured ? "md:min-h-full min-h-[200px]" : "min-h-[200px]"
          } flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 text-center px-6">
            <div className="text-white/90 text-4xl mb-2">
              {article.category === "CREDIT" && "🏦"}
              {article.category === "ASSURANCE" && "🛡️"}
              {article.category === "FINANCE_PARTICIPATIVE" && "☪️"}
              {article.category === "GUIDES" && "📖"}
              {article.category === "ACTUALITES" && "📰"}
            </div>
            <p className="text-white/70 text-sm font-medium">
              {article.imageAlt}
            </p>
          </div>
          {/* Category badge overlaid */}
          <div className="absolute top-4 start-4">
            <Badge className={`${categoryColor} border-0 text-xs font-medium`}>
              {categoryLabel}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col gap-3 p-5 ${featured ? "justify-center" : "flex-1"}`}>
          {featured && (
            <Badge
              variant="outline"
              className="w-fit border-primary/30 text-primary text-xs"
            >
              Article vedette
            </Badge>
          )}

          <h3
            className={`font-bold text-foreground group-hover:text-primary transition-colors leading-snug ${
              featured ? "text-xl md:text-2xl" : "text-lg"
            }`}
          >
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>

          {/* Meta info */}
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 border-t border-border/50 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {article.author.name}
            </span>
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
      </Card>
    </Link>
  );
}
