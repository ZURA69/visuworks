import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { statistics } from '../content/site';

const CountUp = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const Statistics = ({ className = '' }) => {
  return (
    <section className={`py-28 md:py-40 ${className}`} data-testid="statistics-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.06]">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="p-8 md:p-10 bg-[#F5F2ED] hover:bg-black/[0.02] transition-colors duration-500 text-center">
                <div className="text-4xl md:text-5xl font-extralight tracking-[-0.04em] mb-3 text-[#1A1A1A]">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-medium mb-1 tracking-[-0.01em] text-[#1A1A1A]">{stat.label}</p>
                <p className="text-[13px] text-[#9A9A9A]">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
