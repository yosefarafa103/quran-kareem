type TafsirContentItem = {
  id: number;
  name: string;
  language: string;
  author: string;
  book_name: string;
};

export default [
  {
    id: 1,
    name: "التفسير الميسر",
    language: "ar",
    author: "نخبة من العلماء",
    book_name: "التفسير الميسر",
  },
  {
    id: 2,
    name: "تفسير الجلالين",
    language: "ar",
    author: "جلال الدين المحلي و السيوطي",
    book_name: "تفسير الجلالين",
  },
  {
    id: 3,
    name: "تفسير السعدي",
    language: "ar",
    author: "عبد الرحمن بن ناصر بن عبد الله السعدي التميمي مفسر",
    book_name: "تيسير الكريم الرحمن في تفسير كلام المنان",
  },
  {
    id: 4,
    name: "تفسير ابن كثير",
    language: "ar",
    author: "عماد الدين أبي الفداء إسماعيل بن كثير القرشي",
    book_name: "تفسير القرآن العظيم",
  },
  {
    id: 5,
    name: "تفسير الوسيط لطنطاوي",
    language: "ar",
    author: "محمد سيد طنطاوي",
    book_name: "التفسير الوسيط للقرآن الكريم",
  },
  {
    id: 6,
    name: "تفسير البغوي",
    language: "ar",
    author: "الحسين بن مسعود البغوي أبو محمد",
    book_name: "معالم التنزيل",
  },
  {
    id: 7,
    name: "تفسير القرطبي",
    language: "ar",
    author: "أبو عبد الله محمد بن أحمد الأنصاري القرطبي",
    book_name: "الجامع لأحكام القرآن",
  },
  {
    id: 8,
    name: "تفسير الطبري",
    language: "ar",
    author: "الإمام أبو جعفر الطبري",
    book_name: "جامع البيان في تأويل القرآن",
  },
] satisfies TafsirContentItem[];
