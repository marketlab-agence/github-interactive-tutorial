import React from 'react';
import { useTutorial } from '../context/TutorialContext';
import GitCommandSimulator from './interactive/GitCommandSimulator';
import BranchCreator from './interactive/BranchCreator';
import GitRepositoryPlayground from './interactive/GitRepositoryPlayground';
import ConflictResolver from './interactive/ConflictResolver';
import PullRequestCreator from './interactive/PullRequestCreator';
import { chapters } from '../data';
import Card from './ui/Card';

const ExercisesContainer: React.FC = () => {
  const { userProgress } = useTutorial();

  // Find current chapter based on progress
  const getCurrentChapterIndex = () => {
    if (userProgress.lastPosition.chapterId) {
      const index = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
      if (index !== -1) return index;
    }
    
    // If no specific chapter is found, use the one with the most completed lessons
    const completedLessonsByChapter = chapters.map(chapter => {
      const completedLessonsInChapter = chapter.lessons.filter(lesson => 
        userProgress.completedLessons.includes(lesson.id)
      ).length;
      return completedLessonsInChapter;
    });
    
    // Find the chapter with the most completed lessons
    const maxCompletedIndex = completedLessonsByChapter.indexOf(Math.max(...completedLessonsByChapter));
    return maxCompletedIndex !== -1 ? maxCompletedIndex : 0;
  };

  const currentChapterIndex = getCurrentChapterIndex();
  const chapterId = chapters[currentChapterIndex].id;

  // Render exercises based on the current chapter
  const renderExercisesByChapter = () => {
    switch (chapterId) {
      case 'intro':
        return (
          <div className="space-y-8">
            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 1 : Initialisation Git</h3>
              <p className="text-gray-300 mb-4">
                Initialisez un nouveau dépôt Git dans votre répertoire de travail.
              </p>
              <GitCommandSimulator 
                availableCommands={['git init', 'git --version', 'git config --global user.name "Your Name"', 'git config --global user.email "your.email@example.com"']}
                expectedCommand="git init"
              />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 2 : Configuration Git</h3>
              <p className="text-gray-300 mb-4">
                Configurez Git avec votre nom d'utilisateur pour identifier vos commits.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git config --global user.name "Your Name"', 
                  'git config --global user.email "your.email@example.com"',
                  'git config --list'
                ]}
                expectedCommand='git config --global user.name "Your Name"'
              />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 3 : Vérification de la version</h3>
              <p className="text-gray-300 mb-4">
                Vérifiez la version de Git installée sur votre système.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git --version',
                  'git -v',
                  'git --help'
                ]}
                expectedCommand='git --version'
              />
            </Card>
          </div>
        );
      
      case 'repositories':
        return (
          <div className="space-y-8">
            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 1 : Gestion des fichiers</h3>
              <p className="text-gray-300 mb-4">
                Utilisez l'explorateur de dépôt pour pratiquer l'ajout et la modification de fichiers.
              </p>
              <GitRepositoryPlayground />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 2 : Ajout à la zone de staging</h3>
              <p className="text-gray-300 mb-4">
                Ajoutez tous les fichiers modifiés à la zone de staging.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git status', 
                  'git add README.md', 
                  'git add .', 
                  'git commit -m "Initial commit"',
                  'git commit -m "Add new feature"'
                ]}
                expectedCommand='git add .'
              />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 3 : Création d'un commit</h3>
              <p className="text-gray-300 mb-4">
                Créez un commit avec un message descriptif après avoir ajouté des fichiers à la zone de staging.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git commit -m "Initial commit"',
                  'git commit -m "Add new feature"',
                  'git commit -m "Fix bug in login form"',
                  'git commit -am "Update documentation"'
                ]}
                expectedCommand='git commit -m "Initial commit"'
              />
            </Card>
          </div>
        );
      
      case 'branches':
        return (
          <div className="space-y-8">
            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 1 : Création et gestion de branches</h3>
              <p className="text-gray-300 mb-4">
                Pratiquez la création et le basculement entre branches avec cet outil interactif.
              </p>
              <BranchCreator />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 2 : Création d'une nouvelle branche</h3>
              <p className="text-gray-300 mb-4">
                Créez une nouvelle branche nommée "feature/login" à partir de la branche principale.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git branch feature/login',
                  'git checkout -b feature/login',
                  'git checkout feature/login',
                  'git switch -c feature/login'
                ]}
                expectedCommand='git checkout -b feature/login'
              />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 3 : Résolution de conflits</h3>
              <p className="text-gray-300 mb-4">
                Apprenez à résoudre les conflits de fusion entre branches.
              </p>
              <ConflictResolver />
            </Card>
          </div>
        );
      
      case 'remote':
        return (
          <div className="space-y-8">
            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 1 : Ajout d'un dépôt distant</h3>
              <p className="text-gray-300 mb-4">
                Ajoutez un dépôt distant nommé "origin" à votre projet.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git remote add origin https://github.com/user/repo.git', 
                  'git remote -v', 
                  'git push -u origin main', 
                  'git pull origin main'
                ]}
                expectedCommand='git remote add origin https://github.com/user/repo.git'
              />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 2 : Push vers le dépôt distant</h3>
              <p className="text-gray-300 mb-4">
                Poussez votre branche main vers le dépôt distant et définissez-la comme branche de suivi.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git push origin main',
                  'git push -u origin main',
                  'git push --set-upstream origin main',
                  'git push'
                ]}
                expectedCommand='git push -u origin main'
              />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 3 : Récupération des changements distants</h3>
              <p className="text-gray-300 mb-4">
                Récupérez et fusionnez les changements du dépôt distant dans votre branche locale.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git pull origin main',
                  'git fetch origin',
                  'git merge origin/main',
                  'git pull'
                ]}
                expectedCommand='git pull origin main'
              />
            </Card>
          </div>
        );
      
      case 'collaboration':
        return (
          <div className="space-y-8">
            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 1 : Création d'une Pull Request</h3>
              <p className="text-gray-300 mb-4">
                Apprenez à créer une Pull Request pour proposer vos modifications.
              </p>
              <PullRequestCreator />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 2 : Fork d'un dépôt</h3>
              <p className="text-gray-300 mb-4">
                Simulez le fork d'un dépôt pour contribuer à un projet open source.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git clone https://github.com/your-username/forked-repo.git',
                  'git remote add upstream https://github.com/original-owner/original-repo.git',
                  'git fetch upstream',
                  'git merge upstream/main'
                ]}
                expectedCommand='git clone https://github.com/your-username/forked-repo.git'
              />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 3 : Synchronisation avec le dépôt original</h3>
              <p className="text-gray-300 mb-4">
                Maintenez votre fork synchronisé avec le dépôt original.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git fetch upstream',
                  'git checkout main',
                  'git merge upstream/main',
                  'git push origin main'
                ]}
                expectedCommand='git fetch upstream'
              />
            </Card>
          </div>
        );
      
      // Default case for "workflows" chapter or any other
      default:
        return (
          <div className="space-y-8">
            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 1 : Commandes Git de base</h3>
              <p className="text-gray-300 mb-4">
                Pratiquez les commandes Git fondamentales dans un environnement sécurisé.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git init', 
                  'git add .', 
                  'git commit -m "Message"', 
                  'git status', 
                  'git log'
                ]}
                expectedCommand='git status'
              />
            </Card>

            <Card>
              <h3 className="text-lg font-medium text-white mb-3">Exercice 2 : Workflow Git</h3>
              <p className="text-gray-300 mb-4">
                Mettez en pratique un workflow Git complet, de l'initialisation au push.
              </p>
              <GitCommandSimulator 
                availableCommands={[
                  'git init',
                  'git add .',
                  'git commit -m "First commit"',
                  'git branch feature',
                  'git checkout feature'
                ]}
                expectedCommand='git init'
              />
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Contrôle Technique</h2>
        <p className="text-gray-300">Exercices pratiques adaptés à votre progression dans le chapitre {currentChapterIndex + 1}</p>
      </div>
      {renderExercisesByChapter()}
    </div>
  );
};

export default ExercisesContainer;