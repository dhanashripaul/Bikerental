package com.bikerental.controller;

import com.bikerental.dto.ApiResponse;
import com.bikerental.entity.Vehicle;
import com.bikerental.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    @GetMapping("/{vehicleId}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable Integer vehicleId) {
        Optional<Vehicle> vehicle = vehicleService.getVehicleById(vehicleId);
        return vehicle.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<Vehicle>> getVehiclesByBrand(@PathVariable Integer brandId) {
        return ResponseEntity.ok(vehicleService.getVehiclesByBrand(brandId));
    }

    @GetMapping("/fueltype/{fuelType}")
    public ResponseEntity<List<Vehicle>> getVehiclesByFuelType(@PathVariable String fuelType) {
        return ResponseEntity.ok(vehicleService.getVehiclesByFuelType(fuelType));
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        try {
            Vehicle createdVehicle = vehicleService.createVehicle(vehicle);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdVehicle);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{vehicleId}")
    public ResponseEntity<ApiResponse> updateVehicle(
            @PathVariable Integer vehicleId,
            @RequestBody Vehicle vehicleDetails) {
        try {
            vehicleService.updateVehicle(vehicleId, vehicleDetails);
            return ResponseEntity.ok(new ApiResponse(true, "Vehicle updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{vehicleId}")
    public ResponseEntity<ApiResponse> deleteVehicle(@PathVariable Integer vehicleId) {
        try {
            vehicleService.deleteVehicle(vehicleId);
            return ResponseEntity.ok(new ApiResponse(true, "Vehicle deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Failed to delete vehicle"));
        }
    }
}
