package com.bikerental.repository;

import com.bikerental.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Integer> {
    List<Vehicle> findByVehiclesBrand(Integer brandId);
    List<Vehicle> findByFuelType(String fuelType);
}
