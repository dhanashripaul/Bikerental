package com.bikerental.controller;

import com.bikerental.dto.ApiResponse;
import com.bikerental.dto.UserProfileRequest;
import com.bikerental.entity.User;
import com.bikerental.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class UserController {

    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Integer userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{userId}/profile")
    public ResponseEntity<ApiResponse> updateUserProfile(
            @PathVariable Integer userId,
            @RequestBody UserProfileRequest profileRequest) {
        try {
            User user = User.builder()
                    .fullName(profileRequest.getFullName())
                    .contactNo(profileRequest.getContactNo())
                    .dob(profileRequest.getDob())
                    .address(profileRequest.getAddress())
                    .city(profileRequest.getCity())
                    .country(profileRequest.getCountry())
                    .build();

            userService.updateUserProfile(userId, user);
            return ResponseEntity.ok(new ApiResponse(true, "Profile updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @PostMapping("/{userId}/change-password")
    public ResponseEntity<ApiResponse> changePassword(
            @PathVariable Integer userId,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        try {
            userService.changePassword(userId, oldPassword, newPassword);
            return ResponseEntity.ok(new ApiResponse(true, "Password changed successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Integer userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok(new ApiResponse(true, "User deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Failed to delete user"));
        }
    }
}
