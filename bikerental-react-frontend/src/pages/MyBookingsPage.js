import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/apiService';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { FiTrash2, FiClock } from 'react-icons/fi';

const MyBookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchMyBookings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      const response = await bookingService.getMyBookings(user.email);
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    setDeleting(bookingId);
    try {
      await bookingService.deleteBooking(bookingId);
      setBookings(bookings.filter(b => b.id !== bookingId));
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel booking');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 0) return <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Pending</span>;
    if (status === 1) return <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Approved</span>;
    if (status === 2) return <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Cancelled</span>;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <FiClock size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
          <a href="/bikes" className="text-blue-600 hover:text-blue-800 font-bold">
            Browse bikes and book now
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="card flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold">Booking #{booking.id}</h3>
                  {getStatusBadge(booking.status)}
                </div>
                <p className="text-gray-600 mb-2">
                  From: <span className="font-bold">{booking.fromDate}</span> → To: <span className="font-bold">{booking.toDate}</span>
                </p>
                {booking.message && (
                  <p className="text-gray-600">Message: {booking.message}</p>
                )}
              </div>

              <button
                onClick={() => handleDelete(booking.id)}
                disabled={deleting === booking.id}
                className="mt-4 md:mt-0 btn btn-danger flex items-center gap-2"
              >
                <FiTrash2 />
                {deleting === booking.id ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
