import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  className,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus:ring-red-500',
    success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white focus:ring-green-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 active:bg-blue-700 hover:text-white focus:ring-blue-500',
    ghost: 'text-gray-300 hover:text-white hover:bg-gray-800 active:bg-gray-900 focus:ring-gray-500'
  };

  const sizeClasses = {
    sm: 'px-2 sm:px-3 py-1.5 text-sm',
    md: 'px-3 sm:px-4 py-2 text-base',
    lg: 'px-4 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg'
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      className={clsx(
        baseClasses, 
        variantClasses[variant],
        sizeClasses[size],
        isDisabled && 'opacity-50 cursor-not-allowed',
        'touch-manipulation', // Améliore le toucher sur mobile
        'touch-manipulation', // Améliore le toucher sur mobile
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
};

export default Button;