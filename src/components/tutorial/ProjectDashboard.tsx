import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  Users, 
  CheckSquare, 
  AlertCircle,
  Clock,
  Calendar,
  TrendingUp,
  Search,
  Filter,
  BarChart2,
  ListChecks
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Tabs from '../ui/Tabs';

interface ProjectIssue {
  id: string;
  title: string;
  status: 'open' | 'in-progress' | 'review' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  labels: string[];
  createdAt: string;
}

interface ProjectTask {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  dueDate?: string;
  assignee?: string;
}

const ProjectDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const project = {
    name: 'Awesome App',
    description: 'Une application web moderne avec fonctionnalités avancées',
    stats: {
      commits: 124,
      branches: 5,
      pullRequests: 8,
      issues: 12,
      contributors: 4
    },
    recentActivity: [
      { type: 'commit', message: 'Fix navigation bug', author: 'Alice', time: '2 hours ago' },
      { type: 'pull-request', message: 'Add user settings page', author: 'Bob', time: '5 hours ago' },
      { type: 'issue', message: 'Login page not responsive', author: 'Charlie', time: '1 day ago' },
      { type: 'branch', message: 'Create feature/analytics branch', author: 'Dave', time: '2 days ago' }
    ]
  };
  
  const issues: ProjectIssue[] = [
    { 
      id: 'ISSUE-1', 
      title: 'Navigation ne fonctionne pas sur mobile',
      status: 'open',
      priority: 'high',
      assignee: 'Alice',
      labels: ['bug', 'mobile'],
      createdAt: '2023-12-01'
    },
    { 
      id: 'ISSUE-2', 
      title: 'Améliorer les performances de chargement',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Bob',
      labels: ['enhancement', 'performance'],
      createdAt: '2023-12-05'
    },
    { 
      id: 'ISSUE-3', 
      title: 'Ajouter page de profil utilisateur',
      status: 'review',
      priority: 'medium',
      assignee: 'Charlie',
      labels: ['feature', 'ui'],
      createdAt: '2023-12-10'
    },
    { 
      id: 'ISSUE-4', 
      title: 'Corriger bug d\'authentification',
      status: 'closed',
      priority: 'high',
      assignee: 'Dave',
      labels: ['bug', 'security'],
      createdAt: '2023-12-15'
    }
  ];
  
  const tasks: ProjectTask[] = [
    { 
      id: 'TASK-1', 
      title: 'Configurer CI/CD avec GitHub Actions',
      status: 'todo',
      dueDate: '2023-12-31',
      assignee: 'Alice'
    },
    { 
      id: 'TASK-2', 
      title: 'Mettre à jour la documentation README',
      status: 'in-progress',
      dueDate: '2023-12-25',
      assignee: 'Bob'
    },
    { 
      id: 'TASK-3', 
      title: 'Optimiser les requêtes API',
      status: 'todo',
      dueDate: '2024-01-05',
      assignee: 'Charlie'
    },
    { 
      id: 'TASK-4', 
      title: 'Refactoriser le composant de formulaire',
      status: 'done',
      assignee: 'Dave'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
      case 'todo':
        return 'bg-blue-900/20 text-blue-400 border-blue-500/30';
      case 'in-progress':
        return 'bg-yellow-900/20 text-yellow-400 border-yellow-500/30';
      case 'review':
        return 'bg-purple-900/20 text-purple-400 border-purple-500/30';
      case 'closed':
      case 'done':
        return 'bg-green-900/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-700/30 text-gray-400 border-gray-600';
    }
  };

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

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'bug':
        return 'bg-red-900/20 border-red-500/30';
      case 'enhancement':
      case 'feature':
        return 'bg-blue-900/20 border-blue-500/30';
      case 'documentation':
        return 'bg-purple-900/20 border-purple-500/30';
      case 'performance':
        return 'bg-yellow-900/20 border-yellow-500/30';
      case 'security':
        return 'bg-orange-900/20 border-orange-500/30';
      default:
        return 'bg-gray-800/50 border-gray-600';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit':
        return GitCommit;
      case 'pull-request':
        return GitPullRequest;
      case 'issue':
        return AlertCircle;
      case 'branch':
        return GitBranch;
      default:
        return GitCommit;
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = searchTerm === '' || 
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = !statusFilter || issue.status === statusFilter;
    
    return matchesSearch && matchesFilter;
  });

  const renderOverviewTab = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-5 gap-4">
        <Card>
          <div className="text-center">
            <GitCommit className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{project.stats.commits}</div>
            <div className="text-xs text-gray-400">Commits</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <GitBranch className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{project.stats.branches}</div>
            <div className="text-xs text-gray-400">Branches</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <GitPullRequest className="h-6 w-6 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{project.stats.pullRequests}</div>
            <div className="text-xs text-gray-400">Pull Requests</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <AlertCircle className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{project.stats.issues}</div>
            <div className="text-xs text-gray-400">Issues</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center">
            <Users className="h-6 w-6 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{project.stats.contributors}</div>
            <div className="text-xs text-gray-400">Contributors</div>
          </div>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Activité Récente */}
        <Card header={<h3 className="font-semibold text-white">Activité Récente</h3>}>
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {project.recentActivity.map((activity, index) => {
              const Icon = getActivityIcon(activity.type);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg"
                >
                  <Icon className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium mb-1">{activity.message}</div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">{activity.author}</span>
                      <span className="text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
        
        {/* Issues Ouvertes */}
        <Card header={<h3 className="font-semibold text-white">Issues Ouvertes</h3>}>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {issues.filter(issue => issue.status !== 'closed').map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 rounded-lg bg-gray-800/30 border border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className={`h-5 w-5 mt-0.5 ${getPriorityColor(issue.priority)}`} />
                    <div>
                      <div className="text-sm font-medium text-white mb-1">
                        {issue.id}: {issue.title}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {issue.labels.map(label => (
                          <span
                            key={label}
                            className={`text-xs px-2 py-0.5 rounded-full ${getLabelColor(label)}`}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-xs ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4">
            <Button size="sm" variant="ghost" className="w-full">
              Voir toutes les issues
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Graphiques */}
      <Card header={<h3 className="font-semibold text-white">Tendances du Projet</h3>}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Commits par jour (dernière semaine)</h4>
            <div className="h-40 flex items-end space-x-2">
              {[4, 7, 3, 9, 5, 8, 6].map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${value * 10}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="w-full bg-blue-500 rounded-t"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Distribution des Issues</h4>
            <div className="h-40 flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Red slice - 33% */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    d="M 50 50 L 100 50 A 50 50 0 0 1 75 93.3 Z"
                    fill="#ef4444"
                    opacity="0.8"
                  />
                  
                  {/* Yellow slice - 25% */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    d="M 50 50 L 75 93.3 A 50 50 0 0 1 25 93.3 Z"
                    fill="#f59e0b"
                    opacity="0.8"
                  />
                  
                  {/* Blue slice - 25% */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    d="M 50 50 L 25 93.3 A 50 50 0 0 1 0 50 Z"
                    fill="#3b82f6"
                    opacity="0.8"
                  />
                  
                  {/* Green slice - 17% */}
                  <motion.path
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    d="M 50 50 L 0 50 A 50 50 0 0 1 50 0 L 50 50 Z"
                    fill="#10b981"
                    opacity="0.8"
                  />
                  
                  <circle cx="50" cy="50" r="25" fill="#1f2937" />
                </svg>
              </div>
              
              <div className="ml-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  <span className="text-xs text-gray-300">Bugs (33%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                  <span className="text-xs text-gray-300">Features (25%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-xs text-gray-300">Améliorations (25%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span className="text-xs text-gray-300">Docs (17%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderIssuesTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des issues..."
            className="bg-gray-700 text-white pl-10 pr-3 py-2 w-full md:w-64 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant={statusFilter === null ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter(null)}
          >
            Toutes
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'open' ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter('open')}
          >
            Ouvertes
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'in-progress' ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter('in-progress')}
          >
            En cours
          </Button>
          <Button 
            size="sm" 
            variant={statusFilter === 'closed' ? 'primary' : 'ghost'}
            onClick={() => setStatusFilter('closed')}
          >
            Fermées
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredIssues.length > 0 ? (
          filteredIssues.map((issue) => (
            <Card key={issue.id}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`h-5 w-5 mt-0.5 ${getPriorityColor(issue.priority)}`} />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded font-mono">
                        {issue.id}
                      </span>
                      <h3 className="font-medium text-white">{issue.title}</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {issue.labels.map(label => (
                        <span
                          key={label}
                          className={`text-xs px-2 py-0.5 rounded-full ${getLabelColor(label)}`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2 text-xs">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Calendar className="h-3 w-3" />
                        <span>{issue.createdAt}</span>
                      </div>
                      {issue.assignee && (
                        <div className="flex items-center space-x-1 text-gray-400">
                          <User className="h-3 w-3" />
                          <span>{issue.assignee}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className={`px-3 py-1.5 rounded-lg text-xs ${getStatusColor(issue.status)}`}>
                  {issue.status}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-10 text-gray-400">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>Aucune issue ne correspond à votre recherche</p>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderTasksTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Todo */}
        <Card header={
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">À faire</h3>
            <Badge variant="default">{tasks.filter(t => t.status === 'todo').length}</Badge>
          </div>
        }>
          <div className="space-y-3 min-h-[12rem]">
            {tasks.filter(t => t.status === 'todo').map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg"
              >
                <div className="font-medium text-white text-sm mb-2">{task.title}</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    {task.assignee ? `Assigné à: ${task.assignee}` : 'Non assigné'}
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center space-x-1 text-xs text-yellow-400">
                      <Clock className="h-3 w-3" />
                      <span>{task.dueDate}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {tasks.filter(t => t.status === 'todo').length === 0 && (
              <div className="text-center py-6 text-gray-400 text-sm">
                Aucune tâche en attente
              </div>
            )}
          </div>
        </Card>
        
        {/* In Progress */}
        <Card header={
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">En cours</h3>
            <Badge variant="warning">{tasks.filter(t => t.status === 'in-progress').length}</Badge>
          </div>
        }>
          <div className="space-y-3 min-h-[12rem]">
            {tasks.filter(t => t.status === 'in-progress').map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg"
              >
                <div className="font-medium text-white text-sm mb-2">{task.title}</div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    {task.assignee ? `Assigné à: ${task.assignee}` : 'Non assigné'}
                  </div>
                  {task.dueDate && (
                    <div className="flex items-center space-x-1 text-xs text-yellow-400">
                      <Clock className="h-3 w-3" />
                      <span>{task.dueDate}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {tasks.filter(t => t.status === 'in-progress').length === 0 && (
              <div className="text-center py-6 text-gray-400 text-sm">
                Aucune tâche en cours
              </div>
            )}
          </div>
        </Card>
        
        {/* Done */}
        <Card header={
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Terminé</h3>
            <Badge variant="success">{tasks.filter(t => t.status === 'done').length}</Badge>
          </div>
        }>
          <div className="space-y-3 min-h-[12rem]">
            {tasks.filter(t => t.status === 'done').map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-900/20 border border-green-500/30 rounded-lg"
              >
                <div className="font-medium text-white text-sm mb-2">
                  <span className="line-through">{task.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-400">
                    {task.assignee ? `Complété par: ${task.assignee}` : 'Complété'}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {tasks.filter(t => t.status === 'done').length === 0 && (
              <div className="text-center py-6 text-gray-400 text-sm">
                Aucune tâche terminée
              </div>
            )}
          </div>
        </Card>
      </div>
      
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white">Progression du Sprint</h3>
          <Badge variant="info">Sprint 3 / 8</Badge>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-300">Progression</span>
            <span className="text-gray-300">70%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '70%' }}
              className="bg-green-500 h-2.5 rounded-full"
            />
          </div>
          
          <div className="grid grid-cols-3 text-center">
            <div>
              <div className="text-sm text-gray-400">À faire</div>
              <div className="text-xl font-bold text-white">2</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">En cours</div>
              <div className="text-xl font-bold text-white">1</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Terminé</div>
              <div className="text-xl font-bold text-white">7</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    {
      id: 'overview',
      label: 'Vue d\'ensemble',
      icon: BarChart2,
      content: renderOverviewTab()
    },
    {
      id: 'issues',
      label: 'Issues',
      icon: AlertCircle,
      content: renderIssuesTab()
    },
    {
      id: 'tasks',
      label: 'Tâches',
      icon: ListChecks,
      content: renderTasksTab()
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Tableau de Bord du Projet</h2>
        <p className="text-gray-300">Visualisez et gérez l'ensemble de votre projet GitHub</p>
      </motion.div>

      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
            <p className="text-gray-400 mt-1">{project.description}</p>
          </div>
          <div className="flex space-x-3">
            <Button size="sm" variant="outline">
              <GitBranch className="h-4 w-4 mr-2" />
              Cloner
            </Button>
            <Button size="sm">
              <Star className="h-4 w-4 mr-2" />
              Star
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default ProjectDashboard;