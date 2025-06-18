export interface GitCommandInfo {
  command: string;
  description: string;
  example: string;
  category: 'basic' | 'branching' | 'remote' | 'advanced';
  parameters?: string[];
}

export const gitCommands: GitCommandInfo[] = [
  {
    command: 'git init',
    description: 'Initialize a new Git repository',
    example: 'git init',
    category: 'basic'
  },
  {
    command: 'git add',
    description: 'Add files to the staging area',
    example: 'git add . or git add filename.txt',
    category: 'basic',
    parameters: ['<file>', '.', '-A']
  },
  {
    command: 'git commit',
    description: 'Create a new commit with staged changes',
    example: 'git commit -m "Your commit message"',
    category: 'basic',
    parameters: ['-m', '-a', '--amend']
  },
  {
    command: 'git status',
    description: 'Show the working tree status',
    example: 'git status',
    category: 'basic'
  },
  {
    command: 'git log',
    description: 'Show commit history',
    example: 'git log --oneline',
    category: 'basic',
    parameters: ['--oneline', '--graph', '--all']
  },
  {
    command: 'git branch',
    description: 'List, create, or delete branches',
    example: 'git branch feature-branch',
    category: 'branching',
    parameters: ['-a', '-d', '-D', '-m']
  },
  {
    command: 'git checkout',
    description: 'Switch branches or restore files',
    example: 'git checkout main',
    category: 'branching',
    parameters: ['-b', '-']
  },
  {
    command: 'git merge',
    description: 'Merge branches',
    example: 'git merge feature-branch',
    category: 'branching',
    parameters: ['--no-ff', '--squash']
  },
  {
    command: 'git clone',
    description: 'Clone a repository',
    example: 'git clone https://github.com/user/repo.git',
    category: 'remote'
  },
  {
    command: 'git push',
    description: 'Push commits to remote repository',
    example: 'git push origin main',
    category: 'remote',
    parameters: ['-u', '--force', '--tags']
  },
  {
    command: 'git pull',
    description: 'Fetch and merge from remote repository',
    example: 'git pull origin main',
    category: 'remote',
    parameters: ['--rebase']
  },
  {
    command: 'git fetch',
    description: 'Download objects and refs from remote',
    example: 'git fetch origin',
    category: 'remote',
    parameters: ['--all', '--prune']
  }
];

export const getCommandsByCategory = (category: string) => {
  return gitCommands.filter(cmd => cmd.category === category);
};

export const searchCommands = (query: string) => {
  return gitCommands.filter(cmd => 
    cmd.command.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description.toLowerCase().includes(query.toLowerCase())
  );
};

export const validateCommand = (command: string): boolean => {
  const normalizedCommand = command.trim().toLowerCase();
  return gitCommands.some(cmd => 
    normalizedCommand.startsWith(cmd.command.toLowerCase())
  );
};

export const getCommandHelp = (command: string): GitCommandInfo | null => {
  return gitCommands.find(cmd => 
    command.toLowerCase().startsWith(cmd.command.toLowerCase())
  ) || null;
};