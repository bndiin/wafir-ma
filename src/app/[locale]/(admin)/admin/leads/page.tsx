"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Eye,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

type LeadQuality = "Chaud" | "Tiède" | "Froid";
type LeadStatus =
  | "Nouveau"
  | "Attribué"
  | "Contacté"
  | "Converti"
  | "Perdu"
  | "En attente";

interface Lead {
  id: string;
  category: string;
  city: string;
  source: string;
  quality: LeadQuality;
  status: LeadStatus;
  date: string;
  assignedPro: string | null;
  clientName: string;
  phone: string;
  budget: string;
  details: string;
}

const leadsData: Lead[] = [
  { id: "WF-2601", category: "Crédit immobilier", city: "Casablanca", source: "Simulateur", quality: "Chaud", status: "Attribué", date: "2026-03-06", assignedPro: "Atlas Assurance SARL", clientName: "Mohammed Benali", phone: "0661-XXXXXX", budget: "800 000 MAD", details: "Achat appartement 3 chambres, apport 200K" },
  { id: "WF-2602", category: "Assurance auto", city: "Rabat", source: "Formulaire", quality: "Chaud", status: "Nouveau", date: "2026-03-06", assignedPro: null, clientName: "Fatima El Idrissi", phone: "0670-XXXXXX", budget: "5 000 MAD/an", details: "Dacia Sandero 2024, tous risques" },
  { id: "WF-2603", category: "Crédit conso", city: "Marrakech", source: "WhatsApp", quality: "Tiède", status: "Contacté", date: "2026-03-05", assignedPro: "FinanceFirst MA", clientName: "Youssef Kaddouri", phone: "0655-XXXXXX", budget: "50 000 MAD", details: "Financement équipement cuisine" },
  { id: "WF-2604", category: "Assurance habitation", city: "Tanger", source: "Comparateur", quality: "Chaud", status: "Converti", date: "2026-03-05", assignedPro: "Wafa Insurance Broker", clientName: "Sara Bennani", phone: "0648-XXXXXX", budget: "3 500 MAD/an", details: "Villa 200m², Tanger centre" },
  { id: "WF-2605", category: "Rachat de crédit", city: "Fès", source: "Simulateur", quality: "Tiède", status: "En attente", date: "2026-03-05", assignedPro: null, clientName: "Karim Tazi", phone: "0661-XXXXXX", budget: "120 000 MAD", details: "Regroupement 2 crédits conso" },
  { id: "WF-2606", category: "Crédit immobilier", city: "Agadir", source: "Formulaire", quality: "Chaud", status: "Attribué", date: "2026-03-04", assignedPro: "Maroc Crédit Conseil", clientName: "Amina Lahlou", phone: "0677-XXXXXX", budget: "1 200 000 MAD", details: "Achat villa, fonctionnaire" },
  { id: "WF-2607", category: "Assurance santé", city: "Casablanca", source: "Comparateur", quality: "Froid", status: "Perdu", date: "2026-03-04", assignedPro: "Atlas Assurance SARL", clientName: "Hassan Moukhliss", phone: "0690-XXXXXX", budget: "8 000 MAD/an", details: "Famille 4 personnes, couverture complète" },
  { id: "WF-2608", category: "Crédit conso", city: "Meknès", source: "WhatsApp", quality: "Tiède", status: "Nouveau", date: "2026-03-04", assignedPro: null, clientName: "Nadia Chraibi", phone: "0665-XXXXXX", budget: "30 000 MAD", details: "Achat mobilier maison" },
  { id: "WF-2609", category: "Assurance auto", city: "Kenitra", source: "Simulateur", quality: "Chaud", status: "Contacté", date: "2026-03-03", assignedPro: "SafeGuard Assurances", clientName: "Omar Filali", phone: "0641-XXXXXX", budget: "4 500 MAD/an", details: "Renault Clio V, tiers étendu" },
  { id: "WF-2610", category: "Crédit immobilier", city: "Casablanca", source: "Formulaire", quality: "Chaud", status: "Converti", date: "2026-03-03", assignedPro: "Capital Finance Group", clientName: "Zineb Alaoui", phone: "0672-XXXXXX", budget: "950 000 MAD", details: "Achat appartement Maarif" },
  { id: "WF-2611", category: "Assurance habitation", city: "Rabat", source: "Comparateur", quality: "Tiède", status: "Attribué", date: "2026-03-02", assignedPro: "Al Amane Courtage", clientName: "Mehdi Ouazzani", phone: "0656-XXXXXX", budget: "2 800 MAD/an", details: "Appartement 120m², Agdal" },
  { id: "WF-2612", category: "Rachat de crédit", city: "Oujda", source: "WhatsApp", quality: "Froid", status: "Perdu", date: "2026-03-02", assignedPro: null, clientName: "Rachid El Fassi", phone: "0633-XXXXXX", budget: "200 000 MAD", details: "3 crédits à regrouper, dossier complexe" },
  { id: "WF-2613", category: "Crédit immobilier", city: "Marrakech", source: "Simulateur", quality: "Chaud", status: "Nouveau", date: "2026-03-01", assignedPro: null, clientName: "Leila Tazi", phone: "0688-XXXXXX", budget: "600 000 MAD", details: "Premier achat, CDI 2 ans" },
  { id: "WF-2614", category: "Assurance auto", city: "Salé", source: "Formulaire", quality: "Tiède", status: "Contacté", date: "2026-03-01", assignedPro: "Wafa Insurance Broker", clientName: "Amine Benmoussa", phone: "0645-XXXXXX", budget: "3 800 MAD/an", details: "Peugeot 208, tiers collision" },
  { id: "WF-2615", category: "Assurance santé", city: "Casablanca", source: "Comparateur", quality: "Chaud", status: "Attribué", date: "2026-02-28", assignedPro: "Atlas Assurance SARL", clientName: "Houda Belhaj", phone: "0679-XXXXXX", budget: "12 000 MAD/an", details: "Indépendante, couverture premium" },
  { id: "WF-2616", category: "Crédit conso", city: "Tanger", source: "Simulateur", quality: "Froid", status: "En attente", date: "2026-02-28", assignedPro: null, clientName: "Mustapha Hamdani", phone: "0667-XXXXXX", budget: "25 000 MAD", details: "Voyage, pas urgent" },
  { id: "WF-2617", category: "Crédit immobilier", city: "Fès", source: "WhatsApp", quality: "Chaud", status: "Nouveau", date: "2026-02-27", assignedPro: null, clientName: "Samira Idrissi", phone: "0652-XXXXXX", budget: "500 000 MAD", details: "Achat terrain + construction" },
  { id: "WF-2618", category: "Assurance habitation", city: "Agadir", source: "Formulaire", quality: "Tiède", status: "Attribué", date: "2026-02-27", assignedPro: "CrédiPro Solutions", clientName: "Khalid Benkirane", phone: "0693-XXXXXX", budget: "4 200 MAD/an", details: "Riad rénové, Agadir centre" },
  { id: "WF-2619", category: "Rachat de crédit", city: "Casablanca", source: "Comparateur", quality: "Chaud", status: "Contacté", date: "2026-02-26", assignedPro: "Capital Finance Group", clientName: "Yasmina Zerouali", phone: "0681-XXXXXX", budget: "350 000 MAD", details: "Crédit immo + conso, taux élevé" },
  { id: "WF-2620", category: "Assurance auto", city: "Rabat", source: "Simulateur", quality: "Tiède", status: "Nouveau", date: "2026-02-26", assignedPro: null, clientName: "Driss Elmouadden", phone: "0638-XXXXXX", budget: "6 200 MAD/an", details: "BMW Série 3 2023, tous risques" },
];

function getQualityBadge(quality: LeadQuality) {
  switch (quality) {
    case "Chaud":
      return <Badge className="bg-red-100 text-red-700">Chaud</Badge>;
    case "Tiède":
      return <Badge className="bg-amber-100 text-amber-700">Tiède</Badge>;
    case "Froid":
      return <Badge className="bg-blue-100 text-blue-700">Froid</Badge>;
  }
}

function getStatusBadge(status: LeadStatus) {
  switch (status) {
    case "Nouveau":
      return <Badge className="bg-blue-100 text-blue-700">Nouveau</Badge>;
    case "Attribué":
      return <Badge className="bg-purple-100 text-purple-700">Attribué</Badge>;
    case "Contacté":
      return <Badge className="bg-cyan-100 text-cyan-700">Contacté</Badge>;
    case "Converti":
      return <Badge className="bg-green-100 text-green-700">Converti</Badge>;
    case "Perdu":
      return <Badge className="bg-gray-100 text-gray-500">Perdu</Badge>;
    case "En attente":
      return <Badge className="bg-amber-100 text-amber-700">En attente</Badge>;
  }
}

const ITEMS_PER_PAGE = 10;

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [qualityFilter, setQualityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const categories = [...new Set(leadsData.map((l) => l.category))].sort();
  const cities = [...new Set(leadsData.map((l) => l.city))].sort();

  const filtered = leadsData.filter((lead) => {
    const matchesSearch =
      lead.id.toLowerCase().includes(search.toLowerCase()) ||
      lead.clientName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || lead.category === categoryFilter;
    const matchesCity = cityFilter === "all" || lead.city === cityFilter;
    const matchesQuality =
      qualityFilter === "all" || lead.quality === qualityFilter;
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    return (
      matchesSearch &&
      matchesCategory &&
      matchesCity &&
      matchesQuality &&
      matchesStatus
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const stats = {
    total: leadsData.length,
    hot: leadsData.filter((l) => l.quality === "Chaud").length,
    converted: leadsData.filter((l) => l.status === "Converti").length,
    pending: leadsData.filter(
      (l) => l.status === "Nouveau" || l.status === "En attente"
    ).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Leads</h1>
        <p className="text-sm text-muted-foreground">
          Gestion et suivi des demandes de devis
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Target className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total leads</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-red-500/10 p-2">
              <TrendingUp className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">{stats.hot}</p>
              <p className="text-xs text-muted-foreground">Leads chauds</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-green-500/10 p-2">
              <CheckCircle className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">
                {stats.converted}
              </p>
              <p className="text-xs text-muted-foreground">Convertis</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-amber-500/10 p-2">
              <Clock className="size-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">
                {stats.pending}
              </p>
              <p className="text-xs text-muted-foreground">En attente</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par ID ou nom du client..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Filter className="size-3.5" />
                Filtres
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select
                value={categoryFilter}
                onValueChange={(v) => {
                  setCategoryFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={cityFilter}
                onValueChange={(v) => {
                  setCityFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Ville" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les villes</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={qualityFilter}
                onValueChange={(v) => {
                  setQualityFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-[130px]">
                  <SelectValue placeholder="Qualité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="Chaud">Chaud</SelectItem>
                  <SelectItem value="Tiède">Tiède</SelectItem>
                  <SelectItem value="Froid">Froid</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(v) => {
                  setStatusFilter(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="Nouveau">Nouveau</SelectItem>
                  <SelectItem value="Attribué">Attribué</SelectItem>
                  <SelectItem value="Contacté">Contacté</SelectItem>
                  <SelectItem value="Converti">Converti</SelectItem>
                  <SelectItem value="Perdu">Perdu</SelectItem>
                  <SelectItem value="En attente">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead className="hidden md:table-cell">Ville</TableHead>
                <TableHead className="hidden lg:table-cell">Source</TableHead>
                <TableHead>Qualité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden xl:table-cell">Pro attribué</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedLead(lead);
                    setViewDialogOpen(true);
                  }}
                >
                  <TableCell className="font-mono text-xs font-semibold text-[#0984e3]">
                    {lead.id}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{lead.category}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {lead.city}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {lead.source}
                  </TableCell>
                  <TableCell>{getQualityBadge(lead.quality)}</TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {lead.assignedPro ? (
                      <span className="text-sm">{lead.assignedPro}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Non attribué
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {new Date(lead.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      title="Voir les détails"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLead(lead);
                        setViewDialogOpen(true);
                      }}
                    >
                      <Eye className="size-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-8 text-center text-muted-foreground"
                  >
                    Aucun lead trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} lead{filtered.length > 1 ? "s" : ""} — Page{" "}
            {page} sur {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="size-4" />
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Suivant
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Lead Detail Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Lead {selectedLead?.id}
              {selectedLead && getQualityBadge(selectedLead.quality)}
            </DialogTitle>
            <DialogDescription>
              Détails complets de la demande
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Client</p>
                  <p className="font-medium">{selectedLead.clientName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Téléphone</p>
                  <p className="font-medium">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Catégorie</p>
                  <p className="font-medium">{selectedLead.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ville</p>
                  <p className="font-medium">{selectedLead.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Budget</p>
                  <p className="font-medium">{selectedLead.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="font-medium">{selectedLead.source}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Statut</p>
                  <div className="mt-1">
                    {getStatusBadge(selectedLead.status)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(selectedLead.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Pro attribué
                </p>
                <p className="font-medium">
                  {selectedLead.assignedPro || "Non attribué"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Détails</p>
                <p className="mt-1 rounded-md bg-muted p-3 text-sm">
                  {selectedLead.details}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Fermer
            </Button>
            {selectedLead && !selectedLead.assignedPro && (
              <Button>Attribuer un pro</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
