import React, { useState, useEffect } from 'react';
import { bookingService, vehicleService } from '../services/apiService';
import { toast } from 'react-toastify';
import { FiBarChart2, FiTruck, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalVehicles: 0,
    pendingBookings: 0,
    approvedBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [bookingsRes, vehiclesRes, pendingRes, approvedRes] = await Promise.all([
        bookingService.getAllBookings(),
        vehicleService.getAllVehicles(),
        bookingService.getBookingsByStatus(0),
        bookingService.getBookingsByStatus(1),
      ]);

      setStats({
        totalBookings: bookingsRes.data.length,
        totalVehicles: vehiclesRes.data.length,
        pendingBookings: pendingRes.data.length,
        approvedBookings: approvedRes.data.length,
      });
    } catch (error) {
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-blue-50 border-l-4 border-blue-600">
          <div className="flex items-center gap-4">
            <FiBarChart2 className="text-blue-600 text-3xl" />
            <div>
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-3xl font-bold">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="card bg-green-50 border-l-4 border-green-600">
          <div className="flex items-center gap-4">
            <FiTruck className="text-green-600 text-3xl" />
            <div>
              <p className="text-gray-600 text-sm">Total Vehicles</p>
              <p className="text-3xl font-bold">{stats.totalVehicles}</p>
            </div>
          </div>
        </div>

        <div className="card bg-yellow-50 border-l-4 border-yellow-600">
          <div className="flex items-center gap-4">
            <FiCalendar className="text-yellow-600 text-3xl" />
            <div>
              <p className="text-gray-600 text-sm">Pending Bookings</p>
              <p className="text-3xl font-bold">{stats.pendingBookings}</p>
            </div>
          </div>
        </div>

        <div className="card bg-purple-50 border-l-4 border-purple-600">
          <div className="flex items-center gap-4">
            <FiCheckCircle className="text-purple-600 text-3xl" />
            <div>
              <p className="text-gray-600 text-sm">Approved Bookings</p>
              <p className="text-3xl font-bold">{stats.approvedBookings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-600 hover:text-blue-800">View All Bookings</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">Manage Vehicles</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">Manage Brands</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">View Users</a></li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Admin Features</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-600 hover:text-blue-800">Approve Testimonials</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">View Contact Queries</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">Generate Reports</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">System Settings</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
