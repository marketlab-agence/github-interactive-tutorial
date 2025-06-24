import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  Plus, 
  Search, 
  Filter, 
  Tag, 
  User, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  X, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface Issue {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'review' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  labels: string[];
  createdAt: string;
  comments: number;
}

const mockIssues: Issue[] = [
  {
    id: 1,
    title: "Navigation barre ne fonctionne pas sur mobile",
    description: "La barre de navigation se superpose avec le contenu sur les appareils mobiles de petite taille. Cela rend certains liens inaccessibles.",
    status: 'open',
    priority: 'high',
    assignee: 'Alice',
    labels: ['bug', 'mobile', 'ui'],
    createdAt: '2 days ago',
    comments: 3
  },
  {
    id: 2,
    title: "Ajouter support du mode sombre",
    description: "Implémenter un thème sombre pour l'application qui respecte les préférences système des utilisateurs.",
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Bob',
    labels: ['enhancement', 'ui'],
    createdAt: '4 days ago',
    comments: 2
  },
  {
    id: 3,
    title: "Optimiser le chargement des images",
    description: "Les images prennent trop de temps à charger. Nous devrions implémenter le lazy loading et la compression d'images.",
    status: 'review',
    priority: 'medium',
    assignee: 'Charlie',
    labels: ['performance', 'enhancement'],
    createdAt: '1 week ago',
    comments: 5
  },
  {
    id: 4,
    title: "Corriger le bug d'authentification",
    description: "Les utilisateurs sont parfois déconnectés de manière aléatoire. Le problème semble lié à l'expiration du token.",
    status: 'closed',
    priority: 'high',
    assignee: 'Alice',
    labels: ['bug', 'security'],
    createdAt: '2 weeks ago',
    comments: 8
  },
  {
    id: 5,
    title: "Améliorer l'accessibilité du formulaire",
    description: "Le formulaire de contact n'est pas accessible aux lecteurs d'écran. Nous devons ajouter les attributs ARIA appropriés.",
    status: 'open',
    priority: 'low',
    labels: ['accessibility', 'ui'],
    createdAt: '3 days ago',
    comments: 1
  }
];

const IssueTracker: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [labelFilter, setLabelFilter] = useState<string | null>(null);
  const [showNewIssueForm, setShowNewIssueForm] = useState(false);
  const [newIssue, setNewIssue] = useState<Partial<Issue>>({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    labels: []
  });

  const availableLabels = ['bug', 'enhancement', 'ui', 'mobile', 'performance', 'security', 'accessibility', 'documentation'];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = searchTerm === '' || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === null || issue.status === statusFilter;
    const matchesPriority = priorityFilter === null || issue.priority === priorityFilter;
    const matchesLabel = labelFilter === null || issue.labels.includes(labelFilter);
    
    return matchesSearch && matchesStatus && matchesPriority && matchesLabel;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-blue-400';
      case 'in-progress':
        return 'text-yellow-400';
      case 'review':
        return 'text-purple-400';
      case 'closed':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="info">Open</Badge>;
      case 'in-progress':
        return <Badge variant="warning">In Progress</Badge>;
      case 'review':
        return <Badge variant="default">In Review</Badge>;
      case 'closed':
        return <Badge variant="success">Closed</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getLabelColor = (label: string) => {
    const colorMap: Record<string, string> = {
      'bug': 'bg-red-900/30 text-red-400 border-red-500/30',
      'enhancement': 'bg-blue-900/30 text-blue-400 border-blue-500/30',
      'ui': 'bg-purple-900/30 text-purple-400 border-purple-500/30',
      'mobile': 'bg-green-900/30 text-green-400 border-green-500/30',
      'performance': 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30',
      'security': 'bg-orange-900/30 text-orange-400 border-orange-500/30',
      'accessibility': 'bg-indigo-900/30 text-indigo-400 border-indigo-500/30',
      'documentation': 'bg-gray-800/50 text-gray-400 border-gray-600'
    };
    return colorMap[label] || 'bg-gray-800/50 text-gray-400 border-gray-600';
  };

  const handleCreateIssue = () => {
    if (newIssue.title && newIssue.description) {
      const issueToAdd: Issue = {
        id: Math.max(...issues.map(i => i.id)) + 1,
        title: newIssue.title,
        description: newIssue.description,
        status: newIssue.status as 'open',
        priority: newIssue.priority as 'medium',
        assignee: newIssue.assignee,
        labels: newIssue.labels || [],
        createdAt: 'Just now',
        comments: 0
      };
      
      setIssues([issueToAdd, ...issues]);
      setNewIssue({
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
        labels: []
      });
      setShowNewIssueForm(false);
    }
  };

  const handleUpdateIssueStatus = (issueId: number, newStatus: Issue['status']) => {
    setIssues(issues.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ));
    
    if (selectedIssue && selectedIssue.id === issueId) {
      setSelectedIssue({ ...selectedIssue, status: newStatus });
    }
  };

  const toggleLabel = (label: string) => {
    if (!newIssue.labels) {
      setNewIssue({ ...newIssue, labels: [label] });
      return;
    }
    
    setNewIssue({
      ...newIssue,
      labels: newIssue.labels.includes(label) 
        ? newIssue.labels.filter(l => l !== label) 
        : [...newIssue.labels, label]
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Gestionnaire d'Issues GitHub</h2>
        <p className="text-gray-300">Suivez et gérez les problèmes et demandes de fonctionnalités</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left panel - Issue list & filters */}
        <div className={`lg:col-span-${selectedIssue ? '1' : '3'} space-y-4`}>
          <Card>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search issues..."
                    className="bg-gray-700 text-white pl-10 pr-3 py-2 w-full rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={() => setShowNewIssueForm(!showNewIssueForm)} 
                className="flex-shrink-0"
              >
                {showNewIssueForm ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {showNewIssueForm ? 'Cancel' : 'New Issue'}
              </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <select
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                value={statusFilter || ''}
                onChange={(e) => setStatusFilter(e.target.value || null)}
              >
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="review">In Review</option>
                <option value="closed">Closed</option>
              </select>
              
              <select
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                value={priorityFilter || ''}
                onChange={(e) => setPriorityFilter(e.target.value || null)}
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              
              <select
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none text-sm"
                value={labelFilter || ''}
                onChange={(e) => setLabelFilter(e.target.value || null)}
              >
                <option value="">All Labels</option>
                {availableLabels.map(label => (
                  <option key={label} value={label}>{label}</option>
                ))}
              </select>
              
              {(statusFilter || priorityFilter || labelFilter || searchTerm) && (
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={() => {
                    setStatusFilter(null);
                    setPriorityFilter(null);
                    setLabelFilter(null);
                    setSearchTerm('');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* New Issue Form */}
            {showNewIssueForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 bg-gray-800/50 p-4 rounded-lg border border-gray-700"
              >
                <h3 className="text-white font-medium mb-3">Create New Issue</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="bg-gray-700 text-white px-3 py-2 w-full rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Issue title"
                      value={newIssue.title}
                      onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      className="bg-gray-700 text-white px-3 py-2 w-full rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="Describe the issue in detail"
                      rows={4}
                      value={newIssue.description}
                      onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      className="bg-gray-700 text-white px-3 py-2 w-full rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      value={newIssue.priority}
                      onChange={(e) => setNewIssue({...newIssue, priority: e.target.value as any})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="labels" className="block text-sm font-medium text-gray-300 mb-1">
                      Labels
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableLabels.map(label => (
                        <button
                          key={label}
                          onClick={() => toggleLabel(label)}
                          className={`px-2 py-1 rounded-full text-xs ${
                            newIssue.labels?.includes(label)
                              ? getLabelColor(label)
                              : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="secondary"
                      onClick={() => setShowNewIssueForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateIssue}
                      disabled={!newIssue.title || !newIssue.description}
                    >
                      Create Issue
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Issue List */}
            <div className={`space-y-3 ${selectedIssue ? 'max-h-[500px] overflow-y-auto pr-2' : ''}`}>
              {filteredIssues.length > 0 ? (
                filteredIssues.map(issue => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg transition-colors cursor-pointer ${
                      selectedIssue?.id === issue.id
                        ? 'bg-blue-900/20 border-blue-500/50'
                        : 'border-gray-700 hover:bg-gray-800/50'
                    }`}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className={`h-5 w-5 mt-0.5 ${getStatusColor(issue.status)}`} />
                        <div>
                          <div className="font-medium text-white mb-1">{issue.title}</div>
                          <div className="text-xs text-gray-400">
                            #{issue.id} opened {issue.createdAt}
                            {issue.assignee && ` • Assigned to ${issue.assignee}`}
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {issue.labels.map(label => (
                              <span 
                                key={label} 
                                className={`px-1.5 py-0.5 rounded-full text-xs ${getLabelColor(label)}`}
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className={`text-xs ${getPriorityColor(issue.priority)} font-medium`}>
                          {issue.priority}
                        </span>
                        <div className="flex items-center mt-2 text-gray-400">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          <span className="text-xs">{issue.comments}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-400">
                  <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>No issues found matching your criteria</p>
                </div>
              )}
            </div>
          </Card>

          {!selectedIssue && (
            <Card>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">À propos des Issues GitHub</h3>
                <p className="text-gray-300">
                  Les issues GitHub permettent de suivre les bugs, les améliorations, et les tâches pour votre projet.
                  Elles facilitent la collaboration entre les membres de l'équipe et les contributeurs externes.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-400 mb-2">Bonnes pratiques</h4>
                    <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                      <li>Utiliser des titres clairs et descriptifs</li>
                      <li>Fournir des étapes de reproduction pour les bugs</li>
                      <li>Ajouter des labels pour catégoriser</li>
                      <li>Assigner des responsables quand c'est pertinent</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="font-medium text-green-400 mb-2">Processus efficace</h4>
                    <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                      <li>Trier régulièrement les issues</li>
                      <li>Utiliser des projets pour organiser les tâches</li>
                      <li>Fermer les issues résolues avec référence</li>
                      <li>Lier les Pull Requests aux issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right panel - Issue details */}
        {selectedIssue && (
          <div className="lg:col-span-2">
            <Card>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setSelectedIssue(null)}
                      className="p-1 rounded hover:bg-gray-700/50"
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <h3 className="text-xl font-bold text-white">Issue #{selectedIssue.id}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(selectedIssue.status)}
                    <span className={`text-xs font-medium ${getPriorityColor(selectedIssue.priority)}`}>
                      {selectedIssue.priority} priority
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-2">{selectedIssue.title}</h3>
                  <div className="flex items-center space-x-3 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Opened {selectedIssue.createdAt}</span>
                    </div>
                    {selectedIssue.assignee && (
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>Assigned to {selectedIssue.assignee}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 mb-4">
                    <p className="text-gray-300 whitespace-pre-line">{selectedIssue.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-6">
                    {selectedIssue.labels.map(label => (
                      <span 
                        key={label} 
                        className={`px-2 py-0.5 rounded-full text-xs ${getLabelColor(label)}`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Comments section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium">Comments ({selectedIssue.comments})</h4>
                  </div>

                  {selectedIssue.comments > 0 ? (
                    <div className="space-y-4">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <div className="flex items-start space-x-3 mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                            {selectedIssue.assignee?.charAt(0) || 'U'}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-white">{selectedIssue.assignee || 'Username'}</div>
                              <div className="text-xs text-gray-400">1 day ago</div>
                            </div>
                            <div className="text-gray-300 mt-2">
                              I've identified the issue. It's related to the responsive breakpoints in our CSS. Will fix this soon.
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {selectedIssue.comments > 1 && (
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-start space-x-3 mb-2">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                              D
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-white">Developer</div>
                                <div className="text-xs text-gray-400">12 hours ago</div>
                              </div>
                              <div className="text-gray-300 mt-2">
                                I think we should update the media queries to fix this. Can you confirm this works on all mobile devices?
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-400 bg-gray-800/20 rounded-lg">
                      <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-20" />
                      <p>No comments yet</p>
                    </div>
                  )}
                  
                  {/* Add comment form */}
                  <div className="mt-4">
                    <textarea
                      className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                      placeholder="Leave a comment..."
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <Button size="sm">
                        Comment
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={selectedIssue.status === 'closed' ? 'primary' : 'secondary'}
                      onClick={() => handleUpdateIssueStatus(
                        selectedIssue.id, 
                        selectedIssue.status === 'closed' ? 'open' : 'closed'
                      )}
                    >
                      {selectedIssue.status === 'closed' ? (
                        <>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Reopen Issue
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Close Issue
                        </>
                      )}
                    </Button>
                    
                    {selectedIssue.status !== 'closed' && selectedIssue.status !== 'in-progress' && (
                      <Button 
                        variant="secondary"
                        onClick={() => handleUpdateIssueStatus(selectedIssue.id, 'in-progress')}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Start Progress
                      </Button>
                    )}
                    
                    {selectedIssue.status === 'in-progress' && (
                      <Button 
                        variant="secondary"
                        onClick={() => handleUpdateIssueStatus(selectedIssue.id, 'review')}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Ready for Review
                      </Button>
                    )}
                    
                    <Button variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      Assign
                    </Button>
                    
                    <Button variant="outline">
                      <Tag className="h-4 w-4 mr-2" />
                      Labels
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueTracker;