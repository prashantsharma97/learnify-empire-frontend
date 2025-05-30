import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, avatar, rating }) => {
  return (
    <div className="bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6 
                  transition-all duration-300 hover:border-neon-blue/60 hover:shadow-lg hover:shadow-neon-blue/30
                  relative overflow-hidden group">
      {/* Quote icon */}
      <div className="absolute -top-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote className="w-24 h-24 text-neon-purple" strokeWidth={1} />
      </div>
      
      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-lg opacity-30 blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Rating stars */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'text-neon-pink fill-neon-pink' : 'text-gray-600'}`} 
            />
          ))}
        </div>
        
        <p className="text-gray-300 mb-6">{quote}</p>
        
        <div className="flex items-center">
          <img 
            src={avatar} 
            alt={author} 
            className="w-10 h-10 rounded-full mr-4 border border-neon-purple/30" 
          />
          <div>
            <h4 className="font-medium">{author}</h4>
            <p className="text-sm text-gray-400">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Learnify helped me launch my coding bootcamp in just days. The analytics and payment processing are incredible!",
      author: "Alex Morgan",
      role: "Web Development Instructor",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    },
    {
      quote: "My fitness course went from idea to $10k/month in just 60 days. The platform is so intuitive and powerful.",
      author: "Sarah Chen",
      role: "Fitness Coach",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 5
    },
    {
      quote: "The student engagement tools are game-changing. My completion rates went up 75% after switching to Learnify.",
      author: "Marcus Johnson",
      role: "Business Coach",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-neon-blue/10 rounded-full filter blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
            Creator Success Stories
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of creators who've transformed their knowledge into thriving online course businesses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
            />
          ))}
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6 text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent mb-2">
              10k+
            </p>
            <p className="text-gray-400">Active Creators</p>
          </div>
          
          <div className="bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6 text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent mb-2">
              $25M+
            </p>
            <p className="text-gray-400">Creator Earnings</p>
          </div>
          
          <div className="bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6 text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent mb-2">
              500k+
            </p>
            <p className="text-gray-400">Students Taught</p>
          </div>
          
          <div className="bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-6 text-center">
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent mb-2">
              98%
            </p>
            <p className="text-gray-400">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;