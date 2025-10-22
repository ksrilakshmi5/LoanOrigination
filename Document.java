package com.loanorigination.backend.model;

public class Documents {

    private String photograph;           // file path or URL
    private String identityProofType;    // e.g. Aadhaar Card, PAN Card, etc.
    private String identityProofFile;    // file path or name
    private String addressProofType;     // e.g. Rental Agreement, Passport, etc.
    private String addressProofFile;     // file path or name

    // --- Constructors ---
    public Documents() {
    }

    public Documents(String photograph, String identityProofType, String identityProofFile,
                     String addressProofType, String addressProofFile) {
        this.photograph = photograph;
        this.identityProofType = identityProofType;
        this.identityProofFile = identityProofFile;
        this.addressProofType = addressProofType;
        this.addressProofFile = addressProofFile;
    }

    // --- Getters and Setters ---
    public String getPhotograph() {
        return photograph;
    }

    public void setPhotograph(String photograph) {
        this.photograph = photograph;
    }

    public String getIdentityProofType() {
        return identityProofType;
    }

    public void setIdentityProofType(String identityProofType) {
        this.identityProofType = identityProofType;
    }

    public String getIdentityProofFile() {
        return identityProofFile;
    }

    public void setIdentityProofFile(String identityProofFile) {
        this.identityProofFile = identityProofFile;
    }

    public String getAddressProofType() {
        return addressProofType;
    }

    public void setAddressProofType(String addressProofType) {
        this.addressProofType = addressProofType;
    }

    public String getAddressProofFile() {
        return addressProofFile;
    }

    public void setAddressProofFile(String addressProofFile) {
        this.addressProofFile = addressProofFile;
    }

    // --- toString ---
    @Override
    public String toString() {
        return "Documents{" +
                "photograph='" + photograph + '\'' +
                ", identityProofType='" + identityProofType + '\'' +
                ", identityProofFile='" + identityProofFile + '\'' +
                ", addressProofType='" + addressProofType + '\'' +
                ", addressProofFile='" + addressProofFile + '\'' +
                '}';
    }
}
