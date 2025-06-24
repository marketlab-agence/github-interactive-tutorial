import { Chapter } from '../../types/tutorial.types';

export const conflictsChapter: Chapter = {
  id: 'conflicts',
  title: 'Merge Conflicts',
  description: 'Learn to identify, understand, and resolve Git merge conflicts',
  estimatedTime: 60,
  difficulty: 'intermediate',
  objectives: [
    'Understand what causes merge conflicts',
    'Learn different strategies for preventing conflicts',
    'Master the process of resolving conflicts',
    'Practice conflict resolution in common scenarios'
  ],
  lessons: [
    {
      id: 'conflict-basics',
      title: 'Understanding Conflicts',
      content: 'Learn what merge conflicts are, why they occur, and how to prevent them when possible.',
      type: 'theory',
      duration: 15,
      objectives: [
        'Understand the causes of merge conflicts',
        'Recognize conflict markers and their meaning',
        'Learn strategies to prevent unnecessary conflicts'
      ],
      description: 'Understand the nature of merge conflicts'
    },
    {
      id: 'conflict-resolution',
      title: 'Resolving Conflicts',
      content: 'Master the process of resolving merge conflicts step-by-step.',
      type: 'practice',
      duration: 25,
      component: 'ConflictResolver',
      objectives: [
        'Learn the workflow for conflict resolution',
        'Understand how to interpret conflict markers',
        'Practice manual conflict resolution'
      ],
      description: 'Practice resolving merge conflicts'
    },
    {
      id: 'advanced-conflict-tools',
      title: 'Advanced Conflict Tools',
      content: 'Explore advanced tools and techniques for handling complex merge conflicts.',
      type: 'practice',
      duration: 20,
      objectives: [
        'Use visual merge tools for conflict resolution',
        'Implement advanced techniques for complex conflicts',
        'Understand merge strategies and options'
      ],
      description: 'Learn advanced conflict resolution techniques'
    }
  ],
  quiz: [
    {
      question: 'What do conflict markers like "<<<<<<< HEAD" indicate in a file?',
      options: [
        'The file has been deleted in one branch',
        'The beginning of your changes in the current branch',
        'The file permissions have changed',
        'The file is binary and cannot be merged'
      ],
      correctAnswer: 1,
      explanation: 'The "<<<<<<< HEAD" marker indicates the beginning of the changes in your current branch (HEAD), while "=======" separates your changes from the incoming changes, and ">>>>>>> branch-name" marks the end of the incoming changes.'
    },
    {
      question: 'Which command can help minimize merge conflicts when integrating a long-running branch?',
      options: ['git merge --force', 'git pull --rebase', 'git push --all', 'git clone --depth=1'],
      correctAnswer: 1,
      explanation: 'Using "git pull --rebase" can help minimize merge conflicts by replaying your local commits on top of the updated remote branch, often resulting in a cleaner history and fewer conflicts.'
    },
    {
      question: 'When resolving a merge conflict, what must you do after editing the conflicted files?',
      options: [
        'Run git revert to undo the merge',
        'Delete the conflict markers and save the file only',
        'Add the resolved files and complete the merge with git commit',
        'Create a new branch for the resolved files'
      ],
      correctAnswer: 2,
      explanation: 'After manually resolving conflicts by editing the files and removing conflict markers, you must add the resolved files using git add and then complete the merge with git commit.'
    }
  ]
};