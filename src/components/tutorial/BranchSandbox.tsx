import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Plus, Trash2, GitMerge, Play, RotateCcw, Save } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface Branch {
  id: string;
  name: string;
  commits: Array<{
    id: string;
    message: string;
    timestamp: Date;
  }>;
  color: string;
  parentBranch?: string;
  merged: boolean;
}

interface SandboxAction {
  id: string;
  type: 'create' | 'commit' | 'merge' | 'delete';
  description: string;
  timestamp: Date;
}

const BranchSandbox: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 'main',
      name: 'main',
      commits: [
        { id: 'c1', message: 'Commit initial', timestamp: new Date('2024-01-15T10:00:00') },
        { id: 'c2', message: 'Ajout README', timestamp: new Date('2024-01-16T14:30:00') }
      ],
      color: '#3b82f6',
      merged: false
    }
  ]);

  const [actions, setActions] = useState<SandboxAction[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'branch' | 'commit' | 'merge'>('branch');
  const [selectedBranch, setSelectedBranch] = useState<string>('main');
  const [newBranchName, setNewBranchName] = useState('');
  const [commitMessage, setCommitMessage] = useState('');

  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

  const createBranch = () => {
    if (newBranchName.trim() && !branches.find(b => b.name === newBranchName)) {
      const parentBranch = branches.find(b => b.id === selectedBranch);
      const newBranch: Branch = {
        id: Date.now().toString(),
        name: newBranchName,
        commits: parentBranch ? [...parentBranch.commits] : [],
        color: colors[branches.length % colors.length],
        parentBranch: selectedBranch,
        merged: false
      };

      setBranches([...branches, newBranch]);
      addAction('create', `Création de la branche "${newBranchName}" depuis "${parentBranch?.name}"`);
      setNewBranchName('');
      setIsModalOpen(false);
    }
  };

  const addCommit = () => {
    if (commitMessage.trim()) {
      const newCommit = {
        id: Date.now().toString(),
        message: commitMessage,
        timestamp: new Date()
      };

      setBranches(prev => prev.map(branch => 
        branch.id === selectedBranch
          ? { ...branch, commits: [...branch.commits, newCommit] }
          : branch
      ));

      const branchName = branches.find(b => b.id === selectedBranch)?.name;
      addAction('commit', `Nouveau commit "${commitMessage}" sur "${branchName}"`);
      setCommitMessage('');
      setIsModalOpen(false);
    }
  };

  const mergeBranch = () => {
    const sourceBranch = branches.find(b => b.id === selectedBranch);
    const targetBranch = branches.find(b => b.name === 'main');

    if (sourceBranch && targetBranch && sourceBranch.id !== targetBranch.id) {
      // Ajouter un commit de fusion
      const mergeCommit = {
        id: Date.now().toString(),
        message: `Fusion de ${sourceBranch.name} dans main`,
        timestamp: new Date()
      };

      setBranches(prev => prev.map(branch => {
        if (branch.id === targetBranch.id) {
          return { ...branch, commits: [...branch.commits, mergeCommit] };
        }
        if (branch.id === sourceBranch.id) {
          return { ...branch, merged: true };
        }
        return branch;
      }));

      addAction('merge', `Fusion de "${sourceBranch.name}" dans "main"`);
      setIsModalOpen(false);
    }
  };

  const deleteBranch = (branchId: string) => {
    const branch = branches.find(b => b.id === branchId);
    if (branch && branch.name !== 'main') {
      setBranches(prev => prev.filter(b => b.id !== branchId));
      addAction('delete', `Suppression de la branche "${branch.name}"`);
    }
  };

  const addAction = (type: SandboxAction['type'], description: string) => {
    const newAction: SandboxAction = {
      id: Date.now().toString(),
      type,
      description,
      timestamp: new Date()
    };
    setActions(prev => [newAction, ...prev.slice(0, 9)]); // Garder les 10 dernières actions
  };

  const resetSandbox = () => {
    setBranches([
      {
        id: 'main',
        name: 'main',
        commits: [
          { id: 'c1', message: 'Commit initial', timestamp: new Date('2024-01-15T10:00:00') }
        ],
        color: '#3b82f6',
        merged: false
      }
    ]);
    setActions([]);
  };

  const openModal = (type: 'branch' | 'commit' | 'merge') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const renderBranchVisualization = () => (
    <div className="bg-gray-900/50 rounded-lg p-6 min-h-[300px]">
      <svg width="100%" height="300" viewBox="0 0 800 300">
        {branches.map((branch, index) => {
          const y = 50 + index * 40;
          const commits = branch.commits;
          
          return (
            <g key={branch.id}>
              {/* Ligne de branche */}
              <line
                x1={50}
                y1={y}
                x2={50 + commits.length * 60}
                y2={y}
                stroke={branch.color}
                strokeWidth="3"
                opacity={branch.merged ? 0.5 : 1}
              />
              
              {/* Nom de branche */}
              <text
                x={20}
                y={y + 5}
                className="fill-white text-sm font-medium"
                textAnchor="end"
              >
                {branch.name}
              </text>
              
              {/* Commits */}
              {commits.map((commit, commitIndex) => (
                <motion.g
                  key={commit.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: commitIndex * 0.1 }}
                >
                  <circle
                    cx={50 + commitIndex * 60}
                    cy={y}
                    r="8"
                    fill={branch.color}
                    stroke="#1f2937"
                    strokeWidth="2"
                  />
                  <text
                    x={50 + commitIndex * 60}
                    y={y + 25}
                    className="fill-gray-300 text-xs"
                    textAnchor="middle"
                  >
                    {commit.message.split(' ')[0]}
                  </text>
                </motion.g>
              ))}
              
              {/* Indicateur de fusion */}
              {branch.merged && (
                <text
                  x={50 + commits.length * 60 + 20}
                  y={y + 5}
                  className="fill-purple-400 text-xs"
                >
                  (fusionnée)
                </text>
              )}
            </g>
          );
        })}
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
        <h2 className="text-2xl font-bold text-white mb-2">Bac à Sable de Branches</h2>
        <p className="text-gray-300">Expérimentez avec les branches Git en toute sécurité</p>
      </motion.div>

      {/* Contrôles */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <Button onClick={() => openModal('branch')}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Branche
            </Button>
            <Button onClick={() => openModal('commit')} variant="secondary">
              <GitBranch className="h-4 w-4 mr-2" />
              Nouveau Commit
            </Button>
            <Button onClick={() => openModal('merge')} variant="outline">
              <GitMerge className="h-4 w-4 mr-2" />
              Fusionner
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" onClick={resetSandbox}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
            <Button variant="ghost">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Visualisation */}
        <div className="lg:col-span-2">
          <Card
            header={
              <h3 className="font-semibold text-white">Visualisation des Branches</h3>
            }
          >
            {renderBranchVisualization()}
          </Card>
        </div>

        {/* Panneau latéral */}
        <div className="space-y-4">
          {/* Liste des branches */}
          <Card
            header={
              <h3 className="font-semibold text-white">Branches ({branches.length})</h3>
            }
          >
            <div className="space-y-2">
              {branches.map((branch) => (
                <div
                  key={branch.id}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    selectedBranch === branch.id
                      ? 'bg-blue-900/20 border-blue-500/50'
                      : 'border-gray-600 hover:bg-gray-700/30'
                  }`}
                >
                  <button
                    onClick={() => setSelectedBranch(branch.id)}
                    className="flex items-center space-x-3 flex-1 text-left"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: branch.color }}
                    />
                    <div>
                      <div className="font-medium text-white">{branch.name}</div>
                      <div className="text-xs text-gray-400">
                        {branch.commits.length} commits
                      </div>
                    </div>
                  </button>
                  {branch.name !== 'main' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteBranch(branch.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Historique des actions */}
          <Card
            header={
              <h3 className="font-semibold text-white">Historique</h3>
            }
          >
            <div className="space-y-2 max-h-48 overflow-y-auto">
              <AnimatePresence>
                {actions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="text-xs p-2 bg-gray-700/30 rounded"
                  >
                    <div className="text-gray-300">{action.description}</div>
                    <div className="text-gray-500">
                      {action.timestamp.toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {actions.length === 0 && (
                <div className="text-center text-gray-400 py-4">
                  Aucune action effectuée
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === 'branch' ? 'Créer une Branche' :
          modalType === 'commit' ? 'Nouveau Commit' :
          'Fusionner une Branche'
        }
      >
        <div className="space-y-4">
          {modalType === 'branch' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom de la branche
                </label>
                <input
                  type="text"
                  value={newBranchName}
                  onChange={(e) => setNewBranchName(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="feature/nouvelle-fonctionnalite"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Branche source
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              <Button onClick={createBranch} className="w-full">
                Créer la Branche
              </Button>
            </>
          )}

          {modalType === 'commit' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Branche cible
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message du commit
                </label>
                <input
                  type="text"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  placeholder="Ajouter une nouvelle fonctionnalité"
                />
              </div>
              <Button onClick={addCommit} className="w-full">
                Créer le Commit
              </Button>
            </>
          )}

          {modalType === 'merge' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Branche à fusionner
                </label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  {branches.filter(b => b.name !== 'main' && !b.merged).map(branch => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm text-gray-400">
                Cette branche sera fusionnée dans la branche main.
              </div>
              <Button onClick={mergeBranch} className="w-full">
                Fusionner
              </Button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default BranchSandbox;