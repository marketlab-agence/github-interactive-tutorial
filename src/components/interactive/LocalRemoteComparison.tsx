import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, HardDrive, ArrowUp, ArrowDown, Wifi, WifiOff, ArrowUpDown } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface Repository {
  type: 'local' | 'remote';
  branches: {
    name: string;
    commits: number;
    lastUpdated: string;
    status: 'ahead' | 'behind' | 'synced' | 'diverged';
  }[];
}

const LocalRemoteComparison: React.FC = () => {
  const [localRepo, setLocalRepo] = useState<Repository>({
    type: 'local',
    branches: [
      { name: 'main', commits: 5, lastUpdated: '2 heures', status: 'behind' },
      { name: 'feature/login', commits: 3, lastUpdated: '1 jour', status: 'ahead' },
      { name: 'bugfix/header', commits: 2, lastUpdated: '3 jours', status: 'synced' }
    ]
  });

  const [remoteRepo, setRemoteRepo] = useState<Repository>({
    type: 'remote',
    branches: [
      { name: 'main', commits: 8, lastUpdated: '1 heure', status: 'ahead' },
      { name: 'feature/login', commits: 1, lastUpdated: '3 jours', status: 'behind' },
      { name: 'bugfix/header', commits: 2, lastUpdated: '3 jours', status: 'synced' }
    ]
  });

  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeBranch, setActiveBranch] = useState('main');

  const syncBranches = async () => {
    if (!isOnline) return;

    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate sync for the active branch
    setLocalRepo(prev => ({
      ...prev,
      branches: prev.branches.map(branch =>
        branch.name === activeBranch
          ? { ...branch, status: 'synced', commits: remoteRepo.branches.find(b => b.name === activeBranch)?.commits || branch.commits }
          : branch
      )
    }));

    setRemoteRepo(prev => ({
      ...prev,
      branches: prev.branches.map(branch =>
        branch.name === activeBranch
          ? { ...branch, status: 'synced', commits: localRepo.branches.find(b => b.name === activeBranch)?.commits || branch.commits }
          : branch
      )
    }));

    setIsSyncing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'bg-green-900/20 border-green-500/30 text-green-400';
      case 'behind': return 'bg-yellow-900/20 border-yellow-500/30 text-yellow-400';
      case 'synced': return 'bg-blue-900/20 border-blue-500/30 text-blue-400';
      case 'diverged': return 'bg-red-900/20 border-red-500/30 text-red-400';
      default: return 'bg-gray-900/20 border-gray-600 text-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ahead': return 'En avance';
      case 'behind': return 'En retard';
      case 'synced': return 'Synchronisé';
      case 'diverged': return 'Divergé';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Comparaison Local vs Distant</h2>
        <p className="text-gray-300">Visualisez et comprenez la relation entre vos dépôts local et distant</p>
      </motion.div>

      {/* Connection Status */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isOnline ? (
              <div className="flex items-center space-x-2 text-green-400">
                <Wifi className="h-5 w-5" />
                <span>Connecté au dépôt distant</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-red-400">
                <WifiOff className="h-5 w-5" />
                <span>Déconnecté</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="secondary" 
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? <WifiOff className="h-4 w-4 mr-2" /> : <Wifi className="h-4 w-4 mr-2" />}
              {isOnline ? 'Déconnecter' : 'Connecter'}
            </Button>
            <Button 
              onClick={syncBranches}
              disabled={!isOnline || isSyncing}
              loading={isSyncing}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Synchroniser
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Local Repository */}
        <Card
          header={
            <div className="flex items-center space-x-2">
              <HardDrive className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">Dépôt Local</h3>
            </div>
          }
        >
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-300">Branches</h4>
            {localRepo.branches.map((branch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg transition-colors cursor-pointer ${
                  activeBranch === branch.name
                    ? 'bg-blue-900/20 border border-blue-500/30'
                    : 'bg-gray-700/30 hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveBranch(branch.name)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{branch.name}</span>
                  <Badge variant={
                    branch.status === 'ahead' ? 'success' :
                    branch.status === 'behind' ? 'warning' :
                    branch.status === 'synced' ? 'info' : 'error'
                  }>
                    {getStatusText(branch.status)}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{branch.commits} commits</span>
                  <span>Mis à jour il y a {branch.lastUpdated}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Sync Visualization */}
        <Card
          header={
            <h3 className="font-semibold text-white">Synchronisation</h3>
          }
        >
          {activeBranch && (
            <div className="space-y-4 h-full flex flex-col items-center justify-center py-6">
              <div className="text-center">
                <h4 className="font-medium text-white mb-2">Branche: {activeBranch}</h4>
                <div className={`inline-block px-3 py-1 rounded-full ${
                  getStatusColor(localRepo.branches.find(b => b.name === activeBranch)?.status || 'synced')
                }`}>
                  {getStatusText(localRepo.branches.find(b => b.name === activeBranch)?.status || 'synced')}
                </div>
              </div>

              <div className="flex flex-col items-center space-y-3 w-full">
                {(() => {
                  const localBranch = localRepo.branches.find(b => b.name === activeBranch);
                  const remoteBranch = remoteRepo.branches.find(b => b.name === activeBranch);
                  
                  if (!localBranch || !remoteBranch) return null;
                  
                  switch (localBranch.status) {
                    case 'ahead':
                      return (
                        <>
                          <div className="flex items-center space-x-2 text-green-400">
                            <ArrowUp className="h-5 w-5" />
                            <span>{localBranch.commits - remoteBranch.commits} commits à pousser</span>
                          </div>
                          <Button 
                            size="sm" 
                            disabled={!isOnline || isSyncing}
                          >
                            <ArrowUp className="h-4 w-4 mr-2" />
                            Pousser vers distant
                          </Button>
                        </>
                      );
                    case 'behind':
                      return (
                        <>
                          <div className="flex items-center space-x-2 text-yellow-400">
                            <ArrowDown className="h-5 w-5" />
                            <span>{remoteBranch.commits - localBranch.commits} commits à tirer</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="secondary"
                            disabled={!isOnline || isSyncing}
                          >
                            <ArrowDown className="h-4 w-4 mr-2" />
                            Tirer du distant
                          </Button>
                        </>
                      );
                    case 'synced':
                      return (
                        <div className="flex items-center space-x-2 text-blue-400">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <ArrowUpDown className="h-5 w-5" />
                          </motion.div>
                          <span>Branches synchronisées</span>
                        </div>
                      );
                    case 'diverged':
                      return (
                        <>
                          <div className="flex items-center space-x-2 text-red-400">
                            <AlertTriangle className="h-5 w-5" />
                            <span>Branches divergées</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="warning"
                            disabled={!isOnline || isSyncing}
                          >
                            Résoudre les divergences
                          </Button>
                        </>
                      );
                    default:
                      return null;
                  }
                })()}
              </div>
            </div>
          )}
        </Card>

        {/* Remote Repository */}
        <Card
          header={
            <div className="flex items-center space-x-2">
              <Cloud className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-white">Dépôt Distant</h3>
            </div>
          }
        >
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-300">Branches</h4>
            {remoteRepo.branches.map((branch, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg ${
                  activeBranch === branch.name
                    ? 'bg-green-900/20 border border-green-500/30'
                    : 'bg-gray-700/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-white">{branch.name}</span>
                  <Badge variant={
                    branch.status === 'ahead' ? 'success' :
                    branch.status === 'behind' ? 'warning' :
                    branch.status === 'synced' ? 'info' : 'error'
                  }>
                    {getStatusText(branch.status)}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>{branch.commits} commits</span>
                  <span>Mis à jour il y a {branch.lastUpdated}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Commands Reference */}
      <Card
        header={
          <h3 className="font-semibold text-white">Commandes Git pour la Synchronisation</h3>
        }
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="font-medium text-blue-400 mb-2">git clone</h4>
            <p className="text-sm text-gray-300">Crée une copie locale d'un dépôt distant.</p>
            <div className="bg-gray-800 mt-2 p-2 rounded text-xs font-mono text-green-400">
              $ git clone https://github.com/user/repo.git
            </div>
          </div>
          
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="font-medium text-green-400 mb-2">git push</h4>
            <p className="text-sm text-gray-300">Envoie les commits locaux vers le dépôt distant.</p>
            <div className="bg-gray-800 mt-2 p-2 rounded text-xs font-mono text-green-400">
              $ git push origin main
            </div>
          </div>
          
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-400 mb-2">git pull</h4>
            <p className="text-sm text-gray-300">Récupère et intègre les changements distants.</p>
            <div className="bg-gray-800 mt-2 p-2 rounded text-xs font-mono text-green-400">
              $ git pull origin main
            </div>
          </div>
          
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="font-medium text-purple-400 mb-2">git fetch</h4>
            <p className="text-sm text-gray-300">Récupère les changements sans les fusionner.</p>
            <div className="bg-gray-800 mt-2 p-2 rounded text-xs font-mono text-green-400">
              $ git fetch origin
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Helper component for the AlertTriangle icon
const AlertTriangle: React.FC<{ className?: string }> = (props) => (
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
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export default LocalRemoteComparison;