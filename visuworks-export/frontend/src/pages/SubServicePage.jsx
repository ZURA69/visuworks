import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SEOHead } from '../components/SEOHead';
import { subservices } from '../content/services';

export default function SubServicePage() {
  const { slug } = useParams();
  const data = subservices[slug];

  if (!data) return <Navigate to="/" replace />;

  return (
    <div data-testid={`subservice-${slug}-page`} className="overflow-hidden">
      <SEOHead
        page="home"
        customTitle={`${data.title} | ${data.parent} | VISUWORKS`}
        customDescription={data.description.slice(0, 155)}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-black/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-black/[0.02] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-[#9A9A9A] mb-8"
          >
            <Link to="/" className="hover:text-[#6B6B6B] transition-colors">Start</Link>
            <span>/</span>
            <Link to={data.parentHref} className="hover:text-[#6B6B6B] transition-colors">{data.parent}</Link>
            <span>/</span>
            <span className="text-[#1A1A1A]/70">{data.title}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link
                to={data.parentHref}
                className="inline-flex items-center gap-2 text-sm text-[#9A9A9A] hover:text-[#9A9A9A] transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                {data.parent}
              </Link>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
                {data.title}
              </h1>
              <p className="text-lg text-[#6B6B6B] mb-6">{data.subtitle}</p>
              <p className="text-base text-[#1A1A1A]/70 leading-relaxed mb-8">{data.description}</p>

              <Link to="/kontakt">
                <Button size="lg" data-testid="subservice-cta">
                  Projekt anfragen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              {data.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  className="p-5 rounded-[18px] bg-black/[0.02] border border-black/[0.07] hover:border-black/[0.15] transition-all duration-300"
                >
                  <h3 className="text-base font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-black/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-medium text-[#9A9A9A] uppercase tracking-wider mb-4">Einsatzbereiche</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Typische Anwendungen</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.applications.map((app, i) => (
              <motion.div
                key={app}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-5 rounded-[16px] bg-black/[0.02] border border-black/[0.07]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#1A1A1A] flex-shrink-0" />
                <span className="text-sm font-medium">{app}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-black/[0.07] p-12 md:p-20"
          >
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-black/[0.03] rounded-full blur-[100px]" />
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Interesse an {data.title}?
              </h2>
              <p className="text-lg text-[#6B6B6B] mb-10">
                Wir beraten Sie gerne und erstellen ein unverbindliches Angebot für Ihr Projekt.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/kontakt">
                  <Button size="lg">
                    Unverbindlich anfragen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/projekte">
                  <Button variant="secondary" size="lg">Referenzen ansehen</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
