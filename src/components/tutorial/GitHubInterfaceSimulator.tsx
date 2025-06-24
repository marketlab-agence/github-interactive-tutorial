import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  GitCommit,
  GitPullRequest,
  Eye,
  Star,
  AlertCircle,
  Download,
  Plus,
  Settings,
  Users,
  Code,
  BarChart2,
  Shield,
  BookOpen,
  Play,
  Search
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Tabs from '../ui/Tabs';

const GitHubInterfaceSimulator: React.FC = () => {
  const [activeView, setActiveView] = useState<'repo' | 'issues' | 'pr' | 'actions'>('repo');
  const [activeBranch, setActiveBranch] = useState<string>('main');
  const [activeTab, setActiveTab] = useState<string>('code');

  const repository = {
    name: 'awesome-project',
    owner: 'your-username',
    description: 'A cutting-edge web application with amazing features',
    stars: 42,
    forks: 15,
    watching: 8,
    issues: 6,
    pullRequests: 3,
    branches: ['main', 'develop', 'feature/user-auth', 'bugfix/login-form'],
    tags: ['v1.0.0', 'v0.9.0', 'v0.8.0'],
    lastUpdate: '3 hours ago'
  };

  const files = [
    {
      name: 'README.md',
      type: 'file',
      lastCommit: 'Update documentation',
      lastCommitTime: '2 days ago'
    },
    {
      name: 'package.json',
      type: 'file',
      lastCommit: 'Update dependencies',
      lastCommitTime: '5 days ago'
    },
    {
      name: 'src',
      type: 'directory',
      lastCommit: 'Implement user authentication',
      lastCommitTime: '3 hours ago'
    },
    {
      name: 'public',
      type: 'directory',
      lastCommit: 'Add new logo',
      lastCommitTime: '1 week ago'
    }
  ];

  const issues = [
    {
      id: '#42',
      title: 'Navigation breaks on mobile devices',
      labels: ['bug', 'mobile', 'high-priority'],
      author: 'user123',
      createdAt: '2 days ago',
      status: 'open'
    },
    {
      id: '#41',
      title: 'Add dark mode support',
      labels: ['enhancement', 'ui'],
      author: 'designer456',
      createdAt: '3 days ago',
      status: 'open'
    },
    {
      id: '#40',
      title: 'Login form validation not working',
      labels: ['bug'],
      author: 'tester789',
      createdAt: '5 days ago',
      status: 'closed'
    }
  ];

  const pullRequests = [
    {
      id: '#35',
      title: 'Implement user authentication',
      sourceBranch: 'feature/user-auth',
      targetBranch: 'develop',
      author: 'developer123',
      createdAt: '1 day ago',
      status: 'open',
      reviewers: ['senior-dev', 'tech-lead']
    },
    {
      id: '#34',
      title: 'Fix navigation responsive issues',
      sourceBranch: 'bugfix/navigation',
      targetBranch: 'develop',
      author: 'developer456',
      createdAt: '3 days ago',
      status: 'merged',
      reviewers: ['senior-dev']
    }
  ];

  const workflows = [
    {
      name: 'CI Pipeline',
      status: 'success',
      branch: 'main',
      trigger: 'push',
      duration: '2m 34s',
      lastRun: '3 hours ago'
    },
    {
      name: 'Test Suite',
      status: 'running',
      branch: 'feature/user-auth',
      trigger: 'push',
      duration: '1m 12s',
      lastRun: 'Running now'
    },
    {
      name: 'Deploy to Production',
      status: 'failure',
      branch: 'main',
      trigger: 'manual',
      duration: '5m 18s',
      lastRun: '1 day ago'
    }
  ];

  const getLabelColor = (label: string) => {
    const colorMap: Record<string, string> = {
      'bug': 'bg-red-900/30 text-red-400 border-red-500/30',
      'enhancement': 'bg-blue-900/30 text-blue-400 border-blue-500/30',
      'ui': 'bg-purple-900/30 text-purple-400 border-purple-500/30',
      'mobile': 'bg-green-900/30 text-green-400 border-green-500/30',
      'high-priority': 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30'
    };
    return colorMap[label] || 'bg-gray-800/50 text-gray-400 border-gray-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-green-400';
      case 'closed':
        return 'text-purple-400';
      case 'merged':
        return 'text-purple-400';
      case 'success':
        return 'text-green-400';
      case 'running':
        return 'text-yellow-400';
      case 'failure':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="success">Open</Badge>;
      case 'closed':
        return <Badge variant="default">Closed</Badge>;
      case 'merged':
        return <Badge variant="info">Merged</Badge>;
      case 'success':
        return <Badge variant="success">Success</Badge>;
      case 'running':
        return <Badge variant="warning">Running</Badge>;
      case 'failure':
        return <Badge variant="error">Failed</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const renderRepositoryView = () => (
    <div className="space-y-6">
      {/* Repository Header */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold text-white">
                <span className="text-gray-400">{repository.owner} / </span>
                {repository.name}
              </h2>
              <Badge variant="default">Public</Badge>
            </div>
            <p className="text-gray-400 mt-2">{repository.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Watch <span className="ml-1 bg-gray-700 px-1.5 py-0.5 rounded-md text-xs">{repository.watching}</span>
            </Button>
            <Button size="sm" variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Star <span className="ml-1 bg-gray-700 px-1.5 py-0.5 rounded-md text-xs">{repository.stars}</span>
            </Button>
            <Button size="sm" variant="outline">
              <GitBranch className="h-4 w-4 mr-2" />
              Fork <span className="ml-1 bg-gray-700 px-1.5 py-0.5 rounded-md text-xs">{repository.forks}</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Card>
        <div className="flex overflow-x-auto border-b border-gray-700 pb-2">
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'code' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('code')}
          >
            <Code className="h-4 w-4 inline mr-1" />
            Code
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'issues' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('issues')}
          >
            <AlertCircle className="h-4 w-4 inline mr-1" />
            Issues <span className="ml-1 bg-gray-700 px-1.5 py-0.5 rounded-full text-xs">{repository.issues}</span>
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'pull-requests' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('pull-requests')}
          >
            <GitPullRequest className="h-4 w-4 inline mr-1" />
            Pull Requests <span className="ml-1 bg-gray-700 px-1.5 py-0.5 rounded-full text-xs">{repository.pullRequests}</span>
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'actions' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('actions')}
          >
            <Play className="h-4 w-4 inline mr-1" />
            Actions
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'security' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield className="h-4 w-4 inline mr-1" />
            Security
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'insights' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('insights')}
          >
            <BarChart2 className="h-4 w-4 inline mr-1" />
            Insights
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'settings' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400 hover:text-gray-300'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings className="h-4 w-4 inline mr-1" />
            Settings
          </button>
        </div>

        {/* Content based on active tab */}
        <div className="pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'code' && (
                <div className="space-y-6">
                  {/* Branch selector and clone button */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <select
                          value={activeBranch}
                          onChange={(e) => setActiveBranch(e.target.value)}
                          className="appearance-none bg-gray-700 border border-gray-600 text-white px-3 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {repository.branches.map(branch => (
                            <option key={branch} value={branch}>{branch}</option>
                          ))}
                        </select>
                        <GitBranch className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                      <Button size="sm" variant="ghost">
                        <GitBranch className="h-4 w-4 mr-1" />
                        {repository.branches.length} branches
                      </Button>
                      <Button size="sm" variant="ghost">
                        <GitCommit className="h-4 w-4 mr-1" />
                        {repository.tags.length} tags
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="primary">
                        <Code className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                    </div>
                  </div>

                  {/* Files table */}
                  <div className="border border-gray-700 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-800">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Last commit
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Commit time
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                        {files.map((file, index) => (
                          <motion.tr 
                            key={file.name}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="hover:bg-gray-700/30"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {file.type === 'directory' ? (
                                  <Folder className="h-5 w-5 text-blue-400 mr-3" />
                                ) : (
                                  <File className="h-5 w-5 text-gray-400 mr-3" />
                                )}
                                <div className="text-sm font-medium text-white">{file.name}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-300">{file.lastCommit}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                              {file.lastCommitTime}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* README preview */}
                  <div className="border border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex justify-between items-center">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-white">README.md</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-800/50">
                      <div className="prose prose-invert max-w-none">
                        <h1 className="text-2xl font-bold">Awesome Project</h1>
                        <p>A cutting-edge web application with amazing features.</p>
                        
                        <h2 className="text-xl font-semibold mt-4">Installation</h2>
                        <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                          <code className="text-green-400">npm install</code>
                        </pre>
                        
                        <h2 className="text-xl font-semibold mt-4">Usage</h2>
                        <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                          <code className="text-green-400">npm start</code>
                        </pre>
                        
                        <h2 className="text-xl font-semibold mt-4">Features</h2>
                        <ul className="list-disc pl-5 mt-2">
                          <li>Feature 1</li>
                          <li>Feature 2</li>
                          <li>Feature 3</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'issues' && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search issues..."
                        className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Issue
                    </Button>
                  </div>
                  
                  {issues.map((issue) => (
                    <div 
                      key={issue.id} 
                      className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/10 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className={`h-5 w-5 mt-0.5 ${issue.status === 'open' ? 'text-green-400' : 'text-purple-400'}`} />
                          <div>
                            <h3 className="text-white font-medium">
                              {issue.title} <span className="text-gray-400">{issue.id}</span>
                            </h3>
                            <div className="text-sm text-gray-400 mt-1">
                              Opened {issue.createdAt} by {issue.author}
                            </div>
                            <div className="flex flex-wrap mt-2 gap-1">
                              {issue.labels.map((label) => (
                                <span 
                                  key={label} 
                                  className={`px-2 py-0.5 rounded-full text-xs ${getLabelColor(label)}`}
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className={`${getStatusColor(issue.status)}`}>
                          {getStatusBadge(issue.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'pull-requests' && (
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search pull requests..."
                        className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Pull Request
                    </Button>
                  </div>
                  
                  {pullRequests.map((pr) => (
                    <div 
                      key={pr.id} 
                      className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/10 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <GitPullRequest className={`h-5 w-5 mt-0.5 ${getStatusColor(pr.status)}`} />
                          <div>
                            <h3 className="text-white font-medium">
                              {pr.title} <span className="text-gray-400">{pr.id}</span>
                            </h3>
                            <div className="text-sm text-gray-400 mt-1">
                              {pr.sourceBranch} → {pr.targetBranch} • Opened {pr.createdAt} by {pr.author}
                            </div>
                            <div className="flex flex-wrap mt-2 gap-1">
                              {pr.reviewers.map((reviewer, index) => (
                                <span 
                                  key={index} 
                                  className="px-2 py-0.5 rounded-full text-xs bg-gray-700 text-gray-300"
                                >
                                  {reviewer}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className={`${getStatusColor(pr.status)}`}>
                          {getStatusBadge(pr.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {activeTab === 'actions' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium">Workflow runs</h3>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      New workflow
                    </Button>
                  </div>
                  
                  {workflows.map((workflow, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/10 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className={`h-4 w-4 rounded-full ${workflow.status === 'success' ? 'bg-green-500' : workflow.status === 'running' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                          <div>
                            <h3 className="text-white font-medium">{workflow.name}</h3>
                            <div className="text-sm text-gray-400">
                              {workflow.branch} • {workflow.trigger} • {workflow.lastRun}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs ${getStatusColor(workflow.status)}`}>
                            {workflow.status === 'running' ? 'In progress' : workflow.status}
                          </span>
                          <Badge variant="default">{workflow.duration}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );

  const repoTab = {
    id: 'repo',
    label: 'Repository',
    icon: Code,
    content: renderRepositoryView()
  };
  
  const issuesTab = {
    id: 'issues',
    label: 'Issues',
    icon: AlertCircle,
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <div className="text-center py-3">
              <div className="text-2xl font-bold text-white">All</div>
              <div className="text-sm text-gray-400">{issues.length} issues</div>
            </div>
          </Card>
          <Card>
            <div className="text-center py-3">
              <div className="text-2xl font-bold text-green-400">Open</div>
              <div className="text-sm text-gray-400">
                {issues.filter(i => i.status === 'open').length} issues
              </div>
            </div>
          </Card>
          <Card>
            <div className="text-center py-3">
              <div className="text-2xl font-bold text-purple-400">Closed</div>
              <div className="text-sm text-gray-400">
                {issues.filter(i => i.status === 'closed').length} issues
              </div>
            </div>
          </Card>
          <Card>
            <div className="text-center py-3">
              <div className="text-2xl font-bold text-yellow-400">Yours</div>
              <div className="text-sm text-gray-400">0 issues</div>
            </div>
          </Card>
        </div>
        
        <Card>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Search all issues"
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Button variant="secondary" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </Button>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Issue
              </Button>
            </div>
            
            <div className="space-y-2">
              {issues.map((issue) => (
                <div 
                  key={issue.id} 
                  className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/10 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className={`h-5 w-5 mt-0.5 ${issue.status === 'open' ? 'text-green-400' : 'text-purple-400'}`} />
                      <div>
                        <h3 className="text-white font-medium">
                          {issue.title} <span className="text-gray-400">{issue.id}</span>
                        </h3>
                        <div className="text-sm text-gray-400 mt-1">
                          Opened {issue.createdAt} by {issue.author}
                        </div>
                        <div className="flex flex-wrap mt-2 gap-1">
                          {issue.labels.map((label) => (
                            <span 
                              key={label} 
                              className={`px-2 py-0.5 rounded-full text-xs ${getLabelColor(label)}`}
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className={`${getStatusColor(issue.status)}`}>
                      {getStatusBadge(issue.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  };
  
  const prTab = {
    id: 'pr',
    label: 'Pull Requests',
    icon: GitPullRequest,
    content: (
      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  placeholder="Search pull requests"
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Button variant="secondary" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </Button>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Pull Request
              </Button>
            </div>
            
            <div className="space-y-2">
              {pullRequests.map((pr) => (
                <div 
                  key={pr.id} 
                  className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/10 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <GitPullRequest className={`h-5 w-5 mt-0.5 ${getStatusColor(pr.status)}`} />
                      <div>
                        <h3 className="text-white font-medium">
                          {pr.title} <span className="text-gray-400">{pr.id}</span>
                        </h3>
                        <div className="text-sm text-gray-400 mt-1">
                          {pr.sourceBranch} → {pr.targetBranch} • Opened {pr.createdAt} by {pr.author}
                        </div>
                        <div className="flex flex-wrap mt-2 gap-1">
                          {pr.reviewers.map((reviewer, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-0.5 rounded-full text-xs bg-gray-700 text-gray-300"
                            >
                              {reviewer}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className={`${getStatusColor(pr.status)}`}>
                      {getStatusBadge(pr.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="space-y-4">
            <h3 className="font-semibold text-white">À propos des Pull Requests</h3>
            <p className="text-gray-300">
              Les Pull Requests (PRs) sont le cœur de la collaboration sur GitHub. Elles permettent de proposer 
              des modifications, de discuter des changements potentiels, et de collaborer sur du code avant 
              qu'il ne soit fusionné dans la branche principale.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2">Bonnes pratiques</h4>
                <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                  <li>Créez des PRs ciblées avec un objectif clair</li>
                  <li>Ajoutez une description détaillée de vos changements</li>
                  <li>Liez les PRs aux issues associées</li>
                  <li>Répondez aux commentaires de manière constructive</li>
                </ul>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="font-medium text-purple-400 mb-2">Processus de revue</h4>
                <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                  <li>Les modifications sont vérifiées par d'autres développeurs</li>
                  <li>Les tests automatisés valident le code</li>
                  <li>Les problèmes identifiés peuvent être corrigés</li>
                  <li>Une fois approuvée, la PR peut être fusionnée</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  };
  
  const actionsTab = {
    id: 'actions',
    label: 'GitHub Actions',
    icon: Play,
    content: (
      <div className="space-y-6">
        <Card>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-white">Workflows</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New workflow
              </Button>
            </div>
            
            <div className="space-y-2">
              {workflows.map((workflow, index) => (
                <div 
                  key={index} 
                  className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`h-3 w-3 rounded-full ${
                        workflow.status === 'success' ? 'bg-green-500' : 
                        workflow.status === 'running' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <h3 className="text-white font-medium">{workflow.name}</h3>
                        <div className="text-sm text-gray-400">
                          {workflow.branch} • {workflow.trigger} • {workflow.lastRun}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">{workflow.duration}</Badge>
                      {workflow.status === 'running' ? (
                        <Button size="sm" variant="secondary">
                          Cancel
                        </Button>
                      ) : workflow.status === 'failure' ? (
                        <Button size="sm" variant="secondary">
                          Re-run
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost">
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="space-y-4">
            <h3 className="font-semibold text-white">À propos de GitHub Actions</h3>
            <p className="text-gray-300">
              GitHub Actions est un service d'intégration continue (CI) et de livraison continue (CD) 
              qui vous permet d'automatiser votre workflow de build, test et déploiement. Il est 
              directement intégré à GitHub.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="font-medium text-blue-400 mb-2">CI/CD Automatisé</h4>
                <p className="text-sm text-gray-300">
                  Automatisez les tests, la compilation et le déploiement directement depuis votre dépôt GitHub.
                </p>
              </div>
              
              <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
                <h4 className="font-medium text-green-400 mb-2">Actions Communautaires</h4>
                <p className="text-sm text-gray-300">
                  Utilisez des actions prédéfinies ou créez les vôtres pour personnaliser votre workflow.
                </p>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="font-medium text-purple-400 mb-2">Intégration Native</h4>
                <p className="text-sm text-gray-300">
                  S'intègre parfaitement avec les PRs, Issues et autres fonctionnalités GitHub.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Simulateur d'Interface GitHub</h2>
        <p className="text-gray-300">Familiarisez-vous avec l'interface GitHub et ses fonctionnalités clés</p>
      </motion.div>

      <Card>
        <Tabs tabs={[repoTab, issuesTab, prTab, actionsTab]} />
      </Card>

      {/* Information Panel */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Fonctionnalités GitHub Essentielles</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <div className="font-medium text-blue-400">Repositories</div>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Stockent votre code et historique</li>
                <li>Peuvent être publics ou privés</li>
                <li>Incluent documentation, issues, etc.</li>
              </ul>
            </div>
            
            <div className="space-y-1">
              <div className="font-medium text-green-400">Issues</div>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Suivi des bugs et tâches</li>
                <li>Étiquettes et assignations</li>
                <li>Discussions collaboratives</li>
              </ul>
            </div>
            
            <div className="space-y-1">
              <div className="font-medium text-purple-400">Pull Requests</div>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Propose des changements de code</li>
                <li>Permet la revue de code</li>
                <li>Discussions par commentaires</li>
              </ul>
            </div>
            
            <div className="space-y-1">
              <div className="font-medium text-yellow-400">Actions</div>
              <ul className="list-disc pl-5 text-gray-300 space-y-1">
                <li>Automatisation CI/CD</li>
                <li>Tests et déploiement</li>
                <li>Workflows personnalisables</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Adding missing components for the simulation
const File: React.FC<{ className?: string }> = ({ className }) => {
  return <FileIcon className={className} />;
};

const Folder: React.FC<{ className?: string }> = ({ className }) => {
  return <FolderIcon className={className} />;
};

const FileIcon: React.FC<{ className?: string }> = (props) => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const FolderIcon: React.FC<{ className?: string }> = (props) => (
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
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const Filter: React.FC<{ className?: string }> = (props) => (
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export default GitHubInterfaceSimulator;