package com.bikerental.service;

import com.bikerental.entity.Vehicle;
import com.bikerental.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Integer id) {
        return vehicleRepository.findById(id);
    }

    public List<Vehicle> getVehiclesByBrand(Integer brandId) {
        return vehicleRepository.findByVehiclesBrand(brandId);
    }

    public List<Vehicle> getVehiclesByFuelType(String fuelType) {
        return vehicleRepository.findByFuelType(fuelType);
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicle(Integer id, Vehicle vehicleDetails) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found"));

        if (vehicleDetails.getVehiclesTitle() != null) {
            vehicle.setVehiclesTitle(vehicleDetails.getVehiclesTitle());
        }
        if (vehicleDetails.getVehiclesBrand() != null) {
            vehicle.setVehiclesBrand(vehicleDetails.getVehiclesBrand());
        }
        if (vehicleDetails.getVehiclesOverview() != null) {
            vehicle.setVehiclesOverview(vehicleDetails.getVehiclesOverview());
        }
        if (vehicleDetails.getPricePerDay() != null) {
            vehicle.setPricePerDay(vehicleDetails.getPricePerDay());
        }
        if (vehicleDetails.getFuelType() != null) {
            vehicle.setFuelType(vehicleDetails.getFuelType());
        }
        if (vehicleDetails.getModelYear() != null) {
            vehicle.setModelYear(vehicleDetails.getModelYear());
        }
        if (vehicleDetails.getSeatingCapacity() != null) {
            vehicle.setSeatingCapacity(vehicleDetails.getSeatingCapacity());
        }

        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Integer id) {
        vehicleRepository.deleteById(id);
    }
}
