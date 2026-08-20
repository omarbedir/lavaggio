import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVIGO_SERVICES, ServiceItem } from '../data/lovigoData';
import { CheckCircle2, ChevronLeft, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';
import { FullScreenScrollFX, Section as FXSection } from '@/components/ui/full-screen-scroll-fx';

interface ServicesSectionProps {
  onSelectServiceForBooking?: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Full Screen Scroll FX Sections Data with Crystal Clear 4K Backgrounds and Rich Arabic Descriptions
  const fxSections: FXSection[] = [
    {
      id: 'ppf',
      leftLabel: 'حماية متقدمة',
      title: 'عازل وحماية PPF',
      subtitle: 'أفلام حماية شفافة ومطفأة بتقنية المعالجة الذاتية للخدوش (Self-Healing) مع ضمان رسمي حتى 10 سنوات.',
      rightLabel: 'ضمان 10 سنوات',
      background: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=85&w=2200&auto=format&fit=crop',
    },
    {
      id: 'detailing',
      leftLabel: 'عناية وتلميع',
      title: 'تلميع وسيراميك 9H',
      subtitle: 'تصحيح طلاء احترافي لإزالة 95% من دوائر الغسيل مع طبقات نانو سيراميك وجرافين بصلابة 9H الماسية.',
      rightLabel: 'صلابة 9H ماسية',
      background: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=85&w=2200&auto=format&fit=crop',
    },
    {
      id: 'tinting',
      leftLabel: 'عزل حراري',
      title: 'تظليل نانو سيراميك',
      subtitle: 'عزل حراري للأشعة تحت الحمراء حتى 98% وحجب 99.9% من الأشعة فوق البنفسجية لبرودة استثنائية.',
      rightLabel: 'عزل 98% حرارة',
      background: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=85&w=2200&auto=format&fit=crop',
    },
    {
      id: 'wrap',
      leftLabel: 'تعديل وتجليد',
      title: 'تجليد فاخر Avery',
      subtitle: 'مئات الألوان الحصرية والتشطيبات المطفأة والميتاليك بأفلام أصلية تحافظ بالكامل على صبغ الوكالة.',
      rightLabel: 'مئات الألوان',
      background: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=85&w=2200&auto=format&fit=crop',
    },
    {
      id: 'facelift',
      leftLabel: 'تحديث الموديل',
      title: 'ترقيات كيتات AMG',
      subtitle: 'تحويلات موديلات كاملة لسيارات G-Class ولاندكروزر ورينج روفر مع برمجة ومطابقة لمعايير الوكالة 100%.',
      rightLabel: 'مطابقة الوكالة',
      background: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?q=85&w=2200&auto=format&fit=crop',
    },
    {
      id: 'pdr',
      leftLabel: 'إصلاحات متخصصة',
      title: 'إصلاح انبعاجات PDR',
      subtitle: 'تعديل صدمات الصاج والبرد بدقة ميكانيكية متناهية بدون رش بوية أو معجون وبنفس اليوم.',
      rightLabel: 'حفظ صبغ الوكالة',
      background: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=85&w=2200&auto=format&fit=crop',
    },
  ];

  const categories = [
    { id: 'all', label: 'جميع الخدمات (٩)' },
    { id: 'protection', label: 'عوازل وحماية PPF' },
    { id: 'detailing', label: 'تلميع وعناية فائقة' },
    { id: 'styling', label: 'تجليد وترقيات كيتات' },
    { id: 'repair', label: 'إصلاح انبعاجات PDR' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? LOVIGO_SERVICES
      : LOVIGO_SERVICES.filter((s) => s.category === activeCategory);

  const handleBookService = (service: ServiceItem) => {
    if (onSelectServiceForBooking) {
      onSelectServiceForBooking(service.title);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWhatsAppInquiry = (service: ServiceItem) => {
    const text = encodeURIComponent(
      `مرحباً لافيجيو، أود الاستفسار وحجز خدمة: ${service.title}`
    );
    window.open(`https://wa.me/97444556677?text=${text}`, '_blank');
  };

  return (
    <section id="services" className="relative z-30 w-full bg-[#050505] text-[#f5f5f7] font-yamama overflow-hidden">
      {/* 1. Full Screen Cinematic Scroll FX Experience */}
      <div className="relative w-full">
        <FullScreenScrollFX
          sections={fxSections}
          header={
            <div className="flex flex-col items-center justify-center select-none pt-2">
              <Logo size="sm" className="shadow-[0_4px_25px_rgba(245,208,51,0.35)] hover:scale-105 transition-transform" />
            </div>
          }
          footer={null}
          showProgress={false}
          durations={{ change: 0.35, snap: 500 }}
          fontFamily='"Alyamama Variable", "Alyamama", sans-serif'
          colors={{
            text: '#ffffff',
            overlay: 'rgba(5, 5, 5, 0.25)',
            pageBg: '#050505',
            stageBg: '#000000',
          }}
        />
      </div>

      {/* 2. Detailed Grid Showcase with Filter Tabs */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-28 flex flex-col items-center border-t border-white/[0.08]">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mb-12"
        >
          <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            اختر الخدمة المناسبة لسيارتك
          </h3>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed font-normal">
            تجهيزات هندسية متطورة وضمانات رسمية موثقة مع فريق معتمد دولياً.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F5D033] text-black shadow-glow-yellow scale-102 font-bold'
                    : 'apple-card-glass text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
          <AnimatePresence>
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6, borderColor: 'rgba(245, 208, 51, 0.45)' }}
                className="apple-card-glass p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between text-right group transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle top glow bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5D033] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono text-zinc-400">
                      {service.categoryName}
                    </span>
                    {service.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F5D033]/15 border border-[#F5D033]/30 text-[#F5D033] text-[10px] font-bold">
                        {service.badge}
                      </span>
                    )}
                    {service.warranty && !service.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#B31824]/20 border border-[#B31824]/40 text-red-200 text-[10px] font-medium">
                        {service.warranty}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#F5D033] transition-colors">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-normal mb-5">
                    {service.description}
                  </p>

                  {/* Feature Bullet Points */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.06]">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F5D033] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions: Book Now & WhatsApp */}
                <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => handleBookService(service)}
                    className="flex-1 apple-button-primary py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>حجز موعد</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleWhatsAppInquiry(service)}
                    className="p-2.5 rounded-xl bg-[#F5D033]/10 hover:bg-[#F5D033] text-[#F5D033] hover:text-black border border-[#F5D033]/25 transition-all"
                    title="استفسار عبر واتساب"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
