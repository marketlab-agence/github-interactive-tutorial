import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Plus, Minus, ArrowRight, FolderOpen, Eye } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface FileStatus {
  name: string;
  status: 'untracked' | 'modified' | 'staged' | 'committed';
  changes: {
    added: number;
    removed: number;
  };
}

const StagingAreaVisualizer: React.FC = () => {
  const [files, setFiles] = useState<FileStatus[]>([
    { name: 'README.md', status: 'modified', changes: { added: 3, removed: 1 } },
    { name: 'src/app.js', status: 'modified', changes: { added: 15, removed: 5 } },
    { name: 'package.json', status: 'modified', changes: { added: 2, removed: 0 } },
    { name: 'styles.css', status: 'untracked', changes: { added: 25, removed: 0 } },
    { name: 'config.json', status: 'untracked', changes: { added: 8, removed: 0 } }
  ]);

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'untracked': return 'text-red-400';
      case 'modified': return 'text-yellow-400';
      case 'staged': return 'text-green-400';
      case 'committed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'untracked': return '?';
      case 'modified': return 'M';
      case 'staged': return 'A';
      case 'committed': return '✓';
      default: return '';
    }
  };

  const stageFile = (fileName: string) => {
    setFiles(prev => prev.map(file => 
      file.name === fileName 
        ? { ...file, status: 'staged' as const }
        : file
    ));
  };

  const unstageFile = (fileName: string) => {
    setFiles(prev => prev.map(file => 
      file.name === fileName 
        ? { ...file, status: file.name.includes('.') ? 'modified' as const : 'untracked' as const }
        : file
    ));
  };

  const stageSelected = () => {
    selectedFiles.forEach(fileName => stageFile(fileName));
    setSelectedFiles([]);
  };

  const commitStaged = () => {
    setFiles(prev => prev.map(file => 
      file.status === 'staged' 
        ? { ...file, status: 'committed' as const }
        : file
    ));
  };

  const toggleFileSelection = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName)
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  const getAreaFiles = (status: FileStatus['status']) => {
    return files.filter(file => file.status === status);
  };

  const renderFileList = (title: string, files: FileStatus[], areaType: string) => (
    <Card
      header={
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">{title}</h3>
          <span className="text-sm text-gray-400">({files.length})</span>
        </div>
      }
    >
      <div className="space-y-2 min-h-[200px]">
        <AnimatePresence>
          {files.map((file, index) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                selectedFiles.includes(file.name)
                  ? 'bg-blue-900/20 border-blue-500/50'
                  : 'border-gray-600 hover:bg-gray-700/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.name)}
                  onChange={() => toggleFileSelection(file.name)}
                  className="text-blue-500"
                />
                <FileText className="h-4 w-4 text-gray-400" />
                <div>
                  <div className="font-mono text-sm text-white">{file.name}</div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className={getStatusColor(file.status)}>
                      {getStatusIcon(file.status)} {file.status}
                    </span>
                    <span className="text-green-400">+{file.changes.added}</span>
                    <span className="text-red-400">-{file.changes.removed}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {areaType === 'working' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => stageFile(file.name)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                )}
                {areaType === 'staging' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => unstageFile(file.name)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                )}
                <Button size="sm" variant="ghost">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {files.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <FolderOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Aucun fichier dans cette zone</p>
          </div>
        )}
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
        <h2 className="text-2xl font-bold text-white mb-2">Visualiseur de Zone de Staging</h2>
        <p className="text-gray-300">Comprenez le flux des fichiers dans Git</p>
      </motion.div>

      {/* Actions rapides */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Actions rapides :</span>
            <Button
              size="sm"
              onClick={stageSelected}
              disabled={selectedFiles.length === 0}
            >
              <Plus className="h-4 w-4 mr-2" />
              Stager Sélectionnés ({selectedFiles.length})
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={commitStaged}
              disabled={getAreaFiles('staged').length === 0}
            >
              Commiter Stagés ({getAreaFiles('staged').length})
            </Button>
          </div>
          <div className="text-sm text-gray-400">
            Total: {files.reduce((sum, f) => sum + f.changes.added + f.changes.removed, 0)} changements
          </div>
        </div>
      </Card>

      {/* Zones Git */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Répertoire de travail */}
        <div className="space-y-4">
          {renderFileList(
            'Répertoire de Travail',
            [...getAreaFiles('untracked'), ...getAreaFiles('modified')],
            'working'
          )}
          <div className="text-center">
            <ArrowRight className="h-6 w-6 text-gray-400 mx-auto" />
            <span className="text-xs text-gray-400">git add</span>
          </div>
        </div>

        {/* Zone de staging */}
        <div className="space-y-4">
          {renderFileList(
            'Zone de Staging',
            getAreaFiles('staged'),
            'staging'
          )}
          <div className="text-center">
            <ArrowRight className="h-6 w-6 text-gray-400 mx-auto" />
            <span className="text-xs text-gray-400">git commit</span>
          </div>
        </div>

        {/* Dépôt */}
        <div>
          {renderFileList(
            'Dépôt Git',
            getAreaFiles('committed'),
            'repository'
          )}
        </div>
      </div>

      {/* Légende */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Légende des Statuts</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { status: 'untracked', label: 'Non suivi', description: 'Nouveau fichier non ajouté à Git' },
            { status: 'modified', label: 'Modifié', description: 'Fichier existant avec des changements' },
            { status: 'staged', label: 'Stagé', description: 'Prêt à être commité' },
            { status: 'committed', label: 'Commité', description: 'Sauvegardé dans le dépôt' }
          ].map((item, index) => (
            <motion.div
              key={item.status}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-3 bg-gray-700/30 rounded-lg"
            >
              <div className={`text-lg font-bold ${getStatusColor(item.status)}`}>
                {getStatusIcon(item.status)}
              </div>
              <div className="font-medium text-white text-sm">{item.label}</div>
              <div className="text-xs text-gray-400">{item.description}</div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StagingAreaVisualizer;