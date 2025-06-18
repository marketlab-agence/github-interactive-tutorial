import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitMerge, GitBranch, AlertTriangle, CheckCircle, X } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Alert from '../ui/Alert';

interface MergeScenario {
  id: string;
  title: string;
  description: string;
  sourceBranch: string;
  targetBranch: string;
  conflicts: string[];
  autoMergeable: boolean;
}

const MergeSimulator: React.FC = () => {
  const [scenarios] = useState<MergeScenario[]>([
    {
      id: 'clean-merge',
      title: 'Clean Merge',
      description: 'No conflicts, automatic merge possible',
      sourceBranch: 'feature/login',
      targetBranch: 'main',
      conflicts: [],
      autoMergeable: true
    },
    {
      id: 'conflict-merge',
      title: 'Merge with Conflicts',
      description: 'Conflicting changes in the same files',
      sourceBranch: 'feature/header',
      targetBranch: 'main',
      conflicts: ['src/components/Header.js', 'styles/main.css'],
      autoMergeable: false
    },
    {
      id: 'fast-forward',
      title: 'Fast-Forward Merge',
      description: 'Target branch has no new commits',
      sourceBranch: 'hotfix/bug-123',
      targetBranch: 'main',
      conflicts: [],
      autoMergeable: true
    }
  ]);

  const [selectedScenario, setSelectedScenario] = useState<MergeScenario>(scenarios[0]);
  const [mergeStep, setMergeStep] = useState<'select' | 'preview' | 'conflicts' | 'complete'>('select');
  const [resolvedConflicts, setResolvedConflicts] = useState<string[]>([]);

  const startMerge = (scenario: MergeScenario) => {
    setSelectedScenario(scenario);
    setMergeStep('preview');
    setResolvedConflicts([]);
  };

  const executeMerge = () => {
    if (selectedScenario.autoMergeable) {
      setMergeStep('complete');
    } else {
      setMergeStep('conflicts');
    }
  };

  const resolveConflict = (file: string) => {
    setResolvedConflicts([...resolvedConflicts, file]);
  };

  const completeMerge = () => {
    setMergeStep('complete');
  };

  const resetSimulator = () => {
    setMergeStep('select');
    setResolvedConflicts([]);
  };

  const renderScenarioSelection = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white mb-4">Choose a Merge Scenario</h3>
      {scenarios.map((scenario) => (
        <motion.div
          key={scenario.id}
          whileHover={{ scale: 1.02 }}
          className="cursor-pointer"
          onClick={() => startMerge(scenario)}
        >
          <Card className="hover:border-blue-500/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-white mb-2">{scenario.title}</h4>
                <p className="text-gray-300 text-sm mb-3">{scenario.description}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-400">{scenario.sourceBranch}</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-gray-400">{scenario.targetBranch}</span>
                  </div>
                  {!scenario.autoMergeable && (
                    <div className="flex items-center space-x-1 text-orange-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Conflicts</span>
                    </div>
                  )}
                </div>
              </div>
              <GitMerge className="h-6 w-6 text-gray-400" />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderMergePreview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Merge Preview</h3>
        <Button variant="secondary" onClick={() => setMergeStep('select')}>
          Back
        </Button>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-green-400" />
              <span className="font-medium text-white">{selectedScenario.sourceBranch}</span>
            </div>
            <GitMerge className="h-5 w-5 text-gray-400" />
            <div className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-blue-400" />
              <span className="font-medium text-white">{selectedScenario.targetBranch}</span>
            </div>
          </div>

          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="font-medium text-white mb-2">{selectedScenario.title}</h4>
            <p className="text-gray-300 text-sm">{selectedScenario.description}</p>
          </div>

          {selectedScenario.conflicts.length > 0 && (
            <Alert type="warning" title="Merge Conflicts Detected">
              The following files have conflicts that need to be resolved:
              <ul className="mt-2 space-y-1">
                {selectedScenario.conflicts.map((file, index) => (
                  <li key={index} className="text-sm font-mono">{file}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Button onClick={executeMerge} className="w-full">
            <GitMerge className="h-4 w-4 mr-2" />
            Execute Merge
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderConflictResolution = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Resolve Conflicts</h3>

      <Alert type="warning" title="Manual Resolution Required">
        Resolve all conflicts before completing the merge.
      </Alert>

      <div className="space-y-4">
        {selectedScenario.conflicts.map((file, index) => (
          <Card key={index}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  <span className="font-medium text-white">{file}</span>
                </div>
                {resolvedConflicts.includes(file) ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Button
                    size="sm"
                    onClick={() => resolveConflict(file)}
                  >
                    Resolve
                  </Button>
                )}
              </div>

              {!resolvedConflicts.includes(file) && (
                <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm">
                  <div className="text-red-400">{'<<<<<<< HEAD'}</div>
                  <div className="text-gray-300">Current changes in {selectedScenario.targetBranch}</div>
                  <div className="text-gray-500">{'======='}</div>
                  <div className="text-gray-300">Incoming changes from {selectedScenario.sourceBranch}</div>
                  <div className="text-green-400">{'>>>>>>> ' + selectedScenario.sourceBranch}</div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Button
        onClick={completeMerge}
        disabled={resolvedConflicts.length !== selectedScenario.conflicts.length}
        className="w-full"
      >
        Complete Merge
      </Button>
    </div>
  );

  const renderMergeComplete = () => (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex justify-center"
      >
        <CheckCircle className="h-16 w-16 text-green-400" />
      </motion.div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-2">Merge Successful!</h3>
        <p className="text-gray-300">
          {selectedScenario.sourceBranch} has been successfully merged into {selectedScenario.targetBranch}
        </p>
      </div>

      <Card>
        <div className="text-left space-y-2">
          <div className="font-mono text-sm text-green-400">
            $ git merge {selectedScenario.sourceBranch}
          </div>
          <div className="text-sm text-gray-300">
            Merge made by the 'recursive' strategy.
          </div>
          {selectedScenario.conflicts.length > 0 && (
            <div className="text-sm text-gray-300">
              {selectedScenario.conflicts.length} conflicts resolved.
            </div>
          )}
        </div>
      </Card>

      <Button onClick={resetSimulator}>
        Try Another Scenario
      </Button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Git Merge Simulator</h2>
        <p className="text-gray-300">Practice different merge scenarios and conflict resolution</p>
      </motion.div>

      <Card>
        <AnimatePresence mode="wait">
          <motion.div
            key={mergeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {mergeStep === 'select' && renderScenarioSelection()}
            {mergeStep === 'preview' && renderMergePreview()}
            {mergeStep === 'conflicts' && renderConflictResolution()}
            {mergeStep === 'complete' && renderMergeComplete()}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default MergeSimulator;