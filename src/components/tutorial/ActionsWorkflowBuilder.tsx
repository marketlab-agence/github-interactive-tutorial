import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GitMerge, 
  Play, 
  Package, 
  Server, 
  Workflow, 
  CheckCircle, 
  Plus, 
  Trash2, 
  ArrowDown, 
  AlertTriangle 
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'test' | 'build' | 'deploy' | 'lint' | 'custom';
  condition?: string;
  commands: string[];
  environment?: Record<string, string>;
  dependencies?: string[];
}

const ActionsWorkflowBuilder: React.FC = () => {
  const [workflow, setWorkflow] = useState<{
    name: string;
    triggers: string[];
    steps: WorkflowStep[];
  }>({
    name: 'CI/CD Pipeline',
    triggers: ['push', 'pull_request'],
    steps: [
      {
        id: 'step1',
        name: 'Lint Code',
        type: 'lint',
        commands: ['npm run lint'],
        dependencies: []
      },
      {
        id: 'step2',
        name: 'Run Tests',
        type: 'test',
        commands: ['npm test'],
        dependencies: ['step1']
      },
      {
        id: 'step3',
        name: 'Build Project',
        type: 'build',
        commands: ['npm run build'],
        dependencies: ['step2']
      },
      {
        id: 'step4',
        name: 'Deploy to Production',
        type: 'deploy',
        condition: 'github.ref == \'refs/heads/main\'',
        commands: ['npm run deploy'],
        environment: {
          NODE_ENV: 'production'
        },
        dependencies: ['step3']
      }
    ]
  });

  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const availableStepTypes = [
    { type: 'test', label: 'Test', icon: CheckCircle, color: 'blue' },
    { type: 'build', label: 'Build', icon: Package, color: 'green' },
    { type: 'deploy', label: 'Deploy', icon: Server, color: 'purple' },
    { type: 'lint', label: 'Lint', icon: CheckCircle, color: 'yellow' },
    { type: 'custom', label: 'Custom', icon: Workflow, color: 'orange' }
  ];

  const getStepTypeColor = (type: string) => {
    const stepType = availableStepTypes.find(t => t.type === type);
    return stepType?.color || 'gray';
  };

  const getStepIcon = (type: string) => {
    const stepType = availableStepTypes.find(t => t.type === type);
    return stepType?.icon || Workflow;
  };

  const addStep = (type: string) => {
    const newId = `step${workflow.steps.length + 1}`;
    const newStep: WorkflowStep = {
      id: newId,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Step`,
      type: type as WorkflowStep['type'],
      commands: type === 'test' ? ['npm test'] : 
               type === 'build' ? ['npm run build'] :
               type === 'deploy' ? ['npm run deploy'] :
               type === 'lint' ? ['npm run lint'] : ['echo "Custom step"'],
      dependencies: workflow.steps.length > 0 ? [workflow.steps[workflow.steps.length - 1].id] : []
    };

    setWorkflow({
      ...workflow,
      steps: [...workflow.steps, newStep]
    });
    
    setSelectedStep(newId);
  };

  const removeStep = (stepId: string) => {
    // Remove step
    const updatedSteps = workflow.steps.filter(step => step.id !== stepId);
    
    // Update dependencies for other steps
    const finalSteps = updatedSteps.map(step => ({
      ...step,
      dependencies: step.dependencies?.filter(dep => dep !== stepId) || []
    }));
    
    setWorkflow({
      ...workflow,
      steps: finalSteps
    });
    
    if (selectedStep === stepId) {
      setSelectedStep(null);
    }
  };

  const updateStepName = (stepId: string, name: string) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.map(step => 
        step.id === stepId ? { ...step, name } : step
      )
    });
  };

  const updateStepCommands = (stepId: string, commands: string) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.map(step => 
        step.id === stepId ? { ...step, commands: commands.split('\n').filter(cmd => cmd.trim() !== '') } : step
      )
    });
  };

  const updateStepCondition = (stepId: string, condition: string) => {
    setWorkflow({
      ...workflow,
      steps: workflow.steps.map(step => 
        step.id === stepId ? { ...step, condition } : step
      )
    });
  };

  const toggleTrigger = (trigger: string) => {
    setWorkflow({
      ...workflow,
      triggers: workflow.triggers.includes(trigger) 
        ? workflow.triggers.filter(t => t !== trigger)
        : [...workflow.triggers, trigger]
    });
  };

  const generateYaml = () => {
    let yaml = `name: ${workflow.name}\n\n`;
    
    // Add triggers
    yaml += 'on:\n';
    workflow.triggers.forEach(trigger => {
      yaml += `  ${trigger}:\n`;
      if (trigger === 'pull_request') {
        yaml += '    branches: [ main ]\n';
      }
    });
    
    yaml += '\njobs:\n';
    yaml += '  build:\n';
    yaml += '    runs-on: ubuntu-latest\n\n';
    
    // Add steps
    yaml += '    steps:\n';
    yaml += '    - uses: actions/checkout@v3\n\n';
    yaml += '    - name: Set up Node.js\n';
    yaml += '      uses: actions/setup-node@v3\n';
    yaml += '      with:\n';
    yaml += '        node-version: 18\n\n';
    
    yaml += '    - name: Install dependencies\n';
    yaml += '      run: npm ci\n\n';
    
    // Add custom steps
    workflow.steps.forEach(step => {
      yaml += `    - name: ${step.name}\n`;
      
      if (step.condition) {
        yaml += `      if: ${step.condition}\n`;
      }
      
      if (step.environment && Object.keys(step.environment).length > 0) {
        yaml += '      env:\n';
        Object.entries(step.environment).forEach(([key, value]) => {
          yaml += `        ${key}: ${value}\n`;
        });
      }
      
      if (step.commands.length === 1) {
        yaml += `      run: ${step.commands[0]}\n`;
      } else {
        yaml += '      run: |\n';
        step.commands.forEach(cmd => {
          yaml += `        ${cmd}\n`;
        });
      }
      
      yaml += '\n';
    });
    
    return yaml;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">GitHub Actions Workflow Builder</h2>
        <p className="text-gray-300">Créez et visualisez vos workflows CI/CD pour GitHub</p>
      </motion.div>

      {/* Controls */}
      <Card>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={workflow.name}
              onChange={(e) => setWorkflow({...workflow, name: e.target.value})}
              placeholder="Nom du workflow"
              className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="secondary"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? 'Éditeur' : 'Aperçu YAML'}
            </Button>
            <Button>
              <Play className="h-4 w-4 mr-2" />
              Valider Workflow
            </Button>
          </div>
        </div>
      </Card>

      {previewMode ? (
        <Card header={<h3 className="font-semibold text-white">Aperçu du fichier YAML</h3>}>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-white whitespace-pre overflow-x-auto">
            {generateYaml()}
          </div>
          
          <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-white mb-1">À propos des GitHub Actions</h4>
                <p className="text-sm text-gray-300">
                  Ce YAML définit un workflow GitHub Actions qui s'exécutera automatiquement 
                  selon les déclencheurs configurés. Placez ce fichier dans le répertoire 
                  <code className="text-blue-300 mx-1">.github/workflows/</code> 
                  de votre dépôt pour l'activer.
                </p>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left panel: Available steps + Triggers */}
          <div className="space-y-6">
            <Card header={<h3 className="font-semibold text-white">Types d'étapes</h3>}>
              <div className="space-y-2">
                {availableStepTypes.map(stepType => {
                  const Icon = stepType.icon;
                  return (
                    <button
                      key={stepType.type}
                      onClick={() => addStep(stepType.type)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-600 hover:bg-gray-700/30 transition-colors`}
                    >
                      <Icon className={`h-5 w-5 text-${stepType.color}-400`} />
                      <span className="text-white">{stepType.label}</span>
                      <Plus className="h-4 w-4 text-gray-400 ml-auto" />
                    </button>
                  );
                })}
              </div>
            </Card>

            <Card header={<h3 className="font-semibold text-white">Déclencheurs (Triggers)</h3>}>
              <div className="space-y-2">
                {['push', 'pull_request', 'workflow_dispatch', 'schedule', 'release'].map(trigger => (
                  <div key={trigger} className="flex items-center space-x-3 p-2">
                    <input
                      type="checkbox"
                      id={`trigger-${trigger}`}
                      checked={workflow.triggers.includes(trigger)}
                      onChange={() => toggleTrigger(trigger)}
                      className="bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`trigger-${trigger}`} className="text-gray-300">
                      {trigger}
                    </label>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Middle panel: Workflow diagram */}
          <div className="lg:col-span-2">
            <Card header={<h3 className="font-semibold text-white">Workflow</h3>}>
              <div className="min-h-[400px] relative">
                {workflow.steps.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-400">
                      <Workflow className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Ajoutez des étapes à votre workflow</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-12 relative py-4">
                    {/* Vertical connector line */}
                    <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gray-600"></div>
                    
                    {workflow.steps.map((step, index) => {
                      const Icon = getStepIcon(step.type);
                      const color = getStepTypeColor(step.type);
                      const isSelected = selectedStep === step.id;
                      
                      return (
                        <div key={step.id} className="relative">
                          {/* Step block with connector */}
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-start space-x-4 ${
                              isSelected ? `bg-${color}-900/20 border border-${color}-500/30 rounded-lg p-4` : ''
                            }`}
                          >
                            {/* Step circle */}
                            <div 
                              className={`relative z-10 w-12 h-12 bg-${color}-600 rounded-full flex items-center justify-center border-4 border-gray-900`}
                            >
                              <Icon className="h-5 w-5 text-white" />
                            </div>

                            {/* Step details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-medium text-white">{step.name}</h4>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge variant="default" size="sm">
                                      {step.type}
                                    </Badge>
                                    {step.condition && (
                                      <Badge variant="warning" size="sm">
                                        Conditionnel
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => setSelectedStep(isSelected ? null : step.id)}
                                  >
                                    {isSelected ? 'Fermer' : 'Éditer'}
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => removeStep(step.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              {/* Commands preview */}
                              {!isSelected && step.commands.length > 0 && (
                                <div className="mt-2 bg-gray-800/50 rounded p-2 max-w-full overflow-hidden">
                                  <div className="text-xs font-mono text-gray-300 truncate">
                                    $ {step.commands[0]}{step.commands.length > 1 ? ' ...' : ''}
                                  </div>
                                </div>
                              )}
                              
                              {/* Edit form when selected */}
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="mt-4 space-y-4"
                                >
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                      Nom de l'étape
                                    </label>
                                    <input
                                      type="text"
                                      value={step.name}
                                      onChange={(e) => updateStepName(step.id, e.target.value)}
                                      className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                      Commandes (une par ligne)
                                    </label>
                                    <textarea
                                      value={step.commands.join('\n')}
                                      onChange={(e) => updateStepCommands(step.id, e.target.value)}
                                      rows={3}
                                      className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm resize-none"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                      Condition (optionnelle)
                                    </label>
                                    <input
                                      type="text"
                                      value={step.condition || ''}
                                      onChange={(e) => updateStepCondition(step.id, e.target.value)}
                                      placeholder="ex: github.ref == 'refs/heads/main'"
                                      className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm"
                                    />
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                          
                          {/* Connector to next step */}
                          {index < workflow.steps.length - 1 && (
                            <div className="absolute left-6 -bottom-6 flex justify-center">
                              <ArrowDown className="h-5 w-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Documentation */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">À propos de GitHub Actions</h3>
          <p className="text-gray-300">
            GitHub Actions est un service d'intégration et de déploiement continu (CI/CD) intégré à GitHub.
            Il vous permet d'automatiser vos workflows de build, test et déploiement directement depuis votre dépôt.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">CI/CD Automatisé</h4>
              <p className="text-sm text-gray-300">
                Automatisez vos processus de développement pour gagner du temps et réduire les erreurs humaines.
              </p>
            </div>
            
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <h4 className="font-medium text-green-400 mb-2">Intégration Native</h4>
              <p className="text-sm text-gray-300">
                S'intègre directement avec GitHub sans outils externes ou configurations complexes.
              </p>
            </div>
            
            <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
              <h4 className="font-medium text-purple-400 mb-2">Runners Multiples</h4>
              <p className="text-sm text-gray-300">
                Exécutez vos workflows sur différents systèmes d'exploitation et architectures.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ActionsWorkflowBuilder;