"use client";

import Link from "next/link";
import {
  MapPin,
  Star,
  Clock,
  Shield,
  ChevronRight,
  Crown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type ProTier = "GRATUIT" | "PRO" | "PREMIUM";

export interface ProCardData {
  slug: string;
  name: string;
  type: string;
  specialties: string[];
  city: string;
  rating: number;
  reviewCount: number;
  responseTime: string;
  tier: ProTier;
  avatarInitials: string;
  phone: string;
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClass} ${
            star <= Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : star <= rating
                ? "fill-amber-400/50 text-amber-400"
                : "fill-muted text-muted"
          }`}
        />
      ))}
      <span className={`font-semibold ${size === "md" ? "text-base" : "text-sm"} text-foreground ms-1`}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

function TierBadge({ tier }: { tier: ProTier }) {
  if (tier === "PREMIUM") {
    return (
      <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30 gap-1">
        <Crown className="h-3 w-3" />
        PREMIUM
      </Badge>
    );
  }
  if (tier === "PRO") {
    return (
      <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30 gap-1">
        <Shield className="h-3 w-3" />
        Verifie
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="text-muted-foreground">
      GRATUIT
    </Badge>
  );
}

export function ProCard({ pro }: { pro: ProCardData }) {
  const isPremium = pro.tier === "PREMIUM";

  return (
    <Link href={`/annuaire/${pro.slug}`}>
      <Card
        className={`group relative cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
          isPremium
            ? "border-amber-500/40 shadow-amber-500/10 hover:border-amber-500/60"
            : "hover:border-primary/30"
        }`}
      >
        {isPremium && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-t-xl" />
        )}
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
                isPremium
                  ? "bg-amber-500/10 text-amber-600"
                  : pro.tier === "PRO"
                    ? "bg-blue-500/10 text-blue-600"
                    : "bg-primary/10 text-primary"
              }`}
            >
              {pro.avatarInitials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {pro.name}
                </h3>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {pro.specialties.slice(0, 3).map((spec) => (
                  <Badge
                    key={spec}
                    variant="outline"
                    className="text-xs font-normal"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                <StarRating rating={pro.rating} />
                <span className="text-xs text-muted-foreground">
                  ({pro.reviewCount} avis)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {pro.city}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {pro.responseTime}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{pro.type}</span>
            <TierBadge tier={pro.tier} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export { StarRating, TierBadge };
