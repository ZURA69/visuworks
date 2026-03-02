import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { SEOHead } from '../components/SEOHead';
import { ProjectGridSkeleton } from '../components/Skeleton';

import { projects, categories } from '../content/projects';

export default function ProjektePage() {
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
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <p className="text-sm font-medium text-indigo-300/80 uppercase tracking-wider mb-4">Portfolio</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Projekte & Referenzen
            </h1>
            <p className="text-lg md:text-xl text-white/70">
              Kuratiert. Präzise. Umgesetzt.
            </p>
          </motion.header>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
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
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                        className="group relative aspect-[4/3] rounded-[20px] overflow-hidden bg-[#0A0C14] border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 group-hover:from-indigo-500/20 group-hover:to-purple-500/20 transition-all duration-500" />
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                          <span className="text-xs font-medium text-indigo-300/80 uppercase tracking-wider mb-2">
                            {project.category}
                          </span>
                          <h2 className="text-lg font-bold mb-2">{project.title}</h2>
                          <p className="text-sm text-white/50 mb-3 line-clamp-2">{project.shortDesc}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2.5 py-1 text-xs text-white/50 bg-white/5 rounded-full">
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
      <section className="py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 p-12 md:p-20"
          >
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Ihr Projekt als nächstes?</h2>
              <p className="text-lg text-white/60 mb-10">
                Lassen Sie uns über Ihre Anforderungen sprechen – unverbindlich und persönlich.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/kontakt">
                  <Button size="lg">
                    Projekt besprechen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/kontakt">
                  <Button variant="secondary" size="lg">
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
