package com.loanorigination.backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "loan_applicants")
public class LoanApplicant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Step 1: Loan Details
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "loan_details_id")
    private LoanDetails loanDetails;

    // Step 2: Personal Details
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "personal_details_id")
    private PersonalDetails personalDetails;

    // Step 3: Documents
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "documents_id")
    private Documents documents;

    // Step 4: Employment Details
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "employment_details_id")
    private EmploymentDetails employmentDetails;

    // Step 5: Existing Loans
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "loan_applicant_id")
    private List<ExistingLoan> existingLoans;

    // Step 6: References
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "loan_applicant_id")
    private List<Reference> references;

    // Declarations
    private boolean agreedToTerms;
    private boolean agreedToVerification;

    // ------------------- Getters and Setters -------------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LoanDetails getLoanDetails() {
        return loanDetails;
    }

    public void setLoanDetails(LoanDetails loanDetails) {
        this.loanDetails = loanDetails;
    }

    public PersonalDetails getPersonalDetails() {
        return personalDetails;
    }

    public void setPersonalDetails(PersonalDetails personalDetails) {
        this.personalDetails = personalDetails;
    }

    public Documents getDocuments() {
        return documents;
    }

    public void setDocuments(Documents documents) {
        this.documents = documents;
    }

    public EmploymentDetails getEmploymentDetails() {
        return employmentDetails;
    }

    public void setEmploymentDetails(EmploymentDetails employmentDetails) {
        this.employmentDetails = employmentDetails;
    }

    public List<ExistingLoan> getExistingLoans() {
        return existingLoans;
    }

    public void setExistingLoans(List<ExistingLoan> existingLoans) {
        this.existingLoans = existingLoans;
    }

    public List<Reference> getReferences() {
        return references;
    }

    public void setReferences(List<Reference> references) {
        this.references = references;
    }

    public boolean isAgreedToTerms() {
        return agreedToTerms;
    }

    public void setAgreedToTerms(boolean agreedToTerms) {
        this.agreedToTerms = agreedToTerms;
    }

    public boolean isAgreedToVerification() {
        return agreedToVerification;
    }

    public void setAgreedToVerification(boolean agreedToVerification) {
        this.agreedToVerification = agreedToVerification;
    }
}
