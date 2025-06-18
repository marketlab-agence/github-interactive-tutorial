import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';
import Card from '../ui/Card';

interface ConceptExplanationProps {
  title: string;
  description: string;
  keyPoints: string[];
  visual?: React.ReactNode;
  examples?: Array<{
    title: string;
    description: string;
    code?: string;
  }>;
}

const ConceptExplanation: React.FC<ConceptExplanationProps> = ({
  title,
  description,
  keyPoints,
  visual,
  examples = []
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <Lightbulb className="h-8 w-8 text-yellow-400" />
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">{description}</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Key Points */}
        <Card
          header={
            <h3 className="text-lg font-semibold text-white flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              Key Concepts
            </h3>
          }
        >
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{point}</span>
              </motion.li>
            ))}
          </ul>
        </Card>

        {/* Visual */}
        {visual && (
          <Card>
            <div className="flex items-center justify-center min-h-[200px]">
              {visual}
            </div>
          </Card>
        )}
      </div>

      {/* Examples */}
      {examples.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Examples</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <div className="space-y-3">
                    <h4 className="font-medium text-white">{example.title}</h4>
                    <p className="text-gray-300 text-sm">{example.description}</p>
                    {example.code && (
                      <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptExplanation;