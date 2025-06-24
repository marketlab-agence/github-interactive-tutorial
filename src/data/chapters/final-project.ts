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
      question: 'When contributing to an open source project, what is typically the first step?',
      options: [
        'Submit a pull request immediately with your changes',
        'Fork the repository to your GitHub account',
        'Email the maintainers for permission',
        'Clone the main repository directly'
      ],
      correctAnswer: 1,
      explanation: 'The typical first step in contributing to an open source project is forking the repository to your own GitHub account. This creates your own copy that you can freely modify before submitting changes back via pull requests.'
    },
    {
      question: 'What is a good practice when creating a feature branch for a new contribution?',
      options: [
        'Always name it "feature"',
        'Use a descriptive name related to the changes you\'re making',
        'Create multiple branches for a single feature',
        'Base it off the oldest stable tag'
      ],
      correctAnswer: 1,
      explanation: 'Using descriptive branch names that indicate the purpose or content of your changes (like "fix-login-bug" or "add-search-feature") makes it easier for others to understand what each branch is for at a glance.'
    },
    {
      question: 'What should you do before submitting a pull request to an open source project?',
      options: [
        'Wait for explicit permission from maintainers',
        'Add the maintainers as collaborators to your fork',
        'Read the contribution guidelines and ensure your changes follow them',
        'Create a new repository with just your changes'
      ],
      correctAnswer: 2,
      explanation: 'Most open source projects have contribution guidelines that outline coding standards, commit message formats, and other requirements. Reading and following these guidelines increases the likelihood of your contribution being accepted.'
    }
  ]
};