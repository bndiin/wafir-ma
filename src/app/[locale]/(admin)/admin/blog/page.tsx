"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
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
  Plus,
  Pencil,
  Trash2,
  Eye,
  Globe,
  FileText,
  EyeOff,
} from "lucide-react";

type ArticleStatus = "Publié" | "Brouillon";

interface Article {
  id: number;
  title: string;
  category: string;
  status: ArticleStatus;
  date: string;
  author: string;
  views: number;
  slug: string;
}

const articlesData: Article[] = [
  { id: 1, title: "Guide complet : Comment obtenir un crédit immobilier au Maroc en 2026", category: "Crédit immobilier", status: "Publié", date: "2026-03-05", author: "Rédaction Wafir", views: 4521, slug: "guide-credit-immobilier-maroc-2026" },
  { id: 2, title: "Comparatif : Les meilleures assurances auto au Maroc", category: "Assurance auto", status: "Publié", date: "2026-03-03", author: "Rédaction Wafir", views: 3287, slug: "meilleures-assurances-auto-maroc" },
  { id: 3, title: "Tout savoir sur le rachat de crédit : conditions et démarches", category: "Rachat de crédit", status: "Publié", date: "2026-02-28", author: "Issam W.", views: 2156, slug: "rachat-credit-conditions-demarches" },
  { id: 4, title: "Taux de crédit immobilier Mars 2026 : tendances et prévisions", category: "Crédit immobilier", status: "Publié", date: "2026-03-01", author: "Rédaction Wafir", views: 5893, slug: "taux-credit-immobilier-mars-2026" },
  { id: 5, title: "Assurance habitation : ce que couvre vraiment votre contrat", category: "Assurance habitation", status: "Publié", date: "2026-02-25", author: "Rédaction Wafir", views: 1847, slug: "assurance-habitation-couverture-contrat" },
  { id: 6, title: "Les 5 erreurs à éviter lors de votre demande de crédit conso", category: "Crédit conso", status: "Publié", date: "2026-02-20", author: "Issam W.", views: 2934, slug: "erreurs-demande-credit-conso" },
  { id: 7, title: "MRE : comment financer votre projet immobilier depuis l'étranger", category: "Crédit immobilier", status: "Brouillon", date: "2026-03-04", author: "Rédaction Wafir", views: 0, slug: "mre-financement-immobilier-etranger" },
  { id: 8, title: "Assurance santé individuelle vs collective : quel choix pour vous ?", category: "Assurance santé", status: "Brouillon", date: "2026-03-06", author: "Rédaction Wafir", views: 0, slug: "assurance-sante-individuelle-collective" },
  { id: 9, title: "Simulation crédit auto : calculez vos mensualités en 2 minutes", category: "Crédit conso", status: "Publié", date: "2026-02-15", author: "Rédaction Wafir", views: 3102, slug: "simulation-credit-auto-mensualites" },
  { id: 10, title: "Nouvelle réglementation assurance automobile 2026 : ce qui change", category: "Assurance auto", status: "Publié", date: "2026-02-10", author: "Issam W.", views: 4217, slug: "reglementation-assurance-automobile-2026" },
  { id: 11, title: "Crédit Mourabaha : guide complet de la finance islamique au Maroc", category: "Crédit immobilier", status: "Publié", date: "2026-02-05", author: "Rédaction Wafir", views: 6234, slug: "credit-mourabaha-finance-islamique-maroc" },
  { id: 12, title: "Comment choisir son assureur habitation : critères et comparatif", category: "Assurance habitation", status: "Brouillon", date: "2026-03-05", author: "Rédaction Wafir", views: 0, slug: "choisir-assureur-habitation-criteres" },
];

function getStatusBadge(status: ArticleStatus) {
  switch (status) {
    case "Publié":
      return (
        <Badge className="bg-green-100 text-green-700">
          <Globe className="mr-1 size-3" />
          Publié
        </Badge>
      );
    case "Brouillon":
      return (
        <Badge className="bg-gray-100 text-gray-600">
          <FileText className="mr-1 size-3" />
          Brouillon
        </Badge>
      );
  }
}

export default function BlogPage() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = [...new Set(articlesData.map((a) => a.category))].sort();

  const filtered = articlesData.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || article.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = {
    total: articlesData.length,
    published: articlesData.filter((a) => a.status === "Publié").length,
    drafts: articlesData.filter((a) => a.status === "Brouillon").length,
    totalViews: articlesData.reduce((acc, a) => acc + a.views, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Blog</h1>
          <p className="text-sm text-muted-foreground">
            Gestion des articles et contenus SEO
          </p>
        </div>
        <Link href={`/${locale}/admin/blog/nouveau`}>
          <Button>
            <Plus className="size-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-blue-500/10 p-2">
              <FileText className="size-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">
                {stats.total}
              </p>
              <p className="text-xs text-muted-foreground">Total articles</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-green-500/10 p-2">
              <Globe className="size-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">
                {stats.published}
              </p>
              <p className="text-xs text-muted-foreground">Publiés</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-gray-500/10 p-2">
              <FileText className="size-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">
                {stats.drafts}
              </p>
              <p className="text-xs text-muted-foreground">Brouillons</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 pt-0">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <Eye className="size-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1a1a2e]">
                {stats.totalViews.toLocaleString("fr-FR")}
              </p>
              <p className="text-xs text-muted-foreground">Vues totales</p>
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
                placeholder="Rechercher un article..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Publié">Publié</SelectItem>
                <SelectItem value="Brouillon">Brouillon</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
          </div>
        </CardContent>
      </Card>

      {/* Articles table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[250px]">Titre</TableHead>
                <TableHead className="hidden md:table-cell">Catégorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden lg:table-cell">Auteur</TableHead>
                <TableHead className="hidden sm:table-cell">Vues</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <p className="line-clamp-1 font-medium">{article.title}</p>
                    <p className="text-xs text-muted-foreground md:hidden">
                      {article.category}
                    </p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{article.category}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(article.status)}</TableCell>
                  <TableCell className="hidden text-sm lg:table-cell">
                    {article.author}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {article.views > 0
                      ? article.views.toLocaleString("fr-FR")
                      : "—"}
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {new Date(article.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {article.status === "Brouillon" ? (
                        <Button variant="ghost" size="xs" title="Publier">
                          <Globe className="size-3" />
                          <span className="hidden lg:inline">Publier</span>
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon-xs"
                          title="Dépublier"
                        >
                          <EyeOff className="size-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Modifier"
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Supprimer"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setSelectedArticle(article);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
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
                    Aucun article trouvé.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer l&apos;article</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment supprimer &laquo;{" "}
              <strong>{selectedArticle?.title}</strong> &raquo; ? Cette action
              est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Supprimer définitivement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
