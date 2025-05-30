import React from 'react';
import { Globe, Shield, BarChart3, Layout } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="group bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6 
                    transition-all duration-300 hover:border-neon-blue/60 hover:shadow-lg hover:shadow-neon-blue/20">
      <div className="w-12 h-12 mb-4 rounded-full flex items-center justify-center
                     bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30
                     group-hover:border-neon-blue/60 group-hover:shadow-md group-hover:shadow-neon-blue/30
                     transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-6 h-6 text-neon-blue" />,
      title: "Custom Subdomains",
      description: "Give your course a professional home with fully customizable domains and branding options."
    },
    {
      icon: <Shield className="w-6 h-6 text-neon-purple" />,
      title: "Secure Payments",
      description: "Accept payments globally with our built-in payment processing and advanced fraud protection."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-neon-pink" />,
      title: "Student Analytics",
      description: "Track student progress, engagement, and revenue with powerful real-time analytics."
    },
    {
      icon: <Layout className="w-6 h-6 text-neon-blue" />,
      title: "Drag & Drop Builder",
      description: "Create beautiful course content with our intuitive drag-and-drop course builder."
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-neon-purple/10 rounded-full filter blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to create, launch, and scale your online course business in one powerful platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;