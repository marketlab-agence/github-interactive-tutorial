// Utilitaires de validation pour les entrées utilisateur

export interface ValidationResult {
  isValid: boolean;
  message?: string;
  suggestions?: string[];
}

// Validation des commandes Git
export const validateGitCommand = (command: string): ValidationResult => {
  const trimmed = command.trim();
  
  if (!trimmed) {
    return {
      isValid: false,
      message: 'Veuillez entrer une commande'
    };
  }

  if (!trimmed.startsWith('git ')) {
    return {
      isValid: false,
      message: 'Les commandes doivent commencer par "git"',
      suggestions: ['git status', 'git add .', 'git commit -m "message"']
    };
  }

  const parts = trimmed.split(' ');
  if (parts.length < 2) {
    return {
      isValid: false,
      message: 'Commande Git incomplète',
      suggestions: ['git status', 'git log', 'git branch']
    };
  }

  const subcommand = parts[1];
  const validCommands = [
    'add', 'commit', 'push', 'pull', 'clone', 'init', 'status', 'log',
    'branch', 'checkout', 'merge', 'rebase', 'fetch', 'remote', 'tag',
    'stash', 'reset', 'revert', 'diff', 'show', 'config', 'help'
  ];

  if (!validCommands.includes(subcommand)) {
    const suggestions = validCommands
      .filter(cmd => cmd.startsWith(subcommand.charAt(0)))
      .slice(0, 3)
      .map(cmd => `git ${cmd}`);

    return {
      isValid: false,
      message: `Commande "${subcommand}" non reconnue`,
      suggestions: suggestions.length > 0 ? suggestions : ['git help']
    };
  }

  // Validations spécifiques
  if (subcommand === 'commit') {
    if (!trimmed.includes('-m') && !trimmed.includes('--message')) {
      return {
        isValid: false,
        message: 'La commande commit nécessite un message',
        suggestions: ['git commit -m "votre message"']
      };
    }

    const messageMatch = trimmed.match(/-m\s+"([^"]+)"/);
    if (!messageMatch || messageMatch[1].trim().length === 0) {
      return {
        isValid: false,
        message: 'Le message de commit ne peut pas être vide',
        suggestions: ['git commit -m "description des changements"']
      };
    }
  }

  if (subcommand === 'push' || subcommand === 'pull') {
    if (parts.length < 3) {
      return {
        isValid: false,
        message: `La commande ${subcommand} nécessite un remote et une branche`,
        suggestions: [`git ${subcommand} origin main`]
      };
    }
  }

  return { isValid: true };
};

// Validation des noms de branches
export const validateBranchName = (branchName: string): ValidationResult => {
  if (!branchName.trim()) {
    return {
      isValid: false,
      message: 'Le nom de branche ne peut pas être vide'
    };
  }

  // Règles Git pour les noms de branches
  const invalidChars = /[~^:?*[\\\s]/;
  if (invalidChars.test(branchName)) {
    return {
      isValid: false,
      message: 'Le nom de branche contient des caractères invalides',
      suggestions: ['feature/nouvelle-fonctionnalite', 'bugfix/correction-bug']
    };
  }

  if (branchName.startsWith('.') || branchName.endsWith('.')) {
    return {
      isValid: false,
      message: 'Le nom de branche ne peut pas commencer ou finir par un point'
    };
  }

  if (branchName.includes('..')) {
    return {
      isValid: false,
      message: 'Le nom de branche ne peut pas contenir deux points consécutifs'
    };
  }

  if (branchName.length > 100) {
    return {
      isValid: false,
      message: 'Le nom de branche est trop long (maximum 100 caractères)'
    };
  }

  return { isValid: true };
};

// Validation des messages de commit
export const validateCommitMessage = (message: string): ValidationResult => {
  if (!message.trim()) {
    return {
      isValid: false,
      message: 'Le message de commit ne peut pas être vide'
    };
  }

  if (message.length < 3) {
    return {
      isValid: false,
      message: 'Le message de commit est trop court (minimum 3 caractères)',
      suggestions: ['Add new feature', 'Fix bug in login', 'Update documentation']
    };
  }

  if (message.length > 72) {
    return {
      isValid: false,
      message: 'Le message de commit est trop long (maximum 72 caractères pour la première ligne)'
    };
  }

  // Vérifier les bonnes pratiques
  const suggestions: string[] = [];
  
  if (!message.match(/^[A-Z]/)) {
    suggestions.push('Commencez par une majuscule');
  }

  if (message.endsWith('.')) {
    suggestions.push('N\'utilisez pas de point final');
  }

  if (message.includes('and')) {
    suggestions.push('Évitez "and" - séparez en plusieurs commits');
  }

  return {
    isValid: true,
    suggestions: suggestions.length > 0 ? suggestions : undefined
  };
};

// Validation des URLs de dépôts
export const validateRepositoryUrl = (url: string): ValidationResult => {
  if (!url.trim()) {
    return {
      isValid: false,
      message: 'L\'URL du dépôt ne peut pas être vide'
    };
  }

  const httpsPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\.git$/;
  const sshPattern = /^git@github\.com:[\w\-\.]+\/[\w\-\.]+\.git$/;
  const httpPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+$/;

  if (!httpsPattern.test(url) && !sshPattern.test(url) && !httpPattern.test(url)) {
    return {
      isValid: false,
      message: 'Format d\'URL invalide',
      suggestions: [
        'https://github.com/utilisateur/depot.git',
        'git@github.com:utilisateur/depot.git'
      ]
    };
  }

  return { isValid: true };
};

// Validation des emails
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return {
      isValid: false,
      message: 'L\'email ne peut pas être vide'
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return {
      isValid: false,
      message: 'Format d\'email invalide',
      suggestions: ['exemple@domaine.com']
    };
  }

  return { isValid: true };
};

// Validation des mots de passe
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return {
      isValid: false,
      message: 'Le mot de passe ne peut pas être vide'
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Le mot de passe doit contenir au moins 8 caractères'
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const suggestions: string[] = [];
  if (!hasUpperCase) suggestions.push('Ajoutez au moins une majuscule');
  if (!hasLowerCase) suggestions.push('Ajoutez au moins une minuscule');
  if (!hasNumbers) suggestions.push('Ajoutez au moins un chiffre');
  if (!hasSpecialChar) suggestions.push('Ajoutez au moins un caractère spécial');

  if (suggestions.length > 0) {
    return {
      isValid: false,
      message: 'Le mot de passe n\'est pas assez sécurisé',
      suggestions
    };
  }

  return { isValid: true };
};

// Fonction générique de validation
export const validateField = (
  value: string,
  type: 'git-command' | 'branch-name' | 'commit-message' | 'repository-url' | 'email' | 'password'
): ValidationResult => {
  switch (type) {
    case 'git-command':
      return validateGitCommand(value);
    case 'branch-name':
      return validateBranchName(value);
    case 'commit-message':
      return validateCommitMessage(value);
    case 'repository-url':
      return validateRepositoryUrl(value);
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    default:
      return { isValid: true };
  }
};