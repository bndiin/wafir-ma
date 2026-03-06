"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Calculator, Building2, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import {
  CONVENTIONAL_BANKS,
  PARTICIPATIVE_BANKS,
  INDICATIVE_RATES,
} from "@/lib/constants";

// ---------------------------------------------------------------------------
// Bank comparison data — indicative spread around the average mortgage rate
// ---------------------------------------------------------------------------
const BANK_COMPARISON = [
  { slug: "attijariwafa-bank", name: "Attijariwafa Bank", rate: 3.89 },
  { slug: "banque-populaire", name: "Banque Populaire", rate: 3.95 },
  { slug: "bmce-bank-of-africa", name: "BMCE Bank of Africa", rate: 4.10 },
  { slug: "cih-bank", name: "CIH Bank", rate: 4.15 },
  { slug: "societe-generale", name: "Societe Generale", rate: 4.20 },
  { slug: "bmci", name: "BMCI (BNP Paribas)", rate: 4.25 },
  { slug: "credit-du-maroc", name: "Credit du Maroc", rate: 4.35 },
  { slug: "credit-agricole-maroc", name: "Credit Agricole", rate: 4.45 },
  { slug: "bank-assafa", name: "Bank Assafa (Mourabaha)", rate: 4.90 },
  { slug: "umnia-bank", name: "Umnia Bank (Mourabaha)", rate: 5.10 },
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function MortgageSimulator() {
  const t = useTranslations("tools");
  const tCta = useTranslations("cta");

  // ------ State ------
  const [amount, setAmount] = useState(500_000);
  const [duration, setDuration] = useState(20);
  const [rate, setRate] = useState(4.2);

  const months = duration * 12;

  // ------ Calculations (memoised) ------
  const monthlyPayment = useMemo(
    () => calcMonthlyPayment(amount, rate, months),
    [amount, rate, months]
  );

  const totalCost = useMemo(() => monthlyPayment * months, [monthlyPayment, months]);
  const totalInterest = useMemo(() => totalCost - amount, [totalCost, amount]);

  const schedule = useMemo(
    () => calcAmortizationSchedule(amount, rate, months),
    [amount, rate, months]
  );

  // Taux d'endettement approximatif (assume average Moroccan salary ~8 000 MAD)
  const assumedIncome = 15_000;
  const debtRatio = (monthlyPayment / assumedIncome) * 100;

  // Bank comparison rows
  const bankRows = useMemo(
    () =>
      BANK_COMPARISON.map((bank) => ({
        ...bank,
        monthly: calcMonthlyPayment(amount, bank.rate, months),
      })),
    [amount, months]
  );

  // ------ Helpers ------
  function handleAmountChange(val: number[]) {
    setAmount(val[0]);
  }

  function handleDurationChange(val: number[]) {
    setDuration(val[0]);
  }

  function handleRateInput(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value);
    if (!isNaN(v) && v >= 2 && v <= 10) {
      setRate(Math.round(v * 10) / 10);
    }
  }

  // ------ Render ------
  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <Badge variant="secondary" className="mb-3 bg-primary/10 text-primary border-primary/20">
          <Calculator className="me-1.5 h-3.5 w-3.5" />
          {t("mortgageSimulator")}
        </Badge>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
          Simulateur de Cr&eacute;dit Immobilier
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculez vos mensualit&eacute;s, visualisez votre tableau d&apos;amortissement et comparez
          les taux indicatifs des banques marocaines &mdash; 100% gratuit.
        </p>
      </div>

      {/* Main Grid: Inputs | Results */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        {/* ---- LEFT: Inputs ---- */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Param&egrave;tres du cr&eacute;dit
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Amount Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {t("amount")}
                  </label>
                  <span className="text-sm font-bold text-primary">
                    {formatMAD(amount)}
                  </span>
                </div>
                <Slider
                  value={[amount]}
                  onValueChange={handleAmountChange}
                  min={100_000}
                  max={5_000_000}
                  step={50_000}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>100 000 MAD</span>
                  <span>5 000 000 MAD</span>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {t("duration")}
                  </label>
                  <span className="text-sm font-bold text-primary">
                    {duration} {t("years")}
                  </span>
                </div>
                <Slider
                  value={[duration]}
                  onValueChange={handleDurationChange}
                  min={5}
                  max={30}
                  step={1}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 {t("years")}</span>
                  <span>30 {t("years")}</span>
                </div>
              </div>

              {/* Rate Input */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    {t("rate")} (%)
                  </label>
                  <Badge variant="outline" className="text-xs">
                    Moy. {INDICATIVE_RATES.creditImmobilier.avg}%
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={rate}
                    onChange={handleRateInput}
                    min={2}
                    max={10}
                    step={0.1}
                    className="w-24 text-center font-medium"
                  />
                  <Slider
                    value={[rate]}
                    onValueChange={(val) => setRate(Math.round(val[0] * 10) / 10)}
                    min={2}
                    max={10}
                    step={0.1}
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>2%</span>
                  <span>
                    March&eacute; : {INDICATIVE_RATES.creditImmobilier.min}% &ndash;{" "}
                    {INDICATIVE_RATES.creditImmobilier.max}%
                  </span>
                  <span>10%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary Card — visible on mobile above tabs */}
          <div className="lg:hidden">
            <ResultSummary
              items={[
                {
                  label: t("monthlyPayment"),
                  value: monthlyPayment,
                  format: "mad",
                  highlight: true,
                },
                { label: t("totalCost"), value: totalCost, format: "mad" },
                { label: t("totalInterest"), value: totalInterest, format: "mad" },
                { label: t("debtRatio"), value: debtRatio, format: "percent" },
              ]}
            />
          </div>
        </div>

        {/* ---- RIGHT: Results ---- */}
        <div className="lg:col-span-3 space-y-6">
          {/* Summary — desktop only */}
          <div className="hidden lg:block">
            <ResultSummary
              items={[
                {
                  label: t("monthlyPayment"),
                  value: monthlyPayment,
                  format: "mad",
                  highlight: true,
                },
                { label: t("totalCost"), value: totalCost, format: "mad" },
                { label: t("totalInterest"), value: totalInterest, format: "mad" },
                { label: t("debtRatio"), value: debtRatio, format: "percent" },
              ]}
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="resultats">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="resultats">R&eacute;sultats</TabsTrigger>
              <TabsTrigger value="amortissement">Amortissement</TabsTrigger>
              <TabsTrigger value="banques">
                <Building2 className="me-1.5 h-4 w-4 hidden sm:inline" />
                Banques
              </TabsTrigger>
            </TabsList>

            {/* TAB 1 — Résultats */}
            <TabsContent value="resultats" className="mt-4 space-y-4">
              <AmortizationChart data={schedule} />

              {/* Quick recap */}
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-foreground mb-3">
                    R&eacute;capitulatif de votre simulation
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("amount")}</span>
                      <span className="font-medium">{formatMAD(amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("duration")}</span>
                      <span className="font-medium">
                        {duration} {t("years")} ({months} {t("months")})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("rate")}</span>
                      <span className="font-medium">{rate.toFixed(2)}%</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between">
                      <span className="text-muted-foreground font-medium">
                        {t("monthlyPayment")}
                      </span>
                      <span className="font-bold text-primary">
                        {formatMAD(monthlyPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("totalInterest")}</span>
                      <span className="font-medium text-secondary">
                        {formatMAD(totalInterest)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2 — Amortization Table */}
            <TabsContent value="amortissement" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Tableau d&apos;amortissement
                    </CardTitle>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="me-1.5 h-3.5 w-3.5" />
                      {t("downloadPdf")}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[500px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mois</TableHead>
                          <TableHead className="text-right">Mensualit&eacute;</TableHead>
                          <TableHead className="text-right">Capital</TableHead>
                          <TableHead className="text-right">Int&eacute;r&ecirc;ts</TableHead>
                          <TableHead className="text-right">Solde restant</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {schedule.map((row) => (
                          <TableRow key={row.month}>
                            <TableCell className="font-medium">{row.month}</TableCell>
                            <TableCell className="text-right">
                              {formatMAD(row.payment)}
                            </TableCell>
                            <TableCell className="text-right text-primary">
                              {formatMAD(row.principal)}
                            </TableCell>
                            <TableCell className="text-right text-secondary">
                              {formatMAD(row.interest)}
                            </TableCell>
                            <TableCell className="text-right">
                              {formatMAD(row.balance)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3 — Bank Comparison */}
            <TabsContent value="banques" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Comparaison des banques
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Taux indicatifs pour un cr&eacute;dit immobilier de{" "}
                    <span className="font-medium text-foreground">{formatMAD(amount)}</span>{" "}
                    sur{" "}
                    <span className="font-medium text-foreground">
                      {duration} {t("years")}
                    </span>
                    . Soumis &agrave; conditions d&apos;&eacute;ligibilit&eacute;.
                  </p>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Banque</TableHead>
                        <TableHead className="text-center">Taux</TableHead>
                        <TableHead className="text-right">Mensualit&eacute;</TableHead>
                        <TableHead className="text-right hidden sm:table-cell">
                          Co&ucirc;t total
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bankRows.map((bank, i) => (
                        <TableRow
                          key={bank.slug}
                          className={i === 0 ? "bg-primary/5" : ""}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {bank.name}
                              </span>
                              {i === 0 && (
                                <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0">
                                  Meilleur
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-medium">
                            {bank.rate.toFixed(2)}%
                          </TableCell>
                          <TableCell className="text-right font-semibold text-primary">
                            {formatMAD(bank.monthly)}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground hidden sm:table-cell">
                            {formatMAD(bank.monthly * months)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    * Taux indicatifs, susceptibles de varier selon votre profil,
                    apport et dur&eacute;e. Derniere mise &agrave; jour : Mars 2026.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="py-8 px-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Trouvez le meilleur taux pour votre projet immobilier
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Comparez les offres de +40 banques et assureurs gratuitement.
              R&eacute;ponse personnalis&eacute;e en 2 minutes.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/comparer">
                {tCta("compareNow")}
                <ArrowRight className="ms-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
