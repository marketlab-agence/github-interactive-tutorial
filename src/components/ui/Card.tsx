import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { CardProps } from '../../types/ui.types';

const Card: React.FC<CardProps> = ({
  children,
  header,
  footer,
  className,
  variant = 'default'
}) => {
  const variantClasses = {
    default: 'bg-gray-800/50 border border-gray-700',
    elevated: 'bg-gray-800/70 border border-gray-600 shadow-xl',
    outlined: 'bg-transparent border-2 border-gray-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'rounded-xl overflow-hidden',
        variantClasses[variant],
        className
      )}
    >
      {header && (
        <div className="px-6 py-4 border-b border-gray-700">
          {header}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/30">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card;