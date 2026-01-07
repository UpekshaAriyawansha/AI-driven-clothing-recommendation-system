// src/api/recommendationAPI.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/recommendation";

export const getRecommendation = async (payload) => {
  try {
    const res = await axios.post(`${API_URL}/add`, payload);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch recommendation");
  }
};
