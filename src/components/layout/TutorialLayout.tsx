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
      <div className="flex">
        {/* Sidebar */}
        <SidebarNavigation 
          currentChapter={currentChapter}
          currentLesson={currentLesson}
        />

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
            transition={{ duration: 0.5 }}
            className="flex-1 p-8"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default TutorialLayout;