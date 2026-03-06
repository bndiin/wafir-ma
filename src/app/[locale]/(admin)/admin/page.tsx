"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Briefcase,
  Target,
  TrendingUp,
  BarChart3,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
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

// KPI data
const kpis = [
  {
    title: "Total utilisateurs",
    value: "12 847",
    change: "+12.5%",
    trend: "up" as const,
    icon: Users,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Professionnels actifs",
    value: "384",
    change: "+8.3%",
    trend: "up" as const,
    icon: Briefcase,
    color: "bg-[#00b894]/10 text-[#00b894]",
  },
  {
    title: "Leads ce mois",
    value: "2 156",
    change: "+23.1%",
    trend: "up" as const,
    icon: Target,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Revenus ce mois",
    value: "87 400 MAD",
    change: "+15.7%",
    trend: "up" as const,
    icon: TrendingUp,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    title: "Taux conversion",
    value: "3.8%",
    change: "-0.2%",
    trend: "down" as const,
    icon: BarChart3,
    color: "bg-red-500/10 text-red-600",
  },
  {
    title: "Articles publiés",
    value: "156",
    change: "+5",
    trend: "up" as const,
    icon: FileText,
    color: "bg-cyan-500/10 text-cyan-600",
  },
];

// Leads par mois (12 months)
const leadsParMois = [
  { mois: "Mar", leads: 980 },
  { mois: "Avr", leads: 1120 },
  { mois: "Mai", leads: 1340 },
  { mois: "Jun", leads: 1180 },
  { mois: "Jul", leads: 890 },
  { mois: "Aoû", leads: 760 },
  { mois: "Sep", leads: 1250 },
  { mois: "Oct", leads: 1480 },
  { mois: "Nov", leads: 1620 },
  { mois: "Déc", leads: 1890 },
  { mois: "Jan", leads: 2010 },
  { mois: "Fév", leads: 2156 },
];

// Leads par catégorie
const leadsParCategorie = [
  { name: "Crédit immobilier", value: 35, color: "#00b894" },
  { name: "Crédit conso", value: 22, color: "#0984e3" },
  { name: "Assurance auto", value: 18, color: "#6c5ce7" },
  { name: "Assurance habitation", value: 12, color: "#fdcb6e" },
  { name: "Assurance santé", value: 8, color: "#e17055" },
  { name: "Rachat de crédit", value: 5, color: "#00cec9" },
];

// Recent activity
const recentActivity = [
  {
    id: 1,
    action: "Nouveau lead crédit immobilier",
    user: "Mohammed B.",
    city: "Casablanca",
    date: "Il y a 5 min",
    status: "Nouveau",
  },
  {
    id: 2,
    action: "Pro vérifié : Atlas Assurance",
    user: "Admin",
    city: "Rabat",
    date: "Il y a 12 min",
    status: "Vérifié",
  },
  {
    id: 3,
    action: "Nouveau professionnel inscrit",
    user: "Crédit du Maroc Agency",
    city: "Marrakech",
    date: "Il y a 25 min",
    status: "En attente",
  },
  {
    id: 4,
    action: "Avis publié (4.5/5)",
    user: "Fatima Z.",
    city: "Tanger",
    date: "Il y a 1h",
    status: "Approuvé",
  },
  {
    id: 5,
    action: "Lead assurance auto attribué",
    user: "Youssef K.",
    city: "Fès",
    date: "Il y a 1h30",
    status: "Attribué",
  },
  {
    id: 6,
    action: "Article blog publié",
    user: "Rédaction",
    city: "—",
    date: "Il y a 2h",
    status: "Publié",
  },
  {
    id: 7,
    action: "Nouveau lead rachat crédit",
    user: "Amina L.",
    city: "Agadir",
    date: "Il y a 2h15",
    status: "Nouveau",
  },
  {
    id: 8,
    action: "Abonnement Pro Premium activé",
    user: "Wafa Assurance",
    city: "Casablanca",
    date: "Il y a 3h",
    status: "Actif",
  },
];

function getStatusVariant(status: string) {
  switch (status) {
    case "Nouveau":
      return "default";
    case "Vérifié":
    case "Approuvé":
    case "Actif":
    case "Publié":
      return "default";
    case "En attente":
      return "outline";
    case "Attribué":
      return "secondary";
    default:
      return "outline";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Nouveau":
      return "bg-blue-100 text-blue-700";
    case "Vérifié":
    case "Approuvé":
    case "Actif":
      return "bg-green-100 text-green-700";
    case "Publié":
      return "bg-[#00b894]/10 text-[#00b894]";
    case "En attente":
      return "bg-amber-100 text-amber-700";
    case "Attribué":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">
          Vue d&apos;ensemble de la plateforme Wafir.ma
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="pt-0">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-[#1a1a2e]">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    {kpi.trend === "up" ? (
                      <ArrowUpRight className="size-3 text-[#00b894]" />
                    ) : (
                      <ArrowDownRight className="size-3 text-red-500" />
                    )}
                    <span
                      className={
                        kpi.trend === "up"
                          ? "text-[#00b894]"
                          : "text-red-500"
                      }
                    >
                      {kpi.change}
                    </span>
                    <span className="text-muted-foreground">vs mois dernier</span>
                  </div>
                </div>
                <div className={`rounded-lg p-2.5 ${kpi.color}`}>
                  <kpi.icon className="size-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Line/Area chart - Leads par mois */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads par mois</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={leadsParMois}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00b894" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00b894" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e4e8" />
                  <XAxis
                    dataKey="mois"
                    tick={{ fontSize: 12, fill: "#4a5568" }}
                    axisLine={{ stroke: "#e0e4e8" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#4a5568" }}
                    axisLine={{ stroke: "#e0e4e8" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e4e8",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="#00b894"
                    strokeWidth={2}
                    fill="url(#colorLeads)"
                    name="Leads"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie chart - Leads par catégorie */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={leadsParCategorie}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                  >
                    {leadsParCategorie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, ""]}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e0e4e8",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span className="text-xs text-[#4a5568]">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead className="hidden sm:table-cell">Ville</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">
                    {activity.action}
                  </TableCell>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {activity.city}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {activity.date}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusVariant(activity.status)}
                      className={getStatusColor(activity.status)}
                    >
                      {activity.status}
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
