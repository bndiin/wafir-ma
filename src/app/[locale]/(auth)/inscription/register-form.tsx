"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  UserPlus,
  Chrome,
  Building2,
  UserCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function RegisterForm() {
  const locale = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<"client" | "pro">("client");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    companyName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: NextAuth register + OTP verification
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${locale}`} className="inline-block">
            <span className="text-3xl font-bold">
              <span className="text-primary">W</span>
              <span className="text-foreground">afir</span>
              <span className="text-secondary">.ma</span>
            </span>
          </Link>
          <p className="text-muted-foreground mt-2">
            Créez votre compte gratuitement
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Inscription</CardTitle>
            {/* Account type toggle */}
            <div className="flex gap-2 mt-4">
              <Button
                type="button"
                variant={accountType === "client" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setAccountType("client")}
              >
                <UserCircle className="h-4 w-4 me-2" />
                Particulier
              </Button>
              <Button
                type="button"
                variant={accountType === "pro" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setAccountType("pro")}
              >
                <Building2 className="h-4 w-4 me-2" />
                Professionnel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Google OAuth */}
            <Button variant="outline" className="w-full" type="button">
              <Chrome className="h-4 w-4 me-2" />
              Continuer avec Google
            </Button>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                ou
              </span>
            </div>

            {/* Registration form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="ps-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              {accountType === "pro" && (
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l&apos;entreprise</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      placeholder="Nom de votre société"
                      value={formData.companyName}
                      onChange={(e) =>
                        updateField("companyName", e.target.value)
                      }
                      className="ps-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="ps-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 XX XX XX XX"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="ps-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 caractères"
                    value={formData.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="ps-10 pe-10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                En créant un compte, vous acceptez nos{" "}
                <Link
                  href={`/${locale}/conditions-utilisation`}
                  className="text-primary hover:underline"
                >
                  Conditions d&apos;utilisation
                </Link>{" "}
                et notre{" "}
                <Link
                  href={`/${locale}/politique-confidentialite`}
                  className="text-primary hover:underline"
                >
                  Politique de confidentialité
                </Link>
                .
              </p>

              <Button type="submit" className="w-full">
                <UserPlus className="h-4 w-4 me-2" />
                Créer mon compte
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link
                href={`/${locale}/connexion`}
                className="text-primary font-medium hover:underline"
              >
                Se connecter
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
