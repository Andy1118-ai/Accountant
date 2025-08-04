import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Star, Heart, MapPin, ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingSystem = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
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
    { id: 1, name: 'Tax Consultation', duration: '60 min', price: 'KSh 12,000', color: 'from-primary-500 to-primary-600', description: 'Comprehensive tax planning and consultation' },
    { id: 2, name: 'Financial Planning', duration: '45 min', price: 'KSh 8,500', color: 'from-secondary-500 to-secondary-600', description: 'Strategic financial planning for your business' },
    { id: 3, name: 'Business Advisory', duration: '90 min', price: 'KSh 15,000', color: 'from-purple-500 to-purple-600', description: 'Expert business guidance and strategy' },
    { id: 4, name: 'Audit Services', duration: '75 min', price: 'KSh 9,500', color: 'from-orange-500 to-orange-600', description: 'Professional audit and assurance services' }
  ];

  const steps = [
    { id: 'calendar', title: 'Select Date', icon: Calendar },
    { id: 'time', title: 'Choose Time', icon: Clock },
    { id: 'service', title: 'Pick Service', icon: Star },
    { id: 'confirmation', title: 'Confirm', icon: Check }
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

  const handleServiceSelect = (service: typeof services[0]) => {
    setSelectedService(service);
    setBookingStep('confirmation');
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && selectedService) {
      const dateKey = formatDateKey(selectedDate);
      setBookedSlots(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), selectedTime]
      }));
      // Simulate booking completion
      setTimeout(() => {
        resetBooking();
      }, 3000);
    }
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService(null);
    setBookingStep('calendar');
  };

  const goBack = () => {
    switch (bookingStep) {
      case 'time':
        setBookingStep('calendar');
        break;
      case 'service':
        setBookingStep('time');
        break;
      case 'confirmation':
        setBookingStep('service');
        break;
      default:
        break;
    }
  };

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.id === bookingStep);
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-lg"
            >
              <Calendar className="w-8 h-8 text-primary-600" />
            </motion.div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Book Your Session
          </h1>
          <p className="text-gray-600">Choose your perfect time slot</p>
        </motion.div>

        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between bg-white/60 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-lg">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    index <= getCurrentStepIndex()
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                    index < getCurrentStepIndex() ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <motion.div 
          layout
          className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden"
        >
          
          {/* Calendar View */}
          <AnimatePresence mode="wait">
            {bookingStep === 'calendar' && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigateMonth(-1)}
                    className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 transform hover:scale-110 shadow-lg border border-white/30"
                  >
                    <ChevronLeft className="w-5 h-5 text-primary-600" />
                  </motion.button>
                  
                  <h2 className="text-xl font-bold text-gray-900">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigateMonth(1)}
                    className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 transform hover:scale-110 shadow-lg border border-white/30"
                  >
                    <ChevronRight className="w-5 h-5 text-primary-600" />
                  </motion.button>
                </div>

                {/* Days of Week */}
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-center text-gray-600 font-medium text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <motion.div 
                  animate={animateCalendar ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-7 gap-1"
                >
                  {days.map((day, index) => {
                    const isToday = day.date.toDateString() === new Date().toDateString();
                    const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();
                    const isDisabled = !day.isCurrentMonth || isDateDisabled(day.date);
                    const hasBookings = day.isCurrentMonth && bookedSlots[formatDateKey(day.date)]?.length > 0;

                    return (
                      <motion.button
                        key={index}
                        whileHover={!isDisabled ? { scale: 1.1 } : {}}
                        whileTap={!isDisabled ? { scale: 0.95 } : {}}
                        onClick={() => handleDateSelect(day)}
                        disabled={isDisabled}
                        className={`
                          aspect-square rounded-xl text-sm font-medium transition-all duration-300 transform relative
                          ${isDisabled 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-white/60 hover:shadow-lg'
                          }
                          ${isToday && !isSelected ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg' : ''}
                          ${isSelected ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-xl scale-110' : ''}
                          ${!day.isCurrentMonth ? 'opacity-30' : ''}
                        `}
                      >
                        {day.date.getDate()}
                        {hasBookings && day.isCurrentMonth && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}

            {/* Time Selection */}
            {bookingStep === 'time' && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goBack}
                    className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 shadow-lg border border-white/30"
                  >
                    <ArrowLeft className="w-5 h-5 text-primary-600" />
                  </motion.button>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900">Select Time</h3>
                    <p className="text-gray-600 text-sm">{selectedDate?.toLocaleDateString()}</p>
                  </div>
                  <div className="w-9"></div>
                </div>

                <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {timeSlots.map((time) => {
                    const isBooked = isTimeSlotBooked(time);
                    const isSelected = selectedTime === time;

                    return (
                      <motion.button
                        key={time}
                        whileHover={!isBooked ? { scale: 1.05 } : {}}
                        whileTap={!isBooked ? { scale: 0.95 } : {}}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isBooked}
                        className={`
                          p-3 rounded-xl text-sm font-medium transition-all duration-300 transform relative
                          ${isBooked 
                            ? 'bg-red-100 text-red-400 cursor-not-allowed' 
                            : 'bg-white/60 text-gray-700 hover:bg-white/80 hover:shadow-lg border border-white/30'
                          }
                          ${isSelected ? 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white scale-105 shadow-lg' : ''}
                        `}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1" />
                        {time}
                        {isBooked && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-0.5 bg-red-400 transform rotate-45"></div>
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Service Selection */}
            {bookingStep === 'service' && (
              <motion.div
                key="service"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goBack}
                    className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 shadow-lg border border-white/30"
                  >
                    <ArrowLeft className="w-5 h-5 text-primary-600" />
                  </motion.button>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900">Choose Service</h3>
                    <p className="text-gray-600 text-sm">{selectedDate?.toLocaleDateString()} at {selectedTime}</p>
                  </div>
                  <div className="w-9"></div>
                </div>

                <div className="space-y-4">
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleServiceSelect(service)}
                      className="w-full p-4 rounded-2xl bg-white/60 hover:bg-white/80 transition-all duration-300 transform hover:shadow-lg border border-white/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg`}>
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <h4 className="text-gray-900 font-bold">{service.name}</h4>
                            <p className="text-gray-600 text-sm">{service.description}</p>
                            <p className="text-gray-500 text-xs">{service.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-900 font-bold text-lg">{service.price}</p>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Confirmation */}
            {bookingStep === 'confirmation' && (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goBack}
                    className="p-2 rounded-xl bg-white/60 hover:bg-white/80 transition-all duration-300 shadow-lg border border-white/30"
                  >
                    <ArrowLeft className="w-5 h-5 text-primary-600" />
                  </motion.button>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900">Booking Summary</h3>
                  </div>
                  <div className="w-9"></div>
                </div>

                {/* Booking Summary */}
                <div className="bg-white/60 rounded-2xl p-6 mb-6 border border-white/30 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-bold text-gray-900">{selectedService?.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-bold text-gray-900">{selectedDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-bold text-gray-900">{selectedTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-bold text-gray-900">{selectedService?.duration}</span>
                    </div>
                    <div className="border-t border-white/30 pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                        <span className="text-xl font-bold text-primary-600">{selectedService?.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center mb-6 text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">123 Business Ave, Financial District</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBooking}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:shadow-xl"
                >
                  Confirm Booking
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Info */}
        {bookingStep !== 'confirmation' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-lg">
              <div className="flex items-center justify-center text-gray-600 text-sm">
                <User className="w-4 h-4 mr-2" />
                <span>Wendy Muhoho CPA</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookingSystem;