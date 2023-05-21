import axios from "axios";

export const getTrendingArticles = async () => {
  const response = await axios.get("/articles?per_page=4");
  return response.data.data;
};

export const getArticles = async ({
  page,
  limit,
  search,
  categories,
  authors,
}) => {
  // Query params builder
  const params = new URLSearchParams();
  params.append("page", page || 1);

  if (limit) {
    params.append("per_page", limit);
  }

  if (search) {
    params.append("search", search);
  }

  if (categories && categories.length > 0) {
    params.append("categories", categories.join(","));
  }

  if (authors && authors.length > 0) {
    params.append("authors", authors.join(","));
  }

  // Fetch data
  const response = await axios.get(`/articles?${params.toString()}`);
  return response.data.data;
};

export const getArticle = async (id) => {
  const response = await axios.get(`/articles/${id}`);
  return response.data.data;
};

export const getRelatedArticles = async (article, n = 4) => {
  const articles = await getArticles({
    page: 1,
    limit: n + 1, // +1 to exclude the current article
    categories: article.categories.map((category) => category.id),
  });

  return articles.filter((a) => a.id !== article.id);
};

export const createArticle = async (data) => {
  const response = await axios.post("/articles", data);
  return response.data.data;
};

export const updateArticle = async (id, data) => {
  const response = await axios.patch(`/articles/${id}`, data);
  return response.data.data;
};

export const uploadThumbnail = async (id, data) => {
  const response = await axios.post(`articles/${id}/thumbnail`, data);
  return response.data.data;
};

export const deleteArticle = async (id) => {
  const response = await axios.delete(`/articles/${id}`);
  return response.data.data;
};
