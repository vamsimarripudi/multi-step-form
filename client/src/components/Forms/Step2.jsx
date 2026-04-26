const Step2 = ({ formData, updateFormData }) => {  
    const plans = [     
        { id: "arcade", name: "Arcade", price: 9 },     
        { id: "advanced", name: "Advanced", price: 12 },     
        { id: "pro", name: "Pro", price: 15 },   
    ]    
        const handlePlanChange = (planId) => {     
        updateFormData({ plan: planId })   
        }    

        

        return (     
        <div className="step-content">       
            <h2>Select your plan</h2>       
            <p>You have the option of monthly or yearly billing.</p>              
            <div className="plans-grid">         
                {plans.map((plan) => (           
                    <div            
                    key={plan.id}             
                    className={`plan-card ${formData.plan === plan.id ? "active" : ""}`}            
                    onClick={() => handlePlanChange(plan.id)}   > 
                                 
                            <h3>{plan.name}</h3>             
                            <p>${plan.price}/mo</p>           
                    </div>         
                ))}       
            </div>        
            <div className="billing-toggle">         
                <label>           
                    <input type="checkbox" />           
                    Yearly (Save 25%)         
                </label>       
            </div>    
        </div>   
                    ) 
}  
export default Step2
