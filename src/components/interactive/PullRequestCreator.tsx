import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, User, MessageSquare, Tag, CheckCircle, Clock } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Tabs from '../ui/Tabs';

interface PullRequestCreatorProps {
  onSubmit?: (pr: any) => void;
}

const PullRequestCreator: React.FC<PullRequestCreatorProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sourceBranch, setSourceBranch] = useState('feature/user-authentication');
  const [targetBranch, setTargetBranch] = useState('main');
  const [reviewers, setReviewers] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const availableReviewers = [
    { id: 'john', name: 'John Doe', avatar: '👨‍💻' },
    { id: 'jane', name: 'Jane Smith', avatar: '👩‍💻' },
    { id: 'alex', name: 'Alex Johnson', avatar: '🧑‍💻' }
  ];

  const availableLabels = [
    { id: 'feature', name: 'feature', color: 'green' },
    { id: 'bugfix', name: 'bug fix', color: 'red' },
    { id: 'enhancement', name: 'enhancement', color: 'blue' },
    { id: 'documentation', name: 'documentation', color: 'purple' }
  ];

  const mockChanges = [
    { file: 'src/components/Login.tsx', additions: 45, deletions: 0, type: 'added' },
    { file: 'src/components/Register.tsx', additions: 38, deletions: 0, type: 'added' },
    { file: 'src/utils/auth.ts', additions: 23, deletions: 5, type: 'modified' },
    { file: 'package.json', additions: 2, deletions: 0, type: 'modified' }
  ];

  const toggleReviewer = (reviewerId: string) => {
    setReviewers(prev => 
      prev.includes(reviewerId) 
        ? prev.filter(id => id !== reviewerId)
        : [...prev, reviewerId]
    );
  };

  const toggleLabel = (labelId: string) => {
    setLabels(prev => 
      prev.includes(labelId) 
        ? prev.filter(id => id !== labelId)
        : [...prev, labelId]
    );
  };

  const handleSubmit = () => {
    const pullRequest = {
      title,
      description,
      sourceBranch,
      targetBranch,
      reviewers,
      labels,
      changes: mockChanges
    };
    
    if (onSubmit) {
      onSubmit(pullRequest);
    }
  };

  const tabs = [
    {
      id: 'create',
      label: 'Créer PR',
      icon: GitPullRequest,
      content: (
        <div className="space-y-6 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Titre de la Pull Request
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add user authentication system"
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your changes..."
                  rows={6}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                  aria-label="Description de la Pull Request"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Branche source
                  </label>
                  <select
                    value={sourceBranch}
                    onChange={(e) => setSourceBranch(e.target.value)}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="feature/user-authentication">feature/user-authentication</option>
                    <option value="feature/dashboard">feature/dashboard</option>
                    <option value="bugfix/login-issue">bugfix/login-issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Branche cible
                  </label>
                  <select
                    value={targetBranch}
                    onChange={(e) => setTargetBranch(e.target.value)}
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="main">main</option>
                    <option value="develop">develop</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Relecteurs
                </label>
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {availableReviewers.map(reviewer => (
                    <button
                      key={reviewer.id}
                      onClick={() => toggleReviewer(reviewer.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                        reviewers.includes(reviewer.id)
                          ? 'bg-blue-900/20 border-blue-500/50'
                          : 'border-gray-600 hover:bg-gray-700/30'
                      }`}
                    >
                      <span className="text-2xl">{reviewer.avatar}</span>
                      <span className="text-white">{reviewer.name}</span>
                      {reviewers.includes(reviewer.id) && (
                        <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Étiquettes
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableLabels.map(label => (
                    <button
                      key={label.id}
                      onClick={() => toggleLabel(label.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        labels.includes(label.id)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {label.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="secondary">Sauvegarder</Button>
            <Button onClick={handleSubmit} disabled={!title.trim()}>
              <GitPullRequest className="h-4 w-4 mr-2" />
              Créer la Pull Request
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'changes',
      label: 'Files Changed',
      icon: MessageSquare,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Changed Files</h3>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-green-400">+108 additions</span>
              <span className="text-red-400">-5 deletions</span>
            </div>
          </div>

          <div className="space-y-3">
            {mockChanges.map((change, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-700/30 rounded-lg p-4 border border-gray-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant={change.type === 'added' ? 'success' : 'info'}>
                      {change.type}
                    </Badge>
                    <span className="font-mono text-white">{change.file}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-green-400">+{change.additions}</span>
                    <span className="text-red-400">-{change.deletions}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4 sm:px-0"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Créer une Pull Request</h2>
        <p className="text-gray-300">Proposez des changements et collaborez avec votre équipe</p>
      </motion.div>

      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default PullRequestCreator;