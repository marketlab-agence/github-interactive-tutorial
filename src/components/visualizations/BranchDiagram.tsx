import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitMerge, Circle } from 'lucide-react';

interface Branch {
  name: string;
  commits: Array<{id: string, message: string}>;
  color: string;
  merged?: boolean;
}

interface BranchDiagramProps {
  branches?: Branch[];
  className?: string;
}

const BranchDiagram: React.FC<BranchDiagramProps> = ({
  branches = [
    {
      name: 'main',
      commits: [
        {id: 'c1', message: 'Initial commit'},
        {id: 'c2', message: 'Add README'},
        {id: 'c5', message: 'Merge feature branch'}
      ],
      color: 'blue'
    },
    {
      name: 'feature/login',
      commits: [
        {id: 'c3', message: 'Add login form'},
        {id: 'c4', message: 'Add validation'}
      ],
      color: 'green',
      merged: true
    }
  ],
  className
}) => {
  const colorMap = {
    blue: 'text-blue-400 border-blue-400',
    green: 'text-green-400 border-green-400',
    purple: 'text-purple-400 border-purple-400',
    orange: 'text-orange-400 border-orange-400'
  };

  return (
    <div className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <GitBranch className="h-6 w-6 text-green-400" />
        <h3 className="text-xl font-semibold text-white">Branch Diagram</h3>
      </div>

      <div className="space-y-8">
        {branches.map((branch, branchIndex) => (
          <motion.div
            key={branch.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: branchIndex * 0.3 }}
            className="relative"
          >
            {/* Branch Name */}
            <div className="flex items-center space-x-3 mb-4">
              <GitBranch className={`h-5 w-5 ${colorMap[branch.color as keyof typeof colorMap]?.split(' ')[0]}`} />
              <span className="font-medium text-white">{branch.name}</span>
              {branch.merged && (
                <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
                  Merged
                </span>
              )}
            </div>

            {/* Commits */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {branch.commits.map((commit, commitIndex) => (
                <motion.div
                  key={commit.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (branchIndex * 0.3) + (commitIndex * 0.1) }}
                  className="flex flex-col items-center space-y-2 min-w-0"
                >
                  {/* Commit Circle */}
                  <div className={`w-8 h-8 rounded-full border-2 ${colorMap[branch.color as keyof typeof colorMap]} bg-gray-900 flex items-center justify-center`}>
                    <Circle className="h-3 w-3 fill-current" />
                  </div>
                  
                  {/* Commit Message */}
                  <div className="text-xs text-gray-300 text-center max-w-24 truncate">
                    {commit.message}
                  </div>
                  
                  {/* Commit ID */}
                  <div className="text-xs text-gray-500 font-mono">
                    {commit.id}
                  </div>
                </motion.div>
              ))}
              
              {/* Merge Arrow */}
              {branch.merged && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (branchIndex * 0.3) + 0.5 }}
                  className="flex items-center"
                >
                  <GitMerge className="h-6 w-6 text-purple-400" />
                </motion.div>
              )}
            </div>

            {/* Connection Line */}
            {branchIndex < branches.length - 1 && (
              <div className="absolute left-6 -bottom-4 w-0.5 h-8 bg-gray-600"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BranchDiagram;