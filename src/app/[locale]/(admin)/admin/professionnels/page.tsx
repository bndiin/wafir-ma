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
  CheckCircle,
  Star,
  Eye,
  ShieldCheck,
  Briefcase,
  MapPin,
} from "lucide-react";

type Tier = "Gratuit" | "Starter" | "Premium";
type VerifiedStatus = "Vérifié" | "Non vérifié" | "En cours";

interface Pro {
  id: number;
  company: string;
  contactName: string;
  city: string;
  category: string;
  tier: Tier;
  verified: VerifiedStatus;
  rating: number;
  reviewsCount: number;
  leadsReceived: number;
  joinDate: string;
}

const prosData: Pro[] = [
  {
    id: 1,
    company: "Atlas Assurance SARL",
    contactName: "Ahmed Bennani",
    city: "Casablanca",
    category: "Assurance auto",
    tier: "Premium",
    verified: "Vérifié",
    rating: 4.7,
    reviewsCount: 89,
    leadsReceived: 234,
    joinDate: "2025-06-15",
  },
  {
    id: 2,
    company: "Crédit Express Maroc",
    contactName: "Rachid El Fassi",
    city: "Rabat",
    category: "Crédit immobilier",
    tier: "Starter",
    verified: "Non vérifié",
    rating: 0,
    reviewsCount: 0,
    leadsReceived: 12,
    joinDate: "2026-01-10",
  },
  {
    id: 3,
    company: "Wafa Insurance Broker",
    contactName: "Leila Tazi",
    city: "Casablanca",
    category: "Assurance habitation",
    tier: "Premium",
    verified: "Vérifié",
    rating: 4.5,
    reviewsCount: 67,
    leadsReceived: 189,
    joinDate: "2025-08-14",
  },
  {
    id: 4,
    company: "Maroc Crédit Conseil",
    contactName: "Youssef Amrani",
    city: "Rabat",
    category: "Rachat de crédit",
    tier: "Starter",
    verified: "Vérifié",
    rating: 4.2,
    reviewsCount: 34,
    leadsReceived: 78,
    joinDate: "2025-07-25",
  },
  {
    id: 5,
    company: "Assurance Plus Agence",
    contactName: "Nadia Benkirane",
    city: "Marrakech",
    category: "Assurance santé",
    tier: "Gratuit",
    verified: "Non vérifié",
    rating: 0,
    reviewsCount: 0,
    leadsReceived: 5,
    joinDate: "2026-03-01",
  },
  {
    id: 6,
    company: "FinanceFirst MA",
    contactName: "Karim Sahli",
    city: "Tanger",
    category: "Crédit conso",
    tier: "Premium",
    verified: "Vérifié",
    rating: 4.8,
    reviewsCount: 112,
    leadsReceived: 312,
    joinDate: "2025-05-20",
  },
  {
    id: 7,
    company: "SafeGuard Assurances",
    contactName: "Hind Moutawakkil",
    city: "Fès",
    category: "Assurance auto",
    tier: "Starter",
    verified: "En cours",
    rating: 3.9,
    reviewsCount: 18,
    leadsReceived: 45,
    joinDate: "2025-11-08",
  },
  {
    id: 8,
    company: "CrédiPro Solutions",
    contactName: "Omar Jalil",
    city: "Agadir",
    category: "Crédit immobilier",
    tier: "Gratuit",
    verified: "Non vérifié",
    rating: 0,
    reviewsCount: 0,
    leadsReceived: 8,
    joinDate: "2026-02-15",
  },
  {
    id: 9,
    company: "Al Amane Courtage",
    contactName: "Zineb Chaoui",
    city: "Meknès",
    category: "Assurance habitation",
    tier: "Starter",
    verified: "Vérifié",
    rating: 4.1,
    reviewsCount: 23,
    leadsReceived: 56,
    joinDate: "2025-09-30",
  },
  {
    id: 10,
    company: "Capital Finance Group",
    contactName: "Mehdi Ouazzani",
    city: "Casablanca",
    category: "Rachat de crédit",
    tier: "Premium",
    verified: "Vérifié",
    rating: 4.6,
    reviewsCount: 78,
    leadsReceived: 201,
    joinDate: "2025-07-12",
  },
];

function getTierBadge(tier: Tier) {
  switch (tier) {
    case "Premium":
      return <Badge className="bg-amber-100 text-amber-700">Premium</Badge>;
    case "Starter":
      return <Badge className="bg-blue-100 text-blue-700">Starter</Badge>;
    case "Gratuit":
      return <Badge className="bg-gray-100 text-gray-600">Gratuit</Badge>;
  }
}

function getVerifiedBadge(status: VerifiedStatus) {
  switch (status) {
    case "Vérifié":
      return (
        <Badge className="bg-green-100 text-green-700">
          <CheckCircle className="mr-1 size-3" />
          Vérifié
        </Badge>
      );
    case "Non vérifié":
      return <Badge className="bg-red-100 text-red-700">Non vérifié</Badge>;
    case "En cours":
      return (
        <Badge className="bg-amber-100 text-amber-700">En cours</Badge>
      );
  }
}

export default function ProfessionnelsPage() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [verifiedFilter, setVerifiedFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedPro, setSelectedPro] = useState<Pro | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const cities = [...new Set(prosData.map((p) => p.city))].sort();

  const filtered = prosData.filter((pro) => {
    const matchesSearch =
      pro.company.toLowerCase().includes(search.toLowerCase()) ||
      pro.contactName.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === "all" || pro.tier === tierFilter;
    const matchesVerified =
      verifiedFilter === "all" || pro.verified === verifiedFilter;
    const matchesCity = cityFilter === "all" || pro.city === cityFilter;
    return matchesSearch && matchesTier && matchesVerified && matchesCity;
  });

  const stats = {
    total: prosData.length,
    verified: prosData.filter((p) => p.verified === "Vérifié").length,
    premium: prosData.filter((p) => p.tier === "Premium").length,
    pending: prosData.filter((p) => p.verified === "Non vérifié").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Professionnels</h1>
        <p className="text-sm text-muted-foreground">
          Gestion et vérification des profils professionnels
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <Briefcase className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total pros</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-green-500/10 p-2">
              <ShieldCheck className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">{stats.verified}</p>
              <p className="text-xs text-muted-foreground">Vérifiés</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-amber-500/10 p-2">
              <Star className="size-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">{stats.premium}</p>
              <p className="text-xs text-muted-foreground">Premium</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-red-500/10 p-2">
              <MapPin className="size-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Non vérifiés</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par entreprise ou contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les tiers</SelectItem>
                <SelectItem value="Gratuit">Gratuit</SelectItem>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
            <Select value={verifiedFilter} onValueChange={setVerifiedFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Vérification" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="Vérifié">Vérifié</SelectItem>
                <SelectItem value="Non vérifié">Non vérifié</SelectItem>
                <SelectItem value="En cours">En cours</SelectItem>
              </SelectContent>
            </Select>
            <Select value={cityFilter} onValueChange={setCityFilter}>
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
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entreprise</TableHead>
                <TableHead className="hidden md:table-cell">Ville</TableHead>
                <TableHead className="hidden lg:table-cell">Catégorie</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Vérifié</TableHead>
                <TableHead className="hidden sm:table-cell">Note</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((pro) => (
                <TableRow key={pro.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{pro.company}</p>
                      <p className="text-xs text-muted-foreground">
                        {pro.contactName}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {pro.city}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {pro.category}
                  </TableCell>
                  <TableCell>{getTierBadge(pro.tier)}</TableCell>
                  <TableCell>{getVerifiedBadge(pro.verified)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {pro.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{pro.rating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({pro.reviewsCount})
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Pas encore noté
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Voir le profil"
                        onClick={() => {
                          setSelectedPro(pro);
                          setViewDialogOpen(true);
                        }}
                      >
                        <Eye className="size-3.5" />
                      </Button>
                      {pro.verified !== "Vérifié" && (
                        <Button
                          variant="default"
                          size="xs"
                          onClick={() => {
                            setSelectedPro(pro);
                            setVerifyDialogOpen(true);
                          }}
                        >
                          <ShieldCheck className="size-3" />
                          Vérifier
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-8 text-center text-muted-foreground"
                  >
                    Aucun professionnel trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Pro Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profil professionnel</DialogTitle>
            <DialogDescription>
              Détails complets du professionnel
            </DialogDescription>
          </DialogHeader>
          {selectedPro && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Entreprise</p>
                  <p className="font-medium">{selectedPro.company}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="font-medium">{selectedPro.contactName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ville</p>
                  <p className="font-medium">{selectedPro.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Catégorie</p>
                  <p className="font-medium">{selectedPro.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tier</p>
                  <div className="mt-1">{getTierBadge(selectedPro.tier)}</div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Statut</p>
                  <div className="mt-1">
                    {getVerifiedBadge(selectedPro.verified)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Note</p>
                  <p className="font-medium">
                    {selectedPro.rating > 0
                      ? `${selectedPro.rating}/5 (${selectedPro.reviewsCount} avis)`
                      : "Pas encore noté"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Leads reçus</p>
                  <p className="font-medium">{selectedPro.leadsReceived}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Date d&apos;inscription
                  </p>
                  <p className="font-medium">
                    {new Date(selectedPro.joinDate).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verify Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vérifier le professionnel</DialogTitle>
            <DialogDescription>
              Confirmez-vous la vérification de{" "}
              <strong>{selectedPro?.company}</strong> ? Ce professionnel recevra
              un badge vérifié visible sur la plateforme.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setVerifyDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={() => setVerifyDialogOpen(false)}>
              <ShieldCheck className="size-4" />
              Confirmer la vérification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
