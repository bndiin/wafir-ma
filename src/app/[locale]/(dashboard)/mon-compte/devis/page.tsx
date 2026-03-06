"use client";

import {
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  FileText,
  Building2,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DevisStatus = "en_attente" | "repondu" | "expire";

interface Devis {
  id: string;
  professional: string;
  company: string;
  category: string;
  date: string;
  status: DevisStatus;
  responseDate?: string;
  amount?: string;
}

const STATUS_CONFIG: Record<
  DevisStatus,
  {
    label: string;
    icon: typeof Clock;
    className: string;
    badgeClass: string;
  }
> = {
  en_attente: {
    label: "En attente",
    icon: Clock,
    className: "text-amber-600",
    badgeClass: "bg-amber-100 text-amber-700 border-amber-200",
  },
  repondu: {
    label: "Repondu",
    icon: CheckCircle2,
    className: "text-emerald-600",
    badgeClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  expire: {
    label: "Expire",
    icon: XCircle,
    className: "text-red-500",
    badgeClass: "bg-red-100 text-red-700 border-red-200",
  },
};

const DEVIS: Devis[] = [
  {
    id: "DEV-001",
    professional: "Ahmed Bennani",
    company: "WAFA Assurance",
    category: "Assurance auto",
    date: "05/03/2026",
    status: "en_attente",
  },
  {
    id: "DEV-002",
    professional: "Sara El Idrissi",
    company: "BMCE Bank",
    category: "Credit immobilier",
    date: "03/03/2026",
    status: "repondu",
    responseDate: "04/03/2026",
    amount: "4 200 MAD/mois",
  },
  {
    id: "DEV-003",
    professional: "Youssef Tazi",
    company: "AXA Assurance Maroc",
    category: "Mutuelle sante",
    date: "28/02/2026",
    status: "repondu",
    responseDate: "01/03/2026",
    amount: "350 MAD/mois",
  },
  {
    id: "DEV-004",
    professional: "Fatima Zohra Alami",
    company: "Attijariwafa Bank",
    category: "Credit consommation",
    date: "20/02/2026",
    status: "expire",
  },
  {
    id: "DEV-005",
    professional: "Mohamed Radi",
    company: "SAHAM Assurance",
    category: "Assurance habitation",
    date: "15/02/2026",
    status: "en_attente",
  },
  {
    id: "DEV-006",
    professional: "Khadija Bennani",
    company: "CIH Bank",
    category: "Mourabaha",
    date: "10/02/2026",
    status: "repondu",
    responseDate: "12/02/2026",
    amount: "3 800 MAD/mois",
  },
];

export default function DevisPage() {
  const statusCounts = {
    total: DEVIS.length,
    en_attente: DEVIS.filter((d) => d.status === "en_attente").length,
    repondu: DEVIS.filter((d) => d.status === "repondu").length,
    expire: DEVIS.filter((d) => d.status === "expire").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mes devis</h1>
        <p className="mt-1 text-muted-foreground">
          Suivez vos demandes de devis et les reponses des professionnels
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="py-4">
          <CardContent className="px-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {statusCounts.total}
            </p>
            <p className="text-xs text-muted-foreground">Total devis</p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {statusCounts.en_attente}
            </p>
            <p className="text-xs text-muted-foreground">En attente</p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {statusCounts.repondu}
            </p>
            <p className="text-xs text-muted-foreground">Repondus</p>
          </CardContent>
        </Card>
        <Card className="py-4">
          <CardContent className="px-4 text-center">
            <p className="text-2xl font-bold text-red-500">
              {statusCounts.expire}
            </p>
            <p className="text-xs text-muted-foreground">Expires</p>
          </CardContent>
        </Card>
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Professionnel</TableHead>
                <TableHead>Categorie</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Offre</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEVIS.map((devis) => {
                const statusConf = STATUS_CONFIG[devis.status];
                return (
                  <TableRow key={devis.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium">
                          {devis.professional}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {devis.company}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{devis.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {devis.date}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusConf.badgeClass}`}
                      >
                        <statusConf.icon className="h-3 w-3" />
                        {statusConf.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      {devis.amount ? (
                        <span className="text-sm font-medium text-primary">
                          {devis.amount}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          --
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {DEVIS.map((devis) => {
          const statusConf = STATUS_CONFIG[devis.status];
          return (
            <Card key={devis.id} className="py-0">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {devis.professional}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {devis.company}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${statusConf.badgeClass}`}
                  >
                    <statusConf.icon className="h-3 w-3" />
                    {statusConf.label}
                  </span>
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-xs">
                      {devis.category}
                    </Badge>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {devis.date}
                    </p>
                  </div>
                  <div className="text-right">
                    {devis.amount ? (
                      <p className="text-sm font-semibold text-primary">
                        {devis.amount}
                      </p>
                    ) : null}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-1 text-primary"
                    >
                      Voir le detail
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
