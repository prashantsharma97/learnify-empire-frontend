import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../components/ui/Button";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);

  // Sample course data (real me API se lao)
  const course = {
    id: parseInt(id),
    title: "React Advanced Patterns",
    instructor: "Sarah Chen",
    category: "development",
    level: "Advanced",
    thumbnail: "https://fastly.picsum.photos/id/880/536/354.jpg?hmac=Tpt84Al9HFHuVxRHGO8W4_7jGxTE3zkPbVrg6GZGVSU",
    duration: "12 weeks",
    students: 5420,
    price: 79.99,
    rating: 4.9,
    description: "Master advanced React patterns including hooks, context, and performance optimization. This course covers real-world scenarios and best practices.",
    syllabus: ["Introduction to Advanced Patterns", "Custom Hooks", "Context API", "Performance Optimization", "Testing Strategies"],
  };

  const handleEnroll = () => {
    // Here you can integrate payment or enrollment logic
    setEnrolled(true);
    // navigate('/dashboard/student/my-courses'); // optional redirect after enroll
  };

  return (
    <div className="space-y-8 p-4 md:p-8 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-neon-purple/30 via-neon-cyan/20 to-neon-magenta/20 p-6 bg-glass-dark backdrop-blur-sm p-4 border-r border-neon-blue/20">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">{course.title}</h1>
        <p className="mt-2 text-muted-foreground">by {course.instructor}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-64 object-cover rounded-xl"
          />
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>⭐ {course.rating}</span>
              <span>{course.students} students</span>
              <span>{course.duration}</span>
            </div>
            <p className="text-lg">{course.description}</p>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Syllabus</h3>
              <ul className="list-disc list-inside space-y-1">
                {course.syllabus.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 bg-glass-dark backdrop-blur-sm p-4 border-r border-neon-blue/20">
            <div className="text-center">
              <div className="text-4xl font-bold text-neon-green mb-2">${course.price}</div>
              <p className="text-sm text-muted-foreground mb-4">One-time payment</p>
              {!enrolled ? (
                <Button
                  onClick={handleEnroll}
                  className="w-full rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white py-3"
                >
                  🛒 Enroll Now
                </Button>
              ) : (
                <div className="text-center">
                  <div className="text-2xl mb-2">✅</div>
                  <p className="text-lg font-semibold text-neon-green">Enrolled Successfully!</p>
                  <p className="text-sm text-muted-foreground">Check your My Courses page.</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 bg-glass-dark backdrop-blur-sm p-4 border-r border-neon-blue/20">
            <h3 className="text-lg font-semibold mb-4">Course Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Level:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.level === "Beginner" ? "bg-neon-green/10 text-neon-green" :
                  course.level === "Intermediate" ? "bg-neon-cyan/10 text-neon-cyan" :
                  "bg-neon-magenta/10 text-neon-magenta"
                }`}>{course.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span>{course.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={() => navigate(-1)}
          className="rounded-lg border border-white/20 bg-white/10"
        >
          ← Back to Browse
        </Button>
      </div>
    </div>
  );
};

export default CourseDetail;