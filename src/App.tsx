import React, { useState } from 'react';
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
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  content: string;
  image?: string;
  codeExample?: string;
}

function App() {
  const [selectedItem, setSelectedItem] = useState<string>('accueil');
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const [currentLesson, setCurrentLesson] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);

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
          inProgress: true
        },
        {
          id: 'repositories',
          title: 'Chapitre 2: Dépôts',
          subtitle: 'Création, commits, historique',
          icon: Repository
        },
        {
          id: 'branches',
          title: 'Chapitre 3: Branches',
          subtitle: 'Création, fusion, workflows',
          icon: GitBranch
        },
        {
          id: 'remote',
          title: 'Chapitre 4: Dépôts Distants',
          subtitle: 'Push, pull, synchronisation',
          icon: Cloud
        },
        {
          id: 'collaboration',
          title: 'Chapitre 5: Collaboration',
          subtitle: 'Pull Requests, revue de code',
          icon: Users
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

  const chapters: Chapter[] = [
    {
      id: 1,
      title: "Introduction à Git et GitHub",
      description: "Découvrez les concepts fondamentaux du contrôle de version et la différence entre Git et GitHub.",
      lessons: [
        {
          id: 1,
          title: "Qu'est-ce que Git?",
          content: "Git est un système de contrôle de version distribué qui permet de suivre les modifications de code source pendant le développement logiciel. Contrairement aux anciens systèmes de contrôle de version, Git stocke les informations sous forme d'instantanés du contenu complet des fichiers, et non comme une série de modifications apportées aux fichiers au fil du temps.\n\nGit a été créé par Linus Torvalds en 2005 pour le développement du noyau Linux. Il est conçu pour être rapide, efficace avec de grands projets, et offre un support robuste pour le développement non linéaire grâce à son modèle de branches.",
          image: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Vérifier la version de Git installée\ngit --version\n\n# Obtenir de l'aide sur les commandes Git\ngit help"
        },
        {
          id: 2,
          title: "Différence entre Git et GitHub",
          content: "Git et GitHub sont souvent confondus, mais ils servent des objectifs différents et complémentaires.\n\nGit est un outil de contrôle de version qui fonctionne localement sur votre machine. Il vous permet de suivre les modifications de vos fichiers, de revenir à des versions précédentes, et de travailler sur différentes branches.\n\nGitHub, en revanche, est une plateforme d'hébergement de code basée sur le web qui utilise Git comme système de contrôle de version sous-jacent. GitHub ajoute ses propres fonctionnalités comme les Pull Requests, les Issues, les Wikis, et d'autres outils de collaboration qui ne font pas partie de Git lui-même.",
          image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Cloner un dépôt GitHub\ngit clone https://github.com/utilisateur/depot.git\n\n# Ajouter un dépôt distant\ngit remote add origin https://github.com/utilisateur/depot.git"
        },
        {
          id: 3,
          title: "Installation et configuration de Git",
          content: "Pour commencer à utiliser Git, vous devez d'abord l'installer sur votre système. Git est disponible pour Windows, macOS et Linux.\n\nAprès l'installation, il est important de configurer votre identité Git, car chaque commit que vous faites utilise ces informations. Vous pouvez configurer votre nom d'utilisateur et votre email avec les commandes git config.\n\nVous pouvez également configurer d'autres paramètres comme votre éditeur de texte préféré, l'outil de fusion, et les alias pour les commandes fréquemment utilisées.",
          image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Configurer votre identité Git\ngit config --global user.name \"Votre Nom\"\ngit config --global user.email \"votre.email@exemple.com\"\n\n# Vérifier vos paramètres\ngit config --list"
        }
      ]
    },
    {
      id: 2,
      title: "Dépôts et Commits",
      description: "Apprenez à créer et gérer des dépôts Git, ainsi qu'à effectuer vos premiers commits.",
      lessons: [
        {
          id: 1,
          title: "Création d'un dépôt",
          content: "Un dépôt Git (ou repo) est un espace de stockage où votre projet vit. Il contient tous les fichiers de votre projet ainsi que l'historique complet des modifications.\n\nVous pouvez créer un nouveau dépôt localement en utilisant la commande git init dans le répertoire de votre projet. Cela crée un sous-répertoire .git qui contient toute la structure nécessaire pour le contrôle de version.\n\nAlternativement, vous pouvez cloner un dépôt existant depuis GitHub ou un autre service d'hébergement Git en utilisant la commande git clone.",
          image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Initialiser un nouveau dépôt\ngit init\n\n# Cloner un dépôt existant\ngit clone https://github.com/utilisateur/depot.git"
        },
        {
          id: 2,
          title: "Comprendre la zone de staging",
          content: "La zone de staging (ou index) est une caractéristique unique de Git. C'est une zone intermédiaire où vous pouvez préparer et réviser vos modifications avant de les commiter.\n\nLorsque vous modifiez des fichiers dans votre répertoire de travail, Git les voit comme modifiés mais non stagés. Pour inclure ces modifications dans votre prochain commit, vous devez les ajouter à la zone de staging avec la commande git add.\n\nCette étape intermédiaire vous donne un contrôle précis sur ce qui sera inclus dans chaque commit, vous permettant de regrouper des modifications connexes.",
          image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Ajouter un fichier spécifique à la zone de staging\ngit add fichier.txt\n\n# Ajouter tous les fichiers modifiés\ngit add .\n\n# Vérifier l'état de la zone de staging\ngit status"
        },
        {
          id: 3,
          title: "Effectuer des commits",
          content: "Un commit dans Git est comme un instantané de votre projet à un moment donné. Il capture l'état de tous les fichiers qui ont été ajoutés à la zone de staging.\n\nChaque commit a un message associé qui décrit les modifications apportées. Un bon message de commit est concis mais descriptif, expliquant pourquoi les modifications ont été faites plutôt que ce qui a été modifié (car Git peut déjà montrer ce qui a changé).\n\nLes commits sont identifiés par un hash SHA-1 unique, ce qui permet de référencer spécifiquement n'importe quelle version de votre projet.",
          image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Créer un commit avec un message\ngit commit -m \"Ajouter une nouvelle fonctionnalité\"\n\n# Voir l'historique des commits\ngit log\n\n# Voir un commit spécifique\ngit show 1a2b3c4d"
        }
      ]
    },
    {
      id: 3,
      title: "Branches et Fusion",
      description: "Maîtrisez la création de branches et les techniques de fusion pour un développement parallèle.",
      lessons: [
        {
          id: 1,
          title: "Création de branches",
          content: "Les branches dans Git sont des pointeurs légers et mobiles vers un commit. Elles permettent de développer des fonctionnalités, de corriger des bugs ou d'expérimenter sans affecter la branche principale (généralement appelée 'main' ou 'master').\n\nCréer une nouvelle branche est rapide et simple avec Git, ce qui encourage le développement parallèle et l'isolation des fonctionnalités. Vous pouvez créer une branche avec la commande git branch, puis basculer dessus avec git checkout, ou utiliser la commande combinée git checkout -b.",
          image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Créer une nouvelle branche\ngit branch nouvelle-fonctionnalite\n\n# Basculer sur la nouvelle branche\ngit checkout nouvelle-fonctionnalite\n\n# Ou en une seule commande\ngit checkout -b nouvelle-fonctionnalite"
        },
        {
          id: 2,
          title: "Fusion de branches",
          content: "La fusion (merge) est le processus qui consiste à intégrer les modifications d'une branche dans une autre. C'est ainsi que vous incorporez le travail effectué dans des branches de fonctionnalités dans votre branche principale.\n\nGit utilise différentes stratégies de fusion selon la situation. La plus simple est la fusion 'fast-forward', qui se produit lorsque la branche cible n'a pas de nouveaux commits depuis la création de la branche source. Dans ce cas, Git déplace simplement le pointeur de la branche cible vers le dernier commit de la branche source.\n\nDans les cas plus complexes, Git crée un 'commit de fusion' qui a deux parents, préservant ainsi l'historique des deux branches.",
          image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Fusionner une branche dans la branche actuelle\ngit merge nouvelle-fonctionnalite\n\n# Fusion avec commit (même si fast-forward est possible)\ngit merge --no-ff nouvelle-fonctionnalite\n\n# Annuler une fusion en cours\ngit merge --abort"
        },
        {
          id: 3,
          title: "Résolution de conflits",
          content: "Les conflits de fusion se produisent lorsque Git ne peut pas automatiquement fusionner des modifications parce que les mêmes lignes d'un fichier ont été modifiées différemment dans les deux branches.\n\nLorsqu'un conflit survient, Git marque les fichiers problématiques et s'arrête avant de créer le commit de fusion. Vous devez alors résoudre manuellement les conflits en éditant les fichiers, puis les ajouter à la zone de staging et finaliser la fusion avec un commit.\n\nGit fournit des outils pour vous aider à identifier et résoudre les conflits, comme git status pour voir quels fichiers sont en conflit, et git diff pour voir les différences spécifiques.",
          image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Identifier les fichiers en conflit\ngit status\n\n# Après résolution manuelle des conflits\ngit add fichier-resolu.txt\n\n# Finaliser la fusion\ngit commit"
        }
      ]
    },
    {
      id: 4,
      title: "Dépôts Distants",
      description: "Apprenez à synchroniser votre travail avec des dépôts distants et à collaborer efficacement.",
      lessons: [
        {
          id: 1,
          title: "Configuration des dépôts distants",
          content: "Les dépôts distants sont des versions de votre projet hébergées sur Internet ou un réseau. Ils facilitent la collaboration en permettant à plusieurs personnes de pousser et tirer des modifications.\n\nGit peut avoir plusieurs dépôts distants, chacun avec un nom unique. Par convention, le dépôt distant principal est souvent appelé 'origin'. Vous pouvez ajouter, renommer ou supprimer des dépôts distants selon vos besoins.\n\nLa commande git remote vous permet de gérer ces connexions distantes, tandis que git remote -v affiche les URLs associées à chaque dépôt distant.",
          image: "https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Voir les dépôts distants configurés\ngit remote -v\n\n# Ajouter un dépôt distant\ngit remote add origin https://github.com/utilisateur/depot.git\n\n# Renommer un dépôt distant\ngit remote rename origin upstream"
        },
        {
          id: 2,
          title: "Push et Pull",
          content: "Les commandes push et pull sont essentielles pour synchroniser votre travail entre votre dépôt local et les dépôts distants.\n\nLa commande git push envoie vos commits locaux vers un dépôt distant. Par défaut, elle pousse uniquement la branche actuelle vers la branche distante correspondante.\n\nLa commande git pull fait deux choses : elle récupère (fetch) les modifications du dépôt distant, puis les fusionne (merge) automatiquement dans votre branche locale. C'est essentiellement un git fetch suivi d'un git merge.",
          image: "https://images.pexels.com/photos/7108/notebook-computer-chill-relax.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Pousser des commits vers le dépôt distant\ngit push origin main\n\n# Récupérer et fusionner les modifications distantes\ngit pull origin main\n\n# Récupérer sans fusionner\ngit fetch origin"
        },
        {
          id: 3,
          title: "Gestion des branches distantes",
          content: "Les branches distantes sont des références à l'état des branches dans vos dépôts distants. Elles sont nommées sous la forme <remote>/<branch>, par exemple origin/main.\n\nVous ne pouvez pas modifier directement les branches distantes localement. Elles se mettent à jour automatiquement lorsque vous communiquez avec le dépôt distant via fetch, pull ou push.\n\nPour travailler sur une branche distante, vous devez d'abord créer une branche locale qui la suit (tracking branch). Git configure automatiquement les branches locales pour suivre leurs homologues distantes lors d'un git clone.",
          image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Voir toutes les branches (locales et distantes)\ngit branch -a\n\n# Créer une branche locale qui suit une branche distante\ngit checkout -b feature origin/feature\n\n# Configurer une branche existante pour suivre une branche distante\ngit branch -u origin/feature feature"
        }
      ]
    },
    {
      id: 5,
      title: "Collaboration et Pull Requests",
      description: "Découvrez les outils de collaboration GitHub et les bonnes pratiques de travail en équipe.",
      lessons: [
        {
          id: 1,
          title: "Création de Pull Requests",
          content: "Les Pull Requests (PR) sont une fonctionnalité centrale de GitHub qui permet de proposer des modifications à un projet. Elles servent de mécanisme de discussion et de revue avant que les modifications ne soient intégrées dans la branche principale.\n\nPour créer une PR, vous devez d'abord pousser une branche vers votre fork ou directement vers le dépôt si vous avez les droits. Ensuite, GitHub vous permet de comparer cette branche avec la branche cible (généralement main) et de créer une PR.\n\nUne PR bien conçue inclut un titre descriptif, une description détaillée des modifications, et éventuellement des références à des issues connexes.",
          image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Créer une branche pour votre fonctionnalité\ngit checkout -b nouvelle-fonctionnalite\n\n# Faire des modifications et les commiter\ngit add .\ngit commit -m \"Ajouter nouvelle fonctionnalité\"\n\n# Pousser la branche vers GitHub\ngit push origin nouvelle-fonctionnalite"
        },
        {
          id: 2,
          title: "Revue de code",
          content: "La revue de code est une pratique essentielle dans le développement collaboratif. Elle permet d'améliorer la qualité du code, de partager les connaissances et de détecter les bugs avant qu'ils n'atteignent la production.\n\nSur GitHub, les revues de code se font principalement via les Pull Requests. Les relecteurs peuvent commenter des lignes spécifiques, suggérer des modifications, et approuver ou demander des changements.\n\nUne bonne revue de code se concentre sur la lisibilité, la maintenabilité, la performance et la sécurité du code, tout en restant constructive et respectueuse.",
          image: "https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# Après avoir reçu des commentaires, faites des modifications\ngit add .\ngit commit -m \"Répondre aux commentaires de la revue\"\n\n# Pousser les modifications vers la même branche\ngit push origin nouvelle-fonctionnalite\n\n# La PR sera automatiquement mise à jour"
        },
        {
          id: 3,
          title: "Gestion des workflows d'équipe",
          content: "Il existe plusieurs modèles de workflow Git pour les équipes, chacun avec ses avantages et ses inconvénients.\n\nLe GitHub Flow est un workflow simple centré sur les branches de fonctionnalités et les Pull Requests. Il est idéal pour le déploiement continu et les équipes plus petites.\n\nLe Git Flow est un modèle plus structuré avec des branches dédiées pour les fonctionnalités, les releases et les hotfixes. Il convient aux projets avec des cycles de release planifiés.\n\nLe GitLab Flow ajoute des branches d'environnement au modèle de base, facilitant le déploiement progressif à travers différents environnements.",
          image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          codeExample: "# GitHub Flow - Exemple simplifié\ngit checkout -b feature\n# Travailler sur la fonctionnalité\ngit add .\ngit commit -m \"Ajouter fonctionnalité\"\ngit push origin feature\n# Créer une PR sur GitHub\n# Après approbation, merger sur GitHub ou localement\ngit checkout main\ngit pull origin main"
        }
      ]
    }
  ];

  const quizQuestions = [
    {
      question: "Quelle commande Git permet d'initialiser un nouveau dépôt ?",
      options: ["git start", "git init", "git create", "git new"],
      correctAnswer: 1,
      explanation: "La commande 'git init' initialise un nouveau dépôt Git dans le répertoire courant en créant un sous-répertoire .git qui contient tous les fichiers nécessaires."
    },
    {
      question: "Quelle est la différence principale entre Git et GitHub ?",
      options: [
        "Git est payant, GitHub est gratuit", 
        "Git est un système de contrôle de version, GitHub est une plateforme d'hébergement", 
        "Git est pour Windows, GitHub pour Mac", 
        "Git est pour le code, GitHub pour les images"
      ],
      correctAnswer: 1,
      explanation: "Git est un système de contrôle de version distribué qui fonctionne localement sur votre machine, tandis que GitHub est une plateforme d'hébergement basée sur le web qui utilise Git."
    },
    {
      question: "Quelle commande permet d'ajouter des fichiers à la zone de staging ?",
      options: ["git commit", "git stage", "git add", "git update"],
      correctAnswer: 2,
      explanation: "La commande 'git add' est utilisée pour ajouter des fichiers à la zone de staging (ou index), qui est une étape intermédiaire avant le commit."
    }
  ];

  const handleStartChapter = (chapterId: number) => {
    setCurrentChapter(chapterId);
    setCurrentLesson(1);
    setSelectedItem(`chapter-${chapterId}-lesson-1`);
    setShowQuiz(false);
  };

  const handleNextLesson = () => {
    if (currentChapter === null || currentLesson === null) return;
    
    const chapter = chapters.find(c => c.id === currentChapter);
    if (!chapter) return;
    
    // Si ce n'est pas la dernière leçon du chapitre
    if (currentLesson < chapter.lessons.length) {
      setCurrentLesson(currentLesson + 1);
      setSelectedItem(`chapter-${currentChapter}-lesson-${currentLesson + 1}`);
    } 
    // Si c'est la dernière leçon du chapitre mais pas le dernier chapitre
    else if (currentChapter < chapters.length) {
      // Afficher le quiz à la fin du chapitre
      setShowQuiz(true);
    }
  };

  const handleQuizComplete = () => {
    if (currentChapter === null) return;
    
    // Si ce n'est pas le dernier chapitre, passer au chapitre suivant
    if (currentChapter < chapters.length) {
      setCurrentChapter(currentChapter + 1);
      setCurrentLesson(1);
      setSelectedItem(`chapter-${currentChapter + 1}-lesson-1`);
    } else {
      // Si c'est le dernier chapitre, retourner à l'accueil ou afficher un écran de félicitations
      setSelectedItem('certificate');
    }
    setShowQuiz(false);
  };

  const handlePreviousLesson = () => {
    if (currentChapter === null || currentLesson === null) return;
    
    if (showQuiz) {
      setShowQuiz(false);
      return;
    }
    
    // Si ce n'est pas la première leçon du chapitre
    if (currentLesson > 1) {
      setCurrentLesson(currentLesson - 1);
      setSelectedItem(`chapter-${currentChapter}-lesson-${currentLesson - 1}`);
    } 
    // Si c'est la première leçon du chapitre mais pas le premier chapitre
    else if (currentChapter > 1) {
      const prevChapter = chapters.find(c => c.id === currentChapter - 1);
      if (prevChapter) {
        setCurrentChapter(currentChapter - 1);
        setCurrentLesson(prevChapter.lessons.length);
        setSelectedItem(`chapter-${currentChapter - 1}-lesson-${prevChapter.lessons.length}`);
      }
    }
  };

  const renderMainContent = () => {
    // Si nous sommes dans une leçon spécifique
    if (currentChapter !== null && currentLesson !== null) {
      const chapter = chapters.find(c => c.id === currentChapter);
      if (!chapter) return <div>Chapitre non trouvé</div>;
      
      // Si on doit afficher le quiz de fin de chapitre
      if (showQuiz) {
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Quiz - {chapter.title}</h2>
              <p className="text-gray-300 mt-2">Testez vos connaissances sur ce chapitre</p>
            </div>
            
            <QuizQuestion
              question={quizQuestions[0].question}
              options={quizQuestions[0].options}
              correctAnswer={quizQuestions[0].correctAnswer}
              explanation={quizQuestions[0].explanation}
              onAnswer={() => {}}
            />
            
            <div className="flex justify-between mt-8">
              <button 
                onClick={handlePreviousLesson}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Retour à la leçon
              </button>
              
              <button 
                onClick={handleQuizComplete}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Terminer le chapitre
              </button>
            </div>
          </div>
        );
      }
      
      const lesson = chapter.lessons.find(l => l.id === currentLesson);
      if (!lesson) return <div>Leçon non trouvée</div>;
      
      return (
        <div className="space-y-8">
          <LessonContent
            title={`${chapter.title} - ${lesson.title}`}
            content={lesson.content}
            duration={15}
            objectives={["Comprendre les concepts clés", "Maîtriser les commandes de base", "Appliquer les connaissances"]}
            difficulty="beginner"
          />
          
          {lesson.image && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={lesson.image} 
                alt={lesson.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          {lesson.codeExample && (
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-medium mb-2">Exemple de code:</h3>
              <pre className="text-green-400 text-sm overflow-x-auto">
                <code>{lesson.codeExample}</code>
              </pre>
            </div>
          )}
          
          <div className="flex justify-between">
            <button 
              onClick={handlePreviousLesson}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              disabled={currentChapter === 1 && currentLesson === 1}
            >
              Précédent
            </button>
            
            <button 
              onClick={handleNextLesson}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Suivant
            </button>
          </div>
        </div>
      );
    }

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
                onClick={() => setSelectedItem('intro')}
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
            onStart={() => handleStartChapter(1)}
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
              onStart={() => handleStartChapter(2)}
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
              onStart={() => handleStartChapter(3)}
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
              onStart={() => handleStartChapter(4)}
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
              onStart={() => handleStartChapter(5)}
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
                  <div className="text-3xl font-bold text-green-400">75%</div>
                  <div className="text-sm text-gray-400">Progression Globale</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-blue-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">3/5</div>
                  <div className="text-sm text-gray-400">Chapitres Complétés</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-purple-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">2h 30m</div>
                  <div className="text-sm text-gray-400">Temps d'Étude</div>
                </div>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-yellow-500/30">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">12</div>
                  <div className="text-sm text-gray-400">Exercices Réussis</div>
                </div>
              </div>
            </div>

            <StatisticsChart />
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
        // Vérifier si c'est une leçon spécifique
        if (selectedItem.startsWith('chapter-')) {
          const parts = selectedItem.split('-');
          const chapterNum = parseInt(parts[1]);
          const lessonNum = parseInt(parts[3]);
          
          const chapter = chapters.find(c => c.id === chapterNum);
          if (!chapter) return <div>Chapitre non trouvé</div>;
          
          const lesson = chapter.lessons.find(l => l.id === lessonNum);
          if (!lesson) return <div>Leçon non trouvée</div>;
          
          return (
            <div className="space-y-8">
              <LessonContent
                title={`${chapter.title} - ${lesson.title}`}
                content={lesson.content}
                duration={15}
                objectives={["Comprendre les concepts clés", "Maîtriser les commandes de base", "Appliquer les connaissances"]}
                difficulty="beginner"
              />
              
              {lesson.image && (
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={lesson.image} 
                    alt={lesson.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              {lesson.codeExample && (
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-white font-medium mb-2">Exemple de code:</h3>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{lesson.codeExample}</code>
                  </pre>
                </div>
              )}
              
              <div className="flex justify-between">
                <button 
                  onClick={() => {
                    if (lessonNum > 1) {
                      setSelectedItem(`chapter-${chapterNum}-lesson-${lessonNum - 1}`);
                    } else if (chapterNum > 1) {
                      const prevChapter = chapters.find(c => c.id === chapterNum - 1);
                      if (prevChapter) {
                        setSelectedItem(`chapter-${chapterNum - 1}-lesson-${prevChapter.lessons.length}`);
                      }
                    }
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                  disabled={chapterNum === 1 && lessonNum === 1}
                >
                  Précédent
                </button>
                
                <button 
                  onClick={() => {
                    if (chapter.lessons.length > lessonNum) {
                      setSelectedItem(`chapter-${chapterNum}-lesson-${lessonNum + 1}`);
                    } else if (chapterNum < chapters.length) {
                      setSelectedItem(`chapter-${chapterNum + 1}-lesson-1`);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  disabled={chapterNum === chapters.length && lessonNum === chapters[chapters.length - 1].lessons.length}
                >
                  Suivant
                </button>
              </div>
            </div>
          );
        }
        
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
                        setCurrentChapter(null);
                        setCurrentLesson(null);
                        setShowQuiz(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                        selectedItem === item.id
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