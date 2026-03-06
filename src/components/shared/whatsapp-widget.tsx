"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WHATSAPP_NUMBER = "212600000000"; // TODO: Replace with real number
const DEFAULT_MESSAGE =
  "Bonjour, je souhaite avoir des informations sur vos services de comparaison de crédits et assurances.";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 end-6 z-50">
      {/* Tooltip */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-xl shadow-lg border p-4 w-72 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Wafir.ma</p>
                <p className="text-xs text-muted-foreground">
                  En ligne
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="bg-muted/50 rounded-lg p-3 mb-3">
            <p className="text-sm">
              Besoin d&apos;aide pour comparer les offres ? Contactez-nous sur
              WhatsApp !
            </p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-center py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Démarrer la conversation
          </a>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label="Contacter sur WhatsApp"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
