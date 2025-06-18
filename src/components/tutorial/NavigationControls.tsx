import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home, BookOpen } from 'lucide-react';
import Button from '../ui/Button';

interface NavigationControlsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onHome?: () => void;
  onChapterOverview?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  showProgress?: boolean;
  currentStep?: number;
  totalSteps?: number;
  disabled?: {
    previous?: boolean;
    next?: boolean;
  };
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPrevious,
  onNext,
  onHome,
  onChapterOverview,
  previousLabel = "Previous",
  nextLabel = "Next",
  showProgress = false,
  currentStep = 1,
  totalSteps = 1,
  disabled = {}
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-6 bg-gray-800/30 border-t border-gray-700"
    >
      {/* Left Side - Previous & Home */}
      <div className="flex items-center space-x-3">
        {onHome && (
          <Button variant="ghost" onClick={onHome}>
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
        )}
        {onChapterOverview && (
          <Button variant="ghost" onClick={onChapterOverview}>
            <BookOpen className="h-4 w-4 mr-2" />
            Overview
          </Button>
        )}
        {onPrevious && (
          <Button
            variant="secondary"
            onClick={onPrevious}
            disabled={disabled.previous}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {previousLabel}
          </Button>
        )}
      </div>

      {/* Center - Progress Indicator */}
      {showProgress && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">
            {currentStep} of {totalSteps}
          </span>
          <div className="flex space-x-1">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index < currentStep
                    ? 'bg-green-400'
                    : index === currentStep - 1
                    ? 'bg-blue-400'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Right Side - Next */}
      <div>
        {onNext && (
          <Button
            onClick={onNext}
            disabled={disabled.next}
          >
            {nextLabel}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default NavigationControls;