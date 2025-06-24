import { Chapter } from '../../types/tutorial.types';

export const collaborationChapter: Chapter = {
  id: 'collaboration',
  title: 'Collaboration with Git & GitHub',
  description: 'Learn effective collaboration techniques using Git and GitHub',
  estimatedTime: 90,
  difficulty: 'intermediate',
  objectives: [
    'Understand the fork and pull request model',
    'Master collaborative workflows with GitHub',
    'Learn effective code review practices',
    'Develop skills for team-based development'
  ],
  lessons: [
    {
      id: 'fork-clone',
      title: 'Fork vs Clone',
      content: 'Understand the difference between forking and cloning repositories, and when to use each approach.',
      type: 'theory',
      duration: 20,
      component: 'ForkVsCloneDemo',
      objectives: [
        'Understand what forking a repository means',
        'Compare forking and cloning workflows',
        'Learn when to fork versus when to clone'
      ],
      description: 'Understand the difference between fork and clone',
      image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--M_fHUEqA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/128hsgntnsu9bww0y8sz.png'
    },
    {
      id: 'pull-requests',
      title: 'Pull Requests',
      content: 'Learn how to create, review, and manage pull requests for seamless collaboration.',
      type: 'practice',
      duration: 25,
      component: 'PullRequestCreator',
      objectives: [
        'Create effective pull requests',
        'Add meaningful descriptions and context',
        'Link issues and reference relevant resources'
      ],
      description: 'Master the pull request workflow',
      image: 'https://docs.github.com/assets/images/help/pull_requests/pull-request-review-page.png'
    },
    {
      id: 'code-reviews',
      title: 'Code Reviews',
      content: 'Explore the art of effective code reviews to maintain code quality and knowledge sharing.',
      type: 'practice',
      duration: 20,
      component: 'CodeReviewInterface',
      objectives: [
        'Learn effective code review techniques',
        'Understand how to give and receive feedback',
        'Use GitHub\'s code review tools effectively'
      ],
      description: 'Practice effective code review techniques',
      image: 'https://github.blog/wp-content/uploads/2022/06/code-review.png?fit=1200%2C630'
    },
    {
      id: 'collaboration-tools',
      title: 'GitHub Collaboration Tools',
      content: 'Explore additional GitHub features that enhance team collaboration and project management.',
      type: 'practice',
      duration: 25,
      component: 'CollaborationSimulator',
      objectives: [
        'Use GitHub issues for task management',
        'Implement project boards for workflow visualization',
        'Leverage GitHub discussions and team features'
      ],
      description: 'Explore GitHub\'s collaboration features',
      image: 'https://cdn.ttgtmedia.com/rms/onlineimages/cio-github_collaboration-f.png'
    }
  ],
  quiz: [
    {
      question: 'Quel est le principal avantage de forker un dépôt plutôt que de simplement le cloner ?',
      options: [
        'Le fork est plus rapide que le clone',
        'Le fork crée une copie personnelle sur votre compte GitHub que vous pouvez modifier librement',
        'Le fork configure automatiquement des branches de suivi',
        'Le fork vous donne des droits d\'administrateur sur le dépôt d\'origine'
      ],
      correctAnswer: 1,
      explanation: 'Le fork crée votre propre copie du dépôt sur votre compte GitHub, vous permettant de le modifier librement sans affecter le projet d\'origine, et facilitant la contribution via des pull requests.'
    },
    {
      question: 'Quelle est l\'approche recommandée lorsque vous remarquez des problèmes lors d\'une revue de code ?',
      options: [
        'Rejeter immédiatement la pull request',
        'Corriger les problèmes vous-même directement dans la branche principale',
        'Fournir des commentaires constructifs et des suggestions d\'amélioration',
        'Ignorer les petits problèmes pour éviter de retarder la fusion'
      ],
      correctAnswer: 2,
      explanation: 'Fournir des commentaires constructifs avec des suggestions spécifiques aide l\'auteur original à apprendre et à améliorer son code tout en maintenant un environnement de collaboration positif.'
    },
    {
      question: 'Lors de la création d\'une pull request, que devriez-vous inclure pour la rendre efficace ?',
      options: [
        'Uniquement les changements de code, les commentaires sont inutiles',
        'Une description détaillée des changements effectués et de leur raison',
        'Autant de réviseurs que possible pour assurer une approbation plus rapide',
        'Plusieurs fonctionnalités sans rapport pour réduire le nombre de PRs'
      ],
      correctAnswer: 1,
      explanation: 'Une bonne pull request inclut une description détaillée expliquant quels changements ont été effectués, pourquoi ils étaient nécessaires, comment ils ont été implémentés, et tout autre contexte qui aiderait les réviseurs à comprendre les changements.'
    },
    {
      question: 'Quelle est la meilleure façon de gérer les commentaires reçus sur votre pull request ?',
      options: [
        'Ignorer les commentaires que vous trouvez inutiles',
        'Argumenter vigoureusement contre toutes les suggestions',
        'Répondre à chaque commentaire et apporter les modifications demandées quand approprié',
        'Fermer la PR actuelle et en créer une nouvelle avec les corrections'
      ],
      correctAnswer: 2,
      explanation: 'Il est important de répondre de manière professionnelle à tous les commentaires, de discuter poliment des désaccords éventuels, et d\'intégrer les suggestions pertinentes. Cela maintient une collaboration saine et améliore la qualité du code.'
    },
    {
      question: 'Quel est le rôle d\'un mainteneur de dépôt dans le processus de pull request ?',
      options: [
        'Développer la majorité des fonctionnalités',
        'Examiner les contributions, suggérer des améliorations et approuver ou rejeter les changements',
        'Uniquement gérer les problèmes de serveur GitHub',
        'Promouvoir le projet sur les réseaux sociaux'
      ],
      correctAnswer: 1,
      explanation: 'Les mainteneurs de dépôt sont responsables de l\'examen des contributions, en s\'assurant qu\'elles respectent les normes du projet, en suggérant des améliorations si nécessaire, et finalement en approuvant et fusionnant ou rejetant les changements proposés.'
    }
  ]
};