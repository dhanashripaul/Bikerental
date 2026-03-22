# BikeRental React Frontend - Development Guide

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open http://localhost:3000
```

## Architecture

### Component Hierarchy
```
App
├── Header
├── Routes
│   ├── HomePage
│   ├── BikeListingPage
│   ├── BikeDetailsPage
│   ├── LoginPage
│   ├── SignupPage
│   ├── ContactPage
│   ├── ProtectedRoute (Private)
│   │   ├── MyBookingsPage
│   │   ├── ProfilePage
│   │   └── AdminDashboard
│   └── NotFoundPage
└── Footer
```

### State Management Flow
```
App (Authentication Provider)
  │
  └── AuthContext
       ├── user (current user object)
       ├── token (JWT token)
       ├── isAuthenticated (boolean)
       ├── login() → calls authService.login()
       ├── logout() → clears localStorage
       └── updateProfile() → calls userService.updateProfile()
```

### API Integration Pattern
```
Component
  │
  ├── useAuth() → get user/token
  │
  └── useEffect(() => {
       serviceMethod(data)
         │
         └── axios request
               │
               └── interceptor adds Bearer token
```

## Key Concepts

### Authentication Flow
1. User signs up → `POST /api/auth/signup`
2. User logs in → `POST /api/auth/login` → receives JWT token
3. Token stored in localStorage
4. Axios interceptor adds token to all requests: `Authorization: Bearer {token}`
5. Backend validates token in SecurityConfig
6. Protected routes check `isAuthenticated` via AuthContext
7. User logs out → token cleared from localStorage

### Protected Routes
```javascript
// ProtectedRoute checks isAuthenticated
// If not authenticated → redirects to /login
// If authenticated → renders component
<ProtectedRoute element={<MyBookingsPage />} />
```

### Form Handling Pattern
```javascript
// 1. useState for form data
const [formData, setFormData] = useState({ name: '', email: '' });

// 2. Handle input changes
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

// 3. Submit with error handling
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await service.method(formData);
    toast.success('Success!');
    navigate('/redirect');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Error occurred');
  }
};
```

### API Service Pattern
```javascript
// Create a service object with all endpoints
const vehicleService = {
  getAllVehicles: () => api.get('/vehicles'),
  getVehicleById: (id) => api.get(`/vehicles/${id}`),
  create: (data) => api.post('/vehicles', data),
  update: (id, data) => api.put(`/vehicles/${id}`, data),
  delete: (id) => api.delete(`/vehicles/${id}`),
};

// Export so components can import and use
export { vehicleService };
```

## File Structure Details

### src/services/apiService.js
Central service layer that exports all API methods:
- `authService` - Login, signup, token validation
- `userService` - Profile, password, user data
- `vehicleService` - All bike/vehicle operations
- `bookingService` - All booking operations
- `brandService` - Brand management
- `testimonialService` - Reviews management
- `contactService` - Contact form submissions

Key features:
```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: process.env.REACT_APP_API_TIMEOUT,
});

// Request interceptor: Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### src/context/AuthContext.js
Global authentication state:
```javascript
<AuthProvider>
  {/* All children have access to auth state */}
  <App />
</AuthProvider>

// Access with: const auth = useContext(AuthContext)
```

### src/hooks/useAuth.js
Custom hook convenience wrapper:
```javascript
const { user, token, isAuthenticated, login, logout } = useAuth();
```

## Styling with Tailwind CSS

### Utility Classes Used
```
Layout: flex, grid, container, gap, p-*, m-*
Sizing: w-*, h-*, max-w-*, min-h-*
Colors: text-*, bg-*, border-*
Typography: text-*, font-*
Responsive: md:, lg:, hover:, focus:
```

### Custom Component Classes (in src/styles/index.css)
```css
.btn { /* Base button styles */ }
.btn-primary { /* Primary button */ }
.btn-secondary { /* Secondary button */ }
.form-input { /* Text inputs */ }
.form-group { /* Label + input wrapper */ }
.card { /* Card containers */ }
.vehicle-card { /* Vehicle listing card */ }
```

## Debugging

### Enable Debug Mode
```bash
REACT_APP_ENABLE_DEBUG=true npm start
```

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Make a request and inspect
4. Check Request Headers for `Authorization: Bearer {token}`
5. Check Response for status codes

### Check LocalStorage
```javascript
// In browser console:
localStorage.getItem('token')     // JWT token
localStorage.getItem('user')      // User object (JSON)
```

### Common Issues

**CORS Error**
- Backend must have `@CrossOrigin` on controllers
- Check if frontend origin `http://localhost:3000` is in whitelist

**API 401 Unauthorized**
- Token might be expired (24-hour expiration)
- Token might not be sent in headers
- Check Axios interceptor is working

**Form Not Submitting**
- Check browser console for errors
- Verify API endpoint exists in backend
- Inspect Network tab for actual request

## Testing

### Manual Testing Checklist
- [ ] Sign up with new email
- [ ] Login with credentials
- [ ] Browse bikes on listing page
- [ ] View bike details
- [ ] Create a booking
- [ ] View my bookings
- [ ] Edit profile
- [ ] Change password
- [ ] Submit contact form
- [ ] Logout and verify token cleared

### React DevTools
```bash
npm install react-devtools

# Then in browser, use React DevTools extension
# Inspect components, props, state
```

## Performance Tips

1. **Code Splitting**: Each page is a separate component
2. **Lazy Loading**: Use React.lazy() for route-based splitting
3. **Memoization**: Use React.memo() for expensive components
4. **API Caching**: Implement in apiService if needed
5. **Image Optimization**: Use Next.js Image or img optimization

## Deployment Checklist

Before deploying to production:
- [ ] Set `REACT_APP_API_URL` to production backend
- [ ] Remove debug logs
- [ ] Test all user flows
- [ ] Verify error messages are user-friendly
- [ ] Check mobile responsiveness
- [ ] Test on slower network (DevTools throttling)
- [ ] Build: `npm run build`
- [ ] Test production build locally: `npm install -g serve && serve -s build`
- [ ] Deploy build folder

## Useful Commands

```bash
# Development
npm start                 # Start dev server
npm run build            # Build for production
npm test                 # Run tests
npm run eject           # Eject from CRA (irreversible)

# Dependencies
npm install [package]   # Add dependency
npm uninstall [package] # Remove dependency
npm update              # Update dependencies

# Debugging
npm start -- --verbose  # Verbose output
DANGEROUSLY_DISABLE_HOST_CHECK=true npm start # Disable host check
```

## Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)
- [JWT Introduction](https://jwt.io/introduction)
- [Spring Boot REST API](https://spring.io/guides/tutorials/rest)

## Contact

For questions or issues with the frontend:
- Check existing GitHub issues
- Review API documentation
- Check backend logs for errors

---

**Last Updated**: 2025  
**Version**: 1.0.0
