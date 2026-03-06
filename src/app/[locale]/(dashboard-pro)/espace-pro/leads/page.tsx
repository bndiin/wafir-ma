"use client";

import { useState } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Flame,
  Thermometer,
  Snowflake,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// ─── Types ─────────────────────────────────────────────────────
type LeadStatus = "Nouveau" | "Contacte" | "Converti" | "Expire";
type LeadQuality = "HOT" | "WARM" | "COLD";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  category: string;
  city: string;
  date: string;
  status: LeadStatus;
  quality: LeadQuality;
  message: string;
  budget: string;
}

// ─── Sample Data ───────────────────────────────────────────────
const SAMPLE_LEADS: Lead[] = [
  {
    id: 1,
    name: "Ahmed Benali",
    phone: "0661-XX-XX-45",
    email: "ahmed.b@email.com",
    category: "Credit Immobilier",
    city: "Casablanca",
    date: "06 Mar 2026",
    status: "Nouveau",
    quality: "HOT",
    message:
      "Je cherche un credit immobilier pour un appartement de 800 000 MAD a Casablanca. Apport personnel de 200 000 MAD.",
    budget: "800 000 MAD",
  },
  {
    id: 2,
    name: "Fatima Zohra El Amrani",
    phone: "0677-XX-XX-12",
    email: "fatima.za@email.com",
    category: "Assurance Auto",
    city: "Rabat",
    date: "05 Mar 2026",
    status: "Nouveau",
    quality: "WARM",
    message:
      "Besoin d'une assurance tous risques pour ma voiture neuve Dacia Duster 2026.",
    budget: "4 000 MAD/an",
  },
  {
    id: 3,
    name: "Youssef Tazi",
    phone: "0655-XX-XX-89",
    email: "y.tazi@email.com",
    category: "Credit Consommation",
    city: "Marrakech",
    date: "04 Mar 2026",
    status: "Contacte",
    quality: "HOT",
    message:
      "Je souhaite un credit de 100 000 MAD pour financer des travaux de renovation.",
    budget: "100 000 MAD",
  },
  {
    id: 4,
    name: "Khadija Ouazzani",
    phone: "0699-XX-XX-33",
    email: "k.ouazzani@email.com",
    category: "Mutuelle Sante",
    city: "Fes",
    date: "03 Mar 2026",
    status: "Converti",
    quality: "WARM",
    message:
      "Recherche d'une mutuelle sante familiale pour 4 personnes avec bonne couverture dentaire.",
    budget: "6 000 MAD/an",
  },
  {
    id: 5,
    name: "Omar Idrissi",
    phone: "0644-XX-XX-76",
    email: "omar.id@email.com",
    category: "Rachat de Credit",
    city: "Tanger",
    date: "02 Mar 2026",
    status: "Contacte",
    quality: "COLD",
    message:
      "J'ai 3 credits en cours et je souhaite les regrouper. Montant total restant: 250 000 MAD.",
    budget: "250 000 MAD",
  },
  {
    id: 6,
    name: "Sara Bennani",
    phone: "0622-XX-XX-54",
    email: "sara.ben@email.com",
    category: "Assurance Habitation",
    city: "Agadir",
    date: "01 Mar 2026",
    status: "Nouveau",
    quality: "HOT",
    message:
      "Assurance pour ma nouvelle villa a Agadir, superficie 200m2 avec piscine.",
    budget: "3 500 MAD/an",
  },
  {
    id: 7,
    name: "Mohamed Alaoui",
    phone: "0688-XX-XX-21",
    email: "m.alaoui@email.com",
    category: "Credit Auto",
    city: "Meknes",
    date: "28 Fev 2026",
    status: "Expire",
    quality: "COLD",
    message:
      "Credit auto pour une Hyundai Tucson neuve, budget environ 350 000 MAD.",
    budget: "350 000 MAD",
  },
  {
    id: 8,
    name: "Nadia Chraibi",
    phone: "0611-XX-XX-98",
    email: "nadia.ch@email.com",
    category: "Mourabaha",
    city: "Kenitra",
    date: "27 Fev 2026",
    status: "Contacte",
    quality: "WARM",
    message:
      "Financement participatif mourabaha pour achat d'un appartement F3 a Kenitra.",
    budget: "500 000 MAD",
  },
  {
    id: 9,
    name: "Rachid El Fassi",
    phone: "0633-XX-XX-07",
    email: "r.elfassi@email.com",
    category: "Assurance Vie",
    city: "Oujda",
    date: "26 Fev 2026",
    status: "Nouveau",
    quality: "WARM",
    message:
      "Assurance vie avec volet epargne, capital souhaite de 500 000 MAD sur 20 ans.",
    budget: "500 MAD/mois",
  },
  {
    id: 10,
    name: "Amina Haddad",
    phone: "0677-XX-XX-65",
    email: "amina.h@email.com",
    category: "Assurance Voyage",
    city: "Casablanca",
    date: "25 Fev 2026",
    status: "Converti",
    quality: "HOT",
    message:
      "Assurance voyage pour un sejour de 3 mois en Europe, couverture medicale complete.",
    budget: "2 000 MAD",
  },
];

function getStatusStyle(status: LeadStatus) {
  switch (status) {
    case "Nouveau":
      return "bg-[#0984e3]/10 text-[#0984e3] border-[#0984e3]/20";
    case "Contacte":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Converti":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Expire":
      return "bg-red-50 text-red-600 border-red-200";
  }
}

function getQualityBadge(quality: LeadQuality) {
  switch (quality) {
    case "HOT":
      return {
        icon: Flame,
        label: "HOT",
        className: "bg-red-100 text-red-700 border-red-200",
      };
    case "WARM":
      return {
        icon: Thermometer,
        label: "WARM",
        className: "bg-orange-100 text-orange-700 border-orange-200",
      };
    case "COLD":
      return {
        icon: Snowflake,
        label: "COLD",
        className: "bg-blue-100 text-blue-700 border-blue-200",
      };
  }
}

export default function LeadsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = SAMPLE_LEADS.filter((lead) => {
    if (statusFilter !== "all" && lead.status !== statusFilter) return false;
    if (categoryFilter !== "all" && lead.category !== categoryFilter)
      return false;
    if (
      searchQuery &&
      !lead.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !lead.city.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    return true;
  });

  const categories = [...new Set(SAMPLE_LEADS.map((l) => l.category))];
  const newCount = SAMPLE_LEADS.filter((l) => l.status === "Nouveau").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Mes leads</h1>
          <Badge className="bg-[#0984e3] text-white">{newCount} nouveaux</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Gerez vos demandes de devis et contactez vos prospects
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou ville..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="mr-1 h-4 w-4" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Nouveau">Nouveau</SelectItem>
                  <SelectItem value="Contacte">Contacte</SelectItem>
                  <SelectItem value="Converti">Converti</SelectItem>
                  <SelectItem value="Expire">Expire</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            { label: "Nouveau", count: SAMPLE_LEADS.filter((l) => l.status === "Nouveau").length, color: "text-[#0984e3]" },
            { label: "Contacte", count: SAMPLE_LEADS.filter((l) => l.status === "Contacte").length, color: "text-amber-600" },
            { label: "Converti", count: SAMPLE_LEADS.filter((l) => l.status === "Converti").length, color: "text-emerald-600" },
            { label: "Expire", count: SAMPLE_LEADS.filter((l) => l.status === "Expire").length, color: "text-red-500" },
          ] as const
        ).map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-0 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lead list */}
      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Aucun lead ne correspond a vos criteres de recherche.
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredLeads.map((lead) => {
            const isExpanded = expandedId === lead.id;
            const qualityInfo = getQualityBadge(lead.quality);
            const QualityIcon = qualityInfo.icon;

            return (
              <Card
                key={lead.id}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardContent className="pt-0">
                  {/* Lead summary row */}
                  <div
                    className="flex cursor-pointer flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : lead.id)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0984e3]/10 text-sm font-bold text-[#0984e3]">
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">
                            {lead.name}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${qualityInfo.className}`}
                          >
                            <QualityIcon className="h-3 w-3" />
                            {qualityInfo.label}
                          </span>
                        </div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>{lead.category}</span>
                          <span className="text-border">|</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {lead.city}
                          </span>
                          <span className="text-border">|</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {lead.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusStyle(lead.status)}`}
                      >
                        {lead.status}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="mt-4">
                      <Separator className="mb-4" />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              Telephone
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {lead.phone}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              Email
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {lead.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">
                              Budget estime
                            </p>
                            <p className="text-sm font-medium text-foreground">
                              {lead.budget}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground">
                            Message du prospect
                          </p>
                          <p className="mt-1 rounded-lg bg-muted/50 p-3 text-sm text-foreground">
                            {lead.message}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Button
                          className="gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
                          size="sm"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Contacter par WhatsApp
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Phone className="h-4 w-4" />
                          Appeler
                        </Button>
                        <div className="flex-1" />
                        <Select defaultValue={lead.status}>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Nouveau">Nouveau</SelectItem>
                            <SelectItem value="Contacte">Contacte</SelectItem>
                            <SelectItem value="Converti">Converti</SelectItem>
                            <SelectItem value="Expire">Expire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Results count */}
      <p className="text-center text-sm text-muted-foreground">
        {filteredLeads.length} lead{filteredLeads.length > 1 ? "s" : ""} affiche
        {filteredLeads.length > 1 ? "s" : ""}
      </p>
    </div>
  );
}
