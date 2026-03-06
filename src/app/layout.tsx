import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Wafir.ma",
    default: "Wafir.ma — Comparateur Crédit & Assurance au Maroc",
  },
  description:
    "Comparez gratuitement les crédits et assurances au Maroc. Simulez votre crédit, trouvez le meilleur taux, obtenez des devis de +40 banques et assureurs.",
  metadataBase: new URL("https://wafir.ma"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
