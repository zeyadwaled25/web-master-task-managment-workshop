import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyList() {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="sm:absolute flex h-full w-full sm:min-h-[360px] items-center justify-center"
    >
      <div className="flex flex-col items-center text-center text-muted-foreground">
        <ClipboardList className="w-12 h-12 mb-3" />
        <p className="text-lg font-medium">No tasks yet</p>
        <p className="text-sm">
          Create your first task or adjust your filters to see existing ones.
        </p>
      </div>
    </motion.div>
  );
}
