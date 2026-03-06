"use client";

import { useState } from "react";
import {
  Save,
  Upload,
  Eye,
  Globe,
  Phone,
  MapPin,
  Building2,
  Clock,
  ImagePlus,
  X,
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES, CITIES } from "@/lib/constants";

// ─── Business hours ────────────────────────────────────────────
const DAYS = [
  { key: "lundi", label: "Lundi" },
  { key: "mardi", label: "Mardi" },
  { key: "mercredi", label: "Mercredi" },
  { key: "jeudi", label: "Jeudi" },
  { key: "vendredi", label: "Vendredi" },
  { key: "samedi", label: "Samedi" },
  { key: "dimanche", label: "Dimanche" },
] as const;

const DEFAULT_HOURS: Record<string, { open: string; close: string; closed: boolean }> = {
  lundi: { open: "09:00", close: "18:00", closed: false },
  mardi: { open: "09:00", close: "18:00", closed: false },
  mercredi: { open: "09:00", close: "18:00", closed: false },
  jeudi: { open: "09:00", close: "18:00", closed: false },
  vendredi: { open: "09:00", close: "18:00", closed: false },
  samedi: { open: "09:00", close: "13:00", closed: false },
  dimanche: { open: "09:00", close: "18:00", closed: true },
};

export default function ProfilPage() {
  // ─── Form state ────────────────────────────────────────────
  const [companyName, setCompanyName] = useState("Wafasalaf");
  const [description, setDescription] = useState(
    "Leader du credit a la consommation au Maroc depuis plus de 20 ans. Nous proposons des solutions de financement adaptees a vos besoins: credit personnel, credit auto, credit immobilier et rachat de credits."
  );
  const [address, setAddress] = useState("181, Bd Zerktouni, Casablanca");
  const [phone, setPhone] = useState("05 22 43 54 00");
  const [website, setWebsite] = useState("https://www.wafasalaf.ma");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "credit-immobilier",
    "credit-consommation",
    "credit-auto",
    "rachat-credit",
  ]);

  const [selectedCities, setSelectedCities] = useState<string[]>([
    "casablanca",
    "rabat",
    "marrakech",
    "tanger",
    "fes",
  ]);

  const [hours, setHours] = useState(DEFAULT_HOURS);

  // ─── Handlers ──────────────────────────────────────────────
  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleCity = (slug: string) => {
    setSelectedCities((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const updateHours = (day: string, field: "open" | "close" | "closed", value: string | boolean) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mon profil</h1>
          <p className="text-sm text-muted-foreground">
            Gerez les informations de votre entreprise visibles par les clients
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Eye className="h-4 w-4" />
            Apercu
          </Button>
          <Button size="sm" className="gap-2 bg-[#0984e3] text-white hover:bg-[#0984e3]/90">
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>

      {/* Company info */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0984e3]" />
            <CardTitle>Informations de l&apos;entreprise</CardTitle>
          </div>
          <CardDescription>
            Ces informations seront affichees sur votre fiche dans l&apos;annuaire
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nom de l&apos;entreprise</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nom de votre societe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                <Phone className="inline h-3.5 w-3.5" /> Telephone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05 22 XX XX XX"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Decrivez votre activite..."
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {description.length} / 500 caracteres
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="inline h-3.5 w-3.5" /> Adresse
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Adresse de votre entreprise"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">
                <Globe className="inline h-3.5 w-3.5" /> Site web
              </Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.example.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialities */}
      <Card>
        <CardHeader>
          <CardTitle>Specialites</CardTitle>
          <CardDescription>
            Selectionnez les categories de services que vous proposez
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Group by credit/assurance/finance */}
            {(["CREDIT", "ASSURANCE", "FINANCE_PARTICIPATIVE"] as const).map(
              (group) => {
                const items = CATEGORIES.filter((c) => c.group === group);
                const groupLabel =
                  group === "CREDIT"
                    ? "Credit"
                    : group === "ASSURANCE"
                      ? "Assurance"
                      : "Finance Participative";
                return (
                  <div key={group}>
                    <p className="mb-2 text-sm font-semibold text-foreground">
                      {groupLabel}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {items.map((cat) => (
                        <label
                          key={cat.slug}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition-colors hover:bg-accent"
                        >
                          <Checkbox
                            checked={selectedCategories.includes(cat.slug)}
                            onCheckedChange={() => toggleCategory(cat.slug)}
                          />
                          <span className="text-sm">
                            {cat.icon} {cat.nameFr}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>

      {/* Service zones */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#0984e3]" />
            <CardTitle>Zones de service</CardTitle>
          </div>
          <CardDescription>
            Selectionnez les villes ou vous proposez vos services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => {
              const isSelected = selectedCities.includes(city.slug);
              return (
                <button
                  key={city.slug}
                  onClick={() => toggleCity(city.slug)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    isSelected
                      ? "border-[#0984e3] bg-[#0984e3]/10 text-[#0984e3]"
                      : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {isSelected && (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#0984e3] text-[10px] text-white">
                      ✓
                    </span>
                  )}
                  {city.nameFr}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {selectedCities.length} ville{selectedCities.length > 1 ? "s" : ""}{" "}
            selectionnee{selectedCities.length > 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      {/* Gallery upload */}
      <Card>
        <CardHeader>
          <CardTitle>Galerie photos</CardTitle>
          <CardDescription>
            Ajoutez des photos de votre entreprise, equipe ou realisations (max 10)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Existing placeholder images */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
              >
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <ImagePlus className="h-8 w-8" />
                </div>
                <button className="absolute right-1 top-1 hidden h-6 w-6 items-center justify-center rounded-full bg-destructive text-white group-hover:flex">
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {/* Upload button */}
            <button className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-[#0984e3] hover:text-[#0984e3]">
              <div className="text-center">
                <Upload className="mx-auto h-6 w-6" />
                <p className="mt-1 text-xs">Ajouter</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Business hours */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#0984e3]" />
            <CardTitle>Horaires d&apos;ouverture</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {DAYS.map((day) => {
              const dayHours = hours[day.key];
              return (
                <div
                  key={day.key}
                  className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center"
                >
                  <div className="flex w-28 items-center gap-2">
                    <Checkbox
                      checked={!dayHours.closed}
                      onCheckedChange={(checked) =>
                        updateHours(day.key, "closed", !checked)
                      }
                    />
                    <span className="text-sm font-medium">{day.label}</span>
                  </div>
                  {dayHours.closed ? (
                    <Badge variant="secondary" className="w-fit">
                      Ferme
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={dayHours.open}
                        onChange={(e) =>
                          updateHours(day.key, "open", e.target.value)
                        }
                        className="w-32"
                      />
                      <span className="text-sm text-muted-foreground">a</span>
                      <Input
                        type="time"
                        value={dayHours.close}
                        onChange={(e) =>
                          updateHours(day.key, "close", e.target.value)
                        }
                        className="w-32"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Save button (bottom) */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Annuler</Button>
        <Button className="gap-2 bg-[#0984e3] text-white hover:bg-[#0984e3]/90">
          <Save className="h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
