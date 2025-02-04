import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [article, setArticle] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
      .then((response) => response.json())
      .then((data) => {
        setArticle({
          imageUrl: data.originalimage.source || "",
          title: data.title,
          description: data.extract,
          link: data.content_urls.desktop.page,
        });
        setHasLoaded(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      {hasLoaded && article ? <Card article={article}/> : <p>Loading...</p>}
    </>
  )
}

function Card({ article }) {
  return(
    <div className="card">
      {article.imageUrl && <img className='card-image' src={article.imageUrl} alt={article.title} />}
      <h2 className="card-title">{article.title}</h2>
      <p className="card-description">{article.description}</p>
      <a className="card-link" href={article.link} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  )
}

export default App
