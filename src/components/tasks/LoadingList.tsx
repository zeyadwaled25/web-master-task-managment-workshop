import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingList() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="sm:absolute flex h-full w-full sm:min-h-[360px] items-center justify-center"
    >
      <div className="flex flex-col items-center text-center text-muted-foreground">
        <Loader2 className="w-10 h-10 mb-3 animate-spin" />
        <p className="text-lg font-medium">Loading tasks…</p>
        <p className="text-sm">Please wait a moment.</p>
      </div>
    </motion.div>
  );
}
