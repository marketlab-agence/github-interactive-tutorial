import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Target } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface LessonContentProps {
  title: string;
  content: string;
  duration: number;
  objectives: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const LessonContent: React.FC<LessonContentProps> = ({
  title,
  content,
  duration,
  objectives,
  difficulty
}) => {
  const difficultyColors = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error'
  } as const;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <BookOpen className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={difficultyColors[difficulty]}>
            {difficulty === 'beginner' ? 'Débutant' : 
             difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
          </Badge>
          <div className="flex items-center space-x-1 text-gray-400">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{duration} min</span>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {content}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card
            header={
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-400" />
                <h3 className="font-semibold text-white">Objectifs d'Apprentissage</h3>
              </div>
            }
          >
            <ul className="space-y-2">
              {objectives.map((objective, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-2"
                >
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-gray-300 text-sm">{objective}</span>
                </motion.li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;