import { Typography, Card } from "@material-tailwind/react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          className="max-w-3xl w-full p-6 md:p-10 rounded-xl shadow-lg bg-white dark:bg-gray-800" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Typography
              variant="h4"
              className="mb-4 text-gray-900 dark:text-white text-center"
            >
              About Us
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Typography
              className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
            >
              Evalix is a learning project built for educational purposes. It
              focuses on improving skills in frontend development, user
              interface design, dark/light themes, local data storage, and
              modern UX practices.
            </Typography>

            <Typography
              className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
            >
              This project is not intended for any commercial use. It is not
              meant for sale, advertising, or collecting any user data.
              Everything here is created strictly as part of personal or
              educational exploration.
            </Typography>

            <Typography
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              If you notice any issues or have suggestions for improvement, feel
              free to reach out. Thanks for visiting!
            </Typography>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
