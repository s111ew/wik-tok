import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const registerUser = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("Error registering user:", err);
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("Error logging in user:", err);
  }
};

export const saveArticle = async (
  token,
  title,
  extract,
  imageUrl,
  articleUrl
) => {
  try {
    const res = await axios.post(
      `${API_URL}/articles/save`,
      {
        title,
        extract,
        imageUrl,
        articleUrl,
      },
      { headers: { Authorization: token } }
    );
    return res.data;
  } catch (err) {
    console.error("Error saving article:", err);
  }
};

export const getUserSavedArticles = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/articles/saved`, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching saved articles:", err);
  }
};

export const deleteUserSavedArticle = async (token, articleIndex) => {
  try {
    const res = await axios.delete(
      `${API_URL}/articles/delete/${articleIndex}`,
      {
        headers: { Authorization: token },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error deleting article:", err);
  }
};
