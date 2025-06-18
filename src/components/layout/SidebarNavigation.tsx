import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  GitBranch, 
  Cloud, 
  Users, 
  Settings,
  CheckCircle,
  Circle,
  GitCommit
} from 'lucide-react';

interface SidebarNavigationProps {
  currentChapter: number;
  currentLesson: number;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  currentChapter,
  currentLesson
}) => {
  const chapters = [
    {
      id: 1,
      title: 'Introduction',
      icon: BookOpen,
      lessons: ['Git vs GitHub', 'Version Control Basics', 'Setup'],
      completed: true
    },
    {
      id: 2,
      title: 'Repositories & Commits',
      icon: GitCommit,
      lessons: ['Creating Repos', 'Making Commits', 'History'],
      completed: false,
      current: true
    },
    {
      id: 3,
      title: 'Branches & Merging',
      icon: GitBranch,
      lessons: ['Creating Branches', 'Merging', 'Conflicts'],
      completed: false
    },
    {
      id: 4,
      title: 'Remote Repositories',
      icon: Cloud,
      lessons: ['Push & Pull', 'Remotes', 'Synchronization'],
      completed: false
    },
    {
      id: 5,
      title: 'Collaboration',
      icon: Users,
      lessons: ['Pull Requests', 'Code Review', 'Team Workflows'],
      completed: false
    }
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-80 bg-gray-800/50 border-r border-gray-700 min-h-screen overflow-y-auto"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <GitCommit className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">Git & GitHub Tutorial</h1>
            <p className="text-sm text-gray-400">Interactive Learning</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-2">
        {chapters.map((chapter) => (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: chapter.id * 0.1 }}
            className={`rounded-lg border transition-all duration-200 ${
              chapter.current
                ? 'bg-blue-900/30 border-blue-500/50'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <chapter.icon className={`h-5 w-5 ${
                    chapter.completed ? 'text-green-400' : 
                    chapter.current ? 'text-blue-400' : 'text-gray-400'
                  }`} />
                  <h3 className="font-medium text-white">
                    Chapter {chapter.id}: {chapter.title}
                  </h3>
                </div>
                {chapter.completed && (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                )}
              </div>

              <div className="space-y-2">
                {chapter.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 text-sm p-2 rounded ${
                      chapter.id === currentChapter && index + 1 === currentLesson
                        ? 'bg-blue-600/20 text-blue-300'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <Circle className="h-3 w-3" />
                    <span>{lesson}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 mt-auto">
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>Progress</span>
          <span>2/5 Chapters</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
          <div className="bg-blue-500 h-2 rounded-full w-2/5"></div>
        </div>
      </div>
    </motion.aside>
  );
};

export default SidebarNavigation;