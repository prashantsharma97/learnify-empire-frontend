import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { BookOpen, Users, Star, MoreVertical } from 'lucide-react';

const MyCourses: React.FC = () => {
  // Mock data
  const courses = [
    {
      id: 1,
      title: "Advanced Web Development",
      students: 245,
      rating: 4.8,
      earnings: 12750.50,
      status: "Published",
      thumbnail: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 2,
      title: "UX/UI Design Fundamentals",
      students: 189,
      rating: 4.5,
      earnings: 8505.25,
      status: "Published",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 3,
      title: "JavaScript Mastery",
      students: 320,
      rating: 4.9,
      earnings: 16000.75,
      status: "Published",
      thumbnail: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      id: 4,
      title: "Python for Data Science",
      students: 0,
      rating: 0,
      earnings: 0,
      status: "Draft",
      thumbnail: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="space-y-6 text-3xl font-bold translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out mb-8">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <div className=''>
            <h2 className="text-2xl font-semibold text-white">My Courses</h2>
            <p className="text-gray-400">Manage your course catalog</p>
          </div>
          <Button variant="instructor">
            Create New Course
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
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
                    <span className={`px-3 py-1 rounded-full text-xs ${course.status === 'Published'
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
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

                <div className="flex gap-3 mt-6 ">
                  <Button variant="instructor" className='rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300 bg-neon-blue/20 text-white border border-neon-blue/30'>
                    Edit Course
                  </Button>
                  <Button
                    className="rounded-lg hover:bg-neon-purple/10 
                           hover:text-white hover:border hover:border-neon-purple/30 transition-all duration-300 bg-neon-blue/20 text-white border border-neon-blue/30"
                  >
                    View Analytics
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

export default MyCourses;