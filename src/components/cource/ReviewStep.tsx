import { Card, CardContent } from "@/components/ui/card";

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

interface ReviewStepProps {
  courseData: CourseData;
}

const ReviewStep = ({ courseData }: ReviewStepProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">👁️</span>
        <h2 className="text-2xl font-orbitron font-semibold text-white">Review & Publish</h2>
      </div>
      
      <Card className="bg-dark-300/30 border-white/10 overflow-hidden">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">{courseData.title || "Course Title"}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-neon-cyan">📂</span>
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{courseData.category || "Not selected"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neon-purple">🎯</span>
                  <span className="text-gray-400">Level:</span>
                  <span className="text-white">{courseData.level || "Not selected"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neon-green">📚</span>
                  <span className="text-gray-400">Lessons:</span>
                  <span className="text-white">{courseData.lessons.length}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-neon-orange">💰</span>
                  <span className="text-gray-400">Price:</span>
                  <span className="text-neon-green font-semibold">${courseData.price || "Free"}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-3">Description:</h4>
              <p className="text-gray-300 text-sm leading-relaxed bg-dark-300/30 p-4 rounded-lg">
                {courseData.description || "No description provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 border-neon-green/20 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <h4 className="text-lg font-semibold text-neon-green mb-2">Ready to Publish!</h4>
              <p className="text-white/90 text-sm">
                Your course will be reviewed by our team before going live. This usually takes 24-48 hours. 
                You'll receive an email notification once your course is approved and published.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewStep;