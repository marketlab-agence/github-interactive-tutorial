import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, User, Calendar } from 'lucide-react';
import * as d3 from 'd3';

interface Commit {
  id: string;
  message: string;
  author: string;
  date: string;
  hash: string;
}

interface CommitTimelineProps {
  commits?: Commit[];
  className?: string;
}

const CommitTimeline: React.FC<CommitTimelineProps> = ({
  commits: initialCommits = [
    {
      id: '1',
      message: 'Initial commit',
      author: 'John Doe',
      date: '2024-01-15',
      hash: 'a1b2c3d'
    },
    {
      id: '2',
      message: 'Add navigation component',
      author: 'Jane Smith',
      date: '2024-01-16',
      hash: 'e4f5g6h'
    },
    {
      id: '3',
      message: 'Fix responsive layout',
      author: 'John Doe',
      date: '2024-01-17',
      hash: 'i7j8k9l'
    }
  ],
  className
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const commits = [...initialCommits].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Utiliser D3.js pour créer une visualisation interactive
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Nettoyer le SVG précédent
    d3.select(svgRef.current).selectAll("*").remove();
    
    const svg = d3.select(svgRef.current);
    const width = 600;
    const height = commits.length * 80;
    const margin = { top: 20, right: 30, bottom: 20, left: 70 };
    
    // Définir les échelles
    const timeScale = d3.scaleTime()
      .domain(d3.extent(commits, d => new Date(d.date)) as [Date, Date])
      .range([margin.top, height - margin.bottom]);
    
    // Créer l'axe du temps (vertical)
    const timeAxis = d3.axisLeft(timeScale)
      .ticks(commits.length)
      .tickFormat(d => d3.timeFormat("%d %b")(d as Date));
    
    svg.append("g")
      .attr("class", "time-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(timeAxis)
      .call(g => g.select(".domain").attr("stroke", "#4B5563"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#4B5563"))
      .call(g => g.selectAll(".tick text").attr("fill", "#9CA3AF"));
    
    // Ligne verticale principale
    svg.append("line")
      .attr("x1", margin.left)
      .attr("x2", margin.left)
      .attr("y1", margin.top)
      .attr("y2", height - margin.bottom)
      .attr("stroke", "#6B7280")
      .attr("stroke-width", 2);
    
    // Groupe pour les commits
    const commitGroup = svg.append("g")
      .selectAll("g.commit")
      .data(commits)
      .enter()
      .append("g")
      .attr("class", "commit")
      .attr("transform", d => `translate(0, ${timeScale(new Date(d.date))})`);
    
    // Cercles pour les commits
    commitGroup.append("circle")
      .attr("cx", margin.left)
      .attr("cy", 0)
      .attr("r", 8)
      .attr("fill", "#3B82F6")
      .attr("stroke", "#1F2937")
      .attr("stroke-width", 2);
    
    // Lignes reliant le commit aux détails
    commitGroup.append("line")
      .attr("x1", margin.left + 8)
      .attr("x2", margin.left + 30)
      .attr("y1", 0)
      .attr("y2", 0)
      .attr("stroke", "#6B7280")
      .attr("stroke-width", 1);
    
    // Cartes pour les détails des commits
    const commitCard = commitGroup.append("g")
      .attr("transform", `translate(${margin.left + 35}, -30)`)
      .attr("cursor", "pointer")
      .on("mouseenter", function() {
        d3.select(this).select("rect").transition().attr("fill", "#374151");
      })
      .on("mouseleave", function() {
        d3.select(this).select("rect").transition().attr("fill", "#1F2937");
      });
    
    commitCard.append("rect")
      .attr("width", 260)
      .attr("height", 60)
      .attr("fill", "#1F2937")
      .attr("stroke", "#374151")
      .attr("rx", 6);
    
    commitCard.append("text")
      .attr("x", 10)
      .attr("y", 20)
      .attr("fill", "#F9FAFB")
      .attr("font-weight", "500")
      .text(d => d.message);
    
    commitCard.append("text")
      .attr("x", 10)
      .attr("y", 40)
      .attr("fill", "#9CA3AF")
      .attr("font-size", "12")
      .text(d => `${d.author} · ${d.hash}`);
      
    // Ajout d'animations à l'entrée
    commitGroup
      .attr("opacity", 0)
      .attr("transform", d => `translate(-20, ${timeScale(new Date(d.date))})`)
      .transition()
      .delay((d, i) => i * 100)
      .duration(500)
      .attr("opacity", 1)
      .attr("transform", d => `translate(0, ${timeScale(new Date(d.date))})`);
      
  }, [commits]);
  return (
    <div className={`bg-gray-800/50 rounded-xl p-6 border border-gray-700 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <GitCommit className="h-6 w-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Commit Timeline</h3>
      </div>

      {/* Visualisation D3.js */}
      <svg 
        ref={svgRef} 
        width="100%" 
        height={commits.length * 80 + 40} 
        className="overflow-visible"
      />

      {/* Afficher la liste des commits en fallback ou pour l'accessibilité */}
      <div className="sr-only">
        <h4 className="font-medium text-white mb-4">Liste des commits</h4>
        <div className="space-y-3">
          {commits.map((commit, index) => (
            <div key={commit.id} className="p-3 bg-gray-800/50 rounded-lg">
              <div className="font-medium text-white">{commit.message}</div>
              <div className="text-sm text-gray-400">
                {commit.author} · {commit.date} · {commit.hash}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Légende */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-gray-300">Commit</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-0.5 w-8 bg-gray-600"></div>
          <span className="text-gray-300">Timeline</span>
        </div>
      </div>
    </div>
  );
};

export default CommitTimeline;