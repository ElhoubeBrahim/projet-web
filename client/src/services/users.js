import axios from "axios";

export const getFeaturedAuthors = async () => {
  const response = await axios.get("/auth/users?per_page=6&role=author&featured=true");
  return response.data.data;
};
