package com.loanorigination.backend.model;

import java.util.List;

public class EmploymentDetails {

    private String occupationType; // "Salaried" or "Self-Employed"
    private String companyName;
    private String businessName;
    private String designation;
    private String businessType;
    private String experience;     // e.g., "3-5"
    private String officeAddress;

    // Salaried documents
    private List<String> salarySlips;         // file names or URLs
    private List<String> itrDocuments;
    private List<String> bankStatements;
    private String employeeProof;             // single file

    // Self-employed documents
    private String businessProof;             // single file
    private List<String> selfEmployedITR;
    private List<String> selfEmployedBankStatements;

    // --- Constructors ---
    public EmploymentDetails() {
    }

    public EmploymentDetails(String occupationType, String companyName, String businessName, String designation,
                             String businessType, String experience, String officeAddress,
                             List<String> salarySlips, List<String> itrDocuments, List<String> bankStatements,
                             String employeeProof, String businessProof,
                             List<String> selfEmployedITR, List<String> selfEmployedBankStatements) {
        this.occupationType = occupationType;
        this.companyName = companyName;
        this.businessName = businessName;
        this.designation = designation;
        this.businessType = businessType;
        this.experience = experience;
        this.officeAddress = officeAddress;
        this.salarySlips = salarySlips;
        this.itrDocuments = itrDocuments;
        this.bankStatements = bankStatements;
        this.employeeProof = employeeProof;
        this.businessProof = businessProof;
        this.selfEmployedITR = selfEmployedITR;
        this.selfEmployedBankStatements = selfEmployedBankStatements;
    }

    // --- Getters and Setters ---
    public String getOccupationType() { return occupationType; }
    public void setOccupationType(String occupationType) { this.occupationType = occupationType; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getBusinessType() { return businessType; }
    public void setBusinessType(String businessType) { this.businessType = businessType; }

    public String getExperience() { return experience; }
    public void setExperience(String experience) { this.experience = experience; }

    public String getOfficeAddress() { return officeAddress; }
    public void setOfficeAddress(String officeAddress) { this.officeAddress = officeAddress; }

    public List<String> getSalarySlips() { return salarySlips; }
    public void setSalarySlips(List<String> salarySlips) { this.salarySlips = salarySlips; }

    public List<String> getItrDocuments() { return itrDocuments; }
    public void setItrDocuments(List<String> itrDocuments) { this.itrDocuments = itrDocuments; }

    public List<String> getBankStatements() { return bankStatements; }
    public void setBankStatements(List<String> bankStatements) { this.bankStatements = bankStatements; }

    public String getEmployeeProof() { return employeeProof; }
    public void setEmployeeProof(String employeeProof) { this.employeeProof = employeeProof; }

    public String getBusinessProof() { return businessProof; }
    public void setBusinessProof(String businessProof) { this.businessProof = businessProof; }

    public List<String> getSelfEmployedITR() { return selfEmployedITR; }
    public void setSelfEmployedITR(List<String> selfEmployedITR) { this.selfEmployedITR = selfEmployedITR; }

    public List<String> getSelfEmployedBankStatements() { return selfEmployedBankStatements; }
    public void setSelfEmployedBankStatements(List<String> selfEmployedBankStatements) { this.selfEmployedBankStatements = selfEmployedBankStatements; }

    // --- toString ---
    @Override
    public String toString() {
        return "EmploymentDetails{" +
                "occupationType='" + occupationType + '\'' +
                ", companyName='" + companyName + '\'' +
                ", businessName='" + businessName + '\'' +
                ", designation='" + designation + '\'' +
                ", businessType='" + businessType + '\'' +
                ", experience='" + experience + '\'' +
                ", officeAddress='" + officeAddress + '\'' +
                ", salarySlips=" + salarySlips +
                ", itrDocuments=" + itrDocuments +
                ", bankStatements=" + bankStatements +
                ", employeeProof='" + employeeProof + '\'' +
                ", businessProof='" + businessProof + '\'' +
                ", selfEmployedITR=" + selfEmployedITR +
                ", selfEmployedBankStatements=" + selfEmployedBankStatements +
                '}';
    }
}
