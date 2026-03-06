"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Mail, Lock, Eye, EyeOff, LogIn, Chrome } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  const locale = useLocale();
  const t = useTranslations("common");

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: NextAuth signIn
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
            Connectez-vous à votre espace
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">Connexion</CardTitle>
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

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ps-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    href={`/${locale}/mot-de-passe-oublie`}
                    className="text-xs text-primary hover:underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="ps-10 pe-10"
                    required
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

              <Button type="submit" className="w-full">
                <LogIn className="h-4 w-4 me-2" />
                Se connecter
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link
                href={`/${locale}/inscription`}
                className="text-primary font-medium hover:underline"
              >
                Créer un compte
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Pro CTA */}
        <Card className="mt-4 bg-secondary/5 border-secondary/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Vous êtes un professionnel ?
            </p>
            <Link
              href={`/${locale}/inscription?type=pro`}
              className="text-sm font-medium text-secondary hover:underline"
            >
              Créer votre profil professionnel
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
