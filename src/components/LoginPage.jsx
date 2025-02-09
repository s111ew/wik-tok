import { useState } from "react"

function LoginPage({ setIsVisibleLoginPage }) {
  const [isSignUp, setIsSignUp] = useState(true)
  const handleClose = () => {
    setIsVisibleLoginPage(false)
  }

  const toggleIsLogin = () => {
    isSignUp ? setIsSignUp(false) : setIsSignUp(true)
  }

  return(
    <div className='login-background'>
      <section className='login-container'>
        <div className="login-header">
          {isSignUp ? <h2>Signup</h2> : <h2>Login</h2>}
          <span onClick={handleClose} className="close-button">X</span>
        </div>
        <form>
          <div className='username input-container'>
            <label htmlFor="username">Username*</label>
            <input id="username" type="text" />
          </div>
          <div className='password input-container'>
            <label htmlFor="password">Password*</label>
            <input id="password" type="password" />
          </div>
          {isSignUp ? <div className='confirm-password input-container'>
            <label htmlFor="confirm-password">Confirm Password*</label>
            <input id="confirm-password" type="password" />
          </div> : ''}
          {isSignUp ? <button>Signup</button> : <button>Login</button>}
          {isSignUp ? <p>Don't have an account? <span onClick={toggleIsLogin} className="login-link">Create an account</span></p> : <p>Already have an account? <span onClick={toggleIsLogin} className="login-link">Login</span></p>}
        </form>
      </section>
    </div>
  )
}

export default LoginPage