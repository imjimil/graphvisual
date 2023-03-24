import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

function generateRandomGraph(numVertices) {
    const vertices = [];
    const edges = [];
  
    // generate vertices
    for (let i = 0; i < numVertices; i++) {
      vertices.push(String.fromCharCode(65 + i)); // A, B, C, ...
    }
  
    // generate edges
    for (let i = 0; i < numVertices - 1; i++) {
      const source = vertices[i];
      const target = vertices[i + 1];
      edges.push({ source, target });
    }
  
    // add remaining edges randomly
    for (let i = 0; i < numVertices - 1; i++) {
      const source = vertices[i];
      const numEdges = Math.floor(Math.random() * (numVertices - i - 1)); // number of edges for this vertex
      let count = 0; // number of edges added so far
  
      while (count < numEdges) {
        const targetIndex = Math.floor(Math.random() * (numVertices - i - 1)) + i + 1; // index of target vertex
        const target = vertices[targetIndex];
  
        if (!edges.some(edge => edge.source === source && edge.target === target)) { // check if edge already exists
          edges.push({ source, target });
          count++;
        }
      }
    }
  
    return { vertices, edges };
  }
  

const FirstFit = ({numVertices}) => {
  const svgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalUsedColors, setTotalUsedColors] = useState(0);

  const data = generateRandomGraph(numVertices);

  const vertices = data.vertices;
  const edges = data.edges;
  console.log(data);

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
    if(currentIndex <= vertices.length) {
        const svg = d3.select(svgRef.current);
  
    const node = svg
      .selectAll('.node')
      .data(graphData.nodes.slice(0, currentIndex))
      .join(
        enter => enter.append('g')
          .attr('class', 'node')
          .attr('opacity', 0)
          .call(enter => enter.transition().duration(500).attr('opacity', 1)),
        update => update,
        exit => exit.call(exit => exit.transition().duration(500).attr('opacity', 0)).remove()
      )
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
      .force('charge', d3.forceManyBody().strength(d => -1500))
      .force('center', d3.forceCenter(350, 350))
  
    simulation.on('tick', () => {
      node.attr('transform', d => `translate(${d.x},${d.y})`);
      link.attr('x1', d => d.source.x).attr('y1', d => d.source.y).attr('x2', d => d.target.x).attr('y2', d => d.target.y);
    });
    const degrees = {};
    graphData.links.forEach(link => {
        degrees[link.source.id] = (degrees[link.source.id] || 0) + 1;
        degrees[link.target.id] = (degrees[link.target.id] || 0) + 1;
    });

    const nodeColors = {};
    const counter = new Set();;
    const colorList = ['antiquewhite', 'chocolate', 'lightblue', 'cornflowerblue', 'darkorchid', 'grey'];
    graphData.nodes.slice(0, currentIndex).forEach(node => {
        const usedColors = {};
        graphData.links.forEach(link => {
        if (link.source.id === node.id) {
            usedColors[nodeColors[link.target.id]] = true;
        }
        if (link.target.id === node.id) {
            usedColors[nodeColors[link.source.id]] = true;
        }
        });
        for (let i = 0; i < colorList.length; i++) {
        if (!usedColors[colorList[i]]) {
            nodeColors[node.id] = colorList[i];
            counter.add(colorList[i])
            break;
        }
        }
        if (counter.size > 0) {
            setTotalUsedColors(totalUsedColors => counter.size);
        }
    });

  // update the colors of the nodes
  node.selectAll('circle').attr('fill', d => nodeColors[d.id]);
    }
  }, [graphData, currentIndex]);

  useEffect(() => {
    if(currentIndex <= vertices.length) {
        console.log("3d "+currentIndex);
        console.log("3rd "+vertices);
        const interval = setInterval(() => {
            setCurrentIndex(currentIndex => currentIndex + 1);
          }, 2000);
          
          return () => clearInterval(interval);
    }
    
  }, []);

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'auto' }}>
        <svg ref={svgRef} style={{ margin: 'auto', 'width': '100%', height: '100%' }} />
    </div>
    <h4>Number of color used is {totalUsedColors}</h4>
    </div>
  );
};

export default React.memo(FirstFit);
