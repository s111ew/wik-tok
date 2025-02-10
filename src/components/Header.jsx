function Header({ token, setIsVisibleLoginPage, setProfilePageIsVisible, profilePageIsVisible }) {
  const handleClick = () => {
    if (!token) {
      setIsVisibleLoginPage(true)
      return
    }
    if (profilePageIsVisible) {
      setProfilePageIsVisible(false)
      return
    }
    if (!profilePageIsVisible) {
      setProfilePageIsVisible(true)
      return
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.reload()
  }
  
  return(
    <div className='header'>
      {token ? <div onClick={handleLogout} className="logout button">Logout</div> : ''}
      <h1 className='logo'>WikTok</h1>
      {token ? <div onClick={handleClick} className='profile button'>{profilePageIsVisible ? 'Home' : 'Profile'}</div> : <div onClick={handleClick} className='log-in button'>Sign Up</div>}
    </div>
  )
}

export default Header