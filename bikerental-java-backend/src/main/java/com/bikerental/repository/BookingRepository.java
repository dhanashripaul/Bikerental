package com.bikerental.repository;

import com.bikerental.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByUserEmail(String userEmail);
    List<Booking> findByVehicleId(Integer vehicleId);
    List<Booking> findByStatus(Integer status);
}
