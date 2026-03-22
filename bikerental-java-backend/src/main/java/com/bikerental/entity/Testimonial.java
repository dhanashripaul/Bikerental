package com.bikerental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "tbltestimonial")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Testimonial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, name = "UserEmail", length = 100)
    private String userEmail;

    @Column(nullable = false, name = "Testimonial", columnDefinition = "MEDIUMTEXT")
    private String testimonial;

    @Column(name = "PostingDate", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime postingDate;

    @Column(name = "status")
    private Integer status;

    @PrePersist
    protected void onCreate() {
        postingDate = LocalDateTime.now();
        if (status == null) {
            status = 0;
        }
    }
}
