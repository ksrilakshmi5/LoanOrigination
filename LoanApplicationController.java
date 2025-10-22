package com.loanorigination.backend.controller;

import com.loanorigination.backend.dto.LoanApplicationRequest;
import com.loanorigination.backend.dto.LoanApplicationResponse;
import com.loanorigination.backend.model.LoanApplication;
import com.loanorigination.backend.service.LoanApplicationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class LoanApplicationController {

    private final LoanApplicationService loanApplicationService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> submitApplication(
            @RequestParam(value = "loanType") String loanType,
            @RequestParam(value = "loanAmount") Double loanAmount,
            @RequestParam(value = "loanDuration") Integer loanDuration,
            @RequestParam(value = "loanPurpose") String loanPurpose,

            // Personal Details
            @RequestParam(value = "firstName") String firstName,
            @RequestParam(value = "middleName", required = false) String middleName,
            @RequestParam(value = "lastName") String lastName,
            @RequestParam(value = "phoneNumber") String phoneNumber,
            @RequestParam(value = "email") String email,

            // Current Address
            @RequestParam(value = "currentStreet") String currentStreet,
            @RequestParam(value = "currentCity") String currentCity,
            @RequestParam(value = "currentState") String currentState,
            @RequestParam(value = "currentPincode") String currentPincode,

            // Permanent Address
            @RequestParam(value = "permanentStreet", required = false) String permanentStreet,
            @RequestParam(value = "permanentCity", required = false) String permanentCity,
            @RequestParam(value = "permanentState", required = false) String permanentState,
            @RequestParam(value = "permanentPincode", required = false) String permanentPincode,
            @RequestParam(value = "sameAsCurrentAddress", defaultValue = "false") Boolean sameAsCurrentAddress,

            // Personal Information
            @RequestParam(value = "dateOfBirth") String dateOfBirth,
            @RequestParam(value = "gender") String gender,
            @RequestParam(value = "maritalStatus") String maritalStatus,

            // Identity Information
            @RequestParam(value = "aadhaarNumber") String aadhaarNumber,
            @RequestParam(value = "panNumber") String panNumber,
            @RequestParam(value = "passportNumber", required = false) String passportNumber,

            // Family Details
            @RequestParam(value = "fatherName") String fatherName,
            @RequestParam(value = "education") String education,

            // Employment Details
            @RequestParam(value = "occupationType") String occupationType,
            @RequestParam(value = "companyName", required = false) String companyName,
            @RequestParam(value = "businessName", required = false) String businessName,
            @RequestParam(value = "designation", required = false) String designation,
            @RequestParam(value = "businessType", required = false) String businessType,
            @RequestParam(value = "experience") String experience,
            @RequestParam(value = "officeAddress") String officeAddress,

            // Documents
            @RequestParam(value = "photograph", required = false) MultipartFile photograph,
            @RequestParam(value = "identityProofFile", required = false) MultipartFile identityProofFile,
            @RequestParam(value = "identityProofType", required = false) String identityProofType,
            @RequestParam(value = "addressProofFile", required = false) MultipartFile addressProofFile,
            @RequestParam(value = "addressProofType", required = false) String addressProofType,

            // Employment Documents
            @RequestParam(value = "salarySlips", required = false) List<MultipartFile> salarySlips,
            @RequestParam(value = "itrDocuments", required = false) List<MultipartFile> itrDocuments,
            @RequestParam(value = "bankStatements", required = false) List<MultipartFile> bankStatements,
            @RequestParam(value = "employeeProof", required = false) MultipartFile employeeProof,

            // Self-employed Documents
            @RequestParam(value = "businessProof", required = false) MultipartFile businessProof,
            @RequestParam(value = "selfEmployedITR", required = false) List<MultipartFile> selfEmployedITR,
            @RequestParam(value = "selfEmployedBankStatements", required = false) List<MultipartFile> selfEmployedBankStatements,

            // Home/Vehicle Loan Documents
            @RequestParam(value = "homeSaleAgreement", required = false) MultipartFile homeSaleAgreement,
            @RequestParam(value = "homeEcDocument", required = false) MultipartFile homeEcDocument,
            @RequestParam(value = "vehicleInvoice", required = false) MultipartFile vehicleInvoice,
            @RequestParam(value = "vehicleQuotation", required = false) MultipartFile vehicleQuotation,

            // Existing Loans and References (as JSON strings)
            @RequestParam(value = "existingLoansJson", required = false) String existingLoansJson,
            @RequestParam(value = "referencesJson") String referencesJson) {

        try {
            // Create request object
            LoanApplicationRequest request = new LoanApplicationRequest();
            request.setLoanType(loanType);
            request.setLoanAmount(loanAmount);
            request.setLoanDuration(loanDuration);
            request.setLoanPurpose(loanPurpose);

            // Personal Details
            request.setFirstName(firstName);
            request.setMiddleName(middleName);
            request.setLastName(lastName);
            request.setPhoneNumber(phoneNumber);
            request.setEmail(email);

            // Current Address
            request.setCurrentStreet(currentStreet);
            request.setCurrentCity(currentCity);
            request.setCurrentState(currentState);
            request.setCurrentPincode(currentPincode);

            // Permanent Address
            request.setPermanentStreet(permanentStreet);
            request.setPermanentCity(permanentCity);
            request.setPermanentState(permanentState);
            request.setPermanentPincode(permanentPincode);
            request.setSameAsCurrentAddress(sameAsCurrentAddress);

            // Personal Information
            request.setDateOfBirth(dateOfBirth);
            request.setGender(gender);
            request.setMaritalStatus(maritalStatus);

            // Identity Information
            request.setAadhaarNumber(aadhaarNumber);
            request.setPanNumber(panNumber);
            request.setPassportNumber(passportNumber);

            // Family Details
            request.setFatherName(fatherName);
            request.setEducation(education);

            // Employment Details
            request.setOccupationType(occupationType);
            request.setCompanyName(companyName);
            request.setBusinessName(businessName);
            request.setDesignation(designation);
            request.setBusinessType(businessType);
            request.setExperience(experience);
            request.setOfficeAddress(officeAddress);

            // Documents
            request.setPhotograph(photograph);
            request.setIdentityProofFile(identityProofFile);
            request.setIdentityProofType(identityProofType);
            request.setAddressProofFile(addressProofFile);
            request.setAddressProofType(addressProofType);

            // Employment Documents
            request.setSalarySlips(salarySlips);
            request.setItrDocuments(itrDocuments);
            request.setBankStatements(bankStatements);
            request.setEmployeeProof(employeeProof);

            // Self-employed Documents
            request.setBusinessProof(businessProof);
            request.setSelfEmployedITR(selfEmployedITR);
            request.setSelfEmployedBankStatements(selfEmployedBankStatements);

            // Home/Vehicle Loan Documents
            request.setHomeSaleAgreement(homeSaleAgreement);
            request.setHomeEcDocument(homeEcDocument);
            request.setVehicleInvoice(vehicleInvoice);
            request.setVehicleQuotation(vehicleQuotation);

            // Existing Loans and References
            request.setExistingLoansJson(existingLoansJson);
            request.setReferencesJson(referencesJson);

            // Process the application
            LoanApplicationResponse response = loanApplicationService.createLoanApplication(request);

            log.info("Loan application submitted successfully with ID: {}", response.getApplicationId());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (IOException e) {
            log.error("File upload error: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("File upload failed: " + e.getMessage()));
        } catch (Exception e) {
            log.error("Application submission error: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Application submission failed: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<LoanApplicationResponse>> getAllApplications() {
        try {
            List<LoanApplicationResponse> applications = loanApplicationService.getAllApplications();
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            log.error("Error fetching applications: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<?> getApplicationById(@PathVariable String applicationId) {
        try {
            Optional<LoanApplication> application = loanApplicationService.getApplicationById(applicationId);
            if (application.isPresent()) {
                return ResponseEntity.ok(application.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorResponse("Application not found"));
            }
        } catch (Exception e) {
            log.error("Error fetching application: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to fetch application"));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<LoanApplicationResponse>> searchApplications(@RequestParam String query) {
        try {
            List<LoanApplicationResponse> applications = loanApplicationService.searchApplications(query);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            log.error("Error searching applications: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Error response class
    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
