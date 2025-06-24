import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  onAnswer?: (correct: boolean) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  explanation,
  onAnswer
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      const isCorrect = selectedAnswer === correctAnswer;
      if (onAnswer) {
        onAnswer(isCorrect);
      }
    }
  };

  const reset = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <div className="space-y-6">
          <div className="flex items-start space-x-3">
            <HelpCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
            <h3 className="text-lg font-medium text-white leading-relaxed">
              {question}
            </h3>
          </div>

          <div className="space-y-3">
            {options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  showResult
                    ? index === correctAnswer
                      ? 'bg-green-900/20 border-green-500/50 text-green-100'
                      : index === selectedAnswer && index !== correctAnswer
                      ? 'bg-red-900/20 border-red-500/50 text-red-100'
                      : 'bg-gray-700/30 border-gray-600 text-gray-300'
                    : selectedAnswer === index
                    ? 'bg-blue-900/20 border-blue-500/50 text-blue-100'
                    : 'bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-600/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showResult
                      ? index === correctAnswer
                        ? 'border-green-400 bg-green-400'
                        : index === selectedAnswer && index !== correctAnswer
                        ? 'border-red-400 bg-red-400'
                        : 'border-gray-500'
                      : selectedAnswer === index
                      ? 'border-blue-400 bg-blue-400'
                      : 'border-gray-500'
                  }`}>
                    {showResult && index === correctAnswer && (
                      <CheckCircle className="h-4 w-4 text-white" />
                    )}
                    {showResult && index === selectedAnswer && index !== correctAnswer && (
                      <XCircle className="h-4 w-4 text-white" />
                    )}
                    {!showResult && selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-lg border ${
                  isCorrect
                    ? 'bg-green-900/20 border-green-500/30'
                    : 'bg-red-900/20 border-red-500/30'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <h4 className={`font-medium mb-2 ${
                      isCorrect ? 'text-green-100' : 'text-red-100'
                    }`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h4>
                    <p className={`text-sm ${
                      isCorrect ? 'text-green-200' : 'text-red-200'
                    }`}>
                      {explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between">
            {showResult ? (
              <Button onClick={reset} variant="secondary">
                Réessayer
              </Button>
            ) : (
              <div />
            )}
            {!showResult ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
              >
                Soumettre
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  if (onAnswer && isCorrect) {
                    onAnswer(true);
                  }
                }}
              >
                Continuer
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuizQuestion;