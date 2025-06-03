import { motion } from 'framer-motion'
const FilterPopupWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.section
            className="bg-background fixed left-0 w-full h-screen z-[99999999] p-4 overflow-scroll"
            initial={{ top: "100%" }}
            animate={{ top: "0%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            exit={{ top: "100%" }}
        >
            {children}
        </motion.section>
    )
}

export default FilterPopupWrapper