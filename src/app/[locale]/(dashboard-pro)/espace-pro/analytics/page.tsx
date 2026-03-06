"use client";

import {
  TrendingUp,
  Clock,
  Target,
  BarChart3,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ─── Sample Data ───────────────────────────────────────────────
const LEADS_OVER_TIME = [
  { month: "Oct", leads: 14, converted: 4 },
  { month: "Nov", leads: 18, converted: 7 },
  { month: "Dec", leads: 12, converted: 3 },
  { month: "Jan", leads: 21, converted: 8 },
  { month: "Fev", leads: 19, converted: 6 },
  { month: "Mar", leads: 23, converted: 9 },
];

const LEADS_BY_CATEGORY = [
  { name: "Credit Immobilier", value: 35, color: "#0984e3" },
  { name: "Credit Consommation", value: 22, color: "#00b894" },
  { name: "Assurance Auto", value: 18, color: "#fdcb6e" },
  { name: "Mutuelle Sante", value: 12, color: "#e17055" },
  { name: "Rachat de Credit", value: 8, color: "#6c5ce7" },
  { name: "Mourabaha", value: 5, color: "#00cec9" },
];

const STATS = [
  {
    label: "Total leads (6 mois)",
    value: "107",
    change: "+18%",
    positive: true,
    icon: Users,
    color: "text-[#0984e3]",
    bg: "bg-[#0984e3]/10",
  },
  {
    label: "Taux de reponse",
    value: "87%",
    change: "+5%",
    positive: true,
    icon: Target,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Taux de conversion",
    value: "35%",
    change: "+3%",
    positive: true,
    icon: TrendingUp,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "Temps de reponse moyen",
    value: "2.4h",
    change: "-0.3h",
    positive: true,
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const MONTHLY_PERFORMANCE = [
  { month: "Oct", responseRate: 82, conversionRate: 29 },
  { month: "Nov", responseRate: 85, conversionRate: 39 },
  { month: "Dec", responseRate: 78, conversionRate: 25 },
  { month: "Jan", responseRate: 90, conversionRate: 38 },
  { month: "Fev", responseRate: 84, conversionRate: 32 },
  { month: "Mar", responseRate: 87, conversionRate: 39 },
];

// Custom tooltip for area chart
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-card p-3 shadow-md">
      <p className="mb-1 text-sm font-semibold text-foreground">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs" style={{ color: entry.color }}>
          {entry.name === "leads" ? "Leads recus" : "Convertis"}: {entry.value}
        </p>
      ))}
    </div>
  );
}

// Custom tooltip for pie chart
function PieTooltip({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border bg-card p-3 shadow-md">
      <p className="text-sm font-semibold text-foreground">{item.name}</p>
      <p className="text-xs text-muted-foreground">{item.value} leads</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const totalLeads = LEADS_BY_CATEGORY.reduce((sum, c) => sum + c.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Suivez les performances de votre activite sur les 6 derniers mois
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1">
                      {stat.positive ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          stat.positive ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Area chart - Leads over time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Leads dans le temps</CardTitle>
            <CardDescription>
              Evolution des leads recus et convertis sur 6 mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={LEADS_OVER_TIME}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0984e3" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0984e3" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorConverted"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#00b894" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00b894" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e8" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#4a5568" }}
                    axisLine={{ stroke: "#e0e4e8" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#4a5568" }}
                    axisLine={{ stroke: "#e0e4e8" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#0984e3"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorLeads)"
                    name="leads"
                  />
                  <Area
                    type="monotone"
                    dataKey="converted"
                    stroke="#00b894"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorConverted)"
                    name="converted"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#0984e3]" />
                <span className="text-xs text-muted-foreground">Leads recus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[#00b894]" />
                <span className="text-xs text-muted-foreground">Convertis</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie chart - Leads by category */}
        <Card>
          <CardHeader>
            <CardTitle>Leads par categorie</CardTitle>
            <CardDescription>
              Repartition sur les 6 derniers mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={LEADS_BY_CATEGORY}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {LEADS_BY_CATEGORY.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="mt-2 space-y-1.5">
              {LEADS_BY_CATEGORY.map((cat) => (
                <div
                  key={cat.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-sm"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-muted-foreground">{cat.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {cat.value}
                    </span>
                    <span className="text-muted-foreground">
                      ({Math.round((cat.value / totalLeads) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance rates chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance mensuelle</CardTitle>
          <CardDescription>
            Taux de reponse et taux de conversion par mois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_PERFORMANCE}>
                <defs>
                  <linearGradient id="colorResponse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0984e3" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#0984e3" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorConversion"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#6c5ce7" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#6c5ce7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e8" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#4a5568" }}
                  axisLine={{ stroke: "#e0e4e8" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#4a5568" }}
                  axisLine={{ stroke: "#e0e4e8" }}
                  unit="%"
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e0e4e8",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                  formatter={(value: number, name: string) => [
                    `${value}%`,
                    name === "responseRate"
                      ? "Taux de reponse"
                      : "Taux de conversion",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="responseRate"
                  stroke="#0984e3"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorResponse)"
                />
                <Area
                  type="monotone"
                  dataKey="conversionRate"
                  stroke="#6c5ce7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorConversion)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#0984e3]" />
              <span className="text-xs text-muted-foreground">
                Taux de reponse
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#6c5ce7]" />
              <span className="text-xs text-muted-foreground">
                Taux de conversion
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
