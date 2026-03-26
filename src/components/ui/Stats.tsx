import React, { ReactNode } from 'react';

interface StatsProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  variant?: 'student' | 'instructor' | 'admin';
  trend?: {
    value: number;
    label: string;
  };
}

const Stats: React.FC<StatsProps> = ({ 
  value, 
  label, 
  icon,
  variant = 'student',
  trend
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'student':
        return 'text-student-primary';
      case 'instructor':
        return 'text-instructor-primary';
      case 'admin':
        return 'text-admin-primary';
      default:
        return 'text-student-primary';
    }
  };

  const getTrendClasses = () => {
    if (!trend) return '';
    return trend.value >= 0 
      ? 'text-green-400' 
      : 'text-red-400';
  };

  return (
    <div className="card glass flex items-start gap-4 p-5">
      {icon && (
        <div className={`p-3 rounded-lg bg-opacity-50 ${getVariantClasses()} bg-neon-purple`}>
          {icon}
        </div>
      )}
      <div>
        <div className="text-2xl font-semibold text-white">{value}</div>
        <div className="text-gray-400 text-sm">{label}</div>
        {trend && (
          <div className={`text-xs mt-2 flex items-center ${getTrendClasses()}`}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;