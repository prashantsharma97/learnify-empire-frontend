import React from 'react';
import { Cpu, Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative pt-20 pb-10 bg-background-darker">
      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-neon-blue/5 rounded-full filter blur-[150px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Cpu className="h-8 w-8 text-neon-blue" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                Learnify
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The all-in-one platform for creating, selling, and scaling your online courses. Turn your knowledge into a thriving business.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Enterprise</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Creator Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">API Docs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-blue transition-colors duration-300">Legal</a></li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-neon-blue/20 pt-10 pb-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay in the loop</h3>
            <p className="text-gray-400 mb-6">
              Get the latest updates, tips, and creator inspiration delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mx-auto max-w-md">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full pl-10 pr-4 py-3 bg-glass-dark backdrop-blur-sm border border-neon-blue/30 rounded-full 
                            focus:outline-none focus:border-neon-blue text-white placeholder-gray-500"
                />
              </div>
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium 
                              hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 
                              border border-neon-blue/50">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-neon-blue/20 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Learnify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;