export interface ArabicMilestone {
  id: string;
  frameRange: [number, number]; // [startFrame, endFrame]
  phaseNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  specs: {
    label: string;
    value: string;
    sub?: string;
  }[];
  highlights: string[];
}

export type Milestone = ArabicMilestone;

export const ARABIC_MILESTONES: ArabicMilestone[] = [
  {
    id: 'part-one',
    frameRange: [1, 120],
    phaseNumber: '٠١',
    badge: 'لافاجيو للعناية الفائقة',
    title: 'لافـاجـيـو • فخامة الحماية المطلقة',
    subtitle: 'الريادة في عوازل الحماية PPF، التلميع الاحترافي، وترقيات السيارات الفاخرة',
    description: 'نمنح سيارتك درعاً حصيناً يجمع بين الجمال البصري الفائق والصلابة التي تدوم لسنوات بأرقى المعايير الأمريكية.',
    specs: [
      { label: 'ضمان الحماية', value: 'حتى 10 سنوات', sub: 'معتمد رسمياً' },
      { label: 'الصالات', value: '100% معقمة', sub: 'عازلة للأتربة' },
    ],
    highlights: [
      'أفلام حماية أصلية ذاتية المعالجة',
      'فرعان في سلوى والعزيزية'
    ]
  },
  {
    id: 'part-two',
    frameRange: [121, 240],
    phaseNumber: '٠٢',
    badge: 'حماية شاملة وتفاصيل دقيقة',
    title: 'عناية هندسية بأدق التفاصيل',
    subtitle: 'حماية متكاملة للهيكل والشاسيه والمقصورة بأرقى المنتجات الأمريكية المعتمدة',
    description: 'من عوازل أسفل الشاسيه وتظليل النانو سيراميك إلى إصلاحات PDR وتحويلات الكيتات الاحترافية.',
    specs: [
      { label: 'عزل حراري', value: 'حتى 98%', sub: 'نانو سيراميك' },
      { label: 'صلابة الطلاء', value: '9H ماسية', sub: 'جرافين وسيراميك' },
    ],
    highlights: [
      'منتجات XPEL و SunTek و Avery',
      'إتقان يدوي بأيدي خبراء معتمدين'
    ]
  }
];

export const MILESTONES = ARABIC_MILESTONES;
export const TOTAL_FRAMES = 240;
