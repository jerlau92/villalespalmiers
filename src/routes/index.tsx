import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const U = 'https://images.unsplash.com/photo-'
const Q = (w: number) => `?auto=format&fit=crop&w=${w}&q=84`

const imgs = {
  hero: U + '1570129477492-45c003dc4501' + Q(2200),
  exterior1: U + '1512917774080-9991f1c4c750' + Q(1400),
  exterior2: U + '1566073771259-a9a8fe8671a7' + Q(1600),
  garden: U + '1490750967868-88df5691cc33' + Q(1200),
  terrace: U + '1533044307260-24af8186fcb0' + Q(1200),
  salon: U + '1600566752355-35792bedcfea' + Q(1400),
  cuisine: U + '1556909114-f6e7ad7d3136' + Q(1200),
  dining: U + '1617806118233-18e1de247200' + Q(1200),
  interiorDetail: U + '1586023492125-27b2c045efd7' + Q(1000),
  bedroom1: U + '1631049307264-da0ec9d70304' + Q(1200),
  bedroom2: U + '1598928506311-c55ded91a20c' + Q(1200),
  bedroom3: U + '1505693416388-ac5ce068fe85' + Q(1200),
  breakfast: U + '1533089860892-a7c6f0a88666' + Q(1000),
  lunch: U + '1414235077428-338989a2e8c0' + Q(1000),
  provence: U + '1523531294919-4bcd7c65d049' + Q(1000),
}

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
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

function encode(data: Record<string, string>) {
  return Object.entries(data).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&')
}

function Label({ num, text }: { num: string; text: string }) {
  return (
    <p className="font-body text-[11px] tracking-[0.28em] uppercase text-bronze mb-5 flex items-center gap-3">
      <span className="opacity-60">{num}</span><span className="w-6 h-px bg-bronze opacity-60 inline-block" />{text}
    </p>
  )
}

function Title({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`font-display font-light leading-[0.95] ${light ? 'text-white' : 'text-charbon'}`} style={{ fontSize: 'clamp(42px, 5.4vw, 72px)' }}>
      {children}
    </h2>
  )
}

function Divider() { return <div className="w-10 h-px bg-bronze my-7" /> }

const navLinks = [
  { href: '#villa', label: 'La Villa' },
  { href: '#interieurs', label: 'Les Intérieurs' },
  { href: '#chambres', label: 'Les Chambres' },
  { href: '#jardin', label: 'Jardin & Piscine' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#contact', label: 'Contact' },
]

function Navigation({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false)
  const solid = scrolled || open
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${solid ? 'nav-solid' : 'nav-transparent'}`}>
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16 h-[72px] flex items-center justify-between">
        <a href="#" className={`font-display tracking-wide text-[18px] transition-colors duration-300 ${solid ? 'text-charbon' : 'text-white'}`}>Villa Les Palmiers</a>
        <div className="hidden lg:flex items-center gap-9">
          {navLinks.map(l => <a key={l.href} href={l.href} className={`font-body text-[10.5px] tracking-[0.16em] uppercase transition-colors duration-300 ${solid ? 'text-taupe hover:text-charbon' : 'text-white/75 hover:text-white'}`}>{l.label}</a>)}
        </div>
        <a href="#contact" className={`hidden lg:inline-block font-body text-[10px] tracking-[0.2em] uppercase px-6 py-3 border transition-all duration-300 ${solid ? 'border-charbon text-charbon hover:bg-charbon hover:text-ivory' : 'border-white/70 text-white hover:bg-white hover:text-charbon'}`}>Réserver</a>
        <button className="lg:hidden flex flex-col justify-center gap-[5px] p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-charbon' : 'bg-white'} ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-charbon' : 'bg-white'} ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-charbon' : 'bg-white'} ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>
      <div className={`lg:hidden bg-ivory overflow-hidden transition-all duration-400 ${open ? 'max-h-[500px] pb-8' : 'max-h-0'}`}>
        <div className="px-7 pt-2">
          {navLinks.map(l => <a key={l.href} href={l.href} className="block font-body text-[11px] tracking-[0.18em] uppercase text-charbon py-4 border-b border-travertin" onClick={() => setOpen(false)}>{l.label}</a>)}
          <a href="#contact" className="mt-6 block text-center font-body text-[10px] tracking-[0.2em] uppercase py-4 border border-charbon text-charbon" onClick={() => setOpen(false)}>Réserver</a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[650px] flex flex-col overflow-hidden">
      <div className="hero-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgs.hero})`, backgroundColor: '#3A3530' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-charbon/60 via-charbon/25 to-charbon/70" />
      <div className="relative z-10 flex flex-col h-full max-w-[1440px] mx-auto px-7 lg:px-16 w-full">
        <div className="flex-1 flex flex-col justify-end items-center text-center pb-28 lg:pb-32">
          <p className="ha-0 font-body text-[10.5px] tracking-[0.32em] uppercase text-white/70 mb-5">Grimaud · Golfe de Saint-Tropez · France</p>
          <h1 className="ha-1 font-display font-light text-white leading-[0.92]" style={{ fontSize: 'clamp(54px, 9vw, 120px)' }}>Villa<br />Les Palmiers</h1>
          <div className="ha-2 w-10 h-px bg-bronze mt-8 mb-6" />
          <p className="ha-3 font-display font-light italic text-white/90" style={{ fontSize: 'clamp(17px, 2.2vw, 26px)' }}>L'élégance provençale entre vignes et Méditerranée</p>
          <p className="ha-3 font-body font-light text-white/70 mt-3 text-sm leading-relaxed max-w-md">Une maison contemporaine au cœur d'un jardin méditerranéen.</p>
          <div className="ha-4 flex flex-wrap justify-center gap-3 mt-9 w-full">
            <a href="#villa" className="font-body text-[10px] tracking-[0.22em] uppercase px-7 py-4 border border-white/70 text-white hover:bg-white hover:text-charbon transition-all duration-300">Découvrir</a>
            <a href="#contact" className="font-body text-[10px] tracking-[0.22em] uppercase px-7 py-4 bg-bronze text-white border border-bronze hover:bg-bronze-light transition-all duration-300">Réserver</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function HighlightsBar() {
  const items = ['3 Salles de bains', 'Piscine chauffée', 'Jardin méditerranéen', 'Domaine privé', 'Plain-pied', 'Golfe de Saint-Tropez']
  return (
    <div className="bg-charbon py-5">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="flex no-scrollbar overflow-x-auto lg:justify-between">
          {items.map((item, i) => <div key={item} className="flex items-center flex-shrink-0"><span className="font-body text-[10px] tracking-[0.22em] uppercase text-white/55 whitespace-nowrap px-5 lg:px-0">{item}</span>{i < items.length - 1 && <span className="hidden lg:block text-bronze/35 mx-6 text-xs">·</span>}</div>)}
        </div>
      </div>
    </div>
  )
}

function VillaSection() {
  return (
    <section id="villa" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center">
          <div className="reveal-left order-2 lg:order-1">
            <div className="img-zoom aspect-[3/4]"><img src={imgs.exterior1} alt="Villa Les Palmiers — extérieur" className="w-full h-full object-cover" loading="lazy" /></div>
            <p className="font-body text-[9.5px] tracking-[0.22em] uppercase text-taupe mt-4">Construite en 2019 · Plain-pied · Domaine privé</p>
          </div>
          <div className="reveal order-1 lg:order-2 lg:pl-4">
            <Label num="01" text="La Villa" />
            <Title>Une architecture<br /><em>contemporaine</em></Title>
            <Divider />
            <p className="font-body font-light text-taupe leading-[2] text-[15px] mb-5">Villa Les Palmiers est une propriété contemporaine construite en 2019, nichée au sein d'un domaine privé de seulement huit villas. Son architecture de plain-pied privilégie les volumes simples, la fluidité des circulations et l'ouverture sur le jardin.</p>
            <p className="font-body font-light text-taupe leading-[2] text-[15px] mb-10">La terrasse en travertin prolonge naturellement les pièces de vie vers la piscine et la végétation méditerranéenne. L'atmosphère est calme, lumineuse et confidentielle, à quelques minutes de Grimaud, Port-Grimaud et Saint-Tropez.</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-10 pt-6 border-t border-travertin">
              {[{ l: 'Architecture', v: 'Plain-pied' }, { l: 'Année', v: '2019' }, { l: 'Ambiance', v: 'Contemporaine' }, { l: 'Domaine', v: '8 villas privées' }].map(({ l, v }) => <div key={l}><p className="font-body text-[9.5px] tracking-[0.2em] uppercase text-bronze mb-1">{l}</p><p className="font-display text-charbon text-xl">{v}</p></div>)}
            </div>
            <a href="#contact" className="inline-block font-body text-[10px] tracking-[0.22em] uppercase px-8 py-4 border border-charbon text-charbon hover:bg-charbon hover:text-ivory transition-all duration-300">Demander une disponibilité</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function InteriorsSection() {
  const cards = [
    { title: 'Salon', img: imgs.salon, desc: 'Un espace de détente élégant, pensé pour les moments calmes après la plage ou les soirées en famille.' },
    { title: 'Cuisine ouverte', img: imgs.cuisine, desc: 'Une cuisine conviviale et fonctionnelle, ouverte sur les pièces de vie et les repas d’été.' },
    { title: 'Salle à manger', img: imgs.dining, desc: 'Un lieu de partage simple et raffiné, prolongé par la terrasse et le jardin.' },
  ]
  return (
    <section id="interieurs" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-20 gap-6">
          <div><Label num="02" text="Les Intérieurs" /><Title>Salon, cuisine ouverte<br /><em>& salle à manger</em></Title></div>
          <p className="font-body font-light text-taupe text-[14px] leading-relaxed lg:max-w-[300px]">Des pièces de vie claires et chaleureuses, organisées autour du confort, du partage et de la simplicité méditerranéenne.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((c, i) => <article key={c.title} className={`reveal reveal-delay-${i + 1}`}>
            <div className="img-zoom aspect-[4/5] mb-6"><img src={c.img} alt={c.title} className="w-full h-full object-cover" loading="lazy" /></div>
            <p className="font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2">{c.title}</p>
            <p className="font-body font-light text-taupe text-[14px] leading-[1.9]">{c.desc}</p>
          </article>)}
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="reveal-scale img-zoom aspect-[16/10]"><img src={imgs.interiorDetail} alt="Détail intérieur" className="w-full h-full object-cover" loading="lazy" /></div>
          <div className="reveal-scale reveal-delay-1 bg-ivory p-10 lg:p-14 flex flex-col justify-center">
            <p className="font-display font-light italic text-charbon leading-[1.35]" style={{ fontSize: 'clamp(22px, 3vw, 36px)' }}>Des espaces sobres, lumineux et faciles à vivre, pensés pour profiter pleinement du Sud.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function BedroomsSection() {
  const suites = [
    { num: '01', name: 'Suite Principale', img: imgs.bedroom1, feats: ['Lit Queen Size', 'Salle de bains privative', 'Dressing', 'Vue sur le jardin'] },
    { num: '02', name: 'Suite Palmiers', img: imgs.bedroom2, feats: ['Lit Queen Size', 'Salle de bains privative', 'Dressing', 'Télévision'] },
    { num: '03', name: 'Suite Méditerranée', img: imgs.bedroom3, feats: ['Lit Queen Size', 'Salle de bains privative', 'Dressing', 'Vue piscine'] },
  ]
  return (
    <section id="chambres" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20"><Label num="03" text="Les Chambres" /><Title>Trois suites,<br /><em>tout confort</em></Title></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
          {suites.map((s, i) => <div key={s.num} className={`reveal reveal-delay-${i + 1}`}>
            <div className="img-zoom aspect-[3/4] mb-6"><img src={s.img} alt={s.name} className="w-full h-full object-cover" loading="lazy" /></div>
            <p className="font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2">Suite {s.num}</p>
            <h3 className="font-display font-light text-charbon text-2xl mb-4">{s.name}</h3>
            <ul className="space-y-2.5">{s.feats.map(f => <li key={f} className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-bronze" /><span className="font-body font-light text-taupe text-[13.5px]">{f}</span></li>)}</ul>
          </div>)}
        </div>
      </div>
    </section>
  )
}

function GardenSection() {
  return (
    <section id="jardin" className="bg-charbon">
      <div className="relative h-[72vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="hero-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${imgs.exterior2})`, backgroundColor: '#2A2520' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-charbon via-charbon/15 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-7 lg:px-16 pb-14 lg:pb-20 w-full"><div className="reveal"><Label num="04" text="Jardin & Piscine" /><Title light>Le cœur de<br /><em>la propriété</em></Title></div></div>
      </div>
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16 pt-20 pb-20">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center mb-16">
          <div className="reveal"><p className="font-body font-light text-white/65 leading-[2.1] text-[15px] mb-9">Autour de la piscine, le jardin compose une atmosphère méditerranéenne, végétale et apaisante. Les terrasses permettent de profiter de plusieurs moments dans la journée : baignade, lecture, déjeuner, sieste ou apéritif au coucher du soleil.</p></div>
          <div className="reveal-right grid grid-cols-2 gap-3"><div className="img-zoom aspect-square"><img src={imgs.garden} alt="Jardin méditerranéen" className="w-full h-full object-cover" loading="lazy" /></div><div className="img-zoom aspect-square mt-10"><img src={imgs.terrace} alt="Terrasse et piscine" className="w-full h-full object-cover" loading="lazy" /></div></div>
        </div>
        <div className="reveal border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6">{['Piscine à débordement', 'Terrain de pétanque', 'Terrasses en travertin', 'Jardin méditerranéen'].map(item => <div key={item}><div className="w-5 h-px bg-bronze mb-3" /><p className="font-body text-[10px] tracking-[0.18em] uppercase text-white/45">{item}</p></div>)}</div>
      </div>
    </section>
  )
}

function GallerySection() {
  const gallery = [
    { img: imgs.exterior1, alt: 'Extérieur de la villa' },
    { img: imgs.salon, alt: 'Salon' },
    { img: imgs.cuisine, alt: 'Cuisine ouverte' },
    { img: imgs.dining, alt: 'Salle à manger' },
    { img: imgs.exterior2, alt: 'Piscine' },
    { img: imgs.terrace, alt: 'Terrasse' },
  ]
  return (
    <section id="galerie" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20"><Label num="05" text="Galerie" /><Title>Intérieur<br /><em>& extérieur</em></Title></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{gallery.map((g, i) => <div key={g.alt} className={`reveal-scale reveal-delay-${Math.min(i + 1, 6)} img-zoom aspect-[4/3]`}><img src={g.img} alt={g.alt} className="w-full h-full object-cover" loading="lazy" /></div>)}</div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  return (
    <section id="art-de-vivre" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal mb-14 lg:mb-20"><Label num="06" text="Art de vivre" /><Title>Les instants<br /><em>provençaux</em></Title></div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="reveal-left img-zoom aspect-[3/4]"><img src={imgs.breakfast} alt="Petit-déjeuner au soleil" className="w-full h-full object-cover" loading="lazy" /></div>
          <div className="reveal img-zoom aspect-[3/4]"><img src={imgs.lunch} alt="Déjeuner en terrasse" className="w-full h-full object-cover" loading="lazy" /></div>
          <div className="reveal-right bg-travertin p-10 lg:p-12 flex flex-col justify-center"><p className="font-display font-light italic text-charbon leading-[1.35]" style={{ fontSize: 'clamp(22px, 2.8vw, 34px)' }}>Une terrasse au soleil, un déjeuner dehors, le calme du jardin et le Golfe de Saint-Tropez à portée de main.</p></div>
        </div>
      </div>
    </section>
  )
}

function ExploreSection() {
  const destinations = [
    { name: 'Grimaud', desc: 'Village provençal, ruelles et marchés', dist: '5 min' },
    { name: 'Port-Grimaud', desc: 'Canaux, restaurants et accès mer', dist: '10 min' },
    { name: 'Saint-Tropez', desc: 'Port, boutiques et place des Lices', dist: '15 min' },
  ]
  return (
    <section id="explorer" className="py-32 lg:py-44 bg-travertin">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="reveal flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 lg:mb-20 gap-6"><div><Label num="07" text="Explorer" /><Title>Aux portes du<br /><em>Golfe de Saint-Tropez</em></Title></div><p className="font-body font-light text-taupe text-[14px] leading-relaxed lg:max-w-[260px]">Une adresse idéale entre village, plages, vignobles et vie tropézienne.</p></div>
        <div className="grid md:grid-cols-3 gap-8">{destinations.map((d, i) => <div key={d.name} className={`reveal reveal-delay-${i + 1}`}><div className="w-7 h-px bg-bronze mb-5" /><h3 className="font-display font-light text-charbon text-[26px] mb-2">{d.name}</h3><p className="font-body font-light text-taupe text-[14px] mb-3">{d.desc}</p><p className="font-body text-[9.5px] tracking-[0.18em] uppercase text-bronze">{d.dist}</p></div>)}</div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [fields, setFields] = useState({ name: '', email: '', phone: '', arrival: '', departure: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSending(true)
    try { await fetch('/contact-form.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode({ 'form-name': 'contact', ...fields }) }) } catch {}
    setSending(false); setSubmitted(true)
  }
  const inputClass = 'w-full border-b border-travertin bg-transparent py-3.5 font-body font-light text-charbon text-[14px] focus:border-bronze outline-none transition-colors duration-300 placeholder:text-taupe/40'
  return (
    <section id="contact" className="py-32 lg:py-44 bg-ivory">
      <div className="max-w-[1440px] mx-auto px-7 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-28">
          <div className="reveal"><Label num="08" text="Contact" /><Title>Réservez<br /><em>votre séjour</em></Title><Divider /><p className="font-body font-light text-taupe leading-[2.1] text-[15px] mb-10">Villa Les Palmiers<br />Grimaud · Golfe de Saint-Tropez · France</p><div className="img-zoom aspect-[4/3]"><img src={imgs.provence} alt="Golfe de Saint-Tropez" className="w-full h-full object-cover" loading="lazy" /></div></div>
          <div className="reveal-right">
            {submitted ? <div className="h-full flex flex-col justify-center py-16"><div className="w-10 h-px bg-bronze mb-8" /><h3 className="font-display font-light text-charbon mb-5 leading-[1.1]" style={{ fontSize: 'clamp(36px, 4vw, 50px)' }}>Merci pour votre<br /><em>message</em></h3><p className="font-body font-light text-taupe text-[15px] leading-relaxed">Nous revenons vers vous dans les plus brefs délais.</p></div> :
            <form onSubmit={handleSubmit} className="space-y-7"><input type="hidden" name="form-name" value="contact" /><div className="grid grid-cols-2 gap-7"><div><label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Nom</label><input type="text" name="name" value={fields.name} onChange={handleChange} required className={inputClass} placeholder="Votre nom" /></div><div><label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Email</label><input type="email" name="email" value={fields.email} onChange={handleChange} required className={inputClass} placeholder="votre@email.com" /></div></div><div><label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Téléphone</label><input type="tel" name="phone" value={fields.phone} onChange={handleChange} className={inputClass} placeholder="+33 ..." /></div><div className="grid grid-cols-2 gap-7"><div><label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Arrivée</label><input type="date" name="arrival" value={fields.arrival} onChange={handleChange} className={inputClass} /></div><div><label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Départ</label><input type="date" name="departure" value={fields.departure} onChange={handleChange} className={inputClass} /></div></div><div><label className="block font-body text-[9.5px] tracking-[0.22em] uppercase text-bronze mb-2.5">Message</label><textarea name="message" value={fields.message} onChange={handleChange} rows={5} className={`${inputClass} resize-none`} placeholder="Vos dates, questions ou souhaits particuliers..." /></div><button type="submit" disabled={sending} className="w-full py-4 bg-charbon text-ivory font-body text-[10px] tracking-[0.22em] uppercase hover:bg-bronze transition-colors duration-300 disabled:opacity-50">{sending ? 'Envoi en cours...' : 'Envoyer la demande'}</button></form>}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-charbon"><div className="max-w-[1440px] mx-auto px-7 lg:px-16 py-16 lg:py-20"><div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 pb-12 border-b border-white/10"><div><p className="font-display text-white text-[22px] tracking-wide mb-1.5">Villa Les Palmiers</p><p className="font-body text-[9.5px] tracking-[0.25em] uppercase text-bronze">Grimaud · Golfe de Saint-Tropez</p></div><a href="#contact" className="font-body text-[9.5px] tracking-[0.18em] uppercase text-white/40 hover:text-bronze transition-colors">Contact & réservation</a></div><p className="font-body text-[9.5px] tracking-[0.1em] text-white/25 pt-8">© 2026 Villa Les Palmiers. Tous droits réservés.</p></div></footer>
  )
}

function VillaPage() {
  const scrolled = useScrolled()
  useScrollReveal()
  return (
    <div className="min-h-screen bg-ivory">
      <Navigation scrolled={scrolled} />
      <Hero />
      <HighlightsBar />
      <VillaSection />
      <InteriorsSection />
      <BedroomsSection />
      <GardenSection />
      <GallerySection />
      <ExperienceSection />
      <ExploreSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export const Route = createFileRoute('/')({ component: VillaPage })
