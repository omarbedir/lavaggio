import React from 'react';
import { motion } from 'framer-motion';
import { LOVIGO_BRANCHES } from '../data/lovigoData';
import { MapPin, Phone, Clock, MessageCircle, Navigation, Sparkles, CheckCircle2 } from 'lucide-react';

export const BranchesSection: React.FC = () => {
  return (
    <section id="branches" className="relative z-30 w-full bg-[#050505] text-[#f5f5f7] font-yamama px-4 sm:px-8 py-24 sm:py-32 overflow-hidden border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#F5D033]/[0.03] rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5D033]/10 border border-[#F5D033]/25 text-[#F5D033] text-xs font-bold mb-4 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5D033]" />
          <span>فروع لافيجيو في قطر • نتشرف بزيارتكم</span>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-3xl mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            فرعان مجهزان بأحدث التقنيات لخدمتكم
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-normal">
            صالات مجهزة بالكامل ومغلقة لعزل الأتربة لضمان تطبيق أفلام الحماية والعازل الحراري بأعلى مستويات الجودة العالمية.
          </p>
        </motion.div>

        {/* 2 Branches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {LOVIGO_BRANCHES.map((branch, idx) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              whileHover={{ y: -6, borderColor: 'rgba(245, 208, 51, 0.45)' }}
              className="apple-card-glass p-7 sm:p-9 rounded-3xl border border-white/10 flex flex-col justify-between text-right group transition-all duration-300 relative"
            >
              <div>
                {/* Branch Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="text-[11px] font-mono text-[#F5D033] font-semibold uppercase tracking-wider block mb-1">
                      {branch.area}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#F5D033] transition-colors">
                      {branch.name}
                    </h3>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#F5D033]/10 text-[#F5D033] shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>

                {/* Info List */}
                <div className="space-y-4 mb-8">
                  {/* Address */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <MapPin className="w-4 h-4 text-[#F5D033] shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                    <Clock className="w-4 h-4 text-[#F5D033] shrink-0 mt-0.5" />
                    <span>{branch.hours}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 font-mono" dir="ltr">
                    <span className="text-right w-full">{branch.phone}</span>
                    <Phone className="w-4 h-4 text-[#F5D033] shrink-0" />
                  </div>
                </div>

                {/* Features Pill List */}
                <div className="space-y-2 pt-6 border-t border-white/[0.06] mb-8">
                  <span className="text-xs font-bold text-zinc-400 block mb-3">
                    تجهيزات ومميزات الفرع:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {branch.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F5D033] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-white/[0.06]">
                {/* Google Maps Button */}
                <a
                  href={branch.mapQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 apple-button-secondary py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Navigation className="w-4 h-4 text-[#F5D033]" />
                  <span>الموقع على الخريطة</span>
                </a>

                {/* WhatsApp Direct Chat */}
                <a
                  href={`https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(
                    `مرحباً لافيجيو، أود الاستفسار وحجز موعد في ${branch.name}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 apple-button-primary py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تواصل واتساب مباشر</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
