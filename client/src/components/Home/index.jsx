import { useNavigate } from 'react-router-dom'
import './styles.css'

const Home = () => {
  const navigate = useNavigate()

  const handleStartForm = () => {
    navigate('/form')
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Multi-Step Form</h1>
        <p>Complete our form to proceed. It's quick and easy!</p>
        <button className="btn-start" onClick={handleStartForm}>
          Start Form
        </button>
      </div>
    </div>
  )
}

export default Home
