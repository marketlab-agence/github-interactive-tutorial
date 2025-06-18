export interface GitRepository {
  id: string;
  name: string;
  branches: GitBranch[];
  commits: GitCommit[];
  remotes: GitRemote[];
  status: RepoStatus;
}

export interface GitBranch {
  name: string;
  commits: string[];
  isActive: boolean;
  upstream?: string;
}

export interface GitCommit {
  hash: string;
  message: string;
  author: string;
  date: Date;
  files: string[];
  parent?: string;
}

export interface GitRemote {
  name: string;
  url: string;
  type: 'origin' | 'upstream' | 'fork';
}

export interface RepoStatus {
  staged: string[];
  modified: string[];
  untracked: string[];
  conflicts: string[];
}

export interface GitCommand {
  command: string;
  args: string[];
  description: string;
  example: string;
  category: 'basic' | 'branching' | 'remote' | 'advanced';
}