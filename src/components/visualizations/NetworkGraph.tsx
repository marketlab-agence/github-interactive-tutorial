import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, GitBranch, Star, Eye, GitFork } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface Contributor {
  id: string;
  name: string;
  avatar: string;
  commits: number;
  role: 'maintainer' | 'contributor' | 'collaborator';
  connections: string[];
}

const NetworkGraph: React.FC = () => {
  const [contributors] = useState<Contributor[]>([
    {
      id: '1',
      name: 'Alice Martin',
      avatar: '👩‍💻',
      commits: 156,
      role: 'maintainer',
      connections: ['2', '3', '4']
    },
    {
      id: '2',
      name: 'Bob Dupont',
      avatar: '👨‍💻',
      commits: 89,
      role: 'contributor',
      connections: ['1', '3']
    },
    {
      id: '3',
      name: 'Claire Moreau',
      avatar: '🧑‍💻',
      commits: 67,
      role: 'collaborator',
      connections: ['1', '2', '4']
    },
    {
      id: '4',
      name: 'David Leroy',
      avatar: '👨‍💼',
      commits: 34,
      role: 'contributor',
      connections: ['1', '3']
    }
  ]);

  const [selectedContributor, setSelectedContributor] = useState<string | null>(null);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'maintainer': return 'text-purple-400';
      case 'contributor': return 'text-green-400';
      case 'collaborator': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getNodeSize = (commits: number) => {
    if (commits > 100) return 60;
    if (commits > 50) return 50;
    if (commits > 20) return 40;
    return 30;
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="h-6 w-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Réseau des Contributeurs</h3>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Network Visualization */}
        <div className="lg:col-span-2">
          <div className="relative bg-gray-900/50 rounded-lg h-80 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 400 300">
              {/* Connections */}
              <g>
                {contributors.map(contributor =>
                  contributor.connections.map(connectionId => {
                    const target = contributors.find(c => c.id === connectionId);
                    if (!target) return null;
                    
                    const sourceIndex = contributors.findIndex(c => c.id === contributor.id);
                    const targetIndex = contributors.findIndex(c => c.id === connectionId);
                    
                    const sourceX = 100 + (sourceIndex % 2) * 200;
                    const sourceY = 75 + Math.floor(sourceIndex / 2) * 150;
                    const targetX = 100 + (targetIndex % 2) * 200;
                    const targetY = 75 + Math.floor(targetIndex / 2) * 150;
                    
                    return (
                      <motion.line
                        key={`${contributor.id}-${connectionId}`}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        x1={sourceX}
                        y1={sourceY}
                        x2={targetX}
                        y2={targetY}
                        stroke="#6b7280"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                    );
                  })
                )}
              </g>

              {/* Nodes */}
              <g>
                {contributors.map((contributor, index) => {
                  const x = 100 + (index % 2) * 200;
                  const y = 75 + Math.floor(index / 2) * 150;
                  const size = getNodeSize(contributor.commits);
                  const isSelected = selectedContributor === contributor.id;
                  
                  return (
                    <motion.g
                      key={contributor.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="cursor-pointer"
                      onClick={() => setSelectedContributor(contributor.id)}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={size / 2}
                        fill={isSelected ? '#3b82f6' : '#4b5563'}
                        stroke={isSelected ? '#60a5fa' : '#6b7280'}
                        strokeWidth="2"
                        className="transition-all"
                      />
                      <text
                        x={x}
                        y={y + 5}
                        textAnchor="middle"
                        className="fill-white text-xs font-medium"
                      >
                        {contributor.avatar}
                      </text>
                      <text
                        x={x}
                        y={y + size / 2 + 15}
                        textAnchor="middle"
                        className="fill-white text-xs"
                      >
                        {contributor.name.split(' ')[0]}
                      </text>
                    </motion.g>
                  );
                })}
              </g>
            </svg>
          </div>
        </div>

        {/* Contributor Details */}
        <Card
          header={
            <h4 className="font-semibold text-white">Détails du Contributeur</h4>
          }
        >
          {selectedContributor ? (
            (() => {
              const contributor = contributors.find(c => c.id === selectedContributor);
              if (!contributor) return null;
              
              return (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{contributor.avatar}</div>
                    <h5 className="font-medium text-white">{contributor.name}</h5>
                    <Badge variant="info" size="sm">
                      {contributor.role}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Commits:</span>
                      <span className="text-white font-medium">{contributor.commits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Connexions:</span>
                      <span className="text-white font-medium">{contributor.connections.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rôle:</span>
                      <span className={getRoleColor(contributor.role)}>
                        {contributor.role}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h6 className="text-sm font-medium text-gray-300 mb-2">Collabore avec:</h6>
                    <div className="space-y-1">
                      {contributor.connections.map(connectionId => {
                        const connected = contributors.find(c => c.id === connectionId);
                        return connected ? (
                          <div key={connectionId} className="flex items-center space-x-2 text-sm">
                            <span>{connected.avatar}</span>
                            <span className="text-gray-300">{connected.name}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="text-center text-gray-400 py-8">
              Cliquez sur un contributeur pour voir les détails
            </div>
          )}
        </Card>
      </div>

      {/* Network Stats */}
      <div className="mt-6 grid md:grid-cols-4 gap-4">
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-400">{contributors.length}</div>
          <div className="text-sm text-gray-400">Contributeurs</div>
        </div>
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-400">
            {contributors.reduce((sum, c) => sum + c.commits, 0)}
          </div>
          <div className="text-sm text-gray-400">Total Commits</div>
        </div>
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-400">
            {contributors.reduce((sum, c) => sum + c.connections.length, 0) / 2}
          </div>
          <div className="text-sm text-gray-400">Connexions</div>
        </div>
        <div className="bg-gray-700/30 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {contributors.filter(c => c.role === 'maintainer').length}
          </div>
          <div className="text-sm text-gray-400">Mainteneurs</div>
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;