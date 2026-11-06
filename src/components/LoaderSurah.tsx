import { replaceNumsEnglishToArabic } from "@/utils/helpers"
import { JuzItem } from "./SurahText"
function randomNumber(max: number) {
    return Math.floor((Math.random() * 1) * max)
}
function randomBool() {
    return Boolean(Math.floor(Math.random() * 3))
}
function generateRows() {
    let dives = randomNumber(4);
    return Array.from({ length: dives }).map((_, i) => {
        let percent = randomNumber(90)
        let inFront = randomBool()
        let inBack = true
        return { percent, inFront, inBack }
    })
}
function makeRows() {
    let rows = generateRows();
    let total = rows.map((el) => {
        return el.percent
    }).reduce((a, e) => a + e, 1)
    if (total < 100) {
        rows.push({ percent: 100 - total, inBack: randomBool(), inFront: randomBool() })
        return rows
    } else {
        let max = rows.filter((el) => el.percent == Math.max(...rows.map(e => e.percent)))
        let rest = rows.filter((el) => el.percent !== max[0]?.percent)
        let restTotal = rest.map(e => e.percent).reduce((a, e) => a + e, 0)
        rest.push({
            percent: 100 - restTotal,
            inFront: false,
            inBack
                : true
        })
        return rest
    }
}
const LoaderSurah = () => {
    return (
        <>
            <JuzItem
                style={{ marginInline: '10px', }}
                font={18}
                juzNum={replaceNumsEnglishToArabic('12')}
            >
                <span className="bg-gray-400 size-5 w-full animate-pulse" />
            </JuzItem>
            <section className="mb-2 pb-[70px] text-center p-2">
                < >
                    {Array.from({ length: 40 }).map((_ => {
                        let rows = makeRows()
                        return <div>
                            {
                                <div className="flex gap-1 items-center">
                                    {rows.map(({ percent, inFront }) => (
                                        <div style={{ width: `${percent}%` }} className="h-10 flex items-center" >

                                            <span className="dark:bg-green-200/50 bg-green-500/50 size-5 w-full animate-pulse" />
                                            {inFront &&
                                                <span
                                                    className=" dark:border-green-200/50 border-green-500/50 size-4 rounded-sm isolate p-2 text-gray-200 mx-1 border-solid border-2 border-gray-200 inline-flex items-center justify-center text-[18px] animate-pulse "
                                                />
                                            }
                                        </div>
                                    ))}
                                </div>
                            }

                        </div>
                    }))}
                </>
            </section>

        </>
    )
}

export default LoaderSurah
