import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitPullRequest, User, MessageSquare, CheckCircle, XCircle, Clock, GitMerge } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface PRStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  actor: string;
  timestamp?: Date;
  details?: string;
}

interface PullRequest {
  id: string;
  title: string;
  description: string;
  author: string;
  branch: string;
  targetBranch: string;
  status: 'draft' | 'open' | 'review' | 'approved' | 'merged' | 'closed';
  reviewers: string[];
  comments: number;
  changes: { files: number; additions: number; deletions: number };
  createdAt: Date;
}

const PRWorkflowSimulator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [pullRequest, setPullRequest] = useState<PullRequest>({
    id: 'pr-123',
    title: 'Ajouter système d\'authentification utilisateur',
    description: 'Cette PR ajoute un système complet d\'authentification avec login, register et gestion des sessions.',
    author: 'dev-contributor',
    branch: 'feature/auth-system',
    targetBranch: 'main',
    status: 'draft',
    reviewers: ['senior-dev', 'tech-lead'],
    comments: 0,
    changes: { files: 8, additions: 245, deletions: 12 },
    createdAt: new Date('2024-01-17T10:30:00')
  });

  const workflowSteps: PRStep[] = [
    {
      id: 'create',
      title: 'Création de la Pull Request',
      description: 'Le développeur crée une PR depuis sa branche feature',
      status: 'completed',
      actor: 'dev-contributor',
      timestamp: new Date('2024-01-17T10:30:00'),
      details: 'PR créée en mode draft pour permettre les modifications'
    },
    {
      id: 'ready',
      title: 'Marquer comme Prête',
      description: 'La PR passe du statut draft à open pour review',
      status: 'pending',
      actor: 'dev-contributor'
    },
    {
      id: 'assign',
      title: 'Assignation des Reviewers',
      description: 'Des reviewers sont assignés pour examiner le code',
      status: 'pending',
      actor: 'dev-contributor'
    },
    {
      id: 'review',
      title: 'Revue de Code',
      description: 'Les reviewers examinent et commentent le code',
      status: 'pending',
      actor: 'senior-dev'
    },
    {
      id: 'feedback',
      title: 'Feedback et Modifications',
      description: 'Le développeur répond aux commentaires et fait les ajustements',
      status: 'pending',
      actor: 'dev-contributor'
    },
    {
      id: 'approve',
      title: 'Approbation',
      description: 'Les reviewers approuvent les modifications',
      status: 'pending',
      actor: 'tech-lead'
    },
    {
      id: 'merge',
      title: 'Fusion',
      description: 'La PR est fusionnée dans la branche principale',
      status: 'pending',
      actor: 'tech-lead'
    }
  ];

  const [steps, setSteps] = useState(workflowSteps);

  const simulateNextStep = async () => {
    if (currentStep >= steps.length) return;

    setIsSimulating(true);
    
    // Mettre à jour le statut de l'étape actuelle
    setSteps(prev => prev.map((step, index) => 
      index === currentStep 
        ? { ...step, status: 'in-progress', timestamp: new Date() }
        : step
    ));

    // Simuler le délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Compléter l'étape et mettre à jour la PR
    setSteps(prev => prev.map((step, index) => 
      index === currentStep 
        ? { ...step, status: 'completed', timestamp: new Date() }
        : step
    ));

    // Mettre à jour le statut de la PR selon l'étape
    const currentStepId = steps[currentStep].id;
    setPullRequest(prev => {
      let newStatus = prev.status;
      let newComments = prev.comments;

      switch (currentStepId) {
        case 'ready':
          newStatus = 'open';
          break;
        case 'assign':
          newStatus = 'review';
          break;
        case 'review':
          newComments = 3;
          break;
        case 'feedback':
          newComments = 5;
          break;
        case 'approve':
          newStatus = 'approved';
          break;
        case 'merge':
          newStatus = 'merged';
          break;
      }

      return { ...prev, status: newStatus, comments: newComments };
    });

    setCurrentStep(prev => prev + 1);
    setIsSimulating(false);
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setIsSimulating(false);
    setPullRequest({
      ...pullRequest,
      status: 'draft',
      comments: 0
    });
    setSteps(workflowSteps.map(step => ({ ...step, status: step.id === 'create' ? 'completed' : 'pending', timestamp: step.id === 'create' ? step.timestamp : undefined })));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'default';
      case 'open': return 'info';
      case 'review': return 'warning';
      case 'approved': return 'success';
      case 'merged': return 'success';
      case 'closed': return 'error';
      default: return 'default';
    }
  };

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'failed': return XCircle;
      default: return Clock;
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in-progress': return 'text-blue-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Simulateur de Workflow Pull Request</h2>
        <p className="text-gray-300">Suivez le cycle de vie complet d'une Pull Request</p>
      </motion.div>

      {/* Contrôles */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={simulateNextStep}
              disabled={isSimulating || currentStep >= steps.length}
              loading={isSimulating}
            >
              {currentStep >= steps.length ? 'Simulation Terminée' : 'Étape Suivante'}
            </Button>
            <Button onClick={resetSimulation} variant="secondary">
              Recommencer
            </Button>
          </div>
          <div className="text-sm text-gray-400">
            Étape {Math.min(currentStep + 1, steps.length)} sur {steps.length}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Informations de la PR */}
        <Card
          header={
            <div className="flex items-center space-x-2">
              <GitPullRequest className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-white">Pull Request #{pullRequest.id}</h3>
            </div>
          }
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-white mb-1">{pullRequest.title}</h4>
              <p className="text-sm text-gray-300">{pullRequest.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant={getStatusColor(pullRequest.status)}>
                {pullRequest.status.toUpperCase()}
              </Badge>
              <span className="text-xs text-gray-400">
                {pullRequest.createdAt.toLocaleDateString()}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Auteur:</span>
                <span className="text-white">{pullRequest.author}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Branche:</span>
                <span className="text-white font-mono">{pullRequest.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Vers:</span>
                <span className="text-white font-mono">{pullRequest.targetBranch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Commentaires:</span>
                <span className="text-white">{pullRequest.comments}</span>
              </div>
            </div>

            <div className="bg-gray-700/30 rounded-lg p-3">
              <h5 className="text-sm font-medium text-gray-300 mb-2">Modifications</h5>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-400">{pullRequest.changes.files} fichiers</span>
                <span className="text-green-400">+{pullRequest.changes.additions}</span>
                <span className="text-red-400">-{pullRequest.changes.deletions}</span>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-300 mb-2">Reviewers</h5>
              <div className="space-y-1">
                {pullRequest.reviewers.map((reviewer, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-300">{reviewer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline du Workflow */}
        <div className="lg:col-span-2">
          <Card
            header={
              <h3 className="font-semibold text-white">Timeline du Workflow</h3>
            }
          >
            <div className="space-y-4">
              {steps.map((step, index) => {
                const StatusIcon = getStepStatusIcon(step.status);
                const isActive = index === currentStep;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start space-x-4 p-4 rounded-lg border transition-all ${
                      isActive 
                        ? 'bg-blue-900/20 border-blue-500/50'
                        : step.status === 'completed'
                        ? 'bg-green-900/20 border-green-500/30'
                        : 'border-gray-600'
                    }`}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <motion.div
                        animate={{ 
                          rotate: step.status === 'in-progress' ? 360 : 0,
                          scale: isActive ? 1.1 : 1
                        }}
                        transition={{ 
                          rotate: { duration: 1, repeat: step.status === 'in-progress' ? Infinity : 0 },
                          scale: { duration: 0.3 }
                        }}
                      >
                        <StatusIcon className={`h-5 w-5 ${getStepStatusColor(step.status)}`} />
                      </motion.div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-white">{step.title}</h4>
                        {step.timestamp && (
                          <span className="text-xs text-gray-400">
                            {step.timestamp.toLocaleTimeString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{step.description}</p>
                      
                      <div className="flex items-center space-x-3 text-xs">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-400">{step.actor}</span>
                        </div>
                        {step.details && (
                          <span className="text-gray-500">{step.details}</span>
                        )}
                      </div>
                    </div>

                    {/* Indicateur d'étape active */}
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Résumé du Workflow */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Bonnes Pratiques du Workflow PR</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Titre Descriptif',
              description: 'Utilisez un titre clair qui résume les changements',
              icon: MessageSquare,
              color: 'blue'
            },
            {
              title: 'Description Détaillée',
              description: 'Expliquez le contexte, les changements et les tests',
              icon: MessageSquare,
              color: 'green'
            },
            {
              title: 'Petites PR',
              description: 'Gardez les PR focalisées et de taille raisonnable',
              icon: GitPullRequest,
              color: 'purple'
            },
            {
              title: 'Tests Inclus',
              description: 'Ajoutez des tests pour vos nouvelles fonctionnalités',
              icon: CheckCircle,
              color: 'yellow'
            },
            {
              title: 'Revue Constructive',
              description: 'Donnez des commentaires utiles et bienveillants',
              icon: User,
              color: 'orange'
            },
            {
              title: 'Réponse Rapide',
              description: 'Répondez aux commentaires dans un délai raisonnable',
              icon: Clock,
              color: 'pink'
            }
          ].map((practice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 bg-${practice.color}-900/20 border border-${practice.color}-500/30 rounded-lg`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <practice.icon className={`h-5 w-5 text-${practice.color}-400`} />
                <h4 className="font-medium text-white">{practice.title}</h4>
              </div>
              <p className="text-sm text-gray-300">{practice.description}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PRWorkflowSimulator;