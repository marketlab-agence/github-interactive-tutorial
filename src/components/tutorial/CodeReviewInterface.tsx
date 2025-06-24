import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import CodeBlock from '../ui/CodeBlock';

interface CodeReviewInterfaceProps {
  onComplete?: () => void;
}

interface CodeChange {
  id: string;
  file: string;
  lineNumber: number;
  oldCode: string;
  newCode: string;
  type: 'addition' | 'deletion' | 'modification';
}

interface Comment {
  id: string;
  author: string;
  content: string;
  lineNumber: number;
  timestamp: string;
}

interface CodeReviewInterfaceProps {
  pullRequestTitle?: string;
  author?: string;
  changes?: CodeChange[];
  comments?: Comment[];
  onApprove?: () => void;
  onRequestChanges?: () => void;
  onAddComment?: (comment: string, lineNumber: number) => void;
  onComplete?: () => void;
}

export const CodeReviewInterface: React.FC<CodeReviewInterfaceProps> = ({
  pullRequestTitle = "Ajouter fonctionnalité de connexion utilisateur",
  author = "alice-dev",
  changes = [
    {
      id: '1',
      file: 'src/auth/login.js',
      lineNumber: 15,
      oldCode: 'const validateUser = (email) => {',
      newCode: 'const validateUser = (email, password) => {',
      type: 'modification'
    },
    {
      id: '2',
      file: 'src/auth/login.js',
      lineNumber: 16,
      oldCode: '',
      newCode: '  if (!password || password.length < 8) return false;',
      type: 'addition'
    },
    {
      id: '3',
      file: 'src/components/LoginForm.jsx',
      lineNumber: 23,
      oldCode: '<input type="text" placeholder="Email" />',
      newCode: '<input type="email" placeholder="Email" required />',
      type: 'modification'
    }
  ],
  comments = [
    {
      id: '1',
      author: 'bob-reviewer',
      content: 'Bonne amélioration de la validation ! Pourriez-vous ajouter aussi une vérification de la complexité du mot de passe ?',
      lineNumber: 16,
      timestamp: '2024-01-15T10:30:00Z'
    }
  ],
  onApprove,
  onRequestChanges,
  onAddComment,
  onComplete
}) => {
  const [newComment, setNewComment] = useState('');
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'files' | 'conversation'>('files');

  const handleAddComment = () => {
    if (newComment.trim() && selectedLine !== null) {
      onAddComment?.(newComment, selectedLine);
      setNewComment('');
      setSelectedLine(null);
    }
  };

  const getChangeTypeColor = (type: CodeChange['type']) => {
    switch (type) {
      case 'addition': return 'bg-green-100 border-green-300';
      case 'deletion': return 'bg-red-100 border-red-300';
      case 'modification': return 'bg-yellow-100 border-yellow-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getChangeTypeIcon = (type: CodeChange['type']) => {
    switch (type) {
      case 'addition': return '+';
      case 'deletion': return '-';
      case 'modification': return '~';
      default: return '?';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* En-tête de la Pull Request */}
      {activeTab === 'files' && (
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {pullRequestTitle}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Par <strong>{author}</strong></span>
              <Badge variant="success">Ouvert</Badge>
              <span>{changes.length} fichier(s) modifié(s)</span>
              <span>{comments.length} commentaire(s)</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="success" 
              onClick={() => {
                if (onApprove) onApprove();
                setActiveTab('conversation');
              }}
              className="flex items-center space-x-2"
            >
              <span>✓</span>
              <span>Approuver</span>
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => {
                if (onRequestChanges) onRequestChanges();
                setNewComment("Je suggère quelques améliorations à ce code.");
                setSelectedLine(16);
              }}
              className="flex items-center space-x-2"
            >
              <span>⚠</span>
              <span>Demander des modifications</span>
            </Button>
          </div>
        </div>
      </Card>
      )}
      
      {activeTab === 'conversation' && (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Revue terminée</h2>
            <p className="text-gray-300">
              Vous avez approuvé cette Pull Request. L'auteur sera notifié de votre approbation et pourra procéder à la fusion.
            </p>
            <Button onClick={onComplete} size="lg" className="mt-4">
              Terminer l'exercice
            </Button>
          </div>
        </Card>
      )}

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('files')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'files'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Fichiers modifiés ({changes.length})
          </button>
          <button
            onClick={() => setActiveTab('conversation')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'conversation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Conversation ({comments.length})
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          {changes.map((change) => (
            <Card key={change.id} className="overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <h3 className="font-medium text-gray-900">{change.file}</h3>
              </div>
              <div className="p-4">
                <div className={`border-l-4 pl-4 py-2 ${getChangeTypeColor(change.type)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-mono text-sm font-bold">
                      {getChangeTypeIcon(change.type)}
                    </span>
                    <span className="text-sm text-gray-600">
                      Ligne {change.lineNumber}
                    </span>
                    <button
                      onClick={() => setSelectedLine(change.lineNumber)}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Commenter
                    </button>
                  </div>
                  
                  {change.type === 'deletion' && (
                    <CodeBlock
                      code={change.oldCode}
                      language="javascript"
                      className="bg-red-50 border-red-200"
                    />
                  )}
                  
                  {change.type === 'modification' && (
                    <div className="space-y-2">
                      <CodeBlock
                        code={change.oldCode}
                        language="javascript"
                        className="bg-red-50 border-red-200"
                      />
                      <CodeBlock
                        code={change.newCode}
                        language="javascript"
                        className="bg-green-50 border-green-200"
                      />
                    </div>
                  )}
                  
                  {change.type === 'addition' && (
                    <CodeBlock
                      code={change.newCode}
                      language="javascript"
                      className="bg-green-50 border-green-200"
                    />
                  )}
                </div>

                {/* Commentaires sur cette ligne */}
                {comments
                  .filter(comment => comment.lineNumber === change.lineNumber)
                  .map(comment => (
                    <div key={comment.id} className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <strong className="text-sm">{comment.author}</strong>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  ))}

                {/* Formulaire d'ajout de commentaire */}
                {selectedLine === change.lineNumber && (
                  <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Ajouter un commentaire sur cette ligne..."
                      className="w-full p-2 border border-gray-300 rounded-md resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSelectedLine(null);
                          setNewComment('');
                        }}
                      >
                        Annuler
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                      >
                        Commenter
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'conversation' && (
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <strong className="text-sm">{comment.author}</strong>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleDateString('fr-FR')}
                    </span>
                    <Badge variant="secondary" size="sm">
                      Ligne {comment.lineNumber}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{comment.content}</p>
                </div>
              </div>
            </Card>
          ))}
          
          {comments.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-gray-500">Aucun commentaire pour le moment.</p>
              <p className="text-sm text-gray-400 mt-1">
                Utilisez l'onglet "Fichiers modifiés" pour ajouter des commentaires sur des lignes spécifiques.
              </p>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeReviewInterface;
