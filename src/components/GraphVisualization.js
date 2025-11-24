import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { firstFitColoring } from '../algorithms/firstFit';
import { CBIPColoring } from '../algorithms/CBIP';
import { greedyColoring } from '../algorithms/greedy';
import { welshPowellColoring } from '../algorithms/welshPowell';

const GraphVisualization = ({
  vertices,
  edges,
  algorithm,
  currentIndex,
  isPlaying,
  speed,
  theme,
  onColorUpdate,
  onConflictsUpdate,
  onStepComplete,
}) => {
  const svgRef = useRef();
  const simulationRef = useRef(null);
  const [nodeColors, setNodeColors] = useState({});
  const [highlightedNode, setHighlightedNode] = useState(null);

  // Calculate node colors based on algorithm
  const calculateColors = useCallback(() => {
    if (currentIndex === 0) {
      setNodeColors({});
      if (onColorUpdate) onColorUpdate(0);
      if (onConflictsUpdate) onConflictsUpdate(0);
      return {};
    }

    // Use the appropriate algorithm function
    let result;
    switch (algorithm) {
      case 'firstfit':
        result = firstFitColoring(vertices, edges, currentIndex);
        break;
      case 'CBIP':
        result = CBIPColoring(vertices, edges, currentIndex);
        break;
      case 'greedy':
        result = greedyColoring(vertices, edges, currentIndex);
        break;
      case 'welshpowell':
        result = welshPowellColoring(vertices, edges, currentIndex);
        break;
      default:
        result = firstFitColoring(vertices, edges, currentIndex);
    }

    const { nodeColors: colors, totalColors } = result;

    // Find the node being processed (last node in current index)
    const processingNode = currentIndex > 0 ? vertices[currentIndex - 1] : null;

    // Check for conflicts
    const nodes = vertices.slice(0, currentIndex).map(v => ({ id: v }));
    const links = edges.map(edge => {
      const sourceId = typeof edge.source === 'string' ? edge.source : edge.source.id;
      const targetId = typeof edge.target === 'string' ? edge.target : edge.target.id;
      return {
        source: nodes.find(n => n.id === sourceId),
        target: nodes.find(n => n.id === targetId),
      };
    }).filter(link => link.source && link.target);

    let conflictCount = 0;
    links.forEach(link => {
      if (colors[link.source.id] && colors[link.target.id] && 
          colors[link.source.id] === colors[link.target.id]) {
        conflictCount++;
      }
    });

    setNodeColors(colors);
    setHighlightedNode(processingNode);

    if (onColorUpdate) onColorUpdate(totalColors);
    if (onConflictsUpdate) onConflictsUpdate(conflictCount);
    if (onStepComplete && currentIndex === vertices.length) {
      onStepComplete();
    }

    return colors;
  }, [vertices, edges, algorithm, currentIndex, onColorUpdate, onConflictsUpdate, onStepComplete]);

  useEffect(() => {
    calculateColors();
  }, [calculateColors]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth || 800;
    const height = svgRef.current.clientHeight || 600;

    const nodes = vertices.slice(0, currentIndex).map(v => ({ id: v }));
    const links = edges.map(edge => {
      const sourceId = typeof edge.source === 'string' ? edge.source : edge.source.id;
      const targetId = typeof edge.target === 'string' ? edge.target : edge.target.id;
      const source = nodes.find(n => n.id === sourceId);
      const target = nodes.find(n => n.id === targetId);
      return source && target ? { source, target } : null;
    }).filter(Boolean);

    // Create container group
    const container = svg.append('g');

    // Draw links
    const link = container
      .selectAll('.link')
      .data(links)
      .join('line')
      .attr('class', 'link')
      .attr('stroke', theme.colors.border)
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6);

    // Draw nodes
    const node = container
      .selectAll('.node')
      .data(nodes)
      .join(
        enter => enter.append('g')
          .attr('class', 'node')
          .attr('opacity', 0)
          .call(enter => enter.transition().duration(300).attr('opacity', 1)),
        update => update,
        exit => exit.call(exit => exit.transition().duration(300).attr('opacity', 0)).remove()
      )
      .attr('class', 'node')
      .style('cursor', 'grab')
      .style('cursor', '-webkit-grab');

    // Add circles
    node.selectAll('circle').remove();
    node.append('circle')
      .attr('r', 30)
      .attr('fill', d => nodeColors[d.id] || theme.colors.nodeDefault)
      .attr('stroke', d => 
        highlightedNode === d.id 
          ? theme.colors.nodeHighlight 
          : theme.colors.border
      )
      .attr('stroke-width', d => highlightedNode === d.id ? 4 : 2)
      .attr('filter', d => highlightedNode === d.id ? 'url(#glow)' : null);

    // Add text labels
    node.selectAll('text').remove();
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', '16px')
      .attr('font-weight', '600')
      .attr('fill', theme.colors.text)
      .text(d => d.id);

    // Add glow filter for highlighted nodes
    const defs = svg.append('defs');
    const glowFilter = defs.append('filter').attr('id', 'glow');
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Force simulation
    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    // Calculate padding to keep nodes within bounds
    const padding = 50;
    const nodeRadius = 30;

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-600))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(nodeRadius + 5))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05))
      .alphaDecay(0.02) // Slower decay for smoother animation
      .velocityDecay(0.4); // Add friction to reduce jitter

    simulationRef.current = simulation;

    // Add boundary constraint function
    const constrainNode = (node) => {
      const r = nodeRadius;
      if (node.x < r + padding) {
        node.x = r + padding;
        node.vx = 0;
      } else if (node.x > width - r - padding) {
        node.x = width - r - padding;
        node.vx = 0;
      }
      if (node.y < r + padding) {
        node.y = r + padding;
        node.vy = 0;
      } else if (node.y > height - r - padding) {
        node.y = height - r - padding;
        node.vy = 0;
      }
    };

    // Add drag behavior
    const drag = d3.drag()
      .on('start', function(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        // Add visual feedback
        d3.select(this).raise().select('circle')
          .attr('stroke-width', 4)
          .attr('opacity', 0.8);
      })
      .on('drag', function(event, d) {
        // Constrain drag position to canvas bounds
        const r = nodeRadius;
        const constrainedX = Math.max(r + padding, Math.min(width - r - padding, event.x));
        const constrainedY = Math.max(r + padding, Math.min(height - r - padding, event.y));
        d.fx = constrainedX;
        d.fy = constrainedY;
      })
      .on('end', function(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        // Remove visual feedback
        const nodeElement = d3.select(this);
        nodeElement.select('circle')
          .attr('stroke-width', highlightedNode === d.id ? 4 : 2)
          .attr('opacity', 1);
        // Optionally unfix the node after drag ends
        // Uncomment the next two lines if you want nodes to continue moving after drag
        // d.fx = null;
        // d.fy = null;
      });

    // Apply drag behavior to nodes
    node.call(drag);

    simulation.on('tick', () => {
      // Apply boundary constraints to all nodes
      nodes.forEach(constrainNode);

      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      if (simulationRef.current) {
        simulationRef.current.stop();
      }
    };
  }, [vertices, edges, currentIndex, nodeColors, highlightedNode, theme]);

  return (
    <svg
      ref={svgRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        background: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
      }}
    />
  );
};

export default GraphVisualization;

