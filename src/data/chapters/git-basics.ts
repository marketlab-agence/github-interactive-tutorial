import { Chapter } from '../../types/tutorial.types';

export const gitBasicsChapter: Chapter = {
  id: 'git-basics',
  title: 'Git Basics',
  description: 'Learn the fundamental concepts of Git version control',
  estimatedTime: 45,
  difficulty: 'beginner',
  objectives: [
    'Understand what version control is and why it\'s important',
    'Learn about distributed vs centralized systems',
    'Install and configure Git on your system',
    'Master essential Git commands for daily use'
  ],
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
      description: 'Introduction to version control and Git',
      component: 'GitVsGitHubComparison'
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
      description: 'Learn essential Git commands for daily use',
      component: 'VersioningDemo'
    }
  ],
  quiz: [
    {
      question: 'What does Git primarily help you track?',
      options: ['System resources', 'Changes in files', 'User logins', 'Network traffic'],
      correctAnswer: 1,
      explanation: 'Git is designed to track changes in files, making it easy to maintain different versions and collaborate with others.'
    },
    {
      question: 'Which command initializes a new Git repository?',
      options: ['git start', 'git init', 'git begin', 'git create'],
      correctAnswer: 1,
      explanation: 'git init is the command used to create a new Git repository in the current directory.'
    },
    {
      question: 'What Git command adds changes to the staging area?',
      options: ['git commit', 'git stage', 'git add', 'git update'],
      correctAnswer: 2,
      explanation: 'git add is used to stage changes before committing them to the repository.'
    }
  ]
};