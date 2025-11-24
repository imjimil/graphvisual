/**
 * CBIP (Color-Based Incremental Processing) Algorithm for Online Bipartite Graph Coloring
 * 
 * According to the project report:
 * - Designed for bipartite graphs
 * - For each vertex v:
 *   1. Find the connected component H where v belongs in the current partial graph
 *   2. Partition H into two independent sets H_a and H_b (bipartition)
 *   3. v belongs to H_a
 *   4. Color v with the smallest number not used in H_b
 */

// Helper function to find connected component containing a vertex
function findConnectedComponent(vertex, nodes, links) {
  const visited = new Set();
  const component = [];
  const queue = [vertex];
  visited.add(vertex);

  while (queue.length > 0) {
    const current = queue.shift();
    component.push(current);

    links.forEach(link => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      
      if (sourceId === current && nodes.includes(targetId) && !visited.has(targetId)) {
        visited.add(targetId);
        queue.push(targetId);
      }
      if (targetId === current && nodes.includes(sourceId) && !visited.has(sourceId)) {
        visited.add(sourceId);
        queue.push(sourceId);
      }
    });
  }

  return component;
}

// Helper function to perform bipartite partitioning using BFS
function bipartitePartition(component, links) {
  const partitionA = new Set();
  const partitionB = new Set();
  const visited = new Set();
  const queue = [];
  
  if (component.length === 0) return { partitionA, partitionB };

  // Start BFS from first vertex
  const start = component[0];
  queue.push({ node: start, level: 0 });
  visited.add(start);
  partitionA.add(start);

  while (queue.length > 0) {
    const { node, level } = queue.shift();
    const currentPartition = level % 2 === 0 ? partitionA : partitionB;
    const oppositePartition = level % 2 === 0 ? partitionB : partitionA;

    // Find neighbors
    links.forEach(link => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      
      let neighbor = null;
      if (sourceId === node && component.includes(targetId)) {
        neighbor = targetId;
      } else if (targetId === node && component.includes(sourceId)) {
        neighbor = sourceId;
      }

      if (neighbor && !visited.has(neighbor)) {
        visited.add(neighbor);
        oppositePartition.add(neighbor);
        queue.push({ node: neighbor, level: level + 1 });
      }
    });
  }

  return { partitionA, partitionB };
}

export const CBIPColoring = (vertices, edges, currentIndex) => {
  const nodeColors = {};
  const usedColorsSet = new Set();
  const colorList = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];

  // Build links for current partial graph
  const nodes = vertices.slice(0, currentIndex);
  const links = edges.map(edge => {
    const sourceId = typeof edge.source === 'string' ? edge.source : edge.source.id;
    const targetId = typeof edge.target === 'string' ? edge.target : edge.target.id;
    // Only include edges between revealed vertices
    if (nodes.includes(sourceId) && nodes.includes(targetId)) {
      return { source: sourceId, target: targetId };
    }
    return null;
  }).filter(Boolean);

  // CBIP: Process vertices in presentation order (online)
  for (let i = 0; i < currentIndex; i++) {
    const currentNode = vertices[i];
    
    // Find connected component containing current vertex in the partial graph
    const component = findConnectedComponent(currentNode, nodes, links);
    
    // Partition component into two independent sets (bipartition)
    const { partitionA, partitionB } = bipartitePartition(component, links);
    
    // Current vertex belongs to partitionA
    // Find colors used in partitionB
    const usedColors = new Set();
    partitionB.forEach(node => {
      if (nodeColors[node]) {
        usedColors.add(nodeColors[node]);
      }
    });

    // Assign smallest color not used in partitionB
    for (let j = 0; j < colorList.length; j++) {
      if (!usedColors.has(colorList[j])) {
        nodeColors[currentNode] = colorList[j];
        usedColorsSet.add(colorList[j]);
        break;
      }
    }
  }

  return { nodeColors, totalColors: usedColorsSet.size };
};
