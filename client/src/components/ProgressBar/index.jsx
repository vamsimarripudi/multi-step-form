import "./index.css";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="progress-wrapper">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="progress-text">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  );
};

export default ProgressBar;