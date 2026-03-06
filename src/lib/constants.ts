// ==========================================
// Cities, Categories, and Institutions for Morocco
// ==========================================

export const CITIES = [
  { slug: 'casablanca', nameFr: 'Casablanca', nameAr: 'الدار البيضاء', nameEn: 'Casablanca', lat: 33.5731, lng: -7.5898, region: 'Casablanca-Settat' },
  { slug: 'rabat', nameFr: 'Rabat', nameAr: 'الرباط', nameEn: 'Rabat', lat: 34.0209, lng: -6.8416, region: 'Rabat-Salé-Kénitra' },
  { slug: 'marrakech', nameFr: 'Marrakech', nameAr: 'مراكش', nameEn: 'Marrakech', lat: 31.6295, lng: -7.9811, region: 'Marrakech-Safi' },
  { slug: 'tanger', nameFr: 'Tanger', nameAr: 'طنجة', nameEn: 'Tangier', lat: 35.7595, lng: -5.8340, region: 'Tanger-Tétouan-Al Hoceïma' },
  { slug: 'fes', nameFr: 'Fès', nameAr: 'فاس', nameEn: 'Fez', lat: 34.0181, lng: -5.0078, region: 'Fès-Meknès' },
  { slug: 'agadir', nameFr: 'Agadir', nameAr: 'أكادير', nameEn: 'Agadir', lat: 30.4278, lng: -9.5981, region: 'Souss-Massa' },
  { slug: 'meknes', nameFr: 'Meknès', nameAr: 'مكناس', nameEn: 'Meknes', lat: 33.8935, lng: -5.5473, region: 'Fès-Meknès' },
  { slug: 'oujda', nameFr: 'Oujda', nameAr: 'وجدة', nameEn: 'Oujda', lat: 34.6814, lng: -1.9086, region: 'Oriental' },
  { slug: 'kenitra', nameFr: 'Kénitra', nameAr: 'القنيطرة', nameEn: 'Kenitra', lat: 34.2610, lng: -6.5802, region: 'Rabat-Salé-Kénitra' },
  { slug: 'tetouan', nameFr: 'Tétouan', nameAr: 'تطوان', nameEn: 'Tetouan', lat: 35.5889, lng: -5.3626, region: 'Tanger-Tétouan-Al Hoceïma' },
  { slug: 'settat', nameFr: 'Settat', nameAr: 'سطات', nameEn: 'Settat', lat: 33.0014, lng: -7.6196, region: 'Casablanca-Settat' },
  { slug: 'beni-mellal', nameFr: 'Béni Mellal', nameAr: 'بني ملال', nameEn: 'Beni Mellal', lat: 32.3373, lng: -6.3498, region: 'Béni Mellal-Khénifra' },
] as const;

export type CitySlug = (typeof CITIES)[number]['slug'];

export const CATEGORIES = [
  // Credit
  { slug: 'credit-immobilier', group: 'CREDIT' as const, nameFr: 'Crédit Immobilier', nameAr: 'قرض عقاري', nameEn: 'Mortgage', icon: '🏠', sortOrder: 1 },
  { slug: 'credit-consommation', group: 'CREDIT' as const, nameFr: 'Crédit Consommation', nameAr: 'قرض استهلاكي', nameEn: 'Consumer Credit', icon: '💳', sortOrder: 2 },
  { slug: 'credit-auto', group: 'CREDIT' as const, nameFr: 'Crédit Auto', nameAr: 'قرض سيارة', nameEn: 'Auto Loan', icon: '🚗', sortOrder: 3 },
  { slug: 'rachat-credit', group: 'CREDIT' as const, nameFr: 'Rachat de Crédit', nameAr: 'إعادة شراء القرض', nameEn: 'Debt Consolidation', icon: '🔄', sortOrder: 4 },
  // Assurance
  { slug: 'assurance-auto', group: 'ASSURANCE' as const, nameFr: 'Assurance Auto', nameAr: 'تأمين السيارات', nameEn: 'Auto Insurance', icon: '🛡️', sortOrder: 5 },
  { slug: 'assurance-habitation', group: 'ASSURANCE' as const, nameFr: 'Assurance Habitation', nameAr: 'تأمين المنزل', nameEn: 'Home Insurance', icon: '🏡', sortOrder: 6 },
  { slug: 'mutuelle-sante', group: 'ASSURANCE' as const, nameFr: 'Mutuelle Santé', nameAr: 'التأمين الصحي', nameEn: 'Health Insurance', icon: '❤️', sortOrder: 7 },
  { slug: 'assurance-vie', group: 'ASSURANCE' as const, nameFr: 'Assurance Vie', nameAr: 'تأمين الحياة', nameEn: 'Life Insurance', icon: '🌱', sortOrder: 8 },
  { slug: 'assurance-voyage', group: 'ASSURANCE' as const, nameFr: 'Assurance Voyage', nameAr: 'تأمين السفر', nameEn: 'Travel Insurance', icon: '✈️', sortOrder: 9 },
  // Finance Participative
  { slug: 'mourabaha', group: 'FINANCE_PARTICIPATIVE' as const, nameFr: 'Mourabaha', nameAr: 'المرابحة', nameEn: 'Mourabaha', icon: '☪️', sortOrder: 10 },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const CONVENTIONAL_BANKS = [
  { slug: 'attijariwafa-bank', nameFr: 'Attijariwafa Bank', nameAr: 'التجاري وفا بنك', type: 'banque', website: 'https://www.attijariwafabank.com' },
  { slug: 'bmce-bank-of-africa', nameFr: 'BMCE Bank of Africa', nameAr: 'البنك المغربي للتجارة الخارجية', type: 'banque', website: 'https://www.bankofafrica.ma' },
  { slug: 'banque-populaire', nameFr: 'Banque Populaire', nameAr: 'البنك الشعبي', type: 'banque', website: 'https://www.gbp.ma' },
  { slug: 'societe-generale', nameFr: 'Société Générale Maroc', nameAr: 'سوسيتي جنرال المغرب', type: 'banque', website: 'https://www.sgmaroc.com' },
  { slug: 'bmci', nameFr: 'BMCI (BNP Paribas)', nameAr: 'البنك المغربي للتجارة والصناعة', type: 'banque', website: 'https://www.bmci.ma' },
  { slug: 'credit-du-maroc', nameFr: 'Crédit du Maroc', nameAr: 'القرض المغربي', type: 'banque', website: 'https://www.cdm.co.ma' },
  { slug: 'cih-bank', nameFr: 'CIH Bank', nameAr: 'بنك CIH', type: 'banque', website: 'https://www.cihbank.ma' },
  { slug: 'cfg-bank', nameFr: 'CFG Bank', nameAr: 'بنك CFG', type: 'banque', website: 'https://www.cfgbank.com' },
  { slug: 'credit-agricole-maroc', nameFr: 'Crédit Agricole du Maroc', nameAr: 'القرض الفلاحي للمغرب', type: 'banque', website: 'https://www.creditagricole.ma' },
  { slug: 'al-barid-bank', nameFr: 'Al Barid Bank', nameAr: 'بنك البريد', type: 'banque', website: 'https://www.albbaridbank.ma' },
] as const;

export const PARTICIPATIVE_BANKS = [
  { slug: 'bank-assafa', nameFr: 'Bank Assafa', nameAr: 'بنك الصفاء', type: 'banque_participative', website: 'https://www.bankassafa.com' },
  { slug: 'umnia-bank', nameFr: 'Umnia Bank', nameAr: 'بنك أمنية', type: 'banque_participative', website: 'https://www.umniabank.ma' },
  { slug: 'dar-al-amane', nameFr: 'Dar Al Amane', nameAr: 'دار الأمان', type: 'banque_participative', website: 'https://www.daralamane.com' },
  { slug: 'al-yousr', nameFr: 'Al Yousr', nameAr: 'اليسر', type: 'banque_participative', website: null },
  { slug: 'arreda', nameFr: 'Arreda', nameAr: 'الرضى', type: 'banque_participative', website: null },
] as const;

export const INSURANCE_COMPANIES = [
  { slug: 'wafa-assurance', nameFr: 'Wafa Assurance', nameAr: 'وفا للتأمين', type: 'assurance', website: 'https://www.wafaassurance.ma' },
  { slug: 'rma-assurance', nameFr: 'RMA Assurance', nameAr: 'RMA للتأمين', type: 'assurance', website: 'https://www.rma.ma' },
  { slug: 'saham-assurance', nameFr: 'Sanlam (ex-Saham)', nameAr: 'سنلام للتأمين', type: 'assurance', website: 'https://www.sanlam.ma' },
  { slug: 'axa-assurance-maroc', nameFr: 'AXA Assurance Maroc', nameAr: 'أكسا للتأمين المغرب', type: 'assurance', website: 'https://www.axa.ma' },
  { slug: 'atlanta-assurance', nameFr: 'Atlanta Assurances', nameAr: 'أتلانتا للتأمين', type: 'assurance', website: 'https://www.atlanta.ma' },
  { slug: 'zurich-assurance', nameFr: 'Zurich Assurance Maroc', nameAr: 'زيوريخ للتأمين', type: 'assurance', website: null },
  { slug: 'mamda-mcma', nameFr: 'MAMDA-MCMA', nameAr: 'مامدا', type: 'assurance', website: 'https://www.mamda.ma' },
  { slug: 'allianz-maroc', nameFr: 'Allianz Maroc', nameAr: 'أليانز المغرب', type: 'assurance', website: 'https://www.allianz.ma' },
] as const;

export const SOCIETES_FINANCEMENT = [
  { slug: 'wafasalaf', nameFr: 'Wafasalaf', nameAr: 'وفاسلف', type: 'financement', website: 'https://www.wafasalaf.ma' },
  { slug: 'cetelem', nameFr: 'Cetelem', nameAr: 'سيتيلم', type: 'financement', website: 'https://www.cetelem.ma' },
  { slug: 'sofac', nameFr: 'SOFAC', nameAr: 'صوفاك', type: 'financement', website: 'https://www.sofac.ma' },
  { slug: 'salafin', nameFr: 'Salafin', nameAr: 'سلفين', type: 'financement', website: 'https://www.salafin.com' },
  { slug: 'dar-salaf', nameFr: 'Dar Salaf', nameAr: 'دار السلف', type: 'financement', website: null },
] as const;

// Indicative rates (updated periodically)
export const INDICATIVE_RATES = {
  creditImmobilier: { min: 3.5, max: 5.5, avg: 4.2 },
  creditConsommation: { min: 6.5, max: 12, avg: 7.5 },
  creditAuto: { min: 5.5, max: 8.5, avg: 6.5 },
  mourabaha: { min: 4.5, max: 6.5, avg: 5.2 },
} as const;

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  GRATUIT: { priceMAD: 0, maxLeads: 5, features: ['Profil basique', '5 leads/mois', 'Badge standard'] },
  PRO: { priceMAD: 149, maxLeads: 30, features: ['Profil complet', '30 leads/mois', 'Badge vérifié', 'Analytics', 'Priorité dans les résultats'] },
  PREMIUM: { priceMAD: 499, maxLeads: -1, features: ['Leads illimités', 'Badge premium', 'Analytics avancés', 'Position #1', 'Support dédié', 'Exclusivité leads'] },
} as const;

// Navigation links
export const NAV_LINKS = {
  credit: [
    { slug: 'credit-immobilier', labelKey: 'creditImmobilier' },
    { slug: 'credit-consommation', labelKey: 'creditConsommation' },
    { slug: 'credit-auto', labelKey: 'creditAuto' },
    { slug: 'rachat-credit', labelKey: 'rachatCredit' },
    { slug: 'mourabaha', labelKey: 'mourabaha' },
  ],
  assurance: [
    { slug: 'assurance-auto', labelKey: 'assuranceAuto' },
    { slug: 'assurance-habitation', labelKey: 'assuranceHabitation' },
    { slug: 'mutuelle-sante', labelKey: 'mutuelleSante' },
    { slug: 'assurance-vie', labelKey: 'assuranceVie' },
    { slug: 'assurance-voyage', labelKey: 'assuranceVoyage' },
  ],
  outils: [
    { slug: 'simulateur-credit-immobilier', labelKey: 'mortgageSimulator' },
    { slug: 'comparateur-assurance-auto', labelKey: 'autoInsurance' },
    { slug: 'calculateur-capacite-emprunt', labelKey: 'borrowingCapacity' },
    { slug: 'simulateur-credit-consommation', labelKey: 'consumerCredit' },
    { slug: 'simulateur-mourabaha', labelKey: 'mourabaha' },
    { slug: 'calculateur-frais-notaire', labelKey: 'notaryFees' },
    { slug: 'simulateur-rachat-credit', labelKey: 'debtConsolidation' },
  ],
} as const;
