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
      question: 'Quelle commande crée un nouveau commit qui annule les modifications effectuées dans un commit précédent ?',
      options: ['git reset', 'git revert', 'git restore', 'git checkout'],
      correctAnswer: 1,
      explanation: 'git revert crée un nouveau commit qui annule les modifications apportées par un commit spécifique, tout en préservant l\'historique du projet, ce qui le rend sûr pour les branches partagées.'
    },
    {
      question: 'Si vous souhaitez déplacer le pointeur HEAD et de branche vers un commit précédent, en supprimant tous les commits suivants, quelle commande devriez-vous utiliser ?',
      options: [
        'git checkout HEAD~3',
        'git reset --hard HEAD~3',
        'git revert HEAD~3',
        'git restore --source=HEAD~3 .'
      ],
      correctAnswer: 1,
      explanation: 'git reset --hard HEAD~3 déplace le pointeur HEAD et de branche 3 commits en arrière et supprime tous les changements effectués dans ces commits, les effaçant effectivement de l\'historique de la branche.'
    },
    {
      question: 'Quelle fonctionnalité Git vous permet de récupérer des commits même après un reset --hard ?',
      options: ['git bisect', 'git stash', 'git reflog', 'git cherry-pick'],
      correctAnswer: 2,
      explanation: 'Le git reflog (journal de référence) enregistre tous les changements apportés aux extrémités des branches et autres références, vous permettant de retrouver et restaurer des commits qui ne sont plus référencés dans votre dépôt, même après des opérations comme git reset --hard.'
    },
    {
      question: 'Quelle commande permet d\'annuler les modifications dans un fichier qui n\'a pas encore été ajouté à l\'index (staged) ?',
      options: [
        'git reset --hard fichier.txt',
        'git checkout -- fichier.txt',
        'git revert fichier.txt',
        'git rm --cached fichier.txt'
      ],
      correctAnswer: 1,
      explanation: 'git checkout -- fichier.txt (ou git restore fichier.txt dans les versions récentes de Git) annule les modifications dans un fichier qui n\'a pas encore été ajouté à l\'index, le ramenant à l\'état du dernier commit.'
    },
    {
      question: 'Comment pouvez-vous temporairement mettre de côté vos modifications non commitées pour travailler sur autre chose ?',
      options: [
        'git save',
        'git stash',
        'git store',
        'git hide'
      ],
      correctAnswer: 1,
      explanation: 'git stash enregistre temporairement vos modifications non commitées (fichiers suivis), les met de côté pour une utilisation ultérieure, et restaure votre répertoire de travail à l\'état du dernier commit. Vous pouvez ensuite récupérer ces modifications avec git stash apply ou git stash pop.'
    }
  ]
};