import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const USER_ID = process.env.NEXT_PUBLIC_USER_ID || "user-default";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-user-id": USER_ID,
  },
});
