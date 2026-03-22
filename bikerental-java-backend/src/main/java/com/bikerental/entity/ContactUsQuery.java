package com.bikerental.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "tblcontactusquery")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContactUsQuery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "EmailId", length = 120)
    private String emailId;

    @Column(name = "ContactNumber", length = 11)
    private String contactNumber;

    @Column(name = "Message", columnDefinition = "LONGTEXT")
    private String message;

    @Column(name = "PostingDate", nullable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime postingDate;

    @Column(name = "status")
    private Integer status;

    @PrePersist
    protected void onCreate() {
        postingDate = LocalDateTime.now();
    }
}
