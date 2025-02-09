import wikiLogoGif from '../assets/images/wiki_logo_spin.gif'

function LoadingPage() {
  return (
    <section className='loading-page'>
      <h2 className='logo'>WikTok</h2>
      <img src={wikiLogoGif} alt="Wikipedia Logo" />
    </section>
  )
}

export default LoadingPage