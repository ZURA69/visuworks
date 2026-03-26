import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail, Send } from 'lucide-react';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = '4921112345678';
  const whatsappMessage = encodeURIComponent('Hallo, ich interessiere mich für Ihre Dienstleistungen.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30 flex items-center justify-center transition-colors duration-200"
        data-testid="chat-widget-button"
        aria-label={isOpen ? 'Chat schließen' : 'Chat öffnen'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-80"
            data-testid="chat-widget-panel"
          >
            <div className="bg-white border border-black/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className="p-5 border-b border-black/[0.06]">
                <h3 className="font-medium text-[#1A1A1A]">Kontakt aufnehmen</h3>
                <p className="text-sm text-[#6B6B6B]">Wir sind für Sie da!</p>
              </div>

              <div className="p-4 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 border border-black/[0.06] hover:border-black/[0.12] hover:bg-black/[0.02] transition-all duration-200 group"
                  data-testid="chat-whatsapp-link"
                >
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <Send className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">WhatsApp</p>
                    <p className="text-xs text-[#9A9A9A]">Direkt schreiben</p>
                  </div>
                </a>

                <a
                  href="tel:+4921112345678"
                  className="flex items-center gap-4 p-3 border border-black/[0.06] hover:border-black/[0.12] hover:bg-black/[0.02] transition-all duration-200 group"
                  data-testid="chat-phone-link"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">Anrufen</p>
                    <p className="text-xs text-[#9A9A9A]">+49 211 123 456 78</p>
                  </div>
                </a>

                <a
                  href="mailto:info@visuworks.de"
                  className="flex items-center gap-4 p-3 border border-black/[0.06] hover:border-black/[0.12] hover:bg-black/[0.02] transition-all duration-200 group"
                  data-testid="chat-email-link"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A]">E-Mail</p>
                    <p className="text-xs text-[#9A9A9A]">info@visuworks.de</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
