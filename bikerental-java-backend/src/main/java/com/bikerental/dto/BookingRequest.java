package com.bikerental.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {
    @NotBlank(message = "From date is required")
    private String fromDate;

    @NotBlank(message = "To date is required")
    private String toDate;

    private String message;

    @NotBlank(message = "Vehicle ID is required")
    private Integer vehicleId;
}
