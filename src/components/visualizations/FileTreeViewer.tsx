import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, File, FolderOpen, ChevronRight, ChevronDown, Plus, Trash2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  size?: number;
  modified?: string;
  status?: 'added' | 'modified' | 'deleted' | 'untracked';
}

interface FileTreeViewerProps {
  initialTree?: FileNode[];
  showStatus?: boolean;
  editable?: boolean;
}

const FileTreeViewer: React.FC<FileTreeViewerProps> = ({
  initialTree = [
    {
      id: '1',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: '2',
          name: 'components',
          type: 'folder',
          children: [
            { id: '3', name: 'Header.tsx', type: 'file', size: 1024, modified: '2024-01-17', status: 'modified' },
            { id: '4', name: 'Footer.tsx', type: 'file', size: 512, modified: '2024-01-16', status: 'untracked' }
          ]
        },
        {
          id: '5',
          name: 'utils',
          type: 'folder',
          children: [
            { id: '6', name: 'helpers.ts', type: 'file', size: 256, modified: '2024-01-17', status: 'added' }
          ]
        },
        { id: '7', name: 'App.tsx', type: 'file', size: 2048, modified: '2024-01-15' }
      ]
    },
    {
      id: '8',
      name: 'public',
      type: 'folder',
      children: [
        { id: '9', name: 'index.html', type: 'file', size: 1536, modified: '2024-01-10' },
        { id: '10', name: 'favicon.ico', type: 'file', size: 128, modified: '2024-01-10' }
      ]
    },
    { id: '11', name: 'package.json', type: 'file', size: 512, modified: '2024-01-16', status: 'modified' },
    { id: '12', name: 'README.md', type: 'file', size: 1024, modified: '2024-01-12' }
  ],
  showStatus = true,
  editable = false
}) => {
  const [tree, setTree] = useState<FileNode[]>(initialTree);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1', '2', '5', '8']));
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const toggleExpanded = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'added': return 'text-green-400';
      case 'modified': return 'text-yellow-400';
      case 'deleted': return 'text-red-400';
      case 'untracked': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusSymbol = (status?: string) => {
    switch (status) {
      case 'added': return 'A';
      case 'modified': return 'M';
      case 'deleted': return 'D';
      case 'untracked': return '?';
      default: return '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const renderNode = (node: FileNode, depth = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNode === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-blue-900/20 border border-blue-500/30' : 'hover:bg-gray-700/30'
          }`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
          onClick={() => {
            setSelectedNode(node.id);
            if (node.type === 'folder') {
              toggleExpanded(node.id);
            }
          }}
        >
          {/* Icône d'expansion/réduction */}
          {node.type === 'folder' && hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(node.id);
              }}
              className="p-1 hover:bg-gray-600 rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-gray-400" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-400" />
              )}
            </button>
          )}

          {/* Icône de fichier/dossier */}
          <div className="flex-shrink-0">
            {node.type === 'folder' ? (
              isExpanded ? (
                <FolderOpen className="h-4 w-4 text-blue-400" />
              ) : (
                <Folder className="h-4 w-4 text-blue-400" />
              )
            ) : (
              <File className="h-4 w-4 text-gray-400" />
            )}
          </div>

          {/* Nom */}
          <span className="flex-1 text-sm text-white truncate">{node.name}</span>

          {/* Statut */}
          {showStatus && node.status && (
            <span className={`text-xs font-mono ${getStatusColor(node.status)}`}>
              {getStatusSymbol(node.status)}
            </span>
          )}

          {/* Taille du fichier */}
          {node.type === 'file' && node.size && (
            <span className="text-xs text-gray-500">
              {formatFileSize(node.size)}
            </span>
          )}

          {/* Actions */}
          {editable && isSelected && (
            <div className="flex space-x-1">
              <Button size="sm" variant="ghost">
                <Plus className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </motion.div>

        {/* Enfants */}
        <AnimatePresence>
          {node.type === 'folder' && isExpanded && hasChildren && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {node.children!.map(child => renderNode(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const getTotalFiles = (nodes: FileNode[]): number => {
    return nodes.reduce((count, node) => {
      if (node.type === 'file') return count + 1;
      if (node.children) return count + getTotalFiles(node.children);
      return count;
    }, 0);
  };

  const getTotalSize = (nodes: FileNode[]): number => {
    return nodes.reduce((size, node) => {
      if (node.type === 'file' && node.size) return size + node.size;
      if (node.children) return size + getTotalSize(node.children);
      return size;
    }, 0);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Explorateur de Fichiers</h2>
        <p className="text-gray-300">Naviguez dans l'arborescence de votre projet</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Arborescence de fichiers */}
        <div className="lg:col-span-2">
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Structure du Projet</h3>
                {editable && (
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouveau
                  </Button>
                )}
              </div>
            }
          >
            <div className="max-h-96 overflow-y-auto">
              {tree.map(node => renderNode(node))}
            </div>
          </Card>
        </div>

        {/* Informations sur les fichiers */}
        <Card
          header={
            <h3 className="font-semibold text-white">Informations</h3>
          }
        >
          <div className="space-y-4">
            {/* Statistiques du projet */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total fichiers :</span>
                <span className="text-white">{getTotalFiles(tree)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Taille totale :</span>
                <span className="text-white">{formatFileSize(getTotalSize(tree))}</span>
              </div>
            </div>

            {/* Légende des statuts */}
            {showStatus && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-300">Légende des statuts</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-mono">A</span>
                    <span className="text-gray-400">Ajouté</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 font-mono">M</span>
                    <span className="text-gray-400">Modifié</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-400 font-mono">D</span>
                    <span className="text-gray-400">Supprimé</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400 font-mono">?</span>
                    <span className="text-gray-400">Non suivi</span>
                  </div>
                </div>
              </div>
            )}

            {/* Informations sur le fichier sélectionné */}
            {selectedNode && (
              <div className="space-y-2 pt-4 border-t border-gray-700">
                <h4 className="text-sm font-medium text-gray-300">Fichier sélectionné</h4>
                {(() => {
                  const findNode = (nodes: FileNode[], id: string): FileNode | null => {
                    for (const node of nodes) {
                      if (node.id === id) return node;
                      if (node.children) {
                        const found = findNode(node.children, id);
                        if (found) return found;
                      }
                    }
                    return null;
                  };
                  
                  const node = findNode(tree, selectedNode);
                  if (!node) return null;
                  
                  return (
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Nom :</span>
                        <span className="text-white">{node.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type :</span>
                        <span className="text-white">{node.type === 'file' ? 'Fichier' : 'Dossier'}</span>
                      </div>
                      {node.size && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Taille :</span>
                          <span className="text-white">{formatFileSize(node.size)}</span>
                        </div>
                      )}
                      {node.modified && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Modifié :</span>
                          <span className="text-white">{node.modified}</span>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FileTreeViewer;