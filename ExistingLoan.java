package com.loanorigination.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "existing_loans")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExistingLoan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String loanType; // Home Loan, Vehicle Loan, Personal Loan, etc.

    @Column(nullable = false)
    private String lenderName;

    @Column(nullable = false)
    private Double outstandingAmount;

    @Column(nullable = false)
    private Double emi; // Monthly EMI

    @Column(nullable = false)
    private Integer tenureRemaining; // in months

    // Reference to the application (will be set by JPA)
    private Long applicationId;
}
