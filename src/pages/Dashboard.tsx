import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 }
];

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background-dark flex">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out`}
      >
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
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-white rounded-lg bg-neon-blue/10 border border-neon-blue/30
                           hover:bg-neon-blue/20 transition-all duration-300"
                >
                  <LayoutDashboard className="w-5 h-5 mr-3 text-neon-blue" />
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300"
                >
                  <BookOpen className="w-5 h-5 mr-3" />
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-3" />
                  Students
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300"
                >
                  <DollarSign className="w-5 h-5 mr-3" />
                  Revenue
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Settings
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-purple/10 
                             hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    Settings
                  </a>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-3 text-gray-400 rounded-lg hover:bg-neon-pink/10 
                             hover:text-white hover:border hover:border-neon-pink/30 transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 right-4 md:hidden z-50 w-10 h-10 rounded-lg bg-glass-dark backdrop-blur-sm 
                   border border-neon-blue/30 flex items-center justify-center text-neon-blue"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

          {/* Stats Grid */}
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

          {/* Revenue Chart */}
          <div className="bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6 mb-8
                       hover:border-neon-blue/40 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6">Revenue Overview</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F6FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00F6FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      border: '1px solid rgba(0, 246, 255, 0.2)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#00F6FF"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Courses */}
          <div className="bg-glass-dark backdrop-blur-sm border border-neon-purple/20 rounded-lg p-6
                       hover:border-neon-purple/40 hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-6">Recent Courses</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-neon-purple/20">
                    <th className="pb-4 font-medium">Course</th>
                    <th className="pb-4 font-medium">Students</th>
                    <th className="pb-4 font-medium">Rating</th>
                    <th className="pb-4 font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-neon-purple/10">
                    <td className="py-4">Advanced Web Development</td>
                    <td className="py-4">234</td>
                    <td className="py-4 flex items-center">
                      4.8
                      <Star className="w-4 h-4 text-neon-pink ml-1 inline" />
                    </td>
                    <td className="py-4">$12,500</td>
                  </tr>
                  <tr className="border-b border-neon-purple/10">
                    <td className="py-4">UI/UX Design Masterclass</td>
                    <td className="py-4">189</td>
                    <td className="py-4 flex items-center">
                      4.9
                      <Star className="w-4 h-4 text-neon-pink ml-1 inline" />
                    </td>
                    <td className="py-4">$8,900</td>
                  </tr>
                  <tr>
                    <td className="py-4">Digital Marketing 101</td>
                    <td className="py-4">156</td>
                    <td className="py-4 flex items-center">
                      4.7
                      <Star className="w-4 h-4 text-neon-pink ml-1 inline" />
                    </td>
                    <td className="py-4">$6,700</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;