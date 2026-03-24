import React from 'react';
import Card from '../../../components/ui/Card';
import ProgressBar from '../../../components/ui/ProgressBar';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const Progress: React.FC = () => {
  const courses = [
    { 
      id: 1, 
      title: "Advanced Web Development", 
      progress: 75,
      modules: [
        { id: 1, title: "HTML & CSS Fundamentals", status: "completed", grade: 95 },
        { id: 2, title: "JavaScript Basics", status: "completed", grade: 88 },
        { id: 3, title: "Advanced JavaScript", status: "completed", grade: 90 },
        { id: 4, title: "React Fundamentals", status: "in-progress", grade: null },
        { id: 5, title: "State Management", status: "upcoming", grade: null },
      ]
    },
    { 
      id: 2, 
      title: "UX/UI Design Fundamentals", 
      progress: 45,
      modules: [
        { id: 1, title: "Introduction to Design", status: "completed", grade: 92 },
        { id: 2, title: "Color Theory", status: "completed", grade: 85 },
        { id: 3, title: "Typography", status: "in-progress", grade: null },
        { id: 4, title: "Layout & Composition", status: "upcoming", grade: null },
        { id: 5, title: "Final Project", status: "upcoming", grade: null },
      ]
    },
    { 
      id: 3, 
      title: "Data Science Bootcamp", 
      progress: 20,
      modules: [
        { id: 1, title: "Introduction to Python", status: "completed", grade: 88 },
        { id: 2, title: "Data Analysis with Pandas", status: "in-progress", grade: null },
        { id: 3, title: "Data Visualization", status: "upcoming", grade: null },
        { id: 4, title: "Machine Learning Basics", status: "upcoming", grade: null },
      ]
    },
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-student-primary" />;
      case 'upcoming':
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out">
      <Card variant="student">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">Learning Progress</h2>
          <p className="text-gray-400">Track your progress across all courses</p>
        </div>
        
        <div className="space-y-8">
          {courses.map(course => (
            <div key={course.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl text-white font-medium">{course.title}</h3>
                <span className="text-student-primary font-medium">{course.progress}%</span>
              </div>
              
              <ProgressBar 
                value={course.progress} 
                variant="student"
                size="md"
              />
              
              <div className="bg-dark-200 rounded-lg p-4 mt-3">
                <h4 className="text-white mb-3">Course Modules</h4>
                <div className="space-y-3">
                  {course.modules.map(module => (
                    <div key={module.id} className="flex items-center justify-between bg-background-dark p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(module.status)}
                        <div>
                          <p className="text-white">{module.title}</p>
                          <p className="text-xs text-gray-400">
                            {module.status === 'completed' 
                              ? 'Completed' 
                              : module.status === 'in-progress' 
                                ? 'In Progress' 
                                : 'Upcoming'}
                          </p>
                        </div>
                      </div>
                      {module.grade !== null && (
                        <div className="bg-student-primary/20 text-student-primary px-2 py-1 rounded text-sm">
                          {module.grade}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Progress;