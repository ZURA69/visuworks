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
            {/* Logo - Replace URL in /content/images.js */}
            <div className="px-6 py-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-300">
              {getClientLogo(client.key) ? (
                <img src={getClientLogo(client.key)} alt={client.name} loading="lazy" decoding="async" className="h-8 object-contain opacity-30 group-hover:opacity-50 transition-opacity" />
              ) : (
                <span className="text-lg font-semibold text-white/30 group-hover:text-white/50 transition-colors">
                  {client.name}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
