"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Car, Shield, CheckCircle2, ArrowRight, Star, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INSURANCE_COMPANIES } from "@/lib/constants";
import { formatMAD } from "@/lib/finance";

const CAR_BRANDS = [
  "Dacia", "Renault", "Peugeot", "Citroën", "Volkswagen", "Hyundai",
  "Toyota", "Kia", "Fiat", "Ford", "Mercedes", "BMW", "Audi", "Autre",
];

const COVERAGE_TYPES = [
  { id: "rc", label: "Responsabilité Civile", desc: "Minimum légal obligatoire", price: 1800 },
  { id: "tiers", label: "Tiers Étendu", desc: "RC + Vol + Incendie + Bris de glace", price: 3200 },
  { id: "tous-risques", label: "Tous Risques", desc: "Protection maximale", price: 5500 },
];

interface InsuranceQuote {
  company: string;
  logo: string;
  rc: number;
  tiers: number;
  tousRisques: number;
  rating: number;
  features: string[];
}

function generateQuotes(vehicleValue: number, driverAge: number, yearsLicense: number): InsuranceQuote[] {
  const baseFactor = vehicleValue / 100000;
  const ageFactor = driverAge < 25 ? 1.4 : driverAge > 50 ? 1.1 : 1.0;
  const expFactor = yearsLicense < 2 ? 1.5 : yearsLicense < 5 ? 1.2 : 1.0;

  return INSURANCE_COMPANIES.slice(0, 6).map((company, i) => {
    const companyFactor = 0.9 + (i * 0.05);
    const base = baseFactor * ageFactor * expFactor * companyFactor;

    return {
      company: company.nameFr,
      logo: company.slug,
      rc: Math.round(1800 * ageFactor * expFactor * companyFactor),
      tiers: Math.round(3200 * base * 0.8),
      tousRisques: Math.round(5500 * base * 0.7),
      rating: Math.round((4.5 - i * 0.15) * 10) / 10,
      features: [
        "Assistance 24/7",
        i < 3 ? "Véhicule de remplacement" : "Remorquage gratuit",
        i < 2 ? "0 franchise" : `Franchise ${1000 + i * 500} MAD`,
        "Protection juridique",
      ],
    };
  }).sort((a, b) => a.tousRisques - b.tousRisques);
}

export function AutoInsuranceComparator() {
  const t = useTranslations("tools");
  const locale = useLocale();

  const [brand, setBrand] = useState("Dacia");
  const [year, setYear] = useState(2020);
  const [vehicleValue, setVehicleValue] = useState([150000]);
  const [driverAge, setDriverAge] = useState([30]);
  const [yearsLicense, setYearsLicense] = useState([5]);
  const [coverageType, setCoverageType] = useState("tous-risques");
  const [showResults, setShowResults] = useState(false);

  const quotes = generateQuotes(vehicleValue[0], driverAge[0], yearsLicense[0]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-700 mb-4">
          <Car className="h-4 w-4" />
          Comparateur gratuit
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          {t("autoInsurance")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          {t("autoInsuranceDesc")}
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
        {/* Input Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-primary" />
              Votre véhicule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Brand */}
            <div className="space-y-2">
              <Label>Marque</Label>
              <Select value={brand} onValueChange={setBrand}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CAR_BRANDS.map((b) => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label>Année</Label>
              <Select value={year.toString()} onValueChange={(v) => setYear(Number(v))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 15 }, (_, i) => 2025 - i).map((y) => (
                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vehicle Value */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Valeur du véhicule</Label>
                <span className="text-sm font-semibold text-primary">
                  {formatMAD(vehicleValue[0])}
                </span>
              </div>
              <Slider
                value={vehicleValue}
                onValueChange={setVehicleValue}
                min={50000}
                max={1000000}
                step={10000}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>50 000 MAD</span>
                <span>1 000 000 MAD</span>
              </div>
            </div>

            {/* Driver Age */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Âge du conducteur</Label>
                <span className="text-sm font-semibold text-primary">
                  {driverAge[0]} ans
                </span>
              </div>
              <Slider
                value={driverAge}
                onValueChange={setDriverAge}
                min={18}
                max={70}
                step={1}
              />
            </div>

            {/* License Years */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Années de permis</Label>
                <span className="text-sm font-semibold text-primary">
                  {yearsLicense[0]} ans
                </span>
              </div>
              <Slider
                value={yearsLicense}
                onValueChange={setYearsLicense}
                min={0}
                max={30}
                step={1}
              />
            </div>

            {/* Coverage Type */}
            <div className="space-y-3">
              <Label>Type de couverture</Label>
              {COVERAGE_TYPES.map((cov) => (
                <button
                  key={cov.id}
                  onClick={() => setCoverageType(cov.id)}
                  className={`w-full text-start rounded-lg border p-3 transition-colors ${
                    coverageType === cov.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{cov.label}</p>
                      <p className="text-xs text-muted-foreground">{cov.desc}</p>
                    </div>
                    {coverageType === cov.id && (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90"
              size="lg"
              onClick={() => setShowResults(true)}
            >
              <Shield className="me-2 h-4 w-4" />
              Comparer les offres
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          {!showResults ? (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-16">
                <Shield className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Remplissez le formulaire
                </h3>
                <p className="text-sm text-muted-foreground">
                  Comparez les offres d&apos;assurance auto de +8 compagnies au Maroc
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">
                  {quotes.length} offres trouvées
                </h2>
                <Badge className="bg-primary/10 text-primary">
                  {brand} {year}
                </Badge>
              </div>

              {quotes.map((quote, i) => {
                const price =
                  coverageType === "rc"
                    ? quote.rc
                    : coverageType === "tiers"
                    ? quote.tiers
                    : quote.tousRisques;

                return (
                  <Card
                    key={quote.company}
                    className={`${
                      i === 0 ? "border-primary shadow-md" : ""
                    } hover:shadow-md transition-shadow`}
                  >
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Company Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">
                              {quote.company}
                            </h3>
                            {i === 0 && (
                              <Badge className="bg-primary text-white text-xs">
                                Meilleur prix
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-sm text-muted-foreground">
                              {quote.rating}/5
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {quote.features.map((f) => (
                              <span
                                key={f}
                                className="inline-flex items-center gap-1 text-xs text-muted-foreground"
                              >
                                <CheckCircle2 className="h-3 w-3 text-primary" />
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price + CTA */}
                        <div className="text-end shrink-0">
                          <p className="text-2xl font-bold text-primary">
                            {formatMAD(price)}
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            /an
                          </p>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                            asChild
                          >
                            <Link href={`/${locale}/comparer`}>
                              Demander un devis
                              <ArrowRight className="ms-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Info Box */}
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Tarifs indicatifs</p>
                    <p>
                      Les prix affichés sont des estimations basées sur votre profil.
                      Pour obtenir un devis précis, contactez directement l&apos;assureur
                      ou utilisez notre comparateur.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
