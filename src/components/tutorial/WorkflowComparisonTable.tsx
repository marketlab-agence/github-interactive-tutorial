import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface WorkflowFeature {
  feature: string;
  gitFlow: {
    supported: boolean;
    description: string;
    complexity: 'simple' | 'medium' | 'complex';
  };
  githubFlow: {
    supported: boolean;
    description: string;
    complexity: 'simple' | 'medium' | 'complex';
  };
  gitlabFlow: {
    supported: boolean;
    description: string;
    complexity: 'simple' | 'medium' | 'complex';
  };
}

interface WorkflowComparisonTableProps {
  features?: WorkflowFeature[];
  onSelectWorkflow?: (workflow: string) => void;
  selectedWorkflow?: string;
}

const defaultFeatures: WorkflowFeature[] = [
  {
    feature: 'Simplicité d\'apprentissage',
    gitFlow: {
      supported: false,
      description: 'Complexe avec de nombreuses branches',
      complexity: 'complex'
    },
    githubFlow: {
      supported: true,
      description: 'Simple, une seule branche principale',
      complexity: 'simple'
    },
    gitlabFlow: {
      supported: true,
      description: 'Modérément simple',
      complexity: 'medium'
    }
  },
  {
    feature: 'Déploiement continu',
    gitFlow: {
      supported: false,
      description: 'Difficile avec les branches multiples',
      complexity: 'complex'
    },
    githubFlow: {
      supported: true,
      description: 'Excellent pour le déploiement continu',
      complexity: 'simple'
    },
    gitlabFlow: {
      supported: true,
      description: 'Bon support avec les environnements',
      complexity: 'medium'
    }
  },
  {
    feature: 'Gestion des releases',
    gitFlow: {
      supported: true,
      description: 'Excellent avec branches dédiées',
      complexity: 'medium'
    },
    githubFlow: {
      supported: false,
      description: 'Basique, via tags uniquement',
      complexity: 'simple'
    },
    gitlabFlow: {
      supported: true,
      description: 'Bon avec branches d\'environnement',
      complexity: 'medium'
    }
  },
  {
    feature: 'Collaboration équipe',
    gitFlow: {
      supported: true,
      description: 'Bon pour grandes équipes',
      complexity: 'complex'
    },
    githubFlow: {
      supported: true,
      description: 'Excellent pour petites équipes',
      complexity: 'simple'
    },
    gitlabFlow: {
      supported: true,
      description: 'Bon pour équipes moyennes',
      complexity: 'medium'
    }
  },
  {
    feature: 'Hotfixes',
    gitFlow: {
      supported: true,
      description: 'Branches hotfix dédiées',
      complexity: 'medium'
    },
    githubFlow: {
      supported: true,
      description: 'Via branches de fonctionnalité',
      complexity: 'simple'
    },
    gitlabFlow: {
      supported: true,
      description: 'Via branches d\'environnement',
      complexity: 'medium'
    }
  },
  {
    feature: 'Tests automatisés',
    gitFlow: {
      supported: true,
      description: 'Tests sur plusieurs branches',
      complexity: 'complex'
    },
    githubFlow: {
      supported: true,
      description: 'Tests sur chaque PR',
      complexity: 'simple'
    },
    gitlabFlow: {
      supported: true,
      description: 'Tests par environnement',
      complexity: 'medium'
    }
  }
];

export const WorkflowComparisonTable: React.FC<WorkflowComparisonTableProps> = ({
  features = defaultFeatures,
  onSelectWorkflow,
  selectedWorkflow
}) => {
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(selectedWorkflow || null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const getComplexityColor = (complexity: 'simple' | 'medium' | 'complex') => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'complex': return 'bg-red-100 text-red-800';
    }
  };

  const getComplexityText = (complexity: 'simple' | 'medium' | 'complex') => {
    switch (complexity) {
      case 'simple': return 'Simple';
      case 'medium': return 'Moyen';
      case 'complex': return 'Complexe';
    }
  };

  const getSupportIcon = (supported: boolean) => {
    return supported ? '✅' : '❌';
  };

  const handleWorkflowSelect = (workflow: string) => {
    setActiveWorkflow(workflow);
    onSelectWorkflow?.(workflow);
  };

  const workflows = [
    {
      id: 'gitFlow',
      name: 'Git Flow',
      description: 'Workflow traditionnel avec branches multiples',
      color: 'blue',
      pros: ['Structure claire', 'Bon pour releases', 'Séparation des préoccupations'],
      cons: ['Complexe', 'Lent', 'Difficile pour CI/CD']
    },
    {
      id: 'githubFlow',
      name: 'GitHub Flow',
      description: 'Workflow simple avec une branche principale',
      color: 'green',
      pros: ['Simple', 'Rapide', 'Excellent pour CI/CD'],
      cons: ['Moins de contrôle', 'Difficile pour releases complexes']
    },
    {
      id: 'gitlabFlow',
      name: 'GitLab Flow',
      description: 'Workflow hybride avec environnements',
      color: 'orange',
      pros: ['Équilibré', 'Bon pour environnements', 'Flexible'],
      cons: ['Plus complexe que GitHub Flow', 'Courbe d\'apprentissage']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Comparaison des Workflows Git
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Découvrez les différences entre les principaux workflows Git et choisissez celui qui convient le mieux à votre équipe.
        </p>
      </div>

      {/* Sélection de workflow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {workflows.map((workflow) => (
          <Card 
            key={workflow.id}
            className={`cursor-pointer transition-all duration-200 ${
              activeWorkflow === workflow.id 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => handleWorkflowSelect(workflow.id)}
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{workflow.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>
              
              <div className="space-y-2">
                <div>
                  <h4 className="text-xs font-medium text-green-700 mb-1">Avantages:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {workflow.pros.map((pro, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 mr-1">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-red-700 mb-1">Inconvénients:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {workflow.cons.map((con, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-red-500 mr-1">-</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tableau de comparaison */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Fonctionnalité
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                  Git Flow
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                  GitHub Flow
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                  GitLab Flow
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {features.map((feature, index) => (
                <tr 
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {feature.feature}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowDetails(
                          showDetails === feature.feature ? null : feature.feature
                        )}
                        className="ml-2"
                      >
                        {showDetails === feature.feature ? 'Masquer' : 'Détails'}
                      </Button>
                    </div>
                  </td>
                  
                  {/* Git Flow */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl">
                        {getSupportIcon(feature.gitFlow.supported)}
                      </span>
                      <Badge 
                        variant="secondary"
                        className={getComplexityColor(feature.gitFlow.complexity)}
                      >
                        {getComplexityText(feature.gitFlow.complexity)}
                      </Badge>
                    </div>
                  </td>
                  
                  {/* GitHub Flow */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl">
                        {getSupportIcon(feature.githubFlow.supported)}
                      </span>
                      <Badge 
                        variant="secondary"
                        className={getComplexityColor(feature.githubFlow.complexity)}
                      >
                        {getComplexityText(feature.githubFlow.complexity)}
                      </Badge>
                    </div>
                  </td>
                  
                  {/* GitLab Flow */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl">
                        {getSupportIcon(feature.gitlabFlow.supported)}
                      </span>
                      <Badge 
                        variant="secondary"
                        className={getComplexityColor(feature.gitlabFlow.complexity)}
                      >
                        {getComplexityText(feature.gitlabFlow.complexity)}
                      </Badge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Détails de la fonctionnalité sélectionnée */}
      {showDetails && (
        <Card className="mt-4">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Détails: {showDetails}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features
                .filter(f => f.feature === showDetails)
                .map((feature, index) => (
                  <React.Fragment key={index}>
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-700">Git Flow</h4>
                      <p className="text-sm text-gray-600">
                        {feature.gitFlow.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-green-700">GitHub Flow</h4>
                      <p className="text-sm text-gray-600">
                        {feature.githubFlow.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-orange-700">GitLab Flow</h4>
                      <p className="text-sm text-gray-600">
                        {feature.gitlabFlow.description}
                      </p>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        </Card>
      )}

      {/* Recommandations */}
      <Card className="bg-blue-50 border-blue-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            💡 Recommandations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Petite équipe / Startup</h4>
              <p className="text-sm text-gray-600 mb-2">
                <strong>GitHub Flow</strong> - Simple et efficace
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Déploiement rapide</li>
                <li>• Moins de complexité</li>
                <li>• Idéal pour MVP</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Équipe moyenne</h4>
              <p className="text-sm text-gray-600 mb-2">
                <strong>GitLab Flow</strong> - Équilibre parfait
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Environnements multiples</li>
                <li>• Contrôle des releases</li>
                <li>• Flexibilité</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">Grande entreprise</h4>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Git Flow</strong> - Structure robuste
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Releases planifiées</li>
                <li>• Séparation claire</li>
                <li>• Processus formalisé</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WorkflowComparisonTable;
