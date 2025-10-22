package com.loanorigination.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanApplicationRequest {

    // Loan Details
    private String loanType;
    private Double loanAmount;
    private Integer loanDuration;
    private String loanPurpose;

    // Personal Details
    private String firstName;
    private String middleName;
    private String lastName;
    private String phoneNumber;
    private String email;

    // Current Address
    private String currentStreet;
    private String currentCity;
    private String currentState;
    private String currentPincode;

    // Permanent Address
    private String permanentStreet;
    private String permanentCity;
    private String permanentState;
    private String permanentPincode;
    private Boolean sameAsCurrentAddress;

    // Personal Information
    private String dateOfBirth;
    private String gender;
    private String maritalStatus;

    // Identity Information
    private String aadhaarNumber;
    private String panNumber;
    private String passportNumber;

    // Family Details
    private String fatherName;
    private String education;

    // Employment Details
    private String occupationType;
    private String companyName;
    private String businessName;
    private String designation;
    private String businessType;
    private String experience;
    private String officeAddress;

    // Documents (Multipart files)
    private MultipartFile photograph;
    private MultipartFile identityProofFile;
    private String identityProofType;
    private MultipartFile addressProofFile;
    private String addressProofType;

    // Employment Documents
    private List<MultipartFile> salarySlips;
    private List<MultipartFile> itrDocuments;
    private List<MultipartFile> bankStatements;
    private MultipartFile employeeProof;

    // Self-employed Documents
    private MultipartFile businessProof;
    private List<MultipartFile> selfEmployedITR;
    private List<MultipartFile> selfEmployedBankStatements;

    // Home/Vehicle Loan Documents
    private MultipartFile homeSaleAgreement;
    private MultipartFile homeEcDocument;
    private MultipartFile vehicleInvoice;
    private MultipartFile vehicleQuotation;

    // Existing Loans (as JSON string to be parsed)
    private String existingLoansJson;

    // References (as JSON string to be parsed)
    private String referencesJson;
}
