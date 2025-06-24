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
      component: 'ConflictVisualizer',
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
      question: 'Que signifient les marqueurs de conflit comme "<<<<<<< HEAD" dans un fichier ?',
      options: [
        'Le fichier a été supprimé dans une branche',
        'Le début de vos modifications dans la branche actuelle',
        'Les permissions du fichier ont changé',
        'Le fichier est binaire et ne peut pas être fusionné'
      ],
      correctAnswer: 1,
      explanation: 'Le marqueur "<<<<<<< HEAD" indique le début des modifications dans votre branche actuelle (HEAD), tandis que "=======" sépare vos modifications des modifications entrantes, et ">>>>>>> nom-branche" marque la fin des modifications entrantes.'
    },
    {
      question: 'Quelle commande peut aider à minimiser les conflits de fusion lors de l\'intégration d\'une branche à longue durée de vie ?',
      options: ['git merge --force', 'git pull --rebase', 'git push --all', 'git clone --depth=1'],
      correctAnswer: 1,
      explanation: 'Utiliser "git pull --rebase" peut aider à minimiser les conflits de fusion en rejouant vos commits locaux par-dessus la branche distante mise à jour, résultant souvent en un historique plus propre et moins de conflits.'
    },
    {
      question: 'Lors de la résolution d\'un conflit de fusion, que devez-vous faire après avoir édité les fichiers en conflit ?',
      options: [
        'Exécuter git revert pour annuler la fusion',
        'Supprimer uniquement les marqueurs de conflit et sauvegarder le fichier',
        'Ajouter les fichiers résolus et terminer la fusion avec git commit',
        'Créer une nouvelle branche pour les fichiers résolus'
      ],
      correctAnswer: 2,
      explanation: 'Après avoir résolu manuellement les conflits en éditant les fichiers et en supprimant les marqueurs de conflit, vous devez ajouter les fichiers résolus avec git add puis terminer la fusion avec git commit.'
    },
    {
      question: 'Quelle est une bonne pratique pour éviter les conflits de fusion ?',
      options: [
        'Travailler uniquement sur la branche main',
        'Ne jamais fusionner les branches entre elles',
        'Faire des commits fréquents et de petite taille',
        'Désactiver les vérifications de conflits avec --no-verify'
      ],
      correctAnswer: 2,
      explanation: 'Faire des commits fréquents et de petite taille réduit la probabilité de conflits en limitant la quantité de code modifié entre les synchronisations. Cela rend également les conflits plus faciles à résoudre quand ils surviennent.'
    },
    {
      question: 'Quel outil Git peut vous aider à résoudre visuellement les conflits de fusion ?',
      options: [
        'git conflict-resolver',
        'git difftool',
        'git mergetool',
        'git visual-merge'
      ],
      correctAnswer: 2,
      explanation: 'git mergetool lance un utilitaire de fusion visuelle configuré dans Git qui vous permet de résoudre les conflits de manière interactive avec une interface plus conviviale que l\'édition manuelle des marqueurs de conflit.'
    }
  ]
};