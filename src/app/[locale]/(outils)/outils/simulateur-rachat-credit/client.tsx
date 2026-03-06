"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Calculator,
  Plus,
  Trash2,
  ArrowRight,
  TrendingDown,
  Info,
  RefreshCw,
  Wallet,
  PiggyBank,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { ResultSummary } from "@/components/simulators/result-summary";
import {
  calcDebtConsolidation,
  formatMAD,
  type Debt,
} from "@/lib/finance";

interface DebtRow extends Debt {
  id: string;
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

const DEFAULT_DEBTS: DebtRow[] = [
  {
    id: generateId(),
    name: "Credit immobilier",
    balance: 400000,
    monthlyPayment: 3200,
    rate: 4.5,
    remainingMonths: 180,
  },
  {
    id: generateId(),
    name: "Credit auto",
    balance: 80000,
    monthlyPayment: 1800,
    rate: 7.0,
    remainingMonths: 48,
  },
  {
    id: generateId(),
    name: "Credit consommation",
    balance: 30000,
    monthlyPayment: 900,
    rate: 9.0,
    remainingMonths: 36,
  },
];

export function RachatCreditClient() {
  const t = useTranslations("tools");

  const [debts, setDebts] = useState<DebtRow[]>(DEFAULT_DEBTS);
  const [newRate, setNewRate] = useState(5.0);
  const [newDuration, setNewDuration] = useState(15);

  const newDurationMonths = newDuration * 12;

  const addDebt = useCallback(() => {
    setDebts((prev) => [
      ...prev,
      {
        id: generateId(),
        name: "",
        balance: 0,
        monthlyPayment: 0,
        rate: 0,
        remainingMonths: 0,
      },
    ]);
  }, []);

  const removeDebt = useCallback((id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const updateDebt = useCallback(
    (id: string, field: keyof Debt, value: string | number) => {
      setDebts((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                [field]:
                  field === "name"
                    ? value
                    : typeof value === "string"
                    ? parseFloat(value) || 0
                    : value,
              }
            : d
        )
      );
    },
    []
  );

  const resetDebts = useCallback(() => {
    setDebts(DEFAULT_DEBTS.map((d) => ({ ...d, id: generateId() })));
    setNewRate(5.0);
    setNewDuration(15);
  }, []);

  // Filter valid debts for calculation
  const validDebts = useMemo(
    () => debts.filter((d) => d.balance > 0 && d.monthlyPayment > 0),
    [debts]
  );

  const result = useMemo(
    () => calcDebtConsolidation(validDebts, newRate, newDurationMonths),
    [validDebts, newRate, newDurationMonths]
  );

  const totalBalance = useMemo(
    () => validDebts.reduce((sum, d) => sum + d.balance, 0),
    [validDebts]
  );

  const hasSavings = result.monthlySavings > 0;

  const resultItems = [
    {
      label: "Economie mensuelle",
      value: Math.abs(result.monthlySavings),
      format: "mad" as const,
      highlight: true,
    },
    {
      label: "Actuel: total mensuel",
      value: result.currentTotalMonthly,
      format: "mad" as const,
    },
    {
      label: "Nouveau: mensualite unique",
      value: result.newMonthlyPayment,
      format: "mad" as const,
    },
    {
      label: "Economie totale",
      value: Math.abs(result.totalSavings),
      format: "mad" as const,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-secondary/5 via-background to-background min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-secondary/10 text-secondary border-secondary/20"
          >
            <RefreshCw className="h-3 w-3 me-1" />
            Simulateur gratuit
          </Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
            {t("debtConsolidation")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("debtConsolidationDesc")}. Regroupez vos credits en un seul et
            reduisez vos mensualites.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Debt inputs */}
          <div className="lg:col-span-3 space-y-6">
            {/* Current debts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-destructive" />
                    Vos credits actuels
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={resetDebts}
                      className="text-muted-foreground"
                    >
                      <RefreshCw className="h-3.5 w-3.5 me-1" />
                      Reset
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addDebt}
                      className="border-primary/30 text-primary hover:bg-primary/5"
                    >
                      <Plus className="h-3.5 w-3.5 me-1" />
                      Ajouter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {debts.map((debt, index) => (
                  <div
                    key={debt.id}
                    className="rounded-xl border bg-card p-4 space-y-3 relative group"
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <Badge
                          variant="outline"
                          className="shrink-0 text-xs px-2"
                        >
                          #{index + 1}
                        </Badge>
                        <Input
                          type="text"
                          placeholder="Nom du credit"
                          value={debt.name}
                          onChange={(e) =>
                            updateDebt(debt.id, "name", e.target.value)
                          }
                          className="h-8 text-sm font-medium border-0 bg-transparent px-1 focus-visible:ring-1"
                        />
                      </div>
                      {debts.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDebt(debt.id)}
                          className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>

                    {/* Fields grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                          Solde restant
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={debt.balance || ""}
                          onChange={(e) =>
                            updateDebt(debt.id, "balance", e.target.value)
                          }
                          className="h-9 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                          Mensualite
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={debt.monthlyPayment || ""}
                          onChange={(e) =>
                            updateDebt(
                              debt.id,
                              "monthlyPayment",
                              e.target.value
                            )
                          }
                          className="h-9 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                          Taux (%)
                        </label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="0"
                          value={debt.rate || ""}
                          onChange={(e) =>
                            updateDebt(debt.id, "rate", e.target.value)
                          }
                          className="h-9 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                          Mois restants
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={debt.remainingMonths || ""}
                          onChange={(e) =>
                            updateDebt(
                              debt.id,
                              "remainingMonths",
                              e.target.value
                            )
                          }
                          className="h-9 text-sm mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add more */}
                <button
                  type="button"
                  onClick={addDebt}
                  className="w-full rounded-xl border-2 border-dashed border-muted-foreground/20 p-4 text-center text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                >
                  <Plus className="h-4 w-4 mx-auto mb-1" />
                  Ajouter un credit
                </button>

                {/* Current summary */}
                {validDebts.length > 0 && (
                  <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-4">
                    <p className="text-xs font-semibold text-destructive mb-2 uppercase tracking-wide">
                      Situation actuelle
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">
                          {validDebts.length}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Credits
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">
                          {formatMAD(result.currentTotalMonthly)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Total mensuel
                        </p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">
                          {formatMAD(totalBalance)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Solde total
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* New consolidated loan */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  Nouveau credit regroupe
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* New rate */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">
                      Nouveau taux
                    </label>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {newRate.toFixed(1)}%
                    </span>
                  </div>
                  <Slider
                    value={[newRate * 10]}
                    onValueChange={([v]) => setNewRate(v / 10)}
                    min={20}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>2%</span>
                    <span>10%</span>
                  </div>
                </div>

                {/* New duration */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">
                      Duree du rachat
                    </label>
                    <span className="text-sm font-bold text-foreground bg-muted px-3 py-1 rounded-full">
                      {newDuration} {t("years")} ({newDurationMonths}{" "}
                      {t("months")})
                    </span>
                  </div>
                  <Slider
                    value={[newDuration]}
                    onValueChange={([v]) => setNewDuration(v)}
                    min={3}
                    max={25}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>3 {t("years")}</span>
                    <span>25 {t("years")}</span>
                  </div>
                </div>

                {/* Total to consolidate */}
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Montant total a racheter
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {formatMAD(totalBalance)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Result summary */}
            <Card
              className={`border-2 ${
                hasSavings
                  ? "border-primary/30 bg-gradient-to-b from-primary/5 to-transparent"
                  : "border-destructive/30 bg-gradient-to-b from-destructive/5 to-transparent"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-lg text-center">
                  {hasSavings
                    ? "Vous economisez !"
                    : "Pas d'economie mensuelle"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResultSummary items={resultItems} />
              </CardContent>
            </Card>

            {/* Before / After visual comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-secondary" />
                  Avant / Apres
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Before */}
                <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
                  <p className="text-xs font-semibold text-destructive mb-3 uppercase tracking-wide">
                    Avant le rachat
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Nombre de credits
                      </span>
                      <span className="font-semibold text-foreground">
                        {validDebts.length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Total mensuel
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatMAD(result.currentTotalMonthly)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Cout total</span>
                      <span className="font-semibold text-foreground">
                        {formatMAD(result.currentTotalCost)}
                      </span>
                    </div>
                  </div>
                  {/* Bar */}
                  <div className="mt-3 h-3 bg-destructive/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-destructive/70 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <TrendingDown className="h-4 w-4 text-primary" />
                  </div>
                </div>

                {/* After */}
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wide">
                    Apres le rachat
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Nombre de credits
                      </span>
                      <span className="font-semibold text-primary">1</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Nouvelle mensualite
                      </span>
                      <span className="font-semibold text-primary">
                        {formatMAD(result.newMonthlyPayment)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Nouveau cout total
                      </span>
                      <span className="font-semibold text-foreground">
                        {formatMAD(result.newTotalCost)}
                      </span>
                    </div>
                  </div>
                  {/* Bar */}
                  <div className="mt-3 h-3 bg-primary/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          result.currentTotalMonthly > 0
                            ? Math.min(
                                100,
                                (result.newMonthlyPayment /
                                  result.currentTotalMonthly) *
                                  100
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Savings highlight */}
                {hasSavings && validDebts.length > 0 && (
                  <div className="rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 p-4 text-center">
                    <p className="text-xs text-muted-foreground mb-1">
                      Vous economisez chaque mois
                    </p>
                    <p className="text-3xl font-bold text-primary">
                      {formatMAD(result.monthlySavings)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      soit{" "}
                      <span className="font-semibold text-secondary">
                        {formatMAD(Math.abs(result.totalSavings))}
                      </span>{" "}
                      d&apos;economie totale
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="bg-secondary/5 border-secondary/20">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      Le rachat de credit au Maroc
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Le rachat de credit permet de regrouper plusieurs credits
                      en un seul avec une mensualite reduite. Wafasalaf, Cetelem
                      et les principales banques marocaines proposent ce service.
                      Les frais de dossier sont generalement de 1 a 2% du
                      montant racheté.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
