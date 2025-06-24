import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import CodeBlock from '../ui/CodeBlock';

interface ConflictLine {
  lineNumber: number;
  content: string;
  type: 'current' | 'incoming' | 'base' | 'separator' | 'normal';
  branch?: string;
}

interface ConflictFile {
  filename: string;
  lines: ConflictLine[];
  resolved: boolean;
}

interface ConflictVisualizerProps {
  files?: ConflictFile[];
  onResolveConflict?: (filename: string, resolvedLines: ConflictLine[]) => void;
  onResolveAll?: () => void;
  showDiff?: boolean;
}

const defaultConflictFiles: ConflictFile[] = [
  {
    filename: 'src/components/Header.tsx',
    resolved: false,
    lines: [
      { lineNumber: 1, content: 'import React from \'react\';', type: 'normal' },
      { lineNumber: 2, content: 'import { Logo } from \'./Logo\';', type: 'normal' },
      { lineNumber: 3, content: '', type: 'normal' },
      { lineNumber: 4, content: 'const Header = () => {', type: 'normal' },
      { lineNumber: 5, content: '  return (', type: 'normal' },
      { lineNumber: 6, content: '    <header className="bg-blue-600 text-white p-4">', type: 'normal' },
      { lineNumber: 7, content: '<<<<<<< HEAD (current branch)', type: 'separator', branch: 'feature/new-design' },
      { lineNumber: 8, content: '      <div className="flex items-center justify-between">', type: 'current', branch: 'feature/new-design' },
      { lineNumber: 9, content: '        <Logo size="large" />', type: 'current', branch: 'feature/new-design' },
      { lineNumber: 10, content: '        <nav className="hidden md:flex space-x-4">', type: 'current', branch: 'feature/new-design' },
      { lineNumber: 11, content: '=======', type: 'separator' },
      { lineNumber: 12, content: '      <div className="container mx-auto flex justify-between">', type: 'incoming', branch: 'feature/navigation' },
      { lineNumber: 13, content: '        <Logo />', type: 'incoming', branch: 'feature/navigation' },
      { lineNumber: 14, content: '        <nav className="flex space-x-6">', type: 'incoming', branch: 'feature/navigation' },
      { lineNumber: 15, content: '>>>>>>> feature/navigation (incoming branch)', type: 'separator', branch: 'feature/navigation' },
      { lineNumber: 16, content: '          <a href="/home">Accueil</a>', type: 'normal' },
      { lineNumber: 17, content: '          <a href="/about">À propos</a>', type: 'normal' },
      { lineNumber: 18, content: '        </nav>', type: 'normal' },
      { lineNumber: 19, content: '      </div>', type: 'normal' },
      { lineNumber: 20, content: '    </header>', type: 'normal' },
      { lineNumber: 21, content: '  );', type: 'normal' },
      { lineNumber: 22, content: '};', type: 'normal' },
      { lineNumber: 23, content: '', type: 'normal' },
      { lineNumber: 24, content: 'export default Header;', type: 'normal' }
    ]
  },
  {
    filename: 'package.json',
    resolved: false,
    lines: [
      { lineNumber: 1, content: '{', type: 'normal' },
      { lineNumber: 2, content: '  "name": "mon-projet",', type: 'normal' },
      { lineNumber: 3, content: '<<<<<<< HEAD', type: 'separator' },
      { lineNumber: 4, content: '  "version": "1.2.0",', type: 'current', branch: 'main' },
      { lineNumber: 5, content: '=======', type: 'separator' },
      { lineNumber: 6, content: '  "version": "1.1.5",', type: 'incoming', branch: 'hotfix/security-patch' },
      { lineNumber: 7, content: '>>>>>>> hotfix/security-patch', type: 'separator' },
      { lineNumber: 8, content: '  "dependencies": {', type: 'normal' },
      { lineNumber: 9, content: '    "react": "^18.0.0"', type: 'normal' },
      { lineNumber: 10, content: '  }', type: 'normal' },
      { lineNumber: 11, content: '}', type: 'normal' }
    ]
  }
];

export const ConflictVisualizer: React.FC<ConflictVisualizerProps> = ({
  files = defaultConflictFiles,
  onResolveConflict,
  onResolveAll,
  showDiff = true
}) => {
  const [conflictFiles, setConflictFiles] = useState<ConflictFile[]>(files);
  const [activeFile, setActiveFile] = useState<string>(files[0]?.filename || '');
  const [resolutionMode, setResolutionMode] = useState<'manual' | 'current' | 'incoming'>('manual');
  const [selectedLines, setSelectedLines] = useState<Set<number>>(new Set());

  const getLineColor = (line: ConflictLine) => {
    switch (line.type) {
      case 'current':
        return 'bg-green-50 border-l-4 border-green-400';
      case 'incoming':
        return 'bg-blue-50 border-l-4 border-blue-400';
      case 'separator':
        return 'bg-red-50 border-l-4 border-red-400';
      case 'normal':
        return 'bg-white';
      default:
        return 'bg-gray-50';
    }
  };

  const getLineIcon = (line: ConflictLine) => {
    switch (line.type) {
      case 'current':
        return '🟢';
      case 'incoming':
        return '🔵';
      case 'separator':
        return '⚠️';
      case 'normal':
        return '';
      default:
        return '';
    }
  };

  const getCurrentFile = () => {
    return conflictFiles.find(file => file.filename === activeFile);
  };

  const getConflictBlocks = (lines: ConflictLine[]) => {
    const blocks = [];
    let currentBlock = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.content.startsWith('<<<<<<<')) {
        currentBlock = {
          start: i,
          currentLines: [],
          incomingLines: [],
          separatorIndex: -1,
          end: -1
        };
      } else if (line.content.startsWith('=======') && currentBlock) {
        currentBlock.separatorIndex = i;
      } else if (line.content.startsWith('>>>>>>>') && currentBlock) {
        currentBlock.end = i;
        blocks.push(currentBlock);
        currentBlock = null;
      } else if (currentBlock) {
        if (currentBlock.separatorIndex === -1) {
          currentBlock.currentLines.push(line);
        } else {
          currentBlock.incomingLines.push(line);
        }
      }
    }
    
    return blocks;
  };

  const resolveConflict = (resolution: 'current' | 'incoming' | 'both' | 'custom', customLines?: ConflictLine[]) => {
    const file = getCurrentFile();
    if (!file) return;

    const conflictBlocks = getConflictBlocks(file.lines);
    let resolvedLines = [...file.lines];

    // Résoudre les conflits en partant de la fin pour éviter les problèmes d'index
    for (let i = conflictBlocks.length - 1; i >= 0; i--) {
      const block = conflictBlocks[i];
      let replacementLines: ConflictLine[] = [];

      switch (resolution) {
        case 'current':
          replacementLines = block.currentLines.map(line => ({ ...line, type: 'normal' as const }));
          break;
        case 'incoming':
          replacementLines = block.incomingLines.map(line => ({ ...line, type: 'normal' as const }));
          break;
        case 'both':
          replacementLines = [
            ...block.currentLines.map(line => ({ ...line, type: 'normal' as const })),
            ...block.incomingLines.map(line => ({ ...line, type: 'normal' as const }))
          ];
          break;
        case 'custom':
          replacementLines = customLines || [];
          break;
      }

      // Remplacer le bloc de conflit par la résolution
      resolvedLines.splice(block.start, block.end - block.start + 1, ...replacementLines);
    }

    // Renuméroter les lignes
    resolvedLines = resolvedLines.map((line, index) => ({
      ...line,
      lineNumber: index + 1
    }));

    const updatedFiles = conflictFiles.map(f => 
      f.filename === activeFile 
        ? { ...f, lines: resolvedLines, resolved: true }
        : f
    );

    setConflictFiles(updatedFiles);
    onResolveConflict?.(activeFile, resolvedLines);
  };

  const toggleLineSelection = (lineNumber: number) => {
    const newSelection = new Set(selectedLines);
    if (newSelection.has(lineNumber)) {
      newSelection.delete(lineNumber);
    } else {
      newSelection.add(lineNumber);
    }
    setSelectedLines(newSelection);
  };

  const resolveAllConflicts = () => {
    const resolvedFiles = conflictFiles.map(file => ({
      ...file,
      resolved: true,
      lines: file.lines.filter(line => line.type !== 'separator').map(line => ({
        ...line,
        type: 'normal' as const
      }))
    }));
    
    setConflictFiles(resolvedFiles);
    onResolveAll?.();
  };

  const totalConflicts = conflictFiles.length;
  const resolvedConflicts = conflictFiles.filter(f => f.resolved).length;
  const progress = (resolvedConflicts / totalConflicts) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* En-tête */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Visualiseur de Conflits Git
        </h1>
        <p className="text-gray-600 mb-4">
          Résolvez les conflits de merge de manière interactive
        </p>
        
        {/* Barre de progression */}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>Progression</span>
            <span>{resolvedConflicts}/{totalConflicts} fichiers résolus</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sélecteur de fichiers */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Fichiers en conflit</h3>
          <Button
            variant="primary"
            onClick={resolveAllConflicts}
            disabled={resolvedConflicts === totalConflicts}
          >
            🔧 Résoudre tout automatiquement
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {conflictFiles.map((file) => (
            <button
              key={file.filename}
              onClick={() => setActiveFile(file.filename)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFile === file.filename
                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{file.filename}</span>
                {file.resolved ? (
                  <Badge variant="success" size="sm">✓</Badge>
                ) : (
                  <Badge variant="warning" size="sm">⚠</Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Contrôles de résolution */}
      {getCurrentFile() && !getCurrentFile()?.resolved && (
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Options de résolution</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => resolveConflict('current')}
              className="flex items-center space-x-2"
            >
              <span>🟢</span>
              <span>Garder la version actuelle</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => resolveConflict('incoming')}
              className="flex items-center space-x-2"
            >
              <span>🔵</span>
              <span>Garder la version entrante</span>
            </Button>
            <Button
              variant="secondary"
              onClick={() => resolveConflict('both')}
              className="flex items-center space-x-2"
            >
              <span>🔄</span>
              <span>Garder les deux</span>
            </Button>
          </div>
        </Card>
      )}

      {/* Visualisation du fichier */}
      {getCurrentFile() && (
        <Card className="overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
            <h3 className="font-medium text-gray-900">{getCurrentFile()?.filename}</h3>
            <div className="flex items-center space-x-2">
              {getCurrentFile()?.resolved ? (
                <Badge variant="success">Résolu</Badge>
              ) : (
                <Badge variant="warning">En conflit</Badge>
              )}
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            <div className="font-mono text-sm">
              {getCurrentFile()?.lines.map((line, index) => (
                <div
                  key={index}
                  className={`flex items-start hover:bg-gray-50 ${getLineColor(line)}`}
                  onClick={() => toggleLineSelection(line.lineNumber)}
                >
                  <div className="w-12 text-right text-gray-400 px-2 py-1 bg-gray-100 border-r">
                    {line.lineNumber}
                  </div>
                  <div className="w-8 text-center py-1">
                    {getLineIcon(line)}
                  </div>
                  <div className="flex-1 py-1 px-2">
                    <code className={`${
                      selectedLines.has(line.lineNumber) ? 'bg-yellow-200' : ''
                    }`}>
                      {line.content || ' '}
                    </code>
                  </div>
                  {line.branch && (
                    <div className="px-2 py-1">
                      <Badge variant="secondary" size="sm">
                        {line.branch}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Légende */}
      <Card className="p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-3">Légende</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-100 border-l-4 border-green-400"></div>
            <span className="text-sm">🟢 Version actuelle (HEAD)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-100 border-l-4 border-blue-400"></div>
            <span className="text-sm">🔵 Version entrante</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-100 border-l-4 border-red-400"></div>
            <span className="text-sm">⚠️ Marqueurs de conflit</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white border"></div>
            <span className="text-sm">Code sans conflit</span>
          </div>
        </div>
      </Card>

      {/* Résumé final */}
      {resolvedConflicts === totalConflicts && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Tous les conflits sont résolus !
            </h3>
            <p className="text-green-700 mb-4">
              Vous pouvez maintenant continuer avec votre merge.
            </p>
            <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm max-w-md mx-auto">
              $ git add .<br/>
              $ git commit -m "Résoudre les conflits de merge"
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ConflictVisualizer;
