import React, { useState, useEffect } from 'react';
import { Home, Lock, LayoutDashboard, BookOpen, GitBranch, Cloud, Users, Settings, Play, PenTool, CheckCircle, MessageSquare, TrendingUp, Award, Share, Download, ChevronRight, GitCommit, Factory as Repository } from 'lucide-react';

// Import des composants
import TutorialLayout from './components/layout/TutorialLayout';
import ChapterIntro from './components/tutorial/ChapterIntro';
import LessonContent from './components/tutorial/LessonContent';
import StepByStep from './components/tutorial/StepByStep';
import QuizQuestion from './components/tutorial/QuizQuestion';
import PracticeExercise from './components/tutorial/PracticeExercise';
import GitCommandSimulator from './components/interactive/GitCommandSimulator';
import BranchCreator from './components/interactive/BranchCreator';
import GitRepositoryPlayground from './components/interactive/GitRepositoryPlayground';
import ConflictResolver from './components/interactive/ConflictResolver';
import PullRequestCreator from './components/interactive/PullRequestCreator';
import CollaborationSimulator from './components/interactive/CollaborationSimulator';
import CommitTimeline from './components/visualizations/CommitTimeline';
import BranchDiagram from './components/visualizations/BranchDiagram';
import GitGraph from './components/visualizations/GitGraph';
import DiffViewer from './components/visualizations/DiffViewer';
import FileTreeViewer from './components/visualizations/FileTreeViewer';
import AnimatedFlow from './components/visualizations/AnimatedFlow';
import ConceptDiagram from './components/visualizations/ConceptDiagram';
import NetworkGraph from './components/visualizations/NetworkGraph';
import StatisticsChart from './components/visualizations/StatisticsChart';
import ChapterSummary from './components/tutorial/ChapterSummary';
import GitVsGitHubComparison from './components/tutorial/GitVsGitHubComparison';
import VersioningDemo from './components/tutorial/VersioningDemo';
import LocalVsRemoteVisual from './components/tutorial/LocalVsRemoteVisual';
import Button from './components/ui/Button';
import NavigationControls from './components/tutorial/NavigationControls';

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  completed?: boolean;
  inProgress?: boolean;
}

interface Section {
  id: string;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  items: MenuItem[];
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  estimatedTime: number;
  lessons: Lesson[];
  quiz: QuizItem[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  image?: string;
  codeExample?: string;
  duration: number;
}

interface QuizItem {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface UserProgress {
  currentChapter: number;
  currentLesson: number;
  completedLessons: string[];
  completedChapters: string[];
  completedQuizzes: string[];
  lastPosition: {
    view: string;
    chapterId?: string;
    lessonId?: string;
    quizIndex?: number;
  };
}

function App() {
  const [selectedItem, setSelectedItem] = useState<string>('accueil');
  const [currentView, setCurrentView] = useState<'chapter-intro' | 'lesson' | 'quiz' | 'chapter-summary'>('chapter-intro');
  const [currentChapter, setCurrentChapter] = useState<number>(0);
  const [currentLesson, setCurrentLesson] = useState<number>(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const savedProgress = localStorage.getItem('tutorial-progress');
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
    return {
      currentChapter: 0,
      currentLesson: 0,
      completedLessons: [],
      completedChapters: [],
      completedQuizzes: [],
      lastPosition: {
        view: 'accueil'
      }
    };
  });

  // Définition des chapitres, leçons et quiz
  const chapters: Chapter[] = [
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
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}`,
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

  const sections: Section[] = [
    {
      id: 'entry',
      title: 'Phase d\'Entrée',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500/30',
      items: [
        {
          id: 'accueil',
          title: 'Page d\'Accueil',
          subtitle: 'Vue d\'ensemble principale avec présentation du contenu',
          icon: Home,
          completed: true
        },
        {
          id: 'auth',
          title: 'Authentification',
          subtitle: 'Connexion système et gestion compte programmeur',
          icon: Lock
        },
        {
          id: 'dashboard',
          title: 'Tableau de Bord',
          subtitle: 'Vue d\'ensemble de la progression et éléments clés du système',
          icon: LayoutDashboard
        }
      ]
    },
    {
      id: 'learning',
      title: 'Parcours d\'Apprentissage',
      color: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-500/30',
      items: [
        {
          id: 'intro',
          title: 'Chapitre 1: Introduction',
          subtitle: 'Git vs GitHub, concepts de base',
          icon: BookOpen,
          inProgress: userProgress.currentChapter === 0,
          completed: userProgress.completedChapters.includes('intro')
        },
        {
          id: 'repositories',
          title: 'Chapitre 2: Dépôts',
          subtitle: 'Création, commits, historique',
          icon: Repository,
          inProgress: userProgress.currentChapter === 1,
          completed: userProgress.completedChapters.includes('repositories')
        },
        {
          id: 'branches',
          title: 'Chapitre 3: Branches',
          subtitle: 'Création, fusion, workflows',
          icon: GitBranch,
          inProgress: userProgress.currentChapter === 2,
          completed: userProgress.completedChapters.includes('branches')
        },
        {
          id: 'remote',
          title: 'Chapitre 4: Dépôts Distants',
          subtitle: 'Push, pull, synchronisation',
          icon: Cloud,
          inProgress: userProgress.currentChapter === 3,
          completed: userProgress.completedChapters.includes('remote')
        },
        {
          id: 'collaboration',
          title: 'Chapitre 5: Collaboration',
          subtitle: 'Pull Requests, revue de code',
          icon: Users,
          inProgress: userProgress.currentChapter === 4,
          completed: userProgress.completedChapters.includes('collaboration')
        }
      ]
    },
    {
      id: 'activities',
      title: 'Activités Interactives',
      color: 'text-orange-400',
      bgColor: 'bg-orange-900/20',
      borderColor: 'border-orange-500/30',
      items: [
        {
          id: 'technical',
          title: 'Contrôle Technique',
          subtitle: 'Validation des compétences avec retour directe',
          icon: Settings
        },
        {
          id: 'simulation',
          title: 'Simulation Interactive',
          subtitle: 'Visualisation directe des concepts Git',
          icon: Play
        },
        {
          id: 'practice',
          title: 'Exercice Pratique',
          subtitle: 'Application par construction en suivant',
          icon: PenTool
        }
      ]
    },
    {
      id: 'validation',
      title: 'Validation & Feedback',
      color: 'text-pink-400',
      bgColor: 'bg-pink-900/20',
      borderColor: 'border-pink-500/30',
      items: [
        {
          id: 'evaluation',
          title: 'Évaluation Automatique',
          subtitle: 'Validation des étapes et du devoirs',
          icon: CheckCircle
        },
        {
          id: 'feedback',
          title: 'Feedback Personnalisé',
          subtitle: 'Conseils et suggestions basés sur le progrès',
          icon: MessageSquare
        },
        {
          id: 'progress',
          title: 'Suivi/mode Progression',
          subtitle: 'Suivi des progrès individuels via l\'envi de logiciel',
          icon: TrendingUp
        }
      ]
    },
    {
      id: 'achievement',
      title: 'Achèvement',
      color: 'text-purple-400',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-500/30',
      items: [
        {
          id: 'summary',
          title: 'Résumé de Chapitre',
          subtitle: 'Récapitulatif par activité clés acquises',
          icon: BookOpen
        },
        {
          id: 'certificate',
          title: 'Certificat de Complétion',
          subtitle: 'Validation officielle des compétences acquises',
          icon: Award
        },
        {
          id: 'export',
          title: 'Partage & Export',
          subtitle: 'Partage social et téléchargement PDF',
          icon: Share
        }
      ]
    }
  ];

  // Effet pour sauvegarder la progression
  useEffect(() => {
    localStorage.setItem('tutorial-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Effet pour restaurer la dernière position
  useEffect(() => {
    if (userProgress.lastPosition) {
      if (userProgress.lastPosition.view === 'chapter-intro' || 
          userProgress.lastPosition.view === 'lesson' || 
          userProgress.lastPosition.view === 'quiz' || 
          userProgress.lastPosition.view === 'chapter-summary') {
        setCurrentView(userProgress.lastPosition.view);
      } else {
        setSelectedItem(userProgress.lastPosition.view);
      }
      
      if (userProgress.lastPosition.chapterId) {
        const chapterIndex = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
        if (chapterIndex !== -1) {
          setCurrentChapter(chapterIndex);
        }
      }
      
      if (userProgress.lastPosition.lessonId && userProgress.lastPosition.chapterId) {
        const chapterIndex = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
        if (chapterIndex !== -1) {
          const lessonIndex = chapters[chapterIndex].lessons.findIndex(l => l.id === userProgress.lastPosition.lessonId);
          if (lessonIndex !== -1) {
            setCurrentLesson(lessonIndex);
          }
        }
      }
      
      if (userProgress.lastPosition.quizIndex !== undefined) {
        setCurrentQuizIndex(userProgress.lastPosition.quizIndex);
      }
    }
  }, []);

  const startChapter = (chapterId: string) => {
    const chapterIndex = chapters.findIndex(c => c.id === chapterId);
    if (chapterIndex !== -1) {
      setCurrentChapter(chapterIndex);
      setCurrentLesson(0);
      setCurrentView('lesson');
      setCurrentQuizIndex(0);
      setQuizCompleted(false);
      
      // Mettre à jour la progression
      setUserProgress(prev => ({
        ...prev,
        currentChapter: chapterIndex,
        currentLesson: 0,
        lastPosition: {
          view: 'lesson',
          chapterId: chapters[chapterIndex].id,
          lessonId: chapters[chapterIndex].lessons[0].id
        }
      }));
    }
  };

  const completeLesson = () => {
    const currentChapterId = chapters[currentChapter].id;
    const currentLessonId = chapters[currentChapter].lessons[currentLesson].id;
    
    // Marquer la leçon comme complétée
    setUserProgress(prev => {
      const completedLessons = [...prev.completedLessons];
      if (!completedLessons.includes(currentLessonId)) {
        completedLessons.push(currentLessonId);
      }
      return {
        ...prev,
        completedLessons
      };
    });
    
    // Passer à la leçon suivante ou au quiz
    if (currentLesson < chapters[currentChapter].lessons.length - 1) {
      // Passer à la leçon suivante
      setCurrentLesson(currentLesson + 1);
      
      // Mettre à jour la progression
      setUserProgress(prev => ({
        ...prev,
        currentLesson: currentLesson + 1,
        lastPosition: {
          view: 'lesson',
          chapterId: currentChapterId,
          lessonId: chapters[currentChapter].lessons[currentLesson + 1].id
        }
      }));
    } else {
      // Toutes les leçons sont terminées, passer au quiz
      setCurrentView('quiz');
      setCurrentQuizIndex(0);
      
      // Mettre à jour la progression
      setUserProgress(prev => ({
        ...prev,
        lastPosition: {
          view: 'quiz',
          chapterId: currentChapterId,
          quizIndex: 0
        }
      }));
    }
  };

  const handleQuizAnswer = (correct: boolean) => {
    // Si la réponse est correcte, on peut passer à la question suivante
    if (correct) {
      if (currentQuizIndex < chapters[currentChapter].quiz.length - 1) {
        // Passer à la question suivante
        setCurrentQuizIndex(currentQuizIndex + 1);
        
        // Mettre à jour la progression
        setUserProgress(prev => ({
          ...prev,
          lastPosition: {
            ...prev.lastPosition,
            quizIndex: currentQuizIndex + 1
          }
        }));
      } else {
        // Toutes les questions sont terminées
        setQuizCompleted(true);
        
        // Marquer le chapitre comme complété
        const currentChapterId = chapters[currentChapter].id;
        setUserProgress(prev => {
          const completedChapters = [...prev.completedChapters];
          if (!completedChapters.includes(currentChapterId)) {
            completedChapters.push(currentChapterId);
          }
          return {
            ...prev,
            completedChapters,
            completedQuizzes: [...prev.completedQuizzes, currentChapterId],
            lastPosition: {
              view: 'chapter-summary',
              chapterId: currentChapterId
            }
          };
        });
        
        // Afficher le résumé du chapitre
        setCurrentView('chapter-summary');
      }
    }
  };

  const goToNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      // Passer au chapitre suivant
      setCurrentChapter(currentChapter + 1);
      setCurrentLesson(0);
      setCurrentView('chapter-intro');
      setCurrentQuizIndex(0);
      setQuizCompleted(false);
      
      // Mettre à jour la progression
      setUserProgress(prev => ({
        ...prev,
        currentChapter: currentChapter + 1,
        currentLesson: 0,
        lastPosition: {
          view: 'chapter-intro',
          chapterId: chapters[currentChapter + 1].id
        }
      }));
    } else {
      // Tous les chapitres sont terminés, retourner à l'accueil
      setSelectedItem('certificate');
      
      // Mettre à jour la progression
      setUserProgress(prev => ({
        ...prev,
        lastPosition: {
          view: 'certificate'
        }
      }));
    }
  };

  const renderMainContent = () => {
    // Si nous sommes dans le flux du tutoriel
    if (currentView === 'chapter-intro') {
      return (
        <ChapterIntro
          chapterNumber={currentChapter + 1}
          title={chapters[currentChapter].title}
          description={chapters[currentChapter].description}
          objectives={chapters[currentChapter].objectives}
          estimatedTime={chapters[currentChapter].estimatedTime}
          onStart={() => {
            setCurrentView('lesson');
            setUserProgress(prev => ({
              ...prev,
              lastPosition: {
                view: 'lesson',
                chapterId: chapters[currentChapter].id,
                lessonId: chapters[currentChapter].lessons[0].id
              }
            }));
          }}
        />
      );
    }
    
    if (currentView === 'lesson') {
      const lesson = chapters[currentChapter].lessons[currentLesson];
      return (
        <div className="space-y-6">
          <LessonContent
            title={lesson.title}
            content={lesson.content}
            duration={lesson.duration}
            objectives={chapters[currentChapter].objectives}
            difficulty="beginner"
          />
          
          {lesson.image && (
            <div className="max-w-3xl mx-auto">
              <img 
                src={lesson.image} 
                alt={lesson.title} 
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          )}
          
          {lesson.codeExample && (
            <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Exemple de code</h3>
              <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap">
                <code>{lesson.codeExample}</code>
              </pre>
            </div>
          )}
          
          <NavigationControls
            onPrevious={() => {
              if (currentLesson > 0) {
                setCurrentLesson(currentLesson - 1);
                setUserProgress(prev => ({
                  ...prev,
                  currentLesson: currentLesson - 1,
                  lastPosition: {
                    view: 'lesson',
                    chapterId: chapters[currentChapter].id,
                    lessonId: chapters[currentChapter].lessons[currentLesson - 1].id
                  }
                }));
              } else {
                setCurrentView('chapter-intro');
                setUserProgress(prev => ({
                  ...prev,
                  lastPosition: {
                    view: 'chapter-intro',
                    chapterId: chapters[currentChapter].id
                  }
                }));
              }
            }}
            onNext={completeLesson}
            showProgress={true}
            currentStep={currentLesson + 1}
            totalSteps={chapters[currentChapter].lessons.length}
            disabled={{
              previous: currentLesson === 0 && currentView === 'chapter-intro',
              next: false
            }}
          />
        </div>
      );
    }
    
    if (currentView === 'quiz') {
      const quiz = chapters[currentChapter].quiz[currentQuizIndex];
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Quiz - {chapters[currentChapter].title}
            </h2>
            <p className="text-gray-300">Testez vos connaissances sur ce chapitre</p>
          </div>
          
          <QuizQuestion
            question={quiz.question}
            options={quiz.options}
            correctAnswer={quiz.correctAnswer}
            explanation={quiz.explanation}
            onAnswer={handleQuizAnswer}
          />
          
          <div className="flex justify-between">
            <Button
              variant="secondary"
              onClick={() => {
                setCurrentView('lesson');
                setCurrentLesson(chapters[currentChapter].lessons.length - 1);
                setUserProgress(prev => ({
                  ...prev,
                  lastPosition: {
                    view: 'lesson',
                    chapterId: chapters[currentChapter].id,
                    lessonId: chapters[currentChapter].lessons[chapters[currentChapter].lessons.length - 1].id
                  }
                }));
              }}
            >
              Retour à la leçon
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">
                Question {currentQuizIndex + 1} sur {chapters[currentChapter].quiz.length}
              </span>
            </div>
          </div>
        </div>
      );
    }
    
    if (currentView === 'chapter-summary') {
      return (
        <ChapterSummary
          chapterNumber={currentChapter + 1}
          title={chapters[currentChapter].title}
          completedObjectives={chapters[currentChapter].objectives}
          keyTakeaways={[
            "Vous avez maîtrisé les concepts clés de ce chapitre",
            "Vous pouvez maintenant appliquer ces connaissances dans vos projets",
            "Continuez à pratiquer pour renforcer votre compréhension"
          ]}
          nextChapterTitle={currentChapter < chapters.length - 1 ? chapters[currentChapter + 1].title : undefined}
          onContinue={goToNextChapter}
          onReview={() => {
            setCurrentView('chapter-intro');
            setUserProgress(prev => ({
              ...prev,
              lastPosition: {
                view: 'chapter-intro',
                chapterId: chapters[currentChapter].id
              }
            }));
          }}
        />
      );
    }

    // Sinon, afficher le contenu standard
    switch (selectedItem) {
      case 'accueil':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <GitCommit className="h-12 w-12 text-blue-400" />
                <h1 className="text-4xl font-bold text-white">Tutoriel Git & GitHub</h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Maîtrisez les fondamentaux du contrôle de version avec Git et GitHub à travers 
                un parcours d'apprentissage interactif et progressif.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="h-8 w-8 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">5 Chapitres</h3>
                </div>
                <p className="text-gray-300">
                  Un parcours structuré couvrant tous les aspects essentiels de Git et GitHub
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Play className="h-8 w-8 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Interactif</h3>
                </div>
                <p className="text-gray-300">
                  Simulations et exercices pratiques pour une meilleure compréhension
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="h-8 w-8 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Certification</h3>
                </div>
                <p className="text-gray-300">
                  Obtenez votre certificat de complétion à la fin du parcours
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-4">Prêt à commencer ?</h2>
              <p className="text-gray-300 mb-6">
                Démarrez votre apprentissage avec le Chapitre 1: Introduction aux concepts de base de Git et GitHub.
              </p>
              <button 
                onClick={() => {
                  setCurrentChapter(0);
                  setCurrentView('chapter-intro');
                  setUserProgress(prev => ({
                    ...prev,
                    lastPosition: {
                      view: 'chapter-intro',
                      chapterId: chapters[0].id
                    }
                  }));
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>Commencer le tutoriel</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        );
      
      case 'intro':
        return (
          <ChapterIntro
            chapterNumber={1}
            title="Introduction à Git et GitHub"
            description="Découvrez les concepts fondamentaux du contrôle de version et la différence entre Git et GitHub."
            objectives={[
              "Comprendre la différence entre Git et GitHub",
              "Apprendre les concepts de base du contrôle de version",
              "Configurer votre premier dépôt Git",
              "Maîtriser les commandes Git essentielles"
            ]}
            estimatedTime={45}
            onStart={() => startChapter('intro')}
          />
        );

      case 'repositories':
        return (
          <div className="space-y-8">
            <ChapterIntro
              chapterNumber={2}
              title="Dépôts et Commits"
              description="Apprenez à créer et gérer des dépôts Git, ainsi qu'à effectuer vos premiers commits."
              objectives={[
                "Créer un nouveau dépôt Git",
                "Comprendre la zone de staging",
                "Effectuer des commits significatifs",
                "Naviguer dans l'historique des commits"
              ]}
              estimatedTime={60}
              onStart={() => startChapter('repositories')}
            />
            <GitRepositoryPlayground />
            <CommitTimeline />
          </div>
        );

      case 'branches':
        return (
          <div className="space-y-8">
            <ChapterIntro
              chapterNumber={3}
              title="Branches et Fusion"
              description="Maîtrisez la création de branches et les techniques de fusion pour un développement parallèle."
              objectives={[
                "Créer et gérer des branches",
                "Comprendre les stratégies de fusion",
                "Résoudre les conflits de fusion",
                "Utiliser les workflows de branches"
              ]}
              estimatedTime={75}
              onStart={() => startChapter('branches')}
            />
            <BranchCreator />
            <BranchDiagram />
            <ConflictResolver />
          </div>
        );

      case 'remote':
        return (
          <div className="space-y-8">
            <ChapterIntro
              chapterNumber={4}
              title="Dépôts Distants"
              description="Apprenez à synchroniser votre travail avec des dépôts distants et à collaborer efficacement."
              objectives={[
                "Configurer des dépôts distants",
                "Maîtriser push et pull",
                "Gérer la synchronisation",
                "Comprendre fetch vs pull"
              ]}
              estimatedTime={50}
              onStart={() => startChapter('remote')}
            />
            <AnimatedFlow />
            <GitGraph />
          </div>
        );

      case 'collaboration':
        return (
          <div className="space-y-8">
            <ChapterIntro
              chapterNumber={5}
              title="Collaboration et Pull Requests"
              description="Découvrez les outils de collaboration GitHub et les bonnes pratiques de travail en équipe."
              objectives={[
                "Créer des Pull Requests",
                "Effectuer des revues de code",
                "Gérer les workflows d'équipe",
                "Utiliser les outils de collaboration GitHub"
              ]}
              estimatedTime={90}
              onStart={() => startChapter('collaboration')}
            />
            <PullRequestCreator />
            <CollaborationSimulator />
            <NetworkGraph />
          </div>
        );

      case 'auth':
        return (
          <div className="max-w-md mx-auto space-y-6">
            <div className="text-center">
              <Lock className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Authentification</h2>
              <p className="text-gray-300">Connectez-vous pour accéder au tutoriel complet</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mot de passe</label>
                  <input
                    type="password"
                    className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                >
                  Se connecter
                </button>
              </form>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <LayoutDashboard className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Tableau de Bord</h2>
              <p className="text-gray-300">Suivez votre progression et vos statistiques d'apprentissage</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">
                    {Math.round((userProgress.completedLessons.length / chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)) * 100)}%
                  </div>
                  <div className="text-sm text-gray-400">Progression Globale</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">{userProgress.completedChapters.length}/{chapters.length}</div>
                  <div className="text-sm text-gray-400">Chapitres Complétés</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {userProgress.completedLessons.length} / {chapters.reduce((acc, chapter) => acc + chapter.lessons.length, 0)}
                  </div>
                  <div className="text-sm text-gray-400">Leçons Complétées</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{userProgress.completedQuizzes.length}</div>
                  <div className="text-sm text-gray-400">Quiz Réussis</div>
                </div>
              </div>
            </div>

            <StatisticsChart />
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Continuer l'apprentissage</h3>
              <div className="space-y-4">
                {userProgress.lastPosition.chapterId && (
                  <div className="bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-medium text-white mb-2">Dernière session</h4>
                    <p className="text-gray-300 mb-3">
                      {(() => {
                        const chapterIndex = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
                        if (chapterIndex === -1) return "Session inconnue";
                        
                        if (userProgress.lastPosition.view === 'chapter-intro') {
                          return `Introduction au chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                        }
                        
                        if (userProgress.lastPosition.view === 'lesson' && userProgress.lastPosition.lessonId) {
                          const lessonIndex = chapters[chapterIndex].lessons.findIndex(l => l.id === userProgress.lastPosition.lessonId);
                          if (lessonIndex === -1) return `Chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                          return `Chapitre ${chapterIndex + 1}, Leçon ${lessonIndex + 1}: ${chapters[chapterIndex].lessons[lessonIndex].title}`;
                        }
                        
                        if (userProgress.lastPosition.view === 'quiz') {
                          return `Quiz du chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                        }
                        
                        if (userProgress.lastPosition.view === 'chapter-summary') {
                          return `Résumé du chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                        }
                        
                        return `Chapitre ${chapterIndex + 1}: ${chapters[chapterIndex].title}`;
                      })()}
                    </p>
                    <Button
                      onClick={() => {
                        if (userProgress.lastPosition.view === 'chapter-intro' || 
                            userProgress.lastPosition.view === 'lesson' || 
                            userProgress.lastPosition.view === 'quiz' || 
                            userProgress.lastPosition.view === 'chapter-summary') {
                          setCurrentView(userProgress.lastPosition.view);
                          
                          if (userProgress.lastPosition.chapterId) {
                            const chapterIndex = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
                            if (chapterIndex !== -1) {
                              setCurrentChapter(chapterIndex);
                            }
                          }
                          
                          if (userProgress.lastPosition.lessonId && userProgress.lastPosition.chapterId) {
                            const chapterIndex = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
                            if (chapterIndex !== -1) {
                              const lessonIndex = chapters[chapterIndex].lessons.findIndex(l => l.id === userProgress.lastPosition.lessonId);
                              if (lessonIndex !== -1) {
                                setCurrentLesson(lessonIndex);
                              }
                            }
                          }
                          
                          if (userProgress.lastPosition.quizIndex !== undefined) {
                            setCurrentQuizIndex(userProgress.lastPosition.quizIndex);
                          }
                        } else {
                          setSelectedItem(userProgress.lastPosition.view);
                        }
                      }}
                    >
                      Continuer
                    </Button>
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-4">
                  {chapters.map((chapter, index) => {
                    const isCompleted = userProgress.completedChapters.includes(chapter.id);
                    const isStarted = userProgress.completedLessons.some(lessonId => 
                      chapter.lessons.some(lesson => lesson.id === lessonId)
                    );
                    
                    return (
                      <div 
                        key={chapter.id}
                        className={`p-4 rounded-lg border ${
                          isCompleted 
                            ? 'bg-green-900/20 border-green-500/30' 
                            : isStarted
                              ? 'bg-blue-900/20 border-blue-500/30'
                              : 'bg-gray-800/50 border-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">Chapitre {index + 1}: {chapter.title}</h4>
                          {isCompleted && <CheckCircle className="h-5 w-5 text-green-400" />}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">
                            {isCompleted 
                              ? 'Complété' 
                              : isStarted
                                ? 'En cours'
                                : 'Non commencé'}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              setCurrentChapter(index);
                              setCurrentView('chapter-intro');
                              setUserProgress(prev => ({
                                ...prev,
                                lastPosition: {
                                  view: 'chapter-intro',
                                  chapterId: chapter.id
                                }
                              }));
                            }}
                          >
                            {isCompleted ? 'Revoir' : isStarted ? 'Continuer' : 'Commencer'}
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 'technical':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Settings className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Contrôle Technique</h2>
              <p className="text-gray-300">Validez vos compétences avec des exercices pratiques</p>
            </div>
            <GitCommandSimulator />
            <QuizQuestion
              question="Quelle commande Git permet d'initialiser un nouveau dépôt ?"
              options={["git start", "git init", "git create", "git new"]}
              correctAnswer={1}
              explanation="La commande 'git init' initialise un nouveau dépôt Git dans le répertoire courant."
              onAnswer={() => {}}
            />
          </div>
        );

      case 'simulation':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Play className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Simulation Interactive</h2>
              <p className="text-gray-300">Explorez les concepts Git de manière visuelle et interactive</p>
            </div>
            <ConceptDiagram />
            <FileTreeViewer />
          </div>
        );

      case 'practice':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <PenTool className="h-16 w-16 text-orange-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Exercice Pratique</h2>
              <p className="text-gray-300">Mettez en pratique vos connaissances avec des exercices guidés</p>
            </div>
            <PracticeExercise
              title="Premier Commit Git"
              description="Apprenez à effectuer votre premier commit en suivant les étapes."
              instructions={[
                "Initialisez un nouveau dépôt Git",
                "Créez un fichier README.md",
                "Ajoutez le fichier à la zone de staging",
                "Effectuez votre premier commit"
              ]}
              expectedCommands={["git init", "touch README.md", "git add README.md", "git commit -m 'Initial commit'"]}
              hints={[
                "Utilisez 'git init' pour initialiser le dépôt",
                "Créez le fichier avec 'touch' ou votre éditeur",
                "N'oubliez pas d'ajouter le fichier avant de commiter",
                "Utilisez un message de commit descriptif"
              ]}
            />
          </div>
        );

      case 'evaluation':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-pink-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Évaluation Automatique</h2>
              <p className="text-gray-300">Système d'évaluation intelligent de vos compétences</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-green-500/30">
                <h3 className="text-xl font-semibold text-white mb-4">Compétences Validées</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Commandes de base</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Gestion des branches</span>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Résolution de conflits</span>
                    <div className="w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
                <h3 className="text-xl font-semibold text-white mb-4">Score Global</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">85%</div>
                  <div className="text-gray-300">Excellent niveau !</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-pink-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Feedback Personnalisé</h2>
              <p className="text-gray-300">Recevez des conseils adaptés à votre progression</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-3">💡 Conseil du jour</h3>
                <p className="text-gray-300">
                  Utilisez des messages de commit descriptifs pour faciliter la collaboration. 
                  Un bon message explique le "pourquoi" et non seulement le "quoi".
                </p>
              </div>
              
              <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-300 mb-3">🎯 Points forts</h3>
                <p className="text-gray-300">
                  Excellente maîtrise des commandes de base ! Vous progressez rapidement 
                  dans la compréhension des concepts fondamentaux.
                </p>
              </div>
              
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-yellow-300 mb-3">📈 Axes d'amélioration</h3>
                <p className="text-gray-300">
                  Concentrez-vous sur la résolution de conflits et les workflows avancés 
                  pour atteindre le niveau expert.
                </p>
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-pink-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Suivi de Progression</h2>
              <p className="text-gray-300">Analysez votre parcours d'apprentissage en détail</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Temps d'étude</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">2h 45m</div>
                <div className="text-sm text-gray-400">Cette semaine</div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Exercices</h3>
                <div className="text-3xl font-bold text-green-400 mb-2">18/25</div>
                <div className="text-sm text-gray-400">Complétés</div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Niveau</h3>
                <div className="text-3xl font-bold text-purple-400 mb-2">Avancé</div>
                <div className="text-sm text-gray-400">Git & GitHub</div>
              </div>
            </div>
            
            <DiffViewer />
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Résumé de Chapitre</h2>
              <p className="text-gray-300">Récapitulatif des concepts clés appris</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Chapitre 1 - Introduction</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">Concepts maîtrisés</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Différence Git vs GitHub</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Contrôle de version</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span>Configuration initiale</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">Prochaines étapes</h4>
                  <p className="text-gray-300">
                    Continuez avec le Chapitre 2 pour apprendre à créer et gérer 
                    vos premiers dépôts Git.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'certificate':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Award className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Certificat de Complétion</h2>
              <p className="text-gray-300">Félicitations ! Vous avez terminé le tutoriel</p>
            </div>
            
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-purple-500/30">
              <div className="text-center space-y-6">
                <Award className="h-20 w-20 text-yellow-400 mx-auto" />
                
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Certificat d'Excellence</h3>
                  <p className="text-gray-300">Tutoriel Git & GitHub Interactif</p>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <p className="text-lg text-white mb-2">Décerné à</p>
                  <p className="text-2xl font-bold text-purple-400 mb-4">Votre Nom</p>
                  <p className="text-gray-300">
                    Pour avoir complété avec succès le parcours d'apprentissage 
                    Git & GitHub et démontré une maîtrise des concepts essentiels.
                  </p>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Télécharger PDF</span>
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Share className="h-5 w-5" />
                    <span>Partager</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'export':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Share className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Partage & Export</h2>
              <p className="text-gray-300">Partagez vos accomplissements et exportez vos données</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Partage Social</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                    Partager sur LinkedIn
                  </button>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors">
                    Partager sur Twitter
                  </button>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                    Copier le lien
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Export de Données</h3>
                <div className="space-y-3">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Exporter Progression (JSON)</span>
                  </button>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Certificat (PDF)</span>
                  </button>
                  <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Statistiques (CSV)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Section en développement</h2>
              <p className="text-gray-400">Cette section sera bientôt disponible.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-gray-800/50 border-r border-gray-700 min-h-screen">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <GitCommit className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold">Tutoriel GitHub Interactif</h1>
                <p className="text-sm text-gray-400">Flux UI</p>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-6 overflow-y-auto">
            {sections.map((section) => (
              <div key={section.id} className={`${section.bgColor} rounded-xl p-4 border ${section.borderColor}`}>
                <h2 className={`font-bold mb-4 flex items-center ${section.color}`}>
                  <span className="w-2 h-2 bg-current rounded-full mr-3"></span>
                  {section.title}
                </h2>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItem(item.id);
                        setUserProgress(prev => ({
                          ...prev,
                          lastPosition: {
                            view: item.id
                          }
                        }));
                        
                        // Si on clique sur un chapitre, on va à l'intro du chapitre
                        if (['intro', 'repositories', 'branches', 'remote', 'collaboration'].includes(item.id)) {
                          const chapterIndex = chapters.findIndex(c => c.id === item.id);
                          if (chapterIndex !== -1) {
                            setCurrentChapter(chapterIndex);
                            setCurrentView('chapter-intro');
                            setUserProgress(prev => ({
                              ...prev,
                              lastPosition: {
                                view: 'chapter-intro',
                                chapterId: item.id
                              }
                            }));
                          }
                        }
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                        (selectedItem === item.id || 
                         (currentView !== 'chapter-intro' && 
                          currentView !== 'lesson' && 
                          currentView !== 'quiz' && 
                          currentView !== 'chapter-summary' && 
                          selectedItem === item.id))
                          ? 'bg-white/10 border-white/30'
                          : 'border-transparent hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          <item.icon className={`h-5 w-5 ${section.color}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-white text-sm">{item.title}</h3>
                            {item.completed && (
                              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            )}
                            {item.inProgress && (
                              <div className="w-4 h-4 bg-orange-400 rounded-full flex-shrink-0 animate-pulse"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.subtitle}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-400">Phase d'Entrée</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">Apprentissage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-400">Interactif</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <span className="text-gray-400">Validation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-gray-400">Achèvement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

export default App;