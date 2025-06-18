import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge, Maximize2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface GitNode {
  id: string;
  type: 'commit' | 'merge' | 'branch';
  message: string;
  branch: string;
  x: number;
  y: number;
  parents: string[];
  color: string;
}

interface GitGraphProps {
  nodes?: GitNode[];
  className?: string;
}

const GitGraph: React.FC<GitGraphProps> = ({
  nodes = [
    { id: 'c1', type: 'commit', message: 'Commit initial', branch: 'main', x: 100, y: 100, parents: [], color: '#3b82f6' },
    { id: 'c2', type: 'commit', message: 'Ajouter README', branch: 'main', x: 200, y: 100, parents: ['c1'], color: '#3b82f6' },
    { id: 'c3', type: 'branch', message: 'Créer branche feature', branch: 'feature', x: 300, y: 150, parents: ['c2'], color: '#10b981' },
    { id: 'c4', type: 'commit', message: 'Nouvelle fonctionnalité', branch: 'feature', x: 400, y: 150, parents: ['c3'], color: '#10b981' },
    { id: 'c5', type: 'merge', message: 'Fusionner feature', branch: 'main', x: 500, y: 100, parents: ['c2', 'c4'], color: '#8b5cf6' }
  ],
  className
}) => {
  const [selectedNode, setSelectedNode] = useState<GitNode | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'commit': return GitCommit;
      case 'merge': return GitMerge;
      case 'branch': return GitBranch;
      default: return GitCommit;
    }
  };

  const renderConnections = () => {
    return nodes.map(node => 
      node.parents.map(parentId => {
        const parent = nodes.find(n => n.id === parentId);
        if (!parent) return null;
        
        return (
          <motion.line
            key={`${parentId}-${node.id}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
            x1={parent.x}
            y1={parent.y}
            x2={node.x}
            y2={node.y}
            stroke="#6b7280"
            strokeWidth="2"
            className="opacity-60"
          />
        );
      })
    ).flat();
  };

  return (
    <div className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <GitBranch className="h-6 w-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Graphique Git Interactif</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <div className={`relative bg-gray-900/50 rounded-lg overflow-hidden ${
        isExpanded ? 'h-96' : 'h-64'
      }`}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 300"
          className="absolute inset-0"
        >
          {/* Connections */}
          <g>
            {renderConnections()}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((node, index) => {
              const Icon = getNodeIcon(node.type);
              return (
                <motion.g
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedNode(node)}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="20"
                    fill={node.color}
                    stroke="#1f2937"
                    strokeWidth="3"
                    className={`transition-all ${
                      selectedNode?.id === node.id ? 'stroke-white stroke-4' : ''
                    }`}
                  />
                  <foreignObject
                    x={node.x - 8}
                    y={node.y - 8}
                    width="16"
                    height="16"
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </foreignObject>
                </motion.g>
              );
            })}
          </g>
        </svg>

        {/* Node Details Overlay */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 border border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">{selectedNode.message}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                  <span>Branche: {selectedNode.branch}</span>
                  <span>Type: {selectedNode.type}</span>
                  <span>ID: {selectedNode.id}</span>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedNode(null)}
              >
                ×
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-gray-300">Commits</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-gray-300">Branches</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span className="text-gray-300">Fusions</span>
        </div>
      </div>
    </div>
  );
};

export default GitGraph;