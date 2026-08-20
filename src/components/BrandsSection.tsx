import React from 'react';
import { motion } from 'framer-motion';
import { LOVIGO_BRANDS } from '../data/lovigoData';
import { Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const BrandsSection: React.FC = () => {
  return (
    <section id="products" className="relative z-30 w-full bg-[#050505] text-[#f5f5f7] font-yamama px-4 sm:px-8 py-24 sm:py-32 overflow-hidden border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-[#F5D033]/[0.03] rounded-full blur-[190px] pointer-events-none" />

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
          <span>المنتجات والعلامات التجارية الأمريكية المعتمدة</span>
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
            شراكات رسمية مع كبرى المصانع العالمية
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-normal">
            نعتمد في لافاجيو حصرياً على أفلام الحماية والعوازل الأمريكية المصنفة رقم #1 عالمياً لضمان أعلى درجات الأداء والموثوقية.
          </p>
        </motion.div>

        {/* 4 Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-16">
          {LOVIGO_BRANDS.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(245, 208, 51, 0.45)' }}
              className="apple-card-glass p-7 sm:p-9 rounded-3xl border border-white/10 flex flex-col justify-between text-right group transition-all duration-300 relative"
            >
              <div>
                {/* Header: Logo Name, Origin, Warranty */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] font-mono text-[#F5D033] font-semibold uppercase tracking-wider block mb-1">
                      {brand.origin}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#F5D033] transition-colors">
                      {brand.name}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-[#B31824]/20 border border-[#B31824]/40 text-red-200 text-xs font-bold shrink-0">
                    {brand.warranty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-6">
                  {brand.description}
                </p>

                {/* Features */}
                <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                  {brand.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#F5D033] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Guarantee Banner */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#F5D033]" />
                  <span>شهادة ضمان إلكترونية موثقة</span>
                </span>
                <span className="text-[11px] font-mono text-[#F5D033]">ORIGINAL CERTIFIED</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Assurance Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full apple-card-glass p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-right"
        >
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-[#F5D033]/10 text-[#F5D033] shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">
                شهادات ضمان معتمدة من المصانع الأم في أمريكا
              </h4>
              <p className="text-xs text-zinc-400 font-normal">
                جميع المنتجات تخضع لفحص الباركود والتحقق من الرقم التسلسلي لضمان أصالة المواد 100%.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="apple-button-primary px-6 py-3 rounded-full text-xs font-bold whitespace-nowrap shadow-lg"
          >
            طلب استشارة خبير
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsSection;
