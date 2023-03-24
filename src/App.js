import React, { useState } from 'react';
import FirstFit from './firstFitSimulator';

const App = () => {
  const [numVertices, setNumVertices] = useState(null);
  const [showGraph, setShowGraph] = useState(false);

  const [valurOfK, setValueOfK] = useState(null);


  const handleSubmit = (event) => {
    event.preventDefault();
    // call the Graph component with the number of vertices
    if (numVertices !== null) {
      setShowGraph(true);
    }
  };

  return (
    <div>
      <h1>Graph Simulation</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ marginBottom: '10px' }}>
            Number of vertices:
            <input
              type="number"
              value={numVertices}
              onChange={(event) => setNumVertices(event.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
          <label style={{ marginBottom: '10px' }}>
            Value of k:
            <input
              type="number"
              value={valurOfK}
              onChange={(event) => setValueOfK(event.target.value)}
              style={{ marginLeft: '42px' }}
            />
          </label>
          <button type="submit">Simulate Graph</button>
        </div>
      </form>

      {showGraph && <FirstFit numVertices={numVertices} />}
    </div>
  );
};

export default App;
