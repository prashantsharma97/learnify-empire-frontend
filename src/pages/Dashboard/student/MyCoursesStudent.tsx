// import React from 'react';
// import Card from '../../../components/ui/Card';
// import ProgressBar from '../../../components/ui/ProgressBar';
// import Button from '../../../components/ui/Button';
// import { BookOpen, Star } from 'lucide-react';

// const MyCoursesStudent: React.FC = () => {
//   // Mock data
//   const courses = [
//     { 
//       id: 1, 
//       title: "Advanced Web Development", 
//       instructor: "Jane Smith",
//       progress: 75,
//       rating: 4.8,
//       category: "Development",
//       thumbnail: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//     },
//     { 
//       id: 2, 
//       title: "UX/UI Design Fundamentals", 
//       instructor: "John Doe",
//       progress: 45,
//       rating: 4.5,
//       category: "Design",
//       thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
//     },
//     { 
//       id: 3, 
//       title: "Data Science Bootcamp", 
//       instructor: "Alex Johnson",
//       progress: 20,
//       rating: 4.7,
//       category: "Data Science",
//       thumbnail: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
//     },
//     { 
//       id: 4, 
//       title: "Mobile App Development with React Native", 
//       instructor: "Sarah Williams",
//       progress: 10,
//       rating: 4.6,
//       category: "Development",
//       thumbnail: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
//     },
//     { 
//       id: 5, 
//       title: "Digital Marketing Masterclass", 
//       instructor: "Mike Chen",
//       progress: 35,
//       rating: 4.9,
//       category: "Marketing",
//       thumbnail: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
//     },
//   ];

//   const categories = [
//     "All", "Development", "Design", "Data Science", "Marketing", "Business"
//   ];

//   return (
//     <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform">
//       <Card variant="student">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
//           <div>
//             <h2 className="text-2xl font-semibold text-white">My Courses</h2>
//             <p className="text-gray-400">Continue learning where you left off</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <button 
//                 key={category}
//                 className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
//                   category === 'All' 
//                     ? 'bg-student-primary/20 text-student-primary border border-student-primary/30'
//                     : 'bg-dark-200 text-gray-400 border border-gray-700 hover:bg-dark-100'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.map(course => (
//             <div key={course.id} className="bg-dark-200 rounded-xl overflow-hidden">
//               <div className="h-40 overflow-hidden relative">
//                 <img 
//                   src={course.thumbnail} 
//                   alt={course.title} 
//                   className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
//                 />
//                 <div className="absolute top-2 right-2 bg-dark-300/80 text-student-primary px-2 py-1 rounded-md text-xs flex items-center">
//                   <Star className="w-3 h-3 mr-1 fill-student-primary text-student-primary" />
//                   {course.rating}
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-300/90 to-transparent p-3">
//                   <span className="text-xs px-2 py-1 rounded bg-student-primary/20 text-student-primary">
//                     {course.category}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-4">
//                 <h3 className="text-white font-medium mb-1">{course.title}</h3>
//                 <p className="text-gray-400 text-sm mb-3">Instructor: {course.instructor}</p>
//                 <ProgressBar 
//                   value={course.progress} 
//                   variant="student" 
//                   size="sm"
//                 />
//                 <div className="flex gap-2 mt-3">
//                   <Button 
//                     variant="student" 
//                     size="sm" 
//                     className="flex-1"
//                   >
//                     Continue
//                   </Button>
//                   <Button 
//                     size="sm" 
//                     className="bg-dark-100 text-gray-300 hover:bg-dark-200"
//                   >
//                     <BookOpen className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default MyCoursesStudent;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import the navigate hook from React Router
import Card from '../../../components/ui/Card';
import ProgressBar from '../../../components/ui/ProgressBar';
import Button from '../../../components/ui/Button';
import { BookOpen, Star } from 'lucide-react';

const MyCoursesStudent: React.FC = () => {
  const navigate = useNavigate();  // Hook for navigation
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mock data
  const courses = [
    { 
      id: 1, 
      title: "Advanced Web Development", 
      instructor: "Jane Smith",
      progress: 75,
      rating: 4.8,
      category: "Development",
      thumbnail: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    { 
      id: 2, 
      title: "UX/UI Design Fundamentals", 
      instructor: "John Doe",
      progress: 45,
      rating: 4.5,
      category: "Design",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
      id: 3, 
      title: "Data Science Bootcamp", 
      instructor: "Alex Johnson",
      progress: 20,
      rating: 4.7,
      category: "Data Science",
      thumbnail: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
      id: 4, 
      title: "Mobile App Development with React Native", 
      instructor: "Sarah Williams",
      progress: 10,
      rating: 4.6,
      category: "Development",
      thumbnail: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
    { 
      id: 5, 
      title: "Digital Marketing Masterclass", 
      instructor: "Mike Chen",
      progress: 35,
      rating: 4.9,
      category: "Marketing",
      thumbnail: "https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
    },
  ];

  // Filter courses based on search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform">
      <Card variant="student">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">My Courses</h2>
            <p className="text-gray-400">Continue learning where you left off</p>
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="px-4 py-2 rounded-lg border border-gray-700 bg-dark-100 text-white focus:outline-none shadow-md hover:bg-dark-200 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-dark-200 rounded-xl overflow-hidden">
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
                    className="flex-1"
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