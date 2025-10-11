import React, { useState } from 'react';

const References = ({ data, onNext, onPrevious }) => {
  const [references, setReferences] = useState(data.references || []);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentReference, setCurrentReference] = useState({
    name: '',
    relationship: '',
    contactNumber: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const relationshipOptions = [
    'Father',
    'Mother',
    'Spouse',
    'Brother',
    'Sister',
    'Son',
    'Daughter',
    'Friend',
    'Colleague',
    'Business Partner',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentReference({ ...currentReference, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateReference = () => {
    const newErrors = {};

    if (!currentReference.name.trim()) newErrors.name = 'Name is required';
    if (!currentReference.relationship) newErrors.relationship = 'Please select relationship';
    
    if (!currentReference.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[6-9]\d{9}$/.test(currentReference.contactNumber)) {
      newErrors.contactNumber = 'Enter valid 10-digit mobile number';
    } else {
      // Check for duplicate phone numbers
      const isDuplicate = references.some((ref, index) => 
        ref.contactNumber === currentReference.contactNumber && index !== editingIndex
      );
      if (isDuplicate) {
        newErrors.contactNumber = 'This contact number is already used for another reference';
      }
    }

    if (!currentReference.address.trim()) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddReference = () => {
    if (validateReference()) {
      if (editingIndex !== null) {
        // Update existing reference
        const updatedReferences = [...references];
        updatedReferences[editingIndex] = { ...currentReference };
        setReferences(updatedReferences);
        setEditingIndex(null);
      } else {
        // Add new reference
        setReferences([...references, { ...currentReference }]);
      }
      
      // Reset form
      setCurrentReference({
        name: '',
        relationship: '',
        contactNumber: '',
        address: ''
      });
      setShowForm(false);
      setErrors({});
    }
  };

  const handleEditReference = (index) => {
    setCurrentReference({ ...references[index] });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteReference = (index) => {
    if (window.confirm('Are you sure you want to remove this reference?')) {
      setReferences(references.filter((_, i) => i !== index));
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingIndex(null);
    setCurrentReference({
      name: '',
      relationship: '',
      contactNumber: '',
      address: ''
    });
    setErrors({});
  };

  const handleSubmit = () => {
    if (references.length < 2) {
      alert('Please add at least 2 references before proceeding');
      return;
    }
    onNext({ references });
  };

  return (
    <div>
      <h2 className="form-title">References</h2>
      <p className="form-subtitle">
        Please provide at least 2 references who can vouch for you
      </p>

      {/* References List */}
      <div className="form-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 className="section-title" style={{ marginBottom: 0, borderBottom: 'none' }}>
            Your References ({references.length} / Minimum 2 Required)
          </h3>
          {!showForm && (
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
              style={{ padding: '8px 20px', fontSize: '14px' }}
            >
              + Add Reference
            </button>
          )}
        </div>
        <div style={{ borderBottom: '2px solid var(--sc-green)', marginBottom: '24px' }}></div>

        {references.length === 0 && !showForm && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: '#F9F9F9', 
            borderRadius: '8px',
            color: 'var(--sc-text-medium)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
            <p style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '500' }}>
              No references added yet
            </p>
            <p style={{ fontSize: '14px' }}>
              Please add at least 2 references to continue
            </p>
          </div>
        )}

        {/* Display References */}
        {references.map((reference, index) => (
          <div key={index} className="card" style={{ marginBottom: '16px' }}>
            <div className="card-header">
              <div>
                <div className="card-title">{reference.name}</div>
                <div style={{ fontSize: '14px', color: 'var(--sc-text-medium)' }}>
                  {reference.relationship}
                </div>
              </div>
              <div className="card-actions">
                <button 
                  type="button" 
                  className="card-button"
                  onClick={() => handleEditReference(index)}
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  className="card-button delete"
                  onClick={() => handleDeleteReference(index)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', padding: '12px 0' }}>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--sc-text-medium)', marginBottom: '4px' }}>
                  Contact Number
                </div>
                <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--sc-text-dark)' }}>
                  {reference.contactNumber}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--sc-text-medium)', marginBottom: '4px' }}>
                  Address
                </div>
                <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--sc-text-dark)' }}>
                  {reference.address.length > 50 
                    ? reference.address.substring(0, 50) + '...' 
                    : reference.address
                  }
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Status Message */}
        {references.length > 0 && references.length < 2 && !showForm && (
          <div style={{ 
            backgroundColor: '#FFF4E5', 
            border: '1px solid #F59E0B', 
            borderRadius: '8px', 
            padding: '16px',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ fontSize: '24px' }}>⚠️</div>
            <div>
              <div style={{ fontWeight: '600', color: 'var(--sc-text-dark)', marginBottom: '4px' }}>
                Add {2 - references.length} more reference{2 - references.length > 1 ? 's' : ''}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--sc-text-medium)' }}>
                You need at least 2 references to proceed with your loan application
              </div>
            </div>
          </div>
        )}

        {references.length >= 2 && !showForm && (
          <div style={{ 
            backgroundColor: '#E8F5F0', 
            border: '1px solid var(--sc-green)', 
            borderRadius: '8px', 
            padding: '16px',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ fontSize: '24px' }}>✓</div>
            <div>
              <div style={{ fontWeight: '600', color: 'var(--sc-green)', marginBottom: '4px' }}>
                All required references added!
              </div>
              <div style={{ fontSize: '14px', color: 'var(--sc-text-medium)' }}>
                You can add more references or proceed to the next step
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Reference Form */}
      {showForm && (
        <div className="form-section">
          <div style={{ 
            backgroundColor: '#F9FAFB', 
            border: '2px solid var(--sc-green)', 
            borderRadius: '8px', 
            padding: '24px' 
          }}>
            <h3 className="section-title">
              {editingIndex !== null ? 'Edit Reference' : 'Add Reference'}
            </h3>

            <div className="form-row two-cols">
              <div className="form-group">
                <label className="form-label">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter full name"
                  value={currentReference.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Relationship <span className="required">*</span>
                </label>
                <select
                  name="relationship"
                  className={`form-select ${errors.relationship ? 'error' : ''}`}
                  value={currentReference.relationship}
                  onChange={handleChange}
                >
                  <option value="">Select Relationship</option>
                  {relationshipOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.relationship && <span className="error-message">{errors.relationship}</span>}
              </div>
            </div>

            <div className="form-row one-col">
              <div className="form-group">
                <label className="form-label">
                  Contact Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  className={`form-input ${errors.contactNumber ? 'error' : ''}`}
                  placeholder="10-digit mobile number"
                  value={currentReference.contactNumber}
                  onChange={handleChange}
                  maxLength="10"
                />
                {errors.contactNumber && <span className="error-message">{errors.contactNumber}</span>}
              </div>
            </div>

            <div className="form-row one-col">
              <div className="form-group">
                <label className="form-label">
                  Address <span className="required">*</span>
                </label>
                <textarea
                  name="address"
                  className={`form-textarea ${errors.address ? 'error' : ''}`}
                  placeholder="Enter complete address"
                  value={currentReference.address}
                  onChange={handleChange}
                  rows="3"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handleAddReference}
              >
                {editingIndex !== null ? 'Update Reference' : 'Add Reference'}
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

      {/* Navigation Buttons */}
      <div className="button-container">
        <button type="button" className="btn btn-secondary" onClick={onPrevious}>
          ← Previous
        </button>
        <button 
          type="button" 
          className="btn btn-primary" 
          onClick={handleSubmit}
          disabled={references.length < 2}
          style={references.length < 2 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
        >
          Next Step →
        </button>
      </div>

      {/* Info Box */}
      <div className="info-box">
        <strong>Important:</strong> References should be people who have known you for at least 2 years. 
        At least one reference should be a family member. Do not use duplicate contact numbers.
      </div>
    </div>
  );
};

export default References;