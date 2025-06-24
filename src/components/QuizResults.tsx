import React from 'react';
import { CheckCircle, XCircle, ArrowRight, BookOpen } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  onRetry: () => void;
  onContinue: () => void;
  onReview: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  onRetry,
  onContinue,
  onReview
}) => {
  const isPassed = score >= 80;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Résultats du Quiz</h2>
        <p className="text-gray-300">Votre performance sur ce quiz</p>
      </div>

      <Card>
        <div className="text-center space-y-6">
          <div className={`text-6xl font-bold ${isPassed ? 'text-green-400' : 'text-red-400'}`}>
            {score}%
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <span className="text-gray-300">
              {correctAnswers} correctes sur {totalQuestions} questions
            </span>
          </div>
          
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h3 className={`text-xl font-semibold ${isPassed ? 'text-green-300' : 'text-red-300'} mb-2`}>
              {isPassed ? 'Félicitations !' : 'Vous pouvez faire mieux !'}
            </h3>
            <p className="text-gray-300">
              {isPassed 
                ? 'Vous avez réussi ce quiz avec succès. Vous pouvez maintenant passer au chapitre suivant.' 
                : 'Un score minimum de 80% est nécessaire pour valider ce chapitre. Révisez les leçons et réessayez.'}
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            {!isPassed && (
              <>
                <Button variant="secondary" onClick={onReview}>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Réviser les leçons
                </Button>
                <Button onClick={onRetry}>
                  Réessayer le quiz
                </Button>
              </>
            )}
            
            {isPassed && (
              <Button onClick={onContinue}>
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

export default QuizResults;