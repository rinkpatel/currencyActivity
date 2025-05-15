import React from 'react';
import { Calendar } from 'lucide-react';

const Header: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="mb-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Daily Opportunites
      </h1>
      <div className="flex items-center text-gray-500 space-x-1.5 text-sm">
        <Calendar size={16} />
        <span>{formattedDate}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Complete your daily routines and collect gold coins!
      </p>
    </header>
  );
};

export default Header