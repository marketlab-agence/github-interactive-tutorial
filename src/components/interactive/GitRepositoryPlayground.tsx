import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, Folder, File, Plus, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

interface GitRepositoryPlaygroundProps {
  initialFiles?: FileNode[];
  onFileChange?: (files: FileNode[]) => void;
}

const GitRepositoryPlayground: React.FC<GitRepositoryPlaygroundProps> = ({
  initialFiles = [
    { name: 'README.md', type: 'file', content: '# My Project\n\nWelcome to my project!' },
    { name: 'src', type: 'folder', children: [
      { name: 'index.js', type: 'file', content: 'console.log("Hello World!");' }
    ]}
  ],
  onFileChange
}) => {
  const [files, setFiles] = useState<FileNode[]>(initialFiles);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [stagedFiles, setStagedFiles] = useState<string[]>([]);
  const [commits, setCommits] = useState<Array<{id: string, message: string, files: string[]}>>([]);

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node, index) => (
      <motion.div
        key={`${node.name}-${depth}-${index}`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`ml-${depth * 4}`}
      >
        <div
          className={`flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-700/30 ${
            selectedFile === node ? 'bg-blue-900/20 border border-blue-500/30' : ''
          }`}
          onClick={() => setSelectedFile(node)}
        >
          {node.type === 'folder' ? (
            <Folder className="h-4 w-4 text-blue-400" />
          ) : (
            <File className="h-4 w-4 text-gray-400" />
          )}
          <span className="text-sm text-white">{node.name}</span>
          {stagedFiles.includes(node.name) && (
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          )}
        </div>
        {node.children && renderFileTree(node.children, depth + 1)}
      </motion.div>
    ));
  };

  const stageFile = (fileName: string) => {
    if (!stagedFiles.includes(fileName)) {
      setStagedFiles([...stagedFiles, fileName]);
    }
  };

  const unstageFile = (fileName: string) => {
    setStagedFiles(stagedFiles.filter(f => f !== fileName));
  };

  const createCommit = () => {
    if (stagedFiles.length > 0) {
      const newCommit = {
        id: `commit-${commits.length + 1}`,
        message: `Update ${stagedFiles.join(', ')}`,
        files: [...stagedFiles]
      };
      setCommits([...commits, newCommit]);
      setStagedFiles([]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Git Repository Playground</h2>
        <p className="text-gray-300">Practice Git operations in a safe environment</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* File Tree */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center">
                <Folder className="h-5 w-5 mr-2" />
                Files
              </h3>
              <Button size="sm" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          }
        >
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {renderFileTree(files)}
          </div>
        </Card>

        {/* File Editor */}
        <Card
          header={
            <h3 className="font-semibold text-white flex items-center">
              <File className="h-5 w-5 mr-2" />
              {selectedFile ? selectedFile.name : 'Select a file'}
            </h3>
          }
        >
          {selectedFile && selectedFile.type === 'file' ? (
            <div className="space-y-4">
              <textarea
                value={selectedFile.content || ''}
                onChange={(e) => {
                  const updatedFile = { ...selectedFile, content: e.target.value };
                  setSelectedFile(updatedFile);
                }}
                className="w-full h-32 bg-gray-900 text-gray-100 p-3 rounded border border-gray-700 font-mono text-sm resize-none"
                placeholder="File content..."
              />
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => stageFile(selectedFile.name)}
                  disabled={stagedFiles.includes(selectedFile.name)}
                >
                  Stage File
                </Button>
                {stagedFiles.includes(selectedFile.name) && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => unstageFile(selectedFile.name)}
                  >
                    Unstage
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              Select a file to edit
            </div>
          )}
        </Card>

        {/* Git Operations */}
        <Card
          header={
            <h3 className="font-semibold text-white flex items-center">
              <GitCommit className="h-5 w-5 mr-2" />
              Git Status
            </h3>
          }
        >
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Staged Files</h4>
              {stagedFiles.length > 0 ? (
                <ul className="space-y-1">
                  {stagedFiles.map((file, index) => (
                    <li key={index} className="text-sm text-green-400 flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                      {file}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No staged files</p>
              )}
            </div>

            <Button
              onClick={createCommit}
              disabled={stagedFiles.length === 0}
              className="w-full"
            >
              <GitCommit className="h-4 w-4 mr-2" />
              Commit Changes
            </Button>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Commits</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {commits.slice(-3).reverse().map((commit, index) => (
                  <div key={commit.id} className="text-xs bg-gray-700/30 p-2 rounded">
                    <div className="font-mono text-blue-400">{commit.id}</div>
                    <div className="text-gray-300">{commit.message}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GitRepositoryPlayground;