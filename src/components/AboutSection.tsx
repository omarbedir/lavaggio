import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import { Logo } from './Logo';

export const AboutSection: React.FC = () => {
  const stats = [
    { number: '+12', label: 'عاماً من الخبرة والريادة', icon: Clock },
    { number: '+25K', label: 'سيارة فاخرة تم حمايتها وتجهيزها', icon: ShieldCheck },
    { number: '100%', label: 'منتجات أمريكية أصلية معتمدة', icon: Award },
    { number: '2', label: 'فرعان متكاملان (سلوى والعزيزية)', icon: Users },
  ];

  const highlights = [
    'صالات تركيب معقمة ومغلقة خالية بنسبة 100% من الغبار والأتربة.',
    'فريق فني معتمد دولياً وحاصل على شهادات احترافية من كبرى المصانع الأمريكية.',
    'أحدث برامج ومكائن القص الليزري بالكمبيوتر (DAP) بدون استخدام شفرات على الطلاء.',
    'ضمانات رسمية موثقة تصل إلى 10 سنوات مع جداول صيانة دورية مجانية.',
  ];

  return (
    <section id="about" className="relative z-30 w-full bg-[#050505] text-[#f5f5f7] font-yamama px-4 sm:px-8 py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F5D033]/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#B31824]/[0.04] rounded-full blur-[160px] pointer-events-none" />

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
          <span>من نحن • قصة لافيجيو LAVAGGIO</span>
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
            رواد العناية الفائقة وحماية السيارات الفاخرة
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-normal">
            في <span className="text-[#F5D033] font-bold">لافيجيو (LAVAGGIO)</span>، نرتقي بمعايير العناية بالسيارات لنمنح مركبتك درعاً حصيناً يجمع بين الجمال البصري الفائق والصلابة التي تدوم لسنوات بأعلى المعايير الأمريكية.
          </p>
        </motion.div>

        {/* Grid: Story & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center mb-16 sm:mb-24">
          {/* Left card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 apple-card-glass p-6 sm:p-10 rounded-3xl border border-white/10 text-right flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold text-[#F5D033] uppercase tracking-wider block">
                  رؤيتنا ورسالتنا
                </span>
                <Logo size="sm" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-snug">
                شغف واحترافية تلبي أعلى معايير النخبة
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-6">
                انطلقنا في قطر لنضع حداً للحلول المؤقتة وغير الدقيقة. من خلال فرعينا في <strong className="text-white">طريق سلوى</strong> و <strong className="text-white">العزيزية</strong>، وفرنا أحدث التجهيزات الهندسية الأمريكية المتخصصة لضمان نتائج مبهرة تحافظ على القيمة السوقية لسيارتك وتبرز رونقها الاستثنائي.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-[#F5D033]/15 flex items-center gap-3">
              <Award className="w-8 h-8 text-[#F5D033] shrink-0" />
              <div className="text-right">
                <span className="text-xs font-bold text-white block">مركز معتمد رسمياً</span>
                <span className="text-[11px] text-zinc-400">لأكبر مصانع أفلام الحماية والعوازل الأمريكية في العالم</span>
              </div>
            </div>
          </motion.div>

          {/* Right Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col gap-3.5"
          >
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="apple-card-glass p-4 sm:p-5 rounded-2xl border border-white/10 flex items-start gap-3.5 text-right hover:border-[#F5D033]/40 transition-all duration-300"
              >
                <div className="p-2 rounded-xl bg-[#F5D033]/10 text-[#F5D033] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-normal">
                  {item}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="apple-card-glass p-5 sm:p-6 rounded-3xl border border-white/10 flex flex-col items-center text-center group hover:border-[#F5D033]/50 transition-all"
              >
                <div className="p-3 rounded-2xl bg-[#F5D033]/10 text-[#F5D033] mb-3 group-hover:bg-[#F5D033] group-hover:text-black transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-yamama mb-1">
                  {stat.number}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
