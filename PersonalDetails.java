package com.loanorigination.backend.model;

public class PersonalDetails {

    private String firstName;
    private String middleName;
    private String lastName;
    private String phoneNumber;
    private String email;

    private Address currentAddress;
    private Address permanentAddress;
    private boolean sameAsCurrentAddress;

    private String dateOfBirth;
    private Integer age;
    private String gender;
    private String maritalStatus;

    private String aadhaarNumber;
    private String panNumber;
    private String passportNumber;

    private String fatherName;
    private String education;

    // --- Constructors ---
    public PersonalDetails() {
        this.currentAddress = new Address();
        this.permanentAddress = new Address();
    }

    public PersonalDetails(String firstName, String middleName, String lastName, String phoneNumber, String email,
                           Address currentAddress, Address permanentAddress, boolean sameAsCurrentAddress,
                           String dateOfBirth, Integer age, String gender, String maritalStatus,
                           String aadhaarNumber, String panNumber, String passportNumber,
                           String fatherName, String education) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.currentAddress = currentAddress;
        this.permanentAddress = permanentAddress;
        this.sameAsCurrentAddress = sameAsCurrentAddress;
        this.dateOfBirth = dateOfBirth;
        this.age = age;
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.aadhaarNumber = aadhaarNumber;
        this.panNumber = panNumber;
        this.passportNumber = passportNumber;
        this.fatherName = fatherName;
        this.education = education;
    }

    // --- Getters and Setters ---
    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getMiddleName() { return middleName; }

    public void setMiddleName(String middleName) { this.middleName = middleName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPhoneNumber() { return phoneNumber; }

    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public Address getCurrentAddress() { return currentAddress; }

    public void setCurrentAddress(Address currentAddress) { this.currentAddress = currentAddress; }

    public Address getPermanentAddress() { return permanentAddress; }

    public void setPermanentAddress(Address permanentAddress) { this.permanentAddress = permanentAddress; }

    public boolean isSameAsCurrentAddress() { return sameAsCurrentAddress; }

    public void setSameAsCurrentAddress(boolean sameAsCurrentAddress) { this.sameAsCurrentAddress = sameAsCurrentAddress; }

    public String getDateOfBirth() { return dateOfBirth; }

    public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public Integer getAge() { return age; }

    public void setAge(Integer age) { this.age = age; }

    public String getGender() { return gender; }

    public void setGender(String gender) { this.gender = gender; }

    public String getMaritalStatus() { return maritalStatus; }

    public void setMaritalStatus(String maritalStatus) { this.maritalStatus = maritalStatus; }

    public String getAadhaarNumber() { return aadhaarNumber; }

    public void setAadhaarNumber(String aadhaarNumber) { this.aadhaarNumber = aadhaarNumber; }

    public String getPanNumber() { return panNumber; }

    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }

    public String getPassportNumber() { return passportNumber; }

    public void setPassportNumber(String passportNumber) { this.passportNumber = passportNumber; }

    public String getFatherName() { return fatherName; }

    public void setFatherName(String fatherName) { this.fatherName = fatherName; }

    public String getEducation() { return education; }

    public void setEducation(String education) { this.education = education; }

    // --- toString ---
    @Override
    public String toString() {
        return "PersonalDetails{" +
                "firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", currentAddress=" + currentAddress +
                ", permanentAddress=" + permanentAddress +
                ", sameAsCurrentAddress=" + sameAsCurrentAddress +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", maritalStatus='" + maritalStatus + '\'' +
                ", aadhaarNumber='" + aadhaarNumber + '\'' +
                ", panNumber='" + panNumber + '\'' +
                ", passportNumber='" + passportNumber + '\'' +
                ", fatherName='" + fatherName + '\'' +
                ", education='" + education + '\'' +
                '}';
    }
}
