import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LOVIGO_SERVICES, LOVIGO_BRANCHES } from '../data/lovigoData';
import { MessageCircle, Phone, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carModel: '',
    service: initialService || LOVIGO_SERVICES[0].title,
    branch: LOVIGO_BRANCHES[0].name,
    date: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct formatted WhatsApp message
    const message = encodeURIComponent(
      `*طلب حجز موعد جديد من موقع لافيجيو LAVAGGIO*\n` +
      `---------------------------------\n` +
      `👤 *الاسم:* ${formData.name}\n` +
      `📱 *رقم الهاتف:* ${formData.phone}\n` +
      `🚘 *نوع وموديل السيارة:* ${formData.carModel}\n` +
      `🛠️ *الخدمة المطلوبة:* ${formData.service}\n` +
      `📍 *الفرع المفضل:* ${formData.branch}\n` +
      `📅 *التاريخ المقترح:* ${formData.date || 'أقرب موعد متاح'}\n` +
      (formData.notes ? `📝 *ملاحظات:* ${formData.notes}\n` : '') +
      `---------------------------------\n` +
      `شكراً لكم!`
    );

    setIsSubmitted(true);

    // Open WhatsApp after a brief delay
    setTimeout(() => {
      window.open(`https://wa.me/97444556677?text=${message}`, '_blank');
    }, 600);
  };

  return (
    <section id="contact" className="relative z-30 w-full bg-[#050505] text-[#f5f5f7] font-yamama px-4 sm:px-8 py-24 sm:py-32 overflow-hidden border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-[#F5D033]/[0.03] rounded-full blur-[190px] pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5D033]/10 border border-[#F5D033]/25 text-[#F5D033] text-xs font-bold mb-4 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5D033]" />
          <span>تواصل معنا • حجز موعد فوري</span>
        </motion.div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-2xl mb-14"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            احجز موعدك لتدليل وحماية سيارتك
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 leading-relaxed font-normal">
            املأ النموذج أدناه لتأكيد حجزك في فرع طريق سلوى أو العزيزية، وسيقوم فريق لافيجيو بالتواصل معك فوراً لتقديم أفضل عرض.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 apple-card-glass p-7 sm:p-10 rounded-3xl border border-white/10 text-right"
          >
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-[#F5D033]/15 text-[#F5D033] mb-4 animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  تم إرسال طلب الحجز بنجاح!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mb-6 leading-relaxed">
                  تم تحويلك إلى واتساب لتأكيد تفاصيل الموعد مع مستشار خدمة لافيجيو فوراً.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="apple-button-secondary px-6 py-2 rounded-full text-xs font-semibold"
                >
                  حجز موعد لسيارة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                      الاسم الكريم *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F5D033] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                      رقم الجوال / واتساب *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="974 XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F5D033] transition-colors"
                    />
                  </div>
                </div>

                {/* Car Model & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                      نوع وموديل السيارة *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: مرسيدس G63 موديل 2024"
                      value={formData.carModel}
                      onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F5D033] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                      الخدمة المطلوبة *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5D033] transition-colors"
                    >
                      {LOVIGO_SERVICES.map((s) => (
                        <option key={s.id} value={s.title} className="bg-zinc-900 text-white">
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Branch & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                      الفرع المفضل *
                    </label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full bg-black/80 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5D033] transition-colors"
                    >
                      {LOVIGO_BRANCHES.map((b) => (
                        <option key={b.id} value={b.name} className="bg-zinc-900 text-white">
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                      التاريخ المقترح
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5D033] transition-colors"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1.5">
                    ملاحظات أو استفسارات إضافية
                  </label>
                  <textarea
                    rows={3}
                    placeholder="اكتب أي طلبات خاصة تود توضيحها..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#F5D033] transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full apple-button-primary py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>تأكيد طلب الحجز عبر واتساب</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Direct Channels & Hotline Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between gap-4"
          >
            {/* WhatsApp Quick Chat */}
            <div className="apple-card-glass p-7 rounded-3xl border border-[#F5D033]/20 text-right">
              <div className="p-3 rounded-2xl bg-[#F5D033]/10 text-[#F5D033] w-fit mb-3">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                محادثة واتساب مباشرة
              </h3>
              <p className="text-xs text-zinc-300 mb-6 leading-relaxed font-normal">
                تواصل مع فريق خدمة العملاء فوراً للحصول على تسعيرة مباشرة أو استفسار فني سريع.
              </p>
              <a
                href="https://wa.me/97444556677"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full apple-button-primary py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>دردشة واتساب مباشرة (+974 4455 6677)</span>
              </a>
            </div>

            {/* Direct Phone Support */}
            <div className="apple-card-glass p-7 rounded-3xl border border-white/10 text-right">
              <div className="p-3 rounded-2xl bg-[#F5D033]/10 text-[#F5D033] w-fit mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                الخط الساخن للمبيعات والاستقبال
              </h3>
              <p className="text-xs text-zinc-300 mb-6 leading-relaxed font-normal">
                مستشارو لافيجيو جاهزون للرد على كافة استفساراتكم خلال أوقات الدوام الرسمي.
              </p>
              <div className="space-y-2.5">
                <a
                  href="tel:+97444556677"
                  className="w-full apple-button-secondary py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-between transition-all"
                >
                  <span className="font-mono" dir="ltr">+974 4455 6677</span>
                  <span>فرع طريق سلوى</span>
                </a>

                <a
                  href="tel:+97444889900"
                  className="w-full apple-button-secondary py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-between transition-all"
                >
                  <span className="font-mono" dir="ltr">+974 4488 9900</span>
                  <span>فرع العزيزية</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
