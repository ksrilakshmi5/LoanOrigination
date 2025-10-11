import React, { useState } from 'react';
import ProgressBar from '../components/UserDetailsPage/ProgressBar';
import LoanDetails from '../components/UserDetailsPage/LoanDetails';
import PersonalDetails from '../components/UserDetailsPage/PersonalDetails';
import Documents from '../components/UserDetailsPage/Documents';
import EmploymentDetails from '../components/UserDetailsPage/EmploymentDetails';
import ExistingLoans from '../components/UserDetailsPage/ExistingLoans';
import References from '../components/UserDetailsPage/References';
import Review from '../components/UserDetailsPage/Review';


function CustomerUserDetails() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {},
    step6: {}
  });

  const handleNext = (stepData) => {
    setFormData({ ...formData, [`step${currentStep}`]: stepData });
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleEdit = (stepNumber) => {
    setCurrentStep(stepNumber);
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    console.log('Application Submitted:', formData);
    alert('Application submitted successfully! Application ID: LA' + Date.now());
    // In future: Send to backend API
    // In future: Show success page
    // In future: Redirect to dashboard
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="app-header">
        <img
          src={require('../assets/images/Userlogo.png')}
          alt="Standard Chartered"
          className="sc-logo"
          onClick={() => console.log('Logo clicked - Go to home')}
        />
        <button className="back-button" onClick={() => console.log('Back to Dashboard')}>
          Back to Dashboard
        </button>
      </div>

      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={7} />

      {/* Form Steps */}
      <div className="form-container">
        {currentStep === 1 && <LoanDetails data={formData.step1} onNext={handleNext} />}
        {currentStep === 2 && <PersonalDetails data={formData.step2} onNext={handleNext} onPrevious={handlePrevious} />}
        {currentStep === 3 && <Documents data={formData.step3} onNext={handleNext} onPrevious={handlePrevious} />}
        {currentStep === 4 && <EmploymentDetails data={formData.step4} onNext={handleNext} onPrevious={handlePrevious} />}
        {currentStep === 5 && <ExistingLoans data={formData.step5} onNext={handleNext} onPrevious={handlePrevious} />}
        {currentStep === 6 && <References data={formData.step6} onNext={handleNext} onPrevious={handlePrevious} />}
        {currentStep === 7 && <Review data={formData} onPrevious={handlePrevious} onEdit={handleEdit} onSubmit={handleSubmit}/>}
      </div>
    </div>
  );
}

export default CustomerUserDetails;