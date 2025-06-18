import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle, Circle, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Step {
  id: string;
  title: string;
  description: string;
  code?: string;
  tip?: string;
}

interface StepByStepProps {
  steps: Step[];
  title?: string;
  onComplete?: () => void;
}

const StepByStep: React.FC<StepByStepProps> = ({
  steps,
  title = "Step-by-Step Guide",
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const markStepComplete = (stepIndex: number) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const nextStep = () => {
    markStepComplete(currentStep);
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white text-center"
      >
        {title}
      </motion.h2>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Step Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    currentStep === index
                      ? 'bg-blue-600/20 border border-blue-500/30'
                      : 'hover:bg-gray-700/30'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : currentStep === index ? (
                      <Circle className="h-5 w-5 text-blue-400 fill-current" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      Step {index + 1}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {step.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Step Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      {steps[currentStep].title}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {currentStep + 1} of {steps.length}
                    </span>
                  </div>

                  <p className="text-gray-300 leading-relaxed">
                    {steps[currentStep].description}
                  </p>

                  {steps[currentStep].code && (
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                      <pre className="text-green-400 text-sm overflow-x-auto">
                        <code>{steps[currentStep].code}</code>
                      </pre>
                    </div>
                  )}

                  {steps[currentStep].tip && (
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="text-blue-300 font-medium mb-1">Tip</h4>
                          <p className="text-blue-100 text-sm">{steps[currentStep].tip}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="secondary"
              onClick={previousStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-1">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-blue-400'
                      : completedSteps.includes(index)
                      ? 'bg-green-400'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <Button onClick={nextStep}>
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepByStep;