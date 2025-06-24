import React, { useState } from 'react';
import { User, Bell, Settings, LogOut, Menu, X, Home, Award, HelpCircle } from 'lucide-react';
import { useTutorial } from '../context/TutorialContext';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface HeaderProps {
  onNavigate: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { userProgress, resetProgress } = useTutorial();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Obtenir le niveau en fonction du score global
  const getLevel = (score: number) => {
    if (score >= 90) return { name: 'Expert', color: 'text-purple-400' };
    if (score >= 75) return { name: 'Avancé', color: 'text-blue-400' };
    if (score >= 50) return { name: 'Intermédiaire', color: 'text-green-400' };
    return { name: 'Débutant', color: 'text-yellow-400' };
  };
  
  const userLevel = getLevel(userProgress.globalScore);

  return (
    <header className="bg-gray-800/70 border-b border-gray-700 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center space-x-3">
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center space-x-2" onClick={() => onNavigate('accueil')} style={{cursor: 'pointer'}}>
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white hidden md:block">Git & GitHub Interactif</h1>
            </div>
          </div>

          {/* Navigation principale - visible sur desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('accueil')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Accueil
            </button>
            <button 
              onClick={() => onNavigate('tutorial')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Tutoriel
            </button>
            <button 
              onClick={() => onNavigate('practice')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Exercices
            </button>
            <button 
              onClick={() => onNavigate('certificate')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Certificat
            </button>
          </nav>

          {/* Menu utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="text-gray-400 hover:text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            
            {/* Progression */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">{userProgress.globalScore}%</span>
              </div>
              <div className="hidden lg:block">
                <div className="text-xs text-gray-400">Niveau</div>
                <div className={`text-sm font-medium ${userLevel.color}`}>{userLevel.name}</div>
              </div>
            </div>
            
            {/* Menu utilisateur */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  U
                </div>
                <span className="hidden lg:block text-white">Utilisateur</span>
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <div className="font-medium text-white">Utilisateur</div>
                    <div className="text-xs text-gray-400">utilisateur@exemple.com</div>
                  </div>
                  <button 
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      onNavigate('dashboard');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <User className="h-4 w-4" />
                    <span>Mon profil</span>
                  </button>
                  <button 
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      onNavigate('certificate');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <Award className="h-4 w-4" />
                    <span>Certificats</span>
                  </button>
                  <button 
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                    onClick={() => {
                      onNavigate('settings');
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Paramètres</span>
                  </button>
                  <div className="border-t border-gray-700 mt-1 pt-1">
                    <button 
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors"
                      onClick={() => {
                        if (window.confirm('Êtes-vous sûr de vouloir réinitialiser votre progression ? Cette action est irréversible.')) {
                          resetProgress();
                          window.location.reload();
                        }
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Réinitialiser progression</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  onNavigate('accueil');
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Accueil</span>
              </button>
              <button 
                onClick={() => {
                  onNavigate('tutorial');
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Tutoriel</span>
              </button>
              <button 
                onClick={() => {
                  onNavigate('practice');
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Exercices</span>
              </button>
              <button 
                onClick={() => {
                  onNavigate('dashboard');
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Tableau de bord</span>
              </button>
              <button 
                onClick={() => {
                  onNavigate('certificate');
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Award className="h-5 w-5" />
                <span>Certificat</span>
              </button>
              <button 
                onClick={() => {
                  onNavigate('help');
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Aide</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;