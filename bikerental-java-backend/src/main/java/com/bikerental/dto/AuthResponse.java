package com.bikerental.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private Integer userId;
    private String email;
    private String fullName;
    private String message;

    public AuthResponse(String message) {
        this.message = message;
    }
}
