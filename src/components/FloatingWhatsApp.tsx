import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside aria-label="WhatsApp Floating Action" className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <a
        href="https://wa.me/97444556677?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%84%D8%A7%D9%81%D9%8A%D8%AC%D9%8A%D9%88%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B9%D9%86%D8%A7%D9%8A%D8%A9%20%D8%A8%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%B1%D8%A7%D8%AA"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-yamama text-xs font-bold shadow-[0_10px_30px_rgba(16,185,129,0.4)] border border-emerald-400/30 transition-all duration-300 hover:scale-105 active:scale-95"
        title="تواصل معنا عبر واتساب"
      >
        <MessageCircle className="w-5 h-5 text-white animate-pulse" />
        <span className="hidden sm:inline">محادثة واتساب فورية</span>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;
