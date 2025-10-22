package com.loanorigination.backend.dto;

import com.loanorigination.backend.model.LoanApplication;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoanApplicationResponse {

    private String applicationId;
    private LoanApplication.ApplicationStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String remarks;

    // Summary information
    private String applicantName;
    private String loanType;
    private Double loanAmount;
    private String email;
    private String phoneNumber;

    // Document count
    private Integer documentCount;

    // URLs for actions
    private String viewUrl;
    private String editUrl;
    private String downloadUrl;
}
