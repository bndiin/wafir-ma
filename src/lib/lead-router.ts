// ==========================================
// Lead Routing Algorithm for wafir.ma
// Matches leads to the best professionals
// ==========================================

interface ProForMatching {
  id: string;
  specialities: string[];
  cityId: string;
  zones: string[];
  avgRating: number;
  responseTime: number | null;
  tier: "GRATUIT" | "PRO" | "PREMIUM";
  leadCount: number;
}

interface LeadForMatching {
  categoryId: string;
  cityId: string | null;
}

interface MatchResult {
  proId: string;
  score: number;
  delayMs: number;
}

/**
 * Calculate match score between a pro and a lead
 * Scoring: 40% speciality + 25% geo + 20% rating + 15% response time + tier bonus
 */
export function calcMatchScore(pro: ProForMatching, lead: LeadForMatching): number {
  let score = 0;

  // 40% — Speciality match
  if (pro.specialities.includes(lead.categoryId)) {
    score += 40;
  }

  // 25% — Geographic match
  if (lead.cityId) {
    if (pro.cityId === lead.cityId) {
      score += 25;
    } else if (pro.zones.includes(lead.cityId)) {
      score += 15;
    }
  } else {
    score += 12; // No city preference = partial geo match
  }

  // 20% — Pro rating (0-5 scale)
  score += (pro.avgRating / 5) * 20;

  // 15% — Response time
  if (pro.responseTime !== null) {
    if (pro.responseTime < 30) score += 15;
    else if (pro.responseTime < 60) score += 12;
    else if (pro.responseTime < 120) score += 8;
    else if (pro.responseTime < 240) score += 4;
  }

  // Tier bonus
  if (pro.tier === "PREMIUM") score += 5;
  else if (pro.tier === "PRO") score += 2;

  return Math.round(score * 100) / 100;
}

/**
 * Route a lead to the top 3-5 matching professionals
 * Premium pros get a 10-second head start
 */
export function routeLead(
  pros: ProForMatching[],
  lead: LeadForMatching,
  maxPros: number = 5
): MatchResult[] {
  const scored = pros
    .map((pro) => ({
      proId: pro.id,
      score: calcMatchScore(pro, lead),
      tier: pro.tier,
    }))
    .filter((m) => m.score >= 20) // Minimum score threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, maxPros);

  return scored.map((m) => ({
    proId: m.proId,
    score: m.score,
    // Premium gets instant notification, others get 10s delay
    delayMs: m.tier === "PREMIUM" ? 0 : 10000,
  }));
}

/**
 * Lead redistribution timeout (4 hours)
 * If no pro responds within 4h, redistribute to next batch
 */
export const LEAD_TIMEOUT_MS = 4 * 60 * 60 * 1000; // 4 hours

/**
 * Anti-spam: max 1 lead per product type per 24h per phone number
 */
export const LEAD_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
