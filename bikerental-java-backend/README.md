# Bike Rental API - Java/Spring Boot Backend

This is a RESTful API for the Bike Rental application built with Spring Boot, JPA, MySQL, and JWT authentication.

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- MySQL 8.0+
- Git

## Project Structure

```
bikerental-java-backend/
├── src/
│   └── main/
│       ├── java/com/bikerental/
│       │   ├── BikeRentalApplication.java          # Main Application
│       │   ├── controller/                         # REST Controllers
│       │   │   ├── AuthController.java
│       │   │   ├── UserController.java
│       │   │   ├── VehicleController.java
│       │   │   ├── BookingController.java
│       │   │   ├── BrandController.java
│       │   │   ├── TestimonialController.java
│       │   │   └── ContactUsController.java
│       │   ├── entity/                             # JPA Entities
│       │   │   ├── User.java
│       │   │   ├── Vehicle.java
│       │   │   ├── Booking.java
│       │   │   ├── Brand.java
│       │   │   ├── Testimonial.java
│       │   │   └── ContactUsQuery.java
│       │   ├── repository/                         # Data Access Layer
│       │   │   ├── UserRepository.java
│       │   │   ├── VehicleRepository.java
│       │   │   ├── BookingRepository.java
│       │   │   ├── BrandRepository.java
│       │   │   ├── TestimonialRepository.java
│       │   │   └── ContactUsQueryRepository.java
│       │   ├── service/                            # Business Logic Layer
│       │   │   ├── AuthService.java
│       │   │   ├── UserService.java
│       │   │   ├── VehicleService.java
│       │   │   ├── BookingService.java
│       │   │   ├── BrandService.java
│       │   │   ├── TestimonialService.java
│       │   │   └── ContactUsService.java
│       │   ├── dto/                                # Data Transfer Objects
│       │   │   ├── LoginRequest.java
│       │   │   ├── SignupRequest.java
│       │   │   ├── AuthResponse.java
│       │   │   ├── ApiResponse.java
│       │   │   ├── UserProfileRequest.java
│       │   │   ├── VehicleDTO.java
│       │   │   └── BookingRequest.java
│       │   ├── security/                           # Security & Authentication
│       │   │   └── JwtTokenProvider.java
│       │   └── config/                             # Spring Configurations
│       │       └── SecurityConfig.java
│       └── resources/
│           └── application.properties              # Application Configuration
└── pom.xml                                         # Maven Dependencies
```

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd bikerental-java-backend
```

### 2. Configure Database

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bikerental?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
```

### 3. Create Database

```sql
CREATE DATABASE IF NOT EXISTS bikerental;
USE bikerental;

-- Import the existing SQL schema from bikerental.sql
-- mysql -u root -p bikerental < path/to/bikerental.sql
```

### 4. Install Dependencies

```bash
mvn clean install
```

### 5. Run the Application

```bash
mvn spring-boot:run
```

The API will start on `http://localhost:8080`

## API Endpoints

### Authentication

```
POST   /api/auth/login              - User login
POST   /api/auth/signup             - User registration
GET    /api/auth/validate-token     - Validate JWT token
```

### Users

```
GET    /api/users/{userId}          - Get user by ID
GET    /api/users/email/{email}     - Get user by email
GET    /api/users                   - Get all users
PUT    /api/users/{userId}/profile  - Update user profile
POST   /api/users/{userId}/change-password - Change password
DELETE /api/users/{userId}          - Delete user
```

### Vehicles

```
GET    /api/vehicles                - Get all vehicles
GET    /api/vehicles/{vehicleId}    - Get vehicle by ID
GET    /api/vehicles/brand/{brandId} - Get vehicles by brand
GET    /api/vehicles/fueltype/{fuelType} - Get vehicles by fuel type
POST   /api/vehicles                - Create new vehicle
PUT    /api/vehicles/{vehicleId}    - Update vehicle
DELETE /api/vehicles/{vehicleId}    - Delete vehicle
```

### Bookings

```
GET    /api/bookings                - Get all bookings
GET    /api/bookings/{bookingId}    - Get booking by ID
GET    /api/bookings/user/{userEmail} - Get bookings by user email
GET    /api/bookings/vehicle/{vehicleId} - Get bookings by vehicle
GET    /api/bookings/status/{status} - Get bookings by status
POST   /api/bookings                - Create new booking
PUT    /api/bookings/{bookingId}    - Update booking
DELETE /api/bookings/{bookingId}    - Delete booking
```

### Brands

```
GET    /api/brands                  - Get all brands
GET    /api/brands/{brandId}        - Get brand by ID
POST   /api/brands                  - Create new brand
PUT    /api/brands/{brandId}        - Update brand
DELETE /api/brands/{brandId}        - Delete brand
```

### Testimonials

```
GET    /api/testimonials            - Get all testimonials
GET    /api/testimonials/approved   - Get approved testimonials
GET    /api/testimonials/{id}       - Get testimonial by ID
GET    /api/testimonials/user/{email} - Get testimonials by user
POST   /api/testimonials            - Create new testimonial
PUT    /api/testimonials/{id}/approve - Approve testimonial
DELETE /api/testimonials/{id}       - Delete testimonial
```

### Contact Us

```
GET    /api/contact-us              - Get all queries
GET    /api/contact-us/{queryId}    - Get query by ID
POST   /api/contact-us              - Submit new query
DELETE /api/contact-us/{queryId}    - Delete query
```

## Authentication

The API uses JWT (JSON Web Token) for authentication. 

1. **Login**: Send credentials to `/api/auth/login`
2. **Receive Token**: Get JWT token in response
3. **Use Token**: Include token in Authorization header for protected endpoints
   ```
   Authorization: Bearer <your_jwt_token>
   ```

## Security Features

- ✅ Bcrypt password hashing
- ✅ JWT token-based authentication
- ✅ Input validation with @Valid annotations
- ✅ CORS configuration
- ✅ Prepared statements (prevents SQL injection)
- ✅ Exception handling with meaningful error messages

## Build for Production

```bash
mvn clean package -DskipTests
java -jar target/bikerental-1.0.0.jar
```

## Environment Variables

Create a `.env` file or set environment variables:

```
JWT_SECRET=your-secret-key-change-this-in-production-min-32-chars!
JWT_EXPIRATION=86400000
DATABASE_URL=jdbc:mysql://localhost:3306/bikerental
DATABASE_USER=root
DATABASE_PASSWORD=your_password
```

## Testing

Run tests with:

```bash
mvn test
```

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check database credentials in application.properties
- Verify database exists and is accessible

### Port Already in Use
- Change port in application.properties: `server.port=8081`

### JWT Token Errors
- Ensure JWT secret is at least 32 characters
- Check token expiration time
- Verify token format in Authorization header

## Future Enhancements

- [ ] Add file upload for vehicle images
- [ ] Implement email notifications
- [ ] Add payment gateway integration
- [ ] Rate limiting for API endpoints
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.
