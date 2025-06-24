import React, { useState, useCallback } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface FlowNode {
  id: string;
  type: 'start' | 'action' | 'decision' | 'end';
  label: string;
  x: number;
  y: number;
  connections: string[];
}

interface FlowDiagramBuilderProps {
  initialNodes?: FlowNode[];
  onSave?: (nodes: FlowNode[]) => void;
  onExport?: (format: 'png' | 'svg' | 'json') => void;
  readOnly?: boolean;
}

const defaultNodes: FlowNode[] = [
  {
    id: 'start',
    type: 'start',
    label: 'Début du workflow',
    x: 100,
    y: 50,
    connections: ['feature-branch']
  },
  {
    id: 'feature-branch',
    type: 'action',
    label: 'Créer branche feature',
    x: 100,
    y: 150,
    connections: ['develop']
  },
  {
    id: 'develop',
    type: 'action',
    label: 'Développer fonctionnalité',
    x: 100,
    y: 250,
    connections: ['test']
  },
  {
    id: 'test',
    type: 'decision',
    label: 'Tests passent ?',
    x: 100,
    y: 350,
    connections: ['pr', 'fix']
  },
  {
    id: 'fix',
    type: 'action',
    label: 'Corriger bugs',
    x: 300,
    y: 350,
    connections: ['test']
  },
  {
    id: 'pr',
    type: 'action',
    label: 'Créer Pull Request',
    x: 100,
    y: 450,
    connections: ['review']
  },
  {
    id: 'review',
    type: 'decision',
    label: 'Code review OK ?',
    x: 100,
    y: 550,
    connections: ['merge', 'changes']
  },
  {
    id: 'changes',
    type: 'action',
    label: 'Apporter modifications',
    x: 300,
    y: 550,
    connections: ['review']
  },
  {
    id: 'merge',
    type: 'action',
    label: 'Merger dans main',
    x: 100,
    y: 650,
    connections: ['deploy']
  },
  {
    id: 'deploy',
    type: 'action',
    label: 'Déployer',
    x: 100,
    y: 750,
    connections: ['end']
  },
  {
    id: 'end',
    type: 'end',
    label: 'Fin du workflow',
    x: 100,
    y: 850,
    connections: []
  }
];

export const FlowDiagramBuilder: React.FC<FlowDiagramBuilderProps> = ({
  initialNodes = defaultNodes,
  onSave,
  onExport,
  readOnly = false
}) => {
  const [nodes, setNodes] = useState<FlowNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const nodeTypes = [
    { type: 'start', label: 'Début', color: 'bg-green-500', icon: '▶️' },
    { type: 'action', label: 'Action', color: 'bg-blue-500', icon: '⚡' },
    { type: 'decision', label: 'Décision', color: 'bg-yellow-500', icon: '❓' },
    { type: 'end', label: 'Fin', color: 'bg-red-500', icon: '⏹️' }
  ];

  const templates = [
    {
      name: 'GitHub Flow',
      description: 'Workflow simple avec une branche principale',
      nodes: [
        { id: 'start', type: 'start', label: 'Début', x: 100, y: 50, connections: ['feature'] },
        { id: 'feature', type: 'action', label: 'Créer branche feature', x: 100, y: 150, connections: ['develop'] },
        { id: 'develop', type: 'action', label: 'Développer', x: 100, y: 250, connections: ['pr'] },
        { id: 'pr', type: 'action', label: 'Pull Request', x: 100, y: 350, connections: ['merge'] },
        { id: 'merge', type: 'action', label: 'Merger dans main', x: 100, y: 450, connections: ['deploy'] },
        { id: 'deploy', type: 'action', label: 'Déployer', x: 100, y: 550, connections: ['end'] },
        { id: 'end', type: 'end', label: 'Fin', x: 100, y: 650, connections: [] }
      ]
    },
    {
      name: 'Git Flow',
      description: 'Workflow complexe avec branches multiples',
      nodes: [
        { id: 'start', type: 'start', label: 'Début', x: 100, y: 50, connections: ['feature'] },
        { id: 'feature', type: 'action', label: 'Branche feature', x: 100, y: 150, connections: ['develop-merge'] },
        { id: 'develop-merge', type: 'action', label: 'Merger dans develop', x: 100, y: 250, connections: ['release'] },
        { id: 'release', type: 'action', label: 'Branche release', x: 100, y: 350, connections: ['test-release'] },
        { id: 'test-release', type: 'decision', label: 'Tests OK ?', x: 100, y: 450, connections: ['main-merge', 'hotfix'] },
        { id: 'hotfix', type: 'action', label: 'Hotfix', x: 300, y: 450, connections: ['test-release'] },
        { id: 'main-merge', type: 'action', label: 'Merger dans main', x: 100, y: 550, connections: ['tag'] },
        { id: 'tag', type: 'action', label: 'Créer tag', x: 100, y: 650, connections: ['end'] },
        { id: 'end', type: 'end', label: 'Fin', x: 100, y: 750, connections: [] }
      ]
    }
  ];

  const getNodeStyle = (node: FlowNode) => {
    const nodeType = nodeTypes.find(t => t.type === node.type);
    const isSelected = selectedNode === node.id;
    
    return {
      position: 'absolute' as const,
      left: node.x,
      top: node.y,
      transform: 'translate(-50%, -50%)',
      cursor: readOnly ? 'default' : 'move'
    };
  };

  const getNodeClass = (node: FlowNode) => {
    const nodeType = nodeTypes.find(t => t.type === node.type);
    const isSelected = selectedNode === node.id;
    
    let baseClass = 'px-4 py-2 rounded-lg border-2 text-white font-medium text-sm min-w-32 text-center transition-all duration-200';
    
    if (node.type === 'decision') {
      baseClass += ' transform rotate-45';
    }
    
    if (isSelected) {
      baseClass += ' ring-4 ring-blue-300 scale-110';
    }
    
    return `${baseClass} ${nodeType?.color || 'bg-gray-500'}`;
  };

  const handleNodeClick = (nodeId: string) => {
    if (readOnly) return;
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handleAddNode = (type: FlowNode['type']) => {
    if (readOnly) return;
    
    const newNode: FlowNode = {
      id: `node-${Date.now()}`,
      type,
      label: newNodeLabel || `Nouveau ${type}`,
      x: 200 + Math.random() * 200,
      y: 200 + Math.random() * 200,
      connections: []
    };
    
    setNodes([...nodes, newNode]);
    setNewNodeLabel('');
    setIsEditing(false);
  };

  const handleDeleteNode = (nodeId: string) => {
    if (readOnly) return;
    
    setNodes(nodes.filter(n => n.id !== nodeId));
    // Supprimer les connexions vers ce nœud
    setNodes(prev => prev.map(node => ({
      ...node,
      connections: node.connections.filter(conn => conn !== nodeId)
    })));
    setSelectedNode(null);
  };

  const handleLoadTemplate = (template: typeof templates[0]) => {
    if (readOnly) return;
    setNodes(template.nodes as FlowNode[]);
    setShowTemplates(false);
  };

  const handleSave = () => {
    onSave?.(nodes);
  };

  const handleExport = (format: 'png' | 'svg' | 'json') => {
    onExport?.(format);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Constructeur de Diagramme de Workflow
          </h1>
          <p className="text-gray-600">
            Créez et personnalisez vos workflows Git visuellement
          </p>
        </div>
        
        <div className="flex space-x-2">
          {!readOnly && (
            <>
              <Button
                variant="secondary"
                onClick={() => setShowTemplates(true)}
              >
                📋 Templates
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
              >
                ➕ Ajouter nœud
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
              >
                💾 Sauvegarder
              </Button>
            </>
          )}
          <Button
            variant="secondary"
            onClick={() => handleExport('json')}
          >
            📤 Exporter
          </Button>
        </div>
      </div>

      {/* Barre d'outils */}
      {!readOnly && (
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Types de nœuds:</span>
            {nodeTypes.map((type) => (
              <Badge
                key={type.type}
                variant="secondary"
                className={`cursor-pointer hover:scale-105 transition-transform ${type.color} text-white`}
                onClick={() => {
                  setNewNodeLabel(`Nouveau ${type.label}`);
                  setIsEditing(true);
                }}
              >
                {type.icon} {type.label}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Zone de construction du diagramme */}
      <Card className="relative overflow-hidden" style={{ minHeight: '600px' }}>
        <div className="absolute inset-0 bg-gray-50">
          {/* Grille de fond */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #666 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Connexions entre nœuds */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {nodes.map(node => 
              node.connections.map(connId => {
                const targetNode = nodes.find(n => n.id === connId);
                if (!targetNode) return null;
                
                return (
                  <line
                    key={`${node.id}-${connId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke="#3B82F6"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })
            )}
            
            {/* Définition de la flèche */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#3B82F6"
                />
              </marker>
            </defs>
          </svg>
          
          {/* Nœuds */}
          {nodes.map(node => {
            const nodeType = nodeTypes.find(t => t.type === node.type);
            return (
              <div
                key={node.id}
                style={getNodeStyle(node)}
                className={getNodeClass(node)}
                onClick={() => handleNodeClick(node.id)}
              >
                <div className={node.type === 'decision' ? 'transform -rotate-45' : ''}>
                  <div className="flex items-center justify-center space-x-1">
                    <span>{nodeType?.icon}</span>
                    <span className="text-xs">{node.label}</span>
                  </div>
                </div>
                
                {selectedNode === node.id && !readOnly && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNode(node.id);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Panneau d'informations */}
      {selectedNode && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">
                Nœud sélectionné: {nodes.find(n => n.id === selectedNode)?.label}
              </h3>
              <p className="text-sm text-gray-600">
                Type: {nodes.find(n => n.id === selectedNode)?.type}
              </p>
            </div>
            <div className="flex space-x-2">
              <Badge variant="secondary">
                Connexions: {nodes.find(n => n.id === selectedNode)?.connections.length || 0}
              </Badge>
            </div>
          </div>
        </Card>
      )}

      {/* Modal d'ajout de nœud */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Ajouter un nouveau nœud</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Libellé du nœud
                </label>
                <input
                  type="text"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Entrez le libellé..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de nœud
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {nodeTypes.map((type) => (
                    <Button
                      key={type.type}
                      variant="secondary"
                      onClick={() => handleAddNode(type.type as FlowNode['type'])}
                      className="flex items-center space-x-2"
                    >
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Modal des templates */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Choisir un template</h3>
            
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleLoadTemplate(template)}
                >
                  <h4 className="font-medium text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" size="sm">
                      {template.nodes.length} nœuds
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="secondary"
                onClick={() => setShowTemplates(false)}
              >
                Fermer
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FlowDiagramBuilder;
