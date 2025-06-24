export interface Chapter {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  estimatedTime: number;
  lessons: Lesson[];
  quiz: QuizItem[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  image?: string;
  codeExample?: string;
  duration: number;
}

export interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const chapters: Chapter[] = [
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
        title: 'Git vs GitHub : Quelle différence ?',
        content: `Git et GitHub sont deux outils distincts mais complémentaires dans l'écosystème du développement logiciel.

**Git** est un système de contrôle de version distribué créé par Linus Torvalds en 2005. Il permet de suivre les modifications de code, de revenir à des versions antérieures, et de travailler en parallèle sur différentes fonctionnalités. Git fonctionne localement sur votre machine et ne nécessite pas de connexion internet.

**GitHub** est une plateforme web qui héberge des dépôts Git dans le cloud. Elle ajoute une interface graphique et des fonctionnalités collaboratives comme les Pull Requests, les Issues, et la gestion des accès. GitHub facilite la collaboration entre développeurs et le partage de code.

En résumé, Git est l'outil de contrôle de version, tandis que GitHub est un service qui héberge vos projets Git et facilite la collaboration.`,
        image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg",
        codeExample: `# Exemple de commande Git locale
git init
git add .
git commit -m "Premier commit"

# Exemple d'interaction avec GitHub
git remote add origin https://github.com/utilisateur/depot.git
git push -u origin main`,
        duration: 10
      },
      {
        id: 'version-control-basics',
        title: 'Les bases du contrôle de version',
        content: `Le contrôle de version est un système qui enregistre les modifications apportées à un fichier ou un ensemble de fichiers au fil du temps. Il vous permet de revenir à des versions spécifiques ultérieurement.

**Pourquoi utiliser un contrôle de version ?**
- Historique complet des modifications
- Travail collaboratif sans conflits
- Expérimentation sans risque via les branches
- Traçabilité des changements

Git utilise un modèle de "snapshot" plutôt qu'un stockage des différences. Chaque fois que vous validez ou enregistrez l'état de votre projet, Git prend une "photo" de tous vos fichiers à ce moment-là et stocke une référence à cette image.

Les trois états de Git :
1. **Working Directory** : Où vous modifiez vos fichiers
2. **Staging Area** : Où vous préparez les modifications à commiter
3. **Repository** : Où les modifications sont enregistrées de façon permanente`,
        image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
        codeExample: `# Vérifier l'état de votre dépôt
git status

# Voir l'historique des commits
git log --oneline

# Comparer les différences
git diff`,
        duration: 15
      },
      {
        id: 'git-setup',
        title: 'Configuration de Git',
        content: `Avant de commencer à utiliser Git, vous devez le configurer sur votre machine. Voici les étapes essentielles :

**1. Installation de Git**
Selon votre système d'exploitation, téléchargez et installez Git depuis git-scm.com.

**2. Configuration de base**
Configurez votre identité Git, qui sera associée à vos commits :
- Définissez votre nom d'utilisateur
- Définissez votre email (utilisez le même que pour GitHub)
- Configurez l'éditeur par défaut

**3. Vérification de l'installation**
Assurez-vous que Git est correctement installé en vérifiant sa version.

**4. Configuration de l'authentification**
Pour interagir avec GitHub, vous devrez configurer une méthode d'authentification sécurisée, comme SSH ou un token d'accès personnel.`,
        image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
        codeExample: `# Configuration de base
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@exemple.com"

# Vérifier la configuration
git config --list

# Vérifier la version de Git
git --version`,
        duration: 10
      },
      {
        id: 'essential-commands',
        title: 'Commandes Git essentielles',
        content: `Voici les commandes Git que vous utiliserez quotidiennement :

**Initialisation et clonage**
- \`git init\` : Initialise un nouveau dépôt Git
- \`git clone [url]\` : Clone un dépôt existant

**Suivi des modifications**
- \`git status\` : Affiche l'état du répertoire de travail
- \`git add [fichier]\` : Ajoute un fichier à la zone de staging
- \`git add .\` : Ajoute tous les fichiers modifiés à la zone de staging
- \`git commit -m "[message]"\` : Enregistre les modifications dans le dépôt

**Synchronisation**
- \`git pull\` : Récupère et fusionne les modifications distantes
- \`git push\` : Envoie les commits locaux vers le dépôt distant

**Branches**
- \`git branch\` : Liste les branches
- \`git checkout -b [nom-branche]\` : Crée et bascule vers une nouvelle branche
- \`git merge [branche]\` : Fusionne une branche dans la branche active`,
        image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
        codeExample: `# Workflow Git typique
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/utilisateur/depot.git
git push -u origin main

# Créer et utiliser une branche
git checkout -b feature/nouvelle-fonctionnalite
# Faire des modifications...
git add .
git commit -m "Ajouter nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite`,
        duration: 20
      }
    ],
    quiz: [
      {
        question: "Quelle commande Git permet d'initialiser un nouveau dépôt ?",
        options: ["git start", "git init", "git create", "git new"],
        correctAnswer: 1,
        explanation: "La commande 'git init' initialise un nouveau dépôt Git dans le répertoire courant."
      },
      {
        question: "Quelle est la différence principale entre Git et GitHub ?",
        options: [
          "Git est payant, GitHub est gratuit",
          "Git est un système de contrôle de version, GitHub est une plateforme d'hébergement",
          "Git est pour Windows, GitHub pour Mac",
          "Git est pour le code privé, GitHub pour l'open source"
        ],
        correctAnswer: 1,
        explanation: "Git est un système de contrôle de version distribué qui fonctionne localement, tandis que GitHub est une plateforme web qui héberge des dépôts Git et ajoute des fonctionnalités collaboratives."
      },
      {
        question: "Quelle commande permet d'ajouter tous les fichiers modifiés à la zone de staging ?",
        options: ["git commit -a", "git add .", "git stage --all", "git update"],
        correctAnswer: 1,
        explanation: "La commande 'git add .' ajoute tous les fichiers modifiés du répertoire courant à la zone de staging."
      },
      {
        question: "Quel est l'ordre correct des étapes dans Git ?",
        options: [
          "Commit → Stage → Modify",
          "Modify → Commit → Stage",
          "Modify → Stage → Commit",
          "Stage → Modify → Commit"
        ],
        correctAnswer: 2,
        explanation: "Le flux de travail Git standard est : 1) Modifier les fichiers (Modify), 2) Ajouter les modifications à la zone de staging (Stage), 3) Valider les modifications (Commit)."
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
        id: 'creating-repos',
        title: 'Création de dépôts',
        content: `Un dépôt Git (ou "repo") est l'unité fondamentale de Git. Il contient tous les fichiers de votre projet ainsi que l'historique complet des modifications.

**Création d'un dépôt local**
Vous pouvez créer un nouveau dépôt Git de deux façons :
1. En initialisant un dépôt dans un répertoire existant
2. En clonant un dépôt existant depuis GitHub ou un autre service

**Initialisation d'un dépôt**
Lorsque vous initialisez un dépôt, Git crée un sous-répertoire caché .git qui contient toute la base de données et l'historique de votre projet.

**Clonage d'un dépôt**
Le clonage crée une copie locale complète d'un dépôt distant, incluant tous les fichiers, branches et l'historique complet des commits.

**Structure d'un dépôt Git**
- Répertoire .git : Contient la base de données Git
- Répertoire de travail : Les fichiers sur lesquels vous travaillez
- Zone de staging (index) : Préparation des modifications avant commit`,
        image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
        codeExample: `# Initialiser un nouveau dépôt
git init

# Cloner un dépôt existant
git clone https://github.com/utilisateur/depot.git

# Vérifier l'état du dépôt
git status`,
        duration: 15
      },
      {
        id: 'staging-area',
        title: 'La zone de staging',
        content: `La zone de staging (ou "index") est une caractéristique unique de Git qui sert d'intermédiaire entre votre répertoire de travail et l'historique de votre dépôt.

**Pourquoi une zone de staging ?**
- Permet de préparer soigneusement votre prochain commit
- Vous pouvez sélectionner précisément quels changements inclure
- Facilite la création de commits atomiques et cohérents

**Cycle de vie des fichiers dans Git**
1. **Untracked** : Fichiers que Git ne suit pas encore
2. **Tracked** : Fichiers que Git connaît, qui peuvent être :
   - **Unmodified** : Fichiers non modifiés depuis le dernier commit
   - **Modified** : Fichiers modifiés mais pas encore dans la zone de staging
   - **Staged** : Fichiers prêts à être inclus dans le prochain commit

**Commandes pour la zone de staging**
- \`git add\` : Ajoute des fichiers à la zone de staging
- \`git reset\` : Retire des fichiers de la zone de staging
- \`git diff --staged\` : Affiche les différences entre la zone de staging et le dernier commit`,
        image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg",
        codeExample: `# Ajouter un fichier spécifique
git add fichier.txt

# Ajouter tous les fichiers modifiés
git add .

# Ajouter tous les fichiers d'un certain type
git add *.js

# Retirer un fichier de la zone de staging
git reset HEAD fichier.txt`,
        duration: 15
      },
      {
        id: 'making-commits',
        title: 'Effectuer des commits',
        content: `Un commit est un instantané de votre projet à un moment donné. C'est l'unité fondamentale de l'historique Git.

**Anatomie d'un commit**
- Un identifiant unique (hash SHA-1)
- Un message décrivant les changements
- L'auteur et la date
- Un pointeur vers le commit parent
- Un instantané complet du projet

**Bonnes pratiques pour les messages de commit**
- Soyez concis mais descriptif
- Utilisez l'impératif présent (ex: "Ajoute" plutôt que "Ajouté")
- Limitez la première ligne à 50 caractères
- Expliquez le "pourquoi" plutôt que le "quoi"
- Référencez les numéros d'issues si applicable

**Types de commits**
- Commits atomiques : Une seule fonctionnalité ou correction par commit
- Commits de fusion : Intègrent les changements d'une branche à une autre
- Commits de réversion : Annulent les effets d'un commit précédent`,
        image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        codeExample: `# Commit de base
git commit -m "Ajoute la fonctionnalité de login"

# Commit avec description détaillée
git commit -m "Ajoute la fonctionnalité de login" -m "Cette implémentation inclut:
- Formulaire de connexion
- Validation des entrées
- Gestion des erreurs
- Tests unitaires"

# Commit en incluant tous les fichiers modifiés (sans git add)
git commit -am "Corrige les bugs d'affichage"`,
        duration: 15
      },
      {
        id: 'commit-history',
        title: 'Naviguer dans l\'historique',
        content: `L'historique des commits est l'un des atouts majeurs de Git. Il vous permet de voir l'évolution de votre projet et de revenir à n'importe quel état précédent.

**Visualisation de l'historique**
Git offre plusieurs façons de visualiser l'historique des commits, de la plus simple à la plus détaillée.

**Navigation dans l'historique**
Vous pouvez vous déplacer dans l'historique pour examiner ou restaurer des versions antérieures de votre projet.

**Comparaison des versions**
Git permet de comparer facilement différentes versions de fichiers ou de l'ensemble du projet.

**Recherche dans l'historique**
Vous pouvez rechercher des commits spécifiques par auteur, date, message ou contenu.`,
        image: "https://images.pexels.com/photos/7654096/pexels-photo-7654096.jpeg",
        codeExample: `# Afficher l'historique des commits
git log

# Afficher l'historique en une ligne par commit
git log --oneline

# Afficher l'historique avec un graphe
git log --graph --oneline --all

# Voir les modifications d'un commit spécifique
git show a1b2c3d

# Rechercher dans l'historique
git log --grep="bug fix"

# Comparer deux commits
git diff a1b2c3d..e4f5g6h`,
        duration: 15
      }
    ],
    quiz: [
      {
        question: "Quelle commande permet de voir l'état actuel de votre dépôt Git ?",
        options: ["git check", "git state", "git status", "git info"],
        correctAnswer: 2,
        explanation: "La commande 'git status' affiche l'état de votre répertoire de travail et de la zone de staging."
      },
      {
        question: "Qu'est-ce que la zone de staging dans Git ?",
        options: [
          "Un serveur distant où le code est stocké",
          "Une zone intermédiaire où les changements sont préparés avant d'être commités",
          "Une branche spéciale pour tester le code",
          "Un outil de débogage pour Git"
        ],
        correctAnswer: 1,
        explanation: "La zone de staging (ou index) est une zone intermédiaire où vous préparez les modifications que vous souhaitez inclure dans votre prochain commit."
      },
      {
        question: "Quelle est la bonne pratique pour les messages de commit ?",
        options: [
          "Utiliser des messages très courts comme 'fix' ou 'update'",
          "Inclure autant de détails que possible dans un seul commit",
          "Écrire des messages descriptifs qui expliquent le pourquoi du changement",
          "Toujours mentionner la date et l'heure dans le message"
        ],
        correctAnswer: 2,
        explanation: "Un bon message de commit doit être concis mais descriptif, expliquer pourquoi le changement a été fait plutôt que ce qui a été changé, et utiliser l'impératif présent."
      },
      {
        question: "Comment afficher l'historique des commits en une ligne par commit ?",
        options: [
          "git log --brief",
          "git log --oneline",
          "git history --compact",
          "git show --all"
        ],
        correctAnswer: 1,
        explanation: "La commande 'git log --oneline' affiche l'historique des commits de façon compacte, avec une ligne par commit."
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
        id: 'creating-branches',
        title: 'Créer des branches',
        content: `Les branches sont l'une des fonctionnalités les plus puissantes de Git. Elles permettent de développer des fonctionnalités, corriger des bugs ou expérimenter de nouvelles idées en parallèle, sans affecter la branche principale.

**Qu'est-ce qu'une branche ?**
Une branche dans Git est simplement un pointeur mobile vers un commit. La branche par défaut s'appelle généralement "main" (ou "master" dans les anciens dépôts).

**Pourquoi utiliser des branches ?**
- Développement parallèle de fonctionnalités
- Isolation des changements
- Expérimentation sans risque
- Organisation du travail d'équipe

**Types de branches courants**
- Branche principale (main/master) : code stable, prêt pour la production
- Branches de fonctionnalités : pour développer de nouvelles fonctionnalités
- Branches de correction : pour corriger des bugs
- Branches de release : pour préparer une nouvelle version`,
        image: "https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg",
        codeExample: `# Lister toutes les branches
git branch

# Créer une nouvelle branche
git branch nouvelle-fonctionnalite

# Créer et basculer vers une nouvelle branche
git checkout -b nouvelle-fonctionnalite

# Basculer entre les branches
git checkout main
git checkout nouvelle-fonctionnalite`,
        duration: 20
      },
      {
        id: 'merging',
        title: 'Fusion de branches',
        content: `La fusion (merge) est le processus qui consiste à intégrer les modifications d'une branche dans une autre. C'est ainsi que vous incorporez le travail effectué en parallèle.

**Types de fusion**
1. **Fast-forward** : Quand il n'y a pas de nouveaux commits dans la branche cible depuis la création de la branche source
2. **Merge commit** : Crée un nouveau commit qui combine les deux branches
3. **Squash merge** : Combine tous les commits de la branche source en un seul avant la fusion
4. **Rebase** : Réapplique les commits d'une branche sur une autre

**Processus de fusion**
1. Basculez vers la branche de destination
2. Utilisez la commande \`git merge\` pour fusionner la branche source
3. Résolvez les conflits si nécessaire
4. Commitez le résultat de la fusion

**Bonnes pratiques**
- Assurez-vous que votre branche de destination est à jour
- Testez votre code avant la fusion
- Utilisez des messages de commit descriptifs pour les fusions
- Supprimez les branches qui ne sont plus nécessaires après la fusion`,
        image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg",
        codeExample: `# Fusion simple
git checkout main
git merge feature-branch

# Fusion avec commit explicite (même s'il pourrait être fast-forward)
git merge --no-ff feature-branch

# Fusion avec squash (tous les commits combinés en un seul)
git merge --squash feature-branch
git commit -m "Fusionne feature-branch: ajoute la fonctionnalité X"

# Supprimer une branche après fusion
git branch -d feature-branch`,
        duration: 20
      },
      {
        id: 'conflicts',
        title: 'Résolution des conflits',
        content: `Les conflits de fusion se produisent lorsque Git ne peut pas automatiquement fusionner des modifications car elles affectent les mêmes parties d'un fichier. La résolution de ces conflits est une compétence essentielle pour tout utilisateur de Git.

**Pourquoi les conflits se produisent-ils ?**
Les conflits surviennent généralement quand :
- Deux branches modifient la même ligne d'un fichier
- Une branche supprime un fichier tandis qu'une autre le modifie
- Deux branches ajoutent un fichier avec le même nom mais un contenu différent

**Anatomie d'un conflit**
Git marque les zones de conflit dans les fichiers avec des délimiteurs spéciaux :
\`\`\`
<<<<<<< HEAD
Code de la branche courante
=======
Code de la branche à fusionner
>>>>>>> nom-de-branche
\`\`\`

**Processus de résolution**
1. Identifiez les fichiers en conflit (\`git status\`)
2. Ouvrez ces fichiers et localisez les marqueurs de conflit
3. Modifiez le contenu pour résoudre le conflit
4. Supprimez les marqueurs de conflit
5. Marquez le conflit comme résolu (\`git add\`)
6. Terminez la fusion (\`git commit\`)`,
        image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg",
        codeExample: `# Pendant une fusion avec conflits
git status  # Identifie les fichiers en conflit

# Après avoir résolu les conflits manuellement
git add fichier-avec-conflit.js
git commit  # Termine la fusion

# Abandonner une fusion en cas de problème
git merge --abort

# Utiliser un outil de résolution de conflits
git mergetool`,
        duration: 20
      },
      {
        id: 'branch-workflows',
        title: 'Workflows de branches',
        content: `Un workflow de branches est une stratégie pour organiser le développement avec Git. Différents workflows sont adaptés à différentes tailles d'équipes et types de projets.

**Git Flow**
Un modèle populaire avec deux branches principales :
- \`main\` : code de production stable
- \`develop\` : intégration des fonctionnalités
Et trois types de branches temporaires :
- \`feature/*\` : nouvelles fonctionnalités
- \`release/*\` : préparation des releases
- \`hotfix/*\` : corrections urgentes

**GitHub Flow**
Un workflow plus simple :
- Une seule branche principale (\`main\`)
- Branches de fonctionnalités créées directement depuis \`main\`
- Pull Requests pour réviser le code avant fusion
- Déploiement continu après fusion dans \`main\`

**GitLab Flow**
Une approche intermédiaire :
- Branche \`main\` + branches d'environnement (\`staging\`, \`production\`)
- Branches de fonctionnalités fusionnées dans \`main\`
- Promotion du code à travers les environnements

**Choisir le bon workflow**
- Taille de l'équipe
- Complexité du projet
- Fréquence de déploiement
- Besoins en matière de tests et de validation`,
        image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
        codeExample: `# Exemple de GitHub Flow
git checkout -b feature/nouvelle-fonctionnalite
# Développement...
git add .
git commit -m "Ajoute nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite
# Créer une Pull Request sur GitHub
# Après approbation, fusion sur GitHub ou:
git checkout main
git merge feature/nouvelle-fonctionnalite
git push origin main`,
        duration: 15
      }
    ],
    quiz: [
      {
        question: "Quelle commande permet de créer une nouvelle branche et de basculer dessus en une seule étape ?",
        options: [
          "git branch --switch nouvelle-branche",
          "git checkout -b nouvelle-branche",
          "git create -b nouvelle-branche",
          "git branch nouvelle-branche --checkout"
        ],
        correctAnswer: 1,
        explanation: "La commande 'git checkout -b nouvelle-branche' crée une nouvelle branche et bascule dessus en une seule opération."
      },
      {
        question: "Qu'est-ce qu'une fusion 'fast-forward' dans Git ?",
        options: [
          "Une fusion qui combine plusieurs commits en un seul",
          "Une fusion qui se produit quand la branche cible n'a pas de nouveaux commits depuis la création de la branche source",
          "Une fusion qui ignore les conflits automatiquement",
          "Une fusion qui utilise un algorithme plus rapide"
        ],
        correctAnswer: 1,
        explanation: "Une fusion 'fast-forward' se produit lorsque la branche cible (par exemple main) n'a pas de nouveaux commits depuis la création de la branche source. Git déplace simplement le pointeur de la branche cible vers le dernier commit de la branche source."
      },
      {
        question: "Comment résoudre un conflit de fusion dans Git ?",
        options: [
          "Utiliser 'git conflict --solve'",
          "Exécuter 'git merge --force' pour ignorer les conflits",
          "Modifier manuellement les fichiers pour résoudre les conflits, puis utiliser 'git add' et 'git commit'",
          "Supprimer la branche qui cause le conflit"
        ],
        correctAnswer: 2,
        explanation: "Pour résoudre un conflit de fusion, vous devez éditer manuellement les fichiers en conflit pour choisir quelles modifications conserver, supprimer les marqueurs de conflit (<<<<<<, =======, >>>>>>>), puis utiliser 'git add' pour marquer le conflit comme résolu et 'git commit' pour finaliser la fusion."
      },
      {
        question: "Quel workflow Git est le plus simple et se base principalement sur une seule branche principale ?",
        options: [
          "Git Flow",
          "GitHub Flow",
          "GitLab Flow",
          "Trunk-Based Development"
        ],
        correctAnswer: 1,
        explanation: "GitHub Flow est un workflow simple qui utilise une seule branche principale (main) et des branches de fonctionnalités temporaires. Il est conçu pour faciliter l'intégration continue et le déploiement continu."
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
        id: 'remote-setup',
        title: 'Configuration des dépôts distants',
        content: `Les dépôts distants sont des versions de votre projet hébergées sur Internet ou un réseau. Ils permettent la collaboration et servent de sauvegarde.

**Types de dépôts distants**
- **Origin** : Le dépôt distant par défaut, généralement votre fork ou dépôt principal
- **Upstream** : Le dépôt original dont vous avez fait un fork
- **Autres remotes** : Vous pouvez configurer plusieurs dépôts distants avec des noms différents

**Configuration d'un dépôt distant**
Pour collaborer avec d'autres développeurs, vous devez connecter votre dépôt local à un ou plusieurs dépôts distants.

**Authentification**
Pour interagir avec des dépôts distants, vous devez configurer l'authentification :
- HTTPS avec token d'accès personnel
- SSH avec paire de clés publique/privée`,
        image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg",
        codeExample: `# Ajouter un dépôt distant
git remote add origin https://github.com/utilisateur/depot.git

# Lister les dépôts distants
git remote -v

# Changer l'URL d'un dépôt distant
git remote set-url origin https://github.com/utilisateur/nouveau-depot.git

# Ajouter un dépôt upstream (pour les forks)
git remote add upstream https://github.com/original/depot.git`,
        duration: 10
      },
      {
        id: 'push-pull',
        title: 'Push et Pull',
        content: `Les commandes \`push\` et \`pull\` sont essentielles pour synchroniser votre travail entre votre dépôt local et les dépôts distants.

**Push : Envoyer des modifications**
La commande \`git push\` envoie vos commits locaux vers le dépôt distant. C'est ainsi que vous partagez votre travail avec d'autres.

**Pull : Récupérer des modifications**
La commande \`git pull\` récupère les modifications du dépôt distant et les fusionne automatiquement dans votre branche locale.

**Bonnes pratiques**
- Toujours faire un \`pull\` avant de commencer à travailler
- Faire des \`push\` réguliers pour sauvegarder votre travail
- Résoudre les conflits localement avant de pousser
- Utiliser des branches pour isoler les fonctionnalités`,
        image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg",
        codeExample: `# Pousser vers le dépôt distant
git push origin main

# Pousser une branche locale vers le distant
git push origin feature/nouvelle-fonctionnalite

# Configurer le suivi de branche (tracking)
git push -u origin feature/nouvelle-fonctionnalite

# Récupérer et fusionner les changements distants
git pull origin main

# Pull avec rebase au lieu de merge
git pull --rebase origin main`,
        duration: 15
      },
      {
        id: 'sync-management',
        title: 'Gestion de la synchronisation',
        content: `La synchronisation entre dépôts locaux et distants peut parfois être complexe. Comprendre les différents états de synchronisation est essentiel.

**États de synchronisation**
- **À jour** : Local et distant sont identiques
- **En avance** : Local a des commits que le distant n'a pas
- **En retard** : Distant a des commits que le local n'a pas
- **Divergé** : Local et distant ont tous deux des commits uniques

**Stratégies de synchronisation**
- **Pull régulier** : Maintient votre dépôt local à jour
- **Rebase vs Merge** : Différentes approches pour intégrer les changements distants
- **Force Push** : À utiliser avec précaution, réécrit l'historique distant

**Gestion des branches distantes**
Les branches distantes sont des références à l'état des branches sur le dépôt distant. Elles vous permettent de suivre ce qui se passe sur le serveur.`,
        image: "https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg",
        codeExample: `# Voir l'état de synchronisation
git fetch
git status

# Voir les différences avec le distant
git diff origin/main

# Supprimer une branche distante
git push origin --delete feature/terminee

# Nettoyer les références aux branches distantes supprimées
git remote prune origin

# Force push (ATTENTION: à utiliser avec précaution)
git push --force origin main`,
        duration: 15
      },
      {
        id: 'fetch-vs-pull',
        title: 'Fetch vs Pull',
        content: `\`git fetch\` et \`git pull\` sont deux commandes pour récupérer des modifications depuis un dépôt distant, mais elles fonctionnent différemment.

**Git Fetch**
- Récupère toutes les données des commits que vous n'avez pas encore
- Met à jour les branches distantes (origin/main, etc.)
- Ne modifie PAS votre répertoire de travail ou vos branches locales
- Vous permet d'inspecter les changements avant de les fusionner

**Git Pull**
- Équivalent à \`git fetch\` suivi de \`git merge\`
- Récupère les données ET fusionne automatiquement dans votre branche locale
- Modifie votre répertoire de travail pour refléter les changements distants
- Plus rapide mais moins contrôlé

**Quand utiliser l'un ou l'autre ?**
- Utilisez \`fetch\` quand vous voulez voir les changements avant de les intégrer
- Utilisez \`pull\` quand vous êtes prêt à intégrer immédiatement les changements
- \`fetch\` est plus sûr pour éviter les conflits inattendus`,
        image: "https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg",
        codeExample: `# Récupérer sans fusionner
git fetch origin

# Voir les changements récupérés
git log HEAD..origin/main

# Fusionner manuellement après fetch
git fetch origin
git merge origin/main

# Pull (fetch + merge automatique)
git pull origin main

# Pull avec rebase au lieu de merge
git pull --rebase origin main`,
        duration: 10
      }
    ],
    quiz: [
      {
        question: "Quelle commande permet d'ajouter un dépôt distant à votre projet Git ?",
        options: [
          "git distant add origin https://github.com/user/repo.git",
          "git remote create origin https://github.com/user/repo.git",
          "git remote add origin https://github.com/user/repo.git",
          "git add remote origin https://github.com/user/repo.git"
        ],
        correctAnswer: 2,
        explanation: "La commande 'git remote add origin https://github.com/user/repo.git' ajoute un dépôt distant nommé 'origin' pointant vers l'URL spécifiée."
      },
      {
        question: "Quelle est la différence entre 'git fetch' et 'git pull' ?",
        options: [
          "Ils sont identiques, ce sont juste des synonymes",
          "git fetch télécharge les changements sans les fusionner, git pull télécharge et fusionne",
          "git fetch fonctionne avec toutes les branches, git pull uniquement avec la branche actuelle",
          "git fetch est plus rapide mais moins sécurisé que git pull"
        ],
        correctAnswer: 1,
        explanation: "git fetch télécharge les changements du dépôt distant sans les fusionner dans votre branche locale, tandis que git pull télécharge les changements et les fusionne automatiquement."
      },
      {
        question: "Comment pousser une branche locale vers un dépôt distant pour la première fois en configurant le suivi ?",
        options: [
          "git push origin ma-branche",
          "git push -u origin ma-branche",
          "git push --track origin ma-branche",
          "git push origin ma-branche --set-upstream"
        ],
        correctAnswer: 1,
        explanation: "La commande 'git push -u origin ma-branche' pousse la branche locale vers le dépôt distant et configure le suivi (tracking) pour que les futures commandes push et pull fonctionnent sans spécifier l'origine et la branche."
      },
      {
        question: "Que signifie l'état 'divergé' entre votre branche locale et la branche distante ?",
        options: [
          "La branche distante a été supprimée",
          "Votre branche locale a des commits que la branche distante n'a pas, et vice versa",
          "Votre branche locale est en retard par rapport à la branche distante",
          "Votre branche locale a un nom différent de la branche distante"
        ],
        correctAnswer: 1,
        explanation: "Quand les branches ont 'divergé', cela signifie que votre branche locale a des commits que la branche distante n'a pas, et que la branche distante a également des commits que votre branche locale n'a pas. Cela nécessite généralement une fusion ou un rebase pour réconcilier les différences."
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
        id: 'pull-requests',
        title: 'Créer des Pull Requests',
        content: `Les Pull Requests (PR) sont au cœur de la collaboration sur GitHub. Elles permettent de proposer des modifications, de discuter des changements et de les réviser avant de les fusionner dans la branche principale.

**Qu'est-ce qu'une Pull Request ?**
Une Pull Request est une demande d'intégration de vos modifications dans une branche, généralement la branche principale d'un projet. Elle crée un espace de discussion autour de vos modifications.

**Cycle de vie d'une Pull Request**
1. Créer une branche pour vos modifications
2. Commiter vos changements
3. Pousser la branche vers GitHub
4. Créer une Pull Request sur GitHub
5. Discussion et révision du code
6. Apporter des modifications si nécessaire
7. Fusion de la PR dans la branche cible

**Bonnes pratiques**
- Créez une PR par fonctionnalité ou correction
- Donnez un titre clair et une description détaillée
- Référencez les issues liées
- Ajoutez des captures d'écran si pertinent
- Demandez une révision aux personnes appropriées`,
        image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
        codeExample: `# Workflow typique pour créer une PR
git checkout -b feature/nouvelle-fonctionnalite
# Développement...
git add .
git commit -m "Ajoute nouvelle fonctionnalité"
git push -u origin feature/nouvelle-fonctionnalite

# Ensuite, sur GitHub:
# 1. Naviguez vers votre dépôt
# 2. Cliquez sur "Compare & pull request"
# 3. Remplissez le titre et la description
# 4. Cliquez sur "Create pull request"`,
        duration: 25
      },
      {
        id: 'code-review',
        title: 'Revue de code',
        content: `La revue de code est une pratique essentielle pour maintenir la qualité du code et partager les connaissances au sein d'une équipe.

**Pourquoi faire des revues de code ?**
- Améliorer la qualité du code
- Détecter les bugs avant qu'ils n'atteignent la production
- Partager les connaissances et les bonnes pratiques
- Assurer la cohérence du code dans le projet

**Comment faire une bonne revue**
1. Comprendre le contexte et l'objectif des changements
2. Vérifier la fonctionnalité, la lisibilité et la maintenabilité
3. Être constructif et respectueux dans les commentaires
4. Suggérer des améliorations plutôt que d'imposer des solutions

**Répondre aux revues**
- Répondez à tous les commentaires
- Expliquez vos choix si nécessaire
- Soyez ouvert aux suggestions
- Apportez les modifications demandées ou discutez des alternatives`,
        image: "https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg",
        codeExample: `# Sur GitHub, vous pouvez commenter des lignes spécifiques:
# 1. Allez sur l'onglet "Files changed" de la PR
# 2. Survolez la ligne et cliquez sur le "+"
# 3. Écrivez votre commentaire

# Suggestions de code sur GitHub:
# \`\`\`suggestion
# Votre suggestion de code ici
# \`\`\`

# Après avoir apporté des modifications suite aux commentaires:
git add .
git commit -m "Adresse les commentaires de la revue"
git push origin feature/nouvelle-fonctionnalite`,
        duration: 20
      },
      {
        id: 'team-workflows',
        title: 'Workflows d\'équipe',
        content: `Un workflow d'équipe bien défini est essentiel pour une collaboration efficace. GitHub offre plusieurs modèles de workflow adaptés à différentes tailles d'équipes et types de projets.

**Modèles de workflow courants**
1. **Workflow centralisé** : Une seule branche principale, convient aux petites équipes
2. **Feature Branch Workflow** : Une branche par fonctionnalité, fusion via PR
3. **Gitflow** : Structure stricte avec branches de fonctionnalités, de release et de hotfix
4. **Forking Workflow** : Chaque contributeur a son propre fork, idéal pour l'open source

**Rôles dans une équipe Git**
- **Mainteneurs** : Gèrent le dépôt, examinent et fusionnent les PR
- **Contributeurs** : Développent des fonctionnalités et soumettent des PR
- **Reviewers** : Examinent le code et suggèrent des améliorations

**Outils de collaboration GitHub**
- Issues pour le suivi des tâches et bugs
- Projects pour la gestion de projet
- Discussions pour les conversations d'équipe
- Actions pour l'automatisation`,
        image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
        codeExample: `# Exemple de workflow avec protection de branche
# (Configuration sur GitHub)
# 1. Aller dans Settings > Branches
# 2. Ajouter une règle de protection pour 'main'
# 3. Exiger des revues de PR
# 4. Exiger des tests réussis

# Workflow typique de contribution
git checkout -b feature/ma-fonctionnalite
# Développement...
git add .
git commit -m "Implémente ma fonctionnalité"
git push -u origin feature/ma-fonctionnalite
# Créer une PR sur GitHub
# Attendre les revues et les tests
# Fusionner la PR sur GitHub`,
        duration: 25
      },
      {
        id: 'github-tools',
        title: 'Outils de collaboration GitHub',
        content: `GitHub offre de nombreux outils pour faciliter la collaboration au-delà du simple hébergement de code.

**Issues**
Les Issues permettent de suivre les bugs, les améliorations et les tâches. Elles peuvent être assignées, étiquetées et liées à des Pull Requests.

**Projects**
GitHub Projects est un outil de gestion de projet flexible qui permet de créer des tableaux Kanban, des listes de tâches et des roadmaps.

**Actions**
GitHub Actions permet d'automatiser des workflows comme les tests, le déploiement et d'autres tâches CI/CD directement dans votre dépôt.

**Discussions**
Les Discussions offrent un espace pour les conversations qui ne sont pas directement liées à des Issues ou des PR, comme les FAQ ou les annonces.

**Wikis**
Les Wikis GitHub permettent de créer une documentation collaborative pour votre projet.`,
        image: "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg",
        codeExample: `# Référencer une issue dans un commit
git commit -m "Corrige le problème de login, fixes #42"

# Fermer une issue avec un commit
git commit -m "Implémente la recherche avancée, closes #27"

# Exemple de workflow GitHub Actions (.github/workflows/tests.yml)
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test`,
        duration: 20
      }
    ],
    quiz: [
      {
        question: "Qu'est-ce qu'une Pull Request sur GitHub ?",
        options: [
          "Une demande pour télécharger le code d'un dépôt",
          "Une demande d'intégration de vos modifications dans une branche cible",
          "Une demande pour créer une nouvelle branche",
          "Une demande pour supprimer un dépôt"
        ],
        correctAnswer: 1,
        explanation: "Une Pull Request est une demande d'intégration de vos modifications (généralement d'une branche de fonctionnalité) dans une branche cible (généralement main). Elle permet la discussion, la revue de code et les tests avant la fusion."
      },
      {
        question: "Quelle est la meilleure pratique lors d'une revue de code ?",
        options: [
          "Rejeter systématiquement le code pour montrer votre expertise",
          "Approuver rapidement sans lire le code pour gagner du temps",
          "Faire des commentaires constructifs et spécifiques",
          "Réécrire entièrement le code vous-même"
        ],
        correctAnswer: 2,
        explanation: "Une bonne revue de code implique de faire des commentaires constructifs et spécifiques qui aident le développeur à améliorer son code. Il est important d'être respectueux, de se concentrer sur le code et non la personne, et de suggérer des améliorations concrètes."
      },
      {
        question: "Quel workflow Git est le plus adapté pour les grands projets avec des cycles de release planifiés ?",
        options: [
          "Workflow centralisé",
          "Feature Branch Workflow",
          "Gitflow",
          "GitHub Flow"
        ],
        correctAnswer: 2,
        explanation: "Gitflow est particulièrement adapté aux grands projets avec des cycles de release planifiés. Il définit une structure stricte avec des branches dédiées pour les fonctionnalités, les releases et les hotfixes, ce qui facilite la gestion de versions multiples en parallèle."
      },
      {
        question: "Comment référencer une issue GitHub dans un message de commit pour qu'elle soit automatiquement liée ?",
        options: [
          "Mentionner 'issue #42' dans le message",
          "Utiliser 'ref: #42' dans le message",
          "Utiliser 'fixes #42' ou 'closes #42' dans le message",
          "Ajouter l'URL complète de l'issue dans le message"
        ],
        correctAnswer: 2,
        explanation: "GitHub reconnaît certains mots-clés comme 'fixes', 'closes', ou 'resolves' suivis d'un numéro d'issue (ex: 'fixes #42') dans les messages de commit. Ces références créent automatiquement un lien entre le commit et l'issue, et peuvent même fermer l'issue automatiquement lorsque le commit est fusionné dans la branche par défaut."
      }
    ]
  },
  {
    id: 'workflows',
    title: 'Workflows Git',
    description: 'Explorez différents modèles de workflow Git et choisissez celui qui convient le mieux à votre équipe.',
    objectives: [
      "Comprendre les différents workflows Git",
      "Maîtriser Gitflow et GitHub Flow",
      "Adapter les workflows à vos besoins",
      "Automatiser votre workflow avec CI/CD"
    ],
    estimatedTime: 60,
    lessons: [
      {
        id: 'workflow-models',
        title: 'Modèles de workflow',
        content: `Un workflow Git définit comment votre équipe utilise Git pour collaborer efficacement. Choisir le bon workflow peut considérablement améliorer la productivité et la qualité du code.

**Pourquoi adopter un workflow structuré ?**
- Standardise les processus de développement
- Réduit les conflits et les erreurs
- Facilite l'intégration des nouveaux membres
- Améliore la traçabilité des changements

**Principaux modèles de workflow**
Plusieurs modèles ont émergé, chacun avec ses avantages et inconvénients :
1. **Workflow centralisé** : Simple mais limité
2. **Feature Branch Workflow** : Flexible et adapté à la plupart des équipes
3. **Gitflow** : Structuré et rigoureux
4. **GitHub Flow** : Simple et orienté déploiement continu
5. **GitLab Flow** : Équilibre entre simplicité et structure

Le choix dépend de la taille de votre équipe, de la complexité du projet, et de votre stratégie de déploiement.`,
        image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
        codeExample: `# Exemple de Feature Branch Workflow
# 1. Créer une branche pour la fonctionnalité
git checkout -b feature/nouvelle-recherche

# 2. Développer et commiter
git add .
git commit -m "Implémente la recherche avancée"

# 3. Pousser la branche
git push -u origin feature/nouvelle-recherche

# 4. Créer une Pull Request sur GitHub
# 5. Après approbation, fusionner et supprimer la branche
git checkout main
git pull
git branch -d feature/nouvelle-recherche`,
        duration: 15
      },
      {
        id: 'gitflow',
        title: 'Gitflow en détail',
        content: `Gitflow est un workflow Git populaire développé par Vincent Driessen. Il définit un modèle de branchement strict conçu pour gérer les releases de logiciels.

**Structure des branches dans Gitflow**
- **main** : Contient uniquement le code de production stable
- **develop** : Branche d'intégration principale
- **feature/*** : Branches pour développer de nouvelles fonctionnalités
- **release/*** : Branches pour préparer une nouvelle version
- **hotfix/*** : Branches pour les corrections urgentes en production

**Cycle de vie d'une fonctionnalité**
1. Créer une branche feature depuis develop
2. Développer la fonctionnalité
3. Fusionner dans develop via Pull Request
4. Supprimer la branche feature

**Cycle de vie d'une release**
1. Créer une branche release depuis develop
2. Corriger les bugs mineurs et préparer la release
3. Fusionner dans main ET develop
4. Tagger la version sur main

**Avantages et inconvénients**
+ Structure claire et bien définie
+ Adapté aux projets avec des cycles de release planifiés
- Complexité accrue
- Peut être trop rigide pour certaines équipes`,
        image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
        codeExample: `# Installation de l'extension git-flow
# (Optionnel mais facilite l'utilisation)
# brew install git-flow (macOS) ou apt-get install git-flow (Linux)

# Initialisation de git-flow dans un dépôt
git flow init

# Développer une fonctionnalité
git flow feature start nouvelle-fonctionnalite
# Développement...
git add .
git commit -m "Implémente nouvelle fonctionnalité"
git flow feature finish nouvelle-fonctionnalite

# Créer une release
git flow release start 1.0.0
# Corrections de bugs mineurs...
git flow release finish 1.0.0

# Créer un hotfix
git flow hotfix start bug-critique
# Correction...
git flow hotfix finish bug-critique`,
        duration: 15
      },
      {
        id: 'github-flow',
        title: 'GitHub Flow',
        content: `GitHub Flow est un workflow léger, basé sur les branches, qui prend en charge les équipes et projets où les déploiements sont fréquents.

**Principes du GitHub Flow**
1. Tout ce qui est dans la branche \`main\` est déployable
2. Créer des branches descriptives à partir de \`main\` pour les nouvelles fonctionnalités
3. Pousser régulièrement vers la branche distante
4. Ouvrir une Pull Request à tout moment pour solliciter des retours
5. Fusionner dans \`main\` après approbation de la PR
6. Déployer immédiatement après la fusion

**Avantages**
- Simple et facile à comprendre
- Parfait pour l'intégration continue et le déploiement continu
- Favorise la collaboration et les retours rapides
- Moins de frictions et d'overhead

**Inconvénients**
- Moins structuré que Gitflow
- Peut être difficile à gérer pour les projets avec plusieurs versions en production
- Nécessite une bonne couverture de tests automatisés`,
        image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
        codeExample: `# Workflow GitHub Flow typique

# 1. Créer une branche depuis main
git checkout main
git pull
git checkout -b feature/nouvelle-fonctionnalite

# 2. Développer avec des commits réguliers
git add .
git commit -m "Ajoute la structure de base"
# Plus de développement...
git commit -m "Finalise l'implémentation"

# 3. Pousser la branche vers GitHub
git push -u origin feature/nouvelle-fonctionnalite

# 4. Créer une Pull Request sur GitHub

# 5. Discuter, itérer et commiter si nécessaire
git add .
git commit -m "Adresse les retours de la PR"
git push origin feature/nouvelle-fonctionnalite

# 6. Après approbation, fusionner sur GitHub
# 7. Supprimer la branche localement
git checkout main
git pull
git branch -d feature/nouvelle-fonctionnalite`,
        duration: 15
      },
      {
        id: 'ci-cd',
        title: 'Automatisation avec CI/CD',
        content: `L'intégration continue (CI) et le déploiement continu (CD) sont des pratiques qui automatisent les tests, l'intégration et le déploiement du code. Elles s'intègrent parfaitement avec les workflows Git.

**Intégration Continue (CI)**
- Exécution automatique des tests à chaque push
- Vérification de la qualité du code
- Détection précoce des problèmes
- Feedback rapide aux développeurs

**Déploiement Continu (CD)**
- Déploiement automatique après validation des tests
- Livraison rapide des nouvelles fonctionnalités
- Réduction des erreurs humaines
- Déploiements plus fréquents et plus petits

**Outils CI/CD pour GitHub**
- **GitHub Actions** : Solution intégrée à GitHub
- **Jenkins** : Serveur d'automatisation open source
- **Travis CI** : Service CI populaire pour les projets open source
- **CircleCI** : Plateforme CI/CD cloud

**Bonnes pratiques**
- Automatiser les tests unitaires, d'intégration et end-to-end
- Vérifier la qualité du code avec des linters
- Construire et tester dans un environnement similaire à la production
- Utiliser des environnements de staging avant la production`,
        image: "https://images.pexels.com/photos/1181290/pexels-photo-1181290.jpeg",
        codeExample: `# Exemple de workflow GitHub Actions
# Fichier: .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run linter
        run: npm run lint

  deploy:
    needs: test
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: ./deploy.sh
        env:
          DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}`,
        duration: 15
      }
    ],
    quiz: [
      {
        question: "Quel workflow Git est le plus adapté pour les projets avec des cycles de release planifiés ?",
        options: [
          "GitHub Flow",
          "Workflow centralisé",
          "Gitflow",
          "Trunk-based Development"
        ],
        correctAnswer: 2,
        explanation: "Gitflow est spécialement conçu pour les projets avec des cycles de release planifiés. Sa structure avec des branches dédiées pour les fonctionnalités, les releases et les hotfixes permet de gérer efficacement plusieurs versions en parallèle."
      },
      {
        question: "Dans GitHub Flow, quelle est la règle concernant la branche principale (main) ?",
        options: [
          "Elle ne doit jamais être modifiée directement",
          "Elle contient uniquement du code de développement",
          "Tout ce qui s'y trouve est déployable",
          "Elle doit être fusionnée dans une branche de release avant déploiement"
        ],
        correctAnswer: 2,
        explanation: "Un principe fondamental de GitHub Flow est que tout ce qui se trouve dans la branche main est déployable. Cela signifie que le code doit toujours être stable et prêt à être mis en production."
      },
      {
        question: "Qu'est-ce que l'intégration continue (CI) ?",
        options: [
          "Une technique pour fusionner toutes les branches en une seule",
          "L'automatisation des tests à chaque push ou pull request",
          "Un outil pour gérer les conflits de fusion",
          "Une méthode pour intégrer le code de plusieurs développeurs"
        ],
        correctAnswer: 1,
        explanation: "L'intégration continue (CI) est une pratique qui consiste à automatiser l'exécution des tests à chaque push ou pull request. Cela permet de détecter rapidement les problèmes et d'assurer que les nouvelles modifications ne cassent pas le code existant."
      },
      {
        question: "Dans Gitflow, quelle branche sert de base pour créer une branche de hotfix ?",
        options: [
          "develop",
          "release",
          "feature",
          "main (ou master)"
        ],
        correctAnswer: 3,
        explanation: "Dans Gitflow, les branches de hotfix sont créées à partir de la branche main (ou master), car elles sont destinées à corriger des bugs critiques en production. Une fois terminées, elles sont fusionnées à la fois dans main et dans develop."
      }
    ]
  }
];

export const menuItems = [
  {
    id: 'accueil',
    title: 'Page d\'Accueil',
    subtitle: 'Vue d\'ensemble principale avec présentation du contenu',
    icon: 'Home',
    completed: true
  },
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
];