import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  SkipBack, 
  SkipForward, 
  ChevronLeft, 
  ChevronRight, 
  Check,
  GitCommit, 
  GitBranch,
  GitMerge
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface TimelineEvent {
  id: string;
  type: 'commit' | 'branch' | 'merge' | 'tag' | 'checkout';
  description: string;
  timestamp: string;
  hash?: string;
  branch?: string;
  message?: string;
}

const TimelineNavigator: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const timeline: TimelineEvent[] = [
    {
      id: 'e1',
      type: 'commit',
      description: 'Commit initial',
      message: 'Initialisation du projet',
      hash: 'a1b2c3d',
      branch: 'main',
      timestamp: '2023-12-01 10:30'
    },
    {
      id: 'e2',
      type: 'branch',
      description: 'Création de branche',
      branch: 'feature/login',
      timestamp: '2023-12-02 11:15'
    },
    {
      id: 'e3',
      type: 'commit',
      description: 'Commit sur feature/login',
      message: 'Ajout de la page de connexion',
      hash: 'e4f5g6h',
      branch: 'feature/login',
      timestamp: '2023-12-02 14:30'
    },
    {
      id: 'e4',
      type: 'commit',
      description: 'Commit sur feature/login',
      message: 'Amélioration du formulaire de connexion',
      hash: 'i7j8k9l',
      branch: 'feature/login',
      timestamp: '2023-12-03 09:45'
    },
    {
      id: 'e5',
      type: 'checkout',
      description: 'Retour sur main',
      branch: 'main',
      timestamp: '2023-12-03 10:30'
    },
    {
      id: 'e6',
      type: 'commit',
      description: 'Commit sur main',
      message: 'Mise à jour du README',
      hash: 'm1n2o3p',
      branch: 'main',
      timestamp: '2023-12-03 11:00'
    },
    {
      id: 'e7',
      type: 'checkout',
      description: 'Checkout sur feature/login',
      branch: 'feature/login',
      timestamp: '2023-12-04 09:15'
    },
    {
      id: 'e8',
      type: 'merge',
      description: 'Fusion de main dans feature/login',
      message: 'Mise à jour de feature/login avec les changements de main',
      branch: 'feature/login',
      timestamp: '2023-12-04 09:30'
    },
    {
      id: 'e9',
      type: 'commit',
      description: 'Commit sur feature/login',
      message: 'Finalisation de l\'authentification',
      hash: 'q5r6s7t',
      branch: 'feature/login',
      timestamp: '2023-12-04 14:30'
    },
    {
      id: 'e10',
      type: 'checkout',
      description: 'Retour sur main',
      branch: 'main',
      timestamp: '2023-12-05 10:00'
    },
    {
      id: 'e11',
      type: 'merge',
      description: 'Fusion de feature/login dans main',
      message: 'Intégration du système de connexion',
      branch: 'main',
      timestamp: '2023-12-05 10:15'
    },
    {
      id: 'e12',
      type: 'tag',
      description: 'Tag v1.0',
      message: 'Version 1.0',
      branch: 'main',
      timestamp: '2023-12-05 15:00'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'commit': return GitCommit;
      case 'branch': return GitBranch;
      case 'merge': return GitMerge;
      case 'tag': return Check;
      case 'checkout': return ChevronRight;
      default: return GitCommit;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'commit': return 'text-blue-400';
      case 'branch': return 'text-green-400';
      case 'merge': return 'text-purple-400';
      case 'tag': return 'text-yellow-400';
      case 'checkout': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getEventBg = (type: string) => {
    switch (type) {
      case 'commit': return 'bg-blue-900/20 border-blue-500/30';
      case 'branch': return 'bg-green-900/20 border-green-500/30';
      case 'merge': return 'bg-purple-900/20 border-purple-500/30';
      case 'tag': return 'bg-yellow-900/20 border-yellow-500/30';
      case 'checkout': return 'bg-gray-800/50 border-gray-600';
      default: return 'bg-gray-800/50 border-gray-600';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'commit': return 'info';
      case 'branch': return 'success';
      case 'merge': return 'warning';
      case 'tag': return 'error';
      case 'checkout': return 'default';
      default: return 'default';
    }
  };

  const currentEvent = timeline[currentPosition];
  const isStart = currentPosition === 0;
  const isEnd = currentPosition === timeline.length - 1;

  const goBack = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const goForward = () => {
    if (currentPosition < timeline.length - 1) {
      setCurrentPosition(currentPosition + 1);
    }
  };

  const goToStart = () => {
    setCurrentPosition(0);
  };

  const goToEnd = () => {
    setCurrentPosition(timeline.length - 1);
  };

  const getRepositoryState = () => {
    // Simuler l'état du dépôt à ce moment de l'historique
    const currentTimeline = timeline.slice(0, currentPosition + 1);
    
    // Analyser l'historique pour trouver les branches et leur état
    const branches = new Set<string>();
    let currentBranch = 'main';
    
    currentTimeline.forEach(event => {
      if (event.branch) {
        branches.add(event.branch);
      }
      
      if (event.type === 'branch' && event.branch) {
        currentBranch = event.branch;
      } else if (event.type === 'checkout' && event.branch) {
        currentBranch = event.branch;
      }
    });
    
    // Trouver les commits les plus récents par branche
    const branchCommits = Array.from(branches).map(branch => {
      const branchEvents = currentTimeline
        .filter(e => e.branch === branch && (e.type === 'commit' || e.type === 'merge'))
        .slice(-1)[0];
      
      return {
        branch,
        lastCommit: branchEvents?.message || 'Pas de commit',
        lastCommitHash: branchEvents?.hash || '',
        isActive: branch === currentBranch
      };
    });
    
    return {
      branches: Array.from(branches),
      currentBranch,
      branchCommits
    };
  };

  const repoState = getRepositoryState();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Navigateur de Timeline Git</h2>
        <p className="text-gray-300">Naviguez à travers l'historique des actions Git</p>
      </motion.div>

      {/* Contrôles de navigation */}
      <Card>
        <div className="flex items-center justify-center space-x-4">
          <Button onClick={goToStart} disabled={isStart} variant="secondary">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={goBack} disabled={isStart} variant="secondary">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="px-4 py-2 bg-gray-700/30 rounded-lg text-white">
            {currentPosition + 1} / {timeline.length}
          </div>
          <Button onClick={goForward} disabled={isEnd} variant="secondary">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button onClick={goToEnd} disabled={isEnd} variant="secondary">
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Timeline et contenu principal */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline verticale */}
        <div className="lg:col-span-1">
          <Card header={<h3 className="font-semibold text-white">Historique</h3>}>
            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
              {timeline.map((event, index) => {
                const Icon = getEventIcon(event.type);
                const isCurrent = index === currentPosition;
                
                return (
                  <button
                    key={event.id}
                    onClick={() => setCurrentPosition(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      isCurrent 
                        ? 'bg-blue-900/30 border-blue-500/50' 
                        : index < currentPosition
                          ? 'bg-gray-800/30 border-gray-700'
                          : 'bg-gray-800/10 border-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-4 w-4 ${getEventColor(event.type)}`} />
                      <span className={`text-sm ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                        {event.description}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{event.timestamp}</div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Détails de l'événement */}
        <div className="lg:col-span-2">
          <Card>
            <div className="space-y-6">
              {/* Événement actuel */}
              <motion.div
                key={currentEvent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-lg border ${getEventBg(currentEvent.type)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                      {React.createElement(getEventIcon(currentEvent.type), { 
                        className: `h-5 w-5 ${getEventColor(currentEvent.type)}` 
                      })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{currentEvent.description}</h3>
                      <div className="text-sm text-gray-400">{currentEvent.timestamp}</div>
                    </div>
                  </div>
                  <Badge variant={getBadgeVariant(currentEvent.type)}>
                    {currentEvent.type.charAt(0).toUpperCase() + currentEvent.type.slice(1)}
                  </Badge>
                </div>

                {/* Détails spécifiques au type d'événement */}
                <div className="space-y-3">
                  {currentEvent.branch && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">Branche:</span>
                      <span className="text-white font-mono">{currentEvent.branch}</span>
                    </div>
                  )}

                  {currentEvent.hash && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">Hash:</span>
                      <span className="text-white font-mono">{currentEvent.hash}</span>
                    </div>
                  )}

                  {currentEvent.message && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">Message:</span>
                      <span className="text-white">{currentEvent.message}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* État du dépôt */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">État du Dépôt</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-medium text-white mb-2">Branche Courante</h4>
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-5 w-5 text-green-400" />
                      <span className="text-white font-mono">{repoState.currentBranch}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <h4 className="font-medium text-white mb-2">Branches</h4>
                    <div className="space-y-1">
                      {repoState.branchCommits.map(branch => (
                        <div 
                          key={branch.branch}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className={branch.isActive ? 'text-green-400' : 'text-gray-400'}>
                            {branch.branch}
                          </span>
                          {branch.lastCommitHash && (
                            <span className="text-gray-500 font-mono text-xs">
                              {branch.lastCommitHash}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Timeline horizontale */}
      <Card>
        <div className="relative py-8">
          {/* Ligne de temps */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-600"></div>
          
          <div className="flex justify-between relative">
            {timeline.map((event, index) => {
              const Icon = getEventIcon(event.type);
              const isCurrent = index === currentPosition;
              
              return (
                <button
                  key={event.id}
                  onClick={() => setCurrentPosition(index)}
                  className="flex flex-col items-center relative z-10"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isCurrent 
                      ? 'bg-blue-500 border-2 border-white' 
                      : index < currentPosition
                        ? 'bg-gray-400 border-2 border-gray-700'
                        : 'bg-gray-700 border-2 border-gray-800'
                  }`}>
                    <Icon className={`h-3 w-3 ${isCurrent ? 'text-white' : 'text-gray-800'}`} />
                  </div>
                  {isCurrent && (
                    <div className="absolute -bottom-8 transform -translate-x-1/2 left-1/2 whitespace-nowrap">
                      <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">
                        {event.timestamp}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Explication */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">À propos de la Navigation Temporelle</h3>
          <p className="text-gray-300">
            Git permet de se déplacer dans l'historique d'un projet à l'aide de commandes comme <code className="text-blue-400">git checkout</code>, 
            <code className="text-blue-400">git reset</code>, et <code className="text-blue-400">git reflog</code>.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Naviguer avec git checkout</h4>
              <p className="text-sm text-gray-300 mb-2">
                Vous pouvez "voyager dans le temps" en consultant un commit spécifique.
              </p>
              <code className="text-xs bg-gray-900 text-green-400 p-2 block rounded">
                git checkout a1b2c3d
              </code>
              <p className="text-xs text-gray-400 mt-2">
                Attention: cela vous met en état "HEAD détaché".
              </p>
            </div>
            
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-2">Retrouver l'historique avec reflog</h4>
              <p className="text-sm text-gray-300 mb-2">
                <code className="text-purple-400">git reflog</code> conserve un historique de toutes les modifications de HEAD.
              </p>
              <code className="text-xs bg-gray-900 text-green-400 p-2 block rounded">
                git reflog<br/>
                git checkout HEAD@{"{3}"}
              </code>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TimelineNavigator;