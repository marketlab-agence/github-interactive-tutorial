import React, { useState } from 'react';
import { Home, Lock, LayoutDashboard, BookOpen, GitBranch, Cloud, Users, Settings, Play, PenTool, CheckCircle, MessageSquare, TrendingUp, Award, Share, Download, ChevronRight, GitCommit, Factory as Repository } from 'lucide-react';

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  completed?: boolean;
  inProgress?: boolean;
}

interface Section {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  items: MenuItem[];
}

function App() {
  const [selectedItem, setSelectedItem] = useState<string>('accueil');

  const sections: Section[] = [
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
          icon: Home,
          completed: true
        },
        {
          id: 'auth',
          title: 'Authentification',
          subtitle: 'Connexion système et gestion compte programmeur',
          icon: Lock
        },
        {
          id: 'dashboard',
          title: 'Tableau de Bord',
          subtitle: 'Vue d\'ensemble de la progression et éléments clés du système',
          icon: LayoutDashboard
        }
      ]
    },
    {
      id: 'learning',
      title: 'Parcours d\'Apprentissage',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500/30',
      items: [
        {
          id: 'intro',
          title: 'Chapitre 1: Introduction',
          subtitle: 'Git vs GitHub, concepts de base',
          icon: BookOpen,
          inProgress: true
        },
        {
          id: 'repositories',
          title: 'Chapitre 2: Repositories',
          subtitle: 'Création, commits, historique',
          icon: Repository
        },
        {
          id: 'branches',
          title: 'Chapitre 3: Branches',
          subtitle: 'Création, fusion, workflows',
          icon: GitBranch
        },
        {
          id: 'remote',
          title: 'Chapitre 4: Dépôts Distants',
          subtitle: 'Push, pull, synchronisation',
          icon: Cloud
        },
        {
          id: 'collaboration',
          title: 'Chapitre 5: Collaboration',
          subtitle: 'Pull Requests, revue de code',
          icon: Users
        }
      ]
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
          icon: Settings
        },
        {
          id: 'simulation',
          title: 'Simulation Interactive',
          subtitle: 'Visualisation directe des concepts Git',
          icon: Play
        },
        {
          id: 'practice',
          title: 'Exercice Pratique',
          subtitle: 'Application par construction en suivant',
          icon: PenTool
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
          icon: CheckCircle
        },
        {
          id: 'feedback',
          title: 'Feedback Personnalisé',
          subtitle: 'Conseils et suggestions basés sur le progrès',
          icon: MessageSquare
        },
        {
          id: 'progress',
          title: 'Suivi/mode Progression',
          subtitle: 'Suivi des progrès individuels via l\'envi de logiciel',
          icon: TrendingUp
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
          icon: BookOpen
        },
        {
          id: 'certificate',
          title: 'Certificat de Complétion',
          subtitle: 'Validation officielle des compétences acquises',
          icon: Award
        },
        {
          id: 'export',
          title: 'Partage & Export',
          subtitle: 'Partage social et téléchargement PDF',
          icon: Share
        }
      ]
    }
  ];

  const renderMainContent = () => {
    switch (selectedItem) {
      case 'accueil':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <GitCommit className="h-12 w-12 text-blue-400" />
                <h1 className="text-4xl font-bold text-white">Tutoriel Git & GitHub</h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Maîtrisez les fondamentaux du contrôle de version avec Git et GitHub à travers 
                un parcours d'apprentissage interactif et progressif.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">5 Chapitres</h3>
                </div>
                <p className="text-gray-300">
                  Un parcours structuré couvrant tous les aspects essentiels de Git et GitHub
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Play className="h-8 w-8 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Interactif</h3>
                </div>
                <p className="text-gray-300">
                  Simulations et exercices pratiques pour une meilleure compréhension
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="h-8 w-8 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Certification</h3>
                </div>
                <p className="text-gray-300">
                  Obtenez votre certificat de complétion à la fin du parcours
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Prêt à commencer ?</h2>
              <p className="text-gray-300 mb-6">
                Démarrez votre apprentissage avec le Chapitre 1: Introduction aux concepts de base de Git et GitHub.
              </p>
              <button 
                onClick={() => setSelectedItem('intro')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>Commencer le tutoriel</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        );
      
      case 'intro':
        return (
          <div className="space-y-8">
            <div className="border-l-4 border-green-500 pl-6">
              <h1 className="text-3xl font-bold text-white mb-2">Chapitre 1: Introduction</h1>
              <p className="text-green-400 font-medium">Git vs GitHub, concepts de base</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <GitCommit className="h-6 w-6 text-green-400 mr-3" />
                    Qu'est-ce que Git ?
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Git est un système de contrôle de version distribué qui permet de:
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      Suivre les modifications de code
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      Collaborer avec d'autres développeurs
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      Maintenir un historique complet
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Cloud className="h-6 w-6 text-blue-400 mr-3" />
                    GitHub : La plateforme
                  </h3>
                  <p className="text-gray-300">
                    GitHub est une plateforme web qui héberge des dépôts Git et offre des outils 
                    de collaboration avancés pour les équipes de développement.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Simulation Interactive</h3>
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <code className="text-green-400 text-sm">
                    $ git init<br/>
                    Initialized empty Git repository in /project/.git/
                  </code>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Cette commande initialise un nouveau dépôt Git dans votre projet.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Essayer la commande
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-700">
              <button className="text-gray-400 hover:text-white transition-colors">
                ← Précédent
              </button>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              </div>
              <button 
                onClick={() => setSelectedItem('repositories')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <span>Suivant</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Section en développement</h2>
              <p className="text-gray-400">Cette section sera bientôt disponible.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
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
                      onClick={() => setSelectedItem(item.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                        selectedItem === item.id
                          ? 'bg-white/10 border-white/30'
                          : 'border-transparent hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <item.icon className={`h-5 w-5 ${section.color}`} />
                        </div>
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

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

export default App;