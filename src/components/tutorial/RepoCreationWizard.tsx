import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, Settings, FileText, GitBranch, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Alert from '../ui/Alert';

interface RepoConfig {
  name: string;
  description: string;
  visibility: 'public' | 'private';
  initWithReadme: boolean;
  gitignoreTemplate: string;
  license: string;
  defaultBranch: string;
}

const RepoCreationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<RepoConfig>({
    name: '',
    description: '',
    visibility: 'public',
    initWithReadme: true,
    gitignoreTemplate: 'Node',
    license: 'MIT',
    defaultBranch: 'main'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const gitignoreTemplates = [
    { value: '', label: 'Aucun' },
    { value: 'Node', label: 'Node.js' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'React', label: 'React' },
    { value: 'Vue', label: 'Vue.js' }
  ];

  const licenses = [
    { value: '', label: 'Aucune licence' },
    { value: 'MIT', label: 'MIT License' },
    { value: 'Apache-2.0', label: 'Apache License 2.0' },
    { value: 'GPL-3.0', label: 'GNU GPL v3' },
    { value: 'BSD-3-Clause', label: 'BSD 3-Clause' }
  ];

  const steps = [
    {
      id: 'basic',
      title: 'Informations de Base',
      icon: FileText,
      description: 'Nom et description du dépôt'
    },
    {
      id: 'settings',
      title: 'Paramètres',
      icon: Settings,
      description: 'Visibilité et configuration'
    },
    {
      id: 'files',
      title: 'Fichiers Initiaux',
      icon: GitBranch,
      description: 'README, .gitignore et licence'
    },
    {
      id: 'review',
      title: 'Révision',
      icon: CheckCircle,
      description: 'Vérifier et créer'
    }
  ];

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!config.name.trim()) {
        newErrors.name = 'Le nom du dépôt est requis';
      } else if (!/^[a-zA-Z0-9._-]+$/.test(config.name)) {
        newErrors.name = 'Le nom ne peut contenir que des lettres, chiffres, points, tirets et underscores';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const createRepository = () => {
    // Simuler la création du dépôt
    console.log('Création du dépôt avec la configuration:', config);
    // Dans une vraie application, on ferait un appel API ici
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nom du dépôt *
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full bg-gray-700 text-white px-3 py-2 rounded border ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                } focus:border-blue-500 focus:outline-none`}
                placeholder="mon-super-projet"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description (optionnelle)
              </label>
              <textarea
                value={config.description}
                onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                rows={3}
                placeholder="Une brève description de votre projet..."
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Visibilité du dépôt
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={config.visibility === 'public'}
                    onChange={(e) => setConfig(prev => ({ ...prev, visibility: e.target.value as 'public' | 'private' }))}
                    className="text-blue-500"
                  />
                  <div>
                    <div className="font-medium text-white">Public</div>
                    <div className="text-sm text-gray-400">Tout le monde peut voir ce dépôt</div>
                  </div>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={config.visibility === 'private'}
                    onChange={(e) => setConfig(prev => ({ ...prev, visibility: e.target.value as 'public' | 'private' }))}
                    className="text-blue-500"
                  />
                  <div>
                    <div className="font-medium text-white">Privé</div>
                    <div className="text-sm text-gray-400">Seuls vous et vos collaborateurs peuvent voir ce dépôt</div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Branche par défaut
              </label>
              <input
                type="text"
                value={config.defaultBranch}
                onChange={(e) => setConfig(prev => ({ ...prev, defaultBranch: e.target.value }))}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="main"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="readme"
                checked={config.initWithReadme}
                onChange={(e) => setConfig(prev => ({ ...prev, initWithReadme: e.target.checked }))}
                className="text-blue-500"
              />
              <label htmlFor="readme" className="text-white">
                Initialiser avec un README
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Template .gitignore
              </label>
              <select
                value={config.gitignoreTemplate}
                onChange={(e) => setConfig(prev => ({ ...prev, gitignoreTemplate: e.target.value }))}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {gitignoreTemplates.map(template => (
                  <option key={template.value} value={template.value}>
                    {template.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Licence
              </label>
              <select
                value={config.license}
                onChange={(e) => setConfig(prev => ({ ...prev, license: e.target.value }))}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {licenses.map(license => (
                  <option key={license.value} value={license.value}>
                    {license.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <Alert type="info" title="Révision de la Configuration">
              Vérifiez les paramètres de votre dépôt avant de le créer.
            </Alert>

            <div className="bg-gray-700/30 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">Nom :</span>
                  <span className="text-white ml-2 font-mono">{config.name}</span>
                </div>
                <div>
                  <span className="text-gray-400">Visibilité :</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    config.visibility === 'public' ? 'bg-green-600' : 'bg-yellow-600'
                  } text-white`}>
                    {config.visibility === 'public' ? 'Public' : 'Privé'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Branche :</span>
                  <span className="text-white ml-2 font-mono">{config.defaultBranch}</span>
                </div>
                <div>
                  <span className="text-gray-400">README :</span>
                  <span className="text-white ml-2">{config.initWithReadme ? 'Oui' : 'Non'}</span>
                </div>
              </div>

              {config.description && (
                <div>
                  <span className="text-gray-400">Description :</span>
                  <p className="text-white mt-1">{config.description}</p>
                </div>
              )}

              <div className="flex space-x-4">
                {config.gitignoreTemplate && (
                  <div>
                    <span className="text-gray-400">.gitignore :</span>
                    <span className="text-white ml-2">{config.gitignoreTemplate}</span>
                  </div>
                )}
                {config.license && (
                  <div>
                    <span className="text-gray-400">Licence :</span>
                    <span className="text-white ml-2">{config.license}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Assistant de Création de Dépôt</h2>
        <p className="text-gray-300">Créez votre dépôt Git étape par étape</p>
      </motion.div>

      {/* Progress Steps */}
      <Card>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center space-x-2 ${
                index <= currentStep ? 'text-blue-400' : 'text-gray-500'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index < currentStep 
                    ? 'bg-blue-600 border-blue-600' 
                    : index === currentStep
                    ? 'border-blue-400'
                    : 'border-gray-600'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4 text-white" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                <div className="hidden md:block">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-xs text-gray-400">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-blue-400' : 'bg-gray-600'
                }`} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Step Content */}
      <Card>
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white">{steps[currentStep].title}</h3>
            <p className="text-gray-400">{steps[currentStep].description}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Précédent
        </Button>

        {currentStep === steps.length - 1 ? (
          <Button onClick={createRepository}>
            <FolderPlus className="h-4 w-4 mr-2" />
            Créer le Dépôt
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Suivant
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default RepoCreationWizard;