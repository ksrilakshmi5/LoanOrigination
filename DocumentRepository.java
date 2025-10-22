package com.loanorigination.backend.repository;

import com.loanorigination.backend.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByApplicationId(Long applicationId);

    List<Document> findByApplicationIdAndDocumentType(Long applicationId, String documentType);

    void deleteByApplicationId(Long applicationId);
}
