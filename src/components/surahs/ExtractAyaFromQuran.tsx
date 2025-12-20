import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Search } from "lucide-react";
import FormSearchAyahs from "../FormSearchAyahs";

type ExtractAyaFromQuranProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchedAyah: React.Dispatch<React.SetStateAction<string>>;
};

const ExtractAyaFromQuran: React.FC<ExtractAyaFromQuranProps> = ({
  isOpen,
  setIsOpen,
  setSearchedAyah,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="fixed size-[45px] transition-all duration-700 bottom-[20px] right-4 text-primary p-[10px] rounded-lg border-solid border-[#000] border-2 cursor-pointer flex bg-background items-center justify-center z-[99999999999999]">
          <Search />
        </div>
      </DialogTrigger>

      <DialogContent className="bg-black">
        <DialogTitle>استخراج آية من القرآن</DialogTitle>

        <FormSearchAyahs
          setSearchedAyah={setSearchedAyah}
          setOpen={setIsOpen}
          isOpen={isOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExtractAyaFromQuran;
