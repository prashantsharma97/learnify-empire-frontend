import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'student' | 'instructor' | 'admin';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'student' 
}) => {
  const variantClasses = {
    student: 'card-student',
    instructor: 'card-instructor',
    admin: 'card-admin',
  };

  return (
    <div className={`card ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;