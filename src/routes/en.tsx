import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

// ── Image constants ──────────────────────────────────────────────────────────

const U = 'https://images.unsplash.com/photo-'
const Q = (w: number) => `?auto=format&fit=crop&w=${w}&q=82`

const imgs = {
  hero:     U + '1570129477492-45c003dc4501' + Q(1920),
  villa:    U + '1512917774080-9991f1c4c750' + Q(1200),
  salon:    U + '1600566752355-35792bedcfea' + Q(1200),
  cuisine:  U + '1556909114-f6e7ad7d3136'   + Q(900),
  salle:    U + '1617806118233-18e1de247200' + Q(900),
  detail:   U + '1586023492125-27b2c045efd7' + Q(700),
  chambre1: U + '1631049307264-da0ec9d70304' + Q(900),
  chambre2: U + '1598928506311-c55ded91a20c' + Q(900),
  chambre3: U + '1505693416388-ac5ce068fe85' + Q(900),
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
      className={`font-display font-light leading-[0.95] ${light ? 'text-white' : 'text-charbon'}`}
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
  { href: '#villa', label: 'The Villa' },
  { href: '#interieurs', label: 'Interiors' },
  { href: '#chambres', label: 'Bedrooms' },
  { href: '#jardin', label: 'Garden & Pool' },
  { href: '#art-de-vivre', label: 'Lifestyle' },
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
              ? 'border-charbon text-charbon hover:bg-charbon hover:text-ivory'
              : 'border-white/70 text-white hover:bg-white hover:text-charbon'
          }`}
        >
          Book
        </a>

        <a
          href="/"
          className={`hidden lg:inline-block font-body text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${solid ? 'text-taupe hover:text-charbon' : 'text-white/70 hover:text-white'}`}
        >
          FR
        </a>

        <button
          className="lg:hidden flex flex-col justify-center gap-[5px] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-charbon' : 'bg-white'} ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-charbon' : 'bg-white'} ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-charbon' : 'bg-white'} ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
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
            Book
          </a>
          <a
            href="/"
            className="mt-4 block text-center font-body text-[10px] tracking-[0.2em] uppercase py-3 text-charbon"
          >
            FR
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
        style={{ backgroundImage: `url(${imgs.hero})`, backgroundColor: '#3A3530' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charbon/55 via-charbon/25 to-charbon/65" />

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
            Provençal elegance between vineyards and the Mediterranean
          </p>

          <p className="ha-3 font-body font-light text-white/60 mt-3 text-sm leading-relaxed max-w-sm">
            A contemporary home in the heart of a Mediterranean garden.
          </p>

          <div className="ha-4 flex flex-wrap gap-3 mt-9">
            <a
              href="#villa"
              className="font-body text-[10px] tracking-[0.22em] uppercase px-7 py-4 border border-white/60 text-white hover:bg-white hover:text-charbon transition-all duration-300"
            >
              Explore
            </a>
            <a
              href="https://airbnb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[10px] tracking-[0.22em] uppercase px-7 py-4 bg-bronze text-white border border-bronze hover:bg-bronze-light transition-all duration-300"
            >
              Book
            </a>
          </div>
        </div>

        <div className="ha-4 pb-8 flex flex-col items-start gap-2">
          <span className="font-body text-[9px] tracking-[0.35em] uppercase text-white/40">Scroll</span>
          <div className="scroll-line w-px h-11 bg-white/35 origin-top" />
        </div>
      </div>
    </section>
  )
}

// ── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar() {
  const items = [
    '6 Guests', '3 Bedrooms', '3 Bathrooms',
    'Heated pool', 'Mediterranean garden', 'Private estate',
  ]
  return (
    <div className="bg-charbon py-5">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="flex no-scrollbar overflow-x-auto lg:justify-between">
          {items.map((item, i) => (
            <div key={item} className="flex items-center flex-shrink-0">
              <span className="font-body text-[10px] tracking-[0.22em] uppercase text-white/55 whitespace-nowrap px-5 lg:px-0">
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

// ── The Villa ─────────────────────────────────────────────────────────────────

function VillaSection() {
  return (
    <section id="villa" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center">
          <div className="reveal-left order-2 lg:order-1">
            <div className="img-zoom aspect-[3/4]">
              <img
                src={imgs.villa}
                alt="Villa Les Palmiers — Exterior view"
                className="w-full h-full object-cover"
                style={{ backgroundColor: '#D4BC9E' }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="reveal order-1 lg:order-2 lg:pl-4">
            <Label num="01" text="The Villa" />
            <Title>
              Contemporary<br /><em>architecture</em>
            </Title>
            <Divider />

            <p className="font-body font-light text-taupe leading-[2] text-[15px] mb-5">
              Villa Les Palmiers is a contemporary property built in 2019, set within a private estate of only eight villas. Single-storey, bright, and open to the Provençal landscape.
            </p>
            <p className="font-body font-light text-taupe leading-[2] text-[15px] mb-10">
              Expansive glass doors fill every space with natural light. The travertine terrace carries indoor living seamlessly into the Mediterranean garden. The setting is exceptionally peaceful, just minutes from Saint-Tropez.
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-10 pt-6 border-t border-travertin">
              {[
                { l: 'Architecture', v: 'Single-storey' },
                { l: 'Year', v: '2019' },
                { l: 'Orientation', v: 'Due south' },
                { l: 'Estate', v: '8 private villas' },
              ].map(({ l, v }) => (
                <div key={l}>
                  <p className="font-body text-[9.5px] tracking-[0.2em] uppercase text-bronze mb-1">{l}</p>
                  <p className="font-display text-charbon text-xl">{v}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-block font-body text-[10px] tracking-[0.22em] uppercase px-8 py-4 border border-charbon text-charbon hover:bg-charbon hover:text-ivory transition-all duration-300"
            >
              Request availability
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Interiors ───────────────────────────────────────────────────────────

function InteriorsSection() {
  return (
    <section id="interieurs" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-20 gap-6">
          <div>
            <Label num="02" text="Interiors" />
            <Title>
              Contemporary design,<br /><em>natural light</em>
            </Title>
          </div>
          <p className="font-body font-light text-taupe text-[14px] leading-relaxed lg:max-w-[260px]">
            Open kitchen, living room, dining area — every space is designed for light and easy gathering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <div className="reveal-scale lg:col-span-2 img-zoom aspect-[16/10]">
            <img src={imgs.salon} alt="Living room" className="w-full h-full object-cover" style={{ backgroundColor: '#C4A882' }} loading="lazy" />
          </div>
          <div className="reveal-scale reveal-delay-1 img-zoom aspect-[3/4]">
            <img src={imgs.cuisine} alt="Kitchen" className="w-full h-full object-cover" style={{ backgroundColor: '#D4BC9E' }} loading="lazy" />
          </div>
          <div className="reveal-scale reveal-delay-2 img-zoom aspect-[4/3]">
            <img src={imgs.salle} alt="Dining room" className="w-full h-full object-cover" style={{ backgroundColor: '#9B8B7A' }} loading="lazy" />
          </div>
          <div className="reveal-scale reveal-delay-3 img-zoom aspect-[4/3]">
            <img src={imgs.detail} alt="Interior detail" className="w-full h-full object-cover" style={{ backgroundColor: '#B8A894' }} loading="lazy" />
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="w-7 h-px bg-bronze" />
          <p className="font-body text-[9.5px] tracking-[0.22em] uppercase text-taupe">
            Living room · Kitchen ouverte · Dining room · Glass doors
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Bedrooms ─────────────────────────────────────────────────────────────

function BedroomsSection() {
  const suites = [
    {
      num: '01',
      name: 'Principal Suite',
      img: imgs.chambre1,
      feats: ['Queen-size bed', 'Walk-in closet', 'Private bathroom', 'Garden view'],
    },
    {
      num: '02',
      name: 'Palm Suite',
      img: imgs.chambre2,
      feats: ['Queen-size bed', 'Walk-in closet', 'Private bathroom', 'Television'],
    },
    {
      num: '03',
      name: 'Mediterranean Suite',
      img: imgs.chambre3,
      feats: ['Queen-size bed', 'Walk-in closet', 'Private bathroom', 'Pool view'],
    },
  ]

  return (
    <section id="chambres" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20">
          <Label num="03" text="Bedrooms" />
          <Title>
            Three suites,<br /><em>complete comfort</em>
          </Title>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {suites.map((s, i) => (
            <div key={s.num} className={`reveal reveal-delay-${i + 1}`}>
              <div className="img-zoom aspect-[3/4] mb-6">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover"
                  style={{ backgroundColor: '#E0D5C8' }}
                  loading="lazy"
                />
              </div>
              <p className="font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2">Suite {s.num}</p>
              <h3 className="font-display font-light text-charbon text-2xl mb-4">{s.name}</h3>
              <div className="w-6 h-px bg-travertin mb-4" />
              <ul className="space-y-2.5">
                {s.feats.map(f => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-bronze flex-shrink-0" />
                    <span className="font-body font-light text-taupe text-[13.5px]">{f}</span>
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

// ── Garden & Pool ─────────────────────────────────────────────────────────

function GardenSection() {
  return (
    <section id="jardin" className="bg-charbon">
      <div className="relative h-[72vh] min-h-[480px] flex items-end overflow-hidden">
        <div
          className="hero-img absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imgs.piscine})`, backgroundColor: '#2A2520' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charbon via-charbon/15 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-7 lg:px-16 pb-14 lg:pb-20 w-full">
          <div className="reveal">
            <Label num="04" text="Garden & Pool" />
            <Title light>
              The heart of<br /><em>the property</em>
            </Title>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-7 lg:px-16 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center mb-16">
          <div className="reveal">
            <p className="font-body font-light text-white/60 leading-[2.1] text-[15px] mb-9">
              The garden is especially lush thanks to the water table fed by the Avelan along the property. Carefully maintained Mediterranean planting surrounds the infinity pool.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
              {['Three-trunk Washingtonia', 'Olive trees', 'Sculptural pomegranate', 'Cycas', 'Oleanders', 'Lawn & travertine'].map(p => (
                <div key={p} className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-olive flex-shrink-0" />
                  <span className="font-body text-[10.5px] tracking-[0.08em] text-white/50">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-right">
            <div className="grid grid-cols-2 gap-3">
              <div className="img-zoom aspect-square">
                <img src={imgs.jardin} alt="Mediterranean garden" className="w-full h-full object-cover" style={{ backgroundColor: '#3A3530' }} loading="lazy" />
              </div>
              <div className="img-zoom aspect-square mt-10">
                <img src={imgs.terrasse} alt="Terrasse travertin" className="w-full h-full object-cover" style={{ backgroundColor: '#3A3530' }} loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        <div className="reveal border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Infinity pool', 'Petanque court', 'Travertine terraces', 'Sunbeds & loungers'].map(item => (
            <div key={item}>
              <div className="w-5 h-px bg-bronze mb-3" />
              <p className="font-body text-[10px] tracking-[0.18em] uppercase text-white/45">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-20">
        <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
          <div className="reveal-scale img-zoom aspect-[21/9] min-h-[240px]">
            <img src={imgs.nuit} alt="Pool by night" className="w-full h-full object-cover" style={{ backgroundColor: '#1A1510' }} loading="lazy" />
          </div>
          <p className="font-body text-[9.5px] tracking-[0.22em] uppercase text-white/30 mt-4">
            Heated pool · Summer night
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Lifestyle ─────────────────────────────────────────────────────────────

function ArtDeVivreSection() {
  return (
    <section id="art-de-vivre" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20">
          <Label num="05" text="Lifestyle" />
          <Title>
            Provençal<br /><em>moments</em>
          </Title>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="reveal-left lg:row-span-2 img-zoom aspect-[3/5] md:aspect-auto">
            <img src={imgs.rose} alt="Provence rosé" className="w-full h-full object-cover" style={{ backgroundColor: '#D4BC9E' }} loading="lazy" />
          </div>
          <div className="reveal reveal-delay-1 img-zoom aspect-[4/3]">
            <img src={imgs.petitdej} alt="Breakfast in the sun" className="w-full h-full object-cover" style={{ backgroundColor: '#C4A882' }} loading="lazy" />
          </div>
          <div className="reveal reveal-delay-2 img-zoom aspect-[4/3]">
            <img src={imgs.dejeuner} alt="Lunch on the terrace" className="w-full h-full object-cover" style={{ backgroundColor: '#9B8B7A' }} loading="lazy" />
          </div>
          <div className="reveal reveal-delay-3 md:col-span-1 lg:col-span-2 bg-travertin p-10 lg:p-14 flex flex-col justify-center">
            <blockquote
              className="font-display font-light italic text-charbon mb-6 leading-[1.35]"
              style={{ fontSize: 'clamp(20px, 2.8vw, 32px)' }}
            >
              "A terrace at sunset,<br />
              a glass of rosé, the song of cicadas..."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-7 h-px bg-bronze" />
              <span className="font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze">Provençal art of living</span>
            </div>
          </div>
        </div>

        <div className="reveal mt-10 flex flex-wrap gap-2.5">
          {[
            'Breakfast in the sun',
            'Poolside aperitif',
            'Candlelit dinner',
            'Provence rosé',
            'Cicadas & laurels',
            'Starlit nights',
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
    { name: 'Grimaud', desc: 'Medieval village & Provençal markets', img: imgs.provence, dist: '5 min' },
    { name: 'Port-Grimaud', desc: 'The Provençal Venice', img: imgs.plage, dist: '10 min' },
    { name: 'Saint-Tropez', desc: 'Glamour, beaches & Place des Lices', img: imgs.tropez, dist: '15 min' },
    { name: 'Ramatuelle', desc: 'Vineyards & gulf panoramas', img: imgs.provence, dist: '20 min' },
    { name: 'Gassin', desc: "One of France's most beautiful villages", img: imgs.tropez, dist: '25 min' },
    { name: 'Gigaro & Rayol', desc: 'Unspoiled beaches and gardens', img: imgs.plage, dist: '35 min' },
  ]

  return (
    <section id="explorer" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-20 gap-6">
          <div>
            <Label num="06" text="Explorer" />
            <Title>
              At the gateway to<br /><em>the Gulf of Saint-Tropez</em>
            </Title>
          </div>
          <p className="font-body font-light text-taupe text-[14px] leading-relaxed lg:max-w-[240px]">
            The villa is ideally placed between the sea, vineyards, and hilltop villages.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((d, i) => (
            <div key={d.name} className={`reveal reveal-delay-${Math.min(i + 1, 6)}`}>
              <div className="img-zoom aspect-[5/3] mb-4">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover"
                  style={{ backgroundColor: '#9B8B7A' }}
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-light text-charbon text-[22px] mb-1">{d.name}</h3>
                  <p className="font-body font-light text-taupe text-[13px]">{d.desc}</p>
                </div>
                <span className="font-body text-[9.5px] tracking-[0.18em] uppercase text-bronze mt-1 flex-shrink-0">
                  {d.dist}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Your Stay ─────────────────────────────────────────────────────────────

function StaySection() {
  const categories = [
    {
      title: 'Arrival & Departure',
      items: ['Check-in 4 pm — 8 pm', 'Check-out before 11 am', 'Personal welcome', 'Key handover on arrival'],
    },
    {
      title: 'Comfort',
      items: ['High-speed Wi-Fi', 'Air conditioning', 'Heated pool', 'Private parking'],
    },
    {
      title: 'Security',
      items: ['Secure alarm', 'Private estate', 'Outdoor lighting', 'Interphone'],
    },
    {
      title: 'House Rules',
      items: ['Non-smoking', 'Pets not accepted', 'Events on request', 'Quiet after 10 pm'],
    },
  ]

  return (
    <section id="sejour" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20">
          <Label num="07" text="Your Stay" />
          <Title>
            Practical<br /><em>information</em>
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
                    <span className="font-body font-light text-taupe text-[13.5px] leading-relaxed">{item}</span>
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
    { name: 'Heated pool', desc: 'Water kept at an ideal temperature throughout the season' },
    { name: 'Scooter available', desc: 'For exploring the Gulf of Saint-Tropez freely' },
    { name: 'Electric vehicle charging', desc: 'Charging station on site' },
    { name: 'Housekeeping service', desc: 'Optional service depending on the length of stay' },
    { name: 'Personal welcome', desc: 'Key handover and full introduction to the villa' },
  ]

  return (
    <section id="services" className="py-32 lg:py-44 bg-charbon">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20">
          <Label num="08" text="Services" />
          <Title light>
            Premium<br /><em>services</em>
          </Title>
        </div>

        <div>
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} flex flex-col md:flex-row md:items-center gap-4 md:gap-16 py-8 border-b border-white/10`}
            >
              <span className="hidden md:block font-body text-[10px] tracking-[0.2em] text-bronze/50 flex-shrink-0 w-8">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display font-light text-white text-[22px] lg:text-[26px] mb-1">{s.name}</h3>
                <p className="font-body font-light text-white/45 text-[13.5px]">{s.desc}</p>
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
    'w-full border-b border-travertin bg-transparent py-3.5 font-body font-light text-charbon text-[14px] focus:border-bronze outline-none transition-colors duration-300 placeholder:text-taupe/40'

  return (
    <section id="contact" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
          <div className="reveal">
            <Label num="09" text="Contact" />
            <Title>
              Book<br /><em>your stay</em>
            </Title>
            <Divider />

            <p className="font-body font-light text-taupe leading-[2.1] text-[15px] mb-10">
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
                <span className="font-body font-light text-taupe text-[14px]">+33 (0)6 00 00 00 00</span>
              </a>

              <a href="https://wa.me/33600000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-travertin flex items-center justify-center group-hover:border-olive transition-colors duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-olive">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                </div>
                <span className="font-body font-light text-taupe text-[14px]">WhatsApp</span>
              </a>

              <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 border border-travertin flex items-center justify-center group-hover:border-[#FF5A5F] transition-colors duration-300">
                  <svg width="13" height="13" viewBox="0 0 32 32" fill="currentColor" className="text-[#FF5A5F]">
                    <path d="M16 1c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15S24.284 1 16 1zm0 4c4.418 0 8.418 2.238 10.75 5.875-.563 2.25-2.063 5.125-4.875 7.75C19.312 20.5 17.5 22 16 22.875 14.5 22 12.688 20.5 10.125 18.625 7.313 16 5.813 13.125 5.25 10.875 7.582 7.238 11.582 5 16 5zm0 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </div>
                <span className="font-body font-light text-taupe text-[14px]">Book on Airbnb</span>
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
                  Thank you for your<br /><em>message</em>
                </h3>
                <p className="font-body font-light text-taupe text-[15px] leading-relaxed">
                  We will get back to you shortly to confirm your stay.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                <input type="hidden" name="form-name" value="contact" />

                <div className="grid grid-cols-2 gap-7">
                  <div>
                    <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Name</label>
                    <input type="text" name="name" value={fields.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Email</label>
                    <input type="email" name="email" value={fields.email} onChange={handleChange} required className={inputClass} placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Phone</label>
                  <input type="tel" name="phone" value={fields.phone} onChange={handleChange} className={inputClass} placeholder="+33 ..." />
                </div>

                <div className="grid grid-cols-2 gap-7">
                  <div>
                    <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Arrival</label>
                    <input type="date" name="arrival" value={fields.arrival} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Departure</label>
                    <input type="date" name="departure" value={fields.departure} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Message</label>
                  <textarea name="message" value={fields.message} onChange={handleChange} rows={5} className={`${inputClass} resize-none`} placeholder="Your questions or special requests..." />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 bg-charbon text-ivory font-body text-[10px] tracking-[0.22em] uppercase hover:bg-bronze transition-colors duration-300 disabled:opacity-50"
                >
                  {sending ? 'Sending...' : 'Send request'}
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
    { label: 'The Villa', href: '#villa' },
    { label: 'Interiors', href: '#interieurs' },
    { label: 'Bedrooms', href: '#chambres' },
    { label: 'Garden & Pool', href: '#jardin' },
    { label: 'Lifestyle', href: '#art-de-vivre' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-charbon">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-12 border-b border-white/10">
          <div>
            <p className="font-display text-white text-[22px] tracking-wide mb-1.5">Villa Les Palmiers</p>
            <p className="font-body text-[9.5px] tracking-[0.25em] uppercase text-bronze">
              Grimaud · Golfe de Saint-Tropez
            </p>
          </div>

          <div className="flex flex-wrap gap-6 lg:gap-8">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="font-body text-[9.5px] tracking-[0.18em] uppercase text-white/40 hover:text-white/70 transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="font-body text-[9.5px] tracking-[0.18em] uppercase text-white/40 hover:text-bronze transition-colors duration-300">
              Instagram
            </a>
            <span className="text-white/20">·</span>
            <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer"
              className="font-body text-[9.5px] tracking-[0.18em] uppercase text-white/40 hover:text-bronze transition-colors duration-300">
              Airbnb
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-body text-[9.5px] tracking-[0.1em] text-white/25">
            © 2024 Villa Les Palmiers. All rights reserved.
          </p>
          <div className="flex gap-7">
            <a href="#" className="font-body text-[9.5px] tracking-[0.1em] text-white/25 hover:text-white/50 transition-colors">Legal notice</a>
            <a href="#" className="font-body text-[9.5px] tracking-[0.1em] text-white/25 hover:text-white/50 transition-colors">Privacy policy</a>
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
      <ArtDeVivreSection />
      <ExploreSection />
      <StaySection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export const Route = createFileRoute('/en')({
  component: VillaPage,
})
