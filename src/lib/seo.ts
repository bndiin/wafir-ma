// ==========================================
// SEO Utilities for wafir.ma
// JSON-LD structured data generators
// ==========================================

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://wafir.ma${item.url}`,
    })),
  };
}

export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateLocalBusinessSchema(business: {
  name: string;
  description: string;
  address: string;
  city: string;
  phone?: string;
  url?: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: business.name,
    description: business.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.city,
      addressCountry: "MA",
    },
    ...(business.phone && { telephone: business.phone }),
    ...(business.url && { url: business.url }),
    ...(business.image && { image: business.image }),
    ...(business.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: business.rating,
        bestRating: 5,
        reviewCount: business.reviewCount || 0,
      },
    }),
  };
}

export function generateHowToSchema(steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Comment comparer les offres sur Wafir.ma",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `https://wafir.ma${article.url}`,
    ...(article.image && { image: article.image }),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Wafir.ma",
      url: "https://wafir.ma",
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Wafir.ma",
    url: "https://wafir.ma",
    description:
      "Comparateur de crédits et assurances au Maroc. Comparez les offres, simulez vos mensualités et trouvez le meilleur taux.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://wafir.ma/fr/annuaire?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
