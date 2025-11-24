import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import GraphVisualization from './GraphVisualization';
import ControlPanel from './ControlPanel';
import { FaTimes, FaChartBar, FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import { firstFitColoring } from '../algorithms/firstFit';
import { CBIPColoring } from '../algorithms/CBIP';
import { greedyColoring } from '../algorithms/greedy';
import { welshPowellColoring } from '../algorithms/welshPowell';

const algorithms = ['firstfit', 'CBIP', 'greedy', 'welshpowell'];

const ComparisonView = ({ vertices, edges, theme, onClose, onNavigateHome, onNavigateBack, onNavigateForward, canGoBack, canGoForward }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [algorithmStats, setAlgorithmStats] = useState({});
  const intervalRef = useRef(null);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleStep = useCallback(() => {
    if (currentIndex < vertices.length) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, vertices.length]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setIsPlaying(false);
  }, []);

  const handleSpeedChange = useCallback((newSpeed) => {
    setSpeed(newSpeed);
  }, []);

  // Calculate stats for all algorithms using the actual algorithm implementations
  useEffect(() => {
    const stats = {};
    algorithms.forEach(algorithm => {
      let result;
      switch (algorithm) {
        case 'firstfit':
          result = firstFitColoring(vertices, edges, currentIndex);
          break;
        case 'CBIP':
          result = CBIPColoring(vertices, edges, currentIndex);
          break;
        case 'greedy':
          result = greedyColoring(vertices, edges, currentIndex);
          break;
        case 'welshpowell':
          result = welshPowellColoring(vertices, edges, currentIndex);
          break;
        default:
          result = firstFitColoring(vertices, edges, currentIndex);
      }

      const { nodeColors: colors, totalColors } = result;

      // Check for conflicts
      const nodes = vertices.slice(0, currentIndex).map(v => ({ id: v }));
      const links = edges.map(edge => {
        const sourceId = typeof edge.source === 'string' ? edge.source : edge.source.id;
        const targetId = typeof edge.target === 'string' ? edge.target : edge.target.id;
        return {
          source: nodes.find(n => n.id === sourceId),
          target: nodes.find(n => n.id === targetId),
        };
      }).filter(link => link.source && link.target);

      let conflictCount = 0;
      links.forEach(link => {
        if (colors[link.source.id] && colors[link.target.id] && 
            colors[link.source.id] === colors[link.target.id]) {
          conflictCount++;
        }
      });

      stats[algorithm] = {
        totalColors: totalColors,
        conflicts: conflictCount,
      };
    });
    setAlgorithmStats(stats);
  }, [vertices, edges, currentIndex]);

  useEffect(() => {
    if (isPlaying && currentIndex < vertices.length) {
      const delay = 2000 / speed;
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev >= vertices.length) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentIndex, vertices.length, speed]);

  const algorithmNames = {
    firstfit: 'First Fit',
    CBIP: 'CBIP',
    greedy: 'Greedy',
    welshpowell: 'Welsh-Powell',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.colors.background,
        zIndex: 1000,
        overflow: 'auto',
        padding: '1rem',
      }}
    >
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          padding: '1rem 1.5rem',
          background: theme.colors.surface,
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: theme.shadows.md,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <h2 
              onClick={() => window.location.reload()}
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: theme.colors.primary,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
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
              <FaChartBar />
              Algorithm Comparison
            </h2>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            {/* Navigation Buttons */}
            <button
              onClick={onNavigateHome}
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
              onClick={onNavigateBack}
              disabled={!canGoBack}
              style={{
                padding: '0.5rem',
                borderRadius: theme.borderRadius.md,
                background: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                cursor: !canGoBack ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                opacity: !canGoBack ? 0.5 : 1,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (canGoBack) {
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
              onClick={onNavigateForward}
              disabled={!canGoForward}
              style={{
                padding: '0.5rem',
                borderRadius: theme.borderRadius.md,
                background: theme.colors.surface,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                cursor: !canGoForward ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                opacity: !canGoForward ? 0.5 : 1,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (canGoForward) {
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
            <button
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: theme.borderRadius.md,
                background: theme.colors.background,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = theme.colors.error;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = theme.colors.error;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.colors.background;
                e.currentTarget.style.color = theme.colors.text;
                e.currentTarget.style.borderColor = theme.colors.border;
              }}
            >
              <FaTimes />
              Close
            </button>
          </div>
        </div>

        {/* Unified Controls */}
        <div style={{
          marginBottom: '1.5rem',
          padding: '1.5rem',
          background: theme.colors.surface,
          borderRadius: theme.borderRadius.md,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: theme.shadows.md,
        }}>
          <ControlPanel
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onStep={handleStep}
            onReset={handleReset}
            onSpeedChange={handleSpeedChange}
            speed={speed}
            theme={theme}
            onExport={() => {}}
            canEdit={false}
          />
          
          {/* Progress */}
          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: `1px solid ${theme.colors.border}`,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}>
              <span style={{
                fontSize: '0.875rem',
                color: theme.colors.text,
                fontWeight: 500,
              }}>
                Progress
              </span>
              <span style={{
                fontSize: '0.875rem',
                color: theme.colors.textSecondary,
              }}>
                {currentIndex} / {vertices.length} vertices
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: theme.colors.border,
              borderRadius: theme.borderRadius.sm,
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${(currentIndex / vertices.length) * 100}%`,
                height: '100%',
                background: theme.colors.primary,
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        </div>

        <div 
          className="grid-2-col comparison-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '1.5rem',
          }}
        >
          {/* Algorithm Stats Sidebar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: theme.colors.text,
              marginBottom: '0.5rem',
            }}>
              Algorithm Performance
            </h3>
            {algorithms.map(algorithm => {
              const stats = algorithmStats[algorithm] || { totalColors: 0, conflicts: 0 };
              return (
                <motion.div
                  key={algorithm}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => setSelectedAlgorithm(selectedAlgorithm === algorithm ? null : algorithm)}
                  style={{
                    padding: '1rem',
                    background: selectedAlgorithm === algorithm ? theme.colors.primary : theme.colors.surface,
                    color: selectedAlgorithm === algorithm ? 'white' : theme.colors.text,
                    borderRadius: theme.borderRadius.md,
                    border: `2px solid ${selectedAlgorithm === algorithm ? theme.colors.primary : theme.colors.border}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: theme.shadows.sm,
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      margin: 0,
                    }}>
                      {algorithmNames[algorithm]}
                    </h4>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    opacity: selectedAlgorithm === algorithm ? 1 : 0.8,
                  }}>
                    <div>
                      <span style={{ opacity: 0.7 }}>Colors:</span>
                      <strong style={{ marginLeft: '0.25rem' }}>
                        {stats.totalColors}
                      </strong>
                    </div>
                    <div>
                      <span style={{ opacity: 0.7 }}>Conflicts:</span>
                      <strong style={{ marginLeft: '0.25rem' }}>
                        {stats.conflicts}
                      </strong>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Unified Graph Visualization */}
          <div style={{
            background: theme.colors.surface,
            borderRadius: theme.borderRadius.lg,
            padding: '1.5rem',
            border: `1px solid ${theme.colors.border}`,
            boxShadow: theme.shadows.lg,
            minHeight: '600px',
          }}>
            {selectedAlgorithm ? (
              <>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: theme.colors.text,
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}>
                  {algorithmNames[selectedAlgorithm]} Visualization
                </h3>
                <GraphVisualization
                  vertices={vertices}
                  edges={edges}
                  algorithm={selectedAlgorithm}
                  currentIndex={currentIndex}
                  isPlaying={isPlaying}
                  speed={speed}
                  theme={theme}
                  onColorUpdate={() => {}}
                  onConflictsUpdate={() => {}}
                />
              </>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: theme.colors.textSecondary,
                textAlign: 'center',
              }}>
                <FaChartBar style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }} />
                <p style={{ fontSize: '1.125rem', margin: 0 }}>
                  Select an algorithm from the sidebar to view its visualization
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonView;
