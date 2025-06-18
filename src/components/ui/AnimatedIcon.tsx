import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge, Github, GitPullRequest } from 'lucide-react';

interface AnimatedIconProps {
  type: 'git' | 'github' | 'branch' | 'commit' | 'merge' | 'pullrequest';
  size?: number;
  className?: string;
  animate?: boolean;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  type,
  size = 24,
  className,
  animate = true
}) => {
  const icons = {
    git: GitCommit,
    github: Github,
    branch: GitBranch,
    commit: GitCommit,
    merge: GitMerge,
    pullrequest: GitPullRequest
  };

  const Icon = icons[type];

  const animations = {
    git: {
      rotate: [0, 360],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    github: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    branch: {
      y: [0, -5, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    commit: {
      opacity: [0.5, 1, 0.5],
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    },
    merge: {
      x: [0, 5, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
    },
    pullrequest: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      animate={animate ? animations[type] : {}}
      className={className}
    >
      <Icon size={size} />
    </motion.div>
  );
};

export default AnimatedIcon;