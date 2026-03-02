import { TrendingUp, TrendingDown } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: JSX.Element;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
};

const StatsCard = ({ title, value, icon, trend, className = "" }: StatsCardProps) => {
  return (
    <div className={`glass-card p-6 hover-glow bg-glass-dark backdrop-blur-sm bg-glass-dark border border-neon-blue/30 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300  ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl text-white">{icon}</div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend.isPositive ? "text-neon-green" : "text-neon-magenta"
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-2xl font-bold text-white font-orbitron">{value}</p>
        <p className="text-gray-400 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
