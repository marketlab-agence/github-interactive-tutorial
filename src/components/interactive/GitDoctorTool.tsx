import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, AlertTriangle, CheckCircle, RefreshCw, Terminal, Lightbulb } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Alert from '../ui/Alert';
import CodeBlock from '../ui/CodeBlock';

interface GitIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  solution: string;
  commands: string[];
  severity: 'low' | 'medium' | 'high';
}

const GitDoctorTool: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [issues, setIssues] = useState<GitIssue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<GitIssue | null>(null);

  const mockIssues: GitIssue[] = [
    {
      id: '1',
      type: 'error',
      title: 'État HEAD Détaché',
      description: 'Votre dépôt est dans un état HEAD détaché. Cela signifie que vous n\'êtes sur aucune branche.',
      solution: 'Créez une nouvelle branche ou basculez vers une branche existante pour continuer à travailler.',
      commands: ['git checkout -b nom-nouvelle-branche', 'git checkout main'],
      severity: 'high'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Modifications Non Commitées',
      description: 'Vous avez des modifications non commitées dans votre répertoire de travail.',
      solution: 'Commitez vos modifications ou mettez-les en réserve avant de changer de branche.',
      commands: ['git add .', 'git commit -m "Votre message"', 'git stash'],
      severity: 'medium'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Fichiers Non Suivis',
      description: 'Il y a des fichiers non suivis dans votre dépôt.',
      solution: 'Ajoutez les fichiers au suivi ou ajoutez-les au .gitignore.',
      commands: ['git add nom-fichier', 'echo "nom-fichier" >> .gitignore'],
      severity: 'low'
    },
    {
      id: '4',
      type: 'info',
      title: 'Branche en Avance sur le Distant',
      description: 'Votre branche locale est en avance sur la branche distante.',
      solution: 'Poussez vos modifications pour synchroniser avec le dépôt distant.',
      commands: ['git push origin nom-branche'],
      severity: 'low'
    }
  ];

  const runDiagnostic = async () => {
    setIsScanning(true);
    setScanComplete(false);
    setIssues([]);
    
    // Simuler le processus de scan
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Sélectionner aléatoirement quelques problèmes
    const randomIssues = mockIssues
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    setIssues(randomIssues);
    setIsScanning(false);
    setScanComplete(true);
  };

  const fixIssue = (issueId: string) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
    if (selectedIssue?.id === issueId) {
      setSelectedIssue(null);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Git Docteur</h2>
        <p className="text-gray-300">Diagnostiquez et corrigez les problèmes Git courants</p>
      </motion.div>

      {/* Contrôles de Diagnostic */}
      <Card>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Stethoscope className="h-8 w-8 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Vérification de Santé du Dépôt</h3>
          </div>
          
          {!scanComplete && (
            <Button
              onClick={runDiagnostic}
              disabled={isScanning}
              loading={isScanning}
              size="lg"
            >
              {isScanning ? 'Analyse du Dépôt...' : 'Lancer le Diagnostic'}
            </Button>
          )}

          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-center space-x-2 text-blue-400">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Analyse de la structure du dépôt...</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </div>
      </Card>

      {/* Résultats */}
      <AnimatePresence>
        {scanComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Liste des Problèmes */}
            <div className="lg:col-span-2">
              <Card
                header={
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">
                      Problèmes Détectés ({issues.length})
                    </h3>
                    <Button size="sm" variant="secondary" onClick={runDiagnostic}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Re-scanner
                    </Button>
                  </div>
                }
              >
                {issues.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-white mb-2">Tout va bien !</h4>
                    <p className="text-gray-300">Aucun problème détecté dans votre dépôt.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {issues.map((issue) => {
                      const Icon = getIssueIcon(issue.type);
                      return (
                        <motion.div
                          key={issue.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedIssue?.id === issue.id
                              ? 'bg-blue-900/20 border-blue-500/50'
                              : 'border-gray-600 hover:bg-gray-700/30'
                          }`}
                          onClick={() => setSelectedIssue(issue)}
                        >
                          <div className="flex items-start space-x-3">
                            <Icon className={`h-5 w-5 mt-0.5 ${
                              issue.type === 'error' ? 'text-red-400' :
                              issue.type === 'warning' ? 'text-yellow-400' : 'text-blue-400'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-white">{issue.title}</h4>
                                <span className={`text-xs ${getSeverityColor(issue.severity)}`}>
                                  {issue.severity === 'high' ? 'Élevé' : 
                                   issue.severity === 'medium' ? 'Moyen' : 'Faible'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300">{issue.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </div>

            {/* Détails du Problème & Solution */}
            <Card
              header={
                <h3 className="font-semibold text-white">Solution</h3>
              }
            >
              {selectedIssue ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">{selectedIssue.title}</h4>
                    <p className="text-sm text-gray-300 mb-3">{selectedIssue.description}</p>
                  </div>

                  <Alert type="info" title="Solution Recommandée">
                    {selectedIssue.solution}
                  </Alert>

                  <div>
                    <h5 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                      <Terminal className="h-4 w-4 mr-2" />
                      Commandes pour Corriger
                    </h5>
                    <div className="space-y-2">
                      {selectedIssue.commands.map((command, index) => (
                        <CodeBlock
                          key={index}
                          code={command}
                          language="bash"
                          copyable
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      size="sm"
                      className="w-full"
                      onClick={() => fixIssue(selectedIssue.id)}
                    >
                      Marquer comme Corrigé
                    </Button>
                    <Button size="sm" variant="secondary" className="w-full">
                      <Lightbulb className="h-4 w-4 mr-2" />
                      En Savoir Plus
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  Sélectionnez un problème pour voir la solution
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GitDoctorTool;