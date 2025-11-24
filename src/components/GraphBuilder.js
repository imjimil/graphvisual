import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const GraphBuilder = ({ onGraphChange, onGraphChangeAndCompare, initialVertices, initialEdges, theme, onClose }) => {
  const [vertices, setVertices] = useState(initialVertices || []);
  const [edges, setEdges] = useState(initialEdges || []);
  const [newVertexId, setNewVertexId] = useState('');
  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');

  const handleAddVertex = () => {
    if (newVertexId && !vertices.includes(newVertexId)) {
      setVertices([...vertices, newVertexId]);
      setNewVertexId('');
    }
  };

  const handleRemoveVertex = (vertexId) => {
    setVertices(vertices.filter(v => v !== vertexId));
    setEdges(edges.filter(e => e.source !== vertexId && e.target !== vertexId));
  };

  const handleAddEdge = () => {
    if (edgeSource && edgeTarget && edgeSource !== edgeTarget) {
      const edgeExists = edges.some(
        e => (e.source === edgeSource && e.target === edgeTarget) ||
             (e.source === edgeTarget && e.target === edgeSource)
      );
      if (!edgeExists) {
        setEdges([...edges, { source: edgeSource, target: edgeTarget }]);
        setEdgeSource('');
        setEdgeTarget('');
      }
    }
  };

  const handleRemoveEdge = (index) => {
    setEdges(edges.filter((_, i) => i !== index));
  };

  const handleSave = (goToComparison = false) => {
    if (goToComparison && onGraphChangeAndCompare) {
      onGraphChangeAndCompare({ vertices, edges });
    } else {
      onGraphChange({ vertices, edges });
    }
    onClose();
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
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.colors.surface,
          borderRadius: theme.borderRadius.lg,
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: theme.shadows.xl,
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ 
            color: theme.colors.text,
            fontSize: '1.5rem',
            fontWeight: 700
          }}>
            Graph Builder
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.colors.textSecondary,
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Add Vertex */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            color: theme.colors.text,
            marginBottom: '1rem',
            fontSize: '1rem',
            fontWeight: 600
          }}>
            Vertices
          </h3>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginBottom: '1rem' 
          }}>
            <input
              type="text"
              value={newVertexId}
              onChange={(e) => setNewVertexId(e.target.value.toUpperCase())}
              placeholder="Vertex ID (e.g., A, B, C)"
              maxLength={1}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: theme.borderRadius.md,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.background,
                color: theme.colors.text,
                fontSize: '0.875rem',
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleAddVertex()}
            />
            <button
              onClick={handleAddVertex}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: theme.borderRadius.md,
                background: theme.colors.primary,
                color: 'white',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <FaPlus />
              Add
            </button>
          </div>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem' 
          }}>
            {vertices.map(vertex => (
              <div
                key={vertex}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: theme.borderRadius.md,
                  background: theme.colors.primary,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                }}
              >
                {vertex}
                <button
                  onClick={() => handleRemoveVertex(vertex)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <FaTrash style={{ fontSize: '0.75rem' }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add Edge */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ 
            color: theme.colors.text,
            marginBottom: '1rem',
            fontSize: '1rem',
            fontWeight: 600
          }}>
            Edges
          </h3>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginBottom: '1rem' 
          }}>
            <select
              value={edgeSource}
              onChange={(e) => setEdgeSource(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: theme.borderRadius.md,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.background,
                color: theme.colors.text,
                fontSize: '0.875rem',
              }}
            >
              <option value="">From</option>
              {vertices.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <span style={{ 
              color: theme.colors.textSecondary,
              display: 'flex',
              alignItems: 'center'
            }}>
              →
            </span>
            <select
              value={edgeTarget}
              onChange={(e) => setEdgeTarget(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: theme.borderRadius.md,
                border: `1px solid ${theme.colors.border}`,
                background: theme.colors.background,
                color: theme.colors.text,
                fontSize: '0.875rem',
              }}
            >
              <option value="">To</option>
              {vertices.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
            <button
              onClick={handleAddEdge}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: theme.borderRadius.md,
                background: theme.colors.secondary,
                color: 'white',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <FaPlus />
              Add
            </button>
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '0.5rem',
            maxHeight: '200px',
            overflow: 'auto',
          }}>
            {edges.map((edge, index) => (
              <div
                key={index}
                style={{
                  padding: '0.75rem',
                  borderRadius: theme.borderRadius.md,
                  background: theme.colors.background,
                  border: `1px solid ${theme.colors.border}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ 
                  color: theme.colors.text,
                  fontWeight: 500
                }}>
                  {edge.source} → {edge.target}
                </span>
                <button
                  onClick={() => handleRemoveEdge(index)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: theme.colors.error,
                    cursor: 'pointer',
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          justifyContent: 'flex-end',
          flexWrap: 'wrap',
        }}>
          <button
            onClick={onClose}
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
              e.currentTarget.style.background = theme.colors.error;
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.borderColor = theme.colors.error;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.colors.surface;
              e.currentTarget.style.color = theme.colors.text;
              e.currentTarget.style.borderColor = theme.colors.border;
            }}
          >
            Cancel
          </button>
          {onGraphChangeAndCompare && (
            <button
              onClick={() => handleSave(true)}
              disabled={vertices.length === 0}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: theme.borderRadius.md,
                background: theme.colors.secondary,
                color: 'white',
                border: 'none',
                fontWeight: 600,
                cursor: vertices.length === 0 ? 'not-allowed' : 'pointer',
                opacity: vertices.length === 0 ? 0.5 : 1,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (vertices.length > 0) {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = vertices.length === 0 ? 0.5 : 1;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaCheck />
              Save & Compare
            </button>
          )}
          <button
            onClick={() => handleSave(false)}
            disabled={vertices.length === 0}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: theme.borderRadius.md,
              background: theme.colors.success,
              color: 'white',
              border: 'none',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: vertices.length === 0 ? 'not-allowed' : 'pointer',
              opacity: vertices.length === 0 ? 0.5 : 1,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (vertices.length > 0) {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = vertices.length === 0 ? 0.5 : 1;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <FaCheck />
            Save & Visualize
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GraphBuilder;

