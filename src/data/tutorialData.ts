// Tutorial data structure for Git learning platform
export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  completed?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'concept' | 'practice' | 'quiz';
  content?: string;
  completed?: boolean;
}

// Basic chapters structure for Git tutorial
export const chapters: Chapter[] = [
  {
    id: 'git-basics',
    title: 'Git Basics',
    description: 'Learn the fundamental concepts of Git version control',
    lessons: [
      {
        id: 'what-is-git',
        title: 'What is Git?',
        description: 'Introduction to version control and Git',
        type: 'concept'
      },
      {
        id: 'git-setup',
        title: 'Setting Up Git',
        description: 'Install and configure Git on your system',
        type: 'practice'
      }
    ]
  },
  {
    id: 'repositories',
    title: 'Working with Repositories',
    description: 'Learn how to create and manage Git repositories',
    lessons: [
      {
        id: 'creating-repos',
        title: 'Creating Repositories',
        description: 'Learn to initialize and clone repositories',
        type: 'practice'
      }
    ]
  }
];

// Keep the existing tutorialData export for backward compatibility
export const tutorialData = {
  chapters
};