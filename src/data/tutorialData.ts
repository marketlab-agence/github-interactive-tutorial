// Tutorial data structure for Git learning platform
import { Chapter, Lesson, QuizQuestion } from '../types/tutorial.types';

// Comprehensive chapters structure for Git tutorial
export const chapters: Chapter[] = [
  {
    id: 'git-basics',
    title: 'Git Basics',
    description: 'Learn the fundamental concepts of Git version control',
    estimatedTime: 45,
    difficulty: 'beginner',
    objectives: [
      'Understand what version control is and why it\'s important',
      'Learn about distributed vs centralized systems',
      'Install and configure Git on your system',
      'Master essential Git commands for daily use'
    ],
    lessons: [
      {
        id: 'what-is-git',
        title: 'What is Git?',
        content: 'Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers collaboratively developing source code during software development.',
        type: 'theory',
        duration: 15,
        objectives: [
          'Understand what version control is',
          'Learn about distributed vs centralized systems',
          'Identify the benefits of using Git'
        ],
        description: 'Introduction to version control and Git'
      },
      {
        id: 'git-setup',
        title: 'Setting Up Git',
        content: 'Learn how to install Git on your system and configure it with your user information.',
        type: 'practice',
        duration: 20,
        objectives: [
          'Install Git on your operating system',
          'Configure Git with your name and email',
          'Verify your Git installation'
        ],
        description: 'Install and configure Git on your system'
      },
      {
        id: 'basic-commands',
        title: 'Basic Git Commands',
        content: 'Master the essential Git commands you\'ll use every day.',
        type: 'practice',
        duration: 25,
        objectives: [
          'Learn git init, add, commit commands',
          'Understand the Git workflow',
          'Practice basic repository operations'
        ],
        description: 'Learn essential Git commands for daily use'
      }
    ]
  },
  {
    id: 'repositories',
    title: 'Working with Repositories',
    description: 'Learn how to create and manage Git repositories',
    estimatedTime: 60,
    difficulty: 'beginner',
    objectives: [
      'Initialize new Git repositories and clone existing ones',
      'Understand the internal structure of Git repositories',
      'Master working with remote repositories',
      'Learn the relationship between local and remote repositories'
    ],
    lessons: [
      {
        id: 'creating-repos',
        title: 'Creating Repositories',
        content: 'Learn how to initialize new repositories and clone existing ones from remote sources.',
        type: 'practice',
        duration: 30,
        objectives: [
          'Initialize a new Git repository',
          'Clone repositories from GitHub',
          'Understand local vs remote repositories'
        ],
        description: 'Learn to initialize and clone repositories'
      },
      {
        id: 'repo-structure',
        title: 'Repository Structure',
        content: 'Understand the internal structure of a Git repository and how Git stores data.',
        type: 'theory',
        duration: 20,
        objectives: [
          'Explore the .git directory',
          'Understand Git objects and references',
          'Learn about the working directory, staging area, and repository'
        ],
        description: 'Explore how Git repositories are structured internally'
      },
      {
        id: 'remote-repos',
        title: 'Remote Repositories',
        content: 'Learn how to work with remote repositories and understand the relationship between local and remote.',
        type: 'practice',
        duration: 25,
        objectives: [
          'Add and manage remote repositories',
          'Understand origin and upstream',
          'Practice fetching and pulling changes'
        ],
        description: 'Master working with remote repositories'
      }
    ]
  },
  {
    id: 'branching',
    title: 'Branching and Merging',
    description: 'Master Git\'s powerful branching and merging capabilities',
    estimatedTime: 90,
    difficulty: 'intermediate',
    objectives: [
      'Understand what Git branches are and when to use them',
      'Create, switch between, and manage branches effectively',
      'Master different merge strategies and techniques',
      'Apply branching knowledge to real-world development scenarios'
    ],
    lessons: [
      {
        id: 'branch-basics',
        title: 'Branch Fundamentals',
        content: 'Learn what branches are and why they\'re essential for modern development workflows.',
        type: 'theory',
        duration: 20,
        objectives: [
          'Understand what Git branches are',
          'Learn when and why to use branches',
          'Explore different branching strategies'
        ],
        description: 'Understand the fundamentals of Git branching'
      },
      {
        id: 'creating-branches',
        title: 'Creating and Switching Branches',
        content: 'Practice creating, switching between, and managing branches.',
        type: 'practice',
        duration: 25,
        objectives: [
          'Create new branches with git branch',
          'Switch between branches with git checkout',
          'Use git switch for modern branch switching'
        ],
        description: 'Learn to create and navigate between branches'
      },
      {
        id: 'merging-branches',
        title: 'Merging Strategies',
        content: 'Understand different merge strategies and when to use each one.',
        type: 'practice',
        duration: 30,
        objectives: [
          'Perform fast-forward merges',
          'Create merge commits',
          'Understand rebase vs merge'
        ],
        description: 'Master different approaches to merging branches'
      },
      {
        id: 'branch-quiz',
        title: 'Branching Knowledge Check',
        content: 'Test your understanding of Git branching concepts.',
        type: 'quiz',
        duration: 15,
        objectives: [
          'Demonstrate understanding of branch concepts',
          'Apply knowledge to real-world scenarios'
        ],
        description: 'Quiz on branching fundamentals'
      }
    ]
  }
  {
    id: 'remote-repos',
    title: 'Remote Repositories',
    description: 'Master working with remote repositories and synchronization',
    estimatedTime: 75,
    difficulty: 'intermediate',
    objectives: [
      'Understand the concept of remote repositories',
      'Learn to connect local and remote repositories',
      'Master push, pull, and fetch operations',
      'Visualize the relationship between local and remote branches'
    ],
    lessons: [
      {
        id: 'remote-intro',
        title: 'Introduction to Remote Repositories',
        content: 'Remote repositories are versions of your project hosted on the internet or network. Learn how they enable collaboration and serve as backups for your work.',
        type: 'theory',
        duration: 15,
        component: 'RemoteConnectionVisual',
        objectives: [
          'Understand what remote repositories are',
          'Learn the relationship between local and remote repos',
          'Explore how remote repositories enable collaboration'
        ],
        description: 'Introduction to remote repository concepts'
      },
      {
        id: 'push-pull',
        title: 'Push and Pull Operations',
        content: 'Master the essential commands for synchronizing your local and remote repositories: push, pull, and fetch.',
        type: 'practice',
        duration: 25,
        component: 'PushPullAnimator',
        objectives: [
          'Learn to push local changes to a remote',
          'Understand how to pull remote changes',
          'Distinguish between fetch and pull operations'
        ],
        description: 'Master synchronization between local and remote repositories'
      },
      {
        id: 'remote-branches',
        title: 'Remote Branches and Tracking',
        content: 'Understand how Git tracks remote branches and maintains the relationship between local and remote versions.',
        type: 'practice',
        duration: 20,
        component: 'SyncStatusIndicator',
        objectives: [
          'Understand remote-tracking branches',
          'Learn how to set up branch tracking',
          'Visualize branch synchronization status'
        ],
        description: 'Work with remote branches and tracking'
      },
      {
        id: 'remote-workflows',
        title: 'Remote Workflow Patterns',
        content: 'Explore common patterns and best practices for working with remote repositories in team environments.',
        type: 'theory',
        duration: 15,
        component: 'LocalVsRemoteVisual',
        objectives: [
          'Learn effective remote workflow patterns',
          'Understand how to stay in sync with team members',
          'Develop good habits for remote repository management'
        ],
        description: 'Explore best practices for remote repository workflows'
      }
    ],
    quiz: [
      {
        question: 'Which command is used to download changes from a remote repository without merging them?',
        options: ['git pull', 'git push', 'git fetch', 'git clone'],
        correctAnswer: 2,
        explanation: 'git fetch downloads changes from a remote repository without automatically merging them into your local branches, unlike git pull which both fetches and merges.'
      },
      {
        question: 'What is the default name Git gives to the remote repository when you clone it?',
        options: ['master', 'origin', 'upstream', 'remote'],
        correctAnswer: 1,
        explanation: 'When you clone a repository, Git automatically sets up a remote named "origin" that points to the cloned repository.'
      },
      {
        question: 'What happens when you try to push commits to a remote branch that has been updated by someone else?',
        options: ['Git automatically merges the changes', 'Your push is rejected', 'Git creates a new branch', 'Your commits are overwritten'],
        correctAnswer: 1,
        explanation: 'Git rejects your push to prevent you from overwriting changes. You need to pull and merge the remote changes first.'
      }
    ]
  },
  {
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
  },
  {
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
  },
  {
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
        question: 'What do conflict markers like "<<<<<<< HEAD" indicate in a file?',
        options: [
          'The file has been deleted in one branch',
          'The beginning of your changes in the current branch',
          'The file permissions have changed',
          'The file is binary and cannot be merged'
        ],
        correctAnswer: 1,
        explanation: 'The "<<<<<<< HEAD" marker indicates the beginning of the changes in your current branch (HEAD), while "=======" separates your changes from the incoming changes, and ">>>>>>> branch-name" marks the end of the incoming changes.'
      },
      {
        question: 'Which command can help minimize merge conflicts when integrating a long-running branch?',
        options: ['git merge --force', 'git pull --rebase', 'git push --all', 'git clone --depth=1'],
        correctAnswer: 1,
        explanation: 'Using "git pull --rebase" can help minimize merge conflicts by replaying your local commits on top of the updated remote branch, often resulting in a cleaner history and fewer conflicts.'
      },
      {
        question: 'When resolving a merge conflict, what must you do after editing the conflicted files?',
        options: [
          'Run git revert to undo the merge',
          'Delete the conflict markers and save the file only',
          'Add the resolved files and complete the merge with git commit',
          'Create a new branch for the resolved files'
        ],
        correctAnswer: 2,
        explanation: 'After manually resolving conflicts by editing the files and removing conflict markers, you must add the resolved files using git add and then complete the merge with git commit.'
      }
    ]
  },
  {
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
        question: 'Which command creates a new commit that undoes the changes made in a previous commit?',
        options: ['git reset', 'git revert', 'git restore', 'git checkout'],
        correctAnswer: 1,
        explanation: 'git revert creates a new commit that undoes the changes made by a specific commit, while preserving the project history, making it safe for shared branches.'
      },
      {
        question: 'If you want to move the HEAD and branch pointer to a previous commit, discarding all commits after it, which command should you use?',
        options: [
          'git checkout HEAD~3',
          'git reset --hard HEAD~3',
          'git revert HEAD~3',
          'git restore --source=HEAD~3 .'
        ],
        correctAnswer: 1,
        explanation: 'git reset --hard HEAD~3 moves the HEAD and branch pointer back 3 commits and discards all changes made in those commits, effectively erasing them from the branch history.'
      },
      {
        question: 'What Git feature allows you to recover commits even after a hard reset?',
        options: ['git bisect', 'git stash', 'git reflog', 'git cherry-pick'],
        correctAnswer: 2,
        explanation: 'The git reflog (reference log) records all changes to branch tips and other references, allowing you to find and restore commits that are no longer referenced in your repository, even after operations like git reset --hard.'
      }
    ]
  },
  {
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
  },
  {
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
  }
];

// Keep the existing tutorialData export for backward compatibility
export const tutorialData = {
  chapters
};