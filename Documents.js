import React, { useState } from 'react';

const Documents = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    photograph: data.photograph || null,
    identityProofType: data.identityProofType || '',
    identityProofFile: data.identityProofFile || null,
    addressProofType: data.addressProofType || '',
    addressProofFile: data.addressProofFile || null
  });

  const [errors, setErrors] = useState({});

  // Identity proof options
  const identityProofOptions = [
    'Aadhaar Card',
    'PAN Card',
    'Passport',
    'Voter ID',
    'Driving License'
  ];

  // Address proof options
  const addressProofOptions = [
    'Aadhaar Card',
    'Utility Bills (Electricity/Water)',
    'Rental Agreement',
    'Passport',
    'Bank Statement'
  ];

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, [fieldName]: 'File size must be less than 5MB' });
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, [fieldName]: 'Only JPG, PNG, PDF files are allowed' });
        return;
      }

      setFormData({ ...formData, [fieldName]: file });
      setErrors({ ...errors, [fieldName]: '' });
    }
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleRemoveFile = (fieldName) => {
    setFormData({ ...formData, [fieldName]: null });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.photograph) {
      newErrors.photograph = 'Photograph is required';
    }

    if (!formData.identityProofType) {
      newErrors.identityProofType = 'Please select identity proof type';
    }
    if (!formData.identityProofFile) {
      newErrors.identityProofFile = 'Please upload identity proof document';
    }

    if (!formData.addressProofType) {
      newErrors.addressProofType = 'Please select address proof type';
    }
    if (!formData.addressProofFile) {
      newErrors.addressProofFile = 'Please upload address proof document';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    } else {
      alert('Please upload all required documents');
    }
  };

  return (
    <div>
      <h2 className="form-title">Document Upload</h2>
      <p className="form-subtitle">Please upload clear copies of your identity and address proofs</p>

      {/* Photograph Section */}
      <div className="form-section">
        <h3 className="section-title">Photograph</h3>
        
        <div className="form-group">
          <label className="form-label">
            Upload Recent Passport Size Photo <span className="required">*</span>
          </label>
          
          <div className={`file-upload-container ${formData.photograph ? 'has-file' : ''}`}>
            <label className="file-upload-label">
              <input
                type="file"
                className="file-input"
                accept="image/jpeg,image/jpg,image/png"
                onChange={(e) => handleFileChange(e, 'photograph')}
              />
              {formData.photograph ? (
                <div className="file-preview">
                  <span className="file-name">
                    ✓ {formData.photograph.name}
                  </span>
                  <button 
                    type="button" 
                    className="file-remove"
                    onClick={() => handleRemoveFile('photograph')}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📷</div>
                  <div className="file-info">Click to upload photograph</div>
                  <div className="text-muted">JPG, PNG (Max 5MB)</div>
                  <div className="text-muted">Face should be clearly visible</div>
                </>
              )}
            </label>
          </div>
          {errors.photograph && <span className="error-message">{errors.photograph}</span>}
        </div>
      </div>

      {/* Identity Proof Section */}
      <div className="form-section">
        <h3 className="section-title">Identity Proof</h3>
        
        <div className="form-row two-cols">
          <div className="form-group">
            <label className="form-label">
              Select Identity Proof Type <span className="required">*</span>
            </label>
            <select
              name="identityProofType"
              className={`form-select ${errors.identityProofType ? 'error' : ''}`}
              value={formData.identityProofType}
              onChange={handleDropdownChange}
            >
              <option value="">-- Select Proof Type --</option>
              {identityProofOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.identityProofType && <span className="error-message">{errors.identityProofType}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Upload Identity Proof <span className="required">*</span>
            </label>
            
            <div className={`file-upload-container ${formData.identityProofFile ? 'has-file' : ''}`}>
              <label className="file-upload-label">
                <input
                  type="file"
                  className="file-input"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'identityProofFile')}
                />
                {formData.identityProofFile ? (
                  <div className="file-preview">
                    <span className="file-name">
                      ✓ {formData.identityProofFile.name}
                    </span>
                    <button 
                      type="button" 
                      className="file-remove"
                      onClick={() => handleRemoveFile('identityProofFile')}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>📄</div>
                    <div className="file-info">Click to upload document</div>
                    <div className="text-muted">PDF, JPG, PNG (Max 5MB)</div>
                  </>
                )}
              </label>
            </div>
            {errors.identityProofFile && <span className="error-message">{errors.identityProofFile}</span>}
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>Accepted Documents:</strong> Aadhaar Card, PAN Card, Passport, Voter ID, or Driving License
        </div>
      </div>

      {/* Address Proof Section */}
      <div className="form-section">
        <h3 className="section-title">Address Proof</h3>
        
        <div className="form-row two-cols">
          <div className="form-group">
            <label className="form-label">
              Select Address Proof Type <span className="required">*</span>
            </label>
            <select
              name="addressProofType"
              className={`form-select ${errors.addressProofType ? 'error' : ''}`}
              value={formData.addressProofType}
              onChange={handleDropdownChange}
            >
              <option value="">-- Select Proof Type --</option>
              {addressProofOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {errors.addressProofType && <span className="error-message">{errors.addressProofType}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Upload Address Proof <span className="required">*</span>
            </label>
            
            <div className={`file-upload-container ${formData.addressProofFile ? 'has-file' : ''}`}>
              <label className="file-upload-label">
                <input
                  type="file"
                  className="file-input"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'addressProofFile')}
                />
                {formData.addressProofFile ? (
                  <div className="file-preview">
                    <span className="file-name">
                      ✓ {formData.addressProofFile.name}
                    </span>
                    <button 
                      type="button" 
                      className="file-remove"
                      onClick={() => handleRemoveFile('addressProofFile')}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '36px', marginBottom: '8px' }}>📄</div>
                    <div className="file-info">Click to upload document</div>
                    <div className="text-muted">PDF, JPG, PNG (Max 5MB)</div>
                  </>
                )}
              </label>
            </div>
            {errors.addressProofFile && <span className="error-message">{errors.addressProofFile}</span>}
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>Accepted Documents:</strong> Aadhaar Card, Utility Bills (Electricity/Water), Rental Agreement, Passport, or Bank Statement with address
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="button-container">
        <button type="button" className="btn btn-secondary" onClick={onPrevious}>
          ← Previous
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Next Step →
        </button>
      </div>

      {/* Info Box */}
      <div className="info-box">
        <strong>Important:</strong> All uploaded documents should be clear and readable. 
        Maximum file size allowed is 5MB per document. Supported formats: JPG, PNG, PDF.
      </div>
    </div>
  );
};

export default Documents;