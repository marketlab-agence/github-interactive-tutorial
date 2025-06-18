import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface BranchNode {
  id: string;
  x: number;
  y: number;
  branch: string;
  message: string;
  timestamp: number;
  color: string;
}

interface BranchConnection {
  from: string;
  to: string;
  type: 'commit' | 'merge' | 'branch';
}

const BranchAnimator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);

  const animationSteps = [
    {
      title: 'Commit initial sur main',
      nodes: [
        { id: 'c1', x: 100, y: 200, branch: 'main', message: 'Initial commit', timestamp: 1, color: '#3b82f6' }
      ],
      connections: []
    },
    {
      title: 'Deuxième commit sur main',
      nodes: [
        { id: 'c1', x: 100, y: 200, branch: 'main', message: 'Initial commit', timestamp: 1, color: '#3b82f6' },
        { id: 'c2', x: 200, y: 200, branch: 'main', message: 'Add README', timestamp: 2, color: '#3b82f6' }
      ],
      connections: [
        { from: 'c1', to: 'c2', type: 'commit' }
      ]
    },
    {
      title: 'Création de la branche feature',
      nodes: [
        { id: 'c1', x: 100, y: 200, branch: 'main', message: 'Initial commit', timestamp: 1, color: '#3b82f6' },
        { id: 'c2', x: 200, y: 200, branch: 'main', message: 'Add README', timestamp: 2, color: '#3b82f6' },
        { id: 'c3', x: 300, y: 150, branch: 'feature', message: 'Start feature', timestamp: 3, color: '#10b981' }
      ],
      connections: [
        { from: 'c1', to: 'c2', type: 'commit' },
        { from: 'c2', to: 'c3', type: 'branch' }
      ]
    },
    {
      title: 'Développement sur feature',
      nodes: [
        { id: 'c1', x: 100, y: 200, branch: 'main', message: 'Initial commit', timestamp: 1, color: '#3b82f6' },
        { id: 'c2', x: 200, y: 200, branch: 'main', message: 'Add README', timestamp: 2, color: '#3b82f6' },
        { id: 'c3', x: 300, y: 150, branch: 'feature', message: 'Start feature', timestamp: 3, color: '#10b981' },
        { id: 'c4', x: 400, y: 150, branch: 'feature', message: 'Add functionality', timestamp: 4, color: '#10b981' }
      ],
      connections: [
        { from: 'c1', to: 'c2', type: 'commit' },
        { from: 'c2', to: 'c3', type: 'branch' },
        { from: 'c3', to: 'c4', type: 'commit' }
      ]
    },
    {
      title: 'Commit parallèle sur main',
      nodes: [
        { id: 'c1', x: 100, y: 200, branch: 'main', message: 'Initial commit', timestamp: 1, color: '#3b82f6' },
        { id: 'c2', x: 200, y: 200, branch: 'main', message: 'Add README', timestamp: 2, color: '#3b82f6' },
        { id: 'c3', x: 300, y: 150, branch: 'feature', message: 'Start feature', timestamp: 3, color: '#10b981' },
        { id: 'c4', x: 400, y: 150, branch: 'feature', message: 'Add functionality', timestamp: 4, color: '#10b981' },
        { id: 'c5', x: 300, y: 250, branch: 'main', message: 'Fix bug', timestamp: 5, color: '#3b82f6' }
      ],
      connections: [
        { from: 'c1', to: 'c2', type: 'commit' },
        { from: 'c2', to: 'c3', type: 'branch' },
        { from: 'c3', to: 'c4', type: 'commit' },
        { from: 'c2', to: 'c5', type: 'commit' }
      ]
    },
    {
      title: 'Fusion de la branche feature',
      nodes: [
        { id: 'c1', x: 100, y: 200, branch: 'main', message: 'Initial commit', timestamp: 1, color: '#3b82f6' },
        { id: 'c2', x: 200, y: 200, branch: 'main', message: 'Add README', timestamp: 2, color: '#3b82f6' },
        { id: 'c3', x: 300, y: 150, branch: 'feature', message: 'Start feature', timestamp: 3, color: '#10b981' },
        { id: 'c4', x: 400, y: 150, branch: 'feature', message: 'Add functionality', timestamp: 4, color: '#10b981' },
        { id: 'c5', x: 300, y: 250, branch: 'main', message: 'Fix bug', timestamp: 5, color: '#3b82f6' },
        { id: 'c6', x: 500, y: 200, branch: 'main', message: 'Merge feature', timestamp: 6, color: '#8b5cf6' }
      ],
      connections: [
        { from: 'c1', to: 'c2', type: 'commit' },
        { from: 'c2', to: 'c3', type: 'branch' },
        { from: 'c3', to: 'c4', type: 'commit' },
        { from: 'c2', to: 'c5', type: 'commit' },
        { from: 'c4', to: 'c6', type: 'merge' },
        { from: 'c5', to: 'c6', type: 'merge' }
      ]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < animationSteps.length - 1) {
      interval = setInterval(() => {
        setCurrentStep(prev => prev + 1);
      }, 2000 / speed);
    } else if (currentStep >= animationSteps.length - 1) {
      setIsPlaying(false);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, speed]);

  const currentAnimation = animationSteps[currentStep];

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    if (currentStep < animationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const getConnectionPath = (from: BranchNode, to: BranchNode, type: string) => {
    if (type === 'merge') {
      // Courbe pour les fusions
      const midX = (from.x + to.x) / 2;
      const midY = Math.min(from.y, to.y) - 30;
      return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
    } else if (type === 'branch') {
      // Courbe pour les branches
      const midX = (from.x + to.x) / 2;
      const midY = from.y + (to.y - from.y) / 2;
      return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
    } else {
      // Ligne droite pour les commits
      return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'merge': return '#8b5cf6';
      case 'branch': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Animateur de Branches Git</h2>
        <p className="text-gray-300">Visualisez l'évolution des branches dans le temps</p>
      </motion.div>

      {/* Contrôles */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button onClick={togglePlay} variant={isPlaying ? 'secondary' : 'primary'}>
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Lecture'}
            </Button>
            <Button onClick={nextStep} disabled={currentStep >= animationSteps.length - 1}>
              <FastForward className="h-4 w-4 mr-2" />
              Étape Suivante
            </Button>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Recommencer
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Vitesse :</span>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={4}>4x</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Animation */}
      <Card>
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">{currentAnimation.title}</h3>
            <p className="text-sm text-gray-400">
              Étape {currentStep + 1} sur {animationSteps.length}
            </p>
          </div>

          <div className="relative bg-gray-900/50 rounded-lg h-80 overflow-hidden">
            <svg width="100%" height="100%" viewBox="0 0 600 300">
              {/* Connexions */}
              <g>
                {currentAnimation.connections.map((connection, index) => {
                  const fromNode = currentAnimation.nodes.find(n => n.id === connection.from);
                  const toNode = currentAnimation.nodes.find(n => n.id === connection.to);
                  
                  if (!fromNode || !toNode) return null;
                  
                  return (
                    <motion.path
                      key={`${connection.from}-${connection.to}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.7 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      d={getConnectionPath(fromNode, toNode, connection.type)}
                      stroke={getConnectionColor(connection.type)}
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={connection.type === 'branch' ? "5,5" : "none"}
                    />
                  );
                })}
              </g>

              {/* Nœuds */}
              <g>
                {currentAnimation.nodes.map((node, index) => (
                  <motion.g
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 }}
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="15"
                      fill={node.color}
                      stroke="#1f2937"
                      strokeWidth="3"
                    />
                    <text
                      x={node.x}
                      y={node.y + 35}
                      textAnchor="middle"
                      className="fill-white text-xs font-medium"
                    >
                      {node.message.split(' ')[0]}
                    </text>
                    <text
                      x={node.x}
                      y={node.y - 25}
                      textAnchor="middle"
                      className="fill-gray-400 text-xs"
                    >
                      {node.branch}
                    </text>
                  </motion.g>
                ))}
              </g>
            </svg>
          </div>
        </div>
      </Card>

      {/* Légende */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Légende</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Branche main</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Branche feature</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span className="text-gray-300">Commit de fusion</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-0.5 bg-gray-500"></div>
            <span className="text-gray-300">Commit normal</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-0.5 bg-yellow-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, #eab308 3px, #eab308 6px)' }}></div>
            <span className="text-gray-300">Création de branche</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-0.5 bg-purple-500"></div>
            <span className="text-gray-300">Fusion</span>
          </div>
        </div>
      </Card>

      {/* Progression */}
      <Card>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Progression de l'animation</span>
            <span>{currentStep + 1} / {animationSteps.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / animationSteps.length) * 100}%` }}
              className="bg-blue-500 h-2 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BranchAnimator;