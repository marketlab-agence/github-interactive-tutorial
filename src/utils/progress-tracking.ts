import { TutorialProgress } from '../types/tutorial.types';

export const calculateProgress = (completedLessons: string[], totalLessons: number): number => {
  return Math.round((completedLessons.length / totalLessons) * 100);
};

export const getChapterProgress = (completedLessons: string[], chapterLessons: string[]): number => {
  const completedInChapter = chapterLessons.filter(lesson => 
    completedLessons.includes(lesson)
  ).length;
  return Math.round((completedInChapter / chapterLessons.length) * 100);
};

export const isLessonCompleted = (lessonId: string, completedLessons: string[]): boolean => {
  return completedLessons.includes(lessonId);
};

export const getNextLesson = (currentChapter: number, currentLesson: number, maxLessonsPerChapter: number): {chapter: number, lesson: number} => {
  if (currentLesson < maxLessonsPerChapter) {
    return { chapter: currentChapter, lesson: currentLesson + 1 };
  } else {
    return { chapter: currentChapter + 1, lesson: 1 };
  }
};

export const getPreviousLesson = (currentChapter: number, currentLesson: number, maxLessonsPerChapter: number): {chapter: number, lesson: number} => {
  if (currentLesson > 1) {
    return { chapter: currentChapter, lesson: currentLesson - 1 };
  } else if (currentChapter > 1) {
    return { chapter: currentChapter - 1, lesson: maxLessonsPerChapter };
  } else {
    return { chapter: currentChapter, lesson: currentLesson };
  }
};

export const formatTimeSpent = (startTime: Date, endTime: Date): string => {
  const diffMs = endTime.getTime() - startTime.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  
  if (diffHours > 0) {
    return `${diffHours}h ${diffMins % 60}m`;
  } else {
    return `${diffMins}m`;
  }
};

export const getProgressBadge = (progress: number): {text: string, color: string} => {
  if (progress === 100) {
    return { text: 'Completed', color: 'green' };
  } else if (progress >= 75) {
    return { text: 'Almost Done', color: 'blue' };
  } else if (progress >= 50) {
    return { text: 'Halfway', color: 'yellow' };
  } else if (progress >= 25) {
    return { text: 'Getting Started', color: 'orange' };
  } else {
    return { text: 'Just Started', color: 'gray' };
  }
};

export const exportProgress = (progress: TutorialProgress): string => {
  return JSON.stringify({
    ...progress,
    exportedAt: new Date().toISOString()
  }, null, 2);
};

export const importProgress = (data: string): TutorialProgress | null => {
  try {
    const parsed = JSON.parse(data);
    return {
      currentChapter: parsed.currentChapter || 1,
      currentLesson: parsed.currentLesson || 1,
      completedLessons: parsed.completedLessons || [],
      totalProgress: parsed.totalProgress || 0,
      startedAt: new Date(parsed.startedAt || Date.now()),
      lastAccessedAt: new Date(parsed.lastAccessedAt || Date.now())
    };
  } catch {
    return null;
  }
};