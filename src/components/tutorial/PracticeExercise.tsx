import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Terminal from '../ui/Terminal';

interface PracticeExerciseProps {
  title: string;
  description: string;
  instructions: string[];
  expectedCommands: string[];
  hints?: string[];
  onComplete?: () => void;
}

const PracticeExercise: React.FC<PracticeExerciseProps> = ({
  title,
  description,
  instructions,
  expectedCommands,
  hints = [],
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<Array<{command: string, success: boolean}>>([]);
  const [showHint, setShowHint] = useState(false);

  const executeCommand = () => {
    const isCorrect = userInput.trim() === expectedCommands[currentStep];
    const newEntry = { command: userInput, success: isCorrect };
    
    setCommandHistory([...commandHistory, newEntry]);
    
    if (isCorrect) {
      if (currentStep < instructions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else if (onComplete) {
        onComplete();
      }
    }
    
    setUserInput('');
    setShowHint(false);
  };

  const resetExercise = () => {
    setCurrentStep(0);
    setUserInput('');
    setCommandHistory([]);
    setShowHint(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Instructions */}
        <Card
          header={
            <h3 className="text-lg font-semibold text-white">Instructions</h3>
          }
        >
          <div className="space-y-4">
            {instructions.map((instruction, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-3 rounded-lg ${
                  index === currentStep
                    ? 'bg-blue-900/20 border border-blue-500/30'
                    : index < currentStep
                    ? 'bg-green-900/20 border border-green-500/30'
                    : 'bg-gray-700/20'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {index < currentStep ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : index === currentStep ? (
                    <div className="w-5 h-5 bg-blue-400 rounded-full animate-pulse" />
                  ) : (
                    <div className="w-5 h-5 bg-gray-500 rounded-full" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-white mb-1">
                    Step {index + 1}
                  </div>
                  <div className="text-sm text-gray-300">
                    {instruction}
                  </div>
                </div>
              </div>
            ))}

            {hints[currentStep] && (
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Button>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
                  >
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5" />
                      <p className="text-yellow-100 text-sm">{hints[currentStep]}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Terminal */}
        <Card
          header={
            <h3 className="text-lg font-semibold text-white">Practice Terminal</h3>
          }
        >
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4 min-h-[200px] font-mono text-sm">
              {commandHistory.map((entry, index) => (
                <div key={index} className="mb-2">
                  <div className="flex items-center text-blue-400">
                    <span className="text-gray-500 mr-2">$</span>
                    <span>{entry.command}</span>
                  </div>
                  <div className={`ml-4 text-xs ${
                    entry.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {entry.success ? (
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Command executed successfully</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Expected: {expectedCommands[currentStep]}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="flex items-center text-blue-400">
                <span className="text-gray-500 mr-2">$</span>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
                  placeholder="Type your command here..."
                  className="bg-transparent border-none outline-none flex-1 text-blue-400"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={executeCommand} disabled={!userInput.trim()}>
                <Play className="h-4 w-4 mr-2" />
                Execute
              </Button>
              <Button variant="secondary" onClick={resetExercise}>
                Reset
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PracticeExercise;