import React from 'react';
import { ArrowUp, MapPin, Phone, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-30 w-full bg-[#020202] text-[#f5f5f7] font-yamama px-4 sm:px-8 pt-16 pb-12 border-t border-[#F5D033]/15">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Top Footer: Brand, Links, Branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-right">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="mb-4">
              <Logo size="md" />
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal mb-6 max-w-sm">
              المركز المتخصص الرائد في قطر لخدمات عوازل وحماية السيارات، النانو سيراميك، التلميع الاحترافي، ترقيات الموديلات وإصلاح الانبعاجات بدون طلاء PDR.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/97444556677"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#F5D033] hover:text-black text-zinc-400 transition-colors"
                title="واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="tel:+97444556677"
                className="p-2.5 rounded-full bg-white/5 hover:bg-[#F5D033] hover:text-black text-zinc-400 transition-colors"
                title="اتصال هاتف"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col items-start">
            <span className="text-xs font-bold text-[#F5D033] uppercase tracking-wider block mb-4">
              أقسام الموقع
            </span>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-normal">
              <li>
                <a href="#hero" onClick={scrollToTop} className="hover:text-white transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  من نحن
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  خدمات لافاجيو
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  العلامات التجارية الأمريكية
                </a>
              </li>
              <li>
                <a href="#branches" className="hover:text-white transition-colors">
                  الفروع (سلوى والعزيزية)
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  حجز موعد وتواصل
                </a>
              </li>
            </ul>
          </div>

          {/* Branches info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="text-xs font-bold text-[#F5D033] uppercase tracking-wider block mb-4">
              فروعنا في قطر
            </span>
            <div className="space-y-4 text-xs text-zinc-300 w-full">
              {/* Branch 1 */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 w-full">
                <span className="font-bold text-white block mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F5D033]" />
                  فرع طريق سلوى (المقر الرئيسي)
                </span>
                <p className="text-zinc-400 text-[11px] mb-1">
                  طريق سلوى التجاري، مقابل وقود، الدوحة
                </p>
                <span className="font-mono text-[11px] text-zinc-300" dir="ltr">
                  Tel: +974 4455 6677
                </span>
              </div>

              {/* Branch 2 */}
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 w-full">
                <span className="font-bold text-white block mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F5D033]" />
                  فرع العزيزية
                </span>
                <p className="text-zinc-400 text-[11px] mb-1">
                  شارع العزيزية التجاري، بالقرب من استاد خليفة، الدوحة
                </p>
                <span className="font-mono text-[11px] text-zinc-300" dir="ltr">
                  Tel: +974 4488 9900
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            <span>جميع الحقوق محفوظة © {new Date().getFullYear()} لمركز </span>
            <strong className="text-[#F5D033]">لافاجيو (LAVAGGIO AUTO CARE)</strong>
            <span> • الدوحة، قطر</span>
          </div>

          <button
            onClick={scrollToTop}
            className="apple-button-secondary px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 hover:text-white"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
