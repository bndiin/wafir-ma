"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Globe,
  ImagePlus,
  Languages,
} from "lucide-react";

const categories = [
  "Crédit immobilier",
  "Crédit conso",
  "Assurance auto",
  "Assurance habitation",
  "Assurance santé",
  "Rachat de crédit",
  "Finance islamique",
  "Conseils pratiques",
  "Actualités",
];

export default function NouvelArticlePage() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1] || "fr";

  const [activeTab, setActiveTab] = useState("fr");
  const [category, setCategory] = useState("");

  // FR fields
  const [titleFr, setTitleFr] = useState("");
  const [contentFr, setContentFr] = useState("");
  const [metaTitleFr, setMetaTitleFr] = useState("");
  const [metaDescFr, setMetaDescFr] = useState("");

  // AR fields
  const [titleAr, setTitleAr] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [metaTitleAr, setMetaTitleAr] = useState("");
  const [metaDescAr, setMetaDescAr] = useState("");

  // EN fields
  const [titleEn, setTitleEn] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [metaTitleEn, setMetaTitleEn] = useState("");
  const [metaDescEn, setMetaDescEn] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/${locale}/admin/blog`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a2e]">
              Nouvel article
            </h1>
            <p className="text-sm text-muted-foreground">
              Créez un nouvel article pour le blog Wafir.ma
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Save className="size-4" />
            Enregistrer brouillon
          </Button>
          <Button>
            <Globe className="size-4" />
            Publier
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content area - 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Language tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center gap-2">
              <Languages className="size-4 text-muted-foreground" />
              <TabsList>
                <TabsTrigger value="fr">Francais</TabsTrigger>
                <TabsTrigger value="ar">Arabe</TabsTrigger>
                <TabsTrigger value="en">Anglais</TabsTrigger>
              </TabsList>
            </div>

            {/* FR tab */}
            <TabsContent value="fr" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Contenu (FR)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Titre de l&apos;article
                    </label>
                    <Input
                      placeholder="Ex: Guide complet du crédit immobilier au Maroc"
                      value={titleFr}
                      onChange={(e) => setTitleFr(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Contenu
                    </label>
                    <Textarea
                      placeholder="Rédigez votre article ici. Un éditeur riche sera intégré prochainement..."
                      rows={16}
                      value={contentFr}
                      onChange={(e) => setContentFr(e.target.value)}
                      className="resize-y font-sans"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Astuce : L&apos;éditeur riche (TipTap) sera connecté ici.
                      Pour l&apos;instant, utilisez le textarea.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* SEO FR */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">SEO (FR)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Meta Title
                    </label>
                    <Input
                      placeholder="Titre SEO (max 60 caractères)"
                      value={metaTitleFr}
                      onChange={(e) => setMetaTitleFr(e.target.value)}
                      maxLength={60}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {metaTitleFr.length}/60 caractères
                    </p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Meta Description
                    </label>
                    <Textarea
                      placeholder="Description SEO (max 160 caractères)"
                      rows={3}
                      value={metaDescFr}
                      onChange={(e) => setMetaDescFr(e.target.value)}
                      maxLength={160}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {metaDescFr.length}/160 caractères
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AR tab */}
            <TabsContent value="ar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Contenu (AR)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Titre de l&apos;article (arabe)
                    </label>
                    <Input
                      placeholder="عنوان المقال"
                      value={titleAr}
                      onChange={(e) => setTitleAr(e.target.value)}
                      dir="rtl"
                      className="text-right"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Contenu (arabe)
                    </label>
                    <Textarea
                      placeholder="اكتب محتوى المقال هنا..."
                      rows={16}
                      value={contentAr}
                      onChange={(e) => setContentAr(e.target.value)}
                      dir="rtl"
                      className="resize-y text-right"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">SEO (AR)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Meta Title (arabe)
                    </label>
                    <Input
                      placeholder="عنوان الصفحة"
                      value={metaTitleAr}
                      onChange={(e) => setMetaTitleAr(e.target.value)}
                      dir="rtl"
                      className="text-right"
                      maxLength={60}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {metaTitleAr.length}/60 caractères
                    </p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Meta Description (arabe)
                    </label>
                    <Textarea
                      placeholder="وصف الصفحة"
                      rows={3}
                      value={metaDescAr}
                      onChange={(e) => setMetaDescAr(e.target.value)}
                      dir="rtl"
                      className="text-right"
                      maxLength={160}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {metaDescAr.length}/160 caractères
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* EN tab */}
            <TabsContent value="en" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Content (EN)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Article title (English)
                    </label>
                    <Input
                      placeholder="E.g: Complete Guide to Getting a Mortgage in Morocco"
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Content (English)
                    </label>
                    <Textarea
                      placeholder="Write your article content here..."
                      rows={16}
                      value={contentEn}
                      onChange={(e) => setContentEn(e.target.value)}
                      className="resize-y"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">SEO (EN)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Meta Title (English)
                    </label>
                    <Input
                      placeholder="SEO title (max 60 characters)"
                      value={metaTitleEn}
                      onChange={(e) => setMetaTitleEn(e.target.value)}
                      maxLength={60}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {metaTitleEn.length}/60 characters
                    </p>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Meta Description (English)
                    </label>
                    <Textarea
                      placeholder="SEO description (max 160 characters)"
                      rows={3}
                      value={metaDescEn}
                      onChange={(e) => setMetaDescEn(e.target.value)}
                      maxLength={160}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {metaDescEn.length}/160 characters
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 1/3 */}
        <div className="space-y-6">
          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Image upload placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Image principale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center transition-colors hover:border-muted-foreground/50">
                <ImagePlus className="mb-3 size-10 text-muted-foreground/50" />
                <p className="text-sm font-medium text-muted-foreground">
                  Glissez une image ici
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG, WebP — max 2 Mo
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Parcourir
                </Button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Cloudinary sera utilisé pour l&apos;hébergement des images.
              </p>
            </CardContent>
          </Card>

          {/* Publication info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Publication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Statut</span>
                <span className="font-medium">Brouillon</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Auteur</span>
                <span className="font-medium">Issam Admin</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Langues</span>
                <div className="flex gap-1">
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                      titleFr
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    FR
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                      titleAr
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    AR
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs font-medium ${
                      titleEn
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    EN
                  </span>
                </div>
              </div>
              <Separator />
              <div className="pt-2">
                <Button className="w-full">
                  <Globe className="size-4" />
                  Publier maintenant
                </Button>
                <Button variant="outline" className="mt-2 w-full">
                  <Save className="size-4" />
                  Sauvegarder brouillon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
