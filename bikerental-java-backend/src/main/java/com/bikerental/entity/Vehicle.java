package com.bikerental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "tblvehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "VehiclesTitle", length = 150)
    private String vehiclesTitle;

    @Column(name = "VehiclesBrand")
    private Integer vehiclesBrand;

    @Column(name = "VehiclesOverview", columnDefinition = "LONGTEXT")
    private String vehiclesOverview;

    @Column(name = "PricePerDay")
    private Integer pricePerDay;

    @Column(name = "FuelType", length = 100)
    private String fuelType;

    @Column(name = "ModelYear")
    private Integer modelYear;

    @Column(name = "SeatingCapacity")
    private Integer seatingCapacity;

    @Column(name = "Vimage1", length = 120)
    private String vimage1;

    @Column(name = "Vimage2", length = 120)
    private String vimage2;

    @Column(name = "Vimage3", length = 120)
    private String vimage3;

    @Column(name = "Vimage4", length = 120)
    private String vimage4;

    @Column(name = "Vimage5", length = 120)
    private String vimage5;

    @Column(name = "AirConditioner")
    private Integer airConditioner;

    @Column(name = "PowerDoorLocks")
    private Integer powerDoorLocks;

    @Column(name = "AntiLockBrakingSystem")
    private Integer antiLockBrakingSystem;

    @Column(name = "BrakeAssist")
    private Integer brakeAssist;

    @Column(name = "PowerSteering")
    private Integer powerSteering;

    @Column(name = "DriverAirbag")
    private Integer driverAirbag;

    @Column(name = "PassengerAirbag")
    private Integer passengerAirbag;

    @Column(name = "PowerWindows")
    private Integer powerWindows;

    @Column(name = "CDPlayer")
    private Integer cdPlayer;

    @Column(name = "CentralLocking")
    private Integer centralLocking;

    @Column(name = "CrashSensor")
    private Integer crashSensor;

    @Column(name = "LeatherSeats")
    private Integer leatherSeats;

    @Column(name = "RegDate", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "UpdationDate", columnDefinition = "TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updationDate;

    @PrePersist
    protected void onCreate() {
        regDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updationDate = LocalDateTime.now();
    }
}
