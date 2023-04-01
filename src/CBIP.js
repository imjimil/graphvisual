import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { getNodeAndEdges } from './kColorGraphs';

const CBIP = ({numVertices, valueOfK}) => {
  const svgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalUsedColors, setTotalUsedColors] = useState(0);

  const {vertices, edges} = getNodeAndEdges(numVertices, valueOfK);


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
  
      // CBIP Algorithm
      const degrees = {};
      graphData.links.forEach(link => {
        degrees[link.source.id] = (degrees[link.source.id] || 0) + 1;
        degrees[link.target.id] = (degrees[link.target.id] || 0) + 1;
      });

      const nodeColors = {};
      const counter = new Set();
      const colorList = ['antiquewhite', 'chocolate', 'lightblue', 'cornflowerblue', 'darkorchid', 'grey'];

      // Sort the nodes by degree in descending order
      const sortedNodes = graphData.nodes.slice(0, currentIndex).sort((a, b) => degrees[b.id] - degrees[a.id]);

      sortedNodes.forEach(node => {
        const usedColors = {};
        const adjacentNodes = new Set();

        // Collect the colors used by adjacent nodes and add adjacent nodes to the set
        graphData.links.forEach(link => {
          if (link.source.id === node.id) {
            usedColors[nodeColors[link.target.id]] = true;
            adjacentNodes.add(link.target);
          }
          if (link.target.id === node.id) {
            usedColors[nodeColors[link.source.id]] = true;
            adjacentNodes.add(link.source);
          }
        });

        // Check the colors of adjacent nodes and mark them as used
        adjacentNodes.forEach(adjacentNode => {
          if (nodeColors[adjacentNode.id]) {
            usedColors[nodeColors[adjacentNode.id]] = true;
          }
        });

        // Create the forbidden set by adding the colors of all previously colored nodes that are adjacent to the current node
        const forbiddenColors = new Set();
        graphData.nodes.slice(0, currentIndex).forEach(coloredNode => {
          if (adjacentNodes.has(coloredNode)) {
            forbiddenColors.add(nodeColors[coloredNode.id]);
          }
        });

        // Find the first available color that is not in the forbidden set
        for (let i = 0; i < colorList.length; i++) {
          if (!usedColors[colorList[i]] && !forbiddenColors.has(colorList[i])) {
            nodeColors[node.id] = colorList[i];
            counter.add(colorList[i])
            break;
          }
        }
      });

      if (counter.size > 0) {
        setTotalUsedColors(totalUsedColors => counter.size);
      }

      // update the colors of the nodes
      node.selectAll('circle').attr('fill', d => nodeColors[d.id]);
    }
}, [currentIndex]);
  

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
    <h3 style={{ color: totalUsedColors <= valueOfK ? 'green' : 'yellow' }}> Number of color used is {totalUsedColors}</h3>
    </div>
  );
};

export default React.memo(CBIP);
