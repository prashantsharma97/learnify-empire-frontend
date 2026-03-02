import { Input } from "@/components/ui/input";
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

interface PricingStepProps {
  courseData: CourseData;
  setCourseData: (data: CourseData | ((prev: CourseData) => CourseData)) => void;
}

const PricingStep = ({ courseData, setCourseData }: PricingStepProps) => {
  const pricingOptions = [
    { 
      type: "Free", 
      price: "0", 
      desc: "Perfect for building your audience and showcasing your expertise", 
      color: "from-gray-600 to-gray-700",
      icon: "🎁"
    },
    { 
      type: "Premium", 
      price: "", 
      desc: "Best for comprehensive courses with high value content", 
      color: "from-neon-purple to-neon-cyan",
      icon: "⭐"
    },
    { 
      type: "Enterprise", 
      price: "", 
      desc: "Advanced courses for professional development", 
      color: "from-neon-magenta to-neon-orange",
      icon: "🚀"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">💰</span>
        <h2 className="text-2xl font-orbitron font-semibold text-white">Course Pricing</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {pricingOptions.map((option) => (
          <Card key={option.type} className={`bg-gradient-to-br ${option.color} border-0 cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden`}>
            <CardContent className="p-6 text-center">
              <div className="text-3xl mb-3">{option.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{option.type}</h3>
              <div className="text-3xl font-bold text-white mb-3">
                {option.type === "Free" ? "FREE" : `$${option.price || "XX"}`}
              </div>
              <p className="text-white/90 text-sm leading-relaxed">{option.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-white font-medium mb-3">Set Course Price ($)</label>
          <Input
            type="number"
            placeholder="Enter price (e.g., 99)"
            value={courseData.price}
            onChange={(e) => setCourseData(prev => ({ ...prev, price: e.target.value }))}
            className="bg-dark-300/50 border-white/20 text-white h-12 text-lg focus:border-neon-cyan"
          />
        </div>
        
        <div className="bg-dark-300/30 rounded-lg p-4 border border-white/10">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Course Price:</span>
            <span className="text-white">${courseData.price || "0"}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Platform Fee (10%):</span>
            <span className="text-neon-magenta">-${(parseFloat(courseData.price || "0") * 0.1).toFixed(2)}</span>
          </div>
          <div className="border-t border-white/20 pt-2 mt-2">
            <div className="flex justify-between font-semibold">
              <span className="text-white">You Receive:</span>
              <span className="text-neon-green">${(parseFloat(courseData.price || "0") * 0.9).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;
