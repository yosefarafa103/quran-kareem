import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CSSProperties } from "react";

const ContentViewerPopup = ({ children, style }: { children: React.ReactNode, style?: CSSProperties }) => {
    return (
        <motion.section
            style={style}
            className={cn("bg-background fixed left-0 w-full h-screen z-[100] p-4 overflow-scroll")}
            initial={{ top: "100%" }}
            animate={{ top: "0%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            exit={{ top: "100%" }}
        >
            {children}
        </motion.section>
    );
};

export default ContentViewerPopup;
