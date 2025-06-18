import { useContext } from 'react';
import { NotificationContext } from '../components/providers/NotificationProvider';

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications doit être utilisé dans un NotificationProvider');
  }
  return context;
};

// Hook personnalisé pour les notifications du tutoriel
export const useTutorialNotifications = () => {
  const { success, error, info, warning } = useNotifications();

  const notifyLessonComplete = (lessonTitle: string) => {
    success('Leçon terminée !', `Vous avez complété "${lessonTitle}" avec succès.`);
  };

  const notifyChapterComplete = (chapterTitle: string) => {
    success('Chapitre terminé !', `Félicitations ! Vous avez terminé "${chapterTitle}".`);
  };

  const notifyAchievement = (achievementTitle: string) => {
    success('Nouveau succès débloqué !', achievementTitle);
  };

  const notifyError = (message: string) => {
    error('Erreur', message);
  };

  const notifyProgress = (message: string) => {
    info('Progression sauvegardée', message);
  };

  const notifyTip = (tip: string) => {
    info('Conseil', tip);
  };

  const notifyWarning = (message: string) => {
    warning('Attention', message);
  };

  return {
    notifyLessonComplete,
    notifyChapterComplete,
    notifyAchievement,
    notifyError,
    notifyProgress,
    notifyTip,
    notifyWarning
  };
};