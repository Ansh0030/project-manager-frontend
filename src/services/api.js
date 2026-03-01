import axios from "axios";

const api = axios.create({
    baseURL: "https://project-manager-backend-kes1.onrender.com",
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
                    "https://project-manager-backend-kes1.onrender.com/auth/refresh",
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
