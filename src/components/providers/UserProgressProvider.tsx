import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface UserProgress {
  userId: string;
  completedChapters: string[];
  currentChapter: number;
  currentLesson: number;
  totalTimeSpent: number; // en minutes
  achievements: string[];
  lastLoginDate: Date;
  streakDays: number;
  skillLevel: 'débutant' | 'intermédiaire' | 'avancé' | 'expert';
  preferences: {
    language: 'fr' | 'en';
    theme: 'dark' | 'light';
    notifications: boolean;
  };
}

interface UserProgressState {
  progress: UserProgress;
  isLoading: boolean;
  error: string | null;
}

type UserProgressAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_PROGRESS'; payload: UserProgress }
  | { type: 'COMPLETE_CHAPTER'; payload: string }
  | { type: 'UPDATE_CURRENT_POSITION'; payload: { chapter: number; lesson: number } }
  | { type: 'ADD_ACHIEVEMENT'; payload: string }
  | { type: 'UPDATE_TIME_SPENT'; payload: number }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserProgress['preferences']> }
  | { type: 'UPDATE_STREAK'; payload: number };

const initialState: UserProgressState = {
  progress: {
    userId: 'user-1',
    completedChapters: [],
    currentChapter: 1,
    currentLesson: 1,
    totalTimeSpent: 0,
    achievements: [],
    lastLoginDate: new Date(),
    streakDays: 1,
    skillLevel: 'débutant',
    preferences: {
      language: 'fr',
      theme: 'dark',
      notifications: true
    }
  },
  isLoading: false,
  error: null
};

const userProgressReducer = (state: UserProgressState, action: UserProgressAction): UserProgressState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    
    case 'COMPLETE_CHAPTER':
      const newCompletedChapters = [...state.progress.completedChapters];
      if (!newCompletedChapters.includes(action.payload)) {
        newCompletedChapters.push(action.payload);
      }
      
      // Déterminer le niveau de compétence basé sur les chapitres complétés
      let skillLevel: UserProgress['skillLevel'] = 'débutant';
      if (newCompletedChapters.length >= 5) skillLevel = 'expert';
      else if (newCompletedChapters.length >= 3) skillLevel = 'avancé';
      else if (newCompletedChapters.length >= 1) skillLevel = 'intermédiaire';
      
      return {
        ...state,
        progress: {
          ...state.progress,
          completedChapters: newCompletedChapters,
          skillLevel
        }
      };
    
    case 'UPDATE_CURRENT_POSITION':
      return {
        ...state,
        progress: {
          ...state.progress,
          currentChapter: action.payload.chapter,
          currentLesson: action.payload.lesson
        }
      };
    
    case 'ADD_ACHIEVEMENT':
      const newAchievements = [...state.progress.achievements];
      if (!newAchievements.includes(action.payload)) {
        newAchievements.push(action.payload);
      }
      return {
        ...state,
        progress: {
          ...state.progress,
          achievements: newAchievements
        }
      };
    
    case 'UPDATE_TIME_SPENT':
      return {
        ...state,
        progress: {
          ...state.progress,
          totalTimeSpent: state.progress.totalTimeSpent + action.payload
        }
      };
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        progress: {
          ...state.progress,
          preferences: {
            ...state.progress.preferences,
            ...action.payload
          }
        }
      };
    
    case 'UPDATE_STREAK':
      return {
        ...state,
        progress: {
          ...state.progress,
          streakDays: action.payload,
          lastLoginDate: new Date()
        }
      };
    
    default:
      return state;
  }
};

interface UserProgressContextType {
  state: UserProgressState;
  completeChapter: (chapterId: string) => void;
  updateCurrentPosition: (chapter: number, lesson: number) => void;
  addAchievement: (achievementId: string) => void;
  updateTimeSpent: (minutes: number) => void;
  updatePreferences: (preferences: Partial<UserProgress['preferences']>) => void;
  updateStreak: () => void;
  saveProgress: () => void;
  loadProgress: () => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress doit être utilisé dans un UserProgressProvider');
  }
  return context;
};

interface UserProgressProviderProps {
  children: React.ReactNode;
}

export const UserProgressProvider: React.FC<UserProgressProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userProgressReducer, initialState);

  // Charger la progression au démarrage
  useEffect(() => {
    loadProgress();
  }, []);

  // Sauvegarder automatiquement
  useEffect(() => {
    const timer = setInterval(() => {
      saveProgress();
    }, 60000); // Sauvegarde toutes les minutes

    return () => clearInterval(timer);
  }, [state.progress]);

  const completeChapter = (chapterId: string) => {
    dispatch({ type: 'COMPLETE_CHAPTER', payload: chapterId });
    
    // Ajouter des achievements basés sur les chapitres complétés
    const completedCount = state.progress.completedChapters.length + 1;
    if (completedCount === 1) {
      addAchievement('premier-chapitre');
    } else if (completedCount === 3) {
      addAchievement('trois-chapitres');
    } else if (completedCount === 5) {
      addAchievement('expert-git');
    }
  };

  const updateCurrentPosition = (chapter: number, lesson: number) => {
    dispatch({ type: 'UPDATE_CURRENT_POSITION', payload: { chapter, lesson } });
  };

  const addAchievement = (achievementId: string) => {
    dispatch({ type: 'ADD_ACHIEVEMENT', payload: achievementId });
  };

  const updateTimeSpent = (minutes: number) => {
    dispatch({ type: 'UPDATE_TIME_SPENT', payload: minutes });
    
    // Ajouter des achievements basés sur le temps passé
    const totalTime = state.progress.totalTimeSpent + minutes;
    if (totalTime >= 60 && !state.progress.achievements.includes('une-heure')) {
      addAchievement('une-heure');
    } else if (totalTime >= 300 && !state.progress.achievements.includes('cinq-heures')) {
      addAchievement('cinq-heures');
    }
  };

  const updatePreferences = (preferences: Partial<UserProgress['preferences']>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  };

  const updateStreak = () => {
    const today = new Date();
    const lastLogin = new Date(state.progress.lastLoginDate);
    const daysDiff = Math.floor((today.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    
    let newStreak = state.progress.streakDays;
    if (daysDiff === 1) {
      // Connexion consécutive
      newStreak += 1;
    } else if (daysDiff > 1) {
      // Pause dans la série
      newStreak = 1;
    }
    // Si daysDiff === 0, c'est le même jour, on garde la série actuelle
    
    dispatch({ type: 'UPDATE_STREAK', payload: newStreak });
    
    // Ajouter des achievements basés sur la série
    if (newStreak === 7 && !state.progress.achievements.includes('serie-semaine')) {
      addAchievement('serie-semaine');
    } else if (newStreak === 30 && !state.progress.achievements.includes('serie-mois')) {
      addAchievement('serie-mois');
    }
  };

  const saveProgress = () => {
    try {
      localStorage.setItem('user-progress', JSON.stringify(state.progress));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors de la sauvegarde' });
    }
  };

  const loadProgress = () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const saved = localStorage.getItem('user-progress');
      
      if (saved) {
        const parsed = JSON.parse(saved);
        const progress: UserProgress = {
          ...parsed,
          lastLoginDate: new Date(parsed.lastLoginDate)
        };
        
        dispatch({ type: 'SET_PROGRESS', payload: progress });
        
        // Mettre à jour la série de connexion
        updateStreak();
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Erreur lors du chargement' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value: UserProgressContextType = {
    state,
    completeChapter,
    updateCurrentPosition,
    addAchievement,
    updateTimeSpent,
    updatePreferences,
    updateStreak,
    saveProgress,
    loadProgress
  };

  return (
    <UserProgressContext.Provider value={value}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressProvider;