"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AmortizationRow } from "@/lib/finance";

interface AmortizationChartProps {
  data: AmortizationRow[];
  title?: string;
}

export function AmortizationChart({
  data,
  title = "Évolution du remboursement",
}: AmortizationChartProps) {
  // Sample every N months to keep chart readable
  const step = data.length > 60 ? Math.ceil(data.length / 60) : 1;
  const chartData = data
    .filter((_, i) => i % step === 0 || i === data.length - 1)
    .map((row) => ({
      month: row.month,
      capital: Math.round(row.principal),
      interets: Math.round(row.interest),
      solde: Math.round(row.balance),
    }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e8" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                tickFormatter={(v) =>
                  v % 12 === 0 ? `An ${v / 12}` : ""
                }
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(v) =>
                  v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
                }
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  new Intl.NumberFormat("fr-MA").format(value) + " MAD",
                  name === "capital"
                    ? "Capital"
                    : name === "interets"
                    ? "Intérêts"
                    : "Solde restant",
                ]}
                labelFormatter={(label) => `Mois ${label}`}
              />
              <Legend
                formatter={(value) =>
                  value === "capital"
                    ? "Capital remboursé"
                    : value === "interets"
                    ? "Intérêts"
                    : "Solde restant"
                }
              />
              <Area
                type="monotone"
                dataKey="capital"
                stackId="1"
                stroke="#00b894"
                fill="#00b894"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="interets"
                stackId="1"
                stroke="#0984e3"
                fill="#0984e3"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
