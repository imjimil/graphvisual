import React from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const StatsPanel = ({ totalUsedColors, conflicts, theme }) => {
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="stats-panel"
      style={{
        padding: '1.25rem',
        borderRadius: theme.borderRadius.md,
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadows.md,
      }}
    >
      <h4 style={{ 
        marginBottom: '1rem', 
        fontSize: '1rem',
        fontWeight: 600,
        color: theme.colors.text 
      }}>
        Statistics
      </h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FaPalette style={{ color: theme.colors.primary, fontSize: '1.25rem' }} />
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontSize: '0.75rem',
              color: theme.colors.textSecondary,
              marginBottom: '0.25rem'
            }}>
              Colors Used
            </div>
            <div style={{ 
              fontSize: '1.5rem',
              fontWeight: 700,
              color: theme.colors.text
            }}>
              {totalUsedColors}
            </div>
          </div>
        </div>
        
        
        {conflicts > 0 && (
          <div style={{ 
            fontSize: '0.875rem',
            color: theme.colors.error,
            padding: '0.5rem',
            borderRadius: theme.borderRadius.sm,
            background: `${theme.colors.error}15`,
          }}>
            ⚠️ {conflicts} color conflict{conflicts !== 1 ? 's' : ''} detected
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatsPanel;

