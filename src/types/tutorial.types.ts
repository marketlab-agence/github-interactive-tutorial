export interface TutorialProgress {
  currentChapter: number;
  currentLesson: number;
  completedLessons: string[];
  totalProgress: number;
  startedAt: Date;
  lastAccessedAt: Date;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  component?: string;
  workflowType?: 'github-flow' | 'git-flow' | 'gitlab-flow';
  type: 'theory' | 'practice' | 'quiz' | 'simulation';
  duration: number;
  objectives: string[];
  prerequisites?: string[];
  image?: string;
  codeExample?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PracticeExercise {
  id: string;
  title: string;
  description: string;
  steps: ExerciseStep[];
  validation: ValidationRule[];
}

export interface ExerciseStep {
  id: string;
  instruction: string;
  hint?: string;
  expectedOutput?: string;
}

export interface ValidationRule {
  type: 'command' | 'file' | 'output';
  condition: string;
  message: string;
}