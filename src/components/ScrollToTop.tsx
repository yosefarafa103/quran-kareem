import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowBigUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        size="icon"
        variant="borderGreen"
        onClick={scrollToTop}
        className={`scroll-to-top ${show ? "fixed right-4 bottom-[150px] text-center z-[9] transition-all duration-700 py-2 pt-3 text-4xl bg-background border-solid border-2 border-green-500 size-12 flex items-center justify-center rounded-lg" : ""}`}
      >
        <ArrowBigUp />
      </button>
    </>
  );
}
