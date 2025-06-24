import { Chapter } from '../../types/tutorial.types';

export const remoteReposChapter: Chapter = {
  id: 'remote-repos',
  title: 'Remote Repositories',
  description: 'Master working with remote repositories and synchronization',
  estimatedTime: 75,
  difficulty: 'intermediate',
  objectives: [
    'Understand the concept of remote repositories',
    'Learn to connect local and remote repositories',
    'Master push, pull, and fetch operations',
    'Visualize the relationship between local and remote branches'
  ],
  lessons: [
    {
      id: 'remote-intro',
      title: 'Introduction to Remote Repositories',
      content: 'Remote repositories are versions of your project hosted on the internet or network. Learn how they enable collaboration and serve as backups for your work.',
      type: 'theory',
      duration: 15,
      component: 'RemoteConnectionVisual',
      image: 'https://d1jnx9ba8s6j9r.cloudfront.net/blog/wp-content/uploads/2016/11/Git-Architechture-Git-Tutorial-Edureka.png',
      objectives: [
        'Understand what remote repositories are',
        'Learn the relationship between local and remote repos',
        'Explore how remote repositories enable collaboration'
      ],
      description: 'Introduction to remote repository concepts'
    },
    {
      id: 'push-pull',
      title: 'Push and Pull Operations',
      content: 'Master the essential commands for synchronizing your local and remote repositories: push, pull, and fetch.',
      type: 'practice',
      duration: 25,
      component: 'PushPullAnimator',
      image: 'https://wac-cdn.atlassian.com/dam/jcr:df13d351-6189-4f0b-94f0-21d3fcd66038/01.svg?cdnVersion=1096',
      objectives: [
        'Learn to push local changes to a remote',
        'Understand how to pull remote changes',
        'Distinguish between fetch and pull operations'
      ],
      description: 'Master synchronization between local and remote repositories'
    },
    {
      id: 'remote-branches',
      title: 'Remote Branches and Tracking',
      content: 'Understand how Git tracks remote branches and maintains the relationship between local and remote versions.',
      type: 'practice',
      duration: 20,
      component: 'SyncStatusIndicator',
      image: 'https://docs.github.com/assets/images/help/branches/pr-retargeting-diagram1.png',
      objectives: [
        'Understand remote-tracking branches',
        'Learn how to set up branch tracking',
        'Visualize branch synchronization status'
      ],
      description: 'Work with remote branches and tracking'
    },
    {
      id: 'remote-workflows',
      title: 'Remote Workflow Patterns',
      content: 'Explore common patterns and best practices for working with remote repositories in team environments.',
      type: 'theory',
      duration: 15,
      component: 'LocalVsRemoteVisual',
      image: 'https://www.flagship.io/wp-content/uploads/git-flow.png',
      objectives: [
        'Learn effective remote workflow patterns',
        'Understand how to stay in sync with team members',
        'Develop good habits for remote repository management'
      ],
      description: 'Explore best practices for remote repository workflows'
    }
  ],
  quiz: [
    {
      question: 'Quelle commande est utilisée pour télécharger les changements depuis un dépôt distant sans les fusionner ?',
      options: ['git pull', 'git push', 'git fetch', 'git clone'],
      correctAnswer: 2,
      explanation: 'git fetch télécharge les changements depuis un dépôt distant sans automatiquement les fusionner dans vos branches locales, contrairement à git pull qui récupère et fusionne en même temps.'
    },
    {
      question: 'Quel est le nom par défaut que Git donne au dépôt distant lorsque vous le clonez ?',
      options: ['master', 'origin', 'upstream', 'remote'],
      correctAnswer: 1,
      explanation: 'Lorsque vous clonez un dépôt, Git configure automatiquement un distant nommé "origin" qui pointe vers le dépôt cloné.'
    },
    {
      question: 'Que se passe-t-il lorsque vous essayez de pousser des commits vers une branche distante qui a été mise à jour par quelqu\'un d\'autre ?',
      options: ['Git fusionne automatiquement les changements', 'Votre push est rejeté', 'Git crée une nouvelle branche', 'Vos commits sont écrasés'],
      correctAnswer: 1,
      explanation: 'Git rejette votre push pour éviter que vous n\'écrasiez les changements. Vous devez d\'abord pull et fusionner les changements distants.'
    },
    {
      question: 'Quelle commande permet d\'ajouter un nouveau dépôt distant à votre configuration Git ?',
      options: ['git remote create', 'git add remote', 'git remote add', 'git create remote'],
      correctAnswer: 2,
      explanation: 'git remote add nom-distant url-distant ajoute un nouveau dépôt distant avec le nom et l\'URL spécifiés à votre configuration Git locale.'
    },
    {
      question: 'Comment pouvez-vous configurer une branche locale pour suivre une branche distante ?',
      options: [
        'git branch --track branche-locale origin/branche-distante', 
        'git remote track branche-locale branche-distante', 
        'git push --set-upstream origin branche-locale', 
        'git follow branche-distante'
      ],
      correctAnswer: 0,
      explanation: 'git branch --track branche-locale origin/branche-distante crée une branche locale qui suit une branche distante. Vous pouvez aussi utiliser git checkout --track origin/branche-distante ou git checkout -b branche-locale origin/branche-distante.'
    }
  ]
};