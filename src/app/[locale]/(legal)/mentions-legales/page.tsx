import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Mentions Légales | Wafir.ma",
    alternates: {
      canonical: `https://wafir.ma/${locale}/mentions-legales`,
    },
  };
}

export default function MentionsLegalesPage() {
  return (
    <section className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>

      <div className="prose prose-gray max-w-none space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-3">1. Éditeur du site</h2>
          <p className="text-muted-foreground leading-relaxed">
            Le site wafir.ma est édité par Wafir SARL, société de droit marocain
            au capital de 100 000 MAD, immatriculée au Registre du Commerce de
            Casablanca.
          </p>
          <ul className="text-muted-foreground space-y-1 mt-2">
            <li>Siège social : Casablanca, Maroc</li>
            <li>Email : contact@wafir.ma</li>
            <li>Directeur de la publication : [Nom du directeur]</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">2. Hébergement</h2>
          <p className="text-muted-foreground leading-relaxed">
            Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut,
            CA 91789, États-Unis.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            3. Propriété intellectuelle
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            L&apos;ensemble des contenus (textes, images, graphismes, logo,
            icônes, logiciels) présents sur le site wafir.ma sont protégés par
            les lois relatives à la propriété intellectuelle. Toute reproduction
            ou représentation, totale ou partielle, est interdite sans
            autorisation préalable.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            4. Limitation de responsabilité
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Les informations fournies sur wafir.ma, notamment les taux,
            mensualités et comparaisons, sont données à titre indicatif. Wafir.ma
            ne saurait être tenu responsable des décisions prises sur la base de
            ces informations. Les résultats des simulateurs ne constituent pas une
            offre de prêt ou d&apos;assurance.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">5. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Le site utilise des cookies pour améliorer l&apos;expérience
            utilisateur et à des fins statistiques. En poursuivant votre
            navigation, vous acceptez l&apos;utilisation de cookies conformément à
            notre politique de confidentialité.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            6. Droit applicable
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Les présentes mentions légales sont soumises au droit marocain. En cas
            de litige, les tribunaux de Casablanca seront seuls compétents.
          </p>
        </div>
      </div>
    </section>
  );
}
