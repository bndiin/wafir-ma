"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Plus,
  Home,
  CreditCard,
  Car,
  Building2,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SimulationType =
  | "immobilier"
  | "consommation"
  | "auto"
  | "mourabaha";

type SimulationStatus = "active" | "expiree" | "brouillon";

interface Simulation {
  id: string;
  type: SimulationType;
  date: string;
  amount: number;
  rate: number;
  monthly: number;
  duration: string;
  status: SimulationStatus;
}

const TYPE_CONFIG: Record<
  SimulationType,
  { label: string; icon: typeof Home; color: string }
> = {
  immobilier: {
    label: "Immobilier",
    icon: Home,
    color: "bg-emerald-100 text-emerald-700",
  },
  consommation: {
    label: "Consommation",
    icon: CreditCard,
    color: "bg-blue-100 text-blue-700",
  },
  auto: {
    label: "Auto",
    icon: Car,
    color: "bg-orange-100 text-orange-700",
  },
  mourabaha: {
    label: "Mourabaha",
    icon: Building2,
    color: "bg-purple-100 text-purple-700",
  },
};

const STATUS_CONFIG: Record<
  SimulationStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  active: { label: "Active", variant: "default" },
  expiree: { label: "Expiree", variant: "outline" },
  brouillon: { label: "Brouillon", variant: "secondary" },
};

const SIMULATIONS: Simulation[] = [
  {
    id: "SIM-001",
    type: "immobilier",
    date: "05/03/2026",
    amount: 800000,
    rate: 4.2,
    monthly: 4876,
    duration: "20 ans",
    status: "active",
  },
  {
    id: "SIM-002",
    type: "consommation",
    date: "03/03/2026",
    amount: 50000,
    rate: 7.5,
    monthly: 1213,
    duration: "4 ans",
    status: "active",
  },
  {
    id: "SIM-003",
    type: "auto",
    date: "28/02/2026",
    amount: 150000,
    rate: 5.9,
    monthly: 2887,
    duration: "5 ans",
    status: "active",
  },
  {
    id: "SIM-004",
    type: "mourabaha",
    date: "25/02/2026",
    amount: 600000,
    rate: 4.8,
    monthly: 4200,
    duration: "15 ans",
    status: "expiree",
  },
  {
    id: "SIM-005",
    type: "immobilier",
    date: "20/02/2026",
    amount: 1200000,
    rate: 4.0,
    monthly: 7270,
    duration: "25 ans",
    status: "brouillon",
  },
  {
    id: "SIM-006",
    type: "consommation",
    date: "15/02/2026",
    amount: 30000,
    rate: 8.0,
    monthly: 732,
    duration: "4 ans",
    status: "expiree",
  },
  {
    id: "SIM-007",
    type: "auto",
    date: "10/02/2026",
    amount: 200000,
    rate: 5.5,
    monthly: 3818,
    duration: "5 ans",
    status: "active",
  },
  {
    id: "SIM-008",
    type: "immobilier",
    date: "05/02/2026",
    amount: 500000,
    rate: 4.5,
    monthly: 3163,
    duration: "20 ans",
    status: "active",
  },
];

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("fr-MA").format(amount);
}

export default function SimulationsPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";
  const [filter, setFilter] = useState<string>("all");

  const filteredSimulations =
    filter === "all"
      ? SIMULATIONS
      : SIMULATIONS.filter((s) => s.type === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Mes simulations
          </h1>
          <p className="mt-1 text-muted-foreground">
            Retrouvez toutes vos simulations de credit
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href={`/${locale}/outils/simulateur-credit-immobilier`}>
            <Plus className="h-4 w-4" />
            Nouvelle simulation
          </Link>
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Filtrer par :</span>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tous les types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="immobilier">Credit immobilier</SelectItem>
            <SelectItem value="consommation">Credit consommation</SelectItem>
            <SelectItem value="auto">Credit auto</SelectItem>
            <SelectItem value="mourabaha">Mourabaha</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead className="text-right">Taux</TableHead>
                <TableHead className="text-right">Mensualite</TableHead>
                <TableHead>Duree</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSimulations.map((sim) => {
                const typeConf = TYPE_CONFIG[sim.type];
                const statusConf = STATUS_CONFIG[sim.status];
                return (
                  <TableRow key={sim.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-md ${typeConf.color}`}
                        >
                          <typeConf.icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-medium">
                          {typeConf.label}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {sim.date}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatAmount(sim.amount)} MAD
                    </TableCell>
                    <TableCell className="text-right">
                      {sim.rate}%
                    </TableCell>
                    <TableCell className="text-right font-medium text-primary">
                      {formatAmount(sim.monthly)} MAD
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {sim.duration}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusConf.variant}>
                        {statusConf.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Voir
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
        {filteredSimulations.map((sim) => {
          const typeConf = TYPE_CONFIG[sim.type];
          const statusConf = STATUS_CONFIG[sim.status];
          return (
            <Card key={sim.id} className="py-0">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeConf.color}`}
                    >
                      <typeConf.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Credit {typeConf.label}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {sim.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant={statusConf.variant}>
                    {statusConf.label}
                  </Badge>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3 rounded-lg bg-muted/50 p-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Montant</p>
                    <p className="text-sm font-semibold">
                      {formatAmount(sim.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Taux</p>
                    <p className="text-sm font-semibold">{sim.rate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Mensualite
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {formatAmount(sim.monthly)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Duree : {sim.duration}
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Voir le detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSimulations.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <ArrowUpDown className="h-10 w-10 text-muted-foreground/50" />
            <p className="mt-3 text-sm text-muted-foreground">
              Aucune simulation trouvee pour ce filtre.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => setFilter("all")}
            >
              Afficher tout
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
