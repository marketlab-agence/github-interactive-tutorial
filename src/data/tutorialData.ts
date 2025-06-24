import { GitCommit, GitBranch, Cloud, Users, Calendar, Activity } from 'lucide-react';

export const chapters = [
  {
    id: 'intro',
    title: 'Introduction à Git et GitHub',
    description: 'Découvrez les concepts de base du contrôle de version et la différence entre Git et GitHub. Comprenez pourquoi ces outils sont essentiels au développement moderne.',
    estimatedTime: 45,
    objectives: [
      "Comprendre la différence entre Git et GitHub",
      "Saisir les principes fondamentaux du contrôle de version",
      "Installer et configurer Git sur votre machine"
    ],
    icon: GitCommit,
    lessons: [
      {
        id: 'intro-1',
        title: 'Qu\'est-ce que Git et GitHub?',
        type: 'theory',
        duration: 10,
        content: `Git et GitHub sont deux outils fondamentaux mais distincts dans le monde du développement logiciel moderne.

**Git** est un système de contrôle de version distribué créé par Linus Torvalds en 2005. Il permet de suivre les modifications de votre code, de revenir à des versions antérieures, de travailler sur différentes fonctionnalités en parallèle, et de collaborer efficacement avec d'autres développeurs.

**GitHub**, en revanche, est une plateforme web qui fournit des services d'hébergement pour les dépôts Git. Elle ajoute une interface graphique et des fonctionnalités supplémentaires pour faciliter la collaboration, comme les pull requests, les issues, et les actions automatisées.

En résumé, Git est l'outil de base, tandis que GitHub est un service construit autour de Git pour faciliter la collaboration et le partage de code.`,
        component: 'GitVsGitHubComparison',
        objectives: ["Comprendre la différence fondamentale entre Git et GitHub", "Identifier les cas d'utilisation de chaque outil"]
      },
      {
        id: 'intro-2',
        title: 'Pourquoi utiliser un système de contrôle de version?',
        type: 'theory',
        duration: 10,
        content: `Le contrôle de version est essentiel dans le développement logiciel moderne pour plusieurs raisons clés:

1. **Historique des modifications**: Vous pouvez voir qui a fait quels changements, quand et pourquoi.

2. **Collaboration**: Plusieurs personnes peuvent travailler sur le même projet sans écraser les modifications des autres.

3. **Versions et releases**: Vous pouvez marquer des points spécifiques dans l'histoire de votre projet comme des versions ou des releases.

4. **Branches parallèles**: Vous pouvez développer plusieurs fonctionnalités simultanément sans interférences.

5. **Sécurité et backup**: Votre code est sauvegardé et peut être restauré à n'importe quel point de son histoire.

Sans contrôle de version, la collaboration serait chaotique, avec des échanges de fichiers par email ou des risques de perte de données. Git résout ces problèmes en offrant un système robuste et distribué.`,
        component: 'VersioningDemo',
        objectives: ["Identifier les avantages d'utiliser un système de contrôle de version", "Comprendre comment Git améliore le workflow de développement"]
      },
      {
        id: 'intro-3',
        title: 'Installation et Configuration',
        type: 'practice',
        duration: 15,
        content: `Pour commencer à utiliser Git, vous devez d'abord l'installer sur votre machine. Voici comment procéder selon votre système d'exploitation:

**Windows**:
1. Téléchargez l'installateur depuis [git-scm.com](https://git-scm.com/download/win)
2. Exécutez l'installateur en suivant les instructions

**macOS**:
1. La façon la plus simple est d'installer les Command Line Tools:
   \`\`\`bash
   xcode-select --install
   \`\`\`
2. Ou utilisez Homebrew:
   \`\`\`bash
   brew install git
   \`\`\`

**Linux**:
Utilisez le gestionnaire de paquets de votre distribution:
\`\`\`bash
# Debian/Ubuntu
sudo apt-get update
sudo apt-get install git

# Fedora
sudo dnf install git
\`\`\`

Une fois Git installé, vous devez configurer votre identité:
\`\`\`bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@exemple.com"
\`\`\`

Cette configuration est essentielle car chaque commit Git utilisera ces informations.`,
        component: 'GitCommandSimulator',
        objectives: ["Installer Git sur votre machine", "Configurer correctement votre identité Git"]
      },
      {
        id: 'intro-4',
        title: 'Comprendre les dépôts locaux et distants',
        type: 'theory',
        duration: 10,
        content: `Dans l'écosystème Git, il existe deux types principaux de dépôts:

**Dépôt local**: C'est le dépôt sur votre machine locale. Vous travaillez directement avec celui-ci, en faisant des commits, en créant des branches, et en fusionnant des changements sans avoir besoin d'une connexion internet.

**Dépôt distant**: Il s'agit d'une copie de votre dépôt hébergée sur un serveur (comme GitHub, GitLab, ou Bitbucket). Il sert de point central pour la collaboration et comme sauvegarde.

La relation entre ces deux types de dépôts est fondamentale:

1. **Clone**: Lorsque vous clonez un dépôt distant, vous créez une copie complète sur votre machine locale.

2. **Pull**: Vous récupérez les changements du dépôt distant vers votre dépôt local.

3. **Push**: Vous envoyez vos changements locaux vers le dépôt distant.

Cette architecture distribuée est ce qui rend Git si puissant. Vous pouvez travailler en toute autonomie sur votre dépôt local, et synchroniser avec le dépôt distant seulement quand vous êtes prêt.`,
        component: 'LocalVsRemoteVisual',
        objectives: ["Différencier les dépôts locaux et distants", "Comprendre comment ils interagissent"]
      }
    ],
    quiz: [
      {
        question: 'Quelle est la principale différence entre Git et GitHub?',
        options: [
          'Git est payant, GitHub est gratuit',
          'Git est un système de contrôle de version, GitHub est une plateforme d\'hébergement',
          'Git est pour Windows, GitHub est pour Mac',
          'Git est un langage de programmation, GitHub est un IDE'
        ],
        correctAnswer: 1,
        explanation: 'Git est un système de contrôle de version distribué qui fonctionne localement sur votre machine, tandis que GitHub est une plateforme web qui héberge des dépôts Git et ajoute des fonctionnalités supplémentaires pour la collaboration.'
      },
      {
        question: 'Pourquoi est-il important de configurer son identité dans Git?',
        options: [
          'Pour pouvoir se connecter à GitHub',
          'Pour pouvoir créer des branches',
          'Pour identifier qui a fait chaque commit',
          'Pour recevoir des notifications par email'
        ],
        correctAnswer: 2,
        explanation: 'La configuration de votre nom et email dans Git est essentielle car ces informations seront associées à chacun de vos commits, permettant à tous de savoir qui a fait quels changements dans le projet.'
      },
      {
        question: 'Quel est l\'avantage principal d\'un système de contrôle de version distribué comme Git?',
        options: [
          'Il est plus rapide que les systèmes centralisés',
          'Il permet de travailler sans connexion internet',
          'Il est plus facile à apprendre',
          'Il est compatible avec tous les langages de programmation'
        ],
        correctAnswer: 1,
        explanation: 'Un des principaux avantages de Git en tant que système distribué est que vous avez une copie complète du dépôt sur votre machine, vous permettant de travailler, de faire des commits et de naviguer dans l\'historique sans avoir besoin d\'une connexion internet.'
      },
      {
        question: 'Comment s\'appelle l\'opération qui permet de récupérer les changements d\'un dépôt distant vers votre dépôt local?',
        options: [
          'git clone',
          'git push',
          'git pull',
          'git fetch'
        ],
        correctAnswer: 2,
        explanation: 'La commande "git pull" permet de récupérer les changements du dépôt distant et de les intégrer à votre dépôt local. C\'est essentiellement une combinaison de "git fetch" suivi de "git merge".'
      },
      {
        question: 'Quelle commande Git permet d\'initialiser un nouveau dépôt?',
        options: [
          'git start',
          'git init',
          'git create',
          'git new'
        ],
        correctAnswer: 1,
        explanation: 'La commande "git init" initialise un nouveau dépôt Git dans le répertoire courant, créant un sous-répertoire .git qui contient toutes les métadonnées nécessaires pour le suivi des versions.'
      }
    ]
  },
  {
    id: 'repositories',
    title: 'Dépôts et Commits',
    description: 'Apprenez à créer et gérer des dépôts Git, comprendre le cycle de vie des fichiers et effectuer vos premiers commits pour sauvegarder vos modifications de manière organisée.',
    estimatedTime: 60,
    objectives: [
      "Créer et initialiser des dépôts Git",
      "Comprendre le cycle de vie des fichiers (untracked, staged, committed)",
      "Effectuer des commits avec des messages descriptifs",
      "Explorer l'historique des commits"
    ],
    icon: GitCommit,
    lessons: [
      {
        id: 'repos-1',
        title: 'Création d\'un dépôt',
        type: 'practice',
        duration: 15,
        content: `La création d'un dépôt Git est l'étape fondamentale qui vous permet de commencer à suivre les modifications de vos fichiers. Il existe deux façons principales de créer un dépôt:

**1. Initialiser un nouveau dépôt local**

Pour transformer un répertoire existant en dépôt Git:
\`\`\`bash
git init
\`\`\`
Cette commande crée un sous-dossier caché .git qui contient toute la structure nécessaire au fonctionnement de Git.

**2. Cloner un dépôt existant**

Pour créer une copie locale d'un dépôt distant:
\`\`\`bash
git clone https://github.com/utilisateur/depot.git
\`\`\`
Cette commande télécharge tout le dépôt avec son historique complet.

**Création sur GitHub**

Vous pouvez également créer un dépôt directement sur GitHub:
1. Connectez-vous à votre compte
2. Cliquez sur "New repository"
3. Remplissez les informations (nom, description, visibilité)
4. Choisissez d'initialiser avec un README si souhaité
5. Créez le dépôt
6. Suivez les instructions pour le connecter à votre dépôt local

Le fichier README.md est souvent le premier fichier créé dans un dépôt. Il sert de documentation principale et est affiché automatiquement sur la page d'accueil du dépôt sur GitHub.`,
        component: 'RepoCreationWizard',
        objectives: ["Créer un dépôt local avec git init", "Cloner un dépôt existant", "Créer un dépôt sur GitHub"]
      },
      {
        id: 'repos-2',
        title: 'Cycle de vie des fichiers',
        type: 'theory',
        duration: 15,
        content: `Dans Git, les fichiers passent par différents états que vous devez comprendre pour bien gérer vos modifications:

**1. Untracked (Non suivi)**: 
Fichiers qui existent dans votre répertoire de travail mais que Git ne suit pas encore. Ces fichiers n'ont jamais été ajoutés à l'index (staging area) ou commités.

**2. Tracked (Suivis)**: 
Fichiers que Git connaît et suit. Ils peuvent être dans trois sous-états:

- **Unmodified (Non modifiés)**: Fichiers qui n'ont pas changé depuis le dernier commit.
  
- **Modified (Modifiés)**: Fichiers qui ont été modifiés mais pas encore ajoutés à l'index.
  
- **Staged (Indexés)**: Fichiers modifiés qui ont été ajoutés à l'index et sont prêts à être commités.

**Le workflow typique** ressemble à ceci:

1. Vous modifiez des fichiers dans votre répertoire de travail.
2. Vous ajoutez les fichiers modifiés à l'index (staging area) avec \`git add\`.
3. Vous validez vos modifications avec \`git commit\`, créant un instantané permanent.

Pour voir l'état actuel de vos fichiers:
\`\`\`bash
git status
\`\`\`

Cette commande vous montrera quels fichiers sont modifiés, lesquels sont indexés et lesquels ne sont pas suivis.

La compréhension de ce cycle est fondamentale pour utiliser Git efficacement. Cela vous permet de contrôler précisément quelles modifications seront incluses dans votre prochain commit.`,
        component: 'StagingAreaVisualizer',
        objectives: ["Comprendre les différents états des fichiers dans Git", "Maîtriser le concept de staging area", "Savoir vérifier l'état des fichiers avec git status"]
      },
      {
        id: 'repos-3',
        title: 'Effectuer des commits',
        type: 'practice',
        duration: 15,
        content: `Un commit dans Git est un instantané de l'état de votre projet à un moment précis. C'est comme prendre une photo de votre code à un instant T, que vous pourrez retrouver plus tard.

**Créer un commit**

Pour créer un commit:

1. D'abord, ajoutez vos modifications à la zone de staging:
   \`\`\`bash
   git add fichier.txt     # Ajouter un fichier spécifique
   git add .               # Ajouter tous les fichiers modifiés
   \`\`\`

2. Puis validez ces modifications:
   \`\`\`bash
   git commit -m "Description concise des changements"
   \`\`\`

**Messages de commit efficaces**

Un bon message de commit:
- Est concis mais descriptif
- Commence par un verbe à l'impératif (Add, Fix, Update...)
- Explique le "pourquoi" du changement, pas seulement le "quoi"
- Suit la convention de votre équipe ou projet

Exemple:
\`\`\`
Fix: résolution du bug d'authentification
\`\`\`

**Commits atomiques**

Il est recommandé de faire des commits atomiques, c'est-à-dire:
- Chaque commit représente un changement logique unique
- Tous les fichiers nécessaires à ce changement sont inclus
- Le code reste fonctionnel après chaque commit

Cette approche facilite la compréhension de l'historique, la recherche de bugs et la réversion de changements spécifiques.`,
        component: 'GitCommandSimulator',
        objectives: ["Créer des commits avec des messages descriptifs", "Comprendre l'importance des commits atomiques", "Maîtriser les commandes git add et git commit"]
      },
      {
        id: 'repos-4',
        title: 'Explorer l\'historique',
        type: 'theory',
        duration: 15,
        content: `L'un des grands avantages de Git est sa capacité à préserver un historique complet des modifications. Savoir explorer cet historique est essentiel pour comprendre l'évolution du code et résoudre les problèmes.

**Afficher l'historique des commits**

La commande de base:
\`\`\`bash
git log
\`\`\`

Options utiles:
- \`git log --oneline\`: Format compact, une ligne par commit
- \`git log --graph\`: Visualisation graphique des branches
- \`git log -p\`: Affiche les différences introduites par chaque commit
- \`git log --author="nom"\`: Filtre par auteur
- \`git log --since="2 weeks ago"\`: Filtre par date

**Examiner les modifications**

Pour voir les modifications d'un commit spécifique:
\`\`\`bash
git show <commit-hash>
\`\`\`

Pour comparer les différences entre deux commits:
\`\`\`bash
git diff <commit1> <commit2>
\`\`\`

Pour voir les modifications d'un fichier spécifique:
\`\`\`bash
git blame <fichier>
\`\`\`
Cette commande montre qui a modifié chaque ligne du fichier et dans quel commit.

**Rechercher dans l'historique**

Pour rechercher un terme dans tous les commits:
\`\`\`bash
git log -S "terme-recherché"
\`\`\`

L'exploration de l'historique est précieuse pour comprendre pourquoi une certaine décision a été prise, trouver quand un bug a été introduit, ou simplement suivre l'évolution du projet au fil du temps.`,
        component: 'CommitHistoryExplorer',
        objectives: ["Naviguer dans l'historique des commits", "Examiner les changements spécifiques entre versions", "Utiliser les commandes git log, git show et git diff"]
      }
    ],
    quiz: [
      {
        question: 'Quelle commande permet d\'initialiser un nouveau dépôt Git?',
        options: [
          'git create',
          'git init',
          'git start',
          'git new'
        ],
        correctAnswer: 1,
        explanation: 'La commande "git init" est utilisée pour initialiser un nouveau dépôt Git dans le répertoire courant, créant la structure nécessaire pour le suivi des versions.'
      },
      {
        question: 'Quel est l\'état d\'un fichier nouvellement créé dans un dépôt Git?',
        options: [
          'Modified',
          'Staged',
          'Committed',
          'Untracked'
        ],
        correctAnswer: 3,
        explanation: 'Un fichier nouvellement créé qui n\'a jamais été ajouté au dépôt Git est considéré comme "Untracked" (non suivi). Git ne suivra pas automatiquement les nouveaux fichiers tant que vous ne les ajoutez pas explicitement avec git add.'
      },
      {
        question: 'Quelle commande permet d\'ajouter des fichiers à la zone de staging?',
        options: [
          'git stage',
          'git track',
          'git add',
          'git commit'
        ],
        correctAnswer: 2,
        explanation: 'La commande "git add" est utilisée pour ajouter des fichiers à la zone de staging (ou index), où ils seront préparés pour le prochain commit.'
      },
      {
        question: 'Qu\'est-ce qu\'un commit atomique?',
        options: [
          'Un commit qui ne peut pas être divisé',
          'Un commit qui contient tous les fichiers du projet',
          'Un commit qui représente un changement logique unique et cohérent',
          'Un commit effectué par un seul développeur'
        ],
        correctAnswer: 2,
        explanation: 'Un commit atomique est un commit qui représente un changement logique unique et cohérent. Cela signifie que le commit inclut tous les fichiers nécessaires pour cette modification spécifique, et que le code reste fonctionnel après le commit.'
      },
      {
        question: 'Comment afficher l\'historique des commits de façon compacte (une ligne par commit)?',
        options: [
          'git log --compact',
          'git log --short',
          'git log --oneline',
          'git log --brief'
        ],
        correctAnswer: 2,
        explanation: 'La commande "git log --oneline" affiche l\'historique des commits sous forme condensée, avec un commit par ligne, montrant seulement l\'identifiant court du commit et son message.'
      }
    ]
  },
  {
    id: 'branches',
    title: 'Branches et Fusion',
    description: 'Maîtrisez l\'art de travailler avec des branches pour développer plusieurs fonctionnalités en parallèle, et apprenez à fusionner vos modifications dans le code principal.',
    estimatedTime: 75,
    objectives: [
      "Comprendre le concept de branches et leur importance",
      "Créer, naviguer et supprimer des branches",
      "Maîtriser les différentes méthodes de fusion",
      "Résoudre les conflits de fusion"
    ],
    icon: GitBranch,
    lessons: [
      {
        id: 'branch-1',
        title: 'Comprendre les branches',
        type: 'theory',
        duration: 15,
        content: `Les branches sont l'une des fonctionnalités les plus puissantes de Git. Elles permettent de développer plusieurs fonctionnalités en parallèle, d'expérimenter sans affecter le code principal, et de collaborer efficacement en équipe.

**Qu'est-ce qu'une branche?**

Une branche dans Git est simplement un pointeur mobile vers un commit. Par défaut, tout dépôt Git a une branche principale appelée "main" (anciennement "master"). Chaque nouvelle branche créée démarre à partir du commit où vous vous trouvez et évolue indépendamment.

**Pourquoi utiliser des branches?**

1. **Développement parallèle**: Travaillez sur plusieurs fonctionnalités simultanément sans qu'elles interfèrent entre elles.

2. **Isolation**: Développez et testez de nouvelles fonctionnalités sans risquer de casser le code de production.

3. **Collaboration**: Permettez à plusieurs développeurs de travailler sur différentes parties du code sans conflits.

4. **Organisation**: Structurez votre travail en séparant les fonctionnalités, corrections de bugs et expérimentations.

**Types de branches courants:**

- **Feature branches**: Pour développer de nouvelles fonctionnalités
- **Bugfix branches**: Pour corriger des bugs
- **Hotfix branches**: Pour des corrections urgentes sur le code en production
- **Release branches**: Pour préparer les versions à déployer

En comprenant bien les branches, vous pouvez adopter des workflows de développement avancés et structurer efficacement votre travail de développement.`,
        component: 'BranchAnimator',
        objectives: ["Comprendre le concept de branches dans Git", "Identifier les différents types de branches et leurs usages", "Visualiser comment les branches évoluent dans un projet"]
      },
      {
        id: 'branch-2',
        title: 'Créer et naviguer entre les branches',
        type: 'practice',
        duration: 15,
        content: `La manipulation des branches est une compétence fondamentale dans Git. Voici les commandes essentielles pour créer et gérer vos branches efficacement.

**Afficher les branches existantes**
\`\`\`bash
git branch                 # Liste les branches locales
git branch -a              # Liste toutes les branches (locales et distantes)
\`\`\`

**Créer une nouvelle branche**
\`\`\`bash
git branch nom-branche     # Crée une branche sans y basculer
git checkout -b nom-branche # Crée une branche et y bascule immédiatement
\`\`\`

Avec Git récent, vous pouvez aussi utiliser:
\`\`\`bash
git switch -c nom-branche   # Équivalent moderne de git checkout -b
\`\`\`

**Naviguer entre les branches**
\`\`\`bash
git checkout nom-branche    # Basculer vers une branche existante
git switch nom-branche      # Alternative moderne
\`\`\`

**Renommer une branche**
\`\`\`bash
git branch -m ancien-nom nouveau-nom  # Renommer une branche
\`\`\`

**Supprimer une branche**
\`\`\`bash
git branch -d nom-branche   # Suppression sécurisée (échoue si non fusionnée)
git branch -D nom-branche   # Suppression forcée (même non fusionnée)
\`\`\`

**Conventions de nommage**
Pour les projets professionnels, on utilise souvent des préfixes:
- feature/nom-fonctionnalite
- bugfix/description-bug
- hotfix/probleme-urgent
- release/version-x.y.z

Ces conventions facilitent l'organisation et la compréhension de l'objectif de chaque branche.`,
        component: 'BranchCreator',
        objectives: ["Créer de nouvelles branches", "Naviguer entre les branches", "Supprimer les branches obsolètes", "Adopter de bonnes pratiques de nommage"]
      },
      {
        id: 'branch-3',
        title: 'Fusion de branches',
        type: 'theory',
        duration: 15,
        content: `La fusion (ou "merge") est l'opération qui permet de combiner les changements de différentes branches. C'est une étape essentielle du workflow Git, permettant d'intégrer les nouvelles fonctionnalités ou corrections dans la branche principale.

**Types de fusion**

1. **Fast-forward merge**
   Quand il n'y a pas de nouveaux commits dans la branche cible depuis la création de la branche source, Git effectue une fusion "fast-forward". Il déplace simplement le pointeur de la branche cible vers le dernier commit de la branche source.

2. **Merge commit (true merge)**
   Si la branche cible a évolué depuis la création de la branche source, Git crée un "commit de fusion" qui a deux parents: le dernier commit de chaque branche. Cela préserve l'historique de développement parallèle.

3. **Squash merge**
   Cette méthode condense tous les commits de la branche source en un seul avant de l'appliquer à la branche cible, créant un historique plus linéaire.

**Commandes de fusion**

Pour fusionner la branche "feature" dans la branche actuelle:
\`\`\`bash
git checkout main        # Basculer vers la branche cible (main)
git merge feature        # Fusionner la branche "feature" dans main
\`\`\`

Options de fusion:
\`\`\`bash
git merge --ff-only feature     # N'accepter que les fusions fast-forward
git merge --no-ff feature       # Toujours créer un commit de fusion
git merge --squash feature      # Squash tous les commits en un seul
\`\`\`

**Quand utiliser quel type de fusion?**

- **Fast-forward**: Idéal pour les petits changements ou corrections qui n'ont pas besoin de traçabilité spécifique.
  
- **Merge commit**: Préférable pour les fonctionnalités importantes afin de conserver l'historique complet du développement.
  
- **Squash**: Utile pour nettoyer l'historique, particulièrement pour les branches avec beaucoup de petits commits.

Le choix du type de fusion dépend de vos besoins en termes de lisibilité d'historique et de traçabilité des changements.`,
        component: 'MergeTypeComparison',
        objectives: ["Comprendre les différents types de fusion", "Savoir quand utiliser chaque type de fusion", "Maîtriser les commandes de fusion Git"]
      },
      {
        id: 'branch-4',
        title: 'Pratique de fusion',
        type: 'practice',
        duration: 15,
        content: `Mettre en pratique les fusions de branches est essentiel pour maîtriser Git. Dans cette leçon, vous allez simuler différents scénarios de fusion pour vous familiariser avec cette opération fondamentale.

**Scénario 1: Fusion Fast-Forward**
Vous avez créé une branche pour développer une fonctionnalité simple, et la branche principale n'a pas évolué entre-temps.

1. Créez une branche pour votre fonctionnalité
2. Effectuez quelques commits dans cette branche
3. Revenez à la branche principale et fusionnez votre branche de fonctionnalité
   
**Scénario 2: Fusion avec Commit de Merge**
Vous avez une branche de fonctionnalité, mais la branche principale a également évolué parallèlement.

1. Observez comment les deux branches ont divergé
2. Effectuez la fusion et examinez le commit de fusion créé
3. Visualisez l'historique pour comprendre comment les branches sont combinées

**Scénario 3: Stratégie Squash**
Vous avez développé une fonctionnalité avec plusieurs petits commits et souhaitez les consolider.

1. Observez les multiples commits dans votre branche de fonctionnalité
2. Utilisez l'option squash pour fusionner
3. Remarquez comment tous les changements sont combinés en un seul commit

En pratiquant ces différents scénarios, vous développerez une meilleure compréhension des mécanismes de fusion et serez mieux préparé à choisir la stratégie appropriée selon le contexte.`,
        component: 'MergeSimulator',
        objectives: ["Pratiquer différents types de fusion", "Comprendre les résultats de chaque stratégie", "Identifier la méthode de fusion appropriée selon le contexte"]
      },
      {
        id: 'branch-5',
        title: 'Résoudre les conflits de fusion',
        type: 'practice',
        duration: 15,
        content: `Les conflits de fusion surviennent lorsque Git ne peut pas automatiquement combiner les modifications provenant de différentes branches. Typiquement, cela se produit quand les mêmes lignes ont été modifiées de façons différentes.

**Pourquoi les conflits se produisent**

Les conflits apparaissent généralement dans ces situations:
- Deux personnes modifient la même ligne dans un fichier
- Une personne supprime un fichier tandis qu'une autre le modifie
- Une personne renomme un fichier tandis qu'une autre le modifie

**Comment Git signale un conflit**

Quand un conflit survient, Git marquera les fichiers concernés comme étant "en conflit" et ajoutera des marqueurs spéciaux dans ces fichiers:

\`\`\`
<<<<<<< HEAD
Contenu de la branche courante (où vous faites la fusion)
=======
Contenu de la branche que vous fusionnez
>>>>>>> nom-de-branche
\`\`\`

**Résolution des conflits**

1. **Identifier les fichiers en conflit**
   \`\`\`bash
   git status
   \`\`\`

2. **Ouvrir et éditer les fichiers en conflit**
   - Localiser les marqueurs (<<<<<<<, =======, >>>>>>>)
   - Décider quels changements conserver, ou comment les combiner
   - Supprimer les marqueurs de conflit

3. **Marquer les conflits comme résolus**
   \`\`\`bash
   git add fichier-resolu.txt
   \`\`\`

4. **Finaliser la fusion**
   \`\`\`bash
   git commit
   \`\`\`
   (Git préparera un message de commit par défaut pour la fusion)

**Conseils pour éviter les conflits**

- Communiquez avec votre équipe sur qui travaille sur quoi
- Faites des fusions ou rebases fréquents pour rester à jour
- Structurez votre code pour minimiser les chevauchements
- Utilisez des outils de fusion graphiques pour les conflits complexes`,
        component: 'ConflictResolver',
        objectives: ["Comprendre pourquoi les conflits se produisent", "Résoudre manuellement les conflits de fusion", "Apprendre les stratégies pour minimiser les conflits"]
      }
    ],
    quiz: [
      {
        question: 'Quelle commande crée une nouvelle branche et vous y fait basculer immédiatement?',
        options: [
          'git branch nouvelle-branche',
          'git checkout nouvelle-branche',
          'git checkout -b nouvelle-branche',
          'git switch nouvelle-branche'
        ],
        correctAnswer: 2,
        explanation: 'La commande "git checkout -b nouvelle-branche" combine deux actions: elle crée une nouvelle branche nommée "nouvelle-branche" et vous y fait basculer immédiatement. C\'est l\'équivalent d\'exécuter "git branch nouvelle-branche" suivi de "git checkout nouvelle-branche".'
      },
      {
        question: 'Qu\'est-ce qu\'une fusion "fast-forward" dans Git?',
        options: [
          'Une fusion qui échoue rapidement s\'il y a des conflits',
          'Une fusion où la branche cible n\'a pas de nouveaux commits depuis la création de la branche source',
          'Une fusion qui combine toutes les modifications en un seul commit',
          'Une fusion qui nécessite moins d\'espace disque'
        ],
        correctAnswer: 1,
        explanation: 'Une fusion "fast-forward" se produit lorsque la branche cible (par exemple, main) n\'a pas évolué depuis la création de la branche que vous voulez fusionner. Git déplace simplement le pointeur de la branche cible vers le dernier commit de la branche source, sans créer de commit de fusion.'
      },
      {
        question: 'Comment résoudre un conflit de fusion dans Git?',
        options: [
          'Exécuter git merge --resolve pour résoudre automatiquement tous les conflits',
          'Supprimer tous les fichiers en conflit et les recréer',
          'Éditer manuellement les fichiers pour résoudre les conflits, puis utiliser git add et git commit',
          'Annuler la fusion et refaire les changements sur une nouvelle branche'
        ],
        correctAnswer: 2,
        explanation: 'Pour résoudre un conflit de fusion, vous devez ouvrir les fichiers marqués comme étant en conflit, éditer manuellement le contenu en décidant quels changements conserver (ou comment les combiner), supprimer les marqueurs de conflit, puis marquer le fichier comme résolu avec git add avant de finaliser la fusion avec git commit.'
      },
      {
        question: 'Quelle commande supprime une branche locale de manière sécurisée?',
        options: [
          'git remove branche',
          'git delete branche',
          'git branch -d branche',
          'git branch --delete branche'
        ],
        correctAnswer: 2,
        explanation: 'La commande "git branch -d branche" supprime une branche locale de manière sécurisée. Elle échouera si la branche contient des commits qui n\'ont pas été fusionnés, évitant ainsi la perte accidentelle de travail. Pour une suppression forcée même si les changements ne sont pas fusionnés, utilisez git branch -D.'
      },
      {
        question: 'Que signifient les marqueurs <<<<<<< et >>>>>>> dans un fichier?',
        options: [
          'Ils indiquent des sections de code obsolètes à supprimer',
          'Ils marquent le début et la fin d\'un conflit de fusion',
          'Ils sont des commentaires spéciaux pour l\'IDE',
          'Ils indiquent des sections de code optimisées par Git'
        ],
        correctAnswer: 1,
        explanation: 'Les marqueurs <<<<<<< HEAD, ======= et >>>>>>> branche-name sont ajoutés par Git dans les fichiers lorsqu\'il détecte un conflit de fusion. Ils délimitent les versions conflictuelles du même code: la partie supérieure montre le contenu de la branche courante (HEAD), tandis que la partie inférieure montre le contenu de la branche que vous essayez de fusionner.'
      }
    ]
  },
  {
    id: 'remote',
    title: 'Dépôts Distants',
    description: 'Découvrez comment travailler avec des dépôts distants comme GitHub, synchroniser votre travail et collaborer efficacement avec d\'autres développeurs à travers le réseau.',
    estimatedTime: 50,
    objectives: [
      "Comprendre les concepts de dépôts distants",
      "Maîtriser les opérations push et pull",
      "Gérer les branches distantes",
      "Synchroniser efficacement les dépôts locaux et distants"
    ],
    icon: Cloud,
    lessons: [
      {
        id: 'remote-1',
        title: 'Comprendre les dépôts distants',
        type: 'theory',
        duration: 10,
        content: `Les dépôts distants sont des versions de votre projet hébergées sur Internet ou un réseau quelconque. Ils forment la base de la collaboration dans Git, permettant à plusieurs personnes de travailler sur le même projet.

**Types de dépôts distants**

1. **Origin**: Par convention, "origin" est le nom donné au dépôt distant principal depuis lequel vous avez cloné votre projet. C'est souvent votre dépôt sur GitHub, GitLab ou Bitbucket.

2. **Upstream**: Généralement utilisé quand vous avez forké un projet. "Upstream" fait référence au dépôt original à partir duquel vous avez créé votre fork.

3. **Forks**: Ce sont des copies personnelles d'un dépôt d'une autre personne. Ils vous permettent d'expérimenter librement sans affecter le projet original.

**Afficher les dépôts distants configurés**
\`\`\`bash
git remote -v  # Affiche les URLs des dépôts distants
\`\`\`

**Ajouter un dépôt distant**
\`\`\`bash
git remote add nom-distant url-du-depot
# Exemple: git remote add origin https://github.com/user/repo.git
\`\`\`

**Modifier l'URL d'un dépôt distant**
\`\`\`bash
git remote set-url nom-distant nouvelle-url
\`\`\`

**Supprimer un dépôt distant**
\`\`\`bash
git remote remove nom-distant
\`\`\`

Les dépôts distants sont essentiels pour:
- Sauvegarder votre travail
- Collaborer avec d'autres développeurs
- Contribuer à des projets open source
- Déployer du code via des systèmes CI/CD`,
        component: 'RemoteConnectionVisual',
        objectives: ["Comprendre le concept de dépôts distants", "Savoir configurer et gérer les connexions distantes", "Distinguer les différents types de dépôts (origin, upstream, fork)"]
      },
      {
        id: 'remote-2',
        title: 'Push et Pull: synchroniser avec le dépôt distant',
        type: 'practice',
        duration: 15,
        content: `La synchronisation entre votre dépôt local et le dépôt distant se fait principalement via deux opérations: push (pousser) et pull (tirer).

**Push: Envoyer des modifications locales vers le dépôt distant**

\`\`\`bash
git push <remote> <branche>
# Exemple: git push origin main
\`\`\`

Lors du premier push d'une branche, vous devez définir la branche amont:
\`\`\`bash
git push -u origin ma-branche
# ou
git push --set-upstream origin ma-branche
\`\`\`

Après cela, un simple \`git push\` suffira pour cette branche.

**Pull: Récupérer et intégrer des modifications distantes**

\`\`\`bash
git pull <remote> <branche>
# Exemple: git pull origin main
\`\`\`

La commande \`git pull\` est en fait une combinaison de deux opérations:
1. \\\`git fetch\\\`: Télécharge les modifications du dépôt distant
2. \\\`git merge\\\`: Fusionne ces modifications dans votre branche locale

Pour plus de contrôle, vous pouvez exécuter ces commandes séparément:
\\\`\\\`\\\`bash
git fetch origin
git merge origin/main
\\\`\\\`\\\`

Ou utiliser un rebase au lieu d'un merge:
\\\`\\\`\\\`bash
git pull --rebase origin main
\\\`\\\`\\\`

**Bonnes pratiques**

- Faites un \`pull\` avant de commencer à travailler et avant de faire un `push`
- Commitez localement souvent, mais poussez uniquement du code fonctionnel
- Utilisez des branches pour les fonctionnalités en cours de développement
- Vérifiez toujours ce que vous poussez avec `git status``,
        component: 'PushPullAnimator',
        objectives: ["Envoyer des modifications vers un dépôt distant", "Récupérer et intégrer des modifications distantes", "Comprendre la différence entre fetch, pull et push"]
      },
      {
        id: 'remote-3',
        title: 'Gestion des branches distantes',
        type: 'theory',
        duration: 15,
        content: \`Les branches distantes sont des références à l'état des branches dans le dépôt distant. Elles vous permettent de suivre les changements dans le dépôt distant sans modifier votre code local.

**Visualiser les branches distantes**

\`\`\`bash
git branch -r               # Affiche uniquement les branches distantes
git branch -a               # Affiche toutes les branches (locales et distantes)
\`\`\`

Les branches distantes sont préfixées par le nom du dépôt distant, comme \`origin/main`.

**Créer une branche locale à partir d'une branche distante**

\`\`\`bash
git checkout -b ma-branche origin/ma-branche
# Version moderne
git switch -c ma-branche origin/ma-branche
\`\`\`

**Publier une branche locale sur le dépôt distant**

\`\`\`bash
git push -u origin ma-branche
\`\`\`
L'option `-u` (ou `--set-upstream`) établit une relation de suivi entre la branche locale et distante.

**Supprimer une branche distante**

\`\`\`bash
git push origin --delete ma-branche
# ou
git push origin :ma-branche
\`\`\`

**Mettre à jour la liste des branches distantes**

\`\`\`bash
git fetch --prune
\`\`\`
Cette commande supprime les références aux branches distantes qui n'existent plus sur le dépôt distant.

**Relations de suivi**

Quand une branche locale suit une branche distante:
- \`git pull\` sans arguments sait quelle branche distante récupérer
- \`git push\` sans arguments sait où pousser les changements
- \`git status\` indique si votre branche est en avance, en retard ou les deux par rapport à la branche distante

Pour voir les relations de suivi configurées:
\`\`\`bash
git branch -vv
\`\`\``,
        component: 'SyncStatusIndicator',
        objectives: ["Visualiser et gérer les branches distantes", "Configurer des relations de suivi entre branches locales et distantes", "Supprimer des branches du dépôt distant"]
      },
      {
        id: 'remote-4',
        title: 'Bonnes pratiques de synchronisation',
        type: 'theory',
        duration: 10,
        content: `Une bonne synchronisation entre dépôts locaux et distants est essentielle pour une collaboration efficace. Voici les meilleures pratiques à adopter:

**Avant de commencer à travailler**

1. **Mettre à jour votre dépôt local**
   \`\`\`bash
   git pull origin main  # ou la branche sur laquelle vous travaillez
   \`\`\`
   Cela évite les conflits futurs en intégrant dès le départ les changements des autres.

2. **Créer une branche dédiée**
   \`\`\`bash
   git checkout -b feature/ma-fonctionnalite
   \`\`\`
   Travaillez toujours sur une branche spécifique, pas directement sur main.

**Pendant le développement**

3. **Commits fréquents, pushs raisonnés**
   - Commiter souvent localement
   - Pousser quand une unité logique est terminée
   - Ajouter un message de commit descriptif

4. **Rester à jour**
   \`\`\`bash
   git fetch origin          # Récupérer sans fusionner
   git merge origin/main     # Fusionner si nécessaire
   # ou
   git pull origin main      # Récupérer et fusionner
   \`\`\`

5. **Rebaser si nécessaire**
   Si la branche principale a beaucoup évolué:
   \`\`\`bash
   git pull --rebase origin main
   \`\`\`
   Cela réapplique vos commits sur la version la plus récente.

**Avant de pousser**

6. **Vérifier les changements**
   \`\`\`bash
   git status
   git diff
   \`\`\`

7. **Test local**
   Assurez-vous que votre code fonctionne avant de le partager.

8. **Push avec suivi la première fois**
   \`\`\`bash
   git push -u origin ma-branche
   \`\`\`

**Gestion avancée**

9. **Nettoyer régulièrement**
   \`\`\`bash
   git fetch --prune        # Nettoyer les références obsolètes
   git branch -d branches-fusionnées  # Supprimer les branches fusionnées
   \`\`\`

10. **Utiliser des tags pour les versions**
    \`\`\`bash
    git tag v1.0.0
    git push --tags
    \`\`\`

En suivant ces pratiques, vous minimiserez les conflits et maintiendrez un historique clair et propre de votre projet.`,
        objectives: ["Adopter un workflow efficace pour la synchronisation", "Éviter les conflits grâce à une bonne gestion des branches", "Maintenir un dépôt propre et à jour"]
      }
    ],
    quiz: [
      {
        question: 'Quelle commande permet d\'ajouter un dépôt distant nommé "origin" à votre projet?',
        options: [
          'git remote create origin https://github.com/user/repo.git',
          'git remote add origin https://github.com/user/repo.git',
          'git add remote origin https://github.com/user/repo.git',
          'git push origin https://github.com/user/repo.git'
        ],
        correctAnswer: 1,
        explanation: 'La commande "git remote add origin https://github.com/user/repo.git" permet d\'ajouter un dépôt distant nommé "origin" avec l\'URL spécifiée. Cela établit la connexion entre votre dépôt local et le dépôt distant sans transférer de données.'
      },
      {
        question: 'Quelle commande permet de voir toutes les branches (locales et distantes) dans votre dépôt?',
        options: [
          'git branch --all',
          'git branch -a',
          'git show-branch',
          'git ls-remote'
        ],
        correctAnswer: 1,
        explanation: 'La commande "git branch -a" (ou sa version longue "git branch --all") affiche toutes les branches, à la fois locales et distantes, disponibles dans votre dépôt. Les branches distantes sont généralement préfixées par "remotes/origin/".'
      },
      {
        question: 'Quelle est la différence entre "git fetch" et "git pull"?',
        options: [
          'Aucune différence, ce sont des alias de la même commande',
          'git fetch télécharge les changements sans les fusionner, git pull télécharge et fusionne',
          'git fetch met à jour la branche actuelle, git pull met à jour toutes les branches',
          'git fetch fonctionne uniquement avec GitHub, git pull fonctionne avec tous les services'
        ],
        correctAnswer: 1,
        explanation: 'Git fetch télécharge les changements du dépôt distant mais ne les fusionne pas dans votre branche de travail actuelle. Git pull fait deux choses: il exécute git fetch puis git merge pour fusionner les changements téléchargés dans votre branche courante. C\'est comme si vous faisiez fetch suivi de merge en une seule commande.'
      },
      {
        question: 'Comment publier une branche locale sur le dépôt distant et configurer le suivi en une seule commande?',
        options: [
          'git push origin ma-branche',
          'git push --track origin ma-branche',
          'git push -u origin ma-branche',
          'git publish origin ma-branche'
        ],
        correctAnswer: 2,
        explanation: 'La commande "git push -u origin ma-branche" (où -u est l\'abréviation de --set-upstream) pousse votre branche locale vers le dépôt distant et configure en même temps une relation de suivi. Après cela, vous pourrez simplement utiliser git push ou git pull sans préciser la branche ou le dépôt distant.'
      },
      {
        question: 'Quelle commande permet de supprimer une branche distante?',
        options: [
          'git branch -d origin/ma-branche',
          'git push origin -d ma-branche',
          'git remote remove ma-branche',
          'git delete origin/ma-branche'
        ],
        correctAnswer: 1,
        explanation: 'La commande "git push origin -d ma-branche" (ou git push origin --delete ma-branche) permet de supprimer une branche sur le dépôt distant. Notez qu\'il faut spécifier le nom de la branche sans le préfixe "origin/".'
      }
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration et Pull Requests',
    description: 'Apprenez les techniques avancées pour collaborer efficacement avec d\'autres développeurs, notamment à travers les pull requests et les revues de code sur GitHub.',
    estimatedTime: 90,
    objectives: [
      "Comprendre les modèles de collaboration avec Git",
      "Maîtriser le workflow des Pull Requests",
      "Effectuer et recevoir des revues de code",
      "Contribuer à des projets open source"
    ],
    icon: Users,
    lessons: [
      {
        id: 'collab-1',
        title: 'Fork vs Clone: comprendre les différences',
        type: 'theory',
        duration: 15,
        content: `Lorsqu'on collabore sur GitHub, il est crucial de comprendre la différence entre "fork" et "clone", car ces deux opérations ont des objectifs et des implications très différents.

**Clone: Une copie locale**

Un clone est simplement une copie locale d'un dépôt distant. Quand vous clonez un dépôt:
- Vous téléchargez l'intégralité du dépôt sur votre machine
- Vous obtenez automatiquement une connexion au dépôt distant (origin)
- Si vous avez les droits, vous pouvez push directement vers ce dépôt

\`\`\`bash
git clone https://github.com/utilisateur/projet.git
\`\`\`

**Fork: Votre propre copie du dépôt sur GitHub**

Un fork crée une copie personnelle du dépôt de quelqu'un d'autre sur votre compte GitHub. C'est une opération GitHub, pas une commande Git. Quand vous forkez un dépôt:
- Une copie complète du dépôt est créée sur votre compte GitHub
- Vous pouvez librement modifier cette copie sans affecter le dépôt original
- C'est généralement la première étape pour contribuer à un projet open source

**Workflow typique avec un fork:**

1. Forkez le dépôt original sur GitHub (via l'interface web)
2. Clonez VOTRE fork sur votre machine locale
3. Ajoutez le dépôt original comme "upstream"
   \`\`\`bash
   git remote add upstream https://github.com/original-owner/original-repo.git
   \`\`\`
4. Créez une branche pour vos modifications
5. Poussez vos changements vers VOTRE fork
6. Créez une Pull Request du fork vers le dépôt original

**Quand utiliser quoi?**

- **Clone**: Quand vous êtes membre du projet et avez des droits d'écriture
- **Fork**: Quand vous contribuez à un projet dont vous n'êtes pas collaborateur direct

La compréhension de cette distinction est fondamentale pour collaborer efficacement sur GitHub, particulièrement dans le monde de l'open source.`,
        component: 'ForkVsCloneDemo',
        objectives: ["Comprendre la différence entre fork et clone", "Savoir quand utiliser l'un ou l'autre", "Configurer correctement un dépôt forké"]
      },
      {
        id: 'collab-2',
        title: 'Travailler avec des Pull Requests',
        type: 'practice',
        duration: 15,
        content: `Les Pull Requests (PR) sont au cœur de la collaboration sur GitHub. Elles permettent de proposer des modifications, discuter des changements, et intégrer le code de façon contrôlée.

**Qu'est-ce qu'une Pull Request?**

Une Pull Request est une demande d'intégration de vos modifications dans une branche du projet. Elle offre:
- Une interface pour examiner les changements de code
- Un espace de discussion pour la revue de code
- Des vérifications automatisées (CI/CD)
- Un mécanisme formel d'approbation

**Créer une Pull Request**

1. Poussez votre branche vers GitHub:
   \`\`\`bash
   git push origin ma-branche-fonctionnalite
   \`\`\`

2. Sur GitHub:
   - Naviguez vers le dépôt
   - Cliquez sur "Pull requests" puis "New pull request"
   - Sélectionnez votre branche comme "compare" et la branche cible comme "base"
   - Remplissez le titre et la description
   - Ajoutez des reviewers si nécessaire
   - Créez la PR

**Bonnes pratiques pour les Pull Requests**

- **Titre clair**: Décrivez brièvement le but des changements
- **Description détaillée**: Expliquez le problème résolu, la solution et comment tester
- **Taille raisonnable**: Préférez plusieurs petites PR à une seule énorme
- **Tests inclus**: Ajoutez des tests qui vérifient vos modifications
- **Ciblage précis**: Une PR = une fonctionnalité ou correction
- **Anticipez les questions**: Expliquez les décisions techniques non évidentes

**Cycle de vie d'une Pull Request**

1. **Création**: Vous soumettez vos changements
2. **Revue**: Les reviewers examinent le code et font des commentaires
3. **Itération**: Vous apportez des modifications basées sur les retours
4. **Approbation**: Les reviewers approuvent les changements
5. **Fusion**: La PR est mergée dans la branche cible
6. **Nettoyage**: Suppression des branches qui ne sont plus nécessaires`,
        component: 'PullRequestCreator',
        objectives: ["Créer et gérer des Pull Requests", "Comprendre le workflow de révision", "Adopter les bonnes pratiques pour des PR efficaces"]
      },
      {
        id: 'collab-3',
        title: 'Revue de code efficace',
        type: 'practice',
        duration: 20,
        content: `La revue de code est une pratique essentielle pour maintenir la qualité du code et partager les connaissances au sein d'une équipe. GitHub facilite ce processus à travers son interface de Pull Requests.

**Pourquoi faire des revues de code?**

- Détecter les bugs et problèmes potentiels
- Assurer la cohérence du style et des standards de code
- Partager les connaissances et les bonnes pratiques
- Améliorer la qualité globale du projet
- Former les nouveaux membres de l'équipe

**Comment faire une bonne revue**

1. **Comprendre le contexte**
   - Lisez la description de la PR
   - Identifiez l'objectif des changements
   - Comprenez le problème résolu

2. **Examiner les changements**
   - Analysez la logique et la conception
   - Vérifiez la lisibilité et la maintenabilité
   - Cherchez les bugs potentiels, les problèmes de sécurité
   - Évaluez la couverture des tests

3. **Fournir un feedback constructif**
   - Soyez spécifique et clair
   - Expliquez le "pourquoi" derrière vos suggestions
   - Distinguez les problèmes critiques des préférences personnelles
   - Proposez des solutions concrètes
   - Utilisez un ton respectueux et collaboratif

4. **Finaliser la revue**
   - Approuver si tout est bon
   - Demander des changements si nécessaire
   - Laisser des commentaires sans blocage pour les suggestions mineures

**Comment recevoir une revue**

- Considérez les commentaires comme une opportunité d'apprentissage
- Ne prenez pas les critiques personnellement
- Répondez à tous les commentaires (même juste avec un pouce)
- Expliquez vos choix si nécessaire
- Faites les modifications demandées ou discutez des alternatives

Une bonne culture de revue de code est bénéfique pour toute l'équipe et contribue significativement à la qualité du logiciel produit.`,
        component: 'CodeReviewInterface',
        objectives: ["Effectuer des revues de code constructives", "Réagir correctement aux commentaires reçus", "Utiliser l'interface de GitHub pour les revues"]
      },
      {
        id: 'collab-4',
        title: 'Workflow de collaboration',
        type: 'simulation',
        duration: 20,
        content: `La collaboration efficace avec Git et GitHub repose sur des workflows bien définis. Comprendre ces patterns de travail en équipe est essentiel pour une intégration continue et un développement harmonieux.

**Modèle de Collaboration Centralisé**

Utilisé dans les petites équipes avec un dépôt central:
- Tous les développeurs clonent le même dépôt
- Ils travaillent sur des branches de fonctionnalités
- Les Pull Requests sont utilisées pour la revue de code
- Les changements sont directement intégrés dans la branche principale

**Modèle de Collaboration avec Fork**

Utilisé dans les projets open source ou les grandes équipes:
- Chaque contributeur crée un fork du dépôt principal
- Les développeurs travaillent sur leur propre fork
- Les Pull Requests vont du fork vers le dépôt principal
- Les mainteneurs du projet examinent et intègrent les contributions

**Rôles dans la collaboration**

1. **Contributeurs**: Développent des fonctionnalités, corrigent des bugs
2. **Reviewers**: Examinent le code et fournissent des commentaires
3. **Mainteneurs**: Gèrent le projet, approuvent et fusionnent les PRs
4. **Propriétaires**: Définissent les droits d'accès et les règles du projet

**Outils de Collaboration GitHub**

- **Issues**: Pour suivre les bugs, fonctionnalités et tâches
- **Projects**: Pour organiser le travail (style Kanban)
- **Discussions**: Pour les conversations générales hors du code
- **Actions**: Pour l'automatisation des tests et déploiements
- **Protections de branches**: Pour appliquer des règles (revues obligatoires, etc.)

**Communication efficace**

- Rédigez des messages de commit clairs et descriptifs
- Documentez votre code et vos décisions
- Participez activement aux discussions de PR
- Signalez les problèmes tôt via des issues
- Maintenez à jour la documentation du projet

La simulation suivante vous permettra d'expérimenter un workflow de collaboration typique avec différents rôles et interactions.`,
        component: 'CollaborationSimulator',
        objectives: ["Comprendre les différents modèles de collaboration", "Maîtriser le workflow des pull requests", "Identifier les rôles dans un projet collaboratif"]
      },
      {
        id: 'collab-5',
        title: 'Contribution aux projets open source',
        type: 'theory',
        duration: 20,
        content: `Contribuer à des projets open source est une excellente façon d'améliorer vos compétences, de redonner à la communauté et de vous faire remarquer par des recruteurs potentiels.

**Étapes pour contribuer à un projet open source**

1. **Trouver un projet qui vous intéresse**
   - Recherchez dans vos outils préférés
   - Explorez GitHub Explore, First Timers Only, Good First Issues
   - Cherchez des étiquettes comme "good first issue", "beginner friendly"

2. **Comprendre le projet**
   - Lisez le README, CONTRIBUTING.md et CODE_OF_CONDUCT.md
   - Parcourez les issues ouvertes et les PRs récentes
   - Installez et testez le projet localement
   - Comprenez les conventions de codage et le workflow

3. **Faire votre première contribution**
   - Forkez le dépôt
   - Clonez votre fork localement
   - Configurez le dépôt upstream
   \`\`\`bash
   git remote add upstream https://github.com/original-owner/repo.git
   \`\`\`
   - Créez une branche pour votre contribution
   \`\`\`bash
   git checkout -b fix/issue-description
   \`\`\`

4. **Développer et tester votre contribution**
   - Suivez les conventions du projet
   - Ajoutez des tests si nécessaire
   - Assurez-vous que tous les tests passent

5. **Soumettre votre contribution**
   - Poussez votre branche vers votre fork
   \`\`\`bash
   git push origin fix/issue-description
   \`\`\`
   - Créez une Pull Request
   - Suivez le template de PR s'il existe
   - Référencez les issues liées (#123)

6. **Interagir avec la communauté**
   - Répondez aux commentaires sur votre PR
   - Soyez patient et respectueux
   - Apportez les modifications demandées
   - Rebasez si nécessaire

**Astuces pour des contributions réussies**

- Commencez petit (corrections de docs, bugs simples)
- Communiquez clairement vos intentions
- N'hésitez pas à demander de l'aide
- Suivez le code de conduite du projet
- Persévérez même si votre PR n'est pas acceptée immédiatement

La contribution open source peut être très gratifiante. N'oubliez pas que chaque projet a sa propre culture et ses propres processus - respectez-les toujours.`,
        component: 'PRWorkflowSimulator',
        objectives: ["Comprendre le processus de contribution open source", "Maîtriser le workflow de fork et pull request", "Interagir efficacement avec la communauté d'un projet"]
      }
    ],
    quiz: [
      {
        question: 'Quelle est la principale différence entre fork et clone dans GitHub?',
        options: [
          'Fork télécharge le code sur votre machine, clone crée une copie sur GitHub',
          'Fork crée une copie du dépôt sur votre compte GitHub, clone télécharge un dépôt sur votre machine locale',
          'Fork est une opération temporaire, clone est permanente',
          'Fork fonctionne uniquement pour les dépôts publics, clone fonctionne pour tous les dépôts'
        ],
        correctAnswer: 1,
        explanation: 'Un fork crée une copie personnelle d\'un dépôt sur votre compte GitHub, vous permettant de le modifier librement sans affecter le projet original. Un clone, en revanche, télécharge simplement une copie du dépôt sur votre machine locale pour que vous puissiez travailler dessus. Le fork est une fonctionnalité de GitHub, tandis que le clone est une commande Git standard.'
      },
      {
        question: 'Dans un workflow typique de Pull Request, quelle est la bonne séquence d\'étapes?',
        options: [
          'Créer une branche → Commiter des changements → Pousser la branche → Créer la PR → Revue de code → Merger',
          'Créer la PR → Créer une branche → Commiter des changements → Pousser la branche → Revue de code → Merger',
          'Commiter des changements → Pousser la branche → Créer une branche → Créer la PR → Revue de code → Merger',
          'Créer une branche → Créer la PR → Commiter des changements → Pousser la branche → Revue de code → Merger'
        ],
        correctAnswer: 0,
        explanation: 'Le workflow typique commence par la création d\'une branche pour isoler votre travail, puis vous effectuez et commitez vos changements sur cette branche. Ensuite, vous poussez la branche vers le dépôt distant, créez une Pull Request pour proposer vos changements, attendez la revue de code et les approbations, et enfin fusionnez (mergez) la Pull Request dans la branche principale.'
      },
      {
        question: 'Quelle est la meilleure pratique pour la taille d\'une Pull Request?',
        options: [
          'Les PR doivent être aussi grandes que possible pour minimiser le nombre de PR à examiner',
          'Les PR doivent contenir tous les changements liés à une fonctionnalité, quelle que soit leur taille',
          'Les PR doivent être petites et focalisées sur un changement spécifique pour faciliter la revue',
          'La taille des PR n\'a pas d\'importance tant que le code fonctionne'
        ],
        correctAnswer: 2,
        explanation: 'Les Pull Requests devraient être relativement petites et focalisées sur un changement logique spécifique. Des PR plus petites sont plus faciles à comprendre et à réviser, ce qui conduit à des revues de code plus efficaces et à une détection plus rapide des problèmes. Il vaut mieux diviser une grande fonctionnalité en plusieurs PR plus petites qu\'en soumettre une seule très volumineuse.'
      },
      {
        question: 'Comment configurer un dépôt upstream après avoir forké un projet?',
        options: [
          'git upstream add https://github.com/original-owner/repo.git',
          'git remote add upstream https://github.com/original-owner/repo.git',
          'git clone upstream https://github.com/original-owner/repo.git',
          'git fork upstream https://github.com/original-owner/repo.git'
        ],
        correctAnswer: 1,
        explanation: 'Après avoir forké et cloné un dépôt, vous pouvez ajouter le dépôt original comme "upstream" avec la commande "git remote add upstream https://github.com/original-owner/repo.git". Cela vous permettra de récupérer les changements du projet original avec "git fetch upstream" et de les fusionner dans votre branche locale.'
      },
      {
        question: 'Quelle est la meilleure approche pour recevoir des commentaires sur votre Pull Request?',
        options: [
          'Défendre vigoureusement votre code et rejeter les suggestions qui ne correspondent pas à votre vision',
          'Accepter passivement toutes les suggestions sans poser de questions',
          'Considérer objectivement les commentaires, discuter poliment des désaccords et apporter les modifications pertinentes',
          'Ignorer les commentaires et merger la PR dès que possible'
        ],
        correctAnswer: 2,
        explanation: 'La meilleure approche est de considérer objectivement les commentaires comme une opportunité d\'améliorer votre code. Il est important de discuter poliment des points de désaccord (avec des arguments techniques), d\'être ouvert aux suggestions, et d\'apporter les modifications pertinentes. Une bonne revue de code est un dialogue constructif, pas un affrontement ni une acceptation passive.'
      }
    ]
  },
  {
    id: 'workflows',
    title: 'Workflows Git',
    description: 'Découvrez les différents workflows Git utilisés par les équipes professionnelles et apprenez à choisir celui qui convient le mieux à votre projet et à votre équipe.',
    estimatedTime: 80,
    objectives: [
      "Comprendre les différents workflows Git populaires",
      "Identifier le workflow le plus adapté à votre contexte",
      "Mettre en pratique ces workflows",
      "Configurer des protections de branches"
    ],
    icon: Activity,
    lessons: [
      {
        id: 'workflow-1',
        title: 'Introduction aux workflows Git',
        type: 'theory',
        duration: 15,
        content: `Un workflow Git est une recommandation sur la façon d'utiliser Git pour accomplir un travail de manière cohérente et productive. Adopter un workflow adapté est crucial pour la collaboration efficace dans une équipe.

**Pourquoi adopter un workflow?**

- Standardise la façon dont l'équipe collabore
- Réduit les conflits et les problèmes de fusion
- Facilite l'intégration continue et le déploiement
- Améliore la qualité du code via les processus de revue
- Clarifie le processus pour les nouveaux membres

**Les workflows Git les plus populaires**

1. **GitHub Flow**
   - Simple et adapté au déploiement continu
   - Une seule branche principale (main)
   - Toute nouvelle fonctionnalité dans une branche dédiée
   - Pull Requests pour les revues et les fusions

2. **Git Flow**
   - Plus structuré, adapté aux releases planifiées
   - Plusieurs branches permanentes (main, develop)
   - Branches spécifiques pour fonctionnalités, releases, hotfixes
   - Processus formalisés pour les fusions

3. **GitLab Flow**
   - Compromis entre simplicité et structure
   - Branches d'environnement (main → pre-prod → prod)
   - Approche orientée problèmes (issues)

4. **Trunk-Based Development**
   - Tous les développeurs travaillent sur une seule branche (trunk)
   - Intégrations très fréquentes (plusieurs fois par jour)
   - Utilise feature flags pour le code incomplet

**Éléments à considérer pour choisir un workflow**

- Taille et distribution de l'équipe
- Fréquence de déploiement souhaitée
- Nature du produit (web, mobile, embarqué...)
- Besoin de supporter plusieurs versions
- Maturité de l'équipe en termes de processus

Le workflow idéal varie selon le contexte. Nous allons explorer plus en détail ces workflows pour vous aider à choisir celui qui convient le mieux à votre situation.`,
        component: 'WorkflowComparisonTable',
        objectives: ["Comprendre les différents workflows Git existants", "Identifier les cas d'usage de chaque workflow", "Évaluer les avantages et inconvénients de chaque approche"]
      },
      {
        id: 'workflow-2',
        title: 'GitHub Flow: simplicité et déploiement continu',
        type: 'simulation',
        duration: 15,
        content: `Le GitHub Flow est un workflow léger, simple à comprendre et particulièrement adapté aux équipes qui pratiquent l'intégration continue et le déploiement continu (CI/CD).

**Principes du GitHub Flow**

1. **Une seule branche principale**: Généralement appelée "main", elle doit toujours être déployable

2. **Branches de fonctionnalités**: Créez une branche pour chaque nouvelle fonctionnalité ou correction
   \`\`\`bash
   git checkout -b feature/nouvelle-fonctionnalite
   \`\`\`

3. **Commits réguliers**: Commitez fréquemment dans votre branche de fonctionnalité
   \`\`\`bash
   git add .
   git commit -m "Description des changements"
   \`\`\`

4. **Pull Requests**: Ouvrez une PR quand vous êtes prêt à intégrer votre fonctionnalité
   \`\`\`bash
   git push -u origin feature/nouvelle-fonctionnalite
   # Puis créez la PR sur GitHub
   \`\`\`

5. **Discussion et revue**: Les membres de l'équipe examinent le code, suggèrent des améliorations

6. **Déploiement et tests**: Déployez la branche dans un environnement de test

7. **Fusion**: Une fois approuvée et testée, la branche est fusionnée dans main
   \`\`\`bash
   git checkout main
   git merge feature/nouvelle-fonctionnalite
   git push origin main
   \`\`\`

8. **Déploiement en production**: Immédiatement après la fusion dans main

**Avantages du GitHub Flow**

- **Simplicité**: Facile à comprendre et à appliquer
- **Rapidité**: Adapté aux cycles de développement courts
- **Visibilité**: Les Pull Requests rendent le processus transparent
- **Déploiement continu**: Idéal pour les applications web modernes

**Inconvénients**

- **Gestion des versions**: Pas optimal pour maintenir plusieurs versions
- **Projets complexes**: Peut manquer de structure pour de grands projets
- **Documentation**: Moins de formalisme dans la gestion des releases

**Quand l'utiliser?**

- Petites équipes ou startups
- Applications web avec déploiement continu
- Projets où la rapidité est primordiale
- Équipes débutant avec Git

Le GitHub Flow est excellent pour commencer avec Git en équipe, car il offre un bon équilibre entre structure et simplicité.`,
        component: 'WorkflowSimulator',
        workflowType: 'github-flow',
        objectives: ["Maîtriser le workflow GitHub Flow", "Comprendre ses avantages pour le déploiement continu", "Mettre en pratique le flux de travail avec branches et PR"]
      },
      {
        id: 'workflow-3',
        title: 'Git Flow: structure pour les releases planifiées',
        type: 'simulation',
        duration: 15,
        content: `Git Flow est un modèle de branchement robuste conçu par Vincent Driessen. Il est particulièrement adapté aux projets avec des cycles de release planifiés et au besoin de maintenir plusieurs versions en parallèle.

**Structure des branches dans Git Flow**

1. **Branches principales (permanentes)**
   - **main** (ou master): Code en production, stable
   - **develop**: Branche d'intégration pour la prochaine release

2. **Branches de support (temporaires)**
   - **feature/xxx**: Nouvelles fonctionnalités (issues de develop)
   - **release/x.y.z**: Préparation des releases (issues de develop, fusionnées dans main et develop)
   - **hotfix/xxx**: Corrections urgentes en production (issues de main, fusionnées dans main et develop)
   - **bugfix/xxx**: Corrections de bugs pour la prochaine release

**Le workflow Git Flow étape par étape**

1. **Développement de fonctionnalité**
   \`\`\`bash
   git checkout develop
   git checkout -b feature/nouvelle-fonctionnalite
   # Développement...
   git add .
   git commit -m "Add feature X"
   git push origin feature/nouvelle-fonctionnalite
   # Après revue (PR), fusion dans develop
   \`\`\`

2. **Préparation d'une release**
   \`\`\`bash
   git checkout develop
   git checkout -b release/1.0.0
   # Corrections mineures, préparation...
   git add .
   git commit -m "Bump version to 1.0.0"
   # Après tests, fusion dans main ET develop
   \`\`\`

3. **Correction urgente en production**
   \`\`\`bash
   git checkout main
   git checkout -b hotfix/critical-bug
   # Correction...
   git add .
   git commit -m "Fix critical bug"
   # Fusion dans main ET develop
   \`\`\`

**Outils pour Git Flow**

Il existe une extension Git qui simplifie l'utilisation de Git Flow:
\`\`\`bash
# Installation
git flow init  # Configuration initiale

# Utilisation
git flow feature start nouvelle-fonctionnalite
git flow feature finish nouvelle-fonctionnalite

git flow release start 1.0.0
git flow release finish 1.0.0

git flow hotfix start bug-critique
git flow hotfix finish bug-critique
\`\`\`

**Avantages de Git Flow**

- Structure claire et bien définie
- Excellent pour les produits avec des versions planifiées
- Facilite le support de plusieurs versions
- Processus formalisés

**Inconvénients**

- Plus complexe et verbeux
- Peut ralentir le déploiement continu
- Courbe d'apprentissage plus raide

Git Flow est idéal pour les équipes plus grandes, les projets nécessitant plusieurs versions en parallèle, ou les logiciels avec des cycles de release formels.`,
        component: 'WorkflowSimulator',
        workflowType: 'git-flow',
        objectives: ["Comprendre la structure de branches de Git Flow", "Maîtriser le cycle de développement de fonctionnalités et de releases", "Savoir quand appliquer ce workflow"]
      },
      {
        id: 'workflow-4',
        title: 'Créer votre propre workflow',
        type: 'practice',
        duration: 20,
        content: `Il n'existe pas de workflow Git universel qui convient parfaitement à tous les projets. Souvent, la meilleure approche est d'adapter les modèles existants à vos besoins spécifiques.

**Principes pour créer un workflow efficace**

1. **Adaptez-le à votre équipe**
   - Tenez compte de la taille et de l'expérience de l'équipe
   - Considérez la distribution géographique et les fuseaux horaires
   - Évaluez la fréquence de communication préférée

2. **Alignez-le sur votre processus de déploiement**
   - Déploiement continu vs. releases planifiées
   - Environnements multiples (dev, staging, production)
   - Exigences de test et de validation

3. **Simplifiez autant que possible**
   - N'ajoutez des complexités que lorsqu'elles sont nécessaires
   - Documentez clairement le workflow pour tous les membres
   - Automatisez les aspects répétitifs (CI/CD, tests)

4. **Évaluez régulièrement et itérez**
   - Recueillez les retours de l'équipe
   - Identifiez les frictions et les inefficacités
   - N'hésitez pas à modifier le workflow au fil du temps

**Éléments à considérer**

- **Structure de branches**: Combien de branches permanentes? Naming conventions?
- **Protection des branches**: Quelles règles pour les fusions?
- **Processus de revue**: Obligatoire? Combien d'approbations?
- **Intégration & Tests**: À quel moment et comment?
- **Gestion des versions**: Stratégie de versioning sémantique?
- **Documentation**: Comment documenter les changements?

**Exemples de workflows hybrides**

- **GitHub Flow avec releases**: GitHub Flow standard + branches de release
- **Trunk-based avec feature flags**: Une seule branche principale, mais fonctionnalités cachées derrière des flags
- **GitLab Flow simplifié**: Une branche principale avec des branches d'environnement

Dans l'exercice suivant, vous allez concevoir un workflow personnalisé pour un scénario donné, en prenant en compte les besoins spécifiques du projet et de l'équipe.`,
        component: 'FlowDiagramBuilder',
        objectives: ["Savoir adapter les workflows existants à vos besoins", "Identifier les facteurs clés dans la conception d'un workflow", "Documenter clairement un workflow personnalisé"]
      },
      {
        id: 'workflow-5',
        title: 'Protections de branches et règles d\'équipe',
        type: 'theory',
        duration: 15,
        content: `Pour garantir la qualité du code et maintenir l'intégrité de votre dépôt, il est essentiel de mettre en place des protections de branches et d'établir des règles claires pour votre équipe.

**Protections de branches sur GitHub**

Les protections de branches permettent de:
- Éviter les push directs sur des branches importantes
- Exiger des revues de code avant la fusion
- Exiger des tests réussis avant la fusion
- Empêcher les suppressions accidentelles de branches
- Appliquer des règles de commit signés

**Configuration des protections**

1. Sur GitHub, allez dans Settings > Branches
2. Cliquez sur "Add rule" ou modifiez une règle existante
3. Configurez les options selon vos besoins:

   - **Require pull request before merging**: Oblige à créer une PR
   - **Require approvals**: Nombre minimum d'approbations requises
   - **Dismiss stale reviews**: Invalide les revues après nouveaux commits
   - **Require status checks to pass**: Tests CI, linting, etc.
   - **Require branches to be up to date**: Évite les conflits
   - **Include administrators**: Applique les règles même aux admins

**Règles d'équipe efficaces**

Au-delà des protections techniques, établissez des conventions claires:

1. **Nommage des branches**
   \`\`\`
   feature/<ticket-id>-description-courte
   bugfix/<ticket-id>-description-courte
   hotfix/description-urgence
   \`\`\`

2. **Conventions de commit**
   - Format: `<type>(<scope>): <description>`
   - Types: feat, fix, docs, style, refactor, test, chore
   - Exemple: `feat(auth): add OAuth2 login`
   - Considérez l'utilisation de Conventional Commits

3. **Processus de revue de code**
   - Qui doit réviser quoi?
   - Délai maximum de réponse
   - Critères d'approbation
   - Procédure pour les désaccords

4. **Gestion des tags et versions**
   - Quand et comment tagger?
   - Format de versioning sémantique (MAJOR.MINOR.PATCH)
   - Responsable des releases

Ces règles doivent être documentées, idéalement dans un fichier CONTRIBUTING.md à la racine du projet, et régulièrement rappelées à l'équipe.`,
        objectives: ["Configurer des protections de branches", "Établir des conventions de nommage et de commit", "Documenter les processus pour l'équipe"]
      }
    ],
    quiz: [
      {
        question: 'Quel workflow Git est le plus adapté pour une petite équipe qui pratique le déploiement continu?',
        options: [
          'Git Flow',
          'GitHub Flow',
          'GitLab Flow',
          'Trunk-Based Development'
        ],
        correctAnswer: 1,
        explanation: 'Le GitHub Flow est particulièrement bien adapté aux petites équipes pratiquant le déploiement continu grâce à sa simplicité et sa légèreté. Il utilise une seule branche principale (main) et des branches de fonctionnalité temporaires avec des Pull Requests, ce qui facilite l\'intégration et le déploiement continus sans la complexité supplémentaire d\'autres workflows.'
      },
      {
        question: 'Dans le Git Flow, quelle branche sert de base pour créer une branche de hotfix?',
        options: [
          'develop',
          'release',
          'main (ou master)',
          'feature'
        ],
        correctAnswer: 2,
        explanation: 'Dans le Git Flow, les hotfixes sont créés à partir de la branche main (ou master) car ils sont destinés à corriger rapidement des bugs critiques en production. Une fois le hotfix terminé, il est fusionné à la fois dans main et dans develop pour s\'assurer que la correction est présente dans toutes les futures releases.'
      },
      {
        question: 'Quelle fonctionnalité GitHub permet d\'empêcher les push directs sur la branche principale?',
        options: [
          'Branch locks',
          'Protected branches',
          'Security rules',
          'Push limitations'
        ],
        correctAnswer: 1,
        explanation: 'Les "Protected branches" (branches protégées) sont une fonctionnalité de GitHub qui permet de définir des règles pour certaines branches, comme main. Ces règles peuvent inclure l\'interdiction des push directs, l\'obligation de passer par des Pull Requests, l\'exigence de revues de code, et l\'obligation de passer les tests CI avant la fusion.'
      },
      {
        question: 'Quelle est la principale caractéristique du Trunk-Based Development?',
        options: [
          'Utilisation de nombreuses branches à long terme',
          'Développement principalement sur une seule branche (trunk)',
          'Branches distinctes pour chaque environnement',
          'Fusion uniquement après une release complète'
        ],
        correctAnswer: 1,
        explanation: 'Le Trunk-Based Development se caractérise par le développement principalement sur une seule branche (trunk, souvent appelée main ou master). Les développeurs intègrent fréquemment leurs changements dans cette branche principale, parfois plusieurs fois par jour, en utilisant des branches de fonctionnalités de très courte durée ou des feature flags pour masquer le code incomplet.'
      },
      {
        question: 'Quelle pratique est généralement recommandée dans tous les workflows Git?',
        options: [
          'Toujours travailler directement sur la branche principale',
          'Éviter les Pull Requests pour accélérer le développement',
          'Faire des commits fréquents et atomiques avec des messages descriptifs',
          'Fusionner sans revue de code pour plus d\'efficacité'
        ],
        correctAnswer: 2,
        explanation: 'Faire des commits fréquents et atomiques avec des messages descriptifs est une bonne pratique recommandée dans tous les workflows Git. Cela améliore la lisibilité de l\'historique, facilite le débogage, permet des revert ciblés, et aide à comprendre l\'évolution du code. Des messages de commit clairs documentent également le "pourquoi" derrière les changements, ce qui est précieux pour tous les membres de l\'équipe.'
      }
    ]
  }
];