import { useState } from "react" 
import { useNavigate,Link } from "react-router-dom" 
import "./styles.css" 
import Step1 from "./Step1" 
import Step2 from "./Step2" 
import Step3 from "./Step3" 
import Step4 from "./Step4"
import Step5 from "./Step5"  
import ProgressBar from "../ProgressBar";

const Forms = () => {   
    const [currentStep, setCurrentStep] = useState(1)  
    const [isComplete, setComplete]  = useState(false)
    const [canProceed,setProceed] = useState(false);
    const [formData, setFormData] = useState({     
        name: "",     
        email: "",     
        phone: "",     
        plan: "arcade",     
        addOns: [],
        gender:"",
        
    })   
    const navigate = useNavigate()    
    
    const handleNext = () => {     
        if(!canProceed) return ;
        setComplete((prev) => ({
            ...prev,
            [currentStep]: true
        }));

        if (currentStep < 4) {       
            setCurrentStep(currentStep + 1)
                 
        } else {       
            navigate("/success", {state:{formData}});
         }   
    }    
    const handleBack = () => {    
        if (currentStep > 1) {       
        
        setCurrentStep(currentStep - 1)     
    }   }    
    const updateFormData = (data) => {     
        setFormData({ ...formData, ...data }) 
        
    }   
    localStorage.setItem("formData", JSON.stringify(formData))
        const steps = [    
            { number: 1, title: "Your Information", subtitle: "Your info" ,completed:false},     
            { number: 2, title: "Select Plan", subtitle: "Select plan" ,completed:false},     
            { number: 3, title: "Add-ons", subtitle: "Pick add-ons" ,completed:false},     
            { number: 4, title: "Summary", subtitle: "Review" ,completed:false},   
               
        ]    

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
        {/*-----------------Mobile Version-------------------*/}
        <div className="mobile-stepper">
            {[1,2,3,4,5].map((step) => {
                const isDisabled = step !== 1 && !isComplete[step - 1];

                return (
                <div
                    key={step}
                    className={`mobile-step 
                    ${currentStep === step ? "active" : ""}
                    ${isComplete[step] ? "completed" : ""}
                    ${isDisabled ? "disabled" : ""}
                    `}
                >
                    {isComplete[step] ? "✓" : step}
                </div>
                );
            })}
        </div>

        {/*/------------------End--------------------/*/}
        <div className="form-content">    
            <ProgressBar currentStep={currentStep} totalSteps={steps.length} />     
            {currentStep === 1 && (           
                <Step1 formData={formData} updateFormData={updateFormData} onValidate={setProceed}/>         
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
            

            <button className="btn-next" onClick={handleNext} disabled={!canProceed}>            
                    {currentStep === 4 ? "Confirm" : "Next Step"}           
            </button>         
            </div>     
        </div>    
    </div>   
      ) 
} 


export default Forms

