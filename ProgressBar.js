import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  // Calculate progress percentage
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  // Step labels
  const steps = [
    { number: 1, label: 'Loan Details' },
    { number: 2, label: 'Personal Details' },
    { number: 3, label: 'Documents' },
    { number: 4, label: 'Employment' },
    { number: 5, label: 'Existing Loans' },
    { number: 6, label: 'References' },
    { number: 7, label: 'Review & Submit' }
  ];

  return (
    <div className="progress-container">
      {/* Progress Header */}
      <div className="progress-header">
        <span className="progress-text">Step {currentStep} of {totalSteps}</span>
        <span className="progress-percentage">{progressPercentage}% Complete</span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-track">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Step Indicators */}
      <div className="stepper-container">
        {steps.map((step) => (
          <div key={step.number} className="step-item">
            <div 
              className={`step-circle ${
                currentStep === step.number 
                  ? 'active' 
                  : currentStep > step.number 
                  ? 'completed' 
                  : ''
              }`}
            >
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span 
              className={`step-label ${
                currentStep === step.number 
                  ? 'active' 
                  : currentStep > step.number 
                  ? 'completed' 
                  : ''
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;