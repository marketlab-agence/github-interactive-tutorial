import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Cloud, HardDrive, ArrowUpDown, FolderSync as Sync } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

interface Repository {
  name: string;
  type: 'local' | 'remote';
  branches: Array<{
    name: string;
    commits: number;
    lastUpdate: string;
    status: 'ahead' | 'behind' | 'synced' | 'diverged';
  }>;
  totalCommits: number;
  lastSync: string;
}

const RepoComparison: React.FC = () => {
  const [localRepo] = useState<Repository>({
    name: 'mon-projet',
    type: 'local',
    branches: [
      { name: 'main', commits: 15, lastUpdate: '2024-01-17', status: 'ahead' },
      { name: 'feature/auth', commits: 8, lastUpdate: '2024-01-16', status: 'synced' },
      { name: 'bugfix/login', commits: 3, lastUpdate: '2024-01-15', status: 'behind' }
    ],
    totalCommits: 26,
    lastSync: '2024-01-16 14:30'
  });

  const [remoteRepo] = useState<Repository>({
    name: 'origin/mon-projet',
    type: 'remote',
    branches: [
      { name: 'main', commits: 12, lastUpdate: '2024-01-16', status: 'behind' },
      { name: 'feature/auth', commits: 8, lastUpdate: '2024-01-16', status: 'synced' },
      { name: 'bugfix/login', commits: 5, lastUpdate: '2024-01-17', status: 'ahead' }
    ],
    totalCommits: 25,
    lastSync: '2024-01-16 14:30'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ahead': return 'success';
      case 'behind': return 'warning';
      case 'synced': return 'info';
      case 'diverged': return 'error';
      default: return 'default';
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

  const renderRepository = (repo: Repository) => (
    <Card
      header={
        <div className="flex items-center space-x-3">
          {repo.type === 'local' ? (
            <HardDrive className="h-5 w-5 text-blue-400" />
          ) : (
            <Cloud className="h-5 w-5 text-green-400" />
          )}
          <h3 className="font-semibold text-white">{repo.name}</h3>
          <Badge variant={repo.type === 'local' ? 'info' : 'success'}>
            {repo.type === 'local' ? 'Local' : 'Distant'}
          </Badge>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Repository Stats */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-gray-700/30 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{repo.totalCommits}</div>
            <div className="text-sm text-gray-400">Total commits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{repo.branches.length}</div>
            <div className="text-sm text-gray-400">Branches</div>
          </div>
        </div>

        {/* Branches */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-300">Branches</h4>
          {repo.branches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-700/20 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <GitBranch className="h-4 w-4 text-gray-400" />
                <span className="font-mono text-white text-sm">{branch.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">{branch.commits} commits</span>
                <Badge variant={getStatusColor(branch.status)} size="sm">
                  {getStatusText(branch.status)}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Last Sync */}
        <div className="text-xs text-gray-400 text-center">
          Dernière sync: {repo.lastSync}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Comparaison Dépôts</h2>
        <p className="text-gray-300">Comparez votre dépôt local avec le dépôt distant</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Local Repository */}
        <div>
          {renderRepository(localRepo)}
        </div>

        {/* Sync Actions */}
        <div className="flex flex-col justify-center space-y-4">
          <Card>
            <div className="text-center space-y-4">
              <ArrowUpDown className="h-12 w-12 text-purple-400 mx-auto" />
              <h3 className="text-lg font-semibold text-white">Actions de Synchronisation</h3>
              
              <div className="space-y-3">
                <Button className="w-full">
                  <Cloud className="h-4 w-4 mr-2" />
                  Push vers distant
                </Button>
                <Button variant="secondary" className="w-full">
                  <HardDrive className="h-4 w-4 mr-2" />
                  Pull depuis distant
                </Button>
                <Button variant="outline" className="w-full">
                  <Sync className="h-4 w-4 mr-2" />
                  Fetch updates
                </Button>
              </div>

              <div className="text-xs text-gray-400 mt-4">
                Synchronisez vos changements pour maintenir la cohérence
              </div>
            </div>
          </Card>
        </div>

        {/* Remote Repository */}
        <div>
          {renderRepository(remoteRepo)}
        </div>
      </div>

      {/* Sync Status Summary */}
      <Card>
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-white">État de Synchronisation</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">1</div>
              <div className="text-sm text-green-300">Branches synchronisées</div>
            </div>
            <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">1</div>
              <div className="text-sm text-yellow-300">Branches en retard</div>
            </div>
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">1</div>
              <div className="text-sm text-blue-300">Branches en avance</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RepoComparison;