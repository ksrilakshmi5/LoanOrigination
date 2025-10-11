import React, { useState } from 'react';

const ExistingLoans = ({ data, onNext, onPrevious }) => {
  const [loans, setLoans] = useState(data.loans || []);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentLoan, setCurrentLoan] = useState({
    loanType: '',
    lenderName: '',
    outstandingAmount: '',
    emi: '',
    tenureRemaining: ''
  });
  const [errors, setErrors] = useState({});

  const loanTypes = [
    'Home Loan',
    'Vehicle Loan',
    'Personal Loan',
    'Education Loan',
    'Credit Card',
    'Business Loan',
    'Gold Loan',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentLoan({ ...currentLoan, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateLoan = () => {
    const newErrors = {};

    if (!currentLoan.loanType) newErrors.loanType = 'Please select loan type';
    if (!currentLoan.lenderName.trim()) newErrors.lenderName = 'Lender name is required';
    if (!currentLoan.outstandingAmount) {
      newErrors.outstandingAmount = 'Outstanding amount is required';
    } else if (parseFloat(currentLoan.outstandingAmount) <= 0) {
      newErrors.outstandingAmount = 'Amount must be greater than 0';
    }
    if (!currentLoan.emi) {
      newErrors.emi = 'Monthly EMI is required';
    } else if (parseFloat(currentLoan.emi) <= 0) {
      newErrors.emi = 'EMI must be greater than 0';
    }
    if (!currentLoan.tenureRemaining) {
      newErrors.tenureRemaining = 'Tenure remaining is required';
    } else if (parseInt(currentLoan.tenureRemaining) <= 0) {
      newErrors.tenureRemaining = 'Tenure must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddLoan = () => {
    if (validateLoan()) {
      if (editingIndex !== null) {
        // Update existing loan
        const updatedLoans = [...loans];
        updatedLoans[editingIndex] = { ...currentLoan };
        setLoans(updatedLoans);
        setEditingIndex(null);
      } else {
        // Add new loan
        setLoans([...loans, { ...currentLoan }]);
      }
      
      // Reset form
      setCurrentLoan({
        loanType: '',
        lenderName: '',
        outstandingAmount: '',
        emi: '',
        tenureRemaining: ''
      });
      setShowForm(false);
      setErrors({});
    }
  };

  const handleEditLoan = (index) => {
    setCurrentLoan({ ...loans[index] });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteLoan = (index) => {
    if (window.confirm('Are you sure you want to remove this loan?')) {
      setLoans(loans.filter((_, i) => i !== index));
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingIndex(null);
    setCurrentLoan({
      loanType: '',
      lenderName: '',
      outstandingAmount: '',
      emi: '',
      tenureRemaining: ''
    });
    setErrors({});
  };

  const handleSubmit = () => {
    // Can proceed even if no loans (user might not have existing loans)
    onNext({ loans });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      <h2 className="form-title">Existing Loan Details</h2>
      <p className="form-subtitle">
        Please provide information about your current loan obligations (if any)
      </p>

      {/* Existing Loans List */}
      <div className="form-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 className="section-title" style={{ marginBottom: 0, borderBottom: 'none' }}>
            Current Loans ({loans.length})
          </h3>
          {!showForm && (
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
              style={{ padding: '8px 20px', fontSize: '14px' }}
            >
              + Add Loan
            </button>
          )}
        </div>
        <div style={{ borderBottom: '2px solid var(--sc-green)', marginBottom: '24px' }}></div>

        {loans.length === 0 && !showForm && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: '#F9F9F9', 
            borderRadius: '8px',
            color: 'var(--sc-text-medium)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>No existing loans added</p>
            <p style={{ fontSize: '14px' }}>
              If you have any ongoing loans, click "Add Loan" to provide details
            </p>
          </div>
        )}

        {/* Display Existing Loans */}
        {loans.map((loan, index) => (
          <div key={index} className="card" style={{ marginBottom: '16px' }}>
            <div className="card-header">
              <div>
                <div className="card-title">{loan.loanType}</div>
                <div style={{ fontSize: '14px', color: 'var(--sc-text-medium)' }}>
                  {loan.lenderName}
                </div>
              </div>
              <div className="card-actions">
                <button 
                  type="button" 
                  className="card-button"
                  onClick={() => handleEditLoan(index)}
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  className="card-button delete"
                  onClick={() => handleDeleteLoan(index)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', padding: '12px 0' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--sc-text-medium)', marginBottom: '4px' }}>
                  Outstanding Amount
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--sc-text-dark)' }}>
                  {formatCurrency(loan.outstandingAmount)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--sc-text-medium)', marginBottom: '4px' }}>
                  Monthly EMI
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--sc-text-dark)' }}>
                  {formatCurrency(loan.emi)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--sc-text-medium)', marginBottom: '4px' }}>
                  Tenure Remaining
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--sc-text-dark)' }}>
                  {loan.tenureRemaining} months
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Loan Form */}
      {showForm && (
        <div className="form-section">
          <div style={{ 
            backgroundColor: '#F9FAFB', 
            border: '2px solid var(--sc-green)', 
            borderRadius: '8px', 
            padding: '24px' 
          }}>
            <h3 className="section-title">
              {editingIndex !== null ? 'Edit Loan Details' : 'Add Loan Details'}
            </h3>

            <div className="form-row two-cols">
              <div className="form-group">
                <label className="form-label">
                  Loan Type <span className="required">*</span>
                </label>
                <select
                  name="loanType"
                  className={`form-select ${errors.loanType ? 'error' : ''}`}
                  value={currentLoan.loanType}
                  onChange={handleChange}
                >
                  <option value="">Select Loan Type</option>
                  {loanTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.loanType && <span className="error-message">{errors.loanType}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Lender / Bank Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="lenderName"
                  className={`form-input ${errors.lenderName ? 'error' : ''}`}
                  placeholder="e.g., HDFC Bank, SBI, ICICI"
                  value={currentLoan.lenderName}
                  onChange={handleChange}
                />
                {errors.lenderName && <span className="error-message">{errors.lenderName}</span>}
              </div>
            </div>

            <div className="form-row three-cols">
              <div className="form-group">
                <label className="form-label">
                  Outstanding Amount (₹) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="outstandingAmount"
                  className={`form-input ${errors.outstandingAmount ? 'error' : ''}`}
                  placeholder="Enter amount"
                  value={currentLoan.outstandingAmount}
                  onChange={handleChange}
                  min="0"
                />
                {errors.outstandingAmount && <span className="error-message">{errors.outstandingAmount}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Monthly EMI (₹) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="emi"
                  className={`form-input ${errors.emi ? 'error' : ''}`}
                  placeholder="Enter EMI"
                  value={currentLoan.emi}
                  onChange={handleChange}
                  min="0"
                />
                {errors.emi && <span className="error-message">{errors.emi}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Tenure Remaining (Months) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="tenureRemaining"
                  className={`form-input ${errors.tenureRemaining ? 'error' : ''}`}
                  placeholder="In months"
                  value={currentLoan.tenureRemaining}
                  onChange={handleChange}
                  min="1"
                />
                {errors.tenureRemaining && <span className="error-message">{errors.tenureRemaining}</span>}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleAddLoan}
              >
                {editingIndex !== null ? 'Update Loan' : 'Add Loan'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Section */}
      {loans.length > 0 && (
        <div className="form-section">
          <div style={{ 
            backgroundColor: '#E8F5F0', 
            border: '1px solid var(--sc-green)', 
            borderRadius: '8px', 
            padding: '20px' 
          }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--sc-text-dark)' }}>
              Loan Summary
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--sc-text-medium)', marginBottom: '6px' }}>
                  Total Outstanding
                </div>
                <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--sc-green)' }}>
                  {formatCurrency(loans.reduce((sum, loan) => sum + parseFloat(loan.outstandingAmount || 0), 0))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--sc-text-medium)', marginBottom: '6px' }}>
                  Total Monthly EMI
                </div>
                <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--sc-green)' }}>
                  {formatCurrency(loans.reduce((sum, loan) => sum + parseFloat(loan.emi || 0), 0))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--sc-text-medium)', marginBottom: '6px' }}>
                  Number of Loans
                </div>
                <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--sc-green)' }}>
                  {loans.length}
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <strong>Note:</strong> If you don't have any existing loans, you can skip this step by clicking "Next Step". 
        This information helps us assess your repayment capacity accurately.
      </div>
    </div>
  );
};

export default ExistingLoans;