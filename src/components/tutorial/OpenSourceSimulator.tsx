import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  GitPullRequest,
  GitFork,
  MessageSquare,
  UserCheck,
  Star,
  Code,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  X
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  commands?: string[];
  status: 'pending' | 'current' | 'completed' | 'error';
  icon: React.ComponentType<any>;
}

const OpenSourceSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'fork',
      title: 'Fork du dépôt',
      description: 'Créez votre propre copie du projet open source sur GitHub.',
      status: activeStep === 0 ? 'current' : activeStep > 0 ? 'completed' : 'pending',
      icon: GitFork
    },
    {
      id: 'clone',
      title: 'Clone local',
      description: 'Clonez votre fork sur votre machine locale.',
      commands: ['git clone https://github.com/votre-username/projet-open-source.git', 'cd projet-open-source'],
      status: activeStep === 1 ? 'current' : activeStep > 1 ? 'completed' : 'pending',
      icon: Code
    },
    {
      id: 'branch',
      title: 'Créer une branche',
      description: 'Créez une branche dédiée pour votre contribution.',
      commands: ['git checkout -b feature/ma-contribution', 'git branch'],
      status: activeStep === 2 ? 'current' : activeStep > 2 ? 'completed' : 'pending',
      icon: GitBranch
    },
    {
      id: 'change',
      title: 'Apporter des modifications',
      description: 'Implémentez votre contribution en modifiant les fichiers nécessaires.',
      status: activeStep === 3 ? 'current' : activeStep > 3 ? 'completed' : 'pending',
      icon: Code
    },
    {
      id: 'commit',
      title: 'Commit des changements',
      description: 'Sauvegardez vos modifications avec un message descriptif.',
      commands: ['git add .', 'git commit -m "Ajouter une nouvelle fonctionnalité"'],
      status: activeStep === 4 ? 'current' : activeStep > 4 ? 'completed' : 'pending',
      icon: GitBranch
    },
    {
      id: 'sync',
      title: 'Synchroniser avec l\'original',
      description: 'Récupérez les derniers changements du dépôt original.',
      commands: [
        'git remote add upstream https://github.com/original/projet-open-source.git',
        'git fetch upstream',
        'git checkout main',
        'git merge upstream/main',
        'git checkout feature/ma-contribution',
        'git rebase main'
      ],
      status: activeStep === 5 ? 'current' : activeStep > 5 ? 'completed' : 'pending',
      icon: GitFork
    },
    {
      id: 'push',
      title: 'Pousser les changements',
      description: 'Publiez votre branche sur votre fork GitHub.',
      commands: ['git push -u origin feature/ma-contribution'],
      status: activeStep === 6 ? 'current' : activeStep > 6 ? 'completed' : 'pending',
      icon: GitBranch
    },
    {
      id: 'pr',
      title: 'Ouvrir une Pull Request',
      description: 'Proposez vos changements au projet original.',
      status: activeStep === 7 ? 'current' : activeStep > 7 ? 'completed' : 'pending',
      icon: GitPullRequest
    },
    {
      id: 'review',
      title: 'Processus de revue',
      description: 'Répondez aux commentaires et apportez les modifications demandées.',
      status: activeStep === 8 ? 'current' : activeStep > 8 ? 'completed' : 'pending',
      icon: MessageSquare
    },
    {
      id: 'merge',
      title: 'Fusion de votre contribution',
      description: 'Votre contribution est acceptée et fusionnée dans le projet principal.',
      status: activeStep === 9 ? 'current' : activeStep > 9 ? 'completed' : 'pending',
      icon: UserCheck
    }
  ];

  const currentStep = workflowSteps[activeStep];

  const nextStep = () => {
    if (activeStep < workflowSteps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const resetSimulation = () => {
    setActiveStep(0);
  };

  const openForkModal = () => {
    setModalContent(
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-2">Fork un dépôt GitHub</h3>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <img 
            src="https://docs.github.com/assets/cb-79331/mw-1440/images/help/repository/fork-button.webp" 
            alt="GitHub Fork Button" 
            className="w-full h-auto rounded-lg shadow-lg mb-4"
          />
          <p className="text-gray-300 text-sm">
            Pour créer un fork, visitez la page du dépôt GitHub que vous souhaitez forker
            et cliquez sur le bouton "Fork" en haut à droite. Cela créera une copie du
            dépôt sur votre compte GitHub.
          </p>
        </div>
        <div className="flex items-start space-x-3 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
          <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-white font-medium">Pourquoi forker ?</h4>
            <p className="text-sm text-gray-300">
              Le fork vous permet de contribuer à un projet sans avoir d'accès direct en écriture.
              C'est une pratique standard pour contribuer à des projets open source.
            </p>
          </div>
        </div>
      </div>
    );
    setShowModal(true);
  };

  const openPRModal = () => {
    setModalContent(
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-2">Créer une Pull Request</h3>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <img 
            src="https://docs.github.com/assets/cb-23682/mw-1440/images/help/pull_requests/pull-request-start-review-button.webp" 
            alt="GitHub Pull Request" 
            className="w-full h-auto rounded-lg shadow-lg mb-4"
          />
          <p className="text-gray-300 text-sm">
            Après avoir poussé vos changements sur votre fork, visitez la page GitHub du dépôt original.
            Vous verrez une bannière vous invitant à créer une Pull Request avec vos modifications récentes.
            Vous pouvez aussi cliquer sur l'onglet "Pull requests" puis sur le bouton "New pull request".
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="text-white font-medium">Bonnes pratiques pour une PR</h4>
          <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
            <li>Utilisez un titre clair qui décrit votre contribution</li>
            <li>Incluez une description détaillée de ce que vous avez changé et pourquoi</li>
            <li>Référencez les issues associées avec #numéro</li>
            <li>Ajoutez des instructions de test si nécessaire</li>
            <li>Assurez-vous que tous les tests passent avant de soumettre</li>
          </ul>
        </div>
      </div>
    );
    setShowModal(true);
  };

  const getStepContent = () => {
    switch (currentStep.id) {
      case 'fork':
        return (
          <div className="space-y-4">
            <p className="text-gray-300">
              Le fork est la première étape pour contribuer à un projet open source. 
              Cela crée une copie personnelle du dépôt sur votre compte GitHub, 
              vous permettant d'y apporter des modifications sans affecter le projet original.
            </p>
            <div className="flex justify-center">
              <Button onClick={openForkModal}>
                <GitFork className="h-4 w-4 mr-2" />
                Voir comment forker
              </Button>
            </div>
          </div>
        );

      case 'pr':
        return (
          <div className="space-y-4">
            <p className="text-gray-300">
              Une fois que vous avez terminé vos modifications et les avez poussées sur votre fork,
              vous pouvez ouvrir une Pull Request (PR) pour proposer vos changements au projet original.
              Les mainteneurs du projet pourront examiner votre code, faire des commentaires et
              éventuellement l'intégrer au projet principal.
            </p>
            <div className="flex justify-center">
              <Button onClick={openPRModal}>
                <GitPullRequest className="h-4 w-4 mr-2" />
                Voir comment créer une PR
              </Button>
            </div>
          </div>
        );
        
      case 'review':
        return (
          <div className="space-y-4">
            <p className="text-gray-300">
              Après avoir soumis votre Pull Request, les mainteneurs du projet et autres contributeurs
              vont examiner votre code. Ils peuvent demander des changements, suggérer des améliorations
              ou approuver directement vos modifications.
            </p>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Conseils pour la phase de revue</h4>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Répondez poliment et rapidement aux commentaires</li>
                <li>Ne prenez pas les critiques personnellement</li>
                <li>Soyez ouvert aux suggestions d'amélioration</li>
                <li>Testez bien vos modifications avant de les soumettre à nouveau</li>
              </ul>
            </div>
          </div>
        );
        
      case 'merge':
        return (
          <div className="space-y-4">
            <p className="text-gray-300">
              Félicitations ! Si votre Pull Request est acceptée, les mainteneurs du projet
              vont fusionner vos changements dans la branche principale. Votre contribution
              fait maintenant partie du projet.
            </p>
            <div className="flex justify-center">
              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 inline-block">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <div>
                    <h4 className="text-white font-medium">Contribution acceptée !</h4>
                    <p className="text-sm text-gray-300">
                      Vous venez de contribuer à un projet open source !
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-4">
            <p className="text-gray-300">{currentStep.description}</p>
            {currentStep.commands && (
              <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm overflow-x-auto">
                {currentStep.commands.map((cmd, index) => (
                  <div key={index} className="text-green-400">$ {cmd}</div>
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Simulateur de Contribution Open Source</h2>
        <p className="text-gray-300">Apprenez le processus complet de contribution à un projet open source sur GitHub</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left sidebar - Steps */}
        <div>
          <Card header={<h3 className="font-semibold text-white">Étapes du processus</h3>}>
            <div className="space-y-2 pr-1">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full text-left flex items-center space-x-3 p-3 rounded-lg border ${
                      step.status === 'current'
                        ? 'bg-blue-900/20 border-blue-500/50'
                        : step.status === 'completed'
                          ? 'bg-green-900/20 border-green-500/30'
                          : step.status === 'error'
                            ? 'bg-red-900/20 border-red-500/30'
                            : 'border-gray-600 hover:bg-gray-700/30'
                    } transition-colors`}
                  >
                    <div className="flex-shrink-0">
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : (
                        <Icon className={`h-5 w-5 ${
                          step.status === 'current' ? 'text-blue-400' :
                          step.status === 'error' ? 'text-red-400' : 'text-gray-400'
                        }`} />
                      )}
                    </div>
                    <span className={`${
                      step.status === 'current' ? 'text-white' :
                      step.status === 'completed' ? 'text-green-100' : 'text-gray-300'
                    }`}>
                      {index + 1}. {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {React.createElement(currentStep.icon, { className: 'h-6 w-6 text-blue-400' })}
                  <h3 className="text-xl font-bold text-white">{currentStep.title}</h3>
                </div>
                <Badge variant="info">Étape {activeStep + 1}/{workflowSteps.length}</Badge>
              </div>

              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="min-h-[200px]"
              >
                {getStepContent()}
              </motion.div>

              <div className="flex justify-between">
                <Button 
                  variant="secondary"
                  onClick={prevStep}
                  disabled={activeStep === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Précédent
                </Button>
                
                <div>
                  <Button 
                    variant="secondary" 
                    onClick={resetSimulation}
                    className="mr-2"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Réinitialiser
                  </Button>
                  
                  <Button
                    onClick={nextStep}
                    disabled={activeStep === workflowSteps.length - 1}
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Additional information */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Bonnes pratiques pour contribuer à l'open source</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Avant de contribuer</h4>
              <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                <li>Lisez le guide de contribution du projet</li>
                <li>Vérifiez si l'issue existe déjà</li>
                <li>Discutez de votre approche avec la communauté</li>
                <li>Familiarisez-vous avec le code de conduite</li>
              </ul>
            </div>
            
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-green-400 font-medium mb-2">Pendant le développement</h4>
              <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                <li>Suivez les conventions de code du projet</li>
                <li>Écrivez des tests pour vos fonctionnalités</li>
                <li>Faites des commits atomiques avec des messages clairs</li>
                <li>Mettez à jour la documentation si nécessaire</li>
              </ul>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <h4 className="text-purple-400 font-medium mb-2">Communication</h4>
              <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                <li>Soyez respectueux et constructif</li>
                <li>Expliquez clairement vos intentions</li>
                <li>Soyez patient - les mainteneurs sont souvent bénévoles</li>
                <li>Acceptez gracieusement les retours et critiques</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div />
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {modalContent}
              
              <div className="flex justify-end mt-6">
                <Button onClick={() => setShowModal(false)}>
                  Fermer
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpenSourceSimulator;