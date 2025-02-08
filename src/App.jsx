import { useState, useEffect } from 'react'
import './App.css'
import arrowSvg from './assets/images/arrow.svg'
import sparkleSvg from './assets/images/sparkle.svg'
import wikiLogoGif from './assets/images/wiki_logo_spin.gif'
import bookmarkOutlineSvg from './assets/images/bookmark.svg'
import bookmarkFilledSvg from './assets/images/bookmark-filled.svg'

function App() {
  const [articles, setArticles] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState(1);
  const [isVisibleLoginPage, setIsVisibleLoginPage] = useState(false)

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const fetchArticle = () => {
    return fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        return {
          imageUrl: data.originalimage?.source || "",
          title: data.title,
          description: data.extract.split(' ').length > 25 ? `${data.extract.split(' ').slice(0, 25).join(' ')}...` : data.extract,
          link: data.content_urls.desktop.page,
        };
      })
      .catch((err) => console.error("Error fetching article:", err))
  }

  const fetchArticles = async () => {
    const requests = Array.from({length: 5}, fetchArticle);
    const returnedArticles = await Promise.all(requests);
    setArticles((prev) => [...prev ,...returnedArticles]);
    setHasLoaded(true);
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
      {hasLoaded ? <Header setIsVisibleLoginPage={setIsVisibleLoginPage} isLoggedIn={isLoggedIn} /> : ''}
      {hasLoaded && articles.length > 0 ? <Cards attachObserver={attachObserver} articles={articles} isLoggedIn={isLoggedIn}/> : <LoadingPage />}
      {isVisibleLoginPage ? <LoginPage setIsVisibleLoginPage={setIsVisibleLoginPage} /> : ''}
    </>
  )
}

function Cards({ articles, attachObserver, isLoggedIn }) {
  useEffect(() => {
    attachObserver();
  }, [articles])

  const articlesToRender = articles.map((article, index) =>
    <div key={article.title} className="card" style={ article.imageUrl ? { backgroundImage: `url(${article.imageUrl})`}  : { backgroundColor: 'black' }}>
      <SaveButton isLoggedIn={isLoggedIn} />
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

function Header({ isLoggedIn, setIsVisibleLoginPage }) {
  const handleClick = () => {
    setIsVisibleLoginPage(true)
  }
  return(
    <div className='header'>
      <h1 className='logo'>WikTok</h1>
      {isLoggedIn ? '' : <div onClick={handleClick} className='log-in-button'>Log In</div>}
    </div>
  )
}

function LoadingPage() {
  return (
    <section className='loading-page'>
      <h2 className='logo'>WikTok</h2>
      <img src={wikiLogoGif} alt="Wikipedia Logo" />
      <p className='loading-text'>Loading Articles...</p>
    </section>
  )
}

function SaveButton({ isLoggedIn }) {
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    if (!isSaved) {
      setIsSaved(true)
    } else if (isSaved) {
      setIsSaved(false)
    }
  }

  return(
    <div className='save-button-container'>
      <img className='save-button' onClick={handleSave} src={isSaved ? bookmarkFilledSvg : bookmarkOutlineSvg} />
    </div>
  )
}

function LoginPage({ setIsVisibleLoginPage }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const handleClick = () => {
    setIsVisibleLoginPage(false)
  }

  return(
    <div onClick={handleClick} className='login-background'>
      <section className='login-container'>
        {isSignUp ? <h2>Signup</h2> : <h2>Login</h2>}
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
        </form>
      </section>
    </div>
  )
}

export default App