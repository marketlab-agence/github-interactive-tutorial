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
      question: 'Which GitHub feature allows you to automate build, test, and deployment workflows directly from your repository?',
      options: ['GitHub Pages', 'GitHub Projects', 'GitHub Actions', 'GitHub Packages'],
      correctAnswer: 2,
      explanation: 'GitHub Actions allows you to automate custom software development workflows directly in your GitHub repository, including building, testing, and deploying your code.'
    },
    {
      question: 'What is the best way to link a pull request to an issue it resolves?',
      options: [
        'Manually add a comment with the issue number',
        'Use keywords like "fixes" or "closes" followed by the issue number in the PR description or commit message',
        'Assign the same label to both the issue and PR',
        'Change the issue status to "In Progress"'
      ],
      correctAnswer: 1,
      explanation: 'Using keywords like "fixes #123" or "closes #123" in your PR description or commit message automatically links the PR to the issue and will close the issue when the PR is merged.'
    },
    {
      question: 'What is a GitHub workflow file?',
      options: [
        'A text file that contains instructions for GitHub Pages',
        'A YAML file that defines a GitHub Actions workflow',
        'A markdown file that describes project contribution guidelines',
        'A JSON file that configures repository settings'
      ],
      correctAnswer: 1,
      explanation: 'A GitHub workflow file is a YAML file located in the .github/workflows directory of your repository that defines your GitHub Actions workflow, including triggers, jobs, and steps.'
    }
  ]
};