import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import BikeListingPage from './pages/BikeListingPage';
import BikeDetailsPage from './pages/BikeDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MyBookingsPage from './pages/MyBookingsPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';

import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bikes" element={<BikeListingPage />} />
              <Route path="/bikes/:id" element={<BikeDetailsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Protected Routes */}
              <Route
                path="/my-bookings"
                element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>}
              />
              <Route
                path="/profile"
                element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
              />
              <Route
                path="/admin"
                element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>}
              />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
