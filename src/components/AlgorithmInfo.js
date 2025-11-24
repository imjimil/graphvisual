import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle, FaChevronDown } from 'react-icons/fa';

const algorithmDescriptions = {
  firstfit: {
    name: 'First Fit',
    description: 'A greedy algorithm that colors each vertex with the first available color that is not used by any of its adjacent vertices.',
    steps: [
      'Process vertices in the order they appear',
      'For each vertex, check colors of adjacent vertices',
      'Assign the first color not used by any neighbor',
      'Continue until all vertices are colored'
    ],
    complexity: 'Time: O(V + E), Space: O(V)',
    advantages: ['Simple and fast', 'Easy to implement', 'Good for online algorithms'],
    disadvantages: ['May not use optimal number of colors', 'Order-dependent results']
  },
  CBIP: {
    name: 'CBIP (Color-Based Incremental Processing)',
    description: 'A variant of First Fit that processes vertices sorted by degree (number of connections), starting with highest degree vertices.',
    steps: [
      'Sort vertices by degree (descending)',
      'Process highest degree vertices first',
      'For each vertex, assign first available color',
      'Continue until all vertices are colored'
    ],
    complexity: 'Time: O(V log V + E), Space: O(V)',
    advantages: ['Often uses fewer colors', 'Better for dense graphs', 'Degree-based ordering'],
    disadvantages: ['Slightly more complex', 'Requires sorting step']
  },
  greedy: {
    name: 'Greedy (Degree-based)',
    description: 'Colors vertices in order of decreasing degree, assigning the smallest available color to each vertex.',
    steps: [
      'Sort vertices by degree (descending)',
      'Process vertices in sorted order',
      'Assign smallest available color',
      'Continue until all vertices are colored'
    ],
    complexity: 'Time: O(V log V + E), Space: O(V)',
    advantages: ['Often optimal for many graphs', 'Degree-based heuristic', 'Well-studied algorithm'],
    disadvantages: ['Not always optimal', 'Requires sorting']
  },
  welshpowell: {
    name: 'Welsh-Powell',
    description: 'A graph coloring algorithm that orders vertices by degree and uses a systematic approach to minimize color usage.',
    steps: [
      'Sort vertices by degree (descending)',
      'Color first vertex with color 1',
      'For remaining vertices, use lowest color not used by neighbors',
      'Continue until all vertices are colored'
    ],
    complexity: 'Time: O(V² + E), Space: O(V)',
    advantages: ['Proven upper bound', 'Systematic approach', 'Good for many graph types'],
    disadvantages: ['May be slower', 'Not always optimal']
  }
};

const AlgorithmInfo = ({ algorithm, theme }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const info = algorithmDescriptions[algorithm] || algorithmDescriptions.firstfit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="algorithm-info"
      style={{
        borderRadius: theme.borderRadius.md,
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadows.md,
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: theme.colors.text,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FaInfoCircle style={{ color: theme.colors.primary, fontSize: '1.25rem' }} />
          <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Algorithm Information</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown style={{ color: theme.colors.textSecondary }} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <h4 style={{ 
                marginBottom: '0.5rem',
                color: theme.colors.text,
                fontSize: '1rem',
                fontWeight: 600
              }}>
                {info.name}
              </h4>
              <p style={{ 
                marginBottom: '1rem',
                color: theme.colors.textSecondary,
                fontSize: '0.875rem',
                lineHeight: '1.5'
              }}>
                {info.description}
              </p>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ 
                  color: theme.colors.text,
                  fontSize: '0.875rem',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}>
                  Steps:
                </strong>
                <ol style={{ 
                  paddingLeft: '1.25rem',
                  color: theme.colors.textSecondary,
                  fontSize: '0.875rem',
                  lineHeight: '1.75'
                }}>
                  {info.steps.map((step, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{step}</li>
                  ))}
                </ol>
              </div>
              
              <div style={{ 
                padding: '0.75rem',
                borderRadius: theme.borderRadius.sm,
                background: theme.colors.background,
                fontSize: '0.75rem',
                color: theme.colors.textSecondary,
                marginBottom: '0.75rem'
              }}>
                <strong>Complexity:</strong> {info.complexity}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <strong style={{ 
                    color: theme.colors.success,
                    fontSize: '0.75rem',
                    display: 'block',
                    marginBottom: '0.25rem'
                  }}>
                    Advantages:
                  </strong>
                  <ul style={{ 
                    paddingLeft: '1rem',
                    fontSize: '0.75rem',
                    color: theme.colors.textSecondary
                  }}>
                    {info.advantages.map((adv, idx) => (
                      <li key={idx}>{adv}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong style={{ 
                    color: theme.colors.warning,
                    fontSize: '0.75rem',
                    display: 'block',
                    marginBottom: '0.25rem'
                  }}>
                    Disadvantages:
                  </strong>
                  <ul style={{ 
                    paddingLeft: '1rem',
                    fontSize: '0.75rem',
                    color: theme.colors.textSecondary
                  }}>
                    {info.disadvantages.map((dis, idx) => (
                      <li key={idx}>{dis}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AlgorithmInfo;

