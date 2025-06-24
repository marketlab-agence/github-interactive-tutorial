import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Upload, Download, RefreshCw, GitBranch } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface FlowStep {
  id: string;
  type: 'local' | 'staging' | 'remote';
  label: string;
  icon: React.ComponentType<any>;
  position: { x: number; y: number };
}

interface FlowAnimation {
  id: string;
  from: string;
  to: string;
  type: 'push' | 'pull' | 'fetch' | 'commit';
  color: string;
}

const AnimatedFlow: React.FC = () => {
  const [activeFlow, setActiveFlow] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps: FlowStep[] = [
    {
      id: 'working',
      type: 'local',
      label: 'Répertoire de travail',
      icon: GitBranch,
      position: { x: 50, y: 200 }
    },
    {
      id: 'staging',
      type: 'staging',
      label: 'Zone de staging',
      icon: Upload,
      position: { x: 200, y: 200 }
    },
    {
      id: 'local-repo',
      type: 'local',
      label: 'Dépôt local',
      icon: RefreshCw,
      position: { x: 350, y: 200 }
    },
    {
      id: 'remote-repo',
      type: 'remote',
      label: 'Dépôt distant',
      icon: Download,
      position: { x: 500, y: 200 }
    }
  ];

  const flows: FlowAnimation[] = [
    {
      id: 'add',
      from: 'working',
      to: 'staging',
      type: 'commit',
      color: '#10b981'
    },
    {
      id: 'commit',
      from: 'staging',
      to: 'local-repo',
      type: 'commit',
      color: '#3b82f6'
    },
    {
      id: 'push',
      from: 'local-repo',
      to: 'remote-repo',
      type: 'push',
      color: '#8b5cf6'
    },
    {
      id: 'pull',
      from: 'remote-repo',
      to: 'local-repo',
      type: 'pull',
      color: '#f59e0b'
    },
    {
      id: 'fetch',
      from: 'remote-repo',
      to: 'local-repo',
      type: 'fetch',
      color: '#ef4444'
    }
  ];

  const animateFlow = (flowId: string) => {
    setActiveFlow(flowId);
    setIsAnimating(true);
    
    setTimeout(() => {
      setIsAnimating(false);
      setActiveFlow(null);
    }, 2000);
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'local': return 'bg-blue-600';
      case 'staging': return 'bg-yellow-600';
      case 'remote': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getFlowCommand = (type: string) => {
    switch (type) {
      case 'commit': return 'git add / git commit';
      case 'push': return 'git push';
      case 'pull': return 'git pull';
      case 'fetch': return 'git fetch';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Flux Git Animés</h2>
        <p className="text-gray-300">Visualisez les opérations Git en temps réel</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Flow Controls */}
        <Card
          header={
            <h3 className="font-semibold text-white">Opérations Git</h3>
          }
        >
          <div className="space-y-3">
            <Button
              className="w-full justify-start"
              onClick={() => animateFlow('add')}
              disabled={isAnimating}
            >
              <Upload className="h-4 w-4 mr-2" />
              git add
            </Button>
            <Button
              className="w-full justify-start"
              onClick={() => animateFlow('commit')}
              disabled={isAnimating}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              git commit
            </Button>
            <Button
              className="w-full justify-start"
              onClick={() => animateFlow('push')}
              disabled={isAnimating}
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              git push
            </Button>
            <Button
              className="w-full justify-start"
              variant="secondary"
              onClick={() => animateFlow('pull')}
              disabled={isAnimating}
            >
              <Download className="h-4 w-4 mr-2" />
              git pull
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => animateFlow('fetch')}
              disabled={isAnimating}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              git fetch
            </Button>
          </div>
        </Card>

        {/* Flow Visualization */}
        <div className="lg:col-span-2">
          <Card>
            <div className="relative h-80 bg-gray-900/50 rounded-lg overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 600 300">
                {/* Flow Lines */}
                <g>
                  {flows.map(flow => {
                    const fromStep = steps.find(s => s.id === flow.from);
                    const toStep = steps.find(s => s.id === flow.to);
                    if (!fromStep || !toStep) return null;
                    
                    return (
                      <line
                        key={flow.id}
                        x1={fromStep.position.x + 30}
                        y1={fromStep.position.y}
                        x2={toStep.position.x - 30}
                        y2={toStep.position.y}
                        stroke="#374151"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    );
                  })}
                </g>

                {/* Animated Flow */}
                <AnimatePresence>
                  {activeFlow && (() => {
                    const flow = flows.find(f => f.id === activeFlow);
                    const fromStep = steps.find(s => s.id === flow?.from);
                    const toStep = steps.find(s => s.id === flow?.to);
                    if (!flow || !fromStep || !toStep) return null;
                    
                    return (
                      <motion.circle
                        key={`flow-${activeFlow}`}
                        initial={{ 
                          cx: fromStep.position.x + 30,
                          cy: fromStep.position.y,
                          r: 0
                        }}
                        animate={{ 
                          cx: toStep.position.x - 30,
                          cy: toStep.position.y,
                          r: 8
                        }}
                        exit={{ r: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        fill={flow.color}
                        className="drop-shadow-lg"
                      />
                    );
                  })()}
                </AnimatePresence>

                {/* Steps */}
                <g>
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = activeFlow && (
                      flows.find(f => f.id === activeFlow)?.from === step.id ||
                      flows.find(f => f.id === activeFlow)?.to === step.id
                    );
                    
                    return (
                      <motion.g
                        key={step.id}
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: isActive ? 1.1 : 1,
                          opacity: isActive ? 1 : 0.8
                        }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <circle
                          cx={step.position.x}
                          cy={step.position.y}
                          r="25"
                          className={`${getStepColor(step.type)} transition-all`}
                          stroke={isActive ? "#ffffff" : "#6b7280"}
                          strokeWidth={isActive ? "3" : "2"}
                        />
                        <foreignObject
                          x={step.position.x - 8}
                          y={step.position.y - 8}
                          width="16"
                          height="16"
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </foreignObject>
                        <text
                          x={step.position.x}
                          y={step.position.y + 45}
                          textAnchor="middle"
                          className="fill-white text-xs font-medium"
                        >
                          {step.label}
                        </text>
                      </motion.g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </Card>
        </div>
      </div>

      {/* Flow Information */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Informations sur les Flux</h3>
          
          {activeFlow ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-blue-300 font-medium">
                  Exécution: {getFlowCommand(flows.find(f => f.id === activeFlow)?.type || '')}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full mx-auto mb-2" />
                <div className="text-sm text-gray-300">Local</div>
              </div>
              <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                <div className="w-6 h-6 bg-yellow-600 rounded-full mx-auto mb-2" />
                <div className="text-sm text-gray-300">Staging</div>
              </div>
              <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                <div className="w-6 h-6 bg-green-600 rounded-full mx-auto mb-2" />
                <div className="text-sm text-gray-300">Distant</div>
              </div>
              <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                <ArrowRight className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-gray-300">Flux</div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AnimatedFlow;