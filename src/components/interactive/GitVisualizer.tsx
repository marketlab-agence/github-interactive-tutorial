import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge, Play, RotateCcw, GitFork } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface GitNode {
  id: string;
  type: 'commit' | 'branch' | 'merge';
  message: string;
  branch: string;
  position: { x: number; y: number };
}

interface Branch {
  name: string;
  color: string;
  current: boolean;
}

const GitVisualizer: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([
    { name: 'main', color: 'blue', current: true },
    { name: 'feature', color: 'green', current: false },
    { name: 'hotfix', color: 'red', current: false }
  ]);

  const [nodes, setNodes] = useState<GitNode[]>([
    {
      id: 'c1',
      type: 'commit',
      message: 'Initial commit',
      branch: 'main',
      position: { x: 100, y: 150 }
    },
    {
      id: 'c2',
      type: 'commit',
      message: 'Add README',
      branch: 'main',
      position: { x: 200, y: 150 }
    }
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const scenario = [
    {
      action: 'branch',
      description: 'Création d\'une branche "feature" à partir de main',
      branch: 'feature',
      message: 'git checkout -b feature',
      nodesToAdd: [
        {
          id: 'c3',
          type: 'branch',
          message: 'Create feature branch',
          branch: 'feature',
          position: { x: 300, y: 100 }
        }
      ]
    },
    {
      action: 'commit',
      description: 'Ajout d\'un commit à la branche feature',
      branch: 'feature',
      message: 'git commit -m "Add feature code"',
      nodesToAdd: [
        {
          id: 'c4',
          type: 'commit',
          message: 'Add feature code',
          branch: 'feature',
          position: { x: 400, y: 100 }
        }
      ]
    },
    {
      action: 'branch-switch',
      description: 'Retour sur la branche main',
      branch: 'main',
      message: 'git checkout main',
      nodesToAdd: []
    },
    {
      action: 'branch',
      description: 'Création d\'une branche "hotfix" à partir de main',
      branch: 'hotfix',
      message: 'git checkout -b hotfix',
      nodesToAdd: [
        {
          id: 'c5',
          type: 'branch',
          message: 'Create hotfix branch',
          branch: 'hotfix',
          position: { x: 300, y: 200 }
        }
      ]
    },
    {
      action: 'commit',
      description: 'Ajout d\'un commit à la branche hotfix',
      branch: 'hotfix',
      message: 'git commit -m "Fix critical bug"',
      nodesToAdd: [
        {
          id: 'c6',
          type: 'commit',
          message: 'Fix critical bug',
          branch: 'hotfix',
          position: { x: 400, y: 200 }
        }
      ]
    },
    {
      action: 'merge',
      description: 'Fusion de hotfix dans main',
      branch: 'main',
      message: 'git checkout main && git merge hotfix',
      nodesToAdd: [
        {
          id: 'c7',
          type: 'merge',
          message: 'Merge hotfix into main',
          branch: 'main',
          position: { x: 500, y: 150 }
        }
      ]
    },
    {
      action: 'branch-switch',
      description: 'Retour sur la branche feature',
      branch: 'feature',
      message: 'git checkout feature',
      nodesToAdd: []
    },
    {
      action: 'commit',
      description: 'Ajout d\'un autre commit sur feature',
      branch: 'feature',
      message: 'git commit -m "Finalize feature"',
      nodesToAdd: [
        {
          id: 'c8',
          type: 'commit',
          message: 'Finalize feature',
          branch: 'feature',
          position: { x: 500, y: 100 }
        }
      ]
    },
    {
      action: 'merge',
      description: 'Fusion de feature dans main',
      branch: 'main',
      message: 'git checkout main && git merge feature',
      nodesToAdd: [
        {
          id: 'c9',
          type: 'merge',
          message: 'Merge feature into main',
          branch: 'main',
          position: { x: 600, y: 150 }
        }
      ]
    }
  ];

  const nextStep = async () => {
    if (currentStep >= scenario.length || isAnimating) return;

    setIsAnimating(true);

    const step = scenario[currentStep];

    // Update current branch
    if (step.action === 'branch-switch' || step.action === 'merge') {
      setBranches(branches.map(branch => ({
        ...branch,
        current: branch.name === step.branch
      })));
    }

    // Add new nodes
    if (step.nodesToAdd.length > 0) {
      for (const node of step.nodesToAdd) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setNodes(prevNodes => [...prevNodes, node]);
      }
    }

    // Wait before finalizing step
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentStep(currentStep + 1);
    setIsAnimating(false);
  };

  const resetVisualization = () => {
    setNodes([
      {
        id: 'c1',
        type: 'commit',
        message: 'Initial commit',
        branch: 'main',
        position: { x: 100, y: 150 }
      },
      {
        id: 'c2',
        type: 'commit',
        message: 'Add README',
        branch: 'main',
        position: { x: 200, y: 150 }
      }
    ]);
    setBranches([
      { name: 'main', color: 'blue', current: true },
      { name: 'feature', color: 'green', current: false },
      { name: 'hotfix', color: 'red', current: false }
    ]);
    setCurrentStep(0);
    setIsAnimating(false);
  };

  const getBranchColor = (branchName: string): string => {
    const branch = branches.find(b => b.name === branchName);
    return branch ? branch.color : 'gray';
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return GitCommit;
      case 'branch':
        return GitBranch;
      case 'merge':
        return GitMerge;
      default:
        return GitCommit;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Visualiseur Git</h2>
        <p className="text-gray-300">Explorez visuellement les concepts Git à travers un scénario interactif</p>
      </motion.div>

      <Card
        header={
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Graphe Git</h3>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={nextStep}
                disabled={currentStep >= scenario.length || isAnimating}
              >
                <Play className="h-4 w-4 mr-2" />
                {currentStep >= scenario.length ? 'Terminé' : 'Étape suivante'}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={resetVisualization}
                disabled={currentStep === 0}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
            </div>
          </div>
        }
      >
        <div className="relative bg-gray-900/50 h-96 rounded-lg overflow-hidden">
          {/* Timeline */}
          <svg width="100%" height="100%" viewBox="0 0 800 300">
            {/* Connections */}
            {nodes.map(node => {
              const nodeType = node.type;
              const color = getBranchColor(node.branch);
              
              if (nodeType === 'commit' || nodeType === 'merge') {
                const prevNode = nodes.find(n => 
                  n.id === `c${parseInt(node.id.substring(1)) - 1}`
                );
                
                if (prevNode) {
                  return (
                    <line
                      key={`line-${node.id}-${prevNode.id}`}
                      x1={prevNode.position.x}
                      y1={prevNode.position.y}
                      x2={node.position.x}
                      y2={node.position.y}
                      stroke={`var(--tw-colors-${color}-400, #60a5fa)`}
                      strokeWidth="2"
                    />
                  );
                }
              }
              
              if (nodeType === 'merge') {
                // Find source node for merge (usually on a different branch)
                const sourceNodes = nodes.filter(n => 
                  n.branch !== node.branch && 
                  parseInt(n.id.substring(1)) < parseInt(node.id.substring(1))
                );
                
                if (sourceNodes.length > 0) {
                  const sourceNode = sourceNodes[sourceNodes.length - 1];
                  
                  return (
                    <line
                      key={`merge-${node.id}-${sourceNode.id}`}
                      x1={sourceNode.position.x}
                      y1={sourceNode.position.y}
                      x2={node.position.x}
                      y2={node.position.y}
                      stroke="#a78bfa"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                    />
                  );
                }
              }
              
              return null;
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const NodeIcon = getNodeIcon(node.type);
              const color = getBranchColor(node.branch);
              
              return (
                <g key={node.id}>
                  <motion.circle
                    initial={{ r: 0 }}
                    animate={{ r: 15 }}
                    cx={node.position.x}
                    cy={node.position.y}
                    fill={`var(--tw-colors-${color}-600, #2563eb)`}
                    stroke="#1f2937"
                    strokeWidth="3"
                  />
                  <foreignObject
                    x={node.position.x - 8}
                    y={node.position.y - 8}
                    width="16"
                    height="16"
                  >
                    <NodeIcon className="h-4 w-4 text-white" />
                  </foreignObject>
                  
                  <text
                    x={node.position.x}
                    y={node.position.y - 25}
                    textAnchor="middle"
                    className="fill-gray-300 text-xs"
                  >
                    {node.message}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Branch Labels */}
          <div className="absolute bottom-4 left-4 space-y-2">
            {branches.map(branch => (
              <div 
                key={branch.name}
                className={`flex items-center space-x-2 ${branch.current ? 'opacity-100' : 'opacity-60'}`}
              >
                <div className={`w-3 h-3 rounded-full bg-${branch.color}-500`}></div>
                <span className={`text-sm ${branch.current ? 'text-white font-medium' : 'text-gray-400'}`}>
                  {branch.name}
                </span>
                {branch.current && (
                  <Badge variant="success" size="sm">Active</Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Current Step Info */}
      <Card>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-white mb-3">Commande Git</h3>
            {currentStep > 0 && (
              <div className="bg-gray-800 p-3 rounded font-mono text-green-400 text-sm">
                $ {scenario[currentStep - 1].message}
              </div>
            )}
            {currentStep === 0 && (
              <div className="bg-gray-800 p-3 rounded font-mono text-gray-500 text-sm">
                Cliquez sur "Étape suivante" pour commencer
              </div>
            )}
            {currentStep >= scenario.length && (
              <div className="bg-green-900/20 border border-green-500/30 p-3 rounded text-gray-300">
                Scénario terminé ! Vous pouvez réinitialiser pour recommencer.
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-white mb-3">Description</h3>
            {currentStep > 0 && (
              <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded text-gray-300">
                {scenario[currentStep - 1].description}
              </div>
            )}
            {currentStep === 0 && (
              <div className="p-3 bg-gray-800/50 rounded text-gray-400">
                Ce visualiseur vous guidera à travers un scénario typique de développement Git avec branches et fusions.
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium text-white mb-3">Progression</h3>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / scenario.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Début</span>
            <span>Étape {currentStep} / {scenario.length}</span>
            <span>Fin</span>
          </div>
        </div>
      </Card>

      {/* Légende */}
      <Card
        header={
          <h3 className="font-semibold text-white">Légende</h3>
        }
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
              <GitCommit className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Commit</div>
              <div className="text-xs text-gray-400">Enregistrement des changements</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full">
              <GitBranch className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Branche</div>
              <div className="text-xs text-gray-400">Ligne de développement</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-purple-600 rounded-full">
              <GitMerge className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">Fusion</div>
              <div className="text-xs text-gray-400">Combinaison de branches</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-0.5 bg-purple-400 border-dashed border-2"></div>
            <div>
              <div className="text-sm font-medium text-white">Merge Connection</div>
              <div className="text-xs text-gray-400">Indique une source de fusion</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GitVisualizer;