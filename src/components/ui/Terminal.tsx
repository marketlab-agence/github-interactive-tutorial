import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Circle } from 'lucide-react';

interface TerminalProps {
  commands?: string[];
  autoPlay?: boolean;
  speed?: number;
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({
  commands = ['git init', 'git add .', 'git commit -m "Initial commit"'],
  autoPlay = false,
  speed = 1000,
  className
}) => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (autoPlay && currentCommand < commands.length) {
      const command = commands[currentCommand];
      setIsTyping(true);
      
      let index = 0;
      const typeInterval = setInterval(() => {
        setDisplayedText(command.slice(0, index + 1));
        index++;
        
        if (index >= command.length) {
          clearInterval(typeInterval);
          setIsTyping(false);
          
          setTimeout(() => {
            setCurrentCommand(prev => prev + 1);
            setDisplayedText('');
          }, speed);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }
  }, [currentCommand, commands, autoPlay, speed]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gray-900 rounded-lg border border-gray-700 overflow-hidden ${className}`}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Circle className="w-3 h-3 fill-red-500 text-red-500" />
          <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <Circle className="w-3 h-3 fill-green-500 text-green-500" />
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-sm">Terminal</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm">
        {commands.slice(0, currentCommand).map((cmd, index) => (
          <div key={index} className="mb-2">
            <div className="flex items-center text-green-400">
              <span className="text-gray-500 mr-2">$</span>
              <span>{cmd}</span>
            </div>
            <div className="text-gray-300 ml-4 text-xs">
              Command executed successfully
            </div>
          </div>
        ))}
        
        {currentCommand < commands.length && (
          <div className="flex items-center text-green-400">
            <span className="text-gray-500 mr-2">$</span>
            <span>{displayedText}</span>
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1"
              >
                |
              </motion.span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;