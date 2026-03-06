"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Calculator,
  Gauge,
  TrendingUp,
  Info,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ResultSummary } from "@/components/simulators/result-summary";
import { calcBorrowingCapacity, formatMAD } from "@/lib/finance";
import { INDICATIVE_RATES } from "@/lib/constants";

const DURATION_STEPS = [10, 15, 20, 25];

export function CapaciteEmpruntClient() {
  const t = useTranslations("tools");

  const [revenus, setRevenus] = useState(15000);
  const [charges, setCharges] = useState(3000);
  const [tauxAnnuel, setTauxAnnuel] = useState(4.2);
  const [duree, setDuree] = useState(20);

  const months = duree * 12;

  const result = useMemo(
    () => calcBorrowingCapacity(revenus, charges, tauxAnnuel, months),
    [revenus, charges, tauxAnnuel, months]
  );

  // Actual debt ratio based on max monthly payment / income
  const actualDebtRatio = revenus > 0
    ? Math.round((result.maxMonthlyPayment / revenus) * 100)
    : 0;

  // Capacity at different durations for bar chart
  const durationComparison = useMemo(() => {
    return DURATION_STEPS.map((d) => {
      const res = calcBorrowingCapacity(
        revenus,
        charges,
        tauxAnnuel,
        d * 12
      );
      return {
        duree: `${d} ans`,
        montant: res.maxBorrowingAmount,
        isActive: d === duree,
      };
    });
  }, [revenus, charges, tauxAnnuel, duree]);

  const resultItems = [
    {
      label: t("borrowingAmount"),
      value: result.maxBorrowingAmount,
      format: "mad" as const,
      highlight: true,
    },
    {
      label: "Mensualite max",
      value: result.maxMonthlyPayment,
      format: "mad" as const,
    },
    {
      label: t("debtRatio"),
      value: result.debtRatio,
      format: "percent" as const,
    },
  ];

  // Gauge calculation
  const gaugeAngle = Math.min(actualDebtRatio / 50, 1) * 180;
  const gaugeColor =
    actualDebtRatio <= 25
      ? "#00b894"
      : actualDebtRatio <= 33
      ? "#fdcb6e"
      : "#e17055";
  const gaugeStatus =
    actualDebtRatio <= 25
      ? "Excellent"
      : actualDebtRatio <= 33
      ? "Acceptable"
      : "Risque";

  return (
    <section className="bg-gradient-to-b from-secondary/5 via-background to-background min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-secondary/10 text-secondary border-secondary/20"
          >
            <Calculator className="h-3 w-3 me-1" />
            Outil gratuit
          </Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
            {t("borrowingCapacity")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("borrowingCapacityDesc")}. Basee sur la regle des 33%
            d&apos;endettement appliquee par les banques marocaines.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-secondary" />
                  Vos revenus et charges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Revenus mensuels */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">
                      {t("income")}
                    </label>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {formatMAD(revenus)}
                    </span>
                  </div>
                  <Slider
                    value={[revenus]}
                    onValueChange={([v]) => setRevenus(v)}
                    min={5000}
                    max={100000}
                    step={500}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>5 000 MAD</span>
                    <span>100 000 MAD</span>
                  </div>
                </div>

                {/* Charges mensuelles */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">
                      {t("expenses")}
                    </label>
                    <span className="text-sm font-bold text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                      {formatMAD(charges)}
                    </span>
                  </div>
                  <Slider
                    value={[charges]}
                    onValueChange={([v]) => setCharges(v)}
                    min={0}
                    max={50000}
                    step={500}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>0 MAD</span>
                    <span>50 000 MAD</span>
                  </div>
                </div>

                {/* Taux */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">
                      {t("rate")}
                    </label>
                    <span className="text-sm font-bold text-secondary bg-secondary/10 px-3 py-1 rounded-full">
                      {tauxAnnuel.toFixed(1)}%
                    </span>
                  </div>
                  <Slider
                    value={[tauxAnnuel * 10]}
                    onValueChange={([v]) => setTauxAnnuel(v / 10)}
                    min={20}
                    max={100}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>2%</span>
                    <span>
                      Moy. {INDICATIVE_RATES.creditImmobilier.avg}%
                    </span>
                    <span>10%</span>
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
                    max={30}
                    step={1}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>5 {t("years")}</span>
                    <span>30 {t("years")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bar chart: capacity at different durations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Capacite selon la duree
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={durationComparison}
                      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e8" />
                      <XAxis
                        dataKey="duree"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) =>
                          v >= 1000000
                            ? `${(v / 1000000).toFixed(1)}M`
                            : v >= 1000
                            ? `${(v / 1000).toFixed(0)}k`
                            : `${v}`
                        }
                      />
                      <Tooltip
                        formatter={(value: number) => [
                          formatMAD(value),
                          "Montant empruntable",
                        ]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid #e0e4e8",
                          fontSize: "12px",
                        }}
                      />
                      <Bar
                        dataKey="montant"
                        radius={[8, 8, 0, 0]}
                        maxBarSize={60}
                      >
                        {durationComparison.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={entry.isActive ? "#00b894" : "#0984e3"}
                            fillOpacity={entry.isActive ? 1 : 0.4}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  La barre verte correspond a votre duree selectionnee ({duree} ans)
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Results sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-secondary/20 bg-gradient-to-b from-secondary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg text-center">
                  Votre capacite d&apos;emprunt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResultSummary items={resultItems} />
              </CardContent>
            </Card>

            {/* Gauge */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Gauge className="h-5 w-5 text-secondary" />
                  Taux d&apos;endettement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  {/* SVG Gauge */}
                  <svg
                    viewBox="0 0 200 120"
                    className="w-full max-w-[220px]"
                  >
                    {/* Background arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#e0e4e8"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Active arc */}
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke={gaugeColor}
                      strokeWidth="16"
                      strokeLinecap="round"
                      strokeDasharray={`${(gaugeAngle / 180) * 251.3} 251.3`}
                      className="transition-all duration-700"
                    />
                    {/* Center text */}
                    <text
                      x="100"
                      y="85"
                      textAnchor="middle"
                      className="text-2xl font-bold"
                      fill={gaugeColor}
                      fontSize="28"
                      fontWeight="700"
                    >
                      {actualDebtRatio}%
                    </text>
                    <text
                      x="100"
                      y="105"
                      textAnchor="middle"
                      fill="#8a8a9a"
                      fontSize="11"
                    >
                      {gaugeStatus}
                    </text>
                    {/* Scale labels */}
                    <text
                      x="18"
                      y="115"
                      fill="#8a8a9a"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      0%
                    </text>
                    <text
                      x="100"
                      y="22"
                      fill="#8a8a9a"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      25%
                    </text>
                    <text
                      x="182"
                      y="115"
                      fill="#8a8a9a"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      50%
                    </text>
                  </svg>

                  {/* Legend */}
                  <div className="grid grid-cols-3 gap-2 w-full mt-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#00b894]" />
                        <span className="text-[10px] text-muted-foreground">
                          &lt;25%
                        </span>
                      </div>
                      <p className="text-[10px] font-medium text-foreground">
                        Excellent
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#fdcb6e]" />
                        <span className="text-[10px] text-muted-foreground">
                          25-33%
                        </span>
                      </div>
                      <p className="text-[10px] font-medium text-foreground">
                        Acceptable
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-0.5">
                        <div className="h-2 w-2 rounded-full bg-[#e17055]" />
                        <span className="text-[10px] text-muted-foreground">
                          &gt;33%
                        </span>
                      </div>
                      <p className="text-[10px] font-medium text-foreground">
                        Risque
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info box */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      La regle des 33% au Maroc
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Les banques marocaines appliquent un plafond de 33%
                      d&apos;endettement. Vos mensualites de credit ne doivent
                      pas depasser un tiers de vos revenus nets mensuels. Ce
                      ratio inclut tous les credits en cours.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick status */}
            <Card>
              <CardContent className="p-4">
                {actualDebtRatio <= 33 ? (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Profil eligible
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Votre taux d&apos;endettement de {actualDebtRatio}% est
                        conforme aux criteres bancaires. Vous pouvez emprunter
                        jusqu&apos;a {formatMAD(result.maxBorrowingAmount)}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Endettement eleve
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Votre taux d&apos;endettement depasse les 33%.
                        Envisagez de reduire vos charges ou d&apos;augmenter vos
                        revenus pour ameliorer votre capacite.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
