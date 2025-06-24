import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Undo, ArrowRight, Trash2, AlertTriangle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface CommandStage {
  stage: 'working' | 'staged' | 'committed' | 'remote';
  label: string;
  color: string;
}

interface UndoCommand {
  name: string;
  command: string;
  description: string;
  targets: ('working' | 'staged' | 'committed' | 'remote')[];
  danger: 'safe' | 'caution' | 'dangerous';
  example: string;
}

const UndoCommandVisualizer: React.FC = () => {
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<'working' | 'staged' | 'committed' | 'remote'>('working');

  const stages: CommandStage[] = [
    { stage: 'working', label: 'Répertoire de Travail', color: 'blue' },
    { stage: 'staged', label: 'Zone de Staging', color: 'yellow' },
    { stage: 'committed', label: 'Dépôt Local', color: 'green' },
    { stage: 'remote', label: 'Dépôt Distant', color: 'purple' }
  ];

  const commands: UndoCommand[] = [
    {
      name: 'git checkout -- <fichier>',
      command: 'checkout-file',
      description: 'Restaure un fichier dans le répertoire de travail à partir du dernier commit',
      targets: ['working'],
      danger: 'safe',
      example: 'git checkout -- path/to/file.js'
    },
    {
      name: 'git restore <fichier>',
      command: 'restore',
      description: 'Restaure les fichiers du répertoire de travail (Git 2.23+)',
      targets: ['working'],
      danger: 'safe',
      example: 'git restore path/to/file.js'
    },
    {
      name: 'git reset <fichier>',
      command: 'reset-file',
      description: 'Retire les fichiers de la zone de staging',
      targets: ['staged'],
      danger: 'safe',
      example: 'git reset path/to/file.js'
    },
    {
      name: 'git reset --soft HEAD~1',
      command: 'reset-soft',
      description: 'Annule le dernier commit mais conserve les modifications en staging',
      targets: ['committed'],
      danger: 'caution',
      example: 'git reset --soft HEAD~1'
    },
    {
      name: 'git reset --hard HEAD~1',
      command: 'reset-hard',
      description: 'Annule le dernier commit et supprime toutes les modifications',
      targets: ['committed', 'staged', 'working'],
      danger: 'dangerous',
      example: 'git reset --hard HEAD~1'
    },
    {
      name: 'git revert <commit>',
      command: 'revert',
      description: 'Crée un nouveau commit qui annule les changements d\'un commit précédent',
      targets: ['committed', 'remote'],
      danger: 'safe',
      example: 'git revert abc123f'
    },
    {
      name: 'git stash',
      command: 'stash',
      description: 'Sauvegarde temporairement les modifications non commitées',
      targets: ['working', 'staged'],
      danger: 'safe',
      example: 'git stash'
    }
  ];

  const getDangerLevel = (level: string) => {
    switch (level) {
      case 'safe': return 'text-green-400';
      case 'caution': return 'text-yellow-400';
      case 'dangerous': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDangerBadge = (level: string) => {
    switch (level) {
      case 'safe': return <Badge variant="success">Sûr</Badge>;
      case 'caution': return <Badge variant="warning">Attention</Badge>;
      case 'dangerous': return <Badge variant="error">Dangereux</Badge>;
      default: return <Badge variant="default">Inconnu</Badge>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Visualiseur de Commandes d'Annulation</h2>
        <p className="text-gray-300">Explorez les différentes façons d'annuler des changements dans Git</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Stages Git */}
        <Card
          header={
            <h3 className="font-semibold text-white">États Git</h3>
          }
        >
          <div className="space-y-4">
            {stages.map((stage) => (
              <motion.div
                key={stage.stage}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  activeStage === stage.stage
                    ? `bg-${stage.color}-900/20 border-${stage.color}-500/30`
                    : 'bg-gray-700/30 border-gray-600'
                }`}
                onClick={() => setActiveStage(stage.stage)}
              >
                <h4 className={`font-medium text-${stage.color}-400`}>{stage.label}</h4>
                <p className="text-sm text-gray-300 mt-1">
                  {stage.stage === 'working' && "Fichiers modifiés mais pas encore ajoutés au staging"}
                  {stage.stage === 'staged' && "Fichiers ajoutés au staging mais pas encore commités"}
                  {stage.stage === 'committed' && "Fichiers commités dans le dépôt local"}
                  {stage.stage === 'remote' && "Changements poussés vers le dépôt distant"}
                </p>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Commandes d'Annulation */}
        <Card
          header={
            <h3 className="font-semibold text-white">Commandes d'Annulation</h3>
          }
        >
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {commands
              .filter(cmd => cmd.targets.includes(activeStage))
              .map((command, index) => (
                <motion.div
                  key={command.command}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border cursor-pointer ${
                    selectedCommand === command.command
                      ? 'bg-blue-900/20 border-blue-500/50'
                      : 'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedCommand(command.command)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-sm text-white">{command.name}</div>
                    {getDangerBadge(command.danger)}
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{command.description}</p>
                  <div className="bg-gray-800 p-2 rounded text-xs text-green-400 font-mono">
                    $ {command.example}
                  </div>
                </motion.div>
              ))}

            {commands.filter(cmd => cmd.targets.includes(activeStage)).length === 0 && (
              <div className="text-center text-gray-400 py-4">
                Aucune commande d'annulation spécifique à cette étape
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Détails de la Commande Sélectionnée */}
      {selectedCommand && (
        <Card>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {commands.find(c => c.command === selectedCommand)?.name}
                </h3>
                <p className="text-gray-300">
                  {commands.find(c => c.command === selectedCommand)?.description}
                </p>
              </div>
              <div className="ml-4">
                {getDangerBadge(commands.find(c => c.command === selectedCommand)?.danger || 'safe')}
              </div>
            </div>

            {selectedCommand === 'reset-hard' && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Attention : Commande Destructive</h4>
                    <p className="text-sm text-gray-300">
                      Cette commande supprime définitivement les modifications non commitées et 
                      modifie l'historique. Utilisez avec précaution, surtout sur des branches partagées.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-700/30 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Exemple d'utilisation</h4>
              <div className="bg-gray-800 p-3 rounded font-mono text-sm text-green-400">
                $ {commands.find(c => c.command === selectedCommand)?.example}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2">Cas d'utilisation</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  {selectedCommand === 'checkout-file' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Annuler des modifications locales sur un fichier spécifique</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Restaurer un fichier supprimé accidentellement</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'restore' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Alternative moderne à checkout pour restaurer des fichiers</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Plus explicite et moins propice aux erreurs</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'reset-file' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Désindexer des fichiers sans perdre les modifications</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Diviser un grand changement en plusieurs commits</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'reset-soft' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Annuler un commit tout en conservant les modifications</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Combiner plusieurs commits en un seul</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'reset-hard' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Annuler complètement un ou plusieurs commits locaux</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Réinitialiser une branche locale à un état spécifique</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'revert' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Annuler des commits déjà poussés</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Préserver l'historique tout en annulant des changements</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'stash' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Mettre de côté des changements pour travailler sur autre chose</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                        <span>Sauvegarder des modifications avant de changer de branche</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">Points importants</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  {selectedCommand === 'checkout-file' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Les modifications non stagées seront perdues définitivement</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>N'affecte pas les fichiers stagés ou commités</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'restore' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Plus sûr que checkout car plus spécifique</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Disponible uniquement dans Git 2.23+</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'reset-file' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Ne modifie pas le répertoire de travail</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Utile pour réorganiser les modifications avant de commiter</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'reset-soft' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Conserve les modifications en staging</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Modifie l'historique, dangereux sur les branches partagées</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'reset-hard' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>Supprime définitivement toutes les modifications non commitées</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>Modifie l'historique, très dangereux sur les branches partagées</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'revert' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Crée un nouveau commit, préserve l'historique</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Sûr à utiliser sur des branches partagées</span>
                      </li>
                    </>
                  )}
                  {selectedCommand === 'stash' && (
                    <>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Les changements stashés ne sont pas visibles dans l'historique</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Undo className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span>Utilisez git stash pop ou git stash apply pour récupérer les changements</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UndoCommandVisualizer;