import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import ClientLogin from './pages/auth/ClientLogin';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import BookingSystem from './components/BookingSystem';
import Quotation from './pages/Quotation';
import ForgotPassword from './pages/auth/ForgotPassword';
import Register from './pages/auth/Register';

function Layout() {
  const location = useLocation();
  const hideFooter = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/login" element={<ClientLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/book" element={<BookingSystem />} />
          <Route path="/quotation/:serviceId" element={<Quotation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* Booking with service parameter */}
          <Route path="/booking/:serviceId" element={<BookingSystem />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* 404 Route */}
          <Route path="*" element={
            <div className="text-center py-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-600">Page not found</p>
            </div>
          } />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;