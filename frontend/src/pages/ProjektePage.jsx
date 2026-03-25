import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { SEOHead } from '../components/SEOHead';
import { ProjectGridSkeleton } from '../components/Skeleton';

import { projects, categories } from '../content/projects';
import { getProjectImage } from '../content/images';
import { useEditor } from '../contexts/EditorContext';
import { EditableImage } from '../components/EditableImage';

export default function ProjektePage() {
  const { getValue } = useEditor();
  const e = getValue || ((_, fb) => fb);
  const [activeCategory, setActiveCategory] = useState('alle');
  const [isLoading, setIsLoading] = useState(true);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'alle') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Brief loading state on initial mount and category switch
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  return (
    <div data-testid="projekte-page" className="overflow-hidden">
      <SEOHead page="projekte" />

      {/* Hero Section */}
      <section className="relative py-32 md:py-40">
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-20"
          >
            <p className="text-[11px] font-medium text-white/30 uppercase tracking-[0.15em] mb-6">Portfolio</p>
            <h1 data-testid="projekte-hero-title" className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[-0.04em] leading-[0.95] mb-6">
              {e('projekte.heroTitle', 'Projekte & Referenzen')}
            </h1>
            <p className="text-base md:text-lg text-white/45 font-light">
              {e('projekte.heroSubline', 'Kuratiert. Präzise. Umgesetzt.')}
            </p>
          </motion.header>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full max-w-2xl">
              <TabsList className="w-full flex-wrap h-auto gap-2 p-2">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat.value} 
                    value={cat.value}
                    data-testid={`filter-${cat.value}`}
                    className="flex-1 min-w-[80px]"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ProjectGridSkeleton count={6} />
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                role="list"
                aria-label="Projektliste"
              >
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    role="listitem"
                  >
                    <Link to={`/projekte/${project.slug}`}>
                      <div 
                        data-testid={`project-card-${project.id}`}
                        className="group relative aspect-[4/3] overflow-hidden bg-[#0A0C14] border border-white/[0.06] hover:border-white/15 transition-all duration-500 cursor-pointer"
                      >
                        {/* Project Image */}
                        {(() => {
                          const img = getProjectImage(project.slug);
                          return img ? (
                            <EditableImage
                              contentKey={`images.projects.${project.slug}.thumbnail`}
                              fallbackSrc={img.src}
                              alt={img.alt || project.title}
                              className="absolute inset-0 w-full h-full"
                              imgClassName="transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : null;
                        })()}
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/50 to-transparent group-hover:via-[#050507]/40 transition-all duration-700" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6 relative z-10">
                          <span className="text-[11px] font-medium text-white/35 uppercase tracking-[0.1em] mb-2">
                            {project.category}
                          </span>
                          <h2 className="text-lg font-light tracking-[-0.01em] mb-2">{e(`projects.${project.slug}.title`, project.title)}</h2>
                          <p className="text-[13px] text-white/35 mb-3 line-clamp-2">{e(`projects.${project.slug}.shortDesc`, project.shortDesc)}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2.5 py-1 text-[11px] text-white/35 border border-white/[0.08]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* Hover indicator */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <ArrowRight className="w-5 h-5 text-white/50" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-40">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden border border-white/[0.06] p-12 md:p-20 lg:p-28"
          >
            <div className="relative max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em] leading-[1.1] mb-8">Ihr Projekt als nächstes?</h2>
              <p className="text-base text-white/40 mb-12 leading-relaxed font-light max-w-lg">
                Lassen Sie uns über Ihre Anforderungen sprechen – unverbindlich und persönlich.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/kontakt">
                  <Button>
                    Projekt besprechen
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="secondary">
                    Angebot anfordern
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
