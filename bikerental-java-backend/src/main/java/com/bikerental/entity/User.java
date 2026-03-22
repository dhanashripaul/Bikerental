package com.bikerental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "tblusers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "FullName", length = 120)
    private String fullName;

    @Column(nullable = false, unique = true, name = "EmailId", length = 100)
    private String emailId;

    @Column(nullable = false, name = "Password", length = 255)
    private String password;

    @Column(name = "ContactNo", length = 11)
    private String contactNo;

    @Column(name = "dob")
    private String dob;

    @Column(name = "Address", length = 255)
    private String address;

    @Column(name = "City", length = 100)
    private String city;

    @Column(name = "Country", length = 100)
    private String country;

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
