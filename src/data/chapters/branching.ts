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
      question: 'Quelle commande Git crée une nouvelle branche et y bascule en une seule étape ?',
      options: ['git branch --switch', 'git checkout -b', 'git switch --create', 'git new-branch'],
      correctAnswer: 1,
      explanation: 'git checkout -b crée une nouvelle branche et y bascule immédiatement, combinant deux commandes en une.'
    },
    {
      question: 'Qu\'est-ce qu\'une fusion fast-forward dans Git ?',
      options: [
        'Une fusion qui se produit automatiquement',
        'Une fusion qui se produit quand la branche cible est directement en avance sur la branche courante',
        'Une fusion qui ignore la zone de staging',
        'Une fusion qui nécessite moins de confirmations'
      ],
      correctAnswer: 1,
      explanation: 'Une fusion fast-forward se produit lorsque la branche à fusionner est directement en avance sur la branche courante, permettant à Git de simplement avancer le pointeur de la branche courante.'
    },
    {
      question: 'Quelle est la principale différence entre la fusion (merge) et le rebasage (rebase) ?',
      options: [
        'La fusion est plus rapide, le rebasage est plus lent',
        'La fusion crée un nouveau commit, le rebasage réécrit l\'historique',
        'La fusion fonctionne sur les branches publiques, le rebasage non',
        'Toutes les réponses ci-dessus'
      ],
      correctAnswer: 3,
      explanation: 'Toutes les affirmations sont correctes : la fusion est généralement plus rapide, crée un commit de fusion, et est sûre pour les branches publiques, tandis que le rebasage réécrit l\'historique et devrait être évité sur les branches publiques.'
    },
    {
      question: 'Quelle commande permet de voir la liste de toutes les branches dans votre dépôt ?',
      options: ['git show branches', 'git branch -a', 'git list', 'git branches'],
      correctAnswer: 1,
      explanation: 'git branch -a (all) affiche toutes les branches, y compris les branches locales et les branches distantes suivies.'
    },
    {
      question: 'Comment supprimer une branche locale qui n\'est plus nécessaire ?',
      options: ['git branch --remove nom-branche', 'git delete nom-branche', 'git branch -d nom-branche', 'git remove nom-branche'],
      correctAnswer: 2,
      explanation: 'git branch -d nom-branche supprime une branche locale. Git vous empêchera de la supprimer si elle contient des commits non fusionnés. Pour forcer la suppression, utilisez git branch -D nom-branche.'
    }
  ]
};