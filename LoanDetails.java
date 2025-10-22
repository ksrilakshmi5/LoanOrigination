package com.loanorigination.backend.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanDetails {

    private String loanType; // Personal Loan, Home Loan, Vehicle Loan
    private Double loanAmount;
    private Integer loanDuration; // in years
    private String loanPurpose;

    // Home Loan specific documents
    private String homeSaleAgreementPath;
    private String homeEcDocumentPath;

    // Vehicle Loan specific documents
    private String vehicleInvoicePath;
    private String vehicleQuotationPath;
}
