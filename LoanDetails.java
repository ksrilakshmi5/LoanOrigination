package com.loanorigination.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDetails {

    private String loanType;              // Personal Loan, Home Loan, Vehicle Loan
    private Double loanAmount;            // e.g. 50000+
    private Integer loanDuration;         // In years
    private String loanPurpose;           // Text description

    // For document uploads (you can store file URLs or filenames)
    private String homeSaleAgreement;     // File path or name
    private String homeEcDocument;
    private String vehicleInvoice;
    private String vehicleQuotation;
}
