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
      question: 'Which command is used to download changes from a remote repository without merging them?',
      options: ['git pull', 'git push', 'git fetch', 'git clone'],
      correctAnswer: 2,
      explanation: 'git fetch downloads changes from a remote repository without automatically merging them into your local branches, unlike git pull which both fetches and merges.'
    },
    {
      question: 'What is the default name Git gives to the remote repository when you clone it?',
      options: ['master', 'origin', 'upstream', 'remote'],
      correctAnswer: 1,
      explanation: 'When you clone a repository, Git automatically sets up a remote named "origin" that points to the cloned repository.'
    },
    {
      question: 'What happens when you try to push commits to a remote branch that has been updated by someone else?',
      options: ['Git automatically merges the changes', 'Your push is rejected', 'Git creates a new branch', 'Your commits are overwritten'],
      correctAnswer: 1,
      explanation: 'Git rejects your push to prevent you from overwriting changes. You need to pull and merge the remote changes first.'
    }
  ]
};