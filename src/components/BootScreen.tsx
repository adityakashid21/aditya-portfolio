import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
    onComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
    const [bootProgress, setBootProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBootProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => onComplete(), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="boot-content">
                <motion.div
                    className="boot-logo"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    👨‍💻
                </motion.div>
                <motion.h1
                    className="boot-title"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Aditya's Portfolio
                </motion.h1>
                <motion.p
                    className="boot-subtitle"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Loading...
                </motion.p>
                <div className="boot-progress-container">
                    <div className="boot-progress-bar">
                        <motion.div
                            className="boot-progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${bootProgress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </div>
                    <span className="boot-percentage">{bootProgress}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default BootScreen;
