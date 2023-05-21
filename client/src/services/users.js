import axios from "axios";

export const getFeaturedAuthors = async () => {
  const response = await axios.get(
    "/auth/users?per_page=6&role=author&featured=true",
  );
  return response.data.data;
};

export const getAuthor = async (id) => {
  const response = await axios.get(`/auth/users/${id}`);
  return response.data.data;
};

export const updateUser = async (data) => {
  const response = await axios.post("/users/update/data", data);
  return response.data.data;
};

export const updatePassword = async (data) => {
  const response = await axios.post("/users/update/password", data);
  return response.data.data;
};

export const updateAvatar = async (data) => {
  const response = await axios.post("/users/avatar", data);
  return response.data.data;
};
