
import {
    useForm
} from "react-hook-form"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import z from "zod"
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
    Input
} from "@/components/ui/input"
import { Button } from "./ui/button"
import { Dispatch, SetStateAction } from "react"

const FormSearchAyahs = ({ setOpen, isOpen, setSearchedAyah, }: { setSearchedAyah: Dispatch<SetStateAction<string>>, setOpen: () => void, isOpen: boolean }) => {
    const formSchema = z.object({
        searchValue: z.string({ message: "اكتب الاية المراد البحث عنها " }).min(1, { message: "حقل اجباري" })
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            { JSON.stringify(values, null, 2) }
            setSearchedAyah(values.searchValue)
            setOpen(false)

        } catch (error) {
            console.error("Form submission error", error);
            // "Failed to submit the form. Please try again."
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10 w-full">
                <FormField
                    control={form.control}
                    name="searchValue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ابحث عن الاية..</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="..."
                                    type=""
                                    {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant={"default"}>بحث</Button>
            </form>
        </Form>
    )
}

export default FormSearchAyahs