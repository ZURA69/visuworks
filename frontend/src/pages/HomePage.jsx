import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Car, Building2, Megaphone, Palette, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { getFeaturedProjects } from '../content/projects';
import { ClientLogos } from '../components/ClientLogos';
import { Statistics } from '../components/Statistics';
import { Testimonials } from '../components/Testimonials';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { SEOHead } from '../components/SEOHead';
import { hero, ctaSection, processSteps, targetAudiences, valueProposition } from '../content/site';
import images, { getProjectImage } from '../content/images';
import { useEditable } from '../contexts/EditorContext';
import { EditableImage } from '../components/EditableImage';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const serviceIcons = { Car, Building2, Megaphone, Palette };

const services = [
  {
    icon: 'Car',
    title: 'Mobilität',
    description: 'Fahrzeugveredelung & Schutz',
    features: ['PPF & Schutzfolien', 'Flottenbranding', 'Teil-/Vollfolierung', 'Designentwicklung'],
    href: '/mobilitaet',
    bgImage: '/images/porsche-gt3-cup-race.webp',
  },
  {
    icon: 'Building2',
    title: 'Raum & Architektur',
    description: 'Markenräume und Oberflächen',
    features: ['Raumgestaltung', 'Architekturfolierung', 'Glas- & Sichtschutzfolien', 'Interior Branding'],
    href: '/architektur-raum',
    bgImage: '/images/IMG_5646.webp',
  },
  {
    icon: 'Megaphone',
    title: 'Markenkommunikation',
    description: 'Großformat, Systeme, Event',
    features: ['Großformatmedien', 'Werbesysteme', 'Event- & Messegrafik', 'POS-Systeme'],
    href: '/markenkommunikation',
    bgImage: '/images/IMG_7190.webp',
  },
  {
    icon: 'Palette',
    title: 'Design & Konzeption',
    description: 'Leitlinien, die sich umsetzen lassen',
    features: ['Designkonzepte', 'Visuelle Leitlinien', 'Produktionsvorbereitung', 'Markenbegleitung'],
    href: '/design-konzepte',
    bgImage: '/images/IMG_7057.webp',
  }
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects().slice(0, 6);
  
  // Editable content (falls back to content files when editor is not active)
  const heroHeadline = useEditable('hero.headline', hero.headline);
  const heroSubline = useEditable('hero.subline', hero.subline);
  const heroCta1 = useEditable('hero.ctaPrimary.label', hero.ctaPrimary.label);
  const heroCta2 = useEditable('hero.ctaSecondary.label', hero.ctaSecondary.label);
  const heroImg = useEditable('images.hero.src', images.hero.src);
  const ctaHeadline = useEditable('cta.headline', ctaSection.headline);
  const ctaSubline = useEditable('cta.subline', ctaSection.subline);
  
  return (
    <div data-testid="home-page" className="overflow-hidden">
      <SEOHead page="home" />
      {/* Hero Section */}
      <section data-testid="hero-section" className="relative min-h-[90vh] md:min-h-screen flex items-center" aria-label="Hero">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <EditableImage
            contentKey="images.hero.src"
            fallbackSrc={images.hero.src}
            alt={images.hero.alt}
            className="w-full h-full object-cover object-center"
            style={{ objectPosition: 'center center' }}
            priority
          />
        </div>
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-[#050507]/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/30" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-32 md:py-40 w-full">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[-0.04em] leading-[0.95]"
            >
              {heroHeadline}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-8 text-base md:text-lg text-white/55 max-w-lg leading-relaxed font-light"
            >
              {heroSubline}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
              <Link to={hero.ctaPrimary.href}>
                <Button data-testid="hero-cta-primary" size="lg">
                  {heroCta1}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to={hero.ctaSecondary.href}>
                <Button data-testid="hero-cta-secondary" variant="secondary" size="lg">
                  {heroCta2}
                </Button>
              </Link>
            </motion.div>
            {/* Tags */}
            <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap gap-3">
              {hero.tags.map((tag) => (
                <Link
                  key={tag.label}
                  to={tag.href}
                  className="px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.05em] text-white/40 border border-white/10 hover:text-white/70 hover:border-white/20 transition-all duration-300"
                >
                  {tag.label}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section data-testid="value-proposition-section" className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em] leading-[1.1] mb-6">
              {valueProposition.headline}
            </h2>
            <p className="text-base text-white/45 max-w-xl leading-relaxed font-light">
              {valueProposition.subline}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] mb-16">
            {valueProposition.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-5 p-8 md:p-10 bg-[#050507] hover:bg-white/[0.02] transition-colors duration-500"
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-white/30" />
                </div>
                <div>
                  <h3 className="font-medium text-white/90 mb-2 tracking-[-0.01em]">{benefit.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to={valueProposition.cta.href}>
              <Button variant="secondary">
                {valueProposition.cta.label}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 md:py-28 border-y border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <ClientLogos />
        </div>
      </section>

      {/* Services Section */}
      <section data-testid="services-section" className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Leistungen</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Klar strukturiert</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={service.href}>
                  <Card 
                    data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="group relative h-full overflow-hidden border-white/[0.06] hover:border-white/15 transition-all duration-500"
                    style={{
                      backgroundImage: `url(${service.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-[#050507]/75 group-hover:bg-[#050507]/65 transition-all duration-700 z-[1]" />
                    
                    <CardContent className="relative p-8 md:p-10 space-y-6 z-[2]">
                      <div className="w-10 h-10 flex items-center justify-center border border-white/15 group-hover:border-white/25 transition-colors duration-500">
                        {React.createElement(serviceIcons[service.icon], { className: 'w-5 h-5 text-white/60' })}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-light tracking-[-0.02em] mb-2">{service.title}</h3>
                        <p className="text-sm text-white/40 font-light">{service.description}</p>
                      </div>
                      <ul className="space-y-2.5">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-[13px] text-white/45">
                            <div className="w-1 h-1 bg-white/30 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.05em] text-white/40 group-hover:text-white/70 transition-colors duration-500">
                        Mehr erfahren
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section data-testid="projects-preview-section" className="py-28 md:py-40 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
          >
            <div>
              <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Portfolio</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Ausgewählte Projekte</h2>
            </div>
            <Link to="/projekte">
              <Button variant="secondary">
                Alle Projekte
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <Link to={`/projekte/${project.slug}`}>
                  <div data-testid={`project-tile-${project.id}`} className="group relative aspect-[4/3] overflow-hidden bg-[#0A0C14] border border-white/[0.06] hover:border-white/15 transition-all duration-500">
                    {/* Project Image */}
                    {(() => {
                      const img = getProjectImage(project.slug);
                      return img ? (
                        <EditableImage
                          contentKey={`images.projects.${project.slug}.thumbnail`}
                          fallbackSrc={img.src}
                          alt={img.alt || project.title}
                          className="absolute inset-0 w-full h-full"
                          imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : null;
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/50 to-transparent group-hover:via-[#050507]/40 transition-all duration-700" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 relative z-10">
                      <span className="text-[11px] font-medium text-white/35 uppercase tracking-[0.1em] mb-2">{project.category}</span>
                      <h3 className="text-lg font-light tracking-[-0.01em] mb-3">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2.5 py-1 text-[11px] text-white/35 border border-white/[0.08]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section data-testid="process-section" className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Ablauf</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Unser Prozess</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06]">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/prozess/${step.slug}`}>
                  <div className="p-8 bg-[#050507] h-full hover:bg-white/[0.02] transition-all duration-500 group cursor-pointer">
                    <span className="text-4xl font-extralight text-white/[0.08] tracking-[-0.04em]">{step.num}</span>
                    <h3 className="text-base font-medium mt-5 mb-2 group-hover:text-white transition-colors duration-500">{step.title}</h3>
                    <p className="text-[13px] text-white/35 leading-relaxed">{step.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences Section */}
      <section data-testid="audiences-section" className="py-28 md:py-40 border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-5">Zielgruppen</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em]">Für wen wir arbeiten</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
            {targetAudiences.map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="h-full p-8 md:p-10 bg-[#050507] hover:bg-white/[0.02] transition-colors duration-500">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium tracking-[-0.01em] mb-1">{audience.title}</h3>
                    <p className="text-[13px] text-white/35">{audience.focus}</p>
                  </div>
                  <ul className="space-y-3">
                    {audience.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[13px] text-white/45">
                        <div className="w-1 h-1 bg-white/25 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />

      {/* Testimonials Section */}
      <Testimonials className="bg-white/[0.02]" />

      {/* Newsletter Section */}
      <NewsletterSignup />

      {/* CTA Section */}
      <section data-testid="cta-section" className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden border border-white/[0.06] p-12 md:p-20 lg:p-28"
          >
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em] leading-[1.1] mb-8">
                {ctaHeadline}
              </h2>
              <p className="text-base text-white/40 mb-12 leading-relaxed font-light max-w-lg">
                {ctaSubline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {ctaSection.buttons.map((btn, i) => (
                  <Link key={i} to={btn.href}>
                    <Button data-testid={`cta-btn-${i}`} variant={btn.variant}>
                      {btn.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
