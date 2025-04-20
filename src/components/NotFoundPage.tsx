import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white px-4"
        >
            <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-5xl font-bold mb-4"
            >
                404
            </motion.h1>
            <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
                Go back to Home
            </Link>
        </motion.div>
    );
};

export default NotFoundPage;
