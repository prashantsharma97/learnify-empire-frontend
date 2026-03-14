import React from 'react';
import Card from '../../../components/ui/Card';
import ProgressBar from '../../../components/ui/ProgressBar';
import Button from '../../../components/ui/Button';
import Stats from '../../../components/ui/Stats';
import { BookOpen, Clock, Trophy, CheckCircle } from 'lucide-react';
import { UserContext } from '../../../components/context/UserContext';

const StudentDashboard: React.FC = () => {
  // Mock data
  const courses = [
    {
      id: 1,
      title: "Advanced Web Development",
      instructor: "Jane Smith",
      progress: 75,
      thumbnail: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      title: "UX/UI Design Fundamentals",
      instructor: "John Doe",
      progress: 45,
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "Data Science Bootcamp",
      instructor: "Alex Johnson",
      progress: 20,
      thumbnail: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
  ];

  const activities = [
    { id: 1, title: "Completed Module 3 in Advanced Web Development", time: "2 hours ago" },
    { id: 2, title: "Submitted assignment for UX/UI Design Fundamentals", time: "Yesterday" },
    { id: 3, title: "Earned certificate in JavaScript Basics", time: "3 days ago" },
    { id: 4, title: "Started Data Science Bootcamp", time: "1 week ago" },
  ];

  const { user } = React.useContext(UserContext);

  return (

    <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out">
      <div>
        <h1 className="text-3xl font-bold translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out mb-8"> {user?.role}'s Overview</h1>
        <p className="text-gray-400 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out mb-4">Welcome back, here’s what’s happening with your learning journey.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stats
          value="3"
          label="Enrolled Courses"
          icon={<BookOpen className="h-6 w-6 text-student-primary" />}
          variant="student"
        />
        <Stats
          value="47%"
          label="Overall Progress"
          icon={<CheckCircle className="h-6 w-6 text-student-primary" />}
          variant="student"
          trend={{ value: 12, label: "from last week" }}
        />
        <Stats
          value="26h"
          label="Learning Hours"
          icon={<Clock className="h-6 w-6 text-student-primary" />}
          variant="student"
          trend={{ value: 8, label: "from last week" }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card variant="student">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Your Courses</h2>
            <Button variant="student" size="sm">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-dark-200 rounded-xl overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-medium mb-1">{course.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">Instructor: {course.instructor}</p>
                  <ProgressBar
                    value={course.progress}
                    variant="student"
                    size="sm"
                  />
                  <Button
                    variant="student"
                    size="sm"
                    className="mt-3 w-full"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card variant="student">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Overall Progress</h2>
              </div>
              <div className="space-y-6">
                {courses.map(course => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white">{course.title}</h3>
                      <span className="text-sm text-gray-400">{course.progress}%</span>
                    </div>
                    <ProgressBar
                      value={course.progress}
                      variant="student"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div>
            <Card variant="student">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              </div>
              <div className="space-y-4">
                {activities.map(activity => (
                  <div
                    key={activity.id}
                    className="border-l-2 border-student-primary pl-3 py-1"
                  >
                    <p className="text-white text-sm">{activity.title}</p>
                    <p className="text-gray-400 text-xs">{activity.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;