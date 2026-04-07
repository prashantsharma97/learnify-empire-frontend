import React from 'react';
import Card from '../../../components/ui/Card';
import ProgressBar from '../../../components/ui/ProgressBar';
import Button from '../../../components/ui/Button';
import Stats from '../../../components/ui/Stats';
import { BookOpen, Clock, Trophy, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getEnrolledCourseById } from '../../../apiComponents/apiService.jsx';
import { getUserInfo } from "../../../components/localStorage/LocalStorage.js";


const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const userId = userInfo?.id;

  const [courses, setCourses] = React.useState<any[]>([]);  // Explicit type for courses
  const [loading, setLoading] = React.useState<boolean>(true);  // Loading state for courses

  React.useEffect(() => {
    // Fetch courses from API
    const fetchCourses = async () => {
      try {
        const studentId = userId;
        console.log(studentId);
        const response = await getEnrolledCourseById(studentId);

        // Check the response data structure
        console.log(response.data);

        if (response.data && response.data.courses) {
          setCourses(response.data.courses);  // Set courses only if they exist
        } else {
          setCourses([]);  // If no courses found
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);  // Handle the case where API fails
      } finally {
        setLoading(false);  // Stop loading after the API call finishes
      }
    };

    fetchCourses();
  }, [userId]);  // Trigger effect when user id changes

  const activities = [
    { id: 1, title: "Completed Module 3 in Advanced Web Development", time: "2 hours ago" },
    { id: 2, title: "Submitted assignment for UX/UI Design Fundamentals", time: "Yesterday" },
    { id: 3, title: "Earned certificate in JavaScript Basics", time: "3 days ago" },
    { id: 4, title: "Started Data Science Bootcamp", time: "1 week ago" },
  ];

  // Show loading message until data is fetched
  if (loading) {
    return <p className="text-white">Loading courses...</p>;
  }


  return (
    <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out">
      <div>
        <h1 className="text-3xl font-bold translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out mb-8">
          {userInfo?.role?.charAt(0).toUpperCase() + userInfo?.role?.slice(1)}'s Overview        </h1>
        <p className="text-gray-400 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out mb-4">
          Welcome back, here’s what’s happening with your learning journey.
        </p>
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
            <Button className="rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white" variant="student" size="sm" onClick={() => navigate('/dashboard/student/my-course')}>View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses && courses.length > 0 ? (
              courses.slice(0, 3).map((i) => (
                <div key={i.id} className="bg-dark-200 rounded-xl overflow-hidden border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10 bg-glass-dark backdrop-blur-sm">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={i.thumbnail}
                      alt={i.title}
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-medium mb-1">{i.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">Instructor: {i.instructor}</p>
                    <ProgressBar value={i.progress || 0} variant="student" size="sm" />
                    <Button
                      variant="student"
                      size="sm"
                      className="mt-3 w-full py-3 mt-3 w-full rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                      onClick={() => navigate(`/dashboard/student/my-course/${i.id}`)}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white"> You haven't enrolled in any courses yet. </p>
            )}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card variant="student">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Overall Progress</h2>
              </div>
              <div className="space-y-6">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white">{course.title}</h3>
                        <span className="text-sm text-gray-400">{course.progress}%</span>
                      </div>
                      <ProgressBar value={course.progress} variant="student" />
                    </div>
                  ))
                ) : (
                  <p>No courses available for progress tracking.</p>
                )}
              </div>
            </Card>
          </div>
          <div>
            <Card variant="student">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              </div>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="border-l-2 border-student-primary pl-3 py-1">
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