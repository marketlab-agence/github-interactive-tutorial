import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge, Lightbulb, Eye } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ConceptNode {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'action' | 'result';
  position: { x: number; y: number };
  connections: string[];
  icon: React.ComponentType<any>;
  color: string;
}

const ConceptDiagram: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [showConnections, setShowConnections] = useState(true);

  const concepts: ConceptNode[] = [
    {
      id: 'repository',
      title: 'Dépôt (Repository)',
      description: 'Un conteneur qui stocke tous les fichiers et l\'historique de votre projet.',
      type: 'concept',
      position: { x: 300, y: 100 },
      connections: ['commit', 'branch'],
      icon: GitBranch,
      color: '#3b82f6'
    },
    {
      id: 'commit',
      title: 'Commit',
      description: 'Un instantané de votre projet à un moment donné dans le temps.',
      type: 'action',
      position: { x: 150, y: 200 },
      connections: ['repository', 'branch', 'merge'],
      icon: GitCommit,
      color: '#10b981'
    },
    {
      id: 'branch',
      title: 'Branche (Branch)',
      description: 'Une ligne de développement indépendante qui diverge du code principal.',
      type: 'concept',
      position: { x: 450, y: 200 },
      connections: ['repository', 'commit', 'merge'],
      icon: GitBranch,
      color: '#8b5cf6'
    },
    {
      id: 'merge',
      title: 'Fusion (Merge)',
      description: 'L\'action de combiner les changements de différentes branches.',
      type: 'action',
      position: { x: 300, y: 300 },
      connections: ['commit', 'branch'],
      icon: GitMerge,
      color: '#f59e0b'
    },
    {
      id: 'staging',
      title: 'Zone de Staging',
      description: 'Une zone intermédiaire où vous préparez les changements avant de les commiter.',
      type: 'concept',
      position: { x: 100, y: 350 },
      connections: ['commit'],
      icon: Eye,
      color: '#ef4444'
    },
    {
      id: 'working-dir',
      title: 'Répertoire de Travail',
      description: 'L\'espace où vous modifiez activement vos fichiers.',
      type: 'concept',
      position: { x: 500, y: 350 },
      connections: ['staging'],
      icon: Lightbulb,
      color: '#06b6d4'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'concept': return 'border-blue-500/50 bg-blue-900/20';
      case 'action': return 'border-green-500/50 bg-green-900/20';
      case 'result': return 'border-purple-500/50 bg-purple-900/20';
      default: return 'border-gray-500/50 bg-gray-900/20';
    }
  };

  const renderConnections = () => {
    if (!showConnections) return null;
    
    return concepts.map(concept =>
      concept.connections.map(connectionId => {
        const target = concepts.find(c => c.id === connectionId);
        if (!target) return null;
        
        const isHighlighted = selectedConcept && (
          selectedConcept === concept.id || selectedConcept === connectionId
        );
        
        return (
          <motion.line
            key={`${concept.id}-${connectionId}`}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: isHighlighted ? 0.8 : 0.3,
              strokeWidth: isHighlighted ? 3 : 2
            }}
            transition={{ duration: 0.5 }}
            x1={concept.position.x}
            y1={concept.position.y}
            x2={target.position.x}
            y2={target.position.y}
            stroke={isHighlighted ? concept.color : '#6b7280'}
            strokeDasharray={isHighlighted ? "none" : "5,5"}
          />
        );
      })
    ).flat();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Diagramme de Concepts Git</h2>
        <p className="text-gray-300">Explorez les concepts fondamentaux de Git de manière interactive</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Contrôles */}
        <Card
          header={
            <h3 className="font-semibold text-white">Contrôles</h3>
          }
        >
          <div className="space-y-4">
            <Button
              variant={showConnections ? 'primary' : 'secondary'}
              onClick={() => setShowConnections(!showConnections)}
              className="w-full"
            >
              {showConnections ? 'Masquer' : 'Afficher'} Connexions
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setSelectedConcept(null)}
              className="w-full"
            >
              Réinitialiser Sélection
            </Button>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">Légende</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-gray-400">Concepts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-gray-400">Actions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full" />
                  <span className="text-gray-400">Résultats</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Diagramme */}
        <div className="lg:col-span-2">
          <Card>
            <div className="relative h-96 bg-gray-900/50 rounded-lg overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 600 400">
                {/* Connexions */}
                <g>
                  {renderConnections()}
                </g>

                {/* Nœuds */}
                <g>
                  {concepts.map((concept, index) => {
                    const Icon = concept.icon;
                    const isSelected = selectedConcept === concept.id;
                    const isConnected = selectedConcept && concept.connections.includes(selectedConcept);
                    
                    return (
                      <motion.g
                        key={concept.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: isSelected ? 1.2 : 1,
                          opacity: selectedConcept ? (isSelected || isConnected ? 1 : 0.4) : 1
                        }}
                        transition={{ delay: index * 0.1 }}
                        className="cursor-pointer"
                        onClick={() => setSelectedConcept(
                          selectedConcept === concept.id ? null : concept.id
                        )}
                      >
                        <circle
                          cx={concept.position.x}
                          cy={concept.position.y}
                          r="30"
                          fill={concept.color}
                          stroke={isSelected ? "#ffffff" : concept.color}
                          strokeWidth={isSelected ? "3" : "2"}
                          opacity="0.8"
                        />
                        <foreignObject
                          x={concept.position.x - 10}
                          y={concept.position.y - 10}
                          width="20"
                          height="20"
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </foreignObject>
                        <text
                          x={concept.position.x}
                          y={concept.position.y + 50}
                          textAnchor="middle"
                          className="fill-white text-xs font-medium"
                        >
                          {concept.title.split(' ')[0]}
                        </text>
                      </motion.g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </Card>
        </div>

        {/* Détails du Concept */}
        <Card
          header={
            <h3 className="font-semibold text-white">Détails du Concept</h3>
          }
        >
          <AnimatePresence mode="wait">
            {selectedConcept ? (
              (() => {
                const concept = concepts.find(c => c.id === selectedConcept);
                if (!concept) return null;
                
                const Icon = concept.icon;
                const connectedConcepts = concept.connections
                  .map(id => concepts.find(c => c.id === id))
                  .filter(Boolean);
                
                return (
                  <motion.div
                    key={selectedConcept}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                        style={{ backgroundColor: concept.color }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-medium text-white">{concept.title}</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${getTypeColor(concept.type)}`}>
                        {concept.type === 'concept' ? 'concept' : 
                         concept.type === 'action' ? 'action' : 'résultat'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-300 text-center">
                      {concept.description}
                    </p>

                    {connectedConcepts.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-gray-300 mb-2">
                          Concepts liés :
                        </h5>
                        <div className="space-y-1">
                          {connectedConcepts.map(connected => (
                            <button
                              key={connected!.id}
                              onClick={() => setSelectedConcept(connected!.id)}
                              className="w-full text-left p-2 rounded bg-gray-700/30 hover:bg-gray-600/30 transition-colors"
                            >
                              <span className="text-sm text-white">{connected!.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })()
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 py-8"
              >
                <Lightbulb className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Cliquez sur un concept pour en savoir plus</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </div>
  );
};

export default ConceptDiagram;