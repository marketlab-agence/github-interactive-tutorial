import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, RotateCcw, Plus, Edit, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface FileVersion {
  id: string;
  content: string;
  timestamp: Date;
  author: string;
  message: string;
  changes: {
    added: number;
    removed: number;
    modified: number;
  };
}

const VersioningDemo: React.FC = () => {
  const [currentVersion, setCurrentVersion] = useState(2);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const fileVersions: FileVersion[] = [
    {
      id: 'v1',
      content: `# Mon Projet

Ceci est la première version de mon projet.

## Fonctionnalités
- Fonctionnalité de base`,
      timestamp: new Date('2024-01-15T10:00:00'),
      author: 'Développeur',
      message: 'Version initiale du projet',
      changes: { added: 5, removed: 0, modified: 0 }
    },
    {
      id: 'v2',
      content: `# Mon Projet

Ceci est la première version de mon projet.

## Fonctionnalités
- Fonctionnalité de base
- Système d'authentification

## Installation
\`\`\`bash
npm install
\`\`\``,
      timestamp: new Date('2024-01-16T14:30:00'),
      author: 'Développeur',
      message: 'Ajout de l\'authentification et instructions d\'installation',
      changes: { added: 6, removed: 0, modified: 1 }
    },
    {
      id: 'v3',
      content: `# Mon Projet Génial

Ceci est un projet incroyable avec de nombreuses fonctionnalités.

## Fonctionnalités
- Fonctionnalité de base
- Système d'authentification
- Interface utilisateur moderne
- API REST complète

## Installation
\`\`\`bash
npm install
npm start
\`\`\`

## Tests
\`\`\`bash
npm test
\`\`\``,
      timestamp: new Date('2024-01-17T09:15:00'),
      author: 'Développeur',
      message: 'Amélioration du titre, ajout UI et API, section tests',
      changes: { added: 8, removed: 1, modified: 3 }
    }
  ];

  const currentFile = fileVersions[currentVersion];

  const createNewVersion = () => {
    if (editContent.trim() !== currentFile.content) {
      // Simuler la création d'une nouvelle version
      const newVersion: FileVersion = {
        id: `v${fileVersions.length + 1}`,
        content: editContent,
        timestamp: new Date(),
        author: 'Développeur',
        message: 'Modifications manuelles',
        changes: { added: 2, removed: 1, modified: 1 }
      };
      
      // Dans une vraie application, on ajouterait cette version
      console.log('Nouvelle version créée:', newVersion);
    }
    setIsEditing(false);
  };

  const startEditing = () => {
    setEditContent(currentFile.content);
    setIsEditing(true);
  };

  const getDiffStats = (version: FileVersion) => {
    const { added, removed, modified } = version.changes;
    return `+${added} -${removed} ~${modified}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Démonstration du Versioning</h2>
        <p className="text-gray-300">Découvrez comment Git suit l'évolution de vos fichiers dans le temps</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline des Versions */}
        <Card
          header={
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">Historique des Versions</h3>
            </div>
          }
        >
          <div className="space-y-3">
            {fileVersions.map((version, index) => (
              <motion.button
                key={version.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCurrentVersion(index)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  currentVersion === index
                    ? 'bg-blue-900/20 border-blue-500/50'
                    : 'border-gray-600 hover:bg-gray-700/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{version.id}</span>
                  <span className="text-xs text-gray-400">
                    {version.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-1">{version.message}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{version.author}</span>
                  <span className="text-xs font-mono text-green-400">
                    {getDiffStats(version)}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Contenu du Fichier */}
        <div className="lg:col-span-2">
          <Card
            header={
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-400" />
                  <h3 className="font-semibold text-white">README.md - {currentFile.id}</h3>
                </div>
                <div className="flex space-x-2">
                  {!isEditing ? (
                    <>
                      <Button size="sm" variant="ghost" onClick={startEditing}>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                      <Button size="sm" variant="ghost">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restaurer
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="secondary" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                      <Button size="sm" onClick={createNewVersion}>
                        <Plus className="h-4 w-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </>
                  )}
                </div>
              </div>
            }
          >
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="editor"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-96 bg-gray-900 text-gray-100 p-4 rounded border border-gray-700 font-mono text-sm resize-none"
                    placeholder="Modifiez le contenu du fichier..."
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={`version-${currentVersion}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto"
                >
                  <pre className="text-gray-100 text-sm whitespace-pre-wrap">
                    {currentFile.content}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>

      {/* Informations sur la Version Actuelle */}
      <Card>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{currentFile.id}</div>
            <div className="text-sm text-gray-400">Version</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">+{currentFile.changes.added}</div>
            <div className="text-sm text-gray-400">Lignes ajoutées</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">-{currentFile.changes.removed}</div>
            <div className="text-sm text-gray-400">Lignes supprimées</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">~{currentFile.changes.modified}</div>
            <div className="text-sm text-gray-400">Lignes modifiées</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
          <h4 className="font-medium text-white mb-2">Message de Commit</h4>
          <p className="text-gray-300">{currentFile.message}</p>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
            <span>Par {currentFile.author}</span>
            <span>{currentFile.timestamp.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Avantages du Versioning */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Pourquoi le Versioning est Important</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: RotateCcw,
              title: 'Retour en Arrière',
              description: 'Possibilité de revenir à une version antérieure en cas de problème'
            },
            {
              icon: Clock,
              title: 'Historique Complet',
              description: 'Suivi de toutes les modifications avec dates et auteurs'
            },
            {
              icon: FileText,
              title: 'Comparaison',
              description: 'Voir exactement ce qui a changé entre les versions'
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 bg-gray-700/30 rounded-lg"
            >
              <benefit.icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <h4 className="font-medium text-white mb-2">{benefit.title}</h4>
              <p className="text-sm text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default VersioningDemo;