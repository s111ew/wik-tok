import api from "../api";
import { useEffect, useState } from "react";

function Profile({ username, token }) {
  const [savedArticles, setSavedArticles] = useState([])

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const articles = await api.getUserSavedArticles(token);
        setSavedArticles(articles);
      } catch (error) {
        console.error("Failed to fetch saved articles:", error);
      }
    };

    fetchSavedArticles();
  }, [token]);

  return(
    <div className="profile-page">
      <div className="profile-header">
        <h1>Hi, {username}.</h1>
        <p>Your Saved Articles:</p>
        </div>
      <SavedArticles token={token} savedArticles={savedArticles} />
    </div>
  )
}

function SavedArticles({ savedArticles }) {
  const articlesToRender = savedArticles.map(article =>
     <div key={article.title} className="card" style={ article.imageUrl ? { backgroundImage: `url(${article.imageUrl})`}  : { backgroundColor: 'black' }}>
        <div className='card-text saved'>
            <h2 className="card-title saved">{article.title}</h2>
            <p className="card-description saved">{article.extract}</p>
          </div>
        </div>
  )

  return(
    <div className="saved-articles">
      {savedArticles.length < 1 ? <div className="empty-saved-articles"><p>No Articles Saved</p></div> : articlesToRender }
    </div>
  )
}

export default Profile