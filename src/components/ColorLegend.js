import React from 'react';
import { motion } from 'framer-motion';

const ColorLegend = ({ colors, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="color-legend"
      style={{
        padding: '1rem',
        borderRadius: theme.borderRadius.md,
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadows.md,
      }}
    >
      <h4 style={{ 
        marginBottom: '0.75rem', 
        fontSize: '0.875rem',
        fontWeight: 600,
        color: theme.colors.text 
      }}>
        Color Legend
      </h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {colors.map((color, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.5rem',
              borderRadius: theme.borderRadius.sm,
              background: theme.colors.background,
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: color,
                border: `2px solid ${theme.colors.border}`,
              }}
            />
            <span style={{ 
              fontSize: '0.75rem',
              color: theme.colors.textSecondary 
            }}>
              Color {index + 1}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ColorLegend;

