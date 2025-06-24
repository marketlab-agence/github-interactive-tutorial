import React from 'react';
import { GitCommit, CheckCircle, X } from 'lucide-react';
import { useTutorial } from '../context/TutorialContext';
import { chapters } from '../data/tutorialData';

interface SidebarProps {
  selectedItem: string;
  onSelectItem: (itemId: string) => void;
  mobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  selectedItem, 
  onSelectItem, 
  mobileMenuOpen = false,
  onCloseMobileMenu = () => {}
}) => {
  const { userProgress } = useTutorial();
  
  // Fonction pour vérifier si un chapitre est déverrouillé
  const isChapterUnlocked = (chapterId: string, index: number) => {
    // Le premier chapitre est toujours déverrouillé
    if (index === 0) return true;
    
    // Pour les autres chapitres, vérifier si le chapitre précédent est complété
    const previousChapterId = chapters[index - 1]?.id;
    return previousChapterId && userProgress.completedChapters.includes(previousChapterId);
  };

  const sections = [
    {
      id: 'entry',
      title: 'Phase d\'Entrée',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500/30',
      items: [
        {
          id: 'accueil',
          title: 'Page d\'Accueil',
          subtitle: 'Vue d\'ensemble principale avec présentation du contenu',
          icon: '🏠',
          completed: true
        },
        {
          id: 'auth',
          title: 'Authentification',
          subtitle: 'Connexion système et gestion compte programmeur',
          icon: '🔒'
        },
        {
          id: 'dashboard',
          title: 'Tableau de Bord',
          subtitle: 'Vue d\'ensemble de la progression et éléments clés du système',
          icon: '📊'
        }
      ]
    },
    {
      id: 'learning',
      title: 'Parcours d\'Apprentissage',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500/30',
      items: chapters.map((chapter, index) => ({
        id: chapter.id,
        title: `Chapitre ${index + 1}: ${chapter.title}`,
        subtitle: chapter.description.split('.')[0],
        icon: index === 0 ? '📖' : 
              index === 1 ? '📁' : 
              index === 2 ? '🔀' : 
              index === 3 ? '☁️' : '👥',
        completed: userProgress.completedChapters.includes(chapter.id),
        inProgress: userProgress.lastPosition.chapterId === chapter.id && 
                  !userProgress.completedChapters.includes(chapter.id),
        locked: !isChapterUnlocked(chapter.id, index)
      }))
    },
    {
      id: 'activities',
      title: 'Activités Interactives',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/20',
      borderColor: 'border-orange-500/30',
      items: [
        {
          id: 'technical',
          title: 'Contrôle Technique',
          subtitle: 'Validation des compétences avec retour directe',
          icon: '⚙️'
        },
        {
          id: 'simulation',
          title: 'Simulation Interactive',
          subtitle: 'Visualisation directe des concepts Git',
          icon: '▶️'
        },
        {
          id: 'practice',
          title: 'Exercice Pratique',
          subtitle: 'Application par construction en suivant',
          icon: '✏️'
        }
      ]
    },
    {
      id: 'validation',
      title: 'Validation & Feedback',
      color: 'text-pink-400',
      bgColor: 'bg-pink-900/20',
      borderColor: 'border-pink-500/30',
      items: [
        {
          id: 'evaluation',
          title: 'Évaluation Automatique',
          subtitle: 'Validation des étapes et du devoirs',
          icon: '✅'
        },
        {
          id: 'feedback',
          title: 'Feedback Personnalisé',
          subtitle: 'Conseils et suggestions basés sur le progrès',
          icon: '💬'
        },
        {
          id: 'progress',
          title: 'Suivi/mode Progression',
          subtitle: 'Suivi des progrès individuels via l\'envi de logiciel',
          icon: '📈'
        }
      ]
    }
  ];

  return (
    <div className={`${mobileMenuOpen ? 'mobile-sidebar open' : 'hidden md:block'} w-64 md:w-72 lg:w-80 bg-gray-800 border-r border-gray-700 min-h-screen z-40`}>
      <div className="p-4 md:p-6 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <GitCommit className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-base md:text-xl font-bold">Tutoriel GitHub</h1>
            <p className="text-sm text-gray-400">Flux UI</p>
          </div>
        </div>
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={onCloseMobileMenu}
          aria-label="Fermer le menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="p-3 md:p-4 space-y-3 md:space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]">
        {sections.map((section) => (
          <div key={section.id} className={`${section.bgColor} bg-opacity-80 rounded-xl p-4 border ${section.borderColor}`}>
            <h2 className={`font-bold mb-4 flex items-center ${section.color}`}>
              <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => !item.locked && onSelectItem(item.id)}
                  disabled={item.locked}
                  className={`w-full text-left p-2 md:p-3 rounded-lg transition-all duration-200 border ${
                    selectedItem === item.id
                      ? 'bg-white/20 border-white/40'
                      : item.locked
                        ? 'border-transparent bg-gray-800/50 opacity-50 cursor-not-allowed'
                        : 'border-transparent hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 mt-1">{item.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white text-xs sm:text-sm">{item.title}</h3>
                        {item.completed && (
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        )}
                        {item.inProgress && (
                          <div className="w-4 h-4 bg-orange-400 rounded-full flex-shrink-0 animate-pulse"></div>
                        )}
                        {item.locked && (
                          <span className="text-gray-500">🔒</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1 sm:line-clamp-2">{item.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-400">Phase d'Entrée</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">Apprentissage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-400">Interactif</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
            <span className="text-gray-400">Validation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-400">Achèvement</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;