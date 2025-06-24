import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  GitCommit, 
  GitBranch, 
  GitMerge, 
  Clock,
  ArrowRight,
  AlertTriangle,
  Search
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import CodeBlock from '../ui/CodeBlock';
import Alert from '../ui/Alert';

interface ReflogEntry {
  id: string;
  hash: string;
  headPosition: string;
  action: string;
  message: string;
  timestamp: string;
  type: 'checkout' | 'commit' | 'merge' | 'reset' | 'rebase' | 'other';
  recoverable: boolean;
}

const ReflogExplorer: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);

  const reflogEntries: ReflogEntry[] = [
    {
      id: '1',
      hash: 'abc1234',
      headPosition: 'HEAD@{0}',
      action: 'reset: moving to HEAD~1',
      message: 'Annulation du dernier commit',
      timestamp: '5 minutes ago',
      type: 'reset',
      recoverable: true
    },
    {
      id: '2',
      hash: 'def5678',
      headPosition: 'HEAD@{1}',
      action: 'commit: Add new features',
      message: 'Ajout de nouvelles fonctionnalités',
      timestamp: '10 minutes ago',
      type: 'commit',
      recoverable: true
    },
    {
      id: '3',
      hash: 'ghi9012',
      headPosition: 'HEAD@{2}',
      action: 'checkout: moving from main to feature/login',
      message: 'Changement de branche vers feature/login',
      timestamp: '30 minutes ago',
      type: 'checkout',
      recoverable: true
    },
    {
      id: '4',
      hash: 'jkl3456',
      headPosition: 'HEAD@{3}',
      action: 'commit: Fix navigation bugs',
      message: 'Correction des bugs de navigation',
      timestamp: '1 hour ago',
      type: 'commit',
      recoverable: true
    },
    {
      id: '5',
      hash: 'mno7890',
      headPosition: 'HEAD@{4}',
      action: 'merge: feature/auth',
      message: 'Fusion de la branche feature/auth',
      timestamp: '2 hours ago',
      type: 'merge',
      recoverable: true
    },
    {
      id: '6',
      hash: 'pqr1234',
      headPosition: 'HEAD@{5}',
      action: 'rebase: onto feature/base',
      message: 'Rebase sur la branche feature/base',
      timestamp: '3 hours ago',
      type: 'rebase',
      recoverable: false
    },
    {
      id: '7',
      hash: 'stu5678',
      headPosition: 'HEAD@{6}',
      action: 'commit: Initial commit',
      message: 'Commit initial',
      timestamp: '4 hours ago',
      type: 'commit',
      recoverable: false
    }
  ];

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'commit': return GitCommit;
      case 'checkout': return GitBranch;
      case 'merge': return GitMerge;
      case 'reset': return RotateCcw;
      case 'rebase': return RotateCcw;
      default: return GitCommit;
    }
  };

  const getEntryColor = (type: string) => {
    switch (type) {
      case 'commit': return 'text-blue-400';
      case 'checkout': return 'text-green-400';
      case 'merge': return 'text-purple-400';
      case 'reset': return 'text-yellow-400';
      case 'rebase': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getEntryBg = (type: string) => {
    switch (type) {
      case 'commit': return 'bg-blue-900/20 border-blue-500/30';
      case 'checkout': return 'bg-green-900/20 border-green-500/30';
      case 'merge': return 'bg-purple-900/20 border-purple-500/30';
      case 'reset': return 'bg-yellow-900/20 border-yellow-500/30';
      case 'rebase': return 'bg-orange-900/20 border-orange-500/30';
      default: return 'bg-gray-800/50 border-gray-600';
    }
  };

  const filteredEntries = reflogEntries.filter(entry => 
    entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.headPosition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedEntryData = reflogEntries.find(entry => entry.id === selectedEntry);

  const getRecoveryCommand = (entry: ReflogEntry): string => {
    const recoveryCommands = {
      'commit': `# Pour récupérer le commit\ngit checkout ${entry.hash}\n\n# Pour créer une nouvelle branche à partir de ce commit\ngit checkout -b recovery-branch ${entry.hash}`,
      'reset': `# Pour annuler un reset --hard\ngit reset --hard ${entry.headPosition}`,
      'checkout': `# Pour revenir à ce point\ngit checkout ${entry.hash}`,
      'merge': `# Pour récupérer l'état avant la fusion\ngit checkout ${entry.hash}`,
      'rebase': `# Pour récupérer l'état avant le rebase\ngit checkout ${entry.hash}\n\n# Attention: les commits rebasés peuvent avoir des nouveaux hashes`
    };
    
    return recoveryCommands[entry.type as keyof typeof recoveryCommands] || 
      `# Commande générique de récupération\ngit checkout ${entry.hash}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Explorateur de Reflog</h2>
        <p className="text-gray-300">Découvrez comment récupérer des actions perdues avec git reflog</p>
      </motion.div>

      <Alert type="info" title="Qu'est-ce que le Reflog ?">
        <p className="text-sm">
          Le <strong>reflog</strong> est un mécanisme de Git qui enregistre toutes les modifications de l'état de HEAD.
          Il agit comme un journal d'activité et vous permet de retrouver des commits "perdus" après des opérations
          comme reset, rebase ou des erreurs de manipulation.
        </p>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Liste des entrées reflog */}
        <div className="lg:col-span-1">
          <Card
            header={
              <div className="space-y-3">
                <h3 className="font-semibold text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Historique Reflog
                </h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher dans le reflog..."
                    className="bg-gray-700 w-full text-white pl-10 pr-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            }
          >
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {filteredEntries.map((entry) => {
                const Icon = getEntryIcon(entry.type);
                const isSelected = selectedEntry === entry.id;
                
                return (
                  <motion.button
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Number(entry.id) * 0.1 }}
                    onClick={() => setSelectedEntry(entry.id)}
                    className={`w-full text-left p-3 rounded-lg border ${
                      isSelected 
                        ? 'bg-blue-900/20 border-blue-500/50' 
                        : 'border-gray-700 hover:bg-gray-700/30'
                    } transition-colors`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-5 w-5 mt-0.5 ${getEntryColor(entry.type)}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-white text-sm">{entry.headPosition}</span>
                          <span className="text-xs text-gray-400">{entry.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-300 truncate">{entry.action}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-gray-800 px-1.5 py-0.5 rounded text-gray-300 font-mono">
                            {entry.hash.substring(0, 7)}
                          </span>
                          {entry.recoverable && (
                            <span className="text-xs text-green-400">Récupérable</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              {filteredEntries.length === 0 && (
                <div className="text-center py-6 text-gray-400">
                  Aucune entrée ne correspond à votre recherche
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Détails et récupération */}
        <div className="lg:col-span-2">
          <Card>
            {selectedEntryData ? (
              <motion.div
                key={selectedEntryData.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {/* En-tête de l'entrée sélectionnée */}
                <div className={`p-4 rounded-lg ${getEntryBg(selectedEntryData.type)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {React.createElement(getEntryIcon(selectedEntryData.type), { 
                        className: `h-5 w-5 ${getEntryColor(selectedEntryData.type)}` 
                      })}
                      <h3 className="text-lg font-bold text-white">{selectedEntryData.message}</h3>
                    </div>
                    <span className="text-sm text-gray-400">{selectedEntryData.timestamp}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <div className="text-xs text-gray-400">Position</div>
                      <div className="text-sm text-white">{selectedEntryData.headPosition}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Commit Hash</div>
                      <div className="text-sm text-white font-mono">{selectedEntryData.hash}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="text-xs text-gray-400">Action</div>
                    <div className="text-sm text-white">{selectedEntryData.action}</div>
                  </div>
                </div>

                {/* Options de récupération */}
                {selectedEntryData.recoverable && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-white">Options de récupération</h4>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setShowRecovery(!showRecovery)}
                      >
                        {showRecovery ? 'Masquer' : 'Afficher'} les commandes
                      </Button>
                    </div>

                    {showRecovery && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4"
                      >
                        <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                          <h5 className="font-medium text-green-400 mb-2">Comment récupérer cet état</h5>
                          <CodeBlock
                            code={getRecoveryCommand(selectedEntryData)}
                            language="bash"
                          />
                        </div>

                        <Alert type="warning" title="Important">
                          Assurez-vous de sauvegarder vos modifications actuelles avant de récupérer un état antérieur.
                          Vous pouvez utiliser <code className="text-yellow-400">git stash</code> pour mettre de côté vos changements non commitées.
                        </Alert>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Explication du type d'action */}
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-medium text-white mb-2">À propos de cette action</h4>
                  {selectedEntryData.type === 'commit' && (
                    <p className="text-gray-300 text-sm">
                      Cette entrée représente un commit. Chaque fois que vous effectuez un commit,
                      une nouvelle entrée est ajoutée au reflog, vous permettant de revenir à cet état
                      si nécessaire.
                    </p>
                  )}
                  {selectedEntryData.type === 'checkout' && (
                    <p className="text-gray-300 text-sm">
                      Cette entrée montre un changement de branche. Le reflog enregistre tous vos
                      mouvements entre les branches, vous permettant de retrouver votre chemin.
                    </p>
                  )}
                  {selectedEntryData.type === 'merge' && (
                    <p className="text-gray-300 text-sm">
                      Cette entrée représente une fusion de branches. Le reflog vous permet de 
                      revenir à l'état avant la fusion si quelque chose se passe mal.
                    </p>
                  )}
                  {selectedEntryData.type === 'reset' && (
                    <p className="text-gray-300 text-sm">
                      Cette entrée montre un reset. C'est particulièrement utile car les resets
                      peuvent sembler destructifs, mais grâce au reflog, vous pouvez récupérer
                      l'état précédent.
                    </p>
                  )}
                  {selectedEntryData.type === 'rebase' && (
                    <p className="text-gray-300 text-sm">
                      Cette entrée représente un rebase. Les rebases réécrivent l'historique, mais
                      le reflog conserve une trace de l'état avant le rebase.
                    </p>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Clock className="h-16 w-16 opacity-20 mx-auto mb-4" />
                <p>Sélectionnez une entrée du reflog pour voir les détails</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Section d'explication */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Utilisation du Reflog</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-white">Quand utiliser le reflog :</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                <li>Après un <code className="text-yellow-400">git reset --hard</code> accidentel</li>
                <li>Pour récupérer des branches supprimées</li>
                <li>Pour retrouver des commits "perdus" après un rebase</li>
                <li>Pour identifier quand un bug a été introduit</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-white">Commandes utiles :</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                <li><code className="text-green-400">git reflog</code> - Afficher le journal de référence</li>
                <li><code className="text-green-400">git checkout HEAD@{"{n}"}</code> - Revenir à un état spécifique</li>
                <li><code className="text-green-400">git branch recover-branch HEAD@{"{n}"}</code> - Créer une branche à partir d'un état précédent</li>
                <li><code className="text-green-400">git reflog show &lt;branche&gt;</code> - Voir le reflog d'une branche spécifique</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-white mb-1">Important à savoir</h4>
                <p className="text-sm text-gray-300">
                  Le reflog est <strong>local</strong> et n'est pas partagé avec le dépôt distant.
                  Il est conservé pendant 90 jours par défaut pour les entrées de HEAD et 30 jours pour les autres références.
                  Après cette période, Git peut nettoyer les entrées expirées lors d'un garbage collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Exemples pratiques */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Exemples Pratiques</h3>
        
        <div className="space-y-4">
          <div className="p-4 border border-blue-500/30 bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <ArrowRight className="h-4 w-4 text-blue-400" />
              <h4 className="font-medium text-white">Récupérer après un reset --hard</h4>
            </div>
            <div className="space-y-2">
              <CodeBlock
                code="git reset --hard HEAD~2  # Supprime les 2 derniers commits\n# Oups ! Je voulais garder ces commits\ngit reflog  # Trouve le commit avant le reset\ngit reset --hard HEAD@{1}  # Reviens à l'état avant le reset"
                language="bash"
              />
              <p className="text-sm text-gray-300">
                Le reflog vous permet de retrouver l'état exact avant un reset destructif.
              </p>
            </div>
          </div>
          
          <div className="p-4 border border-green-500/30 bg-green-900/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <ArrowRight className="h-4 w-4 text-green-400" />
              <h4 className="font-medium text-white">Récupérer une branche supprimée</h4>
            </div>
            <div className="space-y-2">
              <CodeBlock
                code="git branch -D feature  # Supprime la branche accidentellement\ngit reflog  # Cherche le dernier commit de cette branche\ngit checkout -b feature HEAD@{2}  # Recrée la branche au bon endroit"
                language="bash"
              />
              <p className="text-sm text-gray-300">
                Même après avoir supprimé une branche, ses commits sont toujours accessibles via le reflog.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReflogExplorer;