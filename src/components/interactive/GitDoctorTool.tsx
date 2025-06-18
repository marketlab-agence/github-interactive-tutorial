import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle, CheckCircle, RefreshCw, Terminal, Lightbulb } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Alert from '../ui/Alert';
import CodeBlock from '../ui/CodeBlock';

interface GitIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  solution: string;
  commands: string[];
  severity: 'low' | 'medium' | 'high';
}

const GitDoctorTool: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [issues, setIssues] = useState<GitIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<GitIssue | null>(null);

  const mockIssues: GitIssue[] = [
    {
      id: '1',
      type: 'error',
      title: 'Detached HEAD State',
      description: 'Your repository is in a detached HEAD state. This means you\'re not on any branch.',
      solution: 'Create a new branch or checkout an existing branch to continue working.',
      commands: ['git checkout -b new-branch-name', 'git checkout main'],
      severity: 'high'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Uncommitted Changes',
      description: 'You have uncommitted changes in your working directory.',
      solution: 'Commit your changes or stash them before switching branches.',
      commands: ['git add .', 'git commit -m "Your message"', 'git stash'],
      severity: 'medium'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Untracked Files',
      description: 'There are untracked files in your repository.',
      solution: 'Add files to tracking or add them to .gitignore.',
      commands: ['git add filename', 'echo "filename" >> .gitignore'],
      severity: 'low'
    },
    {
      id: '4',
      type: 'info',
      title: 'Branch Ahead of Remote',
      description: 'Your local branch is ahead of the remote branch.',
      solution: 'Push your changes to sync with the remote repository.',
      commands: ['git push origin branch-name'],
      severity: 'low'
    }
  ];

  const runDiagnostic = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setIssues([]);
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Randomly select some issues
    const randomIssues = mockIssues
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    setIssues(randomIssues);
    setIsScanning(false);
    setScanComplete(true);
  };

  const fixIssue = (issueId: string) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
    if (selectedIssue?.id === issueId) {
      setSelectedIssue(null);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Git Doctor</h2>
        <p className="text-gray-300">Diagnose and fix common Git issues</p>
      </motion.div>

      {/* Diagnostic Controls */}
      <Card>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Stethoscope className="h-8 w-8 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Repository Health Check</h3>
          </div>
          
          {!scanComplete && (
            <Button
              onClick={runDiagnostic}
              disabled={isScanning}
              loading={isScanning}
              size="lg"
            >
              {isScanning ? 'Scanning Repository...' : 'Run Diagnostic'}
            </Button>
          )}

          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-center space-x-2 text-blue-400">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Analyzing repository structure...</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {scanComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Issues List */}
            <div className="lg:col-span-2">
              <Card
                header={
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">
                      Detected Issues ({issues.length})
                    </h3>
                    <Button size="sm" variant="secondary" onClick={runDiagnostic}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Re-scan
                    </Button>
                  </div>
                }
              >
                {issues.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">All Clear!</h4>
                    <p className="text-gray-300">No issues detected in your repository.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {issues.map((issue) => {
                      const Icon = getIssueIcon(issue.type);
                      return (
                        <motion.div
                          key={issue.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedIssue?.id === issue.id
                              ? 'bg-blue-900/20 border-blue-500/50'
                              : 'border-gray-600 hover:bg-gray-700/30'
                          }`}
                          onClick={() => setSelectedIssue(issue)}
                        >
                          <div className="flex items-start space-x-3">
                            <Icon className={`h-5 w-5 mt-0.5 ${
                              issue.type === 'error' ? 'text-red-400' :
                              issue.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-white">{issue.title}</h4>
                                <span className={`text-xs ${getSeverityColor(issue.severity)}`}>
                                  {issue.severity}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300">{issue.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>

            {/* Issue Details & Solution */}
            <Card
              header={
                <h3 className="font-semibold text-white">Solution</h3>
              }
            >
              {selectedIssue ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">{selectedIssue.title}</h4>
                    <p className="text-sm text-gray-300 mb-3">{selectedIssue.description}</p>
                  </div>

                  <Alert type="info" title="Recommended Solution">
                    {selectedIssue.solution}
                  </Alert>

                  <div>
                    <h5 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                      <Terminal className="h-4 w-4 mr-2" />
                      Commands to Fix
                    </h5>
                    <div className="space-y-2">
                      {selectedIssue.commands.map((command, index) => (
                        <CodeBlock
                          key={index}
                          code={command}
                          language="bash"
                          copyable
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => fixIssue(selectedIssue.id)}
                    >
                      Mark as Fixed
                    </Button>
                    <Button size="sm" variant="secondary" className="w-full">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  Select an issue to view the solution
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GitDoctorTool;