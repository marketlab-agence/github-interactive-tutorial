import { Chapter } from '../../types/tutorial.types';

export const repositoriesChapter: Chapter = {
  id: 'repositories',
  title: 'Working with Repositories',
  description: 'Learn how to create and manage Git repositories',
  estimatedTime: 60,
  difficulty: 'beginner',
  objectives: [
    'Initialize new Git repositories and clone existing ones',
    'Understand the internal structure of Git repositories',
    'Master working with remote repositories',
    'Learn the relationship between local and remote repositories'
  ],
  lessons: [
    {
      id: 'creating-repos',
      title: 'Creating Repositories',
      content: 'Learn how to initialize new repositories and clone existing ones from remote sources.',
      type: 'practice',
      duration: 30,
      objectives: [
        'Initialize a new Git repository',
        'Clone repositories from GitHub',
        'Understand local vs remote repositories'
      ],
      description: 'Learn to initialize and clone repositories',
      component: 'RepoCreationWizard',
      image: 'https://i.ytimg.com/vi/RGOj5yH7evk/maxresdefault.jpg'
    },
    {
      id: 'repo-structure',
      title: 'Repository Structure',
      content: 'Understand the internal structure of a Git repository and how Git stores data.',
      type: 'theory',
      duration: 20,
      objectives: [
        'Explore the .git directory',
        'Understand Git objects and references',
        'Learn about the working directory, staging area, and repository'
      ],
      description: 'Explore how Git repositories are structured internally',
      component: 'StagingAreaVisualizer',
      image: 'https://git-scm.com/book/en/v2/images/areas.png'
    },
    {
      id: 'remote-repos',
      title: 'Remote Repositories',
      content: 'Learn how to work with remote repositories and understand the relationship between local and remote.',
      type: 'practice',
      duration: 25,
      objectives: [
        'Add and manage remote repositories',
        'Understand origin and upstream',
        'Practice fetching and pulling changes'
      ],
      description: 'Master working with remote repositories',
      component: 'CommitHistoryExplorer',
      image: 'https://uidaholib.github.io/get-git/images/workflow.png'
    }
  ],
  quiz: [
    {
      question: 'Quelle commande est utilisée pour créer une copie d\'un dépôt distant sur votre machine locale ?',
      options: ['git copy', 'git duplicate', 'git clone', 'git download'],
      correctAnswer: 2,
      explanation: 'git clone crée une copie d\'un dépôt distant sur votre machine locale, vous permettant d\'y travailler.'
    },
    {
      question: 'Quel dossier contient toutes les métadonnées Git dans un dépôt ?',
      options: ['.github', '.git', '.gitconfig', '.gitdata'],
      correctAnswer: 1,
      explanation: 'Le répertoire .git contient toutes les métadonnées et la base de données d\'objets pour votre dépôt.'
    },
    {
      question: 'Quel est le nom par défaut que Git attribue au dépôt distant lorsque vous le clonez ?',
      options: ['main', 'origin', 'source', 'remote'],
      correctAnswer: 1,
      explanation: 'Lorsque vous clonez un dépôt, Git nomme automatiquement le distant "origin".'
    },
    {
      question: 'Quelle commande permet de voir la liste des dépôts distants associés à votre dépôt local ?',
      options: ['git list remotes', 'git show remote', 'git remote -v', 'git remotes list'],
      correctAnswer: 2,
      explanation: 'git remote -v (verbose) affiche la liste des dépôts distants avec leurs URLs, vous permettant de voir où vos commandes pull et push enverront et récupéreront les données.'
    },
    {
      question: 'Que contient le fichier .gitignore ?',
      options: [
        'Les commits ignorés lors d\'un merge', 
        'Les fichiers et dossiers à ne pas suivre dans Git', 
        'Les conflits de fusion non résolus', 
        'Les configurations d\'authentification Git'
      ],
      correctAnswer: 1,
      explanation: 'Le fichier .gitignore spécifie les fichiers et dossiers que Git doit ignorer. C\'est utile pour éviter d\'inclure des fichiers temporaires, des données sensibles ou des dossiers de build dans votre dépôt.'
    }
  ]
};