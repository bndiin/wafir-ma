import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Conditions d'Utilisation | Wafir.ma",
    alternates: {
      canonical: `https://wafir.ma/${locale}/conditions-utilisation`,
    },
  };
}

export default function ConditionsUtilisationPage() {
  return (
    <section className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">
        Conditions Générales d&apos;Utilisation
      </h1>

      <div className="prose prose-gray max-w-none space-y-8">
        <p className="text-muted-foreground leading-relaxed">
          Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent
          l&apos;accès et l&apos;utilisation du site wafir.ma. En utilisant notre
          site, vous acceptez sans réserve les présentes conditions.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            1. Description du service
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Wafir.ma est une plateforme de comparaison de produits financiers
            (crédits, assurances, finance participative) au Maroc. Nous proposons
            des outils de simulation gratuits et un service de mise en relation
            entre particuliers et professionnels du secteur financier.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            2. Rôle d&apos;intermédiaire
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Wafir.ma agit en qualité d&apos;intermédiaire et ne se substitue en
            aucun cas aux établissements financiers. Les informations fournies
            (taux, mensualités, comparaisons) sont données à titre indicatif et ne
            constituent pas une offre contractuelle de prêt ou d&apos;assurance.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            3. Comptes utilisateurs
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            L&apos;inscription est gratuite pour les particuliers. Les
            professionnels peuvent souscrire à un abonnement (Gratuit, Pro à 149
            MAD/mois, Premium à 499 MAD/mois). Vous êtes responsable de la
            confidentialité de vos identifiants de connexion.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            4. Utilisation des simulateurs
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Les simulateurs et calculateurs sont mis à disposition gratuitement à
            titre informatif. Les résultats sont approximatifs et peuvent varier
            selon les conditions réelles proposées par les établissements
            financiers. Wafir.ma ne garantit pas l&apos;exactitude des résultats.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            5. Mise en relation (leads)
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            En soumettant vos coordonnées via le comparateur ou un formulaire de
            devis, vous acceptez d&apos;être contacté par les professionnels
            sélectionnés. Vous pouvez à tout moment demander la suppression de vos
            données en contactant privacy@wafir.ma.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            6. Abonnements professionnels
          </h2>
          <ul className="text-muted-foreground space-y-2">
            <li>
              <strong>Gratuit</strong> : profil basique, 5 leads/mois
            </li>
            <li>
              <strong>Pro (149 MAD/mois)</strong> : profil complet, 30 leads/mois,
              badge vérifié, analytics
            </li>
            <li>
              <strong>Premium (499 MAD/mois)</strong> : leads illimités, position
              prioritaire, support dédié
            </li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Les abonnements sont renouvelés automatiquement. Résiliation possible
            à tout moment avec effet au prochain cycle de facturation.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            7. Propriété intellectuelle
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Tous les contenus du site (textes, images, algorithmes, code source)
            sont la propriété de Wafir SARL. Toute reproduction sans autorisation
            est interdite.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            8. Modification des CGU
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Wafir.ma se réserve le droit de modifier les présentes CGU à tout
            moment. Les utilisateurs seront informés par email en cas de
            modification substantielle.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            9. Droit applicable
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Les présentes CGU sont régies par le droit marocain. Tout litige sera
            soumis à la compétence exclusive des tribunaux de Casablanca.
          </p>
        </div>

        <p className="text-sm text-muted-foreground italic">
          Dernière mise à jour : Mars 2026
        </p>
      </div>
    </section>
  );
}
