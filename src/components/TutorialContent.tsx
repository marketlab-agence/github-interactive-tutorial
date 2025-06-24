import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import ChapterIntro from './tutorial/ChapterIntro';
import LessonContent from './tutorial/LessonContent';
import QuizQuestion from './tutorial/QuizQuestion';
import ChapterSummary from './tutorial/ChapterSummary';
import NavigationControls from './tutorial/NavigationControls';
import Button from './ui/Button';
import Badge from './ui/Badge';
import Card from './ui/Card';
import { useTutorial } from '../context/TutorialContext';
import { chapters } from '../data/tutorialData';

// Import interactive components for Chapter 3: Branches and Fusion
import BranchCreator from './interactive/BranchCreator';
import MergeSimulator from './interactive/MergeSimulator';
import ConflictResolver from './interactive/ConflictResolver';

// Import interactive components for Chapter 4: Remote Repositories
import RemoteConnectionVisual from './tutorial/RemoteConnectionVisual';
import PushPullAnimator from './tutorial/PushPullAnimator';
import LocalVsRemoteVisual from './tutorial/LocalVsRemoteVisual';
import SyncStatusIndicator from './interactive/SyncStatusIndicator';

// Import interactive components for Chapter 5: Collaboration and Pull Requests
import ForkVsCloneDemo from './tutorial/ForkVsCloneDemo';
import PullRequestCreator from './interactive/PullRequestCreator';
import CodeReviewInterface from './tutorial/CodeReviewInterface';
import CollaborationSimulator from './interactive/CollaborationSimulator';

// Import interactive components for Chapter 6: Git Workflows
import WorkflowComparisonTable from './tutorial/WorkflowComparisonTable';
import WorkflowSimulator from './interactive/WorkflowSimulator';
import FlowDiagramBuilder from './tutorial/FlowDiagramBuilder';

interface TutorialContentProps {
  onReturnToHome: () => void;
}

const TutorialContent: React.FC<TutorialContentProps> = ({ onReturnToHome }) => {
  const { userProgress, updateProgress, completeLesson, completeChapter, completeQuiz, setLastPosition } = useTutorial();
  const [currentView, setCurrentView] = useState<'chapter-intro' | 'lesson' | 'quiz' | 'quiz-results' | 'chapter-summary'>(
    userProgress.lastPosition.view === 'chapter-intro' || 
    userProgress.lastPosition.view === 'lesson' || 
    userProgress.lastPosition.view === 'quiz' || 
    userProgress.lastPosition.view === 'quiz-results' ||
    userProgress.lastPosition.view === 'chapter-summary' 
      ? userProgress.lastPosition.view as any 
      : 'chapter-intro'
  );
  
  // Trouver l'index du chapitre actuel
  const findChapterIndex = () => {
    if (userProgress.lastPosition.chapterId) {
      const index = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
      return index !== -1 ? index : 0;
    }
    return 0;
  };
  
  const [currentChapter, setCurrentChapter] = useState<number>(findChapterIndex());
  const [currentLesson, setCurrentLesson] = useState<number>(userProgress.currentLesson || 0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(userProgress.lastPosition.quizIndex || 0);
  const [quizAnswers, setQuizAnswers] = useState<boolean[]>([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<Array<{question: string, isCorrect: boolean}>>([]);

  // Vérifier si le chapitre actuel est déverrouillé
  const isChapterUnlocked = (chapterIndex: number) => {
    // Le premier chapitre est toujours déverrouillé
    if (chapterIndex === 0) return true;
    
    // Pour les autres chapitres, vérifier si le chapitre précédent est complété
    const previousChapterId = chapters[chapterIndex - 1]?.id;
    return previousChapterId && userProgress.completedChapters.includes(previousChapterId);
  };

  // Initialiser l'état en fonction de la dernière position sauvegardée
  useEffect(() => {
    if (userProgress.lastPosition.chapterId) {
      const chapterIndex = chapters.findIndex(c => c.id === userProgress.lastPosition.chapterId);
      if (chapterIndex !== -1) {
        // Vérifier si le chapitre est déverrouillé
        if (isChapterUnlocked(chapterIndex)) {
          setCurrentChapter(chapterIndex);
          
          if (userProgress.lastPosition.view === 'lesson' && userProgress.lastPosition.lessonId) {
            const lessonIndex = chapters[chapterIndex].lessons.findIndex(l => l.id === userProgress.lastPosition.lessonId);
            if (lessonIndex !== -1) {
              setCurrentLesson(lessonIndex);
            }
          }
          
          if (userProgress.lastPosition.view === 'quiz' && userProgress.lastPosition.quizIndex !== undefined) {
            setCurrentQuizIndex(userProgress.lastPosition.quizIndex);
          }
        } else {
          // Si le chapitre n'est pas déverrouillé, rediriger vers le dernier chapitre déverrouillé
          let lastUnlockedChapter = 0;
          for (let i = 0; i < chapters.length; i++) {
            if (isChapterUnlocked(i)) {
              lastUnlockedChapter = i;
            } else {
              break;
            }
          }
          
          setCurrentChapter(lastUnlockedChapter);
          setLastPosition({
            view: 'chapter-intro',
            chapterId: chapters[lastUnlockedChapter].id
          });
        }
      }
    }
  }, [userProgress.lastPosition, userProgress.completedChapters]);

  const startChapter = () => {
    // Vérifier si le chapitre est déverrouillé
    if (!isChapterUnlocked(currentChapter)) {
      // Afficher un message d'erreur ou rediriger
      return;
    }
    
    // Commencer le chapitre actuel, pas le suivant
    const currentChapterId = chapters[currentChapter].id;
    setCurrentView('lesson');
    setCurrentLesson(0);
    setCurrentQuizIndex(0);
    setQuizAnswers([]);
    setQuizCompleted(false);
    setQuizQuestions([]);
    
    // Mettre à jour la progression
    updateProgress({
      currentChapter: currentChapter,
      currentLesson: 0
    });
    
    setLastPosition({
      view: 'lesson',
      chapterId: currentChapterId,
      lessonId: chapters[currentChapter].lessons[0].id
    });
  };

  const handleCompleteLesson = () => {
    const currentChapterId = chapters[currentChapter].id;
    const currentLessonId = chapters[currentChapter].lessons[currentLesson].id;
    
    // Marquer la leçon comme complétée
    completeLesson(currentChapterId, currentLessonId);
    
    // Passer à la leçon suivante ou au quiz
    if (currentLesson < chapters[currentChapter].lessons.length - 1) {
      // Passer à la leçon suivante
      const nextLessonIndex = currentLesson + 1;
      setCurrentLesson(nextLessonIndex);
      
      // Mettre à jour la progression
      updateProgress({
        currentLesson: nextLessonIndex
      });
      
      setLastPosition({
        view: 'lesson',
        chapterId: currentChapterId,
        lessonId: chapters[currentChapter].lessons[nextLessonIndex].id
      });
    } else {
      // Toutes les leçons sont terminées, passer au quiz
      setCurrentView('quiz');
      setCurrentQuizIndex(0);
      setQuizAnswers([]);
      setQuizQuestions([]);
      
      setLastPosition({
        view: 'quiz',
        chapterId: currentChapterId,
        quizIndex: 0
      });
    }
  };

  const handleQuizAnswer = (correct: boolean) => {
    // Enregistrer la réponse
    const newQuizAnswers = [...quizAnswers];
    newQuizAnswers[currentQuizIndex] = correct;
    setQuizAnswers(newQuizAnswers);
    
    // Enregistrer la question et si la réponse est correcte
    const newQuizQuestions = [...quizQuestions];
    newQuizQuestions[currentQuizIndex] = {
      question: chapters[currentChapter].quiz[currentQuizIndex].question,
      isCorrect: correct
    };
    setQuizQuestions(newQuizQuestions);
    
    // Passer à la question suivante
    if (currentQuizIndex < chapters[currentChapter].quiz.length - 1) {
      // Passer à la question suivante
      const nextQuizIndex = currentQuizIndex + 1;
      setCurrentQuizIndex(nextQuizIndex);
      
      setLastPosition({
        view: 'quiz',
        chapterId: chapters[currentChapter].id,
        quizIndex: nextQuizIndex
      });
    } else {
      // Toutes les questions sont terminées, afficher les résultats
      setQuizCompleted(true);
      setCurrentView('quiz-results');
      
      setLastPosition({
        view: 'quiz-results',
        chapterId: chapters[currentChapter].id
      });
    }
  };

  const calculateQuizScore = () => {
    const correctAnswers = quizAnswers.filter(answer => answer).length;
    return Math.round((correctAnswers / chapters[currentChapter].quiz.length) * 100);
  };

  const handleQuizComplete = () => {
    const score = calculateQuizScore();
    
    if (score >= 80) {
      // Marquer le chapitre comme complété
      const currentChapterId = chapters[currentChapter].id;
      completeChapter(currentChapterId);
      completeQuiz(currentChapterId, score);
      
      setLastPosition({
        view: 'chapter-summary',
        chapterId: currentChapterId
      });
      
      // Afficher le résumé du chapitre
      setCurrentView('chapter-summary');
    } else {
      // Retourner aux leçons pour réviser
      setCurrentView('lesson');
      setCurrentLesson(0);
      
      setLastPosition({
        view: 'lesson',
        chapterId: chapters[currentChapter].id,
        lessonId: chapters[currentChapter].lessons[0].id
      });
    }
  };

  const goToNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      // Vérifier si le prochain chapitre est déverrouillé
      const nextChapterIndex = currentChapter + 1;
      if (!isChapterUnlocked(nextChapterIndex)) {
        // Afficher un message d'erreur
        return;
      }
      
      // Passer au chapitre suivant
      setCurrentChapter(nextChapterIndex);
      setCurrentLesson(0);
      setCurrentView('chapter-intro');
      setCurrentQuizIndex(0);
      setQuizAnswers([]);
      setQuizQuestions([]);
      setQuizCompleted(false);
      
      // Mettre à jour la progression
      updateProgress({
        currentChapter: nextChapterIndex,
        currentLesson: 0
      });
      
      setLastPosition({
        view: 'chapter-intro',
        chapterId: chapters[nextChapterIndex].id
      });
    } else {
      // Tous les chapitres sont terminés, retourner à l'accueil
      onReturnToHome();
      
      setLastPosition({
        view: 'certificate'
      });
    }
  };

  // Si le chapitre n'est pas déverrouillé, afficher un message
  if (!isChapterUnlocked(currentChapter)) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <div className="text-center space-y-6 py-8">
            <span className="text-5xl">🔒</span>
            <h2 className="text-2xl font-bold text-white">Chapitre verrouillé</h2>
            <p className="text-gray-300">
              Vous devez compléter le chapitre précédent et réussir son quiz avant de pouvoir accéder à ce chapitre.
            </p>
            <Button 
              onClick={() => {
                // Trouver le dernier chapitre déverrouillé
                let lastUnlockedChapter = 0;
                for (let i = 0; i < chapters.length; i++) {
                  if (isChapterUnlocked(i)) {
                    lastUnlockedChapter = i;
                  } else {
                    break;
                  }
                }
                
                setCurrentChapter(lastUnlockedChapter);
                setCurrentView('chapter-intro');
                setLastPosition({
                  view: 'chapter-intro',
                  chapterId: chapters[lastUnlockedChapter].id
                });
              }}
            >
              Retourner au dernier chapitre déverrouillé
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (currentView === 'chapter-intro') {
    return (
      <ChapterIntro
        chapterNumber={currentChapter + 1}
        title={chapters[currentChapter].title}
        description={chapters[currentChapter].description}
        objectives={chapters[currentChapter].objectives}
        estimatedTime={chapters[currentChapter].estimatedTime}
        onStart={startChapter}
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
        
        {/* Dynamic Component Rendering */}
        {lesson.component && (
          <div className="max-w-4xl mx-auto">
            {lesson.component === 'BranchCreator' && (
              <BranchCreator onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'MergeSimulator' && (
              <MergeSimulator onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'ConflictResolver' && (
              <ConflictResolver onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'RemoteConnectionVisual' && (
              <RemoteConnectionVisual onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'PushPullAnimator' && (
              <PushPullAnimator onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'LocalVsRemoteVisual' && (
              <LocalVsRemoteVisual onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'SyncStatusIndicator' && (
              <SyncStatusIndicator onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'ForkVsCloneDemo' && (
              <ForkVsCloneDemo onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'PullRequestCreator' && (
              <PullRequestCreator onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'CodeReviewInterface' && (
              <CodeReviewInterface onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'CollaborationSimulator' && (
              <CollaborationSimulator onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'WorkflowComparisonTable' && (
              <WorkflowComparisonTable onComplete={handleCompleteLesson} />
            )}
            {lesson.component === 'WorkflowSimulator' && (
              <WorkflowSimulator 
                workflowType={lesson.workflowType || 'github-flow'} 
                onComplete={handleCompleteLesson} 
              />
            )}
            {lesson.component === 'FlowDiagramBuilder' && (
              <FlowDiagramBuilder onComplete={handleCompleteLesson} />
            )}
          </div>
        )}
        
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
              const prevLessonIndex = currentLesson - 1;
              setCurrentLesson(prevLessonIndex);
              updateProgress({
                currentLesson: prevLessonIndex
              });
              setLastPosition({
                view: 'lesson',
                chapterId: chapters[currentChapter].id,
                lessonId: chapters[currentChapter].lessons[prevLessonIndex].id
              });
            } else {
              setCurrentView('chapter-intro');
              setLastPosition({
                view: 'chapter-intro',
                chapterId: chapters[currentChapter].id
              });
            }
          }}
          onNext={handleCompleteLesson}
          showProgress={true}
          currentStep={currentLesson + 1}
          totalSteps={chapters[currentChapter].lessons.length}
          disabled={{
            previous: currentLesson === 0 && currentView === 'chapter-intro',
            next: false
          }}
          previousLabel="Précédent"
          nextLabel="Suivant"
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
          questionIndex={currentQuizIndex}
        />
        
        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={() => {
              setCurrentView('lesson');
              setCurrentLesson(chapters[currentChapter].lessons.length - 1);
              setLastPosition({
                view: 'lesson',
                chapterId: chapters[currentChapter].id,
                lessonId: chapters[currentChapter].lessons[chapters[currentChapter].lessons.length - 1].id
              });
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
  
  if (currentView === 'quiz-results') {
    const score = calculateQuizScore();
    const isPassed = score >= 80;
    const correctAnswers = quizAnswers.filter(answer => answer).length;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            Résultats du Quiz - {chapters[currentChapter].title}
          </h2>
          <p className="text-gray-300">Votre score final</p>
        </div>
        
        <div className="max-w-2xl mx-auto bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="text-center space-y-6">
            <div className={`text-6xl font-bold ${isPassed ? 'text-green-400' : 'text-red-400'}`}>
              {score}%
            </div>
            
            <div className="text-xl font-semibold text-white">
              {isPassed 
                ? 'Félicitations ! Vous avez réussi le quiz.' 
                : 'Vous devez réviser ce chapitre.'}
            </div>
            
            <div className="text-gray-300">
              {isPassed 
                ? 'Vous pouvez maintenant passer au chapitre suivant.' 
                : 'Un score minimum de 80% est requis pour valider le chapitre. Révisez les leçons et réessayez.'}
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setCurrentView('lesson');
                  setCurrentLesson(0);
                  setLastPosition({
                    view: 'lesson',
                    chapterId: chapters[currentChapter].id,
                    lessonId: chapters[currentChapter].lessons[0].id
                  });
                }}
              >
                Réviser les leçons
              </Button>
              
              {isPassed ? (
                <Button onClick={handleQuizComplete}>
                  Terminer le chapitre
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setCurrentView('quiz');
                    setCurrentQuizIndex(0);
                    setQuizAnswers([]);
                    setQuizQuestions([]);
                    setLastPosition({
                      view: 'quiz',
                      chapterId: chapters[currentChapter].id,
                      quizIndex: 0
                    });
                  }}
                >
                  Réessayer le quiz
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-4">Détail des réponses</h3>
          <div className="space-y-3">
            {quizQuestions.map((item, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  item.isCorrect 
                    ? 'bg-green-900/20 border-green-500/30' 
                    : 'bg-red-900/20 border-red-500/30'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {item.isCorrect 
                    ? <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    : <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  }
                  <div>
                    <div className="font-medium text-white mb-1">
                      Question {index + 1}
                    </div>
                    <div className="text-sm text-gray-300">
                      {item.question}
                    </div>
                    <div className="mt-1 text-sm">
                      <span className={item.isCorrect ? "text-green-400" : "text-red-400"}>
                        {item.isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
          setLastPosition({
            view: 'chapter-intro',
            chapterId: chapters[currentChapter].id
          });
        }}
      />
    );
  }

  return null;
};

export default TutorialContent;