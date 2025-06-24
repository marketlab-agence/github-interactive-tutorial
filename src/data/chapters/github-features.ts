import { Chapter } from '../../types/tutorial.types';

export const githubFeaturesChapter: Chapter = {
  id: 'github-features',
  title: 'GitHub Features',
  description: 'Explore advanced GitHub features to enhance your development workflow',
  estimatedTime: 85,
  difficulty: 'intermediate',
  objectives: [
    'Master GitHub Issues for project management',
    'Understand GitHub Actions for CI/CD',
    'Learn to use GitHub Pages for documentation and demos',
    'Explore GitHub\'s collaboration and project management tools'
  ],
  lessons: [
    {
      id: 'github-interface',
      title: 'GitHub Interface Overview',
      content: 'Explore the GitHub interface and understand its key features and navigation.',
      type: 'theory',
      duration: 15,
      component: 'GitHubInterfaceSimulator',
      objectives: [
        'Navigate the GitHub interface effectively',
        'Understand GitHub repository pages and options',
        'Learn about GitHub\'s social and collaboration features'
      ],
      description: 'Familiarize yourself with the GitHub interface'
    },
    {
      id: 'github-issues',
      title: 'GitHub Issues',
      content: 'Learn to effectively use GitHub Issues for bug tracking, feature requests, and project management.',
      type: 'practice',
      duration: 20,
      component: 'IssueTracker',
      objectives: [
        'Create and manage GitHub Issues',
        'Use labels, assignees, and milestones effectively',
        'Implement Issue templates for standardization'
      ],
      description: 'Master GitHub Issues for project management'
    },
    {
      id: 'github-actions',
      title: 'GitHub Actions',
      content: 'Discover how to automate your workflow with GitHub Actions for testing, building, and deploying.',
      type: 'practice',
      duration: 30,
      component: 'ActionsWorkflowBuilder',
      objectives: [
        'Create basic GitHub Actions workflows',
        'Implement CI/CD pipelines',
        'Understand workflow triggers and events'
      ],
      description: 'Automate workflows with GitHub Actions'
    },
    {
      id: 'github-pages',
      title: 'GitHub Pages',
      content: 'Learn to host websites directly from your GitHub repositories using GitHub Pages.',
      type: 'theory',
      duration: 20,
      objectives: [
        'Set up GitHub Pages for a repository',
        'Configure custom domains',
        'Understand publishing options and limitations'
      ],
      description: 'Host websites with GitHub Pages'
    }
  ],
  quiz: [
    {
      question: 'Quelle fonctionnalité GitHub vous permet d\'automatiser les workflows de build, test et déploiement directement depuis votre dépôt ?',
      options: ['GitHub Pages', 'GitHub Projects', 'GitHub Actions', 'GitHub Packages'],
      correctAnswer: 2,
      explanation: 'GitHub Actions vous permet d\'automatiser des workflows de développement logiciel personnalisés directement dans votre dépôt GitHub, y compris la compilation, les tests et le déploiement de votre code.'
    },
    {
      question: 'Quelle est la meilleure façon de lier une pull request à une issue qu\'elle résout ?',
      options: [
        'Ajouter manuellement un commentaire avec le numéro d\'issue',
        'Utiliser des mots-clés comme "fixes" ou "closes" suivi du numéro d\'issue dans la description de la PR ou le message de commit',
        'Assigner la même étiquette à l\'issue et à la PR',
        'Changer le statut de l\'issue à "En cours"'
      ],
      correctAnswer: 1,
      explanation: 'L\'utilisation de mots-clés comme "fixes #123" ou "closes #123" dans votre description de PR ou message de commit lie automatiquement la PR à l\'issue et fermera l\'issue lorsque la PR sera fusionnée.'
    },
    {
      question: 'Qu\'est-ce qu\'un fichier de workflow GitHub ?',
      options: [
        'Un fichier texte qui contient des instructions pour GitHub Pages',
        'Un fichier YAML qui définit un workflow GitHub Actions',
        'Un fichier markdown qui décrit les directives de contribution au projet',
        'Un fichier JSON qui configure les paramètres du dépôt'
      ],
      correctAnswer: 1,
      explanation: 'Un fichier de workflow GitHub est un fichier YAML situé dans le répertoire .github/workflows de votre dépôt qui définit votre workflow GitHub Actions, y compris les déclencheurs, les jobs et les étapes.'
    },
    {
      question: 'Quelle fonctionnalité GitHub permet de gérer visuellement les tâches et les projets avec des tableaux Kanban ?',
      options: [
        'GitHub Milestones',
        'GitHub Projects',
        'GitHub Boards',
        'GitHub Tasks'
      ],
      correctAnswer: 1,
      explanation: 'GitHub Projects offre des tableaux de type Kanban personnalisables pour organiser et prioriser les issues, pull requests et notes, permettant une gestion de projet visuelle directement intégrée à GitHub.'
    },
    {
      question: 'Comment pouvez-vous configurer un site web statique à partir d\'un dépôt GitHub ?',
      options: [
        'En utilisant GitHub Hosting',
        'En activant GitHub Pages dans les paramètres du dépôt',
        'En installant un plugin GitHub Web',
        'En exécutant la commande git publish'
      ],
      correctAnswer: 1,
      explanation: 'GitHub Pages est une fonctionnalité permettant d\'héberger des sites web statiques directement depuis un dépôt GitHub. Il peut être activé dans les paramètres du dépôt et peut utiliser le contenu de la branche main, d\'une branche gh-pages, ou d\'un dossier /docs.'
    }
  ]
};