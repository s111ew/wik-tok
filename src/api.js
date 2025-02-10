import axios from "axios";

const API_URL = "http://localhost:3000/api";

const api = {
  registerUser: async (username, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        username,
        password,
      });
      return res.data;
    } catch (err) {
      console.error("Error registering user:", err);
      throw err;
    }
  },

  loginUser: async (username, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      return res.data;
    } catch (err) {
      console.error("Error logging in user:", err);
      throw err;
    }
  },

  saveArticle: async (token, title, extract, imageUrl, articleUrl) => {
    try {
      const res = await axios.post(
        `${API_URL}/articles/save`,
        {
          title,
          extract,
          imageUrl,
          articleUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    } catch (err) {
      console.error("Error saving article:", err);
      throw err;
    }
  },

  getUserSavedArticles: async (token) => {
    try {
      const res = await axios.get(`${API_URL}/articles/saved`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.savedArticles;
    } catch (err) {
      console.error("Error fetching saved articles:", err);
      throw err;
    }
  },

  deleteUserSavedArticle: async (token, articleIndex) => {
    try {
      const res = await axios.delete(
        `${API_URL}/articles/delete/${articleIndex}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (err) {
      console.error("Error deleting article:", err);
      throw err;
    }
  },
};

export default api;
