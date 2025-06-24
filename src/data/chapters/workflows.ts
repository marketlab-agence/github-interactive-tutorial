import { Chapter } from '../../types/tutorial.types';

export const workflowsChapter: Chapter = {
  id: 'workflows',
  title: 'Git Workflows',
  description: 'Explore standard Git workflow models and best practices',
  estimatedTime: 80,
  difficulty: 'intermediate',
  objectives: [
    'Understand different Git workflow models',
    'Learn about GitFlow, GitHub Flow, and GitLab Flow',
    'Implement appropriate workflows for different project types',
    'Master branching strategies for effective team collaboration'
  ],
  lessons: [
    {
      id: 'workflow-comparison',
      title: 'Comparing Git Workflows',
      content: 'Explore and compare popular Git workflow models to understand their strengths and appropriate use cases.',
      type: 'theory',
      duration: 25,
      component: 'WorkflowComparisonTable',
      image: 'https://miro.medium.com/v2/resize:fit:1358/1*uUpzVOpdFw5V-tJ_YvgFmA.png',
      objectives: [
        'Compare different Git workflow models',
        'Understand the pros and cons of each approach',
        'Learn which workflows suit different team sizes and project types'
      ],
      description: 'Compare Git workflow models'
    },
    {
      id: 'github-flow',
      title: 'GitHub Flow',
      content: 'Master the simple and effective GitHub Flow model for continuous delivery workflows.',
      type: 'practice',
      duration: 20,
      component: 'WorkflowSimulator',
      image: 'https://res.cloudinary.com/practicaldev/image/fetch/s--pFn95DCz--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n18u4rg6s0hz1qy5r1wf.png',
      workflowType: 'github-flow',
      objectives: [
        'Implement the GitHub Flow workflow',
        'Understand branch-based development with pull requests',
        'Practice continuous integration principles'
      ],
      description: 'Learn the GitHub Flow workflow model'
    },
    {
      id: 'gitflow',
      title: 'GitFlow Workflow',
      content: 'Explore the GitFlow workflow for projects with scheduled releases.',
      type: 'practice',
      duration: 20,
      component: 'WorkflowSimulator',
      image: 'https://nvie.com/img/git-model@2x.png',
      workflowType: 'git-flow',
      objectives: [
        'Understand the GitFlow branching strategy',
        'Work with feature, release, and hotfix branches',
        'Manage version releases effectively'
      ],
      description: 'Learn the GitFlow workflow model'
    },
    {
      id: 'custom-workflows',
      title: 'Creating Custom Workflows',
      content: 'Learn to design and implement custom Git workflows tailored to your team\'s specific needs.',
      type: 'practice',
      duration: 15,
      component: 'FlowDiagramBuilder',
      image: 'https://mermaid.ink/img/pako:eNp1kM9qwzAMxl8l6NRBn8ApuzThkEJyWBctbC3ErrKIxU6JnbGSeO8VJ2VdD9MfkpA-fb9PjN4jjUh97GNz9YaXhxBfXy5-tVm_Xct28_E4WGy8_-sNvs2LZbNdQgwUG7fexHi7V6vj0WG5X-xglOJ1aBKtYYMpTT_RzWtYi9_bF9i5IMF2ATX0ThpnIBHCh1ZFYKgzwbdJmQMZuZhMCkYHC8esoMKaE-RqJJ0TZ2WXU6b2ggQ_6T-nZzpKm4XoBTuKbQ26bXeYTCwPsxgXv6Hc_LjLaM5IfVK-Z35FXrDV42gGU0XH4WDPQEbjpyVqhzHCRv5ue_0Gm8p3dA?type=png',
      objectives: [
        'Design custom Git workflows',
        'Adapt existing models to specific requirements',
        'Document and communicate workflow rules'
      ],
      description: 'Design custom Git workflows'
    }
  ],
  quiz: [
    {
      question: 'Quel workflow est le plus adapté aux équipes pratiquant le déploiement continu ?',
      options: ['GitFlow', 'GitHub Flow', 'Workflow centralisé', 'Workflow de branche de fonctionnalité'],
      correctAnswer: 1,
      explanation: 'GitHub Flow est conçu pour la simplicité et le déploiement continu. Son approche simplifiée avec des branches de fonctionnalités et des pull requests fonctionne bien pour les équipes déployant régulièrement.'
    },
    {
      question: 'Dans GitFlow, quel est le but d\'une branche de release ?',
      options: [
        'Développer de nouvelles fonctionnalités isolément',
        'Préparer une nouvelle version pour la production et faire des corrections mineures',
        'Corriger des bugs critiques en production',
        'Maintenir la documentation'
      ],
      correctAnswer: 1,
      explanation: 'Dans GitFlow, les branches de release sont créées à partir de la branche develop pour préparer une nouvelle version de production. Elles permettent des corrections de bugs mineures et la préparation pendant que le développement de fonctionnalités continue sur la branche develop.'
    },
    {
      question: 'Laquelle de ces branches N\'EST PAS typique dans le modèle GitFlow ?',
      options: ['main', 'develop', 'feature', 'update'],
      correctAnswer: 3,
      explanation: 'GitFlow utilise typiquement les branches main, develop, feature, release, et hotfix. Les branches "update" ne font pas partie du modèle GitFlow standard.'
    },
    {
      question: 'Quel workflow Git est le plus adapté pour les projets avec des releases planifiées et des cycles de développement plus longs ?',
      options: ['GitHub Flow', 'GitFlow', 'Trunk-based development', 'GitLab Flow'],
      correctAnswer: 1,
      explanation: 'GitFlow, avec ses branches dédiées pour les features, releases et hotfixes, est particulièrement bien adapté aux projets ayant des releases planifiées et des cycles de développement plus longs.'
    },
    {
      question: 'Quelle est la principale caractéristique du workflow GitLab Flow par rapport à GitHub Flow ?',
      options: [
        'Il n\'utilise pas de branches du tout',
        'Il ajoute des branches d\'environnement comme production, staging',
        'Il nécessite moins de revues de code',
        'Il est exclusivement utilisable sur GitLab'
      ],
      correctAnswer: 1,
      explanation: 'GitLab Flow étend GitHub Flow en ajoutant le concept de branches d\'environnement (comme production, staging, etc.) qui représentent les différentes étapes du déploiement, permettant un meilleur contrôle du processus de release.'
    }
  ]
};