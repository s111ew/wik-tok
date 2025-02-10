import { useState } from "react"
import api from "../api"

function LoginPage({ setIsVisibleLoginPage, setToken, setUsername }) {
  const [isSignUp, setIsSignUp] = useState(true)
  const [error, setError] = useState(null)
  const [userObject, setUserObject] = useState({
    username: '',
    password: '',
    passwordConf: ''
  })
  const handleClose = () => {
    setIsVisibleLoginPage(false)
  }

  const toggleIsSignup = () => {
    isSignUp ? setIsSignUp(false) : setIsSignUp(true);
    setError(null)
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    if (!userObject.password || !userObject.passwordConf || (userObject.password !== userObject.passwordConf)) {
      setError("Password and Confirmation must match.");
      return
    }
    if (userObject.username && userObject.password && userObject.passwordConf && (userObject.password === userObject.passwordConf)) {
      api.registerUser(userObject.username, userObject.password)
        .then((data) => {
          console.log("User registered:", data);
          toggleIsSignup()
          setError("Account Created! Please login.")
        })
        .catch((err) => {
          console.error("Registration failed:", err);
          if (err.response.data.msg = "User already exists") {
            setError("Username taken, please try another.")
          } else {
            setError("Error registering, please try again.")
          }
        });
    }
  }
  
  const handleLogin = (event) => {
    event.preventDefault();
    api.loginUser(userObject.username, userObject.password)
    .then((data) => {
      console.log("User logged in:", data);
      setIsVisibleLoginPage(false);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      setUsername(data.user.username);
      localStorage.setItem("username", data.user.username)
    })
    .catch((err) => {
      console.error("Login failed:", err);
      if (err.response.data.msg = "Invalid credentials") {
        setError("Username or Password incorrect, please try again.")
      } else {
        setError("Error logging in, please try again.")
      }
    });
  }

  return(
    <div className='login-background'>
      <section className='login-container'>
        <div className="login-header">
          {isSignUp ? <h2>Sign Up</h2> : <h2>Login</h2>}
          <span onClick={handleClose} className="close-button">X</span>
        </div>
        {error ? <span>{error}</span> : ''}
        <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
          <div className='username input-container'>
            <label htmlFor="username">Username*</label>
            <input onChange={(e) => {
              setUserObject((prev) => ({
                ...prev,
                username: e.target.value
              }))
            }} required id="username" type="text" placeholder="e.g. Jane_Smith2"/>
          </div>
          <div className='password input-container'>
            <label htmlFor="password">Password*</label>
            <input onChange={(e) => {
              setUserObject((prev) => ({
                ...prev,
                password: e.target.value
              }))
            }} required id="password" type="password" placeholder="e.g. Password_123" />
          </div>
          {isSignUp ? <div className='confirm-password input-container'>
            <label htmlFor="confirm-password">Confirm Password*</label>
            <input onChange={(e) => {
              setUserObject((prev) => ({
                ...prev,
                passwordConf: e.target.value
              }))
            }} required id="confirm-password" type="password" placeholder="e.g. Password_123"/>
          </div> : ''}
          <button type="submit">{isSignUp ? "Signup" : "Login"}</button>
          {isSignUp ? <p>Already have an account? <span onClick={toggleIsSignup} className="login-link">Login</span></p> : <p>Don't have an account? <span onClick={toggleIsSignup} className="login-link">Create an account</span></p>}
        </form>
      </section>
    </div>
  )
}

export default LoginPage