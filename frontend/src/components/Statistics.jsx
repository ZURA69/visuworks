import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, Users, Award, Globe } from 'lucide-react';

const stats = [
  { 
    icon: TrendingUp,
    value: 500, 
    suffix: '+', 
    label: 'Projekte',
    description: 'erfolgreich umgesetzt'
  },
  { 
    icon: Users,
    value: 15, 
    suffix: '', 
    label: 'Jahre Erfahrung',
    description: 'im Premium-Segment'
  },
  { 
    icon: Award,
    value: 98, 
    suffix: '%', 
    label: 'Kundenzufriedenheit',
    description: 'basierend auf Feedback'
  },
  { 
    icon: Globe,
    value: 12, 
    suffix: '', 
    label: 'Länder',
    description: 'europaweit aktiv'
  },
];

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
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const Statistics = ({ className = '' }) => {
  return (
    <section className={`py-20 md:py-28 ${className}`} data-testid="statistics-section">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-6 md:p-8 rounded-[24px] bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-indigo-400" />
                </div>
                
                {/* Number */}
                <div className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                
                {/* Label */}
                <p className="text-lg font-semibold mb-1">{stat.label}</p>
                <p className="text-sm text-white/50">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
