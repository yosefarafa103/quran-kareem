import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Search } from "lucide-react";
import FormSearchAyahs from "../FormSearchAyahs";
import { Dispatch, SetStateAction, useState } from "react";
type Props = {
  setSearchedAyah: Dispatch<SetStateAction<string>>;
};
const SearchForAyah = ({ setSearchedAyah }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div
          className={`fixed size-[45px] transition-all duration-700 bottom-[50px] right-4 bg-background text-primary p-[10px] rounded-lg border-solid border-[#000] border-2 cursor-pointer flex items-center justify-center `}
        >
          <Search />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-foreground border-green-400">
        <DialogTitle className="text-green-400">البحث عن اية معينه</DialogTitle>
        <FormSearchAyahs
          setSearchedAyah={setSearchedAyah}
          setOpen={setIsOpen}
          isOpen={isOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SearchForAyah;
