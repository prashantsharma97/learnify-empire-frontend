import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Cpu } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background-darker bg-opacity-80 backdrop-blur-md py-2 shadow-lg shadow-neon-blue/10'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Cpu className="h-8 w-8 text-neon-blue animate-pulse-slow" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
              Learnify
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-neon-blue transition-colors duration-300"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-neon-blue transition-colors duration-300"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-neon-blue transition-colors duration-300"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-neon-blue transition-colors duration-300"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-gray-300 hover:text-neon-blue transition-colors duration-300"
            >
              FAQ
            </a>
            {/* <button
              className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium 
                        hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300
                        border border-neon-blue/50"
            >
              Sign In
            </button> */}

            <Link to="/login" className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium 
                        hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300
                        border border-neon-blue/50">
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-neon-pink" />
              ) : (
                <Menu className="h-6 w-6 text-neon-blue" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-glass-dark backdrop-blur-lg rounded-lg border border-neon-blue/20 animate-fadeIn">
            <div className="flex flex-col space-y-4 px-4">
              <a
                href="#features"
                className="text-gray-300 hover:text-neon-blue transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-300 hover:text-neon-blue transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-neon-blue transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#pricing"
                className="text-gray-300 hover:text-neon-blue transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-gray-300 hover:text-neon-blue transition-colors duration-300 py-2"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </a>
              <button
                className="py-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium 
                          hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;