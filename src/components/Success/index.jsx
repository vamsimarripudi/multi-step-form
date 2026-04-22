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
        <button className="btn-home" onClick={() => navigate("/")}>           
            Back to Home         
            </button>       
            </div>     
            </div>  
     ) 
} 
 export default Success
