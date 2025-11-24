import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlay, 
  FaPause, 
  FaStepForward, 
  FaRedo, 
  FaDownload,
  FaEdit
} from 'react-icons/fa';

const ControlPanel = ({
  isPlaying,
  onPlayPause,
  onStep,
  onReset,
  onSpeedChange,
  speed,
  theme,
  onExport,
  onEditGraph,
  canEdit
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="control-panel"
      style={{
        padding: '1.5rem',
        borderRadius: theme.borderRadius.md,
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: theme.shadows.lg,
      }}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem' 
      }}>
        {/* Main Controls */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <button
            onClick={onPlayPause}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: theme.borderRadius.md,
              background: theme.colors.primary,
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: theme.shadows.md,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = theme.colors.primaryDark;
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = theme.colors.primary;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <button
            onClick={onStep}
            disabled={isPlaying}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: theme.borderRadius.md,
              background: theme.colors.secondary,
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: theme.shadows.md,
              opacity: isPlaying ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isPlaying) {
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <FaStepForward />
            Step
          </button>
          
          <button
            onClick={onReset}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: theme.borderRadius.md,
              background: theme.colors.textSecondary,
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: theme.shadows.md,
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <FaRedo />
            Reset
          </button>
        </div>
        
        {/* Speed Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ 
            fontSize: '0.875rem',
            color: theme.colors.text,
            fontWeight: 500,
            minWidth: '60px'
          }}>
            Speed:
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            style={{
              flex: 1,
              height: '6px',
              borderRadius: '3px',
              background: theme.colors.border,
              outline: 'none',
            }}
          />
          <span style={{ 
            fontSize: '0.875rem',
            color: theme.colors.textSecondary,
            minWidth: '40px',
            textAlign: 'right'
          }}>
            {speed}x
          </span>
        </div>
        
        {/* Utility Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '0.75rem', 
          flexWrap: 'wrap',
          paddingTop: '0.75rem',
          borderTop: `1px solid ${theme.colors.border}`
        }}>
          {canEdit && (
            <button
              onClick={onEditGraph}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: theme.borderRadius.md,
                background: theme.colors.background,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <FaEdit />
              Edit Graph
            </button>
          )}
          
          <button
            onClick={onExport}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: theme.borderRadius.md,
              background: theme.colors.background,
              color: theme.colors.text,
              border: `1px solid ${theme.colors.border}`,
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <FaDownload />
            Export
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ControlPanel;

