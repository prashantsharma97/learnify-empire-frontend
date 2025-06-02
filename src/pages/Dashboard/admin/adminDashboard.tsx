import React from 'react'
import DashboardStats from '../admin/DashboardStats';
import RevenueChart from '../admin/RevenueChart';
import RecentCourses from '../admin/RecentCourses';

const adminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out mb-8">Dashboard Overview</h1>
      <DashboardStats />
      <RevenueChart />
      <RecentCourses />
    </div>
  )
}

export default adminDashboard
