import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  ArrowUp, 
  ArrowDown, 
  RefreshCw, 
  Wifi, 
  WifiOff,
  GitBranch,
  Clock
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface SyncStatus {
  status: 'synced' | 'ahead' | 'behind' | 'diverged' | 'offline' | 'syncing';
  localCommits: number;
  remoteCommits: number;
  lastSync: Date | null;
  conflicts: number;
}

interface BranchStatus {
  name: string;
  status: SyncStatus;
  isActive: boolean;
}

const SyncStatusIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [branches, setBranches] = useState<BranchStatus[]>([
    {
      name: 'main',
      isActive: true,
      status: {
        status: 'synced',
        localCommits: 0,
        remoteCommits: 0,
        lastSync: new Date('2024-01-17T14:30:00'),
        conflicts: 0
      }
    },
    {
      name: 'feature/auth',
      isActive: false,
      status: {
        status: 'ahead',
        localCommits: 3,
        remoteCommits: 0,
        lastSync: new Date('2024-01-16T10:15:00'),
        conflicts: 0
      }
    },
    {
      name: 'feature/ui',
      isActive: false,
      status: {
        status: 'behind',
        localCommits: 0,
        remoteCommits: 2,
        lastSync: new Date('2024-01-15T16:45:00'),
        conflicts: 0
      }
    },
    {
      name: 'hotfix/bug-123',
      isActive: false,
      status: {
        status: 'diverged',
        localCommits: 1,
        remoteCommits: 2,
        lastSync: new Date('2024-01-14T09:20:00'),
        conflicts: 3
      }
    }
  ]);

  const getStatusInfo = (status: SyncStatus['status']) => {
    switch (status) {
      case 'synced':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-900/20',
          borderColor: 'border-green-500/30',
          label: 'Synchronisé',
          description: 'Local et distant sont identiques'
        };
      case 'ahead':
        return {
          icon: ArrowUp,
          color: 'text-blue-400',
          bgColor: 'bg-blue-900/20',
          borderColor: 'border-blue-500/30',
          label: 'En avance',
          description: 'Commits locaux non poussés'
        };
      case 'behind':
        return {
          icon: ArrowDown,
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-900/20',
          borderColor: 'border-yellow-500/30',
          label: 'En retard',
          description: 'Commits distants non récupérés'
        };
      case 'diverged':
        return {
          icon: AlertTriangle,
          color: 'text-red-400',
          bgColor: 'bg-red-900/20',
          borderColor: 'border-red-500/30',
          label: 'Divergé',
          description: 'Commits différents des deux côtés'
        };
      case 'syncing':
        return {
          icon: RefreshCw,
          color: 'text-purple-400',
          bgColor: 'bg-purple-900/20',
          borderColor: 'border-purple-500/30',
          label: 'Synchronisation...',
          description: 'Synchronisation en cours'
        };
      case 'offline':
        return {
          icon: WifiOff,
          color: 'text-gray-400',
          bgColor: 'bg-gray-900/20',
          borderColor: 'border-gray-500/30',
          label: 'Hors ligne',
          description: 'Impossible de vérifier le statut'
        };
    }
  };

  const simulateStatusChange = (branchName: string, newStatus: SyncStatus['status']) => {
    setBranches(prev => prev.map(branch => {
      if (branch.name === branchName) {
        let newBranchStatus = { ...branch.status, status: newStatus };
        
        switch (newStatus) {
          case 'ahead':
            newBranchStatus.localCommits = Math.floor(Math.random() * 5) + 1;
            newBranchStatus.remoteCommits = 0;
            break;
          case 'behind':
            newBranchStatus.localCommits = 0;
            newBranchStatus.remoteCommits = Math.floor(Math.random() * 3) + 1;
            break;
          case 'diverged':
            newBranchStatus.localCommits = Math.floor(Math.random() * 3) + 1;
            newBranchStatus.remoteCommits = Math.floor(Math.random() * 3) + 1;
            newBranchStatus.conflicts = Math.floor(Math.random() * 5) + 1;
            break;
          case 'synced':
            newBranchStatus.localCommits = 0;
            newBranchStatus.remoteCommits = 0;
            newBranchStatus.conflicts = 0;
            newBranchStatus.lastSync = new Date();
            break;
        }
        
        return { ...branch, status: newBranchStatus };
      }
      return branch;
    }));
  };

  const syncBranch = async (branchName: string) => {
    setIsSyncing(true);
    
    // Mettre le statut en "syncing"
    setBranches(prev => prev.map(branch => 
      branch.name === branchName 
        ? { ...branch, status: { ...branch.status, status: 'syncing' } }
        : branch
    ));

    // Simuler la synchronisation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mettre à jour vers "synced"
    setBranches(prev => prev.map(branch => 
      branch.name === branchName 
        ? { 
            ...branch, 
            status: { 
              ...branch.status, 
              status: 'synced',
              localCommits: 0,
              remoteCommits: 0,
              conflicts: 0,
              lastSync: new Date()
            }
          }
        : branch
    ));
    
    setIsSyncing(false);
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      // Remettre en ligne - restaurer les statuts
      setBranches(prev => prev.map(branch => ({
        ...branch,
        status: { ...branch.status, status: branch.status.status === 'offline' ? 'synced' : branch.status.status }
      })));
    } else {
      // Mettre hors ligne
      setBranches(prev => prev.map(branch => ({
        ...branch,
        status: { ...branch.status, status: 'offline' }
      })));
    }
  };

  const getOverallStatus = () => {
    if (!isOnline) return 'offline';
    if (isSyncing) return 'syncing';
    
    const hasConflicts = branches.some(b => b.status.conflicts > 0);
    const hasAhead = branches.some(b => b.status.localCommits > 0);
    const hasBehind = branches.some(b => b.status.remoteCommits > 0);
    
    if (hasConflicts) return 'diverged';
    if (hasAhead && hasBehind) return 'diverged';
    if (hasAhead) return 'ahead';
    if (hasBehind) return 'behind';
    return 'synced';
  };

  const overallStatusInfo = getStatusInfo(getOverallStatus());

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Indicateur de Statut de Synchronisation</h2>
        <p className="text-gray-300">Surveillez l'état de synchronisation de vos branches</p>
      </motion.div>

      {/* Statut global */}
      <Card className={`${overallStatusInfo.bgColor} ${overallStatusInfo.borderColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ 
                rotate: overallStatusInfo.icon === RefreshCw ? 360 : 0,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: overallStatusInfo.icon === RefreshCw ? Infinity : 0 },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <overallStatusInfo.icon className={`h-8 w-8 ${overallStatusInfo.color}`} />
            </motion.div>
            <div>
              <h3 className={`text-xl font-semibold ${overallStatusInfo.color}`}>
                {overallStatusInfo.label}
              </h3>
              <p className="text-gray-300">{overallStatusInfo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Wifi className="h-5 w-5 text-green-400" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-400" />
              )}
              <span className={`text-sm ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                {isOnline ? 'En ligne' : 'Hors ligne'}
              </span>
            </div>
            <Button onClick={toggleOnlineStatus} size="sm" variant="outline">
              {isOnline ? 'Simuler Déconnexion' : 'Reconnecter'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Liste des branches */}
      <div className="grid md:grid-cols-2 gap-4">
        {branches.map((branch) => {
          const statusInfo = getStatusInfo(branch.status.status);
          
          return (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border ${statusInfo.bgColor} ${statusInfo.borderColor}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <GitBranch className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-white">{branch.name}</span>
                  {branch.isActive && (
                    <Badge variant="info" size="sm">Actuelle</Badge>
                  )}
                </div>
                <motion.div
                  animate={{ 
                    rotate: statusInfo.icon === RefreshCw ? 360 : 0
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: statusInfo.icon === RefreshCw ? Infinity : 0 
                  }}
                >
                  <statusInfo.icon className={`h-5 w-5 ${statusInfo.color}`} />
                </motion.div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Statut:</span>
                  <span className={statusInfo.color}>{statusInfo.label}</span>
                </div>

                {branch.status.localCommits > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Commits locaux:</span>
                    <span className="text-blue-400">+{branch.status.localCommits}</span>
                  </div>
                )}

                {branch.status.remoteCommits > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Commits distants:</span>
                    <span className="text-yellow-400">+{branch.status.remoteCommits}</span>
                  </div>
                )}

                {branch.status.conflicts > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Conflits:</span>
                    <span className="text-red-400">{branch.status.conflicts}</span>
                  </div>
                )}

                {branch.status.lastSync && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Dernière sync:</span>
                    <span className="text-gray-300 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {branch.status.lastSync.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex space-x-2">
                {branch.status.status !== 'synced' && branch.status.status !== 'offline' && branch.status.status !== 'syncing' && (
                  <Button
                    size="sm"
                    onClick={() => syncBranch(branch.name)}
                    disabled={!isOnline || isSyncing}
                    className="flex-1"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Synchroniser
                  </Button>
                )}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const statuses: SyncStatus['status'][] = ['ahead', 'behind', 'diverged', 'synced'];
                    const currentIndex = statuses.indexOf(branch.status.status);
                    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                    simulateStatusChange(branch.name, nextStatus);
                  }}
                  disabled={!isOnline}
                >
                  Simuler
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Légende */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Légende des Statuts</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(['synced', 'ahead', 'behind', 'diverged', 'syncing', 'offline'] as const).map((status) => {
            const info = getStatusInfo(status);
            return (
              <div key={status} className="flex items-center space-x-3">
                <info.icon className={`h-5 w-5 ${info.color}`} />
                <div>
                  <div className={`font-medium ${info.color}`}>{info.label}</div>
                  <div className="text-xs text-gray-400">{info.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default SyncStatusIndicator;