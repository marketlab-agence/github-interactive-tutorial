import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Download, Cloud, User, GitBranch, GitPullRequest, ArrowRight } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface Repository {
  name: string;
  owner: string;
  stars: number;
  forks: number;
  commits: number;
  branches: string[];
}

interface ComparisonFeature {
  aspect: string;
  fork: string;
  clone: string;
}

const ForkCloneComparator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'visualization' | 'comparison' | 'flowchart'>('visualization');
  const [simulationStep, setSimulationStep] = useState<number>(0);

  const [originalRepo] = useState<Repository>({
    name: 'projet-demo',
    owner: 'organisation',
    stars: 120,
    forks: 34,
    commits: 56,
    branches: ['main', 'develop', 'feature/auth']
  });

  const [forkedRepo, setForkedRepo] = useState<Repository | null>(null);
  const [clonedRepo, setClonedRepo] = useState<Repository | null>(null);

  const comparisonFeatures: ComparisonFeature[] = [
    {
      aspect: 'Emplacement',
      fork: 'Sur GitHub (votre compte)',
      clone: 'Sur votre machine locale'
    },
    {
      aspect: 'But principal',
      fork: 'Contribuer à un projet sans être collaborateur',
      clone: 'Travailler localement sur un projet'
    },
    {
      aspect: 'Connexion à l\'original',
      fork: 'Maintient un lien, peut se synchroniser',
      clone: 'Connexion via remote "origin"'
    },
    {
      aspect: 'Visibilité',
      fork: 'Public sur GitHub',
      clone: 'Privé sur votre machine'
    },
    {
      aspect: 'Permissions',
      fork: 'Vous avez tous les droits sur votre fork',
      clone: 'Droits limités par votre rôle dans le projet'
    },
    {
      aspect: 'Contributions',
      fork: 'Via Pull Requests',
      clone: 'Via push direct si autorisé'
    }
  ];

  const simulateFork = () => {
    setForkedRepo({
      name: originalRepo.name,
      owner: 'votre-username',
      stars: 0,
      forks: 0,
      commits: originalRepo.commits,
      branches: originalRepo.branches
    });
    setSimulationStep(1);
  };

  const simulateClone = () => {
    setClonedRepo({
      name: originalRepo.name,
      owner: originalRepo.owner,
      stars: originalRepo.stars,
      forks: originalRepo.forks,
      commits: originalRepo.commits,
      branches: originalRepo.branches
    });
    setSimulationStep(2);
  };

  const simulatePR = () => {
    if (forkedRepo) {
      setForkedRepo({
        ...forkedRepo,
        commits: forkedRepo.commits + 3,
        branches: [...forkedRepo.branches, 'feature/nouvelle-fonctionnalite']
      });
      setSimulationStep(3);
    }
  };

  const reset = () => {
    setForkedRepo(null);
    setClonedRepo(null);
    setSimulationStep(0);
  };

  const renderVisualizationTab = () => (
    <div className="space-y-6">
      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="text-center p-4 space-y-4">
            <GitFork className="h-12 w-12 text-green-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Fork</h3>
            <p className="text-sm text-gray-300">
              Crée une copie du dépôt sur votre compte GitHub
            </p>
            <Button 
              onClick={simulateFork} 
              disabled={!!forkedRepo}
              className="w-full"
            >
              {forkedRepo ? 'Déjà forké' : 'Forker le Dépôt'}
            </Button>
          </div>
        </Card>

        <Card>
          <div className="text-center p-4 space-y-4">
            <Download className="h-12 w-12 text-purple-400 mx-auto" />
            <h3 className="text-lg font-semibold text-white">Clone</h3>
            <p className="text-sm text-gray-300">
              Télécharge une copie locale du dépôt
            </p>
            <Button 
              onClick={simulateClone} 
              disabled={!!clonedRepo}
              variant="secondary"
              className="w-full"
            >
              {clonedRepo ? 'Déjà cloné' : 'Cloner le Dépôt'}
            </Button>
          </div>
        </Card>
      </div>

      {/* Visualisation */}
      <div className="grid grid-cols-1 gap-6">
        {/* Dépôt d'origine */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-white">Dépôt Original (GitHub)</h3>
              </div>
              <Button size="sm" variant="ghost" onClick={reset} disabled={simulationStep === 0}>
                Réinitialiser
              </Button>
            </div>
          }
        >
          <div className="space-y-4 p-2">
            <div className="flex items-center space-x-3">
              <User className="h-8 w-8 text-gray-400" />
              <div>
                <h4 className="font-medium text-white">{originalRepo.owner}/{originalRepo.name}</h4>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <span>⭐ {originalRepo.stars}</span>
                  <span>🍴 {originalRepo.forks}</span>
                  <span>
                    <GitCommit className="h-4 w-4 inline mr-1" />
                    {originalRepo.commits} commits
                  </span>
                </div>
              </div>
            </div>

            {/* Branches */}
            <div className="p-3 bg-gray-800/50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-300 mb-2">Branches</h5>
              <div className="flex flex-wrap gap-2">
                {originalRepo.branches.map(branch => (
                  <Badge key={branch} variant="default" size="sm">
                    {branch}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Workflow Diagram */}
            {simulationStep > 0 && (
              <div className="mt-4">
                <div className="flex justify-center items-center space-x-8 relative">
                  {/* Original Repo */}
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Cloud className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Dépôt Original</p>
                  </div>

                  {/* Fork */}
                  {forkedRepo && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        className="flex-1 flex items-center justify-center"
                      >
                        <div className="w-16 border-t-2 border-dashed border-green-400"></div>
                        <GitFork className="h-5 w-5 text-green-400 mx-2" />
                        <div className="w-16 border-t-2 border-dashed border-green-400"></div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
                          <User className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Votre Fork</p>
                      </motion.div>
                    </>
                  )}

                  {/* Clone */}
                  {clonedRepo && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        className="flex-1 flex items-center justify-center"
                      >
                        <div className="w-16 border-t-2 border-dashed border-purple-400"></div>
                        <Download className="h-5 w-5 text-purple-400 mx-2" />
                        <div className="w-16 border-t-2 border-dashed border-purple-400"></div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto">
                          <HardDrive className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Clone Local</p>
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Pull Request flow */}
                {simulationStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <GitPullRequest className="h-5 w-5 text-purple-400" />
                      <h4 className="font-medium text-white">Pull Request</h4>
                    </div>
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
                      <span>Fork: feature/nouvelle-fonctionnalite</span>
                      <ArrowRight className="h-4 w-4 text-purple-400" />
                      <span>Original: main</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      Le modèle Fork + PR permet de contribuer à des projets sans avoir d'accès en écriture direct.
                    </p>
                  </motion.div>
                )}

                {/* Next Steps */}
                <div className="mt-4 text-center">
                  {simulationStep === 1 && !clonedRepo && (
                    <Button onClick={simulateClone}>
                      <Download className="h-4 w-4 mr-2" />
                      Cloner le Fork
                    </Button>
                  )}
                  {simulationStep === 2 && forkedRepo && (
                    <Button onClick={simulatePR}>
                      <GitPullRequest className="h-4 w-4 mr-2" />
                      Créer une Pull Request
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Forked Repository */}
        {forkedRepo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              header={
                <div className="flex items-center space-x-2">
                  <GitFork className="h-5 w-5 text-green-400" />
                  <h3 className="font-semibold text-white">Votre Fork (GitHub)</h3>
                </div>
              }
            >
              <div className="space-y-4 p-2">
                <div className="flex items-center space-x-3">
                  <User className="h-8 w-8 text-gray-400" />
                  <div>
                    <h4 className="font-medium text-white">{forkedRepo.owner}/{forkedRepo.name}</h4>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <span>⭐ {forkedRepo.stars}</span>
                      <span>🍴 {forkedRepo.forks}</span>
                      <span>
                        <GitCommit className="h-4 w-4 inline mr-1" />
                        {forkedRepo.commits} commits
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Branches</h5>
                  <div className="flex flex-wrap gap-2">
                    {forkedRepo.branches.map(branch => (
                      <Badge 
                        key={branch} 
                        variant={branch === 'feature/nouvelle-fonctionnalite' ? 'success' : 'default'} 
                        size="sm"
                      >
                        {branch}
                      </Badge>
                    ))}
                  </div>
                </div>

                {simulationStep >= 3 && (
                  <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <h5 className="text-sm font-medium text-green-400 mb-2">Nouveaux Commits</h5>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <GitCommit className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">Ajout de fonctionnalité</span>
                        <span className="text-xs text-gray-500 ml-auto">il y a 2h</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <GitCommit className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">Correction de bug UI</span>
                        <span className="text-xs text-gray-500 ml-auto">il y a 3h</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <GitCommit className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">Mise à jour docs</span>
                        <span className="text-xs text-gray-500 ml-auto">il y a 4h</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Cloned Repository */}
        {clonedRepo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card
              header={
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-5 w-5 text-purple-400" />
                  <h3 className="font-semibold text-white">Clone Local</h3>
                </div>
              }
            >
              <div className="space-y-4 p-2">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="font-mono text-sm text-gray-300">
                    <div>$ git clone https://github.com/{forkedRepo ? forkedRepo.owner : originalRepo.owner}/{originalRepo.name}.git</div>
                    <div className="text-green-400">Clonage dans '{originalRepo.name}'...</div>
                    <div className="text-green-400">Dépôt cloné avec succès</div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-300 mb-2">Configuration</h5>
                  <div className="font-mono text-sm text-gray-300">
                    <div>$ git remote -v</div>
                    <div className="text-green-400">origin  https://github.com/{forkedRepo ? forkedRepo.owner : originalRepo.owner}/{originalRepo.name}.git (fetch)</div>
                    <div className="text-green-400">origin  https://github.com/{forkedRepo ? forkedRepo.owner : originalRepo.owner}/{originalRepo.name}.git (push)</div>
                  </div>
                </div>
                
                {forkedRepo && (
                  <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <h5 className="text-sm font-medium text-blue-400 mb-2">Configurer le dépôt original</h5>
                    <div className="font-mono text-sm text-gray-300">
                      <div>$ git remote add upstream https://github.com/{originalRepo.owner}/{originalRepo.name}.git</div>
                      <div className="text-green-400">Dépôt original ajouté en tant qu'upstream</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderComparisonTab = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Comparaison Fork vs Clone</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Aspect
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-400 uppercase tracking-wider">
                  Fork
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">
                  Clone
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 bg-gray-800/20">
              {comparisonFeatures.map((feature, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {feature.aspect}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {feature.fork}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {feature.clone}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="text-center p-6">
            <GitFork className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Quand utiliser Fork ?</h3>
            <ul className="text-left space-y-2 text-gray-300">
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                <span>Lorsque vous voulez contribuer à un projet open source</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                <span>Quand vous n'avez pas d'accès en écriture au dépôt original</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                <span>Pour expérimenter avec une base de code sans affecter l'original</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                <span>Pour proposer des changements via le modèle Pull Request</span>
              </li>
            </ul>
          </div>
        </Card>

        <Card>
          <div className="text-center p-6">
            <Download className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Quand utiliser Clone ?</h3>
            <ul className="text-left space-y-2 text-gray-300">
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                <span>Lorsque vous êtes membre du projet avec accès en écriture</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                <span>Quand vous voulez simplement utiliser ou exécuter le code</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                <span>Pour travailler localement sur votre propre projet</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                <span>Pour cloner un fork que vous avez déjà créé sur GitHub</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderFlowchartTab = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-xl font-semibold text-white text-center mb-6">Workflow de Contribution Open Source</h3>
        
        <div className="space-y-8">
          {[
            {
              step: 1,
              title: 'Fork du Dépôt',
              description: 'Créez votre propre copie du projet sur GitHub',
              icon: GitFork,
              command: 'Sur GitHub, cliquez sur le bouton "Fork"'
            },
            {
              step: 2,
              title: 'Clone du Fork',
              description: 'Téléchargez le fork sur votre machine locale',
              icon: Download,
              command: 'git clone https://github.com/votre-username/projet.git'
            },
            {
              step: 3,
              title: 'Ajout du Dépôt Original',
              description: 'Configurez le dépôt original comme remote "upstream"',
              icon: Cloud,
              command: 'git remote add upstream https://github.com/organisation/projet.git'
            },
            {
              step: 4,
              title: 'Création d\'une Branche',
              description: 'Créez une branche pour votre contribution',
              icon: GitBranch,
              command: 'git checkout -b feature/ma-fonctionnalite'
            },
            {
              step: 5,
              title: 'Commit des Changements',
              description: 'Apportez vos modifications et commitez-les',
              icon: GitCommit,
              command: 'git add .\ngit commit -m "Ajouter ma fonctionnalité"'
            },
            {
              step: 6,
              title: 'Push vers le Fork',
              description: 'Envoyez vos modifications vers votre fork',
              icon: ArrowUp,
              command: 'git push -u origin feature/ma-fonctionnalite'
            },
            {
              step: 7,
              title: 'Créer une Pull Request',
              description: 'Proposez vos changements au projet original',
              icon: GitPullRequest,
              command: 'Sur GitHub, créez une PR depuis votre fork vers le dépôt original'
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start"
            >
              {/* Vertical line connecting steps */}
              {index < 6 && (
                <div className="absolute left-7 top-12 w-0.5 h-16 bg-gray-600"></div>
              )}
              
              <div className="mr-4 flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-800 border-2 border-blue-500">
                <span className="text-xl font-bold text-blue-400">{step.step}</span>
              </div>
              
              <div className="flex-1 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center space-x-2 mb-2">
                  <step.icon className="h-5 w-5 text-blue-400" />
                  <h4 className="font-medium text-white">{step.title}</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">{step.description}</p>
                <div className="bg-gray-900 p-2 rounded text-sm font-mono text-green-400">
                  $ {step.command}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Fork vs Clone</h2>
        <p className="text-gray-300">Comprenez les différences et cas d'usage de ces deux approches</p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          className={`py-3 px-6 focus:outline-none ${
            activeTab === 'visualization'
              ? 'border-b-2 border-blue-500 text-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('visualization')}
        >
          Visualisation
        </button>
        <button
          className={`py-3 px-6 focus:outline-none ${
            activeTab === 'comparison'
              ? 'border-b-2 border-blue-500 text-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('comparison')}
        >
          Comparaison
        </button>
        <button
          className={`py-3 px-6 focus:outline-none ${
            activeTab === 'flowchart'
              ? 'border-b-2 border-blue-500 text-white'
              : 'text-gray-400 hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('flowchart')}
        >
          Workflow
        </button>
      </div>

      {/* Content based on active tab */}
      <div>
        {activeTab === 'visualization' && renderVisualizationTab()}
        {activeTab === 'comparison' && renderComparisonTab()}
        {activeTab === 'flowchart' && renderFlowchartTab()}
      </div>
    </div>
  );
};

// Manually implementing missing Lucide React icons
const GitCommit: React.FC<{ className?: string }> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="3"></circle>
    <line x1="3" y1="12" x2="9" y2="12"></line>
    <line x1="15" y1="12" x2="21" y2="12"></line>
  </svg>
);

const HardDrive: React.FC<{ className?: string }> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="22" y1="12" x2="2" y2="12"></line>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
    <line x1="6" y1="16" x2="6.01" y2="16"></line>
    <line x1="10" y1="16" x2="10.01" y2="16"></line>
  </svg>
);

const ArrowUp: React.FC<{ className?: string }> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

export default ForkCloneComparator;