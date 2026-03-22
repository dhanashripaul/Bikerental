package com.bikerental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "tblbooking")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "userEmail", length = 100)
    private String userEmail;

    @Column(name = "VehicleId")
    private Integer vehicleId;

    @Column(name = "FromDate", length = 20)
    private String fromDate;

    @Column(name = "ToDate", length = 20)
    private String toDate;

    @Column(name = "message", length = 255)
    private String message;

    @Column(name = "Status")
    private Integer status;

    @Column(name = "PostingDate", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime postingDate;

    @PrePersist
    protected void onCreate() {
        postingDate = LocalDateTime.now();
        if (status == null) {
            status = 0;
        }
    }
}
