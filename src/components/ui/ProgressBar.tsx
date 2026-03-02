import React from 'react';

interface ProgressBarProps {
  value: number;
  variant?: 'student' | 'instructor' | 'admin';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  variant = 'student', 
  label,
  size = 'md'
}) => {
  const getVariantColors = () => {
    switch (variant) {
      case 'student':
        return 'from-neon-blue via-neon-purple to-neon-pink ';
      case 'instructor':
        return 'from-neon-blue via-neon-purple to-neon-pink ';
      case 'admin':
        return 'from-neon-blue via-neon-purple to-neon-pink ';
      default:
        return 'from-neon-blue via-neon-purple to-neon-pink ';
    }
  };

  

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'md':
        return 'h-2';
      case 'lg':
        return 'h-3';
      default:
        return 'h-2';
    }
  };

  return (
    <div className="w-full">
      {label && <div className="text-sm text-gray-300 mb-1">{label}</div>}
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${getSizeClasses()}`}>
        <div 
          className={`bg-gradient-to-r ${getVariantColors()} rounded-full ${getSizeClasses()}`} 
          style={{ width: `${value}%` }}
        />
      </div>
      <div className="text-xs text-gray-400 mt-1">{value}% Complete</div>
    </div>
  );
};

export default ProgressBar;