import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import CodeBlock from '../ui/CodeBlock';

interface GitCommandSimulatorProps {
  availableCommands?: string[];
  expectedCommand?: string;
  onCommandExecute?: (command: string) => void;
}

const GitCommandSimulator: React.FC<GitCommandSimulatorProps> = ({
  availableCommands = ['git init', 'git add .', 'git commit -m "message"', 'git status'],
  expectedCommand = 'git init',
  onCommandExecute
}) => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [history, setHistory] = useState<Array<{command: string, output: string, success: boolean}>>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  const executeCommand = async () => {
    if (!currentCommand.trim()) return;

    setIsExecuting(true);
    
    // Simulate command execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const isCorrect = currentCommand.trim() === expectedCommand;
    const output = isCorrect 
      ? 'Command executed successfully!' 
      : `Error: Expected "${expectedCommand}", got "${currentCommand}"`;

    const newEntry = {
      command: currentCommand,
      output,
      success: isCorrect
    };

    setHistory(prev => [...prev, newEntry]);
    setCurrentCommand('');
    setIsExecuting(false);

    if (onCommandExecute) {
      onCommandExecute(currentCommand);
    }
  };

  const resetSimulator = () => {
    setHistory([]);
    setCurrentCommand('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <Terminal className="h-6 w-6 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Git Command Simulator</h3>
        </div>
        
        <p className="text-gray-300 mb-6">
          Practice Git commands in a safe environment. Try executing: <code className="bg-gray-700 px-2 py-1 rounded text-green-400">{expectedCommand}</code>
        </p>

        {/* Command History */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4 min-h-[200px] font-mono text-sm">
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3"
              >
                <div className="flex items-center text-blue-400">
                  <span className="text-gray-500 mr-2">$</span>
                  <span>{entry.command}</span>
                </div>
                <div className={`ml-4 text-sm ${entry.success ? 'text-green-400' : 'text-red-400'}`}>
                  {entry.success ? (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>{entry.output}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4" />
                      <span>{entry.output}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Current Input */}
          <div className="flex items-center text-blue-400">
            <span className="text-gray-500 mr-2">$</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
              placeholder="Type a Git command..."
              className="bg-transparent border-none outline-none flex-1 text-blue-400"
              disabled={isExecuting}
            />
            {isExecuting && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-2"
              >
                |
              </motion.span>
            )}
          </div>
        </div>

        {/* Available Commands */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Available Commands:</h4>
          <div className="flex flex-wrap gap-2">
            {availableCommands.map((cmd, index) => (
              <button
                key={index}
                onClick={() => setCurrentCommand(cmd)}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm rounded transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex space-x-3">
          <Button
            onClick={executeCommand}
            disabled={!currentCommand.trim() || isExecuting}
            loading={isExecuting}
          >
            <Play className="h-4 w-4 mr-2" />
            Execute
          </Button>
          <Button
            variant="secondary"
            onClick={resetSimulator}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GitCommandSimulator;