import axios from "axios";
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/storage-adapter";

export const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log("ando en la conexion a la api jeje " + API_URL);
// process.env.EXPO_PUBLIC_STAGE === "prod"
//   ? process.env.EXPO_PUBLIC_API_URL
//   : Platform.OS === "ios"
//   ? process.env.EXPO_PUBLIC_API_URL_IOS
//   : process.env.EXPO_PUBLIC_API_URL_ANDROID;

const shabaApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO Interceptors
//help me to read from my physic storage (device) adjuntar our access token
shabaApi.interceptors.request.use(async (config) => {
  const token = await StorageAdapter.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { shabaApi };
