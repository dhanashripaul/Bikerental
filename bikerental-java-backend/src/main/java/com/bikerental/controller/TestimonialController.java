package com.bikerental.controller;

import com.bikerental.dto.ApiResponse;
import com.bikerental.entity.Testimonial;
import com.bikerental.service.TestimonialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/testimonials")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class TestimonialController {

    private final TestimonialService testimonialService;

    @GetMapping
    public ResponseEntity<List<Testimonial>> getAllTestimonials() {
        return ResponseEntity.ok(testimonialService.getAllTestimonials());
    }

    @GetMapping("/approved")
    public ResponseEntity<List<Testimonial>> getApprovedTestimonials() {
        return ResponseEntity.ok(testimonialService.getApprovedTestimonials());
    }

    @GetMapping("/{testimonialId}")
    public ResponseEntity<Testimonial> getTestimonialById(@PathVariable Integer testimonialId) {
        Optional<Testimonial> testimonial = testimonialService.getTestimonialById(testimonialId);
        return testimonial.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userEmail}")
    public ResponseEntity<List<Testimonial>> getTestimonialsByUserEmail(@PathVariable String userEmail) {
        return ResponseEntity.ok(testimonialService.getTestimonialsByUserEmail(userEmail));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createTestimonial(@RequestBody Testimonial testimonial) {
        try {
            testimonialService.createTestimonial(testimonial);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Testimonial submitted for approval"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Failed to create testimonial"));
        }
    }

    @PutMapping("/{testimonialId}/approve")
    public ResponseEntity<ApiResponse> approveTestimonial(@PathVariable Integer testimonialId) {
        try {
            testimonialService.approveTestimonial(testimonialId);
            return ResponseEntity.ok(new ApiResponse(true, "Testimonial approved"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{testimonialId}")
    public ResponseEntity<ApiResponse> deleteTestimonial(@PathVariable Integer testimonialId) {
        try {
            testimonialService.deleteTestimonial(testimonialId);
            return ResponseEntity.ok(new ApiResponse(true, "Testimonial deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Failed to delete testimonial"));
        }
    }
}
