import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import ProgressBar from '../../../components/ui/ProgressBar';
import Button from '../../../components/ui/Button';
import { BookOpen, Star } from 'lucide-react';
import { getEnrolledCourseById } from '../../../apiComponents/apiService.jsx';
import { getUserInfo } from "../../../components/localStorage/LocalStorage.js";


const MyCoursesStudent: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const userInfo = getUserInfo();
  const userId = userInfo?.id;
  const [courses, setCourses] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchCourses = async () => {
      try {
        const studentId = userId;
        const response = await getEnrolledCourseById(studentId);
        if (response.data && response.data.courses) {
          setCourses(response.data.courses);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-white">Loading courses...</p>;
  }

  return (
    <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform">
      <Card variant="student">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">My Courses</h2>
            <p className="text-gray-400">Continue learning where you left off</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search courses..."
              className="px-4 py-2 rounded-lg border border-gray-700 bg-dark-100 text-gray-600 focus:outline-none shadow-md hover:bg-dark-200 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-dark-200 rounded-xl overflow-hidden border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10 cursor-pointer bg-glass-dark backdrop-blur-sm">
              <div className="h-40 overflow-hidden relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                />
                <div className="absolute top-2 right-2 bg-dark-300/80 text-student-primary px-2 py-1 rounded-md text-xs flex items-center">
                  <Star className="w-3 h-3 mr-1 fill-student-primary text-student-primary" />
                  {course.rating}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-300/90 to-transparent p-3">
                  <span className="text-xs px-2 py-1 rounded bg-student-primary/20 text-student-primary">
                    {course.category}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium mb-1">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-3">Instructor: {course.instructor}</p>
                <ProgressBar
                  value={course.progress}
                  variant="student"
                  size="sm"
                />
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="student"
                    size="sm"
                    className="flex-1 py-3 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                    onClick={() => navigate(`/dashboard/student/course/${course.id}`)}  // Navigate to CourseDetailsPage
                  >
                    Continue
                  </Button>
                  <Button
                    size="sm"
                    className="bg-dark-100 text-gray-300 hover:bg-dark-200"
                  >
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MyCoursesStudent;