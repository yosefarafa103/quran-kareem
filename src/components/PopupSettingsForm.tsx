import {
    zodResolver
} from "@hookform/resolvers/zod"
import z from "zod"
import {
    cn
} from "@/lib/utils"
import {
    Button
} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { useFetchQuery } from "@/hooks/useFetchQuery"
import { getData } from "@/utils/getData"
import axios, { AxiosResponse } from "axios"
import { ComboboxReciter } from "./Combobox"
import { ReciterResponse } from "@/types/Reciters"
import { useMemo } from "react"
import Loader from "./Loader"

const formSchema = z.object({
    font_size: z.string(),
    font_type: z.string().optional(),
    scrolling_speed: z.string().optional(),
});

export default function PopupSettingsForm() {
    const fontSizes = useMemo(() => {
        return [{ size: 14, des: "صغير" },
        { size: 15, des: "متوسط" },
        { size: 20, des: "كبير" },
        { size: 22, des: "ضخم" }]
    }, [])
    // const getData = async (url: string) => {
    //     try {
    //         const data: AxiosResponse = await axios.get(`https://alquran.vip/APIs/reciters`);
    //         return data?.data;
    //     } catch (err) {
    //         throw new Error(err as any);
    //     }
    // };
    // reciters => reciter_id, reciter_name
    const { data, isLoading } = useFetchQuery<ReciterResponse>(getData, "fav-raider");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const vals: string[] = Object.keys(values);
            console.log(Object.hasOwn(values, "font_size"));
            vals.map((v, i) => {
                if (v === "font_size") {
                    switch (values[v]) {
                        case "متوسط":
                            return localStorage.setItem(v, `${fontSizes[1].size}px`)
                        case "صغير":
                            return localStorage.setItem(v, `${fontSizes[0].size}px`)
                        case "كبير":
                            return localStorage.setItem(v, `${fontSizes[2].size}px`)
                        case "ضخم":
                            return localStorage.setItem(v, `${fontSizes[3].size}px`)
                        default:
                            return localStorage.setItem(v, `18px`)
                    }
                }
                localStorage.setItem(v, `${values[v]}`)
                location.reload()
            })

        } catch (error) {
            console.error("Form submission error", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <FormField
                    control={form.control}
                    name="font_size"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>حجم الخط</FormLabel>
                            <Select dir="rtl" onValueChange={field.onChange} defaultValue={localStorage.key("font_size") || "متوسط"}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                </FormControl>
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

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="font_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>نوع الخط</FormLabel>
                            <Select dir="rtl" onValueChange={field.onChange} defaultValue={localStorage.getItem("font_type")! || "cairo"}>
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

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="scrolling_speed"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>سرعة النزول</FormLabel>
                            <Select dir="rtl" onValueChange={field.onChange} defaultValue={(localStorage.getItem("scrolling_speed") ? localStorage.getItem("scrolling_speed") : " طبيعي")!}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {[{ size: 0.2, des: "بطئ" }, { size: .5, des: "طبيعي" }, { size: 1, des: "سريع" }, { size: 1.5, des: "سريع جدا" },].map((el) => (
                                        <SelectItem value={el.size + ""}>{el.des}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* {!data?.reciters ? <Loader /> :
                    <ComboboxReciter data={data?.reciters!} />
                } */}
                <Button type="submit" className="block">حفظ</Button>
            </form>
        </Form>
    )
}