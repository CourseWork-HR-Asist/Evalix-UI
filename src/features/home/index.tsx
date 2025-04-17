import React from "react";
import { motion } from "framer-motion";
import { NavbarWithSolidBackground } from "../../components/layout/NavBar";

// Heroicons
import {
  DocumentMagnifyingGlassIcon,
  SparklesIcon,
  ScaleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

const features = [
    {
      icon: (
        <DocumentMagnifyingGlassIcon className="h-8 w-8 text-brand-500 dark:text-brand-400" />
      ),
      title: "AI-Powered Resume Analysis",
      description:
        "Automatically scan and interpret resumes with deep-learning technology.",
    },
    {
      icon: (
        <SparklesIcon className="h-8 w-8 text-brand-500 dark:text-brand-400" />
      ),
      title: "Smart Skill & Role Matching",
      description:
        "Instantly see how well candidates align with the job profile.",
    },
    {
      icon: <ScaleIcon className="h-8 w-8 text-brand-500 dark:text-brand-400" />,
      title: "Bias-Free Screening",
      description:
        "Ensure fairness with consistent, objective candidate evaluations.",
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-brand-500 dark:text-brand-400" />,
      title: "Faster Hiring Decisions",
      description:
        "Save hours of manual work and focus on the best-fit talent.",
    },
  ];

const HomePage: React.FC = () => {
  return (
    <div className="dark:bg-gray-900">
      <NavbarWithSolidBackground />
      <div className="flex flex-col items-center justify-center px-4 py-12 text-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Evalix – Smarter Hiring with AI
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-6 max-w-3xl text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Revolutionizing HR with Intelligent Resume Analysis
        </motion.p>

        <motion.img
          src="https://img.freepik.com/free-vector/documents-concept-illustration_114360-138.jpg?ga=GA1.1.2041224526.1744868957&semt=ais_hybrid&w=740"
          alt="AI Resume Analysis"
          className="w-full max-w-md md:max-w-xl rounded-xl shadow-lg mb-12 dark:shadow-gray-800"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl w-full px-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-left flex items-start gap-4 hover:shadow-xl dark:hover:shadow-gray-700 transition"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div>{feature.icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="max-w-2xl text-gray-700 dark:text-gray-300 text-base md:text-lg px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Whether you're part of a growing startup or an enterprise HR team, Evalix is designed to supercharge your recruitment process and help you hire the right people—faster and smarter.
          <br />
          <span className="font-semibold block mt-4 text-gray-900 dark:text-white">
            Evalix – The Future of Hiring, Powered by AI.
          </span>
        </motion.p>
      </div>
    </div>
  );
};

export default HomePage;
