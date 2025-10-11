import React, { useState } from 'react';

const EmploymentDetails = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    occupationType: data.occupationType || 'Salaried',
    companyName: data.companyName || '',
    businessName: data.businessName || '',
    designation: data.designation || '',
    businessType: data.businessType || '',
    experience: data.experience || '',
    officeAddress: data.officeAddress || '',
    // Salaried documents
    salarySlips: data.salarySlips || [],
    itrDocuments: data.itrDocuments || [],
    bankStatements: data.bankStatements || [],
    employeeProof: data.employeeProof || null,
    // Self-employed documents
    businessProof: data.businessProof || null,
    selfEmployedITR: data.selfEmployedITR || [],
    selfEmployedBankStatements: data.selfEmployedBankStatements || []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleOccupationTypeChange = (type) => {
    setFormData({ ...formData, occupationType: type });
    setErrors({});
  };

  const handleFileChange = (e, fieldName) => {
    const files = e.target.files;
    
    if (files.length > 0) {
      // Validate file size for each file
      for (let file of files) {
        if (file.size > 5 * 1024 * 1024) {
          setErrors({ ...errors, [fieldName]: 'Each file must be less than 5MB' });
          return;
        }
      }

      // For single file upload
      if (fieldName === 'employeeProof' || fieldName === 'businessProof') {
        setFormData({ ...formData, [fieldName]: files[0] });
      } else {
        // For multiple file uploads
        setFormData({ ...formData, [fieldName]: Array.from(files) });
      }
      
      setErrors({ ...errors, [fieldName]: '' });
    }
  };

  const handleRemoveFile = (fieldName, index = null) => {
    if (index !== null) {
      // Remove specific file from array
      const updatedFiles = formData[fieldName].filter((_, i) => i !== index);
      setFormData({ ...formData, [fieldName]: updatedFiles });
    } else {
      // Remove single file
      setFormData({ ...formData, [fieldName]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.occupationType === 'Salaried') {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
      if (!formData.experience) newErrors.experience = 'Work experience is required';
      if (!formData.officeAddress.trim()) newErrors.officeAddress = 'Office address is required';
      
      // Document validations
      if (formData.salarySlips.length === 0) newErrors.salarySlips = 'Please upload salary slips (3-6 months)';
      if (formData.itrDocuments.length === 0) newErrors.itrDocuments = 'Please upload ITR documents (2-3 years)';
      if (formData.bankStatements.length === 0) newErrors.bankStatements = 'Please upload bank statements (6 months)';
      if (!formData.employeeProof) newErrors.employeeProof = 'Please upload employee proof';
    } else {
      if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
      if (!formData.businessType.trim()) newErrors.businessType = 'Business type is required';
      if (!formData.experience) newErrors.experience = 'Business experience is required';
      if (!formData.officeAddress.trim()) newErrors.officeAddress = 'Business address is required';
      
      // Document validations
      if (!formData.businessProof) newErrors.businessProof = 'Please upload business proof';
      if (formData.selfEmployedITR.length === 0) newErrors.selfEmployedITR = 'Please upload ITR documents (2-3 years)';
      if (formData.selfEmployedBankStatements.length === 0) newErrors.selfEmployedBankStatements = 'Please upload bank statements (6-12 months)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    } else {
      alert('Please fill all required fields and upload necessary documents');
    }
  };

  return (
    <div>
      <h2 className="form-title">Employment / Occupation Details</h2>
      <p className="form-subtitle">Please provide your employment or business information</p>

      {/* Occupation Type Selection */}
      <div className="form-section">
        <h3 className="section-title">Occupation Type</h3>
        
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="occupationType"
              value="Salaried"
              className="radio-input"
              checked={formData.occupationType === 'Salaried'}
              onChange={() => handleOccupationTypeChange('Salaried')}
            />
            Salaried Employee
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="occupationType"
              value="Self-Employed"
              className="radio-input"
              checked={formData.occupationType === 'Self-Employed'}
              onChange={() => handleOccupationTypeChange('Self-Employed')}
            />
            Self-Employed / Business Owner
          </label>
        </div>
      </div>

      {/* SALARIED EMPLOYEE FORM */}
      {formData.occupationType === 'Salaried' && (
        <>
          {/* Employment Details */}
          <div className="form-section">
            <h3 className="section-title">Employment Details</h3>
            
            <div className="form-row two-cols">
              <div className="form-group">
                <label className="form-label">
                  Company / Employer Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  className={`form-input ${errors.companyName ? 'error' : ''}`}
                  placeholder="Enter company name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Designation / Job Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  className={`form-input ${errors.designation ? 'error' : ''}`}
                  placeholder="e.g., Software Engineer"
                  value={formData.designation}
                  onChange={handleChange}
                />
                {errors.designation && <span className="error-message">{errors.designation}</span>}
              </div>
            </div>

            <div className="form-row two-cols">
              <div className="form-group">
                <label className="form-label">
                  Total Work Experience <span className="required">*</span>
                </label>
                <select
                  name="experience"
                  className={`form-select ${errors.experience ? 'error' : ''}`}
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option value="">Select Experience</option>
                  <option value="0-1">0-1 Year</option>
                  <option value="1-3">1-3 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="5-10">5-10 Years</option>
                  <option value="10+">10+ Years</option>
                </select>
                {errors.experience && <span className="error-message">{errors.experience}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Office Address <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="officeAddress"
                  className={`form-input ${errors.officeAddress ? 'error' : ''}`}
                  placeholder="Complete office address"
                  value={formData.officeAddress}
                  onChange={handleChange}
                />
                {errors.officeAddress && <span className="error-message">{errors.officeAddress}</span>}
              </div>
            </div>
          </div>

          {/* Salaried Documents */}
          <div className="form-section">
            <h3 className="section-title">Required Documents - Salaried</h3>

            {/* Salary Slips */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">
                Salary Slips (Last 3-6 Months) <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.salarySlips.length > 0 ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => handleFileChange(e, 'salarySlips')}
                  />
                  {formData.salarySlips.length > 0 ? (
                    <div>
                      {formData.salarySlips.map((file, index) => (
                        <div key={index} className="file-preview" style={{ marginBottom: '8px' }}>
                          <span className="file-name">✓ {file.name}</span>
                          <button 
                            type="button" 
                            className="file-remove"
                            onClick={() => handleRemoveFile('salarySlips', index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload salary slips</div>
                      <div className="text-muted">You can select multiple files</div>
                    </>
                  )}
                </label>
              </div>
              {errors.salarySlips && <span className="error-message">{errors.salarySlips}</span>}
            </div>

            {/* ITR Documents */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">
                Income Tax Returns (Last 2-3 Years) <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.itrDocuments.length > 0 ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => handleFileChange(e, 'itrDocuments')}
                  />
                  {formData.itrDocuments.length > 0 ? (
                    <div>
                      {formData.itrDocuments.map((file, index) => (
                        <div key={index} className="file-preview" style={{ marginBottom: '8px' }}>
                          <span className="file-name">✓ {file.name}</span>
                          <button 
                            type="button" 
                            className="file-remove"
                            onClick={() => handleRemoveFile('itrDocuments', index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload ITR documents</div>
                      <div className="text-muted">You can select multiple files</div>
                    </>
                  )}
                </label>
              </div>
              {errors.itrDocuments && <span className="error-message">{errors.itrDocuments}</span>}
            </div>

            {/* Bank Statements */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">
                Bank Statements (Last 6 Months - Salary Credits) <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.bankStatements.length > 0 ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => handleFileChange(e, 'bankStatements')}
                  />
                  {formData.bankStatements.length > 0 ? (
                    <div>
                      {formData.bankStatements.map((file, index) => (
                        <div key={index} className="file-preview" style={{ marginBottom: '8px' }}>
                          <span className="file-name">✓ {file.name}</span>
                          <button 
                            type="button" 
                            className="file-remove"
                            onClick={() => handleRemoveFile('bankStatements', index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload bank statements</div>
                      <div className="text-muted">You can select multiple files</div>
                    </>
                  )}
                </label>
              </div>
              {errors.bankStatements && <span className="error-message">{errors.bankStatements}</span>}
            </div>

            {/* Employee Proof */}
            <div className="form-group">
              <label className="form-label">
                Employee Proof (Offer Letter / Employee ID / HR Letter) <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.employeeProof ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'employeeProof')}
                  />
                  {formData.employeeProof ? (
                    <div className="file-preview">
                      <span className="file-name">✓ {formData.employeeProof.name}</span>
                      <button 
                        type="button" 
                        className="file-remove"
                        onClick={() => handleRemoveFile('employeeProof')}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload employee proof</div>
                      <div className="text-muted">Offer letter, ID card, or HR letter</div>
                    </>
                  )}
                </label>
              </div>
              {errors.employeeProof && <span className="error-message">{errors.employeeProof}</span>}
            </div>
          </div>
        </>
      )}

      {/* SELF-EMPLOYED FORM */}
      {formData.occupationType === 'Self-Employed' && (
        <>
          {/* Business Details */}
          <div className="form-section">
            <h3 className="section-title">Business Details</h3>
            
            <div className="form-row two-cols">
              <div className="form-group">
                <label className="form-label">
                  Business Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  className={`form-input ${errors.businessName ? 'error' : ''}`}
                  placeholder="Enter business name"
                  value={formData.businessName}
                  onChange={handleChange}
                />
                {errors.businessName && <span className="error-message">{errors.businessName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Nature of Business <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="businessType"
                  className={`form-input ${errors.businessType ? 'error' : ''}`}
                  placeholder="e.g., Trading, Manufacturing, Services"
                  value={formData.businessType}
                  onChange={handleChange}
                />
                {errors.businessType && <span className="error-message">{errors.businessType}</span>}
              </div>
            </div>

            <div className="form-row two-cols">
              <div className="form-group">
                <label className="form-label">
                  Total Business Experience <span className="required">*</span>
                </label>
                <select
                  name="experience"
                  className={`form-select ${errors.experience ? 'error' : ''}`}
                  value={formData.experience}
                  onChange={handleChange}
                >
                  <option value="">Select Experience</option>
                  <option value="0-1">0-1 Year</option>
                  <option value="1-3">1-3 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="5-10">5-10 Years</option>
                  <option value="10+">10+ Years</option>
                </select>
                {errors.experience && <span className="error-message">{errors.experience}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Business Address <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="officeAddress"
                  className={`form-input ${errors.officeAddress ? 'error' : ''}`}
                  placeholder="Complete business address"
                  value={formData.officeAddress}
                  onChange={handleChange}
                />
                {errors.officeAddress && <span className="error-message">{errors.officeAddress}</span>}
              </div>
            </div>
          </div>

          {/* Self-Employed Documents */}
          <div className="form-section">
            <h3 className="section-title">Required Documents - Self-Employed</h3>

            {/* Business Proof */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">
                Business Proof (GST Certificate / License / Registration) <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.businessProof ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'businessProof')}
                  />
                  {formData.businessProof ? (
                    <div className="file-preview">
                      <span className="file-name">✓ {formData.businessProof.name}</span>
                      <button 
                        type="button" 
                        className="file-remove"
                        onClick={() => handleRemoveFile('businessProof')}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload business proof</div>
                      <div className="text-muted">GST certificate, business license, or registration</div>
                    </>
                  )}
                </label>
              </div>
              {errors.businessProof && <span className="error-message">{errors.businessProof}</span>}
            </div>

            {/* ITR Documents */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">
                Income Tax Returns (Last 2-3 Years) <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.selfEmployedITR.length > 0 ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => handleFileChange(e, 'selfEmployedITR')}
                  />
                  {formData.selfEmployedITR.length > 0 ? (
                    <div>
                      {formData.selfEmployedITR.map((file, index) => (
                        <div key={index} className="file-preview" style={{ marginBottom: '8px' }}>
                          <span className="file-name">✓ {file.name}</span>
                          <button 
                            type="button" 
                            className="file-remove"
                            onClick={() => handleRemoveFile('selfEmployedITR', index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload ITR documents</div>
                      <div className="text-muted">You can select multiple files</div>
                    </>
                  )}
                </label>
              </div>
              {errors.selfEmployedITR && <span className="error-message">{errors.selfEmployedITR}</span>}
            </div>

            {/* Bank Statements */}
            <div className="form-group">
              <label className="form-label">
                Business Bank Statements (Last 6-12 Months) <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.selfEmployedBankStatements.length > 0 ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => handleFileChange(e, 'selfEmployedBankStatements')}
                  />
                  {formData.selfEmployedBankStatements.length > 0 ? (
                    <div>
                      {formData.selfEmployedBankStatements.map((file, index) => (
                        <div key={index} className="file-preview" style={{ marginBottom: '8px' }}>
                          <span className="file-name">✓ {file.name}</span>
                          <button 
                            type="button" 
                            className="file-remove"
                            onClick={() => handleRemoveFile('selfEmployedBankStatements', index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload bank statements</div>
                      <div className="text-muted">You can select multiple files</div>
                    </>
                  )}
                </label>
              </div>
              {errors.selfEmployedBankStatements && <span className="error-message">{errors.selfEmployedBankStatements}</span>}
            </div>
          </div>
        </>
      )}

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
        <strong>Note:</strong> All documents should be clear and readable. 
        You can upload multiple files where indicated. Maximum file size: 5MB per file.
      </div>
    </div>
  );
};

export default EmploymentDetails;