import React from 'react';
import { LayoutDashboard, CheckCircle, Award } from 'lucide-react';
import { useTutorial } from '../context/TutorialContext';
import { chapters } from '../data/tutorialData';
import Button from './ui/Button';
import StatisticsChart from './visualizations/StatisticsChart';

interface DashboardProps {
  onNavigate: (view: string, chapterId?: string, lessonId?: string, quizIndex?: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { userProgress, setLastPosition } = useTutorial();

  const totalLessons = chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
  const completedLessonsPercentage = Math.round((userProgress.completedLessons.length / totalLessons) * 100);
  
  // Calculer le score moyen des quiz
  const quizScores = Object.values(userProgress.quizScores);
  const averageQuizScore = quizScores.length > 0 
    ? Math.round(quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length) 
    : 0;

  // Obtenir le niveau en fonction du score global
  const getLevel = (score: number) => {
    if (score >= 90) return { name: 'Expert', color: 'text-purple-400' };
    if (score >= 75) return { name: 'Avancé', color: 'text-blue-400' };
    if (score >= 50) return { name: 'Intermédiaire', color: 'text-green-400' };
    return { name: 'Débutant', color: 'text-yellow-400' };
  };
  
  const userLevel = getLevel(userProgress.globalScore);

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
            <div className="text-3xl font-bold text-green-400">{completedLessonsPercentage}%</div>
            <div className="text-sm text-gray-400">Progression Globale</div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">{userProgress.completedChapters.length}/{chapters.length}</div>
            <div className="text-sm text-gray-400">Chapitres Complétés</div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">
              {userProgress.completedLessons.length} / {totalLessons}
            </div>
            <div className="text-sm text-gray-400">Leçons Complétées</div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/30">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{userProgress.completedQuizzes.length}</div>
            <div className="text-sm text-gray-400">Quiz Réussis</div>
          </div>
        </div>
      </div>
      
      {/* Score global et niveau */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-2">Score Global</h3>
            <div className="flex items-center space-x-3">
              <div className="text-4xl font-bold text-purple-400">{userProgress.globalScore}%</div>
              <div className="bg-gray-700/50 px-3 py-1 rounded-full">
                <span className={`font-medium ${userLevel.color}`}>{userLevel.name}</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Award className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm text-gray-300">
              {userProgress.completedChapters.length === chapters.length 
                ? "Formation complétée !" 
                : `${chapters.length - userProgress.completedChapters.length} chapitres restants`}
            </div>
          </div>
          
          <div className="text-center md:text-right mt-4 md:mt-0">
            <h3 className="text-xl font-bold text-white mb-2">Score Quiz</h3>
            <div className="text-4xl font-bold text-green-400">{averageQuizScore}%</div>
            <div className="text-sm text-gray-300">Moyenne des quiz</div>
          </div>
        </div>
      </div>

      <StatisticsChart />
      
      <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
        <h3 className="text-xl font-bold text-white mb-4">Continuer l'apprentissage</h3>
        <div className="space-y-4">
          {userProgress.lastPosition.chapterId && (
            <div className="bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-2">Dernière session</h4>
              <p className="text-gray-300 mb-3">
                {(() => {
                  const chapterIndex = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
                  if (chapterIndex === -1) return "Session inconnue";
                  
                  if (userProgress.lastPosition.view === 'chapter-intro') {
                    return `Introduction au chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                  }
                  
                  if (userProgress.lastPosition.view === 'lesson' && userProgress.lastPosition.lessonId) {
                    const lessonIndex = chapters[chapterIndex].lessons.findIndex(l => l.id === userProgress.lastPosition.lessonId);
                    if (lessonIndex === -1) return `Chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                    return `Chapitre ${chapterIndex + 1}, Leçon ${lessonIndex + 1}: ${chapters[chapterIndex].lessons[lessonIndex].title}`;
                  }
                  
                  if (userProgress.lastPosition.view === 'quiz') {
                    return `Quiz du chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                  }
                  
                  if (userProgress.lastPosition.view === 'quiz-results') {
                    return `Résultats du quiz - Chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                  }
                  
                  if (userProgress.lastPosition.view === 'chapter-summary') {
                    return `Résumé du chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                  }
                  
                  return `Chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                })()}
              </p>
              <Button
                onClick={() => {
                  if (userProgress.lastPosition.view === 'chapter-intro' || 
                      userProgress.lastPosition.view === 'lesson' || 
                      userProgress.lastPosition.view === 'quiz' || 
                      userProgress.lastPosition.view === 'quiz-results' ||
                      userProgress.lastPosition.view === 'chapter-summary') {
                    onNavigate(
                      userProgress.lastPosition.view,
                      userProgress.lastPosition.chapterId,
                      userProgress.lastPosition.lessonId,
                      userProgress.lastPosition.quizIndex
                    );
                  }
                }}
              >
                Continuer
              </Button>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-4">
            {chapters.map((chapter, index) => {
              const isCompleted = userProgress.completedChapters.includes(chapter.id);
              const isStarted = userProgress.completedLessons.some(lessonId => 
                chapter.lessons.some(lesson => lesson.id === lessonId)
              );
              
              // Obtenir le score du quiz pour ce chapitre
              const quizScore = userProgress.quizScores[chapter.id] || 0;
              
              return (
                <div 
                  key={chapter.id}
                  className={`p-4 rounded-lg border ${
                    isCompleted 
                      ? 'bg-green-900/20 border-green-500/30' 
                      : isStarted
                        ? 'bg-blue-900/20 border-blue-500/30'
                        : 'bg-gray-800/50 border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">Chapitre {index + 1}: {chapter.title}</h4>
                    {isCompleted && <CheckCircle className="h-5 w-5 text-green-400" />}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-400">
                      {isCompleted 
                        ? `Complété - Score: ${quizScore}%` 
                        : isStarted
                          ? 'En cours'
                          : 'Non commencé'}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        onNavigate('chapter-intro', chapter.id);
                      }}
                    >
                      {isCompleted ? 'Revoir' : isStarted ? 'Continuer' : 'Commencer'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;