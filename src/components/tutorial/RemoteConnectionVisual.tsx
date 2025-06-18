import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, HardDrive, Wifi, WifiOff, Link, Unlink, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface RemoteRepository {
  name: string;
  url: string;
  type: 'origin' | 'upstream' | 'fork';
  connected: boolean;
  lastSync: Date | null;
  status: 'synced' | 'ahead' | 'behind' | 'diverged' | 'unknown';
}

const RemoteConnectionVisual: React.FC = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [remotes, setRemotes] = useState<RemoteRepository[]>([
    {
      name: 'origin',
      url: 'https://github.com/user/mon-projet.git',
      type: 'origin',
      connected: true,
      lastSync: new Date('2024-01-17T14:30:00'),
      status: 'synced'
    },
    {
      name: 'upstream',
      url: 'https://github.com/original/mon-projet.git',
      type: 'upstream',
      connected: false,
      lastSync: null,
      status: 'unknown'
    }
  ]);

  const [connectionLogs, setConnectionLogs] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    timestamp: Date;
  }>>([
    {
      id: '1',
      message: 'Connexion établie avec origin',
      type: 'success',
      timestamp: new Date('2024-01-17T14:30:00')
    }
  ]);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
    addLog(
      !isConnected ? 'Connexion réseau rétablie' : 'Connexion réseau perdue',
      !isConnected ? 'success' : 'error'
    );
  };

  const connectRemote = (remoteName: string) => {
    setRemotes(prev => prev.map(remote => 
      remote.name === remoteName 
        ? { ...remote, connected: true, lastSync: new Date(), status: 'synced' }
        : remote
    ));
    addLog(`Connexion établie avec ${remoteName}`, 'success');
  };

  const disconnectRemote = (remoteName: string) => {
    setRemotes(prev => prev.map(remote => 
      remote.name === remoteName 
        ? { ...remote, connected: false, status: 'unknown' }
        : remote
    ));
    addLog(`Déconnexion de ${remoteName}`, 'info');
  };

  const addLog = (message: string, type: 'success' | 'error' | 'info') => {
    const newLog = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };
    setConnectionLogs(prev => [newLog, ...prev.slice(0, 9)]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'success';
      case 'ahead': return 'info';
      case 'behind': return 'warning';
      case 'diverged': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'synced': return 'Synchronisé';
      case 'ahead': return 'En avance';
      case 'behind': return 'En retard';
      case 'diverged': return 'Divergé';
      default: return 'Inconnu';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'origin': return 'text-blue-400';
      case 'upstream': return 'text-green-400';
      case 'fork': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const renderConnectionDiagram = () => (
    <div className="bg-gray-900/50 rounded-lg p-6">
      <svg width="100%" height="300" viewBox="0 0 600 300">
        {/* Dépôt local */}
        <g>
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            cx="100"
            cy="150"
            r="40"
            fill="#3b82f6"
            stroke="#1f2937"
            strokeWidth="3"
          />
          <foreignObject x="80" y="130" width="40" height="40">
            <HardDrive className="h-10 w-10 text-white" />
          </foreignObject>
          <text x="100" y="210" textAnchor="middle" className="fill-white text-sm font-medium">
            Dépôt Local
          </text>
        </g>

        {/* Connexions et dépôts distants */}
        {remotes.map((remote, index) => {
          const angle = (index * 60) - 30; // Répartir les remotes
          const x = 400 + Math.cos(angle * Math.PI / 180) * 80;
          const y = 150 + Math.sin(angle * Math.PI / 180) * 80;
          const connected = remote.connected && isConnected;

          return (
            <g key={remote.name}>
              {/* Ligne de connexion */}
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: connected ? 1 : 0,
                  opacity: connected ? 1 : 0.3
                }}
                transition={{ duration: 0.5 }}
                x1="140"
                y1="150"
                x2={x - 40}
                y2={y}
                stroke={connected ? '#10b981' : '#6b7280'}
                strokeWidth="3"
                strokeDasharray={connected ? "none" : "5,5"}
              />

              {/* Indicateur de connexion */}
              {connected && (
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <circle
                    cx={(140 + x - 40) / 2}
                    cy={(150 + y) / 2}
                    r="8"
                    fill="#10b981"
                  />
                  <foreignObject 
                    x={(140 + x - 40) / 2 - 6} 
                    y={(150 + y) / 2 - 6} 
                    width="12" 
                    height="12"
                  >
                    <Wifi className="h-3 w-3 text-white" />
                  </foreignObject>
                </motion.g>
              )}

              {/* Dépôt distant */}
              <motion.circle
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                cx={x}
                cy={y}
                r="35"
                fill={connected ? '#10b981' : '#6b7280'}
                stroke="#1f2937"
                strokeWidth="3"
              />
              <foreignObject x={x - 15} y={y - 15} width="30" height="30">
                <Cloud className="h-8 w-8 text-white" />
              </foreignObject>
              <text x={x} y={y + 55} textAnchor="middle" className="fill-white text-xs font-medium">
                {remote.name}
              </text>
              <text x={x} y={y + 70} textAnchor="middle" className="fill-gray-400 text-xs">
                ({remote.type})
              </text>
            </g>
          );
        })}

        {/* Indicateur de connexion réseau */}
        <g>
          <motion.circle
            animate={{ 
              fill: isConnected ? '#10b981' : '#ef4444',
              scale: isConnected ? 1 : 1.1
            }}
            cx="550"
            cy="50"
            r="20"
          />
          <foreignObject x="535" y="35" width="30" height="30">
            {isConnected ? (
              <Wifi className="h-8 w-8 text-white" />
            ) : (
              <WifiOff className="h-8 w-8 text-white" />
            )}
          </foreignObject>
          <text x="550" y="85" textAnchor="middle" className="fill-white text-xs">
            {isConnected ? 'En ligne' : 'Hors ligne'}
          </text>
        </g>
      </svg>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Visualisation des Connexions Distantes</h2>
        <p className="text-gray-300">Comprenez les connexions entre votre dépôt local et les dépôts distants</p>
      </motion.div>

      {/* Contrôles */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <Wifi className="h-5 w-5 text-green-400" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-400" />
              )}
              <span className={`font-medium ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
                {isConnected ? 'Connexion active' : 'Hors ligne'}
              </span>
            </div>
          </div>
          <Button onClick={toggleConnection} variant={isConnected ? 'secondary' : 'primary'}>
            {isConnected ? (
              <>
                <WifiOff className="h-4 w-4 mr-2" />
                Simuler Déconnexion
              </>
            ) : (
              <>
                <Wifi className="h-4 w-4 mr-2" />
                Reconnecter
              </>
            )}
          </Button>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Diagramme de connexion */}
        <div className="lg:col-span-2">
          <Card
            header={
              <h3 className="font-semibold text-white">Diagramme de Connexion</h3>
            }
          >
            {renderConnectionDiagram()}
          </Card>
        </div>

        {/* Panneau de contrôle */}
        <div className="space-y-4">
          {/* Liste des remotes */}
          <Card
            header={
              <h3 className="font-semibold text-white">Dépôts Distants</h3>
            }
          >
            <div className="space-y-3">
              {remotes.map((remote) => (
                <div
                  key={remote.name}
                  className="p-3 bg-gray-700/30 rounded-lg border border-gray-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getTypeColor(remote.type)}`}>
                        {remote.name}
                      </span>
                      <Badge variant={getStatusColor(remote.status)} size="sm">
                        {getStatusText(remote.status)}
                      </Badge>
                    </div>
                    {remote.connected && isConnected ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-2 font-mono">
                    {remote.url}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {remote.lastSync 
                        ? `Sync: ${remote.lastSync.toLocaleString()}`
                        : 'Jamais synchronisé'
                      }
                    </span>
                    <div className="flex space-x-1">
                      {remote.connected ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => disconnectRemote(remote.name)}
                        >
                          <Unlink className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => connectRemote(remote.name)}
                          disabled={!isConnected}
                        >
                          <Link className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Journal de connexion */}
          <Card
            header={
              <h3 className="font-semibold text-white">Journal</h3>
            }
          >
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <AnimatePresence>
                {connectionLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`text-xs p-2 rounded border-l-2 ${
                      log.type === 'success' ? 'border-green-500 bg-green-900/20' :
                      log.type === 'error' ? 'border-red-500 bg-red-900/20' :
                      'border-blue-500 bg-blue-900/20'
                    }`}
                  >
                    <div className={`${
                      log.type === 'success' ? 'text-green-300' :
                      log.type === 'error' ? 'text-red-300' :
                      'text-blue-300'
                    }`}>
                      {log.message}
                    </div>
                    <div className="text-gray-500">
                      {log.timestamp.toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>

      {/* Informations sur les types de remotes */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Types de Dépôts Distants</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <h4 className="font-medium text-blue-400 mb-2">Origin</h4>
            <p className="text-sm text-gray-300">
              Votre dépôt principal sur GitHub. C'est généralement là où vous poussez vos modifications.
            </p>
          </div>
          <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
            <h4 className="font-medium text-green-400 mb-2">Upstream</h4>
            <p className="text-sm text-gray-300">
              Le dépôt original d'un projet que vous avez forké. Utilisé pour récupérer les mises à jour.
            </p>
          </div>
          <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
            <h4 className="font-medium text-purple-400 mb-2">Fork</h4>
            <p className="text-sm text-gray-300">
              Votre copie personnelle d'un projet. Permet de contribuer sans affecter l'original.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RemoteConnectionVisual;