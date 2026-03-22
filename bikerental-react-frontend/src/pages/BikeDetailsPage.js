import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vehicleService, bookingService } from '../services/apiService';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { FiChevronLeft, FiDollarSign, FiUsers, FiCalendar } from 'react-icons/fi';

const BikeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    fromDate: '',
    toDate: '',
    message: '',
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchBikeDetails();
  }, [id]);

  const fetchBikeDetails = async () => {
    try {
      const response = await vehicleService.getVehicleById(id);
      setBike(response.data);
    } catch (error) {
      toast.error('Failed to load bike details');
      navigate('/bikes');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to book a bike');
      navigate('/login');
      return;
    }

    setBookingLoading(true);

    try {
      await bookingService.createBooking({
        ...bookingData,
        vehicleId: parseInt(id),
      });
      toast.success('Booking successful!');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Loading bike details...</p>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-600">Bike not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/bikes')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <FiChevronLeft /> Back to Bikes
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <img
            src={bike.vimage1 || 'https://via.placeholder.com/500x400?text=Bike'}
            alt={bike.vehiclesTitle}
            className="w-full rounded-lg shadow-md mb-4"
          />
          <div className="grid grid-cols-3 gap-2">
            {[bike.vimage2, bike.vimage3, bike.vimage4].map((img, idx) => (
              img && (
                <img
                  key={idx}
                  src={img}
                  alt="Bike"
                  className="w-full h-24 object-cover rounded cursor-pointer hover:opacity-80"
                />
              )
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{bike.vehiclesTitle}</h1>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">{bike.vehiclesOverview}</p>
          </div>

          {/* Specs */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Model Year</p>
                <p className="font-bold">{bike.modelYear}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Fuel Type</p>
                <p className="font-bold">{bike.fuelType}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Seating Capacity</p>
                <p className="font-bold flex items-center gap-2">
                  <FiUsers /> {bike.seatingCapacity} Persons
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Price Per Day</p>
                <p className="font-bold text-blue-600 flex items-center gap-2">
                  <FiDollarSign /> ${bike.pricePerDay}
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          {(bike.airConditioner || bike.powerSteering || bike.powerWindows) && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {bike.airConditioner && <div className="flex items-center">✓ Air Conditioner</div>}
                {bike.powerSteering && <div className="flex items-center">✓ Power Steering</div>}
                {bike.powerWindows && <div className="flex items-center">✓ Power Windows</div>}
                {bike.powerDoorLocks && <div className="flex items-center">✓ Power Door Locks</div>}
                {bike.centralLocking && <div className="flex items-center">✓ Central Locking</div>}
                {bike.leatherSeats && <div className="flex items-center">✓ Leather Seats</div>}
              </div>
            </div>
          )}

          {/* Booking Form */}
          <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FiCalendar /> Book This Bike
            </h3>

            <form onSubmit={handleBooking} className="space-y-4">
              <div className="form-group">
                <label className="form-label">From Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={bookingData.fromDate}
                  onChange={(e) => setBookingData({ ...bookingData, fromDate: e.target.value })}
                  required
                  disabled={bookingLoading || !isAuthenticated}
                />
              </div>

              <div className="form-group">
                <label className="form-label">To Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={bookingData.toDate}
                  onChange={(e) => setBookingData({ ...bookingData, toDate: e.target.value })}
                  required
                  disabled={bookingLoading || !isAuthenticated}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message (Optional)</label>
                <textarea
                  className="form-textarea"
                  value={bookingData.message}
                  onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                  disabled={bookingLoading || !isAuthenticated}
                />
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary"
                disabled={bookingLoading || !isAuthenticated}
              >
                {bookingLoading ? 'Booking...' : isAuthenticated ? 'Book Now' : 'Login to Book'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetailsPage;
