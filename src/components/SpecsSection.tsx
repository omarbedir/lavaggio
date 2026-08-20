import { motion } from 'framer-motion';
import { Zap, Shield, Gauge, Cpu, Sparkles, ChevronLeft, ArrowUp } from 'lucide-react';
import { useState } from 'react';

export const SpecsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'engine' | 'chassis' | 'interior' | 'tech'>('engine');

  const performanceMetrics = [
    { label: 'القوة الحصانية القصوى', value: '577', unit: 'حصان', sub: 'عند 6,000 دورة/دقيقة', icon: Zap },
    { label: 'عزم الدوران الأقصى', value: '850', unit: 'نيوتن.متر', sub: 'عند 2,500 - 3,500 د.د', icon: Gauge },
    { label: 'التسارع من 0 إلى 100', value: '4.5', unit: 'ثانية', sub: 'بانطلاق RACE START', icon: Cpu },
    { label: 'الأقفال التفاضلية', value: '3 × 100%', unit: 'كاملة', sub: 'أمامي • وسطي • خلفي', icon: Shield },
  ];

  const tabsContent = {
    engine: {
      title: 'محرك AMG 4.0L V8 Biturbo',
      badge: 'القلب النابض',
      description:
        'مجمع يدوياً في أفالترباخ الألمانية تحت شعار "رجل واحد، محرك واحد". يتميز بشاحنين توربينيين داخل الـ V (Hot-Inside-V) للاستجابة الفورية وتقليل انبعاثات العادم مع صوت AMG الهادر الأصيل.',
      specs: [
        { name: 'السعة اللترية', detail: '3,982 سي سي (4.0 لتر)' },
        { name: 'شواحن التوربو', detail: 'Twin-Scroll Biturbo' },
        { name: 'ناقل الحركة', detail: 'AMG SPEEDSHIFT TCT 9G' },
        { name: 'نظام الدفع', detail: 'AMG Performance 4MATIC (40:60)' },
      ]
    },
    chassis: {
      title: 'الشاسيه السلمي الفولاذي المقوى',
      badge: 'الصلابة المطلقة',
      description:
        'شاسيه سلمي مصنوع من فولاذ مغلق بسماكة تصل إلى 3.4 مم، يوفر صلابة التوائية تفوق الأجيال السابقة بنسبة 55%، مع محاور تعليق مستقلة تمكن السيارة من خوض المياه حتى عمق 700 مم.',
      specs: [
        { name: 'عمق الخوض بالماء', detail: '700 مم' },
        { name: 'الخلوص الأرضي', detail: '241 مم' },
        { name: 'زاوية الاقتراب/المغادرة', detail: '31° / 30°' },
        { name: 'نظام التعليق', detail: 'AMG RIDE CONTROL التكيفي' },
      ]
    },
    interior: {
      title: 'المقصورة الملكية والرفاهية اليدوية',
      badge: 'فخامة بلا حدود',
      description:
        'مقاعد حصرية من جلد نابا المطرّز بالألماس مع وظائف المساج الهوائي النشط والتهوية، وتطعيمات من ألياف الكربون غير اللامعة مع إضاءة محيطية تفاعلية بـ 64 لوناً.',
      specs: [
        { name: 'نوع الجلد', detail: 'نابا أصلي مطرّز بالألماس' },
        { name: 'المقاعد', detail: '14 وضعية كهربائية مع مساج' },
        { name: 'التطعيمات', detail: 'ألياف الكربون المطفأة' },
        { name: 'الإضاءة المحيطية', detail: '64 لوناً متعدد المناطق' },
      ]
    },
    tech: {
      title: 'التكنولوجيا الرقمية والنظام الصوتي',
      badge: 'الابتكار الذكي',
      description:
        'شاشتان رقميتان عاليتي الدقة بحجم 12.3 بوصة لكل منهما تحت لوح زجاجي موحد، مقترنة بنظام Burmester® الصوتي المحيطي ثلاثي الأبعاد بقوة 590 واط عبر 15 مكبر صوت عالي النقاء.',
      specs: [
        { name: 'الشاشات', detail: 'بانورامية مزدوجة 24.6 بوصة' },
        { name: 'النظام الصوتي', detail: 'Burmester® 590W (15 سماعة)' },
        { name: 'الملاحة', detail: 'واقع معزز MBUX AR' },
        { name: 'الاتصال', detail: 'Apple CarPlay & Android Auto' },
      ]
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="specs-section" className="relative z-30 w-full bg-[#050505] text-[#f5f5f7] font-yamama px-4 sm:px-8 py-24 sm:py-36 overflow-hidden">
      {/* Top glowing laser boundary line transitioning from Hero */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent shadow-[0_0_20px_rgba(239,68,68,0.8)]" />

      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-red-600/[0.04] rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Section Header with Staggered Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center max-w-3xl mb-16 sm:mb-20"
        >
          {/* Category Tag */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>٠٢ / الأداء والمواصفات الفنية الخارقة</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            هندسة تفوق التوقعات
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 mt-4 leading-relaxed max-w-2xl font-normal">
            كل عنصر في مرسيدس-AMG G 63 تم صقله بدقة جراحية ليجمع بين صلابة الدفع الرباعي الأسطورية وأداء سيارات السباق الخارق.
          </p>
        </motion.div>

        {/* 4 Major Performance Metric Highlights Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full mb-16 sm:mb-24">
          {performanceMetrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: 'rgba(239, 68, 68, 0.35)' }}
                className="apple-card-glass p-5 sm:p-7 rounded-3xl border border-white/10 flex flex-col items-start text-right transition-all duration-300 group"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">
                    0{idx + 1}
                  </span>
                </div>

                <span className="text-xs text-zinc-400 font-medium mb-1">
                  {metric.label}
                </span>

                <div className="flex items-baseline gap-1.5 my-1">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-yamama tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-red-400">
                    {metric.unit}
                  </span>
                </div>

                <span className="text-[11px] text-zinc-500 mt-1">
                  {metric.sub}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Component Dossier */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full apple-card-glass rounded-3xl p-6 sm:p-10 border border-white/10 text-right mb-20 shadow-2xl backdrop-blur-2xl"
        >
          {/* Subnav Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pb-6 border-b border-white/[0.08] mb-8">
            <button
              onClick={() => setActiveTab('engine')}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTab === 'engine'
                ? 'bg-red-500 text-white shadow-glow-red'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
            >
              منظومة المحرك V8
            </button>

            <button
              onClick={() => setActiveTab('chassis')}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTab === 'chassis'
                ? 'bg-red-500 text-white shadow-glow-red'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
            >
              الشاسيه والصلابة
            </button>

            <button
              onClick={() => setActiveTab('interior')}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTab === 'interior'
                ? 'bg-red-500 text-white shadow-glow-red'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
            >
              المقصورة الملكية
            </button>

            <button
              onClick={() => setActiveTab('tech')}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${activeTab === 'tech'
                ? 'bg-red-500 text-white shadow-glow-red'
                : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
            >
              الأنظمة والشاشات
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 flex flex-col items-start text-right">
              <span className="text-xs font-semibold text-red-400 mb-1">
                {tabsContent[activeTab].badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {tabsContent[activeTab].title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {tabsContent[activeTab].description}
              </p>
            </div>

            <div className="lg:col-span-5 bg-black/50 border border-white/[0.06] rounded-2xl p-5 sm:p-6 w-full">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-4">
                المواصفات التقنية
              </span>
              <div className="space-y-3 font-yamama text-xs sm:text-sm">
                {tabsContent[activeTab].specs.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="text-zinc-400">{item.name}</span>
                    <span className="text-white font-semibold">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Apple Luxury Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-900 to-black p-8 sm:p-14 border border-white/10 flex flex-col items-center text-center shadow-2xl mb-16"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-red-500/15 blur-3xl pointer-events-none" />

          <h3 className="text-2xl sm:text-4xl font-black text-white mb-3">
            اختبر تجربة القيادة الأسطورية
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mb-8 font-normal leading-relaxed">
            تواصل مع مستشاري لافيجيو لتخصيص نسختك الخاصة من مرسيدس-AMG G 63 بتفاصيل استثنائية مصممة خصيصاً لك.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="apple-button-primary px-8 py-3 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2 shadow-lg">
              <span>طلب حجز وتخصيص</span>
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            <button
              onClick={scrollToTop}
              className="apple-button-secondary px-6 py-3 rounded-full text-xs sm:text-sm font-medium inline-flex items-center gap-2"
            >
              <span>العودة للهيرو سيكشن</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Minimalist Apple Footer */}
        <footer className="w-full pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-normal">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">لافيجيو G 63</span>
            <span>• جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#overview" onClick={scrollToTop} className="hover:text-white transition-colors">
              نظرة عامة
            </a>
            <a href="#specs-section" className="hover:text-white transition-colors">
              المواصفات الفنية
            </a>
            <a href="#" className="hover:text-white transition-colors">
              سياسة الخصوصية
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default SpecsSection;
