import { motion } from "framer-motion";
import { Spinner } from "@material-tailwind/react";
import { materialProps } from "../ui/helpers/materialTailwind";
import { ComponentProps } from "react";

interface LoadingOverlayProps {
  messages: string[];
  currentMessageIndex: number;
}

const LoadingOverlay = ({ messages, currentMessageIndex }: LoadingOverlayProps) => {
  return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 bg-opacity-75 z-50 rounded-lg">
          <Spinner
              className="h-12 w-12 text-blue-500 mb-4"
              {...materialProps<ComponentProps<typeof Spinner>>()}
          />
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-medium text-gray-700 dark:text-gray-300 text-center"
          >
              {messages[currentMessageIndex]}
          </motion.div>
      </div>
  );
};

export default LoadingOverlay;
