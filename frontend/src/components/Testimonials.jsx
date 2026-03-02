import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: 'Die Zusammenarbeit mit VISUWORKS war von Anfang bis Ende professionell. Unser Flottenbranding wurde termingerecht und in höchster Qualität umgesetzt. Absolut empfehlenswert.',
    author: 'Thomas M.',
    position: 'Flottenmanager',
    company: 'Logistik-Konzern',
    rating: 5,
    project: 'Flottenbranding 50+ Fahrzeuge'
  },
  {
    id: 2,
    quote: 'VISUWORKS hat unseren Showroom komplett transformiert. Die Glasfolierungen und das Leitsystem sind perfekt auf unsere Marke abgestimmt. Unsere Kunden sind begeistert.',
    author: 'Sandra K.',
    position: 'Marketing-Leiterin',
    company: 'Premium-Autohaus',
    rating: 5,
    project: 'Showroom-Gestaltung'
  },
  {
    id: 3,
    quote: 'Der Messestand auf der IAA war ein voller Erfolg. Die Qualität der Grafiken und die Koordination des gesamten Projekts waren erstklassig. Wir planen bereits den nächsten Auftritt.',
    author: 'Michael B.',
    position: 'Event-Manager',
    company: 'Automobilzulieferer',
    rating: 5,
    project: 'Messestand IAA 800m²'
  },
  {
    id: 4,
    quote: 'Mein Porsche ist nun perfekt geschützt. Die PPF-Folierung ist unsichtbar und die Verarbeitung makellos. Das Team hat sich wirklich Zeit genommen für jedes Detail.',
    author: 'Andreas W.',
    position: 'Privatkunde',
    company: 'Düsseldorf',
    rating: 5,
    project: 'PPF Vollschutz'
  },
];

export const Testimonials = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className={`py-24 md:py-32 ${className}`} data-testid="testimonials-section">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Kundenstimmen</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Was unsere Kunden sagen</h2>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="relative p-8 md:p-12 rounded-[28px] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10">
                    {/* Quote Icon */}
                    <div className="absolute -top-4 left-8 w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                      <Quote className="w-6 h-6 text-indigo-400" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-6 justify-center">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed text-center mb-8">
                      „{testimonials[currentIndex].quote}"
                    </blockquote>

                    {/* Author */}
                    <div className="text-center">
                      <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                      <p className="text-white/60">
                        {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                      </p>
                      <p className="text-sm text-indigo-300/70 mt-2">
                        Projekt: {testimonials[currentIndex].project}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              aria-label="Vorheriges Testimonial"
              data-testid="testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'w-8 bg-indigo-500' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              aria-label="Nächstes Testimonial"
              data-testid="testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
