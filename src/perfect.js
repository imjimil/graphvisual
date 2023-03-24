import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const App = () => {
  const svgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [currentIndex, setCurrentIndex] = useState(0);

  const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const edges = [
    { source: 'A', target: 'B' },
    { source: 'A', target: 'C' },
    { source: 'B', target: 'D' },
    { source: 'B', target: 'E' },
    { source: 'C', target: 'F' },
    { source: 'C', target: 'G' },
    { source: 'E', target: 'H' },
    { source: 'F', target: 'H' },
    { source: 'G', target: 'H' },
  ];

  useEffect(() => {
    // create nodes array from vertices
    const nodes = vertices.map(vertex => ({ id: vertex }));

    // create links array from edges
    const links = edges.map(edge => ({
      source: nodes.find(node => node.id === edge.source),
      target: nodes.find(node => node.id === edge.target),
    }));

    // set graphData state
    setGraphData({ nodes, links });
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
  
    const node = svg
      .selectAll('.node')
      .data(graphData.nodes.slice(0, currentIndex))
      .join('g')
      .attr('class', 'node');
  
    node.append('circle')
      .attr('r', 20)
      .attr('fill', 'lightblue')
      .attr('stroke', 'black');
  
    node.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('font-size', '12px')
      .text(d => d.id);
  
    const link = svg
      .selectAll('.link')
      .data(graphData.links)
      .join('line')
      .attr('class', 'link')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
  
    const simulation = d3
      .forceSimulation(graphData.nodes.slice(0, currentIndex))
      .force('link', d3.forceLink().links(graphData.links).id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-1000))
      .force('center', d3.forceCenter(350, 350));
  
    simulation.on('tick', () => {
      node.attr('transform', d => `translate(${d.x},${d.y})`);
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    });
  }, [graphData, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex => currentIndex + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <svg ref={svgRef} width={700} height={700} style={{ margin: 'auto' }} />
    </div>
  );
};

export default App;


function generateRandomGraph(numVertices) {
    const vertices = [];
    const edges = [];
    
    // create an array of vertices based on user input
    for (let i = 0; i < numVertices; i++) {
      vertices.push(String.fromCharCode(65 + i));
    }
    
    // create random edges
    for (let i = 0; i < numVertices; i++) {
      const numEdges = Math.floor(Math.random() * (numVertices - i - 1)) + 1; // generate a random number of edges for this vertex
      const edgesAdded = []; // keep track of which edges have already been added to avoid duplicates
      
      for (let j = 0; j < numEdges; j++) {
        let targetVertex = String.fromCharCode(65 + Math.floor(Math.random() * (numVertices - i - 1) + i + 1)); // generate a random target vertex
        
        // if this edge has already been added, generate a new target vertex
        while (edgesAdded.includes(targetVertex)) {
          targetVertex = String.fromCharCode(65 + Math.floor(Math.random() * (numVertices - i - 1) + i + 1));
        }
        
        edges.push({ source: vertices[i], target: targetVertex }); // add edge to edges array
        edgesAdded.push(targetVertex); // add target vertex to edgesAdded array
      }
    }
    
    return { vertices, edges };
  }
  
