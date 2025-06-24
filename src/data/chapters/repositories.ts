import { Chapter } from '../../types/tutorial.types';

export const repositoriesChapter: Chapter = {
  id: 'repositories',
  title: 'Working with Repositories',
  description: 'Learn how to create and manage Git repositories',
  estimatedTime: 60,
  difficulty: 'beginner',
  objectives: [
    'Initialize new Git repositories and clone existing ones',
    'Understand the internal structure of Git repositories',
    'Master working with remote repositories',
    'Learn the relationship between local and remote repositories'
  ],
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
      description: 'Learn to initialize and clone repositories',
      component: 'RepoCreationWizard'
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
      description: 'Explore how Git repositories are structured internally',
      component: 'StagingAreaVisualizer'
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
      description: 'Master working with remote repositories',
      component: 'CommitHistoryExplorer'
    }
  ],
  quiz: [
    {
      question: 'What command is used to create a copy of a remote repository on your local machine?',
      options: ['git copy', 'git duplicate', 'git clone', 'git download'],
      correctAnswer: 2,
      explanation: 'git clone creates a copy of a remote repository on your local machine, allowing you to work on it.'
    },
    {
      question: 'What folder contains all the Git metadata in a repository?',
      options: ['.github', '.git', '.gitconfig', '.gitdata'],
      correctAnswer: 1,
      explanation: 'The .git directory contains all the metadata and object database for your repository.'
    },
    {
      question: 'What is the default name Git assigns to the remote repository when you clone it?',
      options: ['main', 'origin', 'source', 'remote'],
      correctAnswer: 1,
      explanation: 'When you clone a repository, Git automatically names the remote "origin".'
    }
  ]
};