import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

interface PlanFeature {
  feature: string;
  starter: boolean;
  pro: boolean;
  creator: boolean;
}

const Pricing: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  const features: PlanFeature[] = [
    { feature: "Custom domain", starter: true, pro: true, creator: true },
    { feature: "Unlimited courses", starter: false, pro: true, creator: true },
    { feature: "Student analytics", starter: true, pro: true, creator: true },
    { feature: "Payment processing", starter: true, pro: true, creator: true },
    { feature: "Email marketing", starter: false, pro: true, creator: true },
    { feature: "Course communities", starter: false, pro: false, creator: true },
    { feature: "Affiliate program", starter: false, pro: false, creator: true },
    { feature: "White labeling", starter: false, pro: false, creator: true },
  ];

  return (
    <section id="pricing" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-neon-purple/10 rounded-full filter blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Start with our free plan and upgrade as your course business grows.
          </p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center mt-8">
            <span className={`mr-3 ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-12 items-center rounded-full border border-neon-blue/50 transition-colors focus:outline-none"
              aria-pressed={isYearly}
            >
              <span className="sr-only">Toggle billing period</span>
              <span
                className={`${
                  isYearly ? 'translate-x-6 bg-neon-blue' : 'translate-x-1 bg-white'
                } inline-block h-4 w-4 transform rounded-full transition-transform`}
              />
            </button>
            <span className={`ml-3 ${isYearly ? 'text-white' : 'text-gray-400'}`}>
              Yearly <span className="text-neon-pink text-xs font-semibold">Save 20%</span>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-glass-dark backdrop-blur-sm border border-neon-blue/30 rounded-lg overflow-hidden
                         transition-all duration-300 hover:shadow-xl hover:shadow-neon-blue/20 group">
            <div className="p-6 border-b border-neon-blue/20">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-gray-400 mb-4">Perfect for beginners</p>
              <div className="flex items-end">
                <span className="text-4xl font-bold">${isYearly ? '19' : '24'}</span>
                <span className="text-gray-400 ml-2">/ month</span>
              </div>
              {isYearly && (
                <p className="text-neon-pink text-sm mt-2">
                  $228 billed annually (save $60)
                </p>
              )}
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.starter ? (
                      <Check className="w-5 h-5 text-neon-blue mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.starter ? 'text-gray-300' : 'text-gray-500'}>
                      {feature.feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full mt-8 px-6 py-3 rounded-full bg-transparent border border-neon-blue text-white font-medium 
                               hover:bg-neon-blue/10 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
          
          {/* Pro Plan */}
          <div className="bg-glass-dark backdrop-blur-sm border border-neon-purple/40 rounded-lg overflow-hidden
                         transition-all duration-300 hover:shadow-xl hover:shadow-neon-purple/20 group
                         transform md:-translate-y-4 relative">
            {/* Popular tag */}
            <div className="absolute top-0 right-0">
              <div className="bg-neon-purple text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
            </div>
            
            <div className="p-6 border-b border-neon-purple/20">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-gray-400 mb-4">For growing creators</p>
              <div className="flex items-end">
                <span className="text-4xl font-bold">${isYearly ? '49' : '59'}</span>
                <span className="text-gray-400 ml-2">/ month</span>
              </div>
              {isYearly && (
                <p className="text-neon-pink text-sm mt-2">
                  $588 billed annually (save $120)
                </p>
              )}
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.pro ? (
                      <Check className="w-5 h-5 text-neon-purple mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.pro ? 'text-gray-300' : 'text-gray-500'}>
                      {feature.feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium 
                               hover:shadow-lg hover:shadow-neon-purple/50 transition-all duration-300 
                               border border-neon-purple/50">
                Get Started
              </button>
            </div>
          </div>
          
          {/* Creator Plan */}
          <div className="bg-glass-dark backdrop-blur-sm border border-neon-pink/30 rounded-lg overflow-hidden
                         transition-all duration-300 hover:shadow-xl hover:shadow-neon-pink/20 group">
            <div className="p-6 border-b border-neon-pink/20">
              <h3 className="text-xl font-semibold mb-2">Creator</h3>
              <p className="text-gray-400 mb-4">For established creators</p>
              <div className="flex items-end">
                <span className="text-4xl font-bold">${isYearly ? '99' : '119'}</span>
                <span className="text-gray-400 ml-2">/ month</span>
              </div>
              {isYearly && (
                <p className="text-neon-pink text-sm mt-2">
                  $1,188 billed annually (save $240)
                </p>
              )}
            </div>
            
            <div className="p-6">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.creator ? (
                      <Check className="w-5 h-5 text-neon-pink mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.creator ? 'text-gray-300' : 'text-gray-500'}>
                      {feature.feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full mt-8 px-6 py-3 rounded-full bg-transparent border border-neon-pink text-white font-medium 
                               hover:bg-neon-pink/10 transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>
        </div>
        
        {/* Enterprise */}
        <div className="mt-16 max-w-5xl mx-auto bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-8
                       transition-all duration-300 hover:shadow-lg hover:shadow-neon-blue/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-400">Custom solutions for large organizations and educational institutions.</p>
            </div>
            <button className="px-8 py-3 rounded-full bg-transparent border border-neon-blue text-white font-medium 
                             hover:bg-neon-blue/10 transition-all duration-300 whitespace-nowrap">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;