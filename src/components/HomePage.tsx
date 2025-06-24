import React from 'react';
import { GitCommit, BookOpen, Play, Award, ChevronRight } from 'lucide-react';
import { useTutorial } from '../context/TutorialContext';
import { chapters } from '../data/tutorialData';

interface HomePageProps {
  onStartTutorial: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartTutorial }) => {
  const { setLastPosition } = useTutorial();

  const handleStartTutorial = () => {
    // Définir le chapitre 1 (index 0) comme point de départ
    setLastPosition({
      view: 'chapter-intro',
      chapterId: chapters[0].id
    });
    onStartTutorial();
  };

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
          onClick={handleStartTutorial}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <span>Commencer le tutoriel</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;