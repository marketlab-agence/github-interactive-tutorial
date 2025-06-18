import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, BookOpen } from 'lucide-react';

interface ChapterHeaderProps {
  chapterNumber: number;
  title: string;
  objectives: string[];
  estimatedTime?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

const ChapterHeader: React.FC<ChapterHeaderProps> = ({
  chapterNumber,
  title,
  objectives,
  estimatedTime = 30,
  difficulty = 'beginner'
}) => {
  const difficultyColors = {
    beginner: 'text-green-400 bg-green-900/20',
    intermediate: 'text-yellow-400 bg-yellow-900/20',
    advanced: 'text-red-400 bg-red-900/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 border-b border-gray-700 px-8 py-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">
                Chapter {chapterNumber}: {title}
              </h1>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[difficulty]}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{estimatedTime} minutes</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>{objectives.length} objectives</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/30 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
          <Target className="h-4 w-4 mr-2" />
          Learning Objectives
        </h3>
        <ul className="space-y-2">
          {objectives.map((objective, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-2 text-sm text-gray-300"
            >
              <span className="text-blue-400 mt-1">•</span>
              <span>{objective}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ChapterHeader;