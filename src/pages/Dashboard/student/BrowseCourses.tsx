import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import CourseCard from "./CourseCard";

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

const allCourses = [
  {
    id: 1,
    title: "React Advanced Patterns",
    instructor: "Sarah Chen",
    category: "development",
    level: "Advanced",
    thumbnail: "https://fastly.picsum.photos/id/880/536/354.jpg?hmac=Tpt84Al9HFHuVxRHGO8W4_7jGxTE3zkPbVrg6GZGVSU",
    duration: "12 weeks",
    students: 5420,
    price: 79.99,
    rating: 4.9,
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Alex Rivera",
    category: "design",
    level: "Intermediate",
    thumbnail: "https://fastly.picsum.photos/id/880/536/354.jpg?hmac=Tpt84Al9HFHuVxRHGO8W4_7jGxTE3zkPbVrg6GZGVSU",
    duration: "8 weeks",
    students: 3890,
    price: 59.99,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Priya Sharma",
    category: "ai-ml",
    level: "Intermediate",
    thumbnail: "https://fastly.picsum.photos/id/880/536/354.jpg?hmac=Tpt84Al9HFHuVxRHGO8W4_7jGxTE3zkPbVrg6GZGVSU",
    duration: "10 weeks",
    students: 4120,
    price: 89.99,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Cloud Architecture with AWS",
    instructor: "James Wilson",
    category: "cloud",
    level: "Advanced",
    thumbnail: "https://fastly.picsum.photos/id/880/536/354.jpg?hmac=Tpt84Al9HFHuVxRHGO8W4_7jGxTE3zkPbVrg6GZGVSU",
    duration: "6 weeks",
    students: 2340,
    price: 99.99,
    rating: 4.9,
  },
  {
    id: 5,
    title: "JavaScript for Beginners",
    instructor: "Emma Johnson",
    category: "development",
    level: "Beginner",
    thumbnail: "https://fastly.picsum.photos/id/880/536/354.jpg?hmac=Tpt84Al9HFHuVxRHGO8W4_7jGxTE3zkPbVrg6GZGVSU",
    duration: "4 weeks",
    students: 8910,
    price: 39.99,
    rating: 4.6,
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    instructor: "Marcus Stone",
    category: "cybersecurity",
    level: "Beginner",
    thumbnail: "https://fastly.picsum.photos/id/880/536/354.jpg?hmac=Tpt84Al9HFHuVxRHGO8W4_7jGxTE3zkPbVrg6GZGVSU",
    duration: "7 weeks",
    students: 1890,
    price: 69.99,
    rating: 4.8,
  },
];

const BrowseCourses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("trending");
  const [activeLevel, setActiveLevel] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredCourses = allCourses
    .filter((course) => {
      const matchSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        activeCategory === "trending" || course.category === activeCategory;
      const matchLevel =
        activeLevel === "all" ||
        course.level.toLowerCase() === activeLevel.toLowerCase();
      return matchSearch && matchCategory && matchLevel;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.students - a.students;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

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
                  className={`rounded-xl px-3 py-2 text-sm text-left transition ${
                    activeCategory === cat.key
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
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                    activeLevel === level
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
              {[
                { key: "popular", label: "Popular" },
                { key: "rating", label: "Top Rated" },
                { key: "price-low", label: "Price ↑" },
                { key: "price-high", label: "Price ↓" },
              ].map((sort) => (
                <button
                  key={sort.key}
                  onClick={() => setSortBy(sort.key)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                    sortBy === sort.key
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
                key={course.id}
                title={course.title}
                instructor={course.instructor}
                thumbnail={course.thumbnail}
                duration={course.duration}
                students={course.students}
                price={course.price}
                rating={course.rating}
                actions={
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${
                          course.level === "Beginner"
                            ? "bg-neon-green/10 text-neon-green border border-neon-green/30"
                            : course.level === "Intermediate"
                            ? "bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30"
                            : "bg-neon-magenta/10 text-neon-magenta border border-neon-magenta/30"
                        }`}
                      >
                        {course.level}
                      </span>
                      <span className="text-neon-green font-bold text-lg">${course.price}</span>
                    </div>
                    <Button
                      onClick={() => navigate(`/dashboard/student/course/${course.id}`)}
                      className="w-full rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white"
                    >
                      🛒 Enroll
                    </Button>
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