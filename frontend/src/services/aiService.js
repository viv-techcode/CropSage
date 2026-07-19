import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
});

export const askAI = async (message) => {
  const res = await API.post("/ai/chat", {
    message,
  });

  return res.data;
};