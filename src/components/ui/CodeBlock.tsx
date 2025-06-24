import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { clsx } from 'clsx';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  title,
  showLineNumbers = false,
  copyable = true,
  className
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'bg-gray-900 rounded-lg border border-gray-700 overflow-hidden',
        className
      )}
    >
      {(title || copyable) && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          {title && (
            <span className="text-sm font-medium text-gray-300">{title}</span>
          )}
          {copyable && (
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-xs">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">Copier</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="text-gray-500 mr-4 select-none w-8 text-right">
                  {index + 1}
                </span>
              )}
              <code className={clsx(
                'text-gray-100',
                language === 'bash' && 'text-green-400',
                language === 'javascript' && 'text-yellow-400',
                language === 'json' && 'text-blue-400'
              )}>
                {line || ' '}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </motion.div>
  );
};

export default CodeBlock;