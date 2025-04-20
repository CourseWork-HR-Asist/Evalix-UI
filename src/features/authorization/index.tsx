import { Typography, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          className="max-w-3xl w-full p-6 md:p-10 rounded-xl shadow-lg bg-white dark:bg-gray-800"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Typography variant="h2" className="text-center mb-4 text-gray-800 dark:text-gray-200"
           placeholder=""
           onPointerEnterCapture={() => {}}
           onPointerLeaveCapture={() => {}}>
            Welcome
            </Typography>
        </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
