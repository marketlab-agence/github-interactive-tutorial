import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProgress {
  currentChapter: number;
  currentLesson: number;
  completedLessons: string[];
  completedChapters: string[];
  completedQuizzes: string[];
  lastPosition: {
    view: string;
    chapterId?: string;
    lessonId?: string;
    quizIndex?: number;
  };
}

interface TutorialContextType {
  userProgress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  completeLesson: (chapterId: string, lessonId: string) => void;
  completeChapter: (chapterId: string) => void;
  completeQuiz: (chapterId: string) => void;
  setLastPosition: (position: UserProgress['lastPosition']) => void;
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
      return JSON.parse(savedProgress);
    }
    return {
      currentChapter: 0,
      currentLesson: 0,
      completedLessons: [],
      completedChapters: [],
      completedQuizzes: [],
      lastPosition: {
        view: 'accueil'
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('tutorial-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  const updateProgress = (updates: Partial<UserProgress>) => {
    setUserProgress(prev => ({
      ...prev,
      ...updates
    }));
  };

  const completeLesson = (chapterId: string, lessonId: string) => {
    setUserProgress(prev => {
      const completedLessons = [...prev.completedLessons];
      if (!completedLessons.includes(lessonId)) {
        completedLessons.push(lessonId);
      }
      return {
        ...prev,
        completedLessons
      };
    });
  };

  const completeChapter = (chapterId: string) => {
    setUserProgress(prev => {
      const completedChapters = [...prev.completedChapters];
      if (!completedChapters.includes(chapterId)) {
        completedChapters.push(chapterId);
      }
      return {
        ...prev,
        completedChapters
      };
    });
  };

  const completeQuiz = (chapterId: string) => {
    setUserProgress(prev => {
      const completedQuizzes = [...prev.completedQuizzes];
      if (!completedQuizzes.includes(chapterId)) {
        completedQuizzes.push(chapterId);
      }
      return {
        ...prev,
        completedQuizzes
      };
    });
  };

  const setLastPosition = (position: UserProgress['lastPosition']) => {
    setUserProgress(prev => ({
      ...prev,
      lastPosition: position
    }));
  };

  return (
    <TutorialContext.Provider value={{
      userProgress,
      updateProgress,
      completeLesson,
      completeChapter,
      completeQuiz,
      setLastPosition
    }}>
      {children}
    </TutorialContext.Provider>
  );
};

export default TutorialProvider;