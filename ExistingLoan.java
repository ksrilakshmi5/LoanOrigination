package com.loanorigination.backend.model;

public class ExistingLoan {

    private String loanType;           // e.g., Home Loan, Vehicle Loan, Personal Loan, etc.
    private String lenderName;         // e.g., HDFC Bank, SBI, etc.
    private Double outstandingAmount;  // Remaining loan amount
    private Double emi;                // Monthly EMI
    private Integer tenureRemaining;   // Remaining tenure in months

    // --- Constructors ---
    public ExistingLoan() {
    }

    public ExistingLoan(String loanType, String lenderName, Double outstandingAmount,
                        Double emi, Integer tenureRemaining) {
        this.loanType = loanType;
        this.lenderName = lenderName;
        this.outstandingAmount = outstandingAmount;
        this.emi = emi;
        this.tenureRemaining = tenureRemaining;
    }

    // --- Getters and Setters ---
    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public String getLenderName() {
        return lenderName;
    }

    public void setLenderName(String lenderName) {
        this.lenderName = lenderName;
    }

    public Double getOutstandingAmount() {
        return outstandingAmount;
    }

    public void setOutstandingAmount(Double outstandingAmount) {
        this.outstandingAmount = outstandingAmount;
    }

    public Double getEmi() {
        return emi;
    }

    public void setEmi(Double emi) {
        this.emi = emi;
    }

    public Integer getTenureRemaining() {
        return tenureRemaining;
    }

    public void setTenureRemaining(Integer tenureRemaining) {
        this.tenureRemaining = tenureRemaining;
    }

    // --- toString ---
    @Override
    public String toString() {
        return "ExistingLoan{" +
                "loanType='" + loanType + '\'' +
                ", lenderName='" + lenderName + '\'' +
                ", outstandingAmount=" + outstandingAmount +
                ", emi=" + emi +
                ", tenureRemaining=" + tenureRemaining +
                '}';
    }
}
package com.loanorigination.backend.model;

public class ExistingLoan {

    private String loanType;           // e.g., Home Loan, Vehicle Loan, Personal Loan, etc.
    private String lenderName;         // e.g., HDFC Bank, SBI, etc.
    private Double outstandingAmount;  // Remaining loan amount
    private Double emi;                // Monthly EMI
    private Integer tenureRemaining;   // Remaining tenure in months

    // --- Constructors ---
    public ExistingLoan() {
    }

    public ExistingLoan(String loanType, String lenderName, Double outstandingAmount,
                        Double emi, Integer tenureRemaining) {
        this.loanType = loanType;
        this.lenderName = lenderName;
        this.outstandingAmount = outstandingAmount;
        this.emi = emi;
        this.tenureRemaining = tenureRemaining;
    }

    // --- Getters and Setters ---
    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public String getLenderName() {
        return lenderName;
    }

    public void setLenderName(String lenderName) {
        this.lenderName = lenderName;
    }

    public Double getOutstandingAmount() {
        return outstandingAmount;
    }

    public void setOutstandingAmount(Double outstandingAmount) {
        this.outstandingAmount = outstandingAmount;
    }

    public Double getEmi() {
        return emi;
    }

    public void setEmi(Double emi) {
        this.emi = emi;
    }

    public Integer getTenureRemaining() {
        return tenureRemaining;
    }

    public void setTenureRemaining(Integer tenureRemaining) {
        this.tenureRemaining = tenureRemaining;
    }

    // --- toString ---
    @Override
    public String toString() {
        return "ExistingLoan{" +
                "loanType='" + loanType + '\'' +
                ", lenderName='" + lenderName + '\'' +
                ", outstandingAmount=" + outstandingAmount +
                ", emi=" + emi +
                ", tenureRemaining=" + tenureRemaining +
                '}';
    }
}
