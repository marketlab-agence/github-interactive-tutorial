import { Chapter } from '../../types/tutorial.types';

export const undoingChapter: Chapter = {
  id: 'undoing',
  title: 'Undoing Changes',
  description: 'Master the various ways to undo, revert, and fix mistakes in Git',
  estimatedTime: 70,
  difficulty: 'intermediate',
  objectives: [
    'Understand different approaches to undoing changes',
    'Learn when to use reset, revert, and other commands',
    'Recover from common mistakes and errors',
    'Master techniques for maintaining a clean history'
  ],
  lessons: [
    {
      id: 'undo-commands',
      title: 'Undoing Commands Comparison',
      content: 'Explore and compare the various commands for undoing changes in Git.',
      type: 'theory',
      duration: 25,
      component: 'UndoCommandComparison',
      objectives: [
        'Understand the differences between reset, revert, checkout, and restore',
        'Learn which command to use in different scenarios',
        'Understand how each command affects your repository'
      ],
      description: 'Compare different commands for undoing changes'
    },
    {
      id: 'time-travel',
      title: 'Time Travel with Git',
      content: 'Learn how to navigate through Git history and recover previous states.',
      type: 'practice',
      duration: 20,
      component: 'TimelineNavigator',
      objectives: [
        'Navigate through your Git history',
        'Check out specific commits and previous versions',
        'Understand the "detached HEAD" state and its implications'
      ],
      description: 'Navigate through Git history'
    },
    {
      id: 'reflog',
      title: 'Git Reflog: Your Safety Net',
      content: 'Discover how Git\'s reference logs can help you recover from seemingly catastrophic mistakes.',
      type: 'practice',
      duration: 25,
      component: 'ReflogExplorer',
      objectives: [
        'Understand what the Git reflog is and how it works',
        'Learn to use reflog to find "lost" commits',
        'Recover from seemingly irreversible operations like hard resets'
      ],
      description: 'Use Git reflog to recover from mistakes'
    }
  ],
  quiz: [
    {
      question: 'Which command creates a new commit that undoes the changes made in a previous commit?',
      options: ['git reset', 'git revert', 'git restore', 'git checkout'],
      correctAnswer: 1,
      explanation: 'git revert creates a new commit that undoes the changes made by a specific commit, while preserving the project history, making it safe for shared branches.'
    },
    {
      question: 'If you want to move the HEAD and branch pointer to a previous commit, discarding all commits after it, which command should you use?',
      options: [
        'git checkout HEAD~3',
        'git reset --hard HEAD~3',
        'git revert HEAD~3',
        'git restore --source=HEAD~3 .'
      ],
      correctAnswer: 1,
      explanation: 'git reset --hard HEAD~3 moves the HEAD and branch pointer back 3 commits and discards all changes made in those commits, effectively erasing them from the branch history.'
    },
    {
      question: 'What Git feature allows you to recover commits even after a hard reset?',
      options: ['git bisect', 'git stash', 'git reflog', 'git cherry-pick'],
      correctAnswer: 2,
      explanation: 'The git reflog (reference log) records all changes to branch tips and other references, allowing you to find and restore commits that are no longer referenced in your repository, even after operations like git reset --hard.'
    }
  ]
};