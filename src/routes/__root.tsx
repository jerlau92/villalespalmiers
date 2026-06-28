import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Villa Les Palmiers — Grimaud · Golfe de Saint-Tropez' },
      {
        name: 'description',
        content:
          "Villa Les Palmiers — Une maison contemporaine au cœur d'un jardin méditerranéen. Grimaud, Golfe de Saint-Tropez. Location saisonnière haut de gamme.",
      },
      { property: 'og:title', content: 'Villa Les Palmiers — Grimaud · Golfe de Saint-Tropez' },
      { property: 'og:description', content: "L'élégance provençale entre vignes et Méditerranée." },
      { property: 'og:type', content: 'website' },
      { name: 'theme-color', content: '#2A2520' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous' as const,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
