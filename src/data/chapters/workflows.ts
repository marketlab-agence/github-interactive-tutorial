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
      question: 'Which workflow is most suitable for teams practicing continuous deployment?',
      options: ['GitFlow', 'GitHub Flow', 'Centralized Workflow', 'Feature Branch Workflow'],
      correctAnswer: 1,
      explanation: 'GitHub Flow is designed for simplicity and continuous deployment. Its streamlined approach with feature branches and pull requests works well for teams deploying regularly.'
    },
    {
      question: 'In GitFlow, what is the purpose of a release branch?',
      options: [
        'To develop new features in isolation',
        'To prepare a new production release and make minor fixes',
        'To fix critical bugs in production',
        'To maintain documentation'
      ],
      correctAnswer: 1,
      explanation: 'In GitFlow, release branches are created from the develop branch to prepare for a new production release. They allow for minor bug fixes and preparation while feature development continues on the develop branch.'
    },
    {
      question: 'Which of the following is NOT a typical branch in the GitFlow model?',
      options: ['main', 'develop', 'feature', 'update'],
      correctAnswer: 3,
      explanation: 'GitFlow typically uses main, develop, feature, release, and hotfix branches. "Update" branches are not part of the standard GitFlow model.'
    }
  ]
};