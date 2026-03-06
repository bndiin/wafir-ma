"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Calculator,
  FileText,
  Home,
  Building2,
  Info,
  Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ResultSummary } from "@/components/simulators/result-summary";
import { calcNotaryFees, formatMAD } from "@/lib/finance";

const PIE_COLORS = ["#00b894", "#0984e3", "#fdcb6e", "#6c5ce7"];

export function FraisNotaireClient() {
  const t = useTranslations("tools");

  const [prix, setPrix] = useState(800000);
  const [isNeuf, setIsNeuf] = useState(true);

  const result = useMemo(
    () => calcNotaryFees(prix, isNeuf),
    [prix, isNeuf]
  );

  const resultItems = [
    {
      label: "Total frais de notaire",
      value: result.total,
      format: "mad" as const,
      highlight: true,
    },
    {
      label: "Droits d'enregistrement",
      value: result.droitsEnregistrement,
      format: "mad" as const,
    },
    {
      label: "Conservation fonciere",
      value: result.taxeConservation,
      format: "mad" as const,
    },
    {
      label: "Honoraires notaire",
      value: result.honorairesNotaire,
      format: "mad" as const,
    },
  ];

  const pieData = [
    {
      name: "Droits d'enregistrement",
      value: result.droitsEnregistrement,
    },
    {
      name: "Conservation fonciere",
      value: result.taxeConservation,
    },
    {
      name: "Honoraires notaire",
      value: result.honorairesNotaire,
    },
    {
      name: "Timbres et divers",
      value: result.timbresEtDivers,
    },
  ];

  // Breakdown rows for the detail table
  const breakdownRows = [
    {
      label: "Droits d'enregistrement",
      rate: "4%",
      amount: result.droitsEnregistrement,
      color: PIE_COLORS[0],
    },
    {
      label: "Conservation fonciere",
      rate: "1,5% + 150 MAD",
      amount: result.taxeConservation,
      color: PIE_COLORS[1],
    },
    {
      label: "Honoraires notaire (TTC)",
      rate: "1% (min 2 500) + TVA 10%",
      amount: result.honorairesNotaire,
      color: PIE_COLORS[2],
    },
    {
      label: "Timbres et divers",
      rate: "Forfait",
      amount: result.timbresEtDivers,
      color: PIE_COLORS[3],
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
            <FileText className="h-3 w-3 me-1" />
            Outil gratuit
          </Badge>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3">
            {t("notaryFees")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("notaryFeesDesc")}. Estimez precisement les frais annexes a
            l&apos;achat de votre bien immobilier au Maroc.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Inputs */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Details du bien
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Property type toggle */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Type de bien
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant={isNeuf ? "default" : "outline"}
                      className={`h-auto py-4 flex flex-col gap-1.5 ${
                        isNeuf
                          ? "bg-primary hover:bg-primary/90 text-white"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setIsNeuf(true)}
                    >
                      <Home
                        className={`h-5 w-5 ${
                          isNeuf ? "text-white" : "text-primary"
                        }`}
                      />
                      <span className="font-semibold">{t("newProperty")}</span>
                      <span
                        className={`text-xs ${
                          isNeuf ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        VEFA / 1ere main
                      </span>
                    </Button>
                    <Button
                      type="button"
                      variant={!isNeuf ? "default" : "outline"}
                      className={`h-auto py-4 flex flex-col gap-1.5 ${
                        !isNeuf
                          ? "bg-secondary hover:bg-secondary/90 text-white"
                          : "hover:border-secondary/50"
                      }`}
                      onClick={() => setIsNeuf(false)}
                    >
                      <Building2
                        className={`h-5 w-5 ${
                          !isNeuf ? "text-white" : "text-secondary"
                        }`}
                      />
                      <span className="font-semibold">
                        {t("usedProperty")}
                      </span>
                      <span
                        className={`text-xs ${
                          !isNeuf ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        Revente / Occasion
                      </span>
                    </Button>
                  </div>
                </div>

                {/* Prix du bien */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium text-foreground">
                      {t("propertyPrice")}
                    </label>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {formatMAD(prix)}
                    </span>
                  </div>
                  <Slider
                    value={[prix]}
                    onValueChange={([v]) => setPrix(v)}
                    min={100000}
                    max={10000000}
                    step={10000}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                    <span>100 000 MAD</span>
                    <span>10 000 000 MAD</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed breakdown table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  Ventilation detaillee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="text-start py-3 pe-4 font-medium">
                          Poste
                        </th>
                        <th className="text-center py-3 px-4 font-medium">
                          Base de calcul
                        </th>
                        <th className="text-end py-3 ps-4 font-medium">
                          Montant
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {breakdownRows.map((row) => (
                        <tr
                          key={row.label}
                          className="border-b last:border-0"
                        >
                          <td className="py-3 pe-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full shrink-0"
                                style={{ backgroundColor: row.color }}
                              />
                              <span className="font-medium text-foreground">
                                {row.label}
                              </span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4 text-muted-foreground">
                            {row.rate}
                          </td>
                          <td className="text-end py-3 ps-4 font-semibold text-foreground">
                            {formatMAD(row.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-primary/30">
                        <td
                          className="py-3 pe-4 font-bold text-primary"
                          colSpan={2}
                        >
                          TOTAL FRAIS DE NOTAIRE
                        </td>
                        <td className="text-end py-3 ps-4 font-bold text-primary text-lg">
                          {formatMAD(result.total)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Percentage badge */}
                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-muted p-3">
                  <Percent className="h-4 w-4 text-secondary" />
                  <p className="text-sm text-muted-foreground">
                    Les frais representent{" "}
                    <span className="font-bold text-secondary">
                      {result.percentage}%
                    </span>{" "}
                    du prix du bien
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Pie chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Percent className="h-5 w-5 text-primary" />
                  Repartition des frais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={index}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                            stroke="transparent"
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [
                          formatMAD(value),
                          name,
                        ]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid #e0e4e8",
                          fontSize: "12px",
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={8}
                        formatter={(value) => (
                          <span className="text-xs text-muted-foreground">
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg text-center">
                  Estimation des frais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResultSummary items={resultItems} />
              </CardContent>
            </Card>

            {/* Cost summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Budget total a prevoir
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">
                    Prix du bien
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatMAD(prix)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-muted-foreground">
                    Frais de notaire
                  </span>
                  <span className="text-sm font-semibold text-secondary">
                    + {formatMAD(result.total)}
                  </span>
                </div>
                <div className="border-t-2 border-primary/30 pt-3 flex items-center justify-between">
                  <span className="font-bold text-foreground">
                    BUDGET TOTAL
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {formatMAD(prix + result.total)}
                  </span>
                </div>

                {/* Visual ratio bar */}
                <div className="mt-4">
                  <div className="h-4 w-full rounded-full overflow-hidden flex">
                    <div
                      className="bg-primary/70 h-full transition-all duration-500"
                      style={{
                        width: `${(prix / (prix + result.total)) * 100}%`,
                      }}
                    />
                    <div
                      className="bg-secondary h-full transition-all duration-500"
                      style={{
                        width: `${(result.total / (prix + result.total)) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-primary/70" />
                      Prix ({((prix / (prix + result.total)) * 100).toFixed(1)}%)
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-secondary" />
                      Frais ({result.percentage}%)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info box */}
            <Card className="bg-secondary/5 border-secondary/20">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Info className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      Bon a savoir
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Les frais de notaire au Maroc representent en moyenne 6 a
                      7% du prix du bien. Ils incluent les droits
                      d&apos;enregistrement (4%), la conservation fonciere
                      (1,5%), les honoraires du notaire et les frais divers. Ces
                      frais sont a payer au moment de la signature de l&apos;acte
                      definitif.
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
