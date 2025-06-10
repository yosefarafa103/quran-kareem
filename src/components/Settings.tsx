import { useMemo } from "react"
import { FormControl } from "./ui/form"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

const Settings = () => {
    const fontSizes = useMemo(() => {
        return [{ size: 14, des: "صغير" },
        { size: 15, des: "متوسط" },
        { size: 20, des: "كبير" },
        { size: 22, des: "ضخم" }]
    }, [])
    return (
        <>
            <section className="p-5">

                <Label className="mb-3"> نوع الخط </Label>

                <Select dir="rtl" onValueChange={(e) => { localStorage.setItem("font_type", e); location.reload() }} defaultValue={localStorage.getItem("font_type")! || "cairo"}>
                    <SelectTrigger>
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="cairo"> خط كايرو</SelectItem>
                        <SelectItem value="tajawal "> خط تجوال</SelectItem>
                        <SelectItem value="amiri"> خط أميري</SelectItem>
                        <SelectItem value="almarai "> خط المراعي</SelectItem>
                        <SelectItem value="othmany "> خط العثماني</SelectItem>
                    </SelectContent>
                </Select>
                <Select dir="rtl" onValueChange={(e) => { localStorage.setItem("font_size", e); location.reload() }} defaultValue={localStorage.getItem("font_size")! || "cairo"}>
                    <SelectTrigger>
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        {fontSizes.map((item) => {
                            return (
                                <div className="flex items-center space-x-2">
                                    <SelectItem value={item.des}>{item.des}</SelectItem>
                                </div>
                            )
                        })}
                    </SelectContent>
                </Select>
                <Label className="mb-3 mt-6"> سرعة الانزلاق التلقائي  <span> 1 الي 10.. 1 تعني نزول سريع  </span> </Label>
                <section className="flex items-center gap-1 sm:gap-4 justify-between">
                    <Select dir="rtl" onValueChange={(e) => { localStorage.setItem("scrolling_speed", e); location.reload() }} defaultValue={localStorage.getItem("scrolling_speed")! || "3"}>
                        <SelectTrigger>
                            <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
                                return (
                                    <div className="flex items-center space-x-2">
                                        <SelectItem value={item + ""}>{item}</SelectItem>
                                    </div>
                                )
                            })}
                        </SelectContent>
                    </Select>

                </section>
            </section>
        </>
    )
}

export default Settings