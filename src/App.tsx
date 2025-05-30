import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <Router>
      <div className="font-poppins text-white bg-background-dark min-h-screen overflow-hidden relative">
        <ParticleBackground />
        <Routes>  
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;