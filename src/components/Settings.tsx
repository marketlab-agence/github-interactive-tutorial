import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Moon, Sun, Globe, Shield, Save } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button'; 
import { useTutorial } from '../context/TutorialContext';
import Alert from './ui/Alert';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'privacy'>('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Utilisateur',
    email: 'utilisateur@exemple.com',
    bio: 'Apprenant Git & GitHub',
    darkMode: true,
    language: 'fr',
    emailNotifications: true,
    progressNotifications: true,
    achievementNotifications: true,
    publicProfile: false,
    shareProgress: false,
    dataCollection: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Fonction pour sauvegarder les paramètres dans localStorage
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sauvegarder les paramètres dans localStorage
    localStorage.setItem('user-settings', JSON.stringify(formData));
    
    // Afficher le message de succès dans l'interface
    setSaveSuccess(true);
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <SettingsIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Paramètres</h2>
        <p className="text-gray-300">Personnalisez votre expérience d'apprentissage</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          {saveSuccess && (
            <Alert type="success" title="Paramètres sauvegardés" dismissible onDismiss={() => setSaveSuccess(false)}>
              Vos paramètres ont été enregistrés avec succès !
            </Alert>
          )}
          
          <Card>
            <nav className="space-y-1">
              <button
                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                  activeTab === 'profile' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                <User className="h-5 w-5" />
                <span>Profil</span>
              </button>
              <button
                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                  activeTab === 'notifications' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </button>
              <button
                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                  activeTab === 'appearance' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
                onClick={() => setActiveTab('appearance')}
              >
                {formData.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span>Apparence</span>
              </button>
              <button
                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${
                  activeTab === 'privacy' ? 'bg-blue-900/30 text-blue-400' : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
                onClick={() => setActiveTab('privacy')}
              >
                <Shield className="h-5 w-5" />
                <span>Confidentialité</span>
              </button>
            </nav>
          </Card>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <Card>
            <form onSubmit={handleSubmit}>
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Paramètres du profil</h3>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-shrink-0 flex flex-col items-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {formData.name.charAt(0)}
                      </div>
                      <button className="mt-2 text-sm text-blue-400 hover:text-blue-300">
                        Changer l'avatar
                      </button>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-gray-700 text-white px-3 py-2 w-full rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="bg-gray-700 text-white px-3 py-2 w-full rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows={3}
                          className="bg-gray-700 text-white px-3 py-2 w-full rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder les modifications
                    </Button>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Paramètres de notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Notifications par email</div>
                        <div className="text-sm text-gray-400">Recevoir des emails concernant votre progression</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          name="emailNotifications"
                          checked={formData.emailNotifications}
                          onChange={handleChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Mises à jour de progression</div>
                        <div className="text-sm text-gray-400">Notifications sur votre progression dans le tutoriel</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          name="progressNotifications"
                          checked={formData.progressNotifications}
                          onChange={handleChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Succès et récompenses</div>
                        <div className="text-sm text-gray-400">Notifications pour les badges et réalisations</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          name="achievementNotifications"
                          checked={formData.achievementNotifications}
                          onChange={handleChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder les modifications
                    </Button>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Paramètres d'apparence</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Mode sombre</div>
                        <div className="text-sm text-gray-400">Activer le thème sombre pour l'interface</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          name="darkMode"
                          checked={formData.darkMode}
                          onChange={handleChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <div className="font-medium text-white mb-2">Langue</div>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="bg-gray-700 text-white px-3 py-2 w-full rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder les modifications
                    </Button>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Paramètres de confidentialité</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Profil public</div>
                        <div className="text-sm text-gray-400">Rendre votre profil visible pour les autres utilisateurs</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          name="publicProfile"
                          checked={formData.publicProfile}
                          onChange={handleChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Partager ma progression</div>
                        <div className="text-sm text-gray-400">Permettre aux autres de voir votre progression</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          name="shareProgress"
                          checked={formData.shareProgress}
                          onChange={handleChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Collecte de données</div>
                        <div className="text-sm text-gray-400">Autoriser la collecte de données pour améliorer l'expérience</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          name="dataCollection"
                          checked={formData.dataCollection}
                          onChange={handleChange}
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder les modifications
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;