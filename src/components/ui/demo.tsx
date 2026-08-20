import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    leftLabel: "حماية متقدمة",
    title: "عازل وحماية PPF",
    rightLabel: "ضمان 10 سنوات",
    background: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1920&auto=format&fit=crop",
  },
  {
    leftLabel: "عناية فائقة",
    title: "تلميع وسيراميك 9H",
    rightLabel: "لمعان زجاجي",
    background: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop",
  },
  {
    leftLabel: "عزل حراري",
    title: "تظليل نانو سيراميك",
    rightLabel: "عزل 98% حرارة",
    background: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1920&auto=format&fit=crop",
  },
  {
    leftLabel: "تعديل وتجليد",
    title: "تجليد فاخر وترقيات",
    rightLabel: "أفلام Avery & XPEL",
    background: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1920&auto=format&fit=crop",
  },
];

export default function DemoOne() {
  const apiRef = React.useRef<FullScreenFXAPI>(null);

  return (
    <FullScreenScrollFX
      apiRef={apiRef}
      sections={sections}
      header={
        <div className="font-yamama">
          <div className="text-sm font-bold text-[#F5D033] tracking-wider mb-1">لافيجيو لخدمات السيارات</div>
          <div className="text-3xl font-black text-white">منظومة الخدمات المتكاملة</div>
        </div>
      }
      footer={<div className="text-xs font-semibold text-zinc-400 font-yamama">اسحب للتنقل بين الخدمات • لافيجيو</div>}
      showProgress
      durations={{ change: 0.7, snap: 800 }}
    />
  );
}
