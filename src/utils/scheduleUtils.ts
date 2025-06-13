import { useNavigate } from 'react-router-dom';

export const useScheduleNavigation = () => {
  const navigate = useNavigate();

  const handleScheduleClick = () => {
    navigate('/book');
  };

  return { handleScheduleClick };
}; 