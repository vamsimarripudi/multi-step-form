import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./styles.css";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import ProgressBar from "../ProgressBar";

const uniqueId = Math.random().toString(36).substr(2, 9);

const Forms = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setComplete] = useState({});
  const [canProceed, setProceed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "arcade",
    addOns: [],
    gender: "",
    uniqueId: uniqueId,
  });

  const navigate = useNavigate();

  const handleNext = async () => {
    if (!canProceed || isSubmitting) return;

    setComplete((prev) => ({
      ...prev,
      [currentStep]: true,
    }));

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // ✅ API CALL ONLY ON FINAL STEP
      try {
        setIsSubmitting(true);

        const response = await fetch(
          "https://multi-step-form-7245.onrender.com/formdata",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Error:", data);
          setIsSubmitting(false);
          return;
        }

        console.log("Data sent successfully:", data);

        navigate("/success", { state: { formData } });
      } catch (error) {
        console.error("Error sending data:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // ❌ REMOVED wrong API call here (this was causing 400 errors)
  // useEffect(() => { fetch(...) }, []);

  // ✅ FIX localStorage (was running on every render)
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const steps = [
    { number: 1, title: "Your Information", subtitle: "Your info" },
    { number: 2, title: "Select Plan", subtitle: "Select plan" },
    { number: 3, title: "Add-ons", subtitle: "Pick add-ons" },
    { number: 4, title: "Summary", subtitle: "Review" },
  ];

  return (
    <div className="form-container">
      <div className="form-sidebar">
        {steps.map((step) => {
          const isDisabled =
            step.number !== 1 && !isComplete[step.number - 1];

          return (
            <div
              key={step.number}
              className={`step 
                ${currentStep === step.number ? "active" : ""} 
                ${isComplete[step.number] ? "completed" : ""} 
                ${isDisabled ? "disabled" : ""}
              `}
              onClick={() => {
                if (!isDisabled) {
                  setCurrentStep(step.number);
                }
              }}
            >
              <div className="step-number">
                {isComplete[step.number] ? "✓" : step.number}
              </div>

              <div className="step-text">
                <div className="step-label">STEP {step.number}</div>
                <div className="step-title">{step.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="form-content">
        <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

        {currentStep === 1 && (
          <Step1
            formData={formData}
            updateFormData={updateFormData}
            onValidate={setProceed}
          />
        )}

        {currentStep === 2 && (
          <Step2 formData={formData} updateFormData={updateFormData} />
        )}

        {currentStep === 3 && (
          <Step3 formData={formData} updateFormData={updateFormData} />
        )}

        {currentStep === 4 && (
          <Step4 formData={formData} updateFormData={updateFormData} />
        )}

        <div className="form-buttons">
          {currentStep > 1 && (
            <button className="btn-back" onClick={handleBack}>
              Go Back
            </button>
          )}

          <button
            className="btn-next"
            onClick={handleNext}
            disabled={!canProceed || isSubmitting}
          >
            {currentStep === 4
              ? isSubmitting
                ? "Submitting..."
                : "Confirm"
              : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forms;