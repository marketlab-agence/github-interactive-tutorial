import React from 'react';
import { GitCommit, CheckCircle } from 'lucide-react';
import { useTutorial } from '../context/TutorialContext';
import { chapters, menuItems } from '../data/tutorialData';

interface SidebarProps {
  selectedItem: string;
  onSelectItem: (itemId: string) => void;
}

interface Section {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  items: any[];
}

const Sidebar: React.FC<SidebarProps> = ({ selectedItem, onSelectItem }) => {
  const { userProgress } = useTutorial();

  const sections: Section[] = [
    {
      id: 'entry',
      title: 'Phase d\'Entrée',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500/30',
      items: menuItems.entry
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
        icon: index === 0 ? 'BookOpen' : 
              index === 1 ? 'Repository' : 
              index === 2 ? 'GitBranch' : 
              index === 3 ? 'Cloud' : 'Users',
        inProgress: userProgress.currentChapter === index && 
                   !userProgress.completedChapters.includes(chapter.id),
        completed: userProgress.completedChapters.includes(chapter.id)
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
          icon: 'Settings'
        },
        {
          id: 'simulation',
          title: 'Simulation Interactive',
          subtitle: 'Visualisation directe des concepts Git',
          icon: 'Play'
        },
        {
          id: 'practice',
          title: 'Exercice Pratique',
          subtitle: 'Application par construction en suivant',
          icon: 'PenTool'
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
          icon: 'CheckCircle'
        },
        {
          id: 'feedback',
          title: 'Feedback Personnalisé',
          subtitle: 'Conseils et suggestions basés sur le progrès',
          icon: 'MessageSquare'
        },
        {
          id: 'progress',
          title: 'Suivi/mode Progression',
          subtitle: 'Suivi des progrès individuels via l\'envi de logiciel',
          icon: 'TrendingUp'
        }
      ]
    },
    {
      id: 'achievement',
      title: 'Achèvement',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-500/30',
      items: [
        {
          id: 'summary',
          title: 'Résumé de Chapitre',
          subtitle: 'Récapitulatif par activité clés acquises',
          icon: 'BookOpen'
        },
        {
          id: 'certificate',
          title: 'Certificat de Complétion',
          subtitle: 'Validation officielle des compétences acquises',
          icon: 'Award'
        },
        {
          id: 'export',
          title: 'Partage & Export',
          subtitle: 'Partage social et téléchargement PDF',
          icon: 'Share'
        }
      ]
    }
  ];

  // Fonction pour obtenir l'icône en tant que composant
  const getIconComponent = (iconName: string) => {
    const icons = {
      'Home': () => <span className="flex-shrink-0 mt-1">🏠</span>,
      'Lock': () => <span className="flex-shrink-0 mt-1">🔒</span>,
      'LayoutDashboard': () => <span className="flex-shrink-0 mt-1">📊</span>,
      'BookOpen': () => <span className="flex-shrink-0 mt-1">📖</span>,
      'Repository': () => <span className="flex-shrink-0 mt-1">📁</span>,
      'GitBranch': () => <span className="flex-shrink-0 mt-1">🔀</span>,
      'Cloud': () => <span className="flex-shrink-0 mt-1">☁️</span>,
      'Users': () => <span className="flex-shrink-0 mt-1">👥</span>,
      'Settings': () => <span className="flex-shrink-0 mt-1">⚙️</span>,
      'Play': () => <span className="flex-shrink-0 mt-1">▶️</span>,
      'PenTool': () => <span className="flex-shrink-0 mt-1">✏️</span>,
      'CheckCircle': () => <span className="flex-shrink-0 mt-1">✅</span>,
      'MessageSquare': () => <span className="flex-shrink-0 mt-1">💬</span>,
      'TrendingUp': () => <span className="flex-shrink-0 mt-1">📈</span>,
      'Award': () => <span className="flex-shrink-0 mt-1">🏆</span>,
      'Share': () => <span className="flex-shrink-0 mt-1">📤</span>
    };
    
    return icons[iconName] ? icons[iconName]() : <span className="flex-shrink-0 mt-1">📄</span>;
  };

  return (
    <div className="w-80 bg-gray-800/50 border-r border-gray-700 min-h-screen">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <GitCommit className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">Tutoriel GitHub Interactif</h1>
            <p className="text-sm text-gray-400">Flux UI</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.id} className={`${section.bgColor} rounded-xl p-4 border ${section.borderColor}`}>
            <h2 className={`font-bold mb-4 flex items-center ${section.color}`}>
              <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                    selectedItem === item.id
                      ? 'bg-white/10 border-white/30'
                      : 'border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {getIconComponent(item.icon)}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white text-sm">{item.title}</h3>
                        {item.completed && (
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        )}
                        {item.inProgress && (
                          <div className="w-4 h-4 bg-orange-400 rounded-full flex-shrink-0 animate-pulse"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-700">
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