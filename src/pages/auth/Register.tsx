import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { registerUser } from '../../apiComponents/apiService.js';
import { jwtDecode } from 'jwt-decode';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    tenantId: ''
  });

  const [message, setMessage] = useState('');
  const [role, setRole] = useState<'student' | 'instructor'>('student');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    try {
      const payload = {
        ...formData, role
      }
      const response = await registerUser(payload);

      if (response.status === 201 && response.data.token) {
        setMessage("User registered successfully!");
        const token = response.data.token;
        console.log(token);
        localStorage.setItem('token', token);
        const decoded: any = jwtDecode(token);
        const role = decoded.role;
        console.log(decoded);
        console.log(role);
        if (role === 'admin') {
        navigate('/dashboard/admin');
      } else if (role === 'instructor') {
        navigate('/dashboard/instructor');
      } else if (role === 'student') {
        navigate('/dashboard/student');
      } else {
        setMessage('Unknown role');
      }
      } else {
        setMessage('Unexpected response from server');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-purple/20 rounded-full filter blur-[120px]" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-neon-blue/20 rounded-full filter blur-[120px]" />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center mb-8 group">
          <span className="text-2xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Learnify
          </span>
        </Link>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-glass-dark backdrop-blur-sm border border-neon-blue/20 rounded-lg p-8
                                               transition-all duration-300 hover:border-neon-blue/40 hover:shadow-lg hover:shadow-neon-blue/20">

          <div className='mb-6'>
            <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
              Sign in as
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${role === 'student'
                  ? 'bg-student-primary/20 text-student-primary border border-student-primary/30'
                  : 'bg-dark-100 text-gray-400 border border-gray-700 hover:bg-dark-200'
                  }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('instructor')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${role === 'instructor'
                  ? 'bg-instructor-primary/20 text-instructor-primary border border-instructor-primary/30'
                  : 'bg-dark-100 text-gray-400 border border-gray-700 hover:bg-dark-200'
                  }`}
              >
                Instructor
              </button>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">User ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="tenantId"
                  value={formData.tenantId}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-glass-dark backdrop-blur-sm border border-neon-blue/30 rounded-lg
                           focus:outline-none focus:border-neon-blue text-white placeholder-gray-500
                           transition-all duration-300"
                  placeholder="Example john11"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-glass-dark backdrop-blur-sm border border-neon-blue/30 rounded-lg
                           focus:outline-none focus:border-neon-blue text-white placeholder-gray-500
                           transition-all duration-300"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-glass-dark backdrop-blur-sm border border-neon-blue/30 rounded-lg
                           focus:outline-none focus:border-neon-blue text-white placeholder-gray-500
                           transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-glass-dark backdrop-blur-sm border border-neon-blue/30 rounded-lg
                           focus:outline-none focus:border-neon-blue text-white placeholder-gray-500
                           transition-all duration-300"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-glass-dark backdrop-blur-sm border border-neon-blue/30 rounded-lg
                           focus:outline-none focus:border-neon-blue text-white placeholder-gray-500
                           transition-all duration-300"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium 
                       hover:shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 
                       border border-neon-blue/50 flex items-center justify-center gap-2 group"
            >
              Create Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-neon-blue hover:text-neon-purple transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;