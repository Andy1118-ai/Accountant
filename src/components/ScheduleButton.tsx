import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ScheduleButtonProps {
  className?: string;
  text?: string;
}

const ScheduleButton: React.FC<ScheduleButtonProps> = ({ 
  className = "bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2",
  text = "Schedule Consultation"
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/book');
  };

  return (
    <button 
      onClick={handleClick}
      className={className}
    >
      <span>{text}</span>
      <ArrowRight className="h-5 w-5" />
    </button>
  );
};

export default ScheduleButton; 