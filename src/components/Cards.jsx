import arrowSvg from '../assets/images/arrow.svg'
import sparkleSvg from '../assets/images/sparkle.svg'
import bookmarkOutlineSvg from '../assets/images/bookmark.svg'
import bookmarkFilledSvg from '../assets/images/bookmark-filled.svg'
import { useEffect, useState } from 'react'

function Cards({ articles, attachObserver, isLoggedIn, setIsVisibleLoginPage }) {
  useEffect(() => {
    attachObserver();
  }, [articles])

  const articlesToRender = articles.map((article, index) =>
    <div key={article.title} className="card" style={ article.imageUrl ? { backgroundImage: `url(${article.imageUrl})`}  : { backgroundColor: 'black' }}>
      <SaveButton setIsVisibleLoginPage={setIsVisibleLoginPage} isLoggedIn={isLoggedIn} />
      <div className='card-text'>
        <h2 className="card-title">{article.title}</h2>
        <p className="card-description">{article.description}</p>
        <div className='card-buttons'>
          <a className="card-link" href={article.link} target="_blank" rel="noopener noreferrer">
            Article<img className='arrow-svg' src={arrowSvg}></img>
          </a>
          <AIbutton title={article.title}/>
        </div>
      </div>
      {index === articles.length - 2 && <div className='observer'></div>}
    </div>
  )
  return(
    <div className='card-stream'>
      {articlesToRender}
    </div>
  )
}

function AIbutton({ title }) {
  return(
    <div className='card-ai-button'>
      <span>AI Further Reading</span>
      <img className='sparkle-svg' src={sparkleSvg}/>
    </div>
  )
}

function SaveButton({ isLoggedIn, setIsVisibleLoginPage }) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    if (!isLoggedIn) {
      setIsVisibleLoginPage(true)
    } else {
      if (!isSaved) {
        setIsSaved(true)
      } else if (isSaved) {
        setIsSaved(false)
      }
    }
  }

  return(
    <div className='save-button-container'>
      <img className='save-button' onClick={handleSave} src={isSaved ? bookmarkFilledSvg : bookmarkOutlineSvg} />
    </div>
  )
}

export default Cards