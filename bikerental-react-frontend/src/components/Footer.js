import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">🏍️ BikeRental</h3>
            <p className="text-gray-400">
              Your trusted partner for bike rentals. Experience the freedom of the open road.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/bikes" className="hover:text-white">Bikes</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><button type="button" className="hover:text-white bg-none border-none p-0 cursor-pointer text-left">FAQ</button></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold mb-4">Policies</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button type="button" className="hover:text-white bg-none border-none p-0 cursor-pointer text-left">Terms & Conditions</button></li>
              <li><button type="button" className="hover:text-white bg-none border-none p-0 cursor-pointer text-left">Privacy Policy</button></li>
              <li><button type="button" className="hover:text-white bg-none border-none p-0 cursor-pointer text-left">Booking Policies</button></li>
              <li><button type="button" className="hover:text-white bg-none border-none p-0 cursor-pointer text-left">Cancellation</button></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 mb-4">
              <button type="button" className="hover:text-blue-400 bg-none border-none p-0 cursor-pointer"><FiFacebook size={20} /></button>
              <button type="button" className="hover:text-blue-400 bg-none border-none p-0 cursor-pointer"><FiTwitter size={20} /></button>
              <button type="button" className="hover:text-blue-400 bg-none border-none p-0 cursor-pointer"><FiInstagram size={20} /></button>
              <button type="button" className="hover:text-blue-400 bg-none border-none p-0 cursor-pointer"><FiLinkedin size={20} /></button>
            </div>
            <p className="text-gray-400">
              <a href="mailto:support@ridehub.com" className="hover:text-white">
                support@ridehub.com
              </a>
            </p>
            <p className="text-gray-400">+91 9999999999</p>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="text-center text-gray-400">
          <p>&copy; 2024 BikeRental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
