# BikeRental Frontend - React Application

This is a modern React-based frontend for the Bike Rental application, built with React Router, Axios, and Tailwind CSS.

## Prerequisites

- Node.js 16+ and npm
- Java Spring Boot backend running on `http://localhost:8080`

## Project Structure

```
bikerental-react-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ProtectedRoute.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── SignupPage.js
│   │   ├── BikeListingPage.js
│   │   ├── BikeDetailsPage.js
│   │   ├── MyBookingsPage.js
│   │   ├── ProfilePage.js
│   │   ├── ContactPage.js
│   │   ├── AdminDashboard.js
│   │   └── NotFoundPage.js
│   ├── services/
│   │   └── apiService.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Endpoint

Create a `.env` file in the project root:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

### 3. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## Features

### Public Pages
- **Home**: Landing page with features and testimonials
- **Bike Listing**: Browse all available bikes with filters and sorting
- **Bike Details**: View detailed information about a specific bike
- **Contact Us**: Contact form to reach out to support

### Authentication
- **Login**: User authentication with email and password
- **Signup**: New user registration
- **JWT Token**: Secure token-based authentication

### User Features
- **My Bookings**: View and manage user's bike bookings
- **Profile**: Edit personal information and change password
- **Protected Routes**: Secure pages requiring authentication

### Admin Features
- **Admin Dashboard**: Overview of bookings and vehicles
- **Statistics**: View key metrics

## API Endpoints Used

### Authentication
```
POST /api/auth/login
POST /api/auth/signup
GET /api/auth/validate-token
```

### Users
```
GET /api/users/{userId}
GET /api/users/email/{email}
PUT /api/users/{userId}/profile
POST /api/users/{userId}/change-password
```

### Vehicles
```
GET /api/vehicles
GET /api/vehicles/{vehicleId}
GET /api/vehicles/brand/{brandId}
GET /api/vehicles/fueltype/{fuelType}
```

### Bookings
```
GET /api/bookings
GET /api/bookings/{bookingId}
GET /api/bookings/user/{userEmail}
POST /api/bookings
PUT /api/bookings/{bookingId}
DELETE /api/bookings/{bookingId}
```

### Contact
```
POST /api/contact-us
GET /api/contact-us
```

## Styling

The application uses **Tailwind CSS** for styling with custom global styles. Key classes:

- `.btn` - Button base styles
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary button
- `.form-group` - Form field group
- `.form-input` - Text input field
- `.card` - Card container
- `.vehicle-card` - Vehicle listing card

## State Management

- **React Context API** for authentication state
- **Local Storage** for token persistence
- **Component State** for form management

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Deploy to Hosting

```bash
# Using Netlify
netlify deploy --prod --dir=build

# Using Vercel
vercel --prod

# Using GitHub Pages
npm run build
# Push the build folder to your gh-pages branch
```

## Environment Variables

```env
# API Configuration
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_API_TIMEOUT=10000

# Feature Flags
REACT_APP_ENABLE_DEBUG=false
```

## Common Issues & Troubleshooting

### CORS Errors
- Ensure backend has CORS enabled for `http://localhost:3000`
- Check `REACT_APP_API_URL` is correctly set

### API Connection Failed
- Verify Spring Boot backend is running on `http://localhost:8080`
- Check network tab in browser DevTools

### Authentication Issues
- Clear browser LocalStorage and retry login
- Check JWT token expiration time in backend

## Scripts

```bash
npm start       # Start development server
npm run build   # Build for production
npm test        # Run tests (if configured)
npm run eject   # Eject from create-react-app (one-way operation)
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React Router
- Lazy loading of components
- Image optimization
- Minification in production build

## Future Enhancements

- [ ] Advanced search and filtering
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Testimonials management
- [ ] Advanced admin dashboard
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)
- [ ] PWA support
- [ ] Unit tests and E2E tests

## Security

- JWT-based authentication
- Protected routes
- Input validation
- XSS prevention with React
- CSRF protection ready

## License

MIT License

## Support

For issues and support, please contact: support@bikerental.com
