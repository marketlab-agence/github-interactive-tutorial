import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Minus, Eye, EyeOff } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Tabs from '../ui/Tabs';

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged' | 'context';
  content: string;
  lineNumber: {
    old?: number;
    new?: number;
  };
}

interface FileDiff {
  filename: string;
  status: 'modified' | 'added' | 'deleted' | 'renamed';
  additions: number;
  deletions: number;
  lines: DiffLine[];
}

const DiffViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState(0);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');

  const mockDiffs: FileDiff[] = [
    {
      filename: 'src/components/Header.tsx',
      status: 'modified',
      additions: 12,
      deletions: 3,
      lines: [
        { type: 'context', content: 'import React from "react";', lineNumber: { old: 1, new: 1 } },
        { type: 'context', content: 'import { Menu } from "lucide-react";', lineNumber: { old: 2, new: 2 } },
        { type: 'context', content: '', lineNumber: { old: 3, new: 3 } },
        { type: 'removed', content: 'const Header = () => {', lineNumber: { old: 4 } },
        { type: 'added', content: 'interface HeaderProps {', lineNumber: { new: 4 } },
        { type: 'added', content: '  title: string;', lineNumber: { new: 5 } },
        { type: 'added', content: '  showMenu?: boolean;', lineNumber: { new: 6 } },
        { type: 'added', content: '}', lineNumber: { new: 7 } },
        { type: 'added', content: '', lineNumber: { new: 8 } },
        { type: 'added', content: 'const Header: React.FC<HeaderProps> = ({ title, showMenu = true }) => {', lineNumber: { new: 9 } },
        { type: 'context', content: '  return (', lineNumber: { old: 5, new: 10 } },
        { type: 'context', content: '    <header className="bg-gray-800 text-white p-4">', lineNumber: { old: 6, new: 11 } },
        { type: 'removed', content: '      <h1>Mon Application</h1>', lineNumber: { old: 7 } },
        { type: 'added', content: '      <h1>{title}</h1>', lineNumber: { new: 12 } },
        { type: 'removed', content: '      <Menu className="h-6 w-6" />', lineNumber: { old: 8 } },
        { type: 'added', content: '      {showMenu && <Menu className="h-6 w-6" />}', lineNumber: { new: 13 } },
        { type: 'context', content: '    </header>', lineNumber: { old: 9, new: 14 } },
        { type: 'context', content: '  );', lineNumber: { old: 10, new: 15 } },
        { type: 'context', content: '};', lineNumber: { old: 11, new: 16 } }
      ]
    },
    {
      filename: 'src/utils/helpers.ts',
      status: 'added',
      additions: 8,
      deletions: 0,
      lines: [
        { type: 'added', content: 'export const formatDate = (date: Date): string => {', lineNumber: { new: 1 } },
        { type: 'added', content: '  return date.toLocaleDateString("fr-FR");', lineNumber: { new: 2 } },
        { type: 'added', content: '};', lineNumber: { new: 3 } },
        { type: 'added', content: '', lineNumber: { new: 4 } },
        { type: 'added', content: 'export const capitalize = (str: string): string => {', lineNumber: { new: 5 } },
        { type: 'added', content: '  return str.charAt(0).toUpperCase() + str.slice(1);', lineNumber: { new: 6 } },
        { type: 'added', content: '};', lineNumber: { new: 7 } }
      ]
    }
  ];

  const getLineTypeColor = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-900/30 border-l-4 border-green-500';
      case 'removed': return 'bg-red-900/30 border-l-4 border-red-500';
      case 'context': return 'bg-gray-800/20';
      default: return '';
    }
  };

  const getLineTypeSymbol = (type: string) => {
    switch (type) {
      case 'added': return '+';
      case 'removed': return '-';
      default: return ' ';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'added': return 'text-green-400';
      case 'deleted': return 'text-red-400';
      case 'modified': return 'text-yellow-400';
      case 'renamed': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const renderUnifiedDiff = (diff: FileDiff) => (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm text-white">{diff.filename}</span>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-green-400">+{diff.additions}</span>
            <span className="text-red-400">-{diff.deletions}</span>
          </div>
        </div>
      </div>
      
      <div className="font-mono text-sm">
        {diff.lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.02 }}
            className={`flex ${getLineTypeColor(line.type)}`}
          >
            {showLineNumbers && (
              <div className="flex bg-gray-800/50 text-gray-500 text-xs">
                <div className="w-12 px-2 py-1 text-right border-r border-gray-700">
                  {line.lineNumber.old || ''}
                </div>
                <div className="w-12 px-2 py-1 text-right border-r border-gray-700">
                  {line.lineNumber.new || ''}
                </div>
              </div>
            )}
            <div className="flex-1 flex">
              <div className="w-4 px-1 py-1 text-center text-xs text-gray-500">
                {getLineTypeSymbol(line.type)}
              </div>
              <div className="flex-1 px-2 py-1 text-gray-100">
                {line.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const tabs = [
    {
      id: 'files',
      label: 'Fichiers modifiés',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              Fichiers modifiés ({mockDiffs.length})
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant={showLineNumbers ? 'primary' : 'ghost'}
                onClick={() => setShowLineNumbers(!showLineNumbers)}
              >
                {showLineNumbers ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {/* File List */}
            <div className="space-y-2">
              {mockDiffs.map((diff, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFile(index)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedFile === index
                      ? 'bg-blue-900/20 border-blue-500/50'
                      : 'border-gray-600 hover:bg-gray-700/30'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <FileText className={`h-4 w-4 ${getStatusColor(diff.status)}`} />
                    <span className="font-mono text-sm text-white truncate">
                      {diff.filename.split('/').pop()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-green-400">+{diff.additions}</span>
                    <span className="text-red-400">-{diff.deletions}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Diff Content */}
            <div className="md:col-span-3">
              {renderUnifiedDiff(mockDiffs[selectedFile])}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'stats',
      label: 'Statistiques',
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Statistiques des changements</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {mockDiffs.reduce((sum, diff) => sum + diff.additions, 0)}
                </div>
                <div className="text-sm text-gray-400">Lignes ajoutées</div>
              </div>
            </Card>
            
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  {mockDiffs.reduce((sum, diff) => sum + diff.deletions, 0)}
                </div>
                <div className="text-sm text-gray-400">Lignes supprimées</div>
              </div>
            </Card>
            
            <Card>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{mockDiffs.length}</div>
                <div className="text-sm text-gray-400">Fichiers modifiés</div>
              </div>
            </Card>
          </div>

          <Card>
            <h4 className="font-medium text-white mb-4">Répartition par type de fichier</h4>
            <div className="space-y-3">
              {mockDiffs.map((diff, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-mono text-sm text-gray-300">{diff.filename}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ 
                          width: `${(diff.additions / (diff.additions + diff.deletions)) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-16">
                      {Math.round((diff.additions / (diff.additions + diff.deletions)) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Visualiseur de Différences</h2>
        <p className="text-gray-300">Examinez les changements dans vos fichiers</p>
      </motion.div>

      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default DiffViewer;