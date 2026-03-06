"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Building2,
  Calculator,
  Info,
  TrendingUp,
  ArrowLeftRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResultSummary } from "@/components/simulators/result-summary";
import {
  calcMourabahaPayment,
  calcMonthlyPayment,
  formatMAD,
} from "@/lib/finance";
import { PARTICIPATIVE_BANKS, INDICATIVE_RATES } from "@/lib/constants";

const BANK_RATES: Record<string, number> = {
  "bank-assafa": 4.99,
  "umnia-bank": 5.19,
  "dar-al-amane": 5.25,
  "al-yousr": 5.40,
  "arreda": 5.15,
};

export function MourabahaClient() {
  const t = useTranslations("tools");

  const [prix, setPrix] = useState(500000);
  const [taux, setTaux] = useState(5.2);
  const [duree, setDuree] = useState(20);

  const months = duree * 12;

  const result = useMemo(
    () => calcMourabahaPayment(prix, taux, months),
    [prix, taux, months]
  );

  const classicMonthly = useMemo(
    () => calcMonthlyPayment(prix, taux, months),
    [prix, taux, months]
  );

  const bankComparison = useMemo(() => {
    return PARTICIPATIVE_BANKS.map((bank) => {
      const rate = BANK_RATES[bank.slug] ?? INDICATIVE_RATES.mourabaha.avg;
      const res = calcMourabahaPayment(prix, rate, months);
      return {
        slug: bank.slug,
        name: bank.nameFr,
        nameAr: bank.nameAr,
        rate,
        monthly: res.monthlyPayment,
        totalCost: res.totalCost,
        margin: res.profitMargin,
      };
    }).sort((a, b) => a.monthly - b.monthly);
  }, [prix, months]);

  const resultItems = [
    {
      label: t("monthlyPayment"),
      value: result.monthlyPayment,
      format: "mad" as const,
      highlight: true,
    },
    {
      label: t("totalCost"),
      value: result.totalCost,
      format: "mad" as const,
    },
    {
      label: "Marge beneficiaire",
      value: result.profitMargin,
      format: "mad" as const,
    },
    {
      label: "Prix d'acquisition",
      value: result.acquisitionPrice,
      format: "mad" as const,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-primary/5 via-background to-background min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border-primary/20"
          >
            <Building2 className="h-3 w-3 me-1" />
            Finance participative
          </Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
            {t("mourabaha")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("mourabahaDesc")}. Comparez les 5 banques participatives du Maroc
            et simulez votre financement conforme a la Charia.
          </p>
        </div>

        <Tabs defaultValue="simulator" className="max-w-5xl mx-auto">
          <TabsList className="mx-auto mb-8 w-full sm:w-auto">
            <TabsTrigger value="simulator">
              <Calculator className="h-4 w-4 me-1.5" />
              Simulateur
            </TabsTrigger>
            <TabsTrigger value="compare">
              <ArrowLeftRight className="h-4 w-4 me-1.5" />
              Comparaison
            </TabsTrigger>
          </TabsList>

          {/* ===== Simulator Tab ===== */}
          <TabsContent value="simulator">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Inputs */}
              <div className="lg:col-span-3 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      Parametres du financement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Prix d'acquisition */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-foreground">
                          Prix d&apos;acquisition
                        </label>
                        <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {formatMAD(prix)}
                        </span>
                      </div>
                      <Slider
                        value={[prix]}
                        onValueChange={([v]) => setPrix(v)}
                        min={100000}
                        max={5000000}
                        step={10000}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                        <span>100 000 MAD</span>
                        <span>5 000 000 MAD</span>
                      </div>
                    </div>

                    {/* Taux de marge */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-foreground">
                          Taux de marge
                        </label>
                        <span className="text-sm font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                          {taux.toFixed(1)}%
                        </span>
                      </div>
                      <Slider
                        value={[taux * 10]}
                        onValueChange={([v]) => setTaux(v / 10)}
                        min={20}
                        max={80}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                        <span>2%</span>
                        <span>
                          Moy. {INDICATIVE_RATES.mourabaha.avg}%
                        </span>
                        <span>8%</span>
                      </div>
                    </div>

                    {/* Duree */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-foreground">
                          {t("duration")}
                        </label>
                        <span className="text-sm font-bold text-foreground bg-muted px-3 py-1 rounded-full">
                          {duree} {t("years")}
                        </span>
                      </div>
                      <Slider
                        value={[duree]}
                        onValueChange={([v]) => setDuree(v)}
                        min={5}
                        max={25}
                        step={1}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                        <span>5 {t("years")}</span>
                        <span>25 {t("years")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mourabaha vs Classic comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ArrowLeftRight className="h-5 w-5 text-secondary" />
                      Mourabaha vs Credit classique
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Mourabaha */}
                      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <Building2 className="h-4 w-4 text-primary" />
                          <p className="text-sm font-semibold text-primary">
                            Mourabaha
                          </p>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                          {formatMAD(result.monthlyPayment)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          /mois
                        </p>
                        <div className="mt-3 pt-3 border-t border-primary/20">
                          <p className="text-xs text-muted-foreground">
                            Cout total
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {formatMAD(result.totalCost)}
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            Marge
                          </p>
                          <p className="text-sm font-semibold text-primary">
                            {formatMAD(result.profitMargin)}
                          </p>
                        </div>
                      </div>

                      {/* Classic */}
                      <div className="rounded-xl border-2 border-secondary/30 bg-secondary/5 p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <TrendingUp className="h-4 w-4 text-secondary" />
                          <p className="text-sm font-semibold text-secondary">
                            Credit classique
                          </p>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                          {formatMAD(classicMonthly)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          /mois
                        </p>
                        <div className="mt-3 pt-3 border-t border-secondary/20">
                          <p className="text-xs text-muted-foreground">
                            Cout total
                          </p>
                          <p className="text-sm font-semibold text-foreground">
                            {formatMAD(classicMonthly * months)}
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground">
                            Interets
                          </p>
                          <p className="text-sm font-semibold text-secondary">
                            {formatMAD(classicMonthly * months - prix)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Difference bar */}
                    <div className="mt-4 rounded-lg bg-muted p-3 text-center">
                      <p className="text-xs text-muted-foreground mb-1">
                        Difference mensuelle
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          result.monthlyPayment > classicMonthly
                            ? "text-destructive"
                            : "text-primary"
                        }`}
                      >
                        {result.monthlyPayment > classicMonthly ? "+" : ""}
                        {formatMAD(
                          Math.round(result.monthlyPayment - classicMonthly)
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
                  <CardHeader>
                    <CardTitle className="text-lg text-center">
                      Resultats de la simulation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResultSummary items={resultItems} />
                  </CardContent>
                </Card>

                {/* Info box */}
                <Card className="bg-secondary/5 border-secondary/20">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Info className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Qu&apos;est-ce que la Mourabaha ?
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          La Mourabaha est un mode de financement conforme a la
                          Charia. La banque achete le bien et vous le revend avec
                          une marge beneficiaire connue a l&apos;avance. Pas
                          d&apos;interet (riba), le cout total est fixe des la
                          signature.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* ===== Comparison Tab ===== */}
          <TabsContent value="compare">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Comparaison des banques participatives
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Pour un bien de {formatMAD(prix)} sur {duree} ans
                </p>
              </CardHeader>
              <CardContent>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-start py-3 pe-4 font-medium">
                          Banque
                        </th>
                        <th className="text-center py-3 px-4 font-medium">
                          Taux
                        </th>
                        <th className="text-center py-3 px-4 font-medium">
                          Mensualite
                        </th>
                        <th className="text-center py-3 px-4 font-medium">
                          Marge totale
                        </th>
                        <th className="text-center py-3 ps-4 font-medium">
                          Cout total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bankComparison.map((bank, idx) => (
                        <tr
                          key={bank.slug}
                          className={`border-b last:border-0 transition-colors hover:bg-muted/50 ${
                            idx === 0 ? "bg-primary/5" : ""
                          }`}
                        >
                          <td className="py-3.5 pe-4">
                            <div className="flex items-center gap-2">
                              {idx === 0 && (
                                <Badge className="bg-primary text-white text-[10px] px-1.5 py-0">
                                  #1
                                </Badge>
                              )}
                              <div>
                                <p className="font-medium text-foreground">
                                  {bank.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {bank.nameAr}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center py-3.5 px-4">
                            <Badge
                              variant="outline"
                              className="border-secondary/30 text-secondary"
                            >
                              {bank.rate}%
                            </Badge>
                          </td>
                          <td className="text-center py-3.5 px-4 font-semibold text-foreground">
                            {formatMAD(bank.monthly)}
                          </td>
                          <td className="text-center py-3.5 px-4 text-muted-foreground">
                            {formatMAD(bank.margin)}
                          </td>
                          <td className="text-center py-3.5 ps-4 text-muted-foreground">
                            {formatMAD(bank.totalCost)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {bankComparison.map((bank, idx) => (
                    <div
                      key={bank.slug}
                      className={`rounded-xl border p-4 ${
                        idx === 0
                          ? "border-primary/30 bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {idx === 0 && (
                            <Badge className="bg-primary text-white text-[10px] px-1.5 py-0">
                              #1
                            </Badge>
                          )}
                          <div>
                            <p className="font-medium text-foreground text-sm">
                              {bank.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {bank.nameAr}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-secondary/30 text-secondary"
                        >
                          {bank.rate}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                            Mensualite
                          </p>
                          <p className="text-sm font-bold text-foreground">
                            {formatMAD(bank.monthly)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                            Marge
                          </p>
                          <p className="text-sm font-semibold text-muted-foreground">
                            {formatMAD(bank.margin)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                            Cout total
                          </p>
                          <p className="text-sm font-semibold text-muted-foreground">
                            {formatMAD(bank.totalCost)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Visual bar comparison */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-sm font-semibold text-foreground mb-4">
                    Comparaison visuelle des mensualites
                  </h3>
                  <div className="space-y-3">
                    {bankComparison.map((bank, idx) => {
                      const maxMonthly = bankComparison[bankComparison.length - 1]?.monthly ?? 1;
                      const widthPct = Math.max(
                        30,
                        (bank.monthly / maxMonthly) * 100
                      );
                      return (
                        <div key={bank.slug} className="flex items-center gap-3">
                          <p className="text-xs text-muted-foreground w-24 shrink-0 truncate">
                            {bank.name}
                          </p>
                          <div className="flex-1 h-8 bg-muted rounded-lg overflow-hidden relative">
                            <div
                              className={`h-full rounded-lg flex items-center justify-end pe-2 transition-all duration-500 ${
                                idx === 0
                                  ? "bg-gradient-to-r from-primary/80 to-primary"
                                  : "bg-gradient-to-r from-secondary/40 to-secondary/70"
                              }`}
                              style={{ width: `${widthPct}%` }}
                            >
                              <span className="text-[11px] font-semibold text-white whitespace-nowrap">
                                {formatMAD(bank.monthly)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
