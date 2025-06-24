import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TutorialContent from './components/TutorialContent';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Certificate from './components/Certificate';
import GitCommandSimulator from './components/interactive/GitCommandSimulator';
import ConceptDiagram from './components/visualizations/ConceptDiagram';
import FileTreeViewer from './components/visualizations/FileTreeViewer';
import PracticeExercise from './components/tutorial/PracticeExercise';
import TutorialProvider from './context/TutorialContext';
import { Lock, MessageSquare, CheckCircle, TrendingUp, BookOpen, Share } from 'lucide-react';

function App() {
  const [selectedItem, setSelectedItem] = useState<string>('accueil');
  const [isTutorialActive, setIsTutorialActive] = useState<boolean>(false);

  const handleSelectItem = (itemId: string) => {
    setSelectedItem(itemId);
    setIsTutorialActive(false);
  };

  const handleStartTutorial = () => {
    setIsTutorialActive(true);
  };

  const handleNavigateToTutorial = (view: string, chapterId?: string, lessonId?: string, quizIndex?: number) => {
    setIsTutorialActive(true);
  };

  const renderContent = () => {
    if (isTutorialActive) {
      return <TutorialContent onReturnToHome={() => setIsTutorialActive(false)} />;
    }

    switch (selectedItem) {
      case 'accueil':
        return <HomePage onStartTutorial={handleStartTutorial} />;
      
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigateToTutorial} />;
      
      case 'certificate':
        return <Certificate />;
      
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
      
      case 'technical':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Contrôle Technique</h2>
              <p className="text-gray-300">Validez vos compétences avec des exercices pratiques</p>
            </div>
            <GitCommandSimulator />
          </div>
        );
      
      case 'simulation':
        return (
          <div className="space-y-8">
            <div className="text-center">
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
      case 'feedback':
      case 'progress':
      case 'summary':
      case 'export':
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Section en développement</h2>
              <p className="text-gray-400">Cette section sera bientôt disponible.</p>
            </div>
          </div>
        );
      
      // Si l'ID est un chapitre, démarrer le tutoriel
      case 'intro':
      case 'repositories':
      case 'branches':
      case 'remote':
      case 'collaboration':
      case 'workflows':
        setIsTutorialActive(true);
        return <TutorialContent onReturnToHome={() => setIsTutorialActive(false)} />;
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Section non trouvée</h2>
              <p className="text-gray-400">La section demandée n'existe pas.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <TutorialProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="flex">
          <Sidebar selectedItem={selectedItem} onSelectItem={handleSelectItem} />
          <div className="flex-1 p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </TutorialProvider>
  );
}

export default App;