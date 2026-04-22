import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 
import Home from "./components/Home" 
import Forms from "./components/Forms" 
import Success from "./components/Success" 
import Failure from "./components/Failure"  

const App = () => {   
  return (     
  <Router>       
    <Routes>         
      <Route path="/" element={<Home />} />         
      <Route path="/form" element={<Forms />} />         
      <Route path="/success" element={<Success />} />         
      <Route path="/failure" element={<Failure />} />       
      </Routes>     </Router>   
  ) 
}  

export default App
