"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Lock,
  Bell,
  MessageSquare,
  Trash2,
  Save,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fes",
  "Tanger",
  "Agadir",
  "Meknes",
  "Oujda",
  "Kenitra",
  "Tetouan",
  "Safi",
  "El Jadida",
  "Nador",
  "Beni Mellal",
  "Khouribga",
];

export default function ProfilPage() {
  const [formData, setFormData] = useState({
    firstName: "Karim",
    lastName: "Amrani",
    email: "karim.amrani@email.com",
    phone: "+212 6 12 34 56 78",
    city: "Casablanca",
    profession: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true,
    newsletter: true,
    alertes: true,
    devis: true,
  });

  function updateFormData(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleNotification(field: string) {
    setNotifications((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Mon profil</h1>
        <p className="mt-1 text-muted-foreground">
          Gerez vos informations personnelles et vos preferences
        </p>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4 text-primary" />
            Informations personnelles
          </CardTitle>
          <CardDescription>
            Ces informations sont utilisees pour personnaliser vos
            simulations et devis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prenom</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    updateFormData("firstName", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    updateFormData("lastName", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telephone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <div className="relative">
                <Select
                  value={formData.city}
                  onValueChange={(value) => updateFormData("city", value)}
                >
                  <SelectTrigger id="city" className="w-full">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Selectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {CITIES.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="profession"
                  placeholder="ex: Ingenieur, Enseignant..."
                  value={formData.profession}
                  onChange={(e) =>
                    updateFormData("profession", e.target.value)
                  }
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4" />
              Enregistrer
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Lock className="h-4 w-4 text-primary" />
            Changer le mot de passe
          </CardTitle>
          <CardDescription>
            Assurez-vous d&apos;utiliser un mot de passe fort avec au moins 8
            caracteres.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Entrez votre mot de passe actuel"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Minimum 8 caracteres"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirmer le mot de passe
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirmer le mot de passe"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="outline">
              <Lock className="h-4 w-4" />
              Mettre a jour
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" />
            Preferences de notification
          </CardTitle>
          <CardDescription>
            Choisissez comment et quand vous souhaitez etre notifie.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          {/* Channels */}
          <p className="text-sm font-medium text-foreground pt-1">
            Canaux de notification
          </p>

          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-muted-foreground">
                  Recevoir les notifications par email
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={() => toggleNotification("email")}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">SMS</p>
                <p className="text-xs text-muted-foreground">
                  Recevoir les notifications par SMS
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.sms}
              onCheckedChange={() => toggleNotification("sms")}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">WhatsApp</p>
                <p className="text-xs text-muted-foreground">
                  Recevoir les notifications par WhatsApp
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.whatsapp}
              onCheckedChange={() => toggleNotification("whatsapp")}
            />
          </div>

          <Separator className="my-3" />

          {/* Types */}
          <p className="text-sm font-medium text-foreground pt-1">
            Types de notifications
          </p>

          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div>
              <p className="text-sm font-medium">Alertes de taux</p>
              <p className="text-xs text-muted-foreground">
                Notification quand un taux correspond a vos criteres
              </p>
            </div>
            <Switch
              checked={notifications.alertes}
              onCheckedChange={() => toggleNotification("alertes")}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div>
              <p className="text-sm font-medium">Reponses aux devis</p>
              <p className="text-xs text-muted-foreground">
                Notification quand un professionnel repond a votre demande
              </p>
            </div>
            <Switch
              checked={notifications.devis}
              onCheckedChange={() => toggleNotification("devis")}
            />
          </div>

          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div>
              <p className="text-sm font-medium">Newsletter</p>
              <p className="text-xs text-muted-foreground">
                Conseils financiers et meilleures offres du marche
              </p>
            </div>
            <Switch
              checked={notifications.newsletter}
              onCheckedChange={() => toggleNotification("newsletter")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-destructive">
            <AlertTriangle className="h-4 w-4" />
            Zone dangereuse
          </CardTitle>
          <CardDescription>
            Actions irreversibles sur votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Supprimer mon compte
              </p>
              <p className="text-xs text-muted-foreground">
                Cette action est irreversible. Toutes vos donnees, simulations
                et devis seront definitivement supprimes.
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              className="shrink-0"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
