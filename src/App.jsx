import { useState, useEffect } from 'react'
import './App.css'
import LoadingPage from './components/LoadingPage'
import Header from './components/Header'
import Cards from './components/Cards'
import LoginPage from './components/LoginPage'
import Profile from './components/Profile'
import axios from 'axios'

function App() {
  const [articles, setArticles] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [page, setPage] = useState(1);
  const [isVisibleLoginPage, setIsVisibleLoginPage] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username") || null);
  const [profilePageIsVisible, setProfilePageIsVisible] = useState(false)

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const fetchArticle = () => {
    return axios
      .get("https://en.wikipedia.org/api/rest_v1/page/random/summary")
      .then(({data}) => {
        return {
          imageUrl: data.originalimage?.source || "",
          title: data.title,
          extract: data.extract.split(' ').length > 25 ? `${data.extract.split(' ').slice(0, 25).join(' ')}...` : data.extract,
          articleUrl: data.content_urls.desktop.page,
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
      {hasLoaded ? <Header profilePageIsVisible={profilePageIsVisible} setProfilePageIsVisible={setProfilePageIsVisible} setIsVisibleLoginPage={setIsVisibleLoginPage} token={token} /> : ''}
      {profilePageIsVisible ? <Profile username={username} token={token} /> : ''}
      {hasLoaded && articles.length > 0 ? <Cards setIsVisibleLoginPage={setIsVisibleLoginPage} attachObserver={attachObserver} articles={articles} token={token}/> : <LoadingPage />}
      {isVisibleLoginPage ? <LoginPage setUsername={setUsername} setToken={setToken} setIsVisibleLoginPage={setIsVisibleLoginPage} /> : ''}
    </>
  )
}

export default App