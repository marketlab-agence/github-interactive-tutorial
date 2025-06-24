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
    
    // Simuler un délai d'exécution
    await new Promise(resolve => setTimeout(resolve, 1000));

    const isCorrect = currentCommand.trim() === expectedCommand;
    const output = isCorrect 
      ? 'Commande exécutée avec succès !' 
      : `Erreur : Attendu "${expectedCommand}", reçu "${currentCommand}"`;

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
      <div className="bg-gray-800/50 rounded-xl p-3 sm:p-6 border border-gray-700">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-start sm:space-x-3 mb-4 gap-2">
          <Terminal className="h-6 w-6 text-green-400" />
          <h3 className="text-lg sm:text-xl font-semibold text-white">Simulateur de Commandes Git</h3>
        </div>
        
        <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">
          Pratiquez les commandes Git dans un environnement sécurisé. Essayez d'exécuter : <code className="bg-gray-700 px-2 py-1 rounded text-green-400">{expectedCommand}</code>
        </p>

        {/* Historique des commandes */}
        <div className="bg-gray-900 rounded-lg p-4 mb-4 min-h-[200px] max-h-[300px] overflow-y-auto font-mono text-sm">
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
          
          {/* Saisie actuelle */}
          <div className="flex items-center text-blue-400">
            <span className="text-gray-500 mr-2">$</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
              placeholder="Tapez une commande Git..."
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

        {/* Commandes disponibles */}
        <div className="mb-4 overflow-x-auto">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Commandes disponibles</h4>
          <div className="flex flex-wrap gap-2 pb-2">
            {availableCommands.map((cmd, index) => (
              <button
                key={index}
                onClick={() => setCurrentCommand(cmd)}
                className="px-2 sm:px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs sm:text-sm rounded transition-colors whitespace-nowrap"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Contrôles */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={executeCommand}
            disabled={!currentCommand.trim() || isExecuting}
            loading={isExecuting}
            className="w-full sm:flex-1 min-w-0"
            className="w-full sm:flex-1 min-w-0"
          >
            <Play className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Exécuter</span>
          </Button>
          <Button
            variant="secondary"
            onClick={resetSimulator}
            className="w-full sm:flex-1 min-w-0"
            className="w-full sm:flex-1 min-w-0"
          >
            <RotateCcw className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Réinitialiser</span>
            <span className="inline sm:hidden">Reset</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GitCommandSimulator;