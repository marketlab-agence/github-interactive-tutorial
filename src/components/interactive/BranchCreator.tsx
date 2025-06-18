import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Plus, Trash2, GitMerge, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Branch {
  name: string;
  commits: string[];
  color: string;
  active: boolean;
}

const BranchCreator: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([
    { name: 'main', commits: ['Initial commit', 'Add README'], color: 'blue', active: true }
  ]);
  const [newBranchName, setNewBranchName] = useState('');
  const [activeBranch, setActiveBranch] = useState('main');

  const colors = ['blue', 'green', 'purple', 'orange', 'pink'];
  const colorClasses = {
    blue: 'text-blue-400 bg-blue-900/20 border-blue-500/30',
    green: 'text-green-400 bg-green-900/20 border-green-500/30',
    purple: 'text-purple-400 bg-purple-900/20 border-purple-500/30',
    orange: 'text-orange-400 bg-orange-900/20 border-orange-500/30',
    pink: 'text-pink-400 bg-pink-900/20 border-pink-500/30'
  };

  const createBranch = () => {
    if (newBranchName.trim() && !branches.find(b => b.name === newBranchName)) {
      const activeBranchData = branches.find(b => b.name === activeBranch);
      const newBranch: Branch = {
        name: newBranchName,
        commits: activeBranchData ? [...activeBranchData.commits] : [],
        color: colors[branches.length % colors.length],
        active: false
      };
      setBranches([...branches, newBranch]);
      setNewBranchName('');
    }
  };

  const deleteBranch = (branchName: string) => {
    if (branchName !== 'main') {
      setBranches(branches.filter(b => b.name !== branchName));
      if (activeBranch === branchName) {
        setActiveBranch('main');
      }
    }
  };

  const switchBranch = (branchName: string) => {
    setActiveBranch(branchName);
    setBranches(branches.map(b => ({ ...b, active: b.name === branchName })));
  };

  const addCommit = (branchName: string) => {
    const commitMessage = `New commit on ${branchName}`;
    setBranches(branches.map(b => 
      b.name === branchName 
        ? { ...b, commits: [...b.commits, commitMessage] }
        : b
    ));
  };

  const mergeBranch = (sourceBranch: string, targetBranch: string) => {
    const source = branches.find(b => b.name === sourceBranch);
    if (source && sourceBranch !== targetBranch) {
      setBranches(branches.map(b => 
        b.name === targetBranch 
          ? { ...b, commits: [...b.commits, `Merge ${sourceBranch} into ${targetBranch}`] }
          : b
      ));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Interactive Branch Creator</h2>
        <p className="text-gray-300">Create, manage, and visualize Git branches</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Branch Management */}
        <Card
          header={
            <h3 className="font-semibold text-white flex items-center">
              <GitBranch className="h-5 w-5 mr-2" />
              Branch Management
            </h3>
          }
        >
          <div className="space-y-4">
            {/* Create Branch */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                placeholder="New branch name..."
                className="flex-1 bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && createBranch()}
              />
              <Button onClick={createBranch} disabled={!newBranchName.trim()}>
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </div>

            {/* Branch List */}
            <div className="space-y-2">
              <AnimatePresence>
                {branches.map((branch) => (
                  <motion.div
                    key={branch.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-3 rounded-lg border ${
                      branch.active 
                        ? colorClasses[branch.color as keyof typeof colorClasses]
                        : 'bg-gray-700/30 border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <GitBranch className={`h-4 w-4 ${
                          branch.active ? '' : 'text-gray-400'
                        }`} />
                        <span className={`font-medium ${
                          branch.active ? 'text-white' : 'text-gray-300'
                        }`}>
                          {branch.name}
                        </span>
                        {branch.active && (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {!branch.active && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => switchBranch(branch.name)}
                          >
                            Switch
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => addCommit(branch.name)}
                        >
                          Commit
                        </Button>
                        {branch.name !== 'main' && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteBranch(branch.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      {branch.commits.length} commits
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </Card>

        {/* Branch Visualization */}
        <Card
          header={
            <h3 className="font-semibold text-white">Branch Visualization</h3>
          }
        >
          <div className="space-y-4">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <GitBranch className={`h-5 w-5 text-${branch.color}-400`} />
                  <span className="font-medium text-white">{branch.name}</span>
                </div>
                
                <div className="ml-8 space-y-2">
                  {branch.commits.map((commit, commitIndex) => (
                    <motion.div
                      key={commitIndex}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: commitIndex * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className={`w-3 h-3 rounded-full bg-${branch.color}-400`} />
                      <span className="text-sm text-gray-300">{commit}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Merge Options */}
                {branch.name !== 'main' && (
                  <div className="ml-8 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => mergeBranch(branch.name, 'main')}
                    >
                      <GitMerge className="h-4 w-4 mr-2" />
                      Merge to main
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BranchCreator;