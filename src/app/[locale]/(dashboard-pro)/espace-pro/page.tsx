"use client";

import Link from "next/link";
import { use } from "react";
import {
  Inbox,
  MessageSquare,
  Star,
  TrendingUp,
  ArrowRight,
  UserCircle,
  Crown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Sample Data ───────────────────────────────────────────────
const KPI = [
  {
    label: "Leads ce mois",
    value: "23",
    change: "+12%",
    icon: Inbox,
    color: "text-[#0984e3]",
    bg: "bg-[#0984e3]/10",
  },
  {
    label: "Taux de reponse",
    value: "87%",
    change: "+5%",
    icon: MessageSquare,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Note moyenne",
    value: "4.6",
    change: "+0.2",
    icon: Star,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    label: "Leads convertis",
    value: "9",
    change: "+3",
    icon: TrendingUp,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const LEAD_ACTIVITY = [
  { month: "Oct", leads: 14 },
  { month: "Nov", leads: 18 },
  { month: "Dec", leads: 12 },
  { month: "Jan", leads: 21 },
  { month: "Fev", leads: 19 },
  { month: "Mar", leads: 23 },
];

const RECENT_LEADS = [
  {
    id: 1,
    name: "Ahmed Benali",
    category: "Credit Immobilier",
    city: "Casablanca",
    date: "06 Mar 2026",
    status: "Nouveau",
  },
  {
    id: 2,
    name: "Fatima Zohra El Amrani",
    category: "Assurance Auto",
    city: "Rabat",
    date: "05 Mar 2026",
    status: "Nouveau",
  },
  {
    id: 3,
    name: "Youssef Tazi",
    category: "Credit Consommation",
    city: "Marrakech",
    date: "04 Mar 2026",
    status: "Contacte",
  },
  {
    id: 4,
    name: "Khadija Ouazzani",
    category: "Mutuelle Sante",
    city: "Fes",
    date: "03 Mar 2026",
    status: "Converti",
  },
  {
    id: 5,
    name: "Omar Idrissi",
    category: "Rachat de Credit",
    city: "Tanger",
    date: "02 Mar 2026",
    status: "Contacte",
  },
];

function getStatusVariant(status: string) {
  switch (status) {
    case "Nouveau":
      return "default";
    case "Contacte":
      return "secondary";
    case "Converti":
      return "outline";
    default:
      return "secondary";
  }
}

export default function EspaceProPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">
          Bienvenue sur votre espace professionnel Wafir
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label}>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {kpi.value}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-emerald-600">
                      {kpi.change} vs mois dernier
                    </p>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${kpi.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Lead activity chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activite des leads</CardTitle>
            <CardDescription>
              Nombre de leads recus par mois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={LEAD_ACTIVITY}>
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
                  <Tooltip
                    contentStyle={{
                      background: "#fff",
                      border: "1px solid #e0e4e8",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                  <Bar
                    dataKey="leads"
                    fill="#0984e3"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subscription status */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-[#0984e3]" />
              <CardTitle>Abonnement</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-[#0984e3]/5 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Plan actuel
                </span>
                <Badge className="bg-[#0984e3] text-white">PRO</Badge>
              </div>
              <p className="mt-1 text-2xl font-bold text-[#0984e3]">
                149 MAD<span className="text-sm font-normal text-muted-foreground">/mois</span>
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Leads utilises</span>
                <span className="font-medium">23 / 30</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-[#0984e3] transition-all"
                  style={{ width: "77%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                7 leads restants ce mois
              </p>
            </div>

            <Separator />

            <Link href={`/${locale}/espace-pro/abonnement`}>
              <Button
                variant="outline"
                size="sm"
                className="w-full border-[#0984e3] text-[#0984e3] hover:bg-[#0984e3]/5"
              >
                Gerer mon abonnement
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Derniers leads</CardTitle>
              <CardDescription>
                Vos 5 leads les plus recents
              </CardDescription>
            </div>
            <Link href={`/${locale}/espace-pro/leads`}>
              <Button variant="ghost" size="sm" className="gap-1 text-[#0984e3]">
                Voir tout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {RECENT_LEADS.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-col gap-2 rounded-lg border p-3 transition-colors hover:bg-accent/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0984e3]/10 text-sm font-bold text-[#0984e3]">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {lead.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {lead.category} - {lead.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:text-right">
                  <span className="text-xs text-muted-foreground">
                    {lead.date}
                  </span>
                  <Badge variant={getStatusVariant(lead.status)}>
                    {lead.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href={`/${locale}/espace-pro/leads`}>
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 pt-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0984e3]/10">
                <Inbox className="h-6 w-6 text-[#0984e3]" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Voir mes leads</p>
                <p className="text-sm text-muted-foreground">
                  Consultez et gerez vos demandes de devis
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href={`/${locale}/espace-pro/profil`}>
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 pt-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
                <UserCircle className="h-6 w-6 text-violet-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  Modifier mon profil
                </p>
                <p className="text-sm text-muted-foreground">
                  Mettez a jour vos informations professionnelles
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
