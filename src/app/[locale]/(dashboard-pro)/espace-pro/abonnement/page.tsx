"use client";

import {
  Check,
  X,
  Crown,
  Zap,
  Shield,
  CreditCard,
  Calendar,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SUBSCRIPTION_TIERS } from "@/lib/constants";

// ─── Plan data ─────────────────────────────────────────────────
const PLANS = [
  {
    key: "GRATUIT" as const,
    name: "Gratuit",
    price: SUBSCRIPTION_TIERS.GRATUIT.priceMAD,
    period: "",
    description: "Pour decouvrir la plateforme",
    icon: Shield,
    color: "text-muted-foreground",
    borderColor: "border-border",
    bgAccent: "bg-muted/50",
    features: SUBSCRIPTION_TIERS.GRATUIT.features,
    cta: "Plan actuel",
    popular: false,
  },
  {
    key: "PRO" as const,
    name: "Pro",
    price: SUBSCRIPTION_TIERS.PRO.priceMAD,
    period: "/mois",
    description: "Pour les professionnels actifs",
    icon: Zap,
    color: "text-[#0984e3]",
    borderColor: "border-[#0984e3]",
    bgAccent: "bg-[#0984e3]/5",
    features: SUBSCRIPTION_TIERS.PRO.features,
    cta: "Plan actuel",
    popular: true,
  },
  {
    key: "PREMIUM" as const,
    name: "Premium",
    price: SUBSCRIPTION_TIERS.PREMIUM.priceMAD,
    period: "/mois",
    description: "Pour maximiser vos resultats",
    icon: Crown,
    color: "text-amber-500",
    borderColor: "border-amber-400",
    bgAccent: "bg-amber-50",
    features: SUBSCRIPTION_TIERS.PREMIUM.features,
    cta: "Passer au Premium",
    popular: false,
  },
];

// Currently active plan
const CURRENT_PLAN: string = "PRO";

// ─── Feature comparison ────────────────────────────────────────
const COMPARISON_FEATURES = [
  { feature: "Profil dans l'annuaire", gratuit: true, pro: true, premium: true },
  { feature: "Leads par mois", gratuit: "5", pro: "30", premium: "Illimites" },
  { feature: "Badge verifie", gratuit: false, pro: true, premium: true },
  { feature: "Badge premium", gratuit: false, pro: false, premium: true },
  { feature: "Analytics de base", gratuit: false, pro: true, premium: true },
  { feature: "Analytics avances", gratuit: false, pro: false, premium: true },
  { feature: "Priorite dans les resultats", gratuit: false, pro: true, premium: true },
  { feature: "Position #1 garantie", gratuit: false, pro: false, premium: true },
  { feature: "Support dedie", gratuit: false, pro: false, premium: true },
  { feature: "Exclusivite leads", gratuit: false, pro: false, premium: true },
];

// ─── Payment history ───────────────────────────────────────────
const PAYMENT_HISTORY = [
  {
    id: "PAY-2026-003",
    date: "01 Mar 2026",
    amount: "149 MAD",
    method: "CMI",
    status: "Paye",
  },
  {
    id: "PAY-2026-002",
    date: "01 Fev 2026",
    amount: "149 MAD",
    method: "CMI",
    status: "Paye",
  },
  {
    id: "PAY-2026-001",
    date: "01 Jan 2026",
    amount: "149 MAD",
    method: "CMI",
    status: "Paye",
  },
  {
    id: "PAY-2025-012",
    date: "01 Dec 2025",
    amount: "149 MAD",
    method: "Orange Money",
    status: "Paye",
  },
  {
    id: "PAY-2025-011",
    date: "01 Nov 2025",
    amount: "149 MAD",
    method: "Orange Money",
    status: "Paye",
  },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium text-foreground">{value}</span>;
  }
  return value ? (
    <Check className="h-4 w-4 text-emerald-600" />
  ) : (
    <X className="h-4 w-4 text-muted-foreground/40" />
  );
}

export default function AbonnementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Abonnement</h1>
        <p className="text-sm text-muted-foreground">
          Gerez votre abonnement et consultez vos factures
        </p>
      </div>

      {/* Current plan card */}
      <Card className="border-[#0984e3]/30 bg-[#0984e3]/5">
        <CardContent className="pt-0">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0984e3]/10">
                <Zap className="h-7 w-7 text-[#0984e3]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-foreground">Plan Pro</h3>
                  <Badge className="bg-[#0984e3] text-white">Actif</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Renouvellement le 01 Avr 2026
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-[#0984e3]">
                149 <span className="text-base font-normal text-muted-foreground">MAD/mois</span>
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                Prochain paiement: 01 Avr 2026
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Leads utilises ce mois</span>
              <span className="font-semibold">23 / 30</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[#0984e3] transition-all"
                style={{ width: "77%" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing cards */}
      <div>
        <h2 className="mb-4 text-lg font-bold text-foreground">
          Choisir une offre
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            const isCurrent = plan.key === CURRENT_PLAN;
            return (
              <Card
                key={plan.key}
                className={`relative overflow-hidden ${
                  plan.popular ? `border-2 ${plan.borderColor}` : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0">
                    <div className="translate-x-[30%] translate-y-[-10%] rotate-45 bg-[#0984e3] px-8 py-1 text-[10px] font-bold text-white">
                      POPULAIRE
                    </div>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${plan.bgAccent}`}
                  >
                    <Icon className={`h-6 w-6 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.price > 0 ? " MAD" : ""}
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check
                          className={`h-4 w-4 shrink-0 ${
                            plan.popular ? "text-[#0984e3]" : "text-emerald-600"
                          }`}
                        />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {isCurrent ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      Plan actuel
                    </Button>
                  ) : (
                    <Button
                      className={`w-full gap-2 ${
                        plan.key === "PREMIUM"
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : plan.key === "PRO"
                            ? "bg-[#0984e3] text-white hover:bg-[#0984e3]/90"
                            : ""
                      }`}
                      variant={plan.key === "GRATUIT" ? "outline" : "default"}
                    >
                      Changer d&apos;offre
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Feature comparison table */}
      <Card>
        <CardHeader>
          <CardTitle>Comparaison des offres</CardTitle>
          <CardDescription>
            Decouvrez toutes les fonctionnalites incluses dans chaque plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Fonctionnalite</TableHead>
                <TableHead className="text-center">Gratuit</TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    Pro
                    <Badge className="bg-[#0984e3] text-white text-[10px] px-1.5 py-0">
                      Actuel
                    </Badge>
                  </div>
                </TableHead>
                <TableHead className="text-center">Premium</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARISON_FEATURES.map((row) => (
                <TableRow key={row.feature}>
                  <TableCell className="text-sm font-medium">
                    {row.feature}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <FeatureCell value={row.gratuit} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center bg-[#0984e3]/5">
                    <div className="flex justify-center">
                      <FeatureCell value={row.pro} />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <FeatureCell value={row.premium} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-[#0984e3]" />
            <CardTitle>Historique des paiements</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Methode</TableHead>
                <TableHead className="text-right">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAYMENT_HISTORY.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-xs">
                    {payment.id}
                  </TableCell>
                  <TableCell className="text-sm">{payment.date}</TableCell>
                  <TableCell className="text-sm font-medium">
                    {payment.amount}
                  </TableCell>
                  <TableCell className="text-sm">{payment.method}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className="border-emerald-200 bg-emerald-50 text-emerald-700"
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
