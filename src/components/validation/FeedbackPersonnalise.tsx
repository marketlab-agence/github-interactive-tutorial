import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Lightbulb, TrendingUp, Target, RefreshCw, User } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useTutorial } from '../../context/TutorialContext';
import { chapters } from '../../data/tutorialData';

const FeedbackPersonnalise: React.FC = () => {
  const { userProgress } = useTutorial();
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedbackGenerated, setFeedbackGenerated] = useState(true);

  // Calculer les statistiques pour le feedback
  const completedChapters = userProgress.completedChapters.length;
  const totalChapters = chapters.length;
  const completedLessons = userProgress.completedLessons.length;
  const totalLessons = chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0);
  
  // Calculer le score moyen des quiz
  const quizScores = userProgress.quizScores ? Object.values(userProgress.quizScores) : [];
  const averageQuizScore = quizScores.length > 0 
    ? Math.round(quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length) 
    : 0;

  // Générer des conseils personnalisés basés sur la progression
  const generateTips = () => {
    const tips = [];
    
    // Conseil basé sur la progression globale
    if (completedChapters < 2) {
      tips.push({
        title: "Établissez une routine d'apprentissage",
        content: "Consacrez 30 minutes par jour à l'apprentissage de Git pour progresser régulièrement.",
        icon: RefreshCw,
        color: "blue"
      });
    }
    
    // Conseil basé sur les scores de quiz
    if (averageQuizScore < 80 && quizScores.length > 0) {
      tips.push({
        title: "Révisez avant les quiz",
        content: "Prenez le temps de relire les points clés de chaque leçon avant de passer aux quiz pour améliorer vos scores.",
        icon: Lightbulb,
        color: "yellow"
      });
    }
    
    // Conseil basé sur la progression des chapitres
    if (completedChapters >= 2 && completedChapters < totalChapters) {
      tips.push({
        title: "Pratiquez ce que vous apprenez",
        content: "Créez un petit projet personnel pour mettre en pratique les concepts Git que vous avez appris jusqu'à présent.",
        icon: Target,
        color: "green"
      });
    }
    
    // Conseil pour les utilisateurs avancés
    if (completedChapters >= 3) {
      tips.push({
        title: "Explorez les fonctionnalités avancées",
        content: "Essayez d'utiliser des commandes Git plus avancées comme rebase, cherry-pick ou bisect dans vos projets.",
        icon: TrendingUp,
        color: "purple"
      });
    }
    
    // Conseil général
    tips.push({
      title: "Utilisez la visualisation",
      content: "Les diagrammes et visualisations Git vous aideront à mieux comprendre les concepts complexes comme les branches et les fusions.",
      icon: Lightbulb,
      color: "orange"
    });
    
    return tips;
  };

  const tips = generateTips();

  // Générer des points forts et axes d'amélioration
  const strengths = [
    completedChapters > 0 ? "Bonne compréhension des concepts de base de Git" : "Motivation à apprendre Git et GitHub",
    completedLessons > totalLessons / 2 ? "Progression constante dans le tutoriel" : "Engagement dans le processus d'apprentissage",
    averageQuizScore >= 80 ? "Excellents résultats aux quiz" : "Participation active aux évaluations"
  ];

  const improvements = [
    completedChapters < totalChapters ? "Continuer à progresser dans les chapitres restants" : "Approfondir les concepts avancés",
    averageQuizScore < 90 ? "Améliorer les scores aux quiz" : "Partager vos connaissances avec d'autres",
    "Pratiquer régulièrement pour renforcer les acquis"
  ];

  const handleGenerateFeedback = () => {
    setIsGenerating(true);
    // Simuler un temps de génération
    setTimeout(() => {
      setIsGenerating(false);
      setFeedbackGenerated(true);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <MessageSquare className="h-16 w-16 text-pink-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Feedback Personnalisé</h2>
        <p className="text-gray-300">Recevez des conseils adaptés à votre progression</p>
      </div>
      
      {!feedbackGenerated ? (
        <Card>
          <div className="text-center space-y-6 py-8">
            <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto" />
            <h3 className="text-xl font-semibold text-white">Générer un feedback personnalisé</h3>
            <p className="text-gray-300 max-w-md mx-auto">
              Notre système analysera votre progression et vous fournira des conseils 
              adaptés à votre parcours d'apprentissage.
            </p>
            <Button 
              onClick={handleGenerateFeedback} 
              loading={isGenerating}
              disabled={isGenerating}
              size="lg"
            >
              {isGenerating ? 'Génération en cours...' : 'Générer mon feedback'}
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Conseil du jour */}
          <Card>
            <div className="flex items-start space-x-4">
              <div className="bg-blue-900/30 p-3 rounded-full">
                <Lightbulb className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Conseil du jour</h3>
                <p className="text-gray-300">
                  Utilisez des messages de commit descriptifs pour faciliter la collaboration. 
                  Un bon message explique le "pourquoi" et non seulement le "quoi".
                </p>
                <div className="mt-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                  <div className="font-mono text-sm">
                    <span className="text-red-400">// À éviter</span>
                    <br />
                    <span className="text-gray-300">git commit -m "Correction de bug"</span>
                    <br /><br />
                    <span className="text-green-400">// Préférer</span>
                    <br />
                    <span className="text-gray-300">git commit -m "Corriger le problème d'authentification qui déconnectait les utilisateurs"</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Conseils personnalisés */}
          <div className="space-y-4">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-${tip.color}-900/20 border border-${tip.color}-500/30 rounded-xl p-6`}
              >
                <div className="flex items-start space-x-4">
                  <tip.icon className={`h-6 w-6 text-${tip.color}-400 mt-1`} />
                  <div>
                    <h3 className="font-medium text-white mb-2">{tip.title}</h3>
                    <p className="text-gray-300">{tip.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Points forts et axes d'amélioration */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-green-300 mb-3 flex items-center">
                <Target className="h-5 w-5 text-green-400 mr-2" />
                Points forts
              </h3>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-2 text-sm text-gray-300"
                  >
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
            
            <Card>
              <h3 className="text-lg font-semibold text-yellow-300 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 text-yellow-400 mr-2" />
                Axes d'amélioration
              </h3>
              <ul className="space-y-2">
                {improvements.map((improvement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="flex items-start space-x-2 text-sm text-gray-300"
                  >
                    <span className="text-yellow-400 mt-1">→</span>
                    <span>{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Feedback de la communauté */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <User className="h-5 w-5 text-blue-400 mr-2" />
              Feedback de la communauté
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-start space-x-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    M
                  </div>
                  <div>
                    <div className="font-medium text-white">Mentor Git</div>
                    <div className="text-xs text-gray-400">il y a 2 jours</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Votre progression est impressionnante ! J'ai remarqué que vous maîtrisez bien les concepts de base. 
                  Pour aller plus loin, essayez d'explorer les fonctionnalités avancées comme le rebase interactif.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-start space-x-3 mb-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    C
                  </div>
                  <div>
                    <div className="font-medium text-white">Coach GitHub</div>
                    <div className="text-xs text-gray-400">il y a 5 jours</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Bon travail sur les quiz ! Pour renforcer vos connaissances, je vous recommande de créer un petit projet 
                  personnel et d'appliquer les concepts de branches et de fusion que vous avez appris.
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button variant="secondary" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Demander un feedback supplémentaire
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default FeedbackPersonnalise;