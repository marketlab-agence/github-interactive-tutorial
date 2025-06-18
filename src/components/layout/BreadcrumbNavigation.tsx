import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbNavigationProps {
  chapter: number;
  lesson: number;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  chapter,
  lesson
}) => {
  const breadcrumbs = [
    { label: 'Home', icon: Home },
    { label: `Chapter ${chapter}` },
    { label: `Lesson ${lesson}` }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/30 px-8 py-3 border-b border-gray-700"
    >
      <div className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center space-x-2">
              {crumb.icon && <crumb.icon className="h-4 w-4" />}
              <span className={
                index === breadcrumbs.length - 1
                  ? 'text-white font-medium'
                  : 'text-gray-400 hover:text-gray-300 cursor-pointer'
              }>
                {crumb.label}
              </span>
            </div>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.nav>
  );
};

export default BreadcrumbNavigation;