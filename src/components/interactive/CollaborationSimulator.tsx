import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GitPullRequest, MessageSquare, CheckCircle, Clock, User } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: 'developer' | 'reviewer' | 'maintainer';
  status: 'online' | 'offline' | 'busy';
}

interface PullRequest {
  id: string;
  title: string;
  author: string;
  status: 'open' | 'reviewing' | 'approved' | 'merged' | 'closed';
  reviewers: string[];
  comments: number;
  changes: { additions: number; deletions: number };
  createdAt: Date;
}

const CollaborationSimulator: React.FC = () => {
  const [collaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: '👩‍💻',
      role: 'maintainer',
      status: 'online'
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: '👨‍💻',
      role: 'developer',
      status: 'online'
    },
    {
      id: '3',
      name: 'Carol Davis',
      avatar: '🧑‍💻',
      role: 'reviewer',
      status: 'busy'
    },
    {
      id: '4',
      name: 'David Wilson',
      avatar: '👨‍💼',
      role: 'developer',
      status: 'offline'
    }
  ]);

  const [pullRequests, setPullRequests] = useState<PullRequest[]>([
    {
      id: '1',
      title: 'Add user authentication system',
      author: 'Bob Smith',
      status: 'reviewing',
      reviewers: ['Alice Johnson', 'Carol Davis'],
      comments: 3,
      changes: { additions: 245, deletions: 12 },
      createdAt: new Date('2024-01-15T10:30:00')
    },
    {
      id: '2',
      title: 'Fix responsive layout issues',
      author: 'David Wilson',
      status: 'open',
      reviewers: ['Alice Johnson'],
      comments: 1,
      changes: { additions: 67, deletions: 23 },
      createdAt: new Date('2024-01-16T14:20:00')
    },
    {
      id: '3',
      title: 'Update documentation',
      author: 'Carol Davis',
      status: 'approved',
      reviewers: ['Alice Johnson', 'Bob Smith'],
      comments: 0,
      changes: { additions: 89, deletions: 5 },
      createdAt: new Date('2024-01-17T09:15:00')
    }
  ]);

  const [selectedPR, setSelectedPR] = useState<PullRequest | null>(pullRequests[0]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'info';
      case 'reviewing': return 'warning';
      case 'approved': return 'success';
      case 'merged': return 'success';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'maintainer': return 'text-purple-400';
      case 'reviewer': return 'text-blue-400';
      case 'developer': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'busy': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const approvePR = (prId: string) => {
    setPullRequests(prev => prev.map(pr => 
      pr.id === prId ? { ...pr, status: 'approved' as const } : pr
    ));
  };

  const mergePR = (prId: string) => {
    setPullRequests(prev => prev.map(pr => 
      pr.id === prId ? { ...pr, status: 'merged' as const } : pr
    ));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Collaboration Simulator</h2>
        <p className="text-gray-300">Experience team collaboration workflows</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Team Members */}
        <Card
          header={
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">Team Members</h3>
            </div>
          }
        >
          <div className="space-y-3">
            {collaborators.map((collaborator) => (
              <motion.div
                key={collaborator.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-3 p-3 bg-gray-700/30 rounded-lg"
              >
                <div className="relative">
                  <span className="text-2xl">{collaborator.avatar}</span>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${getStatusIndicator(collaborator.status)}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate">
                    {collaborator.name}
                  </div>
                  <div className={`text-xs ${getRoleColor(collaborator.role)}`}>
                    {collaborator.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Pull Requests List */}
        <div className="lg:col-span-2">
          <Card
            header={
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <GitPullRequest className="h-5 w-5 text-green-400" />
                  <h3 className="font-semibold text-white">Pull Requests</h3>
                </div>
                <Button size="sm">
                  New PR
                </Button>
              </div>
            }
          >
            <div className="space-y-3">
              {pullRequests.map((pr) => (
                <motion.div
                  key={pr.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedPR?.id === pr.id
                      ? 'bg-blue-900/20 border-blue-500/50'
                      : 'border-gray-600 hover:bg-gray-700/30'
                  }`}
                  onClick={() => setSelectedPR(pr)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{pr.title}</h4>
                    <Badge variant={getStatusColor(pr.status)} size="sm">
                      {pr.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{pr.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{pr.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-green-400">+{pr.changes.additions}</span>
                      <span className="text-red-400">-{pr.changes.deletions}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* PR Details */}
        <Card
          header={
            <h3 className="font-semibold text-white">PR Details</h3>
          }
        >
          {selectedPR ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">{selectedPR.title}</h4>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant={getStatusColor(selectedPR.status)} size="sm">
                    {selectedPR.status}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    #{selectedPR.id}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Author:</span>
                  <span className="text-white">{selectedPR.author}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Created:</span>
                  <span className="text-white">
                    {selectedPR.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Changes:</span>
                  <div className="flex space-x-2">
                    <span className="text-green-400">+{selectedPR.changes.additions}</span>
                    <span className="text-red-400">-{selectedPR.changes.deletions}</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-300 mb-2">Reviewers</h5>
                <div className="space-y-1">
                  {selectedPR.reviewers.map((reviewer, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-400" />
                      <span className="text-gray-300">{reviewer}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {selectedPR.status === 'reviewing' && (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => approvePR(selectedPR.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                )}
                {selectedPR.status === 'approved' && (
                  <Button
                    size="sm"
                    variant="success"
                    className="w-full"
                    onClick={() => mergePR(selectedPR.id)}
                  >
                    Merge PR
                  </Button>
                )}
                <Button size="sm" variant="secondary" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              Select a pull request to view details
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CollaborationSimulator;