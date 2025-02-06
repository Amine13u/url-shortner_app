import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const shortenUrl = async (longUrl: string) => {
  const response = await axios.post(`${API_URL}/shorten`, { longUrl });
  return response.data;
};

export const getUrls = async () => {
  const response = await axios.get(`${API_URL}/shorten/urls`);
  return response.data;
};

export const getAnalytics = async (shortId: string) => {
  const response = await axios.get(`${API_URL}/analytics/${shortId}`);
  return response.data;
};

export const deleteUrl = async (shortId: string) => {
  await axios.delete(`${API_URL}/urls/${shortId}`);
};
