import { AnimatePresence, motion } from "framer-motion";

type Props = {
  isVisible: boolean;
};

export function FullPageLoader({ isVisible }: Props) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="absolute inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="animate-pulse">Loading...</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
