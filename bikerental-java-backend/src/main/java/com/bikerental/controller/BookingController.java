package com.bikerental.controller;

import com.bikerental.dto.ApiResponse;
import com.bikerental.dto.BookingRequest;
import com.bikerental.entity.Booking;
import com.bikerental.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class BookingController {

    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Integer bookingId) {
        Optional<Booking> booking = bookingService.getBookingById(bookingId);
        return booking.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<Booking>> getBookingsByUserEmail(@PathVariable String userEmail) {
        return ResponseEntity.ok(bookingService.getBookingsByUserEmail(userEmail));
    }

    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Booking>> getBookingsByVehicleId(@PathVariable Integer vehicleId) {
        return ResponseEntity.ok(bookingService.getBookingsByVehicleId(vehicleId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Booking>> getBookingsByStatus(@PathVariable Integer status) {
        return ResponseEntity.ok(bookingService.getBookingsByStatus(status));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createBooking(
            @Valid @RequestBody BookingRequest bookingRequest,
            @RequestHeader("Authorization") String token) {
        try {
            String userEmail = extractEmailFromToken(token);
            Booking booking = Booking.builder()
                    .userEmail(userEmail)
                    .vehicleId(bookingRequest.getVehicleId())
                    .fromDate(bookingRequest.getFromDate())
                    .toDate(bookingRequest.getToDate())
                    .message(bookingRequest.getMessage())
                    .status(0) // Pending
                    .build();

            Booking createdBooking = bookingService.createBooking(booking);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Booking created successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Failed to create booking"));
        }
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> updateBooking(
            @PathVariable Integer bookingId,
            @RequestBody Booking bookingDetails) {
        try {
            bookingService.updateBooking(bookingId, bookingDetails);
            return ResponseEntity.ok(new ApiResponse(true, "Booking updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{bookingId}")
    public ResponseEntity<ApiResponse> deleteBooking(@PathVariable Integer bookingId) {
        try {
            bookingService.deleteBooking(bookingId);
            return ResponseEntity.ok(new ApiResponse(true, "Booking deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Failed to delete booking"));
        }
    }

    private String extractEmailFromToken(String token) {
        // Extract from Bearer token - in real scenario, use tokenProvider
        return token.replace("Bearer ", "");
    }
}
