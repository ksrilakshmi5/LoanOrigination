import React, { useState } from 'react';

const LoanDetails = ({ data, onNext }) => {
  const [formData, setFormData] = useState({
    loanType: data.loanType || 'Personal Loan',
    loanAmount: data.loanAmount || '',
    loanDuration: data.loanDuration || '',
    loanPurpose: data.loanPurpose || '',
    homeDocuments: data.homeDocuments || { saleAgreement: null, ecDocument: null },
    vehicleDocuments: data.vehicleDocuments || { invoice: null, quotation: null }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e, category, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [category]: { ...formData[category], [field]: file }
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.loanAmount) newErrors.loanAmount = 'Loan amount is required';
    else if (parseFloat(formData.loanAmount) < 50000) newErrors.loanAmount = 'Minimum amount is ₹50,000';
    
    if (!formData.loanDuration) newErrors.loanDuration = 'Loan duration is required';
    
    if (!formData.loanPurpose || formData.loanPurpose.length < 20) {
      newErrors.loanPurpose = 'Please provide at least 20 characters';
    }

    if (formData.loanType === 'Home Loan') {
      if (!formData.homeDocuments.saleAgreement) newErrors.saleAgreement = 'Sale agreement is required';
      if (!formData.homeDocuments.ecDocument) newErrors.ecDocument = 'EC document is required';
    }

    if (formData.loanType === 'Vehicle Loan') {
      if (!formData.vehicleDocuments.invoice) newErrors.invoice = 'Dealer invoice is required';
      if (!formData.vehicleDocuments.quotation) newErrors.quotation = 'Quotation is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <div>
      <h2 className="form-title">Loan Details</h2>
      <p className="form-subtitle">Please provide your loan requirements</p>

      {/* Selected Loan Type Display */}
      <div className="form-section">
        <h3 className="section-title">Selected Loan Type</h3>
        <div className="loan-type-card selected">
          <div className="loan-type-icon">
            {formData.loanType === 'Personal Loan' && '👤'}
            {formData.loanType === 'Home Loan' && '🏠'}
            {formData.loanType === 'Vehicle Loan' && '🚗'}
          </div>
          <div className="loan-type-name">{formData.loanType}</div>
        </div>
      </div>

      {/* Loan Requirements */}
      <div className="form-section">
        <h3 className="section-title">Loan Requirements</h3>
        
        <div className="form-row two-cols">
          <div className="form-group">
            <label className="form-label">
              Loan Amount <span className="required">*</span>
            </label>
            <input
              type="number"
              name="loanAmount"
              className={`form-input ${errors.loanAmount ? 'error' : ''}`}
              placeholder="Enter amount (₹)"
              value={formData.loanAmount}
              onChange={handleChange}
              min="50000"
            />
            {errors.loanAmount && <span className="error-message">{errors.loanAmount}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Loan Duration <span className="required">*</span>
            </label>
            <select
              name="loanDuration"
              className={`form-select ${errors.loanDuration ? 'error' : ''}`}
              value={formData.loanDuration}
              onChange={handleChange}
            >
              <option value="">Select Duration</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="5">5 Years</option>
              <option value="7">7 Years</option>
              <option value="10">10 Years</option>
              <option value="15">15 Years</option>
              <option value="20">20 Years</option>
            </select>
            {errors.loanDuration && <span className="error-message">{errors.loanDuration}</span>}
          </div>
        </div>

        <div className="form-row one-col">
          <div className="form-group">
            <label className="form-label">
              Purpose of Loan <span className="required">*</span>
            </label>
            <textarea
              name="loanPurpose"
              className={`form-textarea ${errors.loanPurpose ? 'error' : ''}`}
              placeholder="Describe the purpose of your loan (minimum 20 characters)"
              value={formData.loanPurpose}
              onChange={handleChange}
              rows="4"
            />
            <span className="text-muted">
              {formData.loanPurpose.length} / 500 characters
            </span>
            {errors.loanPurpose && <span className="error-message">{errors.loanPurpose}</span>}
          </div>
        </div>
      </div>

      {/* Conditional Documents - Home Loan */}
      {formData.loanType === 'Home Loan' && (
        <div className="form-section">
          <h3 className="section-title">Required Documents for Home Loan</h3>
          
          <div className="form-row two-cols">
            <div className="form-group">
              <label className="form-label">
                Sale Agreement <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.homeDocuments.saleAgreement ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'homeDocuments', 'saleAgreement')}
                  />
                  {formData.homeDocuments.saleAgreement ? (
                    <div className="file-preview">
                      <span className="file-name">
                        ✓ {formData.homeDocuments.saleAgreement.name}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload sale agreement</div>
                      <div className="text-muted">PDF, JPG, PNG (Max 5MB)</div>
                    </>
                  )}
                </label>
              </div>
              {errors.saleAgreement && <span className="error-message">{errors.saleAgreement}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                EC Document <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.homeDocuments.ecDocument ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'homeDocuments', 'ecDocument')}
                  />
                  {formData.homeDocuments.ecDocument ? (
                    <div className="file-preview">
                      <span className="file-name">
                        ✓ {formData.homeDocuments.ecDocument.name}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload EC document</div>
                      <div className="text-muted">PDF, JPG, PNG (Max 5MB)</div>
                    </>
                  )}
                </label>
              </div>
              {errors.ecDocument && <span className="error-message">{errors.ecDocument}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Conditional Documents - Vehicle Loan */}
      {formData.loanType === 'Vehicle Loan' && (
        <div className="form-section">
          <h3 className="section-title">Required Documents for Vehicle Loan</h3>
          
          <div className="form-row two-cols">
            <div className="form-group">
              <label className="form-label">
                Dealer Invoice <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.vehicleDocuments.invoice ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'vehicleDocuments', 'invoice')}
                  />
                  {formData.vehicleDocuments.invoice ? (
                    <div className="file-preview">
                      <span className="file-name">
                        ✓ {formData.vehicleDocuments.invoice.name}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload dealer invoice</div>
                      <div className="text-muted">PDF, JPG, PNG (Max 5MB)</div>
                    </>
                  )}
                </label>
              </div>
              {errors.invoice && <span className="error-message">{errors.invoice}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Quotation <span className="required">*</span>
              </label>
              <div className={`file-upload-container ${formData.vehicleDocuments.quotation ? 'has-file' : ''}`}>
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-input"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'vehicleDocuments', 'quotation')}
                  />
                  {formData.vehicleDocuments.quotation ? (
                    <div className="file-preview">
                      <span className="file-name">
                        ✓ {formData.vehicleDocuments.quotation.name}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div>📄</div>
                      <div className="file-info">Click to upload quotation</div>
                      <div className="text-muted">PDF, JPG, PNG (Max 5MB)</div>
                    </>
                  )}
                </label>
              </div>
              {errors.quotation && <span className="error-message">{errors.quotation}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="button-container">
        <button type="button" className="btn btn-secondary" disabled>
          ← Previous
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
          Next Step →
        </button>
      </div>

      {/* Info Box */}
      <div className="info-box">
        <strong>Note:</strong> All fields marked with <span className="required">*</span> are mandatory. 
        Ensure loan amount is minimum ₹50,000.
      </div>
    </div>
  );
};

export default LoanDetails;