import React, { useState } from 'react';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, GitMerge, Maximize2 } from 'lucide-react';
import * as d3 from 'd3';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface GitNode {
  id: string;
  type: 'commit' | 'merge' | 'branch';
  message: string;
  branch: string;
  x: number;
  y: number;
  parents: string[];
  color: string;
}

interface GitGraphProps {
  nodes?: GitNode[];
  className?: string;
}

const GitGraph: React.FC<GitGraphProps> = ({
  nodes = [
    { id: 'c1', type: 'commit', message: 'Commit initial', branch: 'main', x: 100, y: 100, parents: [], color: '#3b82f6' },
    { id: 'c2', type: 'commit', message: 'Ajouter README', branch: 'main', x: 200, y: 100, parents: ['c1'], color: '#3b82f6' },
    { id: 'c3', type: 'branch', message: 'Créer branche feature', branch: 'feature', x: 300, y: 150, parents: ['c2'], color: '#10b981' },
    { id: 'c4', type: 'commit', message: 'Nouvelle fonctionnalité', branch: 'feature', x: 400, y: 150, parents: ['c3'], color: '#10b981' },
    { id: 'c5', type: 'merge', message: 'Fusionner feature', branch: 'main', x: 500, y: 100, parents: ['c2', 'c4'], color: '#8b5cf6' }
  ],
  className
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Get the currently selected node object
  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'commit': return GitCommit;
      case 'merge': return GitMerge;
      case 'branch': return GitBranch;
      default: return GitCommit;
    }
  };

  // D3.js integration
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    // Clear any existing elements
    svg.selectAll("*").remove();
    
    const g = svg.append("g"); // Group to hold all our elements
    
    // Set up the D3 visualization
    const width = 600;
    const height = 300;
    
    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([0.5, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    
    svg.call(zoom);
    
    // Create connections using D3
    const connections = nodes.flatMap(node => 
      node.parents.map(parentId => {
        const parent = nodes.find(n => n.id === parentId);
        return parent ? { source: parent, target: node } : null;
      }).filter(Boolean)
    );
    
    // Draw connections
    g.selectAll(".connection")
      .data(connections)
      .enter()
      .append("path")
      .attr("class", "connection")
      .attr("stroke", "#6b7280")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("opacity", 0.6)
      .attr("d", (d: any) => {
        const sourceX = d.source.x;
        const sourceY = d.source.y;
        const targetX = d.target.x;
        const targetY = d.target.y;
        
        // Use curved paths for connections that aren't straight horizontal
        if (Math.abs(targetY - sourceY) > 10) {
          const midX = (sourceX + targetX) / 2;
          return `M ${sourceX} ${sourceY} C ${midX} ${sourceY}, ${midX} ${targetY}, ${targetX} ${targetY}`;
        }
        
        // Use straight lines for horizontal connections
        return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
      });
    
    // Draw nodes
    const nodeGroups = g.selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .style("cursor", "pointer")
      .on("click", function(event, d) {
        event.stopPropagation();
        setSelectedNodeId(prev => prev === d.id ? null : d.id);
      });
    
    // Add circles for nodes
    nodeGroups.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 20)
      .attr("fill", d => d.color)
      .attr("stroke", d => d.id === selectedNodeId ? "#ffffff" : "#1f2937")
      .attr("stroke-width", d => d.id === selectedNodeId ? 3 : 2)
      .attr("class", "node-circle")
      .style("transition", "all 0.3s ease");
    
    // Add text labels
    nodeGroups.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("dy", 30)
      .attr("text-anchor", "middle")
      .attr("class", "fill-white text-xs font-medium")
      .text(d => d.message.split(' ')[0]);
    
    // Add icon markers
    nodeGroups.each(function(d) {
      // We can't directly add React components to D3, so we'll add simple text or SVG paths
      const group = d3.select(this);
      if (d.type === 'commit') {
        group.append("text")
          .attr("y", 5)
          .attr("x", 0)
          .attr("text-anchor", "middle")
          .attr("class", "fill-white text-xs")
          .text("C");
      } else if (d.type === 'merge') {
        group.append("text")
          .attr("y", 5)
          .attr("x", 0)
          .attr("text-anchor", "middle")
          .attr("class", "fill-white text-xs")
          .text("M");
      } else {
        group.append("text")
          .attr("y", 5)
          .attr("x", 0)
          .attr("text-anchor", "middle")
          .attr("class", "fill-white text-xs")
          .text("B");
      }
    });
    
    // Add hover effects
    nodeGroups.on("mouseenter", function() {
      d3.select(this).select("circle")
        .attr("r", 22)
        .attr("stroke-width", 3);
    }).on("mouseleave", function(event, d) {
      d3.select(this).select("circle")
        .attr("r", 20)
        .attr("stroke-width", d.id === selectedNodeId ? 3 : 2);
    });
  }, [nodes, selectedNodeId]);

  return (
    <div className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <GitBranch className="h-6 w-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Graphique Git Interactif</h3>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      <div className={`relative bg-gray-900/50 rounded-lg overflow-hidden ${
        isExpanded ? 'h-96' : 'h-64'
      }`}>
        <svg 
          ref={svgRef}
          width="100%" 
          height="100%" 
          viewBox="0 0 600 300" 
          className="absolute inset-0"
        />

        {/* Node Details Overlay */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 border border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-white">{selectedNode.message}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                  <span>Branche: {selectedNode.branch}</span>
                  <span>Type: {selectedNode.type}</span>
                  <span>ID: {selectedNode.id}</span>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedNodeId(null)}
              >
                ×
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-gray-300">Commits</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-gray-300">Branches</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span className="text-gray-300">Fusions</span>
        </div>
      </div>

      {/* Explanation of D3.js Integration */}
      {!selectedNode && (
        <Card className="mt-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">D3.js Integration</h3>
            <p className="text-gray-300 text-sm">
              Cette visualisation utilise D3.js pour le rendu des noeuds et des connexions. 
              D3.js est responsable de dessiner le graphique dans l'élément SVG, tandis que React gère 
              l'état du composant et les contrôles d'interface utilisateur.
            </p>
            <p className="text-gray-300 text-sm">
              Caractéristiques de D3.js dans cet exemple :
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
              <li>Rendu de noeuds et connexions basé sur les données</li>
              <li>Chemins courbes pour les connexions non-horizontales</li>
              <li>Zoom et panoramique de la visualisation</li>
              <li>Interactions de survol et de clic</li>
              <li>Gestion efficace des transitions et animations</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default GitGraph;