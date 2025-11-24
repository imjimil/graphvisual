import React, { useState, useEffect, useCallback, useRef } from 'react';
import GraphVisualization from './GraphVisualization';
import ControlPanel from './ControlPanel';
import StatsPanel from './StatsPanel';
import ColorLegend from './ColorLegend';
import AlgorithmInfo from './AlgorithmInfo';
import { colorList } from '../styles/theme';

const AlgorithmVisualizer = ({
  vertices,
  edges,
  algorithm,
  theme,
  onExport,
  onEditGraph,
  canEdit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [totalUsedColors, setTotalUsedColors] = useState(0);
  const [conflicts, setConflicts] = useState(0);
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
    setTotalUsedColors(0);
    setConflicts(0);
  }, []);

  const handleSpeedChange = useCallback((newSpeed) => {
    setSpeed(newSpeed);
  }, []);

  const handleExport = useCallback(() => {
    if (onExport) {
      onExport();
    } else {
      // Default export functionality
      const svg = document.querySelector('svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `graph-${algorithm}-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
          });
        };
        
        img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      }
    }
  }, [algorithm, onExport]);

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

  const usedColors = colorList.slice(0, totalUsedColors);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      padding: '1.5rem',
      minHeight: '100vh',
      background: theme.colors.background,
    }}>
      {/* Header Section */}
      <div 
        className="grid-2-col"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
        }}
      >
        <ControlPanel
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onStep={handleStep}
          onReset={handleReset}
          onSpeedChange={handleSpeedChange}
          speed={speed}
          theme={theme}
          onExport={handleExport}
          onEditGraph={onEditGraph}
          canEdit={canEdit}
        />
        <StatsPanel
          totalUsedColors={totalUsedColors}
          conflicts={conflicts}
          theme={theme}
        />
      </div>

      {/* Graph and Info Section */}
      <div 
        className="grid-2-col"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '1.5rem',
        }}
      >
        <div style={{
          background: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          padding: '1.5rem',
          boxShadow: theme.shadows.lg,
          minHeight: '500px',
        }}>
          <GraphVisualization
            vertices={vertices}
            edges={edges}
            algorithm={algorithm}
            currentIndex={currentIndex}
            isPlaying={isPlaying}
            speed={speed}
            theme={theme}
            onColorUpdate={setTotalUsedColors}
            onConflictsUpdate={setConflicts}
          />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <ColorLegend colors={usedColors} theme={theme} />
          <AlgorithmInfo algorithm={algorithm} theme={theme} />
        </div>
      </div>

      {/* Progress Indicator */}
      <div style={{
        padding: '1rem',
        background: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border}`,
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
  );
};

export default AlgorithmVisualizer;

