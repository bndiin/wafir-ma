"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  TrendingDown,
  Banknote,
  Info,
  Car,
  Sofa,
  Plane,
  GraduationCap,
  MoreHorizontal,
  Building2,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ResultSummary } from "@/components/simulators/result-summary";
import { AmortizationChart } from "@/components/simulators/amortization-chart";
import {
  calcMonthlyPayment,
  calcAmortizationSchedule,
  formatMAD,
} from "@/lib/finance";
import { SOCIETES_FINANCEMENT, INDICATIVE_RATES } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Purpose options
// ---------------------------------------------------------------------------
const PURPOSES = [
  { value: "auto", label: "Auto", icon: Car },
  { value: "equipement", label: "Équipement maison", icon: Sofa },
  { value: "voyage", label: "Voyage", icon: Plane },
  { value: "etudes", label: "Études", icon: GraduationCap },
  { value: "autre", label: "Autre", icon: MoreHorizontal },
] as const;

// ---------------------------------------------------------------------------
// Indicative rates per société de financement (illustrative ranges)
// ---------------------------------------------------------------------------
const SOCIETE_RATES: Record<string, { min: number; max: number; label: string }> = {
  wafasalaf: { min: 6.5, max: 10.0, label: "Wafasalaf" },
  cetelem: { min: 7.0, max: 11.0, label: "Cetelem" },
  sofac: { min: 7.5, max: 11.5, label: "SOFAC" },
  salafin: { min: 7.0, max: 10.5, label: "Salafin" },
  "dar-salaf": { min: 7.5, max: 12.0, label: "Dar Salaf" },
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export function ConsumerCreditSimulator({ locale }: { locale: string }) {
  // ---- State ----
  const [amount, setAmount] = useState(50_000);
  const [duration, setDuration] = useState(48);
  const [rate, setRate] = useState(7.5);
  const [purpose, setPurpose] = useState<string>("auto");

  // ---- Calculations ----
  const monthlyPayment = useMemo(
    () => calcMonthlyPayment(amount, rate, duration),
    [amount, rate, duration]
  );

  const totalCost = useMemo(
    () => Math.round(monthlyPayment * duration * 100) / 100,
    [monthlyPayment, duration]
  );

  const totalInterest = useMemo(
    () => Math.round((totalCost - amount) * 100) / 100,
    [totalCost, amount]
  );

  const schedule = useMemo(
    () => calcAmortizationSchedule(amount, rate, duration),
    [amount, rate, duration]
  );

  // ---- Comparison data ----
  const comparisonData = useMemo(() => {
    return SOCIETES_FINANCEMENT.map((societe) => {
      const rates = SOCIETE_RATES[societe.slug];
      if (!rates) return null;

      const avgRate = Math.round(((rates.min + rates.max) / 2) * 10) / 10;
      const monthly = calcMonthlyPayment(amount, avgRate, duration);
      const total = Math.round(monthly * duration * 100) / 100;
      const interest = Math.round((total - amount) * 100) / 100;

      return {
        slug: societe.slug,
        name: societe.nameFr,
        nameAr: societe.nameAr,
        website: societe.website,
        rateMin: rates.min,
        rateMax: rates.max,
        avgRate,
        monthly,
        total,
        interest,
      };
    }).filter(Boolean) as {
      slug: string;
      name: string;
      nameAr: string;
      website: string | null;
      rateMin: number;
      rateMax: number;
      avgRate: number;
      monthly: number;
      total: number;
      interest: number;
    }[];
  }, [amount, duration]);

  // Find best offer (lowest monthly payment)
  const bestSlug = useMemo(() => {
    if (comparisonData.length === 0) return null;
    return comparisonData.reduce((best, curr) =>
      curr.monthly < best.monthly ? curr : best
    ).slug;
  }, [comparisonData]);

  // ---- Purpose icon ----
  const selectedPurpose = PURPOSES.find((p) => p.value === purpose);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* ============================================================ */}
      {/* SIMULATOR: inputs + results side by side on desktop           */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ---------- LEFT: Inputs (3/5 on desktop) ---------- */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-primary" />
                Paramètres du crédit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Amount Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Montant du crédit
                  </label>
                  <span className="text-sm font-semibold text-primary tabular-nums">
                    {formatMAD(amount)}
                  </span>
                </div>
                <Slider
                  value={[amount]}
                  onValueChange={(v) => setAmount(v[0])}
                  min={5_000}
                  max={500_000}
                  step={5_000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 000 MAD</span>
                  <span>500 000 MAD</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Durée de remboursement
                  </label>
                  <span className="text-sm font-semibold text-primary tabular-nums">
                    {duration} mois
                    <span className="text-muted-foreground font-normal ml-1">
                      ({(duration / 12).toFixed(1)} ans)
                    </span>
                  </span>
                </div>
                <Slider
                  value={[duration]}
                  onValueChange={(v) => setDuration(v[0])}
                  min={6}
                  max={84}
                  step={6}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>6 mois</span>
                  <span>84 mois (7 ans)</span>
                </div>
              </div>

              {/* Rate Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Taux d&apos;intérêt annuel
                  </label>
                  <span className="text-sm font-semibold text-primary tabular-nums">
                    {rate.toFixed(1)}%
                  </span>
                </div>
                <Slider
                  value={[rate]}
                  onValueChange={(v) => setRate(Math.round(v[0] * 10) / 10)}
                  min={6}
                  max={15}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>6,0%</span>
                  <span>15,0%</span>
                </div>
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-md p-2">
                  <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span>
                    Taux indicatif moyen au Maroc :{" "}
                    <strong>{INDICATIVE_RATES.creditConsommation.avg}%</strong>{" "}
                    (de {INDICATIVE_RATES.creditConsommation.min}% à{" "}
                    {INDICATIVE_RATES.creditConsommation.max}%)
                  </span>
                </div>
              </div>

              {/* Purpose Selector */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                  Objet du crédit
                </label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir l'objet du crédit" />
                  </SelectTrigger>
                  <SelectContent>
                    {PURPOSES.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <div className="flex items-center gap-2">
                          <p.icon className="h-4 w-4 text-muted-foreground" />
                          {p.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ---------- RIGHT: Results (2/5 on desktop) ---------- */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Result Summary */}
          <Card className="border-primary/20 bg-primary/[0.02]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Banknote className="h-5 w-5 text-primary" />
                Résultat de la simulation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResultSummary
                items={[
                  {
                    label: "Mensualité",
                    value: monthlyPayment,
                    format: "mad",
                    highlight: true,
                  },
                  {
                    label: "Coût total du crédit",
                    value: totalCost,
                    format: "mad",
                  },
                  {
                    label: "Intérêts totaux",
                    value: totalInterest,
                    format: "mad",
                  },
                  {
                    label: "Durée",
                    value: duration,
                    format: "months",
                  },
                ]}
              />

              {/* Visual summary */}
              <div className="mt-5 space-y-3">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Répartition du coût
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden flex">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{
                      width: `${(amount / totalCost) * 100}%`,
                    }}
                  />
                  <div
                    className="h-full bg-secondary transition-all duration-300"
                    style={{
                      width: `${(totalInterest / totalCost) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
                    Capital : {((amount / totalCost) * 100).toFixed(1)}%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-secondary" />
                    Intérêts : {((totalInterest / totalCost) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick info card */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {selectedPurpose && (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <selectedPurpose.icon className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-0.5">
                    Crédit {selectedPurpose?.label ?? ""}
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Pour {formatMAD(amount)} sur {duration} mois, vous
                    rembourserez{" "}
                    <strong className="text-foreground">
                      {formatMAD(monthlyPayment)}/mois
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Button asChild size="lg" className="w-full text-base h-12">
            <Link href={`/${locale}/comparer`}>
              Comparer les offres
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TABS: Amortization + Comparison                              */}
      {/* ============================================================ */}
      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="chart" className="gap-1.5">
            <TrendingDown className="h-4 w-4" />
            Tableau d&apos;amortissement
          </TabsTrigger>
          <TabsTrigger value="compare" className="gap-1.5">
            <Building2 className="h-4 w-4" />
            Comparaison des organismes
          </TabsTrigger>
        </TabsList>

        {/* ---- Tab: Amortization Chart ---- */}
        <TabsContent value="chart" className="mt-4">
          <AmortizationChart data={schedule} />

          {/* Amortization Table (first 12 + last rows) */}
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Détail des échéances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mois</TableHead>
                    <TableHead className="text-right">Mensualité</TableHead>
                    <TableHead className="text-right">Capital</TableHead>
                    <TableHead className="text-right">Intérêts</TableHead>
                    <TableHead className="text-right">Solde restant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule
                    .filter((row, i) => {
                      // Show first 12 months, and last month
                      if (i < 12) return true;
                      if (i === 12 && schedule.length > 13) return true; // separator row
                      if (i === schedule.length - 1) return true;
                      return false;
                    })
                    .map((row, i, arr) => {
                      // If this is position 12 and there are more rows, show ellipsis
                      if (i === 12 && schedule.length > 13) {
                        return (
                          <TableRow key="ellipsis">
                            <TableCell
                              colSpan={5}
                              className="text-center text-muted-foreground py-3"
                            >
                              &middot;&middot;&middot; {schedule.length - 13}{" "}
                              échéances masquées &middot;&middot;&middot;
                            </TableCell>
                          </TableRow>
                        );
                      }
                      return (
                        <TableRow key={row.month}>
                          <TableCell className="font-medium">
                            {row.month}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatMAD(row.payment)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatMAD(row.principal)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatMAD(row.interest)}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">
                            {formatMAD(row.balance)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---- Tab: Comparison ---- */}
        <TabsContent value="compare" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-5 w-5 text-primary" />
                Comparaison des sociétés de financement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Mensualités estimées pour un crédit de{" "}
                <strong>{formatMAD(amount)}</strong> sur{" "}
                <strong>{duration} mois</strong> selon les taux indicatifs
                moyens.
              </p>

              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Organisme</TableHead>
                      <TableHead className="text-center">Taux (fourchette)</TableHead>
                      <TableHead className="text-center">Taux moyen</TableHead>
                      <TableHead className="text-right">Mensualité</TableHead>
                      <TableHead className="text-right">Coût total</TableHead>
                      <TableHead className="text-right">Intérêts</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonData.map((s) => (
                      <TableRow
                        key={s.slug}
                        className={
                          s.slug === bestSlug
                            ? "bg-primary/5 border-primary/20"
                            : ""
                        }
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{s.name}</span>
                            {s.slug === bestSlug && (
                              <Badge
                                variant="default"
                                className="text-[10px] px-1.5 py-0"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-0.5" />
                                Meilleur taux
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center tabular-nums">
                          {s.rateMin}% – {s.rateMax}%
                        </TableCell>
                        <TableCell className="text-center tabular-nums font-medium">
                          {s.avgRate}%
                        </TableCell>
                        <TableCell className="text-right tabular-nums font-semibold text-primary">
                          {formatMAD(s.monthly)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatMAD(s.total)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">
                          {formatMAD(s.interest)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {comparisonData.map((s) => (
                  <Card
                    key={s.slug}
                    className={
                      s.slug === bestSlug
                        ? "border-primary/30 bg-primary/[0.02]"
                        : ""
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {s.name}
                          </span>
                          {s.slug === bestSlug && (
                            <Badge
                              variant="default"
                              className="text-[10px] px-1.5 py-0"
                            >
                              Meilleur
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {s.rateMin}% – {s.rateMax}%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-xs text-muted-foreground">Taux moy.</p>
                          <p className="text-sm font-medium tabular-nums">
                            {s.avgRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Mensualité</p>
                          <p className="text-sm font-bold text-primary tabular-nums">
                            {formatMAD(s.monthly)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Intérêts</p>
                          <p className="text-sm font-medium tabular-nums">
                            {formatMAD(s.interest)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex items-start gap-1.5 text-xs text-muted-foreground bg-muted/50 rounded-md p-3 mt-4">
                <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span>
                  Les taux affichés sont indicatifs et peuvent varier selon votre profil,
                  le montant et la durée du crédit. Contactez directement les
                  organismes pour obtenir un taux personnalisé.
                </span>
              </div>
            </CardContent>
          </Card>

          {/* CTA for comparison */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Trouvez le meilleur taux pour votre crédit
                </h3>
                <p className="text-sm text-muted-foreground">
                  Comparez gratuitement les offres de +5 sociétés de financement en 2 minutes.
                </p>
              </div>
              <Button asChild size="lg" className="shrink-0">
                <Link href={`/${locale}/comparer`}>
                  Comparer maintenant
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ============================================================ */}
      {/* SEO Content Section                                          */}
      {/* ============================================================ */}
      <section className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-6 md:p-8 prose prose-sm max-w-none">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Comment fonctionne le crédit à la consommation au Maroc ?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Le crédit à la consommation permet de financer des projets personnels :
              achat de voiture, équipement de la maison, voyage, études ou tout
              autre besoin. Au Maroc, les principales sociétés de financement comme
              Wafasalaf, Cetelem, SOFAC, Salafin et Dar Salaf proposent des offres
              avec des taux allant de{" "}
              <strong>{INDICATIVE_RATES.creditConsommation.min}%</strong> à{" "}
              <strong>{INDICATIVE_RATES.creditConsommation.max}%</strong> selon le profil
              de l&apos;emprunteur et la durée.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Comment est calculée la mensualité ?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              La mensualité est calculée selon la formule d&apos;annuité constante :
              M = P &times; [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1],
              où P est le montant emprunté, r le taux mensuel et n le nombre de
              mois. Notre simulateur effectue ce calcul en temps réel pour vous
              aider à anticiper vos remboursements.
            </p>
            <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">
              Conseils pour obtenir le meilleur taux
            </h3>
            <ul className="text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Comparez les offres de plusieurs organismes de financement</li>
              <li>Négociez le taux en fonction de votre profil (revenu, ancienneté)</li>
              <li>Optez pour une durée plus courte pour réduire le coût total</li>
              <li>Vérifiez le TEG (Taux Effectif Global) qui inclut les frais de dossier</li>
              <li>Assurez-vous que votre taux d&apos;endettement reste sous 33%</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
