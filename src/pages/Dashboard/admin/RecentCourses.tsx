import React from 'react';
import { Star } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  students: number;
  rating: number;
  revenue: string;
}

const courses: Course[] = [
  {
    id: 1,
    name: 'Advanced Web Development',
    students: 234,
    rating: 4.8,
    revenue: '$12,500',
  },
  {
    id: 2,
    name: 'UI/UX Design Masterclass',
    students: 189,
    rating: 4.9,
    revenue: '$8,900',
  },
  {
    id: 3,
    name: 'Digital Marketing 101',
    students: 156,
    rating: 4.7,
    revenue: '$6,700',
  },
];

const RecentCourses: React.FC = () => {
  return (
    <div
      className="bg-glass-dark backdrop-blur-sm border border-neon-purple/20 rounded-lg p-6
                       hover:border-neon-purple/40 hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300"
    >
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
            {courses.map((course) => (
              <tr
                key={course.id}
                className="border-b border-neon-purple/10"
              >
                <td className="py-4">{course.name}</td>
                <td className="py-4">{course.students}</td>
                <td className="py-4 flex items-center">
                  {course.rating}
                  <Star className="w-4 h-4 text-neon-pink ml-1 inline" />
                </td>
                <td className="py-4">{course.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCourses;
