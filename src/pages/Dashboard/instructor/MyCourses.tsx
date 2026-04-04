import React, { useEffect, useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { BookOpen, Users, Star, MoreVertical } from 'lucide-react';
import { getCourses } from '../../../apiComponents/apiService.jsx';
import { Link } from 'react-router-dom';


const MyCourses: React.FC = () => {
  const [courses, setCourses] = React.useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const getCourseData = async () => {
    try {
      setLoading(true);
      const response = await getCourses();
      const coursesData = response.data;
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-3xl font-bold translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out mb-8">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">My Courses</h2>
            <p className="text-gray-400">Manage your course catalog</p>
          </div>

          <Link to="/dashboard/instructor/upload-course">
            <Button
              variant="instructor"
              className="btn btn-instructor text-sm px-4 py-2 rounded-lg hover:bg-neon-purple/10 hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300 bg-neon-blue/20 text-white border border-neon-blue/30"
            >
              Create New Course
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-xl text-gray-500">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="text-center text-xl text-gray-500">No courses List found. Start by creating a new course!</div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {courses.map(course => (
              <div
                key={course._id}
                className="bg-dark-200 rounded-xl overflow-hidden flex flex-col md:flex-row backdrop-blur-sm border border-neon-blue/20 rounded-lg hover:border-neon-blue/40 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300"
              >
                <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">{course.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${course.status === 'Published'
                          ? 'bg-green-500/20 text-green-500'
                          : 'bg-yellow-500/20 text-yellow-500'
                          }`}
                      >
                        {course.status}
                      </span>
                    </div>
                    <button className="p-2 hover:bg-dark-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-instructor-primary/10">
                        <Users className="w-5 h-5 text-instructor-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-white">{course.students}</p>
                        <p className="text-sm text-gray-400">Students</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-instructor-primary/10">
                        <Star className="w-5 h-5 text-instructor-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-white">
                          {course.rating > 0 ? course.rating : '-'}
                        </p>
                        <p className="text-sm text-gray-400">Rating</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-instructor-primary/10">
                        <BookOpen className="w-5 h-5 text-instructor-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-white">
                          {formatCurrency(course.earnings)}
                        </p>
                        <p className="text-sm text-gray-400">Earnings</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Link to={`/dashboard/instructor/edit-course/${course._id}`}>
                      <Button
                        variant="instructor"
                        className="rounded-lg hover:bg-neon-purple/10 hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300 bg-neon-blue/20 text-white border border-neon-blue/30"
                      >
                        Edit Course
                      </Button>
                    </Link>
                    <Button className="rounded-lg hover:bg-neon-purple/10 hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300 bg-neon-blue/20 text-white border border-neon-blue/30">
                      View Analytics
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default MyCourses;