const Step3 = ({ formData, updateFormData }) => {  
    const addOns = [     
    { id: "online-service", name: "Online service", price: 1 },     
    { id: "larger-storage", name: "Larger storage", price: 2 },     
    { id: "customizable-profile", name: "Customizable Profile", price: 2 },   ]    
    const handleAddOnChange = (addOnId) => {     
        const updatedAddOns = formData.addOns.includes(addOnId)?
        formData.addOns.filter((id) => id !== addOnId)       
        : 
        [...formData.addOns, addOnId]     
        updateFormData({ addOns: updatedAddOns })   
    }    
    return (     
        <div className="step-content">       
            <h2>Pick add-ons</h2>       
            <p>Add-ons help enhance your gaming experience.</p>              
            <div className="addons-list">         
                {addOns.map((addOn) => (           
                    <div             
                        key={addOn.id}             
                        className={`addon-item ${formData.addOns.includes(addOn.id) ? "active" : ""}`}          
                        >            
                        <input               
                        type="checkbox"               
                        id={addOn.id}               
                        checked={formData.addOns.includes(addOn.id)}               
                        onChange={() => handleAddOnChange(addOn.id)}            
                        />             
                        <label htmlFor={addOn.id} >               
                            <div className="addOn-info">  
                                <div>               
                                <h3>{addOn.name}</h3>                
                                <p>Add this option</p>
                                </div>   
                                <div>   
                                <span className="addon-price" style={{ fontWeight: "bold" ,alignSelf:"center"}}>+${addOn.price}/mo</span>      
                                </div>   
                            </div>               
                                        
                        </label>          
                    </div>         
                ))}      
            </div>  
        </div>   
    ) 
}  
export default Step3
