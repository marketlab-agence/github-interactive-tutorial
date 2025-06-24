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
      description: 'Understand the difference between fork and clone'
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
      description: 'Master the pull request workflow'
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
      description: 'Practice effective code review techniques'
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
      description: 'Explore GitHub\'s collaboration features'
    }
  ],
  quiz: [
    {
      question: 'What is the main benefit of forking a repository over simply cloning it?',
      options: [
        'Forking is faster than cloning',
        'Forking creates a personal copy on your GitHub account that you can modify freely',
        'Forking automatically sets up tracking branches',
        'Forking gives you admin rights to the original repository'
      ],
      correctAnswer: 1,
      explanation: 'Forking creates your own copy of the repository on your GitHub account, allowing you to freely modify it without affecting the original project, and making it easy to contribute back via pull requests.'
    },
    {
      question: 'What is the recommended approach when you notice issues during a code review?',
      options: [
        'Reject the pull request immediately',
        'Fix the issues yourself directly in the main branch',
        'Provide constructive feedback and suggestions for improvement',
        'Ignore small issues to avoid delaying the merge'
      ],
      correctAnswer: 2,
      explanation: 'Providing constructive feedback with specific suggestions helps the original author learn and improve their code while maintaining a positive collaborative environment.'
    },
    {
      question: 'When creating a pull request, what should you include to make it effective?',
      options: [
        'Only the code changes, comments are unnecessary',
        'A detailed description of what changes were made and why',
        'As many reviewers as possible to ensure faster approval',
        'Multiple unrelated features to reduce the number of PRs'
      ],
      correctAnswer: 1,
      explanation: 'A good pull request includes a detailed description explaining what changes were made, why they were necessary, how they were implemented, and any other context that would help reviewers understand the changes.'
    }
  ]
};