import axios from "axios";

export const getTrendingArticles = async () => {
  const response = await axios.get("/articles?per_page=4");
  return response.data.data;
};

export const getArticles = async (page = 1, limit = 10) => {
  const response = await axios.get(`/articles?per_page=${limit}&page=${page}`);
  return response.data.data;
};
