import { useNavigate } from "react-router-dom" 
import "./styles.css"  
const Failure = () => {   
    const navigate = useNavigate()    
    return (     
    <div className="failure-container">       
    <div className="failure-content">         
        <div className="failure-icon">?</div>         
        <h1>Oops!</h1>         
        <p>Something went wrong while processing your subscription. Please try again or contact our support team at support@example.com for assistance.</p>         
        <button className="btn-retry" onClick={() => navigate("/form")}>
                       Try Again         
        </button>         
        <button className="btn-home-failure" onClick={() => navigate("/")}>           
            Back to Home         
        </button>       
        </div>     
        </div>   
    )
        
}  
export default Failure
