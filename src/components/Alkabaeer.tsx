import { almawbiqat, kabaeer } from "@/constants/variables"
import { useMemo, useState } from "react"

export default function Alkabaeer() {
    const [activeTab, setActiveTab] = useState<"all" | "mowbiqat">("all")

    const displayedItems = useMemo(() => {
        if (activeTab === "mowbiqat") {
            return almawbiqat.map((item, index) => ({
                title: item.title,
                description: item.description,
                displayIndex: (index + 1).toLocaleString("ar-eg"),
                isMawbiqat: true
            }))
        }

        const mawbiqatTitles = new Set(almawbiqat.map(el => el.title.trim()))

        return kabaeer.map((item, index) => {
            const isMawbiqat = mawbiqatTitles.has(item.title.trim()) ||
                almawbiqat.some(el => el.title.includes(item.title) || item.title.includes(el.title))

            return {
                title: item.title,
                description: item.description,
                displayIndex: (index + 1).toLocaleString("ar-eg"),
                isMawbiqat
            }
        })
    }, [activeTab])

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 direction-rtl" dir="rtl">
            <h2 className="font-bold text-2xl border-b-2 border-green-500 pb-3 mb-6 text-zinc-800 dark:text-zinc-100">
                كبائر الذنوب والسبع الموبقات
            </h2>

            <section className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-5 mb-8 border border-zinc-100 dark:border-zinc-800">
                <h4 className="font-semibold text-lg text-green-700 dark:text-green-400 mb-2">ما هي كبائر الذنوب؟</h4>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                    كبائر الذنوب هي الذنوب العظيمة التي جاء في النصوص الشرعية ما يدل على شدتها، مثل أن يُرتَّب عليها حدٌّ في الدنيا، أو وعيدٌ خاص في الآخرة، أو لعن، أو غضب من الله، أو نفيٌ لكمال الإيمان.
                </p>
            </section>

            <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl mb-8 max-w-md">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === "all"
                            ? "bg-white dark:bg-zinc-800 text-green-600 dark:text-green-400 shadow-sm"
                            : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        }`}
                >
                    كل كبائر الذنوب ({kabaeer.length.toLocaleString("ar-eg")})
                </button>
                <button
                    onClick={() => setActiveTab("mowbiqat")}
                    className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === "mowbiqat"
                            ? "bg-white dark:bg-zinc-800 text-red-600 dark:text-red-400 shadow-sm"
                            : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        }`}
                >
                    السبع الموبقات ({almawbiqat.length.toLocaleString("ar-eg")})
                </button>
            </div>

            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedItems.map(({ title, description, displayIndex, isMawbiqat }) => (
                    <article
                        key={title}
                        className={`group relative rounded-2xl border border-solid p-5 transition-all duration-300 pb-2 shadow-sm hover:shadow-md ${isMawbiqat
                                ? "bg-red-50/30 dark:bg-red-950/10 border-red-200 dark:border-red-900/50 border-r-4 border-r-red-500"
                                : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 border-r-4 border-r-green-500"
                            }`}
                    >
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3 ${isMawbiqat
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                            }`}>
                            رقم {displayIndex}
                        </span>

                        <h3 className={`font-bold text-lg mb-2 transition-colors ${isMawbiqat
                                ? "text-red-700 dark:text-red-400"
                                : "text-zinc-800 dark:text-zinc-200 group-hover:text-green-600 dark:group-hover:text-green-400"
                            }`}>
                            {title}
                        </h3>

                        <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            {description}
                        </p>

                        {isMawbiqat && activeTab === "all" && (
                            <div className="mt-4 pt-3 border-t border-red-100 dark:border-red-950/50">
                                <span className="text-xs font-semibold text-red-500 dark:text-red-400 flex items-center gap-1">
                                    من السبع الموبقات المهلكات
                                </span>
                            </div>
                        )}
                    </article>
                ))}
            </section>
        </div>
    )
}