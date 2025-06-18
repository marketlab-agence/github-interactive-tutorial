import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, User, Calendar, Hash, FileText, Eye, RotateCcw } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface Commit {
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  email: string;
  date: Date;
  branch: string;
  files: Array<{
    name: string;
    status: 'added' | 'modified' | 'deleted';
    changes: { added: number; removed: number };
  }>;
  tags?: string[];
}

const CommitHistoryExplorer: React.FC = () => {
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [filterBranch, setFilterBranch] = useState<string>('all');

  const commits: Commit[] = [
    {
      hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
      shortHash: 'a1b2c3d',
      message: 'Ajout du système d\'authentification utilisateur',
      author: 'Marie Dupont',
      email: 'marie@example.com',
      date: new Date('2024-01-17T14:30:00'),
      branch: 'feature/auth',
      files: [
        { name: 'src/auth/login.js', status: 'added', changes: { added: 45, removed: 0 } },
        { name: 'src/auth/register.js', status: 'added', changes: { added: 38, removed: 0 } },
        { name: 'src/utils/validation.js', status: 'modified', changes: { added: 12, removed: 3 } }
      ],
      tags: ['v1.2.0']
    },
    {
      hash: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1',
      shortHash: 'b2c3d4e',
      message: 'Correction du bug de validation des formulaires',
      author: 'Jean Martin',
      email: 'jean@example.com',
      date: new Date('2024-01-16T10:15:00'),
      branch: 'bugfix/form-validation',
      files: [
        { name: 'src/components/Form.js', status: 'modified', changes: { added: 8, removed: 12 } },
        { name: 'tests/form.test.js', status: 'modified', changes: { added: 15, removed: 2 } }
      ]
    },
    {
      hash: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2',
      shortHash: 'c3d4e5f',
      message: 'Mise à jour de la documentation API',
      author: 'Sophie Leroy',
      email: 'sophie@example.com',
      date: new Date('2024-01-15T16:45:00'),
      branch: 'main',
      files: [
        { name: 'docs/api.md', status: 'modified', changes: { added: 25, removed: 8 } },
        { name: 'README.md', status: 'modified', changes: { added: 5, removed: 1 } }
      ]
    },
    {
      hash: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3',
      shortHash: 'd4e5f6g',
      message: 'Ajout des tests unitaires pour le module de paiement',
      author: 'Pierre Dubois',
      email: 'pierre@example.com',
      date: new Date('2024-01-14T09:20:00'),
      branch: 'feature/payment',
      files: [
        { name: 'tests/payment.test.js', status: 'added', changes: { added: 67, removed: 0 } },
        { name: 'src/payment/processor.js', status: 'modified', changes: { added: 3, removed: 1 } }
      ]
    },
    {
      hash: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4',
      shortHash: 'e5f6g7h',
      message: 'Commit initial du projet',
      author: 'Admin Système',
      email: 'admin@example.com',
      date: new Date('2024-01-10T08:00:00'),
      branch: 'main',
      files: [
        { name: 'package.json', status: 'added', changes: { added: 25, removed: 0 } },
        { name: 'README.md', status: 'added', changes: { added: 15, removed: 0 } },
        { name: '.gitignore', status: 'added', changes: { added: 20, removed: 0 } }
      ],
      tags: ['v1.0.0']
    }
  ];

  const branches = ['all', ...Array.from(new Set(commits.map(c => c.branch)))];

  const filteredCommits = filterBranch === 'all' 
    ? commits 
    : commits.filter(c => c.branch === filterBranch);

  const getFileStatusColor = (status: string) => {
    switch (status) {
      case 'added': return 'text-green-400';
      case 'modified': return 'text-yellow-400';
      case 'deleted': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getFileStatusIcon = (status: string) => {
    switch (status) {
      case 'added': return '+';
      case 'modified': return '~';
      case 'deleted': return '-';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Explorateur d'Historique des Commits</h2>
        <p className="text-gray-300">Naviguez dans l'historique de votre projet</p>
      </motion.div>

      {/* Filtres */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Filtrer par branche :</span>
            <select
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
              className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              {branches.map(branch => (
                <option key={branch} value={branch}>
                  {branch === 'all' ? 'Toutes les branches' : branch}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm text-gray-400">
            {filteredCommits.length} commit(s) affiché(s)
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Liste des commits */}
        <Card
          header={
            <h3 className="font-semibold text-white flex items-center">
              <GitCommit className="h-5 w-5 mr-2" />
              Historique des Commits
            </h3>
          }
        >
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredCommits.map((commit, index) => (
              <motion.button
                key={commit.hash}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCommit(commit)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedCommit?.hash === commit.hash
                    ? 'bg-blue-900/20 border-blue-500/50'
                    : 'border-gray-600 hover:bg-gray-700/30'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-gray-400" />
                    <span className="font-mono text-sm text-blue-400">{commit.shortHash}</span>
                    {commit.tags && commit.tags.map(tag => (
                      <Badge key={tag} variant="success" size="sm">{tag}</Badge>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {commit.date.toLocaleDateString()}
                  </span>
                </div>
                
                <h4 className="font-medium text-white mb-1 line-clamp-2">
                  {commit.message}
                </h4>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <User className="h-3 w-3" />
                    <span>{commit.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">{commit.branch}</span>
                    <span className="text-green-400">
                      +{commit.files.reduce((sum, f) => sum + f.changes.added, 0)}
                    </span>
                    <span className="text-red-400">
                      -{commit.files.reduce((sum, f) => sum + f.changes.removed, 0)}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Détails du commit */}
        <Card
          header={
            <h3 className="font-semibold text-white">Détails du Commit</h3>
          }
        >
          {selectedCommit ? (
            <div className="space-y-4">
              {/* Informations générales */}
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{selectedCommit.message}</h4>
                  {selectedCommit.tags && (
                    <div className="flex space-x-1">
                      {selectedCommit.tags.map(tag => (
                        <Badge key={tag} variant="success" size="sm">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Hash :</span>
                    <span className="text-blue-400 font-mono ml-2">{selectedCommit.shortHash}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Branche :</span>
                    <span className="text-white ml-2">{selectedCommit.branch}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Auteur :</span>
                    <span className="text-white ml-2">{selectedCommit.author}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Date :</span>
                    <span className="text-white ml-2">{selectedCommit.date.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Fichiers modifiés */}
              <div>
                <h5 className="font-medium text-gray-300 mb-3">
                  Fichiers modifiés ({selectedCommit.files.length})
                </h5>
                <div className="space-y-2">
                  {selectedCommit.files.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-2 bg-gray-700/20 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span className="font-mono text-sm text-white">{file.name}</span>
                        <span className={`text-xs ${getFileStatusColor(file.status)}`}>
                          {getFileStatusIcon(file.status)} {file.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="text-green-400">+{file.changes.added}</span>
                        <span className="text-red-400">-{file.changes.removed}</span>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button size="sm" variant="secondary">
                  <Eye className="h-4 w-4 mr-2" />
                  Voir les Changements
                </Button>
                <Button size="sm" variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Revenir à ce Commit
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <GitCommit className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Sélectionnez un commit pour voir les détails</p>
            </div>
          )}
        </Card>
      </div>

      {/* Statistiques */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Statistiques de l'Historique</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">{filteredCommits.length}</div>
            <div className="text-sm text-gray-400">Total Commits</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {Array.from(new Set(filteredCommits.map(c => c.author))).length}
            </div>
            <div className="text-sm text-gray-400">Contributeurs</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">
              {Array.from(new Set(filteredCommits.map(c => c.branch))).length}
            </div>
            <div className="text-sm text-gray-400">Branches</div>
          </div>
          <div className="text-center p-4 bg-gray-700/30 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">
              {filteredCommits.reduce((sum, c) => sum + c.files.length, 0)}
            </div>
            <div className="text-sm text-gray-400">Fichiers Modifiés</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CommitHistoryExplorer;