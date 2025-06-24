// Tutorial data structure for Git learning platform
import { Chapter, Lesson, QuizQuestion } from '../types/tutorial.types';

// Comprehensive chapters structure for Git tutorial
export const chapters: Chapter[] = [
  {
    id: 'git-basics',
    title: 'Git Basics',
    description: 'Learn the fundamental concepts of Git version control',
    estimatedTime: 45,
    difficulty: 'beginner',
    lessons: [
      {
        id: 'what-is-git',
        title: 'What is Git?',
        content: 'Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers collaboratively developing source code during software development.',
        type: 'theory',
        duration: 15,
        objectives: [
          'Understand what version control is',
          'Learn about distributed vs centralized systems',
          'Identify the benefits of using Git'
        ],
        description: 'Introduction to version control and Git'
      },
      {
        id: 'git-setup',
        title: 'Setting Up Git',
        content: 'Learn how to install Git on your system and configure it with your user information.',
        type: 'practice',
        duration: 20,
        objectives: [
          'Install Git on your operating system',
          'Configure Git with your name and email',
          'Verify your Git installation'
        ],
        description: 'Install and configure Git on your system'
      },
      {
        id: 'basic-commands',
        title: 'Basic Git Commands',
        content: 'Master the essential Git commands you\'ll use every day.',
        type: 'practice',
        duration: 25,
        objectives: [
          'Learn git init, add, commit commands',
          'Understand the Git workflow',
          'Practice basic repository operations'
        ],
        description: 'Learn essential Git commands for daily use'
      }
    ]
  },
  {
    id: 'repositories',
    title: 'Working with Repositories',
    description: 'Learn how to create and manage Git repositories',
    estimatedTime: 60,
    difficulty: 'beginner',
    lessons: [
      {
        id: 'creating-repos',
        title: 'Creating Repositories',
        content: 'Learn how to initialize new repositories and clone existing ones from remote sources.',
        type: 'practice',
        duration: 30,
        objectives: [
          'Initialize a new Git repository',
          'Clone repositories from GitHub',
          'Understand local vs remote repositories'
        ],
        description: 'Learn to initialize and clone repositories'
      },
      {
        id: 'repo-structure',
        title: 'Repository Structure',
        content: 'Understand the internal structure of a Git repository and how Git stores data.',
        type: 'theory',
        duration: 20,
        objectives: [
          'Explore the .git directory',
          'Understand Git objects and references',
          'Learn about the working directory, staging area, and repository'
        ],
        description: 'Explore how Git repositories are structured internally'
      },
      {
        id: 'remote-repos',
        title: 'Remote Repositories',
        content: 'Learn how to work with remote repositories and understand the relationship between local and remote.',
        type: 'practice',
        duration: 25,
        objectives: [
          'Add and manage remote repositories',
          'Understand origin and upstream',
          'Practice fetching and pulling changes'
        ],
        description: 'Master working with remote repositories'
      }
    ]
  },
  {
    id: 'branching',
    title: 'Branching and Merging',
    description: 'Master Git\'s powerful branching and merging capabilities',
    estimatedTime: 90,
    difficulty: 'intermediate',
    lessons: [
      {
        id: 'branch-basics',
        title: 'Branch Fundamentals',
        content: 'Learn what branches are and why they\'re essential for modern development workflows.',
        type: 'theory',
        duration: 20,
        objectives: [
          'Understand what Git branches are',
          'Learn when and why to use branches',
          'Explore different branching strategies'
        ],
        description: 'Understand the fundamentals of Git branching'
      },
      {
        id: 'creating-branches',
        title: 'Creating and Switching Branches',
        content: 'Practice creating, switching between, and managing branches.',
        type: 'practice',
        duration: 25,
        objectives: [
          'Create new branches with git branch',
          'Switch between branches with git checkout',
          'Use git switch for modern branch switching'
        ],
        description: 'Learn to create and navigate between branches'
      },
      {
        id: 'merging-branches',
        title: 'Merging Strategies',
        content: 'Understand different merge strategies and when to use each one.',
        type: 'practice',
        duration: 30,
        objectives: [
          'Perform fast-forward merges',
          'Create merge commits',
          'Understand rebase vs merge'
        ],
        description: 'Master different approaches to merging branches'
      },
      {
        id: 'branch-quiz',
        title: 'Branching Knowledge Check',
        content: 'Test your understanding of Git branching concepts.',
        type: 'quiz',
        duration: 15,
        objectives: [
          'Demonstrate understanding of branch concepts',
          'Apply knowledge to real-world scenarios'
        ],
        description: 'Quiz on branching fundamentals'
      }
    ]
  }
];

// Keep the existing tutorialData export for backward compatibility
export const tutorialData = {
  chapters
};