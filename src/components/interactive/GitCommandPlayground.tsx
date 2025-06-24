import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Play, RotateCcw, CheckCircle, GitCommit, GitBranch, Info } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface Command {
  id: string;
  command: string;
  description: string;
  example: string;
  category: 'basic' | 'branching' | 'remote' | 'advanced';
}

interface CommandResult {
  command: string;
  output: string;
  success: boolean;
  timestamp: Date;
}

const GitCommandPlayground: React.FC = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const availableCommands: Command[] = [
    {
      id: 'init',
      command: 'git init',
      description: 'Initialise un nouveau dépôt Git',
      example: 'git init',
      category: 'basic'
    },
    {
      id: 'status',
      command: 'git status',
      description: 'Affiche l\'état du dépôt',
      example: 'git status',
      category: 'basic'
    },
    {
      id: 'add',
      command: 'git add',
      description: 'Ajoute des fichiers à la zone de staging',
      example: 'git add . ou git add fichier.txt',
      category: 'basic'
    },
    {
      id: 'commit',
      command: 'git commit',
      description: 'Enregistre les changements dans le dépôt',
      example: 'git commit -m "message de commit"',
      category: 'basic'
    },
    {
      id: 'branch',
      command: 'git branch',
      description: 'Liste, crée ou supprime des branches',
      example: 'git branch ma-branche',
      category: 'branching'
    },
    {
      id: 'checkout',
      command: 'git checkout',
      description: 'Change de branche ou restaure des fichiers',
      example: 'git checkout ma-branche',
      category: 'branching'
    },
    {
      id: 'merge',
      command: 'git merge',
      description: 'Fusionne une branche dans la branche courante',
      example: 'git merge ma-branche',
      category: 'branching'
    },
    {
      id: 'remote-add',
      command: 'git remote add',
      description: 'Ajoute un dépôt distant',
      example: 'git remote add origin https://github.com/user/repo.git',
      category: 'remote'
    },
    {
      id: 'push',
      command: 'git push',
      description: 'Envoie les commits au dépôt distant',
      example: 'git push origin main',
      category: 'remote'
    },
    {
      id: 'pull',
      command: 'git pull',
      description: 'Récupère et fusionne les changements du dépôt distant',
      example: 'git pull origin main',
      category: 'remote'
    },
    {
      id: 'log',
      command: 'git log',
      description: 'Affiche l\'historique des commits',
      example: 'git log --oneline',
      category: 'basic'
    },
    {
      id: 'reset',
      command: 'git reset',
      description: 'Réinitialise HEAD à un état spécifié',
      example: 'git reset --hard HEAD~1',
      category: 'advanced'
    }
  ];

  const filteredCommands = selectedCategory === 'all'
    ? availableCommands
    : availableCommands.filter(cmd => cmd.category === selectedCategory);

  const executeCommand = () => {
    if (!currentCommand.trim()) return;
    
    let output = '';
    let success = true;

    // Simulation de l'exécution des commandes Git
    if (currentCommand.startsWith('git ')) {
      const gitCommand = currentCommand.split(' ')[1];
      
      const knownCommand = availableCommands.find(cmd => 
        currentCommand.startsWith(cmd.command)
      );

      if (knownCommand) {
        switch (gitCommand) {
          case 'init':
            output = 'Dépôt Git initialisé dans le répertoire courant.';
            break;
          case 'status':
            output = 'Sur la branche main\nRien à commiter, répertoire de travail propre';
            break;
          case 'add':
            output = 'Changements ajoutés à la zone de staging.';
            break;
          case 'commit':
            if (currentCommand.includes('-m')) {
              output = '[main f1e8192] Commit effectué avec succès';
            } else {
              output = 'Erreur: Message de commit manquant. Utilisez -m "votre message"';
              success = false;
            }
            break;
          case 'branch':
            if (currentCommand === 'git branch') {
              output = '* main\n  feature/login\n  bugfix/header';
            } else {
              output = 'Branche créée.';
            }
            break;
          case 'checkout':
            if (currentCommand.includes('-b')) {
              output = 'Basculé sur la nouvelle branche';
            } else {
              output = 'Basculé sur la branche spécifiée';
            }
            break;
          case 'merge':
            output = 'Fusion effectuée (fast-forward)';
            break;
          case 'remote':
            if (currentCommand.includes('add')) {
              output = 'Nouveau remote ajouté';
            } else {
              output = 'origin\tgithub.com/user/repo (fetch)\norigin\tgithub.com/user/repo (push)';
            }
            break;
          case 'push':
            output = 'Énumération des objets: 5, fait.\nDécompte des objets: 100% (5/5), fait.\nCompression des objets: 100% (3/3), fait.\nÉcriture des objets: 100% (3/3), 652 bytes | 652.00 KiB/s, fait.\nTotal 3 (delta 2), réutilisés 0 (delta 0), réutilisés du pack 0\nTo github.com:user/repo.git\n   e7d9abd..f8e5aec  main -> main';
            break;
          case 'pull':
            output = 'Déjà à jour.';
            break;
          case 'log':
            output = 'commit f1e8192c5353b0b8d32a5bd46d7e7e59a66c2e4a (HEAD -> main)\nAuteur: Utilisateur <user@example.com>\nDate:   Mer Jan 17 10:30:15 2024 +0100\n\n    Dernier commit\n\ncommit e7d9abdc4682a70ad7f115e769c906e68e321087\nAuteur: Utilisateur <user@example.com>\nDate:   Mar Jan 16 14:45:22 2024 +0100\n\n    Commit initial';
            break;
          case 'reset':
            if (currentCommand.includes('--hard')) {
              output = 'HEAD est maintenant à e7d9abd Commit initial';
            } else {
              output = 'Changements désindexés';
            }
            break;
          default:
            output = 'Commande exécutée.';
        }
      } else {
        output = `git: '${gitCommand}' n'est pas une commande git. Voir 'git --help'.`;
        success = false;
      }
    } else {
      output = 'Commande non reconnue. Utilisez des commandes Git commençant par "git".';
      success = false;
    }

    const result: CommandResult = {
      command: currentCommand,
      output,
      success,
      timestamp: new Date()
    };

    setCommandHistory([...commandHistory, result]);
    setCurrentCommand('');
  };

  const resetTerminal = () => {
    setCommandHistory([]);
    setCurrentCommand('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Terrain de Jeu des Commandes Git</h2>
        <p className="text-gray-300">Expérimentez avec les commandes Git dans un environnement sécurisé</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Commandes disponibles */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Commandes Git</h3>
              <div className="flex items-center">
                <select
                  className="bg-gray-700 text-white text-sm rounded border border-gray-600 px-2 py-1"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Toutes</option>
                  <option value="basic">Basiques</option>
                  <option value="branching">Branches</option>
                  <option value="remote">Distant</option>
                  <option value="advanced">Avancées</option>
                </select>
              </div>
            </div>
          }
        >
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {filteredCommands.map((cmd) => (
              <motion.div
                key={cmd.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/30 rounded-lg p-3 hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => setCurrentCommand(cmd.command)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-sm text-blue-400">{cmd.command}</span>
                  <Badge variant={
                    cmd.category === 'basic' ? 'info' :
                    cmd.category === 'branching' ? 'success' :
                    cmd.category === 'remote' ? 'warning' :
                    'error'
                  } size="sm">
                    {cmd.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-300 mb-1">{cmd.description}</p>
                <div className="text-xs text-gray-400 font-mono">Ex: {cmd.example}</div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Terminal */}
        <div className="lg:col-span-2">
          <Card
            header={
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-5 w-5 text-green-400" />
                  <h3 className="font-semibold text-white">Terminal Git</h3>
                </div>
                <Button size="sm" variant="secondary" onClick={resetTerminal}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
            }
          >
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 h-80 overflow-y-auto">
              {commandHistory.map((result, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center text-blue-400">
                    <span className="text-gray-500 mr-2">$</span>
                    <span>{result.command}</span>
                  </div>
                  <div className={`whitespace-pre-wrap ml-4 mt-1 ${
                    result.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result.output}
                  </div>
                </div>
              ))}
              <div className="flex items-center text-blue-400">
                <span className="text-gray-500 mr-2">$</span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && executeCommand()}
                  placeholder="Entrez une commande Git..."
                  className="bg-transparent border-none outline-none w-full text-blue-400"
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button onClick={executeCommand} disabled={!currentCommand.trim()}>
                <Play className="h-4 w-4 mr-2" />
                Exécuter
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Documentation de référence */}
      <Card
        header={
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-400" />
            <h3 className="font-semibold text-white">Guide des Commandes Git</h3>
          </div>
        }
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="font-medium text-blue-400 mb-2 flex items-center">
              <GitCommit className="h-4 w-4 mr-2" />
              Commandes de Base
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><span className="font-mono text-green-400">git init</span> - Initialise un dépôt</li>
              <li><span className="font-mono text-green-400">git add</span> - Ajoute des fichiers au staging</li>
              <li><span className="font-mono text-green-400">git commit</span> - Enregistre les changements</li>
              <li><span className="font-mono text-green-400">git status</span> - Affiche l'état du dépôt</li>
            </ul>
          </div>
          
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="font-medium text-green-400 mb-2 flex items-center">
              <GitBranch className="h-4 w-4 mr-2" />
              Branches et Fusion
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><span className="font-mono text-green-400">git branch</span> - Gère les branches</li>
              <li><span className="font-mono text-green-400">git checkout</span> - Change de branche</li>
              <li><span className="font-mono text-green-400">git merge</span> - Fusionne les branches</li>
              <li><span className="font-mono text-green-400">git rebase</span> - Réapplique les commits</li>
            </ul>
          </div>
          
          <div className="bg-gray-700/30 p-4 rounded-lg">
            <h4 className="font-medium text-purple-400 mb-2 flex items-center">
              <Cloud className="h-4 w-4 mr-2" />
              Dépôts Distants
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><span className="font-mono text-green-400">git remote</span> - Gère les dépôts distants</li>
              <li><span className="font-mono text-green-400">git push</span> - Envoie les commits</li>
              <li><span className="font-mono text-green-400">git pull</span> - Récupère les changements</li>
              <li><span className="font-mono text-green-400">git fetch</span> - Télécharge les références</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Cloud component for remote repository icon
const Cloud: React.FC<{ className?: string }> = (props) => (
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
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

export default GitCommandPlayground;