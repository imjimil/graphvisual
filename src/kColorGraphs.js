/* eslint-disable eqeqeq */
export function getNodeAndEdges(node) {
    // 5 nodes - Complex graph where order matters - FirstFit may use more colors
    if(node == 5) {
        const vertices = ['A', 'B', 'C', 'D', 'E'];
        const edges = [
            { source: 'A', target: 'B' },
            { source: 'A', target: 'C' },
            { source: 'A', target: 'D' },
            { source: 'B', target: 'C' },
            { source: 'B', target: 'E' },
            { source: 'C', target: 'D' },
            { source: 'D', target: 'E' }
        ];
        return {vertices, edges};
    }
    // 7 nodes - Dense graph - challenging for all algorithms
    else if(node == 7) {
        const vertices = ['A', 'B', 'C', 'D', 'E','F','G'];
        const edges = [
            { source: 'B', target: 'A' },
            { source: 'D', target: 'B' },
            { source: 'D', target: 'G' },
            { source: 'E', target: 'A' },
            { source: 'E', target: 'C' },
            { source: 'E', target: 'D' },
            { source: 'F', target: 'B' },
            { source: 'F', target: 'C' },
            { source: 'F', target: 'E' },
            { source: 'G', target: 'E' },
            { source: 'G', target: 'F' },
        ];
        return {vertices, edges};
    }
    // 8 nodes - Extremely dense graph - near complete graph
    else if(node == 8) {
        const vertices = ['A', 'B', 'C', 'D', 'E','F','G','H'];
        const edges = [
            { source: 'A', target: 'B' },
            { source: 'A', target: 'C' },
            { source: 'A', target: 'D' },
            { source: 'A', target: 'E' },
            { source: 'A', target: 'F' },
            { source: 'B', target: 'C' },
            { source: 'B', target: 'D' },
            { source: 'B', target: 'G' },
            { source: 'C', target: 'E' },
            { source: 'C', target: 'H' },
            { source: 'D', target: 'F' },
            { source: 'D', target: 'G' },
            { source: 'E', target: 'H' },
            { source: 'F', target: 'G' },
            { source: 'F', target: 'H' },
            { source: 'G', target: 'H' }
        ];
        return {vertices, edges};
    }
    // 10 nodes - Dense graph with multiple high-degree nodes - FirstFit struggles
    else if(node == 10) {
        const vertices = ['A', 'B', 'C', 'D', 'E','F','G','H','I','J'];
        const edges = [
            { source: 'A', target: 'B' },
            { source: 'A', target: 'C' },
            { source: 'A', target: 'D' },
            { source: 'A', target: 'E' },
            { source: 'B', target: 'F' },
            { source: 'B', target: 'G' },
            { source: 'C', target: 'H' },
            { source: 'D', target: 'I' },
            { source: 'E', target: 'J' },
            { source: 'F', target: 'G' },
            { source: 'F', target: 'H' },
            { source: 'G', target: 'I' },
            { source: 'H', target: 'J' },
            { source: 'I', target: 'J' },
            { source: 'A', target: 'F' },
            { source: 'B', target: 'H' },
            { source: 'C', target: 'I' }
        ];
        return {vertices, edges};
    }
    // 12 nodes - Extremely dense graph - maximum challenge, shows clear differences
    else if(node == 12) {
        const vertices = ['A', 'B', 'C', 'D', 'E','F','G','H','I','J','K','L'];
        const edges = [
            { source: 'A', target: 'B' },
            { source: 'A', target: 'C' },
            { source: 'A', target: 'D' },
            { source: 'A', target: 'E' },
            { source: 'B', target: 'F' },
            { source: 'B', target: 'G' },
            { source: 'C', target: 'H' },
            { source: 'D', target: 'I' },
            { source: 'E', target: 'J' },
            { source: 'F', target: 'K' },
            { source: 'G', target: 'L' },
            { source: 'H', target: 'I' },
            { source: 'H', target: 'J' },
            { source: 'I', target: 'K' },
            { source: 'J', target: 'L' },
            { source: 'K', target: 'L' },
            { source: 'A', target: 'F' },
            { source: 'B', target: 'H' },
            { source: 'C', target: 'I' },
            { source: 'D', target: 'J' },
            { source: 'E', target: 'K' },
            { source: 'F', target: 'G' }
        ];
        return {vertices, edges};
    }
    // 16 nodes - Clebsch Graph - dense structure to demonstrate algorithm performance differences
    else if(node == 16) {
        const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
        const edges = [
            // Core structure with high connectivity
            { source: 'A', target: 'B' }, { source: 'A', target: 'C' }, { source: 'A', target: 'D' }, { source: 'A', target: 'E' }, { source: 'A', target: 'F' },
            { source: 'B', target: 'C' }, { source: 'B', target: 'G' }, { source: 'B', target: 'H' }, { source: 'B', target: 'I' },
            { source: 'C', target: 'D' }, { source: 'C', target: 'J' }, { source: 'C', target: 'K' },
            { source: 'D', target: 'E' }, { source: 'D', target: 'L' }, { source: 'D', target: 'M' },
            { source: 'E', target: 'F' }, { source: 'E', target: 'N' }, { source: 'E', target: 'O' },
            { source: 'F', target: 'G' }, { source: 'F', target: 'P' }, { source: 'F', target: 'H' },
            { source: 'G', target: 'H' }, { source: 'G', target: 'I' }, { source: 'G', target: 'J' },
            { source: 'H', target: 'K' }, { source: 'H', target: 'L' },
            { source: 'I', target: 'J' }, { source: 'I', target: 'M' }, { source: 'I', target: 'N' },
            { source: 'J', target: 'K' }, { source: 'J', target: 'O' },
            { source: 'K', target: 'L' }, { source: 'K', target: 'P' },
            { source: 'L', target: 'M' }, { source: 'L', target: 'N' },
            { source: 'M', target: 'N' }, { source: 'M', target: 'O' },
            { source: 'N', target: 'P' },
            { source: 'O', target: 'P' },
            // Additional connections to increase complexity
            { source: 'A', target: 'G' }, { source: 'B', target: 'J' }, { source: 'C', target: 'L' },
            { source: 'D', target: 'N' }, { source: 'E', target: 'P' }, { source: 'F', target: 'I' },
            { source: 'G', target: 'K' }, { source: 'H', target: 'M' }, { source: 'I', target: 'O' },
            { source: 'J', target: 'L' }, { source: 'K', target: 'N' }, { source: 'L', target: 'O' },
            { source: 'M', target: 'P' }
        ];
        return {vertices, edges};
    }
    // Default fallback - return a simple graph
    else {
        const vertices = ['A', 'B', 'C', 'D', 'E'];
        const edges = [
            { source: 'A', target: 'B' },
            { source: 'B', target: 'C' },
            { source: 'C', target: 'D' },
            { source: 'D', target: 'E' }
        ];
        return {vertices, edges};
    }
}
