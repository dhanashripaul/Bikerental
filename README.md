# BikeRental - Full Stack Application

> A modern, secure bike rental platform built with Java Spring Boot backend and React frontend

## 🎯 Overview

This is a complete rewrite of the original PHP-based BikeRental application with modern technologies, security best practices, and clean architecture.

**Original Issues Fixed:**
- ✅ MD5 passwords → BCrypt hashing
- ✅ Hardcoded credentials → Environment variables
- ✅ SQL injection vulnerabilities → Parameterized queries
- ✅ Missing CSRF protection → JWT token validation
- ✅ Weak session management → Secure JWT tokens
- ✅ Mixed HTML/PHP → Clean separation of concerns

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- JWT Authentication
- MySQL 8.0
- Flyway (Database Migration)
- Maven

**Frontend:**
- React 18.2.0
- React Router DOM 6.20.0
- Axios (HTTP Client)
- Tailwind CSS 3.3.6
- React Context API (State Management)
- React Toastify (Notifications)

**DevOps:**
- Docker & Docker Compose
- Nginx (Frontend reverse proxy)
- MySQL containerized

### Folder Structure

```
bikerental/
├── bikerental-java-backend/           # Java Spring Boot API
│   ├── src/main/java/com/bikerental/
│   │   ├── entity/                    # JPA Entities
│   │   ├── repository/                # Spring Data Repositories
│   │   ├── service/                   # Business Logic
│   │   ├── controller/                # REST Controllers
│   │   ├── dto/                       # Data Transfer Objects
│   │   ├── security/                  # JWT & Auth
│   │   └── config/                    # Configuration
│   ├── src/main/resources/
│   │   ├── db/migration/              # Flyway SQL migrations
│   │   └── application.properties     # Configuration
│   ├── Dockerfile
│   ├── pom.xml                        # Maven dependencies
│   └── README.md                      # Backend documentation
│
├── bikerental-react-frontend/         # React SPA
│   ├── src/
│   │   ├── components/                # Reusable components
│   │   ├── context/                   # React Context
│   │   ├── hooks/                     # Custom hooks
│   │   ├── pages/                     # Page components
│   │   ├── services/                  # API service layer
│   │   ├── styles/                    # CSS & Tailwind
│   │   ├── App.js                     # Main component
│   │   └── index.js                   # Entry point
│   ├── public/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md                      # Frontend documentation
│
├── docker-compose.yml                 # Multi-container setup
├── DOCKER_SETUP.md                    # Docker deployment guide
└── README.md                          # This file
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Start all services (database, backend, frontend)
docker-compose up -d

# Access applications
# Frontend: http://localhost:3000
# Backend: http://localhost:8080/api
# Database: localhost:3306
```

**Stop everything:**
```bash
docker-compose down
```

See [DOCKER_SETUP.md](DOCKER_SETUP.md) for detailed Docker instructions.

### Option 2: Local Development

#### Prerequisites
- Java 17+ and Maven
- Node.js 16+ and npm
- MySQL 8.0
- Git

#### A. Setup Database

```bash
# Start MySQL locally, then create database
mysql -u root -p

# In MySQL shell:
CREATE DATABASE bikerental;
CREATE USER 'bikerental_user'@'localhost' IDENTIFIED BY 'bikerental_password';
GRANT ALL PRIVILEGES ON bikerental.* TO 'bikerental_user'@'localhost';
FLUSH PRIVILEGES;
```

#### B. Setup Backend

```bash
cd bikerental-java-backend

# Install dependencies and build
mvn clean install

# Run Spring Boot application
mvn spring-boot:run

# Backend will start on: http://localhost:8080
# Check API: http://localhost:8080/api/health
```

#### C. Setup Frontend

```bash
cd bikerental-react-frontend

# Install dependencies
npm install

# Start development server
npm start

# Frontend will open at: http://localhost:3000
```

## 📖 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication

All requests (except login/signup) require JWT token:
```
Authorization: Bearer {token}
```

### Core Endpoints

#### Authentication
```
POST   /auth/login              - Login user
POST   /auth/signup             - Register new user
GET    /auth/validate-token     - Validate JWT token
```

#### Vehicles
```
GET    /vehicles                - Get all vehicles with filters
GET    /vehicles/{id}           - Get vehicle details
GET    /vehicles/brand/{id}     - Get vehicles by brand
GET    /vehicles/fueltype/{type} - Get vehicles by fuel type
POST   /vehicles                - Create vehicle (admin)
PUT    /vehicles/{id}           - Update vehicle (admin)
DELETE /vehicles/{id}           - Delete vehicle (admin)
```

#### Bookings
```
GET    /bookings                - Get all bookings
GET    /bookings/{id}           - Get booking details
GET    /bookings/user/{email}   - Get user's bookings
POST   /bookings                - Create booking
PUT    /bookings/{id}           - Update booking
DELETE /bookings/{id}           - Cancel booking
```

#### Users
```
GET    /users/{id}              - Get user profile
GET    /users/email/{email}     - Get user by email
PUT    /users/{id}/profile      - Update profile
POST   /users/{id}/change-password - Change password
```

#### Other Endpoints
```
GET    /brands                  - Get all brands
POST   /brands                  - Create brand (admin)
PUT    /brands/{id}             - Update brand (admin)
DELETE /brands/{id}             - Delete brand (admin)

GET    /testimonials            - Get all testimonials
GET    /testimonials/approved   - Get approved testimonials
POST   /testimonials            - Create testimonial
PUT    /testimonials/{id}       - Update testimonial (admin)
DELETE /testimonials/{id}       - Delete testimonial (admin)

POST   /contact-us              - Submit contact form
GET    /contact-us              - Get contact queries (admin)
```

For detailed API documentation, see [bikerental-java-backend/README.md](bikerental-java-backend/README.md)

## 🔐 Security Features

1. **Password Security**
   - BCrypt hashing with salt
   - Configurable password policies

2. **Authentication & Authorization**
   - JWT tokens with 24-hour expiration
   - Secure token storage in localStorage
   - Role-based access control (user/admin)

3. **Data Protection**
   - Parameterized SQL queries (prevents SQL injection)
   - Input validation on DTOs
   - CORS configuration with whitelist
   - XSS prevention (React default)

4. **API Security**
   - Bearer token authentication
   - Request/response interceptors
   - Error handling without sensitive info leakage
   - Rate limiting ready to implement

## 🎨 Frontend Features

### Pages
- **Home**: Landing page with features and testimonials
- **Bike Listing**: Browse bikes with filters (brand, fuel type) and sorting
- **Bike Details**: Detailed bike information with booking form
- **Login/Signup**: User authentication
- **My Bookings**: View and manage user bookings
- **Profile**: Edit profile and change password
- **Contact**: Contact form
- **Admin Dashboard**: Admin statistics and controls

### Features
- Responsive design (mobile, tablet, desktop)
- Protected routes for authenticated users
- Toast notifications for user feedback
- Form validation
- Loading and error states
- Tailwind CSS styling

## 📱 Responsive Design

- Mobile: 320px and up
- Tablet: 768px and up (md)
- Desktop: 1024px and up (lg)

All pages are fully responsive with Tailwind CSS utility classes.

## 🧪 Testing

### Frontend Testing Format
```bash
cd bikerental-react-frontend
npm test
```

### Backend Testing Format
```bash
cd bikerental-java-backend
mvn test
```

### Manual Testing Checklist
- [ ] User signup and login flow
- [ ] Browse bikes and apply filters
- [ ] View bike details and create booking
- [ ] View and manage bookings
- [ ] Edit profile and change password
- [ ] Submit contact form
- [ ] Logout

## 📊 Database Schema

### Tables
- **users** - User accounts and profiles
- **vehicles** - Bike inventory
- **bookings** - Rental bookings
- **brands** - Motorcycle brands
- **testimonials** - User reviews
- **contact_us_queries** - Contact form submissions

See [bikerental-java-backend/README.md](bikerental-java-backend/README.md) for detailed schema.

## 🌐 Deployment

### Docker Deployment
See [DOCKER_SETUP.md](DOCKER_SETUP.md) for comprehensive Docker deployment guide.

### Production Checklist
- [ ] Change JWT secret key
- [ ] Update database credentials
- [ ] Configure HTTPS/SSL
- [ ] Set up environment variables
- [ ] Enable logging
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test all user flows

## 🐛 Troubleshooting

### Backend Issues

**Port 8080 already in use:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID [PID] /F

# Linux/Mac
lsof -i :8080
kill -9 [PID]
```

**Database connection error:**
```bash
# Check MySQL is running
mysql -u root -p

# Verify credentials in application.properties
```

### Frontend Issues

**Port 3000 already in use:**
```bash
# Change port in package.json or terminal
PORT=3001 npm start
```

**API connection error:**
```bash
# Check backend is running: http://localhost:8080/api/health
# Check REACT_APP_API_URL in .env file
# Check browser CORS errors in DevTools
```

### Docker Issues

See [DOCKER_SETUP.md - Troubleshooting](DOCKER_SETUP.md#troubleshooting)

## 📚 Documentation

- [Backend README](bikerental-java-backend/README.md) - Spring Boot API docs
- [Frontend README](bikerental-react-frontend/README.md) - React app docs
- [Frontend Development Guide](bikerental-react-frontend/DEVELOPMENT.md) - Architecture and patterns
- [Docker Setup Guide](DOCKER_SETUP.md) - Container deployment

## 🔄 Development Workflow

### Making Changes

**Backend:**
```bash
cd bikerental-java-backend
# Edit code
mvn spring-boot:run
# Changes require restart
```

**Frontend:**
```bash
cd bikerental-react-frontend
npm start
# Changes hot-reload automatically
```

### Git Workflow
```bash
git checkout -b feature/your-feature
# Make changes
git add .
git commit -m "feat: description"
git push origin feature/your-feature
# Create pull request
```

## 📦 Dependencies

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- JWT (jjwt)
- MySQL Connector
- Lombok
- Validation API

### Frontend
- React 18.2.0
- React Router 6.20.0
- Axios 1.6.0
- Tailwind CSS 3.3.6
- React Toastify
- Date-fns
- jwt-decode

For complete list, see `pom.xml` (backend) and `package.json` (frontend)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Commit with clear messages
6. Push to your fork
7. Create a pull request

## 📝 License

This project is provided as-is for educational and commercial use.

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the documentation
3. Check backend/frontend logs
4. Open an GitHub issue with:
   - What you were trying to do
   - Expected behavior
   - Actual behavior
   - Steps to reproduce
   - System information

## 🗺️ Roadmap

- [ ] User email verification
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] SMS notifications
- [ ] Advanced search and filters
- [ ] Bike reviews and ratings
- [ ] Wishlist feature
- [ ] Referral program
- [ ] Mobile app (React Native)
- [ ] Advanced admin analytics
- [ ] Real-time notifications (WebSocket)
- [ ] API rate limiting
- [ ] Caching (Redis)

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Spring Boot Guides](https://spring.io/guides)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [Docker Documentation](https://docs.docker.com)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [REST API Best Practices](https://restfulapi.net)

## ⭐ Credits

Modernized from original PHP bike rental system with improved architecture, security, and developer experience.

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**Status**: Production Ready

For detailed setup and instructions, see individual README files in each project folder.
