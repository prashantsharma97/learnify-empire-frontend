import React from 'react';
import { BarChart3, Users, TrendingUp, Clock } from 'lucide-react';

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6
                         hover:border-neon-blue/40 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300">
        <div className="flex items-center">
          <div className="p-2 bg-neon-blue/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-neon-blue" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-400">Total Revenue</p>
            <p className="text-2xl font-bold">$24,500</p>
          </div>
        </div>
      </div>

      <div className="bg-glass-dark backdrop-blur-sm border border-neon-purple/20 rounded-lg p-6
                         hover:border-neon-purple/40 hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300">
        <div className="flex items-center">
          <div className="p-2 bg-neon-purple/10 rounded-lg">
            <Users className="w-6 h-6 text-neon-purple" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-400">Total Students</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
        </div>
      </div>

      <div className="bg-glass-dark backdrop-blur-sm border border-neon-pink/20 rounded-lg p-6
                         hover:border-neon-pink/40 hover:shadow-lg hover:shadow-neon-pink/20 transition-all duration-300">
        <div className="flex items-center">
          <div className="p-2 bg-neon-pink/10 rounded-lg">
            <TrendingUp className="w-6 h-6 text-neon-pink" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-400">Course Sales</p>
            <p className="text-2xl font-bold">+86%</p>
          </div>
        </div>
      </div>

      <div className="bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6
                         hover:border-neon-blue/40 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300">
        <div className="flex items-center">
          <div className="p-2 bg-neon-blue/10 rounded-lg">
            <Clock className="w-6 h-6 text-neon-blue" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-400">Avg. Watch Time</p>
            <p className="text-2xl font-bold">2.5hrs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
