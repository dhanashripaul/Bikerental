package com.bikerental.service;

import com.bikerental.entity.Booking;
import com.bikerental.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(Integer id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getBookingsByUserEmail(String userEmail) {
        return bookingRepository.findByUserEmail(userEmail);
    }

    public List<Booking> getBookingsByVehicleId(Integer vehicleId) {
        return bookingRepository.findByVehicleId(vehicleId);
    }

    public List<Booking> getBookingsByStatus(Integer status) {
        return bookingRepository.findByStatus(status);
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Integer id, Booking bookingDetails) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Booking not found"));

        if (bookingDetails.getFromDate() != null) {
            booking.setFromDate(bookingDetails.getFromDate());
        }
        if (bookingDetails.getToDate() != null) {
            booking.setToDate(bookingDetails.getToDate());
        }
        if (bookingDetails.getMessage() != null) {
            booking.setMessage(bookingDetails.getMessage());
        }
        if (bookingDetails.getStatus() != null) {
            booking.setStatus(bookingDetails.getStatus());
        }

        return bookingRepository.save(booking);
    }

    public void deleteBooking(Integer id) {
        bookingRepository.deleteById(id);
    }
}
