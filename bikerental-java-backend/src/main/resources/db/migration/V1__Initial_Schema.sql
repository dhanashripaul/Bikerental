-- Flyway Migration: V1__Initial_Schema.sql
-- Create database schema for Bike Rental Application

-- Create Users Table
CREATE TABLE IF NOT EXISTS `tblusers` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `FullName` VARCHAR(120),
  `EmailId` VARCHAR(100) UNIQUE NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `ContactNo` CHAR(11),
  `dob` VARCHAR(100),
  `Address` VARCHAR(255),
  `City` VARCHAR(100),
  `Country` VARCHAR(100),
  `RegDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdationDate` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Brands Table
CREATE TABLE IF NOT EXISTS `tblbrands` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `BrandName` VARCHAR(120) NOT NULL,
  `CreationDate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdationDate` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Vehicles Table
CREATE TABLE IF NOT EXISTS `tblvehicles` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `VehiclesTitle` VARCHAR(150),
  `VehiclesBrand` INT,
  `VehiclesOverview` LONGTEXT,
  `PricePerDay` INT,
  `FuelType` VARCHAR(100),
  `ModelYear` INT,
  `SeatingCapacity` INT,
  `Vimage1` VARCHAR(120),
  `Vimage2` VARCHAR(120),
  `Vimage3` VARCHAR(120),
  `Vimage4` VARCHAR(120),
  `Vimage5` VARCHAR(120),
  `AirConditioner` INT,
  `PowerDoorLocks` INT,
  `AntiLockBrakingSystem` INT,
  `BrakeAssist` INT,
  `PowerSteering` INT,
  `DriverAirbag` INT,
  `PassengerAirbag` INT,
  `PowerWindows` INT,
  `CDPlayer` INT,
  `CentralLocking` INT,
  `CrashSensor` INT,
  `LeatherSeats` INT,
  `RegDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdationDate` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`VehiclesBrand`) REFERENCES `tblbrands`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Bookings Table
CREATE TABLE IF NOT EXISTS `tblbooking` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userEmail` VARCHAR(100),
  `VehicleId` INT,
  `FromDate` VARCHAR(20),
  `ToDate` VARCHAR(20),
  `message` VARCHAR(255),
  `Status` INT DEFAULT 0,
  `PostingDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`VehicleId`) REFERENCES `tblvehicles`(`id`) ON DELETE SET NULL,
  INDEX `idx_user_email` (`userEmail`),
  INDEX `idx_vehicle_id` (`VehicleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Testimonials Table
CREATE TABLE IF NOT EXISTS `tbltestimonial` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `UserEmail` VARCHAR(100) NOT NULL,
  `Testimonial` MEDIUMTEXT NOT NULL,
  `PostingDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` INT,
  INDEX `idx_user_email` (`UserEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Contact Us Queries Table
CREATE TABLE IF NOT EXISTS `tblcontactusquery` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100),
  `EmailId` VARCHAR(120),
  `ContactNumber` CHAR(11),
  `Message` LONGTEXT,
  `PostingDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` INT,
  INDEX `idx_email` (`EmailId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create Indexes for better query performance
CREATE INDEX idx_tblusers_email ON `tblusers`(`EmailId`);
CREATE INDEX idx_tblbooking_user ON `tblbooking`(`userEmail`);
CREATE INDEX idx_tblbooking_vehicle ON `tblbooking`(`VehicleId`);
CREATE INDEX idx_tblbooking_status ON `tblbooking`(`Status`);
CREATE INDEX idx_tblvehicles_brand ON `tblvehicles`(`VehiclesBrand`);
CREATE INDEX idx_tblvehicles_fuel ON `tblvehicles`(`FuelType`);
