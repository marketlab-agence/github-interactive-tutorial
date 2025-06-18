import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage = true,
  className
}) => {
  return (
    <div className={`bg-gray-800 border-b border-gray-700 px-8 py-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">Overall Progress</span>
        {showPercentage && (
          <span className="text-sm text-gray-400">{progress}% Complete</span>
        )}
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
        />
      </div>
    </div>
  );
};

export default ProgressBar;