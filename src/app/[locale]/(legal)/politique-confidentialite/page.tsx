import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Politique de Confidentialité | Wafir.ma",
    alternates: {
      canonical: `https://wafir.ma/${locale}/politique-confidentialite`,
    },
  };
}

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>

      <div className="prose prose-gray max-w-none space-y-8">
        <p className="text-muted-foreground leading-relaxed">
          La protection de vos données personnelles est une priorité pour
          Wafir.ma. Cette politique de confidentialité détaille la manière dont
          nous collectons, utilisons et protégeons vos informations conformément à
          la loi marocaine n° 09-08 relative à la protection des personnes
          physiques à l&apos;égard du traitement des données à caractère personnel.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            1. Données collectées
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous collectons les données suivantes :
          </p>
          <ul className="text-muted-foreground space-y-1 mt-2">
            <li>
              <strong>Données d&apos;identification</strong> : nom, prénom, email,
              numéro de téléphone
            </li>
            <li>
              <strong>Données financières</strong> : revenus, charges, montant du
              projet (simulateurs et comparateurs uniquement)
            </li>
            <li>
              <strong>Données de navigation</strong> : pages visitées, durée de
              visite, appareil utilisé
            </li>
            <li>
              <strong>Données de géolocalisation</strong> : ville (pour
              personnaliser les résultats)
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            2. Finalités du traitement
          </h2>
          <ul className="text-muted-foreground space-y-1">
            <li>Mise en relation avec des professionnels (leads)</li>
            <li>Personnalisation des comparaisons et simulations</li>
            <li>Envoi de notifications (email, SMS, WhatsApp) avec votre
              consentement</li>
            <li>Amélioration de nos services et statistiques</li>
            <li>Gestion de votre compte utilisateur</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            3. Partage des données
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Vos données de contact sont partagées uniquement avec les
            professionnels (banques, assureurs, courtiers) que vous avez
            sélectionnés ou qui correspondent à votre demande. Nous ne vendons
            jamais vos données à des tiers à des fins marketing non liées à votre
            demande.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">
            4. Conservation des données
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Vos données personnelles sont conservées pendant une durée maximale de
            3 ans à compter de votre dernière interaction avec notre service. Les
            données des simulations sont anonymisées après 12 mois.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">5. Vos droits</h2>
          <p className="text-muted-foreground leading-relaxed">
            Conformément à la loi 09-08, vous disposez des droits suivants :
          </p>
          <ul className="text-muted-foreground space-y-1 mt-2">
            <li>Droit d&apos;accès à vos données personnelles</li>
            <li>Droit de rectification des données inexactes</li>
            <li>Droit d&apos;opposition au traitement</li>
            <li>Droit à la suppression de vos données</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-2">
            Pour exercer ces droits, contactez-nous à : privacy@wafir.ma
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">6. Sécurité</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nous mettons en œuvre des mesures techniques et organisationnelles
            appropriées pour protéger vos données : chiffrement SSL/TLS,
            authentification sécurisée, accès restreint aux données.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">7. Contact CNDP</h2>
          <p className="text-muted-foreground leading-relaxed">
            Wafir.ma est déclarée auprès de la Commission Nationale de contrôle de
            la protection des Données à caractère Personnel (CNDP). Pour toute
            réclamation : www.cndp.ma
          </p>
        </div>

        <p className="text-sm text-muted-foreground italic">
          Dernière mise à jour : Mars 2026
        </p>
      </div>
    </section>
  );
}
