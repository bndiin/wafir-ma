"use client";

import { useState } from "react";
import { Star, MessageSquare, Send, ThumbsUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

// ─── Sample Data ───────────────────────────────────────────────
interface Review {
  id: number;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
  reply?: string;
}

const SAMPLE_REVIEWS: Review[] = [
  {
    id: 1,
    clientName: "Ahmed Benali",
    rating: 5,
    comment:
      "Excellent service ! J'ai obtenu mon credit immobilier en un temps record. Le conseiller etait tres professionnel et a su me guider dans toutes les etapes. Je recommande vivement.",
    date: "04 Mar 2026",
    category: "Credit Immobilier",
    reply:
      "Merci beaucoup Ahmed pour votre confiance ! Nous sommes ravis d'avoir pu vous accompagner dans votre projet immobilier.",
  },
  {
    id: 2,
    clientName: "Fatima El Amrani",
    rating: 4,
    comment:
      "Bonne experience globale. Le processus etait rapide et les conditions proposees etaient competitives. Un petit bemol sur le temps d'attente au telephone.",
    date: "28 Fev 2026",
    category: "Credit Consommation",
  },
  {
    id: 3,
    clientName: "Youssef Tazi",
    rating: 5,
    comment:
      "Service impeccable pour mon assurance auto. Le comparatif m'a permis de trouver la meilleure offre. L'equipe est reactive et competente.",
    date: "22 Fev 2026",
    category: "Assurance Auto",
    reply:
      "Merci Youssef ! Nous mettons un point d'honneur a proposer les meilleures offres du marche.",
  },
  {
    id: 4,
    clientName: "Khadija Ouazzani",
    rating: 3,
    comment:
      "Service correct mais la reponse a pris plus de temps que prevu. L'offre finale etait neanmoins interessante.",
    date: "15 Fev 2026",
    category: "Rachat de Credit",
  },
  {
    id: 5,
    clientName: "Sara Bennani",
    rating: 5,
    comment:
      "Tres satisfaite du service mourabaha. Explications claires sur le financement participatif et un accompagnement personnalise tout au long du processus.",
    date: "10 Fev 2026",
    category: "Mourabaha",
  },
  {
    id: 6,
    clientName: "Omar Idrissi",
    rating: 4,
    comment:
      "Bon rapport qualite/prix pour ma mutuelle sante familiale. Le processus en ligne est simple et intuitif.",
    date: "05 Fev 2026",
    category: "Mutuelle Sante",
    reply:
      "Merci Omar pour votre retour positif. N'hesitez pas a nous contacter si vous avez besoin de quoi que ce soit.",
  },
];

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "h-3.5 w-3.5", md: "h-5 w-5", lg: "h-7 w-7" };
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeMap[size]} ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function AvisPage() {
  const [replyTexts, setReplyTexts] = useState<Record<number, string>>({});
  const [replyOpen, setReplyOpen] = useState<number | null>(null);

  const avgRating =
    SAMPLE_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / SAMPLE_REVIEWS.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: SAMPLE_REVIEWS.filter((r) => r.rating === star).length,
    pct: Math.round(
      (SAMPLE_REVIEWS.filter((r) => r.rating === star).length /
        SAMPLE_REVIEWS.length) *
        100
    ),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Avis clients</h1>
        <p className="text-sm text-muted-foreground">
          Consultez et repondez aux avis laisses par vos clients
        </p>
      </div>

      {/* Rating overview */}
      <Card>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {/* Average */}
            <div className="text-center sm:pr-8">
              <p className="text-5xl font-bold text-foreground">
                {avgRating.toFixed(1)}
              </p>
              <StarRating rating={Math.round(avgRating)} size="md" />
              <p className="mt-1 text-sm text-muted-foreground">
                {SAMPLE_REVIEWS.length} avis
              </p>
            </div>

            <Separator orientation="vertical" className="hidden h-24 sm:block" />

            {/* Distribution */}
            <div className="flex-1 space-y-2">
              {ratingDistribution.map((dist) => (
                <div key={dist.star} className="flex items-center gap-3">
                  <span className="w-4 text-sm font-medium text-foreground">
                    {dist.star}
                  </span>
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all"
                      style={{ width: `${dist.pct}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm text-muted-foreground">
                    {dist.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews list */}
      <div className="space-y-4">
        {SAMPLE_REVIEWS.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-0 space-y-3">
              {/* Review header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0984e3]/10 text-sm font-bold text-[#0984e3]">
                    {review.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {review.clientName}
                    </p>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} size="sm" />
                      <Badge variant="outline" className="text-[10px]">
                        {review.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {review.date}
                </span>
              </div>

              {/* Comment */}
              <p className="text-sm leading-relaxed text-foreground">
                {review.comment}
              </p>

              {/* Existing reply */}
              {review.reply && (
                <div className="rounded-lg bg-[#0984e3]/5 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5 text-[#0984e3]" />
                    <span className="text-xs font-semibold text-[#0984e3]">
                      Votre reponse
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{review.reply}</p>
                </div>
              )}

              {/* Reply area */}
              {!review.reply && (
                <>
                  {replyOpen === review.id ? (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Ecrivez votre reponse..."
                        value={replyTexts[review.id] || ""}
                        onChange={(e) =>
                          setReplyTexts((prev) => ({
                            ...prev,
                            [review.id]: e.target.value,
                          }))
                        }
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="gap-1.5 bg-[#0984e3] text-white hover:bg-[#0984e3]/90"
                        >
                          <Send className="h-3.5 w-3.5" />
                          Envoyer
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyOpen(null)}
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => setReplyOpen(review.id)}
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      Repondre
                    </Button>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
