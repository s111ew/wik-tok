import { useState, useEffect } from 'react'
import './App.css'
import arrowSvg from './assets/arrow.svg'
import sparkleSvg from './assets/sparkle.svg'

function App() {
  const [articles, setArticles] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      const requests = Array.from({length: 5}, fetchArticle);
      const returnedArticles = await Promise.all(requests);
      setArticles(returnedArticles);
      setHasLoaded(true)
    };
    fetchArticles();
  }, []);

  const fetchArticle = () => {
    return fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
      .then((response) => response.json())
      .then((data) => {
        return {
          imageUrl: data.originalimage.source || "",
          title: data.title,
          description: data.extract.split(' ').length > 25 ? `${data.extract.split(' ').slice(0, 25).join(' ')}...` : data.extract,
          link: data.content_urls.desktop.page,
        };
      })
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {hasLoaded && articles.length > 0 ? <Cards isLoggedIn={isLoggedIn} articles={articles}/> : <p>Loading...</p>}
    </>
  )
}

function Cards({ articles }) {
  const articlesToRender = articles.map(article =>
    <div key={article.title} className="card" style={{backgroundImage: `url(${article.imageUrl})`}}>
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

function Header({ isLoggedIn }) {
  return(
    <div className='header'>
      <h1>WikTok</h1>
      {isLoggedIn ? '' : <div>Log In</div>}
    </div>
  )
}

export default App
