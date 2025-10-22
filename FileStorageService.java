package com.loanorigination.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Value("${app.allowed-file-types}")
    private String allowedFileTypes;

    @Value("${app.max-file-size}")
    private Long maxFileSize;

    private final List<String> allowedTypes;

    public FileStorageService() {
        this.allowedTypes = Arrays.asList("pdf", "jpg", "jpeg", "png");
    }

    public String storeFile(MultipartFile file, String documentType) throws IOException {
        // Validate file
        validateFile(file);

        // Create directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir, documentType);
        Files.createDirectories(uploadPath);

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFilename);
        String uniqueFilename = UUID.randomUUID().toString() + "." + fileExtension;

        // Save file
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return relative path
        return documentType + "/" + uniqueFilename;
    }

    public void deleteFile(String filePath) throws IOException {
        Path path = Paths.get(uploadDir, filePath);
        Files.deleteIfExists(path);
    }

    private void validateFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("File is empty");
        }

        // Check file size
        if (file.getSize() > maxFileSize) {
            throw new IOException("File size exceeds maximum allowed size: " + (maxFileSize / (1024 * 1024)) + "MB");
        }

        // Check file type
        String fileExtension = getFileExtension(file.getOriginalFilename());
        if (!allowedTypes.contains(fileExtension.toLowerCase())) {
            throw new IOException("File type not allowed. Allowed types: " + String.join(", ", allowedTypes));
        }
    }

    private String getFileExtension(String filename) {
        if (filename == null || filename.isEmpty()) {
            return "";
        }
        int lastDotIndex = filename.lastIndexOf('.');
        return lastDotIndex == -1 ? "" : filename.substring(lastDotIndex + 1);
    }

    public Path getFilePath(String relativePath) {
        return Paths.get(uploadDir, relativePath);
    }
}
