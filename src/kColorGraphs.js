/* eslint-disable eqeqeq */
export function getNodeAndEdges(node, valueOfK) {
    if(node == 5 && valueOfK == 2) {
        const vertices = ['A', 'B', 'C', 'D', 'E'];
        const edges = [
            { source: 'A', target: 'B' },
            { source: 'A', target: 'C' },
            { source: 'C', target: 'D' },
            { source: 'D', target: 'E' }
        ];
        return {vertices, edges};
    }
    else if(node == 5 && valueOfK == 4) {
        console.log("here")
        const vertices = ['A', 'B', 'C', 'D', 'E'];
        const edges = [
            { source: 'A', target: 'C' },
            { source: 'B', target: 'E' },
            { source: 'B', target: 'D' },
            { source: 'E', target: 'C' },
            { source: 'E', target: 'D' },
            { source: 'C', target: 'D' },
        ];
        return {vertices, edges};
    }
    else if(node == 7 && valueOfK == 2) {
        const vertices = ['A', 'B', 'C', 'D', 'E','F','G'];
        const edges = [
            { source: 'B', target: 'A' },
            { source: 'F', target: 'B' },
            { source: 'F', target: 'C' },
            { source: 'F', target: 'D' },
            { source: 'F', target: 'E' },
            { source: 'G', target: 'A' },
            { source: 'G', target: 'F' },
        ];
        return {vertices, edges};
    }
    else if(node == 7 && valueOfK == 4) {
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
    else if(node == 8 && valueOfK == 2) {
        const vertices = ['A', 'B', 'C', 'D', 'E','F','G','H'];
        const edges = [
            { source: 'C', target: 'A' },
            { source: 'D', target: 'B' },
            { source: 'D', target: 'C' },
            { source: 'E', target: 'A' },
            { source: 'E', target: 'D' },
            { source: 'F', target: 'A' },
            { source: 'G', target: 'B' },
            { source: 'G', target: 'F' },
            { source: 'H', target: 'A' },
        ];
        return {vertices, edges};
    }
    else {
        const vertices = ['A', 'B', 'C', 'D', 'E','F','G','H'];
        const edges = [
            { source: 'C', target: 'A' },
            { source: 'D', target: 'A' },
            { source: 'D', target: 'B' },
            { source: 'D', target: 'C' },
            { source: 'E', target: 'A' },
            { source: 'E', target: 'B' },
            { source: 'E', target: 'D' },
            { source: 'F', target: 'E' },
            { source: 'G', target: 'B' },
            { source: 'G', target: 'E' },
            { source: 'G', target: 'F' },
            { source: 'H', target: 'A' },
        ];
        return {vertices, edges};
    }
}