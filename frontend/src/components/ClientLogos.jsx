import React from 'react';
import { motion } from 'framer-motion';
import { clients } from '../content/site';
import { getClientLogo } from '../content/images';

export const ClientLogos = ({ className = '' }) => {
  return (
    <div className={className} data-testid="client-logos">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <p className="text-sm font-medium text-white/40 uppercase tracking-wider">
          Vertrauen von führenden Unternehmen
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {clients.map((client, index) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative"
          >
            {/* Logo Placeholder - Replace with actual SVG/Image */}
            <div className="px-6 py-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300">
              <span className="text-lg font-semibold text-white/30 group-hover:text-white/50 transition-colors">
                {client.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
