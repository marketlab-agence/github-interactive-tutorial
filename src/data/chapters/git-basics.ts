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
      question: 'Que permet Git de suivre principalement ?',
      options: ['Les ressources système', 'Les changements dans les fichiers', 'Les connexions utilisateur', 'Le trafic réseau'],
      correctAnswer: 1,
      explanation: 'Git est conçu pour suivre les changements dans les fichiers, facilitant la maintenance de différentes versions et la collaboration avec d\'autres personnes.'
    },
    {
      question: 'Quelle commande initialise un nouveau dépôt Git ?',
      options: ['git start', 'git init', 'git begin', 'git create'],
      correctAnswer: 1,
      explanation: 'git init est la commande utilisée pour créer un nouveau dépôt Git dans le répertoire courant.'
    },
    {
      question: 'Quelle commande Git ajoute les changements à la zone de staging ?',
      options: ['git commit', 'git stage', 'git add', 'git update'],
      correctAnswer: 2,
      explanation: 'git add est utilisée pour mettre en scène (stage) les changements avant de les commiter dans le dépôt.'
    },
    {
      question: 'Comment vérifier l\'état actuel de votre dépôt Git ?',
      options: ['git check', 'git state', 'git status', 'git info'],
      correctAnswer: 2,
      explanation: 'git status affiche l\'état du répertoire de travail et de la zone de staging, montrant les fichiers modifiés, stagés ou non suivis.'
    },
    {
      question: 'Quelle est la différence entre Git et GitHub ?',
      options: [
        'Git est une interface graphique et GitHub est en ligne de commande', 
        'Git est un système de contrôle de version et GitHub est une plateforme d\'hébergement', 
        'Git est payant et GitHub est gratuit', 
        'Il n\'y a pas de différence'
      ],
      correctAnswer: 1,
      explanation: 'Git est un système de contrôle de version distribué pour suivre les changements de code, tandis que GitHub est une plateforme d\'hébergement basée sur le web pour les dépôts Git, offrant des fonctionnalités supplémentaires comme les issues, les pull requests, etc.'
    }
  ]
};