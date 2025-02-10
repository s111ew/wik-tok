import { useState } from "react"
import api from "../api"

function LoginPage({ setIsVisibleLoginPage, setIsLoggedIn }) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [userObject, setUserObject] = useState({
    username: '',
    password: ''
  })
  const handleClose = () => {
    setIsVisibleLoginPage(false)
  }

  const toggleIsSignup = () => {
    isSignUp ? setIsSignUp(false) : setIsSignUp(true)
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    api.registerUser(userObject.username, userObject.password)
      .then((data) => {
        console.log("User registered:", data);
        toggleIsSignup()
      })
      .catch((err) => console.error("Registration failed:", err));
  }
  
  const handleLogin = (event) => {
    event.preventDefault();
    api.loginUser(userObject.username, userObject.password)
      .then((data) => {
        console.log("User logged in:", data);
        setIsVisibleLoginPage(false);
        setIsLoggedIn(true);
      })
      .catch((err) => console.error("Login failed:", err));
  }

  return(
    <div className='login-background'>
      <section className='login-container'>
        <div className="login-header">
          {isSignUp ? <h2>Sign Up</h2> : <h2>Login</h2>}
          <span onClick={handleClose} className="close-button">X</span>
        </div>
        <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
          <div className='username input-container'>
            <label htmlFor="username">Username*</label>
            <input onChange={(e) => {
              setUserObject((prev) => ({
                ...prev,
                username: e.target.value
              }))
              console.log(userObject)
            }} required id="username" type="text" placeholder="e.g. Jane_Smith2"/>
          </div>
          <div className='password input-container'>
            <label htmlFor="password">Password*</label>
            <input onChange={(e) => {
              setUserObject((prev) => ({
                ...prev,
                password: e.target.value
              }))
              console.log(userObject)
            }} required id="password" type="password" placeholder="e.g. Password_123" />
          </div>
          {isSignUp ? <div className='confirm-password input-container'>
            <label htmlFor="confirm-password">Confirm Password*</label>
            <input required id="confirm-password" type="password" placeholder="e.g. Password_123"/>
          </div> : ''}
          <button type="submit">{isSignUp ? "Signup" : "Login"}</button>
          {isSignUp ? <p>Already have an account? <span onClick={toggleIsSignup} className="login-link">Login</span></p> : <p>Don't have an account? <span onClick={toggleIsSignup} className="login-link">Create an account</span></p>}
        </form>
      </section>
    </div>
  )
}

export default LoginPage