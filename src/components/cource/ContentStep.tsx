mport { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

interface Lesson {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  resources: any[];
}

interface CourseData {
  title: string;
  description: string;
  category: string;
  level: string;
  price: string;
  thumbnail: string;
  topics: string[];
  lessons: Lesson[];
}

interface ContentStepProps {
  courseData: CourseData;
  setCourseData: (data: CourseData | ((prev: CourseData) => CourseData)) => void;
  addLesson: () => void;
  removeLesson: (lessonId: number) => void;
  updateLesson: (lessonId: number, field: string, value: string) => void;
}

const ContentStep = ({ courseData, setCourseData, addLesson, removeLesson, updateLesson }: ContentStepProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📚</span>
          <h2 className="text-2xl font-orbitron font-semibold text-white">Course Content</h2>
        </div>
        <Button 
          onClick={addLesson}
          className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:from-neon-cyan hover:to-neon-purple transition-all duration-300 shadow-neon-purple hover:shadow-neon-cyan"
        >
          <span className="text-lg mr-2">➕</span>
          Add Lesson
        </Button>
      </div>

      <div className="space-y-6">
        {courseData.lessons.map((lesson, index) => (
          <Card key={lesson.id} className="bg-dark-300/30 border-white/10 overflow-hidden hover:border-neon-purple/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white">Lesson {index + 1}</h3>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => removeLesson(lesson.id)}
                  className="text-neon-magenta hover:bg-neon-magenta/20 hover:text-white"
                >
                  🗑️ Remove
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Lesson Title *</label>
                    <Input
                      placeholder="Enter lesson title..."
                      value={lesson.title}
                      onChange={(e) => updateLesson(lesson.id, 'title', e.target.value)}
                      className="bg-dark-300/50 border-white/20 text-white focus:border-neon-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Duration *</label>
                    <Input
                      placeholder="e.g., 15:30"
                      value={lesson.duration}
                      onChange={(e) => updateLesson(lesson.id, 'duration', e.target.value)}
                      className="bg-dark-300/50 border-white/20 text-white focus:border-neon-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Lesson Description</label>
                  <Textarea
                    placeholder="Describe what this lesson covers..."
                    value={lesson.description}
                    onChange={(e) => updateLesson(lesson.id, 'description', e.target.value)}
                    className="bg-dark-300/50 border-white/20 text-white h-24 resize-none focus:border-neon-cyan"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white font-medium mb-2">Video Upload *</label>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-neon-cyan/50 transition-colors cursor-pointer bg-dark-300/20">
                    <div className="text-3xl mb-2">🎥</div>
                    <p className="text-white font-medium">Upload lesson video</p>
                    <p className="text-sm text-gray-400">MP4, MOV up to 1GB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {courseData.lessons.length === 0 && (
          <div className="text-center py-16 bg-dark-300/20 rounded-xl border border-white/10">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-2">No lessons added yet</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">Start building your course by adding your first lesson. Each lesson should focus on a specific learning objective.</p>
            <Button 
              onClick={addLesson}
              className="bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:from-neon-cyan hover:to-neon-purple"
            >
              <span className="text-lg mr-2">➕</span>
              Add First Lesson
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentStep;