import React, { useState, useEffect } from 'react';

const PersonalDetails = ({ data, onNext, onPrevious }) => {
  const [formData, setFormData] = useState({
    firstName: data.firstName || '',
    middleName: data.middleName || '',
    lastName: data.lastName || '',
    phoneNumber: data.phoneNumber || '',
    email: data.email || '',
    currentAddress: data.currentAddress || { street: '', city: '', state: '', pincode: '' },
    permanentAddress: data.permanentAddress || { street: '', city: '', state: '', pincode: '' },
    sameAsCurrentAddress: data.sameAsCurrentAddress || false,
    dateOfBirth: data.dateOfBirth || '',
    age: data.age || '',
    gender: data.gender || '',
    maritalStatus: data.maritalStatus || '',
    aadhaarNumber: data.aadhaarNumber || '',
    panNumber: data.panNumber || '',
    passportNumber: data.passportNumber || '',
    fatherName: data.fatherName || '',
    education: data.education || ''
  });

  const [errors, setErrors] = useState({});

  // Indian States
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Auto-calculate age from DOB
  useEffect(() => {
    if (formData.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(formData.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData(prev => ({ ...prev, age: age }));
    }
  }, [formData.dateOfBirth]);

  // Copy current to permanent address when checkbox is checked
  useEffect(() => {
    if (formData.sameAsCurrentAddress) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: { ...prev.currentAddress }
      }));
    }
  }, [formData.sameAsCurrentAddress, formData.currentAddress]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  // Format Aadhaar number
  const handleAadhaarChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 12) {
      const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
      setFormData({ ...formData, aadhaarNumber: formatted });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Name validations
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required';

    // Contact validations
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter valid 10-digit mobile number';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter valid email address';
    }

    // Address validations
    if (!formData.currentAddress.street) newErrors.currentStreet = 'Street is required';
    if (!formData.currentAddress.city) newErrors.currentCity = 'City is required';
    if (!formData.currentAddress.state) newErrors.currentState = 'State is required';
    if (!formData.currentAddress.pincode) newErrors.currentPincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.currentAddress.pincode)) newErrors.currentPincode = 'Enter valid 6-digit pincode';

    if (!formData.sameAsCurrentAddress) {
      if (!formData.permanentAddress.street) newErrors.permanentStreet = 'Street is required';
      if (!formData.permanentAddress.city) newErrors.permanentCity = 'City is required';
      if (!formData.permanentAddress.state) newErrors.permanentState = 'State is required';
      if (!formData.permanentAddress.pincode) newErrors.permanentPincode = 'Pincode is required';
      else if (!/^\d{6}$/.test(formData.permanentAddress.pincode)) newErrors.permanentPincode = 'Enter valid 6-digit pincode';
    }

    // Personal info validations
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Please select gender';
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Please select marital status';

    // Identity validations
    if (!formData.aadhaarNumber) {
      newErrors.aadhaarNumber = 'Aadhaar number is required';
    } else if (formData.aadhaarNumber.replace(/\s/g, '').length !== 12) {
      newErrors.aadhaarNumber = 'Aadhaar must be 12 digits';
    }

    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN number is required';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Enter valid PAN (e.g., ABCDE1234F)';
    }

    // Education validation
    if (!formData.education) newErrors.education = 'Please select education qualification';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    } else {
      alert('Please fix all errors before proceeding');
    }
  };

  return (
    <div>
      <h2 className="form-title">Personal Details</h2>
      <p className="form-subtitle">Please provide accurate information as per your official documents</p>

      {/* Basic Information */}
      <div className="form-section">
        <h3 className="section-title">Basic Information</h3>
        
        <div className="form-row three-cols">
          <div className="form-group">
            <label className="form-label">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              name="middleName"
              className="form-input"
              placeholder="Enter middle name"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row two-cols">
          <div className="form-group">
            <label className="form-label">
              Phone Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              className={`form-input ${errors.phoneNumber ? 'error' : ''}`}
              placeholder="10-digit mobile number"
              value={formData.phoneNumber}
              onChange={handleChange}
              maxLength="10"
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>
      </div>

      {/* Current Address */}
      <div className="form-section">
        <h3 className="section-title">Current Address</h3>
        
        <div className="form-row one-col">
          <div className="form-group">
            <label className="form-label">
              Street / House No <span className="required">*</span>
            </label>
            <input
              type="text"
              name="currentAddress.street"
              className={`form-input ${errors.currentStreet ? 'error' : ''}`}
              placeholder="House number, street name"
              value={formData.currentAddress.street}
              onChange={handleChange}
            />
            {errors.currentStreet && <span className="error-message">{errors.currentStreet}</span>}
          </div>
        </div>

        <div className="form-row three-cols">
          <div className="form-group">
            <label className="form-label">
              City <span className="required">*</span>
            </label>
            <input
              type="text"
              name="currentAddress.city"
              className={`form-input ${errors.currentCity ? 'error' : ''}`}
              placeholder="City"
              value={formData.currentAddress.city}
              onChange={handleChange}
            />
            {errors.currentCity && <span className="error-message">{errors.currentCity}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              State <span className="required">*</span>
            </label>
            <select
              name="currentAddress.state"
              className={`form-select ${errors.currentState ? 'error' : ''}`}
              value={formData.currentAddress.state}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.currentState && <span className="error-message">{errors.currentState}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Pincode <span className="required">*</span>
            </label>
            <input
              type="text"
              name="currentAddress.pincode"
              className={`form-input ${errors.currentPincode ? 'error' : ''}`}
              placeholder="6-digit pincode"
              value={formData.currentAddress.pincode}
              onChange={handleChange}
              maxLength="6"
            />
            {errors.currentPincode && <span className="error-message">{errors.currentPincode}</span>}
          </div>
        </div>
      </div>

      {/* Permanent Address */}
      <div className="form-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className="section-title" style={{ marginBottom: 0, borderBottom: 'none' }}>Permanent Address</h3>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="sameAsCurrentAddress"
              className="checkbox-input"
              checked={formData.sameAsCurrentAddress}
              onChange={handleChange}
            />
            Same as Current Address
          </label>
        </div>
        <div style={{ borderBottom: '2px solid var(--sc-green)', marginBottom: '24px' }}></div>

        {!formData.sameAsCurrentAddress && (
          <>
            <div className="form-row one-col">
              <div className="form-group">
                <label className="form-label">
                  Street / House No <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="permanentAddress.street"
                  className={`form-input ${errors.permanentStreet ? 'error' : ''}`}
                  placeholder="House number, street name"
                  value={formData.permanentAddress.street}
                  onChange={handleChange}
                />
                {errors.permanentStreet && <span className="error-message">{errors.permanentStreet}</span>}
              </div>
            </div>

            <div className="form-row three-cols">
              <div className="form-group">
                <label className="form-label">
                  City <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="permanentAddress.city"
                  className={`form-input ${errors.permanentCity ? 'error' : ''}`}
                  placeholder="City"
                  value={formData.permanentAddress.city}
                  onChange={handleChange}
                />
                {errors.permanentCity && <span className="error-message">{errors.permanentCity}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  State <span className="required">*</span>
                </label>
                <select
                  name="permanentAddress.state"
                  className={`form-select ${errors.permanentState ? 'error' : ''}`}
                  value={formData.permanentAddress.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.permanentState && <span className="error-message">{errors.permanentState}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  Pincode <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="permanentAddress.pincode"
                  className={`form-input ${errors.permanentPincode ? 'error' : ''}`}
                  placeholder="6-digit pincode"
                  value={formData.permanentAddress.pincode}
                  onChange={handleChange}
                  maxLength="6"
                />
                {errors.permanentPincode && <span className="error-message">{errors.permanentPincode}</span>}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Personal Information */}
      <div className="form-section">
        <h3 className="section-title">Personal Information</h3>
        
        <div className="form-row three-cols">
          <div className="form-group">
            <label className="form-label">
              Date of Birth <span className="required">*</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
              value={formData.dateOfBirth}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="text"
              className="form-input"
              value={formData.age}
              placeholder="Auto-calculated"
              disabled
              style={{ backgroundColor: '#F9F9F9', color: '#999' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Marital Status <span className="required">*</span>
            </label>
            <select
              name="maritalStatus"
              className={`form-select ${errors.maritalStatus ? 'error' : ''}`}
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
            {errors.maritalStatus && <span className="error-message">{errors.maritalStatus}</span>}
          </div>
        </div>

        <div className="form-row one-col">
          <div className="form-group">
            <label className="form-label">
              Gender <span className="required">*</span>
            </label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="radio-input"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="radio-input"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                />
                Female
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  className="radio-input"
                  checked={formData.gender === 'Other'}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>
        </div>
      </div>

      {/* Identity Information */}
      <div className="form-section">
        <h3 className="section-title">Identity Information</h3>
        
        <div className="form-row three-cols">
          <div className="form-group">
            <label className="form-label">
              Aadhaar Number <span className="required">*</span>
            </label>
            <input
              type="text"
              name="aadhaarNumber"
              className={`form-input ${errors.aadhaarNumber ? 'error' : ''}`}
              placeholder="XXXX XXXX XXXX"
              value={formData.aadhaarNumber}
              onChange={handleAadhaarChange}
              maxLength="14"
            />
            {errors.aadhaarNumber && <span className="error-message">{errors.aadhaarNumber}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              PAN Card Number <span className="required">*</span>
            </label>
            <input
              type="text"
              name="panNumber"
              className={`form-input ${errors.panNumber ? 'error' : ''}`}
              placeholder="ABCDE1234F"
              value={formData.panNumber}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, name: e.target.name, value: e.target.value.toUpperCase() }})}
              maxLength="10"
              style={{ textTransform: 'uppercase' }}
            />
            {errors.panNumber && <span className="error-message">{errors.panNumber}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Passport Number (Optional)</label>
            <input
              type="text"
              name="passportNumber"
              className="form-input"
              placeholder="Optional"
              value={formData.passportNumber}
              onChange={(e) => handleChange({ ...e, target: { ...e.target, name: e.target.name, value: e.target.value.toUpperCase() }})}
              style={{ textTransform: 'uppercase' }}
            />
          </div>
        </div>
      </div>

      {/* Family & Education */}
      <div className="form-section">
        <h3 className="section-title">Family & Education Details</h3>
        
        <div className="form-row two-cols">
          <div className="form-group">
            <label className="form-label">
              Father's Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="fatherName"
              className={`form-input ${errors.fatherName ? 'error' : ''}`}
              placeholder="Enter father's full name"
              value={formData.fatherName}
              onChange={handleChange}
            />
            {errors.fatherName && <span className="error-message">{errors.fatherName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              Education Qualification <span className="required">*</span>
            </label>
            <select
              name="education"
              className={`form-select ${errors.education ? 'error' : ''}`}
              value={formData.education}
              onChange={handleChange}
            >
              <option value="">Select Qualification</option>
              <option value="10th Pass">10th Pass</option>
              <option value="12th Pass">12th Pass</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
              <option value="Professional Degree">Professional Degree</option>
            </select>
            {errors.education && <span className="error-message">{errors.education}</span>}
          </div>
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
        <strong>Note:</strong> All fields marked with <span className="required">*</span> are mandatory. 
        Please ensure all information matches your official documents.
      </div>
    </div>
  );
};

export default PersonalDetails;