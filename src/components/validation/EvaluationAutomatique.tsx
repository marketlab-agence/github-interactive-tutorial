import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, RefreshCw, Award } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useTutorial } from '../../context/TutorialContext';
import { chapters } from '../../data/tutorialData';

const EvaluationAutomatique: React.FC = () => {
  const { userProgress } = useTutorial();
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Calculer les statistiques
  const totalChapters = chapters.length;
  const completedChapters = userProgress.completedChapters.length;
  const totalLessons = chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
  const completedLessons = userProgress.completedLessons.length;
  const totalQuizzes = chapters.length; // Un quiz par chapitre
  const completedQuizzes = userProgress.completedQuizzes.length;

  // Calculer les pourcentages
  const chaptersPercentage = Math.round((completedChapters / totalChapters) * 100);
  const lessonsPercentage = Math.round((completedLessons / totalLessons) * 100);
  const quizzesPercentage = Math.round((completedQuizzes / totalQuizzes) * 100);

  // Calculer le score moyen des quiz
  const quizScores = userProgress.quizScores ? Object.values(userProgress.quizScores) : [];
  const averageQuizScore = quizScores.length > 0 
    ? Math.round(quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length) 
    : 0;

  // Compétences évaluées
  const skills = [
    { 
      name: 'Commandes de base', 
      level: completedChapters >= 1 ? 'maîtrisé' : 'en cours', 
      percentage: completedChapters >= 1 ? 100 : Math.min(100, completedLessons * 25)
    },
    { 
      name: 'Gestion des branches', 
      level: completedChapters >= 3 ? 'maîtrisé' : completedChapters >= 2 ? 'en progression' : 'non commencé', 
      percentage: completedChapters >= 3 ? 100 : completedChapters >= 2 ? 60 : 0
    },
    { 
      name: 'Dépôts distants', 
      level: completedChapters >= 4 ? 'maîtrisé' : completedChapters >= 3 ? 'en progression' : 'non commencé', 
      percentage: completedChapters >= 4 ? 100 : completedChapters >= 3 ? 60 : 0
    },
    { 
      name: 'Collaboration', 
      level: completedChapters >= 5 ? 'maîtrisé' : completedChapters >= 4 ? 'en progression' : 'non commencé', 
      percentage: completedChapters >= 5 ? 100 : completedChapters >= 4 ? 60 : 0
    },
    { 
      name: 'Résolution de conflits', 
      level: completedChapters >= 3 && averageQuizScore >= 80 ? 'en progression' : 'à améliorer', 
      percentage: completedChapters >= 3 && averageQuizScore >= 80 ? 70 : 30
    }
  ];

  const handleEvaluate = () => {
    setIsEvaluating(true);
    // Simuler un temps de traitement
    setTimeout(() => {
      setIsEvaluating(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-pink-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Évaluation Automatique</h2>
        <p className="text-gray-300">Système d'évaluation intelligent de vos compétences</p>
      </div>
      
      {/* Bouton d'évaluation */}
      <Card>
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-white">Lancer une évaluation complète</h3>
          <p className="text-gray-300">
            Notre système analysera votre progression et évaluera vos compétences Git & GitHub
          </p>
          <Button 
            onClick={handleEvaluate} 
            loading={isEvaluating}
            disabled={isEvaluating}
            size="lg"
          >
            {isEvaluating ? 'Analyse en cours...' : 'Évaluer mes compétences'}
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Compétences validées */}
        <Card>
          <h3 className="text-xl font-semibold text-white mb-4">Compétences Validées</h3>
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">{skill.name}</span>
                  <Badge 
                    variant={
                      skill.level === 'maîtrisé' ? 'success' : 
                      skill.level === 'en progression' ? 'info' : 
                      skill.level === 'en cours' ? 'warning' : 'error'
                    }
                  >
                    {skill.level}
                  </Badge>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-2 rounded-full ${
                      skill.percentage >= 80 ? 'bg-green-500' :
                      skill.percentage >= 50 ? 'bg-blue-500' :
                      skill.percentage >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Score global */}
        <Card>
          <h3 className="text-xl font-semibold text-white mb-4">Score Global</h3>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-blue-400 mb-2">{userProgress.globalScore}%</div>
            <div className="text-gray-300">
              {userProgress.globalScore >= 90 ? 'Excellent niveau !' :
               userProgress.globalScore >= 70 ? 'Très bon niveau !' :
               userProgress.globalScore >= 50 ? 'Bon niveau !' :
               userProgress.globalScore >= 30 ? 'Niveau en progression' : 'Débutant'}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-green-400">{chaptersPercentage}%</div>
              <div className="text-xs text-gray-400">Chapitres</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-400">{lessonsPercentage}%</div>
              <div className="text-xs text-gray-400">Leçons</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-purple-400">{quizzesPercentage}%</div>
              <div className="text-xs text-gray-400">Quiz</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recommandations */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Recommandations Personnalisées</h3>
        <div className="space-y-4">
          {completedChapters < totalChapters && (
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white mb-1">Continuez votre progression</h4>
                  <p className="text-sm text-gray-300">
                    Vous avez complété {completedChapters} chapitres sur {totalChapters}. 
                    Continuez avec le chapitre suivant pour améliorer vos compétences.
                  </p>
                </div>
              </div>
            </div>
          )}

          {averageQuizScore < 80 && completedQuizzes > 0 && (
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white mb-1">Améliorez vos scores aux quiz</h4>
                  <p className="text-sm text-gray-300">
                    Votre score moyen aux quiz est de {averageQuizScore}%. Révisez les leçons et réessayez 
                    les quiz pour renforcer votre compréhension.
                  </p>
                </div>
              </div>
            </div>
          )}

          {completedChapters === totalChapters && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Award className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white mb-1">Félicitations !</h4>
                  <p className="text-sm text-gray-300">
                    Vous avez complété tous les chapitres du tutoriel. Vous pouvez maintenant 
                    obtenir votre certificat et appliquer vos connaissances dans des projets réels.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Prochaines étapes */}
      <Card>
        <h3 className="text-xl font-semibold text-white mb-4">Prochaines Étapes Recommandées</h3>
        <div className="space-y-3">
          {completedChapters < totalChapters && (
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <div className="font-medium text-white">Compléter le chapitre suivant</div>
                  <div className="text-sm text-gray-400">
                    {chapters[completedChapters] ? chapters[completedChapters].title : "Chapitre suivant"}
                  </div>
                </div>
              </div>
              <Button size="sm">Commencer</Button>
            </div>
          )}

          {completedLessons < totalLessons && (
            <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <div className="font-medium text-white">Réviser les leçons incomplètes</div>
                  <div className="text-sm text-gray-400">
                    {totalLessons - completedLessons} leçons restantes
                  </div>
                </div>
              </div>
              <Button size="sm" variant="secondary">Voir les leçons</Button>
            </div>
          )}

          <div className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <div className="font-medium text-white">Pratiquer avec des exercices</div>
                <div className="text-sm text-gray-400">
                  Renforcez vos compétences avec des exercices pratiques
                </div>
              </div>
            </div>
            <Button size="sm" variant="secondary">Exercices</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EvaluationAutomatique;