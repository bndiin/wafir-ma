"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { X, Gift, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ExitIntentPopup() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    const hasShown = sessionStorage.getItem("exit-intent-shown");
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
        sessionStorage.setItem("exit-intent-shown", "true");
        document.removeEventListener("mouseout", handleMouseLeave);
      }
    };

    // Delay registering the listener to avoid triggering too early
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 animate-in fade-in">
      <div className="relative mx-4 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 end-4 z-10 text-muted-foreground hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white text-center">
          <div className="h-12 w-12 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
            <Gift className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-1">
            Attendez !
          </h3>
          <p className="text-sm text-white/90">
            Ne partez pas sans comparer les offres
          </p>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Comparez gratuitement les offres de crédit et d&apos;assurance
            de plus de <strong>20 banques et assureurs</strong> au Maroc.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full" size="lg">
              <Link href={`/${locale}/comparer`}>
                Comparer maintenant
                <ArrowRight className="h-4 w-4 ms-2" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={() => setIsVisible(false)}
            >
              Non merci
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            100% gratuit - Sans engagement - Résultat immédiat
          </p>
        </div>
      </div>
    </div>
  );
}
