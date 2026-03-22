package com.bikerental.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleDTO {
    private Integer id;
    private String vehiclesTitle;
    private Integer vehiclesBrand;
    private String vehiclesOverview;
    private Integer pricePerDay;
    private String fuelType;
    private Integer modelYear;
    private Integer seatingCapacity;
    private String vimage1;
    private String vimage2;
    private String vimage3;
    private String vimage4;
    private String vimage5;
    private Integer airConditioner;
    private Integer powerDoorLocks;
    private Integer antiLockBrakingSystem;
    private Integer brakeAssist;
    private Integer powerSteering;
    private Integer driverAirbag;
    private Integer passengerAirbag;
    private Integer powerWindows;
    private Integer cdPlayer;
    private Integer centralLocking;
    private Integer crashSensor;
    private Integer leatherSeats;
}
