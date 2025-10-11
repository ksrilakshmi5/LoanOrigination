import React, { useState } from 'react';

const Review = ({ data, onPrevious, onEdit, onSubmit }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToVerification, setAgreedToVerification] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = () => {
    if (!agreedToTerms || !agreedToVerification) {
      alert('Please agree to all declarations before submitting');
      return;
    }
    
    if (window.confirm('Are you sure you want to submit your loan application? You cannot edit it after submission.')) {
      onSubmit();
    }
  };

  return (
    <div>
      <h2 className="form-title">Review & Submit</h2>
      <p className="form-subtitle">
        Please review all your information carefully before submitting
      </p>

      {/* Step 1: Loan Details */}
      <div className="review-section">
        <div className="review-header">
          <h3 className="review-title">Loan Details</h3>
          <button className="edit-button" onClick={() => onEdit(1)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          <div className="review-item">
            <span className="review-label">Loan Type</span>
            <span className="review-value">{data.step1.loanType || 'N/A'}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Loan Amount</span>
            <span className="review-value">
              {data.step1.loanAmount ? formatCurrency(data.step1.loanAmount) : 'N/A'}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Loan Duration</span>
            <span className="review-value">
              {data.step1.loanDuration ? `${data.step1.loanDuration} Years` : 'N/A'}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Purpose</span>
            <span className="review-value">{data.step1.loanPurpose || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Step 2: Personal Details */}
      <div className="review-section">
        <div className="review-header">
          <h3 className="review-title">Personal Details</h3>
          <button className="edit-button" onClick={() => onEdit(2)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          <div className="review-item">
            <span className="review-label">Full Name</span>
            <span className="review-value">
              {`${data.step2.firstName || ''} ${data.step2.middleName || ''} ${data.step2.lastName || ''}`.trim() || 'N/A'}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Phone Number</span>
            <span className="review-value">{data.step2.phoneNumber || 'N/A'}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Email Address</span>
            <span className="review-value">{data.step2.email || 'N/A'}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Date of Birth</span>
            <span className="review-value">
              {data.step2.dateOfBirth ? `${data.step2.dateOfBirth} (Age: ${data.step2.age})` : 'N/A'}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Gender</span>
            <span className="review-value">{data.step2.gender || 'N/A'}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Marital Status</span>
            <span className="review-value">{data.step2.maritalStatus || 'N/A'}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Current Address</span>
            <span className="review-value">
              {data.step2.currentAddress 
                ? `${data.step2.currentAddress.street}, ${data.step2.currentAddress.city}, ${data.step2.currentAddress.state} - ${data.step2.currentAddress.pincode}`
                : 'N/A'
              }
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Aadhaar Number</span>
            <span className="review-value">{data.step2.aadhaarNumber || 'N/A'}</span>
          </div>
          <div className="review-item">
            <span className="review-label">PAN Number</span>
            <span className="review-value">{data.step2.panNumber || 'N/A'}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Father's Name</span>
            <span className="review-value">{data.step2.fatherName || 'N/A'}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Education</span>
            <span className="review-value">{data.step2.education || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Step 3: Documents */}
      <div className="review-section">
        <div className="review-header">
          <h3 className="review-title">Uploaded Documents</h3>
          <button className="edit-button" onClick={() => onEdit(3)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          <div className="review-item">
            <span className="review-label">Photograph</span>
            <span className="review-value">
              {data.step3.photograph ? `✓ ${data.step3.photograph.name}` : '✗ Not uploaded'}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Identity Proof</span>
            <span className="review-value">
              {data.step3.identityProofType || 'N/A'}
              {data.step3.identityProofFile && ` - ✓ ${data.step3.identityProofFile.name}`}
            </span>
          </div>
          <div className="review-item">
            <span className="review-label">Address Proof</span>
            <span className="review-value">
              {data.step3.addressProofType || 'N/A'}
              {data.step3.addressProofFile && ` - ✓ ${data.step3.addressProofFile.name}`}
            </span>
          </div>
        </div>
      </div>

      {/* Step 4: Employment Details */}
      <div className="review-section">
        <div className="review-header">
          <h3 className="review-title">Employment Details</h3>
          <button className="edit-button" onClick={() => onEdit(4)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          <div className="review-item">
            <span className="review-label">Occupation Type</span>
            <span className="review-value">{data.step4.occupationType || 'N/A'}</span>
          </div>
          
          {data.step4.occupationType === 'Salaried' && (
            <>
              <div className="review-item">
                <span className="review-label">Company Name</span>
                <span className="review-value">{data.step4.companyName || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Designation</span>
                <span className="review-value">{data.step4.designation || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Documents Uploaded</span>
                <span className="review-value">
                  Salary Slips: {data.step4.salarySlips?.length || 0} files, 
                  ITR: {data.step4.itrDocuments?.length || 0} files, 
                  Bank Statements: {data.step4.bankStatements?.length || 0} files
                </span>
              </div>
            </>
          )}

          {data.step4.occupationType === 'Self-Employed' && (
            <>
              <div className="review-item">
                <span className="review-label">Business Name</span>
                <span className="review-value">{data.step4.businessName || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Business Type</span>
                <span className="review-value">{data.step4.businessType || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Documents Uploaded</span>
                <span className="review-value">
                  Business Proof: {data.step4.businessProof ? '✓' : '✗'}, 
                  ITR: {data.step4.selfEmployedITR?.length || 0} files, 
                  Bank Statements: {data.step4.selfEmployedBankStatements?.length || 0} files
                </span>
              </div>
            </>
          )}

          <div className="review-item">
            <span className="review-label">Experience</span>
            <span className="review-value">{data.step4.experience || 'N/A'}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Office Address</span>
            <span className="review-value">{data.step4.officeAddress || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Step 5: Existing Loans */}
      <div className="review-section">
        <div className="review-header">
          <h3 className="review-title">Existing Loans</h3>
          <button className="edit-button" onClick={() => onEdit(5)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          {data.step5.loans && data.step5.loans.length > 0 ? (
            <>
              <div className="review-item">
                <span className="review-label">Number of Loans</span>
                <span className="review-value">{data.step5.loans.length}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Total Outstanding</span>
                <span className="review-value">
                  {formatCurrency(
                    data.step5.loans.reduce((sum, loan) => sum + parseFloat(loan.outstandingAmount || 0), 0)
                  )}
                </span>
              </div>
              <div className="review-item">
                <span className="review-label">Total Monthly EMI</span>
                <span className="review-value">
                  {formatCurrency(
                    data.step5.loans.reduce((sum, loan) => sum + parseFloat(loan.emi || 0), 0)
                  )}
                </span>
              </div>
              {data.step5.loans.map((loan, index) => (
                <div key={index} className="review-item" style={{ gridColumn: '1 / -1', borderTop: '1px solid #E5E5E5', paddingTop: '12px', marginTop: '12px' }}>
                  <span className="review-label">Loan {index + 1}</span>
                  <span className="review-value">
                    {loan.loanType} - {loan.lenderName} | Outstanding: {formatCurrency(loan.outstandingAmount)} | EMI: {formatCurrency(loan.emi)}
                  </span>
                </div>
              ))}
            </>
          ) : (
            <div className="review-item">
              <span className="review-label">Existing Loans</span>
              <span className="review-value">No existing loans</span>
            </div>
          )}
        </div>
      </div>

      {/* Step 6: References */}
      <div className="review-section">
        <div className="review-header">
          <h3 className="review-title">References</h3>
          <button className="edit-button" onClick={() => onEdit(6)}>
            Edit
          </button>
        </div>
        <div className="review-content">
          {data.step6.references && data.step6.references.length > 0 ? (
            data.step6.references.map((ref, index) => (
              <div key={index} className="review-item" style={{ gridColumn: '1 / -1', borderTop: index > 0 ? '1px solid #E5E5E5' : 'none', paddingTop: index > 0 ? '12px' : '0', marginTop: index > 0 ? '12px' : '0' }}>
                <span className="review-label">Reference {index + 1}</span>
                <span className="review-value">
                  {ref.name} ({ref.relationship}) - {ref.contactNumber}
                </span>
              </div>
            ))
          ) : (
            <div className="review-item">
              <span className="review-label">References</span>
              <span className="review-value">No references added</span>
            </div>
          )}
        </div>
      </div>

      {/* Declaration Section */}
      <div className="form-section">
        <h3 className="section-title">Declaration</h3>
        
        <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5', borderRadius: '8px', padding: '20px' }}>
          <div className="checkbox-group" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <input
                type="checkbox"
                className="checkbox-input"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                style={{ marginTop: '4px' }}
              />
              <span style={{ fontSize: '15px', lineHeight: '1.6' }}>
                I hereby declare that all the information provided by me in this application is true, complete, and accurate to the best of my knowledge. I understand that any false or misleading information may result in rejection of my loan application or cancellation of the loan.
              </span>
            </label>

            <label className="checkbox-label" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <input
                type="checkbox"
                className="checkbox-input"
                checked={agreedToVerification}
                onChange={(e) => setAgreedToVerification(e.target.checked)}
                style={{ marginTop: '4px' }}
              />
              <span style={{ fontSize: '15px', lineHeight: '1.6' }}>
                I authorize Standard Chartered Bank to verify my information, contact my references, check my credit history, and obtain any necessary documents or reports for processing my loan application. I also agree to the Terms & Conditions of the loan.
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="button-container">
        <button type="button" className="btn btn-secondary" onClick={onPrevious}>
          ← Previous
        </button>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={handleSubmit}
          disabled={!agreedToTerms || !agreedToVerification}
          style={(!agreedToTerms || !agreedToVerification) ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        >
          Submit Application
        </button>
      </div>

      {/* Info Box */}
      <div className="info-box">
        <strong>Important:</strong> Please review all information carefully. After submission, you will not be able to edit your application. You will receive an application ID and confirmation email once submitted.
      </div>
    </div>
  );
};

export default Review;