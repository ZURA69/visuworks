import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { getFeaturedProjects } from '../content/projects';
import { SEOHead } from '../components/SEOHead';
import { hero, ctaSection, processSteps, statistics, testimonials } from '../content/site';
import images, { getProjectImage } from '../content/images';
import { useEditable } from '../contexts/EditorContext';
import { EditableImage } from '../components/EditableImage';
import { useLanguage } from '../contexts/LanguageContext';
import { KeywordStory } from '../components/KeywordStory';

/* ─── Palette ─── */
const C = {
  bg: '#F5F2ED',
  card: '#FFFFFF',
  text: '#1A1A1A',
  muted: '#6B6B6B',
  light: '#9A9A9A',
  border: 'rgba(0,0,0,0.07)',
  accent: '#1A1A1A',
};

/* ─── Shared animation presets ─── */
const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const revealSlow = {
  ...reveal,
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
};

/* ─── Services data ─── */
const services = [
  {
    label: 'Mobilität',
    title: 'Fahrzeuge, die auffallen.',
    desc: 'Von der Lackschutzfolie bis zum kompletten Flottenbranding — wir realisieren Ihre Fahrzeugprojekte mit Präzision und Premium-Qualität.',
    image: '/images/porsche-gt3-cup-race.webp',
    href: '/mobilitaet',
    features: ['PPF & Lackschutz', 'Flottenbranding', 'Teil- & Vollfolierung', 'Designkonzepte'],
  },
  {
    label: 'Raum & Architektur',
    title: 'Räume, die wirken.',
    desc: 'Wir transformieren Räume in Markenerlebnisse — durch Architekturfolierung, Glasgestaltung und Interior Branding.',
    image: '/images/IMG_5646.webp',
    href: '/architektur-raum',
    features: ['Raumgestaltung', 'Architekturfolierung', 'Glas- & Sichtschutzfolien', 'Interior Branding'],
  },
  {
    label: 'Markenkommunikation',
    title: 'Botschaften, die ankommen.',
    desc: 'Von der Messewand bis zur Fassadenwerbung — wir produzieren und installieren Ihre Markenkommunikation in jeder Größe.',
    image: '/images/IMG_7190.webp',
    href: '/markenkommunikation',
    features: ['Großformatmedien', 'Werbesysteme', 'Event- & Messegrafik', 'POS-Systeme'],
  },
];

/* ─── FAQ data ─── */
const faqs = [
  { q: 'Was kostet eine Fahrzeugfolierung?', a: 'Die Kosten variieren je nach Fahrzeugtyp und Umfang. Eine Teilfolierung beginnt bei ca. 800 €, eine Vollfolierung ab ca. 2.500 €. Wir erstellen Ihnen gerne ein individuelles Angebot.' },
  { q: 'Wie lange dauert ein typisches Projekt?', a: 'Fahrzeugprojekte dauern in der Regel 3–7 Werktage. Raum- und Architekturprojekte planen wir mit 2–8 Wochen. Express-Optionen sind bei Bedarf verfügbar.' },
  { q: 'Arbeiten Sie auch außerhalb von NRW?', a: 'Ja, unsere mobilen Teams sind europaweit im Einsatz. Wir realisieren Projekte in ganz Deutschland und im angrenzenden Ausland.' },
  { q: 'Bieten Sie auch Designleistungen an?', a: 'Absolut. Von der Konzeptentwicklung über Visualisierungen bis zur produktionsreifen Reinzeichnung — alles aus einer Hand.' },
  { q: 'Wie läuft die Zusammenarbeit ab?', a: 'Nach einem kurzen Briefing erstellen wir ein Konzept und Angebot. Nach Freigabe starten wir mit Produktion und termingerechter Montage. Qualitätskontrolle inklusive.' },
];

/* ─── FAQ Accordion Item ─── */
function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 md:py-7 text-left cursor-pointer group"
        data-testid={`faq-toggle-${q.slice(0, 20).replace(/\s/g, '-')}`}
      >
        <span className="text-base md:text-lg font-medium pr-8" style={{ color: C.text }}>
          {q}
        </span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
          style={{ background: isOpen ? C.accent : 'transparent', border: `1.5px solid ${isOpen ? C.accent : C.border}` }}
        >
          {isOpen 
            ? <Minus className="w-3.5 h-3.5" style={{ color: '#fff' }} /> 
            : <Plus className="w-3.5 h-3.5" style={{ color: C.muted }} />
          }
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-7 pr-12 text-[15px] leading-relaxed" style={{ color: C.muted }}>
          {a}
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Parallax Image Wrapper ─── */
function ParallaxImage({ src, alt, className = '', contentKey, aspectClass = 'aspect-[4/3]' }) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div className={`overflow-hidden rounded-2xl ${aspectClass} ${className}`}>
      <motion.div style={{ y }} className="w-full h-[115%] -mt-[7.5%]">
        {contentKey ? (
          <EditableImage
            contentKey={contentKey}
            fallbackSrc={src}
            alt={alt}
            className="w-full h-full"
            imgClassName="object-cover"
          />
        ) : (
          <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*                 HOME PAGE                   */
/* ═══════════════════════════════════════════ */
export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const [openFaq, setOpenFaq] = useState(null);

  const ctaHeadline = useEditable('cta.headline', ctaSection.headline);
  const ctaSubline = useEditable('cta.subline', ctaSection.subline);

  return (
    <div data-testid="home-page" style={{ background: C.bg, color: C.text }}>
      <SEOHead page="home" />

      {/* ═══ KEYWORD HERO ═══ */}
      <KeywordStory
        subline={hero.subline}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={hero.ctaSecondary.label}
        secondaryHref={hero.ctaSecondary.href}
      />

      {/* ═══ TRUST BAR ═══ */}
      <section className="py-16 md:py-20" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {statistics.map((stat, i) => (
              <motion.div key={stat.label} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="text-center">
                <div className="text-4xl md:text-5xl font-semibold tracking-[-0.03em]" style={{ color: C.text }}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="mt-2 text-[13px] font-medium" style={{ color: C.muted }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES — Alternating Layout ═══ */}
      <section data-testid="services-section" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div {...revealSlow} className="mb-20 md:mb-28">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>
              Leistungen
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.1]">
              Was wir tun.
            </h2>
          </motion.div>

          <div className="space-y-24 md:space-y-36">
            {services.map((svc, i) => (
              <motion.div key={svc.label} {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                  {/* Image */}
                  <div className={i % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                    <ParallaxImage
                      src={svc.image}
                      alt={svc.title}
                      contentKey={`images.service.${svc.label.toLowerCase().replace(/[^a-z]/g, '')}.hero`}
                    />
                  </div>
                  {/* Content */}
                  <div className={`flex flex-col justify-center ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>
                      {svc.label}
                    </p>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[-0.02em] leading-[1.15] mb-5">
                      {svc.title}
                    </h3>
                    <p className="text-base leading-relaxed mb-8" style={{ color: C.muted }}>
                      {svc.desc}
                    </p>
                    <ul className="space-y-3 mb-10">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.light }} />
                          <span className="text-[15px]" style={{ color: C.muted }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={svc.href} className="inline-flex items-center gap-2 text-[14px] font-medium group" style={{ color: C.text }}>
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VISUAL SHOWCASE — Full-Width ═══ */}
      <section className="py-8 md:py-12">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <motion.div {...revealSlow}>
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
              <EditableImage
                contentKey="images.hero.src"
                fallbackSrc="/images/Header_Porsche_HD.webp"
                alt="VISUWORKS Premium Qualität"
                className="w-full h-full"
                imgClassName="object-cover"
              />
              {/* Subtle gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-end p-8 md:p-14">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  <p className="text-white/70 text-[12px] font-semibold uppercase tracking-[0.15em] mb-2">Premium Qualität</p>
                  <h3 className="text-2xl md:text-4xl font-semibold text-white tracking-[-0.02em]">
                    Kompromisslos in jedem Detail.
                  </h3>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ PROJECTS PREVIEW ═══ */}
      <section data-testid="projects-preview-section" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div {...revealSlow} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>
                Portfolio
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]">
                Ausgewählte Projekte
              </h2>
            </div>
            <Link to="/projekte" className="inline-flex items-center gap-2 text-[14px] font-medium group" style={{ color: C.text }}>
              Alle Projekte
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                {...reveal}
                transition={{ ...reveal.transition, delay: index * 0.08 }}
              >
                <Link to={`/projekte/${project.slug}`}>
                  <div
                    data-testid={`project-tile-${project.id}`}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                    style={{ background: '#E8E4DD' }}
                  >
                    {(() => {
                      const img = getProjectImage(project.slug);
                      return img ? (
                        <EditableImage
                          contentKey={`images.projects.${project.slug}.thumbnail`}
                          fallbackSrc={img.src}
                          alt={img.alt || project.title}
                          className="absolute inset-0 w-full h-full"
                          imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                        />
                      ) : null;
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <span className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.12em] mb-2">
                        {project.category}
                      </span>
                      <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section data-testid="process-section" className="py-24 md:py-36" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div {...revealSlow} className="mb-16 md:mb-24">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>
              Ablauf
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]">
              Unser Prozess
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <motion.div key={step.num} {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }}>
                <div className="h-full p-6 rounded-2xl transition-colors duration-300 hover:bg-black/[0.02]">
                  <span className="text-5xl font-semibold" style={{ color: 'rgba(0,0,0,0.06)' }}>
                    {step.num}
                  </span>
                  <h3 className="text-base font-semibold mt-5 mb-2" style={{ color: C.text }}>
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed" style={{ color: C.muted }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section data-testid="testimonials-section" className="py-24 md:py-36" style={{ background: '#EFECE6' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div {...revealSlow} className="mb-16 md:mb-20">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>
              Kundenstimmen
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]">
              Was unsere Kunden sagen
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.slice(0, 4).map((t, i) => (
              <motion.div key={t.id} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
                <div className="h-full p-8 md:p-10 rounded-2xl" style={{ background: C.card, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <blockquote className="text-base md:text-lg leading-relaxed mb-8" style={{ color: C.text }}>
                    &bdquo;{t.quote}&ldquo;
                  </blockquote>
                  <div>
                    <p className="text-[15px] font-semibold" style={{ color: C.text }}>{t.author}</p>
                    <p className="text-[13px] mt-0.5" style={{ color: C.muted }}>
                      {t.position}, {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section data-testid="faq-section" className="py-24 md:py-36">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div {...revealSlow} className="text-center mb-16 md:mb-20">
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>
              FAQ
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">
              Häufige Fragen
            </h2>
          </motion.div>

          <motion.div {...reveal}>
            <div style={{ borderTop: `1px solid ${C.border}` }}>
              {faqs.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section data-testid="cta-section" className="py-24 md:py-36">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div {...revealSlow}>
            <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 lg:p-28 text-center" style={{ background: C.accent }}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-6">
                {ctaHeadline}
              </h2>
              <p className="text-base md:text-lg text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">
                {ctaSubline}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/kontakt">
                  <button
                    data-testid="cta-btn-0"
                    className="inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-medium rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: '#fff', color: C.accent }}
                  >
                    Kontakt aufnehmen
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
