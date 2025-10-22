package com.loanorigination.backend.controller;

import com.loanorigination.backend.model.LoanApplicant;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/loan-applicants")
public class LoanApplicantController {

    // In-memory storage
    private final List<LoanApplicant> loanApplicants = new ArrayList<>();

    // GET all loan applicants
    @GetMapping
    public List<LoanApplicant> getAllApplicants() {
        return loanApplicants;
    }

    // GET a loan applicant by index (or ID if you add one)
    @GetMapping("/{index}")
    public LoanApplicant getApplicant(@PathVariable int index) {
        if(index < 0 || index >= loanApplicants.size()) {
            throw new RuntimeException("Applicant not found");
        }
        return loanApplicants.get(index);
    }

    // POST a new loan applicant
    @PostMapping
    public LoanApplicant addApplicant(@RequestBody LoanApplicant applicant) {
        loanApplicants.add(applicant);
        return applicant;
    }

    // Optional: PUT to update existing applicant
    @PutMapping("/{index}")
    public LoanApplicant updateApplicant(@PathVariable int index, @RequestBody LoanApplicant applicant) {
        if(index < 0 || index >= loanApplicants.size()) {
            throw new RuntimeException("Applicant not found");
        }
        loanApplicants.set(index, applicant);
        return applicant;
    }
}
