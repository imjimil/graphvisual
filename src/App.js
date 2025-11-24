import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import GraphBuilder from './components/GraphBuilder';
import ComparisonView from './components/ComparisonView';
import { getNodeAndEdges } from './kColorGraphs';
import { lightTheme, darkTheme } from './styles/theme';
import './styles/global.css';

const App = () => {
  const [numVertices, setNumVertices] = useState(5);
  const [showGraph, setShowGraph] = useState(false);
  const [algorithm, setAlgorithm] = useState('firstfit');
  // Load dark mode preference from localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [showGraphBuilder, setShowGraphBuilder] = useState(false);
  const [customGraph, setCustomGraph] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [viewHistory, setViewHistory] = useState(['config']); // Track navigation history
  const [historyIndex, setHistoryIndex] = useState(0);

  const theme = isDarkMode ? darkTheme : lightTheme;

  // Navigation functions
  const navigateTo = (view) => {
    const newHistory = viewHistory.slice(0, historyIndex + 1);
    newHistory.push(view);
    setViewHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    if (view === 'config') {
      setShowGraph(false);
      setShowComparison(false);
    } else if (view === 'visualization') {
      setShowGraph(true);
      setShowComparison(false);
    } else if (view === 'comparison') {
      setShowGraph(true);
      setShowComparison(true);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prevView = viewHistory[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      
      if (prevView === 'config') {
        setShowGraph(false);
        setShowComparison(false);
      } else if (prevView === 'visualization') {
        setShowGraph(true);
        setShowComparison(false);
      }
    }
  };

  const goForward = () => {
    if (historyIndex < viewHistory.length - 1) {
      const nextView = viewHistory[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      
      if (nextView === 'config') {
        setShowGraph(false);
        setShowComparison(false);
      } else if (nextView === 'visualization') {
        setShowGraph(true);
        setShowComparison(false);
      } else if (nextView === 'comparison') {
        setShowGraph(true);
        setShowComparison(true);
      }
    }
  };

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.body.className = isDarkMode ? 'dark-mode' : '';
    document.body.style.background = theme.colors.background;
    document.body.style.color = theme.colors.text;
  }, [isDarkMode, theme]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCustomGraph(null);
    navigateTo('visualization');
  };

  const handleGraphChange = (graph) => {
    setCustomGraph(graph);
    navigateTo('visualization');
  };

  const handleGraphChangeAndCompare = (graph) => {
    setCustomGraph(graph);
    navigateTo('comparison');
  };

  const getGraphData = () => {
    if (customGraph) {
      return {
        vertices: customGraph.vertices,
        edges: customGraph.edges,
      };
    }
    const { vertices, edges } = getNodeAndEdges(numVertices);
    return { vertices, edges };
  };

  const { vertices, edges } = showGraph ? getGraphData() : { vertices: [], edges: [] };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.colors.background,
      color: theme.colors.text,
      transition: 'background-color 0.3s ease, color 0.3s ease',
    }}>
      {/* Navigation */}
      <nav style={{
        padding: '1.5rem 2rem',
        background: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadows.sm,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => window.location.reload()}
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: theme.colors.primary,
              cursor: 'pointer',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Graph Coloring Visualizer
          </motion.h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            {/* Navigation Buttons */}
            {(showGraph || historyIndex > 0) && (
              <>
                <button
                  onClick={() => {
                    setShowGraph(false);
                    setShowComparison(false);
                    setViewHistory(['config']);
                    setHistoryIndex(0);
                  }}
                  style={{
                    padding: '0.5rem',
                    borderRadius: theme.borderRadius.md,
                    background: theme.colors.surface,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.colors.primary;
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = theme.colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme.colors.surface;
                    e.currentTarget.style.color = theme.colors.text;
                    e.currentTarget.style.borderColor = theme.colors.border;
                  }}
                  title="Home"
                >
                  <FaHome />
                </button>
                <button
                  onClick={goBack}
                  disabled={historyIndex === 0}
                  style={{
                    padding: '0.5rem',
                    borderRadius: theme.borderRadius.md,
                    background: theme.colors.surface,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    cursor: historyIndex === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    opacity: historyIndex === 0 ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (historyIndex > 0) {
                      e.currentTarget.style.background = theme.colors.primary;
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = theme.colors.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme.colors.surface;
                    e.currentTarget.style.color = theme.colors.text;
                    e.currentTarget.style.borderColor = theme.colors.border;
                  }}
                  title="Go Back"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={goForward}
                  disabled={historyIndex >= viewHistory.length - 1}
                  style={{
                    padding: '0.5rem',
                    borderRadius: theme.borderRadius.md,
                    background: theme.colors.surface,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    cursor: historyIndex >= viewHistory.length - 1 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    opacity: historyIndex >= viewHistory.length - 1 ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (historyIndex < viewHistory.length - 1) {
                      e.currentTarget.style.background = theme.colors.primary;
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = theme.colors.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme.colors.surface;
                    e.currentTarget.style.color = theme.colors.text;
                    e.currentTarget.style.borderColor = theme.colors.border;
                  }}
                  title="Go Forward"
                >
                  <FaArrowRight />
                </button>
              </>
            )}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: theme.borderRadius.md,
                background: isDarkMode ? theme.colors.primary : theme.colors.primary,
                color: 'white',
                border: `1px solid ${theme.colors.primary}`,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                boxShadow: theme.shadows.sm,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.colors.primaryDark;
                e.currentTarget.style.borderColor = theme.colors.primaryDark;
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = theme.shadows.md;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.colors.primary;
                e.currentTarget.style.borderColor = theme.colors.primary;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = theme.shadows.sm;
              }}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
              <span style={{ fontSize: '0.875rem' }}>
                {isDarkMode ? 'Light' : 'Dark'}
              </span>
            </button>
            {showGraph && (
              <button
                onClick={() => setShowGraph(false)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: theme.borderRadius.md,
                  background: theme.colors.background,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.colors.primary;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = theme.colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = theme.colors.background;
                  e.currentTarget.style.color = theme.colors.text;
                  e.currentTarget.style.borderColor = theme.colors.border;
                }}
              >
                New Graph
              </button>
            )}
          </div>
        </div>
      </nav>

      {!showGraph ? (
        /* Configuration Form */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            maxWidth: '800px',
            margin: '3rem auto',
            padding: '0 2rem',
          }}
        >
          <div style={{
            background: theme.colors.surface,
            borderRadius: theme.borderRadius.xl,
            padding: '2.5rem',
            boxShadow: theme.shadows.xl,
            border: `1px solid ${theme.colors.border}`,
          }}>
            <h2 style={{
              marginBottom: '2rem',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: theme.colors.text,
            }}>
              Configure Graph
            </h2>

            <form onSubmit={handleSubmit}>
              <div 
                className="grid-auto-fit"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: theme.colors.text,
                  }}>
                    Number of Vertices
                  </label>
                  <select
                    value={numVertices}
                    onChange={(e) => setNumVertices(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${theme.colors.border}`,
                      background: theme.colors.background,
                      color: theme.colors.text,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="5">5</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="16">16 (Clebsch)</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: theme.colors.text,
                  }}>
                    Algorithm
                  </label>
                  <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: theme.borderRadius.md,
                      border: `1px solid ${theme.colors.border}`,
                      background: theme.colors.background,
                      color: theme.colors.text,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="firstfit">First Fit</option>
                    <option value="CBIP">CBIP</option>
                    <option value="greedy">Greedy (Degree-based)</option>
                    <option value="welshpowell">Welsh-Powell</option>
                  </select>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
              }}>
                <button
                  type="button"
                  onClick={() => {
                    const { vertices, edges } = getNodeAndEdges(numVertices);
                    setShowGraphBuilder(true);
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: theme.borderRadius.md,
                    background: theme.colors.surface,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.colors.primary;
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = theme.colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme.colors.surface;
                    e.currentTarget.style.color = theme.colors.text;
                    e.currentTarget.style.borderColor = theme.colors.border;
                  }}
                >
                  Custom Graph
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigateTo('comparison');
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: theme.borderRadius.md,
                    background: theme.colors.secondary,
                    color: 'white',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: theme.shadows.md,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Compare Algorithms
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '0.75rem 2rem',
                    borderRadius: theme.borderRadius.md,
                    background: theme.colors.primary,
                    color: 'white',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: theme.shadows.md,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = theme.colors.primaryDark;
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = theme.colors.primary;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Start Visualization
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : showComparison ? (
        /* Comparison View */
        <ComparisonView
          vertices={vertices}
          edges={edges}
          theme={theme}
          onClose={() => {
            setShowComparison(false);
            if (historyIndex > 0) {
              goBack();
            } else {
              setShowGraph(false);
              setViewHistory(['config']);
              setHistoryIndex(0);
            }
          }}
          onNavigateHome={() => {
            setShowGraph(false);
            setShowComparison(false);
            setViewHistory(['config']);
            setHistoryIndex(0);
          }}
          onNavigateBack={goBack}
          onNavigateForward={goForward}
          canGoBack={historyIndex > 0}
          canGoForward={historyIndex < viewHistory.length - 1}
        />
      ) : (
        /* Visualization */
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1rem',
        }}>
          <AlgorithmVisualizer
            vertices={vertices}
            edges={edges}
            algorithm={algorithm}
            theme={theme}
            onEditGraph={() => {
              const currentGraph = customGraph || {
                vertices,
                edges: edges.map(e => ({ 
                  source: typeof e.source === 'string' ? e.source : e.source.id,
                  target: typeof e.target === 'string' ? e.target : e.target.id,
                })),
              };
              setShowGraphBuilder(true);
            }}
            canEdit={true}
          />
        </div>
      )}

      {/* Graph Builder Modal */}
      {showGraphBuilder && (
        <GraphBuilder
          initialVertices={customGraph?.vertices || vertices}
          initialEdges={customGraph?.edges || edges.map(e => ({
            source: typeof e.source === 'string' ? e.source : e.source.id,
            target: typeof e.target === 'string' ? e.target : e.target.id,
          }))}
          onGraphChange={handleGraphChange}
          onGraphChangeAndCompare={handleGraphChangeAndCompare}
          theme={theme}
          onClose={() => setShowGraphBuilder(false)}
        />
      )}
    </div>
  );
};

export default App;
