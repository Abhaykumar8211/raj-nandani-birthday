import React from 'react';

export default function ProgressIndicator({ currentStep, totalSteps = 7 }) {
  if (currentStep > totalSteps) {
    return (
      <div className="progress-badge-wrapper finale-badge-glow" aria-label="Grand Celebration">
        <span className="badge-sparkle">👑</span>
        <span className="badge-text">FINAL CELEBRATION</span>
        <span className="badge-sparkle">👑</span>
      </div>
    );
  }

  return (
    <div className="progress-indicator-container" role="progressbar" aria-valuenow={currentStep} aria-valuemin="1" aria-valuemax={totalSteps} aria-label={`Step ${currentStep} of ${totalSteps}`}>
      <span className="step-counter-label">STEP {currentStep} / {totalSteps}</span>
      <div className="step-dots-row" aria-hidden="true">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNum = i + 1;
          const isCurrent = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <span
              key={stepNum}
              className={`step-dot ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            />
          );
        })}
      </div>
    </div>
  );
}
