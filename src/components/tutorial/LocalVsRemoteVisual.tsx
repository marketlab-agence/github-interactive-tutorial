import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HardDrive, Cloud, ArrowUpDown, Wifi, WifiOff, FolderSync as Sync } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Repository {
  type: 'local' | 'remote';
  files: string[];
  commits: Array<{
    id: string;
    message: string;
    timestamp: Date;
  }>;
  branches: string[];
  currentBranch: string;
}

interface LocalVsRemoteVisualProps {
  onComplete?: () => void;
}

const LocalVsRemoteVisual: React.FC<LocalVsRemoteVisualProps> = ({ onComplete }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'ahead' | 'behind' | 'diverged'>('synced');
  const [animatingSync, setAnimatingSync] = useState(false);

  const [localRepo, setLocalRepo] = useState<Repository>({
    type: 'local',
    files: ['README.md', 'src/app.js', 'package.json'],
    commits: [
      { id: 'abc123', message: 'Initial commit', timestamp: new Date('2024-01-15T10:00:00') },
      { id: 'def456', message: 'Add main functionality', timestamp: new Date('2024-01-16T14:30:00') },
      { id: 'ghi789', message: 'Fix bug in login', timestamp: new Date('2024-01-17T09:15:00') }
    ],
    branches: ['main', 'feature/auth'],
    currentBranch: 'main'
  });

  const [remoteRepo, setRemoteRepo] = useState<Repository>({
    type: 'remote',
    files: ['README.md', 'src/app.js', 'package.json'],
    commits: [
      { id: 'abc123', message: 'Initial commit', timestamp: new Date('2024-01-15T10:00:00') },
      { id: 'def456', message: 'Add main functionality', timestamp: new Date('2024-01-16T14:30:00') }
    ],
    branches: ['main'],
    currentBranch: 'main'
  });

  const simulateLocalChange = () => {
    const newCommit = {
      id: 'jkl012',
      message: 'Add new feature locally',
      timestamp: new Date()
    };
    
    setLocalRepo(prev => ({
      ...prev,
      commits: [...prev.commits, newCommit]
    }));
    setSyncStatus('ahead');
  };

  const simulateRemoteChange = () => {
    const newCommit = {
      id: 'mno345',
      message: 'Update from remote team',
      timestamp: new Date()
    };
    
    setRemoteRepo(prev => ({
      ...prev,
      commits: [...prev.commits, newCommit]
    }));
    setSyncStatus('behind');
  };

  const simulateSync = async () => {
    setAnimatingSync(true);
    
    // Simuler le processus de synchronisation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Synchroniser les dépôts
    const allCommits = [...localRepo.commits, ...remoteRepo.commits]
      .filter((commit, index, self) => 
        index === self.findIndex(c => c.id === commit.id)
      )
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    setLocalRepo(prev => ({ ...prev, commits: allCommits }));
    setRemoteRepo(prev => ({ ...prev, commits: allCommits }));
    setSyncStatus('synced');
    setAnimatingSync(false);
  };

  const renderRepository = (repo: Repository) => {
    const isLocal = repo.type === 'local';
    const icon = isLocal ? HardDrive : Cloud;
    const color = isLocal ? 'blue' : 'green';
    const title = isLocal ? 'Dépôt Local' : 'Dépôt Distant (GitHub)';
    
    return (
      <Card className={`bg-${color}-900/20 border-${color}-500/30`}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {React.createElement(icon, { className: `h-6 w-6 text-${color}-400` })}
              <h3 className="font-semibold text-white">{title}</h3>
            </div>
            {!isLocal && (
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <Wifi className="h-4 w-4 text-green-400" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-400" />
                )}
                <span className={`text-xs ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                  {isConnected ? 'Connecté' : 'Hors ligne'}
                </span>
              </div>
            )}
          </div>

          {/* Files */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Fichiers</h4>
            <div className="space-y-1">
              {repo.files.map((file, index) => (
                <div key={index} className="text-sm text-gray-400 font-mono">
                  {file}
                </div>
              ))}
            </div>
          </div>

          {/* Commits */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">
              Commits ({repo.commits.length})
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {repo.commits.slice(-3).reverse().map((commit, index) => (
                <motion.div
                  key={commit.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-xs bg-gray-700/30 p-2 rounded"
                >
                  <div className="font-mono text-blue-400">{commit.id}</div>
                  <div className="text-gray-300">{commit.message}</div>
                  <div className="text-gray-500">{commit.timestamp.toLocaleDateString()}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Branches */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Branches</h4>
            <div className="flex flex-wrap gap-1">
              {repo.branches.map((branch, index) => (
                <span
                  key={index}
                  className={`text-xs px-2 py-1 rounded ${
                    branch === repo.currentBranch
                      ? `bg-${color}-600 text-white`
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {branch}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const getSyncStatusInfo = () => {
    switch (syncStatus) {
      case 'synced':
        return {
          color: 'green',
          message: 'Synchronisé',
          description: 'Local et distant sont identiques'
        };
      case 'ahead':
        return {
          color: 'blue',
          message: 'En avance',
          description: 'Le dépôt local a des commits non poussés'
        };
      case 'behind':
        return {
          color: 'yellow',
          message: 'En retard',
          description: 'Le dépôt distant a des commits non récupérés'
        };
      case 'diverged':
        return {
          color: 'red',
          message: 'Divergé',
          description: 'Les deux dépôts ont des commits différents'
        };
    }
  };

  const statusInfo = getSyncStatusInfo();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Local vs Distant</h2>
        <p className="text-gray-300">Comprenez la relation entre vos dépôts local et distant</p>
      </motion.div>

      {/* Status Bar */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sync className={`h-6 w-6 text-${statusInfo.color}-400 ${animatingSync ? 'animate-spin' : ''}`} />
            <div>
              <h3 className={`font-semibold text-${statusInfo.color}-400`}>{statusInfo.message}</h3>
              <p className="text-sm text-gray-400">{statusInfo.description}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsConnected(!isConnected)}
            >
              {isConnected ? <WifiOff className="h-4 w-4 mr-2" /> : <Wifi className="h-4 w-4 mr-2" />}
              {isConnected ? 'Déconnecter' : 'Connecter'}
            </Button>
            <Button
              size="sm"
              onClick={simulateSync}
              disabled={!isConnected || animatingSync || syncStatus === 'synced'}
            >
              <Sync className={`h-4 w-4 mr-2 ${animatingSync ? 'animate-spin' : ''}`} />
              Synchroniser
            </Button>
          </div>
        </div>
      </Card>

      {/* Repositories Comparison */}
      <div className="grid lg:grid-cols-2 gap-6">
        {renderRepository(localRepo)}
        
        {/* Sync Arrow */}
        <div className="lg:hidden flex justify-center">
          <motion.div
            animate={{ 
              scale: animatingSync ? [1, 1.2, 1] : 1,
              rotate: animatingSync ? 360 : 0
            }}
            transition={{ duration: animatingSync ? 1 : 0, repeat: animatingSync ? Infinity : 0 }}
          >
            <ArrowUpDown className="h-8 w-8 text-gray-400" />
          </motion.div>
        </div>
        
        {renderRepository(remoteRepo)}
      </div>

      {/* Sync Arrow for Desktop */}
      <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ 
            scale: animatingSync ? [1, 1.2, 1] : 1,
            rotate: animatingSync ? 360 : 0
          }}
          transition={{ duration: animatingSync ? 1 : 0, repeat: animatingSync ? Infinity : 0 }}
          className="bg-gray-800 rounded-full p-3 border border-gray-600"
        >
          <ArrowUpDown className="h-6 w-6 text-gray-400" />
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="text-center space-y-3">
            <h4 className="font-medium text-white">Simuler Changement Local</h4>
            <p className="text-sm text-gray-400">Ajouter un commit au dépôt local</p>
            <Button onClick={simulateLocalChange} className="w-full">
              Commit Local
            </Button>
          </div>
        </Card>
        
        <Card>
          <div className="text-center space-y-3">
            <h4 className="font-medium text-white">Simuler Changement Distant</h4>
            <p className="text-sm text-gray-400">Ajouter un commit au dépôt distant</p>
            <Button onClick={simulateRemoteChange} className="w-full" disabled={!isConnected}>
              Commit Distant
            </Button>
          </div>
        </Card>
      </div>

      {/* Key Concepts */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Concepts Clés</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-400 mb-2">Dépôt Local</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Stocké sur votre ordinateur</li>
              <li>• Fonctionne hors ligne</li>
              <li>• Opérations rapides</li>
              <li>• Votre espace de travail personnel</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-400 mb-2">Dépôt Distant</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Hébergé sur GitHub/GitLab</li>
              <li>• Accessible par l'équipe</li>
              <li>• Sauvegarde centralisée</li>
              <li>• Point de collaboration</li>
            </ul>
          </div>
        </div>
      </Card>
      
      {/* Completion section */}
      <Card>
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-white">Exercice</h3>
          <p className="text-gray-300">
            Essayez de simuler différentes situations de synchronisation en utilisant les boutons ci-dessus.
            Une fois que vous avez bien compris la relation entre dépôts locaux et distants, continuez le tutoriel.
          </p>
          <Button onClick={onComplete} size="lg">
            J'ai compris les différences
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LocalVsRemoteVisual;