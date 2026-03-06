"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArticleCard } from "@/components/blog/article-card";
import type { BlogArticle, BlogCategory } from "@/lib/blog-data";

interface BlogCategoryFilterProps {
  articles: BlogArticle[];
  categories: { value: BlogCategory | "ALL"; label: string; color: string }[];
  locale: string;
}

export function BlogCategoryFilter({
  articles,
  categories,
  locale,
}: BlogCategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filtered =
    activeCategory === "ALL"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <Tabs value={activeCategory} onValueChange={setActiveCategory}>
      {/* Scrollable category tabs */}
      <div className="overflow-x-auto -mx-4 px-4 mb-8">
        <TabsList className="inline-flex w-auto gap-1 bg-transparent p-0">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.value}
              value={cat.value}
              className="rounded-full border border-border px-4 py-1.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        {filtered.length} article{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "ALL" &&
          ` dans ${categories.find((c) => c.value === activeCategory)?.label ?? activeCategory}`}
      </p>

      {/* Articles grid — we render a single content area, filtered client-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <ArticleCard
            key={article.slug}
            article={article}
            locale={locale}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            Aucun article dans cette catégorie pour le moment.
          </p>
        </div>
      )}
    </Tabs>
  );
}
