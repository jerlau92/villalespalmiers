import { createFileRoute } from '@tanstack/react-router'
import {
  Archive,
  Bath,
  BedDouble,
  Bluetooth,
  Droplets,
  Shirt,
  ShowerHead,
  Sparkles,
  Thermometer,
  TowelRack,
  Wind,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'

// ── Image constants ──────────────────────────────────────────────────────────

const U = 'https://images.unsplash.com/photo-'
const Q = (w: number) => `?auto=format&fit=crop&w=${w}&q=82`

const imgs = {
  hero:     '/images/villa-les-palmiers-accueil.png',
  villa:    '/images/villa-les-palmiers-accueil.png',
  salon:    U + '1600566752355-35792bedcfea' + Q(1200),
  cuisine:  U + '1556909114-f6e7ad7d3136'   + Q(900),
  salle:    U + '1617806118233-18e1de247200' + Q(900),
  detail:   U + '1586023492125-27b2c045efd7' + Q(700),
  chambre1: '/images/chambre-villa-les-palmiers-1.jpeg',
  chambre2: '/images/chambre-villa-les-palmiers-2.jpeg',
  chambre3: '/images/chambre-villa-les-palmiers-3.jpeg',
  piscine:  U + '1566073771259-a9a8fe8671a7' + Q(1920),
  jardin:   U + '1490750967868-88df5691cc33' + Q(800),
  terrasse: U + '1533044307260-24af8186fcb0' + Q(800),
  nuit:     U + '1571003123894-1f0594d2b5d9' + Q(1920),
  rose:     U + '1558618666-fcd25c85cd64'   + Q(800),
  petitdej: U + '1533089860892-a7c6f0a88666' + Q(800),
  dejeuner: U + '1414235077428-338989a2e8c0' + Q(800),
  tropez:   U + '1557804497-4b671f27e3a0'   + Q(700),
  plage:    U + '1507525428034-b723cf961d3e' + Q(700),
  provence: U + '1523531294919-4bcd7c65d049' + Q(700),
  grimaud: 'https://commons.wikimedia.org/wiki/Special:FilePath/Grimaud-village-06.jpg?width=900',
  portGrimaud: 'https://commons.wikimedia.org/wiki/Special:FilePath/La%20cit%C3%A9%20lacustre%20de%20Port%20Grimaud%2C%20vue%20du%20ciel.jpg?width=900',
  gassin: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rue%20de%20gassin.jpg?width=900',
  sainteMaxime: 'https://commons.wikimedia.org/wiki/Special:FilePath/Digue%20et%20plage%20de%20Sainte-Maxime.jpg?width=900',
  saintTropez: 'https://commons.wikimedia.org/wiki/Special:FilePath/Saint-Tropez%20-%20Port%20de%20plaisance%2001.jpg?width=900',
  ramatuelle: 'https://commons.wikimedia.org/wiki/Special:FilePath/83350%20Ramatuelle%2C%20France%20-%20panoramio.jpg?width=900',
  croixValmer: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20view%20of%20Gigaro%20Beach%20in%20La%20Croix-Valmer%2C%20France%20%2852723801211%29.jpg?width=900',
  rayol: 'https://commons.wikimedia.org/wiki/Special:FilePath/Domaine%20du%20Rayol%202.JPG?width=900',
}

// ── Hooks ────────────────────────────────────────────────────────────────────

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}

function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.07, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale')
      .forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ── Utilities ────────────────────────────────────────────────────────────────

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

// ── Shared primitives ────────────────────────────────────────────────────────

function Label({ num, text }: { num: string; text: string }) {
  return (
    <p className="font-body text-[11px] tracking-[0.28em] uppercase text-bronze mb-5 flex items-center gap-3">
      <span className="opacity-60">{num}</span>
      <span className="w-6 h-px bg-bronze opacity-60 inline-block" />
      {text}
    </p>
  )
}

function Title({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className={`font-display font-light leading-[0.95] ${light ? 'text-charbon' : 'text-charbon'}`}
      style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}
    >
      {children}
    </h2>
  )
}

function Divider() {
  return <div className="w-10 h-px bg-bronze my-7" />
}

// ── Navigation ───────────────────────────────────────────────────────────────

const navLinks = [
  { href: '#bienvenue', label: 'Bienvenue' },
  { href: '#villa', label: 'La Villa' },
  { href: '#interieurs', label: 'Les Intérieurs' },
  { href: '#chambres', label: 'Les Chambres' },
  { href: '#jardin', label: 'Jardin & Piscine' },
  { href: '#art-de-vivre', label: 'Art de Vivre' },
  { href: '#contact', label: 'Contact' },
]

function Navigation({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)
  const solid = scrolled || open

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid ? 'nav-solid' : 'nav-transparent'}`}
    >
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16 h-[72px] flex items-center justify-between">
        <a
          href="#"
          className={`font-display tracking-wide text-[18px] transition-colors duration-300 ${solid ? 'text-charbon' : 'text-white'}`}
        >
          Villa Les Palmiers
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`font-body text-[10.5px] tracking-[0.16em] uppercase transition-colors duration-300 ${solid ? 'text-taupe hover:text-charbon' : 'text-white/75 hover:text-white'}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="https://airbnb.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden lg:inline-block font-body text-[10px] tracking-[0.2em] uppercase px-6 py-3 border transition-all duration-300 ${
            solid
              ? 'border-charbon text-charbon hover:bg-bronze hover:text-white hover:border-bronze'
              : 'border-white/70 text-white hover:bg-white hover:text-charbon'
          }`}
        >
          Réserver
        </a>

        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-taupe' : 'bg-white'} ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-taupe' : 'bg-white'} ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-taupe' : 'bg-white'} ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      <div
        className={`lg:hidden bg-ivory overflow-hidden transition-all duration-400 ${open ? 'max-h-[500px] pb-8' : 'max-h-0'}`}
      >
        <div className="px-7 pt-2">
          {navLinks.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="block font-body text-[11px] tracking-[0.18em] uppercase text-charbon py-4 border-b border-travertin"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://airbnb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block text-center font-body text-[10px] tracking-[0.2em] uppercase py-4 border border-charbon text-charbon"
          >
            Réserver
          </a>
        </div>
      </div>
    </nav>
  )
}

// ── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative h-screen min-h-[650px] flex flex-col overflow-hidden">
      <div
        className="hero-img absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgs.hero})`, backgroundColor: '#9B8B7A' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-taupe/55 via-taupe/20 to-taupe/65" />

      <div className="relative z-10 flex flex-col h-full max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="flex-1 flex flex-col justify-end pb-20 lg:pb-28">
          <p className="ha-0 font-body text-[10.5px] tracking-[0.32em] uppercase text-white/65 mb-5">
            Grimaud · Golfe de Saint-Tropez · France
          </p>

          <h1
            className="ha-1 font-display font-light text-white leading-[0.92]"
            style={{ fontSize: 'clamp(60px, 9.5vw, 124px)' }}
          >
            Villa<br />Les Palmiers
          </h1>

          <div className="ha-2 w-10 h-px bg-bronze mt-8 mb-6" />

          <p
            className="ha-3 font-display font-light italic text-white/85"
            style={{ fontSize: 'clamp(17px, 2.2vw, 26px)' }}
          >
            L'élégance provençale entre vignes et Méditerranée
          </p>

          <p className="ha-3 font-body font-light text-white/70 mt-3 text-[15.5px] leading-relaxed max-w-sm">
            Une maison contemporaine au cœur d'un jardin méditerranéen.
          </p>

          <div className="ha-4 flex flex-wrap gap-3 mt-9">
            <a
              href="#villa"
              className="font-body text-[10px] tracking-[0.22em] uppercase px-7 py-4 border border-white/60 text-white hover:bg-white hover:text-charbon transition-all duration-300"
            >
              Découvrir
            </a>
            <a
              href="https://airbnb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[10px] tracking-[0.22em] uppercase px-7 py-4 bg-bronze text-white border border-bronze hover:bg-bronze-light transition-all duration-300"
            >
              Réserver
            </a>
          </div>
        </div>

        <div className="ha-4 pb-8 flex flex-col items-start gap-2">
          <span className="font-body text-[9px] tracking-[0.35em] uppercase text-white/40">Défiler</span>
          <div className="scroll-line w-px h-11 bg-white/35 origin-top" />
        </div>
      </div>
    </section>
  )
}

// ── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const items = [
    '6 Voyageurs', '3 Chambres', '3 Salles de bains',
    'Piscine chauffée', 'Jardin méditerranéen', 'Domaine privé',
  ]
  return (
    <div className="bg-travertin/70 py-5 border-y border-bronze/20">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="flex no-scrollbar overflow-x-auto lg:justify-between">
          {items.map((item, i) => (
            <div key={item} className="flex items-center flex-shrink-0">
              <span className="font-body text-[11px] tracking-[0.22em] uppercase text-taupe whitespace-nowrap px-5 lg:px-0">
                {item}
              </span>
              {i < items.length - 1 && (
                <span className="hidden lg:block text-bronze/35 mx-6 text-xs">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Bienvenue ────────────────────────────────────────────────────────────────

function WelcomeSection() {
  return (
    <section id="bienvenue" className="py-28 lg:py-36 bg-ivory">
      <div className="max-w-[1180px] mx-auto px-7 lg:px-16">
        <div className="reveal grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <Label num="00" text="Bienvenue" />
            <h2
              className="font-display font-light text-charbon leading-[0.98]"
              style={{ fontSize: 'clamp(42px, 5vw, 68px)' }}
            >
              Chers<br /><em>voyageurs</em>
            </h2>
            <Divider />
            <p className="font-body text-[9.5px] tracking-[0.24em] uppercase text-bronze">
              Gérard & Jérôme Laurent · Vos hôtes
            </p>
          </div>

          <div className="bg-travertin/55 px-7 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14 border-l border-bronze/45">
            <div className="space-y-6 font-body font-light text-taupe leading-[2] text-[16px] lg:text-[17px]">
              <p>
                Nous sommes heureux de vous accueillir à la Villa Les Palmiers et vous remercions d'avoir choisi notre maison pour votre séjour.
              </p>
              <p>
                Conçue comme un lieu de détente et de convivialité, cette villa familiale a été aménagée avec soin afin de vous offrir confort, calme et intimité au cœur du Golfe de Saint-Tropez.
              </p>
              <p>
                Dans ce livret, vous trouverez toutes les informations utiles sur la maison et ses équipements, ainsi que nos meilleures recommandations pour découvrir Grimaud, Port Grimaud, Saint-Tropez et les environs.
              </p>
              <p>
                Nous espérons que vous passerez un agréable séjour, riche en découvertes et en beaux souvenirs. Si vous avez la moindre question ou un besoin particulier, n'hésitez pas à nous contacter : nous serons ravis de vous aider.
              </p>
              <p>
                Profitez pleinement de votre séjour et merci d'avoir choisi la Villa Les Palmiers pour vos vacances.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-bronze/30">
              <p className="font-display font-light italic text-charbon text-[30px] lg:text-[38px] leading-tight">
                Bienvenue chez vous.
              </p>
              <p className="mt-5 font-body text-[10px] tracking-[0.22em] uppercase text-bronze">
                Gérard & Jérôme Laurent
              </p>
              <p className="mt-1 font-body font-light text-taupe text-[13px]">
                Vos hôtes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── La Villa ─────────────────────────────────────────────────────────────────

function VillaSection() {
  return (
    <section id="villa" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center">
          <div className="reveal-left order-2 lg:order-1">
            <div className="img-zoom aspect-[3/4]">
              <img
                src={imgs.villa}
                alt="Villa Les Palmiers — Vue extérieure"
                className="w-full h-full object-cover"
                style={{ backgroundColor: '#D4BC9E' }}
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-7 h-px bg-bronze" />
              <span className="font-body text-[9.5px] tracking-[0.22em] uppercase text-taupe">
                Construite en 2019 · Plain-pied
              </span>
            </div>
          </div>

          <div className="reveal order-1 lg:order-2 lg:pl-4">
            <Label num="01" text="La Villa" />
            <Title>
              L'esprit de<br /><em>Villa Les Palmiers</em>
            </Title>
            <Divider />

            <p className="font-display font-light text-charbon leading-tight text-[26px] lg:text-[32px] mb-8">
              Villa Les Palmiers est avant tout une maison de famille.
            </p>
            <div className="space-y-6 font-body font-light text-taupe leading-[2.05] text-[16.5px] lg:text-[17px] mb-10">
              <p>
                Construite en 2019, elle a été imaginée comme un lieu où l'architecture contemporaine s'efface au profit de la lumière, du paysage et de l'art de vivre méditerranéen. Chaque espace a été pensé pour créer une continuité naturelle entre l'intérieur, le jardin et la piscine, offrant une sensation permanente d'ouverture et de sérénité.
              </p>
              <p>
                Nichée à Grimaud, à quelques minutes de Saint-Tropez, la propriété bénéficie d'un environnement privilégié, entre les vignobles du Golfe et la Méditerranée.
              </p>
              <p>
                Son jardin puise sa richesse dans une ressource naturelle rare : la nappe phréatique alimentée par le cours d'eau de l'Avelan, qui longe discrètement la propriété. Cette présence de l'eau permet au paysage de conserver toute sa fraîcheur et son caractère luxuriant au fil des saisons.
              </p>
              <p>
                Plus qu'un lieu de séjour, Villa Les Palmiers est une invitation à ralentir, à partager des moments précieux et à profiter pleinement de la douceur de vivre provençale.
              </p>
            </div>

            <p className="font-display font-light italic text-charbon text-[28px] lg:text-[36px] leading-tight mb-10">
              L'élégance provençale entre vignes et Méditerranée.
            </p>

            <a
              href="#contact"
              className="inline-block font-body text-[10px] tracking-[0.22em] uppercase px-8 py-4 border border-charbon text-charbon hover:bg-bronze hover:text-white hover:border-bronze transition-all duration-300"
            >
              Demander une disponibilité
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Les Intérieurs ───────────────────────────────────────────────────────────

function InteriorsSection() {
  return (
    <section id="interieurs" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-20 gap-6">
          <div>
            <Label num="02" text="Les Intérieurs" />
            <Title>
              Design contemporain,<br /><em>lumière naturelle</em>
            </Title>
          </div>
          <p className="font-body font-light text-taupe text-[15.5px] leading-relaxed lg:max-w-[280px]">
            Cuisine ouverte, salon, salle à manger — chaque espace est pensé pour la lumière et le partage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <div className="reveal-scale lg:col-span-2 img-zoom aspect-[16/10]">
            <img src={imgs.salon} alt="Salon" className="w-full h-full object-cover" style={{ backgroundColor: '#C4A882' }} loading="lazy" />
          </div>
          <div className="reveal-scale reveal-delay-1 img-zoom aspect-[3/4]">
            <img src={imgs.cuisine} alt="Cuisine" className="w-full h-full object-cover" style={{ backgroundColor: '#D4BC9E' }} loading="lazy" />
          </div>
          <div className="reveal-scale reveal-delay-2 img-zoom aspect-[4/3]">
            <img src={imgs.salle} alt="Salle à manger" className="w-full h-full object-cover" style={{ backgroundColor: '#9B8B7A' }} loading="lazy" />
          </div>
          <div className="reveal-scale reveal-delay-3 img-zoom aspect-[4/3]">
            <img src={imgs.detail} alt="Détail intérieur" className="w-full h-full object-cover" style={{ backgroundColor: '#B8A894' }} loading="lazy" />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="w-7 h-px bg-bronze" />
          <p className="font-body text-[9.5px] tracking-[0.22em] uppercase text-taupe">
            Salon · Cuisine ouverte · Salle à manger · Baies vitrées
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Les Chambres ─────────────────────────────────────────────────────────────

function BedroomsSection() {
  const essentials: { icon: LucideIcon; label: string }[] = [
    { icon: BedDouble, label: 'Lit Queen Size' },
    { icon: Bath, label: 'Salle de bains privative' },
    { icon: ShowerHead, label: "Douche à l'italienne" },
    { icon: TowelRack, label: 'Sèche-serviettes chauffant' },
  ]

  const comforts: { icon: LucideIcon; label: string }[] = [
    { icon: Sparkles, label: 'Sèche-cheveux Dyson' },
    { icon: Shirt, label: 'Peignoirs à disposition' },
    { icon: Bluetooth, label: 'Système audio Bluetooth intégré' },
    { icon: Wind, label: 'Climatisation' },
    { icon: Archive, label: 'Rangements et penderie' },
  ]

  const included: { icon: LucideIcon; label: string }[] = [
    { icon: Thermometer, label: 'Linge de lit en coton haut de gamme fourni' },
    { icon: Droplets, label: 'Serviettes de bain et de piscine fournies' },
  ]

  const suites = [
    {
      num: '01',
      img: imgs.chambre1,
      alt: 'Chambre avec lit Queen Size à la Villa Les Palmiers',
    },
    {
      num: '02',
      img: imgs.chambre2,
      alt: 'Chambre lumineuse avec salle de bains privative à la Villa Les Palmiers',
    },
    {
      num: '03',
      img: imgs.chambre3,
      alt: 'Chambre élégante avec rangements à la Villa Les Palmiers',
    },
  ]

  const equipment = [...essentials, ...comforts]

  return (
    <section id="chambres" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20 grid lg:grid-cols-[0.9fr_1.1fr] gap-9 lg:gap-20 items-end">
          <div>
            <Label num="03" text="Les Chambres" />
            <Title>
              Trois espaces nuit,<br /><em>pensés comme des cocons</em>
            </Title>
          </div>
          <p className="font-body font-light text-taupe leading-[2] text-[16px] lg:text-[17px] max-w-xl">
            Chaque chambre offre le même niveau de confort, avec salle de bains privative,
            matières choisies et équipements discrets pour un séjour simple, élégant et reposant.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-7">
          {suites.map((s, i) => (
            <article
              key={s.num}
              className={`reveal reveal-delay-${i + 1} group bg-white/48 border border-bronze/20 shadow-[0_22px_70px_rgba(42,37,32,0.07)]`}
            >
              <div className="img-zoom aspect-[4/5]">
                <img
                  src={s.img}
                  alt={s.alt}
                  className="w-full h-full object-cover"
                  style={{ backgroundColor: '#E0D5C8' }}
                  loading="lazy"
                />
              </div>
              <div className="p-6 lg:p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-body text-[10px] tracking-[0.26em] uppercase text-bronze">
                    Espace nuit
                  </span>
                  <span className="font-display text-[28px] leading-none text-charbon/35">{s.num}</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {equipment.map(({ icon: Icon, label }) => (
                    <div
                      key={`${s.num}-${label}`}
                      className="min-h-[92px] border border-travertin/85 bg-ivory/70 px-3.5 py-3.5 flex flex-col justify-between"
                    >
                      <Icon className="w-4.5 h-4.5 text-bronze" strokeWidth={1.55} aria-hidden="true" />
                      <span className="font-body font-light text-[13.5px] leading-snug text-charbon">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal reveal-delay-4 mt-8 lg:mt-10 border border-bronze/25 bg-travertin/38 px-6 py-6 lg:px-9 lg:py-7">
          <div className="grid md:grid-cols-[0.45fr_1fr] gap-5 md:gap-8 items-center">
            <p className="font-body text-[10px] tracking-[0.26em] uppercase text-bronze">
              Inclus dans le séjour
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {included.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="w-11 h-11 border border-bronze/35 bg-ivory/70 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-bronze" strokeWidth={1.55} aria-hidden="true" />
                  </span>
                  <span className="font-body font-light text-[15.5px] leading-relaxed text-charbon">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Jardin & Piscine ─────────────────────────────────────────────────────────

function GardenSection() {
  return (
    <section id="jardin" className="bg-ivory">
      <div className="relative h-[72vh] min-h-[480px] flex items-end overflow-hidden">
        <div
          className="hero-img absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgs.piscine})`, backgroundColor: '#9B8B7A' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-taupe/10 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-7 lg:px-16 pb-14 lg:pb-20 w-full">
          <div className="reveal">
            <Label num="04" text="Jardin & Piscine" />
            <Title light>
              Le cœur de<br /><em>la propriété</em>
            </Title>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-7 lg:px-16 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center mb-16">
          <div className="reveal">
            <p className="font-body font-light text-taupe leading-[2.1] text-[16.5px] lg:text-[17px] mb-9">
              Le jardin est rendu particulièrement luxuriant grâce à la nappe phréatique alimentée par l'Avelan qui longe la propriété. Une végétation méditerranéenne exubérante, soigneusement entretenue, entoure la piscine à débordement.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
              {['Washingtonia à 3 troncs', 'Oliviers', 'Grenadier sculptural', 'Cycas', 'Lauriers roses', 'Pelouse & Travertin'].map(p => (
                <div key={p} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-olive flex-shrink-0" />
                  <span className="font-body text-[12px] tracking-[0.08em] text-taupe">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-right">
            <div className="grid grid-cols-2 gap-3">
              <div className="img-zoom aspect-square">
                <img src={imgs.jardin} alt="Jardin méditerranéen" className="w-full h-full object-cover" style={{ backgroundColor: '#9B8B7A' }} loading="lazy" />
              </div>
              <div className="img-zoom aspect-square mt-10">
                <img src={imgs.terrasse} alt="Terrasse travertin" className="w-full h-full object-cover" style={{ backgroundColor: '#9B8B7A' }} loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        <div className="reveal border-t border-travertin pt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Piscine à débordement', 'Terrain de pétanque', 'Terrasses en travertin', 'Transats & loungers'].map(item => (
            <div key={item}>
              <div className="w-5 h-px bg-bronze mb-3" />
              <p className="font-body text-[11px] tracking-[0.18em] uppercase text-taupe">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-20">
        <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
          <div className="reveal-scale img-zoom aspect-[21/9] min-h-[240px]">
            <img src={imgs.nuit} alt="Piscine de nuit" className="w-full h-full object-cover" style={{ backgroundColor: '#9B8B7A' }} loading="lazy" />
          </div>
          <p className="font-body text-[10.5px] tracking-[0.22em] uppercase text-taupe mt-4">
            Piscine chauffée · Nuit d'été
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Art de Vivre ─────────────────────────────────────────────────────────────

function ArtDeVivreSection() {
  return (
    <section id="art-de-vivre" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20">
          <Label num="05" text="Art de Vivre" />
          <Title>
            Les instants<br /><em>provençaux</em>
          </Title>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="reveal-left lg:row-span-2 img-zoom aspect-[3/5] md:aspect-auto">
            <img src={imgs.rose} alt="Rosé de Provence" className="w-full h-full object-cover" style={{ backgroundColor: '#D4BC9E' }} loading="lazy" />
          </div>
          <div className="reveal reveal-delay-1 img-zoom aspect-[4/3]">
            <img src={imgs.petitdej} alt="Petit-déjeuner au soleil" className="w-full h-full object-cover" style={{ backgroundColor: '#C4A882' }} loading="lazy" />
          </div>
          <div className="reveal reveal-delay-2 img-zoom aspect-[4/3]">
            <img src={imgs.dejeuner} alt="Déjeuner en terrasse" className="w-full h-full object-cover" style={{ backgroundColor: '#9B8B7A' }} loading="lazy" />
          </div>
          <div className="reveal reveal-delay-3 md:col-span-1 lg:col-span-2 bg-travertin p-10 lg:p-14 flex flex-col justify-center">
            <blockquote
              className="font-display font-light italic text-charbon mb-6 leading-[1.35]"
              style={{ fontSize: 'clamp(20px, 2.8vw, 32px)' }}
            >
              "Une terrasse au soleil couchant,<br />
              un verre de rosé, le chant des cigales..."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-7 h-px bg-bronze" />
              <span className="font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze">L'art de vivre provençal</span>
            </div>
          </div>
        </div>

        <div className="reveal mt-10 flex flex-wrap gap-2.5">
          {[
            'Petit-déjeuner au soleil',
            'Apéritif au bord de la piscine',
            'Dîner aux chandelles',
            'Rosé de Provence',
            'Cigales & lauriers',
            'Nuits étoilées',
          ].map(tag => (
            <span
              key={tag}
              className="font-body text-[9.5px] tracking-[0.15em] uppercase text-taupe border border-travertin px-4 py-2.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Explorer ─────────────────────────────────────────────────────────────────

function ExploreSection() {
  const destinations = [
    {
      name: 'Grimaud',
      dist: '3 km',
      img: imgs.grimaud,
      alt: 'Ruelle pavée du village médiéval de Grimaud',
      desc: "L'âme provençale du Golfe de Saint-Tropez. Perché sur sa colline, Grimaud est dominé par les ruines romantiques de son château du XIe siècle, accessible par un sentier offrant un panorama exceptionnel sur la baie.",
      note: "Ruelles pavées, maisons en pierre ocre, placettes ombragées, galeries d'art et marché du jeudi matin.",
    },
    {
      name: 'Port Grimaud',
      dist: '5 km',
      img: imgs.portGrimaud,
      alt: 'Vue aérienne des canaux de Port Grimaud',
      desc: "La Venise Provençale. Créée dans les années 1960 par l'architecte François Spoerry, cette cité lacustre unique en Europe est traversée par plus de sept kilomètres de canaux.",
      note: 'Maisons colorées aux volets pastel et anneaux privés pour accoster directement devant sa porte.',
    },
    {
      name: 'Gassin',
      dist: '10 km',
      img: imgs.gassin,
      alt: 'Ruelle fleurie dans le village perché de Gassin',
      desc: "Classé parmi les Plus Beaux Villages de France, Gassin couronne un piton rocheux offrant l'une des vues panoramiques les plus spectaculaires sur le Golfe de Saint-Tropez et le massif des Maures.",
      note: 'Centre médiéval, maisons serrées contre le vent et les pirates, place dei Barri idéale au coucher du soleil.',
    },
    {
      name: 'Sainte-Maxime',
      dist: '12 km',
      img: imgs.sainteMaxime,
      alt: 'Plage et front de mer de Sainte-Maxime',
      desc: 'Station balnéaire animée et élégante, Sainte-Maxime déploie un front de mer de plus de deux kilomètres, ponctué de plages de sable fin.',
      note: 'Une adresse facile pour profiter de la mer, des terrasses et de la douceur du Golfe.',
    },
    {
      name: 'Saint-Tropez',
      dist: '12 km',
      img: imgs.saintTropez,
      alt: 'Port de plaisance de Saint-Tropez',
      desc: "Port et village mythique de la Côte d'Azur, mêlant authenticité provençale et glamour international, entre le quai Sénéquier face aux yachts et les ruelles du quartier de la Ponche.",
      note: 'Place des Lices, marché provençal, boutiques de créateurs, galeries, musées et soirées tropéziennes.',
    },
    {
      name: 'Ramatuelle',
      dist: '17 km',
      img: imgs.ramatuelle,
      alt: 'Village perché de Ramatuelle et paysage provençal',
      desc: "Village perché aux ruelles provençales typiques, dominant les vignobles et la presqu'île de Saint-Tropez. Son centre historique, fleuri et préservé, s'anime autour de son marché.",
      note: 'Porte d’entrée de Pampelonne, de ses clubs de plage chics et de domaines viticoles réputés.',
    },
    {
      name: 'La Croix-Valmer',
      dist: '17 km',
      img: imgs.croixValmer,
      alt: 'Plage de Gigaro à La Croix-Valmer vue du ciel',
      desc: 'Station familiale et préservée, nichée entre vignobles et pinèdes au sud du Golfe de Saint-Tropez, dans une atmosphère authentique et reposante.',
      note: 'Marché du dimanche matin place des Palmiers et plages de Gigaro aux eaux cristallines.',
    },
    {
      name: 'Rayol-Canadel-sur-Mer',
      dist: '24 km',
      img: imgs.rayol,
      alt: 'Jardin méditerranéen du Domaine du Rayol',
      desc: "Niché entre mer et montagne sur la Corniche des Maures, le Rayol-Canadel est l'un des villages les plus secrets et préservés du littoral varois.",
      note: 'Domaine du Rayol, criques discrètes, plages de galets, pins parasols et eau cristalline propice à la plongée.',
    },
  ]

  return (
    <section id="explorer" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-20 gap-6">
          <div>
            <Label num="06" text="Explorer" />
            <Title>
              Aux portes du<br /><em>Golfe de Saint-Tropez</em>
            </Title>
          </div>
          <p className="font-body font-light text-taupe text-[15.5px] leading-relaxed lg:max-w-[260px]">
            La villa est idéalement placée entre mer, vignobles et villages perchés.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-7 lg:gap-9">
          {destinations.map((d, i) => (
            <article
              key={d.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} bg-ivory/75 border border-bronze/15`}
            >
              <div className="img-zoom aspect-[16/10]">
                <img
                  src={d.img}
                  alt={d.alt}
                  className="w-full h-full object-cover"
                  style={{ backgroundColor: '#9B8B7A' }}
                  loading="lazy"
                />
              </div>
              <div className="p-6 lg:p-8">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <h3 className="font-display font-light text-charbon text-[28px] lg:text-[34px] leading-none">{d.name}</h3>
                  <span className="font-body text-[10px] tracking-[0.18em] uppercase text-bronze mt-1 flex-shrink-0">
                    {d.dist}
                  </span>
                </div>
                <p className="font-body font-light text-taupe text-[15.5px] leading-relaxed">
                  {d.desc}
                </p>
                <div className="mt-6 pt-5 border-t border-bronze/20">
                  <p className="font-body text-[10px] tracking-[0.18em] uppercase text-bronze mb-2">
                    À ne pas manquer
                  </p>
                  <p className="font-body font-light text-charbon/75 text-[14px] leading-relaxed">
                    {d.note}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Votre Séjour ─────────────────────────────────────────────────────────────

function StaySection() {
  const categories = [
    {
      title: 'Arrivée & Départ',
      items: ['Check-in 16h — 20h', 'Check-out avant 11h', 'Accueil personnalisé', 'Remise des clés en main'],
    },
    {
      title: 'Confort',
      items: ['Wi-Fi haut débit', 'Climatisation', 'Piscine chauffée', 'Parking privatif'],
    },
    {
      title: 'Sécurité',
      items: ['Alarme sécurisée', 'Domaine privé', 'Éclairage extérieur', 'Interphone'],
    },
    {
      title: 'Règlement',
      items: ['Non-fumeur', 'Animaux non acceptés', 'Événements sur demande', 'Calme après 22h'],
    },
  ]

  return (
    <section id="sejour" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20">
          <Label num="07" text="Votre Séjour" />
          <Title>
            Informations<br /><em>pratiques</em>
          </Title>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((cat, i) => (
            <div key={cat.title} className={`reveal reveal-delay-${i + 1}`}>
              <p className="font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-5">{cat.title}</p>
              <ul className="space-y-3.5">
                {cat.items.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-4 h-px bg-bronze mt-[9px] flex-shrink-0" />
                    <span className="font-body font-light text-taupe text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Services Premium ─────────────────────────────────────────────────────────

function ServicesSection() {
  const services = [
    { name: 'Piscine chauffée', desc: 'Eau à température idéale tout au long de la saison' },
    { name: 'Scooter disponible', desc: 'Pour explorer librement le Golfe de Saint-Tropez' },
    { name: 'Recharge véhicule électrique', desc: 'Borne de recharge sur site' },
    { name: 'Service de ménage', desc: 'Prestation disponible en option selon la durée du séjour' },
    { name: 'Accueil personnalisé', desc: 'Remise des clés et présentation complète de la villa' },
  ]

  return (
    <section id="services" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20">
          <Label num="08" text="Services" />
          <Title>
            Services<br /><em>premium</em>
          </Title>
        </div>

        <div>
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} flex flex-col md:flex-row md:items-center gap-4 md:gap-16 py-8 border-b border-bronze/25`}
            >
              <span className="hidden md:block font-body text-[11px] tracking-[0.2em] text-bronze flex-shrink-0 w-8">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display font-light text-charbon text-[24px] lg:text-[28px] mb-1">{s.name}</h3>
                <p className="font-body font-light text-taupe text-[15px]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Contact ───────────────────────────────────────────────────────────────────

function ContactSection() {
  const [fields, setFields] = useState({
    name: '', email: '', phone: '', arrival: '', departure: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...fields }),
      })
    } catch { /* fails gracefully in dev */ }
    setSending(false)
    setSubmitted(true)
  }

  const inputClass =
    'w-full border-b border-travertin bg-transparent py-3.5 font-body font-light text-charbon text-[15.5px] focus:border-bronze outline-none transition-colors duration-300 placeholder:text-taupe/40'

  return (
    <section id="contact" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
          <div className="reveal">
            <Label num="09" text="Contact" />
            <Title>
              Réservez<br /><em>votre séjour</em>
            </Title>
            <Divider />

            <p className="font-body font-light text-taupe leading-[2.1] text-[16.5px] mb-10">
              Domaine des Lauriers<br />
              Grimaud · Var · France
            </p>

            <div className="space-y-4 mb-10">
              <a href="tel:+33600000000" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-travertin flex items-center justify-center group-hover:border-bronze transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-bronze">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.5 5.5l.97-.97a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="font-body font-light text-taupe text-[15px]">+33 (0)6 00 00 00 00</span>
              </a>

              <a href="https://wa.me/33600000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-travertin flex items-center justify-center group-hover:border-olive transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-olive">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </div>
                <span className="font-body font-light text-taupe text-[15px]">WhatsApp</span>
              </a>

              <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-travertin flex items-center justify-center group-hover:border-[#FF5A5F] transition-colors duration-300">
                  <svg width="13" height="13" viewBox="0 0 32 32" fill="currentColor" className="text-[#FF5A5F]">
                    <path d="M16 1c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15S24.284 1 16 1zm0 4c4.418 0 8.418 2.238 10.75 5.875-.563 2.25-2.063 5.125-4.875 7.75C19.312 20.5 17.5 22 16 22.875 14.5 22 12.688 20.5 10.125 18.625 7.313 16 5.813 13.125 5.25 10.875 7.582 7.238 11.582 5 16 5zm0 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </div>
                <span className="font-body font-light text-taupe text-[15px]">Réserver sur Airbnb</span>
              </a>
            </div>

            <div className="aspect-[4/3] overflow-hidden border border-travertin">
              <iframe
                title="Villa Les Palmiers — Grimaud, Golfe de Saint-Tropez"
                src="https://www.openstreetmap.org/export/embed.html?bbox=6.55%2C43.23%2C6.78%2C43.34&layer=mapnik&marker=43.276%2C6.665"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="reveal-right">
            {submitted ? (
              <div className="h-full flex flex-col justify-center py-16">
                <div className="w-10 h-px bg-bronze mb-8" />
                <h3
                  className="font-display font-light text-charbon mb-5 leading-[1.1]"
                  style={{ fontSize: 'clamp(36px, 4vw, 50px)' }}
                >
                  Merci pour votre<br /><em>message</em>
                </h3>
                <p className="font-body font-light text-taupe text-[16px] leading-relaxed">
                  Nous revenons vers vous dans les plus brefs délais pour confirmer votre séjour.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <input type="hidden" name="form-name" value="contact" />

                <div className="grid grid-cols-2 gap-7">
                  <div>
                    <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Nom</label>
                    <input type="text" name="name" value={fields.name} onChange={handleChange} required className={inputClass} placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Email</label>
                    <input type="email" name="email" value={fields.email} onChange={handleChange} required className={inputClass} placeholder="votre@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Téléphone</label>
                  <input type="tel" name="phone" value={fields.phone} onChange={handleChange} className={inputClass} placeholder="+33 ..." />
                </div>

                <div className="grid grid-cols-2 gap-7">
                  <div>
                    <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Arrivée</label>
                    <input type="date" name="arrival" value={fields.arrival} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Départ</label>
                    <input type="date" name="departure" value={fields.departure} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Message</label>
                  <textarea name="message" value={fields.message} onChange={handleChange} rows={5} className={`${inputClass} resize-none`} placeholder="Vos questions, souhaits particuliers..." />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-bronze text-white font-body text-[10.5px] tracking-[0.22em] uppercase hover:bg-bronze-light transition-colors duration-300 disabled:opacity-50"
                >
                  {sending ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { label: 'La Villa', href: '#villa' },
    { label: 'Les Intérieurs', href: '#interieurs' },
    { label: 'Les Chambres', href: '#chambres' },
    { label: 'Jardin & Piscine', href: '#jardin' },
    { label: 'Art de Vivre', href: '#art-de-vivre' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-12 border-b border-bronze/25">
          <div>
            <p className="font-display text-charbon text-[24px] tracking-wide mb-1.5">Villa Les Palmiers</p>
            <p className="font-body text-[9.5px] tracking-[0.25em] uppercase text-bronze">
              Grimaud · Golfe de Saint-Tropez
            </p>
          </div>

          <div className="flex flex-wrap gap-6 lg:gap-8">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="font-body text-[10.5px] tracking-[0.18em] uppercase text-taupe hover:text-charbon transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="font-body text-[10.5px] tracking-[0.18em] uppercase text-taupe hover:text-bronze transition-colors duration-300">
              Instagram
            </a>
            <span className="text-bronze/50">·</span>
            <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer"
              className="font-body text-[10.5px] tracking-[0.18em] uppercase text-taupe hover:text-bronze transition-colors duration-300">
              Airbnb
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-body text-[10.5px] tracking-[0.1em] text-taupe">
            © 2024 Villa Les Palmiers. Tous droits réservés.
          </p>
          <div className="flex gap-7">
            <a href="#" className="font-body text-[10.5px] tracking-[0.1em] text-taupe hover:text-charbon transition-colors">Mentions légales</a>
            <a href="#" className="font-body text-[10.5px] tracking-[0.1em] text-taupe hover:text-charbon transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

function VillaPage() {
  const scrolled = useScrolled()
  useScrollReveal()

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation scrolled={scrolled} />
      <Hero />
      <StatsBar />
      <WelcomeSection />
      <VillaSection />
      <InteriorsSection />
      <BedroomsSection />
      <GardenSection />
      <ArtDeVivreSection />
      <ExploreSection />
      <StaySection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: VillaPage,
})
