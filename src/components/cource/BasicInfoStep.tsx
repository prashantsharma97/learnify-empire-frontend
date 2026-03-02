import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CourseData {
  title: string;
  description: string;
  category: string;
  level: string;
  price: string;
  thumbnail: string;
  topics: string[];
  lessons: any[];
}

interface BasicInfoStepProps {
  courseData: CourseData;
  setCourseData: (data: CourseData | ((prev: CourseData) => CourseData)) => void;
  categories: string[];
  levels: string[];
}

const BasicInfoStep = ({ courseData, setCourseData, categories, levels }: BasicInfoStepProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">📝</span>
        <h2 className="text-2xl font-orbitron font-semibold text-white">Course Information</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-white font-medium font-space">Course Title *</label>
            <Input
              placeholder="Enter an engaging course title..."
              value={courseData.title}
              onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
              className="bg-dark-300/50 border-white/20 text-white placeholder:text-gray-400 h-12 focus:border-neon-cyan focus:ring-neon-cyan/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="block text-white font-medium font-space">Category *</label>
              <Select value={courseData.category} onValueChange={(value) => setCourseData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="bg-dark-300/50 border-white/20 text-white h-12 focus:border-neon-cyan">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-dark-300 border-white/20">
                  {categories.map(category => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-neon-purple/20">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="block text-white font-medium font-space">Difficulty Level *</label>
              <Select value={courseData.level} onValueChange={(value) => setCourseData(prev => ({ ...prev, level: value }))}>
                <SelectTrigger className="bg-dark-300/50 border-white/20 text-white h-12 focus:border-neon-cyan">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-dark-300 border-white/20">
                  {levels.map(level => (
                    <SelectItem key={level} value={level} className="text-white hover:bg-neon-purple/20">
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Course Thumbnail Upload */}
          <div className="space-y-3">
            <label className="block text-white font-medium font-space">Course Thumbnail *</label>
            <div className="relative group">
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-neon-cyan/50 transition-all duration-300 cursor-pointer bg-dark-300/30 group-hover:bg-dark-300/50">
                <div className="text-4xl mb-3">📷</div>
                <p className="text-white font-medium mb-1">Click to upload thumbnail</p>
                <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                <p className="text-xs text-gray-500 mt-2">Recommended: 1280x720px</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-white font-medium font-space">Course Description *</label>
            <Textarea
              placeholder="Describe what students will learn, course objectives, and what makes it unique..."
              value={courseData.description}
              onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-dark-300/50 border-white/20 text-white placeholder:text-gray-400 min-h-[200px] resize-none focus:border-neon-cyan focus:ring-neon-cyan/20"
            />
          </div>

          {/* Preview Card */}
          <div className="bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 border border-neon-purple/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-neon-cyan mb-3">Preview</h3>
            <div className="space-y-2">
              <h4 className="text-white font-medium">{courseData.title || "Course Title"}</h4>
              <p className="text-sm text-gray-400">{courseData.category || "Category"} • {courseData.level || "Level"}</p>
              <p className="text-sm text-gray-300 line-clamp-3">{courseData.description || "Course description will appear here..."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;