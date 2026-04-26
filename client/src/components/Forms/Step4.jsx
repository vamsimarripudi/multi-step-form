import "./styles.css";
const Step4 = ({ formData }) => {   
    const planPrices = {     
        arcade: 9,     
        advanced: 12,     
        pro: 15,  
     }    
     const addOnPrices = {     
        "online-service": 1,    
        "larger-storage": 2,     
        "customizable-profile": 2,   
    }    
    const planPrice = planPrices[formData.plan] || 9   
    const addOnsTotal = formData.addOns.reduce((sum, id) => sum + (addOnPrices[id] || 0), 0)   
    const total = planPrice + addOnsTotal    
    return (     
    <div className="step-content">       
    <h2>Finishing up</h2>       
    <p>Double-check everything looks OK before confirming.</p>              
    <div className="summary-box">         
        <div className="summary-item">           
            <div>             
                <h3>{formData.plan}</h3>             
            </div>
            <div className="sub-summary-item">
                <p className="name">{formData.name}</p>
                <p className="price">${planPrice}/mo</p> 
            </div>
                      
        </div>          
        {formData.addOns.length > 0 && (           
            <>             
            <div className="divider"></div>             
            {formData.addOns.map((addOnId) => (               
                <div key={addOnId} className="sub-summary-item addon">                 
                <p className="name">{addOnId}</p>                 
                <p className="price">+${addOnPrices[addOnId]}/mo</p>               
                </div>             
                ))}          
         </>         
        )}       
        </div>        
        <div className="divider"></div>
        <div className="sub-summary-item">        
             <p style={{color:"black",fontWeight:"bold"}}>Total (per month):</p>         
             <p className="total-price" style={{color:"black",fontWeight:"bold"}}>${total}/mo</p>       
        </div>     
    </div>   
) 
}  

export default Step4
