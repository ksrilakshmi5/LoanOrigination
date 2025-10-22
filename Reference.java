package com.loanorigination.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "references")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String relationship; // Father, Mother, Friend, etc.

    @Column(nullable = false)
    private String contactNumber;

    @Column(nullable = false, length = 1000)
    private String address;

    // Reference to the application (will be set by JPA)
    private Long applicationId;
}
