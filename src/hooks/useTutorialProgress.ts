import { useState, useEffect } from 'react';
import { TutorialProgress } from '../types/tutorial.types';

const STORAGE_KEY = 'tutorial-progress';

export const useTutorialProgress = () => {
  const [progress, setProgress] = useState<TutorialProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          startedAt: new Date(parsed.startedAt),
          lastAccessedAt: new Date(parsed.lastAccessedAt)
        };
      } catch {
        // If parsing fails, return default
      }
    }
    
    return {
      currentChapter: 1,
      currentLesson: 1,
      completedLessons: [],
      totalProgress: 0,
      startedAt: new Date(),
      lastAccessedAt: new Date()
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (updates: Partial<TutorialProgress>) => {
    setProgress(prev => ({
      ...prev,
      ...updates,
      lastAccessedAt: new Date()
    }));
  };

  const completeLesson = (lessonId: string) => {
    setProgress(prev => {
      const newCompletedLessons = [...prev.completedLessons];
      if (!newCompletedLessons.includes(lessonId)) {
        newCompletedLessons.push(lessonId);
      }
      
      const totalProgress = Math.round((newCompletedLessons.length / 25) * 100); // Assuming 25 total lessons
      
      return {
        ...prev,
        completedLessons: newCompletedLessons,
        totalProgress,
        lastAccessedAt: new Date()
      };
    });
  };

  const goToChapter = (chapter: number, lesson: number = 1) => {
    updateProgress({
      currentChapter: chapter,
      currentLesson: lesson
    });
  };

  const nextLesson = () => {
    setProgress(prev => ({
      ...prev,
      currentLesson: prev.currentLesson + 1,
      lastAccessedAt: new Date()
    }));
  };

  const previousLesson = () => {
    setProgress(prev => ({
      ...prev,
      currentLesson: Math.max(1, prev.currentLesson - 1),
      lastAccessedAt: new Date()
    }));
  };

  const resetProgress = () => {
    const defaultProgress: TutorialProgress = {
      currentChapter: 1,
      currentLesson: 1,
      completedLessons: [],
      totalProgress: 0,
      startedAt: new Date(),
      lastAccessedAt: new Date()
    };
    setProgress(defaultProgress);
  };

  return {
    progress,
    updateProgress,
    completeLesson,
    goToChapter,
    nextLesson,
    previousLesson,
    resetProgress
  };
};