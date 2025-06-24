import React from 'react';
import { GitCommit, BookOpen, Play, Award, ChevronRight } from 'lucide-react';
import { useTutorial } from '../context/TutorialContext';
import { chapters } from '../data/tutorialData';
import Button from './ui/Button';

interface HomePageProps {
  onStartTutorial: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartTutorial }) => {
  const { userProgress, setLastPosition } = useTutorial();

  // Trouver le dernier chapitre déverrouillé
  const findLastUnlockedChapter = () => {
    // Le premier chapitre est toujours déverrouillé
    let lastUnlockedChapter = 0;
    
    // Parcourir les chapitres pour trouver le dernier déverrouillé
    for (let i = 1; i < chapters.length; i++) {
      const previousChapterId = chapters[i - 1]?.id;
      if (previousChapterId && userProgress.completedChapters.includes(previousChapterId)) {
        lastUnlockedChapter = i;
      } else {
        break;
      }
    }
    
    return lastUnlockedChapter;
  };

  const handleStartTutorial = () => {
    // Trouver le dernier chapitre déverrouillé
    const lastUnlockedChapter = findLastUnlockedChapter();
    
    // Si l'utilisateur a déjà commencé, le rediriger vers sa dernière position
    if (userProgress.lastPosition.chapterId) {
      // Vérifier si le chapitre de la dernière position est déverrouillé
      const chapterIndex = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
      if (chapterIndex !== -1 && chapterIndex <= lastUnlockedChapter) {
        // Utiliser la dernière position
        onStartTutorial();
        return;
      }
    }
    
    // Sinon, commencer par le premier chapitre ou le dernier déverrouillé
    setLastPosition({
      view: 'chapter-intro',
      chapterId: chapters[lastUnlockedChapter].id
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-blue-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">5 Chapitres</h3>
          </div>
          <p className="text-gray-300">
            Un parcours structuré couvrant tous les aspects essentiels de Git et GitHub
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-green-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <Play className="h-8 w-8 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Interactif</h3>
          </div>
          <p className="text-gray-300">
            Simulations et exercices pratiques pour une meilleure compréhension
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 border border-purple-500/30">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="h-8 w-8 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Certification</h3>
          </div>
          <p className="text-gray-300">
            Obtenez votre certificat de complétion à la fin du parcours
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-4 sm:p-8 border border-blue-500/30">
        <h2 className="text-2xl font-bold text-white mb-4">Prêt à commencer ?</h2>
        <p className="text-gray-300 mb-6">
          {userProgress.lastPosition.chapterId 
            ? "Reprenez votre apprentissage là où vous vous êtes arrêté."
            : "Démarrez votre apprentissage avec le Chapitre 1: Introduction aux concepts de base de Git et GitHub."}
        </p>
        <Button 
          onClick={handleStartTutorial}
          size="lg"
          className="px-4 sm:px-6 py-2.5 sm:py-3 w-full sm:w-auto"
        >
          <span>
            {userProgress.lastPosition.chapterId 
              ? "Continuer le tutoriel" 
              : "Commencer le tutoriel"}
          </span>
          <ChevronRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default HomePage;