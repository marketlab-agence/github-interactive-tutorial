import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Cloud, HardDrive, Users, Shield, Zap } from 'lucide-react';
import Card from '../ui/Card';
import Tabs from '../ui/Tabs';

const GitVsGitHubComparison: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const gitFeatures = [
    {
      id: 'version-control',
      title: 'Contrôle de Version',
      description: 'Suivi des modifications de fichiers dans le temps',
      icon: GitBranch,
      details: 'Git permet de suivre chaque modification, de revenir en arrière et de gérer l\'historique complet de votre projet.'
    },
    {
      id: 'local-repos',
      title: 'Dépôts Locaux',
      description: 'Fonctionne entièrement en local sur votre machine',
      icon: HardDrive,
      details: 'Toutes les opérations Git sont rapides car elles s\'exécutent localement sans connexion internet.'
    },
    {
      id: 'branching',
      title: 'Système de Branches',
      description: 'Création et fusion de branches pour le développement parallèle',
      icon: GitBranch,
      details: 'Les branches permettent de travailler sur différentes fonctionnalités simultanément.'
    }
  ];

  const githubFeatures = [
    {
      id: 'hosting',
      title: 'Hébergement Cloud',
      description: 'Stockage de vos dépôts Git dans le cloud',
      icon: Cloud,
      details: 'GitHub héberge vos dépôts Git et les rend accessibles depuis n\'importe où.'
    },
    {
      id: 'collaboration',
      title: 'Outils de Collaboration',
      description: 'Pull Requests, Issues, et gestion d\'équipe',
      icon: Users,
      details: 'GitHub ajoute des outils pour faciliter le travail en équipe et la revue de code.'
    },
    {
      id: 'security',
      title: 'Sécurité et Permissions',
      description: 'Gestion des accès et sécurité avancée',
      icon: Shield,
      details: 'Contrôle fin des permissions et outils de sécurité pour protéger votre code.'
    }
  ];

  const comparisonData = [
    {
      aspect: 'Type',
      git: 'Logiciel de contrôle de version',
      github: 'Plateforme web d\'hébergement'
    },
    {
      aspect: 'Installation',
      git: 'Installé localement sur votre machine',
      github: 'Accessible via navigateur web'
    },
    {
      aspect: 'Fonctionnement',
      git: 'Ligne de commande et interfaces graphiques',
      github: 'Interface web + API'
    },
    {
      aspect: 'Stockage',
      git: 'Local (sur votre ordinateur)',
      github: 'Cloud (serveurs GitHub)'
    },
    {
      aspect: 'Collaboration',
      git: 'Partage de fichiers/dépôts',
      github: 'Outils intégrés (PR, Issues, etc.)'
    },
    {
      aspect: 'Coût',
      git: 'Gratuit et open source',
      github: 'Gratuit pour projets publics, payant pour privés'
    }
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Vue d\'ensemble',
      icon: Zap,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Git vs GitHub : Quelle est la différence ?</h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Git et GitHub sont souvent confondus, mais ils servent des rôles différents et complémentaires 
              dans le développement logiciel moderne.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Git Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center">
                <GitBranch className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Git</h4>
                <p className="text-gray-300">Le système de contrôle de version</p>
              </div>

              <Card className="bg-orange-900/20 border-orange-500/30">
                <div className="space-y-3">
                  {gitFeatures.map((feature, index) => (
                    <motion.button
                      key={feature.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedFeature(feature.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedFeature === feature.id
                          ? 'bg-orange-600/30 border border-orange-500/50'
                          : 'hover:bg-orange-800/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <feature.icon className="h-5 w-5 text-orange-400" />
                        <div>
                          <h5 className="font-medium text-white">{feature.title}</h5>
                          <p className="text-sm text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* GitHub Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center">
                <Cloud className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">GitHub</h4>
                <p className="text-gray-300">La plateforme de collaboration</p>
              </div>

              <Card className="bg-blue-900/20 border-blue-500/30">
                <div className="space-y-3">
                  {githubFeatures.map((feature, index) => (
                    <motion.button
                      key={feature.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      onClick={() => setSelectedFeature(feature.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedFeature === feature.id
                          ? 'bg-blue-600/30 border border-blue-500/50'
                          : 'hover:bg-blue-800/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <feature.icon className="h-5 w-5 text-blue-400" />
                        <div>
                          <h5 className="font-medium text-white">{feature.title}</h5>
                          <p className="text-sm text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Feature Details */}
          {selectedFeature && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
            >
              {(() => {
                const feature = [...gitFeatures, ...githubFeatures].find(f => f.id === selectedFeature);
                return feature ? (
                  <div className="text-center">
                    <feature.icon className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-gray-300">{feature.details}</p>
                  </div>
                ) : null;
              })()}
            </motion.div>
          )}
        </div>
      )
    },
    {
      id: 'comparison',
      label: 'Comparaison Détaillée',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white text-center">Comparaison Point par Point</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-gray-300 font-medium">Aspect</th>
                  <th className="text-left p-4 text-orange-400 font-medium">Git</th>
                  <th className="text-left p-4 text-blue-400 font-medium">GitHub</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-800 hover:bg-gray-800/30"
                  >
                    <td className="p-4 font-medium text-white">{row.aspect}</td>
                    <td className="p-4 text-gray-300">{row.git}</td>
                    <td className="p-4 text-gray-300">{row.github}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    },
    {
      id: 'workflow',
      label: 'Workflow Typique',
      content: (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white text-center">Comment Git et GitHub Travaillent Ensemble</h3>
          
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Développement Local avec Git',
                description: 'Vous utilisez Git localement pour suivre vos modifications',
                tool: 'Git',
                color: 'orange'
              },
              {
                step: 2,
                title: 'Sauvegarde sur GitHub',
                description: 'Vous poussez votre code vers un dépôt GitHub',
                tool: 'GitHub',
                color: 'blue'
              },
              {
                step: 3,
                title: 'Collaboration via GitHub',
                description: 'Votre équipe utilise les outils GitHub pour collaborer',
                tool: 'GitHub',
                color: 'blue'
              },
              {
                step: 4,
                title: 'Synchronisation avec Git',
                description: 'Vous récupérez les modifications des autres avec Git',
                tool: 'Git',
                color: 'orange'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-center space-x-4 p-4 rounded-lg bg-${item.color}-900/20 border border-${item.color}-500/30`}
              >
                <div className={`w-10 h-10 bg-${item.color}-600 rounded-full flex items-center justify-center text-white font-bold`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">{item.title}</h4>
                  <p className="text-sm text-gray-300">{item.description}</p>
                  <span className={`text-xs text-${item.color}-400 font-medium`}>Outil : {item.tool}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Git vs GitHub</h2>
        <p className="text-gray-300">Comprenez la différence entre ces deux outils essentiels</p>
      </motion.div>

      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default GitVsGitHubComparison;