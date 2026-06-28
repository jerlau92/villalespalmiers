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

const imgs = {
  hero:     '/images/villa-les-palmiers-accueil.png',
  villa:    '/images/villa-les-palmiers-accueil.png',
  chambre1: '/images/chambre-villa-les-palmiers-1.jpeg',
  chambre2: '/images/chambre-villa-les-palmiers-2.jpeg',
  chambre3: '/images/chambre-villa-les-palmiers-3.jpeg',
}

const airbnbUrl = 'http://www.airbnb.fr/h/lavilladespalmiers'
const villaAddress = '244 route du Plan de la Tour, 83310 Grimaud'
const mapLat = '43.2768'
const mapLon = '6.54751'

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
  { href: '#villa', label: 'La Villa' },
  { href: '#interieurs', label: 'Les Intérieurs' },
  { href: '#chambres', label: 'Les Chambres' },
  { href: '#jardin', label: 'Jardin & Piscine' },
  { href: '#explorer', label: 'Explorer' },
  { href: '#sejour', label: 'Séjour' },
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
          href={airbnbUrl}
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
            href={airbnbUrl}
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
              href={airbnbUrl}
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
    <section id="bienvenue" className="bg-travertin/55 px-7 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14 border-l border-bronze/45">
      <div className="mb-8">
        <Label num="08" text="Mot d'accueil" />
        <h3
          className="font-display font-light text-charbon leading-[0.98]"
          style={{ fontSize: 'clamp(38px, 4.5vw, 62px)' }}
        >
          Au plaisir de<br /><em>vous accueillir</em>
        </h3>
      </div>

      <div className="space-y-6 font-body font-light text-taupe leading-[2] text-[16px] lg:text-[17px]">
        <p>
          Nous serions heureux de vous accueillir à Villa Les Palmiers et de vous faire découvrir le charme du Golfe de Saint-Tropez.
        </p>
        <p>
          Nous avons imaginé cette villa comme un lieu de détente où vous pourrez profiter pleinement de vos vacances, dans un cadre calme, confortable et élégant.
        </p>
        <p>
          Ce site a été conçu pour vous faire découvrir Villa Les Palmiers et vous permettre de vous projeter dans vos prochaines vacances. Vous y trouverez une présentation complète de la villa, de ses équipements, de ses espaces de vie et de son environnement, afin que vous puissiez imaginer dès aujourd'hui les moments de détente, de convivialité et d'évasion qui vous attendent. Nous espérons que cette visite virtuelle vous donnera envie de vivre l'expérience Villa Les Palmiers.
        </p>
        <p>
          Si vous avez la moindre question avant ou pendant votre séjour, n'hésitez pas à nous contacter. Nous serons ravis de vous accompagner et de faire en sorte que votre expérience soit la plus agréable possible.
        </p>
        <p>
          Au plaisir de vous accueillir prochainement à Villa Les Palmiers.
        </p>
      </div>

      <div className="mt-10 pt-8 border-t border-bronze/30">
        <p className="font-body text-[10px] tracking-[0.22em] uppercase text-bronze">
          Gérard & Jérôme Laurent
        </p>
        <p className="mt-1 font-body font-light text-taupe text-[13px]">
          Vos hôtes
        </p>
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
              Bienvenue à<br /><em>Villa Les Palmiers</em>
            </Title>
            <Divider />

            <p className="font-display font-light text-charbon leading-tight text-[26px] lg:text-[32px] mb-8">
              Une élégante villa contemporaine construite en 2019, située à Grimaud, au cœur du Golfe de Saint-Tropez.
            </p>
            <div className="space-y-6 font-body font-light text-taupe leading-[2.05] text-[16.5px] lg:text-[17px] mb-10">
              <p>
                Nichée dans un domaine privé et sécurisé de 8 villas, cette propriété de plain-pied d'environ 185 m² offre un cadre privilégié entre les plages, les vignes et le village de Grimaud.
              </p>
              <p>
                Implantée sur un magnifique terrain paysager de 2 000 m² planté d'une quinzaine de palmiers et d'essences méditerranéennes et entouré de pins parasols, la villa a été pensée comme une véritable maison de vacances familiale, mêlant confort, élégance et douceur de vivre. Vous profiterez d'une grande piscine à débordement, de plusieurs espaces extérieurs aménagés, d'un terrain de pétanque éclairé, d'une table de ping-pong ainsi que d'une vaste terrasse avec pergola et salon d'été.
              </p>
              <p>
                La propriété peut accueillir jusqu'à 6 voyageurs dans un environnement calme, résidentiel et particulièrement reposant, avec 3 chambres avec leur salle de bains privative.
              </p>
              <p>
                La Villa bénéficie de très beaux volumes baignés de lumière grâce à ses larges baies vitrées ouvertes sur le jardin et la piscine. Décorée avec soin par une architecte d'intérieur, elle offre une atmosphère chaleureuse et raffinée, inspirée de l'art de vivre méditerranéen.
              </p>
              <p>
                Le vaste séjour s'ouvre directement sur les terrasses et les extérieurs. La cuisine moderne est entièrement équipée pour des séjours confortables en famille ou entre amis.
              </p>
              <p>
                La villa dispose de trois chambres avec leurs salles d'eau privatives : une suite principale avec lit queen size, nombreux rangements, télévision et salle de bain avec douche à l'italienne, sèche-serviette et sèche-cheveux ; deux WC avec lavabos séparés ; et deux chambres équipées de lits modulables pouvant être configurés en lits doubles ou lits simples selon vos besoins, chacune avec salle d'eau et douche à l'italienne, sèche-serviette et sèche-cheveux.
              </p>
              <p>
                La maison est entièrement climatisée et dispose d'une connexion fibre très haut débit, de deux Smart TV, d'un coffre-fort ainsi que de deux places de stationnement couvertes, dont une équipée d'une borne de recharge rapide pour véhicule électrique.
              </p>
              <p>
                Le linge de maison, les serviettes de toilette ainsi que les serviettes de piscine et de plage sont fournis durant tout le séjour.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            ['Salon', 'Un espace ouvert sur la terrasse et le jardin, pensé pour les moments calmes comme les soirées partagées.'],
            ['Cuisine ouverte', 'Une cuisine contemporaine intégrée à la pièce de vie, pratique pour cuisiner et recevoir.'],
            ['Salle à manger', 'Une table conviviale au cœur de la maison, prolongée naturellement par les extérieurs.'],
            ['Baies vitrées', "La lumière traverse les pièces et crée une continuité douce entre l'intérieur, le jardin et la piscine."],
          ].map(([title, text], i) => (
            <article
              key={title}
              className={`reveal-scale reveal-delay-${i + 1} min-h-[280px] border border-bronze/20 bg-ivory/70 p-7 lg:p-8 flex flex-col justify-between`}
            >
              <div>
                <span className="font-body text-[10px] tracking-[0.24em] uppercase text-bronze">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-7 font-display font-light text-charbon text-[30px] lg:text-[36px] leading-none">
                  {title}
                </h3>
              </div>
              <p className="font-body font-light text-taupe text-[15.5px] leading-relaxed">
                {text}
              </p>
            </article>
          ))}
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
      <div className="relative min-h-[480px] flex items-end overflow-hidden bg-[linear-gradient(135deg,#E8DDD0_0%,#F8F5F0_52%,#D4BC9E_100%)]">
        <div className="absolute inset-x-0 bottom-0 h-px bg-bronze/25" />
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

          <div className="reveal-right border border-bronze/25 bg-travertin/45 p-8 lg:p-10">
            <p className="font-body text-[10px] tracking-[0.24em] uppercase text-bronze mb-8">
              Extérieurs
            </p>
            <div className="space-y-7">
              {[
                ['Piscine à débordement', "Un bassin sécurisé par une alarme anti-immersion, pensé comme le point de rencontre naturel des journées d'été."],
                ['Terrasses en travertin', 'Des espaces ouverts pour déjeuner, lire ou se retrouver au soleil.'],
                ['Terrain de pétanque éclairé', 'Un espace de jeu convivial pour prolonger les fins de journée en extérieur.'],
                ['Table de ping-pong', 'Un équipement simple et familial pour rythmer les vacances au jardin.'],
                ['Jardin méditerranéen', 'Une composition végétale généreuse, entretenue pour préserver fraîcheur et intimité.'],
              ].map(([title, text]) => (
                <div key={title} className="border-t border-bronze/20 pt-5">
                  <h3 className="font-display font-light text-charbon text-[28px] leading-tight">{title}</h3>
                  <p className="mt-2 font-body font-light text-taupe text-[15px] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal border-t border-travertin pt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Piscine à débordement', 'Terrain de pétanque éclairé', 'Table de ping-pong', 'Terrasses en travertin'].map(item => (
            <div key={item}>
              <div className="w-5 h-px bg-bronze mb-3" />
              <p className="font-body text-[11px] tracking-[0.18em] uppercase text-taupe">{item}</p>
            </div>
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
      desc: "L'âme provençale du Golfe de Saint-Tropez. Perché sur sa colline, Grimaud est dominé par les ruines romantiques de son château du XIe siècle, accessible par un sentier offrant un panorama exceptionnel sur la baie.",
      note: "Ruelles pavées, maisons en pierre ocre, placettes ombragées, galeries d'art et marché du jeudi matin.",
    },
    {
      name: 'Port Grimaud',
      dist: '5 km',
      desc: "La Venise Provençale. Créée dans les années 1960 par l'architecte François Spoerry, cette cité lacustre unique en Europe est traversée par plus de sept kilomètres de canaux.",
      note: 'Maisons colorées aux volets pastel et anneaux privés pour accoster directement devant sa porte.',
    },
    {
      name: 'Gassin',
      dist: '10 km',
      desc: "Classé parmi les Plus Beaux Villages de France, Gassin couronne un piton rocheux offrant l'une des vues panoramiques les plus spectaculaires sur le Golfe de Saint-Tropez et le massif des Maures.",
      note: 'Centre médiéval, maisons serrées contre le vent et les pirates, place dei Barri idéale au coucher du soleil.',
    },
    {
      name: 'Sainte-Maxime',
      dist: '12 km',
      desc: 'Station balnéaire animée et élégante, Sainte-Maxime déploie un front de mer de plus de deux kilomètres, ponctué de plages de sable fin.',
      note: 'Une adresse facile pour profiter de la mer, des terrasses et de la douceur du Golfe.',
    },
    {
      name: 'Saint-Tropez',
      dist: '12 km',
      desc: "Port et village mythique de la Côte d'Azur, mêlant authenticité provençale et glamour international, entre le quai Sénéquier face aux yachts et les ruelles du quartier de la Ponche.",
      note: 'Place des Lices, marché provençal, boutiques de créateurs, galeries, musées et soirées tropéziennes.',
    },
    {
      name: 'Ramatuelle',
      dist: '17 km',
      desc: "Village perché aux ruelles provençales typiques, dominant les vignobles et la presqu'île de Saint-Tropez. Son centre historique, fleuri et préservé, s'anime autour de son marché.",
      note: 'Porte d’entrée de Pampelonne, de ses clubs de plage chics et de domaines viticoles réputés.',
    },
    {
      name: 'La Croix-Valmer',
      dist: '17 km',
      desc: 'Station familiale et préservée, nichée entre vignobles et pinèdes au sud du Golfe de Saint-Tropez, dans une atmosphère authentique et reposante.',
      note: 'Marché du dimanche matin place des Palmiers et plages de Gigaro aux eaux cristallines.',
    },
    {
      name: 'Rayol-Canadel-sur-Mer',
      dist: '24 km',
      desc: "Niché entre mer et montagne sur la Corniche des Maures, le Rayol-Canadel est l'un des villages les plus secrets et préservés du littoral varois.",
      note: 'Domaine du Rayol, criques discrètes, plages de galets, pins parasols et eau cristalline propice à la plongée.',
    },
  ]

  return (
    <section id="explorer" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-20 gap-6">
          <div>
            <Label num="05" text="Explorer" />
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
      items: ['Check-in 15h — 20h', 'Check-out avant 11h', 'Accueil personnalisé', 'Remise des clés en main'],
    },
    {
      title: 'Confort',
      items: ['Wi-Fi fibre très haut débit', 'Climatisation', 'Piscine chauffée', 'Parking couvert avec recharge électrique'],
    },
    {
      title: 'Sécurité',
      items: ['Alarme sécurisée', 'Domaine privé', 'Piscine avec alarme anti-immersion', 'Éclairage extérieur'],
    },
    {
      title: 'Accessibilité',
      items: ['Villa de plain-pied', 'Accessible aux personnes à mobilité réduite', "Accès aux douches à l'italienne limité à 80 cm de large"],
    },
  ]

  return (
    <section id="sejour" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20">
          <Label num="06" text="Votre Séjour" />
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
    { name: 'Terrain de pétanque éclairé', desc: 'Un espace convivial pour les fins de journée au jardin' },
    { name: 'Table de ping-pong', desc: 'Une activité familiale disponible directement sur place' },
    { name: 'Recharge véhicule électrique', desc: 'Borne de recharge sur site' },
    { name: 'Service de ménage', desc: 'Prestation disponible en option selon la durée du séjour' },
    { name: 'Accueil personnalisé', desc: 'Remise des clés et présentation complète de la villa' },
  ]

  return (
    <section id="services" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20">
          <Label num="07" text="Services" />
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
  return (
    <section id="contact" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-16 lg:gap-28 items-start">
          <div className="reveal">
            <Label num="08" text="Contact" />
            <Title>
              Nous<br /><em>contacter</em>
            </Title>
            <Divider />

            <p className="font-body font-light text-taupe leading-[2.1] text-[16.5px] mb-10">
              Villa Les Palmiers<br />
              {villaAddress}<br />
              France
            </p>

            <div className="space-y-4 mb-10">
              <a href="tel:+33609277382" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-travertin flex items-center justify-center group-hover:border-bronze transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-bronze">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.5 5.5l.97-.97a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="font-body font-light text-taupe text-[15px]">Jérôme : 06 09 27 73 82</span>
              </a>

              <a href="tel:+33612294137" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-travertin flex items-center justify-center group-hover:border-olive transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-olive">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.5 5.5l.97-.97a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="font-body font-light text-taupe text-[15px]">Gérard : 06 12 29 41 37</span>
              </a>

              <a href={airbnbUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
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
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${Number(mapLon) - 0.015}%2C${Number(mapLat) - 0.015}%2C${Number(mapLon) + 0.015}%2C${Number(mapLat) + 0.015}&layer=mapnik&marker=${mapLat}%2C${mapLon}`}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

          <div className="reveal-right">
            <WelcomeSection />
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
    { label: 'Explorer', href: '#explorer' },
    { label: 'Séjour', href: '#sejour' },
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
            <a href={airbnbUrl} target="_blank" rel="noopener noreferrer"
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
      <VillaSection />
      <InteriorsSection />
      <BedroomsSection />
      <GardenSection />
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
