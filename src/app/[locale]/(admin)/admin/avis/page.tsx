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
  Star,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
} from "lucide-react";

type ReviewStatus = "En attente" | "Approuvé" | "Rejeté";

interface Review {
  id: number;
  clientName: string;
  proName: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
  category: string;
}

const reviewsData: Review[] = [
  {
    id: 1,
    clientName: "Mohammed Benali",
    proName: "Atlas Assurance SARL",
    rating: 5,
    comment: "Service exceptionnel ! Réponse rapide et professionnelle. J'ai obtenu mon assurance auto à un excellent tarif. Je recommande vivement.",
    date: "2026-03-06",
    status: "En attente",
    category: "Assurance auto",
  },
  {
    id: 2,
    clientName: "Fatima El Idrissi",
    proName: "FinanceFirst MA",
    rating: 4,
    comment: "Bon accompagnement pour mon crédit immobilier. Le conseiller était à l'écoute de mes besoins. Seul bémol : les délais étaient un peu longs.",
    date: "2026-03-05",
    status: "En attente",
    category: "Crédit immobilier",
  },
  {
    id: 3,
    clientName: "Youssef Kaddouri",
    proName: "Wafa Insurance Broker",
    rating: 5,
    comment: "Le meilleur courtier que j'ai eu ! Transparent, rapide et très compétent. Mon assurance habitation a été réglée en 24h.",
    date: "2026-03-04",
    status: "Approuvé",
    category: "Assurance habitation",
  },
  {
    id: 4,
    clientName: "Sara Bennani",
    proName: "Maroc Crédit Conseil",
    rating: 3,
    comment: "Service correct mais pas exceptionnel. Le taux proposé était compétitif mais la communication pourrait être améliorée.",
    date: "2026-03-03",
    status: "Approuvé",
    category: "Rachat de crédit",
  },
  {
    id: 5,
    clientName: "Karim Tazi",
    proName: "Atlas Assurance SARL",
    rating: 1,
    comment: "Très déçu. Aucun suivi après la souscription. Impossible de joindre le service client. À éviter absolument.",
    date: "2026-03-02",
    status: "En attente",
    category: "Assurance auto",
  },
  {
    id: 6,
    clientName: "Amina Lahlou",
    proName: "Capital Finance Group",
    rating: 5,
    comment: "Excellent ! Mehdi m'a accompagnée de A à Z pour mon rachat de crédit. J'économise maintenant 800 MAD par mois. Merci !",
    date: "2026-03-01",
    status: "Approuvé",
    category: "Rachat de crédit",
  },
  {
    id: 7,
    clientName: "Hassan Moukhliss",
    proName: "SafeGuard Assurances",
    rating: 4,
    comment: "Très bon rapport qualité/prix. L'agente était professionnelle et m'a bien expliqué les différentes options.",
    date: "2026-02-28",
    status: "Approuvé",
    category: "Assurance auto",
  },
  {
    id: 8,
    clientName: "Nadia Chraibi",
    proName: "Crédit Express Maroc",
    rating: 2,
    comment: "Spam constant par WhatsApp et appels non sollicités après ma demande. Le service n'est pas à la hauteur des promesses.",
    date: "2026-02-27",
    status: "Rejeté",
    category: "Crédit conso",
  },
  {
    id: 9,
    clientName: "Omar Filali",
    proName: "Al Amane Courtage",
    rating: 4,
    comment: "Bon courtier, tarifs compétitifs pour l'assurance habitation. Quelques lenteurs administratives mais globalement satisfait.",
    date: "2026-02-26",
    status: "Approuvé",
    category: "Assurance habitation",
  },
  {
    id: 10,
    clientName: "Zineb Alaoui",
    proName: "Capital Finance Group",
    rating: 5,
    comment: "Je suis ravie de mon expérience ! Crédit immobilier obtenu avec un taux très avantageux. Équipe réactive et bienveillante.",
    date: "2026-02-25",
    status: "En attente",
    category: "Crédit immobilier",
  },
  {
    id: 11,
    clientName: "Driss Elmouadden",
    proName: "Wafa Insurance Broker",
    rating: 3,
    comment: "Correct sans plus. Les tarifs sont bons mais j'aurais aimé plus de choix dans les garanties proposées.",
    date: "2026-02-24",
    status: "Approuvé",
    category: "Assurance santé",
  },
  {
    id: 12,
    clientName: "Houda Belhaj",
    proName: "FinanceFirst MA",
    rating: 5,
    comment: "Plateforme géniale et le pro recommandé était top ! Simulation précise et offre finale conforme. Bravo Wafir !",
    date: "2026-02-23",
    status: "Approuvé",
    category: "Crédit immobilier",
  },
];

function getStatusBadge(status: ReviewStatus) {
  switch (status) {
    case "En attente":
      return (
        <Badge className="bg-amber-100 text-amber-700">
          <Clock className="mr-1 size-3" />
          En attente
        </Badge>
      );
    case "Approuvé":
      return (
        <Badge className="bg-green-100 text-green-700">
          <CheckCircle className="mr-1 size-3" />
          Approuvé
        </Badge>
      );
    case "Rejeté":
      return (
        <Badge className="bg-red-100 text-red-700">
          <XCircle className="mr-1 size-3" />
          Rejeté
        </Badge>
      );
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
      <span className="ml-1 text-xs font-medium text-muted-foreground">
        {rating}/5
      </span>
    </div>
  );
}

export default function AvisPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);

  const filtered = reviewsData.filter((review) => {
    const matchesSearch =
      review.clientName.toLowerCase().includes(search.toLowerCase()) ||
      review.proName.toLowerCase().includes(search.toLowerCase()) ||
      review.comment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: reviewsData.length,
    pending: reviewsData.filter((r) => r.status === "En attente").length,
    approved: reviewsData.filter((r) => r.status === "Approuvé").length,
    avgRating: (
      reviewsData.reduce((acc, r) => acc + r.rating, 0) / reviewsData.length
    ).toFixed(1),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a1a2e]">Avis</h1>
        <p className="text-sm text-muted-foreground">
          Modération des avis clients sur les professionnels
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <MessageSquare className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">
                {stats.total}
              </p>
              <p className="text-xs text-muted-foreground">Total avis</p>
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
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-green-500/10 p-2">
              <CheckCircle className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">
                {stats.approved}
              </p>
              <p className="text-xs text-muted-foreground">Approuvés</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <Star className="size-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">
                {stats.avgRating}
              </p>
              <p className="text-xs text-muted-foreground">Note moyenne</p>
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
                placeholder="Rechercher par client, pro ou contenu..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[170px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Approuvé">Approuvé</SelectItem>
                <SelectItem value="Rejeté">Rejeté</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Professionnel</TableHead>
                <TableHead className="hidden sm:table-cell">Note</TableHead>
                <TableHead className="hidden lg:table-cell min-w-[200px]">
                  Commentaire
                </TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    {review.clientName}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{review.proName}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {review.rating}/5
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <StarRating rating={review.rating} />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <p className="line-clamp-2 max-w-[300px] text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {new Date(review.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Voir"
                        onClick={() => {
                          setSelectedReview(review);
                          setViewDialogOpen(true);
                        }}
                      >
                        <Eye className="size-3.5" />
                      </Button>
                      {review.status === "En attente" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            title="Approuver"
                            className="text-green-600 hover:text-green-700"
                          >
                            <ThumbsUp className="size-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            title="Rejeter"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => {
                              setSelectedReview(review);
                              setRejectDialogOpen(true);
                            }}
                          >
                            <ThumbsDown className="size-3.5" />
                          </Button>
                        </>
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
                    Aucun avis trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Review Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de l&apos;avis</DialogTitle>
            <DialogDescription>
              Avis de {selectedReview?.clientName} sur{" "}
              {selectedReview?.proName}
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Client</p>
                  <p className="font-medium">{selectedReview.clientName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Professionnel</p>
                  <p className="font-medium">{selectedReview.proName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Catégorie</p>
                  <p className="font-medium">{selectedReview.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {new Date(selectedReview.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Note</p>
                  <div className="mt-1">
                    <StarRating rating={selectedReview.rating} />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Statut</p>
                  <div className="mt-1">
                    {getStatusBadge(selectedReview.status)}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Commentaire</p>
                <p className="mt-1 rounded-md bg-muted p-3 text-sm leading-relaxed">
                  {selectedReview.comment}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedReview?.status === "En attente" && (
              <>
                <Button
                  variant="outline"
                  className="text-red-500"
                  onClick={() => {
                    setViewDialogOpen(false);
                    setRejectDialogOpen(true);
                  }}
                >
                  <ThumbsDown className="size-4" />
                  Rejeter
                </Button>
                <Button onClick={() => setViewDialogOpen(false)}>
                  <ThumbsUp className="size-4" />
                  Approuver
                </Button>
              </>
            )}
            {selectedReview?.status !== "En attente" && (
              <Button
                variant="outline"
                onClick={() => setViewDialogOpen(false)}
              >
                Fermer
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeter l&apos;avis</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment rejeter l&apos;avis de{" "}
              <strong>{selectedReview?.clientName}</strong> sur{" "}
              <strong>{selectedReview?.proName}</strong> ? L&apos;avis ne sera
              pas affiché publiquement.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => setRejectDialogOpen(false)}
            >
              Confirmer le rejet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
