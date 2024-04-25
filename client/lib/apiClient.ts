import axios from "axios";
import { env } from "./env";

const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default apiClient;
