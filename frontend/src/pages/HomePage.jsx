import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { getFeaturedProjects } from '../content/projects';
import { SEOHead } from '../components/SEOHead';
import { hero, ctaSection, processSteps, statistics, testimonials } from '../content/site';
import images, { getProjectImage } from '../content/images';
import { useEditable, useEditor, DEFAULT_SECTIONS } from '../contexts/EditorContext';
import { EditableImage } from '../components/EditableImage';
import { useLanguage } from '../contexts/LanguageContext';
import { KeywordStory } from '../components/KeywordStory';
import { LayoutSection, LayoutContainer } from '../components/editor/LayoutSection';

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
        <span className="text-base md:text-lg font-medium pr-8" style={{ color: C.text }}>{q}</span>
        <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
          style={{ background: isOpen ? C.accent : 'transparent', border: `1.5px solid ${isOpen ? C.accent : C.border}` }}
        >
          {isOpen ? <Minus className="w-3.5 h-3.5" style={{ color: '#fff' }} /> : <Plus className="w-3.5 h-3.5" style={{ color: C.muted }} />}
        </span>
      </button>
      <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
        <p className="pb-7 pr-12 text-[15px] leading-relaxed" style={{ color: C.muted }}>{a}</p>
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
          <EditableImage contentKey={contentKey} fallbackSrc={src} alt={alt} className="w-full h-full" imgClassName="object-cover" />
        ) : (
          <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */
/*         SECTION RENDER FUNCTIONS            */
/* ═══════════════════════════════════════════ */

function HeroSection({ heroSubline, heroCta1, heroCta2 }) {
  return (
    <LayoutSection id="hero" className="!pt-0 !pb-0">
      <KeywordStory
        subline={heroSubline}
        ctaLabel={heroCta1}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={heroCta2}
        secondaryHref={hero.ctaSecondary.href}
      />
    </LayoutSection>
  );
}

function TrustBarSection({ trustBarItems }) {
  return (
    <LayoutSection id="trustbar" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <LayoutContainer id="trustbar">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {trustBarItems.map((stat, i) => (
            <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="text-center">
              <div className="text-4xl md:text-5xl font-semibold tracking-[-0.03em]" style={{ color: C.text }}>{stat.value}</div>
              <div className="mt-2 text-[13px] font-medium" style={{ color: C.muted }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </LayoutContainer>
    </LayoutSection>
  );
}

function ServicesSection({ sectionLabel, sectionTitle, serviceItems }) {
  return (
    <LayoutSection id="services">
      <LayoutContainer id="services">
        <motion.div {...revealSlow} className="mb-24 md:mb-36">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>{sectionLabel}</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.1]">{sectionTitle}</h2>
        </motion.div>
        <div className="space-y-40 md:space-y-56 lg:space-y-72">
          {serviceItems.map((svc, i) => (
            <motion.article 
              key={i} 
              {...reveal} 
              transition={{ ...reveal.transition, delay: 0.1 }}
              className="relative"
            >
              {/* Visual separator line */}
              {i > 0 && (
                <div className="absolute -top-20 md:-top-28 lg:-top-36 left-0 right-0 flex justify-center">
                  <div className="w-px h-12 md:h-16" style={{ background: `linear-gradient(to bottom, transparent, ${C.border}, transparent)` }} />
                </div>
              )}
              
              <div className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                {/* Image - takes 7 columns for dominance */}
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <ParallaxImage 
                    src={svc.image} 
                    alt={svc.title} 
                    contentKey={`services.${i}.image`} 
                    aspectClass="aspect-[16/10]"
                  />
                </div>
                
                {/* Content - takes 5 columns */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${i % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>{svc.label}</p>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-[-0.02em] leading-[1.15] mb-6">{svc.title}</h3>
                  <p className="text-base leading-relaxed mb-8" style={{ color: C.muted }}>{svc.desc}</p>
                  <ul className="space-y-3 mb-10">
                    {svc.features.map((feat, fi) => (
                      <li key={fi} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.light }} />
                        <span className="text-[15px]" style={{ color: C.muted }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={svc.href} className="inline-flex items-center gap-2 text-[14px] font-medium group" style={{ color: C.text }}>
                    Mehr erfahren <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </LayoutContainer>
    </LayoutSection>
  );
}

function ShowcaseSection() {
  return (
    <LayoutSection id="showcase">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <motion.div {...revealSlow}>
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
            <EditableImage contentKey="images.hero.src" fallbackSrc="/images/Header_Porsche_HD.webp" alt="VISUWORKS Premium Qualität" className="w-full h-full" imgClassName="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-end p-8 md:p-14">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }}>
                <p className="text-white/70 text-[12px] font-semibold uppercase tracking-[0.15em] mb-2">Premium Qualität</p>
                <h3 className="text-2xl md:text-4xl font-semibold text-white tracking-[-0.02em]">Kompromisslos in jedem Detail.</h3>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </LayoutSection>
  );
}

function ProjectsSection({ featuredProjects }) {
  return (
    <LayoutSection id="projects">
      <LayoutContainer id="projects">
        <motion.div {...revealSlow} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>Portfolio</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]">Ausgewählte Projekte</h2>
          </div>
          <Link to="/projekte" className="inline-flex items-center gap-2 text-[14px] font-medium group" style={{ color: C.text }}>
            Alle Projekte <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-5">
          {featuredProjects.map((project, index) => (
            <motion.div key={project.id} {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }}>
              <Link to={`/projekte/${project.slug}`}>
                <div data-testid={`project-tile-${project.id}`} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer" style={{ background: '#E8E4DD' }}>
                  {(() => { const img = getProjectImage(project.slug); return img ? (<EditableImage contentKey={`images.projects.${project.slug}.thumbnail`} fallbackSrc={img.src} alt={img.alt || project.title} className="absolute inset-0 w-full h-full" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />) : null; })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    <span className="text-[11px] font-semibold text-white/60 uppercase tracking-[0.12em] mb-2">{project.category}</span>
                    <h3 className="text-lg md:text-xl font-semibold text-white tracking-[-0.01em]">{project.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </LayoutContainer>
    </LayoutSection>
  );
}

function ProcessSection({ processItems }) {
  return (
    <LayoutSection id="process" style={{ borderTop: `1px solid ${C.border}` }}>
      <LayoutContainer id="process">
        <motion.div {...revealSlow} className="mb-16 md:mb-24">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>Ablauf</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]">Unser Prozess</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {processItems.map((step, index) => (
            <motion.div key={step.num} {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }}>
              <div className="h-full p-6 rounded-2xl transition-colors duration-300 hover:bg-black/[0.02]">
                <span className="text-5xl font-semibold" style={{ color: 'rgba(0,0,0,0.06)' }}>{step.num}</span>
                <h3 className="text-base font-semibold mt-5 mb-2" style={{ color: C.text }}>{step.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: C.muted }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </LayoutContainer>
    </LayoutSection>
  );
}

function TestimonialsSection({ testimonialItems }) {
  return (
    <LayoutSection id="testimonials" style={{ background: '#EFECE6' }}>
      <LayoutContainer id="testimonials">
        <motion.div {...revealSlow} className="mb-16 md:mb-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>Kundenstimmen</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em]">Was unsere Kunden sagen</h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonialItems.map((t, i) => (
            <motion.div key={i} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}>
              <div className="h-full p-8 md:p-10 rounded-2xl" style={{ background: C.card, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <blockquote className="text-base md:text-lg leading-relaxed mb-8" style={{ color: C.text }}>&bdquo;{t.quote}&ldquo;</blockquote>
                <div>
                  <p className="text-[15px] font-semibold" style={{ color: C.text }}>{t.author}</p>
                  <p className="text-[13px] mt-0.5" style={{ color: C.muted }}>{t.position}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </LayoutContainer>
    </LayoutSection>
  );
}

function FAQSection() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <LayoutSection id="faq">
      <LayoutContainer id="faq">
        <motion.div {...revealSlow} className="text-center mb-16 md:mb-20">
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: C.light }}>FAQ</p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em]">Häufige Fragen</h2>
        </motion.div>
        <motion.div {...reveal}>
          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </motion.div>
      </LayoutContainer>
    </LayoutSection>
  );
}

function CTASection({ ctaHeadline, ctaSubline }) {
  return (
    <LayoutSection id="cta">
      <LayoutContainer id="cta">
        <motion.div {...revealSlow}>
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 lg:p-28 text-center" style={{ background: C.accent }}>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-6">{ctaHeadline}</h2>
            <p className="text-base md:text-lg text-white/60 mb-10 max-w-lg mx-auto leading-relaxed">{ctaSubline}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/kontakt">
                <button data-testid="cta-btn-0" className="inline-flex items-center gap-2 px-8 py-3.5 text-[14px] font-medium rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" style={{ background: '#fff', color: C.accent }}>
                  Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </LayoutContainer>
    </LayoutSection>
  );
}

/* ═══════════════════════════════════════════ */
/*                 HOME PAGE                   */
/* ═══════════════════════════════════════════ */
export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 4);
  const { getValue, getSectionSettings } = useEditor();

  const ctaHeadline = useEditable('cta.headline', ctaSection.headline);
  const ctaSubline = useEditable('cta.subline', ctaSection.subline);

  const trustBarRaw = getValue('trustbar.items', null);
  const trustBarItems = trustBarRaw && Array.isArray(trustBarRaw)
    ? trustBarRaw
    : statistics.map((s, i) => ({
        value: getValue(`stats.${i}.value`, `${s.value}${s.suffix || ''}`),
        label: getValue(`stats.${i}.label`, s.label),
      }));

  const processItems = processSteps.map((step, i) => ({
    ...step,
    title: getValue(`process.${i}.title`, step.title),
    desc: getValue(`process.${i}.desc`, step.desc),
  }));

  const testimonialItems = testimonials.slice(0, 4).map((t, i) => ({
    ...t,
    quote: getValue(`testimonials.${i}.quote`, t.quote),
    author: getValue(`testimonials.${i}.author`, t.author),
    position: getValue(`testimonials.${i}.position`, t.position),
    company: getValue(`testimonials.${i}.company`, t.company),
  }));

  const heroSubline = getValue('hero.subline', hero.subline);
  const heroCta1 = getValue('hero.ctaPrimary.label', hero.ctaPrimary.label);
  const heroCta2 = getValue('hero.ctaSecondary.label', hero.ctaSecondary.label);

  /* ── Services (Was wir tun) CMS binding ── */
  const serviceSectionLabel = getValue('services.sectionLabel', 'Leistungen');
  const serviceSectionTitle = getValue('services.sectionTitle', 'Was wir tun.');
  const serviceItems = services.map((svc, i) => ({
    label: getValue(`services.${i}.label`, svc.label),
    title: getValue(`services.${i}.title`, svc.title),
    desc: getValue(`services.${i}.desc`, svc.desc),
    features: getValue(`services.${i}.features`, svc.features.join(', ')).split(',').map(s => s.trim()).filter(Boolean),
    href: getValue(`services.${i}.href`, svc.href),
    image: svc.image,
  }));

  /* ── Section rendering map ── */
  const sectionMap = {
    hero: <HeroSection heroSubline={heroSubline} heroCta1={heroCta1} heroCta2={heroCta2} />,
    trustbar: <TrustBarSection trustBarItems={trustBarItems} />,
    services: <ServicesSection sectionLabel={serviceSectionLabel} sectionTitle={serviceSectionTitle} serviceItems={serviceItems} />,
    showcase: <ShowcaseSection />,
    projects: <ProjectsSection featuredProjects={featuredProjects} />,
    process: <ProcessSection processItems={processItems} />,
    testimonials: <TestimonialsSection testimonialItems={testimonialItems} />,
    faq: <FAQSection />,
    cta: <CTASection ctaHeadline={ctaHeadline} ctaSubline={ctaSubline} />,
  };

  /* ── Sort sections by order ── */
  const orderedSections = useMemo(() => {
    return DEFAULT_SECTIONS.map(s => ({
      id: s.id,
      order: getSectionSettings?.(s.id)?.order ?? DEFAULT_SECTIONS.findIndex(d => d.id === s.id),
    })).sort((a, b) => a.order - b.order);
  }, [getSectionSettings]);

  return (
    <div data-testid="home-page" style={{ background: C.bg, color: C.text }}>
      <SEOHead page="home" />
      {orderedSections.map(({ id }) => (
        <React.Fragment key={id}>{sectionMap[id]}</React.Fragment>
      ))}
    </div>
  );
}
