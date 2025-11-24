# Graph Coloring Visualizer

An interactive web-based visualization tool for studying online graph coloring algorithms. This application provides an empirical framework for analyzing the behavior and competitive ratios of various graph coloring algorithms, with particular focus on FirstFit and CBIP (Color-Based Incremental Processing) algorithms as described in the associated research project.

![React](https://img.shields.io/badge/React-18.2.0-blue) ![D3.js](https://img.shields.io/badge/D3.js-7.8.2-orange)

## Abstract

This project implements a comprehensive visualization system for online graph coloring algorithms. In the online graph coloring problem, vertices and edges are revealed sequentially, and each vertex must be assigned a proper color immediately upon arrival such that no two adjacent vertices share the same color. The objective is to minimize the number of colors used while maintaining the constraint that colors cannot be reassigned once assigned.

The visualization tool supports empirical analysis of algorithm performance through interactive simulation, allowing researchers and students to observe algorithm behavior, and coloring strategies in real-time.


### Online Graph Coloring

An **online graph** $G=(V, E)$ is a graph whose vertices and edges are revealed incrementally. At each time step $i$, a vertex $v = \sigma(i)$ and its edges to previously revealed vertices are presented, where $\sigma:[n] \rightarrow V$ is the presentation order.

**Definition 1 (Pre-neighborhood)**: The pre-neighborhood $N^{-}(v)$ of vertex $v$ is the set of neighbors that $v$ knows at the time of its arrival.

**Definition 2 (Competitive Ratio)**: The competitive ratio of an algorithm $A$ on an online graph $G=(V, E)$ is defined as:

$$\rho(A, G) = \frac{a}{X^{G}}$$

where $a$ is the number of colors used by algorithm $A$ on $G$, and $X^{G}$ is the chromatic number of $G$.

### Implemented Algorithms

#### FirstFit Algorithm

The FirstFit algorithm assigns each vertex the smallest available color not used by its pre-existing neighbors. Upon arrival of vertex $v$, the algorithm:

1. Examines all colors used by vertices in $N^{-}(v)$
2. Assigns the smallest positive integer not present in the pre-neighborhood

**Theoretical Properties**:
- For $k$-colorable graphs where $k \in \{2,3\}$, the competitive ratio is bounded by $\rho(\text{FirstFit}, G) \leq \frac{\lfloor\log(n)\rfloor+1}{k}$
- The competitive ratio increases with the number of vertices $n$

#### CBIP Algorithm

The CBIP (Color-Based Incremental Processing) algorithm is designed specifically for bipartite graphs. For each arriving vertex $v$:

1. Identifies the connected component $H$ containing $v$ in the current partial graph
2. Partitions $H$ into two independent sets $H_a$ and $H_b$ such that $v \in H_a$
3. Assigns $v$ the smallest color not used in $H_b$

**Theoretical Properties**:
- For 2-colorable (bipartite) graphs, the competitive ratio is bounded by $\rho(\text{CBIP}, G) \leq \log(n)$
- The competitive ratio does not depend on $n$ for bipartite graphs
- CBIP outperforms FirstFit on bipartite graphs, with an average competitive ratio approximately 0.839 times that of FirstFit

#### Additional Algorithms

The system also implements:
- **Greedy (Degree-based)**: Colors vertices in order of decreasing degree
- **Welsh-Powell**: A systematic approach ordering vertices by degree to minimize color usage

## Features and Functionality

### Core Visualization Capabilities

**Algorithm Simulation**: Step-by-step visualization of graph coloring algorithms with configurable playback speed. The system presents vertices sequentially according to the presentation order, allowing observation of how each algorithm assigns colors in real-time.

**Interactive Graph Manipulation**: Users can interact with the graph visualization by repositioning vertices through drag-and-drop functionality. The force-directed layout algorithm (implemented via D3.js) maintains graph structure while allowing manual adjustments for better visual clarity.

**Multi-Algorithm Comparison**: Side-by-side comparison of algorithm performance on identical graph instances, displaying:
- Total number of colors used by each algorithm
- Conflict detection and counting
- Real-time statistics during simulation

### Graph Configuration

**Predefined Graph Sets**: Access to a library of $k$-colorable graphs with varying vertex counts and chromatic numbers, including:
- Small graphs (5-8 vertices) for initial exploration
- Medium graphs (10-12 vertices) for algorithm comparison
- Complex graphs including the Clebsch graph (16 vertices) for performance analysis

**Custom Graph Construction**: Interactive graph builder enabling creation of arbitrary graph instances with:
- Vertex addition and labeling
- Edge creation between arbitrary vertex pairs
- Graph validation and structure verification

### Analysis Tools

**Real-time Statistics**: Continuous monitoring of algorithm performance metrics:
- Color count tracking
- Conflict detection and enumeration
- Progress indicators showing algorithm completion status

**Algorithm Information Panel**: Detailed explanations of each algorithm including:
- Pseudocode and algorithmic descriptions
- Complexity analysis
- Theoretical properties and bounds

**Color Legend**: Visual mapping of color indices to actual color representations, facilitating interpretation of coloring results.

### Export and Documentation

**Graph Export**: Capability to export current graph visualizations as PNG images for documentation and presentation purposes.

**Visual Theme Management**: Support for light and dark visual themes to accommodate different viewing preferences and reduce visual fatigue during extended analysis sessions.

## Technical Implementation

### Architecture

The application is built using modern web technologies:

- **React 18.2.0**: Component-based UI framework providing modular architecture and state management
- **D3.js 7.8.2**: Data visualization library implementing force-directed graph layouts and SVG rendering
- **Framer Motion**: Animation library for smooth UI transitions and component animations
- **React Icons**: Comprehensive icon library for UI elements

### Project Structure

```
graphvisual/
├── public/
│   └── index.html
├── src/
│   ├── algorithms/
│   │   ├── firstFit.js          # FirstFit algorithm implementation
│   │   ├── CBIP.js               # CBIP algorithm implementation
│   │   ├── greedy.js             # Greedy algorithm implementation
│   │   └── welshPowell.js        # Welsh-Powell algorithm implementation
│   ├── components/
│   │   ├── AlgorithmVisualizer.js    # Main visualization orchestrator
│   │   ├── AlgorithmInfo.js          # Algorithm documentation display
│   │   ├── ColorLegend.js            # Color mapping visualization
│   │   ├── ComparisonView.js         # Multi-algorithm comparison interface
│   │   ├── ControlPanel.js           # Simulation playback controls
│   │   ├── GraphBuilder.js           # Custom graph construction tool
│   │   ├── GraphVisualization.js     # D3.js graph rendering component
│   │   └── StatsPanel.js             # Performance metrics display
│   ├── styles/
│   │   ├── global.css            # Global styles and typography
│   │   └── theme.js              # Theme configuration (light/dark)
│   ├── kColorGraphs.js           # Predefined graph definitions
│   ├── App.js                    # Main application component
│   └── index.js                  # Application entry point
└── package.json
```

### Algorithm Implementation Details

All algorithms are implemented to process vertices in online fashion, maintaining the constraint that colors cannot be reassigned. The implementations follow the pseudocode specifications from the research literature, ensuring correctness and enabling accurate empirical analysis.

The force-directed layout algorithm constrains nodes within the visualization canvas boundaries and implements velocity decay to reduce jitter, providing stable and readable graph representations.

## Installation and Usage

### Prerequisites

- Node.js version 16.0 or higher
- npm package manager version 8.0 or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd graphvisual
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Access the application at `http://localhost:3000`

### Basic Usage

1. **Configure Graph Parameters**:
   - Select the number of vertices from available predefined graphs
   - Choose an algorithm to visualize (FirstFit, CBIP, Greedy, or Welsh-Powell)
   - Optionally access the custom graph builder to create specific graph instances

2. **Run Simulation**:
   - Initiate visualization using the "Start Visualization" control
   - Observe vertices being colored sequentially according to the algorithm's strategy
   - Use playback controls to pause, step through, or adjust simulation speed
   - Monitor real-time statistics in the statistics panel

3. **Compare Algorithms**:
   - Access the comparison view to evaluate multiple algorithms simultaneously
   - Select different algorithms from the sidebar to observe their coloring strategies
   - Analyze performance differences through the displayed metrics

4. **Custom Graph Analysis**:
   - Use the graph builder to construct specific graph instances
   - Add vertices and edges to create desired graph structures
   - Save and visualize custom graphs with any available algorithm

## References

1. Li, Y., Narayan, V. V., & Pankratov, D. (2022). Online Coloring and a New Type of Adversary for Online Graph Problems. *Algorithmica*, 84(5), 1232-1251. https://doi.org/10.1007/s00453-021-00920-w

2. Borodin, A. Topics in Algorithms: Online and Other Myopic Algorithms Fall 2019. http://www.cs.toronto.edu/~bor/2421f19/lectures/W4.pdf

3. Culberson, J. Graph coloring programs. https://webdocs.cs.ualberta.ca/~joe/Coloring/

## License

This project is open source and available under the MIT License.