"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Pencil,
  Ban,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";

type UserRole = "CLIENT" | "PRO" | "ADMIN";
type UserStatus = "Actif" | "Suspendu" | "En attente";

interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  date: string;
  city: string;
}

const usersData: User[] = [
  { id: 1, name: "Mohammed Benali", email: "m.benali@gmail.com", role: "CLIENT", status: "Actif", date: "2025-11-15", city: "Casablanca" },
  { id: 2, name: "Fatima Zahra El Idrissi", email: "fz.elidrissi@yahoo.fr", role: "CLIENT", status: "Actif", date: "2025-12-02", city: "Rabat" },
  { id: 3, name: "Atlas Assurance SARL", email: "contact@atlas-assurance.ma", role: "PRO", status: "Actif", date: "2025-10-20", city: "Marrakech" },
  { id: 4, name: "Youssef Kaddouri", email: "y.kaddouri@outlook.com", role: "CLIENT", status: "Suspendu", date: "2025-09-18", city: "Fès" },
  { id: 5, name: "Issam Wafir", email: "admin@wafir.ma", role: "ADMIN", status: "Actif", date: "2025-06-01", city: "Casablanca" },
  { id: 6, name: "Crédit Express Maroc", email: "info@credit-express.ma", role: "PRO", status: "En attente", date: "2026-01-10", city: "Tanger" },
  { id: 7, name: "Amina Lahlou", email: "a.lahlou@gmail.com", role: "CLIENT", status: "Actif", date: "2026-01-22", city: "Agadir" },
  { id: 8, name: "Karim Tazi", email: "k.tazi@hotmail.com", role: "CLIENT", status: "Actif", date: "2025-11-30", city: "Meknès" },
  { id: 9, name: "Wafa Insurance Broker", email: "wafa@wafa-broker.ma", role: "PRO", status: "Actif", date: "2025-08-14", city: "Casablanca" },
  { id: 10, name: "Sara Bennani", email: "s.bennani@gmail.com", role: "CLIENT", status: "En attente", date: "2026-02-05", city: "Oujda" },
  { id: 11, name: "Hassan Moukhliss", email: "h.moukhliss@gmail.com", role: "CLIENT", status: "Actif", date: "2025-12-19", city: "Kenitra" },
  { id: 12, name: "Maroc Crédit Conseil", email: "contact@mcc.ma", role: "PRO", status: "Actif", date: "2025-07-25", city: "Rabat" },
  { id: 13, name: "Nadia Chraibi", email: "n.chraibi@yahoo.fr", role: "CLIENT", status: "Suspendu", date: "2025-10-11", city: "Tétouan" },
  { id: 14, name: "Omar Filali", email: "o.filali@gmail.com", role: "CLIENT", status: "Actif", date: "2026-02-18", city: "Salé" },
  { id: 15, name: "Assurance Plus Agence", email: "pro@assurance-plus.ma", role: "PRO", status: "En attente", date: "2026-03-01", city: "Marrakech" },
];

function getRoleBadge(role: UserRole) {
  switch (role) {
    case "ADMIN":
      return <Badge className="bg-purple-100 text-purple-700">Admin</Badge>;
    case "PRO":
      return <Badge className="bg-blue-100 text-blue-700">Pro</Badge>;
    case "CLIENT":
      return <Badge className="bg-gray-100 text-gray-700">Client</Badge>;
  }
}

function getStatusBadge(status: UserStatus) {
  switch (status) {
    case "Actif":
      return <Badge className="bg-green-100 text-green-700">Actif</Badge>;
    case "Suspendu":
      return <Badge className="bg-red-100 text-red-700">Suspendu</Badge>;
    case "En attente":
      return <Badge className="bg-amber-100 text-amber-700">En attente</Badge>;
  }
}

const ITEMS_PER_PAGE = 8;

export default function UtilisateursPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [suspendDialogOpen, setSuspendDialogOpen] = useState(false);

  const filtered = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Utilisateurs</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} utilisateur{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="size-5 text-muted-foreground" />
          <span className="text-sm font-semibold text-[#1a1a2e]">
            {usersData.length} total
          </span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>
            <Select
              value={roleFilter}
              onValueChange={(v) => {
                setRoleFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les rôles</SelectItem>
                <SelectItem value="CLIENT">Client</SelectItem>
                <SelectItem value="PRO">Pro</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="Actif">Actif</SelectItem>
                <SelectItem value="Suspendu">Suspendu</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
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
                <TableHead>Nom</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden lg:table-cell">Date inscription</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground md:hidden">
                        {user.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.email}
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="hidden text-muted-foreground lg:table-cell">
                    {new Date(user.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        title="Voir"
                        onClick={() => {
                          setSelectedUser(user);
                          setViewDialogOpen(true);
                        }}
                      >
                        <Eye className="size-3.5" />
                      </Button>
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
                        title="Suspendre"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setSelectedUser(user);
                          setSuspendDialogOpen(true);
                        }}
                      >
                        <Ban className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    Aucun utilisateur trouvé.
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
            Page {page} sur {totalPages}
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

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails utilisateur</DialogTitle>
            <DialogDescription>
              Informations complètes de l&apos;utilisateur
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Nom</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rôle</p>
                  <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Statut</p>
                  <div className="mt-1">
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ville</p>
                  <p className="font-medium">{selectedUser.city}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Date d&apos;inscription
                  </p>
                  <p className="font-medium">
                    {new Date(selectedUser.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Fermer
            </Button>
            <Button>Modifier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend User Dialog */}
      <Dialog open={suspendDialogOpen} onOpenChange={setSuspendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspendre l&apos;utilisateur</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment suspendre{" "}
              <strong>{selectedUser?.name}</strong> ? L&apos;utilisateur ne
              pourra plus accéder à la plateforme.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSuspendDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => setSuspendDialogOpen(false)}
            >
              Confirmer la suspension
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
