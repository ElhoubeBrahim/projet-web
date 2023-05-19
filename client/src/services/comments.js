import axios from "axios";

export const getComments = async (articleID) => {
  const response = await axios.get(`/articles/${articleID}/comments`);
  return response.data.data;
};

export const createComment = async (articleID, comment) => {
  const response = await axios.post(`/articles/${articleID}/comments`, comment);
  return response.data.data;
};
