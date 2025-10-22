package com.loanorigination.backend.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDetails {

    // Basic Information
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

    private Boolean sameAsCurrentAddress = false;

    // Personal Information
    private LocalDate dateOfBirth;
    private Integer age;
    private String gender;
    private String maritalStatus;

    // Identity Information
    private String aadhaarNumber;
    private String panNumber;
    private String passportNumber;

    // Family Details
    private String fatherName;
    private String education;
}
