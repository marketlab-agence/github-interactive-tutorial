import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, GitMerge, Code, Save } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Alert from '../ui/Alert';

interface ConflictFile {
  path: string;
  content: string;
  resolved: boolean;
}

const ConflictResolver: React.FC = () => {
  const [conflicts, setConflicts] = useState<ConflictFile[]>([
    {
      path: 'src/components/Header.js',
      content: `import React from 'react';

const Header = () => {
  return (
    <header className="header">
<<<<<<< HEAD
      <h1>My Application</h1>
      <nav>
        <a href="/home">Home</a>
        <a href="/about">About</a>
      </nav>
=======
      <h1>My Awesome App</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
>>>>>>> feature-branch
    </header>
  );
};

export default Header;`,
      resolved: false
    },
    {
      path: 'package.json',
      content: `{
  "name": "my-app",
<<<<<<< HEAD
  "version": "1.0.0",
  "description": "A simple application",
=======
  "version": "1.1.0",
  "description": "An awesome application with new features",
>>>>>>> feature-branch
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}`,
      resolved: false
    }
  ]);

  const [selectedFile, setSelectedFile] = useState<ConflictFile | null>(conflicts[0]);
  const [editedContent, setEditedContent] = useState(conflicts[0]?.content || '');

  const resolveConflict = () => {
    if (selectedFile) {
      setConflicts(prev => prev.map(file => 
        file.path === selectedFile.path 
          ? { ...file, content: editedContent, resolved: true }
          : file
      ));
      
      const updatedFile = { ...selectedFile, content: editedContent, resolved: true };
      setSelectedFile(updatedFile);
    }
  };

  const resetConflict = () => {
    if (selectedFile) {
      const originalFile = conflicts.find(f => f.path === selectedFile.path);
      if (originalFile) {
        setEditedContent(originalFile.content);
        setConflicts(prev => prev.map(file => 
          file.path === selectedFile.path 
            ? { ...file, resolved: false }
            : file
        ));
        setSelectedFile({ ...selectedFile, resolved: false });
      }
    }
  };

  const allResolved = conflicts.every(file => file.resolved);
  const hasConflictMarkers = editedContent.includes('<<<<<<<') || 
                            editedContent.includes('=======') || 
                            editedContent.includes('>>>>>>>');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Résolution de Conflits Git</h2>
        <p className="text-gray-300">Pratiquez la résolution de conflits de fusion dans un environnement sécurisé</p>
      </motion.div>

      {!allResolved && (
        <Alert type="warning" title="Merge Conflicts Detected">
          Vous avez {conflicts.filter(f => !f.resolved).length} conflits non résolus.
          Résolvez tous les conflits avant de terminer la fusion.
        </Alert>
      )}

      {allResolved && (
        <Alert type="success" title="All Conflicts Resolved">
          Excellent ! Tous les conflits sont résolus. Vous pouvez maintenant terminer la fusion.
        </Alert>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Liste des fichiers - occupe toute la largeur sur mobile */}
        {/* Liste des fichiers - occupe toute la largeur sur mobile */}
        <div className="lg:col-span-1">
          <Card
            header={
              <h3 className="font-semibold text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-400" />
                Fichiers en conflit
              </h3>
            }
          >
            <div className="space-y-2 max-h-[300px] lg:max-h-[200px] overflow-y-auto">
              {conflicts.map((file, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedFile(file);
                    setEditedContent(file.content);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedFile?.path === file.path
                      ? 'bg-blue-900/20 border-blue-500/50'
                      : 'border-gray-600 hover:bg-gray-700/30'
                  }`}
                  aria-label={`Sélectionner ${file.path}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-white">{file.path}</span>
                    {file.resolved ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-orange-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Éditeur de Code - occupe toute la largeur sur mobile */}
        <div className="lg:col-span-2">
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  {selectedFile?.path || 'Sélectionnez un fichier'}
                </h3>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={resetConflict}
                    disabled={!selectedFile}
                  >
                    <span className="hidden sm:inline">Réinitialiser</span>
                    <span className="inline sm:hidden">Reset</span>
                    <span className="inline sm:hidden">Reset</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={resolveConflict}
                    disabled={!selectedFile || hasConflictMarkers || selectedFile.resolved}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Résoudre
                  </Button>
                </div>
              </div>
            }
          >
            {selectedFile ? (
              <div className="space-y-4">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full h-[300px] sm:h-96 bg-gray-900 text-gray-100 p-4 rounded border border-gray-700 font-mono text-sm resize-none"
                  placeholder="Éditez le contenu du fichier pour résoudre les conflits..."
                  aria-label="Contenu du fichier"
                  aria-label="Contenu du fichier"
                />
                
                {hasConflictMarkers && (
                  <Alert type="info" title="Conflict Markers Detected">
                    Supprimez tous les marqueurs de conflit (&lt;&lt;&lt;&lt;&lt;&lt;&lt;, =======, &gt;&gt;&gt;&gt;&gt;&gt;&gt;)
                    et choisissez le contenu correct pour résoudre le conflit.
                  </Alert>
                )}

                <div className="bg-gray-700/30 p-4 rounded-lg">
                  <h4 className="font-medium text-white mb-2">Conseils pour la résolution :</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Supprimez les marqueurs de conflit (&lt;&lt;&lt;&lt;&lt;&lt;&lt;, =======, &gt;&gt;&gt;&gt;&gt;&gt;&gt;)</li>
                    <li>• Choisissez les meilleures parties des deux versions</li>
                    <li>• Testez votre résolution pour vous assurer qu'elle fonctionne</li>
                    <li>• Tenez compte du contexte et de l'objectif de chaque modification</li>
                  </ul>
                </div>
                
                {/* Message sur petit écran */}
                <div className="block lg:hidden mt-2 text-xs text-gray-400 text-center">
                  Conseil : Tournez votre téléphone en mode paysage pour éditer plus facilement
                </div>
                
                {/* Message sur petit écran */}
                <div className="block md:hidden mt-2 text-xs text-gray-400 text-center">
                  Conseil : Tournez votre téléphone en mode paysage pour éditer plus facilement
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                Sélectionnez un fichier en conflit pour commencer la résolution
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Complete Merge */}
      <AnimatePresence>
        {allResolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card>
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                <h3 className="text-xl font-semibold text-white">Prêt à terminer la fusion</h3>
                <p className="text-gray-300">
                  Tous les conflits sont résolus. Vous pouvez maintenant terminer l'opération de fusion.
                </p>
                <Button size="lg" className="w-full sm:w-auto">
                  <GitMerge className="h-5 w-5 mr-2" />
                  Terminer la fusion
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConflictResolver;