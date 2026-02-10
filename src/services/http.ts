import axios from "axios";
import { authStorage } from "../auth/authStorage";

export const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const session = authStorage.get();
    if (session && session.token) {
        config.headers.Authorization = `Bearer ${session.token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            authStorage.clear();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);