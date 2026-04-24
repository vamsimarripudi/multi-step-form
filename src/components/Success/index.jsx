import { useNavigate ,useLocation} from "react-router-dom" 
import "./styles.css"  
const Success = () => {   
    const navigate = useNavigate()   
    const location = useLocation()
    const name = location.state?.formData?.name || "User";


    return (     
    <div className="success-container">       
    <div className="success-content">         
        <div className="success-icon">?</div>         
        <h1>Thank you {name}</h1>         
        <p>Thanks for confirming your subscription. We hope you enjoy our service. If you ever need support, please feel free to email us at support@example.com.</p>   
        <p>Please note that your subscription will renew automatically unless you cancel it before the renewal date.</p>   
        <p>Please copy the UniqueID: <span style={{ fontWeight: "bold" ,fontSize: "1.2rem" ,color:"black"}}>{location.state?.formData?.uniqueId}</span></p>   
        <button className="btn-home" onClick={() => navigate("/")}>           
            Back to Home         
            </button>       
            </div>     
            </div>  
     ) 
} 
 export default Success
