import React, { useState } from 'react';
import { Users, Award, BookOpen, BarChart2, Settings, LogOut, Search, UserPlus, Trash2, Edit, Eye } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface User {
  id: string;
  name: string;
  email: string;
  progress: number;
  level: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'blocked';
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'stats' | 'content' | 'settings'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);

  // Données simulées
  const users: User[] = [
    { id: '1', name: 'Alice Martin', email: 'alice@example.com', progress: 85, level: 'Avancé', lastActive: '2024-01-17', status: 'active' },
    { id: '2', name: 'Bob Dupont', email: 'bob@example.com', progress: 42, level: 'Intermédiaire', lastActive: '2024-01-16', status: 'active' },
    { id: '3', name: 'Claire Moreau', email: 'claire@example.com', progress: 67, level: 'Intermédiaire', lastActive: '2024-01-15', status: 'inactive' },
    { id: '4', name: 'David Leroy', email: 'david@example.com', progress: 23, level: 'Débutant', lastActive: '2024-01-10', status: 'active' },
    { id: '5', name: 'Emma Petit', email: 'emma@example.com', progress: 95, level: 'Expert', lastActive: '2024-01-17', status: 'active' },
    { id: '6', name: 'François Dubois', email: 'francois@example.com', progress: 12, level: 'Débutant', lastActive: '2024-01-05', status: 'blocked' }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active': return <Badge variant="success">Actif</Badge>;
      case 'inactive': return <Badge variant="warning">Inactif</Badge>;
      case 'blocked': return <Badge variant="error">Bloqué</Badge>;
      default: return null;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'text-yellow-400';
      case 'Intermédiaire': return 'text-green-400';
      case 'Avancé': return 'text-blue-400';
      case 'Expert': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            className="bg-gray-700 text-white pl-10 pr-3 py-2 w-full rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddUserModalOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter un utilisateur
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Utilisateur</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Progression</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Niveau</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Dernière activité</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${user.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-300">{user.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getLevelColor(user.level)}`}>
                      {user.level}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                    {user.lastActive}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button 
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-yellow-400 hover:text-yellow-300"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditUserModalOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-400 hover:text-red-300"
                        onClick={() => {
                          if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.name} ?`)) {
                            // Logique de suppression
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedUser && (
        <Card>
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {selectedUser.name.charAt(0)}
              </div>
              <div className="mt-3 text-center">
                <div className="text-lg font-medium text-white">{selectedUser.name}</div>
                <div className="text-sm text-gray-400">{selectedUser.email}</div>
                <div className="mt-2">
                  {getStatusBadge(selectedUser.status)}
                </div>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Progression</div>
                  <div className="text-2xl font-bold text-blue-400">{selectedUser.progress}%</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Niveau</div>
                  <div className={`text-2xl font-bold ${getLevelColor(selectedUser.level)}`}>{selectedUser.level}</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Dernière activité</div>
                  <div className="text-2xl font-bold text-gray-300">{selectedUser.lastActive}</div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-3">Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary">
                    Réinitialiser progression
                  </Button>
                  <Button size="sm" variant={selectedUser.status === 'blocked' ? 'success' : 'danger'}>
                    {selectedUser.status === 'blocked' ? 'Débloquer' : 'Bloquer'}
                  </Button>
                  <Button size="sm">
                    Envoyer un message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

  const renderStatsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{users.length}</div>
            <div className="text-sm text-gray-400">Utilisateurs totaux</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {users.filter(u => u.status === 'active').length}
            </div>
            <div className="text-sm text-gray-400">Utilisateurs actifs</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">
              {Math.round(users.reduce((acc, user) => acc + user.progress, 0) / users.length)}%
            </div>
            <div className="text-sm text-gray-400">Progression moyenne</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {users.filter(u => u.progress === 100).length}
            </div>
            <div className="text-sm text-gray-400">Certifications</div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Répartition des niveaux</h3>
        <div className="h-64 flex items-end space-x-6">
          {[
            { level: 'Débutant', count: users.filter(u => u.level === 'Débutant').length, color: 'bg-yellow-500' },
            { level: 'Intermédiaire', count: users.filter(u => u.level === 'Intermédiaire').length, color: 'bg-green-500' },
            { level: 'Avancé', count: users.filter(u => u.level === 'Avancé').length, color: 'bg-blue-500' },
            { level: 'Expert', count: users.filter(u => u.level === 'Expert').length, color: 'bg-purple-500' }
          ].map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="text-sm text-gray-400 mb-2">{item.count}</div>
              <div 
                className={`w-full ${item.color} rounded-t-lg`} 
                style={{ height: `${(item.count / users.length) * 200}px` }}
              />
              <div className="text-sm text-gray-300 mt-2">{item.level}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Progression par chapitre</h3>
          <div className="space-y-4">
            {[
              { chapter: 'Introduction', completion: 92 },
              { chapter: 'Dépôts', completion: 78 },
              { chapter: 'Branches', completion: 65 },
              { chapter: 'Dépôts distants', completion: 43 },
              { chapter: 'Collaboration', completion: 31 }
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{item.chapter}</span>
                  <span className="text-gray-400">{item.completion}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${item.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Activité récente</h3>
          <div className="space-y-3">
            {[
              { user: 'Alice Martin', action: 'a terminé le chapitre 3', time: 'il y a 2 heures' },
              { user: 'Bob Dupont', action: 'a commencé le tutoriel', time: 'il y a 5 heures' },
              { user: 'Emma Petit', action: 'a obtenu son certificat', time: 'il y a 1 jour' },
              { user: 'David Leroy', action: 'a réussi le quiz du chapitre 1', time: 'il y a 2 jours' },
              { user: 'Claire Moreau', action: 'est inactive depuis 3 jours', time: 'il y a 3 jours' }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.user.charAt(0)}
                </div>
                <div>
                  <div className="text-sm text-white">
                    <span className="font-medium">{item.user}</span> {item.action}
                  </div>
                  <div className="text-xs text-gray-400">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Gestion du contenu</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-white">Chapitres</h4>
            <Button size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Ajouter un chapitre
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Titre</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Leçons</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Durée</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  { title: 'Introduction à Git et GitHub', lessons: 4, duration: '45 min' },
                  { title: 'Dépôts et Commits', lessons: 4, duration: '60 min' },
                  { title: 'Branches et Fusion', lessons: 4, duration: '75 min' },
                  { title: 'Dépôts Distants', lessons: 4, duration: '50 min' },
                  { title: 'Collaboration et Pull Requests', lessons: 4, duration: '90 min' }
                ].map((chapter, index) => (
                  <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">Chapitre {index + 1}: {chapter.title}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      {chapter.lessons} leçons
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      {chapter.duration}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-400 hover:text-blue-300">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-yellow-400 hover:text-yellow-300">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Statistiques du contenu</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">5</div>
              <div className="text-sm text-gray-400">Chapitres</div>
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">20</div>
              <div className="text-sm text-gray-400">Leçons</div>
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">20</div>
              <div className="text-sm text-gray-400">Questions de quiz</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Paramètres de l'application</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div>
              <div className="font-medium text-white">Mode maintenance</div>
              <div className="text-sm text-gray-400">Mettre l'application en mode maintenance</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div>
              <div className="font-medium text-white">Notifications par email</div>
              <div className="text-sm text-gray-400">Envoyer des emails aux utilisateurs</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
            <div>
              <div className="font-medium text-white">Inscription ouverte</div>
              <div className="text-sm text-gray-400">Permettre aux nouveaux utilisateurs de s'inscrire</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Sauvegardes</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-white">Dernière sauvegarde</div>
              <div className="text-sm text-gray-400">17 janvier 2024, 08:30</div>
            </div>
            <Button size="sm">
              Créer une sauvegarde
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Taille</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[
                  { date: '17 janvier 2024, 08:30', size: '2.4 MB' },
                  { date: '16 janvier 2024, 08:30', size: '2.3 MB' },
                  { date: '15 janvier 2024, 08:30', size: '2.3 MB' }
                ].map((backup, index) => (
                  <tr key={index} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-white">
                      {backup.date}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                      {backup.size}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-400 hover:text-blue-300">
                          Télécharger
                        </button>
                        <button className="text-green-400 hover:text-green-300">
                          Restaurer
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold">Administration</h1>
                <p className="text-xs text-gray-400">Panneau de contrôle</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                activeTab === 'users' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
              }`}
              onClick={() => setActiveTab('users')}
            >
              <Users className="h-5 w-5" />
              <span>Utilisateurs</span>
            </button>
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                activeTab === 'stats' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              <BarChart2 className="h-5 w-5" />
              <span>Statistiques</span>
            </button>
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                activeTab === 'content' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
              }`}
              onClick={() => setActiveTab('content')}
            >
              <BookOpen className="h-5 w-5" />
              <span>Contenu</span>
            </button>
            <button
              className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                activeTab === 'settings' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </button>
          </nav>

          <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
            <button
              className="flex items-center space-x-3 w-full p-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
              onClick={() => {
                if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
                  window.location.href = '/';
                }
              }}
            >
              <LogOut className="h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {activeTab === 'users' && 'Gestion des utilisateurs'}
                {activeTab === 'stats' && 'Statistiques'}
                {activeTab === 'content' && 'Gestion du contenu'}
                {activeTab === 'settings' && 'Paramètres'}
              </h2>
              <div className="text-sm text-gray-400">
                {new Date().toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>

            {activeTab === 'users' && renderUsersTab()}
            {activeTab === 'stats' && renderStatsTab()}
            {activeTab === 'content' && renderContentTab()}
            {activeTab === 'settings' && renderSettingsTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;