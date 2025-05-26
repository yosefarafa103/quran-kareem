import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { cn } from "@/lib/utils"
import { Reciter, ReciterResponse } from "@/types/Reciters"

export function ComboboxReciter({ data }: { data: Reciter[] }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? data.find((val) => val.reciter_name === value)?.reciter_name
                            : "اختر القارئ"
                        }
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="اختر القارئ" />
                        <CommandList>
                            <CommandEmpty>لا يوجد قارئ صحيح !</CommandEmpty>
                            <CommandGroup>
                                {data?.map((item) => (
                                    <CommandItem
                                        key={item.reciter_id}
                                        value={item.reciter_name}
                                        onSelect={(currentValue) => {
                                            console.log(currentValue);

                                            setValue(currentValue === value ? "" : currentValue)
                                            localStorage.setItem("reciter_name", item.reciter_id)
                                            setOpen(false)
                                        }}
                                        className="mb-2"
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === item.reciter_name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {item.reciter_name}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </>
    )
}