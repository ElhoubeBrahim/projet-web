import axios from "axios";

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createUser = async ({ username, email, profession, password }) => {
  try {
    const response = await axios.post("/auth/register", {
      username,
      email,
      profession,
      password,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const storeUser = (user, token) => {
  user.token = token;
  window.localStorage.setItem("user", JSON.stringify(user));
};

export const getLoggedinUser = () => {
  return JSON.parse(window.localStorage.getItem("user"));
};
