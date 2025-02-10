import { useState, useEffect } from 'react'
import './App.css'
import LoadingPage from './components/LoadingPage'
import Header from './components/Header'
import Cards from './components/Cards'
import LoginPage from './components/LoginPage'

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
    console.log(returnedArticles)
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
      {hasLoaded && articles.length > 0 ? <Cards setIsVisibleLoginPage={setIsVisibleLoginPage} attachObserver={attachObserver} articles={articles} isLoggedIn={isLoggedIn}/> : <LoadingPage />}
      {isVisibleLoginPage ? <LoginPage setIsVisibleLoginPage={setIsVisibleLoginPage} /> : ''}
    </>
  )
}

export default App