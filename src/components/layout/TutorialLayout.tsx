import React from 'react';
import { motion } from 'framer-motion';
import SidebarNavigation from './SidebarNavigation';
import ProgressBar from './ProgressBar';
import ChapterHeader from './ChapterHeader';
import BreadcrumbNavigation from './BreadcrumbNavigation';

interface TutorialLayoutProps {
  children: React.ReactNode;
  currentChapter?: number;
  currentLesson?: number;
  totalProgress?: number;
}

const TutorialLayout: React.FC<TutorialLayoutProps> = ({
  children,
  currentChapter = 1,
  currentLesson = 1,
  totalProgress = 25
}) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="hidden md:block">
          <SidebarNavigation 
          currentChapter={currentChapter}
          currentLesson={currentLesson}
        />
          />
        </div>

        {/* Mobile Sidebar Button */}
        <div className="md:hidden p-4 flex justify-end">
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => {/* fonction pour ouvrir le menu mobile */}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Progress Bar */}
          <ProgressBar progress={totalProgress} />

          {/* Breadcrumb Navigation */}
          <BreadcrumbNavigation 
            chapter={currentChapter}
            lesson={currentLesson}
          />

          {/* Chapter Header */}
          <ChapterHeader 
            chapterNumber={currentChapter}
            title="Introduction to Git & GitHub"
            objectives={[ 
              "Understand the difference between Git and GitHub",
              "Learn basic version control concepts",
              "Set up your first repository"
            ]}
          />

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 p-4 md:p-8"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default TutorialLayout;