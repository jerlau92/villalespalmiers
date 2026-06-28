# Villa Les Palmiers

A premium seasonal rental website for Villa Les Palmiers, a contemporary luxury villa in Grimaud, Golfe de Saint-Tropez, France.

## About

This site positions a private villa as a high-end property experience — far removed from a standard holiday rental listing. The design and editorial direction draws inspiration from luxury hospitality brands (Aman, Four Seasons, Cheval Blanc) and premium real-estate agencies.

## Key Technologies

- **Framework**: TanStack Start (React, SSR)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Typography**: Cormorant Garamond (serif, headings) + Jost (sans-serif, UI) via Google Fonts
- **Forms**: Netlify Forms (AJAX submission with static HTML skeleton for build-time detection)
- **Maps**: OpenStreetMap embed (no API key required)
- **Deployment**: Netlify

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-ivory` | `#F8F5F0` | Page background |
| `--color-travertin` | `#E8DDD0` | Alternate section backgrounds |
| `--color-bronze` | `#C4A882` | Accent, labels, dividers |
| `--color-olive` | `#7A8B6A` | WhatsApp icon, botanical accents |
| `--color-taupe` | `#9B8B7A` | Body text |
| `--color-charbon` | `#2A2520` | Dark sections, headings |

## Running Locally

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000`.

> **Note**: Netlify Forms submissions do not work in local dev. Deploy to Netlify to test form submissions.
