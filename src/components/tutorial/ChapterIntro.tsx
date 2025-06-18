import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Clock, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface ChapterIntroProps {
  chapterNumber: number;
  title: string;
  description: string;
  objectives: string[];
  estimatedTime: number;
  onStart: () => void;
}

const ChapterIntro: React.FC<ChapterIntroProps> = ({
  chapterNumber,
  title,
  description,
  objectives,
  estimatedTime,
  onStart
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center space-x-3 bg-blue-900/20 px-6 py-3 rounded-full border border-blue-500/30">
          <BookOpen className="h-6 w-6 text-blue-400" />
          <span className="text-blue-300 font-medium">Chapter {chapterNumber}</span>
        </div>
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">{description}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card
          header={
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Learning Objectives</h3>
            </div>
          }
        >
          <ul className="space-y-3">
            {objectives.map((objective, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-400 text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-300">{objective}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        <Card
          header={
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Chapter Overview</h3>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Estimated Time</span>
              <span className="text-white font-medium">{estimatedTime} minutes</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Lessons</span>
              <span className="text-white font-medium">{objectives.length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <span className="text-gray-300">Difficulty</span>
              <span className="text-green-400 font-medium">Beginner</span>
            </div>
          </div>
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Button
          size="lg"
          onClick={onStart}
          className="px-8 py-4"
        >
          <span>Start Chapter {chapterNumber}</span>
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default ChapterIntro;