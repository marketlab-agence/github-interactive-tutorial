import { useState, useCallback } from 'react';

interface GitRepository {
  branches: string[];
  currentBranch: string;
  commits: Array<{
    hash: string;
    message: string;
    branch: string;
    timestamp: Date;
  }>;
  stagedFiles: string[];
  modifiedFiles: string[];
  untrackedFiles: string[];
}

interface GitCommand {
  command: string;
  args: string[];
  success: boolean;
  output: string;
}

export const useGitSimulation = () => {
  const [repository, setRepository] = useState<GitRepository>({
    branches: ['main'],
    currentBranch: 'main',
    commits: [],
    stagedFiles: [],
    modifiedFiles: [],
    untrackedFiles: []
  });

  const [commandHistory, setCommandHistory] = useState<GitCommand[]>([]);

  const executeCommand = useCallback((commandString: string): GitCommand => {
    const parts = commandString.trim().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    let result: GitCommand = {
      command: commandString,
      args,
      success: false,
      output: ''
    };

    switch (command) {
      case 'git':
        result = executeGitCommand(args);
        break;
      default:
        result = {
          ...result,
          output: `Commande non reconnue: ${command}`
        };
    }

    setCommandHistory(prev => [...prev, result]);
    return result;
  }, [repository]);

  const executeGitCommand = (args: string[]): GitCommand => {
    const subcommand = args[0];
    const subArgs = args.slice(1);

    let result: GitCommand = {
      command: `git ${args.join(' ')}`,
      args: subArgs,
      success: false,
      output: ''
    };

    switch (subcommand) {
      case 'init':
        result = {
          ...result,
          success: true,
          output: 'Dépôt Git initialisé dans le répertoire courant.'
        };
        break;

      case 'status':
        result = {
          ...result,
          success: true,
          output: generateStatusOutput()
        };
        break;

      case 'add':
        result = handleGitAdd(subArgs);
        break;

      case 'commit':
        result = handleGitCommit(subArgs);
        break;

      case 'branch':
        result = handleGitBranch(subArgs);
        break;

      case 'checkout':
        result = handleGitCheckout(subArgs);
        break;

      case 'merge':
        result = handleGitMerge(subArgs);
        break;

      case 'log':
        result = {
          ...result,
          success: true,
          output: generateLogOutput()
        };
        break;

      default:
        result = {
          ...result,
          output: `Sous-commande Git non reconnue: ${subcommand}`
        };
    }

    return result;
  };

  const generateStatusOutput = (): string => {
    let output = `Sur la branche ${repository.currentBranch}\n`;
    
    if (repository.stagedFiles.length > 0) {
      output += '\nModifications qui seront commitées:\n';
      repository.stagedFiles.forEach(file => {
        output += `\t${file}\n`;
      });
    }

    if (repository.modifiedFiles.length > 0) {
      output += '\nModifications qui ne seront pas commitées:\n';
      repository.modifiedFiles.forEach(file => {
        output += `\t${file}\n`;
      });
    }

    if (repository.untrackedFiles.length > 0) {
      output += '\nFichiers non suivis:\n';
      repository.untrackedFiles.forEach(file => {
        output += `\t${file}\n`;
      });
    }

    if (repository.stagedFiles.length === 0 && 
        repository.modifiedFiles.length === 0 && 
        repository.untrackedFiles.length === 0) {
      output += '\nRien à commiter, répertoire de travail propre';
    }

    return output;
  };

  const generateLogOutput = (): string => {
    if (repository.commits.length === 0) {
      return 'Aucun commit trouvé.';
    }

    return repository.commits
      .slice()
      .reverse()
      .map(commit => 
        `commit ${commit.hash}\nDate: ${commit.timestamp.toLocaleString()}\n\n    ${commit.message}\n`
      )
      .join('\n');
  };

  const handleGitAdd = (args: string[]): GitCommand => {
    if (args.length === 0) {
      return {
        command: 'git add',
        args,
        success: false,
        output: 'Aucun fichier spécifié.'
      };
    }

    const file = args[0];
    if (file === '.') {
      // Ajouter tous les fichiers modifiés et non suivis
      setRepository(prev => ({
        ...prev,
        stagedFiles: [...prev.modifiedFiles, ...prev.untrackedFiles],
        modifiedFiles: [],
        untrackedFiles: []
      }));
    } else {
      // Ajouter un fichier spécifique
      setRepository(prev => ({
        ...prev,
        stagedFiles: [...prev.stagedFiles, file],
        modifiedFiles: prev.modifiedFiles.filter(f => f !== file),
        untrackedFiles: prev.untrackedFiles.filter(f => f !== file)
      }));
    }

    return {
      command: `git add ${args.join(' ')}`,
      args,
      success: true,
      output: `Fichier(s) ajouté(s) à la zone de staging.`
    };
  };

  const handleGitCommit = (args: string[]): GitCommand => {
    const messageIndex = args.indexOf('-m');
    if (messageIndex === -1 || messageIndex === args.length - 1) {
      return {
        command: `git commit ${args.join(' ')}`,
        args,
        success: false,
        output: 'Message de commit requis. Utilisez -m "votre message".'
      };
    }

    if (repository.stagedFiles.length === 0) {
      return {
        command: `git commit ${args.join(' ')}`,
        args,
        success: false,
        output: 'Aucune modification en staging. Utilisez git add pour ajouter des fichiers.'
      };
    }

    const message = args[messageIndex + 1];
    const hash = Math.random().toString(36).substring(2, 9);

    const newCommit = {
      hash,
      message,
      branch: repository.currentBranch,
      timestamp: new Date()
    };

    setRepository(prev => ({
      ...prev,
      commits: [...prev.commits, newCommit],
      stagedFiles: []
    }));

    return {
      command: `git commit ${args.join(' ')}`,
      args,
      success: true,
      output: `[${repository.currentBranch} ${hash}] ${message}`
    };
  };

  const handleGitBranch = (args: string[]): GitCommand => {
    if (args.length === 0) {
      // Lister les branches
      const output = repository.branches
        .map(branch => branch === repository.currentBranch ? `* ${branch}` : `  ${branch}`)
        .join('\n');

      return {
        command: 'git branch',
        args,
        success: true,
        output
      };
    }

    const branchName = args[0];
    if (repository.branches.includes(branchName)) {
      return {
        command: `git branch ${args.join(' ')}`,
        args,
        success: false,
        output: `La branche '${branchName}' existe déjà.`
      };
    }

    setRepository(prev => ({
      ...prev,
      branches: [...prev.branches, branchName]
    }));

    return {
      command: `git branch ${args.join(' ')}`,
      args,
      success: true,
      output: `Branche '${branchName}' créée.`
    };
  };

  const handleGitCheckout = (args: string[]): GitCommand => {
    if (args.length === 0) {
      return {
        command: 'git checkout',
        args,
        success: false,
        output: 'Nom de branche requis.'
      };
    }

    const branchName = args[0];
    
    if (args.includes('-b')) {
      // Créer et basculer vers une nouvelle branche
      if (repository.branches.includes(branchName)) {
        return {
          command: `git checkout ${args.join(' ')}`,
          args,
          success: false,
          output: `La branche '${branchName}' existe déjà.`
        };
      }

      setRepository(prev => ({
        ...prev,
        branches: [...prev.branches, branchName],
        currentBranch: branchName
      }));

      return {
        command: `git checkout ${args.join(' ')}`,
        args,
        success: true,
        output: `Basculé vers une nouvelle branche '${branchName}'.`
      };
    }

    // Basculer vers une branche existante
    if (!repository.branches.includes(branchName)) {
      return {
        command: `git checkout ${args.join(' ')}`,
        args,
        success: false,
        output: `La branche '${branchName}' n'existe pas.`
      };
    }

    setRepository(prev => ({
      ...prev,
      currentBranch: branchName
    }));

    return {
      command: `git checkout ${args.join(' ')}`,
      args,
      success: true,
      output: `Basculé vers la branche '${branchName}'.`
    };
  };

  const handleGitMerge = (args: string[]): GitCommand => {
    if (args.length === 0) {
      return {
        command: 'git merge',
        args,
        success: false,
        output: 'Nom de branche à fusionner requis.'
      };
    }

    const branchName = args[0];
    if (!repository.branches.includes(branchName)) {
      return {
        command: `git merge ${args.join(' ')}`,
        args,
        success: false,
        output: `La branche '${branchName}' n'existe pas.`
      };
    }

    if (branchName === repository.currentBranch) {
      return {
        command: `git merge ${args.join(' ')}`,
        args,
        success: false,
        output: 'Impossible de fusionner une branche avec elle-même.'
      };
    }

    // Simuler une fusion réussie
    const hash = Math.random().toString(36).substring(2, 9);
    const mergeCommit = {
      hash,
      message: `Merge branch '${branchName}' into ${repository.currentBranch}`,
      branch: repository.currentBranch,
      timestamp: new Date()
    };

    setRepository(prev => ({
      ...prev,
      commits: [...prev.commits, mergeCommit]
    }));

    return {
      command: `git merge ${args.join(' ')}`,
      args,
      success: true,
      output: `Fusion de '${branchName}' dans '${repository.currentBranch}' terminée.`
    };
  };

  const addFile = useCallback((filename: string, type: 'modified' | 'untracked' = 'untracked') => {
    setRepository(prev => ({
      ...prev,
      [type === 'modified' ? 'modifiedFiles' : 'untrackedFiles']: [
        ...prev[type === 'modified' ? 'modifiedFiles' : 'untrackedFiles'],
        filename
      ]
    }));
  }, []);

  const resetRepository = useCallback(() => {
    setRepository({
      branches: ['main'],
      currentBranch: 'main',
      commits: [],
      stagedFiles: [],
      modifiedFiles: [],
      untrackedFiles: []
    });
    setCommandHistory([]);
  }, []);

  return {
    repository,
    commandHistory,
    executeCommand,
    addFile,
    resetRepository
  };
};