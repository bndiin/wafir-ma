"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatMAD } from "@/lib/finance";

interface ResultItem {
  label: string;
  value: number;
  format?: "mad" | "percent" | "months";
  highlight?: boolean;
}

export function ResultSummary({ items }: { items: ResultItem[] }) {
  function formatValue(item: ResultItem) {
    switch (item.format) {
      case "mad":
        return formatMAD(item.value);
      case "percent":
        return item.value.toFixed(2) + "%";
      case "months":
        return item.value + " mois";
      default:
        return formatMAD(item.value);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <Card
          key={item.label}
          className={
            item.highlight
              ? "border-primary bg-primary/5 col-span-2"
              : ""
          }
        >
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
            <p
              className={`text-xl font-bold ${
                item.highlight ? "text-primary" : "text-foreground"
              }`}
            >
              {formatValue(item)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
