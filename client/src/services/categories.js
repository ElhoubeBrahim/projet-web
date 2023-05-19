import axios from "axios";

export const getCategories = async () => {
  const response = await axios.get("/categories");
  return response.data.data;
};
