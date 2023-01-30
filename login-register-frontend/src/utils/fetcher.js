import axios from "axios";
import Config from "../Config";

const urlBase =
  Config.NODE_ENV === "development"
    ? Config.LOCAL_BACKEND_URL + "/api"
    : Config.BACKEND_URL + "/api";

export const apiCaller = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    credentials: "omit",
  },
  withCredentials: false,
});

export const getErrorMessage = (err) => {
  let message = "";
  try {
    message = err.response.data.message;
  } catch {
    message = "Something went wrong!";
  }
  return message;
};
