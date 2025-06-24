import { GitCommit, GitBranch, Cloud, Users, Factory as Repository } from 'lucide-react';

export interface Chapter {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  estimatedTime: number;
  icon: any; // Lucide icon component
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number;
  component?: string;
  workflowType?: 'github-flow' | 'git-flow' | 'gitlab-flow';
  type: 'theory' | 'practice' | 'simulation' | 'quiz';
  image?: string;
  codeExample?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const chapters: Chapter[] = [
  // Chapitre 1: Introduction à Git et GitHub
  {
    id: 'intro',
    title: 'Introduction à Git et GitHub',
    description: 'Découvrez les bases du contrôle de version, la différence entre Git et GitHub, et comment ils fonctionnent ensemble.',
    objectives: [
      'Comprendre la différence entre Git et GitHub',
      'Découvrir les avantages du contrôle de version',
      'Configurer Git sur votre machine',
      'Comprendre le flux de travail de base de Git'
    ],
    estimatedTime: 45,
    icon: GitCommit,
    lessons: [
      {
        id: 'intro-lesson1',
        title: 'Qu\'est-ce que le contrôle de version ?',
        type: 'theory',
        duration: 10,
        content: `Le contrôle de version est un système qui enregistre les modifications apportées à un fichier ou à un ensemble de fichiers au fil du temps, de sorte que vous puissiez rappeler des versions spécifiques plus tard.

## Pourquoi utiliser un système de contrôle de version ?

- **Historique complet :** Suivez chaque modification apportée au code, avec des informations sur qui a fait quoi et quand.
- **Travail parallèle :** Plusieurs développeurs peuvent travailler simultanément sur le même projet sans conflit.
- **Branches :** Développez des fonctionnalités, corrigez des bugs ou expérimentez sans affecter le code principal.
- **Sauvegarde :** Votre code est sauvegardé et peut être récupéré à tout moment.
- **Collaboration :** Facilitez la collaboration entre les membres de l'équipe et les contributeurs externes.

## Types de systèmes de contrôle de version

1. **Systèmes locaux :** Copies de fichiers dans différents répertoires (peu fiable et sujet aux erreurs)
2. **Systèmes centralisés (CVCS) :** Un serveur central contient tous les fichiers versionnés (SVN, Perforce)
3. **Systèmes distribués (DVCS) :** Chaque client possède une copie complète du dépôt (Git, Mercurial)

Git est un système de contrôle de version distribué, ce qui signifie que chaque développeur a une copie complète de l'historique du projet sur sa machine locale.`
      },
      {
        id: 'intro-lesson2',
        title: 'Git vs GitHub : Quelle est la différence ?',
        type: 'theory',
        duration: 10,
        component: 'GitVsGitHubComparison',
        content: `Git et GitHub sont souvent confondus, mais ils sont très différents et servent des objectifs complémentaires.

## Git

Git est un **système de contrôle de version distribué** créé par Linus Torvalds en 2005. Il s'agit d'un logiciel libre et open source conçu pour gérer tout, des petits aux très grands projets, avec rapidité et efficacité.

**Caractéristiques de Git :**
- Fonctionne localement sur votre ordinateur
- Logiciel de contrôle de version que vous installez et maintenez
- Suit les modifications de fichiers dans le temps
- Ne nécessite pas de connexion internet pour fonctionner
- Gratuit et open source

## GitHub

GitHub est une **plateforme de développement collaborative basée sur le web** qui utilise Git. C'est un service commercial créé en 2008 et maintenant détenu par Microsoft.

**Caractéristiques de GitHub :**
- Service d'hébergement web pour les dépôts Git
- Ajoute une interface web et des fonctionnalités sociales à Git
- Fournit des outils de collaboration comme les issues et les pull requests
- Nécessite une connexion internet
- Offre des plans gratuits et payants

## En résumé

Git est l'outil de contrôle de version que vous utilisez localement, tandis que GitHub est un service en ligne qui héberge vos dépôts Git et facilite la collaboration.

Analogie : Si Git était un appareil photo qui prend des photos (commits) de votre projet au fil du temps, GitHub serait comme un album photo en ligne où vous partagez ces photos avec d'autres personnes.`
      },
      {
        id: 'intro-lesson3',
        title: 'Comprendre le versioning',
        type: 'theory',
        duration: 10,
        component: 'VersioningDemo',
        content: `Le versioning (ou gestion de versions) est au cœur de Git. Il permet de suivre l'évolution de votre code au fil du temps.

## Concept de versioning

Imaginez que vous écrivez un document important. Sans système de versioning, vous pourriez avoir des fichiers nommés :
- document_v1.doc
- document_final.doc
- document_final_vraiment.doc
- document_final_vraiment_cette_fois.doc

Cette approche manuelle est :
- Désorganisée
- Sujette aux erreurs
- Difficile à suivre
- Impossible à collaborer à grande échelle

## Comment Git gère les versions

Git prend des "instantanés" (snapshots) de votre projet à chaque commit :

1. **Commit :** Un point de sauvegarde dans l'historique de votre projet
2. **Hash :** Chaque commit a un identifiant unique (hash)
3. **Message :** Description de ce que le commit change ou ajoute
4. **Auteur :** Qui a créé ce commit
5. **Horodatage :** Quand le commit a été créé

## Avantages

- **Historique complet :** Possibilité de voir qui a fait quoi et quand
- **Retour arrière :** Capacité de revenir à n'importe quel point dans le temps
- **Branches :** Possibilité de travailler sur différentes versions en parallèle
- **Fusion :** Capacité de combiner différentes versions

## Comment Git stocke les changements

Git utilise un système intelligent pour stocker les changements :
- Ne stocke que les différences entre les versions (deltas)
- Crée une chaîne de commits, chacun pointant vers son parent
- Utilise des algorithmes de compression pour économiser l'espace`
      },
      {
        id: 'intro-lesson4',
        title: 'Local vs Remote : Comprendre le flux',
        type: 'practice',
        duration: 15,
        component: 'LocalVsRemoteVisual',
        content: `Git est un système distribué, ce qui signifie qu'il y a une distinction entre vos dépôts locaux (sur votre machine) et les dépôts distants (comme ceux sur GitHub).

## Dépôt Local

Votre dépôt local est sur votre propre ordinateur. C'est là que vous :
- Créez et modifiez des fichiers
- Committez des changements
- Créez des branches
- Fusionnez des branches

Tout cela peut se faire sans connexion internet, car Git stocke l'historique complet du projet localement.

## Dépôt Distant (Remote)

Un dépôt distant est hébergé sur un serveur, comme GitHub. Il sert à :
- Sauvegarder votre travail
- Partager votre code avec d'autres
- Collaborer avec d'autres développeurs
- Accéder à votre code depuis différentes machines

## Flux de travail entre Local et Distant

Le flux de travail typique entre dépôts locaux et distants comprend ces commandes :

- **git clone** : Copier un dépôt distant sur votre machine
- **git push** : Envoyer vos commits locaux vers le dépôt distant
- **git pull** : Récupérer et fusionner les changements du dépôt distant
- **git fetch** : Récupérer les changements du dépôt distant sans les fusionner

Ce modèle distribué offre plusieurs avantages :
- Travail hors ligne
- Multiples sauvegardes du code
- Facilité de collaboration
- Flexibilité dans la gestion des versions`
      }
    ],
    quiz: [
      {
        question: 'Quelle est la principale différence entre Git et GitHub ?',
        options: [
          'Git est payant, GitHub est gratuit',
          'Git est un système de contrôle de version, GitHub est une plateforme d\'hébergement web basée sur Git',
          'Git est plus récent que GitHub',
          'Git est pour Windows, GitHub fonctionne sur toutes les plateformes'
        ],
        correctAnswer: 1,
        explanation: 'Git est un système de contrôle de version distribué que vous installez localement, tandis que GitHub est une plateforme web qui héberge des dépôts Git et ajoute des fonctionnalités collaboratives.'
      },
      {
        question: 'Qu\'est-ce qu\'un "commit" dans Git ?',
        options: [
          'Un commentaire laissé par un développeur',
          'Un instantané (snapshot) de l\'état du projet à un moment donné',
          'Une branche temporaire',
          'Une demande de fusion de code'
        ],
        correctAnswer: 1,
        explanation: 'Un commit est un instantané de l\'état de votre projet à un moment donné. Il enregistre les modifications que vous avez apportées aux fichiers dans le dépôt.'
      },
      {
        question: 'Pourquoi utilise-t-on des systèmes de contrôle de version comme Git ?',
        options: [
          'Uniquement pour travailler en équipe',
          'Pour rendre le code plus rapide',
          'Pour suivre les changements, collaborer et maintenir un historique du projet',
          'Car c\'est obligatoire pour publier des applications'
        ],
        correctAnswer: 2,
        explanation: 'Les systèmes de contrôle de version comme Git permettent de suivre les modifications apportées au code au fil du temps, facilitent la collaboration entre développeurs et maintiennent un historique complet du projet.'
      },
      {
        question: 'Que signifie la nature "distribuée" de Git ?',
        options: [
          'Le code est réparti sur plusieurs serveurs pour la sécurité',
          'Chaque développeur possède une copie complète du dépôt sur sa machine',
          'Le code est automatiquement distribué aux utilisateurs',
          'Les commits sont distribués aléatoirement dans le temps'
        ],
        correctAnswer: 1,
        explanation: 'Dans un système de contrôle de version distribué comme Git, chaque développeur a une copie complète du dépôt (historique inclus) sur sa machine locale, contrairement aux systèmes centralisés où seul le serveur possède l\'historique complet.'
      },
      {
        question: 'Quelle commande permet d\'obtenir les derniers changements du dépôt distant vers votre dépôt local ?',
        options: [
          'git push',
          'git commit',
          'git clone',
          'git pull'
        ],
        correctAnswer: 3,
        explanation: 'La commande `git pull` récupère les derniers changements du dépôt distant et les fusionne dans votre branche locale actuelle.'
      }
    ]
  },

  // Chapitre 2: Repositories et Commits
  {
    id: 'repositories',
    title: 'Repositories et Commits',
    description: 'Apprenez à créer et gérer des dépôts Git, à effectuer des commits et à comprendre le flux de travail de base de Git.',
    objectives: [
      'Créer et initialiser un dépôt Git',
      'Comprendre le cycle de vie des fichiers dans Git',
      'Effectuer et organiser des commits',
      'Explorer l\'historique des commits'
    ],
    estimatedTime: 60,
    icon: Repository,
    lessons: [
      {
        id: 'repos-lesson1',
        title: 'Création et initialisation d\'un dépôt',
        type: 'theory',
        duration: 10,
        component: 'RepoCreationWizard',
        content: `Un dépôt (ou "repo") Git est l'unité fondamentale de Git. C'est essentiellement un dossier contenant vos fichiers de projet et un sous-dossier spécial ".git" qui stocke toutes les métadonnées et l'historique du projet.

## Création d'un dépôt

Il existe deux façons principales de créer un dépôt Git :

### 1. Initialiser un nouveau dépôt

Si vous commencez un nouveau projet ou voulez ajouter Git à un projet existant, vous pouvez initialiser un nouveau dépôt :

\`\`\`bash
# Naviguez dans le dossier de votre projet
cd mon-projet

# Initialisez un dépôt Git
git init
\`\`\`

Cette commande crée un sous-dossier ".git" dans votre répertoire courant, qui contient toute la structure nécessaire pour le dépôt.

### 2. Cloner un dépôt existant

Si vous voulez travailler avec un dépôt qui existe déjà (par exemple sur GitHub), vous pouvez le cloner :

\`\`\`bash
git clone https://github.com/utilisateur/repo.git
\`\`\`

Cette commande télécharge une copie complète du dépôt, y compris tous les fichiers et l'historique complet.

## Structure d'un dépôt

Un dépôt Git comprend :

- **Working Directory (Répertoire de travail)** : Où vous modifiez vos fichiers
- **Staging Area (Zone de préparation)** : Zone intermédiaire où vous placez les fichiers que vous voulez committer
- **Git Directory (.git)** : Où Git stocke les métadonnées et la base de données d'objets pour votre projet

## Configuration initiale

Après avoir créé un dépôt, il est bon de configurer votre identité :

\`\`\`bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@exemple.com"
\`\`\`

Cette configuration est importante car chaque commit que vous ferez inclura ces informations.`
      },
      {
        id: 'repos-lesson2',
        title: 'Comprendre la zone de staging',
        type: 'practice',
        duration: 15,
        component: 'StagingAreaVisualizer',
        content: `La zone de staging (ou index) est l'une des caractéristiques les plus puissantes et distinctives de Git. Elle agit comme une zone intermédiaire entre votre répertoire de travail et l'historique de votre dépôt.

## Cycle de vie des fichiers dans Git

Dans Git, vos fichiers passent par différents états :

1. **Untracked (Non suivi)** : Git ne suit pas encore ce fichier
2. **Modified (Modifié)** : Le fichier a été modifié mais pas encore préparé pour un commit
3. **Staged (Préparé)** : Le fichier a été ajouté à la zone de staging et sera inclus dans le prochain commit
4. **Committed (Commité)** : Le fichier a été enregistré dans l'historique Git

## Commandes principales

### Vérifier l'état des fichiers

\`\`\`bash
git status
\`\`\`

Cette commande affiche les fichiers qui ont été modifiés, ceux qui sont en staging et ceux qui ne sont pas suivis.

### Ajouter des fichiers à la zone de staging

\`\`\`bash
# Ajouter un fichier spécifique
git add nom-du-fichier.txt

# Ajouter plusieurs fichiers
git add fichier1.js fichier2.css

# Ajouter tous les fichiers modifiés
git add .
\`\`\`

### Retirer des fichiers de la zone de staging

\`\`\`bash
git restore --staged nom-du-fichier.txt
\`\`\`

## Pourquoi utiliser la zone de staging ?

La zone de staging vous permet de :

1. **Contrôler précisément ce qui va dans chaque commit** - vous pouvez préparer certaines modifications tout en laissant d'autres pour plus tard
2. **Réviser vos changements** avant de les committer définitivement
3. **Organiser des commits logiques** - regrouper des modifications connexes, même si vous avez travaillé sur plusieurs fonctionnalités en même temps

C'est comme préparer un colis avant de l'envoyer - vous rassemblez et organisez soigneusement ce que vous voulez inclure.`
      },
      {
        id: 'repos-lesson3',
        title: 'Effectuer des commits',
        type: 'practice',
        duration: 15,
        content: `Les commits sont au cœur de Git. Un commit enregistre l'état de vos fichiers à un moment précis et constitue un point dans l'historique de votre projet auquel vous pouvez revenir.

## Qu'est-ce qu'un commit ?

Un commit dans Git est comme une photo instantanée de votre projet à un moment donné. Il inclut :

- Un identifiant unique (hash SHA-1)
- Les modifications apportées aux fichiers
- Un message de commit décrivant les changements
- L'auteur et l'horodatage
- Une référence au commit parent (ou aux commits parents en cas de fusion)

## Comment faire un commit

Une fois que vous avez ajouté les fichiers souhaités à la zone de staging avec \`git add\`, vous êtes prêt à créer un commit :

\`\`\`bash
git commit -m "Description concise des changements"
\`\`\`

Pour un message plus détaillé sur plusieurs lignes :

\`\`\`bash
git commit
\`\`\`

Cette commande ouvrira un éditeur de texte où vous pourrez écrire un message plus long.

## Bonnes pratiques pour les messages de commit

Un bon message de commit devrait :

1. **Être concis mais descriptif** - expliquez ce qui a été changé et pourquoi
2. **Utiliser l'impératif présent** - "Add feature" plutôt que "Added feature"
3. **Limiter la première ligne à environ 50 caractères**
4. **Si nécessaire, ajouter des détails après une ligne vide**

Exemple de bon format :

\`\`\`
Add user authentication feature

- Implement login form with email/password
- Add session management
- Create protected routes for authenticated users
\`\`\`

## Raccourcis utiles

**Commit avec ajout automatique des fichiers modifiés** (mais pas des fichiers non suivis) :

\`\`\`bash
git commit -am "Message du commit"
\`\`\`

**Modifier le dernier commit** (si vous avez oublié quelque chose ou fait une erreur) :

\`\`\`bash
# Modifier les fichiers, puis
git add .
git commit --amend
\`\`\`

## Importance des commits atomiques

Il est recommandé de faire des commits "atomiques" - c'est-à-dire des commits qui :
- Concernent une seule fonctionnalité ou correction
- Sont autonomes et peuvent être compris indépendamment
- Peuvent potentiellement être annulés sans affecter d'autres fonctionnalités

Cette pratique rend l'historique plus lisible et facilite le débogage ou la réversion des changements si nécessaire.`
      },
      {
        id: 'repos-lesson4',
        title: 'Explorer l\'historique des commits',
        type: 'theory',
        duration: 15,
        component: 'CommitHistoryExplorer',
        content: `L'une des forces principales de Git est sa capacité à garder un historique détaillé de votre projet. Apprendre à explorer cet historique est essentiel pour tirer pleinement parti de Git.

## Afficher l'historique des commits

La commande de base pour voir l'historique est :

\`\`\`bash
git log
\`\`\`

Cette commande affiche les commits du plus récent au plus ancien, avec :
- Le hash du commit
- L'auteur
- La date
- Le message de commit

## Options de formatage utiles

**Format condensé sur une ligne** :

\`\`\`bash
git log --oneline
\`\`\`

**Afficher les branches graphiquement** :

\`\`\`bash
git log --graph --oneline --all
\`\`\`

**Afficher les différences introduites par chaque commit** :

\`\`\`bash
git log -p
\`\`\`

**Limiter le nombre de commits affichés** :

\`\`\`bash
git log -n 5  # Affiche les 5 derniers commits
\`\`\`

## Filtrer l'historique

**Par auteur** :

\`\`\`bash
git log --author="John"
\`\`\`

**Par date** :

\`\`\`bash
git log --after="2023-01-01" --before="2023-01-31"
\`\`\`

**Par contenu** (recherche dans les messages de commit) :

\`\`\`bash
git log --grep="bug fix"
\`\`\`

**Par fichier** :

\`\`\`bash
git log -- path/to/file.js
\`\`\`

## Examiner un commit spécifique

Pour voir les détails d'un commit particulier :

\`\`\`bash
git show abc123  # où abc123 est le hash du commit (ou une partie)
\`\`\`

## Comparer des commits

Pour voir les différences entre deux commits :

\`\`\`bash
git diff abc123..def456  # Différences entre les commits abc123 et def456
\`\`\`

## Statistiques

Pour obtenir des statistiques sur les changements :

\`\`\`bash
git log --stat
\`\`\`

## Utiliser un outil graphique

De nombreux outils graphiques facilitent l'exploration de l'historique Git :
- GitHub Desktop
- GitKraken
- SourceTree
- Extensions VS Code pour Git

Ces outils peuvent rendre la visualisation de l'historique plus intuitive, surtout pour les projets complexes avec de nombreuses branches et fusions.`
      }
    ],
    quiz: [
      {
        question: 'Quelle commande permet d\'initialiser un nouveau dépôt Git ?',
        options: [
          'git start',
          'git create',
          'git init',
          'git new'
        ],
        correctAnswer: 2,
        explanation: 'La commande `git init` permet de créer un nouveau dépôt Git dans le répertoire courant. Elle initialise un sous-dossier .git qui contient tous les fichiers nécessaires à la gestion du dépôt.'
      },
      {
        question: 'Qu\'est-ce que la zone de staging (ou index) dans Git ?',
        options: [
          'Une copie de sauvegarde automatique de vos fichiers',
          'Une zone intermédiaire où vous préparez les fichiers pour le prochain commit',
          'Un serveur distant où votre code est stocké',
          'Une branche spéciale pour les tests'
        ],
        correctAnswer: 1,
        explanation: 'La zone de staging est une zone intermédiaire où vous préparez (avec git add) les modifications que vous souhaitez inclure dans votre prochain commit. Elle vous permet de sélectionner précisément ce qui sera enregistré dans l\'historique.'
      },
      {
        question: 'Comment ajouter tous les fichiers modifiés à la zone de staging ?',
        options: [
          'git add --all',
          'git add .',
          'git stage --all',
          'git commit -a'
        ],
        correctAnswer: 1,
        explanation: 'La commande `git add .` ajoute tous les fichiers modifiés et nouveaux du répertoire courant à la zone de staging. Le point (.) représente le répertoire courant.'
      },
      {
        question: 'Quelle est la différence entre "git pull" et "git fetch" ?',
        options: [
          'Il n\'y a pas de différence, ce sont des synonymes',
          'git pull est pour télécharger, git fetch est pour envoyer des changements',
          'git pull combine git fetch et git merge, tandis que git fetch télécharge sans fusionner',
          'git pull met à jour uniquement la branche actuelle, git fetch met à jour toutes les branches'
        ],
        correctAnswer: 2,
        explanation: 'git pull est en fait une commande qui combine deux opérations: 1. git fetch: Télécharge les modifications du dépôt distant 2. git merge: Fusionne ces modifications dans votre branche locale'
      },
      {
        question: 'Quelle bonne pratique devrait-on suivre concernant les messages de commit ?',
        options: [
          'Utiliser des messages très courts comme "fix" ou "update"',
          'Inclure le plus de détails possibles, avec au moins 200 caractères',
          'Écrire des messages descriptifs qui expliquent le pourquoi du changement',
          'Toujours inclure le nom de l\'auteur dans le message'
        ],
        correctAnswer: 2,
        explanation: 'Un bon message de commit doit être descriptif et expliquer pourquoi le changement a été fait, pas seulement ce qui a changé. Cela aide les autres développeurs (et vous-même plus tard) à comprendre le raisonnement derrière la modification.'
      }
    ]
  },

  // Chapitre 3: Branches et Fusion
  {
    id: 'branches',
    title: 'Branches et Fusion',
    description: 'Découvrez comment utiliser les branches pour travailler sur plusieurs fonctionnalités en parallèle et comment fusionner ces branches une fois le travail terminé.',
    objectives: [
      'Comprendre le concept de branches dans Git',
      'Créer et naviguer entre les branches',
      'Fusionner des branches avec et sans conflits',
      'Maîtriser les différentes stratégies de fusion'
    ],
    estimatedTime: 75,
    icon: GitBranch,
    lessons: [
      {
        id: 'branches-lesson1',
        title: 'Comprendre les branches',
        type: 'theory',
        duration: 15,
        component: 'BranchAnimator',
        content: `Les branches sont l'une des fonctionnalités les plus puissantes de Git. Elles permettent aux développeurs de travailler sur différentes fonctionnalités ou corrections en parallèle sans interférer les uns avec les autres.

## Qu'est-ce qu'une branche ?

Une branche dans Git est simplement un pointeur mobile vers un commit. Par défaut, Git crée une branche appelée "main" (anciennement "master") lorsque vous initialisez un dépôt.

Techniquement, une branche est juste un fichier léger qui contient le hash SHA-1 du commit auquel elle pointe, ce qui rend la création et la suppression de branches en Git extrêmement rapides.

## Pourquoi utiliser des branches ?

Les branches permettent de :

- **Travailler en parallèle** sur différentes fonctionnalités
- **Isoler les changements** pour éviter d'affecter le code principal
- **Expérimenter** de nouvelles idées sans risque
- **Organiser le travail** en équipe
- **Gérer les versions** et les releases

## Conventions de nommage

Il existe plusieurs conventions pour nommer les branches :

- **feature/*** : Pour les nouvelles fonctionnalités (ex: feature/auth-system)
- **bugfix/*** : Pour les corrections de bugs (ex: bugfix/login-error)
- **hotfix/*** : Pour les corrections urgentes en production (ex: hotfix/security-breach)
- **release/*** : Pour la préparation des versions (ex: release/v1.2.0)

## Branches et flux de travail

Les branches sont au cœur de nombreux flux de travail Git populaires :

- **GitHub Flow** : Un modèle simple avec une branche principale et des branches de fonctionnalités
- **Git Flow** : Un modèle plus complexe avec des branches dédiées pour les développements, releases et hotfixes
- **GitLab Flow** : Un modèle intermédiaire avec des branches d'environnement

Nous explorerons ces workflows plus en détail dans un chapitre ultérieur.`
      },
      {
        id: 'branches-lesson2',
        title: 'Créer et gérer des branches',
        type: 'practice',
        duration: 15,
        component: 'BranchCreator',
        content: `La création et la gestion des branches sont des opérations fondamentales dans Git. Dans cette leçon, nous allons apprendre à manipuler les branches efficacement.

## Lister les branches existantes

Pour voir toutes les branches locales :

\`\`\`bash
git branch
\`\`\`

Pour voir toutes les branches (locales et distantes) :

\`\`\`bash
git branch -a
\`\`\`

## Créer une nouvelle branche

\`\`\`bash
# Crée une nouvelle branche sans changer de branche
git branch nom-de-la-branche

# Crée une nouvelle branche et bascule dessus
git checkout -b nom-de-la-branche

# Alternative avec Git 2.23+ 
git switch -c nom-de-la-branche
\`\`\`

## Basculer entre les branches

\`\`\`bash
# Ancienne syntaxe
git checkout nom-de-la-branche

# Nouvelle syntaxe (Git 2.23+)
git switch nom-de-la-branche
\`\`\`

## Renommer une branche

\`\`\`bash
# Renommer la branche actuelle
git branch -m nouveau-nom

# Renommer une branche spécifique
git branch -m ancien-nom nouveau-nom
\`\`\`

## Supprimer une branche

\`\`\`bash
# Suppression simple (si la branche est déjà fusionnée)
git branch -d nom-de-la-branche

# Suppression forcée (même si la branche n'est pas fusionnée)
git branch -D nom-de-la-branche
\`\`\`

## Bonnes pratiques pour la gestion des branches

1. **Nommez clairement vos branches** : Utilisez des noms descriptifs qui indiquent leur objectif
2. **Gardez les branches à jour** : Synchronisez régulièrement avec la branche principale
3. **Nettoyez les branches obsolètes** : Supprimez les branches qui ont été fusionnées
4. **Une branche, une fonctionnalité** : Chaque branche devrait avoir un objectif clair
5. **Branches de courte durée** : Évitez de garder des branches ouvertes trop longtemps

## Travailler avec des branches distantes

\`\`\`bash
# Pousser une branche locale vers le dépôt distant
git push origin nom-de-la-branche

# Récupérer une branche distante
git checkout -b nom-local origin/nom-distant

# Supprimer une branche distante
git push origin --delete nom-de-la-branche
\`\`\`

Avec ces commandes, vous avez tout ce qu'il faut pour gérer efficacement les branches dans vos projets Git.`
      },
      {
        id: 'branches-lesson3',
        title: 'Fusion de branches',
        type: 'practice',
        duration: 15,
        component: 'MergeSimulator',
        content: `La fusion (merge) est le processus qui permet de combiner les modifications de différentes branches. C'est une opération fondamentale pour intégrer le travail effectué en parallèle.

## Bases de la fusion

Pour fusionner une branche dans votre branche actuelle :

\`\`\`bash
# Assurez-vous d'être sur la branche de destination
git checkout main

# Fusionner une branche dans la branche actuelle
git merge nom-de-la-branche-source
\`\`\`

## Types de fusion

Git effectue différents types de fusion selon la situation :

### 1. Fast-forward merge (fusion avance rapide)

Quand il n'y a pas de nouveaux commits dans la branche de destination depuis la création de la branche source, Git fait simplement avancer le pointeur.

\`\`\`
A---B---C (main)
         \\
          D---E (feature)
\`\`\`

Après la fusion (fast-forward) :

\`\`\`
A---B---C---D---E (main, feature)
\`\`\`

### 2. Recursive merge (fusion récursive)

Quand les deux branches ont divergé, Git crée un nouveau commit de fusion qui combine les deux historiques.

\`\`\`
A---B---C---F (main)
         \\
          D---E (feature)
\`\`\`

Après la fusion (récursive) :

\`\`\`
A---B---C---F---G (main)
         \\     /
          D---E (feature)
\`\`\`

## Options de fusion

\`\`\`bash
# Fusion avec message personnalisé
git merge --edit nom-de-la-branche

# Fusion sans avance rapide (crée toujours un commit de fusion)
git merge --no-ff nom-de-la-branche

# Fusion squash (combine tous les commits en un seul)
git merge --squash nom-de-la-branche
\`\`\`

## Stratégies de fusion

Selon votre workflow et vos préférences, vous pouvez adopter différentes stratégies de fusion :

1. **Fusion standard** : Préserve l'historique complet des branches
2. **Rebase puis fusion** : Crée un historique linéaire
3. **Squash and merge** : Simplifie l'historique en regroupant les commits

## Conseils pour des fusions réussies

- Fusionnez régulièrement la branche principale dans vos branches de fonctionnalités
- Résolvez les conflits au fur et à mesure, pas en une seule fois à la fin
- Testez toujours après une fusion
- Utilisez des outils de fusion graphiques pour les conflits complexes`
      },
      {
        id: 'branches-lesson4',
        title: 'Types de fusion et stratégies',
        type: 'theory',
        duration: 15,
        component: 'MergeTypeComparison',
        content: `Git offre plusieurs approches pour fusionner les branches, chacune avec ses propres avantages et cas d'utilisation. Comprendre ces différentes stratégies vous permet de choisir celle qui convient le mieux à votre workflow.

## 1. Fusion standard (Merge commit)

La fusion standard crée un commit de fusion qui a deux parents. C'est l'approche la plus simple et la plus directe.

\`\`\`bash
git checkout main
git merge feature-branch
\`\`\`

**Avantages**:
- Préserve l'historique complet
- Facile à comprendre et à visualiser
- Conserve le contexte de la branche

**Inconvénients**:
- Peut créer un historique complexe
- Plus de commits dans l'historique

**Idéal pour**: Les fonctionnalités importantes, les branches longues, les équipes qui valorisent l'historique complet.

## 2. Fast-forward merge

Quand il n'y a pas eu de nouveaux commits sur la branche cible depuis que vous avez créé votre branche, Git peut simplement déplacer le pointeur.

\`\`\`bash
git checkout main
git merge feature-branch
\`\`\`

(Git choisit automatiquement fast-forward quand c'est possible)

Pour l'éviter forcément:

\`\`\`bash
git merge --no-ff feature-branch
\`\`\`

**Avantages**:
- Crée un historique linéaire
- Pas de commits de fusion supplémentaires
- Histoire propre et directe

**Inconvénients**:
- Perd l'information sur l'existence de la branche
- Impossible si la branche cible a avancé

**Idéal pour**: Petites corrections, branches de courte durée, développement solo.

## 3. Squash and merge

Cette approche combine tous les commits de la branche source en un seul commit avant de l'appliquer à la branche cible.

\`\`\`bash
git checkout main
git merge --squash feature-branch
git commit -m "Feature: Add user authentication"
\`\`\`

**Avantages**:
- Historique très propre
- Un seul commit par fonctionnalité
- Facile à annuler si nécessaire

**Inconvénients**:
- Perd l'historique détaillé
- Perd le contexte des décisions de développement

**Idéal pour**: Nettoyage de l'historique, intégration de branches expérimentales, fonctionnalités qui nécessitent beaucoup de petits commits.

## 4. Rebase et merge

Le rebase réécrit l'historique en rejouant les commits de votre branche après les commits de la branche cible.

\`\`\`bash
git checkout feature-branch
git rebase main
git checkout main
git merge feature-branch  # Sera un fast-forward merge
\`\`\`

**Avantages**:
- Crée un historique parfaitement linéaire
- Évite les commits de fusion
- Très propre et lisible

**Inconvénients**:
- Réécrit l'historique (problématique pour les branches partagées)
- Plus complexe à comprendre
- Peut créer des conflits difficiles

**Idéal pour**: Équipes qui préfèrent un historique linéaire, avant de pousser des branches locales non partagées.

## Choisir la bonne stratégie

Le choix de la stratégie dépend de plusieurs facteurs:
- La culture et les préférences de votre équipe
- La complexité et la durée de vie de la branche
- Si la branche est partagée avec d'autres
- L'importance de maintenir un historique détaillé

Beaucoup d'équipes adoptent une convention, par exemple:
- Fast-forward pour les petits correctifs
- Merge commit pour les fonctionnalités
- Squash pour les branches expérimentales ou très fragmentées`
      },
      {
        id: 'branches-lesson5',
        title: 'Résolution de conflits',
        type: 'practice',
        duration: 15,
        component: 'ConflictResolver',
        content: `Les conflits de fusion surviennent lorsque Git ne peut pas automatiquement intégrer les changements de deux branches. Cela se produit généralement quand les mêmes lignes d'un fichier ont été modifiées différemment dans les branches que vous essayez de fusionner.

## Pourquoi les conflits surviennent

Les conflits se produisent généralement dans ces situations:
- Deux développeurs modifient les mêmes lignes d'un fichier
- Un développeur supprime un fichier tandis qu'un autre le modifie
- Deux développeurs ajoutent un fichier avec le même nom mais un contenu différent

## Anatomie d'un conflit

Quand Git rencontre un conflit, il modifie les fichiers concernés en ajoutant des marqueurs de conflit:

\`\`\`
<<<<<<< HEAD
Votre version (branche actuelle)
=======
Version entrante (branche que vous essayez de fusionner)
>>>>>>> feature-branch
\`\`\`

## Étapes de résolution de conflits

1. **Identifiez les fichiers en conflit**:
   \`git status\` montrera "both modified" pour ces fichiers

2. **Ouvrez les fichiers en conflit** dans votre éditeur de texte

3. **Choisissez les modifications à conserver**:
   - Gardez votre version
   - Gardez la version entrante
   - Combinez les deux versions
   - Écrivez quelque chose de complètement nouveau

4. **Supprimez les marqueurs de conflit** (<<<<<<< HEAD, =======, >>>>>>> feature-branch)

5. **Ajoutez les fichiers résolus à la zone de staging**:
   \`git add <fichier-résolu>\`

6. **Terminez la fusion**:
   \`git commit\`

## Outils de résolution de conflits

Plusieurs outils peuvent faciliter la résolution de conflits:

- **Éditeurs de code**: VS Code, Sublime Text, etc. offrent une interface visuelle
- **Outils dédiés**: GitKraken, Sourcetree, etc.
- **Outil intégré de Git**: \`git mergetool\`

## Conseils pour éviter les conflits

1. **Communiquez avec votre équipe** sur qui travaille sur quoi
2. **Faites des commits petits et fréquents** 
3. **Fusionnez régulièrement** la branche principale dans vos branches de fonctionnalités
4. **Structurez votre code** pour minimiser les chevauchements
5. **Utilisez des fichiers de configuration** pour les paramètres qui changent souvent

## S'entraîner à la résolution de conflits

La meilleure façon de maîtriser la résolution de conflits est de s'y exercer. Créez délibérément des situations de conflit dans un dépôt de test pour vous familiariser avec le processus.`
      },
      {
        id: 'branches-lesson6',
        title: 'Techniques avancées avec les branches',
        type: 'theory',
        duration: 15,
        component: 'BranchSandbox',
        content: `Une fois que vous avez maîtrisé les bases des branches et des fusions, vous pouvez explorer des techniques plus avancées qui rendront votre flux de travail Git encore plus puissant.

## Cherry-picking

Le "cherry-picking" vous permet d'appliquer des commits spécifiques d'une branche à une autre.

\`\`\`bash
# Applique le commit abc123 à la branche actuelle
git cherry-pick abc123
\`\`\`

**Cas d'utilisation** : Récupérer un correctif de bug spécifique sans prendre toutes les autres modifications d'une branche.

## Stashing (mise en réserve)

Le "stashing" vous permet de mettre temporairement de côté des modifications non committées pour travailler sur autre chose.

\`\`\`bash
# Sauvegarder les modifications en cours
git stash

# Lister les stashes
git stash list

# Appliquer le dernier stash
git stash apply

# Appliquer et supprimer le dernier stash
git stash pop

# Créer une nouvelle branche à partir d'un stash
git stash branch nouvelle-branche
\`\`\`

**Cas d'utilisation** : Vous devez rapidement basculer de tâche mais votre travail actuel n'est pas prêt à être commité.

## Rebase interactif

Le rebase interactif vous permet de modifier l'historique de votre branche.

\`\`\`bash
git rebase -i HEAD~3  # Pour modifier les 3 derniers commits
\`\`\`

Options disponibles :
- `pick` : utiliser le commit
- `reword` : modifier le message du commit
- `edit` : modifier le contenu du commit
- `squash` : fusionner avec le commit précédent
- `fixup` : comme squash, mais ignorer le message
- `drop` : supprimer le commit

**Cas d'utilisation** : Nettoyer l'historique avant de pousser, combiner plusieurs petits commits en un seul commit logique.

## Branches de suivi

Les branches de suivi sont liées à des branches distantes et facilitent le push/pull.

\`\`\`bash
# Créer une branche qui suit une branche distante
git checkout -b locale origin/distante

# Ou configurer une branche existante pour suivre
git branch -u origin/distante
\`\`\`

**Cas d'utilisation** : Simplifier les opérations push et pull (vous pouvez simplement utiliser `git pull` et `git push` sans arguments).

## Branches orphelines

Les branches orphelines n'ont pas d'historique commun avec le reste du dépôt.

\`\`\`bash
git checkout --orphan nouvelle-branche
\`\`\`

**Cas d'utilisation** : Créer des branches spéciales comme gh-pages pour la documentation ou pour démarrer une nouvelle histoire du projet.

## Worktrees

Les worktrees permettent de travailler sur plusieurs branches simultanément dans différents répertoires.

\`\`\`bash
git worktree add ../path-to-folder branche-à-utiliser
\`\`\`

**Cas d'utilisation** : Travailler sur plusieurs branches simultanément sans avoir à constamment switcher entre elles.

Ces techniques avancées ne sont pas nécessaires pour une utilisation quotidienne de Git, mais elles peuvent être très utiles dans certaines situations et vous donner plus de flexibilité dans la gestion de votre workflow de développement.`
      }
    ],
    quiz: [
      {
        question: 'Quelle commande permet de créer une nouvelle branche ET de basculer dessus ?',
        options: [
          'git branch nouvelle-branche',
          'git checkout -b nouvelle-branche',
          'git switch nouvelle-branche',
          'git create nouvelle-branche'
        ],
        correctAnswer: 1,
        explanation: 'La commande `git checkout -b nouvelle-branche` permet de créer une nouvelle branche et de basculer dessus en une seule opération. C\'est équivalent à exécuter `git branch nouvelle-branche` suivi de `git checkout nouvelle-branche`.'
      },
      {
        question: 'Qu\'est-ce qu\'un "fast-forward merge" dans Git ?',
        options: [
          'Une fusion qui se produit très rapidement',
          'Une fusion où la branche cible n\'a pas de nouveaux commits depuis la création de la branche source',
          'Une fusion qui saute certains commits pour aller plus vite',
          'Une option qui accélère la fusion en ignorant certaines vérifications'
        ],
        correctAnswer: 1,
        explanation: 'Un fast-forward merge se produit lorsque la branche cible (par exemple, main) n\'a pas évolué depuis que vous avez créé votre branche de fonctionnalité. Dans ce cas, Git déplace simplement le pointeur de la branche cible vers le dernier commit de votre branche, sans créer de commit de fusion.'
      },
      {
        question: 'Comment résoudre un conflit de fusion dans Git ?',
        options: [
          'Utiliser git conflict --solve',
          'Supprimer la branche qui cause le conflit et recommencer',
          'Modifier manuellement les fichiers pour supprimer les marqueurs de conflit, puis git add et git commit',
          'Utiliser git stash pour mettre de côté vos changements'
        ],
        correctAnswer: 2,
        explanation: 'Pour résoudre un conflit de fusion, vous devez éditer les fichiers en conflit pour choisir quelles modifications conserver. Vous devez supprimer les marqueurs de conflit (<<<<<<< HEAD, =======, >>>>>>> branche) et faire un git add suivi d\'un git commit pour finaliser la fusion.'
      },
      {
        question: 'Quelle est la principale différence entre "git merge" et "git rebase" ?',
        options: [
          'git merge est plus rapide que git rebase',
          'git rebase est réservé aux administrateurs de dépôt',
          'git merge crée un commit de fusion, git rebase réécrit l\'historique en déplaçant les commits',
          'git merge fonctionne uniquement sur les branches locales'
        ],
        correctAnswer: 2,
        explanation: 'La différence principale est que git merge crée un commit de fusion qui combine les deux branches, préservant ainsi l\'historique exact. En revanche, git rebase réécrit l\'historique en déplaçant vos commits au-dessus des commits de la branche cible, créant ainsi un historique linéaire mais modifiant l\'historique original.'
      },
      {
        question: 'Quelle commande permet de voir toutes les branches du dépôt, y compris les branches distantes ?',
        options: [
          'git branch',
          'git branch -a',
          'git show-branch',
          'git list-branches'
        ],
        correctAnswer: 1,
        explanation: 'La commande `git branch -a` (a pour "all") affiche toutes les branches du dépôt, y compris les branches locales et les branches distantes. Les branches distantes sont généralement préfixées par "remotes/".'
      }
    ]
  },

  // Chapitre 4: Dépôts Distants
  {
    id: 'remote',
    title: 'Dépôts Distants',
    description: 'Apprenez à travailler avec des dépôts distants, à synchroniser votre travail et à collaborer avec d\'autres développeurs.',
    objectives: [
      'Comprendre le concept de dépôts distants',
      'Configurer et gérer des remotes',
      'Pousser et tirer des changements',
      'Synchroniser votre travail avec GitHub'
    ],
    estimatedTime: 60,
    icon: Cloud,
    lessons: [
      {
        id: 'remote-lesson1',
        title: 'Comprendre les dépôts distants',
        type: 'theory',
        duration: 15,
        component: 'RemoteConnectionVisual',
        content: `Les dépôts distants sont des versions de votre projet hébergées sur Internet ou sur un réseau. Ils permettent la collaboration entre développeurs et servent de sauvegarde centralisée.

## Qu'est-ce qu'un dépôt distant ?

Un dépôt distant est simplement une copie de votre dépôt Git stockée sur un serveur accessible via Internet ou un réseau. Les plateformes les plus populaires pour héberger des dépôts distants sont :

- **GitHub**
- **GitLab**
- **Bitbucket**
- **Azure DevOps**

Vous pouvez également configurer votre propre serveur Git.

## Rôles des dépôts distants

Les dépôts distants remplissent plusieurs fonctions essentielles :

1. **Sauvegarde** : Copie sécurisée de votre code
2. **Collaboration** : Permet à plusieurs personnes de travailler sur le même projet
3. **Déploiement** : Point central pour les pipelines CI/CD
4. **Visibilité** : Permet de montrer votre travail (open source)

## Terminologie des dépôts distants

- **Remote** : Une référence à un dépôt distant (par exemple "origin")
- **Upstream** : Généralement le dépôt distant principal ou original
- **Origin** : Nom par défaut du dépôt distant lors d'un clone
- **Fork** : Copie personnelle d'un dépôt distant appartenant à quelqu'un d'autre

## Configurer un dépôt distant

Pour lier un dépôt local à un dépôt distant, vous utilisez la commande :

\`\`\`bash
git remote add <nom> <url>
\`\`\`

Exemple :

\`\`\`bash
git remote add origin https://github.com/username/repository.git
\`\`\`

## Afficher les dépôts distants

Pour voir les remotes configurés :

\`\`\`bash
# Liste les noms des remotes
git remote

# Liste les noms et URLs des remotes
git remote -v
\`\`\`

## Branches distantes

Les branches distantes sont des références à l'état des branches sur vos dépôts distants. Elles ont généralement le format : `<remote>/<branch>`.

Par exemple, `origin/main` fait référence à la branche "main" sur le dépôt distant "origin".

Ces branches sont automatiquement mises à jour lorsque vous communiquez avec le serveur distant, mais vous ne pouvez pas les modifier directement.`
      },
      {
        id: 'remote-lesson2',
        title: 'Pousser et tirer des changements',
        type: 'practice',
        duration: 15,
        component: 'PushPullAnimator',
        content: `Une fois votre dépôt distant configuré, vous devez savoir comment synchroniser votre travail entre votre dépôt local et le dépôt distant. Cela se fait principalement via les commandes "push" et "pull".

## Pousser des changements (git push)

La commande \`push\` envoie vos commits locaux vers le dépôt distant.

**Syntaxe de base** :

\`\`\`bash
git push <remote> <branche>
\`\`\`

**Exemple** :

\`\`\`bash
git push origin main
\`\`\`

**Options utiles** :

\`\`\`bash
# Définir la branche amont et pousser
git push -u origin feature-branch

# Pousser toutes les branches
git push --all origin

# Pousser les tags
git push --tags

# Pousser en forçant (à utiliser avec précaution !)
git push --force
\`\`\`

## Tirer des changements (git pull)

La commande \`pull\` récupère les modifications du dépôt distant et les fusionne dans votre branche locale.

**Syntaxe de base** :

\`\`\`bash
git pull <remote> <branche>
\`\`\`

**Exemple** :

\`\`\`bash
git pull origin main
\`\`\`

La commande \`git pull\` est en fait une combinaison de deux opérations:
1. \`git fetch\`: Télécharge les modifications du dépôt distant
2. \`git merge\`: Fusionne ces modifications dans votre branche locale

**Options utiles** :

\`\`\`bash
# Pull avec rebase au lieu de merge
git pull --rebase origin main

# Pull sans fusionner automatiquement
git pull --no-commit origin main
\`\`\`

## Fetch vs Pull

La commande \`git fetch\` télécharge les données du dépôt distant mais ne les fusionne pas automatiquement :

\`\`\`bash
# Récupérer les mises à jour d'un remote spécifique
git fetch origin

# Récupérer les mises à jour de tous les remotes
git fetch --all
\`\`\`

Après un \`fetch\`, vous pouvez :
- Examiner les changements avant de les fusionner
- Fusionner manuellement avec \`git merge origin/main\`
- Faire un rebase avec \`git rebase origin/main\`

## Bonnes pratiques

- Faites un \`pull\` avant de commencer à travailler et avant de faire un \`push\`
- Committez localement souvent, mais poussez uniquement du code fonctionnel
- Utilisez des branches pour les fonctionnalités en cours de développement
- Vérifiez toujours ce que vous poussez avec \`git status\``
      },
      {
        id: 'remote-lesson3',
        title: 'Branches distantes',
        type: 'theory',
        duration: 15,
        content: `Les branches distantes sont des références à l'état des branches dans le dépôt distant. Elles vous permettent de suivre les changements dans le dépôt distant sans modifier votre code local.

**Visualiser les branches distantes**

\`\`\`bash
# Voir toutes les branches (locales et distantes)
git branch -a

# Voir uniquement les branches distantes
git branch -r
\`\`\`

Les branches distantes apparaissent généralement sous la forme \`origin/nom-de-branche\`.

## Créer et publier des branches

### Publier une branche locale

\`\`\`bash
# Pousser une branche locale vers le dépôt distant
git push -u origin nom-de-branche
\`\`\`

L'option \`-u\` (ou \`--set-upstream\`) configure la branche locale pour qu'elle suive la branche distante correspondante.

### Récupérer et suivre une branche distante

\`\`\`bash
# Créer une branche locale basée sur une branche distante
git checkout -b nom-de-branche origin/nom-de-branche

# Alternative plus récente (Git 2.23+)
git switch -c nom-de-branche origin/nom-de-branche

# Ou simplement (crée automatiquement une branche de suivi)
git checkout nom-de-branche
\`\`\`

## Relations de suivi (tracking)

Une branche de suivi est une branche locale qui a une relation directe avec une branche distante. Cela vous permet d'utiliser \`git pull\` et \`git push\` sans avoir à spécifier la branche distante.

\`\`\`bash
# Vérifier les relations de suivi
git branch -vv

# Configurer une branche existante pour suivre une branche distante
git branch -u origin/nom-de-branche
\`\`\`

## Supprimer des branches distantes

\`\`\`bash
# Supprimer une branche du dépôt distant
git push origin --delete nom-de-branche

# Alternative
git push origin :nom-de-branche
\`\`\`

## Nettoyer les références obsolètes

Quand une branche distante a été supprimée du serveur, votre dépôt local garde encore une référence à elle. Pour nettoyer ces références :

\`\`\`bash
# Voir les branches distantes qui n'existent plus sur le serveur
git remote prune origin --dry-run

# Supprimer les références aux branches distantes qui n'existent plus
git remote prune origin

# Ou lors d'un fetch
git fetch --prune
\`\`\`

## Stratégies de branchement avec les dépôts distants

1. **Branche par fonctionnalité** : Chaque fonctionnalité a sa propre branche, poussée régulièrement sur le dépôt distant pour sauvegarde et collaboration.

2. **Intégration continue** : Fusionnez fréquemment des petites modifications dans la branche principale.

3. **Branches longues** : Maintenez des branches parallèles (par exemple, développement, test, production) et faites remonter les changements progressivement.`
      },
      {
        id: 'remote-lesson4',
        title: 'Synchronisation et résolution de problèmes',
        type: 'practice',
        duration: 15,
        component: 'SyncStatusIndicator',
        content: `La synchronisation entre dépôts locaux et distants peut parfois poser des défis. Dans cette leçon, nous aborderons les problèmes courants et leurs solutions.

## États de synchronisation

Votre branche locale par rapport à sa branche distante peut être dans l'un de ces états :

1. **À jour** : Identique à la branche distante
2. **En avance** : Votre branche locale a des commits que la branche distante n'a pas
3. **En retard** : La branche distante a des commits que votre branche locale n'a pas
4. **Divergée** : Les deux branches ont des commits uniques

## Vérifier l'état de synchronisation

\`\`\`bash
# Affiche la relation entre branches locales et distantes
git branch -vv

# Vérifier si des changements distants existent
git fetch --dry-run

# Voir la différence entre local et distant
git log HEAD..origin/main  # Commits présents dans origin/main mais pas dans HEAD
git log origin/main..HEAD  # Commits présents dans HEAD mais pas dans origin/main
\`\`\`

## Problèmes courants et solutions

### 1. Rejet du push (non-fast-forward)

**Problème** : \`error: failed to push some refs to 'remote-url'\`

**Cause** : La branche distante a avancé et votre branche locale est désynchronisée.

**Solutions** :
\`\`\`bash
# Option 1: Pull puis push
git pull
git push

# Option 2: Pull avec rebase puis push
git pull --rebase
git push

# Option 3: Force push (DANGER - à éviter sur les branches partagées)
git push --force
\`\`\`

### 2. Conflits lors du pull

**Problème** : Conflits pendant un \`git pull\`

**Solutions** :
\`\`\`bash
# Annuler le pull en cours
git merge --abort

# Alternative: récupérer sans fusionner pour examiner
git fetch
git diff origin/main
# puis décider de la stratégie (merge ou rebase)
\`\`\`

### 3. Branche divergente

**Problème** : Votre branche et la branche distante ont toutes deux de nouveaux commits

**Solutions** :
\`\`\`bash
# Option 1: Créer un commit de fusion
git pull

# Option 2: Rebase pour linéariser l'historique
git pull --rebase
\`\`\`

### 4. Changements locaux non committés

**Problème** : Vous avez des modifications locales non commitées et vous voulez pull

**Solutions** :
\`\`\`bash
# Option 1: Committer vos changements
git commit -am "Message"
git pull

# Option 2: Stasher temporairement
git stash
git pull
git stash pop

# Option 3: Pull malgré les changements (si pas de conflit)
git pull --autostash
\`\`\`

## Bonnes pratiques pour éviter les problèmes

1. **Pull fréquemment** pour rester synchronisé
2. **Push régulièrement** pour partager vos changements
3. **Utilisez des branches de fonctionnalités** pour isoler les changements
4. **Communiquez avec votre équipe** sur qui travaille sur quoi
5. **Configurez des hooks** pour vérifier avant de push/pull`
      }
    ],
    quiz: [
      {
        question: 'Comment créer une nouvelle branche appelée "feature" et basculer dessus immédiatement ?',
        options: [
          'git branch feature; git checkout feature',
          'git checkout -b feature',
          'git switch feature --create',
          'git new-branch feature'
        ],
        correctAnswer: 1,
        explanation: 'La commande `git checkout -b feature` est un raccourci qui combine la création d\'une nouvelle branche et le basculement sur cette branche. C\'est équivalent à exécuter `git branch feature` suivi de `git checkout feature`.'
      },
      {
        question: 'Quelle commande permet d\'envoyer une branche locale "feature" vers le dépôt distant pour la première fois ?',
        options: [
          'git push origin feature',
          'git push -u origin feature',
          'git upload feature',
          'git publish origin feature'
        ],
        correctAnswer: 1,
        explanation: 'La commande `git push -u origin feature` pousse la branche "feature" vers le dépôt distant "origin" et configure la branche locale pour suivre la branche distante (grâce à l\'option -u ou --set-upstream).'
      },
      {
        question: 'Quel est le résultat de la commande `git pull` ?',
        options: [
          'Elle pousse vos changements locaux vers le dépôt distant',
          'Elle récupère les derniers changements distants sans les fusionner',
          'Elle récupère les derniers changements distants et les fusionne dans votre branche locale',
          'Elle crée une nouvelle branche basée sur la branche distante'
        ],
        correctAnswer: 2,
        explanation: 'La commande `git pull` est en fait une combinaison de deux commandes : `git fetch` qui récupère les derniers changements du dépôt distant, suivi de `git merge` qui fusionne ces changements dans votre branche locale actuelle.'
      },
      {
        question: 'Comment supprimer une branche distante nommée "old-feature" ?',
        options: [
          'git branch -d origin/old-feature',
          'git delete-branch old-feature',
          'git push origin --delete old-feature',
          'git remove old-feature --remote'
        ],
        correctAnswer: 2,
        explanation: 'Pour supprimer une branche distante, vous utilisez la commande `git push` avec l\'option `--delete`. La commande complète est `git push origin --delete old-feature`, ce qui demande au dépôt distant "origin" de supprimer la branche "old-feature".'
      },
      {
        question: 'Que se passe-t-il si vous essayez de pousser (push) des changements alors que le dépôt distant a avancé ?',
        options: [
          'Git fusionne automatiquement les changements distants avec les vôtres',
          'Git rejette votre push et vous demande de faire un pull d\'abord',
          'Git écrase les changements distants avec les vôtres',
          'Git crée automatiquement une nouvelle branche pour vos changements'
        ],
        correctAnswer: 1,
        explanation: 'Si le dépôt distant a de nouveaux commits que vous n\'avez pas dans votre branche locale, Git rejettera votre push avec une erreur "non-fast-forward". Vous devrez d\'abord récupérer et fusionner ces changements (avec git pull) avant de pouvoir pousser vos propres modifications.'
      }
    ]
  },

  // Chapitre 5: Collaboration
  {
    id: 'collaboration',
    title: 'Collaboration et Pull Requests',
    description: 'Découvrez comment collaborer efficacement avec d\'autres développeurs en utilisant GitHub, les pull requests et les processus de revue de code.',
    objectives: [
      'Comprendre le modèle de collaboration via Fork',
      'Maîtriser le processus des Pull Requests',
      'Effectuer et recevoir des revues de code',
      'Collaborer efficacement au sein d\'une équipe'
    ],
    estimatedTime: 90,
    icon: Users,
    lessons: [
      {
        id: 'collab-lesson1',
        title: 'Fork vs Clone : Comprendre le modèle de collaboration',
        type: 'theory',
        duration: 15,
        component: 'ForkVsCloneDemo',
        content: `Dans l'écosystème GitHub, il existe deux façons principales d'obtenir une copie d'un dépôt : le fork et le clone. Ces deux méthodes servent des objectifs différents et comprendre leurs distinctions est crucial pour une collaboration efficace.

## Cloner un dépôt

Le clonage consiste à créer une copie locale d'un dépôt distant sur votre machine.

\`\`\`bash
git clone https://github.com/utilisateur/projet.git
\`\`\`

**Caractéristiques du clone** :
- Crée une copie locale du dépôt
- Établit automatiquement une connexion avec le dépôt distant original (origin)
- Vous permet de tirer (pull) et pousser (push) des changements si vous avez les droits d'accès
- Ne crée pas de nouveau dépôt sur GitHub

**Quand utiliser le clone** :
- Vous êtes membre de l'équipe du projet
- Vous avez des droits d'écriture sur le dépôt
- Vous voulez simplement utiliser ou tester localement le projet

## Forker un dépôt

Le fork crée une copie personnelle du dépôt de quelqu'un d'autre sur votre compte GitHub.

**Caractéristiques du fork** :
- Crée une copie complète du dépôt sur votre compte GitHub
- Vous permet d'expérimenter librement sans affecter le projet original
- Reste connecté au dépôt original (appelé "upstream")
- Vous permet de soumettre des contributions au projet original via des Pull Requests

**Quand utiliser le fork** :
- Vous n'êtes pas membre de l'équipe du projet
- Vous souhaitez contribuer à un projet open source
- Vous voulez utiliser le projet comme point de départ pour votre propre version

## Workflow de contribution avec Fork

Le modèle Fork & Pull Request est le workflow standard pour contribuer à des projets open source:

1. **Fork** : Créez votre propre copie du dépôt sur GitHub
2. **Clone** : Clonez votre fork sur votre machine locale
3. **Branch** : Créez une branche pour votre contribution
4. **Commit** : Effectuez vos modifications et committez-les
5. **Push** : Poussez votre branche vers votre fork
6. **Pull Request** : Proposez vos changements au projet original

## Configuration pour travailler avec un fork

Après avoir cloné votre fork, il est conseillé d'ajouter le dépôt original comme remote "upstream" :

\`\`\`bash
git remote add upstream https://github.com/projet-original/repo.git
\`\`\`

Cela vous permet de synchroniser votre fork avec le projet original :

\`\`\`bash
git fetch upstream
git checkout main
git merge upstream/main
\`\`\`

## Avantages de ce modèle

- **Sécurité** : Les contributeurs ne peuvent pas pousser directement sur le dépôt principal
- **Qualité** : Les modifications sont revues avant d'être intégrées
- **Isolation** : Chaque contributeur travaille dans son propre espace
- **Discussion** : Les Pull Requests permettent de discuter des changements

Ce modèle de collaboration décentralisé est l'une des raisons du succès de Git et GitHub dans le domaine de l'open source.`
      },
      {
        id: 'collab-lesson2',
        title: 'Le processus des Pull Requests',
        type: 'practice',
        duration: 20,
        component: 'PRWorkflowSimulator',
        content: `Les Pull Requests (PR) sont au cœur de la collaboration sur GitHub. Elles permettent de proposer des modifications, de discuter des changements potentiels, et de collaborer avant de fusionner le code dans la branche principale.

## Qu'est-ce qu'une Pull Request ?

Une Pull Request est une demande d'intégration de vos modifications dans un dépôt. Elle permet :

- De présenter vos changements de façon structurée
- D'obtenir des retours et commentaires sur votre code
- De discuter et d'itérer sur les modifications
- D'exécuter des tests automatisés
- De fusionner proprement le code après approbation

## Cycle de vie d'une Pull Request

1. **Création** : Vous créez une PR depuis votre branche ou fork vers la branche cible
2. **Revue** : Les maintainers et autres contributeurs examinent vos changements
3. **Discussion** : Échange de commentaires et suggestions d'amélioration
4. **Itération** : Vous apportez des modifications supplémentaires si nécessaire
5. **Approbation** : Les reviewers approuvent les changements
6. **Tests** : Vérification que tous les tests automatisés passent
7. **Fusion** : Les changements sont fusionnés dans la branche cible
8. **Fermeture** : La PR est fermée et archivée

## Créer une Pull Request

Sur GitHub, après avoir poussé une branche vers votre fork ou le dépôt principal :

1. Allez sur le dépôt cible sur GitHub
2. Cliquez sur "Pull Requests" puis "New Pull Request"
3. Sélectionnez la branche base (cible) et la branche compare (vos changements)
4. Vérifiez les différences affichées
5. Cliquez sur "Create Pull Request"
6. Remplissez le titre et la description de la PR
7. Soumettez la PR

## Anatomie d'une bonne Pull Request

### Titre
- Clair et concis
- Décrit la nature du changement
- Suit les conventions du projet (ex: préfixes comme "[FIX]", "[FEATURE]")

### Description
- Explique **pourquoi** le changement est nécessaire
- Décrit **comment** vous avez implémenté la solution
- Liste les **impacts** potentiels
- Mentionne les **issues** liées avec #numéro

### Code
- Changements ciblés et cohérents
- Respecte les standards de code du projet
- Inclut des tests quand c'est pertinent
- Mise à jour de la documentation si nécessaire

## La revue de code

La revue est un aspect crucial des Pull Requests :

- **Objectif** : Améliorer la qualité du code, non pas critiquer le développeur
- **Tone** : Constructif, respectueux et orienté sur le code
- **Portée** : Lisibilité, maintenabilité, performance, sécurité, et fonctionnalité
- **Résultat** : Approbation ou demande de modifications

## Bonnes pratiques

1. **Petites PRs** : Limitez l'étendue des changements pour faciliter la revue
2. **Branche à jour** : Synchronisez régulièrement avec la branche cible
3. **Tests** : Assurez-vous que tous les tests passent avant de soumettre
4. **Self-review** : Relisez vos propres changements avant de demander une revue
5. **Soyez réceptif** : Accueillez les commentaires et adaptez votre code

Les Pull Requests sont plus qu'un simple mécanisme de fusion - elles constituent un forum de discussion, un outil pédagogique et un historique documenté des décisions de conception.`
      },
      {
        id: 'collab-lesson3',
        title: 'Créer et gérer des Pull Requests',
        type: 'practice',
        duration: 20,
        component: 'PullRequestCreator',
        content: `Maintenant que vous comprenez le concept et l'importance des Pull Requests, voyons comment les créer et les gérer efficacement.

## Créer une Pull Request sur GitHub

### Préparation
Avant de créer une PR, assurez-vous que :
- Vos modifications sont commitées
- Votre branche est poussée vers le dépôt distant
- Vos changements sont ciblés et cohérents

### Étapes de création
1. Naviguez vers le dépôt GitHub (votre fork ou le dépôt principal)
2. Vous verrez souvent une suggestion automatique pour créer une PR depuis votre branche récemment poussée
3. Sinon, cliquez sur l'onglet "Pull Requests" puis sur "New Pull Request"
4. Sélectionnez la branche de base (où vos changements seront fusionnés) et votre branche de comparaison
5. Vérifiez les changements affichés dans la vue diff
6. Cliquez sur "Create Pull Request"
7. Remplissez le formulaire avec un titre descriptif et les détails

### Remplir le template de PR

De nombreux projets utilisent des templates de PR. Voici les éléments typiques à inclure :

- **Titre** : Concis et descriptif
- **Description du problème** : Quel problème résolvez-vous ?
- **Solution proposée** : Comment l'avez-vous résolu ?
- **Changements** : Liste des changements principaux
- **Tests** : Comment avez-vous testé ces changements ?
- **Captures d'écran** : Si pertinent (surtout pour les changements UI)
- **Issues liées** : Références aux issues GitHub avec le préfixe # (ex: #123)

## Gérer votre Pull Request

### Répondre aux commentaires
- Répondez à chaque commentaire de manière constructive
- Si vous effectuez des changements demandés, indiquez-le dans la discussion
- Utilisez les suggestions intégrées pour appliquer directement les propositions

### Mettre à jour votre PR
Si vous devez apporter des modifications supplémentaires :

\`\`\`bash
# Sur votre branche locale
git add .
git commit -m "Address review comments"
git push
\`\`\`

La PR sera automatiquement mise à jour.

### Résoudre les conflits

Si des conflits apparaissent avec la branche cible :

\`\`\`bash
# Mettre à jour votre branche locale
git checkout main
git pull

# Retourner sur votre branche et rebaser
git checkout your-branch
git rebase main

# Résoudre les conflits, puis
git add .
git rebase --continue

# Pousser les changements (peut nécessiter --force)
git push --force-with-lease
\`\`\`

**Attention** : N'utilisez `--force` qu'avec précaution et jamais sur des branches partagées principales !

## La revue de code : côté reviewer

Si vous êtes le reviewer d'une PR, voici quelques bonnes pratiques :

1. **Soyez respectueux** : Concentrez-vous sur le code, pas sur la personne
2. **Soyez spécifique** : Expliquez pourquoi quelque chose devrait changer et comment
3. **Hiérarchisez** : Distinguez les problèmes bloquants des suggestions mineures
4. **Posez des questions** : Demandez des clarifications plutôt que de faire des suppositions
5. **Reconnaissez le bon travail** : Les commentaires positifs sont aussi importants

## Finaliser une Pull Request

Une fois la PR approuvée, elle peut être fusionnée. GitHub offre plusieurs options :

1. **Merge commit** : Crée un commit de fusion standard (préserve l'historique)
2. **Squash and merge** : Combine tous les commits en un seul (simplifie l'historique)
3. **Rebase and merge** : Réapplique les commits individuels sur la branche de base (historique linéaire)

Le choix dépend de la politique du projet et de vos préférences d'historique Git.

Après la fusion, n'oubliez pas de supprimer la branche si elle n'est plus nécessaire.`
      },
      {
        id: 'collab-lesson4',
        title: 'Revue de code efficace',
        type: 'practice',
        duration: 15,
        component: 'CodeReviewInterface',
        content: `La revue de code est une pratique essentielle pour maintenir la qualité du code et partager les connaissances au sein d'une équipe. Dans le contexte des Pull Requests, elle joue un rôle crucial.

## Objectifs de la revue de code

1. **Améliorer la qualité** : Identifier les bugs, les failles de sécurité et les problèmes potentiels
2. **Partager les connaissances** : Diffuser la compréhension du code et les bonnes pratiques
3. **Assurer la cohérence** : Maintenir des standards de code uniformes
4. **Mentor** : Aider les développeurs à progresser
5. **Documenter** : Les discussions de revue servent de documentation pour les décisions de conception

## Que rechercher pendant une revue

### Fonctionnalité
- Le code fait-il ce qu'il est censé faire ?
- Les cas limites sont-ils gérés ?
- Y a-t-il des problèmes de performances potentiels ?

### Lisibilité et maintenabilité
- Le code est-il facile à comprendre ?
- Les noms des variables et fonctions sont-ils significatifs ?
- La complexité est-elle justifiée ?

### Sécurité
- Y a-t-il des vulnérabilités potentielles ?
- Les entrées utilisateur sont-elles correctement validées ?
- Les données sensibles sont-elles protégées ?

### Tests
- Le code est-il suffisamment testé ?
- Les tests couvrent-ils les cas normaux et exceptionnels ?
- Les tests sont-ils clairs et maintenables ?

### Style et standards
- Le code suit-il les conventions du projet ?
- La documentation est-elle adéquate ?
- Y a-t-il du code dupliqué ou du code mort ?

## Effectuer une revue constructive

### Communication
- **Soyez spécifique** et référencez des lignes précises
- **Expliquez pourquoi**, pas seulement quoi changer
- **Suggérez des solutions** plutôt que de simplement pointer des problèmes
- **Posez des questions** pour comprendre les intentions
- **Hiérarchisez** vos commentaires par importance

### Tone et approche
- **Séparez les faits des opinions** ("Le test manque un cas limite" vs "Je préférerais une approche différente")
- **Utilisez un langage constructif** ("Ce code pourrait être plus clair en..." plutôt que "Ce code est incompréhensible")
- **Reconnaissez les bons aspects** du code, pas seulement les problèmes
- **Faites des suggestions, pas des exigences** ("Que penses-tu de..." plutôt que "Tu dois...")

## Répondre à une revue de code

Si vous êtes l'auteur du code en cours de revue :

1. **Ne prenez pas les commentaires personnellement** - il s'agit d'améliorer le code, pas de vous critiquer
2. **Soyez ouvert aux suggestions** - même si vous ne les appliquez pas toutes
3. **Expliquez vos choix** quand c'est pertinent
4. **Remerciez pour les commentaires** utiles
5. **Répondez à tous les commentaires**, même si c'est juste pour reconnaître que vous les avez lus

## Outils de revue de code

GitHub offre plusieurs fonctionnalités pour faciliter la revue :

- **Suggestions intégrées** : Les reviewers peuvent proposer des modifications spécifiques
- **Demandes de changements** : Indiquer formellement que des modifications sont nécessaires
- **Approbations** : Valider officiellement les changements
- **Outils de comparaison** : Voir les différences sous différents formats (unifié, côte à côte)
- **Conversations résolues** : Marquer les discussions comme résolues

La revue de code n'est pas seulement un contrôle qualité - c'est une opportunité d'apprentissage collectif qui renforce les compétences de toute l'équipe.`
      },
      {
        id: 'collab-lesson5',
        title: 'Collaboration en équipe',
        type: 'practice',
        duration: 20,
        component: 'CollaborationSimulator',
        content: `La collaboration efficace va au-delà des aspects techniques de Git et GitHub. Elle implique des pratiques de communication, d'organisation et de coordination entre les membres d'une équipe.

## Modèles de collaboration

### 1. Modèle avec accès direct

Dans ce modèle, tous les membres de l'équipe ont un accès en écriture au dépôt principal :

- Les développeurs clonent directement le dépôt principal
- Ils créent des branches pour leurs fonctionnalités
- Les Pull Requests sont utilisées pour la revue de code interne
- Après approbation, les changements sont fusionnés dans la branche principale

**Idéal pour** : Équipes internes et projets privés

### 2. Modèle Fork & Pull

Dans ce modèle (que nous avons vu précédemment) :

- Les contributeurs forkent le dépôt principal
- Ils travaillent sur leur propre fork
- Ils soumettent des Pull Requests depuis leur fork
- Après approbation, les mainteneurs fusionnent les changements

**Idéal pour** : Projets open source et grandes communautés

## Rôles dans une équipe Git

- **Mainteneurs** : Responsables du dépôt principal, examinent les PR et prennent les décisions finales
- **Contributeurs réguliers** : Développeurs actifs qui contribuent régulièrement
- **Contributeurs occasionnels** : Participent périodiquement au projet
- **Reviewers** : Se concentrent sur la revue de code (peuvent se chevaucher avec d'autres rôles)

## Outils de collaboration GitHub

### Issues
- Suivi des bugs, fonctionnalités et tâches
- Références croisées avec les commits et PRs
- Assignations, étiquettes et jalons pour organiser le travail

### Projets GitHub
- Tableaux kanban intégrés
- Organisation des issues en colonnes (À faire, En cours, Terminé)
- Vue d'ensemble sur l'avancement du projet

### Discussions
- Forums structurés pour discuter des idées
- Parfaits pour les décisions de conception et les questions

### Notifications
- Système d'alerte pour rester informé
- Personnalisation par dépôt et type d'activité
- Intégrations avec d'autres plateformes (Slack, email)

## Meilleures pratiques de collaboration

### Communication
- Utilisez des messages de commit clairs et descriptifs
- Documentez les décisions importantes dans les PRs ou les Issues
- Maintenez un fichier README.md à jour avec les informations essentielles
- Signalez tôt les problèmes ou blocages

### Organisation
- Définissez clairement les responsabilités
- Utilisez des branches par fonctionnalité
- Créez des PRs de taille raisonnable (plus faciles à revoir)
- Établissez des conventions de nommage cohérentes

### Synchronisation
- Synchronisez régulièrement avec la branche principale
- Communiquez quand vous travaillez sur des parties qui pourraient se chevaucher
- Faites des réunions de synchronisation si nécessaire

### Qualité du code
- Définissez des standards de code
- Utilisez des outils automatisés (linters, formatters)
- Mettez en place une CI/CD pour les tests automatiques
- Ne jamais fusionner son propre code sans revue (règle des "4 yeux")

## Gestion des conflits

Les conflits font partie intégrante du travail collaboratif. Quelques conseils :

- **Préventif** : Communiquez sur qui travaille sur quoi
- **Proactif** : Synchronisez régulièrement avec la branche principale
- **Résolutif** : Discutez des conflits complexes en personne plutôt que via commentaires
- **Constructif** : Traitez les conflits comme des opportunités d'amélioration, pas comme des problèmes

La collaboration efficace repose autant sur des compétences humaines que techniques. Une bonne communication et des processus clairs sont aussi importants que la maîtrise de Git.`
      }
    ],
    quiz: [
      {
        question: 'Quelle est la principale différence entre forker et cloner un dépôt ?',
        options: [
          'Le fork est plus rapide que le clone',
          'Le clone crée une copie locale sur votre machine, le fork crée une copie sur votre compte GitHub',
          'Le fork permet de modifier le code, le clone est en lecture seule',
          'Le clone fonctionne avec Git, le fork est spécifique à GitHub'
        ],
        correctAnswer: 1,
        explanation: 'Le clone crée une copie locale du dépôt sur votre machine, tandis que le fork crée une copie du dépôt sur votre compte GitHub. Le fork est généralement utilisé pour contribuer à des projets auxquels vous n\'avez pas d\'accès en écriture direct, alors que le clone est simplement une façon d\'obtenir une copie locale d\'un dépôt.'
      },
      {
        question: 'Pourquoi utilise-t-on des Pull Requests au lieu de pousser directement sur la branche principale ?',
        options: [
          'Les Pull Requests sont plus rapides que les pushes directs',
          'Pour permettre la revue de code, la discussion et les tests automatisés avant l\'intégration',
          'Uniquement pour respecter la hiérarchie dans l\'équipe',
          'Les Pull Requests sont obligatoires dans Git'
        ],
        correctAnswer: 1,
        explanation: 'Les Pull Requests créent un espace formel pour la revue de code, la discussion des changements et l\'exécution de tests automatisés avant que le code ne soit intégré dans la branche principale. Cela aide à maintenir la qualité du code et facilite la collaboration entre développeurs.'
      },
      {
        question: 'Comment configurer un dépôt original (upstream) après avoir forké et cloné un projet ?',
        options: [
          'git upstream add https://github.com/original/repo.git',
          'git remote add upstream https://github.com/original/repo.git',
          'git clone --upstream https://github.com/original/repo.git',
          'git fork --connect https://github.com/original/repo.git'
        ],
        correctAnswer: 1,
        explanation: 'Après avoir forké et cloné un projet, vous devez ajouter manuellement le dépôt original comme remote avec la commande `git remote add upstream https://github.com/original/repo.git`. Cela vous permettra de récupérer les mises à jour du projet original avec `git fetch upstream`.'
      },
      {
        question: 'Que devriez-vous faire si un reviewer vous demande des modifications sur votre Pull Request ?',
        options: [
          'Créer une nouvelle Pull Request avec les corrections',
          'Fermer la PR actuelle et en ouvrir une nouvelle',
          'Faire les modifications demandées, commiter et pousser sur la même branche (la PR se mettra à jour automatiquement)',
          'Ignorer les commentaires si vous pensez que votre code est déjà correct'
        ],
        correctAnswer: 2,
        explanation: 'Lorsque des modifications sont demandées sur votre PR, vous devez simplement faire les changements dans votre branche locale, les commiter et les pousser vers la même branche distante. La Pull Request se mettra à jour automatiquement pour refléter ces nouveaux changements, et la conversation peut continuer.'
      },
      {
        question: 'Quelle est la meilleure pratique concernant la taille d\'une Pull Request ?',
        options: [
          'Les PRs devraient toujours être aussi grandes que possible pour réduire leur nombre',
          'Les PRs devraient être de taille moyenne à grande pour montrer votre productivité',
          'Les PRs devraient rester relativement petites et concentrées sur un seul objectif',
          'La taille d\'une PR n\'a aucune importance tant que le code fonctionne'
        ],
        correctAnswer: 2,
        explanation: 'Les Pull Requests devraient idéalement rester relativement petites et concentrées sur un seul objectif ou fonctionnalité. Les petites PRs sont plus faciles à revoir, présentent moins de risques de bugs et peuvent être intégrées plus rapidement. Cela facilite également l\'identification des problèmes si quelque chose ne fonctionne pas comme prévu.'
      }
    ]
  },

  // Chapitre 6: Workflows Git
  {
    id: 'workflows',
    title: 'Workflows Git',
    description: 'Découvrez les différents modèles de workflow Git, leurs avantages et comment les appliquer à vos projets.',
    objectives: [
      'Comprendre les différents modèles de workflow Git',
      'Apprendre à choisir le workflow adapté à chaque projet',
      'Maîtriser Git Flow, GitHub Flow et GitLab Flow',
      'Mettre en place un workflow CI/CD avec GitHub Actions'
    ],
    estimatedTime: 60,
    icon: GitBranch,
    lessons: [
      {
        id: 'workflows-lesson1',
        title: 'Comprendre les différents workflows Git',
        type: 'theory',
        duration: 15,
        component: 'WorkflowComparisonTable',
        content: `Un workflow Git est une recette ou un ensemble de règles qui décrit comment utiliser Git pour accomplir un travail de manière cohérente et productive. Le choix d'un workflow approprié peut grandement améliorer la collaboration et la qualité du code.

## Pourquoi les workflows sont importants

Les workflows Git structurent la façon dont une équipe :
- Organise les branches
- Intègre les changements
- Déploie le code
- Gère les versions

Un bon workflow doit :
- S'adapter à la taille et aux besoins de l'équipe
- Être simple à comprendre et à suivre
- Faciliter la collaboration sans créer de frictions
- Garantir la stabilité du code en production

## Principaux modèles de workflow

### 1. Workflow centralisé

Le modèle le plus simple, similaire aux anciens systèmes comme SVN.

**Caractéristiques** :
- Une seule branche (généralement main)
- Tous les développeurs commitent directement sur cette branche
- Pas de branches de fonctionnalités

**Avantages** : Simple, facile à comprendre
**Inconvénients** : Conflits fréquents, difficile d'isoler les fonctionnalités en cours de développement

**Adapté pour** : Très petites équipes, projets simples ou personnels

### 2. GitHub Flow

Un workflow léger et centré sur les branches de fonctionnalités.

**Caractéristiques** :
- Branche principale toujours déployable
- Création de branches pour chaque nouvelle fonctionnalité
- Pull requests pour la revue de code
- Merge et déploiement après approbation

**Avantages** : Simple, adapté à l'intégration continue et au déploiement continu (CI/CD)
**Inconvénients** : Moins adapté à la gestion de multiples versions en production

**Adapté pour** : Équipes de petite à moyenne taille, projets web avec déploiement continu

### 3. Git Flow

Un modèle plus structuré pour la gestion des releases.

**Caractéristiques** :
- Deux branches principales : main (production) et develop (développement)
- Branches de fonctionnalités, de release et de hotfix
- Processus strict pour les fusions entre branches

**Avantages** : Structure claire, support pour plusieurs versions en parallèle
**Inconvénients** : Plus complexe, peut être lourd pour certains projets

**Adapté pour** : Équipes moyennes à grandes, logiciels avec cycles de release planifiés

### 4. GitLab Flow

Un modèle intermédiaire qui introduit des branches d'environnement.

**Caractéristiques** :
- Branche principale et branches d'environnement (staging, production)
- Les changements progressent d'une branche à l'autre
- Combine la simplicité du GitHub Flow avec certains aspects du Git Flow

**Avantages** : Flexibilité, bon support pour différents environnements
**Inconvénients** : Nécessite une bonne compréhension des environnements

**Adapté pour** : Projets avec plusieurs environnements de déploiement

## Choisir le bon workflow

Pour choisir le workflow adapté à votre projet, considérez :

1. **Taille de l'équipe** : Plus l'équipe est grande, plus la structure doit être claire
2. **Fréquence de déploiement** : Le déploiement continu favorise des workflows plus légers
3. **Nature du projet** : Applications web vs logiciels packagés
4. **Gestion des versions** : Besoin de maintenir plusieurs versions en parallèle

Il n'existe pas de workflow "parfait" - le meilleur est celui qui s'adapte aux besoins spécifiques de votre équipe et de votre projet.`
      },
      {
        id: 'workflows-lesson2',
        title: 'GitHub Flow : simplicité et efficacité',
        type: 'practice',
        duration: 15,
        component: 'WorkflowSimulator',
        workflowType: 'github-flow',
        content: `Le GitHub Flow est un workflow léger et axé sur les branches qui a été conçu pour faciliter l'intégration continue et le déploiement continu. Créé par GitHub, il se concentre sur la simplicité et la régularité des déploiements.

## Principes du GitHub Flow

1. **Tout ce qui est dans la branche \`main\` est déployable**
2. **Créez des branches nommées et descriptives à partir de \`main\`**
3. **Poussez régulièrement vers votre branche distante**
4. **Ouvrez une Pull Request dès que vous êtes prêt pour des commentaires**
5. **Fusionnez dans \`main\` après approbation de la revue**
6. **Déployez immédiatement après la fusion**

## Étapes détaillées du GitHub Flow

### 1. Créer une branche

Commencez toujours par créer une branche à partir de \`main\` pour toute nouvelle fonctionnalité ou correction.

\`\`\`bash
git checkout main
git pull
git checkout -b feature-nom-descriptif
\`\`\`

Utilisez un nom descriptif qui reflète ce que vous développez.

### 2. Ajouter des commits

Travaillez sur votre branche et faites des commits réguliers qui documentent votre progression.

\`\`\`bash
git add .
git commit -m "Description claire de la modification"
\`\`\`

Poussez régulièrement vers votre branche distante pour sauvegarder votre travail.

\`\`\`bash
git push -u origin feature-nom-descriptif
\`\`\`

### 3. Ouvrir une Pull Request

Dès que vous avez quelque chose à montrer ou à discuter, même si ce n'est pas terminé, ouvrez une Pull Request sur GitHub.

Une PR précoce permet :
- D'obtenir des retours tôt
- De discuter de l'approche avant d'investir trop de temps
- D'informer l'équipe de ce sur quoi vous travaillez

Ajoutez l'étiquette "WIP" (Work in Progress) si la PR n'est pas encore prête à être fusionnée.

### 4. Discuter et affiner

La PR devient le lieu de discussion pour la fonctionnalité. Les reviewers peuvent commenter, suggérer des modifications et poser des questions.

Continuez à pousser des commits sur votre branche en réponse aux commentaires. La PR se mettra à jour automatiquement.

### 5. Déployer et tester

De nombreuses équipes utilisant GitHub Flow déploient automatiquement ou manuellement les branches de fonctionnalités dans un environnement de test pour vérification.

GitHub facilite cela avec des intégrations CI/CD et des environnements de prévisualisation.

### 6. Fusionner

Une fois que la PR est approuvée et que tous les tests passent, la branche peut être fusionnée dans \`main\`.

GitHub offre plusieurs options pour la fusion :
- **Merge commit** : Préserve l'historique des branches
- **Squash and merge** : Combine tous les commits en un seul
- **Rebase and merge** : Maintient un historique linéaire

### 7. Déployer

Dès que la fusion est effectuée, la nouvelle version de \`main\` est déployée en production.

Ce déploiement rapide est au cœur de la philosophie du GitHub Flow - les changements sont petits, bien testés, et mis en production rapidement.

## Avantages du GitHub Flow

- **Simplicité** : Facile à comprendre et à suivre
- **Flexibilité** : S'adapte bien aux projets en évolution rapide
- **Intégration continue** : Favorise des tests et déploiements fréquents
- **Visibilité** : Les PRs donnent une visibilité claire sur ce qui est en cours

## Limites du GitHub Flow

- **Gestion des versions** : Moins adapté aux projets nécessitant de maintenir plusieurs versions
- **Complexité** : Peut devenir difficile à gérer avec de très grandes équipes
- **Dépendance à la CI** : Nécessite une bonne suite de tests automatisés

Le GitHub Flow excelle dans les environnements qui valorisent l'itération rapide et le déploiement continu, comme les applications web et les services en ligne.`
      },
      {
        id: 'workflows-lesson3',
        title: 'Git Flow et GitLab Flow',
        type: 'practice',
        duration: 15,
        component: 'WorkflowSimulator',
        workflowType: 'git-flow',
        content: `Après avoir vu GitHub Flow, explorons deux autres workflows populaires : Git Flow et GitLab Flow. Ces alternatives offrent différents niveaux de structure et sont adaptées à différents types de projets.

## Git Flow : Un workflow pour les releases planifiées

Git Flow a été introduit par Vincent Driessen en 2010 et propose une structure de branches rigoureuse adaptée aux projets avec des cycles de release bien définis.

### Structure de branches dans Git Flow

- **main** : Code en production, stable
- **develop** : Branche d'intégration pour les développements en cours
- **feature/*** : Branches pour les nouvelles fonctionnalités (partent de develop)
- **release/*** : Branches de préparation des releases (partent de develop)
- **hotfix/*** : Branches pour les correctifs urgents en production (partent de main)

### Flux de travail Git Flow

1. **Développement de fonctionnalité**
   \`\`\`bash
   git checkout develop
   git checkout -b feature/nouvelle-fonctionnalite
   # Travail sur la fonctionnalité...
   git checkout develop
   git merge feature/nouvelle-fonctionnalite
   git branch -d feature/nouvelle-fonctionnalite
   \`\`\`

2. **Préparation d'une release**
   \`\`\`bash
   git checkout develop
   git checkout -b release/1.0.0
   # Corrections de bugs mineurs, préparation de la release...
   git checkout main
   git merge release/1.0.0
   git tag -a v1.0.0 -m "Version 1.0.0"
   git checkout develop
   git merge release/1.0.0
   git branch -d release/1.0.0
   \`\`\`

3. **Correction d'un bug urgent (hotfix)**
   \`\`\`bash
   git checkout main
   git checkout -b hotfix/bug-critique
   # Correction du bug...
   git checkout main
   git merge hotfix/bug-critique
   git tag -a v1.0.1 -m "Version 1.0.1"
   git checkout develop
   git merge hotfix/bug-critique
   git branch -d hotfix/bug-critique
   \`\`\`

### Avantages de Git Flow
- Structure claire et bien définie
- Support pour plusieurs versions en parallèle
- Gestion propre des hotfixes
- Adapté aux logiciels avec des versions distinctes

### Inconvénients de Git Flow
- Plus complexe et cérébral
- Peut être lourd pour des projets web à déploiement continu
- Nombreuses branches à gérer

## GitLab Flow : Un compromis pragmatique

GitLab Flow est né de la volonté de combiner la simplicité du GitHub Flow avec certains aspects structurés du Git Flow, tout en ajoutant la notion de branches d'environnement.

### Structure de branches dans GitLab Flow

- **main** : Branche principale de développement
- **branches de fonctionnalité** : Pour le développement de nouvelles fonctionnalités
- **branches d'environnement** : Représentent les différents environnements (staging, production, etc.)

### Variantes de GitLab Flow

#### 1. Avec branches d'environnement
\`\`\`
main → staging → production
\`\`\`
Les changements progressent de gauche à droite après validation à chaque étape.

#### 2. Avec branches de version
Pour les projets nécessitant le maintien de plusieurs versions:
\`\`\`
main → v1.0 → v1.1
     ↘ v2.0
\`\`\`

### Flux de travail GitLab Flow

1. **Développement de fonctionnalité**
   \`\`\`bash
   git checkout main
   git checkout -b feature-x
   # Développement...
   # Création d'une MR (Merge Request) vers main
   \`\`\`

2. **Promotion vers les environnements**
   \`\`\`bash
   git checkout staging
   git merge main
   # Tests dans l'environnement de staging...
   
   git checkout production
   git merge staging
   # Déploiement en production
   \`\`\`

### Avantages de GitLab Flow
- Plus simple que Git Flow mais plus structuré que GitHub Flow
- Bonne prise en charge des environnements multiples
- Adapté aux déploiements progressifs
- Flexible et adaptable

### Inconvénients de GitLab Flow
- Peut nécessiter plus de fusion manuelle
- Légèrement plus complexe que GitHub Flow
- Nécessite une bonne compréhension des environnements

## Choisir le bon workflow

Chaque workflow a ses forces et ses cas d'utilisation optimaux :

1. **GitHub Flow** : Applications web, déploiement continu, petites équipes
2. **Git Flow** : Logiciels avec versions multiples, équipes plus grandes, cycles de release planifiés
3. **GitLab Flow** : Projets avec déploiements progressifs, équipes qui ont besoin d'un juste milieu

Quelle que soit votre choix, l'essentiel est que toute l'équipe comprenne et suive le même workflow de façon cohérente.`
      },
      {
        id: 'workflows-lesson4',
        title: 'Concevoir votre propre workflow',
        type: 'practice',
        duration: 15,
        component: 'FlowDiagramBuilder',
        content: `Même si les workflows standard comme GitHub Flow et Git Flow sont excellents points de départ, chaque équipe et chaque projet ont des besoins uniques. Cette leçon vous aidera à adapter ou concevoir un workflow Git qui répond parfaitement à vos besoins.

## Évaluer vos besoins

Avant de concevoir votre workflow, posez-vous ces questions :

1. **Taille de l'équipe** : Combien de personnes contribuent au code ?
2. **Fréquence de déploiement** : Déploiements continus ou releases planifiées ?
3. **Environnements** : Combien d'environnements différents (dev, staging, production, etc.) ?
4. **Versions** : Devez-vous maintenir plusieurs versions en parallèle ?
5. **Intégration continue** : Quel est votre processus de test et d'assurance qualité ?
6. **Compétence de l'équipe** : Quel est le niveau de familiarité avec Git ?

## Composants d'un workflow Git

Un workflow Git se compose généralement de ces éléments que vous pouvez personnaliser :

### 1. Structure de branches

- **Branches principales** : Définissez vos branches permanentes (main, develop, etc.)
- **Branches temporaires** : Comment nommer et organiser les branches de fonctionnalités, corrections, etc.
- **Convention de nommage** : Établissez un système clair (ex: feature/nom, bugfix/description)

### 2. Processus d'intégration

- **Mécanisme de revue** : Pull Requests ? Revue par pair direct ?
- **Critères de fusion** : Approbations requises, tests à passer
- **Stratégie de fusion** : Merge, rebase, ou squash ?

### 3. Gestion des versions

- **Système de tagging** : Comment et quand créer des tags
- **Branches de release** : Nécessaires ou non ?
- **Politique de hotfix** : Processus pour les corrections urgentes

### 4. Automation

- **Intégration continue** : Tests automatiques, linting
- **Déploiement continu** : Déploiement automatique après fusion ?
- **Hooks** : Actions automatiques sur certains événements

## Exemples de workflows personnalisés

### Workflow "Trunk-based" simplifié

Adapté pour les petites équipes avec déploiement continu :

- Branche principale: **main**
- Toutes les fonctionnalités dans des branches courtes (1-2 jours max)
- Revue de code via PR avec au moins 1 approbation
- Intégration continue sur toutes les branches
- Déploiement automatique après fusion dans main
- Utilisation de feature flags pour les fonctionnalités en cours

### Workflow "Environnement-first"

Pour les projets avec multiples environnements et déploiements progressifs :

- Branches d'environnement: **dev** → **staging** → **production**
- Branches de fonctionnalités fusionnées dans **dev**
- Promotion progressive des changements d'un environnement à l'autre
- Branches de release créées à partir de **staging** avant promotion en production
- Tags automatiques sur production

### Workflow "Stable versions"

Pour les projets nécessitant des versions stables maintenues en parallèle :

- Branche principale: **develop**
- Branches de version: **v1.x**, **v2.x**, etc.
- Branches de fonctionnalités fusionnées dans **develop**
- Branches de release préparées depuis **develop**
- Hotfixes appliqués à la fois sur la branche de version et **develop**

## Documenter et implémenter votre workflow

Une fois votre workflow conçu :

1. **Documentez-le clairement** : Créez un guide avec diagrammes
2. **Partagez avec l'équipe** : Assurez-vous que tout le monde comprend
3. **Automatisez ce qui peut l'être** : GitHub Actions, hooks Git, etc.
4. **Intégrez-le à vos outils** : Configuration de GitHub/GitLab, protection de branches
5. **Restez flexible** : Adaptez le workflow au fil du temps selon les retours

## Mesurer l'efficacité de votre workflow

Pour évaluer si votre workflow fonctionne bien :

- **Temps de cycle** : Combien de temps entre l'idée et le déploiement ?
- **Fréquence des conflits** : Les fusions sont-elles généralement fluides ?
- **Stabilité** : Combien de régressions après déploiement ?
- **Satisfaction de l'équipe** : Les développeurs trouvent-ils le processus clair et efficace ?

N'hésitez pas à ajuster votre workflow en fonction de ces métriques et des retours de l'équipe.`
      }
    ],
    quiz: [
      {
        question: 'Quelle est la caractéristique principale du GitHub Flow ?',
        options: [
          'Il utilise de nombreuses branches spécialisées comme develop, release et hotfix',
          'Tout ce qui est dans la branche main est déployable et les nouvelles fonctionnalités sont développées dans des branches dédiées',
          'Il se concentre principalement sur les branches d\'environnement comme staging et production',
          'Il nécessite l\'utilisation d\'un outil spécifique fourni par GitHub'
        ],
        correctAnswer: 1,
        explanation: 'GitHub Flow est un workflow léger où la branche main est toujours déployable. Les nouvelles fonctionnalités sont développées dans des branches dédiées, puis intégrées à main via des Pull Requests après revue. C\'est un modèle simple adapté au déploiement continu.'
      },
      {
        question: 'Quels types de branches sont spécifiques au Git Flow ?',
        options: [
          'main, dev, et prod',
          'main, staging, et production',
          'develop, feature, release, hotfix, et main',
          'main, feature, et bugfix'
        ],
        correctAnswer: 2,
        explanation: 'Git Flow utilise une structure de branches bien définie avec des branches principales (main et develop) et des branches temporaires (feature/*, release/*, et hotfix/*). C\'est un modèle plus formel adapté aux projets avec des cycles de release planifiés.'
      },
      {
        question: 'Quelle est la différence principale entre GitHub Flow et GitLab Flow ?',
        options: [
          'GitLab Flow n\'utilise pas de Pull Requests',
          'GitHub Flow est plus complexe que GitLab Flow',
          'GitLab Flow ajoute des branches d\'environnement ou de version au modèle de GitHub Flow',
          'GitHub Flow est exclusivement pour les projets open source'
        ],
        correctAnswer: 2,
        explanation: 'GitLab Flow est une extension de GitHub Flow qui ajoute le concept de branches d\'environnement (comme production, staging) ou de branches de version. Cela permet une progression plus contrôlée des changements à travers différents environnements.'
      },
      {
        question: 'Dans quel cas le Git Flow est-il particulièrement adapté ?',
        options: [
          'Pour les applications web avec déploiement continu',
          'Pour les projets de petite taille avec une seule personne',
          'Pour les logiciels avec des releases planifiées et plusieurs versions maintenues en parallèle',
          'Uniquement pour les projets qui utilisent GitLab'
        ],
        correctAnswer: 2,
        explanation: 'Git Flow est particulièrement bien adapté aux projets qui ont des cycles de release planifiés et qui doivent maintenir plusieurs versions du logiciel en parallèle. Sa structure de branches formalisée aide à gérer cette complexité, mais peut être excessive pour des projets plus simples.'
      },
      {
        question: 'Quelle pratique est commune à tous les workflows Git bien conçus ?',
        options: [
          'L\'utilisation obligatoire de l\'intégration continue',
          'La protection de la branche principale contre les pushes directs',
          'L\'utilisation d\'au moins 5 types de branches différents',
          'La fusion uniquement par squash'
        ],
        correctAnswer: 1,
        explanation: 'Quel que soit le workflow choisi, la protection de la branche principale (qu\'elle s\'appelle main ou develop) contre les pushes directs est une pratique fortement recommandée. Cela garantit que tous les changements sont correctement revus et testés avant d\'être intégrés, ce qui maintient la stabilité et la qualité du code.'
      }
    ]
  },

  // Chapitre 7: Résolution de Problèmes et Annulation (Partie 8 dans le fichier components)
  {
    id: 'undoing',
    title: 'Annulation et Récupération',
    description: 'Apprenez à annuler des changements et à récupérer d\'erreurs dans Git.',
    objectives: [
      'Comprendre les différentes commandes pour annuler des changements',
      'Savoir récupérer des commits et branches perdus',
      'Maîtriser le reflog pour retrouver des états précédents',
      'Apprendre à naviguer dans l\'historique Git'
    ],
    estimatedTime: 60,
    icon: GitCommit,
    lessons: [
      {
        id: 'undoing-lesson1',
        title: 'Commandes d\'annulation',
        type: 'theory',
        duration: 15,
        component: 'UndoCommandComparison',
        content: `Git offre plusieurs façons d'annuler des changements, chacune adaptée à une situation spécifique. Comprendre ces différentes commandes vous aidera à corriger des erreurs sans perdre votre travail.

## Types de changements à annuler

Dans Git, vous pouvez avoir besoin d'annuler différents types de changements :

1. **Modifications non stagées** : Changements dans votre répertoire de travail
2. **Modifications stagées** : Changements ajoutés à l'index mais pas encore committés
3. **Commits récents** : Dernier commit ou série de commits récents
4. **Pushes** : Changements déjà poussés vers un dépôt distant

## Commandes principales d'annulation

### git checkout / git restore

Pour annuler des modifications non stagées :

\`\`\`bash
# Ancienne syntaxe (toujours fonctionnelle)
git checkout -- fichier.txt

# Nouvelle syntaxe (Git 2.23+)
git restore fichier.txt
\`\`\`

**Attention** : Cette commande supprime définitivement vos modifications locales !

### git reset

Pour désindexer des fichiers (annuler git add) :

\`\`\`bash
# Désindexer un fichier spécifique
git reset fichier.txt

# Nouvelle syntaxe (Git 2.23+)
git restore --staged fichier.txt
\`\`\`

Pour annuler des commits tout en conservant les modifications :

\`\`\`bash
# Annule le dernier commit mais garde les changements en staging
git reset --soft HEAD~1

# Annule le dernier commit et retire les changements du staging
git reset HEAD~1  # ou git reset --mixed HEAD~1
\`\`\`

Pour annuler des commits et supprimer les modifications :

\`\`\`bash
# ATTENTION : Supprime définitivement les changements !
git reset --hard HEAD~1
\`\`\`

### git revert

Pour créer un nouveau commit qui annule les effets d'un commit précédent :

\`\`\`bash
git revert abc123f
\`\`\`

Cette commande est particulièrement utile pour annuler des changements déjà poussés, car elle ne réécrit pas l'historique.

## Choisir la bonne commande d'annulation

- **git restore / git checkout** : Pour annuler des modifications locales non committées
- **git reset --soft/--mixed** : Pour réorganiser des commits récents (avant push)
- **git reset --hard** : Pour abandonner complètement des changements (à utiliser avec précaution)
- **git revert** : Pour annuler des changements déjà partagés avec d'autres

## Bonnes pratiques pour l'annulation

1. **Faites une sauvegarde** avant d'utiliser des commandes destructives (comme reset --hard)
2. **Vérifiez l'état** avec git status avant et après l'opération
3. **Préférez les méthodes non destructives** quand c'est possible
4. **Utilisez git reflog** (que nous verrons dans la prochaine leçon) pour récupérer des états perdus

N'oubliez pas que la capacité d'annuler des changements de façon sécurisée est l'un des grands avantages de Git. Maîtriser ces commandes vous donne un filet de sécurité qui vous permet d'expérimenter plus librement.`
      },
      {
        id: 'undoing-lesson2',
        title: 'Naviguer dans l\'historique Git',
        type: 'practice',
        duration: 15,
        component: 'TimelineNavigator',
        content: `L'une des forces majeures de Git est sa capacité à vous permettre de "voyager dans le temps" à travers l'historique de votre projet. Cette fonctionnalité est incroyablement utile pour comprendre comment le code a évolué, identifier quand des bugs ont été introduits, ou simplement explorer des états passés du projet.

## Bases de la navigation dans l'historique

### Examiner l'historique

La commande de base pour visualiser l'historique est \`git log\` :

\`\`\`bash
# Afficher l'historique des commits
git log

# Format condensé sur une ligne
git log --oneline

# Avec un graphique de branches
git log --graph --oneline --all
\`\`\`

### Référencer des commits

Git offre plusieurs façons de désigner des commits :

- **Hash SHA-1** : `abc123f` (l'identifiant unique du commit)
- **HEAD** : Le commit actuel sur lequel vous vous trouvez
- **HEAD~n** : n commits avant HEAD (ex: HEAD~3 = 3 commits en arrière)
- **branch-name** : Le dernier commit d'une branche
- **tag-name** : Le commit associé à un tag

### Voyager dans le temps avec checkout

Vous pouvez "voyager dans le temps" en utilisant la commande \`checkout\` pour vous déplacer vers n'importe quel commit :

\`\`\`bash
# Checkout d'un commit spécifique par son hash
git checkout abc123f

# Checkout d'un commit relatif (2 commits avant HEAD)
git checkout HEAD~2

# Checkout d'un tag
git checkout v1.0.0
\`\`\`

Quand vous faites un checkout d'un commit spécifique, Git vous place dans un état appelé "detached HEAD" (HEAD détachée). Cela signifie que vous n'êtes sur aucune branche.

### Que faire en état "detached HEAD" ?

Une fois dans cet état, vous pouvez :

1. **Explorer le code** à ce point dans le temps
2. **Expérimenter** avec des modifications temporaires
3. **Créer une nouvelle branche** à partir de ce point si vous voulez conserver des changements :

\`\`\`bash
git checkout -b nouvelle-branche
\`\`\`

4. **Revenir à une branche** quand vous avez terminé :

\`\`\`bash
git checkout main
\`\`\`

## Techniques avancées de navigation

### Voir les différences entre points dans le temps

\`\`\`bash
# Différence entre deux commits
git diff abc123..def456

# Différence entre l'état actuel et 3 commits en arrière
git diff HEAD~3

# Différence entre deux branches
git diff main..feature-branch
\`\`\`

### Bisect : trouver le commit qui a introduit un bug

Git bisect est un outil puissant pour localiser le commit qui a introduit un problème :

\`\`\`bash
# Démarrer la recherche
git bisect start

# Marquer l'état actuel comme mauvais
git bisect bad

# Indiquer un commit passé connu comme bon
git bisect good v1.0.0

# Git vous déplacera automatiquement entre les commits
# À chaque étape, testez et indiquez :
git bisect good  # si le bug n'est pas présent
# ou
git bisect bad   # si le bug est présent

# Quand terminé (Git aura identifié le commit problématique)
git bisect reset
\`\`\`

### Retrouver l'historique d'une ligne spécifique

Pour comprendre comment une ligne particulière a évolué :

\`\`\`bash
# Voir l'historique d'un fichier
git log -p filename.js

# Voir l'historique d'une fonction/section spécifique
git log -L :functionName:filename.js

# Voir qui a modifié chaque ligne (blame)
git blame filename.js
\`\`\`

## Conseils pour la navigation dans l'historique

1. **Utilisez des outils graphiques** qui facilitent la visualisation (GitKraken, SourceTree, GitHub Desktop)
2. **Créez des tags** pour les points importants de votre historique
3. **Utilisez des messages de commit descriptifs** pour faciliter la navigation
4. **Soyez prudent** en état "detached HEAD" - n'oubliez pas de créer une branche si vous voulez conserver des changements

La capacité de naviguer efficacement dans l'historique Git est une compétence qui vous permettra de mieux comprendre votre code et de résoudre des problèmes plus rapidement.`
      },
      {
        id: 'undoing-lesson3',
        title: 'Récupérer avec reflog',
        type: 'practice',
        duration: 15,
        component: 'ReflogExplorer',
        content: `Git garde une trace de toutes les fois où la référence HEAD change, c'est-à-dire chaque fois que vous changez de branche, faites un commit, un reset ou toute autre opération qui modifie l'état de votre dépôt. Cette trace s'appelle le "reflog" (reference log) et c'est un outil puissant pour récupérer des états qui semblent perdus.

## Qu'est-ce que le reflog ?

Le reflog est comme un journal de toutes vos actions dans Git, enregistrant où se trouvait votre HEAD à chaque étape. Contrairement à l'historique normal des commits (git log), qui montre l'historique du projet, le reflog montre votre historique personnel de navigation et de modification.

### Afficher le reflog

\`\`\`bash
# Afficher le reflog complet
git reflog

# Format plus détaillé
git reflog --date=iso
\`\`\`

Voici un exemple de sortie :

\`\`\`
$ git reflog
abc123f HEAD@{0}: commit: Add new feature
def456g HEAD@{1}: checkout: moving from main to feature-branch
789abch HEAD@{2}: reset: moving to HEAD~1
...
\`\`\`

Chaque entrée inclut :
- Le hash SHA-1 abrégé du commit
- Une référence comme `HEAD@{0}` (indiquant la position dans le reflog)
- L'action qui a été effectuée
- Des détails supplémentaires sur l'action

## Récupération avec le reflog

Le reflog est particulièrement utile dans ces situations :

### 1. Récupérer après un reset hard

Si vous avez accidentellement fait un `git reset --hard` et perdu des commits :

\`\`\`bash
# Voir le reflog pour trouver l'état avant le reset
git reflog

# Revenir à cet état
git checkout HEAD@{1}  # ou le numéro approprié

# Créer une nouvelle branche à partir de cet état
git checkout -b recovery-branch
\`\`\`

### 2. Récupérer une branche supprimée

Si vous avez supprimé une branche par erreur :

\`\`\`bash
# Trouver le dernier commit de la branche dans le reflog
git reflog

# Créer une nouvelle branche pointant vers ce commit
git checkout -b recovered-branch abc123f
\`\`\`

### 3. Récupérer après un rebase problématique

Si un rebase a mal tourné et vous avez perdu des commits :

\`\`\`bash
# Trouver l'état avant le rebase
git reflog

# Revenir à cet état
git reset --hard HEAD@{5}  # ou le hash/numéro approprié
\`\`\`

## Caractéristiques importantes du reflog

- **Local uniquement** : Le reflog est spécifique à votre dépôt local et n'est pas partagé
- **Durée limitée** : Par défaut, les entrées du reflog sont conservées 90 jours
- **Par référence** : Chaque référence (HEAD, branches) a son propre reflog
  \`\`\`bash
  git reflog show main  # Voir le reflog pour la branche main
  \`\`\`

## Combiner reflog avec d'autres commandes

Le reflog peut être utilisé avec d'autres commandes Git :

\`\`\`bash
# Voir les changements entre l'état actuel et un état précédent
git diff HEAD@{1}

# Voir le contenu d'un commit spécifique du reflog
git show HEAD@{2}

# Créer une branche à partir d'un état précédent
git branch backup-branch HEAD@{1}
\`\`\`

## Conseils pour utiliser le reflog efficacement

1. **Vérifiez le reflog d'abord** avant de paniquer si vous pensez avoir perdu du travail
2. **Utilisez des messages de commit descriptifs** pour faciliter l'identification dans le reflog
3. **Créez des branches de récupération** plutôt que de faire des resets directs
4. **N'attendez pas trop longtemps** - le reflog est nettoyé périodiquement

Le reflog est un filet de sécurité précieux qui vous permet d'expérimenter plus librement avec Git, sachant que vous pouvez généralement récupérer des états précédents même après des opérations destructives.`
      },
      {
        id: 'undoing-lesson4',
        title: 'Techniques avancées de récupération',
        type: 'theory',
        duration: 15,
        content: `Même après avoir maîtrisé le reflog, il existe d'autres techniques avancées pour récupérer des données ou corriger des erreurs dans Git. Ces méthodes peuvent vous sortir de situations difficiles et préserver votre travail.

## Récupération de commits perdus avec fsck

Si pour une raison quelconque, vous ne pouvez pas trouver un commit dans le reflog, Git dispose d'un outil de vérification du système de fichiers qui peut découvrir des objets "perdus" :

\`\`\`bash
git fsck --lost-found
\`\`\`

Cette commande identifie les objets qui existent dans la base de données Git mais ne sont plus référencés. Les commits perdus apparaîtront comme "dangling commits".

Pour examiner un commit dangling :

\`\`\`bash
git show <hash-du-commit-dangling>
\`\`\`

Pour le récupérer :

\`\`\`bash
git branch recovered-branch <hash-du-commit-dangling>
\`\`\`

## Récupération de fichiers supprimés

### À partir d'un commit précédent connu

Si vous connaissez le commit où le fichier existait encore :

\`\`\`bash
# Restaurer le fichier depuis un commit spécifique
git checkout abc123f -- path/to/file.txt

# Ou depuis un état relatif
git checkout HEAD~3 -- path/to/file.txt
\`\`\`

### À partir d'un commit inconnu

Si vous ne savez pas quand le fichier a été supprimé :

\`\`\`bash
# Trouver quand le fichier a été supprimé
git log --diff-filter=D --name-only -- path/to/file.txt

# Une fois que vous avez identifié le commit, regardez le commit juste avant
git checkout <commit-avant-suppression>^ -- path/to/file.txt
\`\`\`

## Réparation d'un historique problématique

### Modifier le dernier commit (avant push)

\`\`\`bash
# Modifier le message du dernier commit
git commit --amend -m "Nouveau message"

# Ajouter des changements au dernier commit
git add fichier-oublié.txt
git commit --amend --no-edit  # Garde le même message
\`\`\`

### Réorganiser, combiner ou diviser des commits (avant push)

Le rebase interactif est un outil puissant pour réorganiser l'historique :

\`\`\`bash
git rebase -i HEAD~3  # Pour modifier les 3 derniers commits
\`\`\`

Dans l'éditeur qui s'ouvre, vous pouvez :
- `pick` : garder le commit tel quel
- `reword` : modifier le message
- `edit` : modifier le contenu du commit
- `squash` / `fixup` : fusionner avec le commit précédent
- `drop` : supprimer le commit
- Réordonner les lignes pour changer l'ordre des commits

### Corriger un push erroné

Si vous avez poussé accidentellement des changements problématiques :

\`\`\`bash
# Corrigez localement (avec reset, revert ou autre)
git reset --hard HEAD~1  # exemple

# Puis force-push (AVEC PRÉCAUTION !)
git push --force-with-lease  # Plus sûr que --force
\`\`\`

**ATTENTION** : Ne faites jamais cela sur des branches partagées comme `main` sans en informer votre équipe !

## Récupération après un rebase ou merge raté

### Annuler un rebase en cours

Si vous êtes au milieu d'un rebase problématique :

\`\`\`bash
git rebase --abort
\`\`\`

### Annuler un merge en cours

Si vous êtes au milieu d'un merge avec conflits :

\`\`\`bash
git merge --abort
\`\`\`

### Annuler un merge complété

Si vous avez déjà terminé un merge mais souhaitez l'annuler :

\`\`\`bash
# Identifiez le commit juste avant le merge
git reflog

# Revenez à cet état
git reset --hard HEAD@{n}  # où n est le numéro dans le reflog
\`\`\`

## Récupération des sous-modules

Si vous utilisez des sous-modules et qu'ils sont dans un état problématique :

\`\`\`bash
# Réinitialiser tous les sous-modules
git submodule update --init --recursive

# Réinitialiser un sous-module spécifique
git submodule update --init -- path/to/submodule
\`\`\`

## Conseils généraux de récupération

1. **Ne paniquez pas** ! Git est conçu pour préserver vos données.
2. **Arrêtez d'abord de creuser** - souvent, les tentatives précipitées empirent la situation.
3. **Faites une sauvegarde** de l'état actuel avant toute opération de récupération risquée.
4. **Documentez les étapes** que vous suivez pour la récupération.
5. **Utilisez --dry-run** quand c'est disponible pour voir ce qui se passerait sans effectuer l'action.

Avec ces techniques avancées, vous pouvez récupérer de presque toute situation difficile dans Git, préservant ainsi votre travail et l'intégrité de votre dépôt.`
      }
    ],
    quiz: [
      {
        question: 'Quelle commande permet d\'annuler des modifications qui n\'ont pas encore été stagées (ajoutées à l\'index) ?',
        options: [
          'git reset --hard',
          'git revert',
          'git checkout -- <fichier> ou git restore <fichier>',
          'git clean'
        ],
        correctAnswer: 2,
        explanation: 'Pour annuler des modifications non stagées dans votre répertoire de travail, vous pouvez utiliser `git checkout -- <fichier>` (ancienne syntaxe) ou `git restore <fichier>` (nouvelle syntaxe introduite dans Git 2.23). Ces commandes remplacent les fichiers dans votre répertoire de travail par la version dans le dernier commit.'
      },
      {
        question: 'Quelle est la différence entre `git reset --hard` et `git revert` ?',
        options: [
          'git reset --hard est plus rapide, git revert est plus lent',
          'git reset --hard supprime les commits de l\'historique, git revert crée un nouveau commit qui annule les changements',
          'git reset --hard fonctionne uniquement sur les branches, git revert fonctionne sur les commits individuels',
          'git reset --hard est pour les débutants, git revert pour les utilisateurs avancés'
        ],
        correctAnswer: 1,
        explanation: 'git reset --hard supprime les commits de l\'historique, ce qui modifie l\'historique existant. git revert, en revanche, crée un nouveau commit qui annule les changements d\'un commit précédent, préservant ainsi l\'historique complet. C\'est pourquoi git revert est généralement plus sûr pour les branches partagées.'
      },
      {
        question: 'Qu\'est-ce que le reflog dans Git ?',
        options: [
          'Un journal des erreurs Git rencontrées sur votre système',
          'Un outil pour analyser les performances de Git',
          'Un journal de toutes les modifications de références (comme HEAD ou les branches) dans votre dépôt local',
          'Un fichier de configuration pour les options de logging de Git'
        ],
        correctAnswer: 2,
        explanation: 'Le reflog (reference log) est un mécanisme de Git qui enregistre les modifications de références (comme HEAD, branches) dans votre dépôt local. Il garde une trace de où se trouvait votre HEAD à chaque étape, ce qui vous permet de récupérer des états précédents même après des opérations comme reset --hard ou la suppression de branches.'
      },
      {
        question: 'Comment pouvez-vous modifier le message du dernier commit ?',
        options: [
          'git update-message "Nouveau message"',
          'git commit --edit',
          'git commit --amend -m "Nouveau message"',
          'git message --update "Nouveau message"'
        ],
        correctAnswer: 2,
        explanation: 'La commande `git commit --amend -m "Nouveau message"` vous permet de modifier le message du dernier commit. L\'option --amend indique à Git que vous souhaitez "corriger" le dernier commit plutôt que d\'en créer un nouveau. Cette commande modifie l\'historique, donc elle ne devrait pas être utilisée sur des commits déjà poussés vers un dépôt partagé.'
      },
      {
        question: 'Que fait la commande `git bisect` ?',
        options: [
          'Elle divise un fichier en plusieurs parties',
          'Elle vous aide à trouver automatiquement quel commit a introduit un bug en effectuant une recherche binaire',
          'Elle sépare un commit en plusieurs commits plus petits',
          'Elle fusionne deux branches différentes'
        ],
        correctAnswer: 1,
        explanation: 'git bisect est un outil puissant qui vous aide à trouver quel commit a introduit un bug en effectuant une recherche binaire dans l\'historique des commits. Vous marquez un commit "bon" (où le bug n\'existait pas) et un commit "mauvais" (où le bug existe), puis Git vous guide à travers les commits intermédiaires, réduisant de moitié l\'espace de recherche à chaque étape.'
      }
    ]
  },

  // Chapitre 8: Fonctionnalités GitHub
  {
    id: 'github-features',
    title: 'Fonctionnalités avancées de GitHub',
    description: 'Explorez les fonctionnalités avancées de GitHub pour améliorer votre productivité et la gestion de vos projets.',
    objectives: [
      'Maîtriser l\'utilisation des issues GitHub',
      'Configurer et utiliser GitHub Actions',
      'Comprendre les fonctionnalités de gestion de projet GitHub',
      'Exploiter l\'interface GitHub efficacement'
    ],
    estimatedTime: 75,
    icon: Cloud,
    lessons: [
      {
        id: 'github-features-lesson1',
        title: 'Explorer l\'interface GitHub',
        type: 'practice',
        duration: 15,
        component: 'GitHubInterfaceSimulator',
        content: `GitHub offre une interface riche qui va bien au-delà du simple hébergement de code. Comprendre cette interface est essentiel pour tirer pleinement parti de la plateforme.

## Structure d'un dépôt GitHub

Lorsque vous visitez un dépôt GitHub, vous trouverez plusieurs sections clés :

### 1. Barre de navigation supérieure

- **Code** : Explorateur de fichiers et code source
- **Issues** : Suivi des problèmes, bugs et tâches
- **Pull Requests** : Demandes d'intégration de code
- **Actions** : CI/CD et automatisation
- **Projects** : Tableaux kanban et gestion de projet
- **Wiki** : Documentation collaborative
- **Security** : Analyse de sécurité et vulnérabilités
- **Insights** : Statistiques et analyses du dépôt
- **Settings** : Configuration du dépôt

### 2. En-tête du dépôt

- **Nom du dépôt** avec propriétaire
- **Visibilité** (public/privé)
- **Statistiques** : Watch, Star, Fork
- **Bouton Code** pour cloner ou télécharger

### 3. Vue du code

- **Sélecteur de branche** pour changer de branche
- **Liste des fichiers** avec messages de commit
- **README** rendu automatiquement en bas
- **Boutons** pour ajouter/éditer des fichiers

## Fonctionnalités interactives

### Explorateur de code

- **Parcourir les fichiers** et naviguer dans l'arborescence
- **Recherche de code** avec syntaxe avancée
- **Visualisation** de nombreux formats (Markdown, CSV, PDF, etc.)
- **Édition en ligne** directement sur GitHub
- **Permaliens** vers des lignes spécifiques
- **Blame view** pour voir qui a modifié chaque ligne

### Issues

Les Issues GitHub sont au cœur de la gestion des projets :

- **Création d'issues** avec titre, description, assignés, labels, etc.
- **Système de labels** personnalisables pour catégoriser
- **Milestones** pour regrouper les issues par objectif
- **Mentions** avec @ pour notifier des utilisateurs
- **Références croisées** avec # pour lier issues/PRs

### Pull Requests

Les Pull Requests (PRs) vont au-delà du simple merge :

- **Diff visualisation** des changements proposés
- **Discussion inline** sur des lignes spécifiques
- **Statut des checks** automatiques (CI, tests, etc.)
- **Résolution de conflits** directement dans l'interface
- **Options de merge** (merge commit, squash, rebase)
- **Draft PRs** pour indiquer un travail en cours

### Actions

GitHub Actions permet d'automatiser vos workflows :

- **Intégration continue** pour tester votre code
- **Déploiement continu** vers divers environnements
- **Automatisation** de tâches comme l'assignation d'issues
- **Workflows personnalisés** via des fichiers YAML
- **Marketplace** d'actions prêtes à l'emploi

## Fonctionnalités sociales

GitHub intègre des éléments sociaux pour faciliter la collaboration :

- **Profils utilisateur** avec activité et contributions
- **Notifications** pour rester informé des activités
- **Discussions** pour les conversations hors code
- **Sponsoring** pour soutenir des développeurs
- **Pages** pour héberger de la documentation ou des sites

## Raccourcis clavier et astuces

GitHub offre de nombreux raccourcis clavier pour gagner en efficacité :

- Appuyez sur `?` pour voir la liste des raccourcis disponibles
- `t` pour accéder à la recherche de fichiers
- `l` pour aller à une ligne spécifique dans un fichier
- `y` pour obtenir un permalien vers la version actuelle d'un fichier
- `b` pour visualiser l'historique d'un fichier (blame view)

En maîtrisant l'interface GitHub, vous pouvez considérablement améliorer votre productivité et la qualité de vos interactions dans les projets collaboratifs.`
      },
      {
        id: 'github-features-lesson2',
        title: 'Gestion d\'issues et de projets',
        type: 'practice',
        duration: 20,
        component: 'IssueTracker',
        content: `Les issues GitHub constituent un système puissant de suivi pour les bugs, les fonctionnalités et les tâches. Lorsqu'elles sont utilisées en conjonction avec les outils de gestion de projet de GitHub, elles forment un écosystème complet pour gérer le développement logiciel.

## Issues GitHub : bien plus que des tickets de bug

Les issues GitHub sont des unités de travail polyvalentes qui peuvent représenter :

- Bugs à corriger
- Nouvelles fonctionnalités à développer
- Améliorations à apporter
- Tâches à accomplir
- Questions à discuter
- Documentation à mettre à jour

### Anatomie d'une issue

Une issue GitHub comprend généralement :

- **Titre** : Résumé concis du problème ou de la tâche
- **Description** : Détails, étapes de reproduction, captures d'écran
- **Assignés** : Personnes responsables de résoudre l'issue
- **Labels** : Catégorisation par type, priorité, statut
- **Milestone** : Objectif ou version prévue
- **Commentaires** : Discussion collaborative

### Création d'issues efficaces

Pour créer des issues utiles :

1. **Soyez spécifique** dans votre titre et description
2. **Incluez des étapes de reproduction** pour les bugs
3. **Ajoutez du contexte** : environnement, versions, etc.
4. **Utilisez le formatage Markdown** pour la lisibilité
5. **Mentionnez les personnes concernées** avec @username
6. **Liez les ressources pertinentes** (PRs, autres issues, etc.)

### Modèles d'issues (Issue Templates)

Les modèles permettent de standardiser les informations demandées lors de la création d'issues. Pour configurer :

1. Créez un dossier `.github/ISSUE_TEMPLATE/` dans votre dépôt
2. Ajoutez des fichiers markdown ou YAML pour différents types d'issues
3. Incluez des sections et des cases à cocher pour guider les contributeurs

## Gestion de projet avec GitHub Projects

GitHub Projects transforme les issues en un système visuel de gestion de projet.

### Types de projets GitHub

- **Projects Classic** : Tableaux simples liés à un seul dépôt
- **Projects (new)** : Version améliorée avec plus de flexibilité et de personnalisation

### Fonctionnalités principales des projets

- **Vues multiples** : Tableaux kanban, listes, calendriers, etc.
- **Champs personnalisés** : Priorité, difficulté, estimations, etc.
- **Automatisation** : Déplacement automatique des issues selon leur statut
- **Filtres** : Affichage sélectif des issues selon divers critères
- **Groupement** : Organisation par assigné, label, statut, etc.

### Configuration d'un projet efficace

1. **Définir les colonnes** adaptées à votre workflow (ex: À faire, En cours, En revue, Terminé)
2. **Configurer l'automatisation** pour déplacer les issues selon leur statut
3. **Ajouter des champs personnalisés** pour les informations importantes
4. **Définir des filtres enregistrés** pour différentes vues

## Intégration des issues dans le workflow

Les issues sont pleinement intégrées dans le workflow Git et GitHub :

### Références croisées

Vous pouvez référencer des issues dans :
- Messages de commit : `git commit -m "Fix issue #42"`
- Descriptions de Pull Request
- Autres issues ou commentaires

GitHub crée automatiquement des liens bidirectionnels.

### Fermeture automatique

Les issues peuvent être fermées automatiquement par des commits ou PRs avec des mots-clés :

\`\`\`
Fix #42
Closes #123
Resolves #456
\`\`\`

### Statut d'une issue

Une issue peut avoir différents états :
- **Open** : En attente de résolution
- **Closed** : Résolue ou abandonnée

## Bonnes pratiques de gestion d'issues

1. **Triez régulièrement** les issues ouvertes
2. **Utilisez des labels cohérents** pour faciliter le filtrage
3. **Assignez clairement les responsabilités**
4. **Mettez à jour le statut** au fur et à mesure
5. **Documentez les décisions** importantes dans les commentaires
6. **Fermez les issues obsolètes** avec une explication
7. **Utilisez les milestones** pour planifier des versions

Un système d'issues bien géré améliore considérablement la visibilité sur l'avancement du projet et facilite la collaboration entre les membres de l'équipe.`
      },
      {
        id: 'github-features-lesson3',
        title: 'GitHub Actions et automatisation',
        type: 'practice',
        duration: 20,
        component: 'ActionsWorkflowBuilder',
        content: `GitHub Actions est une puissante plateforme d'automatisation intégrée directement dans GitHub. Elle vous permet d'automatiser des workflows de développement logiciel directement depuis votre dépôt.

## Concepts fondamentaux de GitHub Actions

### Workflows

Un workflow est un processus automatisé configurable qui exécute un ou plusieurs jobs. Il est défini par un fichier YAML dans le répertoire `.github/workflows/` de votre dépôt.

Structure de base d'un workflow :

\`\`\`yaml
name: Mon Workflow

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Configuration
        run: npm install
      - name: Test
        run: npm test
\`\`\`

### Événements (Events)

Les workflows sont déclenchés par des événements spécifiques :

- **push** : Quand du code est poussé vers le dépôt
- **pull_request** : Quand une PR est ouverte, modifiée, etc.
- **schedule** : À des moments programmés (cron)
- **workflow_dispatch** : Déclenchement manuel
- et bien d'autres...

### Jobs et Steps

- **Jobs** : Ensembles de steps qui s'exécutent sur le même runner
- **Steps** : Tâches individuelles qui exécutent des commandes ou des actions
- Les jobs peuvent s'exécuter en parallèle ou de façon séquentielle

### Runners

Les runners sont les serveurs qui exécutent vos workflows. GitHub propose :

- Runners hébergés par GitHub (Ubuntu, Windows, macOS)
- Runners auto-hébergés pour des environnements personnalisés

## Créer des workflows CI/CD

### Intégration Continue (CI)

Exemple de workflow CI pour tester une application JavaScript :

\`\`\`yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run linter
        run: npm run lint
        
      - name: Run tests
        run: npm test
        
      - name: Generate coverage report
        run: npm run coverage
\`\`\`

### Déploiement Continu (CD)

Exemple de workflow pour déployer sur GitHub Pages :

\`\`\`yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4.3.3
        with:
          branch: gh-pages
          folder: dist
\`\`\`

## Fonctionnalités avancées

### Matrices

Testez sur plusieurs versions ou systèmes d'exploitation :

\`\`\`yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [14.x, 16.x, 18.x]
    
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      # ...
\`\`\`

### Artefacts

Partagez des fichiers entre jobs :

\`\`\`yaml
jobs:
  build:
    # ...
    steps:
      # ...
      - name: Upload build artifact
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: dist/
          
  deploy:
    needs: build
    # ...
    steps:
      - name: Download build artifact
        uses: actions/download-artifact@v3
        with:
          name: build-files
      # ...
\`\`\`

### Secrets et variables d'environnement

Gérez les informations sensibles :

\`\`\`yaml
jobs:
  deploy:
    # ...
    steps:
      - name: Deploy to production
        env:
          API_TOKEN: ${{ secrets.API_TOKEN }}
        run: ./deploy.sh
\`\`\`

Les secrets sont configurés dans les paramètres du dépôt.

## Cas d'utilisation courants

GitHub Actions peut être utilisé pour :

1. **Tests et validation** : Exécution de tests, linting, vérifications de type
2. **Construction et déploiement** : Compilation et déploiement d'applications
3. **Publication de packages** : Publication vers npm, PyPI, etc.
4. **Revue de code automatisée** : Analyses statiques, vérifications de sécurité
5. **Automatisation de gestion de projet** : Étiquetage automatique des issues, assignation
6. **Notifications** : Intégrations avec Slack, email, etc.

## Bonnes pratiques

1. **Divisez les workflows** par préoccupation (CI, CD, etc.)
2. **Utilisez des actions de la marketplace** plutôt que de réinventer la roue
3. **Mettez en cache les dépendances** pour accélérer les builds
4. **Limitez l'exposition des secrets** aux jobs qui en ont besoin
5. **Utilisez des tags spécifiques** pour les actions plutôt que 'latest' ou 'master'
6. **Documentez vos workflows** dans le README.md

GitHub Actions offre une solution d'automatisation puissante, flexible et entièrement intégrée qui peut considérablement améliorer votre productivité et la qualité de vos projets.`
      },
      {
        id: 'github-features-lesson4',
        title: 'Gestion de projet GitHub avancée',
        type: 'practice',
        duration: 15,
        component: 'ProjectDashboard',
        content: `GitHub propose un ensemble complet d'outils pour la gestion de projet qui vont bien au-delà du simple suivi des issues. Cette leçon explore les fonctionnalités avancées de gestion de projet qui peuvent vous aider à organiser et suivre efficacement le travail de votre équipe.

## GitHub Projects : Tableau de bord visuel

GitHub Projects est l'outil de gestion de projet intégré à GitHub, désormais disponible en deux versions :

### 1. Projects Classic
La version originale, plus simple et liée à un seul dépôt.

### 2. Projects (nouvelle version)
Plus flexible, avec des vues multiples et une personnalisation avancée.

## Fonctionnalités principales de GitHub Projects

### Vues multiples
- **Tableau** : Style Kanban avec colonnes personnalisables
- **Liste** : Vue en tableau avec tri et filtrage avancés
- **Calendrier** (nouvelle version) : Visualisation temporelle
- **Roadmap** (nouvelle version) : Vue chronologique pour la planification

### Champs personnalisés
Ajoutez des métadonnées à vos issues et PRs :
- Priorité (haute, moyenne, basse)
- Estimation d'effort (story points)
- Statut personnalisé
- Dates d'échéance
- Assignés multiples
- Et plus encore...

### Automatisation
Configurez des règles pour automatiser la gestion :
- Déplacer automatiquement les issues en fonction de leur statut
- Mettre à jour les champs personnalisés selon des critères
- Trier ou filtrer automatiquement les éléments

## Configurations avancées

### Milestones (Jalons)
Les jalons permettent de regrouper des issues pour des versions ou sprints :
- Date d'échéance claire
- Suivi de progression (% d'issues fermées)
- Description détaillée de l'objectif

Pour créer un jalon :
1. Aller dans l'onglet Issues
2. Cliquer sur "Milestones"
3. Créer un nouveau jalon avec titre, date et description

### Étiquettes (Labels) stratégiques
Créez un système d'étiquettes cohérent pour catégoriser vos issues :

- **Type** : bug, feature, documentation, etc.
- **Priorité** : high, medium, low
- **Statut** : ready-for-dev, in-progress, blocked
- **Composant** : UI, API, database, etc.

Les étiquettes personnalisées peuvent être créées avec des couleurs spécifiques pour une reconnaissance visuelle rapide.

### Assignation et mentions
- Assignez des issues aux membres de l'équipe responsables
- Mentionnez d'autres membres avec @username pour attirer leur attention
- Créez des équipes (@org/team) pour mentionner plusieurs personnes à la fois

## Intégrations et extensions

### GitHub Actions pour la gestion de projet
Automatisez des tâches de gestion avec des workflows :

\`\`\`yaml
name: Auto Assign to Project

on:
  issues:
    types: [opened]
  pull_request:
    types: [opened]

jobs:
  assign:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            github.rest.projects.createCard({
              column_id: 12345678,
              content_id: context.payload.issue.id,
              content_type: 'Issue'
            })
\`\`\`

### Applications GitHub Marketplace
Étendez vos capacités de gestion avec des apps comme :
- ZenHub pour des fonctionnalités agiles avancées
- Jira Cloud pour l'intégration avec Jira
- Codecov pour les rapports de couverture de code
- Dependabot pour la gestion des dépendances

## Métriques et rapports

GitHub fournit plusieurs façons de mesurer la progression :

### Pulse
Vue d'ensemble de l'activité récente du dépôt :
- Commits récents
- Issues ouvertes et fermées
- Pull requests
- Contributeurs actifs

### Insights
Analyse approfondie du dépôt :
- Graphiques de contribution
- Fréquence de commits
- Dépendances du code
- Statistiques du réseau

### Rapports personnalisés
Utilisez l'API GitHub pour créer des rapports personnalisés :
- Vitesse de résolution des issues
- Temps de cycle des PRs
- Distributions de charge de travail
- Tendances des bugs et features

## Bonnes pratiques de gestion de projet

1. **Standardisez les processus** : Créez des templates pour issues et PRs
2. **Documentation claire** : Maintenez un CONTRIBUTING.md pour expliquer le workflow
3. **Rituels réguliers** : Planifiez des revues de backlog et triage d'issues
4. **Automatisez le plus possible** : Étiquetage, assignation, déplacement
5. **Limitez le travail en cours** : Évitez d'avoir trop d'issues ouvertes simultanément
6. **Faites des révisions périodiques** : Nettoyez les issues obsolètes

En combinant ces fonctionnalités et pratiques, GitHub peut servir de plateforme complète de gestion de projet, éliminant souvent le besoin d'outils externes et gardant tout votre travail dans un seul écosystème.`
      }
    ],
    quiz: [
      {
        question: 'Quelle fonctionnalité de GitHub permet d\'automatiser vos workflows de développement ?',
        options: [
          'GitHub Pages',
          'GitHub Sponsors',
          'GitHub Actions',
          'GitHub Copilot'
        ],
        correctAnswer: 2,
        explanation: 'GitHub Actions est la plateforme d\'automatisation intégrée à GitHub qui permet de configurer des workflows personnalisés pour automatiser des tâches comme les tests, le déploiement, et d\'autres processus de développement logiciel directement depuis votre dépôt.'
      },
      {
        question: 'Comment peut-on fermer automatiquement une issue GitHub via un commit ?',
        options: [
          'En mentionnant l\'issue dans la description du commit',
          'En utilisant des mots-clés comme "Fixes #123" ou "Closes #123" dans le message de commit',
          'En assignant l\'issue à un utilisateur spécifique',
          'En ajoutant un label "closed" à l\'issue'
        ],
        correctAnswer: 1,
        explanation: 'GitHub reconnaît certains mots-clés comme "fixes", "closes", ou "resolves" suivis d\'un numéro d\'issue (#123) dans les messages de commit ou les descriptions de Pull Request. Lorsque ces commits sont fusionnés dans la branche par défaut, l\'issue référencée est automatiquement fermée.'
      },
      {
        question: 'Quelle fonctionnalité GitHub vous aide à visualiser et gérer les tâches dans un format de tableau Kanban ?',
        options: [
          'GitHub Wiki',
          'GitHub Issues',
          'GitHub Projects',
          'GitHub Pages'
        ],
        correctAnswer: 2,
        explanation: 'GitHub Projects est l\'outil de gestion de projet intégré à GitHub qui vous permet d\'organiser et prioriser votre travail en utilisant des tableaux de style Kanban, des listes et d\'autres vues. Vous pouvez y intégrer les issues et pull requests, ajouter des notes, et suivre visuellement la progression.'
      },
      {
        question: 'Qu\'est-ce qu\'un template d\'issue dans GitHub ?',
        options: [
          'Un outil pour copier rapidement des issues existantes',
          'Un modèle prédéfini qui apparaît lorsque quelqu\'un crée une nouvelle issue',
          'Un design visuel pour les issues fermées',
          'Un système automatique de création d\'issues'
        ],
        correctAnswer: 1,
        explanation: 'Les templates d\'issues sont des modèles prédéfinis qui apparaissent lorsque quelqu\'un crée une nouvelle issue dans votre dépôt. Ils peuvent guider les contributeurs pour fournir les informations nécessaires (étapes de reproduction, environnement, etc.) et maintenir un format cohérent pour tous les rapports de bugs ou demandes de fonctionnalités.'
      },
      {
        question: 'Comment configurer un workflow GitHub Actions ?',
        options: [
          'En créant un fichier .actions dans la racine du dépôt',
          'En ajoutant un fichier YAML dans le dossier .github/workflows/',
          'Via les paramètres du dépôt uniquement',
          'En installant un logiciel spécial sur votre ordinateur'
        ],
        correctAnswer: 1,
        explanation: 'Pour configurer un workflow GitHub Actions, vous devez créer un fichier YAML dans le dossier .github/workflows/ de votre dépôt. Ce fichier définit les événements qui déclenchent le workflow, les environnements dans lesquels il s\'exécute, et les actions à effectuer.'
      }
    ]
  },

  // Chapitre 9: Projet final
  {
    id: 'final-project',
    title: 'Projet Final',
    description: 'Mettez en pratique toutes vos connaissances Git et GitHub dans un projet collaboratif complet.',
    objectives: [
      'Appliquer toutes les techniques apprises dans un projet réel',
      'Simuler un workflow de collaboration complet',
      'Contribuer à un projet open source',
      'Obtenir votre certificat d\'achèvement'
    ],
    estimatedTime: 90,
    icon: GitCommit,
    lessons: [
      {
        id: 'final-project-lesson1',
        title: 'Contribution à un projet Open Source',
        type: 'practice',
        duration: 30,
        component: 'OpenSourceSimulator',
        content: `La contribution à des projets open source est l'une des meilleures façons d'appliquer vos compétences Git et GitHub. C'est également un excellent moyen de rejoindre la communauté mondiale des développeurs, d'améliorer votre portfolio et d'aider à construire les logiciels que nous utilisons tous.

## Pourquoi contribuer à l'open source ?

- **Apprentissage** : Travaillez sur de vrais projets avec des développeurs expérimentés
- **Visibilité** : Construisez votre réputation et votre portfolio public
- **Impact** : Contribuez à des outils que vous utilisez quotidiennement
- **Collaboration** : Pratiquez le travail en équipe à grande échelle
- **Réseautage** : Connectez-vous avec la communauté de développeurs

## Trouver un projet pour contribuer

### Où chercher des projets ?

- **GitHub Explore** : Découvrez des projets populaires ou tendance
- **GitHub Topics** : Explorez par technologies ou domaines d'intérêt
- **Good First Issues** : Recherchez des tickets marqués "good first issue" ou "beginner friendly"
- **Awesome Lists** : Collections de projets populaires par domaine
- **firstcontributions.github.io** : Site dédié aux premières contributions

### Que chercher dans un projet ?

- **Activité récente** : Le projet est-il activement maintenu ?
- **Documentation** : Existe-t-il un guide CONTRIBUTING.md ?
- **Communauté** : Les mainteneurs sont-ils réactifs et accueillants ?
- **Issues ouvertes** : Y a-t-il des problèmes que vous pourriez résoudre ?

## Processus de contribution à l'open source

### 1. Préparer le terrain

- **Lisez la documentation** du projet
- **Comprenez les guidelines de contribution**
- **Installez et testez** le projet localement

### 2. Trouver une contribution à faire

Types de contributions possibles :
- Corriger un bug
- Ajouter une fonctionnalité
- Améliorer la documentation
- Ajouter des tests
- Traduire le contenu
- Améliorer l'accessibilité

### 3. Discuter avant de coder

- **Vérifiez** si le problème est déjà traité
- **Commentez** sur une issue existante ou créez-en une
- **Demandez** si vous pouvez travailler sur l'issue
- **Discutez** de votre approche avant de commencer

### 4. Workflow de contribution

1. **Fork** le dépôt sur GitHub
2. **Clone** votre fork localement
3. **Créez une branche** pour votre travail
4. **Faites vos modifications** et committez
5. **Testez** soigneusement vos changements
6. **Push** votre branche vers votre fork
7. **Créez une Pull Request** vers le projet original

### 5. Après soumission de la PR

- **Répondez rapidement** aux commentaires et suggestions
- **Soyez ouvert** aux modifications demandées
- **Soyez patient** - les mainteneurs sont souvent occupés
- **Restez positif** même si votre PR n'est pas acceptée

## Étiquette de la contribution open source

### Bonnes pratiques

- **Respectez le style de code** existant du projet
- **Écrivez des messages de commit** clairs et descriptifs
- **Documentez** vos changements
- **Une PR, un objectif** - évitez de mélanger différentes fonctionnalités
- **Soyez poli et respectueux** dans toutes les communications

### Communication

- **Soyez précis** dans vos descriptions et questions
- **Fournissez du contexte** pour aider les autres à comprendre
- **Remerciez les personnes** qui vous aident
- **Acceptez les critiques constructives** avec grâce

## Maintenir votre engagement

La contribution open source n'est pas un événement unique, mais un processus continu :

- **Commencez petit** et augmentez progressivement
- **Suivez les projets** auxquels vous contribuez
- **Établissez des relations** avec d'autres contributeurs
- **Aidez les nouveaux** à démarrer
- **Considérez de maintenir** vos propres projets open source

## Au-delà du code

Les contributions non-code sont tout aussi précieuses :

- **Triage d'issues**
- **Revue de code**
- **Documentation**
- **Design**
- **Community support**

La contribution open source est un voyage enrichissant qui peut transformer votre carrière tout en ayant un impact positif sur la communauté de développement mondiale.`
      },
      {
        id: 'final-project-lesson2',
        title: 'Tableau de bord de projet',
        type: 'theory',
        duration: 20,
        component: 'ProjectDashboard',
        content: `Un tableau de bord de projet bien conçu est essentiel pour maintenir une vue d'ensemble claire sur l'état et l'avancement de votre projet. GitHub offre plusieurs fonctionnalités qui, combinées, permettent de créer un centre de contrôle efficace pour votre équipe.

## Composants d'un tableau de bord de projet efficace

### 1. Vue d'ensemble du projet

Un bon tableau de bord doit fournir immédiatement les informations clés :
- Statut actuel du projet
- Progression vers les objectifs
- Points d'attention et blocages
- Activité récente

### 2. Métriques et KPIs

Les indicateurs à suivre dépendent de votre projet, mais peuvent inclure :
- Nombre d'issues ouvertes vs fermées
- Temps moyen de résolution des bugs
- Couverture de tests
- Vélocité de l'équipe
- Fréquence des déploiements
- Nombre de contributions externes (pour l'open source)

### 3. Organisation des tâches

Une visualisation claire des tâches est fondamentale :
- Regroupement par statut (À faire, En cours, En revue, Terminé)
- Filtrage par assigné, label, milestone
- Priorisation visible
- Vue d'ensemble du sprint/iteration actuelle

### 4. Gestion des versions et jalons

Suivi structuré des objectifs à moyen terme :
- Progression vers le prochain jalon
- Dates d'échéance et calendrier
- Contenu prévu des versions
- Notes de version (changelog)

## Mise en place avec GitHub Projects

GitHub Projects est l'outil natif de GitHub pour créer des tableaux de bord :

### Configuration initiale

1. Accédez à l'onglet "Projects" de votre dépôt
2. Créez un nouveau projet (classique ou nouvelle version)
3. Définissez les colonnes ou champs personnalisés selon vos besoins
4. Importez les issues existantes

### Personnalisation avancée

- **Vues multiples** : Tableau, Liste, Calendrier (nouvelle version)
- **Champs personnalisés** : Priorité, Effort, Équipe, etc.
- **Automatisation** : Déplacement automatique des issues selon leur statut
- **Filtres** : Créez des vues sauvegardées pour différents aspects du projet

### Intégration avec GitHub Actions

Automatisez la mise à jour de votre tableau de bord :

\`\`\`yaml
name: Update Project

on:
  issues:
    types: [opened, edited, closed, reopened]
  pull_request:
    types: [opened, edited, closed, reopened, ready_for_review]

jobs:
  update_project:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            // Script pour mettre à jour automatiquement le projet
\`\`\`

## Extensions du tableau de bord

Au-delà de GitHub Projects, vous pouvez enrichir votre tableau de bord avec :

### README.md stratégique

Transformez le README de votre dépôt en page d'accueil informative :
- Badges de statut (build, tests, couverture)
- Graphiques de progression
- Liste des fonctionnalités clés
- Roadmap simplifiée

### GitHub Pages pour les rapports détaillés

Créez un site de documentation/reporting avec GitHub Pages :
- Rapports de performance
- Documentation utilisateur
- Guides de contribution
- Showcase des fonctionnalités

### Intégrations tierces

Étendez vos capacités avec des services comme :
- **ZenHub** : Fonctionnalités agiles avancées
- **Codecov** : Visualisation de couverture de code
- **CircleCI** ou **Travis CI** : Badges de build
- **Sentry** : Suivi des erreurs en production

## Bonnes pratiques pour un tableau de bord efficace

### 1. Maintenez-le à jour

Un tableau de bord n'est utile que s'il reflète l'état actuel :
- Automatisez les mises à jour quand c'est possible
- Intégrez la mise à jour dans vos routines quotidiennes
- Désignez un responsable du maintien du tableau de bord

### 2. Adaptez-le à votre audience

Différentes personnes ont besoin de différentes informations :
- Vue technique détaillée pour les développeurs
- Vue d'ensemble des progrès pour les parties prenantes
- Focus sur les blocages pour les managers

### 3. Évitez la surcharge d'information

Un bon tableau de bord est clair et concis :
- Concentrez-vous sur les métriques qui comptent vraiment
- Utilisez des visualisations efficaces (graphiques, codes couleur)
- Organisez l'information de façon hiérarchique (du général au détaillé)

### 4. Itérez sur votre tableau de bord

Comme votre code, votre tableau de bord doit évoluer :
- Recueillez les retours de l'équipe
- Observez quelles sections sont effectivement utilisées
- Adaptez en fonction des phases du projet

Un tableau de bord bien conçu n'est pas seulement un outil de suivi - c'est un centre nerveux qui aide l'équipe à rester alignée, informée et efficace.`
      },
      {
        id: 'final-project-lesson3',
        title: 'Certification et prochaines étapes',
        type: 'theory',
        duration: 30,
        component: 'CertificateGenerator',
        content: `Félicitations pour être arrivé à cette étape finale du tutoriel ! Vous avez acquis une solide compréhension de Git et GitHub, des compétences qui sont essentielles dans le développement logiciel moderne. Cette dernière leçon vous aidera à consolider vos acquis et à identifier les prochaines étapes pour continuer à progresser.

## Bilan des compétences acquises

Au cours de ce tutoriel, vous avez appris :

### Fondamentaux Git
- Comprendre le système de contrôle de version distribué
- Créer et gérer des dépôts
- Effectuer des commits efficaces
- Naviguer dans l'historique

### Branches et collaboration
- Créer et fusionner des branches
- Résoudre des conflits
- Travailler avec des dépôts distants
- Collaborer via des Pull Requests

### Workflows et bonnes pratiques
- Comprendre différents modèles de workflow Git
- Appliquer des stratégies de branchement adaptées
- Suivre les bonnes pratiques de commit et de revue
- Gérer efficacement les projets sur GitHub

### Outils et fonctionnalités avancées
- Utiliser GitHub Actions pour l'automatisation
- Gérer les issues et projets
- Récupérer des erreurs avec reflog
- Contribuer à des projets open source

## Certification

Votre parcours d'apprentissage mérite d'être reconnu. Un certificat de complétion peut :
- Valoriser vos nouvelles compétences
- Être ajouté à votre CV ou portfolio
- Être partagé sur les réseaux professionnels comme LinkedIn

Pour obtenir votre certificat :
1. Assurez-vous d'avoir terminé tous les modules du tutoriel
2. Complétez l'évaluation finale si nécessaire
3. Générez votre certificat personnalisé
4. Téléchargez-le ou partagez-le directement

## Prochaines étapes dans votre parcours Git/GitHub

L'apprentissage ne s'arrête jamais. Voici des pistes pour continuer à développer vos compétences :

### Perfectionnement technique

**Git avancé** :
- Hooks Git pour automatiser des tâches
- Git submodules pour les projets complexes
- Git internals pour comprendre le fonctionnement interne
- Git worktrees pour travailler sur plusieurs branches simultanément

**GitHub avancé** :
- GitHub API pour l'intégration et l'automatisation
- GitHub Apps development
- GitHub Codespaces pour le développement cloud
- Sécurité avancée et analyse de code

### Application pratique

**Contribution open source** :
- Trouvez un projet qui vous intéresse
- Commencez par des contributions simples (documentation, bugs)
- Progressez vers des fonctionnalités plus complexes
- Devenez maintainer d'un projet

**Projets personnels** :
- Créez et maintenez vos propres dépôts open source
- Appliquez les workflows appris à vos projets
- Expérimentez avec différentes stratégies de branchement
- Mettez en place une CI/CD complète

### Élargissement des compétences

**DevOps et GitOps** :
- Infrastructure as Code avec GitHub
- Déploiement continu
- Gestion de configuration
- Kubernetes et Git

**Collaboration à grande échelle** :
- Stratégies pour les monorepos
- Gestion de grandes équipes sur GitHub
- Inner source (appliquer les principes open source en interne)
- Gouvernance de code

## Ressources pour continuer à apprendre

### Documentation officielle
- [Git Book](https://git-scm.com/book/en/v2) - La référence complète
- [GitHub Docs](https://docs.github.com/) - Documentation officielle GitHub

### Cours et tutoriels avancés
- Cours Git avancés sur platforms comme Pluralsight, Udemy, etc.
- GitHub Learning Lab pour des formations interactives
- GitHub Skills pour des tutoriels guidés

### Communautés
- Stack Overflow pour les questions spécifiques
- Reddit (r/git, r/github, r/devops)
- Meetups locaux sur Git et GitHub
- Conférences comme GitHub Universe

### Outils pour pratiquer
- [Oh My Git!](https://ohmygit.org/) - Jeu éducatif sur Git
- [Learn Git Branching](https://learngitbranching.js.org/) - Simulateur interactif
- [Katacoda Git Scenarios](https://www.katacoda.com/courses/git)

## Conclusion et encouragements

Git et GitHub sont devenus des outils indispensables dans l'écosystème du développement logiciel. Les compétences que vous avez acquises :
- Sont universellement valorisées dans l'industrie
- S'appliquent à pratiquement tous les projets de développement
- Continueront à être pertinentes pendant de nombreuses années

N'oubliez pas que la maîtrise vient avec la pratique. Continuez à utiliser Git quotidiennement, expérimentez avec de nouvelles fonctionnalités et partagez vos connaissances avec d'autres.

Félicitations encore pour avoir complété ce tutoriel, et bonne chance dans vos futures aventures de développement !`
      }
    ],
    quiz: [
      {
        question: 'Quelle est la première étape recommandée pour contribuer à un projet open source ?',
        options: [
          'Créer immédiatement une Pull Request avec vos modifications',
          'Forker le dépôt sans lire la documentation',
          'Se familiariser avec le projet et lire le fichier CONTRIBUTING.md s\'il existe',
          'Contacter directement les mainteneurs pour demander des accès en écriture'
        ],
        correctAnswer: 2,
        explanation: 'Avant de contribuer à un projet open source, il est important de se familiariser avec celui-ci, comprendre son fonctionnement et lire attentivement la documentation de contribution (souvent dans un fichier CONTRIBUTING.md). Cela vous aidera à comprendre les attentes, le style de code, le processus de contribution et les guidelines du projet.'
      },
      {
        question: 'Quelle fonctionnalité GitHub vous permet de visualiser et gérer les tâches dans un format kanban ?',
        options: [
          'GitHub Issues',
          'GitHub Projects',
          'GitHub Discussions',
          'GitHub Pages'
        ],
        correctAnswer: 1,
        explanation: 'GitHub Projects est l\'outil de gestion de projet intégré qui vous permet de créer des tableaux de style kanban (et d\'autres vues) pour organiser, prioriser et suivre votre travail. Vous pouvez y ajouter des issues, des pull requests et des notes, et les organiser en colonnes personnalisables.'
      },
      {
        question: 'Quel est l\'avantage principal d\'utiliser des modèles d\'issues (issue templates) dans GitHub ?',
        options: [
          'Ils permettent de créer des issues automatiquement',
          'Ils standardisent le format et les informations demandées lors de la création d\'issues',
          'Ils ferment automatiquement les issues anciennes',
          'Ils permettent d\'assigner des issues à plusieurs personnes'
        ],
        correctAnswer: 1,
        explanation: 'Les modèles d\'issues (issue templates) standardisent le format et les informations demandées lors de la création d\'issues. Ils guident les contributeurs pour fournir toutes les informations nécessaires, comme les étapes de reproduction pour un bug, la version affectée, ou les détails d\'une fonctionnalité demandée, ce qui facilite le traitement et la résolution des issues.'
      },
      {
        question: 'Quel fichier est nécessaire pour configurer un workflow GitHub Actions ?',
        options: [
          'Un fichier .github/action.yml à la racine du dépôt',
          'Un fichier .github/workflows/*.yml dans le dépôt',
          'Un fichier .actions.json à la racine du dépôt',
          'Un fichier spécial configuré uniquement via l\'interface GitHub'
        ],
        correctAnswer: 1,
        explanation: 'Les workflows GitHub Actions sont configurés via des fichiers YAML placés dans le dossier .github/workflows/ de votre dépôt. Chaque fichier YAML dans ce dossier définit un workflow distinct avec ses déclencheurs, jobs et étapes.'
      },
      {
        question: 'Quelle commande utilise-t-on pour maintenir son fork à jour avec le dépôt original ?',
        options: [
          'git sync upstream',
          'git pull upstream main',
          'git update-fork',
          'git merge original/main'
        ],
        correctAnswer: 1,
        explanation: 'Pour maintenir votre fork à jour avec le dépôt original, vous devez d\'abord configurer le dépôt original comme remote "upstream" (`git remote add upstream URL_DU_REPO_ORIGINAL`), puis utiliser `git pull upstream main` (ou le nom de la branche principale) pour récupérer et fusionner les changements du dépôt original dans votre copie locale.'
      }
    ]
  }
];