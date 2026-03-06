"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  FileText,
  Bell,
  MessageSquare,
  ArrowRight,
  Plus,
  BarChart3,
  Clock,
  User,
  TrendingDown,
  Home,
  Car,
  Shield,
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

const STATS = [
  {
    label: "Simulations",
    value: 8,
    icon: Calculator,
    color: "bg-emerald-100 text-emerald-700",
    href: "/mon-compte/simulations",
  },
  {
    label: "Devis en cours",
    value: 3,
    icon: FileText,
    color: "bg-blue-100 text-blue-700",
    href: "/mon-compte/devis",
  },
  {
    label: "Alertes actives",
    value: 2,
    icon: Bell,
    color: "bg-amber-100 text-amber-700",
    href: "/mon-compte/alertes",
  },
  {
    label: "Messages",
    value: 5,
    icon: MessageSquare,
    color: "bg-purple-100 text-purple-700",
    href: "/mon-compte/messages",
  },
];

const RECENT_ACTIVITY = [
  {
    id: 1,
    type: "simulation",
    title: "Simulation credit immobilier",
    description: "Montant: 800 000 MAD - Duree: 20 ans",
    date: "Il y a 2 heures",
    icon: Home,
  },
  {
    id: 2,
    type: "devis",
    title: "Devis assurance auto recu",
    description: "WAFA Assurance - Dacia Sandero 2023",
    date: "Il y a 5 heures",
    icon: Car,
  },
  {
    id: 3,
    type: "alerte",
    title: "Alerte taux immobilier declenchee",
    description: "Le taux est passe sous 4.2%",
    date: "Hier",
    icon: TrendingDown,
  },
  {
    id: 4,
    type: "simulation",
    title: "Simulation credit consommation",
    description: "Montant: 50 000 MAD - Duree: 4 ans",
    date: "Il y a 2 jours",
    icon: Calculator,
  },
  {
    id: 5,
    type: "devis",
    title: "Demande de devis mutuelle sante",
    description: "Couverture familiale - 3 personnes",
    date: "Il y a 3 jours",
    icon: Shield,
  },
];

const PROFILE_ITEMS = [
  { label: "Nom complet", done: true },
  { label: "Email verifie", done: true },
  { label: "Telephone", done: true },
  { label: "Ville", done: false },
  { label: "Profession", done: false },
  { label: "Situation familiale", done: false },
];

export default function DashboardPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  const completedCount = PROFILE_ITEMS.filter((item) => item.done).length;
  const totalCount = PROFILE_ITEMS.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Bonjour, Karim
        </h1>
        <p className="mt-1 text-muted-foreground">
          Bienvenue sur votre espace personnel Wafir.ma
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Link key={stat.label} href={`/${locale}${stat.href}`}>
            <Card className="transition-shadow hover:shadow-md cursor-pointer py-4">
              <CardContent className="flex items-center gap-3 px-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-4 w-4 text-primary" />
                Activite recente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {RECENT_ACTIVITY.map((activity, index) => (
                <div key={activity.id}>
                  <div className="flex items-start gap-3 py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <activity.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {activity.date}
                    </span>
                  </div>
                  {index < RECENT_ACTIVITY.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href={`/${locale}/outils/simulateur-credit-immobilier`}>
                  <Plus className="h-4 w-4" />
                  Nouvelle simulation
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/${locale}/comparer`}>
                  <BarChart3 className="h-4 w-4" />
                  Comparer les offres
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Completez votre profil
              </CardTitle>
              <CardDescription>
                {completionPercentage}% complete
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Progress bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>

              <div className="space-y-2">
                {PROFILE_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        item.done ? "bg-primary" : "bg-border"
                      }`}
                    />
                    <span
                      className={
                        item.done
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full text-primary hover:text-primary/80"
              >
                <Link href={`/${locale}/mon-compte/profil`}>
                  Completer mon profil
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
