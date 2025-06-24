import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface WorkflowNode {
  id: string;
  type: 'branch' | 'commit' | 'merge' | 'deploy';
  title: string;
  description: string;
  position: { x: number; y: number };
  connections: string[];
  icon: React.ComponentType<any>;
  color: string;
}

interface FlowDiagramBuilderProps {
  nodes?: WorkflowNode[];
  onSave?: (nodes: WorkflowNode[]) => void;
  onComplete?: () => void;
  onExport?: (format: 'png' | 'svg' | 'json') => void;
  readOnly?: boolean;
}

export const FlowDiagramBuilder: React.FC<FlowDiagramBuilderProps> = ({
  onComplete,
  readOnly = false
}) => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'n1',
      type: 'branch',
      title: 'Create Feature Branch',
      description: 'Create a new branch from main',
      position: { x: 150, y: 100 },
      connections: ['n2'],
      icon: GitBranch,
      color: 'blue'
    },
    {
      id: 'n2',
      type: 'commit',
      title: 'Make Changes',
      description: 'Implement feature and commit changes',
      position: { x: 150, y: 200 },
      connections: ['n3'],
      icon: GitCommit,
      color: 'green'
    },
    {
      id: 'n3',
      type: 'merge',
      title: 'Merge to Main',
      description: 'Create PR and merge to main branch',
      position: { x: 150, y: 300 },
      connections: ['n4'],
      icon: GitMerge,
      color: 'purple'
    },
    {
      id: 'n4',
      type: 'deploy',
      title: 'Deploy',
      description: 'Deploy to production environment',
      position: { x: 150, y: 400 },
      connections: [],
      icon: Deploy,
      color: 'orange'
    }
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodeTypes = [
    { type: 'branch', label: 'Branch', icon: GitBranch, color: 'blue' },
    { type: 'commit', label: 'Commit', icon: GitCommit, color: 'green' },
    { type: 'merge', label: 'Merge', icon: GitMerge, color: 'purple' },
    { type: 'deploy', label: 'Deploy', icon: Deploy, color: 'orange' }
  ];

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'branch': return 'text-blue-400 border-blue-400';
      case 'commit': return 'text-green-400 border-green-400';
      case 'merge': return 'text-purple-400 border-purple-400';
      case 'deploy': return 'text-orange-400 border-orange-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const handleComplete = () => {
    if (onComplete) onComplete();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">
          Git Workflow Designer
        </h1>
        <p className="text-gray-300 mb-4">
          Create and visualize custom Git workflows for your team
        </p>
      </div>

      {/* Main diagram */}
      <Card className="overflow-hidden">
        <div className="relative h-96 bg-gray-900/50 rounded-lg">
          <svg width="100%" height="100%" viewBox="0 0 800 600">
            {/* Connections */}
            {nodes.map(node => 
              node.connections.map(targetId => {
                const target = nodes.find(n => n.id === targetId);
                if (!target) return null;
                
                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={node.position.x}
                    y1={node.position.y}
                    x2={target.position.x}
                    y2={target.position.y}
                    stroke="#4b5563"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                );
              })
            )}
            
            {/* Nodes */}
            {nodes.map(node => {
              const isSelected = selectedNode === node.id;
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(isSelected ? null : node.id)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r="30"
                    className={`fill-gray-800 stroke-2 ${getNodeColor(node.type)} ${
                      isSelected ? 'stroke-[3px]' : 'stroke-[1px]'
                    }`}
                  />
                  <foreignObject
                    x={node.position.x - 12}
                    y={node.position.y - 12}
                    width="24"
                    height="24"
                  >
                    <node.icon className={`h-6 w-6 ${getNodeColor(node.type).split(' ')[0]}`} />
                  </foreignObject>
                  
                  <text
                    x={node.position.x}
                    y={node.position.y + 50}
                    textAnchor="middle"
                    className="fill-white text-xs"
                  >
                    {node.title}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </Card>

      {/* Node details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Selected node details */}
        <Card className="p-4">
          <h3 className="font-semibold text-white mb-4">Node Details</h3>
          {selectedNode ? (
            (() => {
              const node = nodes.find(n => n.id === selectedNode);
              if (!node) return <div className="text-gray-400">Node not found</div>;
              
              return (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-white font-medium">{node.title}</h4>
                    <p className="text-gray-300 text-sm">{node.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={getNodeColor(node.type)}>
                      {node.type}
                    </Badge>
                    <span className="text-gray-400 text-sm">
                      {node.connections.length} connections
                    </span>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="text-gray-400 text-center py-4">
              Select a node to view details
            </div>
          )}
        </Card>

        {/* Workflow info */}
        <Card className="p-4">
          <h3 className="font-semibold text-white mb-4">Workflow Information</h3>
          <div className="space-y-4">
            <p className="text-gray-300">
              This diagram represents a basic GitHub Flow workflow:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300">
              <li>Create a feature branch from main</li>
              <li>Make commits to implement your feature</li>
              <li>Open a pull request and merge to main after review</li>
              <li>Deploy the changes to production</li>
            </ol>
          </div>
        </Card>
      </div>

      {/* Legend */}
      <Card className="p-4">
        <h3 className="font-semibold text-white mb-4">Workflow Elements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {nodeTypes.map(type => (
            <div key={type.type} className="flex items-center space-x-3">
              <type.icon className={type.color === 'blue' ? 'text-blue-400' : 
                             type.color === 'green' ? 'text-green-400' : 
                             type.color === 'purple' ? 'text-purple-400' : 
                             'text-orange-400'} />
              <div>
                <div className="font-medium text-white">{type.label}</div>
                <div className="text-xs text-gray-400">
                  {type.type === 'branch' ? 'Create or manage branches' :
                   type.type === 'commit' ? 'Record changes to files' :
                   type.type === 'merge' ? 'Combine branch changes' :
                   'Deploy to an environment'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Completion button */}
      <Card className="p-4 bg-green-900/20 border-green-500/30">
        <div className="text-center">
          <h3 className="font-semibold text-green-300 mb-2">
            Ready to continue?
          </h3>
          <p className="text-gray-300 mb-4">
            Now that you understand Git workflow visualization, continue with the tutorial to learn more.
          </p>
          <Button onClick={handleComplete}>
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Helper icon components
const GitBranch: React.FC<{ className?: string }> = (props) => (
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
    <line x1="6" y1="3" x2="6" y2="15"></line>
    <circle cx="18" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <path d="M18 9a9 9 0 0 1-9 9"></path>
  </svg>
);

const GitCommit: React.FC<{ className?: string }> = (props) => (
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
    <circle cx="12" cy="12" r="3"></circle>
    <line x1="3" y1="12" x2="9" y2="12"></line>
    <line x1="15" y1="12" x2="21" y2="12"></line>
  </svg>
);

const GitMerge: React.FC<{ className?: string }> = (props) => (
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
    <circle cx="18" cy="18" r="3"></circle>
    <circle cx="6" cy="6" r="3"></circle>
    <path d="M6 21V9a9 9 0 0 0 9 9"></path>
  </svg>
);

const Deploy: React.FC<{ className?: string }> = (props) => (
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
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
  </svg>
);

export default FlowDiagramBuilder;