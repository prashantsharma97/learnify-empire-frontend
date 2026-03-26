import React from 'react';
import RevenueChart from './RevenueChart';
import RecentCourses from './RecentCourses';
// import { Menu, X } from 'lucide-react';
import { UserContext } from '../../../components/context/UserContext';

const instructorDashboard: React.FC = () => {

  const { user } = React.useContext(UserContext);
  return (
    <div>
      <h1 className="text-3xl font-bold translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out mb-8">{user?.role} Overview</h1>
      <RevenueChart />
      <RecentCourses />
    </div>
  );
};

export default instructorDashboard;
