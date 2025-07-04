// Main index file that aggregates and exports all tutorial data
import { Chapter } from '../types/tutorial.types';

// Import individual chapters
import { gitBasicsChapter } from './chapters/git-basics';
import { repositoriesChapter } from './chapters/repositories';
import { branchingChapter } from './chapters/branching';
import { remoteReposChapter } from './chapters/remote-repos';
import { collaborationChapter } from './chapters/collaboration';
import { workflowsChapter } from './chapters/workflows';
import { conflictsChapter } from './chapters/conflicts';
import { undoingChapter } from './chapters/undoing';
import { githubFeaturesChapter } from './chapters/github-features';
import { finalProjectChapter } from './chapters/final-project';

// Combine all chapters
export const chapters: Chapter[] = [
  gitBasicsChapter,      // Chapitre 1
  repositoriesChapter,   // Chapitre 2
  branchingChapter,      // Chapitre 3
  remoteReposChapter,    // Chapitre 4
  collaborationChapter,  // Chapitre 5
  workflowsChapter,      // Chapitre 6
  conflictsChapter,
  undoingChapter,
  githubFeaturesChapter,
  finalProjectChapter
];

// Maintain backward compatibility
export const tutorialData = {
  chapters
};