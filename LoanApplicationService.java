package com.loanorigination.backend.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.loanorigination.backend.dto.LoanApplicationRequest;
import com.loanorigination.backend.dto.LoanApplicationResponse;
import com.loanorigination.backend.model.*;
import com.loanorigination.backend.repository.DocumentRepository;
import com.loanorigination.backend.repository.LoanApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class LoanApplicationService {

    private final LoanApplicationRepository loanApplicationRepository;
    private final DocumentRepository documentRepository;
    private final FileStorageService fileStorageService;
    private final ObjectMapper objectMapper;

    @Transactional
    public LoanApplicationResponse createLoanApplication(LoanApplicationRequest request) throws IOException {
        log.info("Creating new loan application for: {} {}", request.getFirstName(), request.getLastName());

        // Generate unique application ID
        String applicationId = generateApplicationId();

        // Create loan application entity
        LoanApplication application = new LoanApplication();
        application.setApplicationId(applicationId);
        application.setStatus(LoanApplication.ApplicationStatus.SUBMITTED);

        // Set loan details
        application.setLoanDetails(createLoanDetails(request));

        // Set personal details
        application.setPersonalDetails(createPersonalDetails(request));

        // Set employment details
        application.setEmploymentDetails(createEmploymentDetails(request));

        // Process documents
        List<Document> documents = processDocuments(request, applicationId);
        application.setDocuments(documents);

        // Process existing loans
        List<ExistingLoan> existingLoans = processExistingLoans(request.getExistingLoansJson(), applicationId);
        application.setExistingLoans(existingLoans);

        // Process references
        List<Reference> references = processReferences(request.getReferencesJson(), applicationId);
        application.setReferences(references);

        // Save application
        LoanApplication savedApplication = loanApplicationRepository.save(application);
        log.info("Loan application created successfully with ID: {}", applicationId);

        return createResponse(savedApplication);
    }

    private String generateApplicationId() {
        return "LA" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private LoanDetails createLoanDetails(LoanApplicationRequest request) throws IOException {
        LoanDetails loanDetails = new LoanDetails();
        loanDetails.setLoanType(request.getLoanType());
        loanDetails.setLoanAmount(request.getLoanAmount());
        loanDetails.setLoanDuration(request.getLoanDuration());
        loanDetails.setLoanPurpose(request.getLoanPurpose());

        // Handle loan-specific documents
        if ("Home Loan".equals(request.getLoanType())) {
            if (request.getHomeSaleAgreement() != null) {
                loanDetails.setHomeSaleAgreementPath(
                    fileStorageService.storeFile(request.getHomeSaleAgreement(), "home_loan"));
            }
            if (request.getHomeEcDocument() != null) {
                loanDetails.setHomeEcDocumentPath(
                    fileStorageService.storeFile(request.getHomeEcDocument(), "home_loan"));
            }
        } else if ("Vehicle Loan".equals(request.getLoanType())) {
            if (request.getVehicleInvoice() != null) {
                loanDetails.setVehicleInvoicePath(
                    fileStorageService.storeFile(request.getVehicleInvoice(), "vehicle_loan"));
            }
            if (request.getVehicleQuotation() != null) {
                loanDetails.setVehicleQuotationPath(
                    fileStorageService.storeFile(request.getVehicleQuotation(), "vehicle_loan"));
            }
        }

        return loanDetails;
    }

    private PersonalDetails createPersonalDetails(LoanApplicationRequest request) {
        PersonalDetails personalDetails = new PersonalDetails();
        personalDetails.setFirstName(request.getFirstName());
        personalDetails.setMiddleName(request.getMiddleName());
        personalDetails.setLastName(request.getLastName());
        personalDetails.setPhoneNumber(request.getPhoneNumber());
        personalDetails.setEmail(request.getEmail());

        // Current Address
        personalDetails.setCurrentStreet(request.getCurrentStreet());
        personalDetails.setCurrentCity(request.getCurrentCity());
        personalDetails.setCurrentState(request.getCurrentState());
        personalDetails.setCurrentPincode(request.getCurrentPincode());

        // Permanent Address
        if (Boolean.TRUE.equals(request.getSameAsCurrentAddress())) {
            personalDetails.setPermanentStreet(request.getCurrentStreet());
            personalDetails.setPermanentCity(request.getCurrentCity());
            personalDetails.setPermanentState(request.getCurrentState());
            personalDetails.setPermanentPincode(request.getCurrentPincode());
            personalDetails.setSameAsCurrentAddress(true);
        } else {
            personalDetails.setPermanentStreet(request.getPermanentStreet());
            personalDetails.setPermanentCity(request.getPermanentCity());
            personalDetails.setPermanentState(request.getPermanentState());
            personalDetails.setPermanentPincode(request.getPermanentPincode());
            personalDetails.setSameAsCurrentAddress(false);
        }

        // Personal Information
        if (request.getDateOfBirth() != null) {
            personalDetails.setDateOfBirth(LocalDate.parse(request.getDateOfBirth()));
            // Age will be calculated automatically by the frontend
        }
        personalDetails.setGender(request.getGender());
        personalDetails.setMaritalStatus(request.getMaritalStatus());

        // Identity Information
        personalDetails.setAadhaarNumber(request.getAadhaarNumber());
        personalDetails.setPanNumber(request.getPanNumber());
        personalDetails.setPassportNumber(request.getPassportNumber());

        // Family Details
        personalDetails.setFatherName(request.getFatherName());
        personalDetails.setEducation(request.getEducation());

        return personalDetails;
    }

    private EmploymentDetails createEmploymentDetails(LoanApplicationRequest request) {
        EmploymentDetails employmentDetails = new EmploymentDetails();
        employmentDetails.setOccupationType(request.getOccupationType());

        if ("Salaried".equals(request.getOccupationType())) {
            employmentDetails.setCompanyName(request.getCompanyName());
            employmentDetails.setDesignation(request.getDesignation());
            employmentDetails.setExperience(request.getExperience());
            employmentDetails.setOfficeAddress(request.getOfficeAddress());
        } else if ("Self-Employed".equals(request.getOccupationType())) {
            employmentDetails.setBusinessName(request.getBusinessName());
            employmentDetails.setBusinessType(request.getBusinessType());
            employmentDetails.setExperience(request.getExperience());
            employmentDetails.setOfficeAddress(request.getOfficeAddress());
        }

        return employmentDetails;
    }

    private List<Document> processDocuments(LoanApplicationRequest request, String applicationId) throws IOException {
        List<Document> documents = new ArrayList<>();

        // Photograph
        if (request.getPhotograph() != null) {
            String filePath = fileStorageService.storeFile(request.getPhotograph(), "photographs");
            documents.add(createDocumentEntity("photograph", request.getPhotograph(), filePath, applicationId));
        }

        // Identity Proof
        if (request.getIdentityProofFile() != null) {
            String filePath = fileStorageService.storeFile(request.getIdentityProofFile(), "identity_proofs");
            Document doc = createDocumentEntity("identity_proof", request.getIdentityProofFile(), filePath, applicationId);
            doc.setDescription(request.getIdentityProofType());
            documents.add(doc);
        }

        // Address Proof
        if (request.getAddressProofFile() != null) {
            String filePath = fileStorageService.storeFile(request.getAddressProofFile(), "address_proofs");
            Document doc = createDocumentEntity("address_proof", request.getAddressProofFile(), filePath, applicationId);
            doc.setDescription(request.getAddressProofType());
            documents.add(doc);
        }

        // Employment Documents
        if ("Salaried".equals(request.getOccupationType())) {
            // Salary Slips
            if (request.getSalarySlips() != null) {
                for (MultipartFile file : request.getSalarySlips()) {
                    String filePath = fileStorageService.storeFile(file, "salary_slips");
                    documents.add(createDocumentEntity("salary_slip", file, filePath, applicationId));
                }
            }

            // ITR Documents
            if (request.getItrDocuments() != null) {
                for (MultipartFile file : request.getItrDocuments()) {
                    String filePath = fileStorageService.storeFile(file, "itr_documents");
                    documents.add(createDocumentEntity("itr_document", file, filePath, applicationId));
                }
            }

            // Bank Statements
            if (request.getBankStatements() != null) {
                for (MultipartFile file : request.getBankStatements()) {
                    String filePath = fileStorageService.storeFile(file, "bank_statements");
                    documents.add(createDocumentEntity("bank_statement", file, filePath, applicationId));
                }
            }

            // Employee Proof
            if (request.getEmployeeProof() != null) {
                String filePath = fileStorageService.storeFile(request.getEmployeeProof(), "employee_proofs");
                documents.add(createDocumentEntity("employee_proof", request.getEmployeeProof(), filePath, applicationId));
            }
        } else if ("Self-Employed".equals(request.getOccupationType())) {
            // Business Proof
            if (request.getBusinessProof() != null) {
                String filePath = fileStorageService.storeFile(request.getBusinessProof(), "business_proofs");
                documents.add(createDocumentEntity("business_proof", request.getBusinessProof(), filePath, applicationId));
            }

            // ITR Documents
            if (request.getSelfEmployedITR() != null) {
                for (MultipartFile file : request.getSelfEmployedITR()) {
                    String filePath = fileStorageService.storeFile(file, "itr_documents");
                    documents.add(createDocumentEntity("itr_document", file, filePath, applicationId));
                }
            }

            // Bank Statements
            if (request.getSelfEmployedBankStatements() != null) {
                for (MultipartFile file : request.getSelfEmployedBankStatements()) {
                    String filePath = fileStorageService.storeFile(file, "bank_statements");
                    documents.add(createDocumentEntity("bank_statement", file, filePath, applicationId));
                }
            }
        }

        return documents;
    }

    private Document createDocumentEntity(String documentType, MultipartFile file, String filePath, String applicationId) {
        Document document = new Document();
        document.setDocumentType(documentType);
        document.setOriginalFileName(file.getOriginalFilename());
        document.setFilePath(filePath);
        document.setFileType(getFileExtension(file.getOriginalFilename()));
        document.setFileSize(file.getSize());
        return document;
    }

    private String getFileExtension(String filename) {
        return filename.substring(filename.lastIndexOf('.') + 1);
    }

    private List<ExistingLoan> processExistingLoans(String existingLoansJson, String applicationId) throws IOException {
        if (existingLoansJson == null || existingLoansJson.trim().isEmpty()) {
            return new ArrayList<>();
        }

        List<ExistingLoan> existingLoans = objectMapper.readValue(
            existingLoansJson,
            new TypeReference<List<ExistingLoan>>() {}
        );

        // Set application ID for each loan
        existingLoans.forEach(loan -> loan.setApplicationId(Long.parseLong(applicationId.replace("LA", ""))));

        return existingLoans;
    }

    private List<Reference> processReferences(String referencesJson, String applicationId) throws IOException {
        if (referencesJson == null || referencesJson.trim().isEmpty()) {
            return new ArrayList<>();
        }

        List<Reference> references = objectMapper.readValue(
            referencesJson,
            new TypeReference<List<Reference>>() {}
        );

        // Set application ID for each reference
        references.forEach(ref -> ref.setApplicationId(Long.parseLong(applicationId.replace("LA", ""))));

        return references;
    }

    private LoanApplicationResponse createResponse(LoanApplication application) {
        LoanApplicationResponse response = new LoanApplicationResponse();
        response.setApplicationId(application.getApplicationId());
        response.setStatus(application.getStatus());
        response.setCreatedAt(application.getCreatedAt());
        response.setUpdatedAt(application.getUpdatedAt());
        response.setRemarks(application.getRemarks());

        // Summary information
        if (application.getPersonalDetails() != null) {
            response.setApplicantName(String.format("%s %s %s",
                application.getPersonalDetails().getFirstName(),
                application.getPersonalDetails().getMiddleName() != null ? application.getPersonalDetails().getMiddleName() : "",
                application.getPersonalDetails().getLastName()).trim());
            response.setEmail(application.getPersonalDetails().getEmail());
            response.setPhoneNumber(application.getPersonalDetails().getPhoneNumber());
        }

        if (application.getLoanDetails() != null) {
            response.setLoanType(application.getLoanDetails().getLoanType());
            response.setLoanAmount(application.getLoanDetails().getLoanAmount());
        }

        if (application.getDocuments() != null) {
            response.setDocumentCount(application.getDocuments().size());
        }

        return response;
    }

    public Optional<LoanApplication> getApplicationById(String applicationId) {
        return loanApplicationRepository.findByApplicationId(applicationId);
    }

    public List<LoanApplicationResponse> getAllApplications() {
        return loanApplicationRepository.findAll().stream()
            .map(this::createResponse)
            .toList();
    }

    public List<LoanApplicationResponse> searchApplications(String searchTerm) {
        return loanApplicationRepository.searchApplications(searchTerm).stream()
            .map(this::createResponse)
            .toList();
    }
}
