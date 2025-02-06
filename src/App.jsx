import { useState, useEffect } from 'react'
import './App.css'
import arrowSvg from './assets/arrow.svg'
import sparkleSvg from './assets/sparkle.svg'

function App() {
  const [articles, setArticles] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchArticles();
    setHasLoaded(true);
  }, [page]);

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

  const fetchArticles = async () => {
    const requests = Array.from({length: 5}, fetchArticle);
    const returnedArticles = await Promise.all(requests);
    setArticles((prev) => [...prev ,...returnedArticles]);
  };

  const attachObserver = () => {
    const observerElement = document.querySelector(".observer");
    if (!observerElement) return;

    const incrementPage = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPage(prevPage => (prevPage + 1))
          console.log("More articles loading...")
          observer.unobserve(observerElement)
        }
      })
    }
  
    const observer = new IntersectionObserver(incrementPage, {
      root: null,
      threshold: 1.0,
    });
  
    observer.observe(observerElement);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      {hasLoaded && articles.length > 0 ? <Cards attachObserver={attachObserver} articles={articles}/> : <p>Loading...</p>}
    </>
  )
}

function Cards({ articles, attachObserver }) {
  useEffect(() => {
    attachObserver();
  }, [articles])

  const articlesToRender = articles.map((article, index) =>
    <div key={article.title} className="card" style={ article.imageUrl ? { backgroundImage: `url(${article.imageUrl})`}  : { backgroundColor: 'black' }}>
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

function Header({ isLoggedIn }) {
  return(
    <div className='header'>
      <h1 className='logo'>WikTok</h1>
      {isLoggedIn ? '' : <div className='log-in-button'>Log In</div>}
    </div>
  )
}

export default App
