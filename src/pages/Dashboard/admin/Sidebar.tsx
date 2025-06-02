import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  DollarSign,
  Settings,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  return (
    <aside className="fixed md:relative md:translate-x-0 z-40 w-64 h-full-screen transition-transform duration-300 ease-in-out">
      <div className="h-full bg-glass-dark backdrop-blur-sm border-r border-neon-blue/20 p-4 flex flex-col">
        {/* Logo */}
        <Link to="/" className="flex items-center mb-8 px-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Learnify
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link to="/admin"
                className="flex items-center px-4 py-3 text-white rounded-lg bg-neon-blue/10 border border-neon-blue/30
                           hover:bg-neon-blue/20 transition-all duration-300"
              >
                <LayoutDashboard className="w-5 h-5 mr-3 text-neon-blue" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300"
              >
                <BookOpen className="w-5 h-5 mr-3" />
                Users
              </Link>
            </li>
            <li>
              <Link
                 to="/admin/analytics"
                className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-3" />
                Analytics
              </Link>
            </li>
            <li>
              <Link
                 to="/admin/revenue"
                className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300"
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Revenue
              </Link>
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Settings
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                   to="/admin/settings"
                  className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={onLogout}
                  className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-pink/10 
                           hover:text-white hover:border hover:border-neon-pink/30 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
