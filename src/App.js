import React, { useState } from 'react';
import CBIP from './CBIP';
import FirstFit from './firstFitSimulator';

const App = () => {
  const [numVertices, setNumVertices] = useState(5);
  const [showGraph, setShowGraph] = useState(false);
  const [valueOfK, setValueOfK] = useState(2);
  const [algorithm, setAlgorithm] = useState('firstfit');


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(numVertices)
    // call the Graph component with the number of vertices
    if (numVertices !== null) {
      console.log("happens")
      setShowGraph(true);
    }
  };

  return (
    <div>
      <nav><h1>Graph Simulation</h1></nav>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <label style={{ marginBottom: '10px' }}>
          Number of vertices:
          <select
            value={numVertices}
            onChange={(event) => setNumVertices(event.target.value)}
            style={{ marginLeft: '8px' }}
          >
            <option value="5" defaultValue>5</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </label>

        <label style={{ marginBottom: '10px' }}>
          Value of k:
          <select
            value={valueOfK}
            onChange={(event) => setValueOfK(event.target.value)}
            style={{ marginLeft: '8px' }}
          >
            <option value="2" defaultValue>2</option>
            <option value="4">4</option>
          </select>
        </label>

          <label style={{ marginBottom: '10px' }}>
          Algorithm:
          <select value={algorithm} onChange={(event) => setAlgorithm(event.target.value)} style={{ marginLeft: '15px' }}>
            <option value="firstfit">First Fit</option>
            <option value="CBIP">CBIP</option>
          </select>
          </label>
          
        </div>
        <button type="submit">Simulate Graph</button>
      </form>

      {showGraph && algorithm === "firstfit" && <FirstFit numVertices={numVertices} valueOfK={valueOfK} />}
      {showGraph && algorithm === "CBIP" && <CBIP numVertices={numVertices} valueOfK={valueOfK} />}

    </div>
  );
};

export default App;
