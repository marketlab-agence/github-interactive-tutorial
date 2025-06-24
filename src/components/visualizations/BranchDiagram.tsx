import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitMerge, Circle } from 'lucide-react';
import * as d3 from 'd3';

interface Branch {
  name: string;
  commits: Array<{id: string, message: string}>;
  color: string;
  merged?: boolean;
  position?: number;
}

interface BranchDiagramProps {
  branches?: Branch[];
  className?: string;
}

const BranchDiagram: React.FC<BranchDiagramProps> = ({
  branches = [
    {
      name: 'main',
      commits: [
        {id: 'c1', message: 'Initial commit'},
        {id: 'c2', message: 'Add README'},
        {id: 'c5', message: 'Merge feature branch'}
      ],
       color: 'blue',
       position: 0
    },
    {
      name: 'feature/login',
      commits: [
        {id: 'c3', message: 'Add login form'},
        {id: 'c4', message: 'Add validation'}
      ],
      color: 'green',
       merged: true,
       position: 1
    }
  ],
  className
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  const colorMap = {
    blue: 'text-blue-400 border-blue-400',
    green: 'text-green-400 border-green-400',
    purple: 'text-purple-400 border-purple-400',
    orange: 'text-orange-400 border-orange-400'
  };
  
  // Intégration D3.js pour le diagramme de branches
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Nettoyer le SVG précédent
    d3.select(svgRef.current).selectAll("*").remove();
    
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = branches.length * 100;
    const margin = { top: 30, right: 50, bottom: 30, left: 50 };
    
    const branchSpacing = 70;
    const commitRadius = 15;
    const commitSpacing = 120;
    
    // Groupe principal
    const g = svg.append("g");
    
    // Ajout du zoom et pan
    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    
    svg.call(zoom);
    
    // Préparer les données pour D3
    const branchesWithPositions = branches.map((branch, index) => ({
      ...branch,
      position: branch.position !== undefined ? branch.position : index,
      y: margin.top + branchSpacing * (branch.position !== undefined ? branch.position : index)
    }));
    
    // Créer un mapping des commits pour tracer les lignes
    const commitMap = new Map();
    branchesWithPositions.forEach(branch => {
      branch.commits.forEach((commit, index) => {
        commitMap.set(commit.id, {
          x: margin.left + commitSpacing * (index + 1),
          y: branch.y,
          branch: branch.name,
          message: commit.message,
          color: branch.color
        });
      });
    });
    
    // Lignes horizontales pour les branches
    branchesWithPositions.forEach(branch => {
      const startX = margin.left;
      const endX = margin.left + commitSpacing * (branch.commits.length + 1);
      
      g.append("line")
        .attr("x1", startX)
        .attr("y1", branch.y)
        .attr("x2", endX)
        .attr("y2", branch.y)
        .attr("stroke", branch.color === 'blue' ? '#3B82F6' : 
                         branch.color === 'green' ? '#10B981' : 
                         branch.color === 'purple' ? '#8B5CF6' : '#F59E0B')
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", branch.merged ? "5,5" : "none");
    });
    
    // Noms des branches
    branchesWithPositions.forEach(branch => {
      g.append("text")
        .attr("x", margin.left - 10)
        .attr("y", branch.y)
        .attr("text-anchor", "end")
        .attr("alignment-baseline", "middle")
        .attr("fill", "#F9FAFB")
        .attr("font-weight", "500")
        .text(branch.name);
    });
    
    // Lignes de merge
    branchesWithPositions.forEach(branch => {
      if (branch.merged) {
        const lastCommit = branch.commits[branch.commits.length - 1];
        const sourceCommit = commitMap.get(lastCommit.id);
        
        // Trouver le commit de merge sur la branche principale
        const targetBranch = branchesWithPositions.find(b => b.name === 'main');
        if (targetBranch) {
          const mergeCommit = targetBranch.commits.find(c => c.message.includes('Merge'));
          if (mergeCommit) {
            const targetCommit = commitMap.get(mergeCommit.id);
            
            g.append("path")
              .attr("d", `M ${sourceCommit.x} ${sourceCommit.y} 
                          C ${(sourceCommit.x + targetCommit.x) / 2} ${sourceCommit.y},
                            ${(sourceCommit.x + targetCommit.x) / 2} ${targetCommit.y},
                            ${targetCommit.x} ${targetCommit.y}`)
              .attr("stroke", "#8B5CF6")
              .attr("stroke-width", 2)
              .attr("fill", "none")
              .attr("stroke-dasharray", "5,5");
            
            g.append("circle")
              .attr("cx", targetCommit.x)
              .attr("cy", targetCommit.y)
              .attr("r", commitRadius)
              .attr("fill", "#8B5CF6")
              .attr("stroke", "#1F2937")
              .attr("stroke-width", 2);
          }
        }
      }
    });
    
    // Commits
    branchesWithPositions.forEach(branch => {
      branch.commits.forEach((commit, index) => {
        const commitInfo = commitMap.get(commit.id);
        if (!commit.message.includes('Merge')) { // Éviter les doublons pour les commits de merge
          const commitGroup = g.append("g")
            .attr("transform", `translate(${commitInfo.x}, ${commitInfo.y})`)
            .attr("cursor", "pointer")
            .on("mouseenter", function() {
              d3.select(this).select("circle").transition().attr("r", commitRadius + 2);
              tooltip.transition().style("opacity", 1);
              tooltip.html(`<div class="bg-gray-800 p-2 rounded">
                            <div class="text-white font-medium">${commit.message}</div>
                            <div class="text-gray-400 text-xs">${commit.id}</div>
                            </div>`)
                .style("left", (d3.event?.pageX + 15) + "px")
                .style("top", (d3.event?.pageY - 28) + "px");
            })
            .on("mouseleave", function() {
              d3.select(this).select("circle").transition().attr("r", commitRadius);
              tooltip.transition().style("opacity", 0);
            });
          
          commitGroup.append("circle")
            .attr("r", commitRadius)
            .attr("fill", branch.color === 'blue' ? '#3B82F6' : 
                         branch.color === 'green' ? '#10B981' : 
                         branch.color === 'purple' ? '#8B5CF6' : '#F59E0B')
            .attr("stroke", "#1F2937")
            .attr("stroke-width", 2);
            
          commitGroup.append("text")
            .attr("y", commitRadius + 20)
            .attr("text-anchor", "middle")
            .attr("fill", "#D1D5DB")
            .attr("font-size", "12px")
            .text(commit.message.length > 15 ? commit.message.substring(0, 15) + "..." : commit.message);
        }
      });
    });
    
    // Tooltip pour les infobulles
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("z-index", 100);
    
    // Nettoyage
    return () => {
      tooltip.remove();
    };
  }, [branches]);

  return (
    <div className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <GitBranch className="h-6 w-6 text-green-400" />
        <h3 className="text-xl font-semibold text-white">Branch Diagram</h3>
      </div>

      {/* Visualisation D3.js */}
      <svg 
        ref={svgRef}
        width="100%" 
        height={branches.length * 100 + 60}
        className="overflow-visible"
      />
      
      {/* Version alternative pour l'accessibilité */}
      <div className="sr-only">
        <h4 className="font-medium text-white mb-4">Structure des branches</h4>
        <div className="space-y-6">
          {branches.map((branch, branchIndex) => (
          <motion.div
            key={branch.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: branchIndex * 0.3 }}
            className="relative"
          >
            {/* Branch Name */}
            <div className="flex items-center space-x-3 mb-4">
              <GitBranch className={`h-5 w-5 ${colorMap[branch.color as keyof typeof colorMap]?.split(' ')[0]}`} />
              <span className="font-medium text-white">{branch.name}</span>
              {branch.merged && (
                <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full">
                  Merged
                </span>
              )}
            </div>

            {/* Commits */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              {branch.commits.map((commit, commitIndex) => (
                <motion.div
                  key={commit.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: (branchIndex * 0.3) + (commitIndex * 0.1) }}
                  className="flex flex-col items-center space-y-2 min-w-0"
                >
                  {/* Commit Circle */}
                  <div className={`w-8 h-8 rounded-full border-2 ${colorMap[branch.color as keyof typeof colorMap]} bg-gray-900 flex items-center justify-center`}>
                    <Circle className="h-3 w-3 fill-current" />
                  </div>
                  
                  {/* Commit Message */}
                  <div className="text-xs text-gray-300 text-center max-w-24 truncate">
                    {commit.message}
                  </div>
                  
                  {/* Commit ID */}
                  <div className="text-xs text-gray-500 font-mono">
                    {commit.id}
                  </div>
                </motion.div>
              ))}
              
              {/* Merge Arrow */}
              {branch.merged && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (branchIndex * 0.3) + 0.5 }}
                  className="flex items-center"
                >
                  <GitMerge className="h-6 w-6 text-purple-400" />
                </motion.div>
              )}
            </div>

            {/* Connection Line */}
            {branchIndex < branches.length - 1 && (
              <div className="absolute left-6 -bottom-4 w-0.5 h-8 bg-gray-600"></div>
            )}
          </motion.div>
        ))}
        </div>
      </div>
      
      {/* Légende */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-gray-300">Branche principale</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-gray-300">Branche de fonctionnalité</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
          <span className="text-gray-300">Commit de fusion</span>
        </div>
      </div>
    </div>
  );
};

export default BranchDiagram;