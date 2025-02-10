import api from "../api";
import bookmarkFilledSvg from '../assets/images/bookmark-filled.svg'
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
      <SavedArticles token={token} savedArticles={savedArticles} setSavedArticles={setSavedArticles} />
    </div>
  )
}

function SavedArticles({ token, savedArticles, setSavedArticles }) {
  const articlesToRender = savedArticles.map((article, index) =>
     <div key={article.title} className="card saved" style={ article.imageUrl ? { backgroundImage: `url(${article.imageUrl})`}  : { backgroundColor: 'black' }}>
        <div className="save-button-container">
          <img src={bookmarkFilledSvg} className="save-button" onClick={() => {
            const deleteSavedArticle = async () => {
              try {
                await api.deleteUserSavedArticle(token, index);
                setSavedArticles(prev => prev.filter((_, i) => i !== index))
              } catch(err) {
                console.error("Failed to delete article:", err)
              }
            }
            deleteSavedArticle()
          }}></img>
        </div>
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