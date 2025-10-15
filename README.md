# Raj Saffron & Nuts Catalog

A responsive ecommerce landing page for Raj Saffron & Nuts built with Vite, React, and TypeScript. The site combines a rich catalog experience with a WhatsApp cart flow so buyers can assemble orders and send a single message to the business.

## Features

- Hero storyline with quick access to the catalog and WhatsApp support
- Configurable product catalog with quantity steppers and add-to-cart controls
- Cart drawer that aggregates selections, optional buyer notes, and generates a WhatsApp order message
- Assurance section covering sourcing, lab certification, and fulfilment capabilities
- Responsive layout optimised for mobile and desktop buyers
- Production-ready static build for easy hosting on any CDN

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) while developing. Hot Module Replacement is enabled by default.

Create an optimised production bundle with:

```bash
npm run build
```

The final static assets are written to the `dist` folder.

## Customising Content

All catalog copy, pricing ranges, and contact details reside in `src/data/catalog.ts`.

- Update `catalogConfig` to adjust the hero copy, WhatsApp number, email, business hours, or social links.
- Edit the `products` array to add, remove, or re-order catalog cards. Each product exposes `unit`, `priceRange`, and bullet highlights used across the UI and WhatsApp message.
- Amend `serviceHighlights`, `qualityChecklist`, or `fulfilmentDetails` to reflect your sourcing and operations.

Product photography references Unsplash placeholders. Replace these URLs with your own hosted imagery for launch.

## WhatsApp Cart Flow

The cart collects quantities for each product and builds a structured WhatsApp message such as:

```
Hello Raj Saffron & Nuts team,

I would like to place an order:
1. Raj Signature Mongra Saffron x 5 (1 g | 2 g glass vials - bulk lots on request) - Rs 550 - 950 per g
2. Turkish Antep Pistachios x 3 (500 g | 1 kg zip locks - 15 kg bulk) - Rs 2,350 - 2,750 per kg

Notes: Need corporate hamper packaging.

Please share availability, best pricing, and payment details.
Thank you!
```

Buyers can clear the cart, tweak quantities, or add notes before sending the order via WhatsApp.

## Styling

Global styles live in `src/index.css` and the ecommerce layout is in `src/App.css`. Fonts are sourced from Google Fonts (Inter and Playfair Display). Adjust the theme tokens or layout rules to align with your brand direction.

## Deployment

Run `npm run build` and deploy the contents of `dist` to your preferred static host (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, etc.).

Happy selling!
