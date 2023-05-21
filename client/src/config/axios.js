import axios from "axios";
import { getLoggedinUser } from "../services/auth";

const user = getLoggedinUser();

axios.defaults.baseURL = "http://localhost:8000/api";

if (user) {
  axios.defaults.headers["Authorization"] = "Bearer " + user.token;
}
