import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getCoursesById, createCourse, updateCourse } from '../../../apiComponents/apiService.jsx';

const UploadCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    console.log("Thumbnail file:", file);
    if (!file) return;
    setThumbnailFile(file);
    const previewUrl = URL.createObjectURL(file);
    setThumbnailPreview(previewUrl);
  };

  useEffect(() => {
    if (id) {
      fetchCourse();
      setCurrentStep(1);
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await getCoursesById(id);
      const course = response.data.course;
      console.log("Fetched course data:", course);
      setCourseData({
        title: course.title || "",
        description: course.description || "",
        category: course.category || "",
        level: course.difficultyLevel || "",
        pricingInfo: {
          coursePrice: course.pricingInfo?.coursePrice || "",  
          paymentType: course.pricingInfo?.paymentType || "",  
        },
        thumbnail: course.thumbnail || "",
        topics: course.topics || [],
        lessons: course.lessons || [],
      });

      setThumbnailPreview(course.thumbnail);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course data:", error);
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "price" || name === "paymentType") {
      setCourseData((prev) => ({
        ...prev,
        pricingInfo: {
          ...prev.pricingInfo,
          [name === "price" ? "coursePrice" : "paymentType"]: value,
        },
      }));
    } else {
      setCourseData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const coursePayload = {
        ...courseData,
        pricingInfo: {
          ...courseData.pricingInfo,
        },
        difficultyLevel: courseData.level,
        thumbnail: thumbnailPreview,
      };
      if (id) {
        await updateCourse(id, coursePayload);
        toast.success("Course data updated successfully!");
      } else {
        // Create new course
        await createCourse(coursePayload);
        console.log("Course created successfully with data:", coursePayload);
        toast.success("Course created successfully!");
      }
      navigate("/dashboard/instructor/my-courses");
    } catch (error) {
      console.error("Error submitting course data:", error);
      toast.error("Failed to submit course data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    pricingInfo: {
      coursePrice: "",
      paymentType: "",
    },
    thumbnail: "",
    topics: [] as string[],
    lessons: [] as any[],
  });

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "DevOps",
    "Cybersecurity",
    "Game Development",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const paymentTypes = ["free", "paid"];

  const steps = [
    { id: 1, title: "Basic Info", icon: "📝" },
    { id: 2, title: "Content", icon: "📚" },
    { id: 3, title: "Pricing", icon: "💰" },
    { id: 4, title: "Review", icon: "👁️" },
  ];

  const addLesson = () => {
    const newLesson = {
      id: Date.now(),
      title: "",
      description: "",
      videoUrl: "",
      duration: "",
      resources: [],
    };
    setCourseData((prev) => ({
      ...prev,
      lessons: [...prev.lessons, newLesson],
    }));
  };

  const removeLesson = (lessonId: number) => {
    setCourseData((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((lesson) => lesson.id !== lessonId),
    }));
  };

  const updateLesson = (lessonId: number, field: string, value: string) => {
    setCourseData((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
      ),
    }));
  };

  return (
    <div className="space-y-8 translate-x-0 fixed md:relative md:translate-x-0">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          {id ? "Edit Course" : "Create New Course"}        </h1>
        <p className="text-gray-400 mt-1">
          Share your expertise with learners worldwide
        </p>
      </div>

      {/* Progress Steps */}
      <div className="bg-glass-dark backdrop-blur-sm border border-neon-purple/20 rounded-lg p-6 hover:border-neon-purple/40 hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${currentStep === step.id
                  ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white"
                  : currentStep > step.id
                    ? "bg-green-500/20 text-green-500"
                    : "bg-white/5 text-gray-400"
                  }`}
              >
                <span className="text-xl">{step.icon}</span>
                <span className="font-medium">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-green-500" : "bg-gray-600"
                    }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-glass-dark backdrop-blur-sm border border-neon-purple/20 rounded-lg p-6 hover:border-neon-purple/40 hover:shadow-lg hover:shadow-neon-purple/20 transition-all duration-300">
        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              📝 Course Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter course title..."
                    value={courseData.title}
                    onChange={handleChange}

                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 p-2 rounded-md w-full border border-white/20 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={courseData.category}
                    onChange={handleChange}

                    className="bg-white/5 border-white/20 text-white p-2 rounded-md w-full border border-white/20 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" className="bg-transparent">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category} className="bg-transparent">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Difficulty Level
                  </label>
                  <select
                    name="level"
                    value={courseData.level}
                    onChange={handleChange}

                    className="bg-white/5 border-white/20 text-white p-2 rounded-md w-full border border-white/20 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select level</option>
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Course Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe what students will learn..."
                  value={courseData.description}
                  onChange={handleChange}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 p-2 rounded-md w-full h-48 resize-none border border-white/20 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Course Thumbnail
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center relative">

                {thumbnailPreview ? (
                  <div className="relative inline-block">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail"
                      className="w-64 h-40 object-cover rounded-lg mx-auto"
                    />

                    {/* Remove Button */}
                    <button
                      onClick={() => {
                        setThumbnailPreview("");
                        setThumbnailFile(null);
                        setCourseData((prev) => ({ ...prev, thumbnail: "" }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-4xl mb-2">📁</div>
                    <p className="text-gray-400">Click to upload thumbnail</p>
                  </div>
                )}

                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  id="thumbnailUpload"
                />

                <label
                  htmlFor="thumbnailUpload"
                  className="cursor-pointer text-sm text-purple-400 hover:text-pink-400 mt-3 block"
                >
                  Upload Image
                </label>

              </div>
            </div>
          </div>
        )}

        {/* Step 2: Content */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">📚 Course Content</h2>
              <button
                onClick={addLesson}
                className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-2 rounded-md"
              >
                ➕ Add Lesson
              </button>
            </div>

            <div className="space-y-4">
              {courseData.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="bg-white/5 rounded-lg p-6 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Lesson {index + 1}</h3>
                    <button
                      onClick={() => removeLesson(lesson.id)}
                      className="text-red-500 hover:bg-red-500/20 p-2 rounded-md"
                    >
                      🗑️ Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">
                        Lesson Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Enter lesson title..."
                        value={lesson.title}
                        onChange={(e) => updateLesson(lesson.id, "title", e.target.value)}
                        className="bg-white/5 border-white/20 text-white p-2 rounded-md w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        placeholder="Duration in minutes"
                        value={lesson.duration}
                        onChange={(e) => updateLesson(lesson.id, "duration", e.target.value)}
                        className="bg-white/5 border-white/20 text-white p-2 rounded-md w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Lesson Description
                    </label>
                    <textarea
                      placeholder="Describe the lesson content..."
                      value={lesson.description}
                      onChange={(e) => updateLesson(lesson.id, "description", e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 p-2 rounded-md w-full h-32 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      name="videoUrl"
                      placeholder="Enter video URL"
                      value={lesson.videoUrl}
                      onChange={(e) => updateLesson(lesson.id, "videoUrl", e.target.value)}

                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 p-2 rounded-md w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Pricing */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">
              💰 Pricing Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">
                  Course Price
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter course price"
                  value={courseData.pricingInfo.coursePrice}
                  onChange={handleChange}

                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 p-2 rounded-md w-full"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Payment Type
                </label>
                <select
                  name="paymentType"
                  value={courseData.pricingInfo.paymentType}
                  onChange={handleChange}

                  className="bg-white/5 border-white/20 text-white p-2 rounded-md w-full"
                >
                  {paymentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">

            <h2 className="text-2xl font-semibold text-white">
              👁️ Review Your Course
            </h2>

            {/* Basic Info */}
            <div className="bg-white/5 border border-neon-purple/20 rounded-lg p-6 space-y-4">
              <h3 className="text-xl text-white font-semibold">📚 Basic Information</h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <p className="text-gray-400 text-sm">Title</p>
                  <p className="text-white font-medium">{courseData.title}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Category</p>
                  <p className="text-white font-medium">{courseData.category}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Level</p>
                  <p className="text-white font-medium">{courseData.level}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm">Price</p>
                  <p className="text-green-400 font-semibold">
                    ${courseData.pricingInfo?.coursePrice || "Free"}
                  </p>
                </div>

              </div>

              <div>
                <p className="text-gray-400 text-sm">Description</p>
                <p className="text-white">{courseData.description}</p>
              </div>
            </div>

            {/* Thumbnail */}
            {thumbnailPreview && (
              <div className="bg-white/5 border border-neon-purple/20 rounded-lg p-6">
                <h3 className="text-xl text-white font-semibold mb-4">🖼️ Thumbnail</h3>

                <img
                  src={thumbnailPreview}
                  alt="Course Thumbnail"
                  className="w-72 rounded-lg border border-white/10"
                />
              </div>
            )}

            {/* Lessons */}
            <div className="bg-white/5 border border-neon-purple/20 rounded-lg p-6 space-y-4">

              <h3 className="text-xl text-white font-semibold">
                🎥 Lessons ({courseData.lessons.length})
              </h3>

              {courseData.lessons.length === 0 ? (
                <p className="text-gray-400">No lessons added</p>
              ) : (
                <div className="space-y-4">
                  {courseData.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id || index}
                      className="bg-white/5 border border-white/10 rounded-lg p-4"
                    >
                      <div className="flex justify-between">
                        <h4 className="text-white font-medium">
                          {index + 1}. {lesson.title}
                        </h4>
                        <span className="text-sm text-gray-400">
                          {lesson.duration}
                        </span>
                      </div>

                      <p className="text-gray-400 text-sm mt-2">
                        {lesson.description}
                      </p>

                      {lesson.videoUrl && (
                        <p className="text-xs text-purple-400 mt-1">
                          {lesson.videoUrl}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-600 text-white p-2 rounded-md"
            >
              &lt; Previous
            </button>
          )}

          {currentStep < 4 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-gradient-to-r from-purple-400 to-pink-500 text-white p-2 rounded-md"
            >
              Next &gt;
            </button>
          )}

          {currentStep === 4 && (
            <button
              className="bg-green-500 text-white p-2 rounded-md"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : id ? "Update Course" : "Create Course"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCourse;
