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
import TutorialContent from './components/TutorialContent';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Certificate from './components/Certificate';
import { useTutorial } from './context/TutorialContext';

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
  const { userProgress, setLastPosition } = useTutorial();
  const [selectedItem, setSelectedItem] = useState<string>(
    userProgress.lastPosition.view === 'chapter-intro' || 
    userProgress.lastPosition.view === 'lesson' || 
    userProgress.lastPosition.view === 'quiz' || 
    userProgress.lastPosition.view === 'quiz-results' ||
    userProgress.lastPosition.view === 'chapter-summary'
      ? 'tutorial'
      : userProgress.lastPosition.view || 'accueil'
  );

  const handleSelectItem = (itemId: string) => {
    setSelectedItem(itemId);
    
    // Si l'utilisateur sélectionne un chapitre, mettre à jour la position
    if (['intro', 'repositories', 'branches', 'remote', 'collaboration', 'workflows'].includes(itemId)) {
      setLastPosition({
        view: 'chapter-intro',
        chapterId: itemId
      });
    } else {
      setLastPosition({
        view: itemId
      });
    }
  };

  const handleNavigate = (view: string, chapterId?: string, lessonId?: string, quizIndex?: number) => {
    setSelectedItem('tutorial');
    setLastPosition({
      view,
      chapterId,
      lessonId,
      quizIndex
    });
  };

  const renderMainContent = () => {
    if (selectedItem === 'tutorial') {
      return <TutorialContent onReturnToHome={() => setSelectedItem('accueil')} />;
    }
    
    switch (selectedItem) {
      case 'accueil':
        return <HomePage onStartTutorial={() => setSelectedItem('tutorial')} />;
      
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
        return <Dashboard onNavigate={handleNavigate} />;

      case 'intro':
      case 'repositories':
      case 'branches':
      case 'remote':
      case 'collaboration':
      case 'workflows':
        // Rediriger vers le contenu du tutoriel avec le chapitre sélectionné
        setSelectedItem('tutorial');
        setLastPosition({
          view: 'chapter-intro',
          chapterId: selectedItem
        });
        return <TutorialContent onReturnToHome={() => setSelectedItem('accueil')} />;
      
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
        return <Certificate />;

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
        <Sidebar selectedItem={selectedItem} onSelectItem={handleSelectItem} />

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

export default App;