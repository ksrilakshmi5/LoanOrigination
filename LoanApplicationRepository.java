package com.loanorigination.backend.repository;

import com.loanorigination.backend.model.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {

    Optional<LoanApplication> findByApplicationId(String applicationId);

    List<LoanApplication> findByStatus(LoanApplication.ApplicationStatus status);

    List<LoanApplication> findByPersonalDetailsEmail(String email);

    List<LoanApplication> findByPersonalDetailsPhoneNumber(String phoneNumber);

    @Query("SELECT la FROM LoanApplication la WHERE la.createdAt BETWEEN :startDate AND :endDate")
    List<LoanApplication> findByDateRange(@Param("startDate") LocalDateTime startDate,
                                         @Param("endDate") LocalDateTime endDate);

    @Query("SELECT COUNT(la) FROM LoanApplication la WHERE la.status = :status")
    Long countByStatus(@Param("status") LoanApplication.ApplicationStatus status);

    @Query("SELECT la FROM LoanApplication la WHERE " +
           "LOWER(la.personalDetails.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(la.personalDetails.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(la.personalDetails.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(la.applicationId) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<LoanApplication> searchApplications(@Param("searchTerm") String searchTerm);
}
