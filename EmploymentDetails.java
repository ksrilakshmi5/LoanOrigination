package com.loanorigination.backend.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmploymentDetails {

    private String occupationType; // Salaried, Self-Employed

    // Salaried fields
    private String companyName;
    private String designation;
    private String experience; // 0-1, 1-3, 3-5, 5-10, 10+
    private String officeAddress;

    // Self-employed fields
    private String businessName;
    private String businessType;
    private String businessAddress;

    // Document paths will be stored in Document entity
}
