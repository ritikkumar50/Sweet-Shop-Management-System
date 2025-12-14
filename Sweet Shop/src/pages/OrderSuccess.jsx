import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => prev - 1);
        }, 1000);

        const redirect = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirect);
        };
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#FFFBF9] dark:bg-slate-900 flex flex-col items-center justify-center p-4 transition-colors duration-300">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-200 dark:shadow-green-900/20"
            >
                <motion.div
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Check className="w-16 h-16 text-white" strokeWidth={3} />
                </motion.div>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-serif font-bold text-[#4A3B32] dark:text-white mb-4 text-center"
            >
                Order is placed
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-500 dark:text-gray-400 text-lg mb-8"
            >
                Thank you for your purchase!
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col items-center gap-2"
            >
                <button
                    onClick={() => navigate('/')}
                    className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors"
                >
                    Back to home
                </button>
                <p className="text-sm text-gray-400">
                    Redirecting in {count} seconds...
                </p>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
