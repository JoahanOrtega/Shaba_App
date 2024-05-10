import axios from "axios";
import { Platform } from "react-native";

export const API_URL =
  process.env.EXPO_PUBLIC_STAGE === "prod"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID;

const shabaApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO Interceptors
//help me to read from my physic storage (device) adjuntar our access token

export { shabaApi };
