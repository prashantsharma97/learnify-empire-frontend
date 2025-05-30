import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-purple/20 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-neon-blue/20 rounded-full filter blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="block">Launch Your</span>
              <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Course Empire
              </span>
              <span className="block">in Minutes.</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Create, sell, and scale your online courses — all from one powerful platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium 
                             hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 
                             border border-neon-blue/50 flex items-center justify-center gap-2 group">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-3 rounded-full bg-transparent border border-neon-pink/50 text-white font-medium 
                             hover:bg-neon-pink/10 transition-all duration-300 flex items-center justify-center gap-2">
                <Play className="w-4 h-4 text-neon-pink" />
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative w-full max-w-2xl lg:max-w-none">
            <div className="relative z-20 bg-background-dark bg-opacity-80 backdrop-blur-lg rounded-xl p-4">
              {/* Main image with glow effect */}
              <div className="relative animate-float">
                <img 
                  src="https://images.pexels.com/photos/5926387/pexels-photo-5926387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Learnify Dashboard" 
                  className="rounded-lg shadow-2xl border border-neon-blue/30 w-full"
                />
                {/* Neon border glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg opacity-50 blur-sm -z-10"></div>
              </div>
              
              {/* Floating cards with proper z-index and positioning */}
              <div className="absolute -bottom-6 -left-6 w-48 p-4 bg-glass-dark backdrop-blur-sm rounded-lg border border-neon-blue/30 
                            shadow-lg animate-float z-30" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center">
                    <span className="text-xs font-bold">+86%</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Monthly Revenue</p>
                    <p className="text-sm font-semibold">$24,500</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 w-48 p-4 bg-glass-dark backdrop-blur-sm rounded-lg border border-neon-pink/30 
                            shadow-lg animate-float z-30" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-pink flex items-center justify-center">
                    <span className="text-xs font-bold">1.2k</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">New Students</p>
                    <p className="text-sm font-semibold">This Month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust badges */}
        <div className="mt-20 text-center">
          <p className="text-gray-400 mb-6 text-sm uppercase tracking-wider">Trusted by creators worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <div className="h-8">
              <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Company logo" className="h-full object-contain" />
            </div>
            <div className="h-8">
              <img src="https://images.pexels.com/photos/218717/pexels-photo-218717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Company logo" className="h-full object-contain" />
            </div>
            <div className="h-8">
              <img src="https://images.pexels.com/photos/935979/pexels-photo-935979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Company logo" className="h-full object-contain" />
            </div>
            <div className="h-8">
              <img src="https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Company logo" className="h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;