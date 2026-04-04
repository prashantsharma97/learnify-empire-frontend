import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import CourseCard from "./CourseCard";
import { getAllCourses } from "../../../apiComponents/apiService.jsx";
import { UserContext } from "../../../components/context/UserContext.js";

const categories = [
  { icon: "🔥", label: "Trending", key: "trending" },
  { icon: "💻", label: "Development", key: "development" },
  { icon: "🎨", label: "Design", key: "design" },
  { icon: "📊", label: "Data Science", key: "data-science" },
  { icon: "🤖", label: "AI & ML", key: "ai-ml" },
  { icon: "📱", label: "Mobile", key: "mobile" },
  { icon: "☁️", label: "Cloud", key: "cloud" },
  { icon: "🔐", label: "Cybersecurity", key: "cybersecurity" },
];

const BrowseCourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("trending");
  const [activeLevel, setActiveLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [allCourses, setAllCourses] = useState([]);
  const { user } = React.useContext(UserContext);

  const filteredCourses = allCourses
    .filter((course) => {
      const matchSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructorId.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        activeCategory === "trending" || course.category === activeCategory;
      const matchLevel =
        activeLevel === "all" ||
        course.difficultyLevel.toLowerCase() === activeLevel.toLowerCase();
      return matchSearch && matchCategory && matchLevel;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return (b.students || 0) - (a.students || 0);
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "price-low") return (a.pricingInfo?.coursePrice || 0) - (b.pricingInfo?.coursePrice || 0);
      if (sortBy === "price-high") return (b.pricingInfo?.coursePrice || 0) - (a.pricingInfo?.coursePrice || 0);
      return 0;
    });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const studentId = user?.id;
      const response = await getAllCourses(studentId);
      setAllCourses(response.data.courses);
      console.log("Fetched courses:", response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const getTotalDuration = (lessons) => {
    if (!lessons || lessons.length === 0) return "N/A";
    const totalMinutes = lessons.reduce((sum, lesson) => {
      const duration = lesson.duration;
      if (typeof duration === 'string') {
        const match = duration.match(/(\d+)/);
        return sum + (match ? parseInt(match[0]) : 0);
      }
      return sum + (typeof duration === 'number' ? duration : 0);
    }, 0);
    return `${totalMinutes} mins`;
  };

  return (
    <div className="space-y-8 p-4 md:p-8 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-neon-purple/30 via-neon-cyan/20 to-neon-magenta/20 p-6 bg-glass-dark backdrop-blur-sm">
        <h1 className="text-3xl md:text-4xl font-bold gradient-text">Discover & Enroll</h1>
        <p className="mt-2 text-muted-foreground">
          500+ courses ready for you. Search, filter, and start learning in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6">
        <aside className="space-y-5 rounded-xl border border-white/10 bg-white/5 p-5 bg-glass-dark backdrop-blur-sm">
          <div className="space-y-2 ">
            <h2 className="text-lg font-semibold">Search</h2>
            <Input
              placeholder="Course, instructor, topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/5 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Category</h2>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`rounded-xl px-3 py-2 text-sm text-left transition ${activeCategory === cat.key
                    ? "bg-neon-cyan/25 text-white border border-neon-cyan"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Level</h2>
            <div className="flex flex-wrap gap-2">
              {["all", "beginner", "intermediate", "advanced"].map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${activeLevel === level
                    ? "bg-neon-purple/25 text-white border border-neon-purple/40"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                    }`}
                >
                  {level === "all" ? "All" : level}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Sort by</h2>
            <div className="flex flex-wrap gap-2">
              {[{
                key: "popular", label: "Popular"
              }, {
                key: "rating", label: "Top Rated"
              }, {
                key: "price-low", label: "Price ↑"
              }, {
                key: "price-high", label: "Price ↓"
              }].map((sort) => (
                <button
                  key={sort.key}
                  onClick={() => setSortBy(sort.key)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${sortBy === sort.key
                    ? "bg-neon-cyan/25 text-white border border-neon-cyan/40"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10"
                    }`}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => {
              setSearchTerm("");
              setActiveCategory("trending");
              setActiveLevel("all");
              setSortBy("popular");
            }}
            className="w-full rounded-lg border border-white/20 bg-white/10 text-sm font-semibold"
          >
            Reset filters
          </Button>
        </aside>

        <main className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-4 bg-glass-dark backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">
              Showing <span className="text-neon-cyan font-semibold">{filteredCourses.length}</span> courses
            </p>
            <p className="text-sm text-muted-foreground">
              Active category:{" "}
              <span className="font-semibold text-white">
                {categories.find((c) => c.key === activeCategory)?.label || "Trending"}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                title={course.title}
                instructor={course.instructorId.username}
                thumbnail={course.thumbnail}
                duration={getTotalDuration(course.lessons)}
                students={course.students || 0}
                price={course.pricingInfo?.coursePrice || 0}
                rating={course.rating || 0}
                actions={
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${course.difficultyLevel === "Beginner"  // Fixed: difficultyLevel
                          ? "bg-neon-green/10 text-neon-green border border-neon-green/30"
                          : course.difficultyLevel === "Intermediate"
                            ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30"
                            : "bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/30"
                          }`}
                      >
                        {course.difficultyLevel}
                      </span>
                      <span className="text-neon-green font-bold text-lg">${course.pricingInfo?.coursePrice || 0}</span>
                    </div>
                    {course.isEnrolled ?
                      (<Button disabled className="w-full rounded-lg bg-gradient-to-r border-transparent hover:bg-danger-strong bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 focus:ring-4 focus:ring-danger-medium text-white">
                        Already Enrolled
                      </Button>)
                      : (<Button
                        onClick={() => navigate(`/dashboard/student/course/${course._id}`)}
                        className="w-full rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                      >
                        🛒 Enroll
                      </Button>
                        // bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5
                      )}


                  </div>
                }
              />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="mb-2 text-lg font-semibold">No courses found</p>
              <p className="mb-4 text-sm text-muted-foreground">
                Try changing your keywords or filters.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("trending");
                  setActiveLevel("all");
                  setSortBy("popular");
                }}
                className="rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BrowseCourses;