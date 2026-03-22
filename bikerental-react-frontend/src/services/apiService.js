import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Service
export const authService = {
  login: (email, password) =>
    apiClient.post('/auth/login', { emailId: email, password }),
  signup: (fullName, emailId, contactNo, password, confirmPassword) =>
    apiClient.post('/auth/signup', {
      fullName,
      emailId,
      contactNo,
      password,
      confirmPassword,
    }),
  validateToken: () =>
    apiClient.get('/auth/validate-token'),
};

// User Service
export const userService = {
  getProfile: (userId) =>
    apiClient.get(`/users/${userId}`),
  updateProfile: (userId, profileData) =>
    apiClient.put(`/users/${userId}/profile`, profileData),
  changePassword: (userId, oldPassword, newPassword) =>
    apiClient.post(`/users/${userId}/change-password`, null, {
      params: { oldPassword, newPassword },
    }),
  getUserByEmail: (email) =>
    apiClient.get(`/users/email/${email}`),
};

// Vehicle Service
export const vehicleService = {
  getAllVehicles: () =>
    apiClient.get('/vehicles'),
  getVehicleById: (vehicleId) =>
    apiClient.get(`/vehicles/${vehicleId}`),
  getVehiclesByBrand: (brandId) =>
    apiClient.get(`/vehicles/brand/${brandId}`),
  getVehiclesByFuelType: (fuelType) =>
    apiClient.get(`/vehicles/fueltype/${fuelType}`),
  createVehicle: (vehicleData) =>
    apiClient.post('/vehicles', vehicleData),
  updateVehicle: (vehicleId, vehicleData) =>
    apiClient.put(`/vehicles/${vehicleId}`, vehicleData),
  deleteVehicle: (vehicleId) =>
    apiClient.delete(`/vehicles/${vehicleId}`),
};

// Booking Service
export const bookingService = {
  getAllBookings: () =>
    apiClient.get('/bookings'),
  getBookingById: (bookingId) =>
    apiClient.get(`/bookings/${bookingId}`),
  getMyBookings: (userEmail) =>
    apiClient.get(`/bookings/user/${userEmail}`),
  createBooking: (bookingData) =>
    apiClient.post('/bookings', bookingData),
  updateBooking: (bookingId, bookingData) =>
    apiClient.put(`/bookings/${bookingId}`, bookingData),
  deleteBooking: (bookingId) =>
    apiClient.delete(`/bookings/${bookingId}`),
  getBookingsByStatus: (status) =>
    apiClient.get(`/bookings/status/${status}`),
};

// Brand Service
export const brandService = {
  getAllBrands: () =>
    apiClient.get('/brands'),
  getBrandById: (brandId) =>
    apiClient.get(`/brands/${brandId}`),
  createBrand: (brandData) =>
    apiClient.post('/brands', brandData),
  updateBrand: (brandId, brandData) =>
    apiClient.put(`/brands/${brandId}`, brandData),
  deleteBrand: (brandId) =>
    apiClient.delete(`/brands/${brandId}`),
};

// Testimonial Service
export const testimonialService = {
  getAllTestimonials: () =>
    apiClient.get('/testimonials'),
  getApprovedTestimonials: () =>
    apiClient.get('/testimonials/approved'),
  getTestimonialById: (testimonialId) =>
    apiClient.get(`/testimonials/${testimonialId}`),
  getMyTestimonials: (userEmail) =>
    apiClient.get(`/testimonials/user/${userEmail}`),
  createTestimonial: (testimonialData) =>
    apiClient.post('/testimonials', testimonialData),
  approveTestimonial: (testimonialId) =>
    apiClient.put(`/testimonials/${testimonialId}/approve`),
  deleteTestimonial: (testimonialId) =>
    apiClient.delete(`/testimonials/${testimonialId}`),
};

// Contact Service
export const contactService = {
  getAllQueries: () =>
    apiClient.get('/contact-us'),
  getQueryById: (queryId) =>
    apiClient.get(`/contact-us/${queryId}`),
  submitQuery: (queryData) =>
    apiClient.post('/contact-us', queryData),
  deleteQuery: (queryId) =>
    apiClient.delete(`/contact-us/${queryId}`),
};

export default apiClient;
