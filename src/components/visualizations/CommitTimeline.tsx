import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, User, Calendar } from 'lucide-react';

interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
  hash: string;
}

interface CommitTimelineProps {
  commits?: Commit[];
  className?: string;
}

const CommitTimeline: React.FC<CommitTimelineProps> = ({
  commits = [
    {
      id: '1',
      message: 'Initial commit',
      author: 'John Doe',
      date: '2024-01-15',
      hash: 'a1b2c3d'
    },
    {
      id: '2',
      message: 'Add navigation component',
      author: 'Jane Smith',
      date: '2024-01-16',
      hash: 'e4f5g6h'
    },
    {
      id: '3',
      message: 'Fix responsive layout',
      author: 'John Doe',
      date: '2024-01-17',
      hash: 'i7j8k9l'
    }
  ],
  className
}) => {
  return (
    <div className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <GitCommit className="h-6 w-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Commit Timeline</h3>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600"></div>

        <div className="space-y-6">
          {commits.map((commit, index) => (
            <motion.div
              key={commit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex items-start space-x-4"
            >
              {/* Timeline Dot */}
              <div className="relative z-10 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center border-4 border-gray-900">
                <GitCommit className="h-5 w-5 text-white" />
              </div>

              {/* Commit Info */}
              <div className="flex-1 bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white">{commit.message}</h4>
                  <span className="text-xs text-gray-400 font-mono bg-gray-800 px-2 py-1 rounded">
                    {commit.hash}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{commit.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{commit.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommitTimeline;