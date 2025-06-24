import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProgress {
  currentChapter: number;
  currentLesson: number;
  completedLessons: string[];
  completedChapters: string[];
  completedQuizzes: string[];
  quizScores: Record<string, number>; // chapterId -> score
  lastPosition: {
    view: string;
    chapterId?: string;
    lessonId?: string;
    quizIndex?: number;
  };
  globalScore: number;
}

interface TutorialContextType {
  userProgress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  completeLesson: (chapterId: string, lessonId: string) => void;
  completeChapter: (chapterId: string) => void;
  completeQuiz: (chapterId: string, score?: number) => void;
  setLastPosition: (position: UserProgress['lastPosition']) => void;
  calculateGlobalScore: () => number;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};

export const TutorialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const savedProgress = localStorage.getItem('tutorial-progress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Ensure all required properties exist with proper defaults
        return {
          currentChapter: parsed.currentChapter || 0,
          currentLesson: parsed.currentLesson || 0,
          completedLessons: parsed.completedLessons || [],
          completedChapters: parsed.completedChapters || [],
          completedQuizzes: parsed.completedQuizzes || [],
          quizScores: parsed.quizScores || {}, // Ensure quizScores is always an object
          lastPosition: parsed.lastPosition || { view: 'accueil' },
          globalScore: parsed.globalScore || 0
        };
      } catch (error) {
        console.error("Error parsing saved progress:", error);
        // Return default state if parsing fails
        return {
          currentChapter: 0,
          currentLesson: 0,
          completedLessons: [],
          completedChapters: [],
          completedQuizzes: [],
          quizScores: {},
          lastPosition: { view: 'accueil' },
          globalScore: 0
        };
      }
    }
    return {
      currentChapter: 0,
      currentLesson: 0,
      completedLessons: [],
      completedChapters: [],
      completedQuizzes: [],
      quizScores: {},
      lastPosition: {
        view: 'accueil'
      },
      globalScore: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('tutorial-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setUserProgress(prev => ({
      ...prev,
      ...updates,
      // Ensure quizScores is always an object when updating
      quizScores: updates.quizScores || prev.quizScores || {}
    }));
  };

  const completeLesson = (chapterId: string, lessonId: string) => {
    setUserProgress(prev => {
      const completedLessons = [...prev.completedLessons];
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
      }
      
      // Recalculer le score global
      const updatedProgress = {
        ...prev,
        completedLessons
      };
      
      const globalScore = calculateGlobalScoreInternal(updatedProgress);
      
      return {
        ...updatedProgress,
        globalScore
      };
    });
  };

  const completeChapter = (chapterId: string) => {
    setUserProgress(prev => {
      const completedChapters = [...prev.completedChapters];
      if (!completedChapters.includes(chapterId)) {
        completedChapters.push(chapterId);
      }
      
      // Recalculer le score global
      const updatedProgress = {
        ...prev,
        completedChapters
      };
      
      const globalScore = calculateGlobalScoreInternal(updatedProgress);
      
      return {
        ...updatedProgress,
        globalScore
      };
    });
  };

  const completeQuiz = (chapterId: string, score?: number) => {
    setUserProgress(prev => {
      const completedQuizzes = [...prev.completedQuizzes];
      if (!completedQuizzes.includes(chapterId)) {
        completedQuizzes.push(chapterId);
      }
      
      // Ensure quizScores is always an object before spreading
      const quizScores = { ...(prev.quizScores || {}) };
      if (score !== undefined) {
        quizScores[chapterId] = score;
      }
      
      // Recalculer le score global
      const updatedProgress = {
        ...prev,
        completedQuizzes,
        quizScores
      };
      
      const globalScore = calculateGlobalScoreInternal(updatedProgress);
      
      return {
        ...updatedProgress,
        globalScore
      };
    });
  };

  const setLastPosition = (position: UserProgress['lastPosition']) => {
    setUserProgress(prev => ({
      ...prev,
      lastPosition: position
    }));
  };

  // Fonction interne pour calculer le score global
  const calculateGlobalScoreInternal = (progress: UserProgress): number => {
    // Calculer le score basé sur les leçons complétées, les chapitres et les quiz
    const lessonWeight = 0.3; // 30% du score
    const chapterWeight = 0.3; // 30% du score
    const quizWeight = 0.4; // 40% du score
    
    // Nombre total de leçons, chapitres et quiz (à adapter selon votre structure)
    const totalLessons = 20; // Exemple: nombre total de leçons
    const totalChapters = 5; // Exemple: nombre total de chapitres
    const totalQuizzes = 5; // Exemple: nombre total de quiz
    
    // Calcul des scores partiels
    const lessonScore = (progress.completedLessons.length / totalLessons) * lessonWeight * 100;
    const chapterScore = (progress.completedChapters.length / totalChapters) * chapterWeight * 100;
    
    // Calcul du score moyen des quiz - ensure quizScores is an object
    let quizScore = 0;
    if (progress.completedQuizzes.length > 0) {
      // Ensure we're working with an object before calling Object.values
      const quizScoresValues = Object.values(progress.quizScores || {});
      const totalQuizScore = quizScoresValues.reduce((sum, score) => sum + score, 0);
      const averageQuizScore = quizScoresValues.length > 0 
        ? totalQuizScore / quizScoresValues.length 
        : 0;
      quizScore = (progress.completedQuizzes.length / totalQuizzes) * averageQuizScore * quizWeight;
    }
    
    // Score global (arrondi à l'entier le plus proche)
    return Math.round(lessonScore + chapterScore + quizScore);
  };

  // Fonction publique pour calculer le score global
  const calculateGlobalScore = () => {
    return calculateGlobalScoreInternal(userProgress);
  };

  return (
    <TutorialContext.Provider value={{
      userProgress,
      updateProgress,
      completeLesson,
      completeChapter,
      completeQuiz,
      setLastPosition,
      calculateGlobalScore
    }}>
      {children}
    </TutorialContext.Provider>
  );
};

export default TutorialProvider;