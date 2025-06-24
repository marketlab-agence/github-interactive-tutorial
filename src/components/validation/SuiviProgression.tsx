import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Clock, Award, GitBranch, GitCommit, GitMerge, Cloud, Users } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useTutorial } from '../../context/TutorialContext';
import { chapters } from '../../data';

const SuiviProgression: React.FC = () => {
  const { userProgress } = useTutorial();
  const [timeRange, setTimeRange] = useState<'semaine' | 'mois' | 'total'>('semaine');
  
  // Calculer les statistiques
  const completedChapters = userProgress.completedChapters.length;
  const totalChapters = chapters.length;
  const completedLessons = userProgress.completedLessons.length;
  const totalLessons = chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
  const completedQuizzes = userProgress.completedQuizzes.length;
  
  // Calculer les pourcentages
  const globalProgress = Math.round((userProgress.globalScore || 0));
  const chaptersProgress = Math.round((completedChapters / totalChapters) * 100);
  const lessonsProgress = Math.round((completedLessons / totalLessons) * 100);
  
  // Données pour les graphiques
  const weeklyActivity = [
    { day: 'Lun', value: 3 },
    { day: 'Mar', value: 5 },
    { day: 'Mer', value: 2 },
    { day: 'Jeu', value: 7 },
    { day: 'Ven', value: 4 },
    { day: 'Sam', value: 1 },
    { day: 'Dim', value: 0 }
  ];
  
  const conceptMastery = [
    { concept: 'Bases Git', progress: completedChapters >= 1 ? 100 : 50 },
    { concept: 'Commits', progress: completedChapters >= 2 ? 100 : completedChapters >= 1 ? 70 : 30 },
    { concept: 'Branches', progress: completedChapters >= 3 ? 100 : completedChapters >= 2 ? 60 : 20 },
    { concept: 'Fusion', progress: completedChapters >= 3 ? 90 : completedChapters >= 2 ? 40 : 10 },
    { concept: 'Remote', progress: completedChapters >= 4 ? 100 : completedChapters >= 3 ? 50 : 0 },
    { concept: 'Collaboration', progress: completedChapters >= 5 ? 100 : completedChapters >= 4 ? 60 : 0 }
  ];
  
  // Obtenir le niveau en fonction du score global
  const getLevel = (score: number) => {
    if (score >= 90) return { name: 'Expert', color: 'text-purple-400' };
    if (score >= 75) return { name: 'Avancé', color: 'text-blue-400' };
    if (score >= 50) return { name: 'Intermédiaire', color: 'text-green-400' };
    return { name: 'Débutant', color: 'text-yellow-400' };
  };
  
  const userLevel = getLevel(globalProgress);
  
  // Prochaines étapes recommandées
  const getNextSteps = () => {
    if (completedChapters < totalChapters) {
      const nextChapterIndex = completedChapters;
      return [
        {
          title: `Compléter le chapitre ${nextChapterIndex + 1}`,
          description: chapters[nextChapterIndex] ? chapters[nextChapterIndex].title : "Chapitre suivant",
          icon: GitBranch,
          color: "blue"
        }
      ];
    }
    
    return [
      {
        title: "Obtenir votre certificat",
        description: "Vous avez terminé tous les chapitres, récupérez votre certificat !",
        icon: Award,
        color: "purple"
      }
    ];
  };
  
  const nextSteps = getNextSteps();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <TrendingUp className="h-16 w-16 text-pink-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Suivi de Progression</h2>
        <p className="text-gray-300">Analysez votre parcours d'apprentissage en détail</p>
      </div>
      
      {/* Résumé de progression */}
      <Card>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white mb-2">Progression Globale</h3>
            <div className="flex items-center space-x-3">
              <div className="text-4xl font-bold text-pink-400">{globalProgress}%</div>
              <div className="bg-gray-700/50 px-3 py-1 rounded-full">
                <span className={`font-medium ${userLevel.color}`}>{userLevel.name}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{chaptersProgress}%</div>
              <div className="text-xs text-gray-400">Chapitres</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{lessonsProgress}%</div>
              <div className="text-xs text-gray-400">Leçons</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{completedQuizzes}</div>
              <div className="text-xs text-gray-400">Quiz</div>
            </div>
          </div>
        </div>
        
        {/* Barre de progression globale */}
        <div className="mt-6">
          <div className="w-full bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${globalProgress}%` }}
              transition={{ duration: 1 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
            />
          </div>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Temps d'étude */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Clock className="h-5 w-5 text-blue-400 mr-2" />
            Temps d'étude
          </h3>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-blue-400 mb-2">2h 45m</div>
            <div className="text-sm text-gray-400">Cette semaine</div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Session moyenne :</span>
              <span className="text-white">25 minutes</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Sessions totales :</span>
              <span className="text-white">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Dernière session :</span>
              <span className="text-white">Aujourd'hui</span>
            </div>
          </div>
        </Card>
        
        {/* Activité récente */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Calendar className="h-5 w-5 text-green-400 mr-2" />
              Activité
            </h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-gray-700 text-white text-sm rounded border border-gray-600 px-2 py-1"
            >
              <option value="semaine">Cette semaine</option>
              <option value="mois">Ce mois</option>
              <option value="total">Total</option>
            </select>
          </div>
          
          <div className="h-32 flex items-end space-x-1">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(day.value / 7) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-full bg-green-500 rounded-t"
                />
                <div className="text-xs text-gray-400 mt-1">{day.day}</div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Niveau */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Award className="h-5 w-5 text-purple-400 mr-2" />
            Niveau
          </h3>
          <div className="text-center py-4">
            <div className="text-3xl font-bold text-purple-400 mb-2">{userLevel.name}</div>
            <div className="text-sm text-gray-400">Git & GitHub</div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progression vers niveau suivant :</span>
              <span className="text-white">
                {userLevel.name === 'Expert' ? '100%' : `${globalProgress % 25}%`}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: userLevel.name === 'Expert' ? '100%' : `${globalProgress % 25 * 4}%` }}
                transition={{ duration: 0.5 }}
                className="bg-purple-500 h-2 rounded-full"
              />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Maîtrise des concepts */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Maîtrise des Concepts</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {conceptMastery.map((concept, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">{concept.concept}</span>
                <span className={`text-sm ${
                  concept.progress >= 80 ? 'text-green-400' :
                  concept.progress >= 50 ? 'text-blue-400' :
                  concept.progress >= 30 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {concept.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${concept.progress}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-2 rounded-full ${
                    concept.progress >= 80 ? 'bg-green-500' :
                    concept.progress >= 50 ? 'bg-blue-500' :
                    concept.progress >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Prochaines étapes */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Prochaines Étapes</h3>
        <div className="space-y-4">
          {nextSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-${step.color}-900/20 border border-${step.color}-500/30 rounded-lg p-4`}
              >
                <div className="flex items-start space-x-4">
                  <Icon className={`h-6 w-6 text-${step.color}-400 mt-1`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-300">{step.description}</p>
                  </div>
                  <Button size="sm">Commencer</Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>
      
      {/* Badges et réalisations */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Badges et Réalisations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-900/30 border-2 border-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <GitCommit className="h-8 w-8 text-blue-400" />
            </div>
            <div className="font-medium text-white text-sm">Premier Commit</div>
            <div className="text-xs text-gray-400">Débloqué</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-900/30 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <GitBranch className="h-8 w-8 text-green-400" />
            </div>
            <div className="font-medium text-white text-sm">Maître des Branches</div>
            <div className="text-xs text-gray-400">
              {completedChapters >= 3 ? 'Débloqué' : 'Verrouillé'}
            </div>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 ${completedChapters >= 4 ? 'bg-purple-900/30 border-2 border-purple-500' : 'bg-gray-800 border-2 border-gray-700'} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <Cloud className={`h-8 w-8 ${completedChapters >= 4 ? 'text-purple-400' : 'text-gray-600'}`} />
            </div>
            <div className={`font-medium text-sm ${completedChapters >= 4 ? 'text-white' : 'text-gray-500'}`}>Expert Remote</div>
            <div className="text-xs text-gray-400">
              {completedChapters >= 4 ? 'Débloqué' : 'Verrouillé'}
            </div>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 ${completedChapters >= 5 ? 'bg-yellow-900/30 border-2 border-yellow-500' : 'bg-gray-800 border-2 border-gray-700'} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <Users className={`h-8 w-8 ${completedChapters >= 5 ? 'text-yellow-400' : 'text-gray-600'}`} />
            </div>
            <div className={`font-medium text-sm ${completedChapters >= 5 ? 'text-white' : 'text-gray-500'}`}>Collaborateur Pro</div>
            <div className="text-xs text-gray-400">
              {completedChapters >= 5 ? 'Débloqué' : 'Verrouillé'}
            </div>
          </div>
        </div>
      </Card>
      
      {/* Exporter les données */}
      <div className="flex justify-end">
        <Button variant="secondary">
          Exporter mes statistiques
        </Button>
      </div>
    </div>
  );
};

export default SuiviProgression;