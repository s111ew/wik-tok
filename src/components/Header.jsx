function Header({ isLoggedIn, setIsVisibleLoginPage }) {
  const handleClick = () => {
    setIsVisibleLoginPage(true)
  }
  return(
    <div className='header'>
      <h1 className='logo'>WikTok</h1>
      {isLoggedIn ? '' : <div onClick={handleClick} className='log-in-button'>Sign Up</div>}
    </div>
  )
}

export default Header