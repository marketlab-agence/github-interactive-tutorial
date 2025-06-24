import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  command?: string;
  type: 'action' | 'decision' | 'info';
  completed: boolean;
  active: boolean;
  branches?: string[];
  nextSteps?: string[];
}

interface WorkflowSimulatorProps {
  workflowType?: 'github-flow' | 'git-flow' | 'gitlab-flow';
  onStepComplete?: (stepId: string) => void;
  onComplete?: () => void;
  onWorkflowComplete?: () => void;
  autoPlay?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
}

const workflows = {
  'github-flow': {
    name: 'GitHub Flow',
    description: 'Workflow simple et efficace pour le développement continu',
    steps: [
      {
        id: 'create-branch',
        title: 'Créer une branche feature',
        description: 'Créez une nouvelle branche à partir de main pour votre fonctionnalité',
        command: 'git checkout -b feature/nouvelle-fonctionnalite',
        type: 'action',
        completed: false,
        active: true,
        nextSteps: ['develop-feature']
      },
      {
        id: 'develop-feature',
        title: 'Développer la fonctionnalité',
        description: 'Implémentez votre fonctionnalité avec des commits réguliers',
        command: 'git add . && git commit -m "Ajouter nouvelle fonctionnalité"',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['push-branch']
      },
      {
        id: 'push-branch',
        title: 'Pousser la branche',
        description: 'Poussez votre branche vers le dépôt distant',
        command: 'git push origin feature/nouvelle-fonctionnalite',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['create-pr']
      },
      {
        id: 'create-pr',
        title: 'Créer une Pull Request',
        description: 'Ouvrez une Pull Request pour proposer vos changements',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['review-pr']
      },
      {
        id: 'review-pr',
        title: 'Révision du code',
        description: 'L\'équipe révise votre code et propose des améliorations',
        type: 'decision',
        completed: false,
        active: false,
        nextSteps: ['merge-pr', 'fix-issues']
      },
      {
        id: 'fix-issues',
        title: 'Corriger les problèmes',
        description: 'Apportez les modifications demandées lors de la révision',
        command: 'git add . && git commit -m "Corriger les problèmes de révision"',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['review-pr']
      },
      {
        id: 'merge-pr',
        title: 'Merger la Pull Request',
        description: 'Une fois approuvée, mergez la PR dans la branche main',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['deploy']
      },
      {
        id: 'deploy',
        title: 'Déployer',
        description: 'La branche main est automatiquement déployée en production',
        type: 'info',
        completed: false,
        active: false,
        nextSteps: []
      }
    ]
  },
  'git-flow': {
    name: 'Git Flow',
    description: 'Workflow robuste pour les projets avec releases planifiées',
    steps: [
      {
        id: 'create-feature',
        title: 'Créer branche feature',
        description: 'Créez une branche feature à partir de develop',
        command: 'git flow feature start nouvelle-fonctionnalite',
        type: 'action',
        completed: false,
        active: true,
        nextSteps: ['develop-feature']
      },
      {
        id: 'develop-feature',
        title: 'Développer la fonctionnalité',
        description: 'Développez votre fonctionnalité sur la branche feature',
        command: 'git add . && git commit -m "Implémenter fonctionnalité"',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['finish-feature']
      },
      {
        id: 'finish-feature',
        title: 'Terminer la feature',
        description: 'Mergez la feature dans develop et supprimez la branche',
        command: 'git flow feature finish nouvelle-fonctionnalite',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['create-release']
      },
      {
        id: 'create-release',
        title: 'Créer branche release',
        description: 'Créez une branche release pour préparer la version',
        command: 'git flow release start 1.0.0',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['test-release']
      },
      {
        id: 'test-release',
        title: 'Tester la release',
        description: 'Effectuez les tests finaux et corrections mineures',
        type: 'decision',
        completed: false,
        active: false,
        nextSteps: ['finish-release', 'fix-bugs']
      },
      {
        id: 'fix-bugs',
        title: 'Corriger les bugs',
        description: 'Corrigez les bugs trouvés pendant les tests',
        command: 'git add . && git commit -m "Corriger bug critique"',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['test-release']
      },
      {
        id: 'finish-release',
        title: 'Terminer la release',
        description: 'Mergez dans main et develop, créez un tag',
        command: 'git flow release finish 1.0.0',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['deploy-production']
      },
      {
        id: 'deploy-production',
        title: 'Déployer en production',
        description: 'Déployez la version taguée en production',
        type: 'info',
        completed: false,
        active: false,
        nextSteps: []
      }
    ]
  },
  'gitlab-flow': {
    name: 'GitLab Flow',
    description: 'Workflow équilibré avec environnements multiples',
    steps: [
      {
        id: 'create-feature',
        title: 'Créer branche feature',
        description: 'Créez une branche feature à partir de main',
        command: 'git checkout -b feature/nouvelle-fonctionnalite main',
        type: 'action',
        completed: false,
        active: true,
        nextSteps: ['develop-feature']
      },
      {
        id: 'develop-feature',
        title: 'Développer la fonctionnalité',
        description: 'Implémentez votre fonctionnalité avec des tests',
        command: 'git add . && git commit -m "Ajouter fonctionnalité avec tests"',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['create-mr']
      },
      {
        id: 'create-mr',
        title: 'Créer Merge Request',
        description: 'Créez une Merge Request vers main',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['review-mr']
      },
      {
        id: 'review-mr',
        title: 'Révision du code',
        description: 'L\'équipe révise et teste votre code',
        type: 'decision',
        completed: false,
        active: false,
        nextSteps: ['merge-main', 'fix-issues']
      },
      {
        id: 'fix-issues',
        title: 'Corriger les problèmes',
        description: 'Apportez les corrections demandées',
        command: 'git add . && git commit -m "Corriger problèmes de révision"',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['review-mr']
      },
      {
        id: 'merge-main',
        title: 'Merger dans main',
        description: 'Mergez la MR dans la branche main',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['deploy-staging']
      },
      {
        id: 'deploy-staging',
        title: 'Déployer en staging',
        description: 'Déployez automatiquement vers l\'environnement de staging',
        type: 'info',
        completed: false,
        active: false,
        nextSteps: ['test-staging']
      },
      {
        id: 'test-staging',
        title: 'Tester en staging',
        description: 'Effectuez les tests d\'intégration en staging',
        type: 'decision',
        completed: false,
        active: false,
        nextSteps: ['deploy-production', 'create-hotfix']
      },
      {
        id: 'create-hotfix',
        title: 'Créer hotfix',
        description: 'Créez un hotfix si des problèmes sont détectés',
        command: 'git checkout -b hotfix/correction-critique main',
        type: 'action',
        completed: false,
        active: false,
        nextSteps: ['deploy-staging']
      },
      {
        id: 'deploy-production',
        title: 'Déployer en production',
        description: 'Déployez vers l\'environnement de production',
        type: 'info',
        completed: false,
        active: false,
        nextSteps: []
      }
    ]
  }
};

export const WorkflowSimulator: React.FC<WorkflowSimulatorProps> = ({
  workflowType = 'github-flow',
  onStepComplete,
  onComplete,
  onWorkflowComplete,
  autoPlay = false,
  speed = 'normal'
}) => {
  const [currentWorkflow, setCurrentWorkflow] = useState(workflows[workflowType]);
  const [steps, setSteps] = useState<WorkflowStep[]>(currentWorkflow.steps);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const speedDelays = {
    slow: 3000,
    normal: 2000,
    fast: 1000
  };

  useEffect(() => {
    setCurrentWorkflow(workflows[workflowType]);
    setSteps(workflows[workflowType].steps);
    setCurrentStepIndex(0);
  }, [workflowType]);

  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        completeCurrentStep();
      }, speedDelays[speed]);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStepIndex, speed]);

  const completeCurrentStep = () => {
    const currentStep = steps[currentStepIndex];
    if (!currentStep || currentStep.completed) return;

    setSteps(prev => prev.map((step, index) => {
      if (index === currentStepIndex) {
        return { ...step, completed: true, active: false };
      }
      if (index === currentStepIndex + 1) {
        return { ...step, active: true };
      }
      return step;
    }));

    onStepComplete?.(currentStep.id);

    if (currentStepIndex === steps.length - 1) {
      setIsPlaying(false);
      onWorkflowComplete?.();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const resetSimulation = () => {
    setSteps(currentWorkflow.steps.map((step, index) => ({
      ...step,
      completed: false,
      active: index === 0
    })));
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getStepIcon = (step: WorkflowStep) => {
    if (step.completed) return '✅';
    if (step.active) return '▶️';
    if (step.type === 'decision') return '❓';
    if (step.type === 'info') return 'ℹ️';
    return '⚪';
  };

  const getStepColor = (step: WorkflowStep) => {
    if (step.completed) return 'bg-green-100 border-green-300';
    if (step.active) return 'bg-blue-100 border-blue-300';
    return 'bg-gray-50 border-gray-200';
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Simulateur de Workflow: {currentWorkflow.name}
        </h1>
        <p className="text-gray-600 mb-4">
          {currentWorkflow.description}
        </p>
        
        {/* Sélecteur de workflow */}
        <div className="flex justify-center space-x-2 mb-4">
          {Object.entries(workflows).map(([key, workflow]) => (
            <Button
              key={key}
              variant={workflowType === key ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setCurrentWorkflow(workflow)}
            >
              {workflow.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Contrôles */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant={isPlaying ? 'secondary' : 'primary'}
              onClick={togglePlayPause}
              disabled={completedSteps === steps.length}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </Button>
            
            <Button
              variant="secondary"
              onClick={resetSimulation}
            >
              🔄 Reset
            </Button>
            
            <Button
              variant="secondary"
              onClick={completeCurrentStep}
              disabled={isPlaying || completedSteps === steps.length}
            >
              ⏭️ Étape suivante
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Vitesse:</span>
            <select
              value={speed}
              onChange={(e) => setIsPlaying(false)}
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              <option value="slow">Lente</option>
              <option value="normal">Normale</option>
              <option value="fast">Rapide</option>
            </select>
          </div>
        </div>
        
        {/* Barre de progression */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>Progression</span>
            <span>{completedSteps}/{steps.length} étapes</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Étapes du workflow */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <Card
            key={step.id}
            className={`p-4 transition-all duration-300 ${getStepColor(step)}`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-lg">
                  {getStepIcon(step)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">
                    {index + 1}. {step.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={step.type === 'decision' ? 'warning' : 'secondary'}
                      size="sm"
                    >
                      {step.type === 'action' ? 'Action' : 
                       step.type === 'decision' ? 'Décision' : 'Info'}
                    </Badge>
                    {step.active && (
                      <Badge variant="primary" size="sm">
                        En cours
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 mb-3">
                  {step.description}
                </p>
                
                {step.command && (
                  <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm">
                    $ {step.command}
                  </div>
                )}
                
                {step.branches && step.branches.length > 0 && (
                  <div className="mt-3">
                    <span className="text-sm text-gray-500">Branches impliquées: </span>
                    {step.branches.map((branch, idx) => (
                      <Badge key={idx} variant="secondary" size="sm" className="ml-1">
                        {branch}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Résumé final */}
      {completedSteps === steps.length && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Workflow terminé !
            </h3>
            <p className="text-green-700 mb-4">
              Vous avez complété avec succès le workflow {currentWorkflow.name}.
            </p>
            <div className="flex justify-center space-x-2">
              <Button
                variant="primary"
                onClick={resetSimulation}
              >
                🔄 Recommencer
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  const nextWorkflow = workflowType === 'github-flow' ? 'git-flow' : 
                                     workflowType === 'git-flow' ? 'gitlab-flow' : 'github-flow';
                  setCurrentWorkflow(workflows[nextWorkflow]);
                }}
              >
                ➡️ Workflow suivant
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Complete Tutorial Button */}
      <Button 
        variant="primary" 
        onClick={onComplete} 
        className="w-full mt-6"
        size="lg"
      >
        J'ai compris ce workflow, continuer
      </Button>
    </div>
  );
};

export default WorkflowSimulator;
