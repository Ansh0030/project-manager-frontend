import axios from "axios";

const API_BASE_URL = "https://project-manager-backend-steel.vercel.app";

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                const response = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    { refreshToken }
                );

                localStorage.setItem("accessToken", response.data.accessToken);
                originalRequest.headers.Authorization =
                    `Bearer ${response.data.accessToken}`;

                return api(originalRequest);
            } catch (err) {
                localStorage.clear();
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
