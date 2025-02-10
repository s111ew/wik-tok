function Header({ token, setIsVisibleLoginPage }) {
  const handleClick = () => {
    if (!token) {
      setIsVisibleLoginPage(true)
      return
    }
  }
  return(
    <div className='header'>
      <h1 className='logo'>WikTok</h1>
      {token ? <div onClick={handleClick} className='profile button'>Profile</div> : <div onClick={handleClick} className='log-in button'>Sign Up</div>}
    </div>
  )
}

export default Header