import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { TutorialProgress } from '../../types/tutorial.types';

interface TutorialState {
  progress: TutorialProgress;
  isLoading: boolean;
  error: string | null;
  currentChapter: number;
  currentLesson: number;
  bookmarks: string[];
  achievements: string[];
}

type TutorialAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PROGRESS'; payload: TutorialProgress }
  | { type: 'COMPLETE_LESSON'; payload: string }
  | { type: 'GO_TO_CHAPTER'; payload: { chapter: number; lesson: number } }
  | { type: 'ADD_BOOKMARK'; payload: string }
  | { type: 'REMOVE_BOOKMARK'; payload: string }
  | { type: 'ADD_ACHIEVEMENT'; payload: string }
  | { type: 'RESET_PROGRESS' };

const initialState: TutorialState = {
  progress: {
    currentChapter: 1,
    currentLesson: 1,
    completedLessons: [],
    totalProgress: 0,
    startedAt: new Date(),
    lastAccessedAt: new Date()
  },
  isLoading: false,
  error: null,
  currentChapter: 1,
  currentLesson: 1,
  bookmarks: [],
  achievements: []
};

const tutorialReducer = (state: TutorialState, action: TutorialAction): TutorialState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_PROGRESS':
      return {
        ...state,
        progress: action.payload,
        currentChapter: action.payload.currentChapter,
        currentLesson: action.payload.currentLesson
      };
    
    case 'COMPLETE_LESSON':
      const newCompletedLessons = [...state.progress.completedLessons];
      if (!newCompletedLessons.includes(action.payload)) {
        newCompletedLessons.push(action.payload);
      }
      const newProgress = Math.round((newCompletedLessons.length / 25) * 100);
      
      return {
        ...state,
        progress: {
          ...state.progress,
          completedLessons: newCompletedLessons,
          totalProgress: newProgress,
          lastAccessedAt: new Date()
        }
      };
    
    case 'GO_TO_CHAPTER':
      return {
        ...state,
        currentChapter: action.payload.chapter,
        currentLesson: action.payload.lesson,
        progress: {
          ...state.progress,
          currentChapter: action.payload.chapter,
          currentLesson: action.payload.lesson,
          lastAccessedAt: new Date()
        }
      };
    
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload]
      };
    
    case 'REMOVE_BOOKMARK':
      return {
        ...state,
        bookmarks: state.bookmarks.filter(id => id !== action.payload)
      };
    
    case 'ADD_ACHIEVEMENT':
      return {
        ...state,
        achievements: [...state.achievements, action.payload]
      };
    
    case 'RESET_PROGRESS':
      return {
        ...initialState,
        progress: {
          ...initialState.progress,
          startedAt: new Date(),
          lastAccessedAt: new Date()
        }
      };
    
    default:
      return state;
  }
};

interface TutorialContextType {
  state: TutorialState;
  completeLesson: (lessonId: string) => void;
  goToChapter: (chapter: number, lesson?: number) => void;
  nextLesson: () => void;
  previousLesson: () => void;
  addBookmark: (lessonId: string) => void;
  removeBookmark: (lessonId: string) => void;
  addAchievement: (achievementId: string) => void;
  resetProgress: () => void;
  saveProgress: () => void;
  loadProgress: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial doit être utilisé dans un TutorialProvider');
  }
  return context;
};

interface TutorialProviderProps {
  children: React.ReactNode;
}

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(tutorialReducer, initialState);

  // Charger la progression depuis localStorage au démarrage
  useEffect(() => {
    loadProgress();
  }, []);

  // Sauvegarder automatiquement la progression
  useEffect(() => {
    const timer = setInterval(() => {
      saveProgress();
    }, 30000); // Sauvegarde toutes les 30 secondes

    return () => clearInterval(timer);
  }, [state.progress]);

  const completeLesson = (lessonId: string) => {
    dispatch({ type: 'COMPLETE_LESSON', payload: lessonId });
    
    // Vérifier les achievements
    const completedCount = state.progress.completedLessons.length + 1;
    if (completedCount === 1) {
      addAchievement('first-lesson');
    } else if (completedCount === 5) {
      addAchievement('five-lessons');
    } else if (completedCount === 10) {
      addAchievement('ten-lessons');
    }
  };

  const goToChapter = (chapter: number, lesson: number = 1) => {
    dispatch({ type: 'GO_TO_CHAPTER', payload: { chapter, lesson } });
  };

  const nextLesson = () => {
    const maxLessonsPerChapter = 5; // Configurable
    if (state.currentLesson < maxLessonsPerChapter) {
      goToChapter(state.currentChapter, state.currentLesson + 1);
    } else if (state.currentChapter < 5) { // 5 chapitres au total
      goToChapter(state.currentChapter + 1, 1);
    }
  };

  const previousLesson = () => {
    const maxLessonsPerChapter = 5;
    if (state.currentLesson > 1) {
      goToChapter(state.currentChapter, state.currentLesson - 1);
    } else if (state.currentChapter > 1) {
      goToChapter(state.currentChapter - 1, maxLessonsPerChapter);
    }
  };

  const addBookmark = (lessonId: string) => {
    dispatch({ type: 'ADD_BOOKMARK', payload: lessonId });
  };

  const removeBookmark = (lessonId: string) => {
    dispatch({ type: 'REMOVE_BOOKMARK', payload: lessonId });
  };

  const addAchievement = (achievementId: string) => {
    if (!state.achievements.includes(achievementId)) {
      dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievementId });
    }
  };

  const resetProgress = () => {
    dispatch({ type: 'RESET_PROGRESS' });
    localStorage.removeItem('tutorial-progress');
  };

  const saveProgress = () => {
    try {
      const dataToSave = {
        progress: state.progress,
        bookmarks: state.bookmarks,
        achievements: state.achievements
      };
      localStorage.setItem('tutorial-progress', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors de la sauvegarde' });
    }
  };

  const loadProgress = () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const saved = localStorage.getItem('tutorial-progress');
      
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Safely construct the progress object with fallbacks to initial state
        const progress: TutorialProgress = {
          currentChapter: parsed.progress?.currentChapter ?? initialState.progress.currentChapter,
          currentLesson: parsed.progress?.currentLesson ?? initialState.progress.currentLesson,
          completedLessons: parsed.progress?.completedLessons ?? initialState.progress.completedLessons,
          totalProgress: parsed.progress?.totalProgress ?? initialState.progress.totalProgress,
          startedAt: parsed.progress?.startedAt ? new Date(parsed.progress.startedAt) : initialState.progress.startedAt,
          lastAccessedAt: parsed.progress?.lastAccessedAt ? new Date(parsed.progress.lastAccessedAt) : initialState.progress.lastAccessedAt
        };
        
        dispatch({ type: 'SET_PROGRESS', payload: progress });
        
        if (parsed.bookmarks && Array.isArray(parsed.bookmarks)) {
          parsed.bookmarks.forEach((bookmark: string) => {
            dispatch({ type: 'ADD_BOOKMARK', payload: bookmark });
          });
        }
        
        if (parsed.achievements && Array.isArray(parsed.achievements)) {
          parsed.achievements.forEach((achievement: string) => {
            dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievement });
          });
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors du chargement' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value: TutorialContextType = {
    state,
    completeLesson,
    goToChapter,
    nextLesson,
    previousLesson,
    addBookmark,
    removeBookmark,
    addAchievement,
    resetProgress,
    saveProgress,
    loadProgress
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};

export default TutorialProvider;