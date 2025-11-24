/**
 * FirstFit Algorithm for Online Graph Coloring
 * 
 * According to the project report:
 * - Processes vertices in presentation order (online fashion)
 * - For each vertex v, colors it with the smallest number not used by its pre-neighborhood
 * - Pre-neighborhood: neighbors that arrived before v
 */
export const firstFitColoring = (vertices, edges, currentIndex) => {
  const nodeColors = {};
  const usedColorsSet = new Set();
  const colorList = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];

  // FirstFit: Process vertices in presentation order (online)
  // At each step, only consider vertices that have been revealed so far
  for (let i = 0; i < currentIndex; i++) {
    const currentNode = vertices[i];
    
    // Find pre-neighborhood: neighbors that arrived BEFORE current vertex
    const preNeighbors = new Set();
    edges.forEach(edge => {
      const sourceId = typeof edge.source === 'string' ? edge.source : edge.source.id;
      const targetId = typeof edge.target === 'string' ? edge.target : edge.target.id;
      
      // Only consider edges between vertices that have been revealed
      if (sourceId === currentNode && vertices.slice(0, i).includes(targetId)) {
        preNeighbors.add(targetId);
      }
      if (targetId === currentNode && vertices.slice(0, i).includes(sourceId)) {
        preNeighbors.add(sourceId);
      }
    });

    // Find colors used by pre-neighbors
    const usedColors = new Set();
    preNeighbors.forEach(neighbor => {
      if (nodeColors[neighbor]) {
        usedColors.add(nodeColors[neighbor]);
      }
    });

    // Assign smallest color not used by pre-neighbors
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
