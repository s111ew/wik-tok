import arrowSvg from '../assets/images/arrow.svg'
import bookmarkOutlineSvg from '../assets/images/bookmark.svg'
import bookmarkFilledSvg from '../assets/images/bookmark-filled.svg'
import { useEffect, useState } from 'react'
import api from '../api'

function Cards({ articles, attachObserver, setIsVisibleLoginPage, token }) {
  useEffect(() => {
    attachObserver();
  }, [articles])

  const articlesToRender = articles.map((article, index) =>
    <div key={article.title} className="card" style={ article.imageUrl !== undefined ? { backgroundImage: `url(${article.imageUrl})`}  : { backgroundColor: 'black' }}>
      <SaveButton setIsVisibleLoginPage={setIsVisibleLoginPage} token={token} article={article} />
      <div className='card-text'>
        <h2 className="card-title">{article.title}</h2>
        <p className="card-description">{article.extract}</p>
        <div className='card-buttons'>
          <a className="card-link" href={article.articleUrl} target="_blank" rel="noopener noreferrer">
            Read Full Article<img className='arrow-svg' src={arrowSvg}></img>
          </a>
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

function SaveButton({ token, setIsVisibleLoginPage, article }) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = async () => {
    if (!token) {
      setIsVisibleLoginPage(true)
    } else {
      if (!isSaved) {
        api.saveArticle(
          token,
          article.title,
          article.extract,
          article.imageUrl,
          article.articleUrl
        )
        .catch((err) => console.error("Failed to save article:", err))
        setIsSaved(true)
      } else if (isSaved) {
        api.getUserSavedArticles(token)
          .then((savedArticles) => {
            return api.deleteUserSavedArticle(token, savedArticles.length - 1)
          })
          .then(setIsSaved(false))
          .catch((err) => console.error("Failed to delete saved article:", err))
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