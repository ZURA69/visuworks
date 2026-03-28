import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../content/site';

export const Testimonials = ({ className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={`py-28 md:py-40 ${className}`} data-testid="testimonials-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-[11px] font-medium text-[#9A9A9A] uppercase tracking-[0.15em] mb-5">Kundenstimmen</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.03em] text-[#1A1A1A]">Was unsere Kunden sagen</h2>
        </motion.div>

        <div className="relative">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="max-w-4xl mx-auto">
                  <div className="relative p-10 md:p-16 border border-black/[0.06]">
                    <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-[#1A1A1A]/85 leading-relaxed tracking-[-0.02em] mb-10">
                      &bdquo;{testimonials[currentIndex].quote}&ldquo;
                    </blockquote>

                    <div>
                      <p className="font-medium text-base tracking-[-0.01em] text-[#1A1A1A]">{testimonials[currentIndex].author}</p>
                      <p className="text-sm text-[#6B6B6B] mt-1">
                        {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                      </p>
                      <p className="text-[13px] text-[#9A9A9A] mt-2">
                        Projekt: {testimonials[currentIndex].project}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={prev}
              className="p-3 border border-black/[0.08] hover:border-black/[0.15] hover:bg-black/[0.02] transition-all duration-300"
              aria-label="Vorheriges Testimonial"
              data-testid="testimonial-prev"
            >
              <ChevronLeft className="w-4 h-4 text-[#6B6B6B]" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-px transition-all duration-500 ${
                    index === currentIndex 
                      ? 'w-8 bg-[#1A1A1A]/70' 
                      : 'w-4 bg-black/[0.15] hover:bg-black/[0.3]'
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 border border-black/[0.08] hover:border-black/[0.15] hover:bg-black/[0.02] transition-all duration-300"
              aria-label="Nächstes Testimonial"
              data-testid="testimonial-next"
            >
              <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
