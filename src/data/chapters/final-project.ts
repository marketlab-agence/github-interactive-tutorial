import { Chapter } from '../../types/tutorial.types';

export const finalProjectChapter: Chapter = {
  id: 'final-project',
  title: 'Final Project',
  description: 'Apply all your Git and GitHub knowledge in a comprehensive final project',
  estimatedTime: 120,
  difficulty: 'advanced',
  objectives: [
    'Apply all Git and GitHub concepts in an integrated project',
    'Practice collaborative development workflows',
    'Implement a complete Git-based development lifecycle',
    'Showcase your mastery of Git and GitHub'
  ],
  lessons: [
    {
      id: 'project-setup',
      title: 'Project Setup',
      content: 'Set up your final project repository with all the necessary components.',
      type: 'practice',
      duration: 30,
      objectives: [
        'Create and configure a well-structured repository',
        'Implement branch protection rules',
        'Set up issue templates and contribution guidelines'
      ],
      description: 'Prepare your project repository'
    },
    {
      id: 'contribute-opensource',
      title: 'Open Source Contribution Simulation',
      content: 'Simulate contributing to an open source project using all the skills you\'ve learned.',
      type: 'practice',
      duration: 45,
      component: 'OpenSourceSimulator',
      objectives: [
        'Fork and clone an existing project',
        'Create feature branches and implement changes',
        'Submit pull requests and respond to code reviews'
      ],
      description: 'Practice open source contribution'
    },
    {
      id: 'project-dashboard',
      title: 'Project Dashboard',
      content: 'Learn to track and manage your project using GitHub\'s project management features.',
      type: 'practice',
      duration: 30,
      component: 'ProjectDashboard',
      objectives: [
        'Use GitHub Projects for task management',
        'Track issues and pull requests',
        'Generate project metrics and reports'
      ],
      description: 'Manage your project with GitHub tools'
    },
    {
      id: 'certification',
      title: 'Certification Preparation',
      content: 'Review all major concepts and prepare for your Git and GitHub certification.',
      type: 'practice',
      duration: 15,
      component: 'CertificateGenerator',
      objectives: [
        'Review key Git and GitHub concepts',
        'Test your knowledge with comprehensive exercises',
        'Prepare for potential certification exams'
      ],
      description: 'Review and prepare for certification'
    }
  ],
  quiz: [
    {
      question: 'Lors de la contribution à un projet open source, quelle est généralement la première étape ?',
      options: [
        'Soumettre immédiatement une pull request avec vos modifications',
        'Forker le dépôt sur votre compte GitHub',
        'Envoyer un email aux mainteneurs pour obtenir la permission',
        'Cloner directement le dépôt principal'
      ],
      correctAnswer: 1,
      explanation: 'La première étape typique pour contribuer à un projet open source est de forker le dépôt sur votre propre compte GitHub. Cela crée votre propre copie que vous pouvez modifier librement avant de soumettre des changements via des pull requests.'
    },
    {
      question: 'Quelle est une bonne pratique lors de la création d\'une branche de fonctionnalité pour une nouvelle contribution ?',
      options: [
        'Toujours la nommer "feature"',
        'Utiliser un nom descriptif en rapport avec les modifications que vous effectuez',
        'Créer plusieurs branches pour une seule fonctionnalité',
        'La baser sur le tag stable le plus ancien'
      ],
      correctAnswer: 1,
      explanation: 'Utiliser des noms de branches descriptifs qui indiquent le but ou le contenu de vos modifications (comme "fix-login-bug" ou "add-search-feature") permet aux autres de comprendre plus facilement à quoi sert chaque branche.'
    },
    {
      question: 'Que devriez-vous faire avant de soumettre une pull request à un projet open source ?',
      options: [
        'Attendre l\'autorisation explicite des mainteneurs',
        'Ajouter les mainteneurs comme collaborateurs à votre fork',
        'Lire les directives de contribution et vous assurer que vos modifications les respectent',
        'Créer un nouveau dépôt avec uniquement vos modifications'
      ],
      correctAnswer: 2,
      explanation: 'La plupart des projets open source ont des directives de contribution qui définissent les standards de codage, les formats de messages de commit et d\'autres exigences. Lire et suivre ces directives augmente les chances que votre contribution soit acceptée.'
    },
    {
      question: 'Comment devriez-vous réagir si votre pull request est rejetée ?',
      options: [
        'Abandonner le projet complètement',
        'Créer une issue pour vous plaindre de la décision',
        'Comprendre les raisons, apprendre de l\'expérience et essayer à nouveau si approprié',
        'Forker le projet à nouveau sous un nouveau nom'
      ],
      correctAnswer: 2,
      explanation: 'Il est normal que des pull requests soient rejetées. L\'important est de comprendre pourquoi, d\'apprendre des commentaires reçus, et d\'utiliser cette expérience pour améliorer vos futures contributions, que ce soit à ce projet ou à d\'autres.'
    },
    {
      question: 'Quelle pratique est recommandée pour maintenir votre fork à jour avec le dépôt original ?',
      options: [
        'Supprimer et recréer votre fork régulièrement',
        'Configurer le dépôt original comme "upstream" et régulièrement faire des pulls depuis celui-ci',
        'Copier manuellement les fichiers modifiés',
        'Créer une nouvelle branche pour chaque mise à jour'
      ],
      correctAnswer: 1,
      explanation: 'La pratique recommandée est d\'ajouter le dépôt original comme remote, généralement nommé "upstream", puis de faire régulièrement git fetch upstream suivi de git merge upstream/main pour garder votre branche principale à jour.'
    }
  ]
};