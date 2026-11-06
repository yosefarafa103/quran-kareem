
import { useCallback, useEffect, useMemo, useState } from "react";
import azkar from "../data/azkar.json";
import i18n from "../lib/i18n";
import { AnimatePresence, motion } from "framer-motion";
import { Zekr } from "../types/Azkar";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  BookOpen,
  Heart,
} from "lucide-react";

type ZekrCategory = keyof typeof azkar;

const categoryIcons = [
  "🌅", "🌇", "🤲", "🕌", "🌙", "☀️",
  "🕌", "✨", "📢", "💧", "🏠", "🚪",
  "🍽️", "🕋",
];

const Azkar = () => {
  const [tab, setTab] = useState<ZekrCategory | null>(null);
  const [counter, setCounter] = useState(0);
  const [currentZekr, setCurrentZekr] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const filter: Zekr[] = tab
    ? (azkar[tab] as Zekr[])
    : [];

  const totalCount = useMemo(
    () => filter.reduce((acc, item) => acc + item.count, 0),
    [filter]
  );

  const progress = totalCount
    ? Math.min((counter / totalCount) * 100, 100)
    : 0;

  const isCompleted = counter >= totalCount;

  const handleBack = useCallback(() => {
    setTab(null);
    setCounter(0);
    setCurrentZekr(0);
    setResetKey(prev => prev + 1);
  }, []);

  const handleCategory = (category: ZekrCategory) => {
    setTab(category);
    setCounter(0);
    setCurrentZekr(0);
    setResetKey(prev => prev + 1);
  };

  const handleNext = useCallback(() => {
    setCurrentZekr(prev => prev + 1);
  }, []);

  const handleCount = useCallback(() => {
    setCounter(prev => prev + 1);
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground pb-12">
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="text-primary size-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              الأذكار
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              اطمئن قلبك بذكر الله
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {!tab ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  اختر قسم الأذكار
                </h2>

                <span className="text-xs text-muted-foreground">
                  {Object.keys(azkar).length} قسم
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {Object.keys(azkar).map((item, index) => (
                  <motion.button
                    key={item}
                    type="button"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleCategory(item as ZekrCategory)}
                    className="
                      group relative overflow-hidden
                      flex flex-col items-start justify-between
                      min-h-36 p-4 rounded-2xl
                      border border-border
                      bg-card text-card-foreground
                      hover:bg-primary/5
                      hover:border-primary/40
                      transition-all duration-300
                    "
                  >
                    <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                      {categoryIcons[index % categoryIcons.length]}
                    </div>

                    <div className="w-full flex items-center justify-between gap-2 mt-5">
                      <span className="font-semibold text-sm">
                        {i18n.t(item)}
                      </span>

                      <ArrowRight className="size-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity rotate-180" />
                    </div>

                    <div className="absolute -bottom-8 -left-8 size-20 rounded-full bg-gold/10 group-hover:scale-150 transition-transform duration-500" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="reading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-xl py-3">
                <div className="border border-border rounded-2xl p-4 bg-card shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChevronLeft className="size-5" />
                      رجوع
                    </button>

                    <h2 className="font-bold text-primary text-sm">
                      {i18n.t(tab)}
                    </h2>

                    <button
                      type="button"
                      onClick={() => {
                        setCounter(0);
                        setCurrentZekr(0);
                        setResetKey(prev => prev + 1);
                      }}
                      title="إعادة البدء"
                      className="size-9 rounded-xl hover:bg-primary/10 flex items-center justify-center transition-colors"
                    >
                      <RotateCcw className="size-4 text-muted-foreground" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">
                      التقدم الإجمالي
                    </span>

                    <span className="font-bold text-primary tabular-nums">
                      {counter.toLocaleString("ar-EG")} / {totalCount.toLocaleString("ar-EG")}
                    </span>
                  </div>

                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>

                  <div className="text-left text-xs text-muted-foreground mt-2">
                    {progress.toLocaleString("ar-EG", {
                      maximumFractionDigits: 1,
                    })}%
                  </div>
                </div>
              </div>

              {isCompleted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-h-[400px] flex flex-col items-center justify-center text-center rounded-3xl border border-success/30 bg-success-soft p-8"
                >
                  <div className="size-24 rounded-full bg-success/10 flex items-center justify-center mb-6">
                    <Check className="size-12 text-success" />
                  </div>

                  <Sparkles className="text-gold size-7 mb-3" />

                  <h2 className="text-2xl font-bold mb-3">
                    تقبل الله منك
                  </h2>

                  <p className="text-muted-foreground mb-8">
                    أحسنت! لقد أتممت جميع أذكار هذا القسم.
                  </p>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                  >
                    العودة للأقسام
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  {filter[currentZekr] && (
                    <ZekrItem
                      key={`${tab}-${currentZekr}-${resetKey}`}
                      {...filter[currentZekr]}
                      type={tab}
                      handlingClickFN={handleNext}
                      handelCounting={handleCount}
                    />
                  )}
                </AnimatePresence>
              )}

              {!isCompleted && (
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Heart className="size-4 text-gold" />
                  اضغط على الذكر لاحتساب التكرار
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

type Z = Zekr & {
  handlingClickFN?: () => void;
  handelCounting: () => void;
  type: string;
};

export function ZekrItem({
  count,
  text,
  handlingClickFN,
  handelCounting,
}: Z) {
  const [clicks, setClicks] = useState(0);

  const remaining = Math.max(count - clicks, 0);
  const completed = remaining === 0;

  useEffect(() => {
    if (completed) {
      handlingClickFN?.();
    }
  }, [completed, handlingClickFN]);

  const handleClick = () => {
    if (completed) return;

    setClicks(prev => prev + 1);
    handelCounting();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={handleClick}
        disabled={completed}
        className="
          relative w-full min-h-[320px]
          flex flex-col items-center justify-center
          rounded-3xl p-7 sm:p-12
          border border-border
          bg-card text-card-foreground
          shadow-sm
          hover:border-primary/40
          transition-colors
          cursor-pointer
        "
      >
        <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-7">
          <BookOpen className="size-6 text-primary" />
        </div>

        <p className="text-xl sm:text-2xl leading-[2.2] font-semibold text-center whitespace-pre-line">
          {text}
        </p>

        <div className="mt-10 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">
            التكرارات المتبقية
          </span>

          <div
            className={`
              size-16 rounded-full flex items-center justify-center
              border-[3px] transition-colors
              ${
                completed
                  ? "border-success bg-success text-white"
                  : "border-gold bg-gold/10 text-gold"
              }
            `}
          >
            {completed ? (
              <Check className="size-7" />
            ) : (
              <span className="text-2xl font-bold tabular-nums">
                {remaining.toLocaleString("ar-EG")}
              </span>
            )}
          </div>
        </div>
      </motion.button>

      <div className="text-center mt-5 text-xs text-muted-foreground">
        {clicks.toLocaleString("ar-EG")} / {count.toLocaleString("ar-EG")} تكرار
      </div>
    </motion.section>
  );
}

export default Azkar;
