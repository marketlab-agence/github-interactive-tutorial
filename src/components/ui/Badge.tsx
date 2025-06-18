import React from 'react';
import { clsx } from 'clsx';
import { BadgeProps } from '../../types/ui.types';

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md'
}) => {
  const variantClasses = {
    default: 'bg-gray-600 text-gray-100',
    success: 'bg-green-600 text-green-100',
    warning: 'bg-yellow-600 text-yellow-100',
    error: 'bg-red-600 text-red-100',
    info: 'bg-blue-600 text-blue-100'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={clsx(
      'inline-flex items-center font-medium rounded-full',
      variantClasses[variant],
      sizeClasses[size]
    )}>
      {children}
    </span>
  );
};

export default Badge;