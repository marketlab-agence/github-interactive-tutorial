import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Undo, ArrowLeft, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Tabs from '../ui/Tabs';
import CodeBlock from '../ui/CodeBlock';
import Alert from '../ui/Alert';

interface UndoCommand {
  name: string;
  command: string;
  description: string;
  useCases: string[];
  warning?: string;
  example: string;
  level: 'safe' | 'caution' | 'danger';
  undoesCommit: boolean;
  changesHistory: boolean;
  worksWithStaged: boolean;
  worksWithUnstaged: boolean;
  worksWithCommitted: boolean;
}

const UndoCommandComparison: React.FC = () => {
  const [selectedCommand, setSelectedCommand] = useState<string>('checkout');

  const commands: UndoCommand[] = [
    {
      name: 'git checkout -- <file>',
      command: 'checkout',
      description: 'Restaure les fichiers dans le répertoire de travail à leur état dans le dernier commit',
      useCases: [
        'Annuler des modifications locales non commitées',
        'Récupérer la version d\'un fichier d'un commit précédent'
      ],
      example: 'git checkout -- path/to/file.js',
      level: 'safe',
      undoesCommit: false,
      changesHistory: false,
      worksWithStaged: false,
      worksWithUnstaged: true,
      worksWithCommitted: false
    },
    {
      name: 'git restore <file>',
      command: 'restore',
      description: 'Nouvelle commande (Git 2.23+) pour restaurer les fichiers du répertoire de travail',
      useCases: [
        'Annuler des modifications locales non commitées (alternative moderne à checkout)',
        'Enlever des fichiers de la zone de staging avec --staged'
      ],
      example: 'git restore path/to/file.js\ngit restore --staged path/to/file.js',
      level: 'safe',
      undoesCommit: false,
      changesHistory: false,
      worksWithStaged: true,
      worksWithUnstaged: true,
      worksWithCommitted: false
    },
    {
      name: 'git reset <file>',
      command: 'reset-file',
      description: 'Retire les fichiers de la zone de staging, conserve les modifications',
      useCases: [
        'Désindexer des fichiers ajoutés par erreur avec git add',
        'Diviser un grand ensemble de changements en plusieurs commits'
      ],
      example: 'git reset path/to/file.js',
      level: 'safe',
      undoesCommit: false,
      changesHistory: false,
      worksWithStaged: true,
      worksWithUnstaged: false,
      worksWithCommitted: false
    },
    {
      name: 'git reset [--soft | --mixed | --hard] <commit>',
      command: 'reset-commit',
      description: 'Réinitialise le HEAD vers un commit spécifique, avec différents modes qui affectent les fichiers',
      useCases: [
        'Annuler un ou plusieurs commits (--soft pour préserver les modifications)',
        'Réorganiser l\'historique local avant de pousser',
        'Supprimer complètement des modifications (--hard)'
      ],
      warning: 'Avec --hard, les modifications non commitées seront perdues de manière irréversible',
      example: 'git reset --soft HEAD~1  # Annule le dernier commit\ngit reset --hard HEAD~3  # Annule les 3 derniers commits (DANGEREUX)',
      level: 'danger',
      undoesCommit: true,
      changesHistory: true,
      worksWithStaged: true,
      worksWithUnstaged: true,
      worksWithCommitted: true
    },
    {
      name: 'git revert <commit>',
      command: 'revert',
      description: 'Crée un nouveau commit qui annule les changements d\'un commit précédent',
      useCases: [
        'Annuler un commit déjà poussé de façon sécurisée',
        'Conserver un historique propre des actions d\'annulation'
      ],
      example: 'git revert abc123f',
      level: 'safe',
      undoesCommit: true,
      changesHistory: false,
      worksWithStaged: false,
      worksWithUnstaged: false,
      worksWithCommitted: true
    },
    {
      name: 'git stash',
      command: 'stash',
      description: 'Sauvegarde temporairement les modifications non commitées',
      useCases: [
        'Mettre de côté des changements pour changer de branche',
        'Sauvegarder rapidement du travail en cours'
      ],
      example: 'git stash\ngit stash pop  # Pour récupérer les changements',
      level: 'safe',
      undoesCommit: false,
      changesHistory: false,
      worksWithStaged: true,
      worksWithUnstaged: true,
      worksWithCommitted: false
    },
    {
      name: 'git reflog',
      command: 'reflog',
      description: 'Journal de référence qui enregistre tous les changements de HEAD',
      useCases: [
        'Récupérer des commits "perdus" après un reset --hard',
        'Trouver l\'identifiant d\'un commit supprimé'
      ],
      example: 'git reflog\ngit checkout HEAD@{2}  # Revenir à un état précédent de HEAD',
      level: 'caution',
      undoesCommit: false,
      changesHistory: false,
      worksWithStaged: false,
      worksWithUnstaged: false,
      worksWithCommitted: true
    }
  ];

  const getCommandLevelColor = (level: string): string => {
    switch (level) {
      case 'safe': return 'text-green-400';
      case 'caution': return 'text-yellow-400';
      case 'danger': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getCommandLevelBadge = (level: string): JSX.Element => {
    switch (level) {
      case 'safe':
        return <Badge variant="success">Sûr</Badge>;
      case 'caution':
        return <Badge variant="warning">Attention</Badge>;
      case 'danger':
        return <Badge variant="error">Dangereux</Badge>;
      default:
        return <Badge variant="default">Niveau inconnu</Badge>;
    }
  };

  const getCommandIcon = (command: string): JSX.Element => {
    switch (command) {
      case 'checkout':
      case 'restore':
        return <ArrowLeft className="h-5 w-5 text-blue-400" />;
      case 'reset-file':
      case 'reset-commit':
        return <RefreshCw className="h-5 w-5 text-yellow-400" />;
      case 'revert':
        return <Undo className="h-5 w-5 text-green-400" />;
      case 'stash':
        return <Undo className="h-5 w-5 text-purple-400" />;
      case 'reflog':
        return <RotateCcw className="h-5 w-5 text-blue-400" />;
      default:
        return <RotateCcw className="h-5 w-5 text-gray-400" />;
    }
  };

  const selectedCommandData = commands.find(cmd => cmd.command === selectedCommand);

  const comparisonTab = {
    id: 'comparison',
    label: 'Comparaison',
    icon: RefreshCw,
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-white text-center mb-4">
          Comparaison des Commandes d'Annulation
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Niveau
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Annule Commits
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Modifie Historique
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Fichiers Stagés
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Fichiers Non-Stagés
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {commands.map((command, index) => (
                <motion.tr 
                  key={command.command}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`cursor-pointer hover:bg-gray-700/30 ${
                    selectedCommand === command.command ? 'bg-blue-900/20' : ''
                  }`}
                  onClick={() => setSelectedCommand(command.command)}
                >
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      {getCommandIcon(command.command)}
                      <span className="text-white font-mono">{command.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {getCommandLevelBadge(command.level)}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    {command.undoesCommit ? '✓' : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    {command.changesHistory ? (
                      <span className="text-yellow-400">✓</span>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    {command.worksWithStaged ? '✓' : '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    {command.worksWithUnstaged ? '✓' : '—'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  };

  const detailsTab = {
    id: 'details',
    label: 'Détails',
    icon: AlertTriangle,
    content: (
      <div className="space-y-6">
        {selectedCommandData && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getCommandIcon(selectedCommandData.command)}
                <h3 className="text-xl font-bold text-white">{selectedCommandData.name}</h3>
              </div>
              {getCommandLevelBadge(selectedCommandData.level)}
            </div>

            <div className="space-y-4">
              <p className="text-gray-300">{selectedCommandData.description}</p>

              <div>
                <h4 className="font-medium text-white mb-2">Cas d'utilisation</h4>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  {selectedCommandData.useCases.map((use, index) => (
                    <li key={index}>{use}</li>
                  ))}
                </ul>
              </div>

              {selectedCommandData.warning && (
                <Alert type="warning" title="Attention">
                  {selectedCommandData.warning}
                </Alert>
              )}

              <div>
                <h4 className="font-medium text-white mb-2">Exemple</h4>
                <CodeBlock code={selectedCommandData.example} language="bash" />
              </div>

              {selectedCommandData.command === 'reset-commit' && (
                <div>
                  <h4 className="font-medium text-white mb-2">Modes de Reset</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <div className="font-medium text-green-400 mb-1">--soft</div>
                      <p className="text-sm text-gray-300">
                        Remet HEAD au commit spécifié, mais garde tous les changements en staging.
                        Idéal pour regrouper plusieurs commits en un seul.
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                      <div className="font-medium text-yellow-400 mb-1">--mixed (défaut)</div>
                      <p className="text-sm text-gray-300">
                        Remet HEAD au commit spécifié et désindexe les changements.
                        Les modifications resteront dans votre répertoire de travail.
                      </p>
                    </div>
                    <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <div className="font-medium text-red-400 mb-1">--hard</div>
                      <p className="text-sm text-gray-300">
                        Remet HEAD au commit spécifié et réinitialise complètement l'index et le répertoire de travail.
                        Toutes les modifications non commitées seront perdues !
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  };

  const workflowTab = {
    id: 'workflow',
    label: 'Guide de Décision',
    icon: Undo,
    content: (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white text-center mb-4">
          Comment Choisir la Bonne Commande d'Annulation
        </h3>
        
        <Card>
          <div className="space-y-6">
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">
                Que voulez-vous annuler ?
              </h4>
              <div className="space-y-4 mt-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h5 className="font-medium text-white mb-1">Modifications non commitées (working directory)</h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Vous avez modifié des fichiers mais ne les avez pas encore ajoutés à la zone de staging
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <ArrowRight className="h-4 w-4 text-green-400" />
                    <span className="text-green-400 font-medium">Utilisez:</span>
                    <span className="font-mono text-gray-300">git restore &lt;fichier&gt;</span>
                    <span className="text-gray-500">(ou git checkout -- &lt;fichier&gt;)</span>
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <h5 className="font-medium text-white mb-1">Changements dans la zone de staging</h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Vous avez ajouté des fichiers avec git add mais vous ne voulez pas les commiter
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <ArrowRight className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Utilisez:</span>
                    <span className="font-mono text-gray-300">git restore --staged &lt;fichier&gt;</span>
                    <span className="text-gray-500">(ou git reset &lt;fichier&gt;)</span>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h5 className="font-medium text-white mb-1">Dernier commit local</h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Vous venez de commiter mais il y a une erreur et ce commit n'a pas encore été poussé
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <ArrowRight className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-400 font-medium">Utilisez:</span>
                    <span className="font-mono text-gray-300">git reset --soft HEAD~1</span>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h5 className="font-medium text-white mb-1">Commit déjà poussé</h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Vous avez poussé un commit et devez l'annuler de façon sûre
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <ArrowRight className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">Utilisez:</span>
                    <span className="font-mono text-gray-300">git revert &lt;commit-hash&gt;</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white mb-1">Attention aux commandes destructives</h4>
                  <ul className="list-disc text-sm text-gray-300 pl-5 space-y-1">
                    <li><span className="text-red-400 font-mono">git reset --hard</span> : supprime définitivement les modifications</li>
                    <li><span className="text-red-400 font-mono">git clean -fd</span> : supprime les fichiers non suivis</li>
                    <li><span className="text-red-400 font-mono">git push --force</span> : écrase l'historique distant</li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-2">
                    Ces commandes peuvent entraîner une perte permanente de données. Utilisez avec précaution.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-700/30 rounded-lg">
              <h4 className="font-medium text-white mb-2">
                Astuces pour éviter les problèmes
              </h4>
              <ul className="list-disc text-sm text-gray-300 pl-5 space-y-1">
                <li>Commitez fréquemment et par petites portions</li>
                <li>Utilisez des branches pour expérimenter</li>
                <li>Faites des sauvegardes avant des opérations risquées</li>
                <li>Apprenez à utiliser <span className="text-blue-400 font-mono">git reflog</span> pour récupérer des commits "perdus"</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    )
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Commandes d'Annulation Git</h2>
        <p className="text-gray-300">Comparez les différentes façons d'annuler des modifications dans Git</p>
      </motion.div>

      <Card>
        <Tabs tabs={[comparisonTab, detailsTab, workflowTab]} />
      </Card>
    </div>
  );
};

export default UndoCommandComparison;