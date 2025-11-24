export const greedyColoring = (vertices, edges, currentIndex) => {
  const nodes = vertices.slice(0, currentIndex).map(v => ({ id: v }));
  const links = edges.map(edge => ({
    source: nodes.find(n => n.id === edge.source),
    target: nodes.find(n => n.id === edge.target),
  })).filter(link => link.source && link.target);

  const degrees = {};
  links.forEach(link => {
    degrees[link.source.id] = (degrees[link.source.id] || 0) + 1;
    degrees[link.target.id] = (degrees[link.target.id] || 0) + 1;
  });

  const sortedNodes = [...nodes].sort((a, b) => degrees[b.id] - degrees[a.id]);
  const nodeColors = {};
  const usedColorsSet = new Set();

  sortedNodes.forEach(node => {
    const usedColors = {};
    
    links.forEach(link => {
      if (link.source.id === node.id && nodeColors[link.target.id]) {
        usedColors[nodeColors[link.target.id]] = true;
      }
      if (link.target.id === node.id && nodeColors[link.source.id]) {
        usedColors[nodeColors[link.source.id]] = true;
      }
    });

    const colorList = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1'];
    for (let i = 0; i < colorList.length; i++) {
      if (!usedColors[colorList[i]]) {
        nodeColors[node.id] = colorList[i];
        usedColorsSet.add(colorList[i]);
        break;
      }
    }
  });

  return { nodeColors, totalColors: usedColorsSet.size };
};

