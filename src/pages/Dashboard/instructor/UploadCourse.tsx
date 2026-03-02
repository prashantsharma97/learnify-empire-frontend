import { useState } from "react";

const UploadCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
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
          Create New Course
        </h1>
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
                    placeholder="Enter course title..."
                    value={courseData.title}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 p-2 rounded-md w-full"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={courseData.category}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="bg-white/5 border-white/20 text-white p-2 rounded-md w-full"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
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
                    value={courseData.level}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        level: e.target.value,
                      }))
                    }
                    className="bg-white/5 border-white/20 text-white p-2 rounded-md w-full"
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
                  placeholder="Describe what students will learn..."
                  value={courseData.description}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 p-2 rounded-md w-full h-48 resize-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Course Thumbnail
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-pink-500/50 transition-colors cursor-pointer">
                <div className="text-4xl mb-2">📁</div>
                <p className="text-gray-400">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 2MB</p>
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
                        placeholder="Enter lesson title..."
                        value={lesson.title}
                        onChange={(e) =>
                          updateLesson(lesson.id, "title", e.target.value)
                        }
                        className="bg-white/5 border-white/20 text-white p-2 rounded-md w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        placeholder="Duration in minutes"
                        value={lesson.duration}
                        onChange={(e) =>
                          updateLesson(lesson.id, "duration", e.target.value)
                        }
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
                      onChange={(e) =>
                        updateLesson(lesson.id, "description", e.target.value)
                      }
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 p-2 rounded-md w-full h-32 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Video URL
                    </label>
                    <input
                      type="url"
                      placeholder="Enter video URL"
                      value={lesson.videoUrl}
                      onChange={(e) =>
                        updateLesson(lesson.id, "videoUrl", e.target.value)
                      }
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
                  placeholder="Enter course price"
                  value={courseData.price}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 p-2 rounded-md w-full"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Payment Type
                </label>
                <select
                  value={courseData.price}
                  onChange={(e) =>
                    setCourseData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="bg-white/5 border-white/20 text-white p-2 rounded-md w-full"
                >
                  <option value="">Select payment type</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white mb-6">👁️ Review</h2>
            <p className="text-gray-400">
              Please review your course details before submitting.
            </p>
            <pre className="text-white bg-gray-800 p-6 rounded-md">
              {JSON.stringify(courseData, null, 2)}
            </pre>
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
            <button className="bg-green-500 text-white p-2 rounded-md">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadCourse;
