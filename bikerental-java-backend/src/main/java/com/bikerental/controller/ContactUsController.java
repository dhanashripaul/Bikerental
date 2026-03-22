package com.bikerental.controller;

import com.bikerental.dto.ApiResponse;
import com.bikerental.entity.ContactUsQuery;
import com.bikerental.service.ContactUsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contact-us")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class ContactUsController {

    private final ContactUsService contactUsService;

    @GetMapping
    public ResponseEntity<List<ContactUsQuery>> getAllQueries() {
        return ResponseEntity.ok(contactUsService.getAllQueries());
    }

    @GetMapping("/{queryId}")
    public ResponseEntity<ContactUsQuery> getQueryById(@PathVariable Integer queryId) {
        Optional<ContactUsQuery> query = contactUsService.getQueryById(queryId);
        return query.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createQuery(@RequestBody ContactUsQuery query) {
        try {
            contactUsService.createQuery(query);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Query submitted successfully. We'll get back to you soon"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Failed to submit query"));
        }
    }

    @DeleteMapping("/{queryId}")
    public ResponseEntity<ApiResponse> deleteQuery(@PathVariable Integer queryId) {
        try {
            contactUsService.deleteQuery(queryId);
            return ResponseEntity.ok(new ApiResponse(true, "Query deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Failed to delete query"));
        }
    }
}
