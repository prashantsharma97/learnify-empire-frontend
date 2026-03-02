import { Card, CardContent } from "@/components/ui/card";

interface Step {
  id: number;
  title: string;
  icon: string;
  desc: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
}

const ProgressSteps = ({ steps, currentStep }: ProgressStepsProps) => {
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  return (
    <Card className="glass-card border-white/10 overflow-hidden">
      <CardContent className="p-8">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-700">
            <div 
              className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
          
          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center group">
                <div className={`
                  relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 mb-3
                  ${getStepStatus(step.id) === "completed" 
                    ? "bg-gradient-to-r from-neon-green to-neon-cyan text-white shadow-neon-green" 
                    : getStepStatus(step.id) === "current"
                    ? "bg-gradient-to-r from-neon-purple to-neon-cyan text-white shadow-neon-purple animate-pulse" 
                    : "bg-gray-700 text-gray-400 group-hover:bg-gray-600"
                  }
                `}>
                  {getStepStatus(step.id) === "completed" ? "✓" : step.icon}
                  
                  {getStepStatus(step.id) === "current" && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full opacity-75 animate-ping" />
                  )}
                </div>
                
                <div className="text-center space-y-1">
                  <h3 className={`font-semibold font-space transition-colors ${
                    getStepStatus(step.id) === "current" ? "text-neon-cyan" : "text-white"
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 max-w-24">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressSteps;