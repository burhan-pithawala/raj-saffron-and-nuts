export interface Product {
  id: string
  name: string
  description: string
  origin: string
  unit: string
  priceRange: string
  image: string
  gallery?: string[]
  highlights: string[]
  bestFor: string
}

export interface ServiceHighlight {
  title: string
  description: string
}

export interface FulfilmentDetail {
  title: string
  description: string
}

export const catalogConfig = {
  brandName: 'Raj Saffron & Nuts',
  tagline: 'Fine saffron threads and curated gourmet nuts',
  description:
    'We partner with growers across Kashmir, Iran, Afghanistan, and Turkey to deliver pure saffron, dry fruits, and gifting hampers with full traceability.',
  heroNote: 'Trusted by chefs, mithai artisans, and gifting partners across India.',
  whatsappNumber: '+91 98765 43210',
  whatsappDefaultMessage:
    'Hello Raj Saffron & Nuts team, I would like to know more about your saffron and nuts collection.',
  email: 'care@rajsaffronandnuts.com',
  phoneDisplay: '+91 98765 43210',
  address: 'Shop 12, Gandhi Market, Jaipur, Rajasthan, India',
  businessHours: 'Mon - Sat | 10:00 AM - 7:00 PM IST',
  instagram: 'https://www.instagram.com/rajsaffronandnuts',
}

const saffronJar = 'https://images.unsplash.com/photo-1604908177223-5c2c9f7d2d59?auto=format&fit=crop&w=900&q=80'

export const products: Product[] = [
  {
    id: 'mongra-saffron',
    name: 'Raj Signature Mongra Saffron',
    description:
      'Deep crimson stigmas with honeyed aroma, harvested during the first flush for unmatched potency.',
    origin: 'Pampore, Kashmir (GI-Tagged Farms)',
    unit: '1 g | 2 g glass vials - bulk lots on request',
    priceRange: 'Rs 550 - 950 per g',
    image: saffronJar,
    gallery: [
      saffronJar,
      'https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: [
      'Handpicked whole stigmas only',
      'ISO 3632 Category I purity reports',
      'Ideal for desserts, wellness, and gifting',
    ],
    bestFor: 'Festive gifting, premium desserts, wellness blends',
  },
  {
    id: 'iranian-negin',
    name: 'Iranian Negin Saffron',
    description:
      'Full-bodied flavor with mellow floral notes and bright golden infusion ideal for bulk culinary needs.',
    origin: 'Mashhad, Iran',
    unit: '10 g | 50 g | 250 g vacuum packs',
    priceRange: 'Rs 420 - 620 per g (tiered pricing)',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1485939426402-991e8f1c791c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: [
      'Uniform strand length for easy dosing',
      'Moisture-controlled storage',
      'Bulk pricing for chefs and brands',
    ],
    bestFor: 'Hotels, bakeries, beverage brands',
  },
  {
    id: 'afghan-saffron',
    name: 'Afghan Sargol Saffron',
    description:
      'Bright red strands with high crocin concentration and a clean, honeyed profile.',
    origin: 'Herat, Afghanistan',
    unit: '1 g | 5 g tins',
    priceRange: 'Rs 480 - 720 per g',
    image: 'https://images.unsplash.com/photo-1601004671864-1e7a56fe3c24?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601004671864-1e7a56fe3c24?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1441123694162-e54a981ceba3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: [
      'Higher crocin for vibrant colour',
      'Batch-wise lab testing',
      'Great for premium teas and confectionery',
    ],
    bestFor: 'Artisan tea blenders, confectioners',
  },
  {
    id: 'mamra-almonds',
    name: 'Kashmiri Mamra Almonds (AAA Grade)',
    description:
      'Hand-shelled almonds with high oil content, intense crunch, and natural sweetness.',
    origin: 'Anantnag, Kashmir',
    unit: '250 g | 500 g pouches - 10 kg gunny bags',
    priceRange: 'Rs 1,950 - 2,250 per kg',
    image: 'https://images.unsplash.com/photo-1584270354949-1f5a569c050d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584270354949-1f5a569c050d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1578894381161-cd7800e6d0de?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: [
      'Non-GMO heirloom cultivars',
      'Slow dried to preserve nutrients',
      'Vacuum sealed for long shelf life',
    ],
    bestFor: 'Luxury hampers, nutrition brands, dry fruit retail',
  },
  {
    id: 'pistachios',
    name: 'Turkish Antep Pistachios',
    description:
      'Vibrant green kernels with a buttery bite; available raw or lightly roasted in-house.',
    origin: 'Gaziantep, Turkey',
    unit: '500 g | 1 kg zip locks - 15 kg bulk',
    priceRange: 'Rs 2,350 - 2,750 per kg',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: [
      'EU Grade A certification',
      'Roasted in small batches',
      'Perfect for baklava and gelato',
    ],
    bestFor: 'Gourmet patisseries, gelato makers, dry fruit counters',
  },
  {
    id: 'medjool-dates',
    name: 'Premium Medjool Dates',
    description:
      'Jumbo, caramel-toned dates with soft bite and natural sweetness without additives.',
    origin: 'Jordan Valley, Jordan',
    unit: '500 g | 1 kg boxes - 5 kg cartons',
    priceRange: 'Rs 620 - 820 per kg',
    image: 'https://images.unsplash.com/photo-1598966894316-7be0e5ec5690?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598966894316-7be0e5ec5690?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1615484477219-23b433fa0cc7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1587248720321-5d4d1b39cd5f?auto=format&fit=crop&w=900&q=80',
    ],
    highlights: [
      'Hand graded for size and softness',
      'Chilled storage to retain texture',
      'Zero added sugar or preservatives',
    ],
    bestFor: 'Retail counters, gifting platters, wellness stores',
  },
]

export const serviceHighlights: ServiceHighlight[] = [
  {
    title: 'Direct farm partnerships',
    description:
      'We work with growers in Pampore, Mashhad, Herat, and Gaziantep to secure traceable, single-origin lots.',
  },
  {
    title: 'Laboratory certified purity',
    description:
      'ISO 3632 saffron reports and aflatoxin certificates are available for every shipment on request.',
  },
  {
    title: 'Small-batch processing',
    description:
      'Nuts are slow roasted and vacuum packed within 12 hours to lock flavour and nutritional value.',
  },
  {
    title: 'Corporate & white-label gifting',
    description:
      'Custom hampers, branding sleeves, and festival assortments crafted by our in-house design team.',
  },
]

export const qualityChecklist: string[] = [
  'Only Category I saffron (ISO 3632) lots pass our intake tests.',
  'Moisture-controlled cold storage maintains crunch and aroma for nuts.',
  'Every batch is nitrogen flushed or vacuum sealed before dispatch.',
  'Full documentation: certificate of analysis, FSSAI, and GST invoicing.',
]

export const fulfilmentDetails: FulfilmentDetail[] = [
  {
    title: 'Pan-India dispatch',
    description:
      'Same-day dispatch from our Jaipur hub for confirmed orders received before 2:00 PM.',
  },
  {
    title: 'Bulk & subscription support',
    description:
      'Weekly or monthly replenishment plans for hotels, gourmet stores, and wellness brands.',
  },
  {
    title: 'Flexible payment options',
    description:
      'Secure UPI, bank transfers, and GST billing for corporate procurement.',
  },
]
