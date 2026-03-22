import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          🏍️ BikeRental
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/bikes" className="hover:text-blue-200">Bikes</Link>
          <Link to="/contact" className="hover:text-blue-200">Contact</Link>

          {isAuthenticated ? (
            <>
              <Link to="/my-bookings" className="hover:text-blue-200">My Bookings</Link>
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-1 hover:text-blue-200">
                  <FiUser /> {user?.fullName || 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-600 px-3 py-2 rounded hover:bg-red-700"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-blue-700 px-4 py-3 flex flex-col gap-3">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/bikes" className="hover:text-blue-200">Bikes</Link>
          <Link to="/contact" className="hover:text-blue-200">Contact</Link>

          {isAuthenticated ? (
            <>
              <Link to="/my-bookings" className="hover:text-blue-200">My Bookings</Link>
              <Link to="/profile" className="flex items-center gap-1 hover:text-blue-200">
                <FiUser /> {user?.fullName || 'Profile'}
              </Link>
              <button
                onClick={handleLogout}
                className="text-left hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/signup" className="hover:text-blue-200">Sign Up</Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
