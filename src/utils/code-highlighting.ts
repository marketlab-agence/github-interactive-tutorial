// Utilitaires pour la coloration syntaxique
export interface HighlightRule {
  pattern: RegExp;
  className: string;
}

export const gitHighlightRules: HighlightRule[] = [
  // Commandes Git
  { pattern: /\bgit\b/g, className: 'text-blue-400 font-semibold' },
  { pattern: /\b(add|commit|push|pull|clone|init|status|log|branch|checkout|merge|rebase|fetch|remote|tag|stash|reset|revert)\b/g, className: 'text-green-400' },
  
  // Options et flags
  { pattern: /(-[a-zA-Z]|--[a-zA-Z-]+)/g, className: 'text-yellow-400' },
  
  // Chaînes entre guillemets
  { pattern: /"([^"\\]|\\.)*"/g, className: 'text-orange-400' },
  { pattern: /'([^'\\]|\\.)*'/g, className: 'text-orange-400' },
  
  // Hash de commits
  { pattern: /\b[a-f0-9]{7,40}\b/g, className: 'text-purple-400 font-mono' },
  
  // Noms de branches
  { pattern: /\b(main|master|develop|feature\/[a-zA-Z0-9-_]+|hotfix\/[a-zA-Z0-9-_]+|release\/[a-zA-Z0-9-_]+)\b/g, className: 'text-cyan-400' },
  
  // URLs
  { pattern: /https?:\/\/[^\s]+/g, className: 'text-blue-300 underline' },
  
  // Chemins de fichiers
  { pattern: /[a-zA-Z0-9_-]+\.[a-zA-Z0-9]+/g, className: 'text-gray-300' },
];

export const bashHighlightRules: HighlightRule[] = [
  // Commandes système
  { pattern: /\b(ls|cd|mkdir|rm|cp|mv|cat|grep|find|chmod|chown|sudo|nano|vim|code)\b/g, className: 'text-green-400' },
  
  // Variables d'environnement
  { pattern: /\$[A-Z_][A-Z0-9_]*/g, className: 'text-yellow-400' },
  
  // Chaînes entre guillemets
  { pattern: /"([^"\\]|\\.)*"/g, className: 'text-orange-400' },
  { pattern: /'([^'\\]|\\.)*'/g, className: 'text-orange-400' },
  
  // Commentaires
  { pattern: /#.*/g, className: 'text-gray-500 italic' },
  
  // Options et flags
  { pattern: /(-[a-zA-Z]|--[a-zA-Z-]+)/g, className: 'text-cyan-400' },
];

export const jsHighlightRules: HighlightRule[] = [
  // Mots-clés JavaScript
  { pattern: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|class|extends|import|export|default|async|await)\b/g, className: 'text-purple-400' },
  
  // Types et valeurs spéciales
  { pattern: /\b(true|false|null|undefined|NaN|Infinity)\b/g, className: 'text-orange-400' },
  
  // Chaînes
  { pattern: /"([^"\\]|\\.)*"/g, className: 'text-green-400' },
  { pattern: /'([^'\\]|\\.)*'/g, className: 'text-green-400' },
  { pattern: /`([^`\\]|\\.)*`/g, className: 'text-green-400' },
  
  // Nombres
  { pattern: /\b\d+(\.\d+)?\b/g, className: 'text-yellow-400' },
  
  // Commentaires
  { pattern: /\/\/.*$/gm, className: 'text-gray-500 italic' },
  { pattern: /\/\*[\s\S]*?\*\//g, className: 'text-gray-500 italic' },
  
  // Fonctions
  { pattern: /\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\()/g, className: 'text-blue-400' },
];

export const highlightCode = (code: string, language: string): string => {
  let highlightedCode = code;
  let rules: HighlightRule[] = [];

  switch (language.toLowerCase()) {
    case 'git':
    case 'bash':
      rules = language === 'git' ? gitHighlightRules : bashHighlightRules;
      break;
    case 'javascript':
    case 'js':
      rules = jsHighlightRules;
      break;
    default:
      return code; // Pas de coloration pour les langages non supportés
  }

  // Appliquer les règles de coloration
  rules.forEach(rule => {
    highlightedCode = highlightedCode.replace(rule.pattern, (match) => {
      return `<span class="${rule.className}">${match}</span>`;
    });
  });

  return highlightedCode;
};

// Fonction pour extraire les mots-clés d'un code
export const extractKeywords = (code: string, language: string): string[] => {
  const keywords: string[] = [];
  let rules: HighlightRule[] = [];

  switch (language.toLowerCase()) {
    case 'git':
      rules = gitHighlightRules;
      break;
    case 'bash':
      rules = bashHighlightRules;
      break;
    case 'javascript':
    case 'js':
      rules = jsHighlightRules;
      break;
    default:
      return keywords;
  }

  rules.forEach(rule => {
    const matches = code.match(rule.pattern);
    if (matches) {
      keywords.push(...matches);
    }
  });

  // Retourner les mots-clés uniques
  return [...new Set(keywords)];
};

// Fonction pour valider la syntaxe d'une commande Git
export const validateGitCommand = (command: string): { isValid: boolean; suggestion?: string } => {
  const trimmedCommand = command.trim();
  
  if (!trimmedCommand.startsWith('git ')) {
    return {
      isValid: false,
      suggestion: 'Les commandes doivent commencer par "git"'
    };
  }

  const parts = trimmedCommand.split(' ');
  const subcommand = parts[1];

  const validSubcommands = [
    'add', 'commit', 'push', 'pull', 'clone', 'init', 'status', 'log',
    'branch', 'checkout', 'merge', 'rebase', 'fetch', 'remote', 'tag',
    'stash', 'reset', 'revert', 'diff', 'show', 'config'
  ];

  if (!validSubcommands.includes(subcommand)) {
    return {
      isValid: false,
      suggestion: `Sous-commande "${subcommand}" non reconnue. Essayez: ${validSubcommands.slice(0, 5).join(', ')}, ...`
    };
  }

  // Validations spécifiques pour certaines commandes
  if (subcommand === 'commit' && !trimmedCommand.includes('-m')) {
    return {
      isValid: false,
      suggestion: 'La commande commit nécessite un message avec -m "votre message"'
    };
  }

  return { isValid: true };
};