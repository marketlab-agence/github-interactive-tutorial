import React, { useState, useEffect } from 'react';
import { User, Bell, Settings, LogOut, Menu, X, Home, Award, HelpCircle } from 'lucide-react';
import { useTutorial } from '../context/TutorialContext';
import Button from './ui/Button';
import Badge from './ui/Badge';

interface HeaderProps {
  onNavigate: (view: string) => void;
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onMenuToggle }) => {
  const { userProgress, resetProgress } = useTutorial();
  const [scrolled, setScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Effet de défilement pour ajouter une ombre à l'en-tête
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Obtenir le niveau en fonction du score global
  const getLevel = (score: number) => {
    if (score >= 90) return { name: 'Expert', color: 'text-purple-400' };
    if (score >= 75) return { name: 'Avancé', color: 'text-blue-400' };
    if (score >= 50) return { name: 'Intermédiaire', color: 'text-green-400' };
    return { name: 'Débutant', color: 'text-yellow-400' };
  };
  
  const userLevel = getLevel(userProgress.globalScore);

  return (
    <header className={`bg-gray-800 border-b border-gray-700 backdrop-blur-sm sticky top-0 z-50 ${
      scrolled ? 'shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo et bouton menu */}
          <div className="flex items-center space-x-3">
            <button 
              className="md:hidden text-gray-400 hover:text-white"
              onClick={onMenuToggle}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div 
              className="flex items-center space-x-2" 
              onClick={() => onNavigate('accueil')} 
              style={{cursor: 'pointer'}}
              aria-label="Retour à l'accueil"
            >
              <div className="bg-blue-600 text-white p-1.5 sm:p-2 rounded-lg">
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
                aria-label="Menu utilisateur"
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
      </div>
    </header>
  );
};

export default Header;