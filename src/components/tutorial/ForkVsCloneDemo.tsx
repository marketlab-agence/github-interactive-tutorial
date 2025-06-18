import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitFork, Download, Users, Lock, Unlock, ArrowRight, Copy } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Tabs from '../ui/Tabs';

interface Repository {
  id: string;
  name: string;
  owner: string;
  description: string;
  isPrivate: boolean;
  stars: number;
  forks: number;
  language: string;
  lastUpdate: Date;
}

const ForkVsCloneDemo: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<'fork' | 'clone' | null>(null);
  const [animationStep, setAnimationStep] = useState(0);

  const originalRepo: Repository = {
    id: 'original',
    name: 'awesome-project',
    owner: 'opensource-dev',
    description: 'Un projet open source incroyable avec de nombreuses fonctionnalités',
    isPrivate: false,
    stars: 1250,
    forks: 89,
    language: 'TypeScript',
    lastUpdate: new Date('2024-01-15T10:30:00')
  };

  const [userRepo, setUserRepo] = useState<Repository | null>(null);
  const [localRepo, setLocalRepo] = useState<Repository | null>(null);

  const performFork = async () => {
    setSelectedAction('fork');
    setAnimationStep(1);

    // Simuler la création du fork
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUserRepo({
      ...originalRepo,
      id: 'forked',
      owner: 'votre-username',
      forks: 0,
      stars: 0
    });
    
    setAnimationStep(2);
  };

  const performClone = async () => {
    setSelectedAction('clone');
    setAnimationStep(1);

    // Simuler le clonage
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLocalRepo({
      ...originalRepo,
      id: 'local',
      owner: 'local-copy'
    });
    
    setAnimationStep(2);
  };

  const reset = () => {
    setSelectedAction(null);
    setAnimationStep(0);
    setUserRepo(null);
    setLocalRepo(null);
  };

  const renderRepository = (repo: Repository, type: 'original' | 'forked' | 'local') => {
    const getTypeInfo = () => {
      switch (type) {
        case 'original':
          return {
            title: 'Dépôt Original',
            icon: GitFork,
            color: 'blue',
            location: 'GitHub (Propriétaire original)'
          };
        case 'forked':
          return {
            title: 'Votre Fork',
            icon: Copy,
            color: 'green',
            location: 'GitHub (Votre compte)'
          };
        case 'local':
          return {
            title: 'Copie Locale',
            icon: Download,
            color: 'purple',
            location: 'Votre ordinateur'
          };
      }
    };

    const typeInfo = getTypeInfo();
    const Icon = typeInfo.icon;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-${typeInfo.color}-900/20 border border-${typeInfo.color}-500/30 rounded-xl p-4`}
      >
        <div className="flex items-center space-x-3 mb-4">
          <Icon className={`h-6 w-6 text-${typeInfo.color}-400`} />
          <div>
            <h3 className="font-semibold text-white">{typeInfo.title}</h3>
            <p className="text-xs text-gray-400">{typeInfo.location}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-white">{repo.owner}/{repo.name}</span>
            {repo.isPrivate ? (
              <Lock className="h-4 w-4 text-red-400" />
            ) : (
              <Unlock className="h-4 w-4 text-green-400" />
            )}
          </div>

          <p className="text-sm text-gray-300">{repo.description}</p>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span className="text-gray-400">{repo.language}</span>
            </div>
            <div className="text-gray-400">⭐ {repo.stars}</div>
            <div className="text-gray-400">🍴 {repo.forks}</div>
          </div>

          <div className="text-xs text-gray-500">
            Mis à jour le {repo.lastUpdate.toLocaleDateString()}
          </div>
        </div>
      </motion.div>
    );
  };

  const comparisonTab = {
    id: 'comparison',
    label: 'Comparaison',
    icon: GitFork,
    content: (
      <div className="space-y-6">
        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <div className="text-center space-y-4">
              <GitFork className="h-12 w-12 text-green-400 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Fork</h3>
              <p className="text-sm text-gray-300">
                Créer une copie du dépôt sur votre compte GitHub
              </p>
              <Button 
                onClick={performFork} 
                disabled={selectedAction === 'fork' && animationStep > 0}
                className="w-full"
              >
                {selectedAction === 'fork' && animationStep === 1 ? 'Création du fork...' : 'Forker le Dépôt'}
              </Button>
            </div>
          </Card>

          <Card>
            <div className="text-center space-y-4">
              <Download className="h-12 w-12 text-purple-400 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Clone</h3>
              <p className="text-sm text-gray-300">
                Télécharger une copie locale du dépôt
              </p>
              <Button 
                onClick={performClone} 
                disabled={selectedAction === 'clone' && animationStep > 0}
                variant="secondary"
                className="w-full"
              >
                {selectedAction === 'clone' && animationStep === 1 ? 'Clonage en cours...' : 'Cloner le Dépôt'}
              </Button>
            </div>
          </Card>
        </div>

        {/* Visualisation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Visualisation</h3>
            {(selectedAction || userRepo || localRepo) && (
              <Button onClick={reset} size="sm" variant="outline">
                Réinitialiser
              </Button>
            )}
          </div>

          <div className="grid gap-6">
            {/* Dépôt original */}
            <div className="text-center">
              {renderRepository(originalRepo, 'original')}
            </div>

            {/* Flèches et résultats */}
            <AnimatePresence>
              {selectedAction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {/* Fork */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <ArrowRight className={`h-6 w-6 ${selectedAction === 'fork' ? 'text-green-400' : 'text-gray-600'}`} />
                      <span className={`font-medium ${selectedAction === 'fork' ? 'text-green-400' : 'text-gray-600'}`}>
                        FORK
                      </span>
                    </div>
                    {userRepo && renderRepository(userRepo, 'forked')}
                  </div>

                  {/* Clone */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <ArrowRight className={`h-6 w-6 ${selectedAction === 'clone' ? 'text-purple-400' : 'text-gray-600'}`} />
                      <span className={`font-medium ${selectedAction === 'clone' ? 'text-purple-400' : 'text-gray-600'}`}>
                        CLONE
                      </span>
                    </div>
                    {localRepo && renderRepository(localRepo, 'local')}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Tableau comparatif */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Comparaison Détaillée</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-3 text-gray-300">Aspect</th>
                  <th className="text-left p-3 text-green-400">Fork</th>
                  <th className="text-left p-3 text-purple-400">Clone</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  {
                    aspect: 'Localisation',
                    fork: 'GitHub (votre compte)',
                    clone: 'Votre ordinateur'
                  },
                  {
                    aspect: 'Connexion au dépôt original',
                    fork: 'Maintient un lien',
                    clone: 'Copie indépendante'
                  },
                  {
                    aspect: 'Contribution',
                    fork: 'Via Pull Requests',
                    clone: 'Accès direct si autorisé'
                  },
                  {
                    aspect: 'Visibilité',
                    fork: 'Public sur GitHub',
                    clone: 'Privé sur votre machine'
                  },
                  {
                    aspect: 'Synchronisation',
                    fork: 'Peut récupérer les mises à jour',
                    clone: 'Doit être mis à jour manuellement'
                  },
                  {
                    aspect: 'Cas d\'usage',
                    fork: 'Contribuer à un projet',
                    clone: 'Travailler localement'
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-gray-800">
                    <td className="p-3 font-medium text-white">{row.aspect}</td>
                    <td className="p-3 text-gray-300">{row.fork}</td>
                    <td className="p-3 text-gray-300">{row.clone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    )
  };

  const workflowTab = {
    id: 'workflow',
    label: 'Workflow de Contribution',
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white text-center">
          Workflow Typique de Contribution Open Source
        </h3>

        <div className="space-y-4">
          {[
            {
              step: 1,
              title: 'Fork du Dépôt',
              description: 'Créer une copie du projet sur votre compte GitHub',
              command: 'Cliquer sur "Fork" sur GitHub',
              icon: GitFork,
              color: 'blue'
            },
            {
              step: 2,
              title: 'Clone de Votre Fork',
              description: 'Télécharger votre fork sur votre machine locale',
              command: 'git clone https://github.com/votre-username/projet.git',
              icon: Download,
              color: 'green'
            },
            {
              step: 3,
              title: 'Création d\'une Branche',
              description: 'Créer une branche pour votre fonctionnalité',
              command: 'git checkout -b ma-nouvelle-fonctionnalite',
              icon: GitFork,
              color: 'purple'
            },
            {
              step: 4,
              title: 'Développement',
              description: 'Faire vos modifications et commits',
              command: 'git add . && git commit -m "Ajouter nouvelle fonctionnalité"',
              icon: Users,
              color: 'yellow'
            },
            {
              step: 5,
              title: 'Push vers Votre Fork',
              description: 'Envoyer vos modifications vers votre fork',
              command: 'git push origin ma-nouvelle-fonctionnalite',
              icon: ArrowRight,
              color: 'orange'
            },
            {
              step: 6,
              title: 'Création d\'une Pull Request',
              description: 'Proposer vos modifications au projet original',
              command: 'Créer une PR sur GitHub',
              icon: GitFork,
              color: 'pink'
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start space-x-4 p-4 rounded-lg bg-${item.color}-900/20 border border-${item.color}-500/30`}
            >
              <div className={`w-10 h-10 bg-${item.color}-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                {item.step}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white mb-1">{item.title}</h4>
                <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                <div className="bg-gray-900 rounded p-2">
                  <code className="text-green-400 text-xs">{item.command}</code>
                </div>
              </div>
              <item.icon className={`h-6 w-6 text-${item.color}-400 flex-shrink-0`} />
            </motion.div>
          ))}
        </div>
      </div>
    )
  };

  const tabs = [comparisonTab, workflowTab];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Fork vs Clone : Démonstration</h2>
        <p className="text-gray-300">Comprenez la différence entre forker et cloner un dépôt</p>
      </motion.div>

      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default ForkVsCloneDemo;