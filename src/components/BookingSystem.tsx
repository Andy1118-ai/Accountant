// React import removed – not necessary with the new JSX transform

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Star, Heart, MapPin } from 'lucide-react';

const BookingSystem = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState('calendar');
  const [animateCalendar, setAnimateCalendar] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({
    '2025-06-15': ['10:00', '14:00', '16:30'],
    '2025-06-17': ['09:00', '11:00', '15:00'],
    '2025-06-20': ['13:00', '17:00'],
  });

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const services = [
    { id: 1, name: 'Tax Consultation', duration: '60 min', price: '$120', color: 'from-purple-500 to-pink-500' },
    { id: 2, name: 'Financial Planning', duration: '45 min', price: '$85', color: 'from-blue-500 to-cyan-500' },
    { id: 3, name: 'Business Advisory', duration: '90 min', price: '$150', color: 'from-emerald-500 to-teal-500' },
    { id: 4, name: 'Audit Services', duration: '75 min', price: '$95', color: 'from-orange-500 to-red-500' }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Previous month's trailing days
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    // Next month's leading days
    const remainingSlots = 42 - days.length;
    for (let day = 1; day <= remainingSlots; day++) {
      days.push({ date: new Date(year, month + 1, day), isCurrentMonth: false });
    }
    
    return days;
  };

  const navigateMonth = (direction: number) => {
    setAnimateCalendar(true);
    setTimeout(() => {
      const newDate = new Date(currentDate);
      newDate.setMonth(currentDate.getMonth() + direction);
      setCurrentDate(newDate);
      setAnimateCalendar(false);
    }, 150);
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isTimeSlotBooked = (time: string) => {
    if (!selectedDate) return false;
    const dateKey = formatDateKey(selectedDate);
    return bookedSlots[dateKey]?.includes(time) || false;
  };

  const handleDateSelect = (day: { date: Date; isCurrentMonth: boolean }) => {
    if (!day.isCurrentMonth || isDateDisabled(day.date)) return;
    setSelectedDate(day.date);
    setBookingStep('time');
  };

  const handleTimeSelect = (time: string) => {
    if (isTimeSlotBooked(time)) return;
    setSelectedTime(time);
    setBookingStep('service');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBooking = (_service: typeof services[0]) => {
    // Simulate booking
    if (selectedDate && selectedTime) {
      const dateKey = formatDateKey(selectedDate);
      setBookedSlots(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), selectedTime]
      }));
      setBookingStep('confirmation');
    }
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingStep('calendar');
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000" ></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Book Your Session
          </h1>
          <p className="text-purple-200">Choose your perfect time slot</p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          
          {/* Calendar View */}
          {bookingStep === 'calendar' && (
            <div className="p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  aria-label="Previous month"
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                <h2 className="text-xl font-bold text-white">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                
                <button
                  aria-label="Next month"
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center text-purple-200 font-medium text-sm py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className={`grid grid-cols-7 gap-1 transition-all duration-300 ${animateCalendar ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
                {days.map((day, index) => {
                  const isToday = day.date.toDateString() === new Date().toDateString();
                  const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();
                  const isDisabled = !day.isCurrentMonth || isDateDisabled(day.date);
                  const hasBookings = day.isCurrentMonth && bookedSlots[formatDateKey(day.date)]?.length > 0;

                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(day)}
                      disabled={isDisabled}
                      className={`
                        aspect-square rounded-xl text-sm font-medium transition-all duration-300 transform relative
                        ${isDisabled 
                          ? 'text-gray-500 cursor-not-allowed' 
                          : 'text-white hover:scale-110 hover:bg-white/20'
                        }
                        ${isToday && !isSelected ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg' : ''}
                        ${isSelected ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-xl scale-110' : ''}
                        ${!day.isCurrentMonth ? 'opacity-30' : ''}
                      `}
                    >
                      {day.date.getDate()}
                      {hasBookings && day.isCurrentMonth && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Time Selection */}
          {bookingStep === 'time' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  aria-label="Back to calendar"
                  onClick={() => setBookingStep('calendar')}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white">Select Time</h3>
                  <p className="text-purple-200 text-sm">{selectedDate?.toLocaleDateString()}</p>
                </div>
                <div className="w-9"></div>
              </div>

              <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                {timeSlots.map((time) => {
                  const isBooked = isTimeSlotBooked(time);
                  const isSelected = selectedTime === time;

                  return (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      disabled={isBooked}
                      className={`
                        p-3 rounded-xl text-sm font-medium transition-all duration-300 transform relative
                        ${isBooked 
                          ? 'bg-red-500/20 text-red-300 cursor-not-allowed' 
                          : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'
                        }
                        ${isSelected ? 'bg-gradient-to-r from-green-500 to-emerald-500 scale-105 shadow-lg' : ''}
                      `}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      {time}
                      {isBooked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-0.5 bg-red-400 transform rotate-45"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Service Selection */}
          {bookingStep === 'service' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  aria-label="Back to time selection"
                  onClick={() => setBookingStep('time')}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white">Choose Service</h3>
                  <p className="text-purple-200 text-sm">{selectedDate?.toLocaleDateString()} at {selectedTime}</p>
                </div>
                <div className="w-9"></div>
              </div>

              <div className="space-y-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleBooking(service)}
                    className="w-full p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-white/20"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-white font-bold">{service.name}</h4>
                          <p className="text-purple-200 text-sm">{service.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">{service.price}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Confirmation */}
          {bookingStep === 'confirmation' && (
            <div className="p-6 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                <p className="text-purple-200">Your session has been successfully booked</p>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/20">
                <div className="flex items-center justify-between text-white text-sm">
                  <span>Date:</span>
                  <span className="font-bold">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-white text-sm mt-2">
                  <span>Time:</span>
                  <span className="font-bold">{selectedTime}</span>
                </div>
                <div className="flex items-center justify-center mt-4 text-purple-200">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">123 Business Ave, Financial District</span>
                </div>
              </div>

              <button
                onClick={resetBooking}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Book Another Session
              </button>
            </div>
          )}
        </div>

        {/* Bottom Action Button */}
        {(bookingStep === 'calendar' || bookingStep === 'time') && (
          <div className="mt-6">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20">
              <div className="flex items-center justify-center text-purple-200 text-sm">
                <User className="w-4 h-4 mr-2" />
                <span>Wendy Muhoho CPA</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSystem; 