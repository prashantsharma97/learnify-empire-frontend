import React from 'react';
import DashboardStats from './DashboardStats';
import RevenueChart from './RevenueChart';
import RecentCourses from './RecentCourses';
// import { Menu, X } from 'lucide-react';

const instructorDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out mb-8">Instructor Overview</h1>
      <DashboardStats />
      <RevenueChart />
      <RecentCourses />
    </div>
  );
};

export default instructorDashboard;
