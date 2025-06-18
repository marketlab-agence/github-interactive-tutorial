import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitMerge, GitBranch, Zap, RotateCcw } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Tabs from '../ui/Tabs';

interface MergeScenario {
  id: string;
  name: string;
  description: string;
  command: string;
  pros: string[];
  cons: string[];
  useCase: string;
  visualization: {
    before: Array<{ id: string; x: number; y: number; branch: string; color: string }>;
    after: Array<{ id: string; x: number; y: number; branch: string; color: string }>;
    connections: Array<{ from: string; to: string; type: string }>;
  };
}

const MergeTypeComparison: React.FC = () => {
  const [selectedMerge, setSelectedMerge] = useState<string>('merge-commit');
  const [showAnimation, setShowAnimation] = useState(false);

  const mergeTypes: MergeScenario[] = [
    {
      id: 'merge-commit',
      name: 'Merge Commit',
      description: 'Crée un commit de fusion qui combine les deux branches',
      command: 'git merge feature-branch',
      pros: [
        'Préserve l\'historique complet',
        'Montre clairement les points de fusion',
        'Facile à comprendre et à suivre'
      ],
      cons: [
        'Historique plus complexe',
        'Commits de fusion supplémentaires',
        'Peut encombrer l\'historique'
      ],
      useCase: 'Idéal pour les features importantes ou les releases',
      visualization: {
        before: [
          { id: 'c1', x: 100, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c2', x: 200, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c3', x: 300, y: 100, branch: 'feature', color: '#10b981' },
          { id: 'c4', x: 400, y: 100, branch: 'feature', color: '#10b981' }
        ],
        after: [
          { id: 'c1', x: 100, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c2', x: 200, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c3', x: 300, y: 100, branch: 'feature', color: '#10b981' },
          { id: 'c4', x: 400, y: 100, branch: 'feature', color: '#10b981' },
          { id: 'c5', x: 500, y: 150, branch: 'main', color: '#8b5cf6' }
        ],
        connections: [
          { from: 'c2', to: 'c5', type: 'merge' },
          { from: 'c4', to: 'c5', type: 'merge' }
        ]
      }
    },
    {
      id: 'fast-forward',
      name: 'Fast-Forward',
      description: 'Déplace simplement le pointeur de branche sans créer de commit de fusion',
      command: 'git merge --ff-only feature-branch',
      pros: [
        'Historique linéaire et propre',
        'Pas de commits de fusion inutiles',
        'Simple et direct'
      ],
      cons: [
        'Perd l\'information de branche',
        'Impossible si la branche principale a évolué',
        'Moins de traçabilité'
      ],
      useCase: 'Parfait pour les petites corrections ou features simples',
      visualization: {
        before: [
          { id: 'c1', x: 100, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c2', x: 200, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c3', x: 300, y: 150, branch: 'feature', color: '#10b981' },
          { id: 'c4', x: 400, y: 150, branch: 'feature', color: '#10b981' }
        ],
        after: [
          { id: 'c1', x: 100, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c2', x: 200, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c3', x: 300, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c4', x: 400, y: 150, branch: 'main', color: '#3b82f6' }
        ],
        connections: []
      }
    },
    {
      id: 'squash',
      name: 'Squash Merge',
      description: 'Combine tous les commits de la branche en un seul commit',
      command: 'git merge --squash feature-branch',
      pros: [
        'Historique très propre',
        'Un seul commit par feature',
        'Facile à revenir en arrière'
      ],
      cons: [
        'Perd l\'historique détaillé',
        'Difficile de déboguer',
        'Moins de granularité'
      ],
      useCase: 'Idéal pour nettoyer l\'historique des features expérimentales',
      visualization: {
        before: [
          { id: 'c1', x: 100, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c2', x: 200, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c3', x: 300, y: 100, branch: 'feature', color: '#10b981' },
          { id: 'c4', x: 400, y: 100, branch: 'feature', color: '#10b981' },
          { id: 'c5', x: 500, y: 100, branch: 'feature', color: '#10b981' }
        ],
        after: [
          { id: 'c1', x: 100, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c2', x: 200, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c6', x: 300, y: 150, branch: 'main', color: '#f59e0b' }
        ],
        connections: []
      }
    },
    {
      id: 'rebase',
      name: 'Rebase',
      description: 'Rejoue les commits de la branche sur la branche principale',
      command: 'git rebase main && git merge feature-branch',
      pros: [
        'Historique parfaitement linéaire',
        'Pas de commits de fusion',
        'Très propre et lisible'
      ],
      cons: [
        'Réécrit l\'historique',
        'Plus complexe à comprendre',
        'Peut créer des conflits'
      ],
      useCase: 'Excellent pour maintenir un historique propre dans les équipes',
      visualization: {
        before: [
          { id: 'c1', x: 100, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c2', x: 200, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c3', x: 300, y: 100, branch: 'feature', color: '#10b981' },
          { id: 'c4', x: 400, y: 100, branch: 'feature', color: '#10b981' }
        ],
        after: [
          { id: 'c1', x: 100, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c2', x: 200, y: 150, branch: 'main', color: '#3b82f6' },
          { id: 'c3r', x: 300, y: 150, branch: 'main', color: '#10b981' },
          { id: 'c4r', x: 400, y: 150, branch: 'main', color: '#10b981' }
        ],
        connections: []
      }
    }
  ];

  const selectedMergeType = mergeTypes.find(m => m.id === selectedMerge)!;

  const animateMerge = () => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 3000);
  };

  const renderVisualization = (scenario: MergeScenario, isAfter: boolean = false) => {
    const nodes = isAfter ? scenario.visualization.after : scenario.visualization.before;
    const connections = isAfter ? scenario.visualization.connections : [];

    return (
      <svg width="100%" height="200" viewBox="0 0 600 200">
        {/* Connexions */}
        {connections.map((conn, index) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={index}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="#8b5cf6"
              strokeWidth="2"
            />
          );
        })}

        {/* Nœuds */}
        {nodes.map((node, index) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r="12"
              fill={node.color}
              stroke="#1f2937"
              strokeWidth="2"
            />
            <text
              x={node.x}
              y={node.y + 25}
              textAnchor="middle"
              className="fill-white text-xs"
            >
              {node.branch}
            </text>
          </motion.g>
        ))}
      </svg>
    );
  };

  const comparisonTab = {
    id: 'comparison',
    label: 'Comparaison',
    icon: GitMerge,
    content: (
      <div className="space-y-6">
        {/* Sélecteur de type de fusion */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mergeTypes.map((mergeType) => (
            <button
              key={mergeType.id}
              onClick={() => setSelectedMerge(mergeType.id)}
              className={`p-4 rounded-lg border transition-colors text-left ${
                selectedMerge === mergeType.id
                  ? 'bg-blue-900/20 border-blue-500/50'
                  : 'border-gray-600 hover:bg-gray-700/30'
              }`}
            >
              <h4 className="font-medium text-white mb-1">{mergeType.name}</h4>
              <p className="text-xs text-gray-400">{mergeType.description}</p>
            </button>
          ))}
        </div>

        {/* Détails du type sélectionné */}
        <Card>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{selectedMergeType.name}</h3>
              <p className="text-gray-300">{selectedMergeType.description}</p>
              <div className="mt-3 bg-gray-900 rounded-lg p-3">
                <code className="text-green-400">{selectedMergeType.command}</code>
              </div>
            </div>

            {/* Visualisation */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-3 text-center">Avant la Fusion</h4>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  {renderVisualization(selectedMergeType, false)}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-3 text-center">Après la Fusion</h4>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <AnimatePresence mode="wait">
                    {showAnimation ? (
                      <motion.div
                        key="after"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {renderVisualization(selectedMergeType, true)}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="before"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {renderVisualization(selectedMergeType, false)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button onClick={animateMerge}>
                <Zap className="h-4 w-4 mr-2" />
                Animer la Fusion
              </Button>
            </div>

            {/* Avantages et Inconvénients */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-400 mb-3">Avantages</h4>
                <ul className="space-y-2">
                  {selectedMergeType.pros.map((pro, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-400 mb-3">Inconvénients</h4>
                <ul className="space-y-2">
                  {selectedMergeType.cons.map((con, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="font-medium text-blue-300 mb-2">Cas d'Usage Recommandé</h4>
              <p className="text-blue-100 text-sm">{selectedMergeType.useCase}</p>
            </div>
          </div>
        </Card>
      </div>
    )
  };

  const guideTab = {
    id: 'guide',
    label: 'Guide de Choix',
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white text-center">
          Comment Choisir le Bon Type de Fusion ?
        </h3>

        <div className="space-y-4">
          {[
            {
              question: "La branche principale a-t-elle évolué depuis la création de votre branche ?",
              answers: [
                { text: "Non", recommendation: "Fast-Forward", reason: "Fusion simple et propre" },
                { text: "Oui", recommendation: "Merge Commit ou Rebase", reason: "Gestion des divergences nécessaire" }
              ]
            },
            {
              question: "Voulez-vous préserver l'historique détaillé de la branche ?",
              answers: [
                { text: "Oui", recommendation: "Merge Commit", reason: "Conserve tous les commits individuels" },
                { text: "Non", recommendation: "Squash Merge", reason: "Simplifie l'historique" }
              ]
            },
            {
              question: "Travaillez-vous en équipe avec des standards stricts ?",
              answers: [
                { text: "Oui", recommendation: "Rebase", reason: "Historique linéaire et professionnel" },
                { text: "Non", recommendation: "Merge Commit", reason: "Plus simple et moins risqué" }
              ]
            }
          ].map((item, index) => (
            <Card key={index}>
              <div className="space-y-3">
                <h4 className="font-medium text-white">{item.question}</h4>
                <div className="space-y-2">
                  {item.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                      <span className="text-gray-300">{answer.text}</span>
                      <div className="text-right">
                        <div className="font-medium text-blue-400">{answer.recommendation}</div>
                        <div className="text-xs text-gray-400">{answer.reason}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  };

  const tabs = [comparisonTab, guideTab];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Comparaison des Types de Fusion</h2>
        <p className="text-gray-300">Découvrez les différentes stratégies de fusion Git</p>
      </motion.div>

      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default MergeTypeComparison;