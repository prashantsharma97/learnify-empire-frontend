import React from 'react';
import { useState } from 'react';
import { FileText, Upload, DollarSign, Play, ArrowRight, X } from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, isLast = false }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative group">
      {/* Step number with glow */}
      <div className="flex-shrink-0 relative">
        <div className="w-16 h-16 rounded-full bg-background-dark border-2 border-neon-blue flex items-center justify-center
                       shadow-lg shadow-neon-blue/20 z-10 relative animate-glow group-hover:border-neon-purple">
          <span className="text-2xl font-bold text-neon-blue group-hover:text-neon-purple transition-colors">{number}</span>
        </div>
        
        {/* Connecting line */}
        {!isLast && (
          <div className="absolute left-8 top-16 w-0.5 h-24 md:h-0 md:left-16 md:top-8 md:h-0.5 md:w-16 
                         bg-gradient-to-b md:bg-gradient-to-r from-neon-blue to-transparent hidden md:block
                         group-hover:from-neon-purple"></div>
        )}
      </div>
      
      {/* Step content */}
      <div className="flex-1 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-neon-purple transition-colors">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
        
        <div className="w-20 h-20 rounded-lg bg-glass-dark backdrop-blur-sm border border-neon-purple/30 
                       flex items-center justify-center shadow-lg flex-shrink-0 md:self-center
                       group-hover:border-neon-purple/60 group-hover:shadow-neon-purple/30 transition-all">
          {icon}
        </div>
      </div>
    </div>
  );
};

const VideoModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-background-darker rounded-2xl overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Course Creation Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section id="how-it-works" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-neon-pink/10 rounded-full filter blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Launch your course in three simple steps and start earning in no time.
          </p>
          
          {/* Video preview button */}
          <button 
            onClick={() => setIsVideoOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-glass-dark backdrop-blur-sm
                     border border-neon-purple/30 hover:border-neon-purple/60 transition-all duration-300
                     group"
          >
            <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center
                          group-hover:bg-neon-purple/30 transition-all">
              <Play className="w-4 h-4 text-neon-purple" />
            </div>
            <span>Watch How It Works</span>
          </button>
        </div>
        
        <div className="max-w-4xl mx-auto flex flex-col gap-16 md:gap-8">
          <Step 
            number={1}
            title="Create Your Course"
            description="Use our intuitive drag-and-drop builder to create engaging course content with videos, quizzes, and assignments."
            icon={<FileText className="w-10 h-10 text-neon-blue group-hover:text-neon-purple transition-colors" />}
          />
          
          <Step 
            number={2}
            title="Publish & Customize"
            description="Launch your course with your own branding, custom domain, and personalized learning experience."
            icon={<Upload className="w-10 h-10 text-neon-purple" />}
          />
          
          <Step 
            number={3}
            title="Sell & Scale"
            description="Market your course, accept payments, and track your growth with powerful analytics."
            icon={<DollarSign className="w-10 h-10 text-neon-pink" />}
            isLast
          />
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium 
                           hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 
                           border border-neon-blue/50 flex items-center gap-2 mx-auto">
            Start Building Your Course
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};

export default HowItWorks;