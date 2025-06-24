import { Chapter } from '../../types/tutorial.types';

export const branchingChapter: Chapter = {
  id: 'branching',
  title: 'Branching and Merging',
  description: 'Master Git\'s powerful branching and merging capabilities',
  estimatedTime: 90,
  difficulty: 'intermediate',
  objectives: [
    'Understand what Git branches are and when to use them',
    'Create, switch between, and manage branches effectively',
    'Master different merge strategies and techniques',
    'Apply branching knowledge to real-world development scenarios'
  ],
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
      description: 'Understand the fundamentals of Git branching',
      component: 'BranchAnimator'
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
      description: 'Learn to create and navigate between branches',
      component: 'BranchCreator'
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
      description: 'Master different approaches to merging branches',
      component: 'MergeTypeComparison'
    },
    {
      id: 'conflict-handling',
      title: 'Handling Merge Conflicts',
      content: 'Learn to identify, prevent, and resolve merge conflicts effectively.',
      type: 'practice',
      duration: 30,
      objectives: [
        'Understand what causes merge conflicts',
        'Learn strategies to prevent conflicts',
        'Resolve conflicts when they occur'
      ],
      description: 'Master the art of resolving merge conflicts',
      component: 'MergeSimulator'
    }
  ],
  quiz: [
    {
      question: 'What Git command creates a new branch and switches to it in one step?',
      options: ['git branch --switch', 'git checkout -b', 'git switch --create', 'git new-branch'],
      correctAnswer: 1,
      explanation: 'git checkout -b creates a new branch and immediately switches to it, combining two commands in one.'
    },
    {
      question: 'What is a fast-forward merge in Git?',
      options: [
        'A merge that happens automatically',
        'A merge that occurs when the target branch is directly ahead of the current branch',
        'A merge that skips the staging area',
        'A merge that requires fewer confirmations'
      ],
      correctAnswer: 1,
      explanation: 'A fast-forward merge occurs when the branch being merged in is directly ahead of the current branch, allowing Git to simply move the current branch pointer forward.'
    },
    {
      question: 'What is the main difference between merging and rebasing?',
      options: [
        'Merging is faster, rebasing is slower',
        'Merging creates a new commit, rebasing rewrites history',
        'Merging works on public branches, rebasing doesn\'t',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'All statements are correct: merging tends to be faster, creates a merge commit, and is safe for public branches, while rebasing rewrites history and should be avoided on public branches.'
    }
  ]
};