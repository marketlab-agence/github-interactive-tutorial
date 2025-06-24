import React, { useState } from 'react';
import { Home, Lock, LayoutDashboard, BookOpen, GitBranch, Cloud, Users, Settings, Play, PenTool, CheckCircle, MessageSquare, TrendingUp, Award, Share, Download, ChevronRight, GitCommit, Factory as Repository } from 'lucide-react';

// Import des composants
import TutorialLayout from './components/layout/TutorialLayout';
import ChapterIntro from './components/tutorial/ChapterIntro';
import LessonContent from './components/tutorial/LessonContent';
import StepByStep from './components/tutorial/StepByStep';
import QuizQuestion from './components/tutorial/QuizQuestion';
import PracticeExercise from './components/tutorial/PracticeExercise';
import GitCommandSimulator from './components/interactive/GitCommandSimulator';
import BranchCreator from './components/interactive/BranchCreator';
import GitRepositoryPlayground from './components/interactive/GitRepositoryPlayground';
import ConflictResolver from './components/interactive/ConflictResolver';
import PullRequestCreator from './components/interactive/PullRequestCreator';
import CollaborationSimulator from './components/interactive/CollaborationSimulator';
import CommitTimeline from './components/visualizations/CommitTimeline';
import BranchDiagram from './components/visualizations/BranchDiagram';
import GitGraph from './components/visualizations/GitGraph';
import DiffViewer from './components/visualizations/DiffViewer';
import FileTreeViewer from './components/visualizations/FileTreeViewer';
import AnimatedFlow from './components/visualizations/AnimatedFlow';
import ConceptDiagram from './components/visualizations/ConceptDiagram';
import NetworkGraph from './components/visualizations/NetworkGraph';
import StatisticsChart from './components/visualizations/StatisticsChart';
import EvaluationAutomatique from './components/validation/EvaluationAutomatique';
import FeedbackPersonnalise from './components/validation/FeedbackPersonnalise';
import SuiviProgression from './components/validation/SuiviProgression';

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
          title: 'Chapitre 2: Dépôts',
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
          <ChapterIntro
            chapterNumber={1}
            title="Introduction à Git et GitHub"
            description="Découvrez les concepts fondamentaux du contrôle de version et la différence entre Git et GitHub."
            objectives={[
              "Comprendre la différence entre Git et GitHub",
              "Apprendre les concepts de base du contrôle de version",
              "Configurer votre premier dépôt Git",
              "Maîtriser les commandes Git essentielles"
            ]}
            estimatedTime={45}
            onStart={() => setSelectedItem('repositories')}
          />
        );

      case 'repositories':
        return (
          <div className="space-y-8">
            <ChapterIntro
              chapterNumber={2}
              title="Dépôts et Commits"
              description="Apprenez à créer et gérer des dépôts Git, ainsi qu'à effectuer vos premiers commits."
              objectives={[
                "Créer un nouveau dépôt Git",
                "Comprendre la zone de staging",
                "Effectuer des commits significatifs",
                "Naviguer dans l'historique des commits"
              ]}
              estimatedTime={60}
              onStart={() => {}}
            />
            <GitRepositoryPlayground />
            <CommitTimeline />
          </div>
        );

      case 'branches':
        return (
          <div className="space-y-8">
            <ChapterIntro
              chapterNumber={3}
              title="Branches et Fusion"
              description="Maîtrisez la création de branches et les techniques de fusion pour un développement parallèle."
              objectives={[
                "Créer et gérer des branches",
                "Comprendre les stratégies de fusion",
                "Résoudre les conflits de fusion",
                "Utiliser les workflows de branches"
              ]}
              estimatedTime={75}
              onStart={() => {}}
            />
            <BranchCreator />
            <BranchDiagram />
            <ConflictResolver />
          </div>
        );

      case 'remote':
        return (
          <div className="space-y-8">
            <ChapterIntro
              chapterNumber={4}
              title="Dépôts Distants"
              description="Apprenez à synchroniser votre travail avec des dépôts distants et à collaborer efficacement."
              objectives={[
                "Configurer des dépôts distants",
                "Maîtriser push et pull",
                "Gérer la synchronisation",
                "Comprendre fetch vs pull"
              ]}
              estimatedTime={50}
              onStart={() => {}}
            />
            <AnimatedFlow />
            <GitGraph />
          </div>
        );

      case 'collaboration':
        return (
          <div className="space-y-8">
            <ChapterIntro
              chapterNumber={5}
              title="Collaboration et Pull Requests"
              description="Découvrez les outils de collaboration GitHub et les bonnes pratiques de travail en équipe."
              objectives={[
                "Créer des Pull Requests",
                "Effectuer des revues de code",
                "Gérer les workflows d'équipe",
                "Utiliser les outils de collaboration GitHub"
              ]}
              estimatedTime={90}
              onStart={() => {}}
            />
            <PullRequestCreator />
            <CollaborationSimulator />
            <NetworkGraph />
          </div>
        );

      case 'auth':
        return (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <Lock className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Authentification</h2>
              <p className="text-gray-300">Connectez-vous pour accéder au tutoriel complet</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
                  <input
                    type="password"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <LayoutDashboard className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Tableau de Bord</h2>
              <p className="text-gray-300">Suivez votre progression et vos statistiques d'apprentissage</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">75%</div>
                  <div className="text-sm text-gray-400">Progression Globale</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">3/5</div>
                  <div className="text-sm text-gray-400">Chapitres Complétés</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">2h 30m</div>
                  <div className="text-sm text-gray-400">Temps d'Étude</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">12</div>
                  <div className="text-sm text-gray-400">Exercices Réussis</div>
                </div>
              </div>
            </div>

            <StatisticsChart />
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Settings className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Contrôle Technique</h2>
              <p className="text-gray-300">Validez vos compétences avec des exercices pratiques</p>
            </div>
            <GitCommandSimulator />
            <QuizQuestion
              question="Quelle commande Git permet d'initialiser un nouveau dépôt ?"
              options={["git start", "git init", "git create", "git new"]}
              correctAnswer={1}
              explanation="La commande 'git init' initialise un nouveau dépôt Git dans le répertoire courant."
            />
          </div>
        );

      case 'simulation':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Play className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Simulation Interactive</h2>
              <p className="text-gray-300">Explorez les concepts Git de manière visuelle et interactive</p>
            </div>
            <ConceptDiagram />
            <FileTreeViewer />
          </div>
        );

      case 'practice':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <PenTool className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Exercice Pratique</h2>
              <p className="text-gray-300">Mettez en pratique vos connaissances avec des exercices guidés</p>
            </div>
            <PracticeExercise
              title="Premier Commit Git"
              description="Apprenez à effectuer votre premier commit en suivant les étapes."
              instructions={[
                "Initialisez un nouveau dépôt Git",
                "Créez un fichier README.md",
                "Ajoutez le fichier à la zone de staging",
                "Effectuez votre premier commit"
              ]}
              expectedCommands={["git init", "touch README.md", "git add README.md", "git commit -m 'Initial commit'"]}
              hints={[
                "Utilisez 'git init' pour initialiser le dépôt",
                "Créez le fichier avec 'touch' ou votre éditeur",
                "N'oubliez pas d'ajouter le fichier avant de commiter",
                "Utilisez un message de commit descriptif"
              ]}
            />
          </div>
        );

      case 'evaluation':
        return <EvaluationAutomatique />;

      case 'feedback':
        return <FeedbackPersonnalise />;

      case 'progress':
        return <SuiviProgression />;

      case 'summary':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Résumé de Chapitre</h2>
              <p className="text-gray-300">Récapitulatif des concepts clés appris</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Chapitre 1 - Introduction</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">Concepts maîtrisés</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Différence Git vs GitHub</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Contrôle de version</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Configuration initiale</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">Prochaines étapes</h4>
                  <p className="text-gray-300">
                    Continuez avec le Chapitre 2 pour apprendre à créer et gérer 
                    vos premiers dépôts Git.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'certificate':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Award className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Certificat de Complétion</h2>
              <p className="text-gray-300">Félicitations ! Vous avez terminé le tutoriel</p>
            </div>
            
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/30">
              <div className="text-center space-y-6">
                <Award className="h-20 w-20 text-yellow-400 mx-auto" />
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Certificat d'Excellence</h3>
                  <p className="text-gray-300">Tutoriel Git & GitHub Interactif</p>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <p className="text-lg text-white mb-2">Décerné à</p>
                  <p className="text-2xl font-bold text-purple-400 mb-4">Votre Nom</p>
                  <p className="text-gray-300">
                    Pour avoir complété avec succès le parcours d'apprentissage 
                    Git & GitHub et démontré une maîtrise des concepts essentiels.
                  </p>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Télécharger PDF</span>
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Share className="h-5 w-5" />
                    <span>Partager</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Share className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Partage & Export</h2>
              <p className="text-gray-300">Partagez vos accomplissements et exportez vos données</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Partage Social</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    Partager sur LinkedIn
                  </button>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors">
                    Partager sur Twitter
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                    Copier le lien
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Export de Données</h3>
                <div className="space-y-3">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Exporter Progression (JSON)</span>
                  </button>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Certificat (PDF)</span>
                  </button>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Statistiques (CSV)</span>
                  </button>
                </div>
              </div>
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