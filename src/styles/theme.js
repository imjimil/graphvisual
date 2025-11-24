// Professional academic color scheme with improved dark mode
export const lightTheme = {
  colors: {
    primary: '#2563eb', // Professional blue
    primaryDark: '#1e40af',
    secondary: '#7c3aed', // Professional purple
    success: '#059669', // Professional green
    warning: '#d97706', // Professional orange
    error: '#dc2626', // Professional red
    background: '#f8fafc', // Soft off-white
    surface: '#ffffff',
    text: '#1e293b', // Deep slate
    textSecondary: '#64748b', // Muted slate
    border: '#e2e8f0', // Light gray
    nodeDefault: '#cbd5e1', // Light gray
    nodeHighlight: '#3b82f6', // Bright blue
  },
  gradients: {
    primary: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    secondary: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
    background: 'linear-gradient(to bottom, #f0f4f8 0%, #e2e8f0 100%)', // Minimal professional gradient
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
};

export const darkTheme = {
  colors: {
    primary: '#60a5fa', // Bright blue for dark mode
    primaryDark: '#3b82f6',
    secondary: '#a78bfa', // Bright purple
    success: '#34d399', // Bright green
    warning: '#fbbf24', // Bright yellow-orange
    error: '#f87171', // Bright red
    background: '#0f172a', // Deep dark blue
    surface: '#1e293b', // Slate surface
    text: '#f1f5f9', // Very light text
    textSecondary: '#cbd5e1', // Light gray text
    border: '#334155', // Medium slate border
    nodeDefault: '#475569', // Medium slate
    nodeHighlight: '#60a5fa', // Bright blue highlight
  },
  gradients: {
    primary: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
    secondary: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)',
    background: 'linear-gradient(to bottom, #0f172a 0%, #1e293b 100%)', // Subtle dark gradient
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.6)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.7)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.8)',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
};

export const colorList = [
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Orange
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange-red
  '#6366f1', // Indigo
];
