"use client";

import { useState } from "react";
import {
  Bell,
  Plus,
  Trash2,
  Home,
  CreditCard,
  Car,
  TrendingDown,
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

interface Alert {
  id: string;
  type: string;
  condition: string;
  threshold: string;
  enabled: boolean;
  icon: typeof Home;
  createdAt: string;
  lastTriggered?: string;
}

const INITIAL_ALERTS: Alert[] = [
  {
    id: "ALR-001",
    type: "Credit immobilier",
    condition: "Taux inferieur a",
    threshold: "4.0%",
    enabled: true,
    icon: Home,
    createdAt: "01/03/2026",
    lastTriggered: "05/03/2026",
  },
  {
    id: "ALR-002",
    type: "Credit consommation",
    condition: "Taux inferieur a",
    threshold: "7.0%",
    enabled: true,
    icon: CreditCard,
    createdAt: "15/02/2026",
  },
  {
    id: "ALR-003",
    type: "Credit auto",
    condition: "Taux inferieur a",
    threshold: "5.5%",
    enabled: false,
    icon: Car,
    createdAt: "10/02/2026",
    lastTriggered: "20/02/2026",
  },
];

export default function AlertesPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [showForm, setShowForm] = useState(false);
  const [newAlertType, setNewAlertType] = useState("");
  const [newAlertThreshold, setNewAlertThreshold] = useState("");

  const activeCount = alerts.filter((a) => a.enabled).length;

  function toggleAlert(id: string) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  }

  function deleteAlert(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  function handleCreateAlert() {
    if (!newAlertType || !newAlertThreshold) return;

    const iconMap: Record<string, typeof Home> = {
      immobilier: Home,
      consommation: CreditCard,
      auto: Car,
    };

    const labelMap: Record<string, string> = {
      immobilier: "Credit immobilier",
      consommation: "Credit consommation",
      auto: "Credit auto",
    };

    const newAlert: Alert = {
      id: `ALR-${String(alerts.length + 1).padStart(3, "0")}`,
      type: labelMap[newAlertType] || newAlertType,
      condition: "Taux inferieur a",
      threshold: `${newAlertThreshold}%`,
      enabled: true,
      icon: iconMap[newAlertType] || TrendingDown,
      createdAt: new Date().toLocaleDateString("fr-FR"),
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setNewAlertType("");
    setNewAlertThreshold("");
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mes alertes</h1>
          <p className="mt-1 text-muted-foreground">
            Recevez une notification lorsque les taux correspondent a vos
            criteres
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            {activeCount} active{activeCount > 1 ? "s" : ""}
          </Badge>
          <Button
            className="bg-primary hover:bg-primary/90"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="h-4 w-4" />
            Nouvelle alerte
          </Button>
        </div>
      </div>

      {/* Create Alert Form */}
      {showForm && (
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Bell className="h-4 w-4 text-primary" />
              Creer une nouvelle alerte
            </CardTitle>
            <CardDescription>
              Vous serez notifie par email et WhatsApp lorsque le taux
              correspondra a votre critere.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="alert-type">Type de credit</Label>
                <Select
                  value={newAlertType}
                  onValueChange={setNewAlertType}
                >
                  <SelectTrigger id="alert-type">
                    <SelectValue placeholder="Choisir un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immobilier">
                      Credit immobilier
                    </SelectItem>
                    <SelectItem value="consommation">
                      Credit consommation
                    </SelectItem>
                    <SelectItem value="auto">Credit auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alert-threshold">
                  Alerte quand le taux est inferieur a (%)
                </Label>
                <Input
                  id="alert-threshold"
                  type="number"
                  step="0.1"
                  min="0"
                  max="20"
                  placeholder="ex: 4.0"
                  value={newAlertThreshold}
                  onChange={(e) => setNewAlertThreshold(e.target.value)}
                />
              </div>

              <div className="flex items-end gap-2">
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={handleCreateAlert}
                  disabled={!newAlertType || !newAlertThreshold}
                >
                  Creer l&apos;alerte
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alert List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            className={`transition-opacity py-0 ${
              !alert.enabled ? "opacity-60" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    alert.enabled
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <alert.icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">
                      {alert.type}
                    </p>
                    {alert.enabled && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-0">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {alert.condition}{" "}
                    <span className="font-semibold text-foreground">
                      {alert.threshold}
                    </span>
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>Creee le {alert.createdAt}</span>
                    {alert.lastTriggered && (
                      <>
                        <span className="text-border">|</span>
                        <span className="flex items-center gap-1">
                          <TrendingDown className="h-3 w-3" />
                          Declenchee le {alert.lastTriggered}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Switch
                    checked={alert.enabled}
                    onCheckedChange={() => toggleAlert(alert.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => deleteAlert(alert.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Supprimer</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {alerts.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-10 w-10 text-muted-foreground/50" />
              <p className="mt-3 text-sm font-medium text-foreground">
                Aucune alerte configuree
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Creez votre premiere alerte pour etre notifie des meilleurs
                taux.
              </p>
              <Button
                className="mt-4 bg-primary hover:bg-primary/90"
                onClick={() => setShowForm(true)}
              >
                <Plus className="h-4 w-4" />
                Creer une alerte
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Info Card */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="flex items-start gap-3 p-4">
          <Bell className="h-5 w-5 shrink-0 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Comment fonctionnent les alertes ?
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Nous surveillons les taux de credit aupres de +40 banques et
              assureurs au Maroc. Des qu&apos;un taux correspond a vos criteres,
              vous recevez une notification par email et WhatsApp. Vous pouvez
              desactiver ou supprimer une alerte a tout moment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
