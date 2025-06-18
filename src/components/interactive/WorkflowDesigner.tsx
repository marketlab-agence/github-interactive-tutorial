import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Plus, Trash2, ArrowRight, Save, Play } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';

interface WorkflowStep {
  id: string;
  type: 'branch' | 'commit' | 'merge' | 'deploy';
  title: string;
  description: string;
  branch?: string;
}

const WorkflowDesigner: React.FC = () => {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: '1',
      type: 'branch',
      title: 'Créer une Branche Feature',
      description: 'Créer une nouvelle branche depuis main',
      branch: 'feature/nouvelle-fonctionnalite'
    },
    {
      id: '2',
      type: 'commit',
      title: 'Effectuer des Modifications',
      description: 'Implémenter la fonctionnalité et commiter les changements'
    },
    {
      id: '3',
      type: 'merge',
      title: 'Fusionner vers Main',
      description: 'Créer une PR et fusionner vers la branche main'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<WorkflowStep | null>(null);

  const stepTypes = [
    { type: 'branch', label: 'Créer Branche', icon: GitBranch, color: 'blue' },
    { type: 'commit', label: 'Commiter Changements', icon: Save, color: 'green' },
    { type: 'merge', label: 'Fusionner Branche', icon: ArrowRight, color: 'purple' },
    { type: 'deploy', label: 'Déployer', icon: Play, color: 'orange' }
  ];

  const addStep = (type: string) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type: type as WorkflowStep['type'],
      title: `Nouvelle étape ${type}`,
      description: `Description pour l'étape ${type}`
    };
    setSteps([...steps, newStep]);
  };

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId));
  };

  const editStep = (step: WorkflowStep) => {
    setEditingStep(step);
    setIsModalOpen(true);
  };

  const saveStep = (updatedStep: WorkflowStep) => {
    setSteps(steps.map(step => 
      step.id === updatedStep.id ? updatedStep : step
    ));
    setIsModalOpen(false);
    setEditingStep(null);
  };

  const getStepColor = (type: string) => {
    const stepType = stepTypes.find(st => st.type === type);
    return stepType?.color || 'gray';
  };

  const getStepIcon = (type: string) => {
    const stepType = stepTypes.find(st => st.type === type);
    return stepType?.icon || GitBranch;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Concepteur de Workflow Git</h2>
        <p className="text-gray-300">Concevez et visualisez votre workflow Git</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Types d'Étapes */}
        <Card
          header={
            <h3 className="font-semibold text-white">Types d'Étapes</h3>
          }
        >
          <div className="space-y-2">
            {stepTypes.map((stepType) => {
              const Icon = stepType.icon;
              return (
                <button
                  key={stepType.type}
                  onClick={() => addStep(stepType.type)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-600 hover:bg-gray-700/30 transition-colors"
                >
                  <Icon className={`h-5 w-5 text-${stepType.color}-400`} />
                  <span className="text-white text-sm">{stepType.label}</span>
                  <Plus className="h-4 w-4 text-gray-400 ml-auto" />
                </button>
              );
            })}
          </div>
        </Card>

        {/* Canevas de Workflow */}
        <div className="lg:col-span-3">
          <Card
            header={
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Étapes du Workflow</h3>
                <div className="flex space-x-2">
                  <Button size="sm" variant="secondary">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Simuler
                  </Button>
                </div>
              </div>
            }
          >
            <div className="space-y-4">
              <AnimatePresence>
                {steps.map((step, index) => {
                  const Icon = getStepIcon(step.type);
                  const color = getStepColor(step.type);
                  
                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative"
                    >
                      <div className={`bg-${color}-900/20 border border-${color}-500/30 rounded-lg p-4`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`w-10 h-10 bg-${color}-600 rounded-full flex items-center justify-center`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{step.title}</h4>
                              <p className="text-sm text-gray-300 mt-1">{step.description}</p>
                              {step.branch && (
                                <span className="inline-block mt-2 px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                                  {step.branch}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => editStep(step)}
                            >
                              Modifier
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
                      </div>

                      {/* Flèche vers l'étape suivante */}
                      {index < steps.length - 1 && (
                        <div className="flex justify-center my-2">
                          <ArrowRight className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {steps.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                  <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune étape dans votre workflow pour le moment.</p>
                  <p className="text-sm">Ajoutez des étapes depuis le panneau de gauche pour commencer.</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal de Modification d'Étape */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modifier l'Étape du Workflow"
      >
        {editingStep && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titre
              </label>
              <input
                type="text"
                value={editingStep.title}
                onChange={(e) => setEditingStep({...editingStep, title: e.target.value})}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={editingStep.description}
                onChange={(e) => setEditingStep({...editingStep, description: e.target.value})}
                rows={3}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            {editingStep.type === 'branch' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom de la Branche
                </label>
                <input
                  type="text"
                  value={editingStep.branch || ''}
                  onChange={(e) => setEditingStep({...editingStep, branch: e.target.value})}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => saveStep(editingStep)}>
                Sauvegarder les Modifications
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WorkflowDesigner;