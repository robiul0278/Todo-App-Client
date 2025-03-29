import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "../theme-provider";

const CardSkeleton = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <motion.div
      className={`shadow-md rounded-xl p-4 w-full mx-auto border space-y-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-300"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="w-3 h-3 rounded-full" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>

      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-2 w-full" />

      <div className="flex justify-center space-x-5 mt-6">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
    </motion.div>
  );
};

export default CardSkeleton;