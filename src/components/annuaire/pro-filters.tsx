"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, CITIES } from "@/lib/constants";

interface ProFiltersProps {
  onSearch?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  onCityChange?: (city: string) => void;
  onSortChange?: (sort: string) => void;
}

export function ProFilters({
  onSearch,
  onCategoryChange,
  onCityChange,
  onSortChange,
}: ProFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher un professionnel, une banque, un courtier..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onSearch?.(e.target.value);
          }}
          className="ps-10 h-11"
        />
      </div>

      {/* Mobile filter toggle */}
      <div className="md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtres
        </Button>
      </div>

      {/* Filter Row */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-3 ${
          showMobileFilters ? "block" : "hidden md:grid"
        }`}
      >
        {/* Category */}
        <Select onValueChange={(value) => onCategoryChange?.(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Toutes les categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.slug} value={cat.slug}>
                {cat.icon} {cat.nameFr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City */}
        <Select onValueChange={(value) => onCityChange?.(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Toutes les villes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {CITIES.map((city) => (
              <SelectItem key={city.slug} value={city.slug}>
                {city.nameFr}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          defaultValue="rating"
          onValueChange={(value) => onSortChange?.(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Trier par note</SelectItem>
            <SelectItem value="popularity">Trier par popularite</SelectItem>
            <SelectItem value="name">Trier par nom</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
