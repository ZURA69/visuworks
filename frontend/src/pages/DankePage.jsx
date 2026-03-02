import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { SEOHead } from '../components/SEOHead';

export default function DankePage() {
  return (
    <div data-testid="danke-page" className="min-h-[80vh] flex items-center justify-center px-6">
      <SEOHead page="home" customTitle="Vielen Dank | VISUWORKS" customDescription="Ihre Anfrage wurde erfolgreich gesendet." />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-green-400" />
        </motion.div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Vielen Dank!
        </h1>
        <p className="text-lg text-white/60 mb-4">
          Ihre Projektanfrage ist bei uns eingegangen.
        </p>
        <p className="text-base text-white/50 mb-10">
          Wir melden uns in der Regel innerhalb von 24 Stunden bei Ihnen 
          mit Rückfragen oder einem konkreten Vorschlag.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button size="lg" data-testid="danke-home-button">
              <Home className="mr-2 h-5 w-5" />
              Zur Startseite
            </Button>
          </Link>
          <Link to="/projekte">
            <Button variant="secondary" size="lg" data-testid="danke-projekte-button">
              Projekte ansehen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
