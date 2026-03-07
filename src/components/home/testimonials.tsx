"use client";

import { useTranslations } from "next-intl";
import { Star, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

const REVIEWS = [
  { nameKey: "review1Name", cityKey: "review1City", textKey: "review1Text", stars: 5, color: "border-l-[#00b894]" },
  { nameKey: "review2Name", cityKey: "review2City", textKey: "review2Text", stars: 5, color: "border-l-[#0984e3]" },
  { nameKey: "review3Name", cityKey: "review3City", textKey: "review3Text", stars: 5, color: "border-l-[#6c5ce7]" },
] as const;

export function Testimonials() {
  const t = useTranslations("home.testimonials");

  return (
    <section className="bg-[var(--surface)] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimateOnScroll>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {t("title")}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {t("subtitle")}
            </p>
          </AnimateOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {REVIEWS.map((review, i) => (
            <AnimateOnScroll key={review.nameKey} delay={i * 150}>
              <Card className={`border-l-4 ${review.color} h-full`}>
                <CardContent className="p-6">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]"
                      />
                    ))}
                  </div>
                  {/* Text */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    &ldquo;{t(review.textKey)}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {t(review.nameKey).charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t(review.nameKey)}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {t(review.cityKey)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
