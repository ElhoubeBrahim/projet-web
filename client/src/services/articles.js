import axios from "axios";

export const getTrendingArticles = async () => {
  const response = await axios.get("/articles?per_page=4");
  return response.data.data;
};
