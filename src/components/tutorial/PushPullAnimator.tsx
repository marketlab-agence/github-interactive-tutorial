import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, HardDrive, Cloud, Play, Pause, RotateCcw, GitCommit } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Commit {
  id: string;
  message: string;
  author: string;
  hash: string;
}

interface Repository {
  name: string;
  commits: Commit[];
  type: 'local' | 'remote';
}

interface AnimationStep {
  type: 'push' | 'pull';
  description: string;
  commits: Commit[];
}

const PushPullAnimator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animatingCommits, setAnimatingCommits] = useState<Commit[]>([]);
  const [animationType, setAnimationType] = useState<'push' | 'pull' | null>(null);

  const [localRepo, setLocalRepo] = useState<Repository>({
    name: 'Local',
    type: 'local',
    commits: [
      { id: 'c1', message: 'Initial commit', author: 'Dev', hash: 'abc123' },
      { id: 'c2', message: 'Add feature A', author: 'Dev', hash: 'def456' },
      { id: 'c3', message: 'Fix bug in A', author: 'Dev', hash: 'ghi789' }
    ]
  });

  const [remoteRepo, setRemoteRepo] = useState<Repository>({
    name: 'Origin',
    type: 'remote',
    commits: [
      { id: 'c1', message: 'Initial commit', author: 'Dev', hash: 'abc123' }
    ]
  });

  const animationSteps: AnimationStep[] = [
    {
      type: 'push',
      description: 'Push des commits locaux vers le dépôt distant',
      commits: [
        { id: 'c2', message: 'Add feature A', author: 'Dev', hash: 'def456' },
        { id: 'c3', message: 'Fix bug in A', author: 'Dev', hash: 'ghi789' }
      ]
    },
    {
      type: 'pull',
      description: 'Pull des nouveaux commits depuis le dépôt distant',
      commits: [
        { id: 'c4', message: 'Team update', author: 'Team', hash: 'jkl012' },
        { id: 'c5', message: 'Add feature B', author: 'Team', hash: 'mno345' }
      ]
    }
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isPlaying && currentStep < animationSteps.length) {
      const step = animationSteps[currentStep];
      setAnimationType(step.type);
      setAnimatingCommits(step.commits);
      
      timeout = setTimeout(() => {
        if (step.type === 'push') {
          // Ajouter les commits au dépôt distant
          setRemoteRepo(prev => ({
            ...prev,
            commits: [...prev.commits, ...step.commits]
          }));
        } else {
          // Ajouter les commits au dépôt local et distant
          setLocalRepo(prev => ({
            ...prev,
            commits: [...prev.commits, ...step.commits]
          }));
          setRemoteRepo(prev => ({
            ...prev,
            commits: [...prev.commits, ...step.commits]
          }));
        }
        
        setAnimatingCommits([]);
        setAnimationType(null);
        setCurrentStep(prev => prev + 1);
      }, 2000);
    } else if (currentStep >= animationSteps.length) {
      setIsPlaying(false);
    }

    return () => clearTimeout(timeout);
  }, [isPlaying, currentStep]);

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setAnimatingCommits([]);
    setAnimationType(null);
    
    setLocalRepo({
      name: 'Local',
      type: 'local',
      commits: [
        { id: 'c1', message: 'Initial commit', author: 'Dev', hash: 'abc123' },
        { id: 'c2', message: 'Add feature A', author: 'Dev', hash: 'def456' },
        { id: 'c3', message: 'Fix bug in A', author: 'Dev', hash: 'ghi789' }
      ]
    });
    
    setRemoteRepo({
      name: 'Origin',
      type: 'remote',
      commits: [
        { id: 'c1', message: 'Initial commit', author: 'Dev', hash: 'abc123' }
      ]
    });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const renderRepository = (repo: Repository) => {
    const isLocal = repo.type === 'local';
    const Icon = isLocal ? HardDrive : Cloud;
    const color = isLocal ? 'blue' : 'green';
    
    return (
      <Card className={`bg-${color}-900/20 border-${color}-500/30`}>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Icon className={`h-6 w-6 text-${color}-400`} />
            <h3 className="font-semibold text-white">{repo.name}</h3>
            <span className="text-sm text-gray-400">({repo.commits.length} commits)</span>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <AnimatePresence>
              {repo.commits.map((commit, index) => (
                <motion.div
                  key={commit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded"
                >
                  <GitCommit className="h-4 w-4 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-blue-400">{commit.hash}</div>
                    <div className="text-sm text-white truncate">{commit.message}</div>
                    <div className="text-xs text-gray-400">{commit.author}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    );
  };

  const renderAnimatingCommits = () => {
    if (animatingCommits.length === 0 || !animationType) return null;

    const isPush = animationType === 'push';
    const startY = isPush ? 300 : 100;
    const endY = isPush ? 100 : 300;

    return (
      <div className="absolute inset-0 pointer-events-none">
        {animatingCommits.map((commit, index) => (
          <motion.div
            key={`animating-${commit.id}`}
            initial={{ 
              x: '50%',
              y: startY,
              scale: 0.8,
              opacity: 0
            }}
            animate={{ 
              x: '50%',
              y: endY,
              scale: 1,
              opacity: 1
            }}
            transition={{ 
              duration: 1.5,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
            className="absolute transform -translate-x-1/2 z-10"
          >
            <div className="bg-purple-600 text-white p-2 rounded-lg shadow-lg border border-purple-400">
              <div className="flex items-center space-x-2">
                <GitCommit className="h-4 w-4" />
                <div>
                  <div className="font-mono text-xs">{commit.hash}</div>
                  <div className="text-sm">{commit.message}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderArrow = () => {
    if (!animationType) return null;

    const isPush = animationType === 'push';
    const ArrowIcon = isPush ? ArrowUp : ArrowDown;
    const color = isPush ? 'text-blue-400' : 'text-green-400';

    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="flex flex-col items-center space-y-2"
      >
        <motion.div
          animate={{ 
            y: isPush ? [-10, 0, -10] : [10, 0, 10],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowIcon className={`h-8 w-8 ${color}`} />
        </motion.div>
        <span className={`text-sm font-medium ${color}`}>
          {isPush ? 'PUSH' : 'PULL'}
        </span>
      </motion.div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Animateur Push/Pull</h2>
        <p className="text-gray-300">Visualisez le transfert de commits entre dépôts local et distant</p>
      </motion.div>

      {/* Contrôles */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button onClick={togglePlay} variant={isPlaying ? 'secondary' : 'primary'}>
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Lecture'}
            </Button>
            <Button onClick={reset} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Recommencer
            </Button>
          </div>
          
          <div className="text-sm text-gray-400">
            Étape {currentStep + 1} sur {animationSteps.length + 1}
          </div>
        </div>
      </Card>

      {/* Animation principale */}
      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dépôt distant */}
          <div className="order-2 lg:order-1">
            {renderRepository(remoteRepo)}
          </div>

          {/* Dépôt local */}
          <div className="order-1 lg:order-2">
            {renderRepository(localRepo)}
          </div>
        </div>

        {/* Flèche centrale */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {renderArrow()}
          </AnimatePresence>
        </div>

        {/* Commits en mouvement */}
        {renderAnimatingCommits()}
      </div>

      {/* Description de l'étape actuelle */}
      <Card>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-white">
            {currentStep < animationSteps.length 
              ? animationSteps[currentStep].description
              : 'Animation terminée'
            }
          </h3>
          {currentStep < animationSteps.length && (
            <p className="text-gray-300">
              {animationSteps[currentStep].type === 'push' 
                ? 'Les commits locaux sont envoyés vers le dépôt distant'
                : 'Les nouveaux commits sont récupérés depuis le dépôt distant'
              }
            </p>
          )}
        </div>
      </Card>

      {/* Commandes Git */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Commandes Git Correspondantes</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <ArrowUp className="h-5 w-5 text-blue-400" />
              <h4 className="font-medium text-blue-400">Push</h4>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-900 rounded p-2">
                <code className="text-green-400 text-sm">git push origin main</code>
              </div>
              <p className="text-sm text-gray-300">
                Envoie vos commits locaux vers le dépôt distant
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <ArrowDown className="h-5 w-5 text-green-400" />
              <h4 className="font-medium text-green-400">Pull</h4>
            </div>
            <div className="space-y-2">
              <div className="bg-gray-900 rounded p-2">
                <code className="text-green-400 text-sm">git pull origin main</code>
              </div>
              <p className="text-sm text-gray-300">
                Récupère et fusionne les commits du dépôt distant
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PushPullAnimator;