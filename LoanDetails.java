package com.loanorigination.backend.model;

public class LoanDetails {

    private String loanType;              // Personal Loan, Home Loan, Vehicle Loan
    private Double loanAmount;            // e.g. 50000+
    private Integer loanDuration;         // In years
    private String loanPurpose;           // Text description

    // For document uploads (store file paths or names)
    private String homeSaleAgreement;     // File path or name
    private String homeEcDocument;
    private String vehicleInvoice;
    private String vehicleQuotation;

    // --- Constructors ---
    public LoanDetails() {
    }

    public LoanDetails(String loanType, Double loanAmount, Integer loanDuration, String loanPurpose,
                       String homeSaleAgreement, String homeEcDocument,
                       String vehicleInvoice, String vehicleQuotation) {
        this.loanType = loanType;
        this.loanAmount = loanAmount;
        this.loanDuration = loanDuration;
        this.loanPurpose = loanPurpose;
        this.homeSaleAgreement = homeSaleAgreement;
        this.homeEcDocument = homeEcDocument;
        this.vehicleInvoice = vehicleInvoice;
        this.vehicleQuotation = vehicleQuotation;
    }

    // --- Getters and Setters ---
    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public Double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(Double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public Integer getLoanDuration() {
        return loanDuration;
    }

    public void setLoanDuration(Integer loanDuration) {
        this.loanDuration = loanDuration;
    }

    public String getLoanPurpose() {
        return loanPurpose;
    }

    public void setLoanPurpose(String loanPurpose) {
        this.loanPurpose = loanPurpose;
    }

    public String getHomeSaleAgreement() {
        return homeSaleAgreement;
    }

    public void setHomeSaleAgreement(String homeSaleAgreement) {
        this.homeSaleAgreement = homeSaleAgreement;
    }

    public String getHomeEcDocument() {
        return homeEcDocument;
    }

    public void setHomeEcDocument(String homeEcDocument) {
        this.homeEcDocument = homeEcDocument;
    }

    public String getVehicleInvoice() {
        return vehicleInvoice;
    }

    public void setVehicleInvoice(String vehicleInvoice) {
        this.vehicleInvoice = vehicleInvoice;
    }

    public String getVehicleQuotation() {
        return vehicleQuotation;
    }

    public void setVehicleQuotation(String vehicleQuotation) {
        this.vehicleQuotation = vehicleQuotation;
    }

    // --- toString ---
    @Override
    public String toString() {
        return "LoanDetails{" +
                "loanType='" + loanType + '\'' +
                ", loanAmount=" + loanAmount +
                ", loanDuration=" + loanDuration +
                ", loanPurpose='" + loanPurpose + '\'' +
                ", homeSaleAgreement='" + homeSaleAgreement + '\'' +
                ", homeEcDocument='" + homeEcDocument + '\'' +
                ", vehicleInvoice='" + vehicleInvoice + '\'' +
                ", vehicleQuotation='" + vehicleQuotation + '\'' +
                '}';
    }
}
