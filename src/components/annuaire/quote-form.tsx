"use client";

import { useState } from "react";
import { Phone, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/constants";

interface QuoteFormProps {
  proName: string;
  proPhone?: string;
  proWhatsApp?: string;
}

export function QuoteForm({ proName, proPhone, proWhatsApp }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const whatsappUrl = proWhatsApp
    ? `https://wa.me/${proWhatsApp}?text=${encodeURIComponent(
        `Bonjour, je vous contacte depuis Wafir.ma. Je souhaite obtenir un devis pour ${formData.category || "vos services"}. Merci.`
      )}`
    : null;

  return (
    <div className="space-y-4">
      {/* Quote Form Card */}
      <Card className="sticky top-24">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Demander un devis</CardTitle>
          <p className="text-sm text-muted-foreground">
            Envoyez votre demande a {proName}
          </p>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-3">
                <Send className="h-5 w-5" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">
                Demande envoyee !
              </h4>
              <p className="text-sm text-muted-foreground">
                {proName} vous repondra sous 24h.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quote-name">Nom complet</Label>
                <Input
                  id="quote-name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote-phone">Telephone</Label>
                <Input
                  id="quote-phone"
                  type="tel"
                  placeholder="06 XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote-email">Email</Label>
                <Input
                  id="quote-email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote-category">Categorie</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choisir une categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.slug} value={cat.slug}>
                        {cat.icon} {cat.nameFr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quote-message">Message</Label>
                <Textarea
                  id="quote-message"
                  placeholder="Decrivez votre besoin..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Envoyer ma demande
                  </>
                )}
              </Button>
            </form>
          )}

          <Separator className="my-4" />

          {/* WhatsApp CTA */}
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Contacter via WhatsApp
              </Button>
            </a>
          )}

          {/* Phone CTA */}
          {proPhone && (
            <a href={`tel:${proPhone}`} className="block mt-3">
              <Button variant="outline" className="w-full gap-2">
                <Phone className="h-4 w-4" />
                Appeler : {proPhone}
              </Button>
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
