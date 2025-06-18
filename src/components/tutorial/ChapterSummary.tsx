import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, Target, ArrowRight, Award } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface ChapterSummaryProps {
  chapterNumber: number;
  title: string;
  completedObjectives: string[];
  keyTakeaways: string[];
  nextChapterTitle?: string;
  onContinue?: () => void;
  onReview?: () => void;
}

const ChapterSummary: React.FC<ChapterSummaryProps> = ({
  chapterNumber,
  title,
  completedObjectives,
  keyTakeaways,
  nextChapterTitle,
  onContinue,
  onReview
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <Award className="h-12 w-12 text-yellow-400" />
        </div>
        <h1 className="text-3xl font-bold text-white">Chapter {chapterNumber} Complete!</h1>
        <p className="text-xl text-gray-300">{title}</p>
        <Badge variant="success" size="md">
          All objectives completed
        </Badge>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Completed Objectives */}
        <Card
          header={
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Objectives Completed</h3>
            </div>
          }
        >
          <ul className="space-y-3">
            {completedObjectives.map((objective, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{objective}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        {/* Key Takeaways */}
        <Card
          header={
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Key Takeaways</h3>
            </div>
          }
        >
          <ul className="space-y-3">
            {keyTakeaways.map((takeaway, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-300">{takeaway}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Progress Visualization */}
      <Card>
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-white">Your Progress</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{completedObjectives.length}</div>
              <div className="text-sm text-gray-400">Objectives</div>
            </div>
            <div className="w-px h-8 bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{chapterNumber}</div>
              <div className="text-sm text-gray-400">Chapters</div>
            </div>
            <div className="w-px h-8 bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <div className="text-sm text-gray-400">Complete</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button variant="secondary" onClick={onReview}>
          Review Chapter
        </Button>
        {nextChapterTitle && (
          <Button onClick={onContinue}>
            <span>Continue to: {nextChapterTitle}</span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default ChapterSummary;