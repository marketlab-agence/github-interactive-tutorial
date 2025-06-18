import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Calendar, GitCommit } from 'lucide-react';
import Card from '../ui/Card';
import Tabs from '../ui/Tabs';

interface ChartData {
  label: string;
  value: number;
  color: string;
}

const StatisticsChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const commitData: ChartData[] = [
    { label: 'Lun', value: 12, color: '#3b82f6' },
    { label: 'Mar', value: 8, color: '#3b82f6' },
    { label: 'Mer', value: 15, color: '#3b82f6' },
    { label: 'Jeu', value: 6, color: '#3b82f6' },
    { label: 'Ven', value: 20, color: '#3b82f6' },
    { label: 'Sam', value: 3, color: '#3b82f6' },
    { label: 'Dim', value: 1, color: '#3b82f6' }
  ];

  const languageData: ChartData[] = [
    { label: 'TypeScript', value: 45, color: '#3178c6' },
    { label: 'JavaScript', value: 30, color: '#f7df1e' },
    { label: 'CSS', value: 15, color: '#1572b6' },
    { label: 'HTML', value: 10, color: '#e34f26' }
  ];

  const contributorData: ChartData[] = [
    { label: 'Alice', value: 156, color: '#10b981' },
    { label: 'Bob', value: 89, color: '#3b82f6' },
    { label: 'Claire', value: 67, color: '#8b5cf6' },
    { label: 'David', value: 34, color: '#f59e0b' }
  ];

  const renderBarChart = (data: ChartData[], title: string) => {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium text-white">{title}</h4>
        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-16 text-sm text-gray-300">{item.label}</div>
              <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / maxValue) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <div className="w-12 text-sm text-gray-400 text-right">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderPieChart = (data: ChartData[], title: string) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;
    
    return (
      <div className="space-y-4">
        <h4 className="font-medium text-white">{title}</h4>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <svg width="120" height="120" viewBox="0 0 120 120">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const angle = (item.value / total) * 360;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                
                const x1 = 60 + 50 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 60 + 50 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 60 + 50 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 60 + 50 * Math.sin((endAngle - 90) * Math.PI / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                
                const pathData = [
                  `M 60 60`,
                  `L ${x1} ${y1}`,
                  `A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ');
                
                currentAngle += angle;
                
                return (
                  <motion.path
                    key={item.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    d={pathData}
                    fill={item.color}
                    stroke="#1f2937"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>
          <div className="space-y-2">
            {data.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="text-sm text-gray-400">
                  ({Math.round((item.value / total) * 100)}%)
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    {
      id: 'commits',
      label: 'Commits',
      icon: GitCommit,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Activité des Commits</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="year">Cette année</option>
            </select>
          </div>
          
          {renderBarChart(commitData, 'Commits par jour')}
          
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-700/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">65</div>
              <div className="text-sm text-gray-400">Total cette semaine</div>
            </div>
            <div className="bg-gray-700/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-400">9.3</div>
              <div className="text-sm text-gray-400">Moyenne par jour</div>
            </div>
            <div className="bg-gray-700/30 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">+15%</div>
              <div className="text-sm text-gray-400">vs semaine dernière</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'languages',
      label: 'Langages',
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Répartition des Langages</h3>
          {renderPieChart(languageData, 'Langages utilisés')}
          
          <div className="mt-6">
            <h4 className="font-medium text-white mb-4">Détails par langage</h4>
            <div className="space-y-3">
              {languageData.map((lang, index) => (
                <motion.div
                  key={lang.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-white">{lang.label}</span>
                  </div>
                  <span className="text-gray-400">{lang.value}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contributors',
      label: 'Contributeurs',
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white">Contributions par Développeur</h3>
          {renderBarChart(contributorData, 'Commits par contributeur')}
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-3">Top Contributeur</h4>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <div className="text-white font-medium">Alice</div>
                  <div className="text-sm text-gray-400">156 commits</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700/30 p-4 rounded-lg">
              <h4 className="font-medium text-white mb-3">Croissance</h4>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-green-400 font-medium">+23%</span>
                <span className="text-gray-400 text-sm">ce mois</span>
              </div>
            </div>
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
        <h2 className="text-2xl font-bold text-white mb-2">Statistiques Git</h2>
        <p className="text-gray-300">Analysez l'activité et les tendances de votre projet</p>
      </motion.div>

      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};

export default StatisticsChart;