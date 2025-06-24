import { Home, Lock, LayoutDashboard, BookOpen, GitBranch, Cloud, Users, Settings, Play, PenTool, CheckCircle, MessageSquare, TrendingUp, Award, Share, Download, ChevronRight, GitCommit, Factory as Repository } from 'lucide-react';

export const menuItems = {
  entry: [
    {
      id: 'accueil',
      title: 'Page d\'Accueil',
      subtitle: 'Vue d\'ensemble principale avec présentation du contenu',
      icon: 'Home',
      completed: true
    },
    {
      id: 'auth',
      title: 'Authentification',
      subtitle: 'Connexion système et gestion compte programmeur',
      icon: 'Lock'
    },
    {
      id: 'dashboard',
      title: 'Tableau de Bord',
      subtitle: 'Vue d\'ensemble de la progression et éléments clés du système',
      icon: 'LayoutDashboard'
    }
  ],
  learning: [
    {
      id: 'intro',
      title: 'Chapitre 1: Introduction',
      subtitle: 'Git vs GitHub, concepts de base',
      icon: 'BookOpen'
    },
    {
      id: 'repositories',
      title: 'Chapitre 2: Dépôts',
      subtitle: 'Création, commits, historique',
      icon: 'Repository'
    },
    {
      id: 'branches',
      title: 'Chapitre 3: Branches',
      subtitle: 'Création, fusion, workflows',
      icon: 'GitBranch'
    },
    {
      id: 'remote',
      title: 'Chapitre 4: Dépôts Distants',
      subtitle: 'Push, pull, synchronisation',
      icon: 'Cloud'
    },
    {
      id: 'collaboration',
      title: 'Chapitre 5: Collaboration',
      subtitle: 'Pull Requests, revue de code',
      icon: 'Users'
    }
  ]
};

export const chapters = [
  {
    id: 'intro',
    title: 'Introduction à Git et GitHub',
    description: 'Découvrez les concepts fondamentaux du contrôle de version et la différence entre Git et GitHub.',
    objectives: [
      "Comprendre la différence entre Git et GitHub",
      "Apprendre les concepts de base du contrôle de version",
      "Configurer votre premier dépôt Git",
      "Maîtriser les commandes Git essentielles"
    ],
    estimatedTime: 45,
    lessons: [
      {
        id: 'git-vs-github',
        title: 'Git vs GitHub : Quelle est la différence ?',
        content: `Git et GitHub sont deux outils distincts mais complémentaires dans l'écosystème du développement logiciel.

Git est un système de contrôle de version distribué créé par Linus Torvalds en 2005. Il permet de suivre les modifications de code, de revenir à des versions antérieures, et de collaborer efficacement avec d'autres développeurs. Git fonctionne localement sur votre machine et ne nécessite pas de connexion internet pour la plupart des opérations.

GitHub, en revanche, est une plateforme web qui héberge des dépôts Git dans le cloud. Elle ajoute une interface graphique et des fonctionnalités supplémentaires comme les Pull Requests, les Issues, et les Actions pour faciliter la collaboration et l'intégration continue.

En résumé, Git est l'outil de base pour le versioning, tandis que GitHub est un service qui étend les capacités de Git avec des fonctionnalités de collaboration en ligne.`,
        duration: 10,
        image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'version-control-basics',
        title: 'Les bases du contrôle de version',
        content: `Le contrôle de version est un système qui enregistre les modifications apportées à un fichier ou un ensemble de fichiers au fil du temps, de sorte que vous puissiez rappeler des versions spécifiques ultérieurement.

Avantages du contrôle de version :
- Historique complet des modifications
- Possibilité de revenir à des versions antérieures
- Collaboration facilitée entre développeurs
- Traçabilité des changements (qui a fait quoi et quand)
- Branches parallèles pour le développement de fonctionnalités

Git utilise un modèle de "snapshot" plutôt qu'un système basé sur les différences. Chaque fois que vous validez ou enregistrez l'état de votre projet, Git prend une "photo" de tous vos fichiers à ce moment-là et stocke une référence à cet instantané.`,
        duration: 15,
        image: "https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'git-installation',
        title: 'Installation et configuration de Git',
        content: `Avant de commencer à utiliser Git, vous devez l'installer sur votre ordinateur. Le processus d'installation varie selon votre système d'exploitation.

Pour Windows :
- Téléchargez l'installateur depuis git-scm.com
- Exécutez l'installateur et suivez les instructions

Pour macOS :
- Installez via Homebrew : \`brew install git\`
- Ou téléchargez l'installateur depuis git-scm.com

Pour Linux (Ubuntu/Debian) :
- \`sudo apt-get update\`
- \`sudo apt-get install git\`

Une fois Git installé, vous devez configurer votre identité :
\`\`\`
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@exemple.com"
\`\`\`

Ces informations seront associées à chaque commit que vous ferez.`,
        duration: 10,
        codeExample: `# Vérifier la version de Git installée
git --version

# Configurer votre identité
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@exemple.com"

# Vérifier votre configuration
git config --list`,
        image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'first-repository',
        title: 'Créer votre premier dépôt Git',
        content: `Un dépôt (ou repo) Git est un espace de stockage virtuel pour votre projet. Il contient tous les fichiers de votre projet ainsi que l'historique complet des modifications.

Pour créer un nouveau dépôt Git, suivez ces étapes :

1. Créez un nouveau dossier pour votre projet
2. Ouvrez un terminal et naviguez vers ce dossier
3. Exécutez la commande \`git init\`

Cette commande crée un sous-dossier caché .git qui contient toute la base de données et l'historique de votre dépôt.

Vous pouvez également cloner un dépôt existant avec la commande :
\`git clone <url>\`

Par exemple :
\`git clone https://github.com/exemple/depot.git\`

Cela téléchargera une copie complète du dépôt distant sur votre machine locale.`,
        duration: 10,
        codeExample: `# Créer un nouveau dépôt
mkdir mon-projet
cd mon-projet
git init

# Vérifier l'état du dépôt
git status

# Cloner un dépôt existant
git clone https://github.com/exemple/depot.git`,
        image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ],
    quiz: [
      {
        question: "Quelle commande Git permet d'initialiser un nouveau dépôt ?",
        options: ["git start", "git init", "git create", "git new"],
        correctAnswer: 1,
        explanation: "La commande 'git init' initialise un nouveau dépôt Git dans le répertoire courant en créant un sous-répertoire .git qui contient tous les fichiers nécessaires."
      },
      {
        question: "Quelle est la principale différence entre Git et GitHub ?",
        options: [
          "Git est payant, GitHub est gratuit",
          "Git est un système de contrôle de version, GitHub est une plateforme d'hébergement",
          "Git est pour Windows, GitHub pour Mac",
          "Git est pour le code privé, GitHub pour l'open source"
        ],
        correctAnswer: 1,
        explanation: "Git est un système de contrôle de version distribué qui fonctionne localement, tandis que GitHub est une plateforme web qui héberge des dépôts Git et ajoute des fonctionnalités de collaboration."
      },
      {
        question: "Comment configurer votre nom d'utilisateur dans Git ?",
        options: [
          "git user.name 'Votre Nom'",
          "git set user.name 'Votre Nom'",
          "git config --global user.name 'Votre Nom'",
          "git username 'Votre Nom'"
        ],
        correctAnswer: 2,
        explanation: "La commande 'git config --global user.name \"Votre Nom\"' permet de configurer votre nom d'utilisateur qui sera associé à vos commits."
      },
      {
        question: "Quel est l'avantage principal d'un système de contrôle de version ?",
        options: [
          "Il permet de compresser les fichiers pour économiser de l'espace",
          "Il permet de suivre l'historique des modifications et de revenir à des versions antérieures",
          "Il accélère la vitesse d'exécution du code",
          "Il traduit automatiquement le code dans différents langages de programmation"
        ],
        correctAnswer: 1,
        explanation: "Le principal avantage d'un système de contrôle de version est de pouvoir suivre l'historique complet des modifications et de revenir facilement à n'importe quelle version antérieure si nécessaire."
      }
    ]
  },
  {
    id: 'repositories',
    title: 'Dépôts et Commits',
    description: 'Apprenez à créer et gérer des dépôts Git, ainsi qu\'à effectuer vos premiers commits.',
    objectives: [
      "Créer un nouveau dépôt Git",
      "Comprendre la zone de staging",
      "Effectuer des commits significatifs",
      "Naviguer dans l'historique des commits"
    ],
    estimatedTime: 60,
    lessons: [
      {
        id: 'repo-structure',
        title: 'Structure d\'un dépôt Git',
        content: `Un dépôt Git est composé de trois zones principales :

1. Le répertoire de travail (Working Directory) : C'est là où vous modifiez vos fichiers.

2. La zone de staging (Staging Area) : C'est une zone intermédiaire où vous placez les fichiers que vous souhaitez inclure dans votre prochain commit.

3. Le dépôt Git (Repository) : C'est là où Git stocke l'historique complet de votre projet sous forme de commits.

Le flux de travail typique consiste à modifier des fichiers dans votre répertoire de travail, à ajouter ces modifications à la zone de staging avec \`git add\`, puis à créer un commit avec \`git commit\`.

Le dossier .git contient toute la base de données et les métadonnées de votre dépôt. Ne le modifiez jamais manuellement !`,
        duration: 15,
        image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'staging-area',
        title: 'La zone de staging',
        content: `La zone de staging (ou index) est l'une des caractéristiques les plus puissantes de Git. Elle vous permet de sélectionner précisément quelles modifications seront incluses dans votre prochain commit.

Pour ajouter des fichiers à la zone de staging, utilisez la commande \`git add\` :

- \`git add fichier.txt\` : Ajoute un fichier spécifique
- \`git add dossier/\` : Ajoute tous les fichiers d'un dossier
- \`git add .\` : Ajoute tous les fichiers modifiés

Vous pouvez vérifier l'état de votre dépôt avec \`git status\`, qui vous montrera :
- Les fichiers modifiés mais non stagés
- Les fichiers stagés prêts à être commités
- Les fichiers non suivis (untracked)

Pour retirer un fichier de la zone de staging sans perdre vos modifications, utilisez \`git restore --staged <fichier>\`.`,
        duration: 15,
        codeExample: `# Vérifier l'état du dépôt
git status

# Ajouter un fichier à la zone de staging
git add README.md

# Ajouter tous les fichiers modifiés
git add .

# Retirer un fichier de la zone de staging
git restore --staged README.md`,
        image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'making-commits',
        title: 'Effectuer des commits',
        content: `Un commit est un instantané de votre projet à un moment donné. C'est comme prendre une photo de l'état actuel de votre projet que vous pourrez consulter ou restaurer plus tard.

Pour créer un commit, utilisez la commande \`git commit\` :
\`git commit -m "Message de commit"\`

Un bon message de commit doit :
- Être concis mais descriptif
- Commencer par un verbe à l'impératif (Add, Fix, Update...)
- Expliquer le POURQUOI plutôt que le COMMENT
- Être limité à environ 50 caractères pour la première ligne

Pour les commits plus complexes, vous pouvez ajouter un corps de message plus détaillé :
\`\`\`
git commit -m "Titre court du commit" -m "Description plus détaillée expliquant les raisons du changement, les impacts, etc."
\`\`\`

Chaque commit a un identifiant unique (hash) que vous pouvez utiliser pour y faire référence plus tard.`,
        duration: 15,
        codeExample: `# Créer un commit avec un message simple
git commit -m "Ajouter la page d'accueil"

# Créer un commit avec un message détaillé
git commit -m "Corriger le bug d'authentification" -m "Résout le problème où les utilisateurs étaient déconnectés après 5 minutes d'inactivité. Fixes #123."

# Ajouter et commiter en une seule étape (pour les fichiers déjà suivis)
git commit -am "Mettre à jour la documentation"`,
        image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'commit-history',
        title: 'Naviguer dans l\'historique des commits',
        content: `Git conserve l'historique complet de tous les commits effectués dans votre dépôt. Vous pouvez explorer cet historique pour comprendre l'évolution du projet.

La commande principale pour visualiser l'historique est \`git log\` :
- \`git log\` : Affiche l'historique complet des commits
- \`git log --oneline\` : Format condensé, une ligne par commit
- \`git log --graph\` : Affiche un graphe ASCII des branches
- \`git log -p\` : Affiche les différences introduites par chaque commit

Pour examiner un commit spécifique, utilisez \`git show\` :
\`git show <hash_du_commit>\`

Pour comparer deux commits ou branches, utilisez \`git diff\` :
\`git diff <commit1>..<commit2>\`

Vous pouvez également utiliser des références relatives comme HEAD (commit actuel), HEAD~ (commit précédent), etc.`,
        duration: 15,
        codeExample: `# Afficher l'historique des commits
git log

# Format condensé
git log --oneline

# Afficher un graphe des branches
git log --oneline --graph --all

# Examiner un commit spécifique
git show abc1234

# Comparer deux commits
git diff abc1234..def5678`,
        image: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ],
    quiz: [
      {
        question: "Quelle commande permet d'ajouter des fichiers à la zone de staging ?",
        options: ["git stage", "git add", "git commit", "git push"],
        correctAnswer: 1,
        explanation: "La commande 'git add' est utilisée pour ajouter des fichiers à la zone de staging (index) avant de les commiter."
      },
      {
        question: "Quelle commande permet de voir l'état actuel de votre dépôt Git ?",
        options: ["git check", "git state", "git status", "git info"],
        correctAnswer: 2,
        explanation: "La commande 'git status' affiche l'état actuel de votre dépôt, montrant les fichiers modifiés, stagés et non suivis."
      },
      {
        question: "Qu'est-ce qu'un commit dans Git ?",
        options: [
          "Une connexion à un dépôt distant",
          "Un instantané de l'état du projet à un moment donné",
          "Une branche temporaire",
          "Une demande de fusion"
        ],
        correctAnswer: 1,
        explanation: "Un commit est un instantané (snapshot) de l'état de votre projet à un moment précis, incluant tous les fichiers stagés."
      },
      {
        question: "Comment afficher l'historique des commits de manière condensée ?",
        options: [
          "git history",
          "git log --short",
          "git log --oneline",
          "git show --brief"
        ],
        correctAnswer: 2,
        explanation: "La commande 'git log --oneline' affiche l'historique des commits de manière condensée, avec une ligne par commit."
      }
    ]
  },
  {
    id: 'branches',
    title: 'Branches et Fusion',
    description: 'Maîtrisez la création de branches et les techniques de fusion pour un développement parallèle.',
    objectives: [
      "Créer et gérer des branches",
      "Comprendre les stratégies de fusion",
      "Résoudre les conflits de fusion",
      "Utiliser les workflows de branches"
    ],
    estimatedTime: 75,
    lessons: [
      {
        id: 'branch-basics',
        title: 'Les bases des branches',
       component: 'BranchCreator',
        content: `Les branches sont l'une des fonctionnalités les plus puissantes de Git. Elles permettent de développer des fonctionnalités, corriger des bugs ou expérimenter de nouvelles idées en parallèle, sans affecter la branche principale (généralement appelée "main" ou "master").

Une branche dans Git est simplement un pointeur léger et mobile vers un commit. La branche par défaut s'appelle "main" (ou "master" dans les anciens dépôts).

Pour créer une nouvelle branche :
\`git branch nom-de-branche\`

Pour basculer sur une branche :
\`git checkout nom-de-branche\`

Ou en une seule commande :
\`git checkout -b nom-de-branche\`

Pour voir toutes les branches :
\`git branch\`

Les branches vous permettent de travailler sur différentes parties de votre projet simultanément, puis de fusionner ces changements lorsqu'ils sont prêts.`,
        duration: 15,
        codeExample: `# Créer une nouvelle branche
git branch feature-login

# Basculer sur la branche
git checkout feature-login

# Ou en une seule commande
git checkout -b feature-login

# Lister toutes les branches
git branch

# Supprimer une branche
git branch -d feature-login`,
        image: "https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'merging-branches',
        title: 'Fusionner des branches',
       component: 'MergeSimulator',
        content: `La fusion (merge) est le processus qui consiste à intégrer les modifications d'une branche dans une autre. C'est ainsi que vous combinez le travail de différentes branches.

Pour fusionner une branche dans votre branche actuelle :
\`git merge nom-de-branche-source\`

Il existe plusieurs types de fusions :
1. **Fast-forward** : Quand il n'y a pas de nouveaux commits dans la branche de destination depuis la création de la branche source.
2. **Merge commit** : Crée un nouveau commit qui combine les deux branches.
3. **Squash merge** : Combine tous les commits de la branche source en un seul avant de fusionner.

Avant de fusionner, assurez-vous d'être sur la branche de destination :
\`git checkout main\`
\`git merge feature-branch\`

Après la fusion, vous pouvez supprimer la branche source si elle n'est plus nécessaire :
\`git branch -d feature-branch\``,
        duration: 20,
        codeExample: `# Basculer sur la branche de destination
git checkout main

# Fusionner une branche
git merge feature-login

# Fusion avec un message personnalisé
git merge feature-login -m "Fusion de la fonctionnalité de connexion"

# Fusion avec squash (combiner tous les commits)
git merge --squash feature-login
git commit -m "Ajouter fonctionnalité de connexion"`,
        image: "https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'conflict-resolution',
        title: 'Résolution des conflits',
       component: 'ConflictResolver',
        content: `Les conflits de fusion se produisent lorsque Git ne peut pas automatiquement fusionner des modifications parce que les mêmes lignes ont été modifiées différemment dans les deux branches.

Quand un conflit survient, Git marque les fichiers problématiques et interrompt le processus de fusion. Vous devez alors résoudre manuellement ces conflits.

Les fichiers en conflit contiennent des marqueurs spéciaux :
\`\`\`
<<<<<<< HEAD
Contenu de la branche actuelle
=======
Contenu de la branche à fusionner
>>>>>>> feature-branch
\`\`\`

Pour résoudre un conflit :
1. Ouvrez les fichiers marqués comme conflictuels
2. Modifiez le contenu pour garder ce que vous voulez (supprimez les marqueurs)
3. Ajoutez les fichiers résolus avec \`git add\`
4. Terminez la fusion avec \`git commit\`

Les outils comme VS Code offrent une interface visuelle pour faciliter la résolution des conflits.`,
        duration: 20,
        codeExample: `# Exemple de conflit dans un fichier
<<<<<<< HEAD
function hello() {
  return "Bonjour";
}
=======
function hello() {
  return "Hello";
}
>>>>>>> feature-branch

# Après résolution
function hello() {
  return "Bonjour / Hello";
}

# Marquer comme résolu
git add fichier-avec-conflit.js

# Terminer la fusion
git commit`,
        image: "https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'branch-workflows',
        title: 'Workflows de branches',
       component: 'WorkflowSimulator',
       workflowType: 'github-flow',
        content: `Il existe plusieurs stratégies de gestion des branches, appelées "workflows". Les plus populaires sont :

1. **GitHub Flow** : Simple et adapté au déploiement continu
   - Une branche principale (main)
   - Des branches de fonctionnalités créées à partir de main
   - Pull Requests pour fusionner les changements
   - Déploiement après chaque fusion dans main

2. **Git Flow** : Plus structuré, adapté aux releases planifiées
   - Branches principales : main et develop
   - Branches de fonctionnalités (feature/)
   - Branches de release (release/)
   - Branches de correctifs (hotfix/)

3. **GitLab Flow** : Intermédiaire, avec branches d'environnement
   - Branche principale (main)
   - Branches de fonctionnalités
   - Branches d'environnement (staging, production)

Le choix du workflow dépend de la taille de votre équipe, de la nature du projet et de votre stratégie de déploiement.`,
        duration: 20,
        codeExample: `# Exemple de GitHub Flow
git checkout -b feature-login
# Travailler sur la fonctionnalité
git add .
git commit -m "Ajouter formulaire de connexion"
git push origin feature-login
# Créer une Pull Request sur GitHub
# Après approbation, fusionner sur GitHub ou en local :
git checkout main
git merge feature-login
git push origin main`,
        image: "https://images.pexels.com/photos/1181290/pexels-photo-1181290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ],
    quiz: [
      {
        question: "Quelle commande permet de créer une nouvelle branche et d'y basculer immédiatement ?",
        options: ["git branch new-branch", "git checkout -b new-branch", "git create new-branch", "git switch -c new-branch"],
        correctAnswer: 1,
        explanation: "La commande 'git checkout -b new-branch' crée une nouvelle branche et y bascule en une seule opération."
      },
      {
        question: "Que se passe-t-il lors d'un conflit de fusion ?",
        options: [
          "Git supprime automatiquement les fichiers problématiques",
          "Git choisit automatiquement la version la plus récente",
          "Git marque les fichiers avec des conflits et attend que vous les résolviez manuellement",
          "Git annule automatiquement la fusion"
        ],
        correctAnswer: 2,
        explanation: "Lors d'un conflit, Git marque les fichiers problématiques avec des marqueurs spéciaux (<<<<<<, =======, >>>>>>>) et vous devez résoudre manuellement ces conflits avant de terminer la fusion."
      },
      {
        question: "Quelle commande permet de voir toutes les branches du dépôt ?",
        options: [
          "git show branches",
          "git list",
          "git branch",
          "git branches --all"
        ],
        correctAnswer: 2,
        explanation: "La commande 'git branch' liste toutes les branches locales. Pour voir aussi les branches distantes, utilisez 'git branch -a'."
      },
      {
        question: "Quel workflow Git est le plus simple et adapté au déploiement continu ?",
        options: [
          "Git Flow",
          "GitHub Flow",
          "GitLab Flow",
          "Centralized Workflow"
        ],
        correctAnswer: 1,
        explanation: "GitHub Flow est le workflow le plus simple, avec une seule branche principale (main) et des branches de fonctionnalités, ce qui le rend idéal pour le déploiement continu."
      }
    ]
  },
  {
    id: 'remote',
    title: 'Dépôts Distants',
    description: 'Apprenez à synchroniser votre travail avec des dépôts distants et à collaborer efficacement.',
    objectives: [
      "Configurer des dépôts distants",
      "Maîtriser push et pull",
      "Gérer la synchronisation",
      "Comprendre fetch vs pull"
    ],
    estimatedTime: 50,
    lessons: [
      {
        id: 'remote-basics',
        title: 'Les bases des dépôts distants',
       component: 'RemoteConnectionVisual',
        content: `Un dépôt distant est une version de votre projet hébergée sur Internet ou un réseau. Il permet de collaborer avec d'autres développeurs et de sauvegarder votre travail en dehors de votre machine locale.

GitHub, GitLab et Bitbucket sont des plateformes populaires pour héberger des dépôts distants.

Pour voir les dépôts distants configurés dans votre projet :
\`git remote -v\`

Pour ajouter un dépôt distant :
\`git remote add <nom> <url>\`

Par convention, le dépôt distant principal est souvent nommé "origin".

Exemple :
\`git remote add origin https://github.com/utilisateur/projet.git\`

Vous pouvez avoir plusieurs dépôts distants avec des noms différents, ce qui est utile pour les projets open source où vous travaillez avec un fork.`,
        duration: 10,
        codeExample: `# Lister les dépôts distants
git remote -v

# Ajouter un dépôt distant
git remote add origin https://github.com/utilisateur/projet.git

# Renommer un dépôt distant
git remote rename origin upstream

# Supprimer un dépôt distant
git remote remove upstream`,
        image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'push-pull',
        title: 'Push et Pull : synchroniser avec le dépôt distant',
       component: 'PushPullAnimator',
        content: `Pour synchroniser votre dépôt local avec un dépôt distant, vous utilisez principalement deux commandes : push et pull.

**Push** : Envoie vos commits locaux vers le dépôt distant
\`git push <remote> <branche>\`

Exemple : \`git push origin main\`

Pour définir la branche distante comme branche de suivi (tracking) :
\`git push -u origin main\`

**Pull** : Récupère les changements du dépôt distant et les fusionne dans votre branche locale
\`git pull <remote> <branche>\`

Exemple : \`git pull origin main\`

En réalité, \`git pull\` est une combinaison de deux commandes :
1. \`git fetch\` : Récupère les changements sans les fusionner
2. \`git merge\` : Fusionne les changements récupérés

Si vous avez des modifications locales non commitées, Git essaiera de les fusionner automatiquement. En cas de conflit, vous devrez les résoudre manuellement.`,
        duration: 15,
        codeExample: `# Pousser des commits vers le dépôt distant
git push origin main

# Définir la branche distante comme branche de suivi
git push -u origin feature-branch

# Récupérer et fusionner les changements distants
git pull origin main

# Pousser toutes les branches locales
git push --all origin`,
        image: "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'fetch-vs-pull',
        title: 'Fetch vs Pull : comprendre la différence',
       component: 'LocalVsRemoteVisual',
        content: `\`git fetch\` et \`git pull\` sont deux commandes pour récupérer des données depuis un dépôt distant, mais elles fonctionnent différemment.

**git fetch** :
- Récupère toutes les données des commits que vous n'avez pas encore
- Met à jour vos branches distantes (comme origin/main)
- Ne modifie PAS votre répertoire de travail ou vos branches locales
- Sûr à utiliser à tout moment, car il n'interfère pas avec votre travail en cours

**git pull** :
- Exécute \`git fetch\` suivi de \`git merge\`
- Récupère les données ET fusionne automatiquement dans votre branche locale
- Peut créer des conflits si vous avez des modifications locales
- Plus rapide mais moins contrôlé

Quand utiliser l'un ou l'autre ?
- Utilisez \`fetch\` quand vous voulez voir les changements avant de les fusionner
- Utilisez \`pull\` quand vous êtes prêt à intégrer immédiatement les changements distants

Après un \`fetch\`, vous pouvez examiner les changements avec :
\`git diff main origin/main\``,
        duration: 15,
        codeExample: `# Récupérer les changements sans fusionner
git fetch origin

# Voir les différences entre votre branche locale et la branche distante
git diff main origin/main

# Fusionner manuellement après avoir examiné les changements
git merge origin/main

# Ou utiliser pull pour tout faire en une fois
git pull origin main`,
        image: "https://images.pexels.com/photos/1181357/pexels-photo-1181357.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'remote-branches',
        title: 'Travailler avec des branches distantes',
       component: 'SyncStatusIndicator',
        content: `Les branches distantes sont des références à l'état des branches sur votre dépôt distant. Elles sont nommées sous la forme <remote>/<branch>, par exemple origin/main.

Pour voir toutes les branches (locales et distantes) :
\`git branch -a\`

Pour créer une branche locale basée sur une branche distante :
\`git checkout -b feature-branch origin/feature-branch\`

Pour pousser une nouvelle branche locale vers le dépôt distant :
\`git push -u origin feature-branch\`

Pour supprimer une branche distante :
\`git push origin --delete feature-branch\`

Lorsque vous collaborez avec d'autres développeurs, il est important de régulièrement synchroniser vos branches avec le dépôt distant pour éviter les conflits de fusion complexes.`,
        duration: 10,
        codeExample: `# Voir toutes les branches (locales et distantes)
git branch -a

# Créer une branche locale basée sur une branche distante
git checkout -b feature-login origin/feature-login

# Pousser une nouvelle branche locale vers le dépôt distant
git push -u origin feature-login

# Supprimer une branche distante
git push origin --delete feature-login`,
        image: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ],
    quiz: [
      {
        question: "Quelle commande permet d'envoyer vos commits locaux vers un dépôt distant ?",
        options: ["git upload", "git send", "git push", "git publish"],
        correctAnswer: 2,
        explanation: "La commande 'git push' envoie vos commits locaux vers le dépôt distant spécifié."
      },
      {
        question: "Quelle est la différence principale entre git fetch et git pull ?",
        options: [
          "git fetch est plus rapide que git pull",
          "git fetch récupère les changements sans les fusionner, git pull récupère et fusionne",
          "git fetch fonctionne avec toutes les branches, git pull seulement avec la branche principale",
          "git fetch nécessite une connexion internet, git pull fonctionne hors ligne"
        ],
        correctAnswer: 1,
        explanation: "git fetch récupère les changements du dépôt distant sans les fusionner dans votre branche locale, tandis que git pull récupère les changements et les fusionne automatiquement."
      },
      {
        question: "Comment ajouter un dépôt distant à votre projet Git ?",
        options: [
          "git remote create origin https://github.com/user/repo.git",
          "git add remote origin https://github.com/user/repo.git",
          "git remote add origin https://github.com/user/repo.git",
          "git create remote origin https://github.com/user/repo.git"
        ],
        correctAnswer: 2,
        explanation: "La commande 'git remote add origin https://github.com/user/repo.git' ajoute un dépôt distant nommé 'origin' pointant vers l'URL spécifiée."
      },
      {
        question: "Comment supprimer une branche distante ?",
        options: [
          "git branch -d origin/feature-branch",
          "git remote delete origin feature-branch",
          "git push origin --delete feature-branch",
          "git remove branch origin feature-branch"
        ],
        correctAnswer: 2,
        explanation: "La commande 'git push origin --delete feature-branch' supprime la branche 'feature-branch' du dépôt distant 'origin'."
      }
    ]
  },
  {
    id: 'collaboration',
    title: 'Collaboration et Pull Requests',
    description: 'Découvrez les outils de collaboration GitHub et les bonnes pratiques de travail en équipe.',
    objectives: [
      "Créer des Pull Requests",
      "Effectuer des revues de code",
      "Gérer les workflows d'équipe",
      "Utiliser les outils de collaboration GitHub"
    ],
    estimatedTime: 90,
    lessons: [
      {
        id: 'fork-clone',
        title: 'Fork et Clone : contribuer à des projets',
       component: 'ForkVsCloneDemo',
        content: `Pour contribuer à un projet open source ou à un projet auquel vous n'avez pas accès en écriture, vous utiliserez généralement le workflow Fork & Pull Request.

**Fork** : Créer une copie personnelle d'un dépôt sur votre compte GitHub
- Cliquez sur le bouton "Fork" en haut à droite d'un dépôt GitHub
- Cela crée une copie complète du dépôt sur votre compte
- Vous avez tous les droits d'écriture sur votre fork

**Clone** : Télécharger une copie locale du dépôt
\`git clone https://github.com/votre-nom/projet.git\`

Après avoir cloné votre fork, il est recommandé d'ajouter le dépôt original comme remote "upstream" :
\`git remote add upstream https://github.com/original/projet.git\`

Cela vous permettra de synchroniser votre fork avec le dépôt original :
\`git fetch upstream\`
\`git merge upstream/main\``,
        duration: 20,
        codeExample: `# Cloner votre fork
git clone https://github.com/votre-nom/projet.git
cd projet

# Ajouter le dépôt original comme remote "upstream"
git remote add upstream https://github.com/original/projet.git

# Créer une branche pour votre contribution
git checkout -b feature-awesome

# Travailler sur votre contribution...

# Synchroniser avec le dépôt original
git fetch upstream
git merge upstream/main`,
        image: "https://images.pexels.com/photos/1181360/pexels-photo-1181360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'pull-requests',
        title: 'Créer et gérer des Pull Requests',
       component: 'PullRequestCreator',
        content: `Une Pull Request (PR) est une demande d'intégration de vos modifications dans le dépôt principal. C'est le mécanisme central de collaboration sur GitHub.

Pour créer une Pull Request :
1. Poussez votre branche vers votre fork : \`git push origin feature-branch\`
2. Allez sur GitHub et naviguez vers votre fork
3. Cliquez sur "Compare & pull request"
4. Remplissez le formulaire avec un titre et une description
5. Cliquez sur "Create pull request"

Une bonne PR doit :
- Avoir un titre clair et descriptif
- Inclure une description détaillée des changements
- Mentionner les issues liées (ex: "Fixes #123")
- Être de taille raisonnable (évitez les PR géantes)
- Inclure des tests si possible

Une fois la PR créée, les mainteneurs du projet peuvent la réviser, demander des changements, et finalement la fusionner ou la rejeter.`,
        duration: 25,
        codeExample: `# Pousser votre branche vers votre fork
git push origin feature-awesome

# Si vous devez mettre à jour votre PR suite à des commentaires
# Faites vos modifications, puis :
git add .
git commit -m "Répondre aux commentaires de la PR"
git push origin feature-awesome`,
        image: "https://images.pexels.com/photos/1181361/pexels-photo-1181361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'code-reviews',
        title: 'Revues de code et feedback',
       component: 'CodeReviewInterface',
        content: `La revue de code est une pratique essentielle pour maintenir la qualité du code et partager les connaissances au sein d'une équipe.

Sur GitHub, les revues de code se font principalement via les Pull Requests. En tant que réviseur, vous pouvez :
- Commenter des lignes spécifiques
- Suggérer des modifications
- Approuver la PR ou demander des changements

Bonnes pratiques pour les revues de code :
- Soyez respectueux et constructif
- Concentrez-vous sur le code, pas sur la personne
- Expliquez pourquoi, pas seulement quoi
- Posez des questions plutôt que de donner des ordres
- Félicitez les bonnes pratiques et solutions élégantes

En tant qu'auteur de la PR, soyez ouvert aux critiques et prêt à défendre vos choix de manière constructive. L'objectif est d'améliorer le code, pas de prouver qui a raison.`,
        duration: 20,
        codeExample: `# Exemple de commentaire constructif dans une revue de code :
"Cette boucle pourrait être plus efficace en utilisant .map() au lieu de .forEach() 
car nous créons un nouveau tableau. Qu'en penses-tu ?"

# Plutôt que :
"Tu devrais utiliser .map() ici, c'est mieux."`,
        image: "https://images.pexels.com/photos/1181362/pexels-photo-1181362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'github-features',
        title: 'Fonctionnalités de collaboration GitHub',
       component: 'CollaborationSimulator',
        content: `GitHub offre de nombreuses fonctionnalités pour faciliter la collaboration au-delà du simple hébergement de code :

**Issues** : Pour suivre les bugs, améliorations et tâches
- Utilisez des labels pour catégoriser
- Assignez des responsables
- Référencez des issues dans les commits et PRs avec #123

**Projects** : Tableaux Kanban intégrés pour gérer les tâches
- Organisez les issues en colonnes (À faire, En cours, Terminé)
- Suivez la progression du projet

**Discussions** : Pour les conversations qui ne sont pas des bugs ou des fonctionnalités
- Questions, idées, annonces

**GitHub Actions** : Automatisation de CI/CD
- Tests automatiques
- Déploiement continu
- Vérification de qualité du code

**GitHub Pages** : Hébergement gratuit pour la documentation
- Parfait pour les sites statiques et la documentation

Ces outils forment un écosystème complet qui facilite la gestion de projets de toute taille.`,
        duration: 25,
        codeExample: `# Référencer une issue dans un message de commit
git commit -m "Ajouter la validation du formulaire, fixes #42"

# Fermer automatiquement une issue avec un commit
git commit -m "Corriger le bug d'authentification, closes #123"

# Mots-clés reconnus par GitHub :
# close, closes, closed, fix, fixes, fixed, resolve, resolves, resolved`,
        image: "https://images.pexels.com/photos/1181363/pexels-photo-1181363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ],
    quiz: [
      {
        question: "Quelle est la différence principale entre fork et clone ?",
        options: [
          "Un fork est local, un clone est distant",
          "Un fork crée une copie sur votre compte GitHub, un clone télécharge le dépôt localement",
          "Un fork est temporaire, un clone est permanent",
          "Un fork modifie le dépôt original, un clone crée une copie séparée"
        ],
        correctAnswer: 1,
        explanation: "Un fork crée une copie du dépôt sur votre compte GitHub (distant), tandis qu'un clone télécharge une copie du dépôt sur votre machine locale."
      },
      {
        question: "Comment référencer une issue dans un message de commit pour qu'elle soit automatiquement liée sur GitHub ?",
        options: [
          "Mentionner 'issue #123' dans le message",
          "Utiliser le mot-clé 'link' suivi du numéro d'issue",
          "Inclure #123 dans le message de commit",
          "Ajouter une référence dans un fichier séparé"
        ],
        correctAnswer: 2,
        explanation: "Inclure #123 dans votre message de commit créera automatiquement un lien vers l'issue 123 sur GitHub. Vous pouvez aussi utiliser des mots-clés comme 'fixes #123' pour fermer automatiquement l'issue."
      },
      {
        question: "Quelle est la bonne pratique pour la taille d'une Pull Request ?",
        options: [
          "Les PR devraient être aussi grandes que possible pour minimiser leur nombre",
          "Les PR devraient être de taille modérée et se concentrer sur une seule fonctionnalité ou correction",
          "Les PR devraient contenir exactement un commit",
          "La taille des PR n'a pas d'importance"
        ],
        correctAnswer: 1,
        explanation: "Les Pull Requests devraient idéalement être de taille modérée et se concentrer sur une seule fonctionnalité ou correction. Cela facilite la revue de code et réduit les risques de conflits."
      },
      {
        question: "Comment synchroniser votre fork avec le dépôt original ?",
        options: [
          "git sync upstream",
          "git pull original main",
          "git fetch upstream && git merge upstream/main",
          "git update fork"
        ],
        correctAnswer: 2,
        explanation: "Pour synchroniser votre fork, vous devez d'abord récupérer les changements du dépôt original avec 'git fetch upstream', puis les fusionner dans votre branche locale avec 'git merge upstream/main'."
      }
    ]
  },
  {
    id: 'workflows',
    title: 'Workflows Git',
    description: 'Explorez différentes stratégies de workflow Git pour optimiser votre processus de développement.',
    objectives: [
      "Comprendre les différents workflows Git",
      "Maîtriser GitHub Flow",
      "Apprendre Git Flow",
      "Choisir le workflow adapté à votre projet"
    ],
    estimatedTime: 60,
    lessons: [
      {
        id: 'workflow-comparison',
        title: 'Comparaison des workflows Git',
       component: 'WorkflowComparisonTable',
        content: `Un workflow Git est une recommandation sur la façon d'utiliser Git pour accomplir un travail cohérent et productif. Plusieurs modèles existent, chacun avec ses avantages et inconvénients.

Les trois workflows les plus populaires sont :

1. **GitHub Flow** : Simple et léger
   - Une seule branche principale (main)
   - Branches de fonctionnalités directement depuis main
   - Pull Requests pour réviser le code
   - Déploiement après fusion dans main
   - Idéal pour : déploiement continu, petites équipes

2. **Git Flow** : Structuré et formel
   - Deux branches principales : main (production) et develop
   - Branches de fonctionnalités depuis develop
   - Branches de release pour préparer les versions
   - Branches de hotfix pour les corrections urgentes
   - Idéal pour : releases planifiées, logiciels versionnés

3. **GitLab Flow** : Intermédiaire
   - Branche principale (main)
   - Branches de fonctionnalités
   - Branches d'environnement (staging, production)
   - Idéal pour : déploiements par étapes

Le choix du workflow dépend de la taille de votre équipe, de la nature du projet et de votre stratégie de déploiement.`,
        duration: 15,
        image: "https://images.pexels.com/photos/1181364/pexels-photo-1181364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'github-flow',
        title: 'GitHub Flow : simplicité et efficacité',
       component: 'WorkflowSimulator',
       workflowType: 'github-flow',
        content: `GitHub Flow est un workflow léger, basé sur les branches, qui prend en charge les équipes et projets où les déploiements sont réguliers.

Étapes du GitHub Flow :
1. Créer une branche depuis \`main\`
2. Ajouter des commits
3. Ouvrir une Pull Request
4. Discuter et réviser le code
5. Déployer pour tester (optionnel)
6. Fusionner dans \`main\`

Avantages :
- Simple à comprendre et à mettre en œuvre
- Parfait pour le déploiement continu
- Favorise l'intégration fréquente du code
- Moins de conflits grâce aux PR fréquentes

Inconvénients :
- Moins structuré pour les releases planifiées
- Peut être insuffisant pour les grands projets avec plusieurs versions en production

GitHub Flow est idéal pour les sites web, applications SaaS et projets avec déploiement continu.`,
        duration: 15,
        codeExample: `# GitHub Flow en pratique

# 1. Créer une branche depuis main
git checkout main
git pull origin main
git checkout -b feature-login

# 2. Ajouter des commits
git add .
git commit -m "Ajouter formulaire de connexion"
git commit -m "Ajouter validation du formulaire"

# 3. Pousser la branche et créer une PR
git push -u origin feature-login
# Créer la PR sur GitHub

# 4. Après revue et approbation
# 5. Fusionner dans main (via GitHub ou en local)
git checkout main
git merge feature-login
git push origin main`,
        image: "https://images.pexels.com/photos/1181365/pexels-photo-1181365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'git-flow',
        title: 'Git Flow : pour les projets complexes',
       component: 'WorkflowSimulator',
       workflowType: 'git-flow',
        content: `Git Flow est un modèle de branches plus rigoureux, conçu pour les projets avec des cycles de release planifiés.

Branches principales :
- \`main\` : code en production, stable
- \`develop\` : code de développement, intégration continue

Branches de support :
- \`feature/*\` : nouvelles fonctionnalités (depuis \`develop\`)
- \`release/*\` : préparation de release (depuis \`develop\`)
- \`hotfix/*\` : corrections urgentes (depuis \`main\`)
- \`bugfix/*\` : corrections non urgentes (depuis \`develop\`)

Flux typique :
1. Développer sur des branches \`feature/*\`
2. Fusionner dans \`develop\`
3. Créer une branche \`release/*\` quand prêt
4. Tester et corriger sur la branche de release
5. Fusionner dans \`main\` ET \`develop\`
6. Tagger la version sur \`main\`

Git Flow est plus complexe mais offre une structure claire pour les projets nécessitant plusieurs versions en parallèle.`,
        duration: 15,
        codeExample: `# Git Flow en pratique (avec l'extension git-flow)

# Initialiser Git Flow dans un dépôt
git flow init

# Démarrer une fonctionnalité
git flow feature start login

# Terminer une fonctionnalité
git flow feature finish login

# Démarrer une release
git flow release start 1.0.0

# Terminer une release
git flow release finish 1.0.0

# Créer un hotfix
git flow hotfix start bug-critical
git flow hotfix finish bug-critical`,
        image: "https://images.pexels.com/photos/1181366/pexels-photo-1181366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      },
      {
        id: 'choosing-workflow',
        title: 'Choisir le bon workflow pour votre projet',
       component: 'FlowDiagramBuilder',
        content: `Le choix du workflow Git dépend de plusieurs facteurs :

**Taille de l'équipe** :
- Petite équipe (1-5) : GitHub Flow
- Équipe moyenne (5-15) : GitLab Flow
- Grande équipe (15+) : Git Flow

**Type de projet** :
- Application web/SaaS : GitHub Flow
- Application mobile avec versions : Git Flow
- Logiciel d'entreprise : Git Flow ou GitLab Flow

**Fréquence de déploiement** :
- Plusieurs fois par jour : GitHub Flow
- Hebdomadaire : GitLab Flow
- Mensuel ou moins : Git Flow

**Environnements de déploiement** :
- Production uniquement : GitHub Flow
- Staging + Production : GitLab Flow
- Multiples environnements : Git Flow

N'hésitez pas à adapter ces workflows à vos besoins spécifiques. L'important est que toute l'équipe comprenne et suive le même processus.

Commencez simple (GitHub Flow) et évoluez vers plus de complexité seulement si nécessaire.`,
        duration: 15,
        codeExample: `# Exemple de configuration .gitconfig pour faciliter les workflows

[alias]
  # GitHub Flow
  feature = "!f() { git checkout main && git pull && git checkout -b feature-$1; }; f"
  
  # Git Flow shortcuts
  feat = "!f() { git checkout develop && git pull && git checkout -b feature/$1; }; f"
  release = "!f() { git checkout develop && git pull && git checkout -b release/$1; }; f"
  hotfix = "!f() { git checkout main && git pull && git checkout -b hotfix/$1; }; f"
  
  # Utilitaires
  st = status
  co = checkout
  cm = commit -m
  unstage = restore --staged
  last = log -1 HEAD`,
        image: "https://images.pexels.com/photos/1181367/pexels-photo-1181367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      }
    ],
    quiz: [
      {
        question: "Quel workflow Git est le plus adapté pour un petit projet web avec déploiement continu ?",
        options: ["Git Flow", "GitHub Flow", "GitLab Flow", "Centralized Workflow"],
        correctAnswer: 1,
        explanation: "GitHub Flow est idéal pour les projets web avec déploiement continu grâce à sa simplicité et son focus sur l'intégration fréquente du code."
      },
      {
        question: "Dans Git Flow, quelle branche contient le code prêt pour la production ?",
        options: ["develop", "main/master", "release", "production"],
        correctAnswer: 1,
        explanation: "Dans Git Flow, la branche main (ou master) contient toujours le code stable prêt pour la production. La branche develop contient les développements en cours."
      },
      {
        question: "Quelle est la principale différence entre GitHub Flow et GitLab Flow ?",
        options: [
          "GitHub Flow utilise des tags, GitLab Flow non",
          "GitHub Flow a une seule branche principale, GitLab Flow ajoute des branches d'environnement",
          "GitHub Flow est pour les petits projets, GitLab Flow pour les grands",
          "GitHub Flow est plus ancien que GitLab Flow"
        ],
        correctAnswer: 1,
        explanation: "La principale différence est que GitLab Flow étend GitHub Flow en ajoutant des branches d'environnement (comme staging, production) pour faciliter les déploiements par étapes."
      },
      {
        question: "Dans Git Flow, à partir de quelle branche sont créées les branches de hotfix ?",
        options: ["develop", "main/master", "release", "feature"],
        correctAnswer: 1,
        explanation: "Les branches de hotfix sont créées à partir de main/master car elles corrigent des bugs urgents en production, puis sont fusionnées à la fois dans main et develop."
      }
    ]
  }
];